/* EMY template parts split from 31-template-customer-profile.cjs */
const customer_profile_part_1 = String.raw`
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>EMY | Customer Profile</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
      :root { --emy-navy:#001b47; --emy-orange:#ff6a00; --emy-muted:#667085; --emy-line:rgba(0,27,71,.10); }
      * { box-sizing: border-box; }
      html, body { margin: 0; min-height: 100%; background: #fffdf8; color: var(--emy-navy); font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      button, input { font: inherit; }
      .page { min-height: 100dvh; background: radial-gradient(circle at 88% 2%, rgba(255,106,0,.10), transparent 230px), linear-gradient(180deg,#fff8ef 0%,#fffdf8 54%,#fff8ef 100%); }
      .shell { width:min(100%, 760px); margin:0 auto; padding:0 18px 118px; }
      body.is-profile-preview-mode .shell { width:min(100%, 1040px); }
      body.is-business-customer-profile-view .profile-public-preview .profile-view-head,
      body.is-business-customer-profile-view .profile-public-preview .profile-business-preview-head {
        display: none !important;
      }
      body.is-business-customer-profile-view .profile-public-preview {
        padding-top: 12px;
      }
      body.is-profile-preview-mode.is-private-profile-locked .shell {
        width: min(100%, 1024px);
        padding-top: 0;
        padding-bottom: 132px;
      }
      body.is-profile-preview-mode.is-private-profile-locked .profile-public-preview .profile-view-head,
      body.is-profile-preview-mode.is-private-profile-locked .profile-business-preview-head {
        display: none !important;
      }
      body.is-profile-preview-mode.is-private-profile-locked .topbar {
        width: min(100%, 960px);
        margin: 0 auto 8px;
      }
      .topbar { position:sticky; top:0; z-index:30; min-height:70px; display:grid; grid-template-columns:46px minmax(0,1fr) 42px 42px; gap:10px; align-items:center; border-bottom:1px solid rgba(0,27,71,.07); background:rgba(255,253,248,.88); backdrop-filter:blur(16px); }
      .avatar { width:44px; height:44px; border:1px solid rgba(0,27,71,.12); border-radius:999px; background:#fff; color:var(--emy-navy); overflow:hidden; display:grid; place-items:center; font-weight:760; box-shadow:0 10px 22px rgba(0,27,71,.08); cursor:pointer; }
      .avatar img, .profile-photo img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block; transform-origin:center; }
      .avatar img { position:static; }
      .avatar.emy-story-ring,
      .profile-photo.emy-story-ring,
      .session-photo.emy-story-ring,
      .profile-business-preview-photo.emy-story-ring {
        border-color: transparent !important;
        background:
          linear-gradient(135deg,#f8fafc,#eef2f7) padding-box,
          conic-gradient(from 220deg,#ff6a00 0deg,#ff2f7f 115deg,#ffc83d 235deg,#ff6a00 360deg) border-box !important;
        box-shadow:0 0 0 3px rgba(255,255,255,.96),0 14px 30px rgba(255,106,0,.20),0 12px 26px rgba(0,27,71,.12) !important;
      }
      .avatar.emy-story-ring { border-width:3px !important; }
      .profile-photo.emy-story-ring,
      .session-photo.emy-story-ring,
      .profile-business-preview-photo.emy-story-ring { border-width:5px !important; }
      .avatar.emy-story-ring img,
      .profile-photo.emy-story-ring img,
      .session-photo.emy-story-ring img,
      .profile-business-preview-photo.emy-story-ring img { border-radius:inherit; }
      .hello { min-width:0; display:block; }
      .hello strong { display:block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color:var(--emy-navy); font-size:16px; line-height:1.15; font-weight:800; }
      .hello > span { display:block; overflow:hidden; margin-top:4px; color:var(--emy-muted); text-overflow:ellipsis; white-space:nowrap; font-size:12px; font-weight:620; }
      .location-btn { width: fit-content; max-width: 100%; min-width: 0; border:1px solid rgba(0,27,71,.08); border-radius:999px; background:rgba(255,255,255,.62); color:#667085; cursor:pointer; display:inline-flex; align-items:center; gap:5px; padding:3px 8px; font-size:11px; line-height:1.2; font-weight:500; box-shadow:none; }
      .location-btn span { display:block; flex:1 1 auto; min-width:0; max-width:min(46vw,260px); margin:0; color:inherit; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-size:inherit; font-weight:inherit; }
      .location-btn svg { flex:0 0 auto; width:13px; height:13px; stroke-width:2.2; }
      .location-pin { color: var(--emy-orange); }
      .location-chevron { color:#8993a8; }
      .profile-location-modal { position:fixed; inset:0; z-index:84; display:none; align-items:center; justify-content:center; padding:18px; background:rgba(15,23,42,.38); backdrop-filter:blur(8px); }
      .profile-location-modal.is-open { display:flex; }
      .location-sheet { width:min(100%,480px); max-height:min(86dvh,650px); overflow:auto; border:1px solid rgba(0,27,71,.10); border-radius:14px; background:#fff; box-shadow:0 24px 70px rgba(15,23,42,.20); padding:18px; }
      .location-head { display:flex; align-items:center; justify-content:space-between; gap:12px; }
      .location-title { display:inline-flex; align-items:center; gap:9px; color:var(--emy-navy); font-size:16px; font-weight:700; }
      .location-title svg { width:22px; height:22px; }
      .location-actions { display:flex; align-items:center; gap:8px; }
      .location-add, .location-close { height:32px; border:1px solid rgba(0,27,71,.12); border-radius:6px; background:#fff; color:var(--emy-navy); cursor:pointer; padding:0 12px; font-size:12px; font-weight:650; }
      .location-add { border-color:rgba(255,106,0,.26); color:#c14f00; background:#fff8f1; }
      .location-close { width:32px; padding:0; }
      .location-current { width:100%; margin-top:14px; border:1px solid rgba(0,27,71,.10); border-radius:8px; background:#fbfcfe; color:var(--emy-navy); cursor:pointer; display:flex; align-items:center; justify-content:space-between; padding:11px 12px; text-align:left; font-size:13px; font-weight:600; }
      .location-current-copy { display:grid; gap:3px; }
      .location-current-copy strong { font-size:13px; line-height:1.1; font-weight:650; }
      .location-current-copy small { color:#6b7690; font-size:11px; line-height:1.25; font-weight:450; }
      .radio-dot { width:15px; height:15px; border-radius:999px; border:1.5px solid rgba(0,27,71,.22); background:#fff; pointer-events:none; }
      .location-current.is-selected .radio-dot, .place-card.is-selected .place-check { background:var(--emy-orange); border-color:var(--emy-orange); box-shadow:inset 0 0 0 4px #fff; }
      .current-radius { margin-top:10px; border:1px solid rgba(0,27,71,.08); border-radius:9px; background:linear-gradient(180deg,rgba(255,250,244,.86),rgba(255,255,255,.92)); padding:11px; }
      .current-radius[hidden] { display:none; }
      .current-radius-head { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:8px; color:#67728a; font-size:11px; font-weight:600; }
      .current-radius-head strong { color:var(--emy-navy); font-size:12px; font-weight:650; }
      .place-list { display:grid; gap:8px; margin-top:10px; }
      .place-card { display:grid; grid-template-columns:1fr auto; gap:10px; align-items:center; border:1px solid rgba(0,27,71,.10); border-radius:8px; background:#fff; padding:10px 12px; }
      .place-card.is-selected { border-color:rgba(255,106,0,.38); background:#fff8f1; }
      .place-main { min-width:0; cursor:pointer; text-align:left; border:0; background:transparent; padding:0; color:var(--emy-navy); }
      .place-main strong { display:block; font-size:12.5px; line-height:1.2; font-weight:700; }
      .place-main span { display:block; margin-top:3px; color:#6d778f; font-size:11px; line-height:1.25; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
      .place-tools { display:flex; align-items:center; gap:6px; }
      .place-tools button { border:1px solid rgba(0,27,71,.09); border-radius:5px; background:#fff; color:#506079; cursor:pointer; padding:4px 7px; font-size:11px; font-weight:600; }
      .place-tools button.place-check { width:20px; height:20px; min-width:20px; padding:0; border-radius:999px; border:1.5px solid rgba(0,27,71,.16); background:#fff; }
      .location-empty { margin:12px 0 0; color:#6d778f; text-align:left; font-size:12px; line-height:1.4; }
      .location-form { display:none; margin-top:12px; border-top:1px solid rgba(0,27,71,.08); padding-top:14px; }
      .location-form.is-open { display:block; }
      .place-tabs { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; }
      .place-tabs button { height:36px; border:1px solid rgba(0,27,71,.10); border-radius:6px; background:#fff; color:#6d778f; cursor:pointer; font-size:12px; font-weight:620; }
      .place-tabs button.is-active { background:var(--emy-navy); color:#fff; border-color:var(--emy-navy); }
      .location-search { position:relative; }
      .location-field { width:100%; height:42px; margin-top:10px; border:1px solid rgba(0,27,71,.12); border-radius:6px; background:#fff; color:var(--emy-navy); outline:none; padding:0 12px; font-size:13px; font-weight:520; }
      .location-field:focus { border-color:rgba(255,106,0,.60); box-shadow:0 0 0 3px rgba(255,106,0,.10); }
      .location-suggestions { position:absolute; left:0; right:0; top:calc(100% + 6px); z-index:9; display:grid; gap:5px; max-height:220px; overflow:auto; border:1px solid rgba(0,27,71,.10); border-radius:8px; background:rgba(255,255,255,.98); box-shadow:0 18px 38px rgba(0,27,71,.15); padding:6px; }
      .location-suggestions[hidden] { display:none; }
      .location-suggestion { width:100%; border:1px solid transparent; border-radius:6px; background:transparent; color:var(--emy-navy); cursor:pointer; padding:9px 10px; text-align:left; }
      .location-suggestion:hover, .location-suggestion:focus { border-color:rgba(255,106,0,.22); background:#fff7ef; outline:none; }
      .location-suggestion strong { display:block; font-size:12px; line-height:1.25; font-weight:650; }
      .location-suggestion small { display:block; margin-top:2px; color:#6d778f; font-size:10.5px; line-height:1.25; font-weight:450; }
      .location-suggestion-empty { padding:9px 10px; color:#6d778f; font-size:11px; line-height:1.35; }
      .radius-title { margin:12px 0 8px; color:#6d778f; font-size:11px; font-weight:650; }
      .radius-options { display:grid; grid-template-columns:repeat(5,1fr); gap:7px; }
      .radius-options.compact { grid-template-columns:repeat(5,minmax(0,1fr)); }
      .radius-options button { height:34px; border:1px solid rgba(0,27,71,.09); border-radius:6px; background:#fff; color:var(--emy-navy); cursor:pointer; font-size:12px; font-weight:650; }
      .radius-options button.is-active { background:var(--emy-orange); color:#fff; }
      .location-submit { display:block; min-width:120px; height:42px; margin:16px auto 0; border:0; border-radius:6px; background:var(--emy-orange); color:#fff; cursor:pointer; padding:0 20px; font-size:13px; font-weight:720; }
      .location-status { min-height:18px; margin:10px 0 0; color:#9a4b00; text-align:center; font-size:11.5px; line-height:1.35; font-weight:550; }
      .icon-btn { position:relative; width:42px; height:42px; border:1px solid rgba(0,27,71,.08); border-radius:999px; background:#fff; color:var(--emy-navy); cursor:pointer; display:grid; place-items:center; padding:0; box-shadow:0 10px 22px rgba(0,27,71,.08); }
      .icon-btn:hover { color:var(--emy-orange); box-shadow:0 12px 26px rgba(0,27,71,.11); }
      .icon-btn svg { width:21px; height:21px; stroke:currentColor; stroke-width:2.2; }
      .notification-btn { width:42px !important; height:42px !important; border:1px solid rgba(0,27,71,.08) !important; border-radius:999px !important; background:#fff !important; box-shadow:0 10px 22px rgba(0,27,71,.08) !important; }
      .notification-btn:hover { background:#fff !important; color:var(--emy-orange); box-shadow:0 12px 26px rgba(0,27,71,.11) !important; }
      .notification-count { position:absolute; right:-1px; top:0; min-width:14px; height:14px; padding:0 3px; border:1px solid rgba(255,255,255,.88); border-radius:999px; background:rgba(255,255,255,.78); color:var(--emy-navy); display:grid; place-items:center; font-size:8px; line-height:1; font-weight:750; box-shadow:0 5px 12px rgba(0,27,71,.14); }
      .notifications-panel { position:fixed; top:62px; left:10px; z-index:82; width:min(100% - 20px,420px); max-height:min(74dvh,620px); display:none; grid-template-rows:auto minmax(0,1fr); border:1px solid rgba(0,27,71,.10); border-radius:14px; background:rgba(255,255,255,.97); box-shadow:0 24px 62px rgba(0,27,71,.20); overflow:hidden; transform:none; }
      .notifications-panel.is-open { display:grid; }
      .notifications-head { display:flex; align-items:center; gap:14px; min-height:64px; padding:0 18px 0 20px; border-bottom:1px solid rgba(0,27,71,.08); background:rgba(255,255,255,.90); backdrop-filter:blur(12px); }
      .notifications-head h2 { flex:1 1 auto; min-width:0; margin:0; color:#111827; font-size:18px; line-height:1.2; font-weight:560; }
      .notifications-icon { height:36px; width:36px; border:0; border-radius:999px; background:transparent; color:#111827; cursor:pointer; display:grid; place-items:center; }
      .notifications-icon:hover { background:rgba(0,27,71,.06); }
      .notifications-icon svg { width:21px; height:21px; stroke-width:2.1; }
      .notifications-scroll { overflow-y:auto; min-height:220px; }
      .notifications-section-title { margin:0; padding:14px 12px 8px; color:#111827; font-size:14px; line-height:1.2; font-weight:560; }
      .notification-row { position:relative; display:grid; grid-template-columns:42px minmax(0,1fr) 72px 28px; gap:10px; align-items:center; padding:10px 12px; border-left:3px solid transparent; cursor:pointer; }
      .notification-row.is-unread { border-left-color:#1677d2; }
      .notification-row:hover { background:#f4f6f8; }
      .notification-avatar, .notification-thumb { overflow:hidden; background:linear-gradient(145deg,#fff7ed,#eef4fb); color:var(--emy-navy); display:grid; place-items:center; font-size:11px; font-weight:650; }
      .notification-avatar { height:42px; width:42px; border-radius:999px; }
      .notification-thumb { height:42px; width:72px; border-radius:6px; }
      .notification-avatar img, .notification-thumb img, .notification-avatar video, .notification-thumb video { width:100%; height:100%; object-fit:cover; display:block; }
      .notification-thumb.is-fallback { color:#c14f00; font-size:10px; font-weight:800; text-transform:uppercase; }
      .notification-thumb.is-fallback { box-sizing:border-box; gap:2px; padding:5px; text-align:center; text-transform:none; background:linear-gradient(145deg,#fff7ed,#eef4fb); color:var(--emy-navy); }
      .notification-thumb.is-fallback b { display:block; font-size:10px; line-height:1.05; font-weight:850; }
      .notification-thumb.is-fallback small { display:block; color:#667085; font-size:8.5px; line-height:1; font-weight:720; }
      .notification-thumb.is-product { background:linear-gradient(145deg,#fff7ed,#fffaf4); color:#b54708; }
      .notification-thumb.is-post, .notification-thumb.is-image, .notification-thumb.is-video { background:linear-gradient(145deg,#eff6ff,#f8fbff); color:#175cd3; }
      .notification-thumb.is-clip { background:linear-gradient(145deg,#ecfdf3,#f8fff9); color:#067647; }
      .notification-thumb.is-message, .notification-thumb.is-comment, .notification-thumb.is-reply { background:linear-gradient(145deg,#f4f3ff,#fbfaff); color:#5925dc; }
      .notification-text strong { display:block; color:#111827; font-size:13px; line-height:1.35; font-weight:500; }
      .notification-text time { display:block; margin-top:6px; color:#64748b; font-size:12px; line-height:1.25; font-weight:450; }
      .notification-more { height:28px; width:28px; border:0; border-radius:999px; background:transparent; color:#111827; cursor:pointer; display:grid; place-items:center; }
      .notification-more:hover { background:rgba(0,27,71,.06); }
      .notification-more svg { width:19px; height:19px; stroke-width:2.5; }
      .notification-action-menu { position:absolute; right:10px; top:44px; z-index:12; width:min(360px, calc(100vw - 40px)); border:1px solid rgba(0,27,71,.10); border-radius:10px; background:#fff; box-shadow:0 18px 42px rgba(0,27,71,.18); overflow:hidden; }
      .notification-action-menu[hidden] { display:none; }
      .notification-action-menu button { width:100%; min-height:48px; border:0; border-bottom:1px solid rgba(0,27,71,.06); background:#fff; color:#111827; cursor:pointer; display:grid; grid-template-columns:34px minmax(0,1fr); align-items:center; gap:10px; padding:0 14px; text-align:left; font-size:13px; font-weight:450; }
      .notification-action-menu button:last-child { border-bottom:0; }
      .notification-action-menu button:hover { background:#f4f6f8; }
      .notification-action-menu svg { width:24px; height:24px; stroke-width:2; }
      .notifications-divider { height:1px; margin:8px 12px 4px; background:rgba(0,27,71,.10); }
      .notifications-empty { margin:0; padding:30px 24px 34px; text-align:center; color:#64748b; font-size:13px; line-height:1.45; font-weight:430; }
      .notifications-empty strong { display:block; margin-bottom:6px; color:var(--emy-navy); font-size:15px; font-weight:650; }
      .count { position:absolute; right:-1px; top:0; min-width:14px; height:14px; padding:0 3px; border:1px solid rgba(255,255,255,.88); border-radius:999px; background:rgba(255,255,255,.78); color:var(--emy-navy); display:grid; place-items:center; font-size:8px; font-weight:750; box-shadow:0 5px 12px rgba(0,27,71,.14); }
      .profile-hero { width:100%; max-width:100%; margin-top:18px; border:1px solid rgba(0,27,71,.09); border-radius:18px; background:rgba(255,255,255,.78); box-shadow:0 18px 46px rgba(0,27,71,.09); overflow:hidden; }
      .profile-hero .cover { height: 128px; background: linear-gradient(135deg, rgba(255,106,0,.18), rgba(255,255,255,.72) 45%, rgba(0,27,71,.10)), radial-gradient(circle at 88% 18%, rgba(255,106,0,.22), transparent 110px); border-bottom:1px solid rgba(0,27,71,.08); }
      .profile-main { display:grid; grid-template-columns:112px minmax(0,1fr); gap:16px; align-items:start; min-width:0; min-height:128px; padding:16px 18px 18px; margin-top:-128px; }
      .profile-photo { position:relative; width:112px; height:112px; border:4px solid #fff; border-radius:999px; background:linear-gradient(135deg,#e7edf6,#fff7ed); color:var(--emy-navy); display:grid; place-items:center; overflow:hidden; font-size:34px; font-weight:700; box-shadow:0 16px 32px rgba(0,27,71,.14); }
      .profile-info { min-width:0; max-width:100%; overflow:hidden; }
      .profile-info h1 { max-width:100%; margin:0 0 4px; overflow:hidden; color:var(--emy-navy); font-size:24px; line-height:1.05; font-weight:720; text-overflow:ellipsis; white-space:nowrap; }
      .profile-info p { max-width:100%; margin:0; overflow:hidden; color:var(--emy-muted); font-size:13px; line-height:1.4; font-weight:430; text-overflow:ellipsis; white-space:nowrap; }
      .actions { display:flex; flex-wrap:wrap; gap:9px; padding:0 18px 18px; }
      .actions button { min-height:38px; border:1px solid rgba(0,27,71,.10); border-radius:8px; background:#fff; color:var(--emy-navy); cursor:pointer; padding:0 14px; font-size:13px; font-weight:560; }
      .actions .primary { border-color:var(--emy-orange); background:var(--emy-orange); color:#fff; }
      .actions .danger { border-color:rgba(185,28,28,.18); background:#fff6f5; color:#b91c1c; }
      .actions .preview-profile { border-color:rgba(255,106,0,.24); background:#fff4e8; color:#c45300; font-weight:720; box-shadow:0 8px 18px rgba(255,106,0,.08); }
      .actions .preview-profile:hover { border-color:rgba(255,106,0,.42); background:#fff0dd; color:var(--emy-orange); }
      .profile-photo-overlay { position:fixed; inset:0; z-index:86; display:none; align-items:center; justify-content:center; padding:18px; background:rgba(15,23,42,.44); backdrop-filter:blur(10px); }
      .profile-photo-overlay.is-open { display:flex; }
      .profile-photo-sheet, .camera-sheet, .crop-card { width:min(100%,430px); max-height:min(88dvh,680px); overflow:auto; border:1px solid rgba(0,27,71,.10); border-radius:16px; background:#fff; box-shadow:0 26px 72px rgba(0,27,71,.22); padding:18px; }
      .profile-photo-sheet h2, .camera-sheet h2, .crop-card h2 { margin:0; text-align:center; color:var(--emy-navy); font-size:18px; line-height:1.2; font-weight:700; }
      .profile-photo-copy, .camera-sheet p, .crop-help { margin:8px auto 0; max-width:330px; text-align:center; color:#61708c; font-size:12px; line-height:1.45; font-weight:430; }
      .source-actions { margin-top:16px; display:grid; grid-template-columns:1fr; gap:10px; }
      .source-actions button { min-height:78px; border:1px solid rgba(0,27,71,.10); border-radius:12px; background:#fff; color:var(--emy-navy); cursor:pointer; display:grid; gap:5px; align-content:center; padding:11px; text-align:center; font:inherit; box-shadow:0 10px 22px rgba(0,27,71,.05); }
      .source-actions button:hover { border-color:rgba(255,106,0,.34); background:#fff4e8; color:var(--emy-orange); }
      .source-actions strong { color:inherit; font-size:14px; line-height:1.12; font-weight:800; }
      .source-actions span { color:#667085; font-size:11px; line-height:1.32; font-weight:560; }
      .sheet-close { display:block; width:fit-content; min-height:34px; margin:14px auto 0; border:1px solid rgba(0,27,71,.10); border-radius:999px; background:#fff; color:var(--emy-navy); cursor:pointer; padding:0 16px; font:inherit; font-size:12px; font-weight:700; }
      .camera-preview-frame { position:relative; margin-top:14px; width:100%; aspect-ratio:4 / 3; border:1px solid rgba(0,27,71,.10); border-radius:14px; background:#101828; overflow:hidden; }
      .camera-preview-frame .camera-preview { width:100%; height:100%; display:block; object-fit:cover; background:#101828; }
      .camera-preview-frame.is-profile-camera::before { content:""; position:absolute; left:50%; top:50%; z-index:2; width:min(66%,230px); aspect-ratio:1; border-radius:999px; border:2px solid rgba(255,255,255,.94); background:rgba(255,255,255,.06); box-shadow:inset 0 0 24px rgba(255,255,255,.20),0 12px 26px rgba(0,27,71,.16); transform:translate(-50%,-50%); pointer-events:none; }
      .camera-status { min-height:18px; color:#8a4b00 !important; }
      .camera-actions { margin-top:14px; display:grid; grid-template-columns:1fr 1fr; gap:10px; }
      .camera-actions button { min-height:40px; border-radius:8px; cursor:pointer; padding:0 12px; font:inherit; font-size:13px; font-weight:700; }
      .camera-actions button:first-child { border:1px solid rgba(0,27,71,.12); background:#fff; color:var(--emy-navy); }
      .camera-actions button:last-child { border:0; background:var(--emy-orange); color:#fff; }
      .crop-change { display:block; width:fit-content; height:32px; margin:12px auto 0; border:1px solid rgba(255,106,0,.28); border-radius:999px; background:#fff4e8; color:var(--emy-navy); cursor:pointer; padding:0 14px; font-size:12px; font-weight:650; }
      .crop-change:hover { background:var(--emy-orange); color:#fff; }
      .crop-frame { position:relative; width:min(72vw,270px); height:min(72vw,270px); margin:16px auto 0; overflow:hidden; border:1px solid rgba(0,27,71,.10); border-radius:999px; background:#f0ece7; cursor:grab; touch-action:none; user-select:none; }
      .crop-frame.is-dragging { cursor:grabbing; }
      .crop-frame img { position:absolute; inset:0; display:block; width:100%; height:100%; object-fit:cover; transform-origin:center; will-change:left,top,width,height; pointer-events:none; }
      .crop-frame::after { content:""; position:absolute; inset:0; z-index:2; pointer-events:none; border-radius:999px; box-shadow:inset 0 0 0 2px rgba(255,255,255,.95), inset 0 0 0 3px rgba(255,106,0,.45); }
      .crop-controls { margin-top:14px; display:grid; gap:10px; }
      .crop-controls label { display:grid; grid-template-columns:76px 1fr; align-items:center; gap:10px; color:#173057; font-size:12px; font-weight:560; }
      .crop-controls input { height:auto; accent-color:var(--emy-orange); padding:0; }
      .crop-actions { margin-top:14px; display:grid; grid-template-columns:1fr 1fr; gap:10px; }
      .crop-actions button { height:40px; border:1px solid rgba(0,27,71,.12); border-radius:7px; background:#fff; color:var(--emy-navy); cursor:pointer; padding:0 12px; font-size:13px; font-weight:650; }
      .crop-apply { border:0 !important; background:var(--emy-orange) !important; color:#fff !important; }
      .grid { display:grid; gap:14px; margin-top:16px; }
      .panel { border:1px solid rgba(0,27,71,.09); border-radius:14px; background:rgba(255,255,255,.82); padding:16px; box-shadow:0 12px 28px rgba(0,27,71,.06); }
      .panel h2 { margin:0 0 12px; color:var(--emy-navy); font-size:16px; line-height:1.2; font-weight:650; }
      .panel-head { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:12px; }
      .panel-head h2 { margin:0; }
      .panel-action { min-height:34px; border:1px solid rgba(255,106,0,.26); border-radius:999px; background:#fff7ef; color:#c14f00; cursor:pointer; display:inline-flex; align-items:center; justify-content:center; gap:7px; padding:0 12px; font-size:12px; line-height:1; font-weight:760; white-space:nowrap; }
      .panel-action:hover { background:var(--emy-orange); color:#fff; box-shadow:0 10px 20px rgba(255,106,0,.16); }
      .panel-action svg { width:15px; height:15px; stroke:currentColor; stroke-width:2.2; }
      .details { display:grid; gap:10px; }
      .detail { display:grid; grid-template-columns: 130px minmax(0,1fr); gap:12px; padding:10px 0; border-bottom:1px solid rgba(0,27,71,.07); color:#536077; font-size:13px; line-height:1.35; }
      .detail:last-child { border-bottom:0; }
      .detail strong { color:var(--emy-navy); font-weight:600; }
      .detail span { min-width:0; overflow-wrap:anywhere; }
      .location-list { display:grid; gap:8px; }
      .place { border:1px solid rgba(0,27,71,.08); border-radius:10px; background:#fff; padding:11px 12px; }
      .place strong { display:block; color:var(--emy-navy); font-size:13px; font-weight:620; }
      .place span { display:block; margin-top:3px; color:var(--emy-muted); font-size:12px; line-height:1.35; }
      .profile-dashboard { display:grid; gap:16px; align-items:start; margin-top:16px; }
      .profile-dashboard > .grid { margin-top:0; }
      .profile-menu { position:relative; margin-top:0; border:0; border-radius:0; background:transparent; box-shadow:none; overflow:visible; }
      .business-switch { width:100%; min-height:66px; border:1px solid rgba(255,106,0,.16); border-radius:18px; background:linear-gradient(145deg,rgba(255,255,255,.98),rgba(255,247,238,.9)); color:var(--emy-navy); cursor:pointer; display:flex; align-items:center; justify-content:space-between; gap:14px; padding:13px 14px; text-align:left; box-shadow:0 18px 34px rgba(0,27,71,.08), 0 10px 24px rgba(255,106,0,.08), inset 0 1px 0 rgba(255,255,255,.94); transition:transform .18s ease, border-color .18s ease, box-shadow .18s ease; }
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
      .profile-menu-list { display:grid; gap:10px; margin-top:10px; }
      .profile-menu-row { min-height:68px; width:100%; border:1px solid rgba(0,27,71,.075); border-radius:17px; background:linear-gradient(145deg,rgba(255,255,255,.96),rgba(255,253,248,.82)); color:var(--emy-navy); cursor:pointer; display:grid; grid-template-columns:40px minmax(0,1fr) 22px; align-items:center; gap:10px; padding:10px 12px; text-align:left; box-shadow:0 16px 32px rgba(0,27,71,.075), 0 5px 18px rgba(255,106,0,.035), inset 0 1px 0 rgba(255,255,255,.90); transition:transform .18s ease, border-color .18s ease, box-shadow .18s ease, background .18s ease; }
      .profile-menu-row:hover { border-color:rgba(255,106,0,.24); background:linear-gradient(145deg,#fff,#fff6ed); transform:translateY(-2px) translateX(3px); box-shadow:0 24px 44px rgba(0,27,71,.11), 0 10px 26px rgba(255,106,0,.12), inset 0 1px 0 rgba(255,255,255,.94); }
      .profile-menu-icon { width:36px; height:36px; border-radius:14px; background:radial-gradient(circle at 28% 20%,#fff 0 28%,rgba(255,255,255,.28) 29%), linear-gradient(145deg,#fff8ef,#fff); color:var(--emy-orange); display:grid; place-items:center; box-shadow:inset 0 1px 0 rgba(255,255,255,.95),0 10px 20px rgba(0,27,71,.08),0 5px 13px rgba(255,106,0,.10); }
      .profile-menu-icon svg { width:18px; height:18px; stroke-width:2; }
      .profile-menu-row strong { display:block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-size:13px; line-height:1.2; font-weight:650; }
      .profile-menu-row small { display:block; margin-top:4px; overflow:hidden; color:#768298; text-overflow:ellipsis; white-space:nowrap; font-size:11px; line-height:1.25; font-weight:500; }
      .profile-menu-row .chevron { color:#a2acbd; justify-self:end; transition:transform .18s ease, color .18s ease; }
      .profile-menu-row:hover .chevron { color:var(--emy-orange); transform:translateX(2px); }
      .profile-menu-row .chevron svg { width:18px; height:18px; stroke-width:2.4; }
      .profile-menu-row.is-danger .profile-menu-icon { background:linear-gradient(145deg,#fff,#fff1f1); color:#dc2626; box-shadow:inset 0 1px 0 rgba(255,255,255,.95),0 10px 20px rgba(0,27,71,.06),0 5px 13px rgba(220,38,38,.08); }
      .profile-menu-row.is-danger:hover { border-color:rgba(220,38,38,.18); background:linear-gradient(145deg,#fff,#fff6f5); box-shadow:0 22px 42px rgba(0,27,71,.10), 0 10px 26px rgba(220,38,38,.08), inset 0 1px 0 rgba(255,255,255,.94); }
      .profile-subview { margin-top:16px; }
      .profile-view-head { position:sticky; top:64px; z-index:25; display:grid; grid-template-columns:40px minmax(0,1fr) 40px; align-items:center; min-height:56px; margin:0 -2px 14px; border:1px solid rgba(0,27,71,.08); border-radius:14px; background:rgba(255,253,248,.88); backdrop-filter:blur(14px); box-shadow:0 12px 30px rgba(0,27,71,.06); }
      .profile-view-head h2 { margin:0; text-align:center; color:var(--emy-navy); font-size:18px; line-height:1.2; font-weight:760; }
      .profile-view-back { width:40px; height:40px; border:0; border-radius:999px; background:transparent; color:var(--emy-navy); cursor:pointer; display:grid; place-items:center; }
      .profile-view-back:hover { background:rgba(255,106,0,.08); color:var(--emy-orange); }
      .profile-view-back svg { width:22px; height:22px; stroke-width:2.4; }
      .session-card, .settings-card, .blocked-card, .customer-requests-card { border:1px solid rgba(0,27,71,.08); border-radius:16px; background:rgba(255,255,255,.88); box-shadow:0 16px 36px rgba(0,27,71,.07); padding:16px; }
      .profile-customers-section { display:grid; gap:12px; margin-top:18px; padding-top:16px; border-top:1px solid rgba(0,27,71,.08); }
      .profile-customers-section-head { display:flex; align-items:end; justify-content:space-between; gap:12px; }
      .profile-customers-section-head strong { color:var(--emy-navy); font-size:15px; line-height:1.2; font-weight:820; }
      .profile-customers-section-head span { color:#667085; font-size:11px; line-height:1.2; font-weight:760; text-transform:uppercase; }
      .session-photo { width:116px; height:116px; margin:6px auto 14px; border:5px solid #fff; border-radius:999px; background:linear-gradient(135deg,#e1e7ef,#faf3ed); color:var(--emy-navy); display:grid; place-items:center; font-size:36px; font-weight:760; overflow:hidden; box-shadow:0 16px 34px rgba(0,27,71,.13); }
      .session-photo img { width:100%; height:100%; object-fit:cover; display:block; }
      .session-intro { max-width:460px; margin:0 auto 14px; color:#667085; text-align:center; font-size:12px; line-height:1.42; font-weight:560; }
      .session-photo-actions { display:flex; flex-wrap:wrap; justify-content:center; gap:8px; margin:-5px 0 14px; }
      .session-mini-action { min-height:32px; border:1px solid rgba(0,27,71,.10); border-radius:999px; background:#fff; color:var(--emy-navy); cursor:pointer; padding:0 12px; font-size:12px; line-height:1; font-weight:720; }
      .session-mini-action:hover { border-color:rgba(255,106,0,.28); background:#fff7ef; color:#c14f00; }
      .session-toggle { width:min(260px,100%); margin:0 auto 16px; display:grid; grid-template-columns:1fr 1fr; border:1px solid rgba(0,27,71,.10); border-radius:8px; background:#fff; overflow:hidden; position:relative; z-index:3; pointer-events:auto; }
      .session-toggle button { min-height:40px; border:0; background:transparent; color:#69758e; cursor:pointer; font-size:12px; font-weight:700; }
      .session-toggle button.is-active,
      .session-toggle button[aria-pressed="true"],
      .session-toggle[data-selected-visibility="private"] [data-session-visibility="private"],
      .session-toggle[data-selected-visibility="public"] [data-session-visibility="public"] { background:var(--emy-orange) !important; color:#fff !important; }
      .session-toggle[data-selected-visibility="private"] [data-session-visibility="public"],
      .session-toggle[data-selected-visibility="public"] [data-session-visibility="private"] { background:transparent !important; color:#69758e !important; }
      .session-form { display:grid; gap:12px; }
      .field-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
      .profile-field { display:grid; gap:6px; }
      .profile-field label { color:var(--emy-navy); font-size:11px; line-height:1.2; font-weight:700; }
      .profile-field input, .profile-field textarea { width:100%; border:1px solid rgba(0,27,71,.12); border-radius:8px; background:rgba(255,255,255,.86); color:var(--emy-navy); outline:none; padding:0 12px; font-family:inherit; letter-spacing:0; font-size:13px; font-weight:520; }
      .profile-field input { height:43px; }
      .profile-field textarea { min-height:104px; resize:vertical; padding:12px; line-height:1.45; }
      .profile-field input:focus, .profile-field textarea:focus { border-color:rgba(255,106,0,.55); box-shadow:0 0 0 3px rgba(255,106,0,.10); }
      .profile-phone-control { position:relative; display:flex; align-items:stretch; overflow:visible; }
      .profile-phone-control input[data-session-phone] { min-width:0; border-radius:0 8px 8px 0; }
      .profile-dial-select { position:relative; flex:0 0 116px; }
      .profile-dial-button { width:116px; height:43px; border:1px solid rgba(0,27,71,.12); border-right:0; border-radius:8px 0 0 8px; background:rgba(255,255,255,.94); color:var(--emy-navy); cursor:pointer; display:flex; align-items:center; justify-content:space-between; gap:7px; padding:0 9px; font-size:12.5px; font-weight:720; }
      .profile-dial-button:hover, .profile-dial-button:focus-visible, .profile-dial-button[aria-expanded="true"] { border-color:rgba(255,106,0,.42); background:#fffaf5; outline:none; box-shadow:0 0 0 3px rgba(255,106,0,.08); }
      .profile-dial-value { min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
      .profile-dial-chevron { flex:0 0 auto; color:var(--emy-orange); font-size:11px; line-height:1; transition:transform .18s ease; }
      .profile-dial-button[aria-expanded="true"] .profile-dial-chevron { transform:rotate(180deg); }
      .profile-dial-menu { position:absolute; left:0; top:calc(100% + 7px); z-index:60; width:min(330px,calc(100vw - 40px)); border:1px solid rgba(0,27,71,.10); border-radius:12px; background:#fff; padding:8px; box-shadow:0 18px 42px rgba(0,27,71,.16); }
      .profile-dial-menu[hidden] { display:none; }
      .profile-dial-search { height:34px !important; border-radius:9px !important; background:#fffdf8 !important; font-size:12.5px !important; font-weight:560 !important; }
      .profile-dial-options { display:block; max-height:216px; overflow:auto; margin-top:6px; padding-right:2px; }
      .profile-dial-option { width:100%; min-height:36px; border:0; border-radius:9px; background:transparent; color:var(--emy-navy); cursor:pointer; display:grid; grid-template-columns:64px minmax(0,1fr) 36px; align-items:center; gap:8px; padding:7px 8px; text-align:left; font-size:12.5px; font-weight:600; }
      .profile-dial-option:hover, .profile-dial-option:focus-visible { outline:none; background:#fff8f1; }
      .profile-dial-option.is-selected { background:#fff4e8; color:#d95600; box-shadow:inset 2px 0 0 var(--emy-orange); }
      .profile-dial-code { font-weight:820; }
      .profile-dial-name { min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; opacity:.84; }
      .profile-dial-iso { justify-self:end; opacity:.68; font-size:11px; font-weight:820; }
      .profile-dial-empty { display:block; padding:12px 8px 6px; color:#8a8396; font-size:12px; font-weight:600; text-align:center; }
      .profile-dial-empty[hidden] { display:none; }
      .profile-extra-form { display:grid; gap:14px; }
      .profile-about-panel {
        position: relative;
        overflow: hidden;
        border-color: rgba(0,27,71,.08);
        background: linear-gradient(145deg,rgba(255,255,255,.96),rgba(255,250,245,.74));
        box-shadow: 0 18px 42px rgba(0,27,71,.07), inset 0 1px 0 rgba(255,255,255,.86);
      }
      .profile-about-panel > .profile-business-preview {
        display: none;
      }
      .profile-about-panel h2 {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 14px;
        font-size: 18px;
        font-weight: 760;
      }
      .profile-about-panel h2::after {
        content: "";
        height: 1px;
        flex: 1 1 auto;
        border-radius: 999px;
        background: linear-gradient(90deg,rgba(255,106,0,.22),rgba(0,27,71,.06),transparent);
      }
      .profile-about-panel .profile-field {
        gap: 8px;
        border: 1px solid rgba(0,27,71,.075);
        border-radius: 13px;
        background: rgba(255,255,255,.74);
        padding: 12px;
        box-shadow: inset 0 1px 0 rgba(255,255,255,.88), 0 8px 18px rgba(0,27,71,.035);
      }
      .profile-about-panel .profile-field > label {
        color: #536178;
        font-size: 11px;
        line-height: 1.2;
        font-weight: 760;
      }
      .profile-about-panel textarea[data-profile-about] {
        min-height: 132px;
        border-radius: 12px;
        background: linear-gradient(180deg,#fff,#fbfcff);
        color: #344054;
        padding: 14px;
        font-family: inherit;
        font-size: 13px;
        line-height: 1.4;
        font-weight: 400;
        letter-spacing: 0;
        box-shadow: inset 0 1px 0 rgba(255,255,255,.92);
      }
      .profile-about-panel textarea[data-profile-about]::placeholder { color:#8a94a8; font-weight:400; opacity:1; }
      .profile-social-grid { display:grid; gap:10px; }
      .profile-social-row { display:grid; grid-template-columns:154px minmax(0,1fr) auto; gap:9px; align-items:center; }
      .profile-social-name { min-width:0; display:inline-flex; align-items:center; gap:9px; color:var(--emy-navy); font-size:12px; line-height:1.2; font-weight:780; }
      .profile-social-name > span:last-child { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
      .profile-social-logo { flex:0 0 auto; width:30px; height:30px; display:grid; place-items:center; border-radius:10px; background:#f3f6fb; color:var(--emy-navy); font-size:14px; line-height:1; font-weight:900; overflow:hidden; box-shadow:inset 0 0 0 1px rgba(0,27,71,.08), 0 7px 14px rgba(0,27,71,.06); }
      .profile-social-logo svg { width:18px; height:18px; display:block; fill:currentColor; stroke:none; }
      .profile-social-logo.is-x { border-radius:12px; background:#0f1419; color:#fff; }
      .profile-social-logo.is-facebook { background:#1877f2; color:#fff; }
      .profile-social-logo.is-instagram { background:radial-gradient(circle at 30% 107%, #fdf497 0 14%, #fd5949 40%, transparent 61%), radial-gradient(circle at 0 0, #405de6 0, #5851db 34%, transparent 63%), linear-gradient(135deg,#833ab4 0%, #c13584 42%, #e1306c 58%, #fd1d1d 74%, #fcb045 100%); color:#fff; }
      .profile-social-logo.is-tiktok { background:#050505; color:#fff; }
      .profile-social-logo.is-youtube { background:#ff0033; color:#fff; }
      .profile-social-logo.is-linkedin { background:#0a66c2; color:#fff; }
      .profile-social-logo.is-website { background:#0b2a5b; color:#fff; }
      .profile-social-logo.is-tiktok svg,
      .profile-social-logo.is-youtube svg { width:20px; height:20px; }
      .profile-social-row input[data-profile-social-url] { width:100%; height:40px; min-width:0; border:1px solid rgba(0,27,71,.10); border-radius:8px; background:#fff; color:var(--emy-navy); outline:none; padding:0 11px; font-family:inherit; letter-spacing:0; font-size:12.5px; font-weight:520; }
      .profile-social-row input[data-profile-social-url]:focus { border-color:rgba(255,106,0,.50); box-shadow:0 0 0 3px rgba(255,106,0,.09); }
      .profile-visible-toggle { min-height:34px; display:inline-flex; align-items:center; gap:7px; border:1px solid rgba(0,27,71,.08); border-radius:999px; background:#fff; color:#667085; padding:0 10px; font-size:11px; line-height:1; font-weight:720; white-space:nowrap; }
      .profile-visible-toggle input { width:15px; height:15px; accent-color:var(--emy-orange); }
      .interest-chip-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(126px,1fr)); gap:8px; }
      .interest-chip {
        min-height: 40px;
        display: inline-flex;
        align-items: center;
        justify-content: flex-start;
        gap: 9px;
        border: 1px solid rgba(0,27,71,.09);
        border-radius: 12px;
        background: linear-gradient(180deg,#fff,#f9fbfe);
        color: #30405b;
        cursor: pointer;
        padding: 0 12px;
        font-size: 12px;
        line-height: 1.12;
        font-weight: 730;
        text-align: left;
        box-shadow: 0 6px 14px rgba(0,27,71,.035), inset 0 1px 0 rgba(255,255,255,.86);
        transition: transform .16s ease, border-color .16s ease, background .16s ease, box-shadow .16s ease, color .16s ease;
      }
      .interest-chip::before {
        content: "";
        width: 8px;
        height: 8px;
        flex: 0 0 8px;
        border-radius: 999px;
        background: #d8dee8;
        box-shadow: 0 0 0 3px rgba(216,222,232,.32);
      }
      .interest-chip:hover {
        transform: translateY(-1px);
        border-color: rgba(255,106,0,.28);
        background: linear-gradient(180deg,#fff,#fff7ef);
        color: #c45300;
        box-shadow: 0 10px 20px rgba(0,27,71,.06), 0 5px 14px rgba(255,106,0,.08), inset 0 1px 0 rgba(255,255,255,.90);
      }
      .interest-chip.is-active {
        border-color: rgba(255,106,0,.72);
        background: linear-gradient(145deg,#ff7b18,#ff6a00);
        color: #fff;
        box-shadow: 0 12px 24px rgba(255,106,0,.20), inset 0 1px 0 rgba(255,255,255,.30);
      }
      .interest-chip.is-active::before {
        background: #fff;
        box-shadow: 0 0 0 3px rgba(255,255,255,.25);
      }
      .profile-interest-summary {
        min-height: 40px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 7px;
        border: 1px solid rgba(0,27,71,.075);
        border-radius: 13px;
        background: rgba(248,250,252,.76);
        color: #667085;
        padding: 7px 8px;
        font-size: 12px;
        line-height: 1.35;
        font-weight: 650;
      }
      .profile-interest-summary span {
        min-height: 27px;
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        background: #fff4e8;
        color: #c45300;
        padding: 0 10px;
        font-weight: 760;
        box-shadow: inset 0 0 0 1px rgba(255,106,0,.10);
      }
      .profile-interest-summary.is-empty {
        border-style: dashed;
        background: rgba(255,255,255,.58);
      }
      .profile-interest-summary.is-empty span {
        background: transparent;
        color: #667085;
        padding: 0 2px;
        box-shadow: none;
      }
      .profile-business-preview {
        display: grid;
        gap: 9px;
      }
      .profile-business-preview.is-highlighted .profile-business-preview-surface {
        border-color: rgba(255,106,0,.38);
        box-shadow: 0 18px 42px rgba(255,106,0,.14), 0 14px 30px rgba(0,27,71,.075), inset 0 1px 0 rgba(255,255,255,.88);
      }
      .profile-business-preview-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        color: #536178;
        font-size: 11px;
        line-height: 1.2;
        font-weight: 760;
      }
      .profile-business-preview-head span {
        min-height: 24px;
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        background: #fff4e8;
        color: #c45300;
        padding: 0 9px;
        font-size: 10px;
        line-height: 1;
        font-weight: 850;
        box-shadow: inset 0 0 0 1px rgba(255,106,0,.12);
      }
      .profile-business-preview-surface {
        overflow: hidden;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 16px;
        background: linear-gradient(180deg,#fff,#fbfcff);
        box-shadow: 0 14px 30px rgba(0,27,71,.055), inset 0 1px 0 rgba(255,255,255,.88);
      }
      .profile-business-preview-main {
        display: grid;
        grid-template-columns: 58px minmax(0,1fr) auto;
        align-items: end;
        gap: 11px;
        padding: 14px;
        margin-top: 0;
      }
      .profile-business-preview-photo {
        position: relative;
        width: 58px;
        height: 58px;
        overflow: hidden;
        display: grid;
        place-items: center;
        border: 4px solid #fff;
        border-radius: 999px;
        background: linear-gradient(135deg,#e7edf6,#fff7ed);
        color: var(--emy-orange);
        font-size: 18px;
        line-height: 1;
        font-weight: 850;
        box-shadow: 0 12px 24px rgba(0,27,71,.14);
      }
      .profile-business-preview-photo img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transform-origin: center;
      }
      .profile-business-preview-name {
        min-width: 0;
      }
      .profile-preview-identity {
        min-width: 0;
        display: grid;
        align-content: center;
        gap: 8px;
      }
      .profile-business-preview-name h3 {
        margin: 0;
        overflow: hidden;
        color: var(--emy-navy);
        font-size: 17px;
        line-height: 1.12;
        font-weight: 830;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .profile-business-preview-name p {
        margin: 4px 0 0;
        overflow: hidden;
        color: #667085;
        font-size: 11.5px;
        line-height: 1.25;
        font-weight: 620;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .profile-preview-actions {
        display: inline-flex;
        align-items: center;
        justify-content: flex-start;
        gap: 8px;
        min-width: 0;
        flex-wrap: wrap;
      }
      .profile-preview-actions .profile-preview-request {
        min-height: 34px;
        border: 1px solid rgba(0,27,71,.12);
        border-radius: 999px;
        background: rgba(255,255,255,.90);
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: var(--emy-navy);
        gap: 5px;
        padding: 0 12px 0 7px;
        font: inherit;
        font-size: 12px;
        line-height: 1;
        font-weight: 820;
        white-space: nowrap;
        box-shadow: 0 7px 16px rgba(0,27,71,.035), inset 0 1px 0 rgba(255,255,255,.88);
      }
      .profile-request-logo {
        width: 21px;
        height: 21px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 auto;
        pointer-events: none;
      }
      .profile-request-logo svg {
        width: 21px;
        height: 21px;
        display: block;
        filter: drop-shadow(0 4px 7px rgba(255,106,0,.22));
      }
      .profile-request-label {
        display: inline-block;
        line-height: 1;
      }
      .profile-preview-actions .profile-preview-request:hover,
      .profile-preview-actions .profile-preview-request:focus-visible {
        outline: none;
        border-color: rgba(255,106,0,.22);
        background: #fff4e8;
        color: #c45300;
      }
      .profile-preview-actions .profile-preview-request:disabled,
      .profile-preview-actions .profile-preview-request.is-requested,
      .profile-preview-actions .profile-preview-request.is-customer {
        border-color: rgba(0,27,71,.08);
        background: #f1f5f9;
        color: #536178;
        cursor: default;
        box-shadow: inset 0 0 0 1px rgba(0,27,71,.04), inset 0 1px 0 rgba(255,255,255,.86);
      }
      .profile-preview-actions .profile-customer-chat {
        width: auto;
        min-height: 34px;
        padding: 0 13px;
        font-size: 12px;
        box-shadow: 0 7px 14px rgba(255,106,0,.12), inset 0 1px 0 rgba(255,255,255,.32), inset 0 -5px 10px rgba(125,45,0,.08);
      }
      .profile-preview-actions .profile-customer-chat[hidden] {
        display: none !important;
      }
      .profile-preview-visibility {
        min-height: 26px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        background: #eef7f1;
        color: #14784b;
        padding: 0 9px;
        font-size: 10px;
        line-height: 1;
        font-weight: 820;
        white-space: nowrap;
      }
      .profile-preview-visibility.is-private {
        background: #eef2f6;
        color: #667085;
      }
      .profile-private-gate {
        display: grid;
        grid-template-columns: 46px minmax(0,1fr) auto;
        align-items: center;
        gap: 12px;
        margin: 0 14px 14px;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 14px;
        background: linear-gradient(180deg,#fff,#f8fafc);
        padding: 14px;
        box-shadow: 0 14px 28px rgba(0,27,71,.06), inset 0 1px 0 rgba(255,255,255,.92);
      }
      .profile-public-preview .profile-private-gate {
        width: min(100% - 52px, 560px);
        margin: 0 auto 18px;
        padding: 14px 16px;
      }
      .profile-private-gate[hidden] {
        display: none !important;
      }
      .profile-private-gate-icon {
        width: 46px;
        height: 46px;
        display: grid;
        place-items: center;
        border-radius: 16px;
        background: #fff4e8;
        color: var(--emy-orange);
        box-shadow: inset 0 0 0 1px rgba(255,106,0,.14), 0 10px 20px rgba(255,106,0,.10);
      }
      .profile-private-gate-icon svg {
        width: 22px;
        height: 22px;
        stroke: currentColor;
        stroke-width: 2.2;
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .profile-private-gate-copy {
        min-width: 0;
        display: grid;
        gap: 4px;
      }
      .profile-private-gate-copy strong {
        color: var(--emy-navy);
        font-size: 15px;
        line-height: 1.18;
        font-weight: 860;
      }
      .profile-private-gate-copy span {
        color: #667085;
        font-size: 12px;
        line-height: 1.35;
        font-weight: 520;
      }
      .profile-private-gate button {
        min-height: 38px;
        border: 0;
        border-radius: 999px;
        background: var(--emy-orange);
        color: #fff;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0 14px;
        font: inherit;
        font-size: 12px;
        line-height: 1;
        font-weight: 830;
        white-space: nowrap;
        box-shadow: 0 12px 22px rgba(255,106,0,.20), inset 0 1px 0 rgba(255,255,255,.28);
      }
      .profile-private-gate button:hover,
      .profile-private-gate button:focus-visible {
        outline: none;
        background: #f05f00;
        box-shadow: 0 15px 26px rgba(255,106,0,.24), inset 0 1px 0 rgba(255,255,255,.28);
      }
      .profile-private-gate button:disabled,
      .profile-private-gate button.is-requested {
        background: #f1f5f9;
        color: #536178;
        cursor: default;
        box-shadow: inset 0 0 0 1px rgba(0,27,71,.08), inset 0 1px 0 rgba(255,255,255,.86);
      }
      .profile-business-preview-details {
        display: grid;
        grid-template-columns: 1fr;
        gap: 12px;
        align-items: start;
        padding: 0 14px 14px;
      }
      .profile-business-preview-details[hidden] {
        display: none !important;
      }
      .profile-business-preview-card {
        min-width: 0;
        display: grid;
        align-content: start;
        gap: 10px;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 14px;
        background: rgba(255,255,255,.94);
        padding: 14px;
        box-shadow: 0 12px 28px rgba(0,27,71,.055), inset 0 1px 0 rgba(255,255,255,.92);
      }
      .profile-business-preview-card-head {
        display: grid;
        grid-template-columns: 36px minmax(0,1fr);
        gap: 10px;
        align-items: center;
      }
      .profile-business-preview-card-icon {
        width: 36px;
        height: 36px;
        display: grid;
        place-items: center;
        border: 1px solid rgba(255,106,0,.20);
        border-radius: 14px;
        background: #fff7ef;
        color: var(--emy-orange);
        box-shadow: inset 0 1px 0 rgba(255,255,255,.88), 0 8px 16px rgba(255,106,0,.075);
      }
      .profile-business-preview-card-icon svg {
        width: 17px;
        height: 17px;
        stroke: currentColor;
        stroke-width: 2.15;
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .profile-business-preview-card-title {
        min-width: 0;
        display: grid;
        gap: 3px;
      }
      .profile-business-preview-card-title strong {
        color: var(--emy-navy);
        font-size: 13.5px;
        line-height: 1.16;
        font-weight: 850;
        overflow-wrap: anywhere;
      }
      .profile-business-preview-card-title span {
        color: #667085;
        font-size: 11.5px;
        line-height: 1.25;
        font-weight: 620;
        overflow-wrap: anywhere;
      }
      .profile-business-preview-about {
        min-height: 66px;
        margin: 0;
        border: 0;
        border-radius: 12px;
        background: linear-gradient(180deg,#f8fafc,#fff);
        color: #344054;
        padding: 12px 14px;
        font-size: 13.25px;
        line-height: 1.42;
        font-weight: 430;
        overflow-wrap: anywhere;
      }
      .profile-business-preview-about.is-empty {
        color: #344054;
        font-weight: 430;
      }
      .profile-business-preview-section {
        display: grid;
        gap: 10px;
        margin: 0;
      }
      .profile-preview-chip-list {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .profile-preview-chip-list > span {
        min-height: 26px;
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        background: #f4f6f8;
        color: #536178;
        padding: 0 9px;
        font-size: 11px;
        line-height: 1;
        font-weight: 740;
      }
      .profile-preview-chip-list > span.is-accent {
        background: #fff4e8;
        color: #c45300;
        box-shadow: inset 0 0 0 1px rgba(255,106,0,.10);
      }
      .profile-preview-chip-list > span.is-muted {
        width: 100%;
        min-height: 38px;
        justify-content: center;
        border: 1px dashed rgba(0,27,71,.14);
        border-radius: 12px;
        background: rgba(255,255,255,.66);
        color: #7a869e;
        padding: 0 12px;
      }
      .profile-social-preview-card {
        gap: 8px;
        padding: 12px;
      }
      .profile-preview-social-list {
        min-height: 58px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 13px;
        background: linear-gradient(180deg,#fff,#f8fafc);
        padding: 7px;
        box-shadow: inset 0 1px 0 rgba(255,255,255,.92), 0 8px 18px rgba(0,27,71,.035);
      }
      .profile-preview-social-list > span.is-muted {
        min-height: 40px;
        margin: 0;
      }
      .profile-preview-social-link {
        width: 46px;
        min-width: 46px;
        height: 46px;
        min-height: 46px;
        display: grid;
        place-items: center;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 12px;
        background: #fff;
        color: var(--emy-navy);
        padding: 0;
        text-decoration: none;
        box-shadow: inset 0 1px 0 rgba(255,255,255,.92), 0 7px 16px rgba(0,27,71,.055);
        transition: transform .16s ease, border-color .16s ease, box-shadow .16s ease;
      }
      .profile-preview-social-link:hover,
      .profile-preview-social-link:focus-visible {
        outline: none;
        transform: translateY(-1px);
        border-color: rgba(255,106,0,.30);
        box-shadow: inset 0 1px 0 rgba(255,255,255,.92), 0 12px 24px rgba(0,27,71,.07), 0 6px 14px rgba(255,106,0,.08);
      }
      .profile-preview-social-link .profile-social-logo {
        width: 36px;
        height: 36px;
        border-radius: 10px;
        font-size: 0;
        box-shadow: none;
      }
      .profile-preview-social-link .profile-social-logo svg { width:22px; height:22px; }
      .profile-preview-social-link .profile-social-logo.is-instagram svg { width:21px; height:21px; }
      .profile-preview-social-link .profile-social-logo.is-youtube svg { width:24px; height:24px; }
      .profile-public-preview {
        margin-top: 16px;
      }
      .profile-public-preview-shell {
        width: min(100%, 960px);
        margin: 0 auto;
      }
      .profile-public-preview .profile-business-preview {
        gap: 0;
      }
      .profile-public-preview .profile-business-preview-head {
        display: none;
      }
      .profile-public-preview .profile-business-preview-surface {
        border-radius: 0;
        overflow: visible;
        border: 0;
        background: transparent;
        box-shadow: none;
      }
      .profile-public-preview .profile-business-preview-main {
        position: relative;
        grid-template-columns: 112px minmax(0,max-content);
        justify-content: center;
        align-items: center;
        gap: 22px;
        padding: 34px 26px 46px;
        margin-top: 0;
        margin-bottom: 6px;
      }
      .profile-public-preview .profile-business-preview-photo {
        width: 112px;
        height: 112px;
        border-width: 5px;
        font-size: 34px;
      }
      .profile-public-preview .profile-preview-identity {
        justify-items: start;
      }
      .profile-public-preview .profile-business-preview-name h3 {
        font-size: 30px;
        line-height: 1.06;
      }
      .profile-public-preview .profile-business-preview-name p {
        margin-top: 6px;
        font-size: 13px;
        font-weight: 430;
      }
      .profile-public-preview .profile-preview-visibility {
        position: absolute;
        top: 28px;
        right: 26px;
        min-height: 30px;
        padding: 0 11px;
        font-size: 11px;
      }
      .profile-public-preview .profile-business-preview.is-private-locked .profile-business-preview-main {
        display: flex;
        min-height: 214px;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 0;
        padding: 10px 26px 40px;
        margin-bottom: 0;
        text-align: center;
      }
      .profile-public-preview .profile-business-preview.is-private-locked .profile-business-preview-photo {
        width: 88px;
        height: 88px;
        margin: 0 0 18px;
        border-width: 5px;
        font-size: 28px;
        box-shadow: 0 14px 26px rgba(0,27,71,.09), 0 0 0 1px rgba(255,255,255,.88);
      }
      .profile-public-preview .profile-business-preview.is-private-locked .profile-preview-identity {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
        gap: 0;
      }
      .profile-public-preview .profile-business-preview.is-private-locked .profile-preview-actions {
        order: -1;
        justify-content: center;
        margin: 0 0 10px;
      }
      .profile-public-preview .profile-business-preview.is-private-locked .profile-business-preview-name h3 {
        font-size: 25px;
        line-height: 1.06;
        text-align: center;
      }
      .profile-public-preview .profile-business-preview.is-private-locked .profile-business-preview-name p {
        margin-top: 5px;
        font-size: 12px;
        font-weight: 620;
        text-align: center;
      }
      .profile-public-preview .profile-business-preview.is-private-locked .profile-preview-visibility {
        display: none;
      }
      .profile-public-preview .profile-business-preview.is-private-locked .profile-private-gate {
        width: min(100% - 52px, 520px);
        min-height: 72px;
        grid-template-columns: 38px minmax(0,1fr);
        align-items: center;
        gap: 12px;
        margin: 0 auto 16px;
        border-color: rgba(0,27,71,.09);
        border-radius: 12px;
        background: linear-gradient(180deg,#fff,#f8fafc);
        padding: 12px 14px;
        box-shadow: 0 10px 22px rgba(0,27,71,.05), inset 0 1px 0 rgba(255,255,255,.92);
      }
      .profile-public-preview .profile-business-preview.is-private-locked .profile-private-gate-icon {
        width: 38px;
        height: 38px;
        border-radius: 12px;
      }
      .profile-public-preview .profile-business-preview.is-private-locked .profile-private-gate-copy strong {
        font-size: 14px;
        line-height: 1.14;
      }
      .profile-public-preview .profile-business-preview.is-private-locked .profile-private-gate-copy span {
        max-width: 430px;
        font-size: 11.5px;
        line-height: 1.32;
        font-weight: 520;
      }
      .profile-public-preview .profile-business-preview.is-private-locked .profile-private-gate button {
        display: none;
      }
      .profile-public-preview .profile-business-preview-details {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 12px;
        align-items: start;
        padding: 0 18px 18px;
      }
      .profile-public-preview .profile-business-preview-details[hidden] {
        display: none !important;
      }
      .profile-public-preview .profile-business-preview-card {
        min-width: 0;
        display: grid;
        align-content: start;
        gap: 10px;
        border: 1px solid rgba(0,27,71,.075);
        border-radius: 14px;
        background: rgba(255,255,255,.94);
        padding: 14px;
        box-shadow: 0 12px 28px rgba(0,27,71,.055), inset 0 1px 0 rgba(255,255,255,.88);
      }
      .profile-public-preview .profile-business-preview-card.is-wide {
        grid-column: 1 / -1;
      }
      .profile-public-preview .profile-business-preview-card-head {
        display: grid;
        grid-template-columns: 36px minmax(0,1fr);
        gap: 10px;
        align-items: center;
      }
      .profile-public-preview .profile-business-preview-card-icon {
        width: 36px;
        height: 36px;
        display: grid;
        place-items: center;
        border: 1px solid rgba(255,106,0,.20);
        border-radius: 14px;
        background: #fff7ef;
        color: var(--emy-orange);
        box-shadow: inset 0 0 0 1px rgba(255,106,0,.12), 0 8px 16px rgba(255,106,0,.09);
      }
      .profile-public-preview .profile-business-preview-card-icon svg {
        width: 17px;
        height: 17px;
        stroke: currentColor;
        stroke-width: 2.2;
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .profile-public-preview .profile-business-preview-card-title {
        display: grid;
        gap: 2px;
      }
      .profile-public-preview .profile-business-preview-card-title strong {
        color: var(--emy-navy);
        font-size: 13.5px;
        line-height: 1.18;
        font-weight: 850;
        text-transform: none;
      }
      .profile-public-preview .profile-business-preview-card-title span {
        color: #667085;
        font-size: 11.5px;
        line-height: 1.25;
        font-weight: 620;
      }
      .profile-public-preview .profile-business-preview-about {
        min-height: 64px;
        margin: 0;
        border: 0;
        border-radius: 12px;
        background: linear-gradient(180deg,#f8fafc,#fff);
        color: #344054;
        padding: 12px 14px;
        font-size: 13.5px;
        line-height: 1.42;
        font-weight: 430;
      }
      .profile-public-preview .profile-business-preview-section {
        margin: 0;
      }
      .profile-public-preview .profile-business-preview-section strong {
        font-size: 11px;
      }
      .profile-public-preview .profile-preview-chip-list {
        gap: 8px;
      }
      .profile-public-preview .profile-preview-chip-list > span {
        min-height: 30px;
        border: 1px solid rgba(0,27,71,.07);
        background: #f4f7fb;
        padding: 0 12px;
        font-size: 11.5px;
        box-shadow: inset 0 1px 0 rgba(255,255,255,.82);
      }
      .profile-public-preview .profile-preview-chip-list > span.is-accent {
        border-color: rgba(255,106,0,.18);
        background: #fff4e8;
        color: #c45300;
      }
      .profile-public-preview .profile-preview-chip-list > span.is-muted {
        min-height: 34px;
        width: 100%;
        border: 1px dashed rgba(0,27,71,.12);
        border-radius: 12px;
        background: rgba(255,255,255,.62);
        color: #7a869e;
        justify-content: center;
        padding: 0 12px;
      }
      .profile-public-preview .profile-preview-social-list {
        gap: 8px;
      }
      .profile-public-preview .profile-preview-social-link {
        width: 50px;
        min-width: 50px;
        height: 50px;
        min-height: 50px;
        border-color: rgba(0,27,71,.075);
        border-radius: 12px;
      }
      .profile-public-preview .profile-preview-social-link .profile-social-logo {
        width: 38px;
        height: 38px;
      }
      .customer-public-profile-view {
        display: grid;
        gap: 12px;
        margin-top: 14px;
      }
      .customer-public-profile-view[hidden] {
        display: none !important;
      }
      .customer-public-activity-card {
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 8px;
        background: rgba(255,255,255,.96);
        color: var(--emy-navy);
        box-shadow: 0 10px 24px rgba(0,27,71,.055);
      }
      .customer-public-activity-title h2 {
        margin: 0;
        color: #191f2b;
        font-size: 19px;
        line-height: 1.18;
        font-weight: 760;
        letter-spacing: 0;
      }
      .customer-public-activity-card {
        overflow: visible;
        border: 0;
        border-radius: 0;
        background: transparent;
        box-shadow: none;
      }
      .customer-public-activity-head {
        display: grid;
        grid-template-columns: minmax(0,1fr) auto;
        gap: 14px;
        align-items: start;
        padding: 18px 20px 0;
      }
      .customer-public-activity-title {
        min-width: 0;
        display: grid;
        gap: 4px;
      }
      .customer-public-activity-title span {
        color: #667085;
        font-size: 12px;
        line-height: 1.2;
        font-weight: 520;
      }
      .customer-public-follow {
        min-height: 34px;
        border: 1px solid rgba(0,27,71,.46);
        border-radius: 999px;
        background: #fff;
        color: #1f2937;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 0 13px;
        font: inherit;
        font-size: 13px;
        line-height: 1;
        font-weight: 720;
        white-space: nowrap;
      }
      .customer-public-follow svg {
        width: 15px;
        height: 15px;
        stroke: currentColor;
        stroke-width: 2.4;
        fill: none;
        stroke-linecap: round;
      }
      .customer-public-follow.is-following {
        border-color: rgba(7,116,67,.28);
        background: #ecfdf3;
        color: #087443;
      }
      .customer-public-command {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(220px, 310px);
        align-items: center;
        gap: 12px;
        margin: 14px 20px 0;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 14px;
        background: linear-gradient(145deg, rgba(255,255,255,.84), rgba(255,255,255,.50));
        box-shadow: 0 16px 34px rgba(0,27,71,.07);
        padding: 8px;
      }
      .customer-public-tabs-wrap {
        min-width: 0;
        overflow: hidden;
      }
      .customer-public-category-tabs {
        display: flex;
        align-items: center;
        gap: 6px;
        overflow-x: auto;
        scrollbar-width: none;
        padding: 0;
      }
      .customer-public-category-tabs::-webkit-scrollbar { display: none; }
      .customer-public-category-tabs button {
        position: relative;
        flex: 0 0 auto;
        min-height: 34px;
        border: 0;
        border-radius: 10px;
        background: transparent;
        color: #56637b;
        cursor: pointer;
        padding: 0 13px;
        font: inherit;
        font-size: 12.5px;
        line-height: 1;
        font-weight: 660;
        transition: background .16s ease, color .16s ease, box-shadow .16s ease;
      }
      .customer-public-category-tabs button:hover {
        background: rgba(255,106,0,.06);
        color: var(--emy-navy);
      }
      .customer-public-category-tabs button.is-active {
        background: var(--emy-orange);
        color: #fff;
        box-shadow: 0 8px 16px rgba(255,106,0,.16);
      }
      .customer-public-search-box {
        height: 50px;
        min-width: 0;
        display: grid;
        grid-template-columns: minmax(0, 1fr) 42px;
        align-items: center;
        overflow: hidden;
        border: 1px solid rgba(0,27,71,.09);
        border-radius: 13px;
        background: rgba(255,255,255,.82);
        box-shadow: inset 0 1px 0 rgba(255,255,255,.72);
      }
      .customer-public-search-box:focus-within {
        border-color: rgba(255,106,0,.42);
        box-shadow: 0 0 0 3px rgba(255,106,0,.08), 0 12px 26px rgba(0,27,71,.07);
      }
      .customer-public-search-box input {
        width: 100%;
        min-width: 0;
        height: 100%;
        border: 0;
        outline: 0;
        background: transparent;
        color: var(--emy-navy);
        padding: 0 16px;
        font: inherit;
        font-size: 13px;
        font-weight: 480;
      }
      .customer-public-search-box input::placeholder { color: #7b7f88; }
      .customer-public-search-box svg {
        width: 21px;
        height: 21px;
        color: var(--emy-navy);
        stroke: currentColor;
        stroke-width: 2.1;
        fill: none;
      }
      .customer-public-activity-stage {
        position: relative;
        padding: 14px 0 20px;
      }
      .customer-public-activity-track {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: minmax(280px, 340px);
        gap: 14px;
        overflow-x: auto;
        overscroll-behavior-x: contain;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
        padding: 0 20px;
        scroll-behavior: smooth;
      }
      .customer-public-activity-track::-webkit-scrollbar { display: none; }
      .customer-public-feed-card {
        position: relative;
        scroll-snap-align: start;
        min-width: 0;
        overflow: hidden;
        border: 1px solid rgba(0,27,71,.09);
        border-radius: 10px;
        background: rgba(255,255,255,.98);
        color: var(--emy-navy);
        box-shadow: 0 8px 22px rgba(0,27,71,.055);
      }
      .customer-public-feed-card .home-created-media,
      .customer-public-feed-card .home-created-body,
      .customer-public-result-meta {
        cursor: pointer;
      }
      .customer-public-feed-card .home-created-top {
        min-height: 54px;
        display: grid;
        grid-template-columns: 36px minmax(0,1fr) auto;
        gap: 9px;
        align-items: center;
        border-bottom: 1px solid rgba(0,27,71,.06);
        padding: 9px 11px;
      }
      .customer-public-feed-card .home-created-avatar {
        width: 34px;
        height: 34px;
        display: grid;
        place-items: center;
        overflow: hidden;
        border-radius: 999px;
        background: #f3f6fb;
        color: var(--emy-orange);
        font-size: 12px;
        font-weight: 860;
        box-shadow: inset 0 0 0 1px rgba(0,27,71,.07);
      }
      .customer-public-feed-card .home-created-avatar img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
      }
      .customer-public-feed-card .home-created-top strong,
      .customer-public-feed-card .home-created-top small {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .customer-public-feed-card .home-created-top strong {
        color: var(--emy-navy);
        font-size: 13px;
        line-height: 1.12;
        font-weight: 850;
      }
      .customer-public-feed-card .home-created-top small {
        margin-top: 3px;
        color: #69758d;
        font-size: 10.5px;
        line-height: 1.1;
        font-weight: 680;
      }
      .customer-public-feed-card .social-feed-more {
        justify-self: end;
        width: 32px;
        min-width: 32px;
        height: 32px;
        min-height: 32px;
        border: 0;
        border-radius: 999px;
        background: transparent;
        color: #071326;
        cursor: pointer;
        padding: 0;
        font-size: 18px;
        line-height: 1;
      }
      .customer-public-feed-card .social-feed-more:hover,
      .customer-public-feed-card .social-feed-more[aria-expanded="true"] {
        background: #fff4e8;
        color: var(--emy-orange);
      }
      .customer-public-options-menu {
        position: absolute;
        top: 52px;
        right: 10px;
        z-index: 8;
        width: min(190px, calc(100% - 20px));
        overflow: hidden;
        border: 1px solid rgba(0,27,71,.10);
        border-radius: 10px;
        background: #fff;
        box-shadow: 0 18px 36px rgba(0,27,71,.16);
      }
      .customer-public-options-menu[hidden] { display: none; }
      .customer-public-options-menu button {
        width: 100%;
        min-height: 36px;
        border: 0;
        border-bottom: 1px solid rgba(0,27,71,.06);
        background: #fff;
        color: #344054;
        cursor: pointer;
        padding: 0 12px;
        text-align: left;
        font: inherit;
        font-size: 12px;
        line-height: 1;
        font-weight: 700;
      }
      .customer-public-options-menu button:last-child { border-bottom: 0; }
      .customer-public-options-menu button:hover { background: #fff8f1; color: var(--emy-orange); }
      .customer-public-feed-card .home-created-pill {
        min-height: 23px;
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        background: rgba(255,255,255,.94);
        color: #d85a00;
        padding: 0 9px;
        font-size: 10px;
        line-height: 1;
        font-weight: 850;
      }
      .customer-public-feed-card .home-created-media {
        position: relative;
        min-height: 138px;
        overflow: hidden;
        background: linear-gradient(135deg,#eef3f8,#fff8ef);
      }
      .customer-public-feed-card .home-created-media::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, rgba(255,255,255,.05), rgba(0,27,71,.10));
        pointer-events: none;
      }
      .customer-public-feed-card .home-created-media img,
      .customer-public-feed-card .home-created-media video {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: block;
        object-fit: contain;
        background: #101828;
      }
      .customer-public-feed-card .home-created-media .home-created-pill {
        position: absolute;
        left: 10px;
        top: 10px;
        z-index: 2;
      }
      .customer-public-feed-card .home-created-media.is-text {
        min-height: 96px;
        display: grid;
        align-content: end;
        gap: 5px;
        padding: 12px;
      }
      .customer-public-feed-card .home-created-media.is-text.is-public-video {
        min-height: 138px;
        align-content: center;
        justify-items: center;
        text-align: center;
        padding-top: 52px;
      }
      .customer-public-feed-card .home-created-media.is-text.is-public-video::before {
        content: "";
        position: absolute;
        top: 28px;
        left: 50%;
        z-index: 1;
        width: 42px;
        height: 42px;
        border-radius: 999px;
        background: #fff;
        box-shadow: 0 14px 32px rgba(0,27,71,.16);
        transform: translateX(-50%);
      }
      .customer-public-feed-card .home-created-media.is-text.is-public-video::after {
        inset: 41px auto auto 50%;
        width: 0;
        height: 0;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-left: 12px solid var(--emy-navy);
        background: transparent;
        z-index: 2;
        transform: translateX(-36%);
      }
      .customer-public-feed-card.is-public-category-articles .home-created-media.is-text {
        background: linear-gradient(135deg,#f8fbff,#fff8ef);
      }
      .customer-public-feed-card.is-public-category-events .home-created-media.is-text {
        background: linear-gradient(135deg,#eef5ff,#fff6ed);
      }
      .customer-public-feed-card.is-public-category-reposts .home-created-media.is-text {
        background: linear-gradient(135deg,#eefbf5,#fff8ef);
      }
      .customer-public-feed-card .home-created-media.is-text strong {
        position: relative;
        z-index: 1;
        color: var(--emy-navy);
        font-size: 18px;
        line-height: 1.12;
        font-weight: 880;
      }
      .customer-public-feed-card .home-created-media.is-text span {
        position: relative;
        z-index: 1;
        color: #667085;
        font-size: 12px;
        line-height: 1.25;
        font-weight: 650;
      }
      .customer-public-feed-card .home-created-body {
        display: grid;
        gap: 8px;
        padding: 11px 12px 12px;
      }
      .customer-public-feed-card .home-created-body h3 {
        display: -webkit-box;
        margin: 0;
        overflow: hidden;
        color: var(--emy-navy);
        font-size: 15.5px;
        line-height: 1.22;
        font-weight: 820;
        overflow-wrap: anywhere;
        word-break: break-word;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .customer-public-feed-card .home-created-body p {
        display: -webkit-box;
        overflow: hidden;
        margin: 0;
        color: #526078;
        font-size: 12.5px;
        line-height: 1.38;
        font-weight: 560;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
      }
      .customer-public-result-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        padding: 0 12px 12px;
      }
      .customer-public-result-meta span {
        min-height: 25px;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        border: 1px solid rgba(0,27,71,.07);
        border-radius: 999px;
        background: #f4f6f9;
        color: #5f6c84;
        padding: 0 9px;
        font-size: 10.5px;
        line-height: 1;
        font-weight: 730;
        white-space: nowrap;
      }
      .customer-public-result-meta span.is-category {
        border-color: rgba(255,106,0,.18);
        background: #fff4e8;
        color: #c45300;
      }
      .customer-public-result-meta b {
        color: #7a8598;
        font-size: 9px;
        line-height: 1;
        font-weight: 850;
        text-transform: uppercase;
      }
      .customer-public-feed-card.is-public-category-events .customer-public-result-meta span.is-category {
        border-color: rgba(0,81,159,.15);
        background: #eef5ff;
        color: #184c82;
      }
      .customer-public-feed-card.is-public-category-reposts .customer-public-result-meta span.is-category {
        border-color: rgba(7,116,67,.16);
        background: #ecfdf3;
        color: #087443;
      }
      .customer-public-feed-card .home-created-social {
        display: grid;
        grid-template-columns: minmax(0,1fr) auto;
        align-items: start;
        gap: 4px;
        margin: 1px 6px 0;
        border-top: 1px solid rgba(0,27,71,.07);
        padding: 4px 0 0;
      }
      .customer-public-feed-card .home-created-action-set {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 4px 5px;
        min-width: 0;
      }
      .customer-public-feed-card .home-created-action-pair {
        display: inline-flex;
        align-items: center;
        gap: 3px;
        min-width: 0;
      }
      .customer-public-feed-card .home-created-action-pair strong {
        min-width: 7px;
        color: #647089;
        font-size: 12.5px;
        line-height: 1;
        font-weight: 560;
      }
      .customer-public-feed-card .social-feed-icon {
        width: 25px;
        min-width: 25px;
        height: 24px;
        min-height: 24px;
        border: 0;
        border-radius: 7px;
        background: transparent;
        color: #445064;
        cursor: pointer;
        display: inline-grid;
        place-items: center;
        padding: 0;
      }
      .customer-public-feed-card .social-feed-icon:hover,
      .customer-public-feed-card .social-feed-icon.is-active {
        background: #fff4e8;
        color: var(--emy-orange);
      }
      .customer-public-feed-card .social-feed-icon svg {
        width: 13px;
        height: 13px;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .customer-public-feed-card .home-created-save { justify-self: end; margin-left: 2px; }
      .customer-public-feed-card .home-created-social-meta {
        display: grid;
        grid-template-columns: auto minmax(0,1fr) auto;
        align-items: center;
        gap: 4px;
        padding: 3px 6px 7px;
      }
      .customer-public-feed-card .social-feed-comments-link {
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
      .customer-public-feed-card .social-feed-time {
        justify-self: end;
        color: #98a2b3;
        font-size: 10px;
        line-height: 1.15;
        font-weight: 660;
      }
      .customer-public-feed-card .feed-comments {
        display: none;
        margin: 0;
        border-top: 1px solid rgba(0,27,71,.07);
        padding: 10px 12px 12px;
        background: #fff;
      }
      .customer-public-feed-card.is-comments-open .feed-comments { display: block; }
      .customer-public-feed-card .feed-comment {
        display: grid;
        grid-template-columns: 30px minmax(0,1fr);
        align-items: start;
        gap: 8px;
        margin-top: 9px;
      }
      .customer-public-feed-card .feed-comment-avatar {
        width: 30px;
        height: 30px;
        display: grid;
        place-items: center;
        overflow: hidden;
        border-radius: 999px;
        background: #eef3f8;
        color: var(--emy-navy);
        font-size: 10px;
        font-weight: 820;
      }
      .customer-public-feed-card .feed-comment-bubble {
        min-width: 0;
        border-radius: 14px;
        background: #f6f8fb;
        color: #364157;
        padding: 8px 10px;
        font-size: 12px;
        line-height: 1.35;
        font-weight: 520;
        overflow-wrap: anywhere;
      }
      .customer-public-feed-card .feed-comment-bubble strong {
        display: block;
        margin-bottom: 2px;
        color: var(--emy-navy);
        font-size: 11.5px;
        line-height: 1.2;
        font-weight: 830;
      }
      .customer-public-feed-card .feed-comment-form {
        display: grid;
        grid-template-columns: minmax(0,1fr) auto;
        align-items: center;
        gap: 8px;
        margin-top: 10px;
      }
      .customer-public-feed-card .feed-comment-form input {
        min-width: 0;
        height: 34px;
        border: 1px solid rgba(0,27,71,.10);
        border-radius: 999px;
        background: #fff;
        color: #071326;
        outline: none;
        padding: 0 12px;
        font: inherit;
        font-size: 12px;
        font-weight: 560;
      }
      .customer-public-feed-card .feed-comment-form button {
        min-height: 34px;
        border: 0;
        border-radius: 999px;
        background: var(--emy-orange);
        color: #fff;
        cursor: pointer;
        padding: 0 12px;
        font: inherit;
        font-size: 11.5px;
        line-height: 1;
        font-weight: 820;
        white-space: nowrap;
      }
      .customer-public-activity-track.is-feed-view {
        grid-auto-flow: row;
        grid-auto-columns: auto;
        grid-template-columns: minmax(0, min(100%, 540px));
        justify-content: center;
        align-items: start;
        gap: 16px;
        overflow: visible;
        overscroll-behavior-x: auto;
        scroll-snap-type: none;
        padding: 0 20px 22px;
      }
      .customer-public-activity-track.is-feed-view > .customer-public-activity-item {
        width: 100%;
        max-width: 540px;
        scroll-snap-align: none;
        justify-self: stretch;
      }
      .customer-public-activity-track.is-feed-view .customer-public-activity-item.feed-card,
      .customer-public-activity-track.is-feed-view .customer-public-activity-item.card {
        min-height: 0;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,27,71,.07);
      }
      .customer-public-activity-track.is-feed-view .feed-product-card {
        display: block;
        min-height: 0;
      }
      .customer-public-activity-track.is-feed-view .feed-product-card.is-new::before,
      .customer-public-activity-track.is-feed-view .feed-product-card[data-product-new="true"]::before {
        left: 14px;
        top: 14px;
      }
      .customer-public-activity-track.is-feed-view .feed-product-card .photo {
        height: auto;
        min-height: 0;
        aspect-ratio: 4 / 3;
        margin: 10px;
        border-radius: 8px;
      }
      .customer-public-activity-track.is-feed-view .feed-product-card .body {
        display: grid;
        gap: 7px;
        padding: 11px 14px 12px;
      }
      .customer-public-activity-track.is-feed-view .feed-product-card h3 {
        min-height: 0;
        font-size: 16px;
        line-height: 1.2;
      }
      .customer-public-activity-track.is-feed-view .feed-product-card p {
        font-size: 12.5px;
        -webkit-line-clamp: 2;
      }
      .customer-public-activity-track.is-feed-view .feed-product-card .price {
        margin-top: 2px;
        min-height: 28px;
        font-size: 13.5px;
      }
      .customer-public-activity-track.is-feed-view .feed-clip-card,
      .customer-public-activity-track.is-feed-view .feed-product-clip-card {
        width: min(100%, 300px);
        min-height: 390px;
        justify-self: center;
      }
      .customer-public-activity-track.is-feed-view .feed-clip-card .photo,
      .customer-public-activity-track.is-feed-view .feed-product-clip-card .photo {
        height: 292px;
        min-height: 292px;
      }
      .customer-public-activity-track.is-feed-view .feed-media.social-feed-media {
        min-height: 0;
        aspect-ratio: 4 / 3;
      }
      .customer-public-activity-track.is-feed-view .social-feed-text-panel {
        min-height: 0;
        align-items: start;
        padding: 18px;
      }
      .customer-public-activity-track.is-feed-view .feed-article-card-cover,
      .customer-public-activity-track.is-feed-view .feed-event-post-hero,
      .customer-public-activity-track.is-feed-view .feed-job-hero {
        min-height: 128px;
      }
      .customer-public-activity-track.is-feed-view .feed-event-post.has-cover .feed-event-post-hero,
      .customer-public-activity-track.is-feed-view .feed-job-card.has-cover .feed-job-hero {
        min-height: 180px;
      }
      .customer-public-activity-empty {
        grid-column: 1 / -1;
        border: 1px dashed rgba(0,27,71,.12);
        border-radius: 12px;
        background: rgba(255,255,255,.72);
        color: #667085;
        padding: 22px 14px;
        text-align: center;
        font-size: 13px;
        line-height: 1.4;
        font-weight: 620;
      }
      .customer-public-activity-arrow {
        position: absolute;
        top: 50%;
        z-index: 2;
        width: 34px;
        height: 34px;
        border: 0;
        border-radius: 999px;
        background: rgba(255,255,255,.96);
        color: var(--emy-navy);
        cursor: pointer;
        display: grid;
        place-items: center;
        box-shadow: 0 10px 22px rgba(0,27,71,.16);
        transform: translateY(-50%);
      }
      .customer-public-activity-arrow svg {
        width: 18px;
        height: 18px;
        stroke: currentColor;
        stroke-width: 2.6;
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .customer-public-activity-arrow.is-prev { left: 12px; }
      .customer-public-activity-arrow.is-next { right: 12px; }
      .customer-public-activity-arrow[hidden] { display: none; }
      .customer-public-activity-track > .customer-public-activity-item {
        scroll-snap-align: start;
        min-width: 0;
      }
      .customer-public-activity-track .customer-public-activity-item.feed-card,
      .customer-public-activity-track .customer-public-activity-item.card {
        position: relative;
        overflow: hidden;
        border: 1px solid rgba(0,27,71,.09);
        border-radius: 8px;
        background: rgba(255,255,255,.98);
        color: var(--emy-navy);
        box-shadow: 0 8px 22px rgba(0,27,71,.055);
      }
      .customer-public-activity-track .customer-public-activity-item.is-menu-open {
        z-index: 40;
        overflow: visible;
      }
      .customer-public-activity-track .social-feed-head {
        min-height: 54px;
        display: grid;
        grid-template-columns: minmax(0,1fr) auto;
        gap: 8px;
        align-items: center;
        border-bottom: 1px solid rgba(0,27,71,.06);
        padding: 9px 11px;
        background: linear-gradient(180deg,#fff,rgba(255,250,246,.92));
      }
      .customer-public-activity-track .social-feed-avatar,
      .customer-public-activity-track .feed-avatar {
        width: 36px;
        height: 36px;
        display: grid;
        place-items: center;
        overflow: hidden;
        border-radius: 999px;
        background: #f3f6fb;
        color: var(--emy-orange);
        text-decoration: none;
        font-size: 12px;
        font-weight: 860;
        box-shadow: inset 0 0 0 1px rgba(0,27,71,.07);
      }
      .customer-public-activity-track .social-feed-avatar img,
      .customer-public-activity-track .feed-avatar img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
      }
      .customer-public-activity-track .social-feed-name,
      .customer-public-activity-track .feed-profile-link {
        min-width: 0;
        display: block;
        color: inherit;
        text-decoration: none;
      }
      .customer-public-activity-track .social-feed-name strong,
      .customer-public-activity-track .social-feed-name small,
      .customer-public-activity-track .reel-owner-link strong,
      .customer-public-activity-track .reel-owner-link small {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .customer-public-activity-track .social-feed-name strong {
        color: var(--emy-navy);
        font-size: 13px;
        line-height: 1.12;
        font-weight: 850;
      }
      .customer-public-activity-track .social-feed-name small {
        margin-top: 3px;
        color: #69758d;
        font-size: 10.5px;
        line-height: 1.1;
        font-weight: 680;
      }
      .customer-public-activity-track .social-feed-more {
        justify-self: end;
        width: 34px;
        min-width: 34px;
        height: 34px;
        min-height: 34px;
        border: 0;
        border-radius: 999px;
        background: transparent;
        color: #071326;
        cursor: pointer;
        display: grid;
        place-items: center;
        padding: 0;
        font: inherit;
        font-size: 18px;
        line-height: 1;
      }
      .customer-public-activity-track .social-feed-more:hover,
      .customer-public-activity-track .social-feed-more[aria-expanded="true"] {
        background: #fff4e8;
        color: var(--emy-orange);
      }
      .customer-public-activity-track .customer-public-options-menu {
        position: absolute;
        top: 52px;
        right: 10px;
        z-index: 12;
        width: min(218px, calc(100% - 20px));
        overflow: hidden;
        border: 1px solid rgba(0,27,71,.10);
        border-radius: 10px;
        background: #fff;
        box-shadow: 0 18px 36px rgba(0,27,71,.16);
      }
      .customer-public-activity-track .customer-public-options-menu[hidden] { display: none; }
      .customer-public-activity-track .customer-public-options-menu button {
        width: 100%;
        min-height: 36px;
        border: 0;
        border-bottom: 1px solid rgba(0,27,71,.06);
        background: #fff;
        color: #344054;
        cursor: pointer;
        padding: 0 12px;
        text-align: left;
        font: inherit;
        font-size: 12px;
        line-height: 1;
        font-weight: 700;
      }
      .customer-public-activity-track .customer-public-options-menu button:last-child { border-bottom: 0; }
      .customer-public-activity-track .customer-public-options-menu button:hover { background: #fff8f1; color: var(--emy-orange); }
      .customer-public-activity-track .customer-public-options-menu .is-danger { color: #b42318; }
      .customer-public-activity-track .feed-media,
      .customer-public-activity-track .social-feed-media,
      .customer-public-activity-track .photo,
      .customer-public-activity-track .feed-article-card-cover {
        position: relative;
        overflow: hidden;
        background: linear-gradient(135deg,#eef3f8,#fff8ef);
      }
      .customer-public-activity-track .feed-media img,
      .customer-public-activity-track .feed-media video,
      .customer-public-activity-track .social-feed-media img,
      .customer-public-activity-track .social-feed-media video,
      .customer-public-activity-track .photo img,
      .customer-public-activity-track .photo video,
      .customer-public-activity-track .feed-article-card-cover img,
      .customer-public-activity-track .feed-article-card-cover video {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
      }
      .customer-public-activity-track .customer-public-card-placeholder {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        color: #496180;
        font-size: 28px;
        line-height: 1;
        font-weight: 850;
      }
      .customer-public-activity-track .feed-product-card {
        min-height: 420px;
        display: flex;
        flex-direction: column;
      }
      .customer-public-activity-track .feed-product-card.is-new::before,
      .customer-public-activity-track .feed-product-card[data-product-new="true"]::before {
        content: "New";
        position: absolute;
        left: 18px;
        top: 18px;
        z-index: 4;
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
      .customer-public-activity-track .feed-product-card .photo {
        height: 184px;
        min-height: 184px;
        margin: 10px 10px 0;
        border-radius: 7px;
      }
      .customer-public-activity-track .feed-product-card .social-feed-more,
      .customer-public-activity-track .feed-clip-card .social-feed-more,
      .customer-public-activity-track .feed-product-clip-card .social-feed-more {
        position: absolute;
        right: 16px;
        top: 16px;
        z-index: 8;
        width: 42px;
        min-width: 42px;
        height: 42px;
        min-height: 42px;
        border: 1px solid rgba(255,255,255,.72);
        background: rgba(255,255,255,.82);
        box-shadow: 0 14px 28px rgba(0,27,71,.12), inset 0 1px 0 rgba(255,255,255,.88);
        backdrop-filter: blur(12px) saturate(1.08);
      }
      .customer-public-activity-track .feed-product-card .body {
        flex: 1 1 auto;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 7px;
        padding: 20px 15px 14px;
      }
      .customer-public-activity-track .feed-product-card h3 {
        display: -webkit-box;
        min-height: 42px;
        overflow: hidden;
        margin: 0;
        color: #071326;
        font-size: 18px;
        line-height: 1.18;
        font-weight: 850;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .customer-public-activity-track .feed-product-card p {
        display: -webkit-box;
        overflow: hidden;
        margin: 0;
        color: #68738a;
        font-size: 13px;
        line-height: 1.35;
        font-weight: 650;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .customer-public-activity-track .product-source,
      .customer-public-activity-track .product-availability,
      .customer-public-activity-track .product-stats {
        color: #68738a;
        font-size: 11.5px;
        line-height: 1.1;
        font-weight: 740;
      }
      .customer-public-activity-track .product-source,
      .customer-public-activity-track .product-availability {
        max-width: 100%;
        min-height: 24px;
        display: inline-flex;
        align-items: flex-start;
        border-radius: 999px;
        background: #f3f6fb;
        padding: 6px 10px;
        white-space: normal;
        overflow-wrap: anywhere;
      }
      .customer-public-activity-track .product-stats {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .customer-public-activity-track .product-stats { display: none !important; }
      .customer-public-activity-track .price {
        width: fit-content;
        min-width: 86px;
        min-height: 32px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-top: auto;
        border-radius: 999px;
        background: #fff4e8;
        color: #d85a00;
        padding: 0 13px;
        font-size: 16px;
        line-height: 1;
        font-weight: 900;
      }
      .customer-public-activity-track .feed-clip-card,
      .customer-public-activity-track .feed-product-clip-card {
        min-height: 432px;
        display: flex;
        flex-direction: column;
        background: linear-gradient(180deg,#c7d0d8 0%,#aab4bd 42%,#52627a 70%,#061f4b 100%);
      }
      .customer-public-activity-track .feed-clip-card .photo,
      .customer-public-activity-track .feed-product-clip-card .photo {
        height: 318px;
        min-height: 318px;
        margin: 0;
        border-radius: 8px 8px 0 0;
        background: linear-gradient(180deg,#cbd5dd 0%,#aeb8c0 42%,#56677f 70%,#061f4b 100%);
      }
      .customer-public-activity-track .reel-top {
        position: absolute;
        top: 14px;
        left: 14px;
        right: 64px;
        z-index: 4;
        display: grid;
        grid-template-columns: 36px minmax(0,1fr) auto;
        gap: 9px;
        align-items: center;
      }
      .customer-public-activity-track .reel-avatar {
        width: 36px;
        height: 36px;
        border-radius: 999px;
        background: rgba(255,255,255,.86);
        box-shadow: 0 10px 20px rgba(0,27,71,.22);
      }
      .customer-public-activity-track .reel-owner-link { color: #fff; text-decoration: none; }
      .customer-public-activity-track .reel-owner-link strong {
        color: #fff;
        font-size: 13px;
        line-height: 1.05;
        font-weight: 850;
        text-shadow: 0 2px 8px rgba(0,27,71,.20);
      }
      .customer-public-activity-track .reel-owner-link small {
        margin-top: 3px;
        color: rgba(255,255,255,.86);
        font-size: 11px;
        line-height: 1.05;
        font-weight: 720;
      }
      .customer-public-activity-track .reel-type-badge {
        min-height: 26px;
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        background: rgba(255,255,255,.92);
        color: #061f4b;
        padding: 0 11px;
        font-size: 11px;
        line-height: 1;
        font-weight: 850;
      }
      .customer-public-activity-track .reel-play {
        position: absolute;
        left: 50%;
        top: 37%;
        z-index: 4;
        width: 58px;
        height: 58px;
        display: grid;
        place-items: center;
        border-radius: 999px;
        background: rgba(255,255,255,.94);
        color: #061f4b;
        box-shadow: 0 18px 36px rgba(0,27,71,.24), inset 0 1px 0 rgba(255,255,255,.86);
        transform: translate(-50%,-50%);
      }
      .customer-public-activity-track .reel-play svg {
        width: 28px;
        height: 28px;
        fill: currentColor;
      }
      .customer-public-activity-track .caption {
        position: relative;
        z-index: 3;
        min-height: 118px;
        display: grid;
        gap: 7px;
        margin-top: -118px;
        padding: 36px 14px 12px;
        background: linear-gradient(180deg, transparent 0%, rgba(0,27,71,.54) 24%, rgba(0,27,71,.92) 100%);
        color: #fff;
      }
      .customer-public-activity-track .caption strong,
      .customer-public-activity-track .caption > span {
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
      }
      .customer-public-activity-track .caption strong {
        font-size: 18px;
        line-height: 1.12;
        font-weight: 900;
        -webkit-line-clamp: 2;
      }
      .customer-public-activity-track .caption > span {
        color: rgba(255,255,255,.88);
        font-size: 12.5px;
        line-height: 1.2;
        font-weight: 720;
        -webkit-line-clamp: 2;
      }
      .customer-public-activity-track .reel-actions,
      .customer-public-activity-track .product-clip-panel {
        color: rgba(255,255,255,.90);
        font-size: 12px;
        font-weight: 800;
      }
      .customer-public-activity-track .product-clip-panel {
        display: grid;
        gap: 4px;
        border-radius: 8px;
        background: rgba(255,255,255,.14);
        padding: 8px;
      }
      .customer-public-activity-track .product-clip-price {
        width: fit-content;
        border-radius: 999px;
        background: #fff;
        color: #d85a00;
        padding: 5px 9px;
        font-style: normal;
        font-weight: 900;
      }
      .customer-public-activity-track .social-feed-text-panel {
        min-height: 158px;
        display: grid;
        align-items: end;
        background: linear-gradient(135deg,#f8fbff,#fff8ef);
        padding: 18px;
      }
      .customer-public-activity-track .social-feed-text-panel p,
      .customer-public-activity-track .social-feed-caption {
        margin: 0;
        color: #26364f;
        font-size: 13px;
        line-height: 1.38;
        font-weight: 560;
        overflow-wrap: anywhere;
      }
      .customer-public-activity-track .social-feed-caption {
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .customer-public-activity-track .social-feed-card.is-repost .social-feed-caption {
        display: block;
        grid-column: 1 / -1;
        min-width: 0;
        overflow: visible;
        margin: 0 0 2px;
        color: #344054;
        font-size: 12.2px;
        line-height: 1.35;
        font-weight: 520;
        -webkit-line-clamp: initial;
      }
      .customer-public-activity-track .social-feed-caption strong { margin-right: 4px; color: var(--emy-navy); font-weight: 850; }
      .customer-public-activity-track .feed-media.social-feed-media {
        min-height: 184px;
      }
      .customer-public-activity-track .post-badge,
      .customer-public-activity-track .feed-event-post-hero span,
      .customer-public-activity-track .feed-article-card-body > span,
      .customer-public-activity-track .feed-job-hero span {
        width: fit-content;
        min-height: 23px;
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        background: #fff4e8;
        color: #d85a00;
        padding: 0 9px;
        font-size: 10px;
        line-height: 1;
        font-weight: 850;
      }
      .customer-public-activity-track .post-badge {
        position: absolute;
        left: 10px;
        top: 10px;
        z-index: 2;
      }
      .customer-public-activity-track .feed-article-card-body,
      .customer-public-activity-track .feed-event-post,
      .customer-public-activity-track .feed-job-card {
        margin: 10px;
        overflow: hidden;
        border: 1px solid rgba(0,27,71,.075);
        border-radius: 10px;
        background: #fff;
        box-shadow: none;
      }
      .customer-public-activity-track .feed-article-card-body {
        display: grid;
        gap: 9px;
        background: linear-gradient(180deg,#fff,#fffaf5);
        padding: 14px;
      }
      .customer-public-activity-track .feed-article-card-cover {
        height: 118px;
        border-radius: 8px;
      }
      .customer-public-activity-track .feed-article-card-body h2,
      .customer-public-activity-track .feed-event-post-hero strong,
      .customer-public-activity-track .feed-job-hero strong {
        display: -webkit-box;
        overflow: hidden;
        margin: 0;
        color: var(--emy-navy);
        font-size: 18px;
        line-height: 1.14;
        font-weight: 850;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .customer-public-activity-track .feed-article-card-body p,
      .customer-public-activity-track .feed-event-post-details p,
      .customer-public-activity-track .feed-job-desc {
        display: -webkit-box;
        overflow: hidden;
        margin: 0;
        color: #526078;
        font-size: 12.5px;
        line-height: 1.35;
        font-weight: 600;
        overflow-wrap: anywhere;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
      }
      .customer-public-activity-track .feed-article-card-meta,
      .customer-public-activity-track .feed-event-post-meta,
      .customer-public-activity-track .feed-job-meta {
        display: grid;
        grid-template-columns: repeat(2,minmax(0,1fr));
        gap: 7px;
      }
      .customer-public-activity-track .feed-article-card-meta small,
      .customer-public-activity-track .feed-event-post-meta span,
      .customer-public-activity-track .feed-job-meta span {
        min-width: 0;
        border-radius: 8px;
        background: #f7f9fc;
        color: #5f6c84;
        padding: 7px 9px;
        font-size: 10.5px;
        line-height: 1.22;
        font-weight: 760;
      }
      .customer-public-activity-track .feed-event-post-hero,
      .customer-public-activity-track .feed-job-hero {
        position: relative;
        min-height: 118px;
        display: grid;
        align-content: end;
        gap: 6px;
        overflow: hidden;
        background: linear-gradient(135deg,#fffaf5,#eef3f8);
        padding: 14px;
      }
      .customer-public-activity-track .feed-event-post.has-cover .feed-event-post-hero,
      .customer-public-activity-track .feed-job-card.has-cover .feed-job-hero {
        min-height: 158px;
        background: #061f4b;
      }
      .customer-public-activity-track .feed-event-card-cover-image,
      .customer-public-activity-track .feed-job-cover-media {
        position: absolute;
        inset: 0;
        z-index: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .customer-public-activity-track .feed-event-post.has-cover .feed-event-post-hero::after,
      .customer-public-activity-track .feed-job-card.has-cover .feed-job-hero::after {
        content: "";
        position: absolute;
        inset: 0;
        z-index: 1;
        background: linear-gradient(180deg,rgba(0,27,71,.04) 0%,rgba(0,27,71,.18) 45%,rgba(0,27,71,.70) 100%);
      }
      .customer-public-activity-track .feed-event-post-hero span,
      .customer-public-activity-track .feed-event-post-hero strong,
      .customer-public-activity-track .feed-job-hero span,
      .customer-public-activity-track .feed-job-hero strong {
        position: relative;
        z-index: 2;
      }
      .customer-public-activity-track .feed-event-post.has-cover .feed-event-post-hero span,
      .customer-public-activity-track .feed-event-post.has-cover .feed-event-post-hero strong,
      .customer-public-activity-track .feed-job-card.has-cover .feed-job-hero span,
      .customer-public-activity-track .feed-job-card.has-cover .feed-job-hero strong {
        color: #fff;
        text-shadow: 0 1px 14px rgba(0,27,71,.48);
      }
      .customer-public-activity-track .feed-event-post-details,
      .customer-public-activity-track .feed-job-body {
        display: grid;
        gap: 8px;
        padding: 10px 12px 12px;
      }
      .customer-public-activity-track .feed-job-business {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        color: #526078;
        font-size: 12px;
        font-weight: 820;
      }
      .customer-public-activity-track .feed-job-business i {
        width: 26px;
        height: 26px;
        display: grid;
        place-items: center;
        overflow: hidden;
        border-radius: 999px;
        background: #f3f6fb;
        color: var(--emy-orange);
        font-style: normal;
      }
      .customer-public-activity-track .feed-job-business img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .customer-public-activity-track .feed-job-actions {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 7px;
      }
      .customer-public-activity-track .feed-job-actions button {
        min-height: 30px;
        display: inline-flex;
        align-items: center;
        gap: 5px;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 999px;
        background: #fff;
        color: #26364f;
        cursor: pointer;
        padding: 0 10px;
        font: inherit;
        font-size: 11px;
        font-weight: 800;
      }
      .customer-public-activity-track .feed-job-actions svg {
        width: 14px;
        height: 14px;
        stroke: currentColor;
        fill: none;
      }
      .customer-public-activity-track .feed-job-count {
        color: #68738a;
        font-size: 11px;
        font-weight: 780;
      }
      .customer-public-activity-track .social-feed-repost-note {
        display: block !important;
        grid-column: 1 / -1;
        border-bottom: 0;
        background: transparent;
        color: #667085;
        margin: 7px 10px 2px;
        padding: 0;
        font-size: 11px;
        line-height: 1.25;
        font-weight: 720;
      }
      .customer-public-activity-track .social-feed-quote {
        grid-column: 1 / -1;
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        align-items: stretch;
        gap: 8px;
        width: 100%;
        margin: 2px 0 0;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 10px;
        background: #f8fafc;
        color: inherit;
        cursor: pointer;
        padding: 10px;
        text-decoration: none;
        box-sizing: border-box;
      }
      .customer-public-activity-track .social-feed-quote-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        min-width: 0;
        color: #667085;
        font-size: 10.8px;
        line-height: 1.2;
        font-weight: 760;
      }
      .customer-public-activity-track .social-feed-quote-head strong {
        display: block;
        min-width: 0;
        overflow: hidden;
        color: var(--emy-navy);
        font-size: 12px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .customer-public-activity-track .social-feed-quote-head span {
        flex: 0 0 auto;
        max-width: 42%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .customer-public-activity-track .social-feed-quote-body {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        align-items: start;
        gap: 9px;
        min-width: 0;
      }
      .customer-public-activity-track .social-feed-quote-copy {
        min-width: 0;
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 4px;
      }
      .customer-public-activity-track .social-feed-quote-title {
        display: -webkit-box;
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
      .customer-public-activity-track .social-feed-quote-text {
        display: -webkit-box;
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
      .customer-public-activity-track .social-feed-quote-price {
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
      .customer-public-activity-track .social-feed-quote-media {
        width: 84px;
        height: 70px;
        overflow: hidden;
        border-radius: 7px;
        background: linear-gradient(135deg,#fffaf5,#e8eef6);
        box-shadow: inset 0 0 0 1px rgba(0,27,71,.08);
      }
      .customer-public-activity-track .social-feed-actions {
        display: grid;
        grid-template-columns: minmax(0,1fr) auto;
        align-items: start;
        gap: 4px;
        margin: 1px 6px 0;
        border-top: 1px solid rgba(0,27,71,.07);
        border-bottom: 0;
        padding: 4px 0 0;
      }
      .customer-public-activity-track .social-feed-action-set,
      .customer-public-activity-track .social-feed-action-pair {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        min-width: 0;
      }
      .customer-public-activity-track .social-feed-action-set { flex-wrap: wrap; }
      .customer-public-activity-track .social-feed-action-pair strong {
        min-width: 7px;
        color: #647089;
        font-size: 12.5px;
        line-height: 1;
        font-weight: 560;
      }
      .customer-public-activity-track .social-feed-icon {
        width: 25px;
        min-width: 25px;
        height: 24px;
        min-height: 24px;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 7px;
        background: transparent;
        color: #26364f;
        cursor: pointer;
        display: inline-grid;
        place-items: center;
        padding: 0;
      }
      .customer-public-activity-track .social-feed-icon:hover,
      .customer-public-activity-track .social-feed-icon.is-active {
        background: #fff4e8;
        color: var(--emy-orange);
      }
      .customer-public-activity-track .social-feed-icon svg {
        width: 13px;
        height: 13px;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .customer-public-activity-track .social-feed-body {
        display: grid;
        grid-template-columns: auto minmax(0,1fr) auto;
        align-items: center;
        gap: 4px;
        padding: 4px 10px 10px;
      }
      .customer-public-activity-track .social-feed-body-counted {
        grid-template-columns: auto minmax(0,1fr) auto;
      }
      .customer-public-activity-track .social-feed-hidden-stat {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        white-space: nowrap;
        color: #647089;
        font-size: 11.5px;
        line-height: 1.2;
        font-weight: 780;
      }
      .customer-public-activity-track .social-feed-comments-link {
        margin: 0;
        border: 0;
        border-radius: 999px;
        background: #fff4e8;
        color: var(--emy-orange);
        cursor: pointer;
        padding: 4px 8px;
        font: inherit;
        font-size: 10.5px;
        line-height: 1.1;
        font-weight: 780;
        white-space: nowrap;
      }
      .customer-public-activity-track .customer-public-activity-item:not(.is-comments-open) .social-feed-body-counted .social-feed-comments-link {
        display: none;
      }
      .customer-public-activity-track .customer-public-activity-item:not(.is-comments-open) .social-feed-body-counted .social-feed-time {
        grid-column: 3;
      }
      .customer-public-activity-track .social-feed-time {
        justify-self: end;
        color: #98a2b3;
        font-size: 10px;
        line-height: 1.15;
        font-weight: 660;
        white-space: nowrap;
      }
      .customer-public-activity-track .feed-comments {
        display: none;
        margin: 0;
        border-top: 1px solid rgba(0,27,71,.07);
        background: #fff;
        padding: 10px 12px 12px;
      }
      .customer-public-activity-track .customer-public-activity-item.is-comments-open .feed-comments { display: block; }
      .customer-public-activity-track .feed-comment {
        display: grid;
        grid-template-columns: 30px minmax(0,1fr);
        align-items: start;
        gap: 8px;
        margin-top: 9px;
      }
      .customer-public-activity-track .feed-comment-avatar {
        width: 30px;
        height: 30px;
        display: grid;
        place-items: center;
        overflow: hidden;
        border-radius: 999px;
        background: #eef3f8;
        color: var(--emy-navy);
        font-size: 10px;
        font-weight: 820;
      }
      .customer-public-activity-track .feed-comment-bubble {
        min-width: 0;
        border-radius: 14px;
        background: #f6f8fb;
        color: #364157;
        padding: 8px 10px;
        font-size: 12px;
        line-height: 1.35;
        font-weight: 520;
        overflow-wrap: anywhere;
      }
      .customer-public-activity-track .feed-comment-bubble strong {
        display: block;
        margin-bottom: 2px;
        color: var(--emy-navy);
        font-size: 11.5px;
        line-height: 1.2;
        font-weight: 830;
      }
      .customer-public-activity-track .feed-comment-form {
        display: grid;
        grid-template-columns: minmax(0,1fr) auto;
        align-items: center;
        gap: 8px;
        margin-top: 10px;
      }
      .customer-public-activity-track .feed-comment-form input {
        min-width: 0;
        height: 34px;
        border: 1px solid rgba(0,27,71,.10);
        border-radius: 999px;
        background: #fff;
        color: #071326;
        outline: none;
        padding: 0 12px;
        font: inherit;
        font-size: 12px;
        font-weight: 560;
      }
      .customer-public-activity-track .feed-comment-form button {
        min-height: 34px;
        border: 0;
        border-radius: 999px;
        background: var(--emy-orange);
        color: #fff;
        cursor: pointer;
        padding: 0 12px;
        font: inherit;
        font-size: 11.5px;
        line-height: 1;
        font-weight: 820;
        white-space: nowrap;
      }
      .profile-customer-relationship-card {
        position: relative;
        overflow: visible;
        border: 0;
        border-radius: 0;
        background: transparent;
        box-shadow: none;
        padding: 0;
      }
      .profile-customer-relationship-card::before {
        content: none;
        display: none;
      }
      .profile-customer-relationship-card::after {
        content: none;
        display: none;
      }
      .profile-public-preview .profile-customer-relationship-card {
        border: 0;
        border-radius: 0;
        overflow: visible;
        background: transparent;
        box-shadow: none;
        padding: 0;
      }
      .profile-customer-relationship-card .profile-business-preview-card-head {
        grid-template-columns: 34px minmax(0,1fr);
        gap: 10px;
        margin-bottom: 0;
      }
      .profile-customer-relationship-card .profile-business-preview-card-icon {
        width: 34px;
        height: 34px;
        border-radius: 13px;
        background: #fff4e8;
        box-shadow: inset 0 0 0 1px rgba(255,106,0,.12), 0 8px 16px rgba(255,106,0,.09);
      }
      .profile-customer-relationship-card .profile-business-preview-card-icon svg {
        width: 17px;
        height: 17px;
      }
      .profile-customer-relationship-card .profile-business-preview-card-title strong {
        font-size: 13px;
        line-height: 1.18;
      }
      .profile-customer-relationship-card .profile-business-preview-card-title span {
        font-size: 11px;
        line-height: 1.25;
        font-weight: 560;
      }
      .profile-customer-relationship-grid {
        position: relative;
        z-index: 1;
        width: min(100%, 240px);
        display: grid;
        grid-template-columns: minmax(170px, 186px);
        gap: 8px;
        align-items: center;
        margin: 8px 0 0 54px;
      }
      .profile-customer-relationship-card .profile-customer-status {
        display: none;
      }
      .profile-customer-status,
      .profile-customer-stat {
        position: relative;
        min-width: 0;
        min-height: 58px;
        overflow: hidden;
        border: 1px solid rgba(0,27,71,.075);
        border-radius: 11px;
        background:
          linear-gradient(180deg,rgba(255,255,255,.90),rgba(255,255,255,.76));
        padding: 8px 11px;
        box-shadow:
          0 7px 16px rgba(0,27,71,.035),
          inset 0 1px 0 rgba(255,255,255,.88);
      }
      .profile-customer-relationship-card .profile-customer-stat {
        width: 186px;
        min-height: 70px;
        padding: 10px 13px;
      }
      .profile-customer-status::before,
      .profile-customer-stat::before {
        content: "";
        position: absolute;
        inset: 1px 1px auto;
        height: 48%;
        border-radius: 10px 10px 16px 16px;
        background: linear-gradient(180deg,rgba(255,255,255,.78),rgba(255,255,255,0));
        pointer-events: none;
      }
      .profile-customer-status::after,
      .profile-customer-stat::after {
        content: none;
        display: none;
      }
      .profile-customer-status span,
      .profile-customer-stat span,
      .profile-customer-products-head span {
        position: relative;
        z-index: 1;
        display: block;
        color: #667085;
        font-size: 9.2px;
        line-height: 1.2;
        font-weight: 820;
        text-transform: uppercase;
      }
      .profile-customer-status strong,
      .profile-customer-stat strong {
        position: relative;
        z-index: 1;
        display: block;
        max-width: 100%;
        margin-top: 4px;
        color: var(--emy-navy);
        font-size: 13.5px;
        line-height: 1.18;
        font-weight: 880;
        overflow-wrap: anywhere;
      }
      .profile-customer-stat .profile-customer-stat-label {
        display: flex;
        align-items: center;
        gap: 7px;
      }
      .profile-customer-stat .profile-customer-business-mark {
        flex: 0 0 auto;
        width: 26px;
        height: 26px;
        display: grid;
        place-items: center;
        border-radius: 9px;
        background:
          radial-gradient(circle at 32% 22%, rgba(255,255,255,.38), transparent 42%),
          linear-gradient(145deg,#ff8a2b,#f76512 54%,#e95a00);
        color: #fff;
        text-transform: none;
        box-shadow:
          inset 0 1px 0 rgba(255,255,255,.32),
          inset 0 -1px 0 rgba(120,43,0,.16),
          0 8px 15px rgba(255,106,0,.16);
      }
      .profile-customer-stat .profile-customer-business-mark svg {
        width: 18px;
        height: 18px;
        stroke: currentColor;
        stroke-width: 1.7;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .profile-customer-stat .profile-customer-stat-text {
        min-width: 0;
        overflow: hidden;
        color: #667085;
        font-size: 9.2px;
        line-height: 1.2;
        font-weight: 820;
        text-transform: uppercase;
        text-overflow: ellipsis;
      }
      .profile-customer-status small {
        position: relative;
        z-index: 1;
        display: block;
        margin-top: 4px;
        color: #667085;
        font-size: 10px;
        line-height: 1.25;
        font-weight: 700;
      }
      .profile-customer-chat {
        position: relative;
        overflow: hidden;
        width: 100%;
        min-height: 40px;
        border: 1px solid rgba(172,67,0,.30);
        border-radius: 999px;
        background: linear-gradient(180deg,#ff7a1f 0%,#ff6500 100%);
        color: #fff;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
        gap: 7px;
        padding: 0 13px;
        text-decoration: none;
        font-size: 12px;
        line-height: 1;
        font-weight: 880;
        box-shadow:
          0 8px 16px rgba(255,106,0,.13),
          0 1px 0 rgba(166,59,0,.28),
          inset 0 1px 0 rgba(255,255,255,.35),
          inset 0 -6px 12px rgba(125,45,0,.10);
        white-space: nowrap;
        transform: translateY(0);
        transition: transform .16s ease, box-shadow .16s ease;
      }
      .profile-customer-chat::before {
        content: "";
        position: absolute;
        inset: 1px 1px auto;
        height: 38%;
        border-radius: 999px;
        background: linear-gradient(180deg,rgba(255,255,255,.28),rgba(255,255,255,0));
        pointer-events: none;
      }
      .profile-customer-chat:hover,
      .profile-customer-chat:focus-visible {
        outline: none;
        transform: translateY(-1px);
        box-shadow:
          0 10px 18px rgba(255,106,0,.16),
          0 1px 0 rgba(166,59,0,.30),
          inset 0 1px 0 rgba(255,255,255,.35),
          inset 0 -6px 12px rgba(125,45,0,.11);
      }
      .profile-customer-chat svg {
        position: relative;
        z-index: 1;
        width: 15px;
        height: 15px;
        stroke: currentColor;
        stroke-width: 2.2;
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .profile-customer-businesses {
        position: relative;
        z-index: 1;
        min-width: 0;
        overflow: hidden;
        margin: 28px 0 0;
      }
      .profile-customer-businesses-head {
        display: flex;
        align-items: end;
        justify-content: space-between;
        gap: 10px;
        padding: 0 0 8px;
      }
      .profile-customer-businesses-head strong {
        color: var(--emy-navy);
        font-size: 13px;
        line-height: 1.15;
        font-weight: 850;
      }
      .profile-customer-businesses-head span {
        color: #667085;
        font-size: 10.5px;
        line-height: 1.2;
        font-weight: 820;
        text-transform: uppercase;
      }
      .profile-customer-business-strip {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: minmax(260px, 330px);
        gap: 10px;
        min-width: 0;
        overflow-x: auto;
        overscroll-behavior-x: contain;
        padding: 0 42px 12px;
        scrollbar-width: none;
        scroll-snap-type: x proximity;
        scroll-behavior: smooth;
      }
      .profile-customer-business-strip::-webkit-scrollbar {
        display: none;
      }
      .profile-customer-business-card {
        position: relative;
        min-width: 0;
        min-height: 154px;
        display: grid;
        grid-template-columns: 48px minmax(0,1fr);
        grid-template-rows: auto auto auto;
        gap: 8px 10px;
        align-items: start;
        scroll-snap-align: start;
        border: 1px solid rgba(0,27,71,.10);
        border-radius: 14px;
        background:
          linear-gradient(180deg,rgba(255,255,255,.98),rgba(247,250,253,.96));
        color: inherit;
        padding: 12px;
        text-decoration: none;
        box-shadow:
          0 10px 22px rgba(0,27,71,.055),
          inset 0 1px 0 rgba(255,255,255,.95),
          inset 0 -10px 18px rgba(0,27,71,.022);
        transition: transform .16s ease, border-color .16s ease, box-shadow .16s ease;
      }
      .profile-customer-business-card::before {
        content: "";
        position: absolute;
        inset: 1px;
        border-radius: 13px;
        background: linear-gradient(135deg,rgba(255,255,255,.72),rgba(255,255,255,0) 44%);
        pointer-events: none;
      }
      .profile-customer-business-card::after {
        content: "";
        position: absolute;
        left: 18px;
        right: 18px;
        bottom: -6px;
        z-index: -1;
        height: 12px;
        border-radius: 999px;
        background: rgba(0,27,71,.075);
        filter: blur(11px);
        pointer-events: none;
      }
      .profile-customer-business-card > * {
        position: relative;
        z-index: 1;
      }
      .profile-customer-business-card:hover,
      .profile-customer-business-card:focus-visible {
        outline: none;
        transform: translateY(-1px);
        border-color: rgba(0,27,71,.16);
        box-shadow:
          0 13px 26px rgba(0,27,71,.07),
          inset 0 1px 0 rgba(255,255,255,.96),
          inset 0 -10px 18px rgba(0,27,71,.022);
      }
      .profile-customer-business-avatar {
        grid-row: 1 / span 2;
        width: 48px;
        height: 48px;
        display: grid;
        place-items: center;
        overflow: hidden;
        border-radius: 999px;
        background: linear-gradient(145deg,#f7f9fc,#fff7ef);
        color: var(--emy-orange);
        font-size: 15px;
        font-weight: 900;
        box-shadow:
          0 7px 14px rgba(0,27,71,.05),
          inset 0 1px 0 rgba(255,255,255,.90),
          inset 0 -10px 16px rgba(0,27,71,.035);
      }
      .profile-customer-business-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
      .profile-customer-business-copy {
        min-width: 0;
        display: grid;
        gap: 4px;
        padding-right: 62px;
      }
      .profile-customer-business-copy strong {
        color: var(--emy-navy);
        font-size: 13.5px;
        line-height: 1.18;
        font-weight: 860;
        overflow-wrap: anywhere;
        text-decoration: none;
        text-underline-offset: 3px;
      }
      .profile-customer-business-card:hover .profile-customer-business-copy strong,
      .profile-customer-business-card:focus-visible .profile-customer-business-copy strong {
        color: var(--emy-orange);
        text-decoration: underline;
      }
      .profile-customer-business-copy span {
        color: #667085;
        font-size: 10.5px;
        line-height: 1.25;
        font-weight: 680;
        overflow-wrap: anywhere;
      }
      .profile-customer-business-tags {
        min-width: 0;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 5px;
      }
      .profile-customer-business-copy .profile-customer-business-tag {
        min-height: 21px;
        max-width: 100%;
        display: inline-flex;
        align-items: center;
        overflow: hidden;
        border-radius: 999px;
        background: linear-gradient(180deg,#f8fafc,#fff);
        color: #526078;
        padding: 0 8px;
        font-size: 9.5px;
        line-height: 1;
        font-weight: 820;
        text-overflow: ellipsis;
        white-space: nowrap;
        box-shadow:
          inset 0 0 0 1px rgba(0,27,71,.065),
          0 5px 10px rgba(0,27,71,.028);
      }
      .profile-customer-business-copy .profile-customer-business-tag.is-location {
        max-width: min(100%, 170px);
        background: linear-gradient(180deg,#fff7ef,#fff);
        color: #ad4b00;
        box-shadow:
          inset 0 0 0 1px rgba(255,106,0,.13),
          0 5px 10px rgba(255,106,0,.045);
      }
      .profile-customer-business-copy em {
        display: -webkit-box;
        overflow: hidden;
        color: #3f4d64;
        font-size: 11.2px;
        line-height: 1.3;
        font-style: normal;
        font-weight: 590;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .profile-customer-business-status {
        position: absolute;
        top: 12px;
        right: 12px;
        min-height: 24px;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        border-radius: 999px;
        border: 1px solid rgba(6,118,71,.13);
        background: linear-gradient(180deg,rgba(237,250,244,.98),rgba(224,243,234,.94));
        color: #067647;
        padding: 0 8px;
        font-size: 10px;
        line-height: 1;
        font-weight: 850;
        white-space: nowrap;
        box-shadow:
          0 8px 16px rgba(6,118,71,.08),
          inset 0 1px 0 rgba(255,255,255,.90);
      }
      .profile-customer-business-status::before {
        content: "";
        width: 6px;
        height: 6px;
        border-radius: 999px;
        background: currentColor;
        box-shadow: 0 0 0 3px rgba(6,118,71,.10);
      }
      .profile-customer-business-status.is-offline {
        border-color: rgba(102,112,133,.16);
        background: linear-gradient(180deg,rgba(246,247,249,.98),rgba(236,239,244,.94));
        color: #667085;
      }
      .profile-customer-business-status.is-offline::before {
        box-shadow: 0 0 0 3px rgba(102,112,133,.10);
      }
      .profile-customer-business-details {
        grid-column: 1 / -1;
        display: grid;
        grid-template-columns: repeat(2,minmax(0,1fr));
        gap: 6px;
        padding-top: 0;
      }
      .profile-customer-business-detail {
        min-width: 0;
        min-height: 36px;
        display: grid;
        align-content: center;
        gap: 3px;
        border: 1px solid rgba(0,27,71,.07);
        border-radius: 10px;
        background: rgba(255,255,255,.76);
        padding: 6px 8px;
        box-shadow:
          inset 0 1px 0 rgba(255,255,255,.86),
          0 8px 16px rgba(0,27,71,.035);
      }
      .profile-customer-business-detail b {
        color: #6a7488;
        font-size: 8.5px;
        line-height: 1;
        font-weight: 850;
        text-transform: uppercase;
      }
      .profile-customer-business-detail span {
        overflow: hidden;
        color: var(--emy-navy);
        font-size: 10.5px;
        line-height: 1.18;
        font-weight: 760;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .profile-customer-business-meta {
        grid-column: 1 / -1;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 6px;
        align-self: end;
        border-top: 1px solid rgba(0,27,71,.07);
        padding-top: 7px;
      }
      .profile-customer-business-meta span {
        min-height: 22px;
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        background: rgba(255,255,255,.86);
        color: #536178;
        padding: 0 8px;
        font-size: 10px;
        line-height: 1;
        font-weight: 780;
        box-shadow:
          inset 0 0 0 1px rgba(0,27,71,.07),
          0 5px 10px rgba(0,27,71,.035);
      }
      .profile-customer-business-meta span.is-accent {
        background: linear-gradient(180deg,#fff7ef,#fff);
        color: #c45300;
        box-shadow:
          inset 0 0 0 1px rgba(255,106,0,.14),
          0 6px 12px rgba(255,106,0,.06);
      }
      .profile-customer-business-meta span.is-action {
        margin-left: auto;
        background: linear-gradient(180deg,#f8fafc,#fff);
        color: var(--emy-navy);
      }
      .profile-customer-business-arrow {
        position: absolute;
        top: calc(50% + 16px);
        z-index: 3;
        width: 34px;
        height: 34px;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 999px;
        background: rgba(255,255,255,.96);
        color: var(--emy-navy);
        cursor: pointer;
        display: grid;
        place-items: center;
        box-shadow: 0 12px 24px rgba(0,27,71,.13);
        transform: translateY(-50%);
      }
      .profile-customer-business-arrow svg {
        width: 17px;
        height: 17px;
        stroke: currentColor;
        stroke-width: 2.5;
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .profile-customer-business-arrow.is-prev { left: 12px; }
      .profile-customer-business-arrow.is-next { right: 12px; }
      .profile-customer-business-arrow[hidden] { display: none; }
      .profile-customer-products {
        position: relative;
        z-index: 1;
        display: grid;
        gap: 10px;
        min-width: 0;
        overflow: visible;
        border: 1px solid rgba(0,27,71,.075);
        border-radius: 14px;
        background: rgba(255,255,255,.72);
        padding: 14px;
        box-shadow: inset 0 1px 0 rgba(255,255,255,.86);
      }
      .profile-customer-products-head {
        display: flex;
        align-items: end;
        justify-content: space-between;
        gap: 10px;
        padding-top: 2px;
      }
      .profile-customer-products-head strong {
        color: var(--emy-navy);
        font-size: 13px;
        line-height: 1.2;
        font-weight: 820;
      }
      .profile-customer-products-filter {
        display: flex;
        flex-wrap: wrap;
        gap: 7px;
        align-items: center;
      }
      .profile-customer-products-filter button {
        min-height: 32px;
        border: 1px solid rgba(0,27,71,.09);
        border-radius: 999px;
        background: #fff;
        color: #5f6f89;
        padding: 0 11px;
        font: inherit;
        font-size: 11.5px;
        line-height: 1;
        font-weight: 850;
        cursor: pointer;
        box-shadow: 0 8px 16px rgba(0,27,71,.04);
      }
      .profile-customer-products-filter button:hover,
      .profile-customer-products-filter button:focus-visible {
        border-color: rgba(255,116,28,.32);
        color: #c44900;
      }
      .profile-customer-products-filter button.is-active {
        border-color: rgba(255,116,28,.42);
        background: #fff2e8;
        color: #c44900;
        box-shadow: inset 0 0 0 1px rgba(255,116,28,.08);
      }
      .profile-customer-product-list {
        display: grid;
        grid-template-columns: repeat(auto-fit,minmax(226px,250px));
        justify-content: start;
        align-items: start;
        gap: 14px;
        min-width: 0;
        overflow: visible;
      }
      .profile-customer-product {
        min-width: 0;
        width: min(250px,100%);
        max-width: 250px;
        position: relative;
        display: flex;
        flex-direction: column;
        border: 1px solid rgba(0,27,71,.075);
        border-radius: 8px;
        background: #fff;
        overflow: hidden;
        box-shadow: 0 10px 26px rgba(0,27,71,.065);
      }
      .profile-customer-product.is-menu-open {
        z-index: 40;
        overflow: visible;
      }
      .profile-customer-product.is-new::before,
      .profile-customer-product[data-product-new="true"]::before {
        content: "New";
        position: absolute;
        left: 12px;
        top: 12px;
        z-index: 5;
        min-height: 20px;
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        background: rgba(255,255,255,.94);
        color: #d85a00;
        padding: 0 7px;
        font-size: 9px;
        line-height: 1;
        font-weight: 850;
        box-shadow: 0 7px 14px rgba(0,27,71,.08);
      }
      .profile-customer-product .photo {
        position: relative;
        width: auto;
        height: auto;
        min-height: 0;
        aspect-ratio: 4 / 3;
        margin: 8px 8px 0;
        border-radius: 7px;
        overflow: hidden;
        background: linear-gradient(145deg,#eef2f7,#f8fafc);
        color: #667085;
        font-size: 12px;
        font-weight: 900;
        text-transform: uppercase;
      }
      .profile-customer-product .photo img,
      .profile-customer-product .photo video {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        display: block;
      }
      .profile-customer-product .photo img[hidden],
      .profile-customer-product .photo video[hidden] { display: none; }
      .profile-customer-product-fallback {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
      }
      .profile-customer-product .social-feed-more {
        position: absolute;
        right: 11px;
        top: 11px;
        z-index: 6;
        width: 32px;
        min-width: 32px;
        height: 32px;
        min-height: 32px;
        border: 1px solid rgba(255,255,255,.72);
        border-radius: 999px;
        background: rgba(255,255,255,.82);
        color: #59667f;
        cursor: pointer;
        display: grid;
        place-items: center;
        padding: 0;
        font: inherit;
        font-size: 16px;
        line-height: 1;
        box-shadow: 0 8px 18px rgba(0,27,71,.08);
        backdrop-filter: blur(10px);
      }
      .profile-customer-product .social-feed-more:hover,
      .profile-customer-product .social-feed-more[aria-expanded="true"] {
        background: #fff4e8;
        color: var(--emy-orange);
      }
      .profile-customer-product-options {
        position: absolute;
        top: 50px;
        right: 10px;
        z-index: 10;
        width: min(188px, calc(100% - 20px));
        overflow: hidden;
        border: 1px solid rgba(0,27,71,.10);
        border-radius: 10px;
        background: #fff;
        box-shadow: 0 18px 36px rgba(0,27,71,.16);
      }
      .profile-customer-product-options[hidden] { display: none; }
      .profile-customer-product-options button {
        width: 100%;
        min-height: 36px;
        border: 0;
        border-bottom: 1px solid rgba(0,27,71,.06);
        background: #fff;
        color: #344054;
        cursor: pointer;
        padding: 0 12px;
        text-align: left;
        font: inherit;
        font-size: 12px;
        line-height: 1;
        font-weight: 750;
      }
      .profile-customer-product-options button:last-child { border-bottom: 0; }
      .profile-customer-product-options button:hover { background: #fff8f1; color: var(--emy-orange); }
      .profile-customer-product-options .is-danger { color: #b42318; }
      .profile-customer-product .body {
        flex: 1 1 auto;
        min-width: 0;
        min-height: 0;
        display: flex;
        flex-direction: column;
        padding: 14px 12px 12px;
      }
      .profile-customer-product h3 {
        min-height: 0;
        display: -webkit-box;
        overflow: hidden;
        margin: 0;
        color: var(--emy-navy);
        font-size: 14px;
        line-height: 1.18;
        font-weight: 850;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .profile-customer-product p {
        min-height: 0;
        display: -webkit-box;
        overflow: hidden;
        margin: 5px 0 0;
        color: #68738a;
        font-size: 12.5px;
        line-height: 1.35;
        font-weight: 560;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
      .profile-customer-product .product-source {
        min-height: 20px;
        display: inline-flex;
        align-items: center;
        align-self: flex-start;
        margin-top: 8px;
        border-radius: 999px;
        background: #f3f6fb;
        color: #55657c;
        padding: 0 8px;
        font-size: 11px;
        line-height: 1;
        font-weight: 760;
      }
      .profile-customer-product .product-availability {
        display: flex;
        max-width: 100%;
        align-items: flex-start;
        gap: 6px;
        margin-top: 8px;
        color: #0f8f57;
        font-size: 12.5px;
        line-height: 1.25;
        font-weight: 850;
        white-space: normal;
        overflow-wrap: anywhere;
      }
      .profile-customer-product .product-availability::before {
        content: "";
        width: 9px;
        height: 9px;
        flex: 0 0 9px;
        margin-top: .16em;
        border-radius: 999px;
        background: #20c987;
        box-shadow: 0 0 0 3px rgba(32,201,135,.12);
      }
      .profile-customer-product .price {
        display: inline-flex;
        width: fit-content;
        min-width: 78px;
        min-height: 28px;
        align-items: center;
        justify-content: center;
        margin-top: 8px;
        border-radius: 999px;
        background: #fff4e8;
        color: #d85a00;
        padding: 0 10px;
        font-size: 13px;
        line-height: 1;
        font-weight: 850;
        white-space: nowrap;
      }
      .profile-customer-product-time {
        align-self: flex-end;
        margin-top: auto;
        padding-top: 10px;
        color: #98a2b3;
        font-size: 11.5px;
        line-height: 1;
        font-weight: 820;
        text-align: right;
      }
      .profile-customer-product-meta {
        display: none;
      }
      .profile-customer-product-copy {
        display: contents;
      }
      .profile-customer-product-copy strong,
      .profile-customer-product-copy p {
        display: contents;
      }
      .profile-customer-product-meta span {
        margin: 0;
      }
      .profile-customer-empty {
        grid-column: 1 / -1;
        border: 1px dashed rgba(0,27,71,.12);
        border-radius: 13px;
        background: rgba(255,255,255,.62);
        color: #7a869e;
        padding: 12px;
        text-align: center;
        font-size: 12px;
        line-height: 1.35;
        font-weight: 650;
      }
      .profile-extra-save { width:min(280px,100%); justify-self:end; border-radius:999px; }
      .submit-profile { width:min(320px,100%); min-height:46px; margin:6px auto 0; border:0; border-radius:10px; background:var(--emy-orange); color:#fff; cursor:pointer; font-size:15px; font-weight:780; box-shadow:0 12px 24px rgba(255,106,0,.18); }
      .favourite-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:14px; }
      .favourite-card { position:relative; border:1px solid rgba(0,27,71,.08); border-radius:14px; background:rgba(255,255,255,.90); box-shadow:0 14px 30px rgba(0,27,71,.07); overflow:hidden; }
      a.favourite-card { color:inherit; text-decoration:none; }
      .favourite-photo { height:142px; margin:10px; border-radius:11px; background:linear-gradient(145deg,#dfe8ef,#f8fbfe); box-shadow:inset 0 0 0 1px rgba(255,255,255,.65); }
      .favourite-photo.keyboard { background:linear-gradient(145deg,#2f3a48,#e9eef3); }
      .favourite-photo.poster { background:radial-gradient(circle at 66% 34%,rgba(255,106,0,.28),transparent 42px),linear-gradient(145deg,#fff7ef,#dbe4ed); }
      .favourite-photo.snow { background:linear-gradient(145deg,#edf6ff,#9fb3c9 52%,#eef6ff); }
      .favourite-photo.feed, .favourite-photo.post { background:linear-gradient(145deg,#d6dde8,#f7ede2),radial-gradient(circle at 42% 56%,#6e5648,transparent 54px); }
      .favourite-photo.clip, .favourite-photo.product-clip { background:linear-gradient(180deg,#cbd5dd 0%,#aeb8c0 42%,#56677f 70%,#061f4b 100%); }
      .favourite-photo.product { background:linear-gradient(145deg,#eaf6f0,#fff),radial-gradient(circle at 68% 34%,rgba(3,152,85,.20),transparent 46px); }
      .favourite-photo.job { background:linear-gradient(145deg,#fff8ef,#edf2f7),radial-gradient(circle at 70% 28%,rgba(255,106,0,.18),transparent 48px); }
      .favourite-card h3 { margin:0 12px 4px; color:var(--emy-navy); font-size:13px; line-height:1.25; font-weight:650; }
      .favourite-card p { margin:0 12px 12px; color:#d85a00; font-size:12px; line-height:1; font-weight:780; }
      .favourite-empty { grid-column:1 / -1; border:1px dashed rgba(0,27,71,.14); border-radius:14px; background:rgba(255,255,255,.68); color:#667085; padding:22px 16px; text-align:center; font-size:13px; line-height:1.4; font-weight:650; }
      .heart-dot { position:absolute; right:12px; bottom:13px; width:24px; height:24px; border-radius:999px; background:#fff; color:#ff3366; display:grid; place-items:center; box-shadow:0 8px 18px rgba(0,27,71,.12); }
      .heart-dot svg { width:15px; height:15px; fill:currentColor; }
      .profile-record-list { display:grid; gap:12px; }
      .profile-record-card { border:1px solid rgba(0,27,71,.08); border-radius:16px; background:linear-gradient(145deg,rgba(255,255,255,.94),rgba(255,251,246,.78)); box-shadow:0 16px 34px rgba(0,27,71,.07); padding:14px; }
      .profile-record-top { display:grid; grid-template-columns:42px minmax(0,1fr) auto; align-items:start; gap:12px; }
      .profile-record-icon { width:42px; height:42px; border-radius:14px; background:linear-gradient(145deg,#fff4e8,#fff); color:var(--emy-orange); display:grid; place-items:center; box-shadow:inset 0 1px 0 rgba(255,255,255,.88),0 10px 20px rgba(255,106,0,.10); }
      .profile-record-icon svg { width:20px; height:20px; stroke:currentColor; stroke-width:2.1; fill:none; }
      .profile-record-icon.profile-record-avatar { overflow:hidden; border-radius:999px; background:linear-gradient(145deg,#f7f9fc,#fff7ef); font-size:14px; font-weight:900; }
      .profile-record-icon.profile-record-avatar img { width:100%; height:100%; object-fit:cover; display:block; }
      .profile-record-copy { min-width:0; }
      .profile-record-copy h3 { margin:0; color:var(--emy-navy); font-size:15px; line-height:1.22; font-weight:780; overflow-wrap:anywhere; }
      .profile-record-copy p { margin:5px 0 0; color:#667085; font-size:12.5px; line-height:1.35; font-weight:560; overflow-wrap:anywhere; }
      .profile-status { min-height:26px; border-radius:999px; background:#eef7f1; color:#14784b; display:inline-flex; align-items:center; padding:0 10px; font-size:11px; line-height:1; font-weight:820; white-space:nowrap; }
      .profile-status.is-waiting { background:#fff4e8; color:#c45300; }
      .profile-status.is-muted { background:#eef2f6; color:#667085; }
      .profile-record-meta { display:flex; flex-wrap:wrap; gap:7px; margin-top:12px; }
      .profile-record-meta span { min-height:25px; display:inline-flex; align-items:center; border-radius:999px; background:#f4f6f8; color:#5f6c84; padding:0 10px; font-size:11px; line-height:1; font-weight:720; }
      .profile-record-actions { display:flex; flex-wrap:wrap; gap:8px; margin-top:12px; }
      .profile-record-actions a, .profile-record-actions button { min-height:34px; border:1px solid rgba(0,27,71,.10); border-radius:999px; background:#fff; color:var(--emy-navy); cursor:pointer; display:inline-flex; align-items:center; justify-content:center; gap:7px; padding:0 12px; text-decoration:none; font:inherit; font-size:12px; line-height:1; font-weight:760; }
      .profile-record-actions a:hover, .profile-record-actions button:hover { border-color:rgba(255,106,0,.28); background:#fff8ef; color:var(--emy-orange); }
      .profile-record-actions .is-on { border-color:rgba(255,106,0,.28); background:#fff4e8; color:#c45300; }
      .profile-record-actions .is-accept { border-color:rgba(3,152,85,.20); background:#ecfdf3; color:#057a48; }
      .profile-record-actions .is-refuse { border-color:rgba(255,106,0,.22); background:#fff7ed; color:#c45300; }
      .profile-record-actions .is-profile { border-color:rgba(0,27,71,.10); background:#fff; color:var(--emy-navy); }
      .profile-record-actions .is-stop { border-color:rgba(220,38,38,.16); background:#fff5f5; color:#b42318; }
      .profile-record-actions .is-delete { border-color:rgba(220,38,38,.16); background:#fff5f5; color:#b42318; }
      .profile-record-actions .is-accept:hover { background:#dcfae6; color:#047044; }
      .profile-record-actions .is-refuse:hover { background:#fff0dd; color:var(--emy-orange); }
      .profile-record-actions .is-profile:hover { background:#f8fafc; color:var(--emy-navy); border-color:rgba(0,27,71,.18); }
      .profile-record-actions .is-stop:hover { background:#fee4e2; color:#b42318; }
      .profile-record-actions .is-delete:hover { background:#fee4e2; color:#b42318; }
      .profile-record-actions svg { width:15px; height:15px; stroke:currentColor; stroke-width:2.15; fill:none; }
      .profile-load-more { min-height:40px; border:1px solid rgba(0,27,71,.10); border-radius:999px; background:#fff; color:var(--emy-navy); cursor:pointer; justify-self:center; display:inline-flex; align-items:center; justify-content:center; padding:0 16px; font:inherit; font-size:12.5px; line-height:1; font-weight:820; box-shadow:0 12px 24px rgba(0,27,71,.06); }
      .profile-load-more:hover { border-color:rgba(255,106,0,.28); background:#fff8ef; color:var(--emy-orange); }
      .profile-empty-record { border:1px dashed rgba(0,27,71,.14); border-radius:16px; background:rgba(255,255,255,.72); color:#667085; display:grid; justify-items:center; gap:10px; padding:28px 16px; text-align:center; }
      .profile-empty-record strong { color:var(--emy-navy); font-size:15px; font-weight:780; }
      .profile-empty-record span { max-width:340px; font-size:12.5px; line-height:1.4; font-weight:560; }
      .profile-empty-record a { min-height:36px; display:inline-flex; align-items:center; border-radius:999px; background:var(--emy-orange); color:#fff; padding:0 14px; text-decoration:none; font-size:12px; font-weight:800; }
      .settings-card { display:grid; gap:10px; padding:12px; overflow:visible; background:linear-gradient(145deg, rgba(255,255,255,.86), rgba(255,248,239,.64)); box-shadow:0 18px 48px rgba(0,27,71,.08), inset 0 1px 0 rgba(255,255,255,.72); }
      .settings-row-link { width:100%; min-height:68px; border:1px solid rgba(0,27,71,.07); border-radius:14px; background:rgba(255,255,255,.78); color:var(--emy-navy); cursor:pointer; display:grid; grid-template-columns:42px minmax(0,1fr) 28px; align-items:center; gap:12px; padding:10px 12px; text-align:left; box-shadow:0 12px 26px rgba(0,27,71,.055); transition:transform .16s ease, border-color .16s ease, box-shadow .16s ease, background .16s ease; }
      .settings-row-link:hover { transform:translateY(-2px); border-color:rgba(255,106,0,.24); background:#fff; box-shadow:0 18px 34px rgba(0,27,71,.10), 0 8px 18px rgba(255,106,0,.08); }
      .settings-icon { width:42px; height:42px; border-radius:13px; background:linear-gradient(145deg,#fff8ef,#fff); color:var(--emy-orange); display:grid; place-items:center; box-shadow:inset 0 1px 0 rgba(255,255,255,.86), 0 8px 18px rgba(255,106,0,.10); }
      .settings-icon svg { width:19px; height:19px; stroke-width:2.05; }
      .settings-copy { min-width:0; display:grid; gap:3px; }
      .settings-copy strong { display:block; overflow:hidden; color:var(--emy-navy); font-size:13.5px; line-height:1.15; font-weight:800; text-overflow:ellipsis; white-space:nowrap; }
      .settings-copy small { display:block; overflow:hidden; color:#6b7690; font-size:11.5px; line-height:1.3; font-weight:560; text-overflow:ellipsis; white-space:nowrap; }
      .settings-arrow { width:28px; height:28px; border-radius:999px; background:rgba(0,27,71,.04); color:#6b7690; display:grid; place-items:center; transition:background .16s ease, color .16s ease, transform .16s ease; }
      .settings-arrow svg { width:17px; height:17px; stroke-width:2.4; }
      .settings-row-link:hover .settings-arrow { background:#fff4e8; color:var(--emy-orange); transform:translateX(2px); }
      .settings-row-link.is-danger { border-color:rgba(185,28,28,.12); background:linear-gradient(145deg,#fff,#fff7f6); color:#b91c1c; }
      .settings-row-link.is-danger .settings-icon { background:#fff1f1; color:#dc2626; box-shadow:0 8px 18px rgba(220,38,38,.08); }
      .settings-row-link.is-danger .settings-copy strong { color:#b91c1c; }
      .settings-row-link.is-danger .settings-arrow { color:#dc2626; background:#fff1f1; }
      .blocked-card { min-height:360px; display:grid; place-items:center; text-align:center; }
      .blocked-empty { display:grid; justify-items:center; gap:12px; color:#d85a00; }
      .blocked-art { width:160px; height:128px; border-radius:28px; background:radial-gradient(circle at 60% 24%,rgba(255,106,0,.18),transparent 32px),linear-gradient(145deg,#fff4e8,#fff); display:grid; place-items:center; box-shadow:inset 0 0 0 1px rgba(255,106,0,.10),0 16px 34px rgba(0,27,71,.06); }
      .blocked-art svg { width:92px; height:92px; }
      .blocked-empty strong { color:#d85a00; font-size:16px; font-weight:780; }
      .blocked-empty span { max-width:280px; color:#718099; font-size:12px; line-height:1.45; font-weight:520; }
      .toast { position:fixed; left:50%; bottom:92px; z-index:80; transform:translateX(-50%) translateY(12px); min-width:min(320px,calc(100% - 32px)); border:1px solid rgba(0,27,71,.10); border-radius:10px; background:rgba(255,255,255,.96); color:var(--emy-navy); box-shadow:0 18px 38px rgba(0,27,71,.16); padding:12px 14px; text-align:center; opacity:0; pointer-events:none; transition:.18s ease; font-size:13px; font-weight:560; }
      .toast.is-visible { opacity:1; transform:translateX(-50%) translateY(0); }
      .bottom-nav {
        position: fixed;
        left: 50%;
        bottom: 18px;
        z-index: 55;
        width: min(620px, calc(100% - 40px));
        transform: translateX(-50%);
        display: grid;
        grid-template-columns: repeat(8, minmax(0, 1fr));
        gap: 2px;
        border: 1px solid rgba(0,27,71,.06);
        border-radius: 14px;
        background: rgba(248,251,255,.48);
        backdrop-filter: blur(18px);
        box-shadow: 0 14px 36px rgba(0,27,71,.08);
        padding: 8px;
        transition: background .18s ease, border-color .18s ease, box-shadow .18s ease;
      }
      .bottom-nav:hover {
        border-color: rgba(0,27,71,.14);
        background: rgba(248,251,255,.96);
        box-shadow: 0 18px 46px rgba(0,27,71,.18);
      }
      .nav-item {
        position: relative;
        border: 0;
        background: transparent;
        color: #56637b;
        cursor: pointer;
        display: grid;
        place-items: center;
        gap: 4px;
        min-height: 54px;
        min-width: 0;
        padding: 0;
        border-radius: 11px;
        font-size: 10px;
        font-weight: 600;
      }
      .nav-item span { position: relative; z-index: 1; line-height: 1; padding-bottom: 5px; }
`;
const customer_profile_part_2 = String.raw`
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
      .nav-item:hover, .nav-item.is-active { background: rgba(255,106,0,.07); color: var(--emy-orange); }
      .nav-item.is-active svg {
        color: var(--emy-orange);
        border-color: rgba(255,106,0,.36);
        background:
          linear-gradient(145deg, rgba(255,255,255,.96), rgba(255,255,255,.48) 54%, rgba(255,255,255,.28)),
          rgba(255,255,255,.38);
        transform: translateY(-1px);
        box-shadow: inset 0 1px 0 rgba(255,255,255,.78), inset 0 -8px 16px rgba(255,106,0,.08), 0 10px 20px rgba(0,27,71,.17);
      }
      .nav-item.is-active::after { content:""; position:absolute; bottom:1px; width:18px; height:2px; border-radius:999px; background:var(--emy-orange); }
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
const customer_profile_part_3 = String.raw`
      @media (min-width:760px) {
        .topbar { min-height:70px; padding:0 4px; }
        .avatar { width:44px; height:44px; }
        .hello strong { font-size:16px; }
        .location-btn { font-size:12px; }
        .icon-btn { width:42px; height:42px; background:#fff; border:1px solid rgba(0,27,71,.08); }
        .profile-dashboard { grid-template-columns:minmax(260px,300px) minmax(0,1fr); gap:18px; }
        .profile-menu { position:sticky; top:86px; }
      }
      @media (max-width:560px) {
        .shell { padding-inline:14px; }
        .profile-main { grid-template-columns:minmax(0,1fr); justify-items:center; text-align:center; padding-left:12px; padding-right:12px; }
        .profile-photo { width:86px; height:86px; font-size:26px; }
        .profile-info { width:100%; }
        .actions { justify-content:center; }
        .detail { grid-template-columns:1fr; gap:3px; }
        .panel-head { align-items:flex-start; flex-direction:column; }
        .panel-action { width:100%; }
        .field-grid { grid-template-columns:1fr; }
        .profile-social-row { grid-template-columns:1fr; align-items:start; }
        .profile-business-preview-main { grid-template-columns:52px minmax(0,1fr); align-items:end; }
        .profile-business-preview-photo { width:52px; height:52px; border-width:3px; }
        .profile-public-preview .profile-business-preview-main { grid-template-columns:1fr; justify-items:center; gap:12px; padding:22px 14px 34px; margin-top:0; margin-bottom:4px; text-align:center; }
        .profile-public-preview .profile-business-preview-photo { width:72px; height:72px; border-width:4px; }
        .profile-public-preview .profile-preview-identity { justify-items:center; }
        .profile-public-preview .profile-business-preview-name h3 { font-size:21px; }
        .profile-preview-actions { justify-content:center; }
        .profile-public-preview .profile-preview-visibility { position:static; grid-column:auto; justify-self:center; }
        .profile-public-preview .profile-business-preview.is-private-locked .profile-business-preview-main { min-height:206px; padding:10px 14px 38px; }
        body.is-profile-preview-mode.is-private-profile-locked .topbar { width:100%; margin-bottom:6px; }
        .profile-public-preview .profile-business-preview.is-private-locked .profile-business-preview-photo { width:76px; height:76px; margin-bottom:16px; font-size:24px; }
        .profile-public-preview .profile-business-preview.is-private-locked .profile-business-preview-name h3 { font-size:22px; white-space:normal; }
        .profile-public-preview .profile-business-preview.is-private-locked .profile-private-gate { width:auto; min-height:72px; grid-template-columns:36px minmax(0,1fr); margin:0 14px 16px; padding:12px; text-align:left; }
        .profile-public-preview .profile-business-preview.is-private-locked .profile-private-gate-icon { width:36px; height:36px; border-radius:12px; }
        .profile-public-preview .profile-business-preview.is-private-locked .profile-private-gate-copy strong { font-size:14px; }
        .profile-public-preview .profile-business-preview.is-private-locked .profile-private-gate-copy span { font-size:11.5px; }
        .profile-public-preview .profile-business-preview-details { grid-template-columns:1fr; gap:10px; padding:0 14px 16px; }
        .profile-public-preview .profile-business-preview-card.is-wide { grid-column:auto; }
        .profile-public-preview .profile-business-preview-about, .profile-public-preview .profile-business-preview-section { margin-left:0; margin-right:0; }
        .profile-private-gate, .profile-public-preview .profile-private-gate { width:auto; grid-template-columns:1fr; justify-items:start; margin:0 14px 16px; text-align:left; }
        .profile-private-gate button { width:100%; }
        .customer-public-activity-head { grid-template-columns:1fr; padding:16px 16px 0; }
        .customer-public-follow { justify-self:start; }
        .customer-public-command { grid-template-columns:1fr; gap:8px; margin:12px 16px 0; border-radius:12px; padding:7px; }
        .customer-public-category-tabs button { min-height:34px; padding:0 12px; font-size:12px; }
        .customer-public-search-box { height:44px; }
        .customer-public-activity-track { grid-auto-columns:minmax(245px, 82vw); padding:0 16px; }
        .customer-public-activity-track.is-feed-view { grid-template-columns:minmax(0, 1fr); padding:0 16px 18px; }
        .customer-public-activity-track.is-feed-view > .customer-public-activity-item { max-width:none; }
        .customer-public-feed-card .home-created-media { min-height:126px; }
        .customer-public-activity-arrow { width:32px; height:32px; }
        .profile-public-preview .profile-customer-relationship-card { border-radius:0; padding:0; }
        .profile-customer-relationship-card .profile-business-preview-card-head { grid-template-columns:34px minmax(0,1fr); gap:10px; }
        .profile-customer-relationship-card .profile-business-preview-card-icon { width:34px; height:34px; border-radius:13px; }
        .profile-customer-relationship-grid { width:100%; grid-template-columns:minmax(0,1fr); gap:8px; margin-left:0; }
        .profile-customer-relationship-card .profile-customer-status { display:none; }
        .profile-customer-relationship-card .profile-customer-stat { width:100%; }
        .profile-customer-status, .profile-customer-stat { min-height:auto; padding:10px 12px; }
        .profile-customer-status strong, .profile-customer-stat strong { max-width:none; font-size:13.5px; }
        .profile-customer-chat { min-height:40px; flex-direction:row; }
        .profile-customer-businesses-head { padding-inline:14px; }
        .profile-customer-business-strip { grid-auto-columns:minmax(252px, 82vw); padding-inline:42px; }
        .profile-customer-business-card { min-height:166px; }
        .profile-customer-business-details { grid-template-columns:1fr; }
        .profile-customer-business-arrow { width:32px; height:32px; }
        .profile-customer-product-list { grid-template-columns:1fr; }
        .profile-preview-visibility { grid-column:1 / -1; justify-self:start; }
        .profile-extra-save { justify-self:stretch; width:100%; }
        .profile-menu-list { gap:8px; }
        .business-switch, .profile-menu-row { border-radius:15px; }
        .profile-menu-row { min-height:62px; grid-template-columns:38px minmax(0,1fr) 20px; padding:9px 10px; }
        .favourite-grid { grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; }
        .favourite-photo { height:120px; }
        .bottom-nav { width:calc(100% - 24px); bottom:10px; }
      }
`;
const customer_profile_part_4 = String.raw`
      .topbar.has-brand {
        grid-template-columns: auto 46px minmax(0, 1fr) 42px 42px 42px;
        gap: 12px;
      }
      .customer-topbar-brand {
        justify-self: start;
        width: max-content;
        max-width: 168px;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        color: inherit;
        text-decoration: none;
        filter: drop-shadow(0 10px 18px rgba(255,106,0,.12));
      }
      .customer-topbar-brand img {
        width: auto;
        height: 38px;
        display: block;
        object-fit: contain;
      }
      .customer-topbar-brand span {
        min-height: 24px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(255,106,0,.34);
        border-radius: 999px;
        background: rgba(255,255,255,.76);
        color: #d95b00;
        padding: 0 13px;
        font-size: 9px;
        line-height: 1;
        font-weight: 760;
        letter-spacing: .14em;
        text-transform: uppercase;
        box-shadow: inset 0 1px 0 rgba(255,255,255,.86), 0 8px 16px rgba(255,106,0,.08);
      }
      body.is-business-customer-profile-view .topbar.has-brand,
      body.is-business-customer-profile-view [data-customer-profile-bottom-nav] {
        display:none !important;
      }
      body.is-business-customer-profile-view .shell {
        width:min(100%, 1180px) !important;
        max-width:1180px !important;
        margin-left:auto !important;
        margin-right:auto !important;
        padding-left:18px !important;
        padding-right:18px !important;
        padding-bottom:112px !important;
        box-sizing:border-box;
      }
      body.is-business-customer-profile-view .profile-public-preview-shell,
      body.is-business-customer-profile-view .profile-business-preview,
      body.is-business-customer-profile-view .profile-business-preview-details {
        width:100%;
        max-width:1120px;
        margin-left:auto;
        margin-right:auto;
        box-sizing:border-box;
      }
      body.is-business-customer-profile-view .business-app-header[data-business-shell] {
        position:fixed;
        left:0;
        right:0;
        top:0;
        z-index:42;
        display:grid;
        grid-template-columns:minmax(220px,.8fr) minmax(300px,1.2fr) minmax(330px,.9fr);
        align-items:center;
        gap:18px;
        width:100%;
        padding:10px clamp(18px,3vw,44px);
        border-bottom:1px solid rgba(0,27,71,.06);
        background:linear-gradient(180deg, rgba(255,248,239,.97), rgba(255,248,239,.88));
        backdrop-filter:blur(12px);
        box-shadow:0 1px 0 rgba(0,27,71,.06);
      }
      .business-app-header[data-business-shell][hidden],
      .business-bottom-nav[data-business-bottom-nav][hidden] {
        display:none !important;
      }
      body.is-business-customer-profile-view .business-app-header[data-business-shell] .topbar {
        width:100%;
        min-width:0;
        grid-template-columns:46px minmax(0,1fr) auto auto auto;
        background:transparent;
        box-shadow:none;
      }
      body.is-business-customer-profile-view .business-app-header[data-business-shell] .notification-btn svg {
        width:24px;
        height:24px;
        display:block;
      }
      body.is-business-customer-profile-view .business-app-header[data-business-shell] .notification-btn .bell-body {
        fill:none !important;
        stroke:currentColor !important;
        stroke-width:2 !important;
      }
      body.is-business-customer-profile-view .business-app-header[data-business-shell] .notification-btn .bell-highlight {
        stroke:rgba(255,255,255,.88) !important;
        stroke-width:1.2 !important;
      }
      body.is-business-customer-profile-view .business-app-header[data-business-shell] .notification-btn .bell-rim {
        stroke:currentColor !important;
        stroke-width:1.9 !important;
      }
      body.is-business-customer-profile-view .business-app-header[data-business-shell] .notification-btn .bell-clapper {
        fill:currentColor !important;
        stroke:none !important;
      }
      .business-brand {
        justify-self:start;
        min-width:0;
        border:0;
        background:transparent;
        color:inherit;
        cursor:pointer;
        display:inline-flex;
        align-items:center;
        gap:10px;
        padding:0;
        text-align:left;
        text-decoration:none;
        filter:drop-shadow(0 10px 18px rgba(255,106,0,.16));
      }
      .business-brand img {
        width:auto;
        height:38px;
        display:block;
        object-fit:contain;
      }
      .business-brand span {
        display:inline-flex;
        align-items:center;
        justify-content:center;
        min-height:22px;
        margin-left:4px;
        border:1px solid rgba(255,106,0,.34);
        border-radius:999px;
        background:rgba(255,255,255,.76);
        color:#d95b00;
        padding:0 12px;
        font-size:9px;
        line-height:1;
        font-weight:760;
        letter-spacing:.14em;
        text-transform:uppercase;
        box-shadow:inset 0 1px 0 rgba(255,255,255,.86), 0 8px 16px rgba(255,106,0,.08);
      }
      .business-mode-switch {
        position:relative;
        z-index:3;
        width:100%;
        min-height:62px;
        border:1px solid rgba(255,106,0,.16);
        border-radius:18px;
        background:linear-gradient(145deg, rgba(255,255,255,.96), rgba(255,247,238,.88));
        color:var(--emy-navy);
        cursor:pointer;
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:12px;
        padding:12px 14px;
        text-align:left;
        box-shadow:0 18px 34px rgba(0,27,71,.08), 0 10px 24px rgba(255,106,0,.08), inset 0 1px 0 rgba(255,255,255,.94);
      }
      .business-mode-switch strong { display:block; font-size:13px; line-height:1.2; font-weight:760; }
      .business-mode-switch span span { display:block; margin-top:5px; color:#718099; font-size:11px; line-height:1.35; font-weight:560; }
      body.is-business-customer-profile-view .business-mode-switch > span:first-child { min-width:0; }
      body.is-business-customer-profile-view .business-mode-switch strong,
      body.is-business-customer-profile-view .business-mode-switch span span {
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
      }
      .business-mode-switch .switch-track {
        position:relative;
        flex:0 0 auto;
        width:43px;
        height:26px;
        border:1px solid rgba(255,106,0,.36);
        border-radius:999px;
        background:linear-gradient(145deg,#fff7ef,#fff0e3);
        box-shadow:inset 0 3px 8px rgba(117,52,0,.08), 0 8px 18px rgba(255,106,0,.14);
      }
      .business-mode-switch .switch-track::after {
        content:"";
        position:absolute;
        left:auto;
        right:3px;
        top:3px;
        width:18px;
        height:18px;
        border-radius:999px;
        background:linear-gradient(145deg,#ff9b45,#ff6a00);
        box-shadow:0 4px 10px rgba(117,52,0,.28);
      }
      body.is-business-customer-profile-view .business-bottom-nav {
        position:fixed;
        left:50%;
        bottom:18px;
        z-index:55;
        width:min(620px, calc(100% - 40px));
        transform:translateX(-50%);
        display:grid;
        grid-template-columns:repeat(7, 1fr);
        gap:2px;
        border:1px solid rgba(0,27,71,.06);
        border-radius:14px;
        background:rgba(248,251,255,.48);
        backdrop-filter:blur(18px);
        padding:8px;
        box-shadow:0 14px 36px rgba(0,27,71,.08);
      }
      .business-bottom-nav:hover {
        border-color:rgba(0,27,71,.14);
        background:rgba(248,251,255,.96);
        box-shadow:0 18px 46px rgba(0,27,71,.18);
      }
      .business-nav-item {
        position:relative;
        min-width:0;
        min-height:54px;
        border:0;
        border-radius:11px;
        background:transparent;
        color:#56637b;
        cursor:pointer;
        display:grid;
        place-items:center;
        gap:4px;
        padding:0;
        font-size:10px;
        line-height:1;
        font-weight:600;
        transition:background .16s ease, color .16s ease, transform .16s ease;
      }
      .business-nav-item span { position:relative; z-index:1; line-height:1; padding-bottom:5px; }
      .business-nav-item[data-tip]::before {
        content:attr(data-tip);
        position:absolute;
        left:50%;
        bottom:calc(100% + 10px);
        z-index:20;
        width:max-content;
        max-width:min(190px, calc(100vw - 24px));
        transform:translate(-50%, 7px);
        opacity:0;
        pointer-events:none;
        border-radius:7px;
        background:rgba(0,27,71,.74);
        color:#fff;
        padding:6px 8px;
        font-size:11px;
        line-height:1.25;
        font-weight:560;
        white-space:nowrap;
        box-shadow:0 10px 24px rgba(0,27,71,.18);
        backdrop-filter:blur(10px);
        transition:opacity .16s ease, transform .16s ease;
      }
      .business-nav-item[data-tip]:hover::before,
      .business-nav-item[data-tip]:focus-visible::before { opacity:1; transform:translate(-50%, 0); }
      .business-nav-item[data-business-nav="home"][data-tip]::before { left:0; transform:translate(0, 7px); }
      .business-nav-item[data-business-nav="home"][data-tip]:hover::before,
      .business-nav-item[data-business-nav="home"][data-tip]:focus-visible::before { transform:translate(0, 0); }
      .business-nav-item[data-business-nav="ask"][data-tip]::before { left:auto; right:0; transform:translate(0, 7px); }
      .business-nav-item[data-business-nav="ask"][data-tip]:hover::before,
      .business-nav-item[data-business-nav="ask"][data-tip]:focus-visible::before { transform:translate(0, 0); }
      .business-nav-item svg {
        width:34px;
        height:34px;
        stroke-width:2;
        color:rgba(0,27,71,.86);
        padding:8px;
        border:1px solid rgba(255,255,255,.88);
        border-radius:13px;
        background:linear-gradient(145deg, rgba(255,255,255,.92), rgba(255,255,255,.42) 54%, rgba(255,255,255,.24)), rgba(255,255,255,.34);
        clip-path:polygon(18% 0,100% 0,100% 74%,78% 100%,0 100%,0 22%);
        box-shadow:inset 0 1px 0 rgba(255,255,255,.74), inset 0 -8px 16px rgba(0,27,71,.08), 0 9px 18px rgba(0,27,71,.16);
        transition:transform .16s ease, border-color .16s ease, box-shadow .16s ease, background .16s ease;
      }
      .business-nav-item:hover,
      .business-nav-item.is-active { color:var(--emy-orange); background:rgba(255,106,0,.07); }
      .business-nav-item.is-active svg {
        color:var(--emy-orange);
        border-color:rgba(255,106,0,.36);
        background:linear-gradient(145deg, rgba(255,255,255,.96), rgba(255,255,255,.48) 54%, rgba(255,255,255,.28)), rgba(255,255,255,.38);
        transform:translateY(-1px);
        box-shadow:inset 0 1px 0 rgba(255,255,255,.78), inset 0 -8px 16px rgba(255,106,0,.08), 0 10px 20px rgba(0,27,71,.17);
      }
      .business-nav-item.is-active::after {
        content:"";
        position:absolute;
        bottom:1px;
        width:18px;
        height:2px;
        border-radius:999px;
        background:var(--emy-orange);
      }
      .business-nav-services {
        position:relative;
        min-height:74px;
        margin-top:-20px;
        overflow:visible;
        color:var(--emy-orange);
        background:transparent;
      }
      .business-nav-item.business-nav-services[data-tip]::before {
        content:"";
        position:absolute;
        left:50%;
        top:2px;
        bottom:auto;
        z-index:0;
        width:60px;
        height:60px;
        max-width:none;
        border-radius:999px;
        transform:translateX(-50%);
        opacity:1;
        background:linear-gradient(145deg, rgba(255,255,255,.86), rgba(255,244,232,.42) 58%, rgba(255,255,255,.22)), rgba(255,255,255,.38);
        border:1px solid rgba(255,255,255,.78);
        box-shadow:0 18px 34px rgba(0,27,71,.16), 0 10px 24px rgba(255,106,0,.18), inset 0 1px 0 rgba(255,255,255,.88), inset 0 -14px 22px rgba(255,106,0,.10);
        backdrop-filter:blur(18px) saturate(1.35);
        -webkit-backdrop-filter:blur(18px) saturate(1.35);
        transition:transform .18s ease, box-shadow .18s ease, background .18s ease;
        pointer-events:none;
        padding:0;
        white-space:normal;
      }
      .business-nav-item.business-nav-services[data-tip]::after {
        content:"";
        position:absolute;
        left:50%;
        top:9px;
        bottom:auto;
        z-index:1;
        width:36px;
        height:15px;
        border-radius:999px;
        transform:translateX(-50%);
        background:linear-gradient(180deg, rgba(255,255,255,.70), rgba(255,255,255,0));
        opacity:.9;
        pointer-events:none;
      }
      .business-nav-services:hover,
      .business-nav-services.is-active { color:var(--emy-orange); background:transparent; }
      .business-nav-item.business-nav-services[data-tip]:hover::before {
        transform:translateX(-50%) translateY(-2px);
        box-shadow:0 22px 40px rgba(0,27,71,.18), 0 12px 28px rgba(255,106,0,.24), inset 0 1px 0 rgba(255,255,255,.90), inset 0 -14px 22px rgba(255,106,0,.12);
      }
      .business-nav-item.business-nav-services[data-tip].is-active::before {
        width:68px;
        height:68px;
        top:-2px;
        background:linear-gradient(145deg, rgba(255,132,43,.94), rgba(240,95,0,.92));
        border-color:rgba(255,255,255,.52);
        box-shadow:0 22px 42px rgba(255,106,0,.34), 0 12px 28px rgba(0,27,71,.16), inset 0 1px 0 rgba(255,255,255,.48), inset 0 -14px 24px rgba(173,62,0,.22);
      }
      .business-nav-item.business-nav-services[data-tip].is-active::after {
        top:6px;
        width:42px;
        height:18px;
        background:linear-gradient(180deg, rgba(255,255,255,.38), rgba(255,255,255,0));
      }
      .business-nav-services .business-nav-emy-mark {
        position:relative;
        z-index:1;
        width:38px;
        height:38px;
        margin-top:11px;
        color:#fff;
        padding:0;
        border:0;
        border-radius:999px;
        background:transparent;
        clip-path:none;
        box-shadow:0 10px 20px rgba(255,106,0,.24), 0 5px 12px rgba(0,27,71,.12);
        transform:none;
        filter:drop-shadow(0 2px 4px rgba(0,27,71,.18));
      }
      .business-nav-services.is-active .business-nav-emy-mark {
        width:42px;
        height:42px;
        margin-top:9px;
        box-shadow:0 12px 24px rgba(173,62,0,.18), 0 5px 14px rgba(0,27,71,.14);
      }
      .business-nav-services span { color:var(--emy-navy); font-weight:780; text-shadow:0 1px 0 rgba(255,255,255,.72); }
      .business-nav-services.is-active span { color:#fff; font-size:12px; font-weight:850; text-shadow:0 2px 5px rgba(0,27,71,.20); }
      .business-nav-services .business-nav-tip {
        position:absolute;
        left:50%;
        bottom:calc(100% + 14px);
        z-index:30;
        width:max-content;
        max-width:min(190px, calc(100vw - 24px));
        transform:translate(-50%, 7px);
        opacity:0;
        pointer-events:none;
        border:1px solid rgba(255,255,255,.28);
        border-radius:8px;
        background:rgba(0,27,71,.76);
        color:#fff;
        padding:6px 9px;
        font-size:11px;
        line-height:1.2;
        font-style:normal;
        font-weight:760;
        white-space:nowrap;
        box-shadow:0 12px 28px rgba(0,27,71,.22);
        backdrop-filter:blur(12px);
        transition:opacity .16s ease, transform .16s ease;
      }
      .business-nav-services:hover .business-nav-tip,
      .business-nav-services:focus-visible .business-nav-tip { opacity:1; transform:translate(-50%, 0); }
      .business-nav-ask { overflow:visible; }
      .business-nav-ask:hover,
      .business-nav-ask.is-active { color:var(--emy-orange); background:rgba(255,255,255,.52); box-shadow:inset 0 1px 0 rgba(255,255,255,.62), 0 10px 22px rgba(0,27,71,.07); }
      .business-nav-ask svg {
        width:48px;
        height:48px;
        color:#fff;
        padding:0;
        border:0;
        border-radius:0;
        background:transparent;
        clip-path:none;
        box-shadow:none;
        filter:drop-shadow(0 11px 15px rgba(255,106,0,.28));
        transform-origin:50% 82%;
        transition:transform .18s ease, filter .16s ease;
      }
      .business-nav-ask:hover svg,
      .business-nav-ask:focus-visible svg { animation:emyAskBagWave .7s ease-in-out infinite; filter:drop-shadow(0 13px 18px rgba(255,106,0,.34)); }
      .business-nav-ask.is-emy-intro svg { animation:emyAskBagHello 2.8s ease-in-out .15s 2; }
      .business-nav-ask.is-active svg { filter:drop-shadow(0 13px 18px rgba(255,106,0,.34)); }
      .business-nav-ask span { color:var(--emy-orange); font-size:8.8px; white-space:nowrap; }
      .business-nav-ask .ask-emy-bubble {
        display:block;
        position:absolute;
        left:50%;
        bottom:calc(100% + 13px);
        z-index:24;
        width:206px;
        max-width:min(206px, calc(100vw - 32px));
        transform:translate(-50%, 6px) scale(.96);
        opacity:0;
        pointer-events:none;
        border:1px solid rgba(255,106,0,.22);
        border-radius:14px;
        background:rgba(255,255,255,.96);
        color:var(--emy-navy);
        box-shadow:0 18px 40px rgba(0,27,71,.16), 0 8px 24px rgba(255,106,0,.12);
        padding:10px 12px;
        font-size:12px;
        font-weight:700;
        line-height:1.35;
        text-align:left;
        white-space:normal;
        backdrop-filter:blur(14px);
        transition:opacity .2s ease, transform .2s ease;
      }
      .business-nav-ask:hover .ask-emy-bubble,
      .business-nav-ask:focus-visible .ask-emy-bubble { opacity:1; transform:translate(-50%, 0) scale(1); }
      .business-nav-ask .ask-emy-bubble::after {
        content:"";
        position:absolute;
        left:50%;
        bottom:-7px;
        z-index:25;
        width:12px;
        height:12px;
        transform:translateX(-50%) rotate(45deg);
        pointer-events:none;
        border-bottom:1px solid rgba(255,106,0,.22);
        border-right:1px solid rgba(255,106,0,.22);
        background:rgba(255,255,255,.96);
      }
      .business-nav-ask.is-emy-intro .ask-emy-bubble { animation:emyAskBubbleIntro 6.8s ease both; }
      .business-nav-ask.is-emy-intro::before { display:none; }
      @keyframes emyAskBagHello {
        0%, 56%, 100% { transform:translateY(0) rotate(0deg) scale(1); }
        8% { transform:translateY(-7px) rotate(-8deg) scale(1.10); }
        16% { transform:translateY(-3px) rotate(7deg) scale(1.08); }
        24% { transform:translateY(-6px) rotate(-5deg) scale(1.10); }
        32% { transform:translateY(0) rotate(0deg) scale(1); }
      }
      @keyframes emyAskBagWave {
        0%, 100% { transform:translateY(-3px) rotate(-7deg) scale(1.10); }
        50% { transform:translateY(-8px) rotate(8deg) scale(1.14); }
      }
      @keyframes emyAskBubbleIntro {
        0%, 8% { opacity:0; transform:translate(-50%, 8px) scale(.96); }
        14%, 66% { opacity:1; transform:translate(-50%, 0) scale(1); }
        76%, 100% { opacity:0; transform:translate(-50%, 6px) scale(.98); }
      }
      body.is-business-customer-profile-view .shell {
        padding-top:102px !important;
      }
      @media (min-width: 1240px) {
        body.is-business-customer-profile-view .business-app-header[data-business-shell] {
          grid-template-columns:minmax(14px, 1fr) 272px 22px minmax(0, min(calc(100vw - 660px), 1120px)) 22px 276px minmax(18px, 1fr);
          gap:0;
          align-items:start;
          min-height:118px;
          padding:22px 0 20px;
        }
        body.is-business-customer-profile-view .business-brand {
          grid-column:2;
          align-self:start;
          margin-top:7px;
        }
        body.is-business-customer-profile-view .business-app-header[data-business-shell] .topbar {
          grid-column:4;
          align-self:start;
          position:static;
          z-index:1;
          min-height:70px;
          border-bottom:1px solid rgba(0,27,71,.08);
          background:transparent;
          backdrop-filter:none;
          padding:0 4px;
        }
        body.is-business-customer-profile-view .business-mode-switch {
          grid-column:6;
          align-self:start;
          width:100%;
          min-width:0;
          margin-top:0;
        }
        body.is-business-customer-profile-view .shell {
          padding-top:132px !important;
        }
      }
      @media (min-width: 1500px) {
        body.is-business-customer-profile-view .business-app-header[data-business-shell] {
          grid-template-columns:minmax(14px, 1fr) 272px 22px minmax(0, min(calc(100vw - 660px), 1120px)) 22px 276px minmax(18px, 1fr);
        }
      }
      @media (max-width: 760px) {
        .topbar.has-brand {
          grid-template-columns: 38px 38px minmax(0, 1fr) 36px 36px 36px;
          gap: 7px;
        }
        body.is-business-customer-profile-view .business-app-header[data-business-shell] {
          grid-template-columns:38px minmax(0, 1fr);
          gap:10px;
          padding:8px 12px;
        }
        .business-brand span,
        .business-mode-switch { display:none; }
        .business-brand img {
          height:32px;
          width:32px;
          object-fit:cover;
          object-position:left center;
        }
        body.is-business-customer-profile-view .business-app-header[data-business-shell] .topbar {
          display:grid;
          grid-template-columns:36px minmax(0,1fr) 36px;
          gap:8px;
          min-height:46px;
          border-bottom:0;
          padding:0;
        }
        body.is-business-customer-profile-view .business-app-header[data-business-shell] .icon-btn,
        body.is-business-customer-profile-view .business-app-header[data-business-shell] .notification-btn {
          display:none !important;
        }
        body.is-business-customer-profile-view .business-bottom-nav {
          width:min(calc(100% - 16px), 430px);
          bottom:10px;
        }
        .business-nav-item { min-height:56px; font-size:9.5px; }
        .business-nav-services { min-height:72px; margin-top:-18px; }
        .business-nav-services .business-nav-emy-mark { width:36px; height:36px; margin-top:10px; }
        .customer-topbar-brand {
          width: 36px;
          max-width: 36px;
          gap: 0;
          overflow: hidden;
        }
        .customer-topbar-brand img {
          width: 34px;
          height: 34px;
          object-fit: cover;
          object-position: left center;
        }
        .customer-topbar-brand span {
          display: none;
        }
      }
    </style>
  </head>
  <body>
    <main class="page" aria-label="EMY customer profile">
      <div class="shell">
        <header class="business-app-header" data-business-shell hidden aria-label="Business account">
          <button class="business-brand" type="button" data-back aria-label="Back to business home">
            <img src="https://iqlance-demo.com/design/EMY-Web/img/logo-landing.png" alt="EMY" />
            <span>BETA</span>
          </button>
          <div class="topbar business-topbar" aria-label="Business account">
            <button class="avatar" type="button" data-business-top-avatar aria-label="Open business profile">H</button>
            <div class="hello">
              <strong>Hello, <span data-business-top-name>HONEY SHOP</span></strong>
              <button class="location-btn" type="button" data-business-top-location-button title="Business location" aria-label="Business location">
                <svg class="location-pin" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z" stroke="currentColor" stroke-linejoin="round"/><path d="M12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z" stroke="currentColor"/></svg>
                <span data-business-top-location>Location not set</span>
                <svg class="location-chevron" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m7 10 5 5 5-5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
            </div>
            <button class="icon-btn" type="button" data-business-top-search aria-label="Search EMY">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m21 21-4.3-4.3M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <button class="ask-mini-btn" type="button" data-open-ask-mini aria-label="Open EMY">
              <span class="ask-mini-mark" aria-hidden="true">${askMiniLogoMarkup}</span>
              <span class="ask-mini-label">EMY</span>
            </button>
            <button class="icon-btn notification-btn" type="button" data-business-top-notifications aria-label="Notifications" aria-expanded="false">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <defs>
                  <linearGradient id="emyBusinessCustomerBellFill" x1="6" y1="4" x2="18" y2="18" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stop-color="#ffffff"/>
                    <stop offset=".54" stop-color="#ffffff" stop-opacity=".62"/>
                    <stop offset="1" stop-color="#e7edf5" stop-opacity=".86"/>
                  </linearGradient>
                  <linearGradient id="emyBusinessCustomerBellStroke" x1="5" y1="3" x2="19" y2="19" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stop-color="#001b47"/>
                    <stop offset=".62" stop-color="#001b47" stop-opacity=".86"/>
                    <stop offset="1" stop-color="#56637b"/>
                  </linearGradient>
                </defs>
                <path class="bell-body" d="M17.8 9.3a5.8 5.8 0 0 0-11.6 0v2.4c0 1.42-.42 2.72-1.15 3.82L4.25 16.8h15.5l-.8-1.28a7.1 7.1 0 0 1-1.15-3.82V9.3Z" stroke-linecap="round" stroke-linejoin="round"/>
                <path class="bell-highlight" d="M8.1 9.25c.18-2.28 1.68-3.78 3.86-4" fill="none" stroke-linecap="round"/>
                <path class="bell-rim" d="M8.95 19.05h6.1" fill="none" stroke-linecap="round"/>
                <path class="bell-rim" d="M9.9 19.3a2.38 2.38 0 0 0 4.2 0" fill="none" stroke-linecap="round"/>
                <circle class="bell-clapper" cx="12" cy="3.65" r="1.15"/>
              </svg>
              <span class="notification-count" data-business-notification-count aria-label="0 notifications">0</span>
            </button>
          </div>
          <button class="business-mode-switch" type="button" data-business-switch-customer aria-pressed="true">
            <span><strong>Switch to Customer</strong><span>Open your customer home page.</span></span>
            <span class="switch-track" aria-hidden="true"></span>
          </button>
        </header>
${customerTopbarMarkup({
  notificationAttrs: 'data-notifications data-open-notifications',
  headerAttrs: 'data-customer-profile-topbar',
  brand: true
})}

        <section class="notifications-panel" data-profile-notification-panel aria-label="Notifications" aria-hidden="true">
          <header class="notifications-head">
            <h2>Notifications</h2>
            <button class="notifications-icon" type="button" data-profile-notification-settings aria-label="Notification settings"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z" stroke="currentColor"/><path d="M19.4 13.4a7.7 7.7 0 0 0 .05-2.7l2-1.45-2-3.45-2.4.95a8 8 0 0 0-2.3-1.35L14.4 3h-4.8l-.35 2.4a8 8 0 0 0-2.3 1.35l-2.4-.95-2 3.45 2 1.45a7.7 7.7 0 0 0 .05 2.7l-2.05 1.5 2 3.45 2.45-.98a7.7 7.7 0 0 0 2.25 1.28l.35 2.45h4.8l.35-2.45a7.7 7.7 0 0 0 2.25-1.28l2.45.98 2-3.45-2.05-1.5Z" stroke="currentColor" stroke-linejoin="round"/></svg></button>
            <button class="notifications-icon" type="button" data-profile-notification-close aria-label="Close notifications"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-linecap="round"/></svg></button>
          </header>
          <div class="notifications-scroll" data-profile-notification-list></div>
        </section>

        <section class="profile-location-modal" data-profile-location-modal aria-hidden="true">
          <div class="location-sheet" aria-label="Select location">
            <div class="location-head">
              <div class="location-title">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z" stroke="currentColor" stroke-linejoin="round"/><path d="M12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z" stroke="currentColor"/></svg>
                <span>Select Location</span>
              </div>
              <div class="location-actions">
                <button class="location-add" type="button" data-profile-location-add>Add +</button>
                <button class="location-close" type="button" data-close-profile-location aria-label="Close location selector">x</button>
              </div>
            </div>
            <button class="location-current" type="button" data-profile-current-location aria-pressed="false">
              <span class="location-current-copy">
                <strong data-profile-location-title>Using Current Location</strong>
                <small data-profile-location-detail>Detect your position for nearby businesses and posts.</small>
              </span>
              <span class="radio-dot" aria-hidden="true"></span>
            </button>
            <div class="current-radius" data-profile-current-radius hidden>
              <div class="current-radius-head">
                <span>Distance radius from your current location</span>
                <strong data-profile-radius-value>5 miles</strong>
              </div>
              <div class="radius-options compact" data-profile-radius>
                <button type="button" data-radius="1">1 mi</button>
                <button type="button" data-radius="3">3 mi</button>
                <button type="button" data-radius="5">5 mi</button>
                <button type="button" data-radius="8">8 mi</button>
                <button type="button" data-radius="10">10 mi</button>
              </div>
            </div>
            <p class="location-empty">Saved coordinates help EMY show accurate businesses, products, and posts near you.</p>
            <div class="place-list" data-profile-location-list></div>
            <p class="location-empty" data-profile-location-empty>No saved locations yet. Click Add + to save Home, Office, or Other.</p>
            <form class="location-form" data-profile-location-form>
              <div class="place-tabs" role="tablist" aria-label="Location type">
                <button class="is-active" type="button" data-profile-place-tab="Home">Home</button>
                <button type="button" data-profile-place-tab="Office">Office</button>
                <button type="button" data-profile-place-tab="Other">Other</button>
              </div>
              <div class="location-search">
                <input class="location-field" data-profile-place-input placeholder="Location*" autocomplete="off" aria-autocomplete="list" aria-expanded="false" />
                <div class="location-suggestions" data-profile-place-suggestions hidden></div>
              </div>
              <p class="radius-title">Distance radius</p>
              <div class="radius-options" data-profile-form-radius-options>
                <button type="button" data-radius="1">1</button>
                <button type="button" data-radius="3">3</button>
                <button class="is-active" type="button" data-radius="5">5</button>
                <button type="button" data-radius="8">8</button>
                <button type="button" data-radius="10">10</button>
              </div>
              <button class="location-submit" type="submit">Submit</button>
            </form>
            <p class="location-status" data-profile-location-status></p>
          </div>
        </section>

        <div data-profile-default-view>
        <section class="profile-hero">
          <div class="cover" aria-hidden="true"></div>
          <div class="profile-main">
            <div class="profile-photo" data-profile-photo>S</div>
            <div class="profile-info">
              <h1 data-name>Stephane</h1>
              <p data-email>Customer account</p>
              <p data-location-line>Current Location</p>
            </div>
          </div>
          <div class="actions">
            <button class="primary" type="button" data-change-photo onpointerdown="window.emyOpenCustomerProfilePhotoSheet&&window.emyOpenCustomerProfilePhotoSheet()" onclick="window.emyOpenCustomerProfilePhotoSheet&&window.emyOpenCustomerProfilePhotoSheet()">Change profile image</button>
            <button type="button" data-edit-photo>Edit photo</button>
            <button class="danger" type="button" data-remove-photo>Remove photo</button>
            <button type="button" data-edit-location onpointerdown="window.emyOpenCustomerProfileLocationSelector&&window.emyOpenCustomerProfileLocationSelector()" onclick="window.emyOpenCustomerProfileLocationSelector&&window.emyOpenCustomerProfileLocationSelector()">Edit location</button>
            <button class="preview-profile" type="button" data-profile-preview-open onclick="if(window.emyOpenCustomerProfilePreview){window.emyOpenCustomerProfilePreview(event);}">Preview profile</button>
            <input type="file" accept="image/*" data-photo-input hidden />
          </div>
        </section>

        <div class="profile-photo-overlay" data-photo-source-sheet aria-hidden="true">
          <section class="profile-photo-sheet" aria-label="Choose profile photo source">
            <h2>Change profile image</h2>
            <p class="profile-photo-copy">Choose a saved image, upload one from this device, or take a new picture.</p>
            <div class="source-actions">
              <button type="button" data-photo-source="gallery"><strong>Gallery photo</strong><span>Choose a saved image from your phone photo library.</span></button>
              <button type="button" data-photo-source="upload"><strong>Computer or phone photo</strong><span>Choose an image from this device or files.</span></button>
              <button type="button" data-photo-source="camera"><strong>Take picture</strong><span>Use your camera for a new customer profile image.</span></button>
            </div>
            <button class="sheet-close" type="button" data-photo-source-close>Cancel</button>
          </section>
        </div>

        <div class="profile-photo-overlay" data-photo-camera-sheet aria-hidden="true">
          <section class="camera-sheet" aria-label="Take profile photo">
            <h2>Take profile photo</h2>
            <p>Allow camera access, then take a picture. You can crop it before saving.</p>
            <div class="camera-preview-frame is-profile-camera" aria-label="Profile photo circle guide">
              <video class="camera-preview" data-photo-camera-preview autoplay muted playsinline></video>
            </div>
            <p class="camera-status" data-photo-camera-status></p>
            <div class="camera-actions">
              <button type="button" data-photo-camera-cancel>Cancel</button>
              <button type="button" data-photo-camera-capture>Take picture</button>
            </div>
          </section>
        </div>

        <div class="profile-photo-overlay crop-modal" data-photo-crop-modal aria-hidden="true">
          <section class="crop-card" aria-label="Edit profile photo">
            <h2>Edit profile photo</h2>
            <p class="crop-help">Drag the image and adjust the zoom so your photo sits properly inside the circle.</p>
            <button class="crop-change" type="button" data-photo-crop-change>Choose another image</button>
            <div class="crop-frame" data-photo-crop-frame aria-label="Profile photo crop preview"></div>
            <div class="crop-controls">
              <label>Zoom <input type="range" min="100" max="260" value="100" data-photo-crop-zoom /></label>
              <label>Left / right <input type="range" min="0" max="100" value="50" data-photo-crop-x /></label>
              <label>Up / down <input type="range" min="0" max="100" value="50" data-photo-crop-y /></label>
            </div>
            <div class="crop-actions">
              <button class="crop-cancel" type="button" data-photo-crop-cancel>Cancel</button>
              <button class="crop-apply" type="button" data-photo-crop-apply>Save changes</button>
            </div>
          </section>
        </div>

        <div class="profile-dashboard">
        <section class="profile-menu" aria-label="Profile account menu">
          <button class="business-switch" type="button" data-switch-business data-business-switch-mode="create" aria-pressed="false">
            <span><strong>Create a Business Account</strong><span>Start a business profile when you are ready.</span></span>
            <span class="switch-track" aria-hidden="true"></span>
          </button>
          <div class="profile-menu-list">
            <button class="profile-menu-row" type="button" data-profile-route="session">
              <span class="profile-menu-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor"/><path d="M4.8 20.5a7.2 7.2 0 0 1 14.4 0" stroke="currentColor" stroke-linecap="round"/></svg></span>
              <span><strong>Edit Customer Account</strong><small>Name, mobile number, email, photo, and privacy.</small></span>
              <span class="chevron" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="m9 5 7 7-7 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
            </button>
            <button class="profile-menu-row" type="button" data-profile-route="requests">
              <span class="profile-menu-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M7 8.5h10M7 13h6" stroke="currentColor" stroke-linecap="round"/><path d="M5 4.5h14a1.5 1.5 0 0 1 1.5 1.5v9.5A1.5 1.5 0 0 1 19 17H9l-4.5 3V6A1.5 1.5 0 0 1 6 4.5Z" stroke="currentColor" stroke-linejoin="round"/><path d="m14.5 13.8 1.5 1.5 3-3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
              <span><strong>Customers</strong><small data-profile-requests-summary>Businesses asking to add you as a customer.</small></span>
              <span class="chevron" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="m9 5 7 7-7 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
            </button>
            <button class="profile-menu-row" type="button" data-profile-route="blocked">
              <span class="profile-menu-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M7 7l10 10M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke="currentColor" stroke-linecap="round"/></svg></span>
              <span><strong>Blocked Accounts</strong><small>Manage accounts you do not want to see.</small></span>
              <span class="chevron" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="m9 5 7 7-7 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
            </button>
            <button class="profile-menu-row" type="button" data-profile-link="notifications">
              <span class="profile-menu-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M18 9.4a6 6 0 0 0-12 0v2.3c0 1.4-.4 2.7-1.2 3.8L4 16.8h16l-.8-1.3a7 7 0 0 1-1.2-3.8V9.4Z" stroke="currentColor" stroke-linejoin="round"/><path d="M9.5 19a2.7 2.7 0 0 0 5 0" stroke="currentColor" stroke-linecap="round"/></svg></span>
              <span><strong>Notification</strong><small>Choose what EMY should tell you about.</small></span>
              <span class="chevron" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="m9 5 7 7-7 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
            </button>
            <button class="profile-menu-row" type="button" data-profile-route="events">
              <span class="profile-menu-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M7 4v3M17 4v3M5 8h14M6.5 5.5h11A1.5 1.5 0 0 1 19 7v11.5A1.5 1.5 0 0 1 17.5 20h-11A1.5 1.5 0 0 1 5 18.5V7a1.5 1.5 0 0 1 1.5-1.5Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="m9 14 2 2 4-5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
              <span><strong>My Events</strong><small data-profile-events-summary>Saved, accepted, and reminder events.</small></span>
              <span class="chevron" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="m9 5 7 7-7 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
            </button>
            <button class="profile-menu-row" type="button" data-profile-route="applications">
              <span class="profile-menu-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M9 6.5h6M9 11h6M9 15.5h3.5" stroke="currentColor" stroke-linecap="round"/><path d="M7 3h7l4 4v14H7V3Z" stroke="currentColor" stroke-linejoin="round"/><path d="M14 3v5h4" stroke="currentColor" stroke-linejoin="round"/></svg></span>
              <span><strong>Job Applications</strong><small data-profile-applications-summary>Track CVs and business replies.</small></span>
              <span class="chevron" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="m9 5 7 7-7 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
            </button>
            <button class="profile-menu-row" type="button" data-profile-route="favourite">
              <span class="profile-menu-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M12 20s-7.2-4.3-9-9.1C1.9 7.8 3.7 5 6.7 5c1.8 0 3.3.9 4.1 2.3C11.6 5.9 13.1 5 14.9 5c3 0 4.8 2.8 3.7 5.9C16.8 15.7 12 20 12 20Z" stroke="currentColor" stroke-linejoin="round"/></svg></span>
              <span><strong>Favourite</strong><small>Products and content you saved.</small></span>
              <span class="chevron" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="m9 5 7 7-7 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
            </button>
            <button class="profile-menu-row" type="button" data-profile-route="settings">
              <span class="profile-menu-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M12 15.3a3.3 3.3 0 1 0 0-6.6 3.3 3.3 0 0 0 0 6.6Z" stroke="currentColor"/><path d="M19.3 13.5a7.8 7.8 0 0 0 .05-3l2-1.45-2-3.46-2.42.95a8.1 8.1 0 0 0-2.26-1.32L14.35 3h-4.7l-.34 2.22a8.1 8.1 0 0 0-2.26 1.32l-2.42-.95-2 3.46 2 1.45a7.8 7.8 0 0 0 .05 3l-2.05 1.5 2 3.46 2.47-.98a7.8 7.8 0 0 0 2.21 1.27l.34 2.25h4.7l.34-2.25a7.8 7.8 0 0 0 2.21-1.27l2.47.98 2-3.46-2.07-1.5Z" stroke="currentColor" stroke-linejoin="round"/></svg></span>
              <span><strong>Settings</strong><small>Terms, policy, password, FAQ, and account actions.</small></span>
              <span class="chevron" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="m9 5 7 7-7 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
            </button>
            <button class="profile-menu-row is-danger" type="button" data-profile-link="logout">
              <span class="profile-menu-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M10 6H6.5A2.5 2.5 0 0 0 4 8.5v7A2.5 2.5 0 0 0 6.5 18H10" stroke="currentColor" stroke-linecap="round"/><path d="M14 8l4 4-4 4M18 12H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
              <span><strong>Logout</strong><small>Sign out and return to EMY home.</small></span>
              <span class="chevron" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="m9 5 7 7-7 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
            </button>
          </div>
        </section>

        <section class="grid">
          <article class="panel">
            <div class="panel-head">
              <h2>Account details</h2>
            </div>
            <div class="details">
              <div class="detail"><strong>First name</strong><span data-detail-first-name>Not set</span></div>
              <div class="detail"><strong>Last name</strong><span data-detail-last-name>Not set</span></div>
              <div class="detail"><strong>Name</strong><span data-detail-name>Stephane</span></div>
              <div class="detail"><strong>Mobile number</strong><span data-detail-phone>Not set</span></div>
              <div class="detail"><strong>Email</strong><span data-detail-email>Not set</span></div>
              <div class="detail"><strong>Account type</strong><span>Customer</span></div>
              <div class="detail"><strong>Profile privacy</strong><span data-detail-visibility>Private</span></div>
              <div class="detail"><strong>Saved location</strong><span data-detail-location>Current Location</span></div>
              <div class="detail"><strong>Location radius</strong><span data-detail-radius>5 miles</span></div>
              <div class="detail"><strong>About you</strong><span data-detail-about>Not set</span></div>
              <div class="detail"><strong>Visible socials</strong><span data-detail-socials>Not set</span></div>
              <div class="detail"><strong>Interests</strong><span data-detail-interests>Not set</span></div>
            </div>
          </article>
          <article class="panel">
            <h2>Saved locations</h2>
            <div class="location-list" data-saved-locations></div>
          </article>
          <article class="panel profile-about-panel">
            <h2>About you</h2>
            <form class="profile-extra-form" data-profile-extra-form>
              <div class="profile-field">
                <label for="profile-about-you">About you</label>
                <textarea id="profile-about-you" data-profile-about maxlength="420" placeholder="Write a short profile intro..."></textarea>
              </div>
              <div class="profile-field">
                <label>Social networks</label>
                <div class="profile-social-grid" data-profile-social-grid>
                  <div class="profile-social-row" data-profile-social-row="x"><span class="profile-social-name"><span class="profile-social-logo is-x" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z"/></svg></span><span>X</span></span><input type="text" inputmode="url" data-profile-social-url="x" placeholder="https://x.com/username" /><label class="profile-visible-toggle"><input type="checkbox" data-profile-social-visible="x" />Visible</label></div>
                  <div class="profile-social-row" data-profile-social-row="facebook"><span class="profile-social-name"><span class="profile-social-logo is-facebook" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M15.42 8.04h-2.18c-.86 0-1.04.42-1.04 1.02v1.34h3.15l-.41 3.18H12.2V21H8.9v-7.42H6.15V10.4H8.9V8.85C8.9 6.13 10.56 4.65 13 4.65c1.17 0 2.18.09 2.47.13v2.86h-1.7c-1.32 0-1.57.63-1.57 1.55v.85h3.22Z"/></svg></span><span>Facebook</span></span><input type="text" inputmode="url" data-profile-social-url="facebook" placeholder="https://facebook.com/username" /><label class="profile-visible-toggle"><input type="checkbox" data-profile-social-visible="facebook" />Visible</label></div>
                  <div class="profile-social-row" data-profile-social-row="instagram"><span class="profile-social-name"><span class="profile-social-logo is-instagram" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/></svg></span><span>Instagram</span></span><input type="text" inputmode="url" data-profile-social-url="instagram" placeholder="https://instagram.com/username" /><label class="profile-visible-toggle"><input type="checkbox" data-profile-social-visible="instagram" />Visible</label></div>
                  <div class="profile-social-row" data-profile-social-row="tiktok"><span class="profile-social-name"><span class="profile-social-logo is-tiktok" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path fill="#25f4ee" transform="translate(-.55 .42)" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/><path fill="#fe2c55" transform="translate(.55 -.32)" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/><path fill="#fff" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg></span><span>TikTok</span></span><input type="text" inputmode="url" data-profile-social-url="tiktok" placeholder="https://tiktok.com/@username" /><label class="profile-visible-toggle"><input type="checkbox" data-profile-social-visible="tiktok" />Visible</label></div>
                  <div class="profile-social-row" data-profile-social-row="youtube"><span class="profile-social-name"><span class="profile-social-logo is-youtube" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M8.45 6.85v10.3L17.55 12 8.45 6.85Z"/></svg></span><span>YouTube</span></span><input type="text" inputmode="url" data-profile-social-url="youtube" placeholder="https://youtube.com/@username" /><label class="profile-visible-toggle"><input type="checkbox" data-profile-social-visible="youtube" />Visible</label></div>
                  <div class="profile-social-row" data-profile-social-row="linkedin"><span class="profile-social-name"><span class="profile-social-logo is-linkedin" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M5.1 8.75h3.55V20H5.1V8.75Zm1.78-5.38a2.06 2.06 0 1 1 0 4.12 2.06 2.06 0 0 1 0-4.12ZM10.82 8.75h3.4v1.54h.05c.48-.9 1.63-1.84 3.35-1.84 3.58 0 4.24 2.36 4.24 5.43V20h-3.55v-5.43c0-1.3-.02-2.96-1.8-2.96-1.81 0-2.09 1.41-2.09 2.86V20h-3.6V8.75Z"/></svg></span><span>LinkedIn</span></span><input type="text" inputmode="url" data-profile-social-url="linkedin" placeholder="https://linkedin.com/in/username" /><label class="profile-visible-toggle"><input type="checkbox" data-profile-social-visible="linkedin" />Visible</label></div>
                  <div class="profile-social-row" data-profile-social-row="website"><span class="profile-social-name"><span class="profile-social-logo is-website" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 2.5a9.5 9.5 0 1 1 0 19 9.5 9.5 0 0 1 0-19Zm0 2.1c-.8 1.05-1.43 2.15-1.86 3.3h3.72A12.7 12.7 0 0 0 12 4.6ZM7.92 7.9c.32-1.02.75-1.96 1.3-2.82A7.42 7.42 0 0 0 5.7 7.9h2.22Zm8.16 0h2.22a7.42 7.42 0 0 0-3.52-2.82c.55.86.98 1.8 1.3 2.82ZM5.02 10a7.78 7.78 0 0 0 0 4h3.18a13.72 13.72 0 0 1 0-4H5.02Zm5.34 0a11.3 11.3 0 0 0 0 4h3.28a11.3 11.3 0 0 0 0-4h-3.28Zm5.44 0a13.72 13.72 0 0 1 0 4h3.18a7.78 7.78 0 0 0 0-4H15.8Zm-5.66 6.1c.43 1.15 1.06 2.25 1.86 3.3.8-1.05 1.43-2.15 1.86-3.3h-3.72Zm-4.44 0a7.42 7.42 0 0 0 3.52 2.82 12.2 12.2 0 0 1-1.3-2.82H5.7Zm9.08 2.82a7.42 7.42 0 0 0 3.52-2.82h-2.22c-.32 1.02-.75 1.96-1.3 2.82Z"/></svg></span><span>Website</span></span><input type="text" inputmode="url" data-profile-social-url="website" placeholder="https://your-site.com" /><label class="profile-visible-toggle"><input type="checkbox" data-profile-social-visible="website" />Visible</label></div>
                </div>
              </div>
              <div class="profile-field">
                <label>Interested in buying</label>
                <div class="interest-chip-grid" data-profile-interest-options>
                  <button class="interest-chip" type="button" data-profile-interest="Fashion">Fashion</button>
                  <button class="interest-chip" type="button" data-profile-interest="Beauty">Beauty</button>
                  <button class="interest-chip" type="button" data-profile-interest="Food and groceries">Food and groceries</button>
                  <button class="interest-chip" type="button" data-profile-interest="Home and furniture">Home and furniture</button>
                  <button class="interest-chip" type="button" data-profile-interest="Tech">Tech</button>
                  <button class="interest-chip" type="button" data-profile-interest="Health and fitness">Health and fitness</button>
                  <button class="interest-chip" type="button" data-profile-interest="Gifts">Gifts</button>
                  <button class="interest-chip" type="button" data-profile-interest="Auto">Auto</button>
                  <button class="interest-chip" type="button" data-profile-interest="Baby and kids">Baby and kids</button>
                  <button class="interest-chip" type="button" data-profile-interest="Local deals">Local deals</button>
                  <button class="interest-chip" type="button" data-profile-interest="Restaurants">Restaurants</button>
                  <button class="interest-chip" type="button" data-profile-interest="Services">Services</button>
                </div>
              </div>
              <div class="profile-interest-summary" data-profile-interest-summary></div>
              <button class="submit-profile profile-extra-save" type="submit" data-profile-extra-save>Save profile details</button>
            </form>
            <div class="profile-business-preview" data-profile-business-preview aria-label="Business profile preview">
              <div class="profile-business-preview-head"><strong>Preview profile</strong><span>Business view</span></div>
              <div class="profile-business-preview-surface">
                <div class="profile-business-preview-main">
                  <div class="profile-business-preview-photo" data-profile-preview-photo>S</div>
                  <div class="profile-preview-identity">
                    <div class="profile-business-preview-name">
                      <h3 data-profile-preview-name>Stephane</h3>
                      <p data-profile-preview-location>Current Location</p>
                    </div>
                    <div class="profile-preview-actions" data-profile-preview-actions>
                      <button class="profile-preview-request" type="button" data-profile-private-connect><span class="profile-request-logo" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M6.7 8.2c.22-1.55 1.35-2.65 2.88-2.65h4.84c1.53 0 2.66 1.1 2.88 2.65l1.2 8.5c.24 1.72-1.04 3.25-2.78 3.25H8.28c-1.74 0-3.02-1.53-2.78-3.25l1.2-8.5Z" fill="#f76512" stroke="#cf5200" stroke-width="1"/><path d="M9.1 6.1C9.45 4.42 10.42 3.5 12 3.5s2.55.92 2.9 2.6" fill="none" stroke="#fff" stroke-width="1.15" stroke-linecap="round"/><path d="M9.45 13.2c.44-.34.88-.34 1.32 0M13.23 13.2c.44-.34.88-.34 1.32 0M9.8 15.55c1.32.9 3.08.9 4.4 0" fill="none" stroke="#fff" stroke-width="1.15" stroke-linecap="round"/></svg></span><span class="profile-request-label">Request customer</span></button>
                      <a class="profile-customer-chat" href="emy-customer-chat.html" data-profile-preview-chat><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5.5h14v10.8H9.2L5 19.5v-14Z"/><path d="M9 10.8h6"/></svg>Chat</a>
                    </div>
                  </div>
                  <span class="profile-preview-visibility" data-profile-preview-visibility>Private profile</span>
                </div>
                <section class="profile-private-gate" data-profile-private-gate hidden aria-label="Private customer profile">
                  <span class="profile-private-gate-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 11V8a5 5 0 0 1 10 0v3"/><path d="M6.5 11h11A1.5 1.5 0 0 1 19 12.5v6A1.5 1.5 0 0 1 17.5 20h-11A1.5 1.5 0 0 1 5 18.5v-6A1.5 1.5 0 0 1 6.5 11Z"/><path d="M12 15v2"/></svg></span>
                  <span class="profile-private-gate-copy"><strong>Private customer profile</strong><span data-profile-private-gate-copy>This customer only shares profile details with businesses they are connected to.</span></span>
                  <button type="button" data-profile-private-connect>Request customer</button>
                </section>
                <div class="profile-business-preview-details">
                  <section class="profile-business-preview-card" aria-label="About customer">
                    <div class="profile-business-preview-card-head">
                      <span class="profile-business-preview-card-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/></svg></span>
                      <span class="profile-business-preview-card-title"><strong>About this customer</strong></span>
                    </div>
                    <p class="profile-business-preview-about is-empty" data-profile-preview-about>No profile intro added yet.</p>
                  </section>
                  <section class="profile-business-preview-card profile-business-preview-section profile-social-preview-card" aria-label="Visible social networks">
                    <div class="profile-business-preview-card-head">
                      <span class="profile-business-preview-card-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M18 8a3 3 0 1 0-2.8-4M6 14a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM18 16a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM8.7 14.9l6.6-3.8M8.7 19.1l6.6 3.8"/></svg></span>
                      <span class="profile-business-preview-card-title"><strong>Visible socials</strong></span>
                    </div>
                    <div class="profile-preview-chip-list profile-preview-social-list" data-profile-preview-socials><span class="is-muted">No visible socials</span></div>
                  </section>
                  <section class="profile-business-preview-card profile-business-preview-section is-wide" aria-label="Buying interests">
                    <div class="profile-business-preview-card-head">
                      <span class="profile-business-preview-card-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 7h12l-1 13H7L6 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg></span>
                      <span class="profile-business-preview-card-title"><strong>Interested in buying</strong><span>Signals businesses can use to suggest relevant products, shops, and offers.</span></span>
                    </div>
                    <div class="profile-preview-chip-list" data-profile-preview-interests><span class="is-muted">No buying interests selected</span></div>
                  </section>
                  <section class="profile-business-preview-card profile-customer-relationship-card is-wide" aria-label="Customer relationship with this business">
                    <div class="profile-business-preview-card-head">
                      <span class="profile-business-preview-card-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 4v3M16 4v3M5 9h14M6.5 6h11A1.5 1.5 0 0 1 19 7.5v10A1.5 1.5 0 0 1 17.5 19h-11A1.5 1.5 0 0 1 5 17.5v-10A1.5 1.5 0 0 1 6.5 6Z"/><path d="m9 14 2 2 4-5"/></svg></span>
                      <span class="profile-business-preview-card-title"><strong>Customer relationship</strong></span>
                    </div>
                    <div class="profile-customer-relationship-grid">
                      <div class="profile-customer-status"><span data-profile-preview-relationship-label>Customer status</span><strong data-profile-preview-relationship-title>Customer of this business</strong><small data-profile-preview-relationship-date></small></div>
                      <div class="profile-customer-stat"><span class="profile-customer-stat-label"><span class="profile-customer-business-mark" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M6.5 10.2 8.2 6.4h7.6l1.7 3.8" fill="rgba(255,255,255,.16)"/><path d="M6.5 10.2h11"/><path d="M7.5 11.9v5.2c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-5.2"/><path d="M9.4 18v-4h5.2v4"/><path d="M9.2 8.4h5.6"/><path d="M7 10.4c.2.8.7 1.2 1.4 1.2s1.2-.4 1.4-1.2c.2.8.7 1.2 1.4 1.2s1.2-.4 1.4-1.2c.2.8.7 1.2 1.4 1.2s1.2-.4 1.4-1.2c.2.8.7 1.2 1.4 1.2s1.2-.4 1.4-1.2"/></svg></span><b class="profile-customer-stat-text">Businesses followed</b></span><strong data-profile-preview-business-count>0 businesses</strong></div>
                    </div>
                    <div class="profile-customer-businesses" aria-label="Businesses this customer follows">
                      <div class="profile-customer-businesses-head"><strong>Businesses followed</strong><span data-profile-preview-business-strip-count>0 businesses</span></div>
                      <button class="profile-customer-business-arrow is-prev" type="button" data-profile-business-scroll="prev" aria-label="Previous business" hidden><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5 8 12l7 7"/></svg></button>
                      <div class="profile-customer-business-strip" data-profile-preview-businesses></div>
                      <button class="profile-customer-business-arrow is-next" type="button" data-profile-business-scroll="next" aria-label="Next business" hidden><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg></button>
                    </div>
                    <div class="profile-customer-products">
                      <div class="profile-customer-products-head"><strong>Products this customer visited</strong><span data-profile-preview-product-count>0 products</span></div>
                      <div class="profile-customer-products-filter" role="group" aria-label="Filter visited products by date">
                        <button class="is-active" type="button" data-profile-product-range="all">All time</button>
                        <button type="button" data-profile-product-range="today">Today</button>
                        <button type="button" data-profile-product-range="week">This week</button>
                        <button type="button" data-profile-product-range="month">This month</button>
                        <button type="button" data-profile-product-range="year">This year</button>
                      </div>
                      <div class="profile-customer-product-list" data-profile-preview-products><span class="profile-customer-empty">No products visited by this customer yet.</span></div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </article>
        </section>
        </div>
        </div>

        <section class="profile-subview profile-public-preview" data-profile-view="preview" hidden>
          <header class="profile-view-head">
            <button class="profile-view-back" type="button" data-profile-back aria-label="Back to profile"><svg viewBox="0 0 24 24" fill="none"><path d="M15 19 8 12l7-7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
            <h2>Preview profile</h2>
            <span aria-hidden="true"></span>
          </header>
          <div class="profile-public-preview-shell">
            <div class="profile-business-preview" data-profile-business-preview aria-label="Business profile preview">
              <div class="profile-business-preview-head"><strong>Preview profile</strong><span>Business view</span></div>
              <div class="profile-business-preview-surface">
                <div class="profile-business-preview-main">
                  <div class="profile-business-preview-photo" data-profile-preview-photo>S</div>
                  <div class="profile-preview-identity">
                    <div class="profile-business-preview-name">
                      <h3 data-profile-preview-name>Stephane</h3>
                      <p data-profile-preview-location>Current Location</p>
                    </div>
                    <div class="profile-preview-actions" data-profile-preview-actions>
                      <button class="profile-preview-request" type="button" data-profile-private-connect><span class="profile-request-logo" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M6.7 8.2c.22-1.55 1.35-2.65 2.88-2.65h4.84c1.53 0 2.66 1.1 2.88 2.65l1.2 8.5c.24 1.72-1.04 3.25-2.78 3.25H8.28c-1.74 0-3.02-1.53-2.78-3.25l1.2-8.5Z" fill="#f76512" stroke="#cf5200" stroke-width="1"/><path d="M9.1 6.1C9.45 4.42 10.42 3.5 12 3.5s2.55.92 2.9 2.6" fill="none" stroke="#fff" stroke-width="1.15" stroke-linecap="round"/><path d="M9.45 13.2c.44-.34.88-.34 1.32 0M13.23 13.2c.44-.34.88-.34 1.32 0M9.8 15.55c1.32.9 3.08.9 4.4 0" fill="none" stroke="#fff" stroke-width="1.15" stroke-linecap="round"/></svg></span><span class="profile-request-label">Request customer</span></button>
                      <a class="profile-customer-chat" href="emy-customer-chat.html" data-profile-preview-chat><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5.5h14v10.8H9.2L5 19.5v-14Z"/><path d="M9 10.8h6"/></svg>Chat</a>
                    </div>
                  </div>
                  <span class="profile-preview-visibility" data-profile-preview-visibility>Private profile</span>
                </div>
                <section class="profile-private-gate" data-profile-private-gate hidden aria-label="Private customer profile">
                  <span class="profile-private-gate-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 11V8a5 5 0 0 1 10 0v3"/><path d="M6.5 11h11A1.5 1.5 0 0 1 19 12.5v6A1.5 1.5 0 0 1 17.5 20h-11A1.5 1.5 0 0 1 5 18.5v-6A1.5 1.5 0 0 1 6.5 11Z"/><path d="M12 15v2"/></svg></span>
                  <span class="profile-private-gate-copy"><strong>Private customer profile</strong><span data-profile-private-gate-copy>This customer only shares profile details with businesses they are connected to.</span></span>
                  <button type="button" data-profile-private-connect>Request customer</button>
                </section>
                <div class="profile-business-preview-details">
                  <section class="profile-business-preview-card" aria-label="About customer">
                    <div class="profile-business-preview-card-head">
                      <span class="profile-business-preview-card-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/></svg></span>
                      <span class="profile-business-preview-card-title"><strong>About this customer</strong></span>
                    </div>
                    <p class="profile-business-preview-about is-empty" data-profile-preview-about>No profile intro added yet.</p>
                  </section>
                  <section class="profile-business-preview-card profile-business-preview-section profile-social-preview-card" aria-label="Visible social networks">
                    <div class="profile-business-preview-card-head">
                      <span class="profile-business-preview-card-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M18 8a3 3 0 1 0-2.8-4M6 14a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM18 16a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM8.7 14.9l6.6-3.8M8.7 19.1l6.6 3.8"/></svg></span>
                      <span class="profile-business-preview-card-title"><strong>Visible socials</strong></span>
                    </div>
                    <div class="profile-preview-chip-list profile-preview-social-list" data-profile-preview-socials><span class="is-muted">No visible socials</span></div>
                  </section>
                  <section class="profile-business-preview-card profile-business-preview-section is-wide" aria-label="Buying interests">
                    <div class="profile-business-preview-card-head">
                      <span class="profile-business-preview-card-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 7h12l-1 13H7L6 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg></span>
                      <span class="profile-business-preview-card-title"><strong>Interested in buying</strong><span>Signals businesses can use to suggest relevant products, shops, and offers.</span></span>
                    </div>
                    <div class="profile-preview-chip-list" data-profile-preview-interests><span class="is-muted">No buying interests selected</span></div>
                  </section>
                  <section class="profile-business-preview-card profile-customer-relationship-card is-wide" aria-label="Customer relationship with this business">
                    <div class="profile-business-preview-card-head">
                      <span class="profile-business-preview-card-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 4v3M16 4v3M5 9h14M6.5 6h11A1.5 1.5 0 0 1 19 7.5v10A1.5 1.5 0 0 1 17.5 19h-11A1.5 1.5 0 0 1 5 17.5v-10A1.5 1.5 0 0 1 6.5 6Z"/><path d="m9 14 2 2 4-5"/></svg></span>
                      <span class="profile-business-preview-card-title"><strong>Customer relationship</strong></span>
                    </div>
                    <div class="profile-customer-relationship-grid">
                      <div class="profile-customer-status"><span data-profile-preview-relationship-label>Customer status</span><strong data-profile-preview-relationship-title>Customer of this business</strong><small data-profile-preview-relationship-date></small></div>
                      <div class="profile-customer-stat"><span class="profile-customer-stat-label"><span class="profile-customer-business-mark" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M6.5 10.2 8.2 6.4h7.6l1.7 3.8" fill="rgba(255,255,255,.16)"/><path d="M6.5 10.2h11"/><path d="M7.5 11.9v5.2c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-5.2"/><path d="M9.4 18v-4h5.2v4"/><path d="M9.2 8.4h5.6"/><path d="M7 10.4c.2.8.7 1.2 1.4 1.2s1.2-.4 1.4-1.2c.2.8.7 1.2 1.4 1.2s1.2-.4 1.4-1.2c.2.8.7 1.2 1.4 1.2s1.2-.4 1.4-1.2c.2.8.7 1.2 1.4 1.2s1.2-.4 1.4-1.2"/></svg></span><b class="profile-customer-stat-text">Businesses followed</b></span><strong data-profile-preview-business-count>0 businesses</strong></div>
                    </div>
                    <div class="profile-customer-businesses" aria-label="Businesses this customer follows">
                      <div class="profile-customer-businesses-head"><strong>Businesses followed</strong><span data-profile-preview-business-strip-count>0 businesses</span></div>
                      <button class="profile-customer-business-arrow is-prev" type="button" data-profile-business-scroll="prev" aria-label="Previous business" hidden><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5 8 12l7 7"/></svg></button>
                      <div class="profile-customer-business-strip" data-profile-preview-businesses></div>
                      <button class="profile-customer-business-arrow is-next" type="button" data-profile-business-scroll="next" aria-label="Next business" hidden><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg></button>
                    </div>
                    <div class="profile-customer-products">
                      <div class="profile-customer-products-head"><strong>Products this customer visited</strong><span data-profile-preview-product-count>0 products</span></div>
                      <div class="profile-customer-products-filter" role="group" aria-label="Filter visited products by date">
                        <button class="is-active" type="button" data-profile-product-range="all">All time</button>
                        <button type="button" data-profile-product-range="today">Today</button>
                        <button type="button" data-profile-product-range="week">This week</button>
                        <button type="button" data-profile-product-range="month">This month</button>
                        <button type="button" data-profile-product-range="year">This year</button>
                      </div>
                      <div class="profile-customer-product-list" data-profile-preview-products><span class="profile-customer-empty">No products visited by this customer yet.</span></div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
            <div class="customer-public-profile-view" aria-label="Public customer profile view">
              <section class="customer-public-activity-card" aria-label="Public profile activity">
                <div class="customer-public-activity-head">
                  <div class="customer-public-activity-title">
                    <h2>Activity</h2>
                  </div>
                </div>
                <section class="customer-public-command" aria-label="Activity controls">
                  <div class="customer-public-tabs-wrap">
                    <nav class="customer-public-category-tabs" role="tablist" aria-label="Activity categories" data-public-activity-tabs>
                      <button class="is-active" type="button" role="tab" aria-selected="true" data-public-activity-category="all">All</button>
                      <button type="button" role="tab" aria-selected="false" data-public-activity-category="articles">Articles</button>
                      <button type="button" role="tab" aria-selected="false" data-public-activity-category="events">Events</button>
                      <button type="button" role="tab" aria-selected="false" data-public-activity-category="jobs">Jobs</button>
                      <button type="button" role="tab" aria-selected="false" data-public-activity-category="reposts">Reposts</button>
                    </nav>
                  </div>
                  <label class="customer-public-search-box">
                    <input data-public-activity-search type="search" placeholder="Search" autocomplete="off" />
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m21 21-4.3-4.3M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </label>
                </section>
                <div class="customer-public-activity-stage">
                  <button class="customer-public-activity-arrow is-prev" type="button" data-public-activity-arrow="prev" aria-label="Previous activity" hidden><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5 8 12l7 7"/></svg></button>
                  <div class="customer-public-activity-track" data-public-customer-activity-track aria-live="polite"></div>
                  <button class="customer-public-activity-arrow is-next" type="button" data-public-activity-arrow="next" aria-label="Next activity" hidden><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg></button>
                </div>
              </section>
            </div>
          </div>
        </section>

        <section class="profile-subview" data-profile-view="session" hidden>
          <header class="profile-view-head">
            <button class="profile-view-back" type="button" data-profile-back aria-label="Back to profile"><svg viewBox="0 0 24 24" fill="none"><path d="M15 19 8 12l7-7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
            <h2>Edit Customer Account</h2>
            <span aria-hidden="true"></span>
          </header>
          <article class="session-card">
            <div class="session-photo" data-session-photo>S</div>
            <p class="session-intro">Update the customer account details you entered at registration. Private profiles only show full details to connected businesses.</p>
            <div class="session-photo-actions">
              <button class="session-mini-action" type="button" data-session-change-photo onpointerdown="window.emyOpenCustomerProfilePhotoSheet&&window.emyOpenCustomerProfilePhotoSheet()" onclick="window.emyOpenCustomerProfilePhotoSheet&&window.emyOpenCustomerProfilePhotoSheet()">Change profile image</button>
              <button class="session-mini-action" type="button" data-session-edit-location onpointerdown="window.emyOpenCustomerProfileLocationSelector&&window.emyOpenCustomerProfileLocationSelector()" onclick="window.emyOpenCustomerProfileLocationSelector&&window.emyOpenCustomerProfileLocationSelector()">Edit location</button>
            </div>
            <div class="session-toggle" role="group" aria-label="Profile visibility" data-selected-visibility="private">
              <button class="is-active" type="button" data-session-visibility="private" aria-pressed="true" style="background:#ff6a00;color:#fff;" onpointerdown="window.emySetCustomerSessionVisibility&&window.emySetCustomerSessionVisibility('private',this)" onclick="window.emySetCustomerSessionVisibility&&window.emySetCustomerSessionVisibility('private',this)">Private</button>
              <button type="button" data-session-visibility="public" aria-pressed="false" onpointerdown="window.emySetCustomerSessionVisibility&&window.emySetCustomerSessionVisibility('public',this)" onclick="window.emySetCustomerSessionVisibility&&window.emySetCustomerSessionVisibility('public',this)">Public</button>
            </div>
            <script data-customer-session-visibility-fallback>
              (() => {
                if (window.__emyCustomerSessionVisibilityFallback) return;
                window.__emyCustomerSessionVisibilityFallback = true;
                function clean(value) { return String(value || "").toLowerCase() === "public" ? "public" : "private"; }
                function storedVisibility() {
                  try { return clean(localStorage.getItem("emyCustomerProfileVisibility") || localStorage.getItem("emyMainPendingSignupPrivacy")); } catch (error) { return "private"; }
                }
                function saveVisibility(value) {
                  window.__emyCustomerProfileVisibilityOverride = clean(value);
                  try {
                    localStorage.setItem("emyCustomerProfileVisibility", value);
                    localStorage.setItem("emyMainPendingSignupPrivacy", value);
                  } catch (error) {}
                }
                function syncToggle(toggle, value) {
                  if (!toggle) return;
                  const next = clean(value);
                  toggle.dataset.selectedVisibility = next;
                  toggle.querySelectorAll("[data-session-visibility]").forEach((button) => {
                    const active = button.dataset.sessionVisibility === next;
                    button.classList.toggle("is-active", active);
                    button.setAttribute("aria-pressed", active ? "true" : "false");
                    if (active) {
                      button.style.setProperty("background-color", "#ff6a00", "important");
                      button.style.setProperty("color", "#fff", "important");
                    } else {
                      button.style.removeProperty("background-color");
                      button.style.removeProperty("color");
                    }
                  });
                }
                function syncAll(value) {
                  document.querySelectorAll(".session-toggle").forEach((toggle) => syncToggle(toggle, value));
                }
                function setSheetOpen(selector, isOpen) {
                  const sheet = document.querySelector(selector);
                  if (!sheet) return false;
                  sheet.classList.toggle("is-open", !!isOpen);
                  sheet.setAttribute("aria-hidden", isOpen ? "false" : "true");
                  return true;
                }
                window.emyOpenCustomerProfilePhotoSheet = () => {
                  setSheetOpen("[data-photo-crop-modal]", false);
                  setSheetOpen("[data-photo-camera-sheet]", false);
                  setSheetOpen("[data-photo-source-sheet]", true);
                  return true;
                };
                window.emyOpenCustomerProfileLocationSelector = () => {
                  setSheetOpen("[data-profile-location-modal]", true);
                  return true;
                };
                window.emySetCustomerSessionVisibility = (value, source) => {
                  const next = clean(value || (source && source.dataset ? source.dataset.sessionVisibility : ""));
                  window.__emyCustomerProfileVisibilityOverride = next;
                  if (source && source.closest) syncToggle(source.closest(".session-toggle"), next);
                  syncAll(next);
                  saveVisibility(next);
                  return next;
                };
                function handleVisibilityEvent(event) {
                  const button = event.target && event.target.closest ? event.target.closest("[data-session-visibility]") : null;
                  if (!button) return;
                  const next = clean(button.dataset.sessionVisibility);
                  window.emySetCustomerSessionVisibility(next, button);
                }
                document.addEventListener("pointerdown", handleVisibilityEvent, true);
                document.addEventListener("click", handleVisibilityEvent, true);
                document.addEventListener("DOMContentLoaded", () => syncAll(storedVisibility()));
                syncAll(storedVisibility());
              })();
            </script>
            <form class="session-form" data-session-form>
              <div class="field-grid">
                <div class="profile-field"><label for="profile-first-name">First Name*</label><input id="profile-first-name" data-session-first autocomplete="given-name" /></div>
                <div class="profile-field"><label for="profile-last-name">Last Name*</label><input id="profile-last-name" data-session-last autocomplete="family-name" /></div>
              </div>
              <div class="profile-field"><label for="profile-mobile">Mobile Number*</label><div class="profile-phone-control"><span class="profile-dial-select" data-session-code-widget><button class="profile-dial-button" type="button" data-session-code-button aria-haspopup="listbox" aria-expanded="false"><span class="profile-dial-value" data-session-code-value>+44 UK</span><span class="profile-dial-chevron" aria-hidden="true">v</span></button><span class="profile-dial-menu" data-session-code-menu hidden><input class="profile-dial-search" data-session-code-search type="search" placeholder="Search country" autocomplete="off" aria-label="Search country code" /><span class="profile-dial-options" data-session-code-options role="listbox"></span><span class="profile-dial-empty" data-session-code-empty hidden>No country found</span></span><input data-session-phone-code type="hidden" value="+44" /><input data-session-phone-country type="hidden" value="GB" /></span><input id="profile-mobile" data-session-phone autocomplete="tel-national" inputmode="numeric" pattern="[0-9]*" maxlength="13" placeholder="Mobile Number" /></div></div>
              <div class="profile-field"><label for="profile-email">Email*</label><input id="profile-email" data-session-email type="email" autocomplete="email" /></div>
              <button class="submit-profile" type="submit">Save account details</button>
            </form>
          </article>
        </section>

        <section class="profile-subview" data-profile-view="requests" hidden>
          <header class="profile-view-head">
            <button class="profile-view-back" type="button" data-profile-back aria-label="Back to profile"><svg viewBox="0 0 24 24" fill="none"><path d="M15 19 8 12l7-7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
            <h2>Customers</h2>
            <span aria-hidden="true"></span>
          </header>
          <article class="customer-requests-card">
            <div class="profile-record-list" data-profile-requests-list></div>
            <section class="profile-customers-section" aria-label="Businesses you follow">
              <div class="profile-customers-section-head"><strong>Businesses you follow</strong><span data-profile-customers-count>0 businesses</span></div>
              <div class="profile-record-list" data-profile-customers-list></div>
            </section>
          </article>
        </section>

        <section class="profile-subview" data-profile-view="blocked" hidden>
          <header class="profile-view-head">
            <button class="profile-view-back" type="button" data-profile-back aria-label="Back to profile"><svg viewBox="0 0 24 24" fill="none"><path d="M15 19 8 12l7-7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
            <h2>Blocked Accounts</h2>
            <span aria-hidden="true"></span>
          </header>
          <article class="blocked-card">
            <div class="blocked-empty">
              <span class="blocked-art" aria-hidden="true"><svg viewBox="0 0 96 96" fill="none"><path d="M25 34h48l-5 40H30L25 34Z" fill="#ff6a00" opacity=".92"/><path d="M35 34c1.4-12 7.6-19 17-19s15.6 7 17 19" stroke="#001b47" stroke-width="5" stroke-linecap="round"/><path d="M40 50l16 16M56 50 40 66" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="76" cy="23" r="7" fill="#fff4e8" stroke="#ff6a00" stroke-width="3"/><path d="M76 19v4" stroke="#001b47" stroke-width="3" stroke-linecap="round"/><circle cx="76" cy="28" r="1.7" fill="#001b47"/></svg></span>
              <strong>No Data Found</strong>
              <span>Blocked accounts will appear here when you choose to hide a business or profile.</span>
            </div>
          </article>
        </section>

        <section class="profile-subview" data-profile-view="favourite" hidden>
          <header class="profile-view-head">
            <button class="profile-view-back" type="button" data-profile-back aria-label="Back to profile"><svg viewBox="0 0 24 24" fill="none"><path d="M15 19 8 12l7-7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
            <h2>Favourite</h2>
            <span aria-hidden="true"></span>
          </header>
          <div class="favourite-grid" aria-label="Favourite products and saved feed items" data-favourite-grid>
            <article class="favourite-card"><div class="favourite-photo keyboard" aria-hidden="true"></div><h3>keyboard</h3><p>&pound; 10.00</p><span class="heart-dot" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 20s-7.2-4.3-9-9.1C1.9 7.8 3.7 5 6.7 5c1.8 0 3.3.9 4.1 2.3C11.6 5.9 13.1 5 14.9 5c3 0 4.8 2.8 3.7 5.9C16.8 15.7 12 20 12 20Z"/></svg></span></article>
            <article class="favourite-card"><div class="favourite-photo poster" aria-hidden="true"></div><h3>test</h3><p>&pound; 96.00</p><span class="heart-dot" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 20s-7.2-4.3-9-9.1C1.9 7.8 3.7 5 6.7 5c1.8 0 3.3.9 4.1 2.3C11.6 5.9 13.1 5 14.9 5c3 0 4.8 2.8 3.7 5.9C16.8 15.7 12 20 12 20Z"/></svg></span></article>
            <article class="favourite-card"><div class="favourite-photo snow" aria-hidden="true"></div><h3>test222</h3><p>&pound; 256.00</p><span class="heart-dot" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 20s-7.2-4.3-9-9.1C1.9 7.8 3.7 5 6.7 5c1.8 0 3.3.9 4.1 2.3C11.6 5.9 13.1 5 14.9 5c3 0 4.8 2.8 3.7 5.9C16.8 15.7 12 20 12 20Z"/></svg></span></article>
          </div>
        </section>

        <section class="profile-subview" data-profile-view="events" hidden>
          <header class="profile-view-head">
            <button class="profile-view-back" type="button" data-profile-back aria-label="Back to profile"><svg viewBox="0 0 24 24" fill="none"><path d="M15 19 8 12l7-7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
            <h2>My Events</h2>
            <span aria-hidden="true"></span>
          </header>
          <div class="profile-record-list" data-profile-events-list></div>
        </section>

        <section class="profile-subview" data-profile-view="applications" hidden>
          <header class="profile-view-head">
            <button class="profile-view-back" type="button" data-profile-back aria-label="Back to profile"><svg viewBox="0 0 24 24" fill="none"><path d="M15 19 8 12l7-7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
            <h2>Job Applications</h2>
            <span aria-hidden="true"></span>
          </header>
          <div class="profile-record-list" data-profile-applications-list></div>
        </section>

        <section class="profile-subview" data-profile-view="settings" hidden>
          <header class="profile-view-head">
            <button class="profile-view-back" type="button" data-profile-back aria-label="Back to profile"><svg viewBox="0 0 24 24" fill="none"><path d="M15 19 8 12l7-7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
            <h2>Settings</h2>
            <span aria-hidden="true"></span>
          </header>
          <div class="settings-card">
            <button class="settings-row-link" type="button" data-settings-link="terms"><span class="settings-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M7 3h8l4 4v14H7V3Z" stroke="currentColor" stroke-linejoin="round"/><path d="M15 3v5h5M10 12h6M10 16h5" stroke="currentColor" stroke-linecap="round"/></svg></span><span class="settings-copy"><strong>Terms</strong><small>Read the rules for using EMY.</small></span><span class="settings-arrow"><svg viewBox="0 0 24 24" fill="none"><path d="m9 5 7 7-7 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></span></button>
            <button class="settings-row-link" type="button" data-settings-link="privacy"><span class="settings-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M6 10V8a6 6 0 0 1 12 0v2M5 10h14v11H5V10Z" stroke="currentColor" stroke-linejoin="round"/></svg></span><span class="settings-copy"><strong>Policy</strong><small>How your account data is handled.</small></span><span class="settings-arrow"><svg viewBox="0 0 24 24" fill="none"><path d="m9 5 7 7-7 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></span></button>
            <button class="settings-row-link" type="button" data-settings-link="password"><span class="settings-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M15 7a4 4 0 1 1-1.2 2.85L21 17v3h-3l-2-2h-3v-3l-2.15-2.15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="settings-copy"><strong>Change Password</strong><small>Update your sign-in security.</small></span><span class="settings-arrow"><svg viewBox="0 0 24 24" fill="none"><path d="m9 5 7 7-7 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></span></button>
            <button class="settings-row-link" type="button" data-settings-link="faqs"><span class="settings-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z" stroke="currentColor"/><path d="M9.9 9.2A2.25 2.25 0 1 1 12 12.25v1.1M12 16h.01" stroke="currentColor" stroke-linecap="round"/></svg></span><span class="settings-copy"><strong>FAQ</strong><small>Find quick answers about EMY.</small></span><span class="settings-arrow"><svg viewBox="0 0 24 24" fill="none"><path d="m9 5 7 7-7 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></span></button>
            <button class="settings-row-link" type="button" data-settings-link="about"><span class="settings-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" stroke="currentColor"/><path d="M12 10v6M12 7.2h.01" stroke="currentColor" stroke-linecap="round" stroke-width="2.4"/></svg></span><span class="settings-copy"><strong>About Us</strong><small>Learn what EMY is building.</small></span><span class="settings-arrow"><svg viewBox="0 0 24 24" fill="none"><path d="m9 5 7 7-7 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></span></button>
            <button class="settings-row-link" type="button" data-settings-link="contact"><span class="settings-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M5 5h14v12H8l-3 3V5Z" stroke="currentColor" stroke-linejoin="round"/><path d="M8 9h8M8 13h5" stroke="currentColor" stroke-linecap="round"/></svg></span><span class="settings-copy"><strong>Contact Us</strong><small>Reach EMY support and help.</small></span><span class="settings-arrow"><svg viewBox="0 0 24 24" fill="none"><path d="m9 5 7 7-7 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></span></button>
            <button class="settings-row-link is-danger" type="button" data-settings-link="delete"><span class="settings-icon"><svg viewBox="0 0 24 24" fill="none"><path d="M5 7h14M10 11v6M14 11v6M8 7l1-3h6l1 3M7 7l1 14h8l1-14" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="settings-copy"><strong>Delete My Account</strong><small>Remove your EMY account permanently.</small></span><span class="settings-arrow"><svg viewBox="0 0 24 24" fill="none"><path d="m9 5 7 7-7 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></span></button>
          </div>
        </section>
      </div>

      <nav class="bottom-nav" data-customer-profile-bottom-nav aria-label="Customer navigation">
        <button class="nav-item" type="button" data-nav="home" data-tip="Local feed"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 11.5 12 5l8 6.5V20H6v-6h12" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Home</span></button>
        <button class="nav-item" type="button" data-nav="nearby" data-tip="Businesses close to you"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z" stroke="currentColor" stroke-linejoin="round"/><path d="M12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z" stroke="currentColor"/></svg><span>Nearby</span></button>
        <button class="nav-item" type="button" data-nav="feeds" data-tip="Product and posts"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 5h6v6H5V5Zm8 0h6v6h-6V5ZM5 13h6v6H5v-6Zm8 0h6v6h-6v-6Z" stroke="currentColor" stroke-linejoin="round"/></svg><span>Feeds</span></button>
        <button class="nav-item" type="button" data-nav="reels" data-tip="Short videos"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 7h14v12H5V7Zm3-4 2 4m4-4 2 4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Clips</span></button>
        <button class="nav-item" type="button" data-nav="uploads" data-tip="Upload status"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 16V5m0 0 4 4m-4-4-4 4M5 19h14" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Uploads</span></button>
        <button class="nav-item is-active" type="button" data-nav="profile" data-tip="Your account"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0" stroke="currentColor" stroke-linecap="round"/></svg><span>Profile</span></button>
        <button class="nav-item" type="button" data-nav="chat" data-tip="Messages"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 5.5h14v10.7H9.2L5 19.5v-14Z" stroke="currentColor" stroke-linejoin="round"/><path d="M9 10.8h.01M12 10.8h.01M15 10.8h.01" stroke="currentColor" stroke-linecap="round" stroke-width="2.6"/></svg><span>Chat</span></button>
        <button class="nav-item nav-item-ask" type="button" data-nav="ask" data-tip="AI helper"><span class="ask-emy-bubble">Hi, I'm EMY. Let me help you find what you need.</span><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.9 8.1c.35-1.08 1.36-1.8 2.5-1.8h5.2c1.14 0 2.15.72 2.5 1.8l1.7 8.7c.35 1.78-1.01 3.45-2.82 3.45H8.02c-1.81 0-3.17-1.67-2.82-3.45l1.7-8.7Z" fill="#f76512" stroke="#cf5200" stroke-linejoin="round" stroke-width="1"/><path d="M15.9 6.55c.58.35 1.02.9 1.2 1.55l1.7 8.7c.29 1.48-.6 2.88-1.96 3.32l-.98-.08c.74-.62 1.04-1.6.82-2.72l-1.25-6.7c-.28-1.5-.1-2.8.47-4.07Z" fill="#ad3e00" opacity=".2"/><path d="M6.35 10.05c2.15.62 4.02.48 5.66-.3 1.78-.85 3.62-.92 5.46-.22l.38 1.84c-2.32-.78-4.28-.63-6.04.22-1.62.78-3.45.9-5.78.28l.32-1.82Z" fill="#ffb067" opacity=".34"/><path d="M8.8 6.35c.32-1.92 1.42-3 3.2-3s2.88 1.08 3.2 3" stroke="#fff" stroke-linecap="round" stroke-width="1.18" opacity=".9"/><path d="M9.25 13.2c.46-.36.92-.36 1.38 0" stroke="#fff" stroke-linecap="round" stroke-width="1.02" opacity=".96"/><path d="M13.37 13.2c.46-.36.92-.36 1.38 0" stroke="#fff" stroke-linecap="round" stroke-width="1.02" opacity=".96"/><path d="M9.8 15.82c1.34.94 3.06.94 4.4 0" stroke="#fff" stroke-linecap="round" stroke-width="1.18" opacity=".96"/></svg><span>Ask EMY</span></button>
      </nav>
      <nav class="business-bottom-nav" data-business-bottom-nav hidden aria-label="Business navigation">
        <button class="business-nav-item" type="button" data-business-nav="home" data-tip="Home"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 11.5 12 5l8 6.5V20H6v-6h12" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Home</span></button>
        <button class="business-nav-item" type="button" data-business-nav="chat" data-tip="Chat"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 5.5h14v10.7H9.2L5 19.5v-14Z" stroke="currentColor" stroke-linejoin="round"/><path d="M9 10.8h.01M12 10.8h.01M15 10.8h.01" stroke="currentColor" stroke-linecap="round" stroke-width="2.6"/></svg><span>Chat</span></button>
        <button class="business-nav-item is-active" type="button" data-business-nav="customers" data-tip="Customers"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8.5 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor"/><path d="M3 20c.6-3.2 2.4-5.2 5.5-5.2s4.9 2 5.5 5.2" stroke="currentColor" stroke-linecap="round"/><path d="M16.5 11a3 3 0 1 0 0-6" stroke="currentColor" stroke-linecap="round"/><path d="M16 15c2.4.3 3.9 2 4.5 5" stroke="currentColor" stroke-linecap="round"/></svg><span>Customers</span></button>
        <button class="business-nav-item business-nav-services" type="button" data-business-nav="services" data-tip="Services"><em class="business-nav-tip" aria-hidden="true">Services</em><svg class="business-nav-emy-mark" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9.4" fill="#ff6a00"/><circle cx="12" cy="12" r="8.45" fill="none" stroke="rgba(255,255,255,.38)" stroke-width=".9"/><path d="M6.7 16.35V8.05h2.12v1.02c.54-.74 1.27-1.12 2.18-1.12 1 0 1.72.4 2.18 1.2.58-.8 1.42-1.2 2.48-1.2 1.78 0 2.66 1.04 2.66 3.1v5.3h-2.26v-4.9c0-.92-.34-1.38-1.02-1.38-.76 0-1.14.53-1.14 1.6v4.68h-2.27v-4.9c0-.92-.34-1.38-1.02-1.38-.75 0-1.13.53-1.13 1.6v4.68H6.7Z" fill="#fff"/><path d="M7.4 6.65c1.92.5 3.48.46 4.68-.12 1.55-.75 3.16-.76 4.84-.04" stroke="rgba(255,255,255,.42)" stroke-width=".7" stroke-linecap="round"/></svg><span>Services</span></button>
        <button class="business-nav-item" type="button" data-business-nav="upload" data-tip="Uploads"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 16V5m0 0 4 4m-4-4-4 4M5 19h14" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Uploads</span></button>
        <button class="business-nav-item" type="button" data-business-nav="profile" data-tip="Profile"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0" stroke="currentColor" stroke-linecap="round"/></svg><span>Profile</span></button>
        <button class="business-nav-item business-nav-ask" type="button" data-business-nav="ask" data-tip="AI helper"><span class="ask-emy-bubble">Hi, I'm EMY. Let me help you find what you need.</span><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.9 8.1c.35-1.08 1.36-1.8 2.5-1.8h5.2c1.14 0 2.15.72 2.5 1.8l1.7 8.7c.35 1.78-1.01 3.45-2.82 3.45H8.02c-1.81 0-3.17-1.67-2.82-3.45l1.7-8.7Z" fill="#f76512" stroke="#cf5200" stroke-linejoin="round" stroke-width="1"/><path d="M15.9 6.55c.58.35 1.02.9 1.2 1.55l1.7 8.7c.29 1.48-.6 2.88-1.96 3.32l-.98-.08c.74-.62 1.04-1.6.82-2.72l-1.25-6.7c-.28-1.5-.1-2.8.47-4.07Z" fill="#ad3e00" opacity=".2"/><path d="M6.35 10.05c2.15.62 4.02.48 5.66-.3 1.78-.85 3.62-.92 5.46-.22l.38 1.84c-2.32-.78-4.28-.63-6.04.22-1.62.78-3.45.9-5.78.28l.32-1.82Z" fill="#ffb067" opacity=".34"/><path d="M8.8 6.35c.32-1.92 1.42-3 3.2-3s2.88 1.08 3.2 3" stroke="#fff" stroke-linecap="round" stroke-width="1.18" opacity=".9"/><path d="M9.25 13.2c.46-.36.92-.36 1.38 0" stroke="#fff" stroke-linecap="round" stroke-width="1.02" opacity=".96"/><path d="M13.37 13.2c.46-.36.92-.36 1.38 0" stroke="#fff" stroke-linecap="round" stroke-width="1.02" opacity=".96"/><path d="M9.8 15.82c1.34.94 3.06.94 4.4 0" stroke="#fff" stroke-linecap="round" stroke-width="1.18" opacity=".96"/></svg><span>Ask EMY</span></button>
      </nav>
`;
const customer_profile_part_5 = String.raw`
      <div class="toast" data-toast role="status" aria-live="polite"></div>
    </main>
    <script>
      (function () {
`;
const customer_profile_part_6 = String.raw`
        function customerProfileCleanStoredText(value) {
          let text = String(value || "").trim();
          text = text.replace(/&quot;/gi, '"').replace(/&#034;/g, '"').replace(/&#039;/g, "'");
          for (let index = 0; index < 3; index += 1) {
            const next = text.replace(/^[\\s"'\\u0060\\u201c\\u201d\\u2018\\u2019]+|[\\s"'\\u0060\\u201c\\u201d\\u2018\\u2019]+$/g, "").trim();
            if (next === text) break;
            text = next;
          }
          return text;
        }
        function customerProfileCleanEmail(value) {
          const email = customerProfileCleanStoredText(value).replace(/\s+/g, "").toLowerCase();
          return /@emy\.local$/i.test(email) ? "" : email;
        }
        function cleanCustomerProfileStoredSessionValues() {
          const keys = [
            "emyCustomerDisplayName",
            "emyCustomerFirstName",
            "emyCustomerLastName",
            "emyCustomerPhone",
            "emyCustomerPhonePrefix",
            "emyCustomerPhoneCountry",
            "emyCustomerPhoneCountryName",
            "emyCustomerPhoneLocal",
            "emyMainPendingSignupFirstName",
            "emyMainPendingSignupLastName",
            "emyMainPendingSignupPhone",
            "emyMainPendingSignupPhonePrefix",
            "emyMainPendingSignupPhoneCountry",
            "emyMainPendingSignupPhoneCountryName",
            "emyMainPendingSignupPhoneLocal",
            "emyMainSignedInEmail",
            "emyMainPendingSignupEmail",
            "emyCustomerProfileVisibility",
            "emyMainPendingSignupPrivacy"
          ];
          keys.forEach((key) => {
            try {
              const current = localStorage.getItem(key);
              if (current == null) return;
              const next = key.toLowerCase().indexOf("email") >= 0 ? customerProfileCleanEmail(current) : customerProfileCleanStoredText(current);
              if (next !== current) localStorage.setItem(key, next);
            } catch (error) {}
          });
        }
        cleanCustomerProfileStoredSessionValues();
        const customerDialCountries = [
          ["GB", "United Kingdom", "+44"],
          ["US", "United States", "+1"],
          ["CA", "Canada", "+1"],
          ["FR", "France", "+33"],
          ["DE", "Germany", "+49"],
          ["ES", "Spain", "+34"],
          ["IT", "Italy", "+39"],
          ["PT", "Portugal", "+351"],
          ["NL", "Netherlands", "+31"],
          ["BE", "Belgium", "+32"],
          ["IE", "Ireland", "+353"],
          ["CH", "Switzerland", "+41"],
          ["AT", "Austria", "+43"],
          ["SE", "Sweden", "+46"],
          ["NO", "Norway", "+47"],
          ["DK", "Denmark", "+45"],
          ["FI", "Finland", "+358"],
          ["PL", "Poland", "+48"],
          ["RO", "Romania", "+40"],
          ["GR", "Greece", "+30"],
          ["TR", "Turkey", "+90"],
          ["AU", "Australia", "+61"],
          ["NZ", "New Zealand", "+64"],
          ["NG", "Nigeria", "+234"],
          ["GH", "Ghana", "+233"],
          ["ZA", "South Africa", "+27"],
          ["KE", "Kenya", "+254"],
          ["UG", "Uganda", "+256"],
          ["CM", "Cameroon", "+237"],
          ["CI", "Cote d'Ivoire", "+225"],
          ["SN", "Senegal", "+221"],
          ["MA", "Morocco", "+212"],
          ["DZ", "Algeria", "+213"],
          ["EG", "Egypt", "+20"],
          ["AE", "United Arab Emirates", "+971"],
          ["SA", "Saudi Arabia", "+966"],
          ["IN", "India", "+91"],
          ["PK", "Pakistan", "+92"],
          ["BD", "Bangladesh", "+880"],
          ["LK", "Sri Lanka", "+94"],
          ["CN", "China", "+86"],
          ["JP", "Japan", "+81"],
          ["KR", "South Korea", "+82"],
          ["PH", "Philippines", "+63"],
          ["ID", "Indonesia", "+62"],
          ["MY", "Malaysia", "+60"],
          ["SG", "Singapore", "+65"],
          ["TH", "Thailand", "+66"],
          ["BR", "Brazil", "+55"],
          ["MX", "Mexico", "+52"],
          ["AR", "Argentina", "+54"],
          ["CO", "Colombia", "+57"],
          ["PE", "Peru", "+51"],
          ["CL", "Chile", "+56"],
          ["JM", "Jamaica", "+1 876"]
        ];
        const firstName = customerProfileCleanStoredText(localStorage.getItem("emyMainPendingSignupFirstName") || "");
        const lastName = customerProfileCleanStoredText(localStorage.getItem("emyMainPendingSignupLastName") || "");
        let profileEmail = customerProfileCleanEmail(localStorage.getItem("emyMainSignedInEmail") || localStorage.getItem("emyMainPendingSignupEmail") || "");
        function customerProfileNameFromStorage(fallback) {
          const display = customerProfileCleanStoredText(localStorage.getItem("emyCustomerDisplayName") || "");
          const customerFirst = customerProfileCleanStoredText(localStorage.getItem("emyCustomerFirstName") || "");
          const customerLast = customerProfileCleanStoredText(localStorage.getItem("emyCustomerLastName") || "");
          const pendingFirst = customerProfileCleanStoredText(localStorage.getItem("emyMainPendingSignupFirstName") || "");
          const pendingLast = customerProfileCleanStoredText(localStorage.getItem("emyMainPendingSignupLastName") || "");
          const emailName = customerProfileCleanEmail(localStorage.getItem("emyMainSignedInEmail") || localStorage.getItem("emyMainPendingSignupEmail") || "").split("@")[0] || "";
          return customerProfileCleanStoredText(display || [customerFirst, customerLast].filter(Boolean).join(" ") || [pendingFirst, pendingLast].filter(Boolean).join(" ") || emailName || fallback || "Stephane");
        }
        function customerProfileFirstLastFromName() {
          const parts = customerProfileNameFromStorage(profileEmail ? profileEmail.split("@")[0] : "Stephane").split(" ").filter(Boolean);
          return { first: parts[0] || "Stephane", last: parts.slice(1).join(" ") };
        }
        let profileName = customerProfileNameFromStorage(profileEmail ? profileEmail.split("@")[0] : "Stephane");
        function customerProfileQueryValue(key) {
          try { return String(new URLSearchParams(window.location.search).get(key) || "").trim(); } catch (error) { return ""; }
        }
        function requestedCustomerProfileTarget() {
          return customerProfileQueryValue("customer");
        }
        function isBusinessCustomerProfileRoute() {
          const requested = requestedCustomerProfileTarget();
          if (!requested) return false;
          const from = customerProfileQueryValue("from").toLowerCase();
          const view = customerProfileQueryValue("view").toLowerCase();
          const mode = customerProfileQueryValue("mode").toLowerCase();
          let flagged = false;
          try { flagged = sessionStorage.getItem("emyBusinessCustomerProfileView") === "1"; } catch (error) {}
          return flagged || from === "business" || view === "business-customer" || mode === "business-customer";
        }
        function isFullCustomerProfileRoute() {
          const view = customerProfileQueryValue("view").toLowerCase();
          const mode = customerProfileQueryValue("mode").toLowerCase();
          let flagged = false;
          try { flagged = sessionStorage.getItem("emyCustomerProfileFullView") === "1"; } catch (error) {}
          return flagged || view === "customer" || view === "current-customer" || view === "mine" || mode === "customer" || mode === "current-customer";
        }
        function clearSelectedCustomerPreviewContext() {
          try {
            [
              "emySelectedCustomerProfileName",
              "emySelectedCustomerProfileKey",
              "emySelectedCustomerProfileEmail",
              "emySelectedCustomerProfilePhoto",
              "emySelectedCustomerProfilePhotoRef",
              "emySelectedCustomerProfilePhotoSource"
            ].forEach((key) => localStorage.removeItem(key));
            sessionStorage.removeItem("emyCustomerProfileFullView");
            sessionStorage.removeItem("emyBusinessCustomerProfileView");
          } catch (error) {}
        }
        function normaliseCustomerProfileStartupRoute() {
          if (!isFullCustomerProfileRoute()) return;
          clearSelectedCustomerPreviewContext();
          try {
            const url = new URL(window.location.href);
            url.searchParams.delete("customer");
            url.searchParams.set("view", "customer");
            url.hash = "";
            history.replaceState(null, "", url.pathname + url.search);
          } catch (error) {}
        }
        normaliseCustomerProfileStartupRoute();
        if (document.body) document.body.classList.toggle("is-business-customer-profile-view", isBusinessCustomerProfileRoute());
        function selectedCustomerPreviewContext() {
          if (isFullCustomerProfileRoute()) return null;
          let requested = requestedCustomerProfileTarget();
          requested = String(requested || "").trim();
          if (!requested) return null;
          const storedKey = String(localStorage.getItem("emySelectedCustomerProfileKey") || "").trim();
          const storedName = String(localStorage.getItem("emySelectedCustomerProfileName") || "").trim();
          const storedEmail = String(localStorage.getItem("emySelectedCustomerProfileEmail") || "").trim();
          const storedPhoto = String(localStorage.getItem("emySelectedCustomerProfilePhoto") || "").trim();
          const storedPhotoRef = String(localStorage.getItem("emySelectedCustomerProfilePhotoRef") || "").trim();
          const storedPhotoSource = String(localStorage.getItem("emySelectedCustomerProfilePhotoSource") || "").trim();
          const canUseStoredPhoto = storedPhotoSource === "customer-profile";
          const requestedLooksEmail = requested.indexOf("@") > 0;
          return {
            key: storedKey || requested,
            name: profileText(storedName || (requestedLooksEmail ? "" : requested) || profileName, profileName),
            email: profileText(storedEmail || (requestedLooksEmail ? requested : ""), ""),
            photo: canUseStoredPhoto ? storedPhoto : "",
            photoRef: canUseStoredPhoto ? storedPhotoRef : ""
          };
        }
        function selectedCustomerPreviewName() {
          const selected = selectedCustomerPreviewContext();
          return selected && selected.name ? selected.name : profileName;
        }
        const profilePreviewPhotos = Array.from(document.querySelectorAll("[data-profile-preview-photo]"));
        const profilePhotoPreview = document.querySelector("[data-profile-photo-preview]");
        const avatarNodes = [document.querySelector("[data-avatar]"), document.querySelector("[data-profile-photo]"), document.querySelector("[data-session-photo]")];
        const photoInput = document.querySelector("[data-photo-input]");
        const editPhotoButton = document.querySelector("[data-edit-photo]");
        const photoSourceSheet = document.querySelector("[data-photo-source-sheet]");
        const photoSourceClose = document.querySelector("[data-photo-source-close]");
        const photoSourceButtons = Array.from(document.querySelectorAll("[data-photo-source]"));
        const photoCameraSheet = document.querySelector("[data-photo-camera-sheet]");
        const photoCameraPreview = document.querySelector("[data-photo-camera-preview]");
        const photoCameraStatus = document.querySelector("[data-photo-camera-status]");
        const photoCameraCancel = document.querySelector("[data-photo-camera-cancel]");
        const photoCameraCapture = document.querySelector("[data-photo-camera-capture]");
        const photoCropModal = document.querySelector("[data-photo-crop-modal]");
        const photoCropFrame = document.querySelector("[data-photo-crop-frame]");
        const photoCropZoom = document.querySelector("[data-photo-crop-zoom]");
        const photoCropX = document.querySelector("[data-photo-crop-x]");
        const photoCropY = document.querySelector("[data-photo-crop-y]");
        const photoCropChange = document.querySelector("[data-photo-crop-change]");
        const photoCropCancel = document.querySelector("[data-photo-crop-cancel]");
        const photoCropApply = document.querySelector("[data-photo-crop-apply]");
        const toast = document.querySelector("[data-toast]");
        const notificationButton = document.querySelector("[data-open-notifications]");
        const notificationCount = document.querySelector("[data-notification-count]");
        const notificationPanel = document.querySelector("[data-profile-notification-panel]");
        const notificationList = document.querySelector("[data-profile-notification-list]");
        const notificationClose = document.querySelector("[data-profile-notification-close]");
        const notificationSettings = document.querySelector("[data-profile-notification-settings]");
        const profileBusinessRouteTopbar = document.querySelector(".business-app-header[data-business-shell]");
        const profileBusinessRouteBottomNav = document.querySelector("[data-business-bottom-nav]");
        const profileBusinessRouteName = document.querySelector("[data-business-top-name]");
        const profileBusinessRouteAvatar = document.querySelector("[data-business-top-avatar]");
        const profileBusinessRouteLocationLabel = document.querySelector("[data-business-top-location]");
        const profileBusinessRouteNotificationButton = document.querySelector("[data-business-top-notifications]");
        const profileBusinessRouteNotificationCount = document.querySelector("[data-business-notification-count]");
        const profileBusinessRouteNavButtons = Array.from(document.querySelectorAll("[data-back], [data-business-top-search], [data-business-switch-customer]"));
        const profileBusinessBottomNavButtons = Array.from(document.querySelectorAll("[data-business-nav]"));
        const locationModal = document.querySelector("[data-profile-location-modal]");
        const locationTitle = document.querySelector("[data-profile-location-title]");
        const locationDetail = document.querySelector("[data-profile-location-detail]");
        const locationCurrentButton = document.querySelector("[data-profile-current-location]");
        const currentRadius = document.querySelector("[data-profile-current-radius]");
        const locationRadiusValue = document.querySelector("[data-profile-radius-value]");
        const radiusButtons = Array.from(document.querySelectorAll("[data-profile-radius] [data-radius]"));
        const formRadiusButtons = Array.from(document.querySelectorAll("[data-profile-form-radius-options] [data-radius]"));
        const locationList = document.querySelector("[data-profile-location-list]");
        const locationEmpty = document.querySelector("[data-profile-location-empty]");
        const locationForm = document.querySelector("[data-profile-location-form]");
        const locationAdd = document.querySelector("[data-profile-location-add]");
        const locationStatus = document.querySelector("[data-profile-location-status]");
        const placeTabs = Array.from(document.querySelectorAll("[data-profile-place-tab]"));
        const placeInput = document.querySelector("[data-profile-place-input]");
        const placeSuggestions = document.querySelector("[data-profile-place-suggestions]");
        const defaultProfileView = document.querySelector("[data-profile-default-view]");
        const profileViews = Array.from(document.querySelectorAll("[data-profile-view]"));
        const profileRouteButtons = Array.from(document.querySelectorAll("[data-profile-route]"));
        const profileLinkButtons = Array.from(document.querySelectorAll("[data-profile-link]"));
        const profileBackButtons = Array.from(document.querySelectorAll("[data-profile-back]"));
        const sessionForm = document.querySelector("[data-session-form]");
        const sessionFirst = document.querySelector("[data-session-first]");
        const sessionLast = document.querySelector("[data-session-last]");
        const sessionPhone = document.querySelector("[data-session-phone]");
        const sessionPhoneCode = document.querySelector("[data-session-phone-code]");
        const sessionPhoneCountry = document.querySelector("[data-session-phone-country]");
        const sessionCodeWidget = document.querySelector("[data-session-code-widget]");
        const sessionCodeButton = document.querySelector("[data-session-code-button]");
        const sessionCodeValue = document.querySelector("[data-session-code-value]");
        const sessionCodeMenu = document.querySelector("[data-session-code-menu]");
        const sessionCodeSearch = document.querySelector("[data-session-code-search]");
        const sessionCodeOptions = document.querySelector("[data-session-code-options]");
        const sessionCodeEmpty = document.querySelector("[data-session-code-empty]");
        const sessionEmail = document.querySelector("[data-session-email]");
        const sessionChangePhoto = document.querySelector("[data-session-change-photo]");
        const sessionEditLocation = document.querySelector("[data-session-edit-location]");
        const sessionVisibilityButtons = Array.from(document.querySelectorAll("[data-session-visibility]"));
        const profileExtraForm = document.querySelector("[data-profile-extra-form]");
        const profileAboutInput = document.querySelector("[data-profile-about]");
        const profileSocialInputs = Array.from(document.querySelectorAll("[data-profile-social-url]"));
        const profileSocialVisibleInputs = Array.from(document.querySelectorAll("[data-profile-social-visible]"));
        const profileInterestButtons = Array.from(document.querySelectorAll("[data-profile-interest]"));
        const profileInterestSummary = document.querySelector("[data-profile-interest-summary]");
        const profilePreviewOpen = document.querySelector("[data-profile-preview-open]");
        const profileBusinessPreviews = Array.from(document.querySelectorAll("[data-profile-business-preview]"));
        const profileBusinessPreviewDetails = Array.from(document.querySelectorAll(".profile-business-preview-details"));
        const profilePrivateGates = Array.from(document.querySelectorAll("[data-profile-private-gate]"));
        const profilePrivateGateCopies = Array.from(document.querySelectorAll("[data-profile-private-gate-copy]"));
        const profilePrivateConnectButtons = Array.from(document.querySelectorAll("[data-profile-private-connect]"));
        const profilePreviewNames = Array.from(document.querySelectorAll("[data-profile-preview-name]"));
        const profilePreviewLocations = Array.from(document.querySelectorAll("[data-profile-preview-location]"));
        const profilePreviewAbouts = Array.from(document.querySelectorAll("[data-profile-preview-about]"));
        const profilePreviewSocialsList = Array.from(document.querySelectorAll("[data-profile-preview-socials]"));
        const profilePreviewInterestsList = Array.from(document.querySelectorAll("[data-profile-preview-interests]"));
        const profilePreviewVisibilityList = Array.from(document.querySelectorAll("[data-profile-preview-visibility]"));
        const profilePreviewRelationshipLabels = Array.from(document.querySelectorAll("[data-profile-preview-relationship-label]"));
        const profilePreviewRelationshipTitles = Array.from(document.querySelectorAll("[data-profile-preview-relationship-title]"));
        const profilePreviewRelationshipDates = Array.from(document.querySelectorAll("[data-profile-preview-relationship-date]"));
        const profilePreviewBusinessCounts = Array.from(document.querySelectorAll("[data-profile-preview-business-count]"));
        const profilePreviewBusinessStripCounts = Array.from(document.querySelectorAll("[data-profile-preview-business-strip-count]"));
        const profilePreviewProductCounts = Array.from(document.querySelectorAll("[data-profile-preview-product-count]"));
        const profilePreviewProductLists = Array.from(document.querySelectorAll("[data-profile-preview-products]"));
        const profilePreviewProductRangeButtons = Array.from(document.querySelectorAll("[data-profile-product-range]"));
        const profilePreviewBusinessLists = Array.from(document.querySelectorAll("[data-profile-preview-businesses]"));
        const profilePreviewBusinessScrollButtons = Array.from(document.querySelectorAll("[data-profile-business-scroll]"));
        const profilePreviewChatLinks = Array.from(document.querySelectorAll("[data-profile-preview-chat]"));
        const publicCustomerProfileViews = Array.from(document.querySelectorAll(".customer-public-profile-view"));
        const publicActivityTrack = document.querySelector("[data-public-customer-activity-track]");
        const publicActivityTabs = Array.from(document.querySelectorAll("[data-public-activity-tabs] button[data-public-activity-category]"));
        const publicActivityArrows = Array.from(document.querySelectorAll("[data-public-activity-arrow]"));
        const publicActivitySearch = document.querySelector("[data-public-activity-search]");
        const settingsLinks = Array.from(document.querySelectorAll("[data-settings-link]"));
        const favouriteGrid = document.querySelector("[data-favourite-grid]");
        let profilePreviewProductRange = "all";
        const profileRequestsList = document.querySelector("[data-profile-requests-list]");
        const profileRequestsSummary = document.querySelector("[data-profile-requests-summary]");
        const profileCustomersList = document.querySelector("[data-profile-customers-list]");
        const profileCustomersCount = document.querySelector("[data-profile-customers-count]");
        const profileEventsList = document.querySelector("[data-profile-events-list]");
        const profileApplicationsList = document.querySelector("[data-profile-applications-list]");
        const profileEventsSummary = document.querySelector("[data-profile-events-summary]");
        const profileApplicationsSummary = document.querySelector("[data-profile-applications-summary]");
        let toastTimer = null;
        let draftLocation = {};
        let draftRadius = 5;
        let profilePlaces = [];
        let profileLocationOptions = [];
        let activePlaceLabel = "Home";
        let editingPlaceId = "";
        let selectedPlaceSuggestion = null;
        let currentPlaceSuggestions = [];
        let suggestionTimer = null;
        let suggestionRequestId = 0;
        let photoDraftSrc = "";
        let photoDraftCrop = { zoom:100, x:50, y:50 };
        let photoOriginalSrc = "";
        let photoOriginalCrop = { zoom:100, x:50, y:50 };
        let photoCropPreviewMedia = null;
        let photoCropDrag = null;
        let photoCameraStream = null;
        let profilePhotoManualSaveInProgress = false;
        let profilePhotoAliasSyncInProgress = false;
        const PROFILE_PHOTO_ALIAS_INLINE_LIMIT = 180000;
        const PROFILE_PHOTO_SNAPSHOT_LIMIT = 2048;
        const customerProfilePhotoBackupKeys = {
          photo: "emyCustomerProfilePhotoBackup",
          photoSrc: "emyCustomerProfilePhotoSrcBackup",
          ref: "emyCustomerProfilePhotoRefBackup",
          crop: "emyCustomerProfilePhotoCropBackup",
          savedAt: "emyCustomerProfilePhotoBackupSavedAt"
        };
        let publicActivityCategory = "all";
        let publicActivityQuery = "";
        let publicActivityScrollFrame = 0;
        let publicActivityMenuScrollFrame = 0;
        let publicActivityMenuScrollX = 0;
        let publicActivityMenuScrollY = 0;
        const PROFILE_APPLICATION_BATCH_SIZE = 10;
        let profileApplicationsVisibleCount = PROFILE_APPLICATION_BATCH_SIZE;

        function showToast(message) {
          toast.textContent = message;
          toast.classList.add("is-visible");
          clearTimeout(toastTimer);
          toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2300);
        }
        function readJson(key, fallback) {
          try { const stored = localStorage.getItem(key); return stored ? JSON.parse(stored) : fallback; } catch (error) { return fallback; }
        }
        function escapeHtml(value) {
          return String(value || "").replace(/[&<>"']/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" }[char]));
        }
        function savedFeedItemsArray() {
          const saved = readJson("emySavedFeedItems", {});
          if (Array.isArray(saved)) return saved;
          if (saved && typeof saved === "object") return Object.keys(saved).map((key) => Object.assign({ id:key }, saved[key]));
          return [];
        }
        function favouriteKindClass(value) {
          return String(value || "feed").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "feed";
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
        function renderFavouriteItems() {
          if (!favouriteGrid) return;
          const saved = savedFeedItemsArray().filter((item) => item && (item.id || item.title || item.business));
          if (!saved.length) {
            window.emySetListHtmlIfChanged(favouriteGrid, '<p class="favourite-empty">Saved posts, clips, jobs, products, and businesses will appear here when you tap the save button in Feeds.</p>');
            return;
          }
          window.emySetListHtmlIfChanged(favouriteGrid, saved.map((item) => {
            const kind = item.kind || item.type || "Saved item";
            const title = item.title || item.name || item.business || "Saved feed item";
            const business = item.business || "EMY feed";
            const href = item.href || "emy-customer-home.html#feeds";
            return '<a class="favourite-card" href="' + escapeHtml(href) + '">' +
              '<div class="favourite-photo ' + escapeHtml(favouriteKindClass(kind)) + '" aria-hidden="true"></div>' +
              '<h3>' + escapeHtml(title) + '</h3>' +
              '<p>' + escapeHtml(kind) + ' - ' + escapeHtml(business) + '</p>' +
              '<span class="heart-dot" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 20s-7.2-4.3-9-9.1C1.9 7.8 3.7 5 6.7 5c1.8 0 3.3.9 4.1 2.3C11.6 5.9 13.1 5 14.9 5c3 0 4.8 2.8 3.7 5.9C16.8 15.7 12 20 12 20Z"/></svg></span>' +
            '</a>';
          }).join(""));
        }
        function profileArray(value) {
          if (Array.isArray(value)) return value;
          if (value && typeof value === "object") return Object.keys(value).map((key) => Object.assign({ id:key }, value[key]));
          return [];
        }
        function profileText(value, fallback) {
          const text = String(value || "").trim();
          return text || fallback || "";
        }
        function profileSlug(value) {
          return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        }
        function profileShortDate(value, fallback) {
          const text = profileText(value, "");
          if (!text) return fallback || "";
          const isoMatch = text.match(/\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?(?:Z|[+-]\d{2}:?\d{2})?)?/);
          const parseTarget = isoMatch ? isoMatch[0] : text;
          const date = new Date(parseTarget);
          if (!Number.isNaN(date.getTime()) && (/^\d{4}-\d{2}-\d{2}/.test(parseTarget) || isoMatch)) {
            const formatted = date.toLocaleString("en-GB", { month:"short", day:"numeric", year:"numeric", hour:"numeric", minute:"2-digit" });
            return isoMatch ? text.replace(isoMatch[0], formatted) : formatted;
          }
          return text;
        }
        function profileDisplayDate(value) {
          const text = profileText(value, "");
          if (!text) return "Date not set";
          const isoMatch = text.match(/\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?(?:Z|[+-]\d{2}:?\d{2})?)?/);
          const date = new Date(isoMatch ? isoMatch[0] : text);
          if (Number.isNaN(date.getTime())) return text;
          return date.toLocaleDateString("en-GB", { day:"2-digit", month:"short", year:"numeric" });
        }
        function profilePlural(count, singular, plural) {
          return count + " " + (count === 1 ? singular : (plural || singular + "s"));
        }
        function customerProfileVisibility() {
          const override = typeof window !== "undefined" ? String(window.__emyCustomerProfileVisibilityOverride || "").toLowerCase() : "";
          if (override === "public" || override === "private") return override;
          const saved = profileText(customerProfileCleanStoredText(localStorage.getItem("emyCustomerProfileVisibility") || localStorage.getItem("emyMainPendingSignupPrivacy")), "private").toLowerCase();
          return saved === "public" ? "public" : "private";
        }
        function customerBusinessEntries() {
          const stored = readJson("emyCustomerBusinesses", {});
          const rows = Array.isArray(stored) ? stored.filter(Boolean) : (stored && typeof stored === "object" ? Object.keys(stored).map((key) => Object.assign({ key }, stored[key] || {})) : []);
          return dedupeCustomerBusinessEntries(rows);
        }
        function customerBusinessObject() {
          const stored = readJson("emyCustomerBusinesses", {});
          if (stored && typeof stored === "object" && !Array.isArray(stored)) return Object.assign({}, stored);
          const result = {};
          profileArray(stored).forEach((item, index) => {
            const key = profileSlug(item && (item.key || item.id || item.businessKey || item.name || item.business || index)) || "business-" + index;
            result[key] = Object.assign({}, item || {}, { key, businessKey:key });
          });
          return result;
        }
        function customerRequestObject() {
          const stored = readJson("emyCustomerRelationshipRequests", {});
          if (stored && typeof stored === "object" && !Array.isArray(stored)) return Object.assign({}, stored);
          const result = {};
          profileArray(stored).forEach((item, index) => {
            const key = profileSlug(item && (item.key || item.id || item.businessKey || item.name || item.business || index)) || "request-" + index;
            result[key] = Object.assign({}, item || {}, { key, businessKey:key });
          });
          return result;
        }
        function customerRequestEntries() {
          const requests = customerRequestObject();
          return Object.keys(requests).map((key) => Object.assign({ key, businessKey:key }, requests[key] || {})).sort((a, b) => {
            const aTime = new Date(a.respondedAt || a.requestedAt || a.createdAt || 0).getTime() || 0;
            const bTime = new Date(b.respondedAt || b.requestedAt || b.createdAt || 0).getTime() || 0;
            return bTime - aTime;
          });
        }
        function saveCustomerRequests(requests) {
          try { localStorage.setItem("emyCustomerRelationshipRequests", JSON.stringify(requests || {})); } catch (error) {}
        }
        function saveCustomerBusinesses(businesses) {
          try { localStorage.setItem("emyCustomerBusinesses", JSON.stringify(businesses || {})); } catch (error) {}
        }
        function profileCustomerRelationshipIdentity() {
          const selected = selectedCustomerPreviewContext();
          const photo = selected && selected.photo ? selected.photo : (typeof currentProfilePhotoSrc === "function" ? currentProfilePhotoSrc() : (localStorage.getItem("emyCustomerProfilePhoto") || localStorage.getItem("emyCustomerProfilePhotoSrc") || ""));
          const photoRef = selected && selected.photoRef ? selected.photoRef : (typeof currentProfilePhotoRef === "function" ? currentProfilePhotoRef() : (localStorage.getItem("emyCustomerProfilePhotoRef") || ""));
          const name = profileText(selected && selected.name || profileName, "Customer");
          const email = profileText(selected && selected.email || profileEmail, "");
          const key = profileSlug(selected && (selected.key || selected.email || selected.name) || email || name) || "customer";
          return { key, id:key, profileKey:key, name, customerName:name, email, customerEmail:email, photo, photoRef };
        }
        function profileCustomerRelationshipAliases(item) {
          const customer = item || profileCustomerRelationshipIdentity();
          return Array.from(new Set([
            customer.key,
            customer.id,
            customer.profileKey,
            customer.customerKey,
            customer.name,
            customer.customerName,
            customer.email,
            customer.customerEmail
          ].map(profileSlug).filter(Boolean)));
        }
        function profileBusinessRelationshipAliases(businessKey, businessName, request) {
          return Array.from(new Set([
            businessKey,
            businessName,
            request && request.key,
            request && request.id,
            request && request.businessKey,
            request && request.businessId,
            request && request.profileKey,
            request && request.name,
            request && request.business,
            request && request.businessName,
            request && request.title
          ].concat(customerBusinessIdentityAliases(request || {}, businessKey)).map(profileSlug).filter(Boolean)));
        }
        function profileRelationshipObjectStore(storageKey) {
          const stored = readJson(storageKey, {});
          if (stored && typeof stored === "object" && !Array.isArray(stored)) return Object.assign({}, stored);
          const result = {};
          profileArray(stored).forEach((item, index) => {
            if (!item || typeof item !== "object") return;
            const key = profileSlug(item.customerKey || item.profileKey || item.email || item.customerEmail || item.id || item.key || item.name || item.customerName || index) || "customer-" + index;
            result[key] = Object.assign({}, item, { key:item.key || key });
          });
          return result;
        }
        function saveProfileRelationshipObjectStore(storageKey, value) {
          try { localStorage.setItem(storageKey, JSON.stringify(value || {})); } catch (error) {}
        }
        function profileRelationshipRowsMatch(row, customerAliases, businessAliases, requireBusinessMatch) {
          if (!row || typeof row !== "object") return false;
          const rowCustomerAliases = profileCustomerRelationshipAliases(row);
          const rowBusinessAliases = profileBusinessRelationshipAliases(row.businessKey || row.businessId || row.key, row.businessName || row.business || row.name || row.title, row);
          const customerMatches = !customerAliases.length || rowCustomerAliases.some((alias) => customerAliases.indexOf(alias) >= 0);
          const businessMatches = !requireBusinessMatch || !businessAliases.length || rowBusinessAliases.some((alias) => businessAliases.indexOf(alias) >= 0);
          return customerMatches && businessMatches;
        }
        function profileRelationshipSyncKeys(businessKey, businessName, request) {
          const keys = ["emyCustomerRelationshipRequests", "emyCustomerBusinesses", "emyCustomerNotifications", "emyBusinessCustomers"];
          profileBusinessRelationshipAliases(businessKey, businessName, request).forEach((alias) => {
            keys.push("emyBusinessCustomers:" + alias);
            keys.push("emyBusinessNotifications:" + alias);
          });
          return Array.from(new Set(keys.filter(Boolean)));
        }
        function syncProfileRelationshipSurfaces(action, detail) {
          const payload = Object.assign({ action, type:"customer-business" }, detail || {});
          const keys = profileRelationshipSyncKeys(payload.businessKey || payload.key, payload.businessName || payload.name, payload.request);
          try { window.dispatchEvent(new CustomEvent("emy:customer-business-changed", { detail: payload })); } catch (error) {}
          try { window.dispatchEvent(new CustomEvent("emy:business-content-changed", { detail: payload })); } catch (error) {}
          try {
            if (window.emyFlushSharedPortContentKeys) window.emyFlushSharedPortContentKeys(keys, "customer-relationship-" + action);
            else if (window.emySyncSharedPortContentNow) window.emySyncSharedPortContentNow("customer-relationship-" + action);
          } catch (error) {}
          try {
            if (window.emyRefreshBusinessCustomerBadges) window.emyRefreshBusinessCustomerBadges(payload);
            if (window.emySyncContentSurfaces) window.emySyncContentSurfaces("customer-relationship-" + action);
            else if (window.emyRefreshRealHomeSurfaces) window.emyRefreshRealHomeSurfaces("customer-relationship-" + action);
          } catch (error) {}
        }
        function upsertProfileBusinessCustomerStores(businessKey, businessName, request, now) {
          const customer = profileCustomerRelationshipIdentity();
          const name = profileText(businessName || request && (request.name || request.business || request.businessName || request.title), "Business");
          const key = profileSlug(businessKey || request && (request.key || request.businessKey || request.id) || name) || "business";
          const businessAliases = profileBusinessRelationshipAliases(key, name, request);
          const customerAliases = profileCustomerRelationshipAliases(customer);
          const row = Object.assign({}, request || {}, {
            key: customer.key,
            id: customer.key,
            customerKey: customer.key,
            profileKey: customer.key,
            customerName: customer.name,
            name: customer.name,
            customerEmail: customer.email,
            email: customer.email,
            businessKey: key,
            businessName: name,
            business: name,
            status: "accepted",
            statusText: "Customer",
            customerStatus: "accepted",
            relationshipStatus: "accepted",
            active: true,
            isCustomer: true,
            connected: true,
            following: true,
            accepted: true,
            approved: true,
            acceptedAt: now,
            addedAt: now,
            customerSince: now,
            avatar: customer.photo,
            avatarSrc: customer.photo,
            photo: customer.photo,
            customerPhoto: customer.photo,
            photoRef: customer.photoRef,
            customerPhotoRef: customer.photoRef
          });
          const globalRows = profileRelationshipObjectStore("emyBusinessCustomers");
          Object.keys(globalRows).forEach((itemKey) => {
            if (profileRelationshipRowsMatch(globalRows[itemKey], customerAliases, businessAliases, true)) delete globalRows[itemKey];
          });
          globalRows[key + "::" + customer.key] = row;
          saveProfileRelationshipObjectStore("emyBusinessCustomers", globalRows);
          businessAliases.forEach((alias) => {
            const storageKey = "emyBusinessCustomers:" + alias;
            const scopedRows = profileRelationshipObjectStore(storageKey);
            Object.keys(scopedRows).forEach((itemKey) => {
              if (profileRelationshipRowsMatch(scopedRows[itemKey], customerAliases, businessAliases, false)) delete scopedRows[itemKey];
            });
            scopedRows[customer.key] = row;
            saveProfileRelationshipObjectStore(storageKey, scopedRows);
          });
        }
        function removeProfileBusinessCustomerStores(businessKey, businessName, request) {
          const customerAliases = profileCustomerRelationshipAliases(profileCustomerRelationshipIdentity()).concat(profileCustomerRelationshipAliases(request || {}));
          const businessAliases = profileBusinessRelationshipAliases(businessKey, businessName, request);
          const uniqueCustomerAliases = Array.from(new Set(customerAliases.filter(Boolean)));
          const storageKeys = ["emyBusinessCustomers"].concat(businessAliases.map((alias) => "emyBusinessCustomers:" + alias));
          storageKeys.forEach((storageKey) => {
            const rows = profileRelationshipObjectStore(storageKey);
            let changed = false;
            Object.keys(rows).forEach((itemKey) => {
              const requireBusinessMatch = storageKey === "emyBusinessCustomers";
              if (profileRelationshipRowsMatch(rows[itemKey], uniqueCustomerAliases, businessAliases, requireBusinessMatch)) {
                delete rows[itemKey];
                changed = true;
              }
            });
            if (changed) saveProfileRelationshipObjectStore(storageKey, rows);
          });
        }
        function setProfileCustomerBusinessFlags(businessKey, businessName, request, active) {
          profileBusinessRelationshipAliases(businessKey, businessName, request).forEach((alias) => {
            try { localStorage.setItem("emyCustomerBusiness:" + alias, active ? "1" : "0"); } catch (error) {}
          });
        }
        function addCustomerRequestNotification(request) {
          if (!request || !request.businessKey) return;
          try {
            const now = request.requestedAt || new Date().toISOString();
            const id = "customer-request-" + profileSlug(request.businessKey || request.key || request.name || "business");
            const stored = readJson("emyCustomerNotifications", []);
            const list = Array.isArray(stored) ? stored : [];
              const notification = {
                id,
                type: "customer-request",
                group: "important",
                title: profileText(request.name || request.business || "A business", "A business") + " requested to add you as a customer",
                message: "Review this under Customers.",
                businessKey: request.businessKey || request.key || "",
                businessName: request.name || request.business || "",
                avatar: request.avatar || request.logo || request.photo || "",
                initials: profileText(request.name || request.business || "B", "B").slice(0, 1).toUpperCase(),
                href: "emy-customer-profile.html#requests",
              createdAt: now,
              time: now,
              read: false,
              unread: true
            };
            const next = [notification].concat(list.filter((item) => item && String(item.id || "") !== id)).slice(0, 80);
            localStorage.setItem("emyCustomerNotifications", JSON.stringify(next));
          } catch (error) {}
          renderNotifications();
        }
        function profileBusinessNotificationKeys(businessKey, businessName) {
          const values = [businessKey, profileSlug(businessKey), businessName, profileSlug(businessName)].map((value) => profileText(value, "")).filter(Boolean);
          if (values.includes("angi-pizza-zone")) values.push("angi-pizza");
          if (values.includes("angi-pizza")) values.push("angi-pizza-zone");
          if (values.includes("ever-glow-face-wash")) values.push("ever-glow");
          if (values.includes("ever-glow")) values.push("ever-glow-face-wash");
          return Array.from(new Set(values));
        }
        function pushProfileBusinessNotification(businessKey, businessName, action, body, title) {
          try {
            const key = profileText(businessKey || profileSlug(businessName), "");
            const name = profileText(businessName || key, "Business");
            if (!key) return;
            const customerPhoto = typeof currentProfilePhotoSrc === "function" ? currentProfilePhotoSrc() : (localStorage.getItem("emyCustomerProfilePhoto") || localStorage.getItem("emyCustomerProfilePhotoSrc") || "");
            const customerPhotoRef = typeof currentProfilePhotoRef === "function" ? currentProfilePhotoRef() : (localStorage.getItem("emyCustomerProfilePhotoRef") || "");
            const notification = {
              id: "customer-relationship-" + action + "-" + key + "-" + Date.now(),
              type: "customer-" + action,
              group: "business",
              businessKey: key,
              businessName: name,
              title: title || "Customer activity",
              body: profileText(body, profileText(profileName, "A customer") + " updated their customer relationship."),
              customerName: profileText(profileName, "Customer"),
              actorName: profileText(profileName, "Customer"),
              avatar: customerPhoto,
              avatarSrc: customerPhoto,
              avatarRef: customerPhotoRef,
              customerPhoto,
              customerPhotoRef,
              href: "emy-business-profile.html?mode=business#notifications",
              createdAt: new Date().toISOString(),
              read: false,
              unread: true
            };
            profileBusinessNotificationKeys(key, name).forEach((storageKey) => {
              const rows = readJson("emyBusinessNotifications:" + storageKey, []);
              const list = Array.isArray(rows) ? rows : [];
              localStorage.setItem("emyBusinessNotifications:" + storageKey, JSON.stringify([notification].concat(list.filter((item) => item && item.id !== notification.id)).slice(0, 80)));
            });
          } catch (error) {}
        }
        function profileFormatTime(value) {
          const match = String(value || "").match(/^(\\d{1,2}):(\\d{2})$/);
          if (!match) return profileText(value, "");
          const hour24 = Number(match[1]);
          const minute = match[2];
          if (!Number.isFinite(hour24)) return profileText(value, "");
          const period = hour24 >= 12 ? "PM" : "AM";
          const hour12 = hour24 % 12 || 12;
          return hour12 + ":" + minute + " " + period;
        }
        function profileWorkingDaysSummary(schedule) {
          const source = schedule && typeof schedule === "object" ? schedule : {};
          const days = Array.isArray(source.days) ? source.days.filter(Boolean) : [];
          if (!days.length) return "";
          let dayText = days.join(", ");
          if (days.length === 7) dayText = "Every day";
          if (days.join("|") === "Monday|Tuesday|Wednesday|Thursday|Friday") dayText = "Monday to Friday";
          if (days.join("|") === "Monday|Tuesday|Wednesday|Thursday|Friday|Saturday") dayText = "Monday to Saturday";
          const timeText = source.startTime && source.endTime ? profileFormatTime(source.startTime) + " - " + profileFormatTime(source.endTime) : "";
          return timeText ? dayText + ", " + timeText : dayText;
        }
        function profileFirstClean(values) {
          for (const value of values) {
            const text = profileText(value, "");
            if (text) return text;
          }
          return "";
        }
        function profileBusinessSubmissionSignal(draft) {
          const key = String(draft && (draft.businessKey || draft.key || draft.businessName || draft.name) || localStorage.getItem("emyBusinessDisplayName") || localStorage.getItem("emyBusinessName") || "profile").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "profile";
          const decisions = readJson("emyBusinessReviewDecisions", {});
          const entry = decisions && typeof decisions === "object" ? (decisions[key] || decisions["business-profile-" + key] || decisions["business-profile:" + key]) : null;
          const decisionStatus = profileText(typeof entry === "string" ? entry : entry && entry.status, "").toLowerCase();
          if (decisionStatus === "approved") return decisionStatus;
          const globalKey = String(localStorage.getItem("emyBusinessReviewBusinessKey") || localStorage.getItem("emyBusinessApprovalBusinessKey") || localStorage.getItem("emyBusinessApprovedBusinessKey") || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
          const reviewStatus = globalKey === key ? profileText(localStorage.getItem("emyBusinessReviewStatus"), "").toLowerCase() : "";
          if (reviewStatus === "approved") return reviewStatus;
          const signal = profileFirstClean([
            draft && draft.status,
            draft && draft.reviewStatus,
            draft && draft.approvedAt
          ]);
          return /^(approved|active|live)$/i.test(signal) || /approved/i.test(signal) ? signal : "";
        }
        function currentPreviewBusinessIsRealProfile() {
          const draft = readJson("emyBusinessProfileDraft", {});
          const name = profileText(draft.businessName || draft.name || localStorage.getItem("emyBusinessDisplayName") || localStorage.getItem("emyBusinessName"), "");
          if (!name || /^(this|your)\s+business$/i.test(name)) return false;
          return !!profileBusinessSubmissionSignal(draft);
        }
        function previewBusinessLooksLikeCustomer(item) {
          const name = profileText(item && (item.name || item.business || item.businessName || item.title), "");
          const key = profileText(item && (item.key || item.id || item.businessKey), "");
          const customerName = profileText(profileName || localStorage.getItem("emyCustomerDisplayName") || [localStorage.getItem("emyMainPendingSignupFirstName"), localStorage.getItem("emyMainPendingSignupLastName")].filter(Boolean).join(" "), "");
          const customerKeys = [customerName, localStorage.getItem("emyMainSignedInEmail"), localStorage.getItem("emyMainPendingSignupEmail")].map(profileSlug).filter(Boolean);
          return !!customerKeys.length && (customerKeys.indexOf(profileSlug(name)) >= 0 || customerKeys.indexOf(profileSlug(key)) >= 0);
        }
        function profileRelationshipStatus(item) {
          return String(item && (item.status || item.relationshipStatus || item.customerStatus || item.connectionStatus || item.state || item.requestStatus) || "").trim().toLowerCase();
        }
        function profileRelationshipIsBlocked(item) {
          const status = profileRelationshipStatus(item);
          return !!(item && (item.blocked === true || item.isBlocked === true || item.customerBlocked === true || item.businessBlocked === true)) || /block|ban|hidden/.test(status);
        }
        function profileRelationshipIsInactive(item) {
          const status = profileRelationshipStatus(item);
          if (item && (item.active === false || item.isCustomer === false || item.connected === false || item.following === false)) return true;
          return profileRelationshipIsBlocked(item) || /stop|remove|delete|refus|declin|reject|cancel|inactive|unfollow|left|leave|ended|expired/.test(status);
        }
        function profileRelationshipIsPending(item) {
          return /pending|request|waiting|review/.test(profileRelationshipStatus(item));
        }
        function profileRelationshipIsActiveCustomer(item, source) {
          if (!item || typeof item !== "object") return false;
          if (profileRelationshipIsInactive(item) || profileRelationshipIsPending(item)) return false;
          const status = profileRelationshipStatus(item);
          if (/accept|approved|active|open|live|customer|connected|following|subscribed/.test(status)) return true;
          if (item.active === true || item.isCustomer === true || item.connected === true || item.following === true || item.accepted === true || item.approved === true) return true;
          return source === "customer-business" && !!profileText(item.name || item.business || item.businessName || item.title || item.key || item.id || item.businessKey, "");
        }
        function profileBusinessMatchesContext(item, context) {
          const contextKey = profileSlug(context && (context.key || context.businessKey || context.id));
          const contextName = profileSlug(context && (context.name || context.business || context.businessName || context.title));
          const rowKeys = [item && item.key, item && item.id, item && item.businessKey, item && item.businessId, item && item.detailBusinessKey, item && item.profileKey].map(profileSlug).filter(Boolean);
          const rowNames = [item && item.name, item && item.business, item && item.businessName, item && item.title].map(profileSlug).filter(Boolean);
          if (contextKey && rowKeys.indexOf(contextKey) >= 0) return true;
          if (contextKey === "profile" && rowKeys.indexOf("business-profile") >= 0) return true;
          if (contextName && rowNames.indexOf(contextName) >= 0) return true;
          return false;
        }
        function profileBlockedBusinessEntries() {
          const rows = [];
          ["emyCustomerBlockedBusinesses", "emyBlockedBusinesses", "emyCustomerBlockedAccounts", "emyBlockedAccounts"].forEach((storageKey) => {
            const value = readJson(storageKey, null);
            if (Array.isArray(value)) {
              value.forEach((item, index) => {
                if (item && typeof item === "object") rows.push(Object.assign({ blocked:true }, item));
                else if (item) rows.push({ key:profileSlug(item) || storageKey + "-" + index, businessKey:profileSlug(item), name:String(item), blocked:true });
              });
            } else if (value && typeof value === "object") {
              Object.keys(value).forEach((key) => {
                const item = value[key];
                if (item === false || item === null) return;
                rows.push(Object.assign({ key, businessKey:key, blocked:true }, item && typeof item === "object" ? item : {}));
              });
            }
          });
          return rows;
        }
        function profileBusinessDirectCustomerFlag(context) {
          const aliases = [context && context.key, context && context.businessKey, context && context.id, context && context.name, context && context.business, context && context.businessName].map(profileSlug).filter(Boolean);
          let found = "";
          for (const alias of aliases) {
            try {
              const value = localStorage.getItem("emyCustomerBusiness:" + alias);
              if (value === "0") return "0";
              if (value === "1") found = "1";
            } catch (error) {}
          }
          return found;
        }
        function profileBusinessIsBlockedForCustomer(context, requests) {
          if (profileBlockedBusinessEntries().some((item) => profileBusinessMatchesContext(item, context))) return true;
          return profileArray(requests || customerRequestEntries()).some((item) => profileRelationshipIsBlocked(item) && profileBusinessMatchesContext(item, context));
        }
        function previewBusinessEntryAllowed(item) {
          if (!item || typeof item !== "object") return false;
          if (!profileRelationshipIsActiveCustomer(item, "customer-business")) return false;
          if (previewBusinessLooksLikeCustomer(item)) return false;
          const key = profileSlug(item.key || item.id || item.businessKey || "");
          const name = profileSlug(item.name || item.business || item.businessName || item.title || "");
          if (key && localStorage.getItem("emyCustomerBusiness:" + key) === "0") return false;
          if (!currentPreviewBusinessIsRealProfile() && (key === "profile" || key === "business-profile" || name === profileSlug(previewBusinessContext().name))) return false;
          return !!profileText(item.name || item.business || item.businessName || item.title || key, "");
        }
        function customerBusinessIdentityAliases(item, fallbackKey) {
          const values = [
            fallbackKey,
            item && item.key,
            item && item.id,
            item && item.businessKey,
            item && item.businessId,
            item && item.detailBusinessKey,
            item && item.ownerBusinessKey,
            item && item.profileKey,
            item && item.sellerKey,
            item && item.shopKey,
            item && item.name,
            item && item.business,
            item && item.businessName,
            item && item.title
          ];
          const aliases = values.map(profileSlug).filter(Boolean);
          return Array.from(new Set(aliases));
        }
        function customerBusinessCanonicalKey(item, fallbackKey) {
          const name = profileSlug(item && (item.name || item.business || item.businessName || item.title));
          const keys = [fallbackKey, item && item.key, item && item.id, item && item.businessKey, item && item.businessId, item && item.detailBusinessKey, item && item.profileKey].map(profileSlug).filter(Boolean);
          const realKey = keys.find((key) => ["profile", "business-profile", "business", "this-business"].indexOf(key) < 0);
          return name || realKey || keys[0] || "business";
        }
        function customerBusinessTimeValue(item) {
          const raw = item && (item.acceptedAt || item.addedAt || item.createdAt || item.updatedAt || item.date);
          const time = new Date(raw || 0).getTime();
          return Number.isFinite(time) ? time : 0;
        }
        function customerBusinessPreferenceScore(item, fallbackKey) {
          const key = profileSlug(fallbackKey || item && (item.key || item.id || item.businessKey));
          const hasRealKey = key && ["profile", "business-profile", "business", "this-business"].indexOf(key) < 0;
          const hasImage = !!previewBusinessImageSrc(item && (item.avatar || item.logo || item.photo || item.avatarSrc || item.image || item.profilePhoto || item.businessPhoto));
          const hasHref = !!profileText(item && item.href, "");
          return (hasRealKey ? 100 : 0) + (hasImage ? 10 : 0) + (hasHref ? 5 : 0) + customerBusinessTimeValue(item) / 1000000000000000;
        }
        function mergeCustomerBusinessRows(existing, incoming, key) {
          const existingScore = customerBusinessPreferenceScore(existing, existing && existing.key);
          const incomingScore = customerBusinessPreferenceScore(incoming, key);
          const primary = incomingScore >= existingScore ? incoming : existing;
          const secondary = incomingScore >= existingScore ? existing : incoming;
          const aliases = Array.from(new Set([].concat(existing && existing._customerBusinessAliases || [], incoming && incoming._customerBusinessAliases || [], customerBusinessIdentityAliases(existing, existing && existing.key), customerBusinessIdentityAliases(incoming, key)).filter(Boolean)));
          return Object.assign({}, secondary || {}, primary || {}, { _customerBusinessAliases: aliases });
        }
        function dedupeCustomerBusinessEntries(entries) {
          const buckets = {};
          const aliasToBucket = {};
          (Array.isArray(entries) ? entries : []).forEach((item, index) => {
            if (!item || typeof item !== "object") return;
            const fallbackKey = profileSlug(item.key || item.id || item.businessKey || item.name || item.business || index) || "business-" + index;
            const row = Object.assign({ key: fallbackKey, businessKey: fallbackKey }, item);
            const aliases = customerBusinessIdentityAliases(row, fallbackKey);
            const canonical = customerBusinessCanonicalKey(row, fallbackKey);
            const bucketKey = aliases.find((alias) => aliasToBucket[alias]) ? aliasToBucket[aliases.find((alias) => aliasToBucket[alias])] : canonical;
            row._customerBusinessAliases = aliases;
            buckets[bucketKey] = buckets[bucketKey] ? mergeCustomerBusinessRows(buckets[bucketKey], row, fallbackKey) : row;
            customerBusinessIdentityAliases(buckets[bucketKey], bucketKey).concat(aliases, [bucketKey]).filter(Boolean).forEach((alias) => { aliasToBucket[alias] = bucketKey; });
          });
          return Object.keys(buckets).map((key) => buckets[key]).sort((left, right) => customerBusinessTimeValue(right) - customerBusinessTimeValue(left));
        }
        function customerBusinessAliasStorageKeys(businesses, key, business) {
          const targetAliases = customerBusinessIdentityAliases(Object.assign({ key, businessKey:key }, business || {}), key);
          if (!targetAliases.length) return key ? [key] : [];
          return Object.keys(businesses || {}).filter((itemKey) => {
            const row = businesses[itemKey] || {};
            const aliases = customerBusinessIdentityAliases(row, itemKey);
            return aliases.some((alias) => targetAliases.indexOf(alias) >= 0);
          });
        }
        function connectedCustomerBusinessEntries() {
          return dedupeCustomerBusinessEntries(customerBusinessEntries().filter(previewBusinessEntryAllowed));
        }
        function profileBusinessRouteContext() {
          const context = previewBusinessContext();
          const draft = readJson("emyBusinessProfileDraft", {});
          const name = profileText(context.name || draft.businessName || draft.name || localStorage.getItem("emyBusinessDisplayName") || localStorage.getItem("emyBusinessName"), "Business");
          const key = profileText(context.key || draft.businessKey || draft.key || profileSlug(name), profileSlug(name) || "business");
          const location = headerLocationText(String(draft.location || draft.address || localStorage.getItem("emyBusinessLocationLabel") || localStorage.getItem("emyBusinessLocation") || "Location not set").trim() || "Location not set");
          const avatar = previewBusinessCurrentAvatar();
          return {
            name,
            key,
            location,
            avatarSrc: avatar && avatar.src ? avatar.src : "",
            avatarRef: avatar && avatar.ref ? avatar.ref : ""
          };
        }
        function profileBusinessRouteNotificationRows(context) {
          const rows = [];
          profileBusinessNotificationKeys(context.key, context.name).forEach((storageKey) => {
            const notifications = readJson("emyBusinessNotifications:" + storageKey, []);
            if (Array.isArray(notifications)) notifications.forEach((item) => rows.push(item));
          });
          const seen = new Set();
          return rows.filter((item) => {
            if (!item) return false;
            const id = String(item.id || item.createdAt || item.time || JSON.stringify(item));
            if (seen.has(id)) return false;
            seen.add(id);
            return true;
          });
        }
        function profileAskMiniStarterHtml(mode, panel) {
          const iconNode = panel && panel.querySelector(".ask-mini-icon");
          const iconHtml = iconNode && iconNode.innerHTML ? iconNode.innerHTML : '<img src="assets/emy-ask-mini-logo.png" alt="" />';
          if (mode === "business") {
            return '<article class="ask-mini-message is-assistant">' +
              '<span class="ask-mini-icon" aria-hidden="true">' + iconHtml + '</span>' +
              '<div class="ask-mini-bubble">' +
                '<span class="ask-mini-kicker">Business support</span>' +
                '<strong>What do you want to grow today?</strong>' +
                '<p>Ask about posts, products, customers, offers, hiring, services, or business insights.</p>' +
                '<div class="ask-mini-prompt-grid" aria-label="EMY suggestions">' +
                  '<button class="ask-mini-prompt" type="button" data-ask-mini-prompt="Help me write a post for my business"><b>Create a post</b><span>Draft an update for customers.</span></button>' +
                  '<button class="ask-mini-prompt" type="button" data-ask-mini-prompt="Help me promote a product on EMY"><b>Promote product</b><span>Ideas to sell nearby.</span></button>' +
                  '<button class="ask-mini-prompt" type="button" data-ask-mini-prompt="Help me reply to customer messages"><b>Customer replies</b><span>Write clear responses faster.</span></button>' +
                  '<button class="ask-mini-prompt" type="button" data-ask-mini-prompt="Show what I should improve in my business profile"><b>Business insights</b><span>Views, interest, and next steps.</span></button>' +
                '</div>' +
              '</div>' +
            '</article>';
          }
          return '<article class="ask-mini-message is-assistant">' +
            '<span class="ask-mini-icon" aria-hidden="true">' + iconHtml + '</span>' +
            '<div class="ask-mini-bubble">' +
              '<span class="ask-mini-kicker">Local discovery</span>' +
              '<strong>What are you looking for today?</strong>' +
              '<p>Ask for nearby shops, products, offers, services, events, or jobs.</p>' +
              '<div class="ask-mini-prompt-grid" aria-label="EMY suggestions">' +
                '<button class="ask-mini-prompt" type="button" data-ask-mini-prompt="Find shops near me"><b>Find shops</b><span>Nearby places to buy from.</span></button>' +
                '<button class="ask-mini-prompt" type="button" data-ask-mini-prompt="Show products I can buy nearby"><b>Products nearby</b><span>Items from local sellers.</span></button>' +
                '<button class="ask-mini-prompt" type="button" data-ask-mini-prompt="Find local services near me"><b>Local services</b><span>Businesses that can help.</span></button>' +
                '<button class="ask-mini-prompt" type="button" data-ask-mini-prompt="Find offers near me"><b>Find offers</b><span>Deals from nearby shops.</span></button>' +
              '</div>' +
            '</div>' +
          '</article>';
        }
        window.emyPrepareAskMiniPanel = function (trigger, panel) {
          if (!panel) return;
          const businessTrigger = !!(trigger && trigger.closest && trigger.closest(".business-app-header[data-business-shell]"));
          const mode = isBusinessCustomerProfileRoute() || businessTrigger ? "business" : "customer";
          if (panel.dataset.askMiniMode === mode) return;
          const messages = panel.querySelector("[data-ask-mini-messages]");
          if (messages) {
            messages.innerHTML = profileAskMiniStarterHtml(mode, panel);
            messages.scrollTop = 0;
          }
          panel.dataset.askMiniMode = mode;
        };
        function profileBusinessRouteUrl(nav) {
          const value = String(nav || "home").trim().toLowerCase();
          if (value === "customer") return "emy-customer-home.html";
          if (value === "ask") return "ask-emy.html";
          if (value === "search") return "emy-customer-search.html";
          if (value === "notifications") return "emy-business-profile.html?mode=business#notifications";
          return "emy-business-profile.html?mode=" + encodeURIComponent(value === "home" ? "business" : value);
        }
        function businessShellNavFromElement(target) {
          if (!target) return "home";
          if (target.dataset && target.dataset.businessNav) return target.dataset.businessNav;
          if (target.matches && target.matches("[data-business-top-search]")) return "search";
          if (target.matches && target.matches("[data-business-top-notifications]")) return "notifications";
          if (target.matches && target.matches("[data-open-ask-mini]")) return "ask";
          if (target.matches && target.matches("[data-business-switch-customer]")) return "customer";
          if (target.matches && target.matches("[data-back]")) return "home";
          return "home";
        }
        function openBusinessShellRoute(nav) {
          const value = String(nav || "").trim().toLowerCase();
          if (value === "customer") {
            try {
              const ownerCustomerEmail = String(localStorage.getItem("emyBusinessOwnerCustomerEmail") || localStorage.getItem("emyBusinessRegistrationCustomerEmail") || "").trim();
              localStorage.setItem("emyMainSignedInRole", "customer");
              if (ownerCustomerEmail) localStorage.setItem("emyMainSignedInEmail", ownerCustomerEmail);
            } catch (error) {}
            const switchButton = document.querySelector("[data-business-switch-customer]");
            if (switchButton) {
              if (switchButton.classList.contains("is-switching")) return;
              switchButton.classList.add("is-switching");
              switchButton.setAttribute("aria-pressed", "false");
              window.setTimeout(() => { window.location.href = profileBusinessRouteUrl(value); }, 560);
              return;
            }
          }
          window.location.href = profileBusinessRouteUrl(value || nav);
        }
        function syncBusinessCustomerRouteChrome() {
          const active = isBusinessCustomerProfileRoute();
          if (profileBusinessRouteTopbar) profileBusinessRouteTopbar.hidden = !active;
          if (profileBusinessRouteBottomNav) profileBusinessRouteBottomNav.hidden = !active;
          if (!active) return;
          const context = profileBusinessRouteContext();
          if (profileBusinessRouteName) profileBusinessRouteName.textContent = context.name;
          if (profileBusinessRouteLocationLabel) profileBusinessRouteLocationLabel.textContent = context.location;
          if (profileBusinessRouteAvatar) {
            const initial = profileText(context.name, "B").charAt(0).toUpperCase() || "B";
            if (context.avatarSrc) {
              profileBusinessRouteAvatar.innerHTML = '<img src="' + escapeHtml(context.avatarSrc) + '" alt="" />';
            } else {
              profileBusinessRouteAvatar.textContent = initial;
            }
          }
          if (profileBusinessRouteNotificationCount) {
            const unread = profileBusinessRouteNotificationRows(context).filter((item) => item && item.read !== true && item.unread !== false).length;
            profileBusinessRouteNotificationCount.textContent = String(unread);
            profileBusinessRouteNotificationCount.setAttribute("aria-label", unread + " notification" + (unread === 1 ? "" : "s"));
            profileBusinessRouteNotificationCount.classList.toggle("is-empty", unread === 0);
          }
        }
        function previewBusinessContext() {
          const draft = readJson("emyBusinessProfileDraft", {});
          const cover = readJson("emyBusinessHeroCoverMedia", null);
          const storedSchedule = readJson("emyBusinessWorkingDaysSchedule", {});
          const schedule = draft.workingDaysSchedule && typeof draft.workingDaysSchedule === "object" ? draft.workingDaysSchedule : storedSchedule;
          const scheduleSummary = profileWorkingDaysSummary(schedule);
          const chatKey = profileText(localStorage.getItem("emyCustomerChatOpenKey"), "");
          const draftName = profileText(draft.businessName || draft.name || localStorage.getItem("emyBusinessDisplayName") || localStorage.getItem("emyBusinessName"), "");
          const name = profileText(draftName || localStorage.getItem("emySelectedBusinessProfileName") || chatKey, "this business");
          const category = profileText(draft.businessCategory || draft.primarySector || draft.sector || draft.category, "Small business");
          const avatar = previewBusinessFirstImageSrc([
            localStorage.getItem("emyBusinessProfilePhoto"),
            localStorage.getItem("emyBusinessProfilePhotoSrc"),
            draft.profilePhoto,
            draft.profilePhotoSrc,
            draft.photo,
            draft.photoSrc
          ]);
          const avatarRef = previewBusinessFirstImageRef([
            localStorage.getItem("emyBusinessProfilePhotoRef"),
            draft.profilePhotoRef,
            draft.photoRef,
            localStorage.getItem("emyBusinessProfilePhoto"),
            localStorage.getItem("emyBusinessProfilePhotoSrc"),
            draft.photo,
            draft.profilePhoto,
            draft.profilePhotoSrc,
            draft.photoSrc
          ]);
          const location = profileText([draft.businessAddressLine1, draft.businessLocation, draft.businessPostcode].filter(Boolean).join(", ") || draft.location || draft.address || localStorage.getItem("emyBusinessLocation"), "Location to confirm");
          const description = profileText(draft.description || draft.about || localStorage.getItem("emyBusinessDescription"), "Business profile connected to this customer.");
          const hours = profileText(draft.workingDays || localStorage.getItem("emyBusinessWorkingDays") || scheduleSummary || draft.businessHours || draft.hours || draft.openingHours, "");
          const reviewStatus = String(profileBusinessSubmissionSignal(draft) || draft.status || draft.reviewStatus || "open").toLowerCase();
          const isReal = currentPreviewBusinessIsRealProfile();
          const isOffline = reviewStatus.includes("closed") || reviewStatus.includes("offline") || reviewStatus.includes("reject");
          const status = isOffline ? "closed" : "open";
          const statusText = reviewStatus.includes("reject") ? "Needs review" : isOffline ? "Offline" : "Live";
          return {
            name: isReal ? name : "this business",
            key: "profile",
            category: isReal ? category : "",
            avatar: isReal ? avatar : "",
            avatarRef: isReal ? avatarRef : "",
            location: isReal ? location : "",
            description: isReal ? description : "",
            hours: isReal ? hours : "",
            status,
            statusText,
            coverSrc: isReal && cover && cover.src ? cover.src : "",
            isReal
          };
        }
        function relationshipForBusiness(context) {
          const entries = connectedCustomerBusinessEntries();
          const allRequests = customerRequestEntries();
          const directFlag = profileBusinessDirectCustomerFlag(context);
          const stopped = directFlag === "0";
          const blocked = profileBusinessIsBlockedForCustomer(context, allRequests);
          const businessSlug = profileSlug(context.name);
          const activeRequests = allRequests.filter((item) => profileRelationshipIsActiveCustomer(item, "customer-request"));
          const directActive = !blocked && !stopped && directFlag === "1";
          const match = !blocked && !stopped && (entries.concat(activeRequests).find((item) => profileBusinessMatchesContext(item, context) || profileSlug(item.key || item.id || item.businessKey || item.name) === context.key || profileSlug(item.name || item.business || item.title) === businessSlug) || (directActive ? { key: context.key, businessKey: context.key, name: context.name, addedAt: localStorage.getItem("emyCustomerBusinessSince") || new Date().toISOString() } : null));
          const request = !blocked && allRequests.find((item) => !profileRelationshipIsInactive(item) && profileRelationshipIsPending(item) && (profileBusinessMatchesContext(item, context) || profileSlug(item.key || item.id || item.businessKey || item.name) === context.key || profileSlug(item.name || item.business || item.title || item.businessName) === businessSlug));
          const relation = match || { key: context.key, name: context.name, addedAt: localStorage.getItem("emyCustomerBusinessSince") || new Date().toISOString(), isPreviewFallback: true };
          const total = Math.max(0, entries.length);
          return { entry: relation, active: !!match, requested: !!request, blocked, request: request || null, total };
        }
        function previewBusinessImageSrc(value) {
          const text = profileText(value, "");
          return /^(data:image\/|blob:|https?:\/\/|file:|assets\/|\.\/|\/)/i.test(text) ? text : "";
        }
        function previewBusinessImageRef(value) {
          const text = profileText(value, "");
          if (!text || previewBusinessImageSrc(text)) return "";
          return /^(emy-media-|business-|customer-|profile-|media-)/i.test(text) ? text : "";
        }
        function previewBusinessFirstImageSrc(values) {
          for (const value of values || []) {
            const src = previewBusinessImageSrc(value);
            if (src) return src;
          }
          return "";
        }
        function previewBusinessFirstImageRef(values) {
          for (const value of values || []) {
            const ref = previewBusinessImageRef(value);
            if (ref) return ref;
          }
          return "";
        }
        function previewBusinessCurrentAvatar() {
          const draft = readJson("emyBusinessProfileDraft", {});
          const src = previewBusinessFirstImageSrc([
            localStorage.getItem("emyBusinessProfilePhoto"),
            localStorage.getItem("emyBusinessProfilePhotoSrc"),
            draft.profilePhoto,
            draft.profilePhotoSrc,
            draft.photo,
            draft.photoSrc
          ]);
          const ref = previewBusinessFirstImageRef([
            localStorage.getItem("emyBusinessProfilePhotoRef"),
            draft.profilePhotoRef,
            draft.photoRef
          ]);
          return { src, ref };
        }
        function previewBusinessMatchesCurrentProfile(item) {
          if (!item || typeof item !== "object") return false;
          const draft = readJson("emyBusinessProfileDraft", {});
          const profileNames = [
            draft.businessName,
            draft.name,
            localStorage.getItem("emyBusinessDisplayName"),
            localStorage.getItem("emyBusinessName"),
            localStorage.getItem("emyMainPendingSignupBusinessName")
          ].map(profileSlug).filter(Boolean);
          const profileKeys = [
            draft.businessKey,
            draft.key,
            localStorage.getItem("emyBusinessProfileKey"),
            localStorage.getItem("emyBusinessKey"),
            "profile",
            "business-profile"
          ].map(profileSlug).filter(Boolean);
          const itemNames = [item.name, item.business, item.businessName, item.title].map(profileSlug).filter(Boolean);
          const itemKeys = [item.key, item.id, item.businessKey, item.businessId, item.profileKey].map(profileSlug).filter(Boolean);
          return itemNames.some((name) => profileNames.indexOf(name) >= 0) || itemKeys.some((key) => profileKeys.indexOf(key) >= 0);
        }
        function previewBusinessAvatarForItem(item, context) {
          const directSrc = previewBusinessFirstImageSrc([
            item && item.avatarSrc,
            item && item.avatar,
            item && item.photo,
            item && item.logo,
            item && item.image,
            item && item.profilePhoto,
            item && item.businessPhoto,
            item && item.businessAvatar,
            item && item.businessLogo
          ]);
          const directRef = previewBusinessFirstImageRef([
            item && item.avatarRef,
            item && item.photoRef,
            item && item.logoRef,
            item && item.imageRef,
            item && item.profilePhotoRef,
            item && item.businessPhotoRef,
            item && item.businessAvatarRef,
            item && item.businessLogoRef,
            item && item.avatarSrc,
            item && item.avatar,
            item && item.photo,
            item && item.logo,
            item && item.image,
            item && item.profilePhoto,
            item && item.businessPhoto,
            item && item.businessAvatar,
            item && item.businessLogo
          ]);
          if (directSrc || directRef) return { src: directSrc, ref: directRef };
          if (previewBusinessMatchesCurrentProfile(item)) {
            const current = previewBusinessCurrentAvatar();
            if (current.src || current.ref) return current;
          }
          if (context && profileBusinessMatchesContext(item, context) && (context.avatar || context.avatarRef)) {
            return { src: context.avatar || "", ref: context.avatarRef || "" };
          }
          return { src: "", ref: "" };
        }
        function publicActivityBusinessAvatarForOriginal(original) {
          const source = original && typeof original === "object" ? original : {};
          const context = {
            key: profileText(source.key || source.businessKey || source.detailBusinessKey || source.profileKey, ""),
            businessKey: profileText(source.businessKey || source.key || source.detailBusinessKey || source.profileKey, ""),
            name: profileText(source.business || source.businessName || source.name || source.title, ""),
            businessName: profileText(source.businessName || source.business || source.name || source.title, "")
          };
          const direct = previewBusinessAvatarForItem(Object.assign({}, source, context), previewBusinessContext());
          if (direct.src || direct.ref) return direct;
          const rows = [];
          try {
            if (typeof connectedCustomerBusinessEntries === "function") rows.push.apply(rows, connectedCustomerBusinessEntries());
            if (typeof customerBusinessEntries === "function") rows.push.apply(rows, customerBusinessEntries());
          } catch (error) {}
          const key = profileSlug(context.key || context.businessKey);
          const name = profileSlug(context.name || context.businessName);
          const match = rows.find((row) => {
            if (!row || typeof row !== "object") return false;
            if (profileBusinessMatchesContext(row, context)) return true;
            const rowKeys = [row.key, row.id, row.businessKey, row.businessId, row.profileKey].map(profileSlug).filter(Boolean);
            const rowNames = [row.name, row.business, row.businessName, row.title].map(profileSlug).filter(Boolean);
            return (key && rowKeys.some((rowKey) => rowKey === key || rowKey.indexOf(key) >= 0 || key.indexOf(rowKey) >= 0)) ||
              (name && rowNames.some((rowName) => rowName === name || rowName.indexOf(name) >= 0 || name.indexOf(rowName) >= 0));
          });
          return match ? previewBusinessAvatarForItem(match, context) : { src: "", ref: "" };
        }
        function previewBusinessName(item, fallback) {
          return profileText(item && (item.name || item.business || item.businessName || item.title), fallback || "");
        }
        function previewBusinessLocation(item, fallback) {
          return profileText(item && (item.location || item.address || item.businessLocation || item.city || item.area), fallback || "");
        }
        function previewBusinessShortLocation(value) {
          const text = profileText(value, "");
          if (!text) return "";
          if (/location to confirm/i.test(text)) return "Location to confirm";
          const postcodeMatch = text.match(/[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}/i);
          const postcode = postcodeMatch ? postcodeMatch[0].toUpperCase().replace(/\s+/, " ") : "";
          const parts = text.split(",").map((part) => part.trim()).filter(Boolean);
          const area = parts.find((part) => part && !/england|united kingdom|^uk$/i.test(part) && (!postcode || part.toUpperCase().indexOf(postcode) < 0) && /[a-z]/i.test(part) && !/^\d+$/.test(part));
          if (postcode && area) return postcode + ", " + area;
          if (postcode) return postcode;
          return (parts.length > 1 ? parts.slice(-2).join(", ") : text).slice(0, 34);
        }
        function previewBusinessDescription(item, fallback) {
          return profileText(item && (item.description || item.about || item.bio || item.text || item.summary), fallback || "Business profile connected to this customer.");
        }
        function previewBusinessStatus(item) {
          const raw = [item && item.status, item && item.statusText, item && item.reviewStatus, item && item.opened, item && item.isLive].join(" ").toLowerCase();
          const offline = raw.includes("closed") || raw.includes("offline") || raw.includes("reject") || raw.includes("false");
          const review = raw.includes("review") || raw.includes("pending");
          return { label: review ? "Review" : offline ? "Offline" : "Live", live: !offline && !review };
        }
        function previewBusinessHours(item) {
          const direct = profileText(item && (item.hours || item.businessHours || item.openingHours || item.availability || item.available), "");
          if (direct) return direct;
          const context = previewBusinessContext();
          const itemKey = profileSlug(item && (item.key || item.id || item.businessKey) || "");
          const itemName = profileSlug(previewBusinessName(item, ""));
          const contextKey = profileSlug(context.key || context.name || "");
          const contextName = profileSlug(context.name || "");
          if (!item || itemName === "this-business" || (contextKey && itemKey === contextKey) || (contextName && itemName === contextName)) {
            return profileText(context.hours, "Hours not set");
          }
          return "Hours not set";
        }
        function previewBusinessResponse(item) {
          return profileText(item && (item.responseTime || item.replyTime || item.response || item.chatStatus), "Chat ready");
        }
        function previewBusinessSince(item) {
          const raw = item && (item.addedAt || item.createdAt || item.customerSince || item.date);
          if (!raw) return "New connection";
          const date = new Date(raw);
          if (Number.isNaN(date.getTime())) return profileText(raw, "New connection");
          return "Since " + date.toLocaleDateString("en-GB", { day:"2-digit", month:"short" });
        }
        function previewBusinessProductIsLive(item) {
          if (item && item.isPaused === true) return false;
          const status = String(item && (item.publishStatus || item.liveStatus || item.visibility || item.status) || "active").trim().toLowerCase();
          return ["paused", "unpublished", "hidden", "draft", "inactive"].indexOf(status) < 0;
        }
        function previewBusinessProductCount(item) {
          if (Array.isArray(item && item.products)) return item.products.filter(previewBusinessProductIsLive).length;
          const direct = Number(item && (item.productCount || item.productsCount || item.products));
          if (Number.isFinite(direct) && direct > 0) return direct;
          const context = previewBusinessContext();
          const businessSlug = profileSlug(previewBusinessName(item, ""));
          const businessKey = profileSlug(item && (item.businessKey || item.businessId || item.key || item.id || ""));
          const contextKey = profileSlug(context.key || "");
          const contextSlug = profileSlug(context.name || "");
          const representsCurrentBusiness = !item || businessSlug === "this-business" || (contextSlug && businessSlug === contextSlug) || (contextKey && businessKey === contextKey) || businessKey === "profile" || businessKey === "business-profile";
          const targetNames = [businessSlug, representsCurrentBusiness ? contextSlug : ""].filter(Boolean);
          const targetKeys = [businessKey, representsCurrentBusiness ? contextKey : "", representsCurrentBusiness ? "profile" : "", representsCurrentBusiness ? "business-profile" : ""].filter(Boolean);
          const sources = ["emyBusinessProducts", "emyBusinessProductList", "emyBusinessProductPosts", "emyFeedCreatedProducts", "emyCustomerProductVisits", "emyProductVisitHistory"];
          const seen = {};
          return sources.flatMap((key) => profileArray(readJson(key, [])).map((row, index) => Object.assign({ _sourceKey:key, _sourceIndex:index }, row || {}))).filter((row) => {
            const title = previewProductTitle(row);
            if (!previewBusinessProductIsLive(row)) return false;
            const rowNames = [row.business, row.businessName, row.seller, row.shop, row.ownerName, row.actor].map(profileSlug).filter(Boolean);
            const rowKeys = [row.businessKey, row.businessId, row.ownerBusinessKey, row.detailBusinessKey, row.profileKey, row.sellerKey, row.shopKey].map(profileSlug).filter(Boolean);
            const localCurrentProduct = row._sourceKey.indexOf("emyBusiness") === 0 && (String(row.source || "").toLowerCase() === "business-dashboard" || rowKeys.indexOf("profile") >= 0 || rowKeys.indexOf("business-profile") >= 0 || (!rowNames.length && !rowKeys.length));
            const matches = rowNames.some((value) => targetNames.indexOf(value) >= 0) || rowKeys.some((value) => targetKeys.indexOf(value) >= 0) || (representsCurrentBusiness && localCurrentProduct);
            if (!matches && (rowNames.length || rowKeys.length)) return false;
            if (!matches && row._sourceKey.indexOf("emyBusiness") !== 0) return false;
            const identity = profileSlug((row.id || row.productId || title) + "-" + (row.price || row.priceText || row._sourceKey || row._sourceIndex));
            if (seen[identity]) return false;
            seen[identity] = true;
            return true;
          }).length;
        }
        function previewBusinessCustomerCount(item) {
          const direct = Number(item && (item.customerCount || item.customersCount || item.customerTotal || item.totalCustomers));
          if (Number.isFinite(direct) && direct >= 0) return Math.round(direct);
          const key = profileSlug(item && (item.key || item.id || item.businessKey) || previewBusinessName(item, ""));
          const nameSlug = profileSlug(previewBusinessName(item, ""));
          const seen = {};
          const addCustomer = (value) => {
            const identity = profileSlug(value || profileName || "customer");
            if (identity) seen[identity] = true;
          };
          const matchesBusiness = (row) => {
            const rowKey = profileSlug(row && (row.key || row.id || row.businessKey || row.businessId));
            const rowName = profileSlug(row && (row.name || row.business || row.businessName || row.title));
            return (key && rowKey === key) || (nameSlug && rowName === nameSlug);
          };
          customerBusinessEntries().forEach((row) => {
            if (matchesBusiness(row)) addCustomer(row.customerName || row.customer || row.email || row.customerEmail);
          });
          customerRequestEntries().forEach((row) => {
            const status = String(row && row.status || "").toLowerCase();
            if (status === "accepted" && matchesBusiness(row)) addCustomer(row.customerName || row.customer || row.email || row.customerEmail);
          });
          profileArray(readJson("emyBusinessCustomers:" + key, [])).forEach((row) => {
            addCustomer(row.name || row.customerName || row.email || row.id);
          });
          profileArray(readJson("emyBusinessCustomers", [])).forEach((row) => {
            if (matchesBusiness(row)) addCustomer(row.name || row.customerName || row.email || row.id);
          });
          return Object.keys(seen).length;
        }
        function previewBusinessHref(item) {
          const key = profileSlug(item && (item.key || item.id || item.businessKey) || previewBusinessName(item, "business"));
          const context = previewBusinessContext();
          const itemName = profileSlug(previewBusinessName(item, ""));
          const contextName = profileSlug(context.name || "");
          const representsCurrent = item && item.isCurrentBusiness || key === "profile" || key === "business-profile" || (contextName && itemName === contextName);
          return "emy-business-profile.html?view=customer&business=" + encodeURIComponent(representsCurrent ? "profile" : (key || "business"));
        }
        function previewSmallBusinesses(context) {
          const entries = connectedCustomerBusinessEntries();
          const seen = {};
          const rows = entries.map((item, index) => {
            const matchesContext = context && (profileBusinessMatchesContext(item, context) || profileSlug(item && (item.key || item.id || item.businessKey)) === profileSlug(context.key) || profileSlug(previewBusinessName(item, "")) === profileSlug(context.name));
            const resolvedAvatar = previewBusinessAvatarForItem(item, context);
            const avatar = resolvedAvatar.src || (matchesContext ? context.avatar : "");
            const avatarRef = resolvedAvatar.ref || (matchesContext ? context.avatarRef : "");
            return {
              key: profileText(item.key || item.id || item.businessKey || ("business-" + index), ""),
              name: previewBusinessName(item, ""),
              category: profileText(item.category || item.businessCategory || item.primarySector || item.sector || "Small business profile", "Small business profile"),
              avatar,
              avatarRef,
              location: previewBusinessLocation(item, ""),
              description: previewBusinessDescription(item, ""),
              status: profileText(item.status || "", ""),
              statusText: profileText(item.statusText || (item.opened ? "Live" : ""), ""),
              hours: profileText(item.hours || item.businessHours || item.openingHours || item.availability, ""),
              responseTime: profileText(item.responseTime || item.replyTime || item.response || item.chatStatus, ""),
              productCount: item.productCount || item.productsCount || item.products,
              addedAt: item.addedAt || item.createdAt || item.date || "",
              href: item.href || ""
            };
          }).filter((item) => item.name);
          const businesses = rows.filter((item) => {
            const key = profileSlug(item.key || item.name);
            const nameKey = profileSlug(item.name || item.business || item.title || "");
            const identity = key + "|" + nameKey;
            if (!key || seen[key] || (nameKey && seen[nameKey]) || seen[identity]) return false;
            seen[key] = true;
            if (nameKey) seen[nameKey] = true;
            seen[identity] = true;
            return true;
          });
          return businesses.slice(0, 8);
        }
        function previewBusinessCardHtml(item, index, list) {
          const name = previewBusinessName(item, "Small business");
          const category = profileText(item.category, "Small business profile");
          const fullLocation = previewBusinessLocation(item, "Location to confirm");
          const location = previewBusinessShortLocation(fullLocation);
          const description = previewBusinessDescription(item, "Business profile connected to this customer.");
          const cardAvatar = previewBusinessAvatarForItem(item, previewBusinessContext());
          const image = previewBusinessImageSrc(item.avatar) || cardAvatar.src;
          const imageRef = previewBusinessImageRef(item.avatarRef) || previewBusinessImageRef(item.avatar) || cardAvatar.ref;
          const initial = name.charAt(0).toUpperCase() || "B";
          const status = previewBusinessStatus(item);
          const productCount = previewBusinessProductCount(item);
          const customerCount = previewBusinessCustomerCount(item);
          const hours = previewBusinessHours(item);
          const href = item.href || previewBusinessHref(item);
          const key = href.indexOf("business=profile") >= 0 || (item && item.isCurrentBusiness) ? "profile" : profileSlug(item.key || item.businessKey || name);
          return '<a class="profile-customer-business-card" href="' + escapeHtml(href) + '" data-profile-business-link="' + escapeHtml(key) + '" data-business-link="' + escapeHtml(key) + '" data-profile-business-name="' + escapeHtml(name) + '" aria-label="Open ' + escapeHtml(name) + ' business profile">' +
            '<span class="profile-customer-business-status' + (status.live ? '' : ' is-offline') + '">' + escapeHtml(status.label) + '</span>' +
            '<span class="profile-customer-business-avatar" aria-hidden="true"><span data-profile-business-avatar-initial>' + escapeHtml(initial) + '</span>' + (image || imageRef ? '<img hidden' + (image ? ' src="' + escapeHtml(image) + '"' : '') + (imageRef ? ' data-emy-media-ref="' + escapeHtml(imageRef) + '"' : '') + ' alt="" />' : '') + '</span>' +
            '<span class="profile-customer-business-copy"><strong>' + escapeHtml(name) + '</strong><span class="profile-customer-business-tags"><span class="profile-customer-business-tag">' + escapeHtml(category) + '</span><span class="profile-customer-business-tag is-location" title="' + escapeHtml(fullLocation) + '">' + escapeHtml(location) + '</span></span><em>' + escapeHtml(description) + '</em></span>' +
            '<span class="profile-customer-business-details"><span class="profile-customer-business-detail"><b>Hours</b><span>' + escapeHtml(hours) + '</span></span><span class="profile-customer-business-detail"><b>Customers</b><span>' + escapeHtml(profilePlural(customerCount, "customer")) + '</span></span></span>' +
            '<span class="profile-customer-business-meta"><span class="is-accent">' + escapeHtml(profilePlural(productCount, "product")) + '</span><span class="is-action">View profile</span></span>' +
          '</a>';
        }
        function hydratePreviewBusinessAvatars(root) {
          const scope = root && root.querySelectorAll ? root : document;
          scope.querySelectorAll(".profile-customer-business-avatar").forEach((avatar) => {
            const image = avatar.querySelector("img");
            if (!image || image.dataset.profileBusinessAvatarReady === "true") return;
            image.dataset.profileBusinessAvatarReady = "true";
            const reveal = () => {
              image.hidden = false;
              avatar.classList.add("has-image");
            };
            const fallback = () => {
              image.remove();
              avatar.classList.remove("has-image");
            };
            image.addEventListener("load", reveal, { once: true });
            image.addEventListener("error", fallback, { once: true });
            if (image.complete && image.naturalWidth > 0) reveal();
            if (image.dataset.emyMediaRef && window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(image);
            window.setTimeout(() => {
              if (!image.parentElement || !image.hidden) return;
              if ((image.currentSrc || image.src) && image.complete && image.naturalWidth > 0) reveal();
              else if (!image.currentSrc && !image.src) fallback();
            }, 3000);
          });
        }
        function previewProductSources() {
          const keys = ["emyCustomerProductVisits", "emyProductVisitHistory"];
          return keys.flatMap((key) => profileArray(readJson(key, [])).map((item, index) => Object.assign({ _sourceKey:key, _sourceIndex:index }, item || {}))).concat(previewProductViewStatSources());
        }
        function previewSelectedCustomerIdentitySet() {
          const selected = selectedCustomerPreviewContext();
          const values = selected ? [selected.key, selected.name, selected.email] : [profileName, profileEmail];
          const identities = new Set();
          values.concat([profileName]).forEach((value) => {
            const text = profileText(value, "");
            const slug = profileSlug(text);
            if (text) identities.add(text.toLowerCase());
            if (slug) identities.add(slug);
          });
          return identities;
        }
        function previewProductVisitMatchesSelectedCustomer(item) {
          const identities = previewSelectedCustomerIdentitySet();
          if (!identities.size) return true;
          const values = [
            item && item.customerKey,
            item && item.viewerKey,
            item && item.customerEmail,
            item && item.viewerEmail,
            item && item.email,
            item && item.customerName,
            item && item.viewerName,
            item && item.name
          ].map((value) => profileText(value, "")).filter(Boolean);
          if (!values.length) return true;
          return values.some((value) => identities.has(value.toLowerCase()) || identities.has(profileSlug(value)));
        }
        function previewProductViewStatSources() {
          const stats = readJson("emyProductViewStats", {});
          if (!stats || typeof stats !== "object" || Array.isArray(stats)) return [];
          return Object.keys(stats).flatMap((statKey) => {
            const record = stats[statKey];
            if (!record || typeof record !== "object") return [];
            const title = previewProductTitle(Object.assign({ title: statKey }, record));
            const events = profileArray(record.events);
            return events.map((event, index) => Object.assign({}, record || {}, {
              _sourceKey: "emyProductViewStats",
              _sourceIndex: index,
              _statKey: statKey,
              type: "product",
              kind: "product",
              title,
              name: title,
              productName: title,
              productTitle: title,
              productId: profileText(record.productId || record.productKey || record.itemId || record.feedId || record.id || statKey, statKey),
              productKey: profileText(record.productKey || record.productId || statKey, statKey),
              business: profileText(record.business || record.businessName || record.seller || record.shop || record.ownerName, ""),
              businessName: profileText(record.businessName || record.business || record.seller || record.shop || record.ownerName, ""),
              businessKey: profileText(record.businessKey || record.businessId || record.detailBusinessKey || record.ownerBusinessKey || record.profileKey || record.sellerKey || record.shopKey, ""),
              detailBusinessKey: profileText(record.detailBusinessKey || record.businessKey || record.businessId || record.ownerBusinessKey || record.profileKey || record.sellerKey || record.shopKey, ""),
              price: profileText(record.price || record.priceText || record.productPrice, ""),
              priceText: profileText(record.priceText || record.price || record.productPrice, ""),
              image: profileText(record.image || record.imageSrc || record.mediaSrc || record.coverSrc, ""),
              imageSrc: profileText(record.imageSrc || record.image || record.mediaSrc || record.coverSrc, ""),
              mediaSrc: profileText(record.mediaSrc || record.imageSrc || record.image || record.coverSrc, ""),
              mediaRef: profileText(record.mediaRef || record.imageRef || record.coverRef, ""),
              visitedAt: profileText(event && (event.at || event.visitedAt || event.viewedAt) || record.lastViewedAt, ""),
              viewedAt: profileText(event && (event.at || event.viewedAt) || record.lastViewedAt, ""),
              customerName: profileText(event && (event.customerName || event.viewerName || event.name), ""),
              customerKey: profileText(event && (event.customerKey || event.viewerKey || event.key || event.email), ""),
              customerEmail: profileText(event && (event.customerEmail || event.viewerEmail || event.email), ""),
              viewerName: profileText(event && (event.viewerName || event.customerName || event.name), ""),
              viewerKey: profileText(event && (event.viewerKey || event.customerKey || event.key || event.email), ""),
              viewerEmail: profileText(event && (event.viewerEmail || event.customerEmail || event.email), "")
            }));
          });
        }
        function previewProductTitle(item) {
          return profileText(item.title || item.name || item.productName || item.itemTitle, "Product");
        }
        function previewProductDescription(item) {
          return profileText(item.description || item.productDescription || item.productInfo || item.text || item.summary, "Product available from this business.");
        }
        function previewProductPrice(item) {
          return profileText(item.priceText || item.price || item.productPrice, "");
        }
        function previewProductAvailability(item) {
          return profileText(item.availability || item.productAvailability || item.stockStatus || item.statusText || item.stock, "In stock");
        }
        function previewProductSource(item, context) {
          const raw = profileText(item.sourceLabel || item.category || item.productCategory || item.source || item.distance || item.businessName || item.business || context && context.name, "Product");
          return raw.toLowerCase() === "product-view" ? "Product" : raw;
        }
        function previewBusinessProductAliases(row, context) {
          const aliases = new Set();
          const title = previewProductTitle(row);
          const titleSlug = profileSlug(title);
          const businessName = profileText(row.business || row.businessName || row.seller || row.shop || row.ownerName || context && context.name, "");
          const businessSlug = profileSlug(businessName);
          [
            row.id,
            row.productId,
            row.productKey,
            row.itemId,
            row.feedId,
            row.detailId,
            row.title,
            row.name,
            row.productName,
            row.productTitle
          ].forEach((value) => {
            const key = profileSlug(value);
            if (key) aliases.add(key);
          });
          if (businessSlug && titleSlug) {
            aliases.add(businessSlug + "-" + titleSlug);
            aliases.add("product-" + businessSlug + "-" + titleSlug);
            aliases.add("emy-product-" + businessSlug + "-" + titleSlug);
            const descriptionSlug = profileSlug(previewProductDescription(row));
            const priceSlug = profileSlug(previewProductPrice(row));
            [descriptionSlug, priceSlug].filter(Boolean).forEach((suffix) => {
              aliases.add(businessSlug + "-" + titleSlug + "-" + suffix);
              aliases.add("copy-" + businessSlug + "-" + titleSlug + "-" + suffix);
              aliases.add("product-" + businessSlug + "-" + titleSlug + "-" + suffix);
              aliases.add("emy-product-" + businessSlug + "-" + titleSlug + "-" + suffix);
            });
          }
          return Array.from(aliases);
        }
        function previewBusinessProductRowsForContext(context) {
          const businessSlug = profileSlug(context && context.name || "");
          const contextKey = profileSlug(context && context.key || "");
          const businessKeys = [contextKey, businessSlug, contextKey === "profile" ? "business-profile" : ""].filter(Boolean);
          const seen = {};
          const rows = [];
          ["emyBusinessProducts", "emyBusinessProductList", "emyBusinessProductPosts", "emyFeedCreatedProducts"].forEach((storageKey) => {
            profileArray(readJson(storageKey, [])).forEach((row, index) => {
              if (!row || typeof row !== "object" || !previewBusinessProductIsLive(row)) return;
              const rowBusinessSlug = profileSlug(row.business || row.businessName || row.seller || row.shop || row.ownerName || "");
              const rowBusinessKey = profileSlug(row.businessKey || row.businessId || row.detailBusinessKey || row.ownerBusinessKey || row.profileKey || row.sellerKey || row.shopKey || "");
              const localCurrentProduct = storageKey.indexOf("emyBusiness") === 0 && (!rowBusinessSlug && !rowBusinessKey || rowBusinessKey === "profile" || rowBusinessKey === "business-profile");
              const matchesBusiness = localCurrentProduct || rowBusinessSlug === businessSlug || rowBusinessKey === businessSlug || businessKeys.indexOf(rowBusinessKey) >= 0;
              if (!matchesBusiness) return;
              const aliases = previewBusinessProductAliases(row, context);
              const identity = aliases[0] || profileSlug(previewProductTitle(row) + "-" + previewProductPrice(row)) || storageKey + "-" + index;
              if (seen[identity]) return;
              seen[identity] = true;
              rows.push(Object.assign({ _sourceKey:storageKey, _sourceIndex:index, _productAliases:aliases, _matchedProductId:identity }, row));
            });
          });
          return rows;
        }
        function previewBusinessProductIdentitySet(productRows) {
          const identities = new Set();
          (productRows || []).forEach((row) => {
            (row._productAliases || []).forEach((key) => { if (key) identities.add(key); });
          });
          return identities;
        }
        function previewKnownProductForVisit(item, productRows) {
          const values = [
            item && item.productId,
            item && item.productKey,
            item && item.itemId,
            item && item.feedId,
            item && item.detailId,
            item && item._statKey,
            previewProductTitle(item)
          ].map(profileSlug).filter(Boolean);
          if (!values.length) return null;
          return (productRows || []).find((row) => {
            const aliases = row._productAliases || [];
            return aliases.some((alias) => values.some((value) => value === alias || (alias.length > 3 && value.length > 3 && (value.indexOf(alias) >= 0 || alias.indexOf(value) >= 0))));
          }) || null;
        }
        function previewProductVisitWithKnownProduct(item, productRows) {
          const known = previewKnownProductForVisit(item, productRows);
          if (!known) return item;
          return Object.assign({}, item || {}, known, {
            _sourceKey: item._sourceKey,
            _sourceIndex: item._sourceIndex,
            _statKey: item._statKey,
            _matchedProduct: true,
            _matchedProductId: known._matchedProductId,
            visitedAt: profileText(item.visitedAt || item.viewedAt || item.savedAt || item.createdAt || known.visitedAt, ""),
            viewedAt: profileText(item.viewedAt || item.visitedAt || item.createdAt || known.viewedAt, ""),
            customerName: profileText(item.customerName || item.viewerName || item.name, ""),
            customerKey: profileText(item.customerKey || item.viewerKey || item.email, ""),
            customerEmail: profileText(item.customerEmail || item.viewerEmail || item.email, ""),
            viewerName: profileText(item.viewerName || item.customerName || item.name, ""),
            viewerKey: profileText(item.viewerKey || item.customerKey || item.email, ""),
            viewerEmail: profileText(item.viewerEmail || item.customerEmail || item.email, "")
          });
        }
        function previewProductVisitDateValue(item) {
          const raw = item && (item.visitedAt || item.viewedAt || item.savedAt || item.updatedAt || item.createdAt || item.created);
          const time = new Date(raw || 0).getTime();
          return Number.isFinite(time) && time > 0 ? time : 0;
        }
        function previewProductRangeStart(range) {
          const now = new Date();
          const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          if (range === "today") return start.getTime();
          if (range === "week") {
            const day = start.getDay();
            const mondayOffset = day === 0 ? 6 : day - 1;
            start.setDate(start.getDate() - mondayOffset);
            return start.getTime();
          }
          if (range === "month") return new Date(now.getFullYear(), now.getMonth(), 1).getTime();
          if (range === "year") return new Date(now.getFullYear(), 0, 1).getTime();
          return 0;
        }
        function previewProductRangeLabel(range) {
          if (range === "today") return "today";
          if (range === "week") return "this week";
          if (range === "month") return "this month";
          if (range === "year") return "this year";
          return "all time";
        }
        function previewProductVisitInRange(item, range) {
          if (!range || range === "all") return true;
          const time = previewProductVisitDateValue(item);
          return !!time && time >= previewProductRangeStart(range) && time <= Date.now() + 24 * 60 * 60 * 1000;
        }
        function syncPreviewProductRangeButtons() {
          profilePreviewProductRangeButtons.forEach((button) => {
            const active = (button.dataset.profileProductRange || "all") === profilePreviewProductRange;
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-pressed", active ? "true" : "false");
          });
        }
        function previewProductVisitsForBusiness(context) {
          const businessSlug = profileSlug(context.name);
          const contextKey = profileSlug(context && context.key || "");
          const businessKeys = [contextKey, businessSlug, contextKey === "profile" ? "business-profile" : ""].filter(Boolean);
          const productRows = previewBusinessProductRowsForContext(context);
          const productIdentities = previewBusinessProductIdentitySet(productRows);
          const seen = {};
          const items = previewProductSources().map((item) => previewProductVisitWithKnownProduct(item, productRows)).filter((item) => {
            const typeText = [item.type, item.kind, item.category, item.feedType, item._sourceKey].join(" ").toLowerCase();
            const looksProduct = typeText.includes("product") || item.productName || item.price || item.priceText;
            const itemBusinessSlug = profileSlug(item.business || item.businessName || item.seller || item.shop || item.ownerName || "");
            const itemBusinessKey = profileSlug(item.businessKey || item.businessId || item.detailBusinessKey || item.ownerBusinessKey || item.profileKey || item.sellerKey || item.shopKey || "");
            const itemStatSlug = profileSlug(item._statKey || item.productId || item.productKey || "");
            const productIdentityValues = [item.productId, item.productKey, item.itemId, item.feedId, item.detailId, item._statKey, previewProductTitle(item)].map(profileSlug).filter(Boolean);
            const matchesKnownProduct = productIdentityValues.some((value) => productIdentities.has(value));
            const matchesBusiness = !itemBusinessSlug && !itemBusinessKey && item._sourceKey !== "emyProductViewStats" || itemBusinessSlug === businessSlug || itemBusinessKey === businessSlug || businessKeys.indexOf(itemBusinessKey) >= 0 || (businessSlug && itemStatSlug.indexOf(businessSlug) >= 0) || (item._sourceKey === "emyProductViewStats" && matchesKnownProduct);
            return looksProduct && matchesBusiness && previewProductVisitMatchesSelectedCustomer(item);
          }).filter((item) => {
            const title = previewProductTitle(item);
            const customerKey = profileSlug(item.customerKey || item.viewerKey || item.customerName || item.viewerName || profileName);
            const key = profileSlug((item._matchedProductId || item.productId || item.productKey || item._statKey || title) + "-" + customerKey);
            if (seen[key]) return false;
            seen[key] = true;
            return true;
          }).sort((left, right) => new Date(right.visitedAt || right.viewedAt || right.updatedAt || right.createdAt || 0).getTime() - new Date(left.visitedAt || left.viewedAt || left.updatedAt || left.createdAt || 0).getTime()).slice(0, 3);
          return items;
        }
        function previewProductVisitFreshTime(item) {
          const raw = profileText(item && (item.createdAt || item.postedAt || item.publishedAt || item.addedAt || item.created || item.date), "");
          const parsed = raw ? Date.parse(raw) : NaN;
          return Number.isFinite(parsed) ? parsed : 0;
        }
        function previewProductVisitIsNew(item) {
          const time = previewProductVisitFreshTime(item);
          if (!time) return false;
          const age = Date.now() - time;
          return age >= 0 && age < 14 * 24 * 60 * 60 * 1000;
        }
        function previewProductVisitSource(item, context) {
          const explicit = profileText(item.productSource || item.feedSource || item.listingSource || item.discoverSource || item.sourceLabel, "");
          if (/\\b(nearby|my business|customer profile|following|followed)\\b/i.test(explicit)) return explicit;
          const contextSlug = profileSlug(context && context.name || "");
          const contextKey = profileSlug(context && context.key || "");
          const businessSlug = profileSlug(item.business || item.businessName || item.seller || item.shop || item.ownerName || "");
          const businessKey = profileSlug(item.businessKey || item.businessId || item.detailBusinessKey || item.ownerBusinessKey || item.profileKey || item.sellerKey || item.shopKey || "");
          if ((contextSlug && businessSlug === contextSlug) || (contextKey && businessKey === contextKey)) return "My Business";
          return "Nearby";
        }
        function previewProductVisitTimeText(item) {
          const raw = profileText(item && (item.visitedAt || item.viewedAt || item.savedAt || item.updatedAt || item.createdAt || item.created || item.date), "");
          const date = raw ? new Date(raw) : null;
          if (!date || Number.isNaN(date.getTime())) return raw || "Visited recently";
          const dateOptions = { day:"numeric", month:"short" };
          if (date.getFullYear() !== new Date().getFullYear()) dateOptions.year = "numeric";
          const dateText = date.toLocaleDateString("en-GB", dateOptions);
          const timeText = date.toLocaleTimeString("en-GB", { hour:"numeric", minute:"2-digit" });
          return dateText + " at " + timeText;
        }
        function previewProductVisitOptionsMenu() {
          return '<div class="feed-options-menu profile-customer-product-options" data-profile-product-menu hidden>' +
            '<button class="is-danger" type="button" data-profile-product-menu-action="report">Report</button>' +
            '<button type="button" data-profile-product-menu-action="view">Go to product</button>' +
            '<button type="button" data-profile-product-menu-action="copy">Copy link</button>' +
          '</div>';
        }
        function previewProductMediaHtml(item, title) {
          const media = publicActivityMedia(item);
          const mediaAttrs = media.ref ? ' data-emy-media-ref="' + escapeHtml(media.ref) + '"' : "";
          const mediaClass = media.type || "feed";
          if (media.src || media.ref) {
            const srcAttr = media.src ? ' src="' + escapeHtml(media.src) + '"' : ' hidden';
            const posterAttr = media.type === "video" && media.posterSrc ? ' poster="' + escapeHtml(media.posterSrc) + '"' : "";
            const posterRefAttr = media.type === "video" && media.posterRef ? ' data-emy-poster-ref="' + escapeHtml(media.posterRef) + '"' : "";
            const node = media.type === "video"
              ? '<video' + srcAttr + mediaAttrs + posterAttr + posterRefAttr + ' muted playsinline preload="metadata"></video>'
              : '<img' + srcAttr + mediaAttrs + ' alt="' + escapeHtml(title) + '" />';
            return '<div class="photo ' + escapeHtml(mediaClass) + '" aria-hidden="true">' + node + '</div>';
          }
          return '<div class="photo feed is-empty" aria-hidden="true"><span class="profile-customer-product-fallback">Product</span></div>';
        }
        function previewProductVisitHtml(item, index) {
          const title = previewProductTitle(item);
          const description = previewProductDescription(item);
          const price = previewProductPrice(item);
          const availability = previewProductAvailability(item);
          const context = previewBusinessContext();
          const source = previewProductVisitSource(item, context);
          const media = publicActivityMedia(item);
          const business = profileText(item.businessName || item.business || context && context.name, "");
          const detailMeta = [source, availability, price].filter(Boolean).join("|");
          const productIsNew = previewProductVisitIsNew(item);
          const productFreshTime = previewProductVisitFreshTime(item);
          const feedId = profileText(item.feedId || item.id || item.productId || item.productKey || item._matchedProductId || ("visited-product-" + index), "visited-product-" + index);
          return '<article class="card product-card feed-product-card home-flow-item is-product profile-customer-product' + (productIsNew ? ' is-new' : '') + '" data-card data-open-item-detail data-feed-id="' + escapeHtml(feedId) + '" data-product-new="' + (productIsNew ? 'true' : 'false') + '"' + (productFreshTime ? ' data-product-created-at="' + escapeHtml(new Date(productFreshTime).toISOString()) + '"' : '') + ' data-detail-kind="Product" data-detail-title="' + escapeHtml(title) + '" data-detail-description="' + escapeHtml(description) + '" data-detail-business="' + escapeHtml(business) + '" data-detail-price="' + escapeHtml(price) + '" data-detail-media="' + escapeHtml(media.src || media.ref ? "feed" : "") + '" data-detail-media-src="' + escapeHtml(media.ref ? "" : media.src) + '" data-detail-media-ref="' + escapeHtml(media.ref || "") + '" data-detail-media-type="' + escapeHtml(media.type || "") + '" data-detail-poster-src="' + escapeHtml(media.posterRef ? "" : media.posterSrc) + '" data-detail-poster-ref="' + escapeHtml(media.posterRef || "") + '" data-detail-meta="' + escapeHtml(detailMeta) + '">' +
            previewProductMediaHtml(item, title) +
            '<button class="social-feed-more feed-action" type="button" data-profile-product-more aria-label="More options" aria-expanded="false">...</button>' + previewProductVisitOptionsMenu() +
            '<div class="body"><h3>' + escapeHtml(title) + '</h3><p>' + escapeHtml(description) + '</p><div class="product-source">' + escapeHtml(source) + '</div><div class="product-availability">' + escapeHtml(availability) + '</div>' + (price ? '<div class="price">' + escapeHtml(price) + '</div>' : '') + '<span class="profile-customer-product-time">' + escapeHtml(previewProductVisitTimeText(item)) + '</span></div>' +
          '</article>';
        }
        function hydratePreviewProductCards(root) {
          const scope = root && root.querySelectorAll ? root : document;
          scope.querySelectorAll(".profile-customer-product .photo img, .profile-customer-product .photo video").forEach((image) => {
            if (!image || image.dataset.profileProductMediaReady === "true") return;
            image.dataset.profileProductMediaReady = "true";
            const reveal = () => { image.hidden = false; };
            const fallback = () => {
              const holder = image.parentElement;
              image.remove();
              if (holder && !holder.querySelector(".profile-customer-product-fallback")) holder.insertAdjacentHTML("afterbegin", '<span class="profile-customer-product-fallback">Product</span>');
            };
            image.addEventListener("load", reveal, { once: true });
            image.addEventListener("error", fallback, { once: true });
            if (image.complete && image.naturalWidth > 0) reveal();
            if (image.dataset.emyMediaRef && window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(image);
            window.setTimeout(() => {
              if (!image.parentElement || !image.hidden) return;
              if ((image.currentSrc || image.src) && image.complete && image.naturalWidth > 0) reveal();
            }, 3000);
          });
        }
        function publicActivityReadArray(key) {
          return profileArray(readJson(key, []));
        }
        function publicActivityDateValue(item) {
          const value = new Date(item && (item.sortTime || item.repostedAt || item.updatedAt || item.postedAt || item.createdAt || item.created) || 0).getTime();
          return Number.isFinite(value) ? value : 0;
        }
        function publicActivityCustomerName() {
          return profileText(profileName || localStorage.getItem("emyCustomerDisplayName") || [localStorage.getItem("emyMainPendingSignupFirstName"), localStorage.getItem("emyMainPendingSignupLastName")].filter(Boolean).join(" "), "Stephane");
        }
        function publicActivityBusinessDraft() {
          try {
            const parsed = JSON.parse(localStorage.getItem("emyBusinessProfileDraft") || "{}");
            return parsed && typeof parsed === "object" ? parsed : {};
          } catch (error) {
            return {};
          }
        }
        function publicActivityCurrentBusinessName() {
          const draft = publicActivityBusinessDraft();
          return profileText(draft.businessName || draft.name || localStorage.getItem("emyBusinessDisplayName") || localStorage.getItem("emyBusinessName") || localStorage.getItem("emyMainPendingSignupBusinessName"), "");
        }
        function publicActivityCurrentBusinessKeys() {
          const draft = publicActivityBusinessDraft();
          const keys = new Set();
          [draft.businessKey, draft.key, publicActivityCurrentBusinessName(), localStorage.getItem("emyBusinessProfileKey"), localStorage.getItem("emyBusinessKey"), localStorage.getItem("emyBusinessDisplayName"), localStorage.getItem("emyBusinessName")].forEach((value) => {
            const key = profileSlug(value);
            if (key) keys.add(key);
          });
          return keys;
        }
        function publicActivityCurrentActorIdentity() {
          const role = String(localStorage.getItem("emyMainSignedInRole") || localStorage.getItem("emyMainPendingSignupRole") || "").toLowerCase();
          const businessName = publicActivityCurrentBusinessName();
          if (role === "business" && businessName) {
            const draft = publicActivityBusinessDraft();
            const businessKey = profileText(draft.businessKey || draft.key || localStorage.getItem("emyBusinessProfileKey") || localStorage.getItem("emyBusinessKey") || profileSlug(businessName) || "profile", "profile");
            const businessPhoto = profileText(localStorage.getItem("emyBusinessProfilePhoto") || draft.profilePhoto || draft.photo || draft.avatar, "");
            const businessPhotoRef = profileText(localStorage.getItem("emyBusinessProfilePhotoRef") || draft.profilePhotoRef || draft.photoRef || draft.avatarRef, "");
            return { type: "business", name: businessName, key: businessKey, photo: businessPhoto, photoRef: businessPhotoRef, href: "emy-business-profile.html?mode=business" };
          }
          return {
            type: "customer",
            name: publicActivityCustomerName(),
            key: "customer-profile",
            photo: typeof currentProfilePhotoSrc === "function" ? currentProfilePhotoSrc() : (localStorage.getItem("emyCustomerProfilePhoto") || localStorage.getItem("emyCustomerProfilePhotoSrc") || ""),
            photoRef: typeof currentProfilePhotoRef === "function" ? currentProfilePhotoRef() : (localStorage.getItem("emyCustomerProfilePhotoRef") || ""),
            href: "emy-customer-profile.html"
          };
        }
        function publicActivityCardItemLabel(card) {
          const kind = profileText(card && card.dataset && card.dataset.detailKind, "").toLowerCase();
          if (kind.includes("product")) return "product";
          if (kind.includes("article")) return "article";
          if (kind.includes("clip")) return "clip";
          if (kind.includes("job")) return "job";
          if (kind.includes("event")) return "event";
          return "post";
        }
        function publicActivityOwnerNotificationBody(card, action, text) {
          const actor = publicActivityCurrentActorIdentity();
          const itemKind = publicActivityCardItemLabel(card);
          if (text) return profileText(text, actor.name + " interacted with your " + itemKind + ".");
          if (action === "like") return actor.name + " liked your " + itemKind + ".";
          if (action === "save") return actor.name + " saved your " + itemKind + ".";
          if (action === "share") return actor.name + " shared your " + itemKind + ".";
          if (action === "repost") return actor.name + " reposted your " + itemKind + ".";
          if (action === "comment") return actor.name + " commented on your " + itemKind + ".";
          return actor.name + " interacted with your " + itemKind + ".";
        }
        function publicActivityActorIsCustomerContentOwner(card, actor) {
          if (!card || !actor || actor.type !== "customer") return false;
          const data = card.dataset || {};
          const ownerName = publicActivityCustomerName().trim().toLowerCase();
          const posterName = profileText(data.detailBusiness, "").trim().toLowerCase();
          if (ownerName && posterName && ownerName === posterName) return true;
          const cardOwnerKey = profileSlug(data.businessKey || data.detailBusinessKey || data.ownerKey || "");
          const actorKey = profileSlug(actor.key || "");
          if (cardOwnerKey === "customer-profile" && (!actorKey || actorKey === "customer-profile")) return true;
          return data.owner === "customer" || data.accountType === "customer" || data.actorType === "customer" || card.classList.contains("customer-public-activity-item");
        }
        function dispatchProfileCustomerNotificationCreated(detail) {
          try { window.dispatchEvent(new CustomEvent("emy:customer-notification-created", { detail: detail || {} })); } catch (error) {}
        }
        function publicActivityNotifyCustomerOwner(card, action, text) {
          try {
            if (!card) return;
            const actor = publicActivityCurrentActorIdentity();
            if (publicActivityActorIsCustomerContentOwner(card, actor)) return;
            const itemKind = publicActivityCardItemLabel(card);
            const itemTitle = profileText(card.dataset.detailTitle, itemKind);
            const notification = {
              id: "public-customer-owner-" + action + "-" + (card.dataset.publicActivityId || "item") + "-" + Date.now(),
              type: "customer-" + itemKind.replace(/\\s+/g, "-") + "-" + action,
              group: "important",
              title: "Your " + itemKind + " has new activity",
              body: publicActivityOwnerNotificationBody(card, action, text),
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
            const current = profileArray(readJson("emyCustomerNotifications", []));
            const next = current.filter((entry) => entry && entry.id !== notification.id);
            next.unshift(notification);
            localStorage.setItem("emyCustomerNotifications", JSON.stringify(next.slice(0, 80)));
            if (typeof renderNotifications === "function") renderNotifications();
            dispatchProfileCustomerNotificationCreated({ action, itemKind, itemTitle });
          } catch (error) {}
        }
        function publicActivityMatchesCurrentBusiness(item) {
          const currentNameKey = profileSlug(publicActivityCurrentBusinessName());
          if (!item || !currentNameKey) return false;
          const keys = publicActivityCurrentBusinessKeys();
          const generic = { "profile": true, "business-profile": true, "business": true, "your-business": true };
          return [
            item.key,
            item.businessKey,
            item.ownerKey,
            item.profileKey,
            item.detailBusinessKey,
            item.business,
            item.businessName,
            item.name,
            item.actor,
            item.ownerName,
            item.authorName,
            item.createdByName,
            item.repostedByName
          ].map(profileSlug).filter(Boolean).some((key) => !generic[key] && keys.has(key));
        }
        function publicActivityIsBusinessOwned(item) {
          const source = String(item && (item.source || item.createdFrom || item.origin) || "").toLowerCase();
          const owner = String(item && (item.owner || item.actorType || item.createdAs || item.accountType || item.role || item.authorRole) || "").toLowerCase();
          const href = String(item && (item.profileHref || item.href) || "").toLowerCase();
          const key = profileSlug(item && (item.businessKey || item.key || item.detailBusinessKey || item.ownerKey || item.profileKey) || "");
          if (owner.indexOf("business") !== -1 || source.indexOf("business") !== -1 || href.indexOf("emy-business-profile") !== -1 || (!!key && key !== "customer-profile")) return true;
          return publicActivityMatchesCurrentBusiness(item);
        }
        function publicActivityOwnedItem(item) {
          if (!item || typeof item !== "object") return false;
          if (publicActivityIsBusinessOwned(item)) return false;
          const key = String(item.businessKey || item.key || item.detailBusinessKey || "").toLowerCase();
          const owner = String(item.owner || "").toLowerCase();
          const id = String(item.id || item.postId || "").toLowerCase();
          const actor = profileText(item.actor || item.business || item.name || item.repostedBy || "").toLowerCase();
          const customerName = publicActivityCustomerName().toLowerCase();
          return owner === "customer" ||
            key === "customer-profile" ||
            item.profileHref === "emy-customer-profile.html" ||
            id.indexOf("customer-post-") === 0 ||
            id.indexOf("user-feed-") === 0 ||
            (!!customerName && actor === customerName);
        }
        function publicActivityRepostOwnedItem(item) {
          if (!item || typeof item !== "object") return false;
          if (publicActivityIsBusinessOwned(item)) return false;
          const repostedBy = profileText(item.repostedBy || item.actor || item.business || item.name || "").toLowerCase();
          const customerName = publicActivityCustomerName().toLowerCase();
          const key = String(item.businessKey || item.key || "").toLowerCase();
          return item.owner === "customer" || key === "customer-profile" || (!!customerName && repostedBy === customerName);
        }
        function publicActivityCustomerContext(item) {
          const actor = profileText(item && (item.actor || item.business || item.name), "");
          return actor && actor.toLowerCase() !== publicActivityCustomerName().toLowerCase() ? actor : "Customer account";
        }
        function publicActivityMedia(item) {
          const helperItems = window.emyFeedMediaItemsFromItem ? window.emyFeedMediaItemsFromItem(item) : [];
          const mediaItems = helperItems.length ? helperItems : (Array.isArray(item && item.mediaItems) ? item.mediaItems : []);
          const first = mediaItems[0] || null;
          const src = profileText(first && first.src || item && (item.mediaSrc || item.image || item.coverSrc || item.thumbnailSrc || item.posterSrc), "");
          const ref = profileText(first && first.ref || item && (item.mediaRef || item.imageRef || item.coverRef), "");
          const type = String(first && first.type || item && item.mediaType || (src || ref ? "image" : "")).toLowerCase();
          const posterRef = profileText(first && (first.posterRef || first.thumbnailRef) || item && (item.posterRef || item.thumbnailRef), "");
          const posterSrc = posterRef ? "" : profileText(first && (first.posterSrc || first.thumbnailSrc) || item && (item.posterSrc || item.thumbnailSrc), "");
          return { src, ref, type: type === "video" ? "video" : (src || ref ? "image" : ""), posterSrc, posterRef };
        }
        const publicActivityStateKey = "emyFeedActionState";
        const publicActivityLegacyStateKey = "emyCustomerPublicActivityState";
        function publicActivityReadState() {
          const state = readJson(publicActivityStateKey, {});
          const legacy = readJson(publicActivityLegacyStateKey, {});
          const safeState = state && typeof state === "object" && !Array.isArray(state) ? state : {};
          const safeLegacy = legacy && typeof legacy === "object" && !Array.isArray(legacy) ? legacy : {};
          return Object.assign({}, safeLegacy, safeState);
        }
        function publicActivityWriteState(state) {
          try {
            localStorage.setItem(publicActivityStateKey, JSON.stringify(state || {}));
            window.dispatchEvent(new CustomEvent("emy:feed-action-state-changed", { detail: { key: publicActivityStateKey } }));
          } catch (error) {}
        }
        function publicActivityStateFor(id) {
          const state = publicActivityReadState();
          const item = state[id] || {};
          return item && typeof item === "object" ? item : {};
        }
        function publicActivityUpdateState(id, patch) {
          if (!id) return {};
          const state = publicActivityReadState();
          state[id] = Object.assign({}, state[id] || {}, patch || {});
          publicActivityWriteState(state);
          return state[id];
        }
        function publicActivityIsClipItem(item, fallbackType) {
          const source = String(fallbackType || "").trim().toLowerCase();
          const createType = String(item && item.createType || "").trim().toLowerCase();
          const postMode = String(item && item.postMode || "").trim().toLowerCase();
          const tag = String(item && item.tag || "").trim().toLowerCase();
          const type = String(item && item.type || "").trim().toLowerCase();
          const kind = String(item && item.kind || "").trim().toLowerCase();
          const detailKind = String(item && item.detailKind || "").trim().toLowerCase();
          const category = String(item && item.category || "").trim().toLowerCase();
          const clipType = String(item && (item.clipType || item.reelType || item.reelKind) || "").trim().toLowerCase();
          const combined = [source, createType, postMode, tag, type, kind, detailKind, category, clipType].join(" ");
          const isVideoPost = createType === "post" || kind === "post" || type === "post" || postMode === "video" || tag === "video" || tag === "photo" || tag === "update" || category === "update";
          if (/\\b(product clip|business clip)\\b/.test(combined)) return true;
          if (source === "clip" || source === "reel" || source === "reels") return true;
          if (postMode === "clip" || postMode === "reel" || createType === "clip" || createType === "reel" || kind === "reel" || type === "reel" || detailKind === "reel") return true;
          if ((kind === "clip" || type === "clip" || detailKind === "clip") && !isVideoPost) return true;
          return !!(item && (item.clipTitle || item.reelTitle || clipType)) && !isVideoPost;
        }
        function publicActivitySourceType(item, fallbackType) {
          const tagText = [fallbackType, item && item.createType, item && item.postMode, item && item.tag, item && item.type, item && item.kind, item && item.detailKind, item && item.category, item && item.productName, item && item.productTitle].join(" ").toLowerCase();
          const firstMedia = Array.isArray(item && item.mediaItems) ? item.mediaItems[0] : null;
          const mediaType = String(firstMedia && firstMedia.type || item && item.mediaType || "").toLowerCase();
          const explicitClip = publicActivityIsClipItem(item, fallbackType);
          const explicitProduct = tagText.includes("product") || !!(item && (item.productName || item.productTitle || item.productInfo || item.productDescription || item.productPrice || item.price || item.priceText));
          if (explicitClip) return "clip";
          if (explicitProduct) return "product";
          if (tagText.includes("job") || tagText.includes("hiring") || !!(item && (item.jobTitle || item.jobLocation || item.employment))) return "job";
          if (tagText.includes("event") || !!(item && (item.eventWhen || item.eventWhere))) return "event";
          if (tagText.includes("article") || tagText.includes("document") || !!(item && (item.articleBody || item.articleShare || item.readTime))) return "article";
          return "post";
        }
        function publicActivityKindLabel(item, type, media) {
          if (type === "product") return "Product";
          if (type === "clip") {
            const productClipText = [item && item.kindLabel, item && item.tag, item && item.category, item && item.clipKind, item && item.reelKind, item && item.clipType, item && item.reelType, item && item.title, item && item.description, item && item.text].join(" ").toLowerCase();
            return item && (item.price || item.priceText || item.productName || item.productTitle || item.productDescription || item.productInfo || /product\\s*clip|shared\\s+a\\s+product\\s+clip|product\\s+video|clip\\s+product/.test(productClipText)) ? "Product Clip" : "Clip";
          }
          if (type === "job") return "Job";
          if (type === "event") return profileText(item && item.eventType, "Event");
          if (type === "article") return profileText(item && item.tag, "Article");
          if (media && media.type === "video") return "Video";
          if (media && media.type === "image") return "Photo";
          return profileText(item && item.tag, "Post");
        }
        function publicActivityCardFromCreated(item, index, fallbackType) {
          const mediaItems = window.emyFeedMediaItemsFromItem ? window.emyFeedMediaItemsFromItem(item) : (Array.isArray(item && item.mediaItems) ? item.mediaItems : []);
          const media = publicActivityMedia(Object.assign({}, item || {}, { mediaItems }));
          const type = publicActivitySourceType(item, fallbackType);
          const title = profileText(item.title || item.jobTitle || item.name || item.productName || item.productTitle || item.itemTitle || item.clipTitle, type === "product" ? "Product" : type === "clip" ? "New clip" : type === "job" ? "Help wanted" : type === "event" ? "New event" : type === "article" ? "New article" : "Profile update");
          const text = profileText(item.description || item.text || item.shareText || item.productInfo || item.productDescription || item.productText || item.summary, "Shared an update on EMY.");
          const time = profileShortDate(item.postedAt || item.createdAt || item.created || item.time, item.time || "Recent");
          const commentItems = Array.isArray(item.comments) ? item.comments : [];
          return {
            id: profileText(item.id || "created-" + fallbackType + "-" + index),
            type,
            label: type === "article" ? "published this" : "posted this",
            kindLabel: publicActivityKindLabel(item, type, media),
            title,
            text,
            media,
            mediaItems,
            mediaClass: profileText(item.media || item.mediaClass || "feed", "feed"),
            mediaSettings: item.mediaSettings || {},
            mediaOverlay: profileText(item.mediaOverlay || "", ""),
            category: profileText(item.category || item.tag || item.eventType || "", ""),
            readTime: profileText(item.readTime || item.articleReadTime || "", ""),
            articleBody: profileText(item.articleBody || item.body || item.text || item.description || text, text),
            articleShare: profileText(item.articleShare || item.shareText || item.description || text, text),
            eventType: profileText(item.eventType || item.category || item.tag, "Event"),
            eventWhen: profileText(item.eventWhen || item.when || item.eventDate || item.dateText || "", ""),
            eventWhere: profileText(item.eventWhere || item.where || item.location || item.place || "", ""),
            jobLocation: profileText(item.jobLocation || item.location || "", ""),
            workplace: profileText(item.workplace || "", ""),
            employment: profileText(item.employment || "", ""),
            experience: profileText(item.experience || "", ""),
            apply: profileText(item.apply || "", ""),
            notes: profileText(item.notes || item.pay || item.salary || "", ""),
            applicants: Math.max(0, Number(item.applicants) || 0),
            price: profileText(item.priceText || item.price || item.productPrice, ""),
            productSource: profileText(item.productSource || item.sourceLabel || item.source, "Customer profile"),
            availability: profileText(item.availability || item.available || item.status, "Online and available"),
            saved: Math.max(0, Number(item.saved) || Number(item.savedCount) || 0),
            savedCount: Math.max(0, Number(item.savedCount) || Number(item.saved) || 0),
            viewsText: profileText(item.viewsText || item.views, ""),
            duration: profileText(item.duration || item.timeLeft, ""),
            business: publicActivityCustomerContext(item),
            time,
            sortTime: item.postedAt || item.createdAt || item.created || "",
            stats: profileText(item.stats || item.reactionsText || item.reactions || item.likes || item.likeCount || "0 likes", "0 likes"),
            likes: item.likes,
            likeCount: item.likeCount,
            reactionCount: item.reactionCount,
            reactions: item.reactions,
            commentsCount: item.commentsCount,
            commentCount: item.commentCount,
            repliesCount: item.repliesCount,
            reposts: profileText(item.reposts || item.repostCount || "", ""),
            repostCount: item.repostCount,
            shares: item.shares,
            shareCount: item.shareCount,
            comments: commentItems
          };
        }
        function publicActivityCardFromRepost(item, index) {
          const storedOriginal = item && item.original && typeof item.original === "object" ? item.original : null;
          const flatKind = profileText(item && (item.kind || item.originalKind || ""), "");
          const original = storedOriginal || {
            id: item && (item.originalId || item.originalFeedId || item.feedId || ""),
            key: item && (item.originalKey || item.businessKey || ""),
            businessKey: item && (item.originalKey || item.businessKey || ""),
            business: item && (item.originalBusiness || item.businessName || item.business || item.detailBusiness) || "Business",
            kind: flatKind && flatKind.toLowerCase() !== "repost" ? flatKind : "Post",
            title: item && (item.originalTitle || item.title || item.detailTitle) || "Feed update",
            text: item && (item.originalText || item.text || item.description || item.detailDescription) || "",
            media: item && (item.media || item.detailMedia) || "feed",
            mediaSrc: item && (item.mediaSrc || item.detailMediaSrc) || "",
            mediaRef: item && (item.mediaRef || item.detailMediaRef) || "",
            mediaType: item && (item.mediaType || item.detailMediaType) || "",
            posterSrc: item && (item.posterSrc || item.detailPosterSrc) || "",
            posterRef: item && (item.posterRef || item.detailPosterRef) || "",
            avatarSrc: item && (item.originalAvatarSrc || item.detailAvatarSrc || item.businessPhoto || item.profilePhoto) || "",
            avatarRef: item && (item.originalAvatarRef || item.detailAvatarRef || item.businessPhotoRef || item.profilePhotoRef) || "",
            profilePhoto: item && (item.originalAvatarSrc || item.detailAvatarSrc || item.businessPhoto || item.profilePhoto) || "",
            profilePhotoRef: item && (item.originalAvatarRef || item.detailAvatarRef || item.businessPhotoRef || item.profilePhotoRef) || "",
            businessPhoto: item && (item.originalAvatarSrc || item.detailAvatarSrc || item.businessPhoto || item.profilePhoto) || "",
            businessPhotoRef: item && (item.originalAvatarRef || item.detailAvatarRef || item.businessPhotoRef || item.profilePhotoRef) || "",
            duration: item && (item.duration || item.detailDuration) || "",
            articleBody: item && (item.articleBody || item.detailArticleBody) || "",
            articleShare: item && (item.articleShare || item.detailArticleShare) || "",
            articleReadTime: item && (item.articleReadTime || item.detailArticleReadTime) || "",
            price: item && (item.originalPrice || item.price || item.detailPrice) || "",
            meta: item && (item.originalMeta || item.meta || item.detailMeta) || ""
          };
          const mediaItems = window.emyFeedMediaItemsFromItem ? window.emyFeedMediaItemsFromItem(original) : (Array.isArray(original && original.mediaItems) ? original.mediaItems : []);
          const media = publicActivityMedia(Object.assign({}, original || {}, { mediaItems }));
          const originalTitle = profileText(original.title || original.name || original.productName || original.jobTitle, "Shared post");
          const title = profileText(item.thought || item.repostThought || originalTitle, "Shared post");
          const text = profileText(original.text || original.description || item.text || item.description, "Shared this with followers.");
          const commentItems = Array.isArray(item.comments) ? item.comments : Array.isArray(original.comments) ? original.comments : [];
          const originalPrice = profileText(original.price || original.priceText || original.productPrice, "");
          const originalKindRaw = profileText(original.detailKind || original.kind || original.type || "Post", "Post");
          const originalKindText = [originalKindRaw, original.category, original.tag, original.productName, original.productTitle, original.productInfo, original.productDescription, originalPrice].join(" ");
          const originalKind = /clip/i.test(originalKindRaw)
            ? (/product/i.test(originalKindText) || originalPrice ? "Product Clip" : "Clip")
            : (/product/i.test(originalKindText) || originalPrice ? "Product" : originalKindRaw);
          const originalAvatar = publicActivityBusinessAvatarForOriginal(original);
          return {
            id: profileText(item.id || "repost-" + index),
            originalId: profileText(item.originalId || item.originalFeedId || item.feedId || original.id || "", ""),
            originalKey: profileText(original.key || original.businessKey || "", ""),
            type: "repost",
            label: "reposted this",
            kindLabel: "Repost",
            title,
            text,
            media,
            mediaItems,
            mediaClass: profileText(original.media || original.mediaClass || "feed", "feed"),
            repostThought: profileText(item.thought || item.repostThought || item.text, ""),
            category: profileText(original.category || original.tag || original.detailKind || "Repost", "Repost"),
            readTime: profileText(original.readTime || original.articleReadTime || "", ""),
            articleBody: profileText(original.articleBody || original.text || original.description || text, text),
            articleShare: profileText(original.articleShare || original.shareText || original.description || text, text),
            eventType: profileText(original.eventType || original.category || original.tag, "Event"),
            eventWhen: profileText(original.eventWhen || original.when || original.eventDate || original.dateText || "", ""),
            eventWhere: profileText(original.eventWhere || original.where || original.location || original.place || "", ""),
            originalKind,
            originalTitle,
            originalText: text,
            originalPrice,
            originalAvatarSrc: profileText(original.avatarSrc || original.profilePhoto || original.businessPhoto || original.photo || originalAvatar.src, ""),
            originalAvatarRef: profileText(original.avatarRef || original.profilePhotoRef || original.businessPhotoRef || original.photoRef || originalAvatar.ref, ""),
            business: profileText(original.business || original.actor || original.name, "EMY"),
            time: profileShortDate(item.repostedAt || item.createdAt, "Recent"),
            sortTime: item.repostedAt || item.createdAt || "",
            stats: profileText(item.stats || item.reactionsText || item.reactions || item.likes || item.likeCount || original.stats || original.likes || "0 likes", "0 likes"),
            likes: item.likes !== undefined ? item.likes : original.likes,
            likeCount: item.likeCount !== undefined ? item.likeCount : original.likeCount,
            reactionCount: item.reactionCount !== undefined ? item.reactionCount : original.reactionCount,
            reactions: item.reactions !== undefined ? item.reactions : original.reactions,
            commentsCount: item.commentsCount !== undefined ? item.commentsCount : original.commentsCount,
            commentCount: item.commentCount !== undefined ? item.commentCount : original.commentCount,
            repliesCount: item.repliesCount !== undefined ? item.repliesCount : original.repliesCount,
            reposts: profileText(original.reposts || item.reposts || "0 reposts", "0 reposts"),
            repostCount: item.repostCount !== undefined ? item.repostCount : original.repostCount,
            shares: item.shares !== undefined ? item.shares : original.shares,
            shareCount: item.shareCount !== undefined ? item.shareCount : original.shareCount,
            savedCount: item.savedCount !== undefined ? item.savedCount : original.savedCount,
            comments: commentItems
          };
        }
        function publicActivityItems() {
          const createdSources = [
            ["emyFeedCreatedPosts", "post"],
            ["emyFeedCreatedArticles", "article"],
            ["emyFeedCreatedEvents", "event"],
            ["emyFeedCreatedJobs", "job"]
          ];
          const created = createdSources.flatMap((source) => publicActivityReadArray(source[0]).filter((item) => publicActivityOwnedItem(item) && !(window.emyIsDeletedFeedItem && window.emyIsDeletedFeedItem(item))).map((item, index) => publicActivityCardFromCreated(item, index, source[1])));
          const reposts = publicActivityReadArray("emyFeedReposts").filter(publicActivityRepostOwnedItem).map(publicActivityCardFromRepost);
          return created.concat(reposts).sort((a, b) => publicActivityDateValue(b) - publicActivityDateValue(a));
        }
        function publicActivityCategoryForItem(item) {
          const kind = String(item && item.kindLabel || "").toLowerCase();
          if (kind === "repost") return "reposts";
          if (item && item.type === "repost") return "reposts";
          if (item && item.type === "clip") return "clips";
          if (item && (item.type === "job" || item.type === "hiring")) return "jobs";
          if (item && item.type === "event") return "events";
          if (item && item.type === "article") return "articles";
          return "updates";
        }
        function publicActivityCategoryLabel(category) {
          const labels = { all:"activity", updates:"updates", articles:"articles", events:"events", jobs:"jobs", clips:"clips", reposts:"reposts" };
          return labels[category] || "activity";
        }
        function publicActivityCategoryTitle(category) {
          const labels = { updates:"Update", articles:"Article", events:"Event", jobs:"Job", clips:"Clip", reposts:"Repost" };
          return labels[category] || "Activity";
        }
        function publicActivityDetailKind(category) {
          if (category === "clips") return "Clip";
          if (category === "jobs") return "Job";
          if (category === "articles") return "Article";
          if (category === "events") return "Event";
          return "Post";
        }
        function publicActivitySearchHref(category) {
          const tabs = { updates:"updates", articles:"articles", events:"events", jobs:"jobs", clips:"reels", reposts:"updates" };
          return category && category !== "all" ? "emy-customer-search.html#" + encodeURIComponent(tabs[category] || "updates") : "emy-customer-home.html#feeds";
        }
        function publicActivityMetaChip(value, label, accent) {
          const cleanValue = profileText(value, "");
          if (!cleanValue) return "";
          return '<span' + (accent ? ' class="is-category"' : '') + '>' + (label ? '<b>' + escapeHtml(label) + '</b>' : '') + escapeHtml(cleanValue) + '</span>';
        }
        function publicActivityCountLabel(value, noun) {
          const count = publicActivityNumber(value);
          return publicActivityFormatCount(count) + " " + (count === 1 ? noun : noun + "s");
        }
        function publicActivityReadTime(item) {
          if (item.readTime) return item.readTime;
          const words = String(item.articleBody || item.text || "").split(/\s+/).filter(Boolean).length;
          return Math.max(1, Math.ceil(words / 180)) + " min read";
        }
        function publicActivityDetailMeta(item, category) {
          if (category === "products") return ["Customer profile", item.price || "", item.availability || "Online and available"].filter(Boolean).join("|");
          if (category === "clips") return [item.kindLabel || "Clip", item.viewsText || "", item.duration || item.time || ""].filter(Boolean).join("|");
          if (category === "jobs") return [item.jobLocation || "Location to confirm", item.workplace || "On-site", item.employment || "Flexible"].filter(Boolean).join("|");
          if (category === "events") return [item.eventType || "Event", item.eventWhen || "Date to confirm", item.eventWhere || "Location to confirm"].filter(Boolean).join("|");
          if (category === "articles") return [item.category || "Article", item.time || "", publicActivityReadTime(item)].filter(Boolean).join("|");
          if (category === "reposts") return ["Repost", item.business || "Original post", item.originalKind || "Post"].filter(Boolean).join("|");
          return [publicActivityCategoryTitle(category), item.time || "", item.stats || "0 reactions"].filter(Boolean).join("|");
        }
        function publicActivityMatchesSearch(item) {
          const query = publicActivityQuery.toLowerCase();
          if (!query) return true;
          const haystack = [
            item && item.title,
            item && item.text,
            item && item.kindLabel,
            item && item.category,
            item && item.business,
            item && item.eventType,
            item && item.eventWhen,
            item && item.eventWhere,
            item && item.originalKind
          ].join(" ").toLowerCase();
          return haystack.includes(query);
        }
        function publicActivityCardMetaHtml(item, category) {
          const chips = [publicActivityMetaChip(publicActivityCategoryTitle(category), "", true)];
          if (category === "products") {
            chips.push(publicActivityMetaChip(item.price || "No price", "Price"));
            chips.push(publicActivityMetaChip(item.availability || "Online and available", ""));
          } else if (category === "clips") {
            chips.push(publicActivityMetaChip(item.viewsText || "0 views", ""));
            chips.push(publicActivityMetaChip(item.duration || item.time || "Recent", ""));
          } else if (category === "jobs") {
            chips.push(publicActivityMetaChip(item.jobLocation || "Location to confirm", "Location"));
            chips.push(publicActivityMetaChip(item.employment || "Flexible", ""));
          } else if (category === "events") {
            chips.push(publicActivityMetaChip(item.eventWhen || "Date to confirm", "When"));
            chips.push(publicActivityMetaChip(item.eventWhere || "Location to confirm", "Where"));
          } else if (category === "articles") {
            chips.push(publicActivityMetaChip(publicActivityReadTime(item), ""));
            chips.push(publicActivityMetaChip(item.category || "Published", ""));
          } else if (category === "reposts") {
            chips.push(publicActivityMetaChip(item.business || "Original post", "From"));
            chips.push(publicActivityMetaChip(item.originalKind || "Post", ""));
          } else {
            chips.push(publicActivityMetaChip(item.time || "Recent", ""));
            chips.push(publicActivityMetaChip(publicActivityCountLabel(item.stats, "reaction"), ""));
          }
          return '<div class="customer-public-result-meta" data-public-activity-open>' + chips.filter(Boolean).join("") + '</div>';
        }
        function syncPublicActivityTabs(items) {
          const counts = (items || []).reduce((memo, item) => {
            const category = publicActivityCategoryForItem(item);
            memo.all += 1;
            memo[category] = (memo[category] || 0) + 1;
            return memo;
          }, { all:0, updates:0, articles:0, events:0, jobs:0, clips:0, reposts:0 });
          publicActivityTabs.forEach((button) => {
            const category = button.dataset.publicActivityCategory || "all";
            const active = category === publicActivityCategory;
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-selected", active ? "true" : "false");
            button.disabled = false;
            button.removeAttribute("aria-disabled");
            const base = button.dataset.publicActivityLabel || button.textContent.replace(/\\s+\\d+$/, "").trim();
            button.dataset.publicActivityLabel = base;
            const count = counts[category] || 0;
            button.textContent = base;
            button.setAttribute("aria-label", count ? base + " " + count : base);
          });
        }
        function publicActivityNumber(value) {
          const match = String(value || "").match(/(\\d+(?:\\.\\d+)?)\\s*([kKmM])?/);
          if (!match) return 0;
          const multiplier = match[2] && match[2].toLowerCase() === "m" ? 1000000 : match[2] ? 1000 : 1;
          return Math.round((Number(match[1]) || 0) * multiplier);
        }
        function publicActivityFormatCount(count) {
          const safe = Math.max(0, Number(count) || 0);
          if (safe >= 1000000) return (Math.round(safe / 100000) / 10).toString().replace(/\\.0$/, "") + "M";
          if (safe >= 1000) return (Math.round(safe / 100) / 10).toString().replace(/\\.0$/, "") + "K";
          return String(safe);
        }
        function publicActivityCountFromValue(value) {
          if (Array.isArray(value)) return value.length;
          if (typeof value === "number") return Number.isFinite(value) ? Math.max(0, Math.round(value)) : 0;
          if (typeof value === "boolean") return value ? 1 : 0;
          return publicActivityNumber(value);
        }
        function publicActivityCountFromFields(item, keys, fallbackText) {
          const counts = [];
          keys.forEach((key) => {
            if (item && item[key] !== undefined && item[key] !== null && item[key] !== "") counts.push(publicActivityCountFromValue(item[key]));
          });
          if (fallbackText !== undefined && fallbackText !== null && fallbackText !== "") counts.push(publicActivityNumber(fallbackText));
          return counts.length ? Math.max.apply(Math, counts) : 0;
        }
        function publicActivityActorKey(item) {
          if (!item || typeof item !== "object") return "";
          const role = profileText(item.role || item.actorType || item.accountRole || item.type, "").toLowerCase();
          const identity = profileText(item.key || item.actorKey || item.customerKey || item.viewerKey || item.email || item.viewerEmail || item.name || item.actorName || item.customerName || item.viewerName, "").toLowerCase();
          return [role, identity].filter(Boolean).join(":");
        }
        function publicActivityPeopleCount(list) {
          const seen = new Set();
          (Array.isArray(list) ? list : []).forEach((item) => {
            const key = publicActivityActorKey(item);
            if (key) seen.add(key);
          });
          return seen.size;
        }
        function publicActivityCurrentActorRow() {
          const actor = publicActivityCurrentActorIdentity();
          return { name: actor.name, key: actor.key, role: actor.type, actorType: actor.type, photo: actor.photo, photoRef: actor.photoRef, href: actor.href, at: new Date().toISOString() };
        }
        function publicActivityActorActive(list) {
          const actorKey = publicActivityActorKey(publicActivityCurrentActorRow());
          return !!actorKey && (Array.isArray(list) ? list : []).some((item) => publicActivityActorKey(item) === actorKey);
        }
        function publicActivityListWithActor(list, active) {
          const actor = publicActivityCurrentActorRow();
          const actorKey = publicActivityActorKey(actor);
          const rows = (Array.isArray(list) ? list : []).filter((item) => publicActivityActorKey(item) !== actorKey);
          if (active) rows.unshift(actor);
          return rows.slice(0, 100);
        }
        function publicActivityEventListWithActor(list) {
          const actor = publicActivityCurrentActorRow();
          return [Object.assign({}, actor, { id: "share-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8) })].concat(Array.isArray(list) ? list : []).slice(0, 160);
        }
        function publicActivityBaseLikeCount(item) {
          return publicActivityPeopleCount(item && item.likedBy);
        }
        function publicActivityBaseCommentCount(item, comments) {
          return Math.max(comments.length, publicActivityCountFromFields(item, ["commentCount", "commentsCount", "replyCount", "repliesCount", "comments"]));
        }
        function publicActivityStoredRepostCount(item) {
          const originalId = item && (item.originalId || item.id) || "";
          if (!originalId) return 0;
          return publicActivityReadArray("emyFeedReposts").filter((entry) => {
            const entryOriginal = entry && (entry.originalId || (entry.original && entry.original.id)) || "";
            return entryOriginal === originalId;
          }).length;
        }
        function publicActivityBaseRepostCount(item) {
          return Math.max(publicActivityStoredRepostCount(item), publicActivityPeopleCount(item && item.repostedBy));
        }
        function publicActivityBaseShareCount(item) {
          return Math.max(publicActivityPeopleCount(item && item.shareEvents), publicActivityPeopleCount(item && item.sharedBy));
        }
        function publicActivityBaseSavedCount(item) {
          return publicActivityPeopleCount(item && item.savedBy);
        }
        function publicActivityLikeStatText(item) {
          const count = publicActivityBaseLikeCount(item);
          return publicActivityFormatCount(count) + " like" + (count === 1 ? "" : "s");
        }
        function publicActivityIcon(name) {
          if (name === "apply") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3.5h7l3 3V20H7V3.5Z"/><path d="M14 3.5V7h3M9.5 14l2 2 4-5"/></svg>';
          if (name === "comment") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5.5h14v10.8H9.2L5 19.5v-14Z"/><path d="M8.8 10.8h6.4"/></svg>';
          if (name === "repost") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 2.8 21 6.8l-4 4"/><path d="M3 11V9a2.2 2.2 0 0 1 2.2-2.2H21"/><path d="M7 21.2l-4-4 4-4"/><path d="M21 13v2a2.2 2.2 0 0 1-2.2 2.2H3"/></svg>';
          if (name === "share") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8a3 3 0 1 0-2.8-4.05L8.7 7.25a3 3 0 1 0 0 3.5l6.5 3.3A3 3 0 1 0 16 12.5L9.6 9.25"/></svg>';
          if (name === "save") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4.8h12v15.4l-6-3.4-6 3.4V4.8Z"/></svg>';
          return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.6 10.6 10.8 4c.5-.9 1.9-.6 1.9.5v5h4.9c1.2 0 2.1 1.1 1.8 2.3l-1.5 5.7c-.3 1.1-1.2 1.8-2.3 1.8H8.4c-.9 0-1.6-.7-1.6-1.6v-6c0-.4.3-.9.8-1.1Z"/><path d="M4.8 10.8v8.4"/></svg>';
        }
        function publicActivityCommentHtml(comment) {
          const name = profileText(comment && comment.name, "You");
          const text = profileText(comment && comment.text, "");
          const initial = name.charAt(0).toUpperCase() || "Y";
          return '<div class="feed-comment" data-public-comment-row><span class="feed-comment-avatar" aria-hidden="true">' + escapeHtml(initial) + '</span><div class="feed-comment-bubble"><strong>' + escapeHtml(name) + '</strong><span>' + escapeHtml(text) + '</span></div></div>';
        }
        function publicActivityMediaHtml(item) {
          const media = item.media || {};
          const label = item.kindLabel || "Post";
          const refAttr = media.ref ? ' data-emy-media-ref="' + escapeHtml(media.ref) + '"' : "";
          const srcAttr = media.src ? ' src="' + escapeHtml(media.src) + '"' : "";
          const posterAttr = media.type === "video" && media.posterSrc ? ' poster="' + escapeHtml(media.posterSrc) + '"' : "";
          const posterRefAttr = media.type === "video" && media.posterRef ? ' data-emy-poster-ref="' + escapeHtml(media.posterRef) + '"' : "";
          if (media.src || media.ref) {
            const mediaNode = media.type === "video"
              ? '<video' + srcAttr + refAttr + posterAttr + posterRefAttr + ' controls playsinline preload="metadata"></video>'
              : '<img' + srcAttr + refAttr + ' alt="" />';
            return '<div class="home-created-media" data-public-activity-open>' + mediaNode + '<span class="home-created-pill">' + escapeHtml(label) + '</span></div>';
          }
          const category = publicActivityCategoryForItem(item);
          const mediaClass = category === "videos" ? " is-public-video" : "";
          return '<div class="home-created-media is-text' + mediaClass + '" data-public-activity-open><strong>' + escapeHtml(category === "videos" ? "Video post" : item.type === "article" ? "Published article" : item.type === "event" ? "Posted event" : category === "reposts" ? "Reposted update" : "Posted update") + '</strong><span>' + escapeHtml(label + " from customer profile") + '</span></div>';
        }
        function publicActivityActionsHtml(item) {
          return '<div class="home-created-social-meta"><span></span><span></span><span class="social-feed-time">' + escapeHtml(item.time || "Recent") + '</span></div>';
        }
        function publicActivityMediaInnerHtml(item, title, className, options) {
          const media = item && item.media || {};
          const isClipMedia = !!(options && options.clip);
          const srcAttr = media.src ? ' src="' + escapeHtml(media.src) + '"' : "";
          const refAttr = media.ref ? ' data-emy-media-ref="' + escapeHtml(media.ref) + '"' : "";
          const classAttr = className ? ' class="' + escapeHtml(className) + '"' : "";
          const posterSrcAttr = media.type === "video" && media.posterSrc ? ' poster="' + escapeHtml(media.posterSrc) + '"' : "";
          const posterRefAttr = media.type === "video" && media.posterRef ? ' data-emy-poster-ref="' + escapeHtml(media.posterRef) + '"' : "";
          if (!(media.src || media.ref)) return "";
          return media.type === "video"
            ? '<video' + classAttr + srcAttr + refAttr + posterSrcAttr + posterRefAttr + (isClipMedia ? ' muted playsinline preload="metadata"></video>' : ' controls playsinline preload="metadata"></video>')
            : '<img' + classAttr + srcAttr + refAttr + ' alt="' + escapeHtml(title || "") + '" />';
        }
        function publicActivityMediaPlaceholder(label) {
          return '<span class="customer-public-card-placeholder" aria-hidden="true">' + escapeHtml(label || "Post") + '</span>';
        }
        function publicActivityMediaClass(item) {
          return profileText(item && item.mediaClass || item && item.media && item.media.type || "feed", "feed");
        }
        function publicActivityMenuKind(category) {
          if (category === "products") return "product";
          if (category === "clips") return "clip";
          if (category === "articles") return "article";
          if (category === "events") return "event";
          if (category === "jobs") return "job";
          return "post";
        }
        function publicActivityOptionsMenu(category) {
          const kind = publicActivityMenuKind(category);
          const noun = kind === "post" ? "post" : kind;
          return '<div class="feed-options-menu customer-public-options-menu" data-public-activity-menu data-feed-options-kind="' + escapeHtml(kind) + '" hidden>' +
            '<button class="is-danger" type="button" data-public-activity-menu-action="report">Report</button>' +
            '<button type="button" data-public-activity-menu-action="hide">Not interested</button>' +
            '<button type="button" data-public-activity-menu-action="view">Go to ' + escapeHtml(noun) + '</button>' +
            '<button type="button" data-public-activity-menu-action="copy">Copy link</button>' +
          '</div>';
        }
        function publicActivityHeadHtml(item, category) {
          const customerName = publicActivityCustomerName();
          const kind = category === "updates" && item && item.media && item.media.type === "video" ? "Video update" : category === "updates" ? "Update" : publicActivityCategoryTitle(category);
          const photo = typeof currentProfilePhotoSrc === "function" ? currentProfilePhotoSrc() : (localStorage.getItem("emyCustomerProfilePhoto") || localStorage.getItem("emyCustomerProfilePhotoSrc") || "");
          const photoRef = typeof currentProfilePhotoRef === "function" ? currentProfilePhotoRef() : (localStorage.getItem("emyCustomerProfilePhotoRef") || "");
          const initial = String(customerName || "S").trim().charAt(0).toUpperCase() || "S";
          const hasImage = !!(photo || photoRef);
          const avatarInner = hasImage
            ? '<img' + (photo ? ' src="' + escapeHtml(photo) + '"' : '') + (photoRef ? ' data-emy-media-ref="' + escapeHtml(photoRef) + '"' : '') + ' alt="" />'
            : '<span>' + escapeHtml(initial) + '</span>';
          const timeText = profileShortDate(item.time || item.createdAt || item.postedAt || item.created || item.date, "Recent");
          const avatar = '<a class="social-feed-avatar feed-avatar' + (hasImage ? ' has-image' : '') + '" href="emy-customer-profile.html#preview" aria-label="Open ' + escapeHtml(customerName) + ' profile">' + avatarInner + '</a>';
          return '<div class="social-feed-head">' +
            avatar +
            '<a class="social-feed-name feed-profile-link" href="emy-customer-profile.html#preview"><strong>' + escapeHtml(customerName) + '</strong><small>' + escapeHtml(timeText) + ' - ' + escapeHtml(kind) + '</small></a>' +
            '<button class="social-feed-more feed-action" type="button" data-public-activity-more aria-label="More options" aria-expanded="false">...</button>' +
          '</div>' + publicActivityOptionsMenu(category);
        }
        function publicActivityCardAttrs(item, index, category, detailKind, detailDescription) {
          const media = item.media || {};
          const id = profileText(item.id || "public-activity-" + index);
          const originalId = profileText(item.originalId || "", "");
          const detailTitle = profileText(item.title, publicActivityCategoryTitle(category));
          const description = profileText(detailDescription || item.text || item.description, "");
          const mediaItems = Array.isArray(item && item.mediaItems) ? item.mediaItems : [];
          const mediaItemsAttr = mediaItems.length > 1 && window.emyFeedMediaItemsAttribute ? ' data-detail-media-items="' + window.emyFeedMediaItemsAttribute(mediaItems) + '"' : "";
          return ' data-card data-public-activity-id="' + escapeHtml(id) + '" data-feed-id="' + escapeHtml(id) + '"' + (originalId ? ' data-repost-original-id="' + escapeHtml(originalId) + '" data-original-feed-id="' + escapeHtml(originalId) + '"' : '') + ' data-business-key="customer-profile" data-public-activity-category="' + escapeHtml(category) + '" data-detail-kind="' + escapeHtml(detailKind) + '" data-detail-title="' + escapeHtml(detailTitle) + '" data-detail-description="' + escapeHtml(description) + '" data-article-body="' + escapeHtml(item.articleBody || item.text || description) + '" data-article-share="' + escapeHtml(item.articleShare || description) + '" data-article-read-time="' + escapeHtml(category === "articles" ? publicActivityReadTime(item) : "") + '" data-detail-business="' + escapeHtml(publicActivityCustomerName()) + '" data-detail-price="' + escapeHtml(item.price || "") + '" data-detail-media="' + escapeHtml(media.src || media.ref ? "feed" : "") + '" data-detail-media-src="' + escapeHtml(media.ref ? "" : (media.src || "")) + '" data-detail-media-ref="' + escapeHtml(media.ref || "") + '" data-detail-media-type="' + escapeHtml(media.type || "") + '" data-detail-poster-src="' + escapeHtml(media.posterRef ? "" : (media.posterSrc || "")) + '" data-detail-poster-ref="' + escapeHtml(media.posterRef || "") + '"' + mediaItemsAttr + ' data-detail-meta="' + escapeHtml(publicActivityDetailMeta(item, category)) + '" data-feed-intro="' + escapeHtml(item.feedIntro || item.summary || "") + '" data-job-location="' + escapeHtml(item.jobLocation || "Location to confirm") + '" data-job-workplace="' + escapeHtml(item.workplace || "On-site") + '" data-job-employment="' + escapeHtml(item.employment || "Flexible") + '" data-job-experience="' + escapeHtml(item.experience || "Open to applicants") + '" data-job-apply="' + escapeHtml(item.apply || "Message on EMY") + '" data-job-notes="' + escapeHtml(item.notes || "Details in the post") + '" data-job-applicants="' + escapeHtml(String(Math.max(0, Number(item.applicants) || 0))) + '"';
        }
        function publicActivityCommentsFor(item) {
          const state = publicActivityStateFor(item.id);
          return (Array.isArray(item.comments) ? item.comments : []).concat(Array.isArray(state.comments) ? state.comments : []);
        }
        function publicActivityCountedFooter(item, captionHtml, statText, timeText) {
          const safeTimeText = profileShortDate(timeText || item.time || item.createdAt || item.postedAt || item.created || item.date, "Recent");
          return (captionHtml || "") + '<div class="social-feed-body social-feed-body-counted"><span class="social-feed-time">' + escapeHtml(safeTimeText) + '</span></div>';
        }
        function publicActivityProductTimeText(item) {
          const raw = String(item && (item.createdAt || item.postedAt || item.publishedAt || item.savedAt || item.updatedAt || item.created || item.date || item.addedAt) || "").trim();
          const date = raw ? new Date(raw) : null;
          if (date && !Number.isNaN(date.getTime())) return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
          const label = profileText(item && item.time, "");
          return label && !/^(now|just now|open now|post|product|clip|event|job|article|update|photo|video|carousel|offer|nearby|my business|my businesses|online and available|available|in stock)$/i.test(label) ? label : "Saved";
        }
        function publicActivityProductFreshTime(item) {
          const raw = String(item && (item.createdAt || item.postedAt || item.publishedAt || item.savedAt || item.updatedAt || item.created || item.date || item.addedAt) || "").trim();
          const parsed = raw ? Date.parse(raw) : NaN;
          if (Number.isFinite(parsed)) return parsed;
          const label = profileText(item && item.time, "").trim().toLowerCase();
          const relative = label.match(/^(\\d+)\\s+days?\\s+ago$/i);
          if (relative) return Date.now() - Number(relative[1]) * 24 * 60 * 60 * 1000;
          if (/today|just now|now|minute|hour/i.test(label)) return Date.now();
          if (/yesterday/i.test(label)) return Date.now() - 24 * 60 * 60 * 1000;
          return 0;
        }
        function publicActivityProductIsNew(item) {
          const time = publicActivityProductFreshTime(item);
          if (!time) return false;
          const age = Date.now() - time;
          return age >= 0 && age < 3 * 24 * 60 * 60 * 1000;
        }
        function publicActivityProductCardHtml(item, index) {
          const category = "products";
          const mediaClass = publicActivityMediaClass(item);
          const mediaInner = publicActivityMediaInnerHtml(item, item.title) || publicActivityMediaPlaceholder("Product");
          const likes = publicActivityBaseLikeCount(item);
          const saved = publicActivityBaseSavedCount(item);
          const statText = publicActivityFormatCount(likes) + " like" + (likes === 1 ? "" : "s");
          const productIsNew = publicActivityProductIsNew(item);
          const productFreshTime = publicActivityProductFreshTime(item);
          return '<article class="card product-card feed-product-card home-flow-item customer-public-activity-item is-product' + (productIsNew ? ' is-new' : '') + '"' + publicActivityCardAttrs(item, index, category, "Product", item.text) + ' data-product-new="' + (productIsNew ? 'true' : 'false') + '"' + (productFreshTime ? ' data-product-created-at="' + escapeHtml(new Date(productFreshTime).toISOString()) + '"' : '') + '>' +
            '<div class="photo ' + escapeHtml(mediaClass) + '" aria-hidden="true" data-public-activity-open>' + mediaInner + '</div>' +
            '<button class="social-feed-more feed-action" type="button" data-public-activity-more aria-label="More options" aria-expanded="false">...</button>' + publicActivityOptionsMenu(category) +
            '<div class="body" data-public-activity-open><h3>' + escapeHtml(item.title || "Product") + '</h3><p>' + escapeHtml(item.text || "Product details are ready.") + '</p><div class="product-source">' + escapeHtml(item.productSource || "Customer profile") + '</div><div class="product-availability">' + escapeHtml(item.availability || "Online and available") + '</div><div class="product-stats"><span>' + escapeHtml(statText) + '</span><span><span data-product-saved-count data-raw-count="' + escapeHtml(String(saved)) + '">' + escapeHtml(publicActivityFormatCount(saved)) + '</span> saved</span></div>' + (item.price ? '<div class="price">' + escapeHtml(item.price) + '</div>' : '') + '</div>' +
            publicActivityCountedFooter(item, "", statText, publicActivityProductTimeText(item)) +
          '</article>';
        }
        function publicActivityClipCardHtml(item, index) {
          const category = "clips";
          const mediaClass = publicActivityMediaClass(item);
          const productClipText = [item.kindLabel, item.tag, item.category, item.clipKind, item.reelKind, item.clipType, item.reelType, item.title, item.text, item.description].join(" ").toLowerCase();
          const isProductClip = !!(item.price || item.priceText || item.productName || item.productTitle || item.productDescription || item.productInfo || /product\\s*clip|shared\\s+a\\s+product\\s+clip|product\\s+video|clip\\s+product/.test(productClipText));
          const clipTitle = item.title || (isProductClip ? "Product clip" : "New clip");
          const clipDescription = item.text || "Short customer clip.";
          const mediaInner = publicActivityMediaInnerHtml(item, clipTitle, "", { clip: true }) || publicActivityMediaPlaceholder("Clip");
          const baseViews = readEngagementCount(item.viewsText || item.views || item.stats || 0);
          const sharedViews = window.emySharedClipViewCountForItem ? window.emySharedClipViewCountForItem(item, item.sourceKey || item.key || item.businessKey || item.id || "", baseViews) : baseViews;
          const views = sharedViews + " views";
          const likes = publicActivityBaseLikeCount(item);
          const statText = publicActivityFormatCount(likes) + " like" + (likes === 1 ? "" : "s");
          const productTitle = isProductClip ? profileText(item.productName || item.productTitle || item.title, clipTitle) : "";
          const productPrice = isProductClip ? profileText(item.priceText || item.price || item.productPrice, "") : "";
          const productPanel = (productTitle || clipTitle || clipDescription || productPrice) ? '<div class="clip-product-mini' + (productPrice ? '' : ' is-info') + '" data-clip-product-mini><strong>' + escapeHtml(productTitle || clipTitle || (isProductClip ? "Product" : "Clip")) + '</strong>' + (productPrice ? '<span class="clip-product-mini-price">' + escapeHtml(productPrice) + '</span>' : (clipDescription ? '<em>' + escapeHtml(clipDescription) + '</em>' : '')) + '</div>' : "";
          return '<article class="card reel-card ' + (isProductClip ? 'feed-product-clip-card' : 'feed-clip-card') + ' home-flow-item customer-public-activity-item is-clip"' + publicActivityCardAttrs(item, index, category, isProductClip ? "Product Clip" : "Clip", clipDescription) + ' data-reel-kind="' + (isProductClip ? 'product' : 'normal') + '">' +
            '<div class="photo ' + escapeHtml(mediaClass) + '" aria-hidden="true" data-public-activity-open>' + mediaInner + '</div>' +
            '<div class="reel-top"><a class="feed-profile-link reel-owner-link" href="emy-customer-profile.html#preview"><strong>' + escapeHtml(publicActivityCustomerName()) + '</strong><small>' + (isProductClip ? 'Product Clip' : 'Clip') + '</small></a><span class="reel-type-badge">' + (isProductClip ? 'Product' : 'Clip') + '</span></div>' +
            '<button class="social-feed-more feed-action" type="button" data-public-activity-more aria-label="More options" aria-expanded="false">...</button>' + publicActivityOptionsMenu(category) +
            '<span class="reel-play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5-11-6.5Z"/></svg></span>' +
            '<div class="caption" data-public-activity-open><div class="reel-actions"><span data-clip-view-count>' + escapeHtml(views) + '</span></div>' + productPanel + '</div>' +
            publicActivityCountedFooter(item, "", statText, item.time || "Just now") +
          '</article>';
        }
        function publicActivityArticleCardHtml(item, index) {
          const category = "articles";
          const articleCopy = item.articleShare || item.text || "Article details will appear here.";
          const articleBody = item.articleBody || item.text || articleCopy;
          const readTime = publicActivityReadTime(item);
          const mediaClass = publicActivityMediaClass(item);
          const cover = publicActivityMediaInnerHtml(item, item.title);
          const coverHtml = cover ? '<div class="feed-article-card-cover ' + escapeHtml(mediaClass) + '">' + cover + '</div>' : "";
          return '<article class="feed-card social-feed-card social-feed-article-card customer-public-activity-item is-article"' + publicActivityCardAttrs(item, index, category, "Article", articleCopy) + '>' +
            publicActivityHeadHtml(item, category) +
            '<div class="feed-article-card-body" data-public-activity-open>' + coverHtml + '<span>' + escapeHtml(item.category || "Article") + '</span><h2>' + escapeHtml(item.title || "New article") + '</h2><p>' + escapeHtml(articleCopy) + '</p><div class="feed-article-card-meta"><small>' + escapeHtml(readTime) + '</small><small>' + escapeHtml(item.category || "Article") + '</small></div></div>' +
            publicActivityCountedFooter(item, "", publicActivityLikeStatText(item), item.time || "Just now") +
          '</article>';
        }
        function publicActivityEventCardHtml(item, index) {
          const category = "events";
          const eventPreview = item.feedIntro || item.summary || item.text || "Event details will be shared soon.";
          const cover = publicActivityMediaInnerHtml(item, item.title, "feed-event-card-cover-image");
          return '<article class="feed-card social-feed-card social-feed-event-card customer-public-activity-item is-event"' + publicActivityCardAttrs(item, index, category, "Event", eventPreview) + ' data-feed-intro="' + escapeHtml(eventPreview) + '">' +
            publicActivityHeadHtml(item, category) +
            '<div class="feed-event-post' + (cover ? ' has-cover' : '') + '" data-public-activity-open><div class="feed-event-post-hero">' + cover + '<span>' + escapeHtml(item.eventType || "Event") + '</span><strong>' + escapeHtml(item.title || "Event") + '</strong></div><div class="feed-event-post-details"><p>' + escapeHtml(eventPreview) + '</p><div class="feed-event-post-meta"><span><b>When</b>' + escapeHtml(item.eventWhen || "Date to confirm") + '</span><span><b>Where</b>' + escapeHtml(item.eventWhere || "Location to confirm") + '</span></div></div></div>' +
            publicActivityCountedFooter(item, "", publicActivityLikeStatText(item), item.time || "Just now") +
          '</article>';
        }
        function publicActivityJobCardHtml(item, index) {
          const category = "jobs";
          const jobPreview = item.feedIntro || item.summary || item.text || "This customer shared a role.";
          const cover = publicActivityMediaInnerHtml(item, item.title, "feed-job-cover-media");
          return '<article class="feed-card social-feed-card social-feed-job-card customer-public-activity-item is-job"' + publicActivityCardAttrs(item, index, category, "Job", jobPreview) + ' data-feed-intro="' + escapeHtml(jobPreview) + '">' +
            publicActivityHeadHtml(item, category) +
            '<div class="feed-job-card' + (cover ? ' has-cover' : '') + '" data-public-activity-open><div class="feed-job-hero' + (cover ? ' has-cover' : '') + '">' + cover + '<span>Job</span><strong>' + escapeHtml(item.title || "Help wanted") + '</strong></div><div class="feed-job-body"><div class="feed-job-business"><span>' + escapeHtml(publicActivityCustomerName()) + '</span></div><p class="feed-job-desc">' + escapeHtml(jobPreview) + '</p><div class="feed-job-meta"><span><b>Location</b>' + escapeHtml(item.jobLocation || "Location to confirm") + '</span><span><b>Workplace</b>' + escapeHtml(item.workplace || "On-site") + '</span><span><b>Type</b>' + escapeHtml(item.employment || "Flexible") + '</span><span><b>Pay / notes</b>' + escapeHtml(item.notes || "Details in the post") + '</span></div><div class="feed-job-actions"><button class="feed-job-apply" type="button" data-public-activity-menu-action="view">' + publicActivityIcon("apply") + 'Apply with CV</button><span class="feed-job-count" data-feed-job-applicants>' + escapeHtml(String(Math.max(0, Number(item.applicants) || 0))) + ' applicants</span></div></div></div>' +
            publicActivityCountedFooter(item, "", publicActivityLikeStatText(item), item.time || "Just now") +
          '</article>';
        }
        function publicActivityRepostCardHtml(item, index) {
          const category = "reposts";
          const mediaClass = publicActivityMediaClass(item);
          const media = item.media || {};
          const originalId = item.originalId || item.id || "";
          const originalKey = item.originalKey || "";
          const originalPrice = item.originalPrice || item.price || item.priceText || "";
          const originalKindRaw = item.originalKind || item.detailKind || item.kindLabel || "Post";
          const originalKindText = [originalKindRaw, item.category, item.tag, item.productName, item.productTitle, originalPrice].join(" ");
          const originalTitle = item.originalTitle || item.title || "Shared post";
          const originalText = item.originalText || item.text || "";
          const originalLooksBusinessProfile = !!(
            item.businessProfile === true ||
            item.isBusinessProfile === true ||
            item.businessProfileCard === true ||
            /^business-profile-/i.test(String(originalId || "")) ||
            /^(business|profile|business profile)$/i.test(String(originalKindRaw || "").trim()) ||
            /business\s+profile\s+preview|profile\s+preview\s+for\s+customers|open\s+this\s+business\s+to\s+see\s+profile/i.test([originalTitle, originalText, item.meta, item.href].join(" "))
          );
          const originalKind = originalLooksBusinessProfile ? "Business" : /clip/i.test(originalKindRaw)
            ? (/product/i.test(originalKindText) || originalPrice ? "Product Clip" : "Clip")
            : (/product/i.test(originalKindText) || originalPrice ? "Product" : originalKindRaw);
          const originalHref = originalKey === "customer-profile" ? "emy-customer-profile.html" : originalKey ? "emy-business-profile.html?business=" + encodeURIComponent(originalKey) : "emy-customer-home.html#feeds";
          const quoteBusiness = originalLooksBusinessProfile ? (item.originalBusiness || item.businessName || originalTitle || item.business || "Business") : (item.business || "EMY");
          const originalMediaSrc = originalLooksBusinessProfile || media.ref ? "" : (media.src || "");
          const originalMediaRef = originalLooksBusinessProfile ? "" : (media.ref || "");
          const originalPosterSrc = originalLooksBusinessProfile || media.posterRef ? "" : (media.posterSrc || "");
          const originalPosterRef = originalLooksBusinessProfile ? "" : (media.posterRef || "");
          const originalAvatarRef = item.originalAvatarRef || "";
          const originalAvatarSrc = originalAvatarRef ? "" : (item.originalAvatarSrc || "");
          const quoteMedia = originalLooksBusinessProfile ? "" : publicActivityMediaInnerHtml(item, item.originalTitle || item.title);
          const mediaHtml = quoteMedia ? '<span class="social-feed-quote-media feed-media ' + escapeHtml(mediaClass) + '">' + quoteMedia + '</span>' : "";
          const repostThought = item.repostThought || item.thought || "";
          const thought = repostThought ? '<p class="social-feed-caption"><strong>' + escapeHtml(publicActivityCustomerName()) + '</strong><span>' + escapeHtml(repostThought) + '</span></p>' : "";
          const quoteProfileAttrs = originalLooksBusinessProfile ? ' data-business-profile-card data-business-link="' + escapeHtml(originalKey || "") + '" data-profile-href="' + escapeHtml(originalHref) + '"' : "";
          const quote = '<div class="social-feed-quote" role="' + (originalLooksBusinessProfile ? 'link' : 'button') + '" tabindex="0" data-card data-public-activity-open data-feed-id="' + escapeHtml(originalId) + '" data-original-feed-id="' + escapeHtml(originalId) + '" data-business-key="' + escapeHtml(originalKey) + '"' + quoteProfileAttrs + ' data-detail-kind="' + escapeHtml(originalKind) + '" data-detail-title="' + escapeHtml(originalTitle) + '" data-detail-description="' + escapeHtml(originalText) + '" data-detail-business="' + escapeHtml(quoteBusiness) + '" data-detail-avatar-src="' + escapeHtml(originalAvatarSrc) + '" data-detail-avatar-ref="' + escapeHtml(originalAvatarRef) + '" data-detail-price="' + escapeHtml(originalPrice) + '" data-detail-media="' + escapeHtml(originalLooksBusinessProfile ? "" : mediaClass) + '" data-detail-media-src="' + escapeHtml(originalMediaSrc) + '" data-detail-media-ref="' + escapeHtml(originalMediaRef) + '" data-detail-media-type="' + escapeHtml(originalLooksBusinessProfile ? "" : (media.type || "")) + '" data-detail-poster-src="' + escapeHtml(originalPosterSrc) + '" data-detail-poster-ref="' + escapeHtml(originalPosterRef) + '" data-detail-duration="' + escapeHtml(item.duration || "") + '" data-detail-meta="' + escapeHtml(item.category || originalKind) + '" data-article-body="' + escapeHtml(item.articleBody || originalText) + '" data-article-share="' + escapeHtml(item.articleShare || originalText) + '" data-article-read-time="' + escapeHtml(item.readTime || "") + '"><span class="social-feed-quote-head"><strong>' + escapeHtml(quoteBusiness) + '</strong><span>' + escapeHtml(originalKind) + '</span></span><span class="social-feed-quote-body"><span class="social-feed-quote-copy"><span class="social-feed-quote-title">' + escapeHtml(originalTitle) + '</span>' + (originalText ? '<span class="social-feed-quote-text">' + escapeHtml(originalText) + '</span>' : '') + (originalPrice ? '<span class="social-feed-quote-price">' + escapeHtml(originalPrice) + '</span>' : '') + '</span>' + mediaHtml + '</span></div>';
          return '<article class="feed-card social-feed-card customer-public-activity-item is-repost is-user-post"' + publicActivityCardAttrs(item, index, category, "Repost", repostThought || item.text) + '>' +
            '<span class="social-feed-repost-note">' + escapeHtml(publicActivityCustomerName()) + ' reposted this</span>' +
            publicActivityHeadHtml(item, category) +
            publicActivityCountedFooter(item, thought + quote, publicActivityLikeStatText(item), item.time || "Just now") +
          '</article>';
        }
        function publicActivityUpdateCardHtml(item, index) {
          const category = "updates";
          const mediaClass = publicActivityMediaClass(item);
          const mediaInner = publicActivityMediaInnerHtml(item, item.title);
          const hasMedia = !!mediaInner;
          const isVideoUpdate = item && item.media && item.media.type === "video";
          const isPhotoUpdate = item && item.media && item.media.type === "image";
          const detailKind = isVideoUpdate ? "Video post" : isPhotoUpdate ? "Photo post" : "Post";
          const mediaBlock = hasMedia
            ? '<div class="feed-media social-feed-media ' + escapeHtml(mediaClass) + '" data-public-activity-open>' + mediaInner + '<span class="post-badge">' + escapeHtml(isVideoUpdate ? "Video update" : item.kindLabel || "Post") + '</span></div>'
            : '<div class="social-feed-text-panel" data-public-activity-open><p>' + escapeHtml(item.text || item.title || "Profile update") + '</p></div>';
          const caption = hasMedia ? '<p class="social-feed-caption"><strong>' + escapeHtml(publicActivityCustomerName()) + '</strong>' + escapeHtml(item.text || item.title || "") + '</p>' : "";
          return '<article class="feed-card social-feed-card customer-public-activity-item is-post' + (!hasMedia ? ' is-text-only' : '') + '"' + publicActivityCardAttrs(item, index, category, detailKind, item.text) + '>' +
            publicActivityHeadHtml(item, category) +
            mediaBlock +
            publicActivityCountedFooter(item, caption, publicActivityLikeStatText(item), item.time || "Just now") +
          '</article>';
        }
        function publicActivityCardHtml(item, index) {
          const category = publicActivityCategoryForItem(item);
          if (category === "clips") return publicActivityClipCardHtml(item, index);
          if (category === "articles") return publicActivityArticleCardHtml(item, index);
          if (category === "events") return publicActivityEventCardHtml(item, index);
          if (category === "jobs") return publicActivityJobCardHtml(item, index);
          if (category === "reposts") return publicActivityRepostCardHtml(item, index);
          return publicActivityUpdateCardHtml(item, index);
        }
        function syncPublicActivityArrows() {
          if (!publicActivityTrack) return;
          if (publicActivityTrack.classList.contains("is-feed-view")) {
            publicActivityArrows.forEach((button) => {
              button.hidden = true;
              button.disabled = true;
            });
            return;
          }
          const maxScroll = Math.max(0, publicActivityTrack.scrollWidth - publicActivityTrack.clientWidth);
          const hasOverflow = maxScroll > 8;
          publicActivityArrows.forEach((button) => {
            const isPrev = button.dataset.publicActivityArrow === "prev";
            const disabled = !hasOverflow || (isPrev ? publicActivityTrack.scrollLeft <= 8 : publicActivityTrack.scrollLeft >= maxScroll - 8);
            button.hidden = disabled;
            button.disabled = disabled;
          });
        }
        function renderCustomerPublicActivity() {
          if (!publicActivityTrack) return;
          publicActivityTrack.setAttribute("data-unified-feed-cards", "true");
          const allItems = publicActivityItems();
          syncPublicActivityTabs(allItems);
          const isFeedView = publicActivityCategory === "all";
          publicActivityTrack.classList.toggle("is-feed-view", isFeedView);
          publicActivityTrack.classList.toggle("feed-list", isFeedView);
          publicActivityTrack.classList.toggle("is-library-view", !isFeedView);
          const categoryItems = publicActivityCategory === "all" ? allItems : allItems.filter((item) => publicActivityCategoryForItem(item) === publicActivityCategory);
          const items = categoryItems.filter(publicActivityMatchesSearch);
          const emptyText = publicActivityQuery ? 'No customer ' + publicActivityCategoryLabel(publicActivityCategory) + ' match that search.' : 'No customer ' + publicActivityCategoryLabel(publicActivityCategory) + ' yet.';
          window.emySetListHtmlIfChanged(publicActivityTrack, items.length ? items.map(publicActivityCardHtml).join("") : '<p class="customer-public-activity-empty">' + escapeHtml(emptyText) + '</p>');
          if (window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(publicActivityTrack);
          if (window.emySetupVideoPlayers) window.emySetupVideoPlayers(publicActivityTrack);
          publicActivityTrack.scrollLeft = 0;
          window.requestAnimationFrame(syncPublicActivityArrows);
        }
        function isCustomerProfileLockedForBusiness(relation) {
          return !!(relation && relation.blocked) || (customerProfileVisibility() === "private" && !(relation && relation.active));
        }
        function profileRequestButtonHtml(label) {
          return '<span class="profile-request-logo" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path d="M6.7 8.2c.22-1.55 1.35-2.65 2.88-2.65h4.84c1.53 0 2.66 1.1 2.88 2.65l1.2 8.5c.24 1.72-1.04 3.25-2.78 3.25H8.28c-1.74 0-3.02-1.53-2.78-3.25l1.2-8.5Z" fill="#f76512" stroke="#cf5200" stroke-width="1"/><path d="M9.1 6.1C9.45 4.42 10.42 3.5 12 3.5s2.55.92 2.9 2.6" fill="none" stroke="#fff" stroke-width="1.15" stroke-linecap="round"/><path d="M9.45 13.2c.44-.34.88-.34 1.32 0M13.23 13.2c.44-.34.88-.34 1.32 0M9.8 15.55c1.32.9 3.08.9 4.4 0" fill="none" stroke="#fff" stroke-width="1.15" stroke-linecap="round"/></svg></span><span class="profile-request-label">' + escapeHtml(label) + '</span>';
        }
        function syncCustomerProfilePrivacyAccess(relation, context) {
          const locked = isCustomerProfileLockedForBusiness(relation);
          const businessName = profileText(context && context.name, "this business");
          document.body.classList.toggle("is-private-profile-locked", locked);
          profileBusinessPreviews.forEach((node) => {
            node.classList.toggle("is-private-locked", locked);
            node.setAttribute("data-profile-access", locked ? "private-locked" : "open");
          });
          profileBusinessPreviewDetails.forEach((node) => { node.hidden = locked; });
          publicCustomerProfileViews.forEach((node) => { node.hidden = locked; });
          profilePrivateGates.forEach((node) => { node.hidden = !locked; });
          profilePrivateGateCopies.forEach((node) => {
            node.textContent = relation && relation.blocked ? "This customer profile is not available to this business." : relation && relation.requested ? "Request sent. You'll see more when the customer accepts your request." : "This customer is private. Send a customer request so they can approve becoming your customer.";
          });
          profilePrivateConnectButtons.forEach((button) => {
            const active = !!(relation && relation.active);
            const requested = !!(relation && relation.requested);
            const blocked = !!(relation && relation.blocked);
            const label = blocked ? "Unavailable" : active ? "Customer" : requested ? "Request sent" : "Request customer";
            if (button.classList.contains("profile-preview-request")) {
              button.innerHTML = profileRequestButtonHtml(label);
            } else {
              button.textContent = label;
            }
            button.disabled = blocked || active || requested;
            button.classList.toggle("is-customer", active);
            button.classList.toggle("is-requested", !active && requested);
            button.classList.toggle("is-blocked", blocked);
            button.dataset.profilePrivateBusinessKey = context && context.key || "";
            button.dataset.profilePrivateBusinessName = businessName;
          });
        }
        function renderCustomerPublicProfileView(about) {
          renderCustomerPublicActivity();
        }
        function markCustomerProfilePageInteractive() {
          try {
            if (typeof window.__emyPageMarkReady === "function") {
              window.__emyPageMarkReady();
              return;
            }
            document.documentElement.classList.add("emy-page-real-ready");
            if (document.body) {
              document.body.removeAttribute("aria-busy");
              document.body.removeAttribute("data-emy-page-boot-busy");
            }
          } catch (error) {}
        }
        function scheduleCustomerProfileStartupTask(callback, delay) {
          const run = () => {
            try { callback(); } catch (error) { console.warn("Profile startup task failed", error); }
          };
          window.setTimeout(() => {
            if (window.requestIdleCallback) window.requestIdleCallback(run, { timeout: 900 });
            else run();
          }, delay || 0);
        }
        function syncProfileBusinessScroller(wrapper) {
          if (!wrapper) return;
          const track = wrapper.querySelector("[data-profile-preview-businesses]");
          const prev = wrapper.querySelector('[data-profile-business-scroll="prev"]');
          const next = wrapper.querySelector('[data-profile-business-scroll="next"]');
          if (!track || !prev || !next) return;
          const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
          const hasOverflow = maxScroll > 8;
          prev.hidden = !hasOverflow || track.scrollLeft <= 8;
          next.hidden = !hasOverflow || track.scrollLeft >= maxScroll - 8;
          prev.disabled = prev.hidden;
          next.disabled = next.hidden;
        }
        function syncProfileBusinessScrollers() {
          document.querySelectorAll(".profile-customer-businesses").forEach(syncProfileBusinessScroller);
        }
        function renderBusinessRelationshipPreview() {
          const context = previewBusinessContext();
          const relation = relationshipForBusiness(context);
          const locked = isCustomerProfileLockedForBusiness(relation);
          syncCustomerProfilePrivacyAccess(relation, context);
          const smallBusinesses = previewSmallBusinesses(context);
          const dateText = profileDisplayDate(relation.entry.addedAt || relation.entry.createdAt || relation.entry.date);
          const businessName = profileText(relation.entry.name || relation.entry.business || context.name, context.name);
          const customerName = profileText(profileName, "This customer");
          profilePreviewRelationshipLabels.forEach((node) => { node.textContent = relation.active ? "Customer status" : relation.requested ? "Customer request" : "Relationship"; });
          profilePreviewRelationshipTitles.forEach((node) => { node.textContent = relation.active ? customerName + " is your customer" : relation.requested ? "Request sent to " + customerName : customerName + " is not your customer yet"; });
          profilePreviewRelationshipDates.forEach((node) => { node.textContent = relation.active ? "From " + dateText : relation.requested ? "Waiting for customer approval" : "No customer relationship yet"; });
          const businessTotal = smallBusinesses.length || relation.total;
          profilePreviewBusinessCounts.forEach((node) => { node.textContent = profilePlural(businessTotal, "business", "businesses"); });
          profilePreviewBusinessStripCounts.forEach((node) => { node.textContent = profilePlural(businessTotal, "business", "businesses"); });
          profilePreviewBusinessLists.forEach((node) => {
            node.innerHTML = smallBusinesses.length ? smallBusinesses.map(previewBusinessCardHtml).join("") : '<span class="profile-customer-empty">No businesses followed yet.</span>';
            hydratePreviewBusinessAvatars(node);
            node.scrollLeft = 0;
          });
          window.requestAnimationFrame(syncProfileBusinessScrollers);
          syncPreviewProductRangeButtons();
          const visits = previewProductVisitsForBusiness(context).filter((item) => previewProductVisitInRange(item, profilePreviewProductRange));
          const rangeLabel = previewProductRangeLabel(profilePreviewProductRange);
          const countText = profilePlural(visits.length, "product") + (profilePreviewProductRange === "all" ? "" : " " + rangeLabel);
          const emptyText = profilePreviewProductRange === "all" ? "No products visited by this customer yet." : "No products visited " + rangeLabel + ".";
          profilePreviewProductCounts.forEach((node) => { node.textContent = countText; });
          profilePreviewProductLists.forEach((node) => {
            node.innerHTML = visits.length ? visits.map(previewProductVisitHtml).join("") : '<span class="profile-customer-empty">' + escapeHtml(emptyText) + '</span>';
            hydratePreviewProductCards(node);
          });
          profilePreviewChatLinks.forEach((link) => {
            link.href = "emy-customer-chat.html?business=" + encodeURIComponent(context.key);
            link.setAttribute("aria-label", "Chat with " + profileName + " about " + businessName);
            link.hidden = locked;
          });
        }
        function readCustomerAbout() {
          return profileText(localStorage.getItem("emyCustomerAbout"), "");
        }
        function readCustomerInterests() {
          const stored = readJson("emyCustomerBuyingInterests", []);
          return Array.isArray(stored) ? stored.map((item) => profileText(item, "")).filter(Boolean) : [];
        }
        function selectedProfileInterests() {
          return profileInterestButtons.filter((button) => button.classList.contains("is-active")).map((button) => profileText(button.dataset.profileInterest, "")).filter(Boolean);
        }
        function updateProfileInterestSummary() {
          if (!profileInterestSummary) return;
          const selected = selectedProfileInterests();
          profileInterestSummary.classList.toggle("is-empty", !selected.length);
          profileInterestSummary.innerHTML = selected.length ? selected.map((item) => '<span>' + escapeHtml(item) + '</span>').join("") : '<span>No buying interests selected</span>';
          renderBusinessProfilePreview();
        }
        function profileSocialLabel(key) {
          const clean = String(key || "").trim().toLowerCase();
          if (clean === "x") return "X";
          if (clean === "tiktok") return "TikTok";
          if (clean === "youtube") return "YouTube";
          if (clean === "linkedin") return "LinkedIn";
          return clean ? clean.charAt(0).toUpperCase() + clean.slice(1) : "Social";
        }
        function profileSocialLogoText(key) {
          const clean = String(key || "").trim().toLowerCase();
          if (clean === "x") return "X";
          if (clean === "facebook") return "f";
          if (clean === "instagram") return "IG";
          if (clean === "tiktok") return "TT";
          if (clean === "youtube") return "YT";
          if (clean === "linkedin") return "in";
          if (clean === "website") return "W";
          return profileSocialLabel(clean).charAt(0).toUpperCase() || "S";
        }
        function profileSocialLogoHtml(key) {
          const clean = String(key || "").trim().toLowerCase();
          if (clean === "x") return '<svg viewBox="0 0 24 24" focusable="false"><path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z"/></svg>';
          if (clean === "facebook") return '<svg viewBox="0 0 24 24" focusable="false"><path d="M15.42 8.04h-2.18c-.86 0-1.04.42-1.04 1.02v1.34h3.15l-.41 3.18H12.2V21H8.9v-7.42H6.15V10.4H8.9V8.85C8.9 6.13 10.56 4.65 13 4.65c1.17 0 2.18.09 2.47.13v2.86h-1.7c-1.32 0-1.57.63-1.57 1.55v.85h3.22Z"/></svg>';
          if (clean === "instagram") return '<svg viewBox="0 0 24 24" focusable="false"><path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/></svg>';
          if (clean === "tiktok") return '<svg viewBox="0 0 24 24" focusable="false"><path fill="#25f4ee" transform="translate(-.55 .42)" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/><path fill="#fe2c55" transform="translate(.55 -.32)" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/><path fill="#fff" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>';
          if (clean === "youtube") return '<svg viewBox="0 0 24 24" focusable="false"><path d="M8.45 6.85v10.3L17.55 12 8.45 6.85Z"/></svg>';
          if (clean === "linkedin") return '<svg viewBox="0 0 24 24" focusable="false"><path d="M5.1 8.75h3.55V20H5.1V8.75Zm1.78-5.38a2.06 2.06 0 1 1 0 4.12 2.06 2.06 0 0 1 0-4.12ZM10.82 8.75h3.4v1.54h.05c.48-.9 1.63-1.84 3.35-1.84 3.58 0 4.24 2.36 4.24 5.43V20h-3.55v-5.43c0-1.3-.02-2.96-1.8-2.96-1.81 0-2.09 1.41-2.09 2.86V20h-3.6V8.75Z"/></svg>';
          if (clean === "website") return '<svg viewBox="0 0 24 24" focusable="false"><path d="M12 2.75a9.25 9.25 0 1 1 0 18.5 9.25 9.25 0 0 1 0-18.5Zm0 1.85c-.78 1-1.38 2.05-1.8 3.14h3.6A12.4 12.4 0 0 0 12 4.6ZM7.9 7.74a12 12 0 0 1 1.19-2.42 7.48 7.48 0 0 0-3 2.42H7.9Zm8.2 0h1.81a7.48 7.48 0 0 0-3-2.42c.5.76.9 1.57 1.19 2.42Zm-11 1.8a7.53 7.53 0 0 0 0 4.92h2.92a13.4 13.4 0 0 1 0-4.92H5.1Zm4.8 0a11.5 11.5 0 0 0 0 4.92h4.2a11.5 11.5 0 0 0 0-4.92H9.9Zm6.08 0a13.4 13.4 0 0 1 0 4.92h2.92a7.53 7.53 0 0 0 0-4.92h-2.92Zm-5.78 6.72c.42 1.09 1.02 2.14 1.8 3.14.78-1 1.38-2.05 1.8-3.14h-3.6Zm-4.11 0a7.48 7.48 0 0 0 3 2.42 12 12 0 0 1-1.19-2.42H6.09Zm8.82 2.42a7.48 7.48 0 0 0 3-2.42H16.1a12 12 0 0 1-1.19 2.42Z"/></svg>';
          return escapeHtml(profileSocialLogoText(clean));
        }
        function profileSocialClass(key) {
          return "is-" + (profileSlug(key) || "social");
        }
        function normaliseProfileSocialUrl(key, value) {
          const cleanKey = String(key || "").trim().toLowerCase();
          const raw = profileText(value, "").replace(/\\s+/g, "");
          if (!raw) return "";
          if (raw.toLowerCase().indexOf("http://") === 0 || raw.toLowerCase().indexOf("https://") === 0) return raw;
          if (raw.toLowerCase().indexOf("www.") === 0) return "https://" + raw;
          if (raw.indexOf(".") > -1 && raw.indexOf("/") > -1) return "https://" + raw.replace(/^\/+/, "");
          const handle = raw.replace(/^@+/, "").replace(/^\/+/, "").replace(/\/+$/g, "");
          if (!handle) return "";
          if (cleanKey === "x") return "https://x.com/" + encodeURIComponent(handle);
          if (cleanKey === "facebook") return "https://www.facebook.com/" + encodeURIComponent(handle);
          if (cleanKey === "instagram") return "https://www.instagram.com/" + encodeURIComponent(handle);
          if (cleanKey === "tiktok") return "https://www.tiktok.com/@" + encodeURIComponent(handle.replace(/^@+/, ""));
          if (cleanKey === "youtube") return "https://www.youtube.com/@" + encodeURIComponent(handle.replace(/^@+/, ""));
          if (cleanKey === "linkedin") return "https://www.linkedin.com/in/" + encodeURIComponent(handle);
          if (cleanKey === "website" && raw.indexOf(".") > -1) return "https://" + raw;
          return raw.indexOf(".") > -1 ? "https://" + raw : "";
        }
        function profileSocialDisplay(key, url, rawValue) {
          const cleanKey = String(key || "").trim().toLowerCase();
          const raw = profileText(rawValue, "").replace(/^@+/, "");
          try {
            const parsed = new URL(url);
            const host = parsed.hostname.replace(/^www\\./, "");
            const parts = parsed.pathname.split("/").map((part) => part.trim()).filter(Boolean);
            const handle = parts.length ? parts[parts.length - 1].replace(/^@+/, "") : raw;
            if (cleanKey === "website") return host;
            return handle ? "@" + handle : host;
          } catch (error) {
            return cleanKey === "website" ? raw : raw ? "@" + raw : profileSocialLabel(cleanKey);
          }
        }
        function profileSocialEntry(key, rawValue, visible) {
          const url = normaliseProfileSocialUrl(key, rawValue);
          if (!url) return null;
          return {
            key,
            label: profileSocialLabel(key),
            url,
            display: profileSocialDisplay(key, url, rawValue),
            visible: !!visible
          };
        }
        function profileSocialLinkHtml(item) {
          const label = profileText(item && item.label, "Social");
          const display = profileText(item && item.display, label);
          const key = profileText(item && item.key, "social");
          const url = profileText(item && item.url, "");
          const title = display && display !== label ? label + " " + display : label;
          return '<a class="profile-preview-social-link" href="' + escapeHtml(url) + '" target="_blank" rel="noopener noreferrer" aria-label="Open ' + escapeHtml(title) + '" title="' + escapeHtml(title) + '"><span class="profile-social-logo ' + escapeHtml(profileSocialClass(key)) + '" aria-hidden="true">' + profileSocialLogoHtml(key) + '</span></a>';
        }
        function readCustomerSocialLinks() {
          const stored = readJson("emyCustomerSocialLinks", {});
          const result = {};
          profileSocialInputs.forEach((input) => {
            const key = input.dataset.profileSocialUrl || "";
            const entry = stored && stored[key];
            const raw = typeof entry === "string" ? entry : profileText(entry && (entry.url || entry.raw), "");
            const clean = profileSocialEntry(key, raw, typeof entry === "string" ? true : !!(entry && typeof entry === "object" && entry.visible));
            result[key] = clean || { url:"", display:"", visible:false };
          });
          return result;
        }
        function currentProfileSocialEntries() {
          const entries = [];
          if (profileSocialInputs.length) {
            profileSocialInputs.forEach((input) => {
              const key = input.dataset.profileSocialUrl || "";
              const visibleNode = profileSocialVisibleInputs.find((node) => (node.dataset.profileSocialVisible || "") === key);
              const entry = profileSocialEntry(key, input.value, visibleNode && visibleNode.checked);
              if (entry && entry.visible) entries.push(entry);
            });
            return entries;
          }
          const socials = readCustomerSocialLinks();
          return Object.keys(socials).filter((key) => socials[key] && socials[key].url && socials[key].visible).map((key) => Object.assign({ key, label: profileSocialLabel(key) }, socials[key]));
        }
        function renderBusinessProfilePreview() {
          const askLocation = readJson("emyAskLocation", {});
          const locationText = headerLocationText(String(askLocation.location || askLocation.locationLabel || "Current Location").trim() || "Current Location");
          const about = profileAboutInput ? profileAboutInput.value.trim() : readCustomerAbout();
          const socialEntries = currentProfileSocialEntries();
          const interests = profileInterestButtons.length ? selectedProfileInterests() : readCustomerInterests();
          const visibility = customerProfileVisibility();
          const previewName = selectedCustomerPreviewName();
          profilePreviewNames.forEach((node) => { node.textContent = previewName; });
          renderSelectedCustomerPreviewPhoto();
          profilePreviewLocations.forEach((node) => { node.textContent = locationText; });
          profilePreviewAbouts.forEach((node) => {
            node.classList.toggle("is-empty", !about);
            node.textContent = about || "No profile intro added yet.";
          });
          profilePreviewSocialsList.forEach((node) => {
            node.innerHTML = socialEntries.length ? socialEntries.map(profileSocialLinkHtml).join("") : '<span class="is-muted">No visible socials</span>';
          });
          profilePreviewInterestsList.forEach((node) => {
            node.innerHTML = interests.length ? interests.map((item) => '<span>' + escapeHtml(item) + '</span>').join("") : '<span class="is-muted">No buying interests selected</span>';
          });
          profilePreviewVisibilityList.forEach((node) => {
            const isPublic = visibility === "public";
            node.classList.toggle("is-private", !isPublic);
            node.textContent = isPublic ? "Public profile" : "Private profile";
          });
          renderBusinessRelationshipPreview();
          renderCustomerPublicProfileView(about);
          syncBusinessCustomerRouteChrome();
        }
        function openBusinessProfilePreview() {
          renderBusinessProfilePreview();
          profileBusinessPreviews.forEach((node) => node.classList.remove("is-highlighted"));
          setProfileView("preview");
        }
        window.emyOpenCustomerProfilePreview = function (event) {
          if (event && event.preventDefault) event.preventDefault();
          openBusinessProfilePreview();
        };
        document.addEventListener("click", (event) => {
          const button = event.target.closest("[data-profile-preview-open]");
          if (!button) return;
          event.preventDefault();
          openBusinessProfilePreview();
        }, true);
        function renderProfileExtras() {
          const about = readCustomerAbout();
          const interests = readCustomerInterests();
          const socials = readCustomerSocialLinks();
          if (profileAboutInput) profileAboutInput.value = about;
          profileSocialInputs.forEach((input) => {
            const key = input.dataset.profileSocialUrl || "";
            input.value = socials[key] && socials[key].url || "";
          });
          profileSocialVisibleInputs.forEach((input) => {
            const key = input.dataset.profileSocialVisible || "";
            input.checked = !!(socials[key] && socials[key].visible);
          });
          profileInterestButtons.forEach((button) => {
            const active = interests.includes(profileText(button.dataset.profileInterest, ""));
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-pressed", active ? "true" : "false");
          });
          updateProfileInterestSummary();
          renderBusinessProfilePreview();
        }
        function saveProfileExtras(showMessage) {
          const about = profileAboutInput ? profileAboutInput.value.trim() : "";
          const socials = {};
          profileSocialInputs.forEach((input) => {
            const key = input.dataset.profileSocialUrl || "";
            const visibleNode = profileSocialVisibleInputs.find((node) => (node.dataset.profileSocialVisible || "") === key);
            const entry = profileSocialEntry(key, input.value, visibleNode && visibleNode.checked);
            socials[key] = {
              url: entry ? entry.url : "",
              display: entry ? entry.display : "",
              visible: !!(entry && entry.visible)
            };
            if (entry) input.value = entry.url;
          });
          const interests = selectedProfileInterests();
          try {
            localStorage.setItem("emyCustomerAbout", about);
            localStorage.setItem("emyCustomerSocialLinks", JSON.stringify(socials));
            localStorage.setItem("emyCustomerBuyingInterests", JSON.stringify(interests));
          } catch (error) {}
          updateProfileInterestSummary();
          renderProfile();
          markCustomerProfileUpdated();
          if (showMessage) showToast("Profile details saved.");
        }
        function profileStatusClass(status) {
          const text = String(status || "").toLowerCase();
          if (/sent|pending|review|waiting|saved/.test(text)) return " is-waiting";
          if (/closed|rejected|refused|declined|delete|cancel/.test(text)) return " is-muted";
          return "";
        }
        function profileEventIcon() {
          return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4v3M17 4v3M5 8h14M6.5 5.5h11A1.5 1.5 0 0 1 19 7v11.5A1.5 1.5 0 0 1 17.5 20h-11A1.5 1.5 0 0 1 5 18.5V7a1.5 1.5 0 0 1 1.5-1.5Z"/><path d="m9 14 2 2 4-5"/></svg>';
        }
        function profileApplicationIcon() {
          return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6.5h6M9 11h6M9 15.5h3.5"/><path d="M7 3h7l4 4v14H7V3Z"/><path d="M14 3v5h4"/></svg>';
        }
        function profileCustomerRequestIcon() {
          return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 8.5h10M7 13h6"/><path d="M5 4.5h14a1.5 1.5 0 0 1 1.5 1.5v9.5A1.5 1.5 0 0 1 19 17H9l-4.5 3V6A1.5 1.5 0 0 1 6 4.5Z"/><path d="m14.5 13.8 1.5 1.5 3-3"/></svg>';
        }
        function customerRequestStatusLabel(item) {
          const status = String(item && item.status || "pending").toLowerCase();
          if (status === "accepted") return "Accepted";
          if (status === "refused" || status === "declined") return "Refused";
          if (status === "blocked" || status === "hidden") return "Blocked";
          if (status === "stopped" || status === "removed") return "Stopped";
          return "Pending";
        }
        function renderProfileRequests() {
          if (!profileRequestsList) return;
          const requests = customerRequestEntries().filter((item) => customerRequestStatusLabel(item) === "Pending");
          if (!requests.length) {
            window.emySetListHtmlIfChanged(profileRequestsList, '<div class="profile-empty-record"><strong>No requests yet</strong><span>When a business asks to add you as a customer, you can view their profile, accept, or refuse the request here.</span></div>');
            return;
          }
          window.emySetListHtmlIfChanged(profileRequestsList, requests.map((item) => {
            const key = profileSlug(item.key || item.id || item.businessKey || item.name || item.business) || "business";
            const name = profileText(item.name || item.business || item.businessName || item.title, "Business");
            const category = profileText(item.category || item.businessCategory || "Small business", "Small business");
            const location = profileText(item.location || item.address || "Location to confirm", "Location to confirm");
            const description = profileText(item.description || item.about || "This business wants to add you as a customer.", "This business wants to add you as a customer.");
            const context = previewBusinessContext();
            const isCurrentBusiness = key === context.key || profileSlug(name) === profileSlug(context.name);
            const avatar = previewBusinessImageSrc(item.avatar || item.logo || item.photo || item.avatarSrc || item.image || item.profilePhoto || item.businessPhoto) || (isCurrentBusiness ? previewBusinessImageSrc(context.avatar) : "");
            const initial = name.charAt(0).toUpperCase() || "B";
            const profileHref = item.href || previewBusinessHref(Object.assign({}, item, { key, businessKey:key, name }));
            const requested = profileShortDate(item.requestedAt || item.createdAt || item.date, "Requested locally");
            const status = customerRequestStatusLabel(item);
            const isPending = status === "Pending";
            return '<article class="profile-record-card" data-profile-request-card="' + escapeHtml(key) + '">' +
              '<div class="profile-record-top"><span class="profile-record-icon profile-record-avatar" aria-hidden="true">' + (avatar ? '<img src="' + escapeHtml(avatar) + '" alt="" />' : escapeHtml(initial)) + '</span><span class="profile-record-copy"><h3>' + escapeHtml(name) + '</h3><p>' + escapeHtml(description) + '</p></span><span class="profile-status' + profileStatusClass(status) + '">' + escapeHtml(status) + '</span></div>' +
              '<div class="profile-record-meta"><span>' + escapeHtml(category) + '</span><span>' + escapeHtml(location) + '</span><span>' + escapeHtml(requested) + '</span></div>' +
              '<div class="profile-record-actions">' +
                '<a class="is-profile" href="' + escapeHtml(profileHref) + '" data-profile-request-profile data-profile-request-key="' + escapeHtml(key) + '" data-profile-request-name="' + escapeHtml(name) + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>View profile</a>' +
                (isPending ? '<button class="is-accept" type="button" data-profile-request-action="accept" data-profile-request-key="' + escapeHtml(key) + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 13 4 4L19 7"/></svg>Accept</button><button class="is-refuse" type="button" data-profile-request-action="refuse" data-profile-request-key="' + escapeHtml(key) + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7l10 10M17 7 7 17"/></svg>Refuse</button>' : '') +
              '</div>' +
            '</article>';
          }).join(""));
        }
        function renderProfileCustomers() {
          if (!profileCustomersList) return;
          const entries = connectedCustomerBusinessEntries();
          if (profileCustomersCount) profileCustomersCount.textContent = profilePlural(entries.length, "business", "businesses");
          if (!entries.length) {
            window.emySetListHtmlIfChanged(profileCustomersList, '<div class="profile-empty-record"><strong>No businesses followed yet</strong><span>Businesses you follow or accept as a customer will appear here.</span></div>');
            return;
          }
          window.emySetListHtmlIfChanged(profileCustomersList, entries.map((item) => {
            const key = customerBusinessCanonicalKey(item, item.key || item.id || item.businessKey || item.name || item.business);
            const name = profileText(item.name || item.business || item.businessName || item.title, "Business");
            const category = profileText(item.category || item.businessCategory || "Small business", "Small business");
            const location = profileText(item.location || item.address || "Location to confirm", "Location to confirm");
            const description = profileText(item.description || item.about || "You are a customer of this business.", "You are a customer of this business.");
            const context = previewBusinessContext();
            const isCurrentBusiness = key === context.key || profileSlug(name) === profileSlug(context.name);
            const avatar = previewBusinessImageSrc(item.avatar || item.logo || item.photo || item.avatarSrc || item.image || item.profilePhoto || item.businessPhoto) || (isCurrentBusiness ? previewBusinessImageSrc(context.avatar) : "");
            const initial = name.charAt(0).toUpperCase() || "B";
            const profileHref = item.href || previewBusinessHref(Object.assign({}, item, { key, businessKey:key, name }));
            const accepted = profileShortDate(item.acceptedAt || item.addedAt || item.createdAt || item.date, "Accepted locally");
            return '<article class="profile-record-card" data-profile-customer-card="' + escapeHtml(key) + '">' +
              '<div class="profile-record-top"><span class="profile-record-icon profile-record-avatar" aria-hidden="true">' + (avatar ? '<img src="' + escapeHtml(avatar) + '" alt="" />' : escapeHtml(initial)) + '</span><span class="profile-record-copy"><h3>' + escapeHtml(name) + '</h3><p>' + escapeHtml(description) + '</p></span><span class="profile-status">Customer</span></div>' +
              '<div class="profile-record-meta"><span>' + escapeHtml(category) + '</span><span>' + escapeHtml(location) + '</span><span>' + escapeHtml(accepted) + '</span></div>' +
              '<div class="profile-record-actions">' +
                '<a class="is-profile" href="' + escapeHtml(profileHref) + '" data-profile-customer-profile data-profile-customer-key="' + escapeHtml(key) + '" data-profile-customer-name="' + escapeHtml(name) + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>View profile</a>' +
                '<button class="is-stop" type="button" data-profile-customer-action="stop" data-profile-customer-key="' + escapeHtml(key) + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>Stop being customer</button>' +
              '</div>' +
            '</article>';
          }).join(""));
        }
        function findCustomerRequest(requests, key) {
          if (!requests || !key) return { key:"", request:null };
          if (requests[key]) return { key, request:requests[key] };
          const matchKey = Object.keys(requests).find((itemKey) => {
            const item = requests[itemKey] || {};
            return profileSlug(itemKey) === key || profileSlug(item.key || item.id || item.businessKey || item.name || item.business) === key;
          });
          return matchKey ? { key:matchKey, request:requests[matchKey] } : { key, request:null };
        }
        function findCustomerBusiness(businesses, key) {
          if (!businesses || !key) return { key:"", business:null };
          if (businesses[key]) return { key, business:businesses[key] };
          const matchKey = Object.keys(businesses).find((itemKey) => {
            const item = businesses[itemKey] || {};
            return profileSlug(itemKey) === key || profileSlug(item.key || item.id || item.businessKey || item.name || item.business) === key;
          });
          return matchKey ? { key:matchKey, business:businesses[matchKey] } : { key, business:null };
        }
        function stopCustomerBusiness(businessKey) {
          const key = profileSlug(businessKey);
          if (!key) return;
          const businesses = customerBusinessObject();
          const found = findCustomerBusiness(businesses, key);
          const storageKey = found.key || key;
          const business = found.business;
          if (!business) return;
          const name = profileText(business.name || business.business || business.businessName || business.title, "Business");
          const removedKeys = customerBusinessAliasStorageKeys(businesses, storageKey, business);
          (removedKeys.length ? removedKeys : [storageKey]).forEach((itemKey) => { delete businesses[itemKey]; });
          saveCustomerBusinesses(businesses);
          [storageKey, key, business.key, business.businessKey, business.id, name].concat(customerBusinessIdentityAliases(business, storageKey)).map(profileSlug).filter(Boolean).forEach((alias) => {
            try { localStorage.setItem("emyCustomerBusiness:" + alias, "0"); } catch (error) {}
          });
          removeProfileBusinessCustomerStores(storageKey, name, business);
          const requests = customerRequestObject();
          const requestFound = findCustomerRequest(requests, storageKey);
          if (requestFound.request) {
            requests[requestFound.key] = Object.assign({}, requestFound.request, { key:requestFound.key, businessKey:requestFound.key, status:"stopped", stoppedAt:new Date().toISOString(), respondedAt:new Date().toISOString() });
            saveCustomerRequests(requests);
          }
          renderProfileRequests();
          renderProfileCustomers();
          renderProfileShortcuts();
          renderBusinessProfilePreview();
          syncProfileRelationshipSurfaces("stop", { key:storageKey, businessKey:storageKey, name, businessName:name, request:business });
          pushProfileBusinessNotification(storageKey, name, "stop", profileText(profileName, "A customer") + " stopped being a customer of your business.", "Customer removed");
          showToast("Stopped being customer of " + name + ".");
        }
        function updateCustomerRequest(action, requestKey) {
          const key = profileSlug(requestKey);
          if (!key) return;
          const requests = customerRequestObject();
          const found = findCustomerRequest(requests, key);
          const storageKey = found.key || key;
          const request = found.request;
          if (!request) return;
          const now = new Date().toISOString();
          const name = profileText(request.name || request.business || request.businessName || request.title, "Business");
          const customer = profileCustomerRelationshipIdentity();
          if (action === "accept") {
            const businesses = customerBusinessObject();
            customerBusinessAliasStorageKeys(businesses, storageKey, request).forEach((itemKey) => {
              if (itemKey !== storageKey) delete businesses[itemKey];
            });
            businesses[storageKey] = Object.assign({}, request, {
              key: storageKey,
              businessKey: storageKey,
              name,
              business: name,
              customerKey: customer.key,
              profileKey: customer.key,
              customerName: customer.name,
              customerEmail: customer.email,
              email: customer.email,
              status: "accepted",
              statusText: request.statusText || "Live",
              customerStatus: "accepted",
              relationshipStatus: "accepted",
              active: true,
              isCustomer: true,
              connected: true,
              following: true,
              accepted: true,
              approved: true,
              addedAt: now,
              acceptedAt: now
            });
            requests[storageKey] = Object.assign({}, request, { key:storageKey, businessKey:storageKey, customerKey:customer.key, profileKey:customer.key, customerName:customer.name, customerEmail:customer.email, email:customer.email, status:"accepted", customerStatus:"accepted", relationshipStatus:"accepted", active:true, isCustomer:true, connected:true, following:true, accepted:true, approved:true, respondedAt:now, acceptedAt:now });
            saveCustomerBusinesses(businesses);
            setProfileCustomerBusinessFlags(storageKey, name, request, true);
            upsertProfileBusinessCustomerStores(storageKey, name, request, now);
            try { localStorage.setItem("emyCustomerBusinessSince", now); } catch (error) {}
            syncProfileRelationshipSurfaces("accept", { key:storageKey, businessKey:storageKey, name, businessName:name, request:requests[storageKey] });
            pushProfileBusinessNotification(storageKey, name, "accept", profileText(profileName, "A customer") + " accepted your customer request.", "Customer request accepted");
            showToast(name + " is now connected as your customer.");
          } else if (action === "refuse") {
            requests[storageKey] = Object.assign({}, request, { key:storageKey, businessKey:storageKey, status:"refused", respondedAt:now, refusedAt:now });
            setProfileCustomerBusinessFlags(storageKey, name, request, false);
            removeProfileBusinessCustomerStores(storageKey, name, request);
            syncProfileRelationshipSurfaces("refuse", { key:storageKey, businessKey:storageKey, name, businessName:name, request:requests[storageKey] });
            pushProfileBusinessNotification(storageKey, name, "refuse", profileText(profileName, "A customer") + " refused your customer request.", "Customer request refused");
            showToast("Customer request refused.");
          }
          saveCustomerRequests(requests);
          renderProfileRequests();
          renderProfileCustomers();
          renderProfileShortcuts();
          renderBusinessProfilePreview();
        }
        function eventLooksSaved(item) {
          const text = [item && item.kind, item && item.type, item && item.tag, item && item.detailKind, item && item.eventType, item && item.eventWhen, item && item.eventWhere, item && item.status].join(" ").toLowerCase();
          return text.includes("event") || !!(item && (item.eventWhen || item.eventWhere || item.eventDate || item.when || item.where));
        }
        function readEventReminders() {
          return readJson("emyCustomerEventReminders", {});
        }
        function writeEventReminders(value) {
          try { localStorage.setItem("emyCustomerEventReminders", JSON.stringify(value || {})); } catch (error) {}
        }
        function normaliseProfileEvent(item, index, source) {
          const id = profileText(item.id || item.eventId || item.itemId || (source + "-" + index), source + "-" + index);
          const reminders = readEventReminders();
          const reminder = reminders[id];
          const reminderOn = reminder ? reminder.enabled !== false : item.reminder !== false;
          const title = profileText(item.title || item.name || item.eventTitle || item.itemTitle, "Saved event");
          const business = profileText(item.business || item.businessName || item.host || item.actor, "EMY event");
          const when = profileShortDate(item.when || item.eventWhen || item.eventDate || item.date || item.time || item.createdAt, "Time to confirm");
          const where = profileText(item.where || item.eventWhere || item.place || item.location || item.address, "Location to confirm");
          const status = profileText(item.status || item.response || (source === "saved-feed" ? "Saved" : "Accepted"), "Saved");
          const href = profileText(item.href || item.open || "emy-customer-home.html#feeds", "emy-customer-home.html#feeds");
          return { id, title, business, when, where, status, href, reminderOn };
        }
        function customerEventsArray() {
          const direct = profileArray(readJson("emyCustomerEvents", [])).map((item, index) => normaliseProfileEvent(item, index, "customer-event"));
          const saved = savedFeedItemsArray().filter(eventLooksSaved).map((item, index) => normaliseProfileEvent(item, index, "saved-feed"));
          const responses = profileArray(readJson("emyEventResponses", [])).filter(eventLooksSaved).map((item, index) => normaliseProfileEvent(item, index, "response"));
          const seen = {};
          return direct.concat(saved, responses).filter((item) => {
            const key = item.id || profileSlug(item.title + "-" + item.business);
            if (seen[key]) return false;
            seen[key] = true;
            return true;
          }).slice(0, 80);
        }
        function renderProfileEvents() {
          if (!profileEventsList) return;
          const events = customerEventsArray();
          if (!events.length) {
            window.emySetListHtmlIfChanged(profileEventsList, '<div class="profile-empty-record"><strong>No saved events yet</strong><span>Events you save or accept from Feeds will appear here with their reminder switch.</span><a href="emy-customer-home.html#feeds">Browse events</a></div>');
            return;
          }
          window.emySetListHtmlIfChanged(profileEventsList, events.map((item) => {
            const reminderText = item.reminderOn ? "Reminder on" : "Reminder off";
            return '<article class="profile-record-card">' +
              '<div class="profile-record-top"><span class="profile-record-icon">' + profileEventIcon() + '</span><span class="profile-record-copy"><h3>' + escapeHtml(item.title) + '</h3><p>' + escapeHtml(item.business) + '</p></span><span class="profile-status' + profileStatusClass(item.status) + '">' + escapeHtml(item.status) + '</span></div>' +
              '<div class="profile-record-meta"><span>' + escapeHtml(item.when) + '</span><span>' + escapeHtml(item.where) + '</span><span>' + escapeHtml(reminderText) + '</span></div>' +
              '<div class="profile-record-actions"><a href="' + escapeHtml(item.href) + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>Open event</a><button class="' + (item.reminderOn ? "is-on" : "") + '" type="button" data-profile-event-reminder="' + escapeHtml(item.id) + '" aria-pressed="' + (item.reminderOn ? "true" : "false") + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 9.4a6 6 0 0 0-12 0v2.3c0 1.4-.4 2.7-1.2 3.8L4 16.8h16l-.8-1.3a7 7 0 0 1-1.2-3.8V9.4Z"/><path d="M9.5 19a2.7 2.7 0 0 0 5 0"/></svg>' + escapeHtml(reminderText) + '</button></div>' +
            '</article>';
          }).join(""));
        }
        function applicationStatus(item) {
          const statusMap = readJson("emyJobApplicationStatus", {});
          return profileText(statusMap[item.id] || item.status || item.progress || "Sent", "Sent");
        }
        function jobApplicationsArray() {
          return profileArray(readJson("emyJobApplications", [])).filter((item) => item && (item.id || item.jobTitle || item.business)).slice(0, 80);
        }
        function renderProfileApplications() {
          if (!profileApplicationsList) return;
          const applications = jobApplicationsArray();
          if (!applications.length) {
            window.emySetListHtmlIfChanged(profileApplicationsList, '<div class="profile-empty-record"><strong>No job applications yet</strong><span>When you apply with a CV or share your EMY profile, the application and progress will appear here.</span><a href="emy-customer-home.html#feeds">Browse jobs</a></div>');
            return;
          }
          const visibleApplications = applications.slice(0, Math.max(PROFILE_APPLICATION_BATCH_SIZE, profileApplicationsVisibleCount));
          const remainingApplications = Math.max(0, applications.length - visibleApplications.length);
          const moreButton = remainingApplications > 0
            ? '<button class="profile-load-more" type="button" data-profile-applications-more>Load 10 more (' + remainingApplications + ' left)</button>'
            : "";
          window.emySetListHtmlIfChanged(profileApplicationsList, visibleApplications.map((item, index) => {
            const id = profileText(item.id || ("application-" + index), "application-" + index);
            const status = applicationStatus(item);
            const href = profileText(item.href || "emy-customer-home.html#feeds", "emy-customer-home.html#feeds");
            const sent = profileShortDate(item.createdAt || item.date || item.time, "Sent locally");
            const shared = item.cvFile ? "CV file: " + item.cvFile : item.cvLink ? "CV/profile link saved" : item.profileShared ? "EMY profile shared" : "Message sent";
            return '<article class="profile-record-card">' +
              '<div class="profile-record-top"><span class="profile-record-icon">' + profileApplicationIcon() + '</span><span class="profile-record-copy"><h3>' + escapeHtml(item.jobTitle || item.title || "Job application") + '</h3><p>' + escapeHtml(item.business || "Business") + '</p></span><span class="profile-status' + profileStatusClass(status) + '">' + escapeHtml(status) + '</span></div>' +
              '<div class="profile-record-meta"><span>' + escapeHtml(sent) + '</span><span>' + escapeHtml(shared) + '</span></div>' +
              '<div class="profile-record-actions"><a href="' + escapeHtml(href) + '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>Open job</a></div>' +
            '</article>';
          }).join("") + moreButton);
        }
        function renderProfileShortcuts() {
          const events = customerEventsArray();
          const applications = jobApplicationsArray();
          const requests = customerRequestEntries();
          const pendingRequests = requests.filter((item) => customerRequestStatusLabel(item) === "Pending");
          if (profileRequestsSummary) profileRequestsSummary.textContent = pendingRequests.length ? pendingRequests.length + " business request" + (pendingRequests.length === 1 ? "" : "s") + " waiting." : "No business customer requests yet.";
          if (profileEventsSummary) profileEventsSummary.textContent = events.length ? events.length + " saved or accepted event" + (events.length === 1 ? "" : "s") + "." : "Saved, accepted, and reminder events.";
          if (profileApplicationsSummary) profileApplicationsSummary.textContent = applications.length ? applications.length + " application" + (applications.length === 1 ? "" : "s") + " sent." : "Track CVs and business replies.";
        }
        function normaliseProfileView(value) {
          const view = String(value || "").replace(/^#/, "").trim().toLowerCase();
          return ["session", "requests", "blocked", "favourite", "events", "applications", "settings", "preview"].includes(view) ? view : "main";
        }
        function setProfileView(value, updateHash) {
          const view = normaliseProfileView(value);
          const previousView = document.body ? document.body.dataset.currentProfileSubview || "main" : "main";
          if (view === "applications" && previousView !== "applications") profileApplicationsVisibleCount = PROFILE_APPLICATION_BATCH_SIZE;
          if (document.body) document.body.dataset.currentProfileSubview = view;
          document.body.classList.toggle("is-profile-preview-mode", view === "preview" && !isBusinessCustomerProfileRoute());
          if (defaultProfileView) defaultProfileView.hidden = view !== "main";
          profileViews.forEach((section) => {
            section.hidden = section.dataset.profileView !== view;
          });
          if (view === "favourite") renderFavouriteItems();
          if (view === "requests") {
            renderProfileRequests();
            renderProfileCustomers();
          }
          if (view === "events") renderProfileEvents();
          if (view === "applications") renderProfileApplications();
          if (view === "preview") renderBusinessProfilePreview();
          renderProfileShortcuts();
          syncBusinessCustomerRouteChrome();
          if (updateHash !== false) {
            if (view === "main") {
              history.pushState(null, "", window.location.pathname + window.location.search);
            } else {
              history.pushState(null, "", "#" + view);
            }
          }
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        function syncProfileViewFromHash() {
          if (isBusinessCustomerProfileRoute() && !window.location.hash) {
            setProfileView("preview", false);
            return;
          }
          setProfileView(normaliseProfileView(window.location.hash), false);
        }
        function profilePhoneValue() {
          return customerProfileCleanStoredText(localStorage.getItem("emyCustomerPhone") || localStorage.getItem("emyMainPendingSignupPhone") || "");
        }
        function profileCustomerFirstName() {
          return customerProfileCleanStoredText(localStorage.getItem("emyCustomerFirstName") || customerProfileFirstLastFromName().first || localStorage.getItem("emyMainPendingSignupFirstName") || "");
        }
        function profileCustomerInitial() {
          const first = String(profileCustomerFirstName() || profileName || "S").trim();
          return first.charAt(0).toUpperCase() || "S";
        }
        function profileCustomerLastName() {
          return customerProfileCleanStoredText(localStorage.getItem("emyCustomerLastName") || customerProfileFirstLastFromName().last || localStorage.getItem("emyMainPendingSignupLastName") || "");
        }
        function validProfileEmail(value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(customerProfileCleanEmail(value));
        }
        function profilePhoneDigits(value) {
          return String(value || "").replace(/[^0-9]/g, "");
        }
        function syncSessionVisibilityButtons(visibility) {
          const nextVisibility = visibility === "public" ? "public" : "private";
          sessionVisibilityButtons.forEach((button) => {
            const active = button.dataset.sessionVisibility === nextVisibility;
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-pressed", active ? "true" : "false");
            if (button.parentElement && button.parentElement.classList && button.parentElement.classList.contains("session-toggle")) {
              button.parentElement.dataset.selectedVisibility = nextVisibility;
            }
            if (active) {
              button.style.setProperty("background-color", "#ff6a00", "important");
              button.style.setProperty("color", "#fff", "important");
            } else {
              button.style.removeProperty("background-color");
              button.style.removeProperty("color");
            }
          });
        }
        function compactCustomerCountryCode(iso) {
          const code = String(iso || "").toUpperCase();
          return code === "GB" ? "UK" : code;
        }
        function compactCustomerDialLabel(item) {
          return item ? item[2] + " " + compactCustomerCountryCode(item[0]) : "+44 UK";
        }
        function customerLanguageRegion(language) {
          const parts = String(language || "").split(/[-_]/);
          return parts.length > 1 ? String(parts[parts.length - 1] || "").toUpperCase() : "";
        }
        function preferredCustomerDialRegion() {
          const stored = customerProfileCleanStoredText(localStorage.getItem("emyCustomerPhoneCountry") || localStorage.getItem("emyMainPendingSignupPhoneCountry") || "").toUpperCase();
          if (stored && customerDialCountries.some((item) => item[0] === stored)) return stored;
          const languages = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
          for (let index = 0; index < languages.length; index += 1) {
            const region = customerLanguageRegion(languages[index]);
            if (region && customerDialCountries.some((item) => item[0] === region)) return region;
          }
          let timeZone = "";
          try { timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (error) {}
          if (timeZone.indexOf("Dublin") >= 0) return "IE";
          if (timeZone.indexOf("Paris") >= 0) return "FR";
          if (timeZone.indexOf("Berlin") >= 0) return "DE";
          if (timeZone.indexOf("Madrid") >= 0) return "ES";
          if (timeZone.indexOf("Rome") >= 0) return "IT";
          if (timeZone.indexOf("Lisbon") >= 0) return "PT";
          if (timeZone.indexOf("New_York") >= 0 || timeZone.indexOf("Chicago") >= 0 || timeZone.indexOf("Los_Angeles") >= 0) return "US";
          if (timeZone.indexOf("Toronto") >= 0 || timeZone.indexOf("Vancouver") >= 0) return "CA";
          return "GB";
        }
        function findCustomerDialCountry(countryIso, dialCode) {
          const iso = customerProfileCleanStoredText(countryIso).toUpperCase();
          const code = customerProfileCleanStoredText(dialCode);
          const codeDigits = profilePhoneDigits(code);
          if (iso) {
            const countryMatch = customerDialCountries.find((item) => item[0] === iso);
            if (countryMatch) return countryMatch;
          }
          if (code || codeDigits) {
            const codeMatch = customerDialCountries.find((item) => item[2] === code || profilePhoneDigits(item[2]) === codeDigits);
            if (codeMatch) return codeMatch;
          }
          return null;
        }
        function customerLocalPhoneLimitForPrefix(prefix) {
          const prefixLength = profilePhoneDigits(prefix || "+44").length;
          return Math.max(6, Math.min(14, 15 - prefixLength));
        }
        function customerLocalPhoneLimit() {
          return customerLocalPhoneLimitForPrefix(sessionPhoneCode ? sessionPhoneCode.value : "+44");
        }
        function keepCustomerPhoneCharacters() {
          if (!sessionPhone) return "";
          const next = profilePhoneDigits(sessionPhone.value).slice(0, customerLocalPhoneLimit());
          if (sessionPhone.value !== next) sessionPhone.value = next;
          return next;
        }
        function normalizeCustomerDialSearch(value) {
          return String(value || "").toLowerCase().replace(/[^a-z0-9+]+/g, " ").trim();
        }
        function selectedCustomerDialCountry() {
          return findCustomerDialCountry(sessionPhoneCountry ? sessionPhoneCountry.value : "", sessionPhoneCode ? sessionPhoneCode.value : "") || customerDialCountries.find((item) => item[0] === preferredCustomerDialRegion()) || customerDialCountries[0];
        }
        function filterCustomerDialCountries() {
          if (!sessionCodeOptions) return;
          const query = normalizeCustomerDialSearch(sessionCodeSearch ? sessionCodeSearch.value : "");
          let visibleCount = 0;
          Array.from(sessionCodeOptions.querySelectorAll("[data-session-code-option]")).forEach((button) => {
            const show = !query || String(button.dataset.search || "").indexOf(query) >= 0;
            button.hidden = !show;
            if (show) visibleCount += 1;
          });
          if (sessionCodeEmpty) sessionCodeEmpty.hidden = visibleCount > 0;
        }
        function setCustomerDialMenuOpen(open) {
          if (!sessionCodeButton || !sessionCodeMenu) return;
          sessionCodeMenu.hidden = !open;
          sessionCodeButton.setAttribute("aria-expanded", open ? "true" : "false");
          if (open) {
            if (sessionCodeSearch) {
              sessionCodeSearch.value = "";
              filterCustomerDialCountries();
              setTimeout(() => { sessionCodeSearch.focus(); }, 0);
            }
          }
        }
        function setCustomerDialCountry(item, closeMenu) {
          if (!item) return;
          if (sessionPhoneCode) sessionPhoneCode.value = item[2];
          if (sessionPhoneCountry) sessionPhoneCountry.value = item[0];
          if (sessionCodeValue) sessionCodeValue.textContent = compactCustomerDialLabel(item);
          if (sessionCodeOptions) {
            Array.from(sessionCodeOptions.querySelectorAll("[data-session-code-option]")).forEach((button) => {
              const active = Number(button.dataset.sessionCodeIndex || "-1") === customerDialCountries.indexOf(item);
              button.classList.toggle("is-selected", active);
              button.setAttribute("aria-selected", active ? "true" : "false");
            });
          }
          if (sessionPhone) {
            sessionPhone.maxLength = String(customerLocalPhoneLimitForPrefix(item[2]));
            keepCustomerPhoneCharacters();
          }
          if (closeMenu !== false) setCustomerDialMenuOpen(false);
        }
        function populateCustomerDialCodes() {
          if (!sessionCodeOptions) return;
          sessionCodeOptions.innerHTML = customerDialCountries.map((item, index) => {
            const iso = compactCustomerCountryCode(item[0]);
            const search = normalizeCustomerDialSearch([item[0], iso, item[1], item[2], profilePhoneDigits(item[2])].join(" "));
            return '<button class="profile-dial-option" type="button" role="option" data-session-code-option data-session-code-index="' + index + '" data-search="' + escapeHtml(search) + '" aria-selected="false"><span class="profile-dial-code">' + escapeHtml(item[2]) + '</span><span class="profile-dial-name">' + escapeHtml(item[1]) + '</span><span class="profile-dial-iso">' + escapeHtml(iso) + '</span></button>';
          }).join("");
          Array.from(sessionCodeOptions.querySelectorAll("[data-session-code-option]")).forEach((button) => {
            button.addEventListener("click", () => {
              const item = customerDialCountries[Number(button.dataset.sessionCodeIndex || 0)] || customerDialCountries[0];
              setCustomerDialCountry(item, true);
              if (sessionPhone) sessionPhone.focus();
            });
          });
          const preferred = customerDialCountries.find((item) => item[0] === preferredCustomerDialRegion()) || customerDialCountries[0];
          setCustomerDialCountry(findCustomerDialCountry(sessionPhoneCountry ? sessionPhoneCountry.value : "", sessionPhoneCode ? sessionPhoneCode.value : "") || preferred, false);
          filterCustomerDialCountries();
        }
        function applyCustomerPhoneValue(fullPhone, countryIso, dialCode, localPhone) {
          let selected = findCustomerDialCountry(countryIso, dialCode);
          let localDigits = profilePhoneDigits(localPhone);
          const fullDigits = profilePhoneDigits(fullPhone);
          if (!localDigits && fullDigits) {
            const matches = customerDialCountries.map((item) => ({ item, digits: profilePhoneDigits(item[2]) })).filter((entry) => entry.digits && fullDigits.indexOf(entry.digits) === 0).sort((a, b) => b.digits.length - a.digits.length);
            const matched = matches.find((entry) => !selected || entry.item[0] === selected[0] || entry.item[2] === selected[2]) || matches[0];
            if (matched) {
              selected = selected || matched.item;
              localDigits = fullDigits.slice(matched.digits.length);
            } else {
              localDigits = fullDigits;
            }
          }
          if (!selected) selected = customerDialCountries.find((item) => item[0] === preferredCustomerDialRegion()) || customerDialCountries[0];
          setCustomerDialCountry(selected, false);
          if (sessionPhone) {
            sessionPhone.maxLength = String(customerLocalPhoneLimitForPrefix(selected[2]));
            sessionPhone.value = localDigits.slice(0, customerLocalPhoneLimitForPrefix(selected[2]));
          }
        }
        function currentCustomerPhoneParts() {
          const selected = selectedCustomerDialCountry();
          const prefix = selected[2];
          const prefixDigits = profilePhoneDigits(prefix);
          const localDigits = sessionPhone ? profilePhoneDigits(sessionPhone.value).slice(0, customerLocalPhoneLimitForPrefix(prefix)) : "";
          return {
            countryIso: selected[0],
            countryName: selected[1],
            prefix,
            prefixDigits,
            localDigits,
            fullDigits: (prefixDigits + localDigits).slice(0, 15),
            display: localDigits ? prefix + " " + localDigits : ""
          };
        }
        function renderSessionForm() {
          const storedFirst = profileCustomerFirstName();
          const storedLast = profileCustomerLastName();
          const visibility = customerProfileVisibility();
          if (sessionFirst) sessionFirst.value = storedFirst;
          if (sessionLast) sessionLast.value = storedLast;
          applyCustomerPhoneValue(profilePhoneValue(), localStorage.getItem("emyCustomerPhoneCountry") || localStorage.getItem("emyMainPendingSignupPhoneCountry"), localStorage.getItem("emyCustomerPhonePrefix") || localStorage.getItem("emyMainPendingSignupPhonePrefix"), localStorage.getItem("emyCustomerPhoneLocal") || localStorage.getItem("emyMainPendingSignupPhoneLocal"));
          if (sessionEmail) sessionEmail.value = customerProfileCleanEmail(profileEmail) || "";
          syncSessionVisibilityButtons(visibility);
        }
        function profileLogout() {
          try {
            ["emyMainSignedInRole", "emyMainSignedInEmail", "emyAskCurrentUser"].forEach((key) => localStorage.removeItem(key));
            localStorage.setItem("emyMainSignedOut", "1");
          } catch (error) {}
          window.location.href = "index.html";
        }
        function openNotificationSettings() {
          try {
            localStorage.setItem("emyNotificationReturnPage", "emy-customer-profile.html");
          } catch (error) {}
          window.location.href = "emy-notification-settings.html";
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
        function businessRouteNotificationStorageKeys() {
          const context = profileBusinessRouteContext();
          return profileBusinessNotificationKeys(context.key, context.name).map((key) => "emyBusinessNotifications:" + key);
        }
        function businessRouteNotificationId(item, index) {
          return String(item && (item.id || item.notificationId) || [item && item.type, item && item.title, item && (item.createdAt || item.time), index].join(":"));
        }
        function readBusinessRouteNotifications() {
          const rows = profileBusinessRouteNotificationRows(profileBusinessRouteContext());
          return rows.map((item, index) => {
            const media = notificationMediaFromStorage(item || {});
            const createdAt = String(item && (item.createdAt || item.created || item.time || item.rawTime || item.addedAt) || "");
            const directAvatar = notificationDirectOrRef(
              item && (item.avatar || item.avatarSrc || item.actorPhoto || item.customerPhoto || item.businessPhoto || item.logo || item.photo),
              item && (item.avatarRef || item.actorPhotoRef || item.customerPhotoRef || item.businessPhotoRef || item.logoRef || item.photoRef),
              "image"
            );
            const directThumb = notificationDirectOrRef(
              item && (item.thumb || item.thumbnail || item.image || item.coverSrc || item.mediaSrc || item.video),
              item && (item.thumbRef || item.thumbnailRef || item.imageRef || item.coverRef || item.mediaRef || item.videoRef),
              item && item.mediaType
            );
            return {
              id: businessRouteNotificationId(item, index),
              group: String(item && (item.group || item.type) || ""),
              type: String(item && item.type || ""),
              title: String(item && (item.title || item.message || item.type || "Business notification") || "Business notification"),
              body: String(item && (item.body || item.message || item.text || "") || ""),
              time: formatNotificationTime(createdAt),
              rawTime: createdAt,
              businessKey: String(item && (item.businessKey || item.key || item.profileKey) || ""),
              href: String(item && (item.href || item.url) || ""),
              action: String(item && (item.action || item.ref && item.ref.action) || ""),
              itemKind: String(item && (item.itemKind || item.kind || item.ref && (item.ref.type || item.ref.kind)) || ""),
              itemTitle: String(item && (item.itemTitle || item.productTitle || item.postTitle || item.ref && item.ref.title) || ""),
              feedId: String(item && (item.feedId || item.itemId || item.postId || item.productId || item.ref && (item.ref.feedId || item.ref.id)) || ""),
              bodyText: String(item && (item.body || item.message || item.text || "") || ""),
              ref: item && item.ref && typeof item.ref === "object" ? item.ref : null,
              avatar: directAvatar || media.avatar,
              thumb: directThumb || media.thumb,
              actorName: String(item && (item.actorName || item.customerName || item.viewerName || item.author || item.name || item.initials) || ""),
              initials: String(item && (item.actorName || item.customerName || item.viewerName || item.author || item.name || item.initials || item.title) || ""),
              unread: item && item.read === true ? false : item && item.unread === false ? false : true,
              raw: item
            };
          }).filter((item) => item.title.trim() && !(item.raw && item.raw.hidden)).sort((left, right) => {
            const leftTime = new Date(left.rawTime || 0).getTime() || 0;
            const rightTime = new Date(right.rawTime || 0).getTime() || 0;
            return rightTime - leftTime;
          });
        }
        function mutateBusinessRouteNotification(id, updater) {
          businessRouteNotificationStorageKeys().forEach((storageKey) => {
            try {
              const parsed = JSON.parse(localStorage.getItem(storageKey) || "[]");
              if (!Array.isArray(parsed)) return;
              let changed = false;
              const next = parsed.map((item, index) => {
                if (businessRouteNotificationId(item, index) !== id) return item;
                changed = true;
                return updater(Object.assign({}, item || {}));
              }).filter(Boolean);
              if (changed) localStorage.setItem(storageKey, JSON.stringify(next));
            } catch (error) {}
          });
        }
        function markBusinessRouteNotificationsSeen() {
          businessRouteNotificationStorageKeys().forEach((storageKey) => {
            try {
              const parsed = JSON.parse(localStorage.getItem(storageKey) || "[]");
              if (!Array.isArray(parsed)) return;
              localStorage.setItem(storageKey, JSON.stringify(parsed.map((item) => item && typeof item === "object" ? Object.assign({}, item, { read:true, unread:false }) : item)));
            } catch (error) {}
          });
        }
        function openBusinessRouteNotification(item) {
          if (!item) return;
          mutateBusinessRouteNotification(item.id, (stored) => Object.assign({}, stored, { read:true, unread:false }));
          renderNotifications();
          if (item.href && item.href !== "#") {
            window.location.href = item.href;
            return;
          }
          showToast("Business notification opened.");
        }
        function hideBusinessRouteNotification(id, message) {
          mutateBusinessRouteNotification(id, (stored) => Object.assign({}, stored, { hidden:true, read:true, unread:false }));
          renderNotifications();
          showToast(message || "Business notification hidden.");
        }
        function deleteBusinessRouteNotification(id, message) {
          mutateBusinessRouteNotification(id, () => null);
          renderNotifications();
          showToast(message || "Business notification deleted.");
        }
        function turnOffBusinessRouteCommentNotifications() {
          try {
            const settings = JSON.parse(localStorage.getItem("emyBusinessNotificationSettings") || "{}");
            settings.commentActivity = false;
            localStorage.setItem("emyBusinessNotificationSettings", JSON.stringify(settings));
          } catch (error) {}
          closeNotificationMenus();
          showToast("Business comment notifications turned off.");
        }
        function renderBusinessRouteNotifications() {
          const notifications = readBusinessRouteNotifications();
          const unreadCount = notifications.filter((item) => item.unread).length;
          if (profileBusinessRouteNotificationCount) {
            profileBusinessRouteNotificationCount.textContent = String(unreadCount);
            profileBusinessRouteNotificationCount.setAttribute("aria-label", unreadCount + " unread notifications");
          }
          if (notificationPanel) notificationPanel.dataset.notificationMode = "business";
          if (!notificationList) return;
          if (!notifications.length) {
            notificationList.innerHTML =
              '<h3 class="notifications-section-title">Important</h3>' +
              '<p class="notifications-empty"><strong>No business notifications yet</strong>Likes, comments, messages, approval updates, and customer activity will appear here.</p>' +
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
        function renderNotifications() {
          if (isBusinessCustomerProfileRoute()) {
            renderBusinessRouteNotifications();
            return;
          }
          const notifications = readNotifications();
          const unreadCount = notifications.filter((item) => item.unread).length;
          if (notificationCount) {
            notificationCount.textContent = String(unreadCount);
            notificationCount.setAttribute("aria-label", unreadCount + " unread notifications");
          }
          if (notificationPanel) notificationPanel.dataset.notificationMode = "customer";
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
          const activeButton = isBusinessCustomerProfileRoute() && profileBusinessRouteNotificationButton ? profileBusinessRouteNotificationButton : notificationButton;
          if (!notificationPanel || !activeButton) return;
          const rect = activeButton.getBoundingClientRect();
          const width = Math.min(420, Math.max(280, window.innerWidth - 20));
          const left = Math.min(window.innerWidth - width - 10, Math.max(10, rect.right - width));
          notificationPanel.style.width = width + "px";
          notificationPanel.style.left = left + "px";
          notificationPanel.style.right = "auto";
          notificationPanel.style.top = Math.max(10, rect.bottom + 10) + "px";
          notificationPanel.style.transform = "none";
        }
        function setNotificationsOpen(isOpen) {
          const activeButton = isBusinessCustomerProfileRoute() && profileBusinessRouteNotificationButton ? profileBusinessRouteNotificationButton : notificationButton;
          if (!notificationPanel || !activeButton) return;
          notificationPanel.classList.toggle("is-open", isOpen);
          notificationPanel.setAttribute("aria-hidden", isOpen ? "false" : "true");
          activeButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
          if (isOpen) {
            if (isBusinessCustomerProfileRoute()) markBusinessRouteNotificationsSeen();
            else markNotificationsSeen();
            renderNotifications();
            positionNotificationsPanel();
          }
        }
        function defaultCrop() { return { zoom:100, x:50, y:50 }; }
        function normaliseCrop(crop) {
          const source = crop && typeof crop === "object" ? crop : {};
          return { zoom: Math.min(260, Math.max(100, Number(source.zoom) || 100)), x: Math.min(100, Math.max(0, Number(source.x) || 50)), y: Math.min(100, Math.max(0, Number(source.y) || 50)) };
        }
        function applyCropStyle(media, crop) {
          const clean = normaliseCrop(crop);
          const overflow = clean.zoom - 100;
          media.style.objectFit = "cover";
          media.style.objectPosition = clean.x + "% " + clean.y + "%";
          media.style.width = clean.zoom + "%";
          media.style.height = clean.zoom + "%";
          media.style.left = (-overflow * (clean.x / 100)).toFixed(3) + "%";
          media.style.top = (-overflow * (clean.y / 100)).toFixed(3) + "%";
          media.style.right = "auto";
          media.style.bottom = "auto";
        }
        function profilePageCustomerObjects() {
          const rows = [];
          ["emyCustomerProfile", "emyCustomerProfileDraft", "emyCustomerProfileData", "emyCurrentCustomerProfile", "emyFirebaseCustomerProfile", "emyCustomerAccount"].forEach((key) => {
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
        function profilePageCustomerObjectValues(fields) {
          const values = [];
          profilePageCustomerObjects().forEach((item) => fields.forEach((field) => values.push(item && item[field])));
          return values;
        }
        function profilePageFirstMedia(values) {
          for (const value of values) {
            const next = String(value || "").trim();
            if (next && !/^blob:/i.test(next) && next.indexOf("data:image/svg+xml") !== 0 && !/images\.unsplash|placeholder|avatar-placeholder|demo|stock|sample|lorem|faker|dummy|randomuser|pravatar|thispersondoesnotexist|ui-avatars|dicebear|robohash|gravatar/i.test(next)) return next;
          }
          return "";
        }
        function savedCustomerProfilePhoto() {
          return profilePageFirstMedia([
            localStorage.getItem("emyCustomerProfilePhoto"),
            localStorage.getItem("emyCustomerProfilePhotoSrc"),
            localStorage.getItem("emyCustomerProfileImage"),
            localStorage.getItem("emyCustomerProfileImageSrc"),
            localStorage.getItem("emyCustomerAvatar"),
            localStorage.getItem("emyCustomerAvatarSrc"),
            localStorage.getItem("emyCustomerPhoto"),
            localStorage.getItem("emyCustomerPhotoSrc"),
            localStorage.getItem(customerProfilePhotoBackupKeys.photo),
            localStorage.getItem(customerProfilePhotoBackupKeys.photoSrc)
          ].concat(profilePageCustomerObjectValues(["photoUrl", "photoURL", "photo", "photoSrc", "profilePhoto", "profilePhotoSrc", "profileImage", "profileImageSrc", "avatar", "avatarSrc", "image", "imageSrc"])));
        }
        function savedCustomerProfilePhotoRef() {
          return profilePageFirstMedia([
            localStorage.getItem("emyCustomerProfilePhotoRef"),
            localStorage.getItem("emyCustomerProfileImageRef"),
            localStorage.getItem("emyCustomerAvatarRef"),
            localStorage.getItem("emyCustomerPhotoRef"),
            localStorage.getItem(customerProfilePhotoBackupKeys.ref)
          ].concat(profilePageCustomerObjectValues(["photoPublicId", "photoRef", "profilePhotoRef", "profileImageRef", "avatarRef", "imageRef", "publicId"])));
        }
        function currentProfilePhotoSrc() {
          const pendingRole = String(localStorage.getItem("emyMainPendingSignupRole") || "").toLowerCase();
          return savedCustomerProfilePhoto() ||
            (pendingRole === "customer" ? localStorage.getItem("emyMainPendingSignupPhoto") : "") ||
            (pendingRole === "customer" ? localStorage.getItem("emyMainPendingSignupPhotoSrc") : "") ||
            "";
        }
        function currentProfilePhotoRef() {
          const pendingRole = String(localStorage.getItem("emyMainPendingSignupRole") || "").toLowerCase();
          return savedCustomerProfilePhotoRef() ||
            (pendingRole === "customer" ? localStorage.getItem("emyMainPendingSignupPhotoRef") : "") ||
            "";
        }
        function markCustomerProfileUpdated() {
          try {
            localStorage.setItem("emyCustomerProfileUpdatedAt", new Date().toISOString());
            window.dispatchEvent(new CustomEvent("emy:customer-profile-updated"));
          } catch (error) {}
        }
        function profilePhotoIsLargeInline(value) {
          const text = String(value || "");
          return /^data:image\//i.test(text) && text.length > PROFILE_PHOTO_ALIAS_INLINE_LIMIT;
        }
        function profilePhotoSnapshotValue(value) {
          const text = String(value || "").trim();
          if (!text || /^blob:/i.test(text)) return "";
          if (/^data:image\//i.test(text) && text.length > PROFILE_PHOTO_SNAPSHOT_LIMIT) return "";
          return text.length > PROFILE_PHOTO_SNAPSHOT_LIMIT ? text.slice(0, PROFILE_PHOTO_SNAPSHOT_LIMIT) : text;
        }
        function profileStorageSetIfChanged(key, value) {
          try {
            if (localStorage.getItem(key) === value) return false;
            localStorage.setItem(key, value);
            return true;
          } catch (error) {
            return false;
          }
        }
        function profileStorageRemoveIfPresent(key) {
          try {
            if (localStorage.getItem(key) === null) return false;
            localStorage.removeItem(key);
            return true;
          } catch (error) {
            return false;
          }
        }
        function backupCustomerProfilePhoto(photo, ref, crop, replaceExisting) {
          try {
            const nextPhoto = String(photo || "").trim();
            const nextRef = String(ref || "").trim();
            const cropText = crop ? (typeof crop === "string" ? crop : JSON.stringify(crop)) : "";
            let changed = false;
            if (replaceExisting && (nextPhoto || nextRef)) {
              Object.keys(customerProfilePhotoBackupKeys).forEach((name) => {
                changed = profileStorageRemoveIfPresent(customerProfilePhotoBackupKeys[name]) || changed;
              });
            }
            if (nextPhoto && !profilePhotoIsLargeInline(nextPhoto) && !/^blob:/i.test(nextPhoto)) {
              changed = profileStorageSetIfChanged(customerProfilePhotoBackupKeys.photo, nextPhoto) || changed;
              changed = profileStorageSetIfChanged(customerProfilePhotoBackupKeys.photoSrc, nextPhoto) || changed;
            }
            if (nextRef) changed = profileStorageSetIfChanged(customerProfilePhotoBackupKeys.ref, nextRef) || changed;
            if (cropText) changed = profileStorageSetIfChanged(customerProfilePhotoBackupKeys.crop, cropText) || changed;
            if (changed) profileStorageSetIfChanged(customerProfilePhotoBackupKeys.savedAt, new Date().toISOString());
            return changed;
          } catch (error) {
            return false;
          }
        }
        function clearCustomerProfilePhotoBackups() {
          Object.keys(customerProfilePhotoBackupKeys).forEach((name) => {
            profileStorageRemoveIfPresent(customerProfilePhotoBackupKeys[name]);
          });
        }
        function captureCustomerIdentityForPurge() {
          try {
            const names = [
              localStorage.getItem("emyCustomerDisplayName"),
              [localStorage.getItem("emyCustomerFirstName"), localStorage.getItem("emyCustomerLastName")].filter(Boolean).join(" "),
              [localStorage.getItem("emyMainPendingSignupFirstName"), localStorage.getItem("emyMainPendingSignupLastName")].filter(Boolean).join(" ")
            ].map((value) => String(value || "").replace(/\s+/g, " ").trim()).filter(Boolean);
            const photos = [
              currentProfilePhotoSrc(),
              localStorage.getItem("emyCustomerProfilePhoto"),
              localStorage.getItem("emyCustomerProfilePhotoSrc"),
              localStorage.getItem("emyCustomerProfilePhotoRef"),
              localStorage.getItem("emyCustomerProfileImage"),
              localStorage.getItem("emyCustomerAvatar"),
              localStorage.getItem("emyCustomerPhoto")
            ].map(profilePhotoSnapshotValue).filter(Boolean);
            if (names.length || photos.length) {
              const signature = JSON.stringify({ names: Array.from(new Set(names)), photos: Array.from(new Set(photos)) });
              if (localStorage.getItem("emyCustomerIdentityPurgeSignature") !== signature) {
                localStorage.setItem("emyCustomerIdentityPurgeSignature", signature);
                localStorage.setItem("emyCustomerIdentityPurgeSnapshot", JSON.stringify({ names: Array.from(new Set(names)), photos: Array.from(new Set(photos)), capturedAt: new Date().toISOString() }));
              }
            }
          } catch (error) {}
        }
        function syncCurrentProfilePhotoAliases(src, clearRefs) {
          if (profilePhotoAliasSyncInProgress) return true;
          const photo = String(src || "").trim();
          const photoKeys = ["emyCustomerProfilePhoto", "emyCustomerProfilePhotoSrc", "emyCustomerProfileImage", "emyCustomerProfileImageSrc", "emyCustomerAvatar", "emyCustomerAvatarSrc", "emyCustomerPhoto", "emyCustomerPhotoSrc"];
          const refKeys = ["emyCustomerProfilePhotoRef", "emyCustomerProfileImageRef", "emyCustomerAvatarRef", "emyCustomerPhotoRef"];
          let changed = false;
          profilePhotoAliasSyncInProgress = true;
          if (photo) {
            const alreadyPrimary = localStorage.getItem(photoKeys[0]) === photo;
            const largeInline = profilePhotoIsLargeInline(photo);
            if (!alreadyPrimary || profilePhotoManualSaveInProgress) captureCustomerIdentityForPurge();
            changed = backupCustomerProfilePhoto(photo, "", "") || changed;
            if (!alreadyPrimary && !profileStorageSetIfChanged(photoKeys[0], photo)) {
              profilePhotoAliasSyncInProgress = false;
              throw new Error("Profile image storage failed");
            }
            changed = changed || !alreadyPrimary;
            const aliasKeys = largeInline ? [] : photoKeys.slice(1);
            aliasKeys.forEach((key) => { changed = profileStorageSetIfChanged(key, photo) || changed; });
            if (largeInline && profilePhotoManualSaveInProgress) {
              photoKeys.slice(1).forEach((key) => { changed = profileStorageRemoveIfPresent(key) || changed; });
            }
          } else {
            captureCustomerIdentityForPurge();
            photoKeys.forEach((key) => { changed = profileStorageRemoveIfPresent(key) || changed; });
            clearCustomerProfilePhotoBackups();
          }
          if (!photo || clearRefs) refKeys.forEach((key) => { changed = profileStorageRemoveIfPresent(key) || changed; });
          profilePhotoAliasSyncInProgress = false;
          if (changed) markCustomerProfileUpdated();
          return changed;
        }
        function syncCurrentProfilePhotoRefAliases(ref) {
          const photoRef = String(ref || "").trim();
          if (!photoRef) return;
          if (profilePhotoAliasSyncInProgress) return false;
          try {
            profilePhotoAliasSyncInProgress = true;
            let changed = false;
            ["emyCustomerProfilePhotoRef", "emyCustomerProfileImageRef", "emyCustomerAvatarRef", "emyCustomerPhotoRef"].forEach((key) => {
              changed = profileStorageSetIfChanged(key, photoRef) || changed;
            });
            changed = backupCustomerProfilePhoto("", photoRef, "") || changed;
            profilePhotoAliasSyncInProgress = false;
            if (changed) markCustomerProfileUpdated();
            return changed;
          } catch (error) {}
          profilePhotoAliasSyncInProgress = false;
          return false;
        }
        function clearCustomerProfilePhotoObjectStores() {
          const storeKeys = ["emyCustomerProfile", "emyCustomerProfileDraft", "emyCustomerProfileData", "emyCurrentCustomerProfile", "emyFirebaseCustomerProfile", "emyCustomerAccount", "emyAskCurrentUser", "emyMainSignedInUser", "emyAuthUser", "emyFirebaseUser"];
          const photoFields = ["photoUrl", "photoURL", "photo", "photoSrc", "profilePhoto", "profilePhotoSrc", "profileImage", "profileImageSrc", "avatar", "avatarSrc", "image", "imageSrc", "photoPublicId", "photoRef", "profilePhotoRef", "profileImageRef", "avatarRef", "imageRef", "publicId"];
          const nestedKeys = ["profile", "customer", "user", "account", "data"];
          function clearObject(source) {
            if (!source || typeof source !== "object" || Array.isArray(source)) return false;
            let changed = false;
            photoFields.forEach((field) => {
              if (Object.prototype.hasOwnProperty.call(source, field) && source[field]) {
                source[field] = "";
                changed = true;
              }
            });
            nestedKeys.forEach((key) => {
              if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
                changed = clearObject(source[key]) || changed;
              }
            });
            return changed;
          }
          storeKeys.forEach((key) => {
            const value = readJson(key, null);
            if (!value || typeof value !== "object" || Array.isArray(value)) return;
            if (!clearObject(value)) return;
            try { localStorage.setItem(key, JSON.stringify(value)); } catch (error) {}
          });
        }
        function clearCurrentProfilePhotoEverywhere() {
          profilePhotoManualSaveInProgress = true;
          try {
            captureCustomerIdentityForPurge();
            [
              "emyCustomerProfilePhoto", "emyCustomerProfilePhotoSrc", "emyCustomerProfileImage", "emyCustomerProfileImageSrc",
              "emyCustomerAvatar", "emyCustomerAvatarSrc", "emyCustomerPhoto", "emyCustomerPhotoSrc",
              "emyCustomerProfilePhotoRef", "emyCustomerProfileImageRef", "emyCustomerAvatarRef", "emyCustomerPhotoRef",
              "emyMainPendingSignupPhoto", "emyMainPendingSignupPhotoSrc", "emyMainPendingSignupPhotoRef", "emyMainPendingSignupPhotoCrop",
              "emyMainSignedInPhoto", "emyMainSignedInPhotoUrl", "emyMainSignedInPhotoRef",
              "emyFirebasePhotoURL", "emyFirebasePhotoUrl", "emyFirebaseUserPhoto", "emyFirebasePhotoRef",
              "emyAuthPhotoURL", "emyAuthPhotoRef",
              "emyCustomerProfilePhotoCrop", "emyCustomerPhotoCrop", "emyCustomerAvatarCrop", "emyCustomerProfileImageCrop"
            ].forEach((key) => {
              try { localStorage.removeItem(key); } catch (error) {}
            });
            clearCustomerProfilePhotoBackups();
            clearCustomerProfilePhotoObjectStores();
            localStorage.setItem("emyCustomerProfilePhotoRemovedAt", new Date().toISOString());
          } catch (error) {}
          markCustomerProfileUpdated();
          window.setTimeout(() => { profilePhotoManualSaveInProgress = false; }, 120);
        }
        function renderedProfilePhotoPair() {
          const images = [];
          avatarNodes.forEach((node) => {
            if (!node) return;
            if (node.tagName === "IMG") images.push(node);
            if (node.querySelectorAll) node.querySelectorAll("img").forEach((image) => images.push(image));
          });
          if (profilePhotoPreview) {
            if (profilePhotoPreview.tagName === "IMG") images.push(profilePhotoPreview);
            if (profilePhotoPreview.querySelectorAll) profilePhotoPreview.querySelectorAll("img").forEach((image) => images.push(image));
          }
          for (const image of images) {
            const src = String(image.currentSrc || image.getAttribute("src") || "").trim();
            const ref = String(image.getAttribute("data-emy-media-ref") || image.dataset && image.dataset.emyMediaRef || "").trim();
            if ((src && !/^blob:/i.test(src)) || ref) return { src: /^blob:/i.test(src) ? "" : src, ref };
          }
          return { src:"", ref:"" };
        }
        function syncRenderedProfilePhotoAliases() {
          if (profilePhotoManualSaveInProgress) return;
          if (profilePhotoAliasSyncInProgress) return;
          const currentSrc = currentProfilePhotoSrc();
          const currentRef = currentProfilePhotoRef();
          if (!currentSrc && !currentRef) return;
          const media = renderedProfilePhotoPair();
          if (!media.src && !media.ref) return;
          if (media.src) {
            if (media.src !== currentSrc && !profilePhotoIsLargeInline(media.src)) syncCurrentProfilePhotoAliases(media.src, false);
          }
          if (media.ref) {
            if (media.ref !== currentRef) syncCurrentProfilePhotoRefAliases(media.ref);
          }
        }
        function currentProfilePhotoCrop() {
          const signedRole = String(localStorage.getItem("emyMainSignedInRole") || "").toLowerCase();
          const pendingRole = String(localStorage.getItem("emyMainPendingSignupRole") || "").toLowerCase();
          const fallback = !signedRole && pendingRole === "customer" ? readJson("emyMainPendingSignupPhotoCrop", defaultCrop()) : defaultCrop();
          return readJson("emyCustomerProfilePhotoCrop", readJson("emyCustomerPhotoCrop", readJson("emyCustomerAvatarCrop", readJson("emyCustomerProfileImageCrop", fallback))));
        }
        function syncPhotoCropControls() {
          if (!photoCropZoom || !photoCropX || !photoCropY) return;
          const clean = normaliseCrop(photoDraftCrop);
          photoCropZoom.value = clean.zoom;
          photoCropX.value = clean.x;
          photoCropY.value = clean.y;
        }
        function updatePhotoCropDirtyState() {
          if (!photoCropApply) return;
          const clean = normaliseCrop(photoDraftCrop);
          const original = normaliseCrop(photoOriginalCrop);
          const changed = photoDraftSrc !== photoOriginalSrc || clean.zoom !== original.zoom || clean.x !== original.x || clean.y !== original.y;
          photoCropApply.hidden = !changed;
        }
        function renderPhotoCropPreview() {
          if (!photoCropFrame || !photoDraftSrc) return;
          photoCropFrame.innerHTML = "";
          const image = document.createElement("img");
          image.src = photoDraftSrc;
          image.alt = "";
          photoCropFrame.appendChild(image);
          photoCropPreviewMedia = image;
          applyCropStyle(photoCropPreviewMedia, photoDraftCrop);
          updatePhotoCropDirtyState();
        }
        function updatePhotoCropPreview() {
          if (!photoCropZoom || !photoCropX || !photoCropY) return;
          photoDraftCrop = normaliseCrop({
            zoom: photoCropZoom.value,
            x: photoCropX.value,
            y: photoCropY.value
          });
          if (photoCropPreviewMedia) applyCropStyle(photoCropPreviewMedia, photoDraftCrop);
          updatePhotoCropDirtyState();
        }
        function setPhotoCropDraft(nextCrop) {
          photoDraftCrop = normaliseCrop(nextCrop);
          syncPhotoCropControls();
          if (photoCropPreviewMedia) applyCropStyle(photoCropPreviewMedia, photoDraftCrop);
          updatePhotoCropDirtyState();
        }
        function beginPhotoCropDrag(event) {
          if (!photoCropFrame || !photoCropPreviewMedia || event.button > 0) return;
          event.preventDefault();
          photoCropDrag = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            cropX: photoDraftCrop.x,
            cropY: photoDraftCrop.y
          };
          photoCropFrame.classList.add("is-dragging");
          photoCropFrame.setPointerCapture(event.pointerId);
        }
        function movePhotoCropDrag(event) {
          if (!photoCropDrag || !photoCropFrame || event.pointerId !== photoCropDrag.pointerId) return;
          event.preventDefault();
          const rect = photoCropFrame.getBoundingClientRect();
          const overflowFactor = Math.max(0.08, photoDraftCrop.zoom / 100 - 1);
          const nextX = photoCropDrag.cropX - ((event.clientX - photoCropDrag.startX) / Math.max(1, rect.width)) * (100 / overflowFactor);
          const nextY = photoCropDrag.cropY - ((event.clientY - photoCropDrag.startY) / Math.max(1, rect.height)) * (100 / overflowFactor);
          setPhotoCropDraft({ ...photoDraftCrop, x: nextX, y: nextY });
        }
        function endPhotoCropDrag(event) {
          if (!photoCropDrag || !photoCropFrame || event.pointerId !== photoCropDrag.pointerId) return;
          photoCropFrame.classList.remove("is-dragging");
          try { photoCropFrame.releasePointerCapture(event.pointerId); } catch (error) {}
          photoCropDrag = null;
        }
        function zoomPhotoCropFromWheel(event) {
          if (!photoCropPreviewMedia) return;
          event.preventDefault();
          const change = event.deltaY > 0 ? -4 : 4;
          setPhotoCropDraft({ ...photoDraftCrop, zoom: photoDraftCrop.zoom + change });
        }
        function openPhotoCropEditor(src, crop, originalSrc, originalCrop) {
          if (!src) {
            showToast("Add a profile photo first.");
            return;
          }
          photoDraftSrc = src;
          photoDraftCrop = normaliseCrop(crop);
          photoOriginalSrc = originalSrc || currentProfilePhotoSrc();
          photoOriginalCrop = normaliseCrop(originalCrop || currentProfilePhotoCrop());
          syncPhotoCropControls();
          renderPhotoCropPreview();
          setModalOpen(photoCropModal, true);
        }
        function applyPhotoCropEditor() {
          updatePhotoCropPreview();
          const previewSrc = photoCropPreviewMedia ? String(photoCropPreviewMedia.currentSrc || photoCropPreviewMedia.getAttribute("src") || "").trim() : "";
          const nextPhoto = String(photoDraftSrc || previewSrc || currentProfilePhotoSrc() || "").trim();
          if (!nextPhoto) {
            showToast("Choose a profile photo first.");
            openProfilePhotoSourceSheet();
            return;
          }
          const cleanCrop = normaliseCrop(photoDraftCrop);
          profilePhotoManualSaveInProgress = true;
          try {
            syncCurrentProfilePhotoAliases(nextPhoto, /^(data:|blob:)/i.test(nextPhoto));
          } catch (error) {
            profilePhotoManualSaveInProgress = false;
            showToast("That profile image is too large to save. Try a smaller photo.");
            return;
          }
          ["emyCustomerProfilePhotoCrop", "emyCustomerPhotoCrop", "emyCustomerAvatarCrop", "emyCustomerProfileImageCrop"].forEach((key) => {
            try { localStorage.setItem(key, JSON.stringify(cleanCrop)); } catch (error) {}
          });
          backupCustomerProfilePhoto(nextPhoto, currentProfilePhotoRef(), cleanCrop, true);
          photoDraftSrc = nextPhoto;
          photoDraftCrop = cleanCrop;
          photoOriginalSrc = nextPhoto;
          photoOriginalCrop = cleanCrop;
          renderPhoto();
          renderProfile();
          profilePhotoManualSaveInProgress = false;
          setModalOpen(photoCropModal, false);
          setModalOpen(photoSourceSheet, false);
          setModalOpen(photoCameraSheet, false);
          showToast("Profile photo updated.");
        }
        function shortLocation(value) {
          const text = String(value || "").trim();
          if (!text || text.toLowerCase() === "near me") return "Current Location";
          return text.split(",")[0].trim() || "Current Location";
        }
        function headerLocationText(value) {
          const text = String(value || "").trim();
          if (!text || text.toLowerCase() === "near me" || text === "Current Location") return "Current Location";
          const parts = text.split(",").map((part) => part.trim()).filter(Boolean);
          const label = parts.slice(0, 2).join(", ") || text;
          return label.length > 46 ? label.slice(0, 43).trim() + "..." : label;
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
              longitude: Number.isFinite(Number(place.longitude)) ? Number(place.longitude) : null
            }));
          } catch (error) {
            return [];
          }
        }
        function savePlaces() {
          try { localStorage.setItem("emyCustomerSavedPlaces", JSON.stringify(profilePlaces)); } catch (error) {}
        }
        function setModalOpen(modal, isOpen) {
          if (!modal) return;
          modal.classList.toggle("is-open", isOpen);
          modal.setAttribute("aria-hidden", isOpen ? "false" : "true");
        }
        function closeProfilePhotoOverlays() {
          setModalOpen(photoSourceSheet, false);
          setModalOpen(photoCameraSheet, false);
          setModalOpen(photoCropModal, false);
        }
        function openProfilePhotoSourceSheet() {
          setModalOpen(photoCropModal, false);
          setModalOpen(photoCameraSheet, false);
          setModalOpen(photoSourceSheet, true);
        }
        function closeProfilePhotoSourceSheet() {
          setModalOpen(photoSourceSheet, false);
        }
        function openProfilePhotoFilePicker() {
          if (!photoInput) {
            showToast("Profile image picker is not available on this page.");
            return;
          }
          photoInput.value = "";
          photoInput.accept = "image/*";
          photoInput.removeAttribute("capture");
          try {
            photoInput.click();
          } catch (error) {
            showToast("Profile image picker is not available on this page.");
          }
        }
        function chooseProfilePhotoSource(source) {
          closeProfilePhotoSourceSheet();
          if (source === "camera") {
            openProfilePhotoCamera();
            return;
          }
          openProfilePhotoFilePicker();
        }
        function setProfilePhotoCameraStatus(message, warning) {
          if (!photoCameraStatus) return;
          photoCameraStatus.textContent = message || "";
          photoCameraStatus.style.color = warning ? "#9a4b00" : "#61708c";
        }
        function stopProfilePhotoCamera() {
          if (photoCameraStream) photoCameraStream.getTracks().forEach((track) => track.stop());
          photoCameraStream = null;
          if (photoCameraPreview) photoCameraPreview.srcObject = null;
        }
        async function openProfilePhotoCamera() {
          setModalOpen(photoCameraSheet, true);
          setProfilePhotoCameraStatus("Requesting camera permission...", false);
          if (window.location.protocol === "file:") {
            setProfilePhotoCameraStatus("Camera access is blocked in this file preview. Open through localhost or HTTPS, or use Computer or phone photo.", true);
            return;
          }
          if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            setProfilePhotoCameraStatus("Camera is not available in this browser. Use Computer or phone photo instead.", true);
            return;
          }
          try {
            stopProfilePhotoCamera();
            photoCameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode:"user" }, audio:false });
            if (photoCameraPreview) {
              photoCameraPreview.srcObject = photoCameraStream;
              const playPromise = photoCameraPreview.play();
              if (playPromise && typeof playPromise.catch === "function") playPromise.catch(() => {});
            }
            setProfilePhotoCameraStatus("Camera ready. Tap Take picture when you are ready.", false);
          } catch (error) {
            setProfilePhotoCameraStatus("Camera permission was not allowed. Use Computer or phone photo instead.", true);
          }
        }
        function closeProfilePhotoCamera() {
          stopProfilePhotoCamera();
          setModalOpen(photoCameraSheet, false);
        }
        function captureProfilePhotoCamera() {
          if (!photoCameraPreview || !photoCameraStream) {
            setProfilePhotoCameraStatus("Camera is not ready yet.", true);
            return;
          }
          const canvas = document.createElement("canvas");
          canvas.width = photoCameraPreview.videoWidth || 720;
          canvas.height = photoCameraPreview.videoHeight || 720;
          const context = canvas.getContext("2d");
          if (!context) return;
          context.drawImage(photoCameraPreview, 0, 0, canvas.width, canvas.height);
          const nextPhoto = canvas.toDataURL("image/jpeg", 0.92);
          closeProfilePhotoCamera();
          openPhotoCropEditor(nextPhoto, defaultCrop(), currentProfilePhotoSrc(), currentProfilePhotoCrop());
          showToast("Adjust the photo, then save.");
        }
        function openProfilePhotoDraft(nextPhoto) {
          const photo = String(nextPhoto || "").trim();
          if (!photo) return;
          openPhotoCropEditor(photo, defaultCrop(), currentProfilePhotoSrc(), currentProfilePhotoCrop());
          showToast("Adjust the photo, then save.");
        }
        function readProfilePhotoFileFallback(file) {
          const reader = new FileReader();
          reader.addEventListener("load", () => openProfilePhotoDraft(reader.result));
          reader.readAsDataURL(file);
        }
        function processProfilePhotoFile(file) {
          if (!file || !String(file.type || "").startsWith("image/")) return;
          if (!window.URL || !window.URL.createObjectURL) {
            readProfilePhotoFileFallback(file);
            return;
          }
          const objectUrl = URL.createObjectURL(file);
          const image = new Image();
          image.addEventListener("load", () => {
            try {
              const width = image.naturalWidth || image.width || 1;
              const height = image.naturalHeight || image.height || 1;
              const maxSide = 900;
              const scale = Math.min(1, maxSide / Math.max(width, height));
              const canvas = document.createElement("canvas");
              canvas.width = Math.max(1, Math.round(width * scale));
              canvas.height = Math.max(1, Math.round(height * scale));
              const context = canvas.getContext("2d");
              if (!context) {
                readProfilePhotoFileFallback(file);
                return;
              }
              context.drawImage(image, 0, 0, canvas.width, canvas.height);
              openProfilePhotoDraft(canvas.toDataURL("image/jpeg", 0.86));
            } catch (error) {
              readProfilePhotoFileFallback(file);
            } finally {
              URL.revokeObjectURL(objectUrl);
            }
          });
          image.addEventListener("error", () => {
            URL.revokeObjectURL(objectUrl);
            readProfilePhotoFileFallback(file);
          });
          image.src = objectUrl;
        }
        function handleProfilePhotoClick(event) {
          const target = event.target;
          if (!target || !target.closest) return;
          const changeButton = target.closest("[data-change-photo], [data-session-change-photo]");
          if (changeButton) {
            event.preventDefault();
            event.stopImmediatePropagation();
            openProfilePhotoSourceSheet();
            return;
          }
          const sourceButton = target.closest("[data-photo-source]");
          if (sourceButton) {
            event.preventDefault();
            event.stopImmediatePropagation();
            chooseProfilePhotoSource(sourceButton.dataset.photoSource);
            return;
          }
          if (target.closest("[data-photo-source-close]")) {
            event.preventDefault();
            event.stopImmediatePropagation();
            closeProfilePhotoSourceSheet();
            return;
          }
          if (target.closest("[data-photo-camera-cancel]")) {
            event.preventDefault();
            event.stopImmediatePropagation();
            closeProfilePhotoCamera();
            return;
          }
          if (target.closest("[data-photo-camera-capture]")) {
            event.preventDefault();
            event.stopImmediatePropagation();
            captureProfilePhotoCamera();
            return;
          }
          if (target.closest("[data-photo-crop-change]")) {
            event.preventDefault();
            event.stopImmediatePropagation();
            openProfilePhotoSourceSheet();
            return;
          }
          if (target.closest("[data-photo-crop-cancel]")) {
            event.preventDefault();
            event.stopImmediatePropagation();
            setModalOpen(photoCropModal, false);
            return;
          }
          if (target.closest("[data-photo-crop-apply]")) {
            event.preventDefault();
            event.stopImmediatePropagation();
            applyPhotoCropEditor();
            return;
          }
          if (target === photoSourceSheet) {
            event.preventDefault();
            event.stopImmediatePropagation();
            closeProfilePhotoSourceSheet();
            return;
          }
          if (target === photoCameraSheet) {
            event.preventDefault();
            event.stopImmediatePropagation();
            closeProfilePhotoCamera();
            return;
          }
          if (target === photoCropModal) {
            event.preventDefault();
            event.stopImmediatePropagation();
            setModalOpen(photoCropModal, false);
          }
        }
        document.addEventListener("click", handleProfilePhotoClick, true);
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
            button.innerHTML = '<strong>' + escapeHtml(shortLocation(item.address)) + '</strong><small>' + escapeHtml(item.address) + '</small>';
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
            if (requestId !== suggestionRequestId || placeInput.value.trim() !== query) return;
            renderPlaceSuggestions(suggestions, suggestions.length ? "" : "No matching locations found yet. Try a postcode, road, or town.");
          }, 280);
        }
        function setActivePlaceLabel(label) {
          activePlaceLabel = label || "Home";
          placeTabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.profilePlaceTab === activePlaceLabel));
        }
        function setProfileRadius(radius, shouldSave) {
          draftRadius = cleanRadius(radius);
          radiusButtons.concat(formRadiusButtons).forEach((button) => button.classList.toggle("is-active", Number(button.dataset.radius) === draftRadius));
          if (shouldSave) saveProfileLocation({ status: "Distance radius set to " + draftRadius + (draftRadius === 1 ? " mile." : " miles.") });
        }
        function openLocationForm(place) {
          editingPlaceId = place ? place.id : "";
          setActivePlaceLabel(place ? place.label : "Home");
          placeInput.value = place ? place.address : "";
          selectedPlaceSuggestion = null;
          hidePlaceSuggestions();
          setProfileRadius(place ? place.radius : draftRadius, false);
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
          setProfileRadius(draftRadius, false);
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
        function renderProfileLocationPopup() {
          draftLocation = { ...readJson("emyAskLocation", {}) };
          draftRadius = cleanRadius(draftLocation.radius || draftRadius);
          profilePlaces = readSavedPlaces();
          const currentLabel = shortLocation(draftLocation.location || draftLocation.locationLabel || "Current Location");
          const usingCurrent = draftLocation.locationSource === "current" || !draftLocation.location || draftLocation.location === "Near me" || draftLocation.location === "Current Location";
          if (locationTitle) locationTitle.textContent = usingCurrent ? "Using Current Location" : "Use Current Location";
          if (locationDetail) locationDetail.textContent = usingCurrent ? "Within " + draftRadius + (draftRadius === 1 ? " mile" : " miles") + " of " + currentLabel + "." : "Detect your position for nearby businesses and posts.";
          if (currentRadius) currentRadius.hidden = !usingCurrent;
          if (locationRadiusValue) locationRadiusValue.textContent = draftRadius + (draftRadius === 1 ? " mile" : " miles");
          if (locationCurrentButton) {
            locationCurrentButton.classList.toggle("is-selected", usingCurrent);
            locationCurrentButton.setAttribute("aria-pressed", usingCurrent ? "true" : "false");
          }
          setProfileRadius(draftRadius, false);
          profileLocationOptions = profilePlaces;
          if (locationEmpty) locationEmpty.hidden = profilePlaces.length > 0;
          if (!locationList) return;
          locationList.innerHTML = profileLocationOptions.map((place, index) => {
            const isActive = shortLocation(draftLocation.location || draftLocation.locationLabel) === shortLocation(place.address);
            return '<div class="place-card' + (isActive ? " is-selected" : "") + '">' +
              '<button class="place-main" type="button" data-profile-place="' + index + '">' +
                '<strong>' + escapeHtml(place.label) + '</strong>' +
                '<span>' + escapeHtml(place.address) + '</span>' +
              '</button>' +
              '<div class="place-tools">' +
                '<button class="place-check" type="button" data-profile-place="' + index + '" aria-label="Use ' + escapeHtml(place.label) + ' location"></button>' +
                '<button type="button" data-edit-profile-place="' + index + '">Edit</button>' +
                '<button type="button" data-delete-profile-place="' + index + '">Delete</button>' +
              '</div>' +
            '</div>';
          }).join("");
        }
        function saveProfileLocation(options = {}) {
          const savedLocations = readSavedPlaces().map((place) => place.address).filter(Boolean);
          const address = String(draftLocation.location || draftLocation.locationLabel || "Near me");
          try {
            localStorage.setItem("emyAskLocation", JSON.stringify({
              location: address,
              radius: draftRadius,
              savedLocations,
              latitude: Number.isFinite(Number(draftLocation.latitude)) ? Number(draftLocation.latitude) : null,
              longitude: Number.isFinite(Number(draftLocation.longitude)) ? Number(draftLocation.longitude) : null,
              locationLabel: shortLocation(address),
              locationSource: draftLocation.locationSource || "saved"
            }));
          } catch (error) {}
          renderProfile();
          if (options.status && locationStatus) locationStatus.textContent = options.status;
          if (options.close) {
            if (locationForm && locationForm.classList.contains("is-open")) closeLocationForm();
            setModalOpen(locationModal, false);
          }
        }
        function useCurrentProfileLocation() {
          locationStatus.textContent = "Finding your current location...";
          draftLocation = { location: "Near me", locationLabel: "Current Location", latitude: null, longitude: null, radius: draftRadius, locationSource: "current" };
          saveProfileLocation();
          renderProfileLocationPopup();
          if (!navigator.geolocation) {
            locationStatus.textContent = "Current location is not available in this browser.";
            return;
          }
          navigator.geolocation.getCurrentPosition(async (position) => {
            const foundAddress = await reverseLookup(position.coords.latitude, position.coords.longitude);
            const address = foundAddress || "Near me";
            draftLocation = {
              location: address,
              locationLabel: shortLocation(address),
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              radius: draftRadius,
              locationSource: "current"
            };
            saveProfileLocation({ status: foundAddress ? "Current location saved." : "Current location saved. Address lookup will connect through the location backend." });
            renderProfileLocationPopup();
          }, () => {
            draftLocation = { location: "Near me", locationLabel: "Current Location", latitude: null, longitude: null, radius: draftRadius, locationSource: "current" };
            saveProfileLocation({ status: "Location permission was not allowed. You can add an address manually." });
            renderProfileLocationPopup();
          }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 });
        }
        function deleteProfilePlace(place) {
          profilePlaces = readSavedPlaces().filter((item) => String(item.id) !== String(place.id) && String(item.address || "") !== String(place.address || ""));
          savePlaces();
          if (shortLocation(draftLocation.location || draftLocation.locationLabel) === shortLocation(place.address)) {
            draftLocation = { ...readJson("emyAskLocation", {}), locationSource: "current" };
            saveProfileLocation({ status: "Current location saved." });
          }
          renderProfileLocationPopup();
          renderProfile();
        }
        function selectProfilePlace(place) {
          draftLocation = {
            location: place.address,
            locationLabel: shortLocation(place.address),
            latitude: Number.isFinite(Number(place.latitude)) ? Number(place.latitude) : null,
            longitude: Number.isFinite(Number(place.longitude)) ? Number(place.longitude) : null,
            radius: cleanRadius(place.radius),
            locationSource: "saved"
          };
          draftRadius = cleanRadius(place.radius);
          saveProfileLocation({ close: true });
        }
        function renderSelectedCustomerPreviewPhoto() {
          const selected = selectedCustomerPreviewContext();
          if (!selected) return;
          const initial = (selected.name.trim()[0] || "C").toUpperCase();
          profilePreviewPhotos.forEach((node) => {
            if (!node) return;
            node.innerHTML = initial;
            if (!selected.photo && !selected.photoRef) return;
            const image = document.createElement("img");
            image.alt = "Customer profile picture";
            if (selected.photo) image.src = selected.photo;
            if (selected.photoRef) image.setAttribute("data-emy-media-ref", selected.photoRef);
            node.innerHTML = "";
            node.appendChild(image);
          });
          if (selected.photoRef && window.emyHydrateFeedMedia) {
            profilePreviewPhotos.forEach((node) => { if (node) window.emyHydrateFeedMedia(node); });
          }
        }
        const customerProfileStoryRingStorageKeys = ["emyFeedCreatedClips", "emyFeedCreatedPosts", "emyCustomerClips", "emyCustomerReels", "emyCreatedClips"];
        function readCustomerProfileStoryRows(storageKey) {
          try {
            const parsed = JSON.parse(localStorage.getItem(storageKey) || "[]");
            if (Array.isArray(parsed)) return parsed;
            return parsed && typeof parsed === "object" ? Object.values(parsed) : [];
          } catch (error) {
            return [];
          }
        }
        function customerProfileStoryClipIsVisible(item) {
          if (!item || typeof item !== "object") return false;
          if (item.deleted || item.deletedAt || item.hidden || item.archived || item.isPublished === false || item.isLive === false) return false;
          const status = String(item.status || item.publishStatus || item.visibility || "").trim().toLowerCase();
          return !["deleted", "hidden", "archived", "draft", "inactive", "offline", "rejected", "paused", "unpublished"].includes(status);
        }
        function customerProfileStoryClipBelongsToCustomer(item, storageKey) {
          if (!item || typeof item !== "object") return false;
          const roleMarker = String([item.owner, item.createdAs, item.accountType, item.actorType, item.role, item.authorRole, item.source, item.createdFrom].filter(Boolean).join(" ")).toLowerCase();
          if (/\bbusiness\b|business-create/.test(roleMarker)) return false;
          if (storageKey === "emyFeedCreatedClips" && !/\bcustomer\b|customer-create/.test(roleMarker)) {
            const keyMarker = String([item.businessKey, item.key, item.profileKey].filter(Boolean).join(" ")).toLowerCase();
            if (keyMarker && keyMarker !== "customer-profile") return false;
          }
          return true;
        }
        function customerProfileStoryRowLooksClip(item, storageKey) {
          if (!item || typeof item !== "object") return false;
          if (/clips|reels/i.test(storageKey || "")) return true;
          const marker = String([item.kind, item.type, item.createType, item.postMode, item.tag, item.clipKind, item.reelKind, item.clipType, item.reelType, item.mediaKind, item.uploadType, item.contentType].filter(Boolean).join(" ")).toLowerCase();
          return /clip|reel/.test(marker);
        }
        function customerProfileHasUploadedStoryClip() {
          return customerProfileStoryRingStorageKeys.some((storageKey) => readCustomerProfileStoryRows(storageKey).some((item) => (
            customerProfileStoryClipIsVisible(item)
            && customerProfileStoryClipBelongsToCustomer(item, storageKey)
            && customerProfileStoryRowLooksClip(item, storageKey)
          )));
        }
        function syncCustomerProfileClipStoryRing() {
          const hasStoryClip = customerProfileHasUploadedStoryClip();
          document.documentElement.classList.toggle("emy-customer-has-story-clip", hasStoryClip);
          avatarNodes.concat(profilePhotoPreview ? [profilePhotoPreview] : []).forEach((node) => {
            if (!node) return;
            node.classList.toggle("emy-story-ring", hasStoryClip);
            node.dataset.emyStoryRing = hasStoryClip ? "clip" : "";
            if (hasStoryClip) node.setAttribute("title", node.getAttribute("title") || "Profile clips available");
            else if (node.getAttribute("title") === "Profile clips available") node.removeAttribute("title");
          });
        }
        function renderPhoto() {
          const photo = currentProfilePhotoSrc();
          const photoRef = currentProfilePhotoRef();
          const crop = currentProfilePhotoCrop();
          avatarNodes.forEach((node) => {
            if (!node) return;
            node.innerHTML = profileCustomerInitial();
            if (!photo && !photoRef) return;
            const image = document.createElement("img");
            image.alt = "Customer profile picture";
            if (photo) image.src = photo;
            if (photoRef) image.setAttribute("data-emy-media-ref", photoRef);
            node.innerHTML = "";
            node.appendChild(image);
            applyCropStyle(image, crop);
          });
          if (photoRef && window.emyHydrateFeedMedia) {
            avatarNodes.forEach((node) => { if (node) window.emyHydrateFeedMedia(node); });
          }
          renderSelectedCustomerPreviewPhoto();
          syncCustomerProfileClipStoryRing();
          syncRenderedProfilePhotoAliases();
        }
        function renderProfile(options) {
          const renderOptions = options || {};
          const askLocation = readJson("emyAskLocation", {});
          const fullLocationText = String(askLocation.location || askLocation.locationLabel || "Current Location").trim() || "Current Location";
          const locationText = headerLocationText(fullLocationText);
          const firstNameNode = document.querySelector("[data-first-name]");
          if (firstNameNode) firstNameNode.textContent = profileName.split(" ")[0] || "Stephane";
          document.querySelector("[data-name]").textContent = profileName;
          document.querySelector("[data-email]").textContent = profileEmail || "Customer account";
          const headerLocationButton = document.querySelector("[data-location]");
          const headerLocationLabel = document.querySelector("[data-location-label]");
          if (headerLocationButton && headerLocationLabel) {
            headerLocationLabel.textContent = locationText;
            headerLocationButton.title = fullLocationText;
          }
          document.querySelector("[data-location-line]").textContent = locationText;
          const firstNameDetail = document.querySelector("[data-detail-first-name]");
          const lastNameDetail = document.querySelector("[data-detail-last-name]");
          const phoneDetail = document.querySelector("[data-detail-phone]");
          const visibilityDetail = document.querySelector("[data-detail-visibility]");
          const locationDetailNode = document.querySelector("[data-detail-location]");
          if (firstNameDetail) firstNameDetail.textContent = profileCustomerFirstName() || "Not set";
          if (lastNameDetail) lastNameDetail.textContent = profileCustomerLastName() || "Not set";
          document.querySelector("[data-detail-name]").textContent = profileName;
          if (phoneDetail) phoneDetail.textContent = profilePhoneValue() || "Not set";
          document.querySelector("[data-detail-email]").textContent = profileEmail || "Not set";
          if (visibilityDetail) visibilityDetail.textContent = customerProfileVisibility() === "public" ? "Public" : "Private";
          if (locationDetailNode) locationDetailNode.textContent = fullLocationText || "Current Location";
          document.querySelector("[data-detail-radius]").textContent = (Number(askLocation.radius) || 5) + " miles";
          const aboutNode = document.querySelector("[data-detail-about]");
          const socialNode = document.querySelector("[data-detail-socials]");
          const interestsNode = document.querySelector("[data-detail-interests]");
          const about = readCustomerAbout();
          const socialLinks = readCustomerSocialLinks();
          const visibleSocials = Object.keys(socialLinks).filter((key) => socialLinks[key] && socialLinks[key].url && socialLinks[key].visible).map((key) => profileSocialLabel(key) + " " + profileText(socialLinks[key].display, ""));
          const interests = readCustomerInterests();
          if (aboutNode) aboutNode.textContent = about || "Not set";
          if (socialNode) socialNode.textContent = visibleSocials.length ? visibleSocials.join(", ") : "Not set";
          if (interestsNode) interestsNode.textContent = interests.length ? interests.join(", ") : "Not set";
          if (renderOptions.preview !== false) renderBusinessProfilePreview();
          const notifications = readNotifications();
          if (notificationCount) {
            const unreadCount = notifications.filter((item) => item.unread).length;
            notificationCount.textContent = String(unreadCount);
            notificationCount.setAttribute("aria-label", unreadCount + " unread notifications");
          }
          const places = readJson("emyCustomerSavedPlaces", []);
          const list = document.querySelector("[data-saved-locations]");
          const rows = Array.isArray(places) && places.length ? places : [{ label:"Current Location", address: locationText }];
          if (list) list.innerHTML = rows.map((place) => '<div class="place"><strong>' + String(place.label || "Home") + '</strong><span>' + String(place.address || locationText) + '</span></div>').join("");
          renderProfileShortcuts();
          syncRenderedProfilePhotoAliases();
        }
        window.addEventListener("load", syncRenderedProfilePhotoAliases);
        window.addEventListener("emy:customer-profile-updated", syncRenderedProfilePhotoAliases);
        ["load", "emy:created-posts-changed", "emy:business-clips-changed", "emy:customer-upload-updated", "emy:central-storage-synced", "emy:shared-port-content-ready"].forEach((eventName) => {
          window.addEventListener(eventName, () => window.setTimeout(syncCustomerProfileClipStoryRing, 0));
        });
        window.addEventListener("storage", (event) => {
          if (!event || customerProfileStoryRingStorageKeys.indexOf(event.key) >= 0) syncCustomerProfileClipStoryRing();
        });
        window.setTimeout(syncRenderedProfilePhotoAliases, 0);
        window.setTimeout(syncCustomerProfileClipStoryRing, 250);
        document.querySelector("[data-change-photo]").addEventListener("click", openProfilePhotoSourceSheet);
        if (photoSourceClose) photoSourceClose.addEventListener("click", closeProfilePhotoSourceSheet);
        photoSourceButtons.forEach((button) => {
          button.addEventListener("click", () => chooseProfilePhotoSource(button.dataset.photoSource));
        });
        if (photoSourceSheet) {
          photoSourceSheet.addEventListener("click", (event) => {
            if (event.target === photoSourceSheet) closeProfilePhotoSourceSheet();
          });
        }
        if (photoCameraCancel) photoCameraCancel.addEventListener("click", closeProfilePhotoCamera);
        if (photoCameraCapture) photoCameraCapture.addEventListener("click", captureProfilePhotoCamera);
        if (photoCameraSheet) {
          photoCameraSheet.addEventListener("click", (event) => {
            if (event.target === photoCameraSheet) closeProfilePhotoCamera();
          });
        }
        window.addEventListener("beforeunload", stopProfilePhotoCamera);
        if (profilePreviewOpen) profilePreviewOpen.addEventListener("click", openBusinessProfilePreview);
        function stopPublicActivityMenuScrollWatch() {
          if (publicActivityMenuScrollFrame) cancelAnimationFrame(publicActivityMenuScrollFrame);
          publicActivityMenuScrollFrame = 0;
        }
        function publicActivityCloseMenus(exceptMenu) {
          stopPublicActivityMenuScrollWatch();
          if (!publicActivityTrack) return;
          publicActivityTrack.querySelectorAll("[data-public-activity-menu]").forEach((menu) => {
            if (menu === exceptMenu) return;
            menu.hidden = true;
            menu.style.position = "";
            menu.style.top = "";
            menu.style.left = "";
            menu.style.right = "";
            menu.style.zIndex = "";
            const card = menu.closest(".customer-public-activity-item");
            if (card) card.classList.remove("is-menu-open");
            const button = card && card.querySelector("[data-public-activity-more]");
            if (button) button.setAttribute("aria-expanded", "false");
          });
        }
        function positionPublicActivityMenu(menu, button) {
          if (!menu || !button) return;
          const width = Math.min(218, Math.max(180, window.innerWidth - 20));
          const rect = button.getBoundingClientRect();
          const gap = 6;
          const left = Math.max(10, Math.min(window.innerWidth - width - 10, rect.right - width));
          const belowTop = rect.bottom + gap;
          const menuHeight = Math.min(220, menu.scrollHeight || 180);
          const top = belowTop + menuHeight > window.innerHeight - 10 ? Math.max(10, rect.top - menuHeight - gap) : belowTop;
          menu.style.position = "fixed";
          menu.style.top = Math.round(top) + "px";
          menu.style.left = Math.round(left) + "px";
          menu.style.right = "auto";
          menu.style.zIndex = "10020";
        }
        function startPublicActivityMenuScrollWatch() {
          stopPublicActivityMenuScrollWatch();
          publicActivityMenuScrollX = window.scrollX || 0;
          publicActivityMenuScrollY = window.scrollY || 0;
          const tick = () => {
            const moved = Math.abs((window.scrollX || 0) - publicActivityMenuScrollX) > 1 || Math.abs((window.scrollY || 0) - publicActivityMenuScrollY) > 1;
            if (moved) {
              publicActivityCloseMenus();
              return;
            }
            publicActivityMenuScrollFrame = requestAnimationFrame(tick);
          };
          publicActivityMenuScrollFrame = requestAnimationFrame(tick);
        }
        function publicActivitySetText(card, selector, value) {
          const node = card && card.querySelector(selector);
          if (node) {
            const count = publicActivityCountFromValue(value);
            node.dataset.rawCount = String(count);
            node.textContent = publicActivityFormatCount(count);
          }
        }
        function publicActivityCommentCount(card) {
          const node = card && card.querySelector("[data-public-comment-count]");
          return publicActivityCountFromValue(node && (node.dataset.rawCount || node.textContent));
        }
        function publicActivitySyncCommentLabel(card) {
          const label = card && card.querySelector("[data-public-comment-label]");
          if (!label) return;
          const count = publicActivityCommentCount(card);
          label.textContent = card.classList.contains("is-comments-open") ? "Close comments" : count ? profilePlural(count, "comment") : "Add a comment";
        }
        function publicActivityCardFromEvent(event) {
          return event && event.target && event.target.closest ? event.target.closest(".customer-public-activity-item[data-public-activity-id]") : null;
        }
        function publicActivityCopyLink(card) {
          const id = card && card.dataset.publicActivityId || "";
          const link = window.location.href.split("#")[0] + (id ? "#customer-post-" + encodeURIComponent(id) : "");
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(link).catch(() => {});
          }
          showToast("Post link copied.");
        }
        function publicActivitySavedFeedRecord(card) {
          return {
            id: card && card.dataset.feedId || "",
            kind: card && card.dataset.detailKind || "Feed",
            title: card && card.dataset.detailTitle || "Feed update",
            business: card && card.dataset.detailBusiness || publicActivityCustomerName(),
            href: "emy-customer-home.html#feeds",
            savedAt: new Date().toISOString()
          };
        }
        function publicActivitySetSavedFeedItem(card, active) {
          try {
            let saved = JSON.parse(localStorage.getItem("emySavedFeedItems") || "{}");
            if (!saved || typeof saved !== "object" || Array.isArray(saved)) saved = {};
            const record = publicActivitySavedFeedRecord(card);
            if (!record.id) return;
            if (active) saved[record.id] = record;
            else delete saved[record.id];
            localStorage.setItem("emySavedFeedItems", JSON.stringify(saved));
          } catch (error) {}
        }
        function publicActivityReadReposts() {
          const items = readJson("emyFeedReposts", []);
          return Array.isArray(items) ? items : [];
        }
        function publicActivityWriteReposts(items) {
          try {
            localStorage.setItem("emyFeedReposts", JSON.stringify(Array.isArray(items) ? items : []));
            window.dispatchEvent(new CustomEvent("emy:feed-reposts-changed", { detail: { key: "emyFeedReposts" } }));
          } catch (error) {}
        }
        function publicActivityRepostOriginalIdFromCard(card) {
          const quote = card && card.querySelector(".social-feed-quote[data-card]");
          return quote && (quote.dataset.originalFeedId || quote.dataset.feedId) || card && (card.dataset.repostOriginalId || card.dataset.originalFeedId || card.dataset.feedId) || "";
        }
        function publicActivityRepostRecordFromCard(card) {
          const source = card && card.querySelector(".social-feed-quote[data-card]") || card;
          const originalId = publicActivityRepostOriginalIdFromCard(card);
          if (!card || !source || !originalId) return null;
          return {
            id: "repost-" + originalId + "-" + Date.now(),
            originalId,
            repostedAt: new Date().toISOString(),
            repostedBy: publicActivityCustomerName(),
            thought: "",
            original: {
              id: originalId,
              key: source.dataset.businessKey || "",
              business: source.dataset.detailBusiness || card.dataset.detailBusiness || publicActivityCustomerName(),
              kind: source.dataset.detailKind || card.dataset.detailKind || "Post",
              title: source.dataset.detailTitle || card.dataset.detailTitle || "Feed update",
              text: source.dataset.detailDescription || card.dataset.detailDescription || "",
              media: source.dataset.detailMedia || card.dataset.detailMedia || "feed",
              mediaSrc: source.dataset.detailMediaSrc || card.dataset.detailMediaSrc || "",
              mediaRef: source.dataset.detailMediaRef || card.dataset.detailMediaRef || "",
              mediaType: source.dataset.detailMediaType || card.dataset.detailMediaType || "",
              posterSrc: source.dataset.detailPosterSrc || card.dataset.detailPosterSrc || "",
              posterRef: source.dataset.detailPosterRef || card.dataset.detailPosterRef || "",
              duration: source.dataset.detailDuration || card.dataset.detailDuration || "",
              articleBody: source.dataset.articleBody || card.dataset.articleBody || "",
              articleShare: source.dataset.articleShare || card.dataset.articleShare || "",
              articleReadTime: source.dataset.articleReadTime || card.dataset.articleReadTime || "",
              price: source.dataset.detailPrice || card.dataset.detailPrice || "",
              meta: source.dataset.detailMeta || card.dataset.detailMeta || "",
              href: "emy-customer-home.html#feeds"
            }
          };
        }
        function publicActivitySetRepostRecord(card, active) {
          const originalId = publicActivityRepostOriginalIdFromCard(card);
          if (!originalId) return publicActivityCountFromValue(card && card.querySelector("[data-public-repost-count]") && card.querySelector("[data-public-repost-count]").textContent);
          const withoutCurrent = publicActivityReadReposts().filter((item) => {
            const itemOriginal = item && (item.originalId || item.originalFeedId || item.feedId || (item.original && item.original.id)) || "";
            return itemOriginal !== originalId;
          });
          if (active) {
            const record = publicActivityRepostRecordFromCard(card);
            if (record) withoutCurrent.unshift(record);
          }
          publicActivityWriteReposts(withoutCurrent.slice(0, 60));
          return withoutCurrent.filter((item) => {
            const itemOriginal = item && (item.originalId || item.originalFeedId || item.feedId || (item.original && item.original.id)) || "";
            return itemOriginal === originalId;
          }).length;
        }
        function publicActivityOpenCard(card) {
          if (!card) return;
          if (window.emyOpenItemDetail && window.emyOpenItemDetail(card)) return;
          const category = card.dataset.publicActivityCategory || "all";
          window.location.href = publicActivitySearchHref(category);
        }
        publicActivityTabs.forEach((button) => {
          button.addEventListener("click", () => {
            if (button.disabled) return;
            publicActivityCategory = button.dataset.publicActivityCategory || "all";
            renderCustomerPublicActivity();
          });
        });
        if (publicActivitySearch) {
          publicActivitySearch.addEventListener("input", () => {
            publicActivityQuery = profileText(publicActivitySearch.value, "");
            renderCustomerPublicActivity();
          });
        }
        publicActivityArrows.forEach((button) => {
          button.addEventListener("click", () => {
            if (!publicActivityTrack || button.disabled || button.hidden) return;
            const direction = button.dataset.publicActivityArrow === "prev" ? -1 : 1;
            publicActivityTrack.scrollBy({ left: direction * Math.max(240, publicActivityTrack.clientWidth * 0.82), behavior: "smooth" });
            window.setTimeout(syncPublicActivityArrows, 360);
          });
        });
        profilePreviewBusinessScrollButtons.forEach((button) => {
          button.addEventListener("click", () => {
            const wrapper = button.closest(".profile-customer-businesses");
            const track = wrapper && wrapper.querySelector("[data-profile-preview-businesses]");
            if (!track || button.disabled || button.hidden) return;
            const direction = button.dataset.profileBusinessScroll === "prev" ? -1 : 1;
            track.scrollBy({ left: direction * Math.max(250, track.clientWidth * 0.72), behavior: "smooth" });
            window.setTimeout(() => syncProfileBusinessScroller(wrapper), 360);
          });
        });
        profilePreviewProductRangeButtons.forEach((button) => {
          button.addEventListener("click", () => {
            const nextRange = button.dataset.profileProductRange || "all";
            if (nextRange === profilePreviewProductRange) return;
            profilePreviewProductRange = nextRange;
            renderBusinessRelationshipPreview();
          });
        });
        function closePreviewProductVisitMenus(exceptMenu) {
          profilePreviewProductLists.forEach((list) => {
            list.querySelectorAll("[data-profile-product-menu]").forEach((menu) => {
              if (menu === exceptMenu) return;
              menu.hidden = true;
              const card = menu.closest(".profile-customer-product");
              if (card) card.classList.remove("is-menu-open");
              const button = card && card.querySelector("[data-profile-product-more]");
              if (button) button.setAttribute("aria-expanded", "false");
            });
          });
        }
        function copyPreviewProductVisitLink(card) {
          const id = card && (card.dataset.feedId || card.dataset.detailTitle) || "";
          const link = window.location.href.split("#")[0] + (id ? "#visited-product-" + encodeURIComponent(id) : "");
          if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(link).catch(() => {});
          showToast("Product link copied.");
        }
        profilePreviewProductLists.forEach((list) => {
          list.addEventListener("click", (event) => {
            const card = event.target.closest(".profile-customer-product");
            const moreButton = event.target.closest("[data-profile-product-more]");
            if (moreButton && card) {
              event.preventDefault();
              event.stopPropagation();
              const menu = card.querySelector("[data-profile-product-menu]");
              const open = !(menu && !menu.hidden);
              closePreviewProductVisitMenus(menu);
              if (menu) menu.hidden = !open;
              card.classList.toggle("is-menu-open", open);
              moreButton.setAttribute("aria-expanded", open ? "true" : "false");
              return;
            }
            const menuAction = event.target.closest("[data-profile-product-menu-action]");
            if (menuAction && card) {
              event.preventDefault();
              event.stopPropagation();
              closePreviewProductVisitMenus();
              const action = menuAction.dataset.profileProductMenuAction;
              if (action === "view") {
                if (window.emyOpenItemDetail && window.emyOpenItemDetail(card)) return;
                showToast("Product details are available from the product card.");
                return;
              }
              if (action === "copy") {
                copyPreviewProductVisitLink(card);
                return;
              }
              if (action === "report") showToast("Product reported.");
            }
          });
        });
        document.addEventListener("click", (event) => {
          if (!event.target.closest("[data-profile-product-more], [data-profile-product-menu]")) closePreviewProductVisitMenus();
        });
        profilePreviewBusinessLists.forEach((track) => {
          track.addEventListener("scroll", () => {
            const wrapper = track.closest(".profile-customer-businesses");
            window.requestAnimationFrame(() => syncProfileBusinessScroller(wrapper));
          }, { passive: true });
          track.addEventListener("click", (event) => {
            const link = event.target.closest("[data-profile-business-link]");
            if (!link) return;
            const key = profileText(link.dataset.profileBusinessLink || link.dataset.businessLink, "");
            const name = profileText(link.dataset.profileBusinessName, "");
            try {
              if (key) localStorage.setItem("emyCustomerChatOpenKey", key);
              if (key) localStorage.setItem("emySelectedBusinessProfileKey", key);
              if (name) localStorage.setItem("emySelectedBusinessProfileName", name);
            } catch (error) {}
          });
        });
        window.addEventListener("resize", syncProfileBusinessScrollers);
        if (publicActivityTrack) {
          publicActivityTrack.addEventListener("click", (event) => {
            const card = publicActivityCardFromEvent(event);
            const moreButton = event.target.closest("[data-public-activity-more]");
            if (moreButton && card) {
              event.preventDefault();
              const menu = card.querySelector("[data-public-activity-menu]");
              const open = !(menu && !menu.hidden);
              publicActivityCloseMenus(menu);
              if (menu) menu.hidden = !open;
              card.classList.toggle("is-menu-open", open);
              if (open) {
                positionPublicActivityMenu(menu, moreButton);
                startPublicActivityMenuScrollWatch();
              }
              moreButton.setAttribute("aria-expanded", open ? "true" : "false");
              return;
            }
            const menuAction = event.target.closest("[data-public-activity-menu-action]");
            if (menuAction && card) {
              event.preventDefault();
              publicActivityCloseMenus();
              const action = menuAction.dataset.publicActivityMenuAction;
              if (window.emyEngagement && typeof window.emyEngagement.update === "function" && ["share", "repost"].includes(action)) {
                window.emyEngagement.update(card, action);
                if (action === "share" && typeof window.emyEngagement.shareCard === "function") window.emyEngagement.shareCard(card);
                return;
              }
              if (action === "view") {
                publicActivityOpenCard(card);
                return;
              }
              if (action === "hide") {
                card.hidden = true;
                showToast("Post hidden from this view.");
                syncPublicActivityArrows();
                return;
              }
              if (action === "repost") {
                const id = card.dataset.publicActivityId || "";
                const repostButton = card.querySelector('[data-public-activity-action="repost"]');
                const currentNode = card.querySelector("[data-public-repost-count]");
                const current = publicActivityCountFromValue(currentNode && (currentNode.dataset.rawCount || currentNode.textContent));
                const alreadyActive = !!(repostButton && repostButton.classList.contains("is-active"));
                const storedCount = publicActivitySetRepostRecord(card, true);
                const next = Math.max(storedCount, current + (alreadyActive ? 0 : 1));
                publicActivityUpdateState(id, { reposted: true, repostCount: next });
                if (repostButton) {
                  repostButton.classList.add("is-active");
                  repostButton.setAttribute("aria-pressed", "true");
                }
                publicActivitySetText(card, "[data-public-repost-count]", next);
                publicActivityNotifyCustomerOwner(card, "repost");
                showToast("Reposted to your feed.");
                return;
              }
              if (action === "share") {
                const currentNode = card.querySelector("[data-public-share-count]");
                const current = publicActivityCountFromValue(currentNode && (currentNode.dataset.rawCount || currentNode.textContent));
                const next = current + 1;
                publicActivityUpdateState(card.dataset.publicActivityId || "", { shareCount: next });
                publicActivitySetText(card, "[data-public-share-count]", next);
                publicActivityNotifyCustomerOwner(card, "share");
                publicActivityCopyLink(card);
                return;
              }
              if (action === "copy") {
                publicActivityCopyLink(card);
                return;
              }
              if (action === "report") showToast("Post reported.");
              return;
            }
            const actionButton = event.target.closest("[data-public-activity-action]");
            if (!actionButton || !card) {
              const openTarget = event.target.closest("[data-public-activity-open]");
              if (card && openTarget && !event.target.closest("button, a, input, textarea, select, label, video, [data-emy-video-player]")) {
                event.preventDefault();
                if (openTarget.classList && openTarget.classList.contains("social-feed-quote") && window.emyOpenItemDetail && window.emyOpenItemDetail(openTarget)) return;
                publicActivityOpenCard(card);
              }
              return;
            }
            event.preventDefault();
            const id = card.dataset.publicActivityId || "";
            const action = actionButton.dataset.publicActivityAction;
            if (window.emyEngagement && typeof window.emyEngagement.update === "function" && ["like", "save", "share", "repost"].includes(action)) {
              window.emyEngagement.update(card, action);
              if (action === "share" && typeof window.emyEngagement.shareCard === "function") window.emyEngagement.shareCard(card);
              return;
            }
            const state = publicActivityStateFor(id);
            if (action === "like") {
              const next = !(publicActivityActorActive(state.likedBy) || !!state.liked);
              const nextLikedBy = publicActivityListWithActor(state.likedBy, next);
              const nextCount = publicActivityPeopleCount(nextLikedBy);
              publicActivityUpdateState(id, { liked: false, likedBy: nextLikedBy, baseLikeCount: 0, countedLikeCount: nextCount, statText: publicActivityFormatCount(nextCount) + (nextCount === 1 ? " like" : " likes") });
              actionButton.classList.toggle("is-active", next);
              actionButton.setAttribute("aria-label", next ? "Liked" : "Like");
              actionButton.setAttribute("aria-pressed", next ? "true" : "false");
              publicActivitySetText(card, "[data-public-like-count]", nextCount);
              const stat = card.querySelector("[data-feed-stat]");
              if (stat) stat.textContent = publicActivityFormatCount(nextCount) + (nextCount === 1 ? " like" : " likes");
              if (next) publicActivityNotifyCustomerOwner(card, "like");
              return;
            }
            if (action === "comment") {
              const open = !card.classList.contains("is-comments-open");
              card.classList.toggle("is-comments-open", open);
              publicActivitySyncCommentLabel(card);
              const input = open ? card.querySelector("[data-public-comment-form] input") : null;
              if (input) input.focus();
              return;
            }
            if (action === "repost") {
              const next = !(publicActivityActorActive(state.repostedBy) || !!state.reposted);
              const storedCount = publicActivitySetRepostRecord(card, next);
              const nextRepostedBy = publicActivityListWithActor(state.repostedBy, next);
              const nextCount = Math.max(storedCount, publicActivityPeopleCount(nextRepostedBy));
              publicActivityUpdateState(id, { reposted: false, repostedBy: nextRepostedBy, baseRepostCount: 0, repostCount: nextCount });
              actionButton.classList.toggle("is-active", next);
              actionButton.setAttribute("aria-pressed", next ? "true" : "false");
              publicActivitySetText(card, "[data-public-repost-count]", nextCount);
              if (next) publicActivityNotifyCustomerOwner(card, "repost");
              showToast(next ? "Reposted to your feed." : "Repost removed.");
              return;
            }
            if (action === "share") {
              const nextShareEvents = publicActivityEventListWithActor(state.shareEvents);
              const nextSharedBy = publicActivityListWithActor(state.sharedBy, true);
              const next = nextShareEvents.length;
              publicActivityUpdateState(id, { shareEvents: nextShareEvents, sharedBy: nextSharedBy, shareCount: next });
              publicActivitySetText(card, "[data-public-share-count]", next);
              publicActivityNotifyCustomerOwner(card, "share");
              publicActivityCopyLink(card);
              return;
            }
            if (action === "save") {
              const next = !(publicActivityActorActive(state.savedBy) || !!state.saved);
              const nextSavedBy = publicActivityListWithActor(state.savedBy, next);
              const nextSavedCount = publicActivityPeopleCount(nextSavedBy);
              const savedCount = card.querySelector("[data-product-saved-count]");
              if (savedCount) {
                savedCount.dataset.rawCount = String(nextSavedCount);
                savedCount.textContent = publicActivityFormatCount(nextSavedCount);
              }
              publicActivityUpdateState(id, { saved: false, savedBy: nextSavedBy, baseSavedCount: 0, savedCount: nextSavedCount });
              publicActivitySetSavedFeedItem(card, next);
              actionButton.classList.toggle("is-active", next);
              actionButton.setAttribute("aria-label", next ? "Saved" : "Save");
              actionButton.setAttribute("aria-pressed", next ? "true" : "false");
              if (next) publicActivityNotifyCustomerOwner(card, "save");
              showToast(next ? "Post saved." : "Post removed from saved.");
            }
          });
          publicActivityTrack.addEventListener("submit", (event) => {
            const form = event.target.closest("[data-public-comment-form]");
            if (!form) return;
            event.preventDefault();
            const card = form.closest(".customer-public-activity-item[data-public-activity-id]");
            const input = form.querySelector("input");
            const text = profileText(input && input.value, "");
            if (!card || !input || !text) return;
            const id = card.dataset.publicActivityId || "";
            const state = publicActivityStateFor(id);
            const comments = Array.isArray(state.comments) ? state.comments.slice() : [];
            comments.push({ name: previewBusinessContext().name || "You", text, createdAt: new Date().toISOString() });
            publicActivityUpdateState(id, { comments });
            const list = card.querySelector("[data-public-comments-list]");
            if (list) list.insertAdjacentHTML("beforeend", publicActivityCommentHtml(comments[comments.length - 1]));
            publicActivitySetText(card, "[data-public-comment-count]", publicActivityCommentCount(card) + 1);
            card.classList.add("is-comments-open");
            publicActivitySyncCommentLabel(card);
            input.value = "";
            publicActivityNotifyCustomerOwner(card, "comment", publicActivityCurrentActorIdentity().name + " commented on your " + publicActivityCardItemLabel(card) + ": " + text);
            showToast("Comment added.");
          });
          publicActivityTrack.addEventListener("scroll", () => {
            publicActivityCloseMenus();
            if (publicActivityScrollFrame) cancelAnimationFrame(publicActivityScrollFrame);
            publicActivityScrollFrame = requestAnimationFrame(() => {
              publicActivityScrollFrame = 0;
              syncPublicActivityArrows();
            });
          }, { passive: true });
        }
        window.addEventListener("scroll", () => publicActivityCloseMenus(), { passive: true, capture: true });
        document.addEventListener("scroll", () => publicActivityCloseMenus(), { passive: true, capture: true });
        window.addEventListener("wheel", () => publicActivityCloseMenus(), { passive: true, capture: true });
        window.addEventListener("touchmove", () => publicActivityCloseMenus(), { passive: true, capture: true });
        window.addEventListener("resize", () => publicActivityCloseMenus(), { passive: true });
        document.addEventListener("click", (event) => {
          if (!event.target.closest("[data-public-activity-more], [data-public-activity-menu]")) publicActivityCloseMenus();
        });
        if (editPhotoButton) {
          editPhotoButton.addEventListener("click", () => {
            openPhotoCropEditor(currentProfilePhotoSrc(), currentProfilePhotoCrop(), currentProfilePhotoSrc(), currentProfilePhotoCrop());
          });
        }
        document.querySelector("[data-remove-photo]").addEventListener("click", () => {
          clearCurrentProfilePhotoEverywhere();
          photoDraftSrc = "";
          photoOriginalSrc = "";
          photoDraftCrop = defaultCrop();
          photoOriginalCrop = defaultCrop();
          setModalOpen(photoCropModal, false);
          renderPhoto();
          renderProfile();
          showToast("Profile photo removed.");
        });
        photoInput.addEventListener("change", () => {
          processProfilePhotoFile(photoInput.files && photoInput.files[0]);
          photoInput.value = "";
        });
        [photoCropZoom, photoCropX, photoCropY].forEach((control) => {
          if (control) control.addEventListener("input", updatePhotoCropPreview);
        });
        if (photoCropFrame) {
          photoCropFrame.addEventListener("pointerdown", beginPhotoCropDrag);
          photoCropFrame.addEventListener("pointermove", movePhotoCropDrag);
          photoCropFrame.addEventListener("pointerup", endPhotoCropDrag);
          photoCropFrame.addEventListener("pointercancel", endPhotoCropDrag);
          photoCropFrame.addEventListener("wheel", zoomPhotoCropFromWheel, { passive:false });
        }
        if (photoCropChange) {
          photoCropChange.addEventListener("click", () => {
            setModalOpen(photoCropModal, false);
            openProfilePhotoSourceSheet();
          });
        }
        if (photoCropCancel) photoCropCancel.addEventListener("click", () => setModalOpen(photoCropModal, false));
        if (photoCropApply) photoCropApply.addEventListener("click", applyPhotoCropEditor);
        if (photoCropModal) {
          photoCropModal.addEventListener("click", (event) => {
            if (event.target === photoCropModal) setModalOpen(photoCropModal, false);
          });
        }
        function openProfileLocationSelector() {
          renderProfileLocationPopup();
          setModalOpen(locationModal, true);
        }
        const profileHeaderLocation = document.querySelector("[data-location]");
        if (profileHeaderLocation) profileHeaderLocation.addEventListener("click", openProfileLocationSelector);
        document.querySelector("[data-edit-location]").addEventListener("click", openProfileLocationSelector);
        document.querySelectorAll("[data-close-profile-location]").forEach((button) => {
          button.addEventListener("click", () => setModalOpen(locationModal, false));
        });
        if (locationModal) {
          locationModal.addEventListener("click", (event) => {
            if (event.target === locationModal) setModalOpen(locationModal, false);
          });
        }
        radiusButtons.forEach((button) => {
          button.addEventListener("click", () => {
            setProfileRadius(button.dataset.radius, (draftLocation.locationSource || "current") === "current");
            renderProfileLocationPopup();
          });
        });
        formRadiusButtons.forEach((button) => {
          button.addEventListener("click", () => setProfileRadius(button.dataset.radius, false));
        });
        locationCurrentButton.addEventListener("click", useCurrentProfileLocation);
        locationAdd.addEventListener("click", () => {
          if (locationForm.classList.contains("is-open")) {
            closeLocationForm();
            return;
          }
          openLocationForm(null);
        });
        placeTabs.forEach((tab) => {
          tab.addEventListener("click", () => setActivePlaceLabel(tab.dataset.profilePlaceTab));
        });
        placeInput.addEventListener("input", schedulePlaceSuggestions);
        placeInput.addEventListener("keydown", (event) => {
          if (event.key === "Escape") hidePlaceSuggestions();
        });
        placeSuggestions.addEventListener("click", (event) => {
          const button = event.target.closest("[data-suggestion-index]");
          if (!button) return;
          const suggestion = currentPlaceSuggestions[Number(button.dataset.suggestionIndex)];
          if (!suggestion) return;
          selectedPlaceSuggestion = suggestion;
          placeInput.value = suggestion.address;
          hidePlaceSuggestions();
          locationStatus.textContent = "Location selected. Choose a distance radius, then submit.";
        });
        locationList.addEventListener("click", (event) => {
          const editButton = event.target.closest("[data-edit-profile-place]");
          if (editButton) {
            const placeToEdit = profileLocationOptions[Number(editButton.dataset.editProfilePlace)];
            if (placeToEdit) openLocationForm(placeToEdit);
            return;
          }
          const deleteButton = event.target.closest("[data-delete-profile-place]");
          if (deleteButton) {
            const placeToDelete = profileLocationOptions[Number(deleteButton.dataset.deleteProfilePlace)];
            if (placeToDelete) deleteProfilePlace(placeToDelete);
            return;
          }
          const button = event.target.closest("[data-profile-place]");
          if (!button) return;
          const place = profileLocationOptions[Number(button.dataset.profilePlace)];
          if (place) selectProfilePlace(place);
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
          const existingPlace = editingPlaceId ? profilePlaces.find((place) => place.id === editingPlaceId) : null;
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
            radius: draftRadius,
            latitude: geocoded ? geocoded.latitude : existingPlace.latitude,
            longitude: geocoded ? geocoded.longitude : existingPlace.longitude,
            resolvedAddress: geocoded ? geocoded.address : ""
          };
          profilePlaces = editingPlaceId
            ? profilePlaces.map((place) => place.id === editingPlaceId ? nextPlace : place)
            : [...profilePlaces, nextPlace];
          savePlaces();
          draftLocation = {
            location: address,
            locationLabel: shortLocation(address),
            latitude: nextPlace.latitude,
            longitude: nextPlace.longitude,
            radius: draftRadius,
            locationSource: "saved"
          };
          saveProfileLocation({ close: true });
        });
        profileRouteButtons.forEach((button) => {
          button.addEventListener("click", () => {
            setProfileView(button.dataset.profileRoute || "main");
          });
        });
        profileBackButtons.forEach((button) => {
          button.addEventListener("click", () => setProfileView("main"));
        });
        if (profileApplicationsList) {
          profileApplicationsList.addEventListener("click", (event) => {
            const button = event.target && event.target.closest ? event.target.closest("[data-profile-applications-more]") : null;
            if (!button) return;
            event.preventDefault();
            profileApplicationsVisibleCount += PROFILE_APPLICATION_BATCH_SIZE;
            renderProfileApplications();
          });
        }
        profilePreviewChatLinks.forEach((link) => {
          link.addEventListener("click", () => {
            const context = previewBusinessContext();
            try {
              localStorage.setItem("emyCustomerChatOpenKey", context.key);
              localStorage.setItem("emySelectedBusinessProfileName", context.name);
              localStorage.setItem("emyCustomerBusinessIntent", JSON.stringify({ businessKey: context.key, businessName: context.name, intent: "customer-profile-chat", at: new Date().toISOString() }));
            } catch (error) {}
          });
        });
        profilePrivateConnectButtons.forEach((button) => {
          button.addEventListener("click", () => {
            if (button.disabled || button.classList.contains("is-requested")) return;
            const context = previewBusinessContext();
            const key = profileSlug(button.dataset.profilePrivateBusinessKey || context.key || context.name || "business") || "business";
            const name = profileText(button.dataset.profilePrivateBusinessName || context.name, "this business");
            try {
              const customer = profileCustomerRelationshipIdentity();
              const now = new Date().toISOString();
              const stored = readJson("emyCustomerRelationshipRequests", {});
              const request = Object.assign({}, stored[key] || {}, {
                key,
                businessKey: key,
                name,
                business: name,
                customerKey: customer.key,
                profileKey: customer.key,
                customerName: customer.name,
                customerEmail: customer.email,
                category: context.category,
                avatar: context.avatar,
                logo: context.avatar,
                location: context.location,
                description: context.description,
                status: "pending",
                customerStatus: "pending",
                relationshipStatus: "pending",
                statusText: context.statusText,
                requestedAt: now,
                createdAt: stored[key] && stored[key].createdAt || now
              });
              stored[key] = request;
              saveCustomerRequests(stored);
              localStorage.setItem("emySelectedBusinessProfileName", name);
              localStorage.setItem("emyCustomerChatOpenKey", key);
              addCustomerRequestNotification(request);
              syncProfileRelationshipSurfaces("request", { key, businessKey:key, name, businessName:name, request });
            } catch (error) {}
            renderProfileRequests();
            renderProfileCustomers();
            renderProfileShortcuts();
            renderBusinessProfilePreview();
            showToast("Customer request sent to " + profileName + ".");
          });
        });
        if (profileRequestsList) {
          profileRequestsList.addEventListener("click", (event) => {
            const profileLink = event.target.closest("[data-profile-request-profile]");
            if (profileLink) {
              try {
                const key = profileText(profileLink.dataset.profileRequestKey, "");
                const name = profileText(profileLink.dataset.profileRequestName, "");
                if (key) localStorage.setItem("emySelectedBusinessProfileKey", key);
                if (name) localStorage.setItem("emySelectedBusinessProfileName", name);
              } catch (error) {}
              return;
            }
            const actionButton = event.target.closest("[data-profile-request-action]");
            if (!actionButton) return;
            updateCustomerRequest(actionButton.dataset.profileRequestAction, actionButton.dataset.profileRequestKey);
          });
        }
        if (profileCustomersList) {
          profileCustomersList.addEventListener("click", (event) => {
            const profileLink = event.target.closest("[data-profile-customer-profile]");
            if (profileLink) {
              try {
                const key = profileText(profileLink.dataset.profileCustomerKey, "");
                const name = profileText(profileLink.dataset.profileCustomerName, "");
                if (key) localStorage.setItem("emySelectedBusinessProfileKey", key);
                if (name) localStorage.setItem("emySelectedBusinessProfileName", name);
              } catch (error) {}
              return;
            }
            const actionButton = event.target.closest("[data-profile-customer-action]");
            if (!actionButton) return;
            if (actionButton.dataset.profileCustomerAction === "stop") stopCustomerBusiness(actionButton.dataset.profileCustomerKey);
          });
        }
        profileLinkButtons.forEach((button) => {
          button.addEventListener("click", () => {
            const target = button.dataset.profileLink;
            if (target === "notifications") {
              openNotificationSettings();
              return;
            }
            if (target === "logout") {
              profileLogout();
            }
          });
        });
        if (profileEventsList) {
          profileEventsList.addEventListener("click", (event) => {
            const reminderButton = event.target.closest("[data-profile-event-reminder]");
            if (!reminderButton) return;
            const id = reminderButton.dataset.profileEventReminder || "";
            const reminders = readEventReminders();
            const currentlyOn = reminderButton.getAttribute("aria-pressed") === "true";
            reminders[id] = { enabled: !currentlyOn, updatedAt: new Date().toISOString() };
            writeEventReminders(reminders);
            renderProfileEvents();
            renderProfileShortcuts();
            showToast(!currentlyOn ? "Event reminder turned on." : "Event reminder turned off.");
          });
        }
        const switchBusiness = document.querySelector("[data-switch-business]");
        if (switchBusiness) {
          switchBusiness.setAttribute("aria-pressed", "false");
          switchBusiness.addEventListener("click", () => {
            if (switchBusiness.classList.contains("is-switching")) return;
            const switchMode = switchBusiness.dataset.businessSwitchMode || "create";
            if (switchMode === "review") return;
            const creatingBusiness = switchMode === "create" || switchMode === "rejected";
            const target = creatingBusiness ? "emy-business-profile.html?setup=1" : "emy-business-profile.html?mode=business";
            switchBusiness.dataset.businessSwitchNavigating = "true";
            switchBusiness.classList.add("is-switching");
            switchBusiness.setAttribute("aria-pressed", "true");
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
        }
        if (sessionChangePhoto) {
          sessionChangePhoto.addEventListener("click", openProfilePhotoSourceSheet);
        }
        if (sessionEditLocation) {
          sessionEditLocation.addEventListener("click", openProfileLocationSelector);
        }
        sessionVisibilityButtons.forEach((button) => {
          button.addEventListener("click", () => {
            const nextVisibility = button.dataset.sessionVisibility || "private";
            window.__emyCustomerProfileVisibilityOverride = nextVisibility === "public" ? "public" : "private";
            syncSessionVisibilityButtons(nextVisibility);
            try {
              localStorage.setItem("emyCustomerProfileVisibility", nextVisibility);
              localStorage.setItem("emyMainPendingSignupPrivacy", nextVisibility);
            } catch (error) {}
            markCustomerProfileUpdated();
            renderSessionForm();
            renderProfile();
            renderBusinessProfilePreview();
            showToast(nextVisibility === "public" ? "Profile set to public." : "Profile set to private.");
          });
        });
        if (sessionCodeButton) {
          sessionCodeButton.addEventListener("click", () => {
            setCustomerDialMenuOpen(sessionCodeMenu ? sessionCodeMenu.hidden : true);
          });
          sessionCodeButton.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
              event.preventDefault();
              setCustomerDialMenuOpen(true);
              const firstOption = sessionCodeOptions ? Array.from(sessionCodeOptions.querySelectorAll("[data-session-code-option]")).find((button) => !button.hidden) : null;
              if (firstOption) firstOption.focus();
            }
            if (event.key === "Escape") setCustomerDialMenuOpen(false);
          });
        }
        if (sessionCodeSearch) {
          sessionCodeSearch.addEventListener("input", filterCustomerDialCountries);
          sessionCodeSearch.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              setCustomerDialMenuOpen(false);
              if (sessionCodeButton) sessionCodeButton.focus();
            }
            if (event.key === "ArrowDown") {
              const firstOption = sessionCodeOptions ? Array.from(sessionCodeOptions.querySelectorAll("[data-session-code-option]")).find((button) => !button.hidden) : null;
              if (firstOption) {
                event.preventDefault();
                firstOption.focus();
              }
            }
          });
        }
        if (sessionCodeOptions) {
          sessionCodeOptions.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              setCustomerDialMenuOpen(false);
              if (sessionCodeButton) sessionCodeButton.focus();
              return;
            }
            if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
            const visibleOptions = Array.from(sessionCodeOptions.querySelectorAll("[data-session-code-option]")).filter((button) => !button.hidden);
            const currentIndex = Math.max(0, visibleOptions.indexOf(document.activeElement));
            const nextIndex = event.key === "ArrowDown" ? Math.min(visibleOptions.length - 1, currentIndex + 1) : Math.max(0, currentIndex - 1);
            if (visibleOptions[nextIndex]) {
              event.preventDefault();
              visibleOptions[nextIndex].focus();
            }
          });
        }
        if (sessionCodeWidget) {
          document.addEventListener("click", (event) => {
            if (sessionCodeWidget.contains(event.target)) return;
            setCustomerDialMenuOpen(false);
          });
        }
        if (sessionPhone) {
          sessionPhone.addEventListener("beforeinput", (event) => {
            if (event.data && /[^0-9]/.test(event.data)) event.preventDefault();
          });
          sessionPhone.addEventListener("input", keepCustomerPhoneCharacters);
        }
        if (sessionForm) {
          sessionForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const nextFirst = customerProfileCleanStoredText(sessionFirst ? sessionFirst.value : "");
            const nextLast = customerProfileCleanStoredText(sessionLast ? sessionLast.value : "");
            const nextEmail = customerProfileCleanEmail(sessionEmail ? sessionEmail.value : "");
            const phoneParts = currentCustomerPhoneParts();
            const nextPhone = customerProfileCleanStoredText(sessionPhone ? sessionPhone.value : "");
            const nextPhoneDisplay = phoneParts.display || nextPhone;
            if (!nextFirst || !nextLast || !nextEmail || !phoneParts.localDigits) {
              showToast("Please complete your name, mobile number, and email.");
              return;
            }
            const repeatedPhoneDigit = phoneParts.localDigits.length > 0 && phoneParts.localDigits.split("").every((digit) => digit === phoneParts.localDigits.charAt(0));
            if (phoneParts.localDigits.length < 6 || phoneParts.fullDigits.length > 15 || repeatedPhoneDigit) {
              showToast("Please enter a real mobile number for the selected country code.");
              if (sessionPhone) sessionPhone.focus();
              return;
            }
            if (!validProfileEmail(nextEmail)) {
              showToast("Please enter a valid email address.");
              if (sessionEmail) sessionEmail.focus();
              return;
            }
            captureCustomerIdentityForPurge();
            profileName = (nextFirst + " " + nextLast).trim();
            profileEmail = nextEmail;
            try {
              localStorage.setItem("emyCustomerFirstName", nextFirst);
              localStorage.setItem("emyCustomerLastName", nextLast);
              localStorage.setItem("emyMainPendingSignupFirstName", nextFirst);
              localStorage.setItem("emyMainPendingSignupLastName", nextLast);
              localStorage.setItem("emyCustomerDisplayName", profileName);
              localStorage.setItem("emyMainSignedInEmail", nextEmail);
              localStorage.setItem("emyMainPendingSignupEmail", nextEmail);
              localStorage.setItem("emyCustomerPhone", nextPhoneDisplay);
              localStorage.setItem("emyMainPendingSignupPhone", nextPhoneDisplay);
              localStorage.setItem("emyCustomerPhonePrefix", phoneParts.prefix);
              localStorage.setItem("emyMainPendingSignupPhonePrefix", phoneParts.prefix);
              localStorage.setItem("emyCustomerPhoneCountry", phoneParts.countryIso);
              localStorage.setItem("emyMainPendingSignupPhoneCountry", phoneParts.countryIso);
              localStorage.setItem("emyCustomerPhoneCountryName", phoneParts.countryName);
              localStorage.setItem("emyMainPendingSignupPhoneCountryName", phoneParts.countryName);
              localStorage.setItem("emyCustomerPhoneLocal", phoneParts.localDigits);
              localStorage.setItem("emyMainPendingSignupPhoneLocal", phoneParts.localDigits);
              localStorage.removeItem("emyMainSignedOut");
              markCustomerProfileUpdated();
            } catch (error) {}
            renderProfile();
            renderPhoto();
            renderSessionForm();
            showToast("Profile session updated.");
          });
        }
        profileInterestButtons.forEach((button) => {
          button.addEventListener("click", () => {
            const active = !button.classList.contains("is-active");
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-pressed", active ? "true" : "false");
            updateProfileInterestSummary();
          });
        });
        if (profileExtraForm) {
          profileExtraForm.addEventListener("submit", (event) => {
            event.preventDefault();
            saveProfileExtras(true);
          });
        }
        settingsLinks.forEach((button) => {
          button.addEventListener("click", () => {
            const target = button.dataset.settingsLink;
            const routes = {
              terms: "terms.html",
              privacy: "privacy.html",
              password: "emy-forgot-password.html",
              faqs: "faqs.html",
              about: "about.html",
              contact: "contact.html"
            };
            if (target === "delete") {
              showToast("Delete account will ask for confirmation before it runs.");
              return;
            }
            if (routes[target]) window.location.href = routes[target];
          });
        });
        window.addEventListener("hashchange", syncProfileViewFromHash);
        syncProfileViewFromHash();
        document.addEventListener("click", (event) => {
          if (!isBusinessCustomerProfileRoute() || !event.target || !event.target.closest) return;
          const target = event.target.closest("[data-business-nav], [data-business-top-search], [data-business-switch-customer], [data-back]");
          if (!target || !document.documentElement.contains(target)) return;
          const nav = businessShellNavFromElement(target);
          event.preventDefault();
          event.stopPropagation();
          if (event.stopImmediatePropagation) event.stopImmediatePropagation();
          openBusinessShellRoute(nav);
        }, true);
        profileBusinessRouteNavButtons.forEach((button) => {
          button.addEventListener("click", () => {
            openBusinessShellRoute(businessShellNavFromElement(button));
          });
        });
        profileBusinessBottomNavButtons.forEach((button) => {
          button.addEventListener("click", () => {
            openBusinessShellRoute(button.dataset.businessNav || "home");
          });
        });
        if (profileBusinessRouteAvatar) {
          profileBusinessRouteAvatar.addEventListener("click", () => {
            openBusinessShellRoute("profile");
          });
        }
        document.querySelector("[data-open-search]").addEventListener("click", () => { window.location.href = "emy-customer-search.html"; });
        notificationButton.addEventListener("click", (event) => {
          event.stopPropagation();
          setNotificationsOpen(!notificationPanel.classList.contains("is-open"));
        });
        if (profileBusinessRouteNotificationButton) {
          profileBusinessRouteNotificationButton.addEventListener("click", (event) => {
            if (!isBusinessCustomerProfileRoute()) return;
            event.preventDefault();
            event.stopPropagation();
            setNotificationsOpen(!notificationPanel.classList.contains("is-open"));
          });
        }
        notificationClose.addEventListener("click", () => setNotificationsOpen(false));
        notificationSettings.addEventListener("click", (event) => {
          event.stopPropagation();
          try {
            const page = window.location.pathname.split("/").pop() || "emy-customer-profile.html";
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
            const businessMode = notificationPanel && notificationPanel.dataset.notificationMode === "business";
            if (businessMode) {
              if (action.dataset.notificationAction === "hide") hideBusinessRouteNotification(action.dataset.notificationActionId, "Business notification hidden.");
              if (action.dataset.notificationAction === "delete") deleteBusinessRouteNotification(action.dataset.notificationActionId, "Business notification deleted.");
              if (action.dataset.notificationAction === "comments") turnOffBusinessRouteCommentNotifications();
            } else {
              if (action.dataset.notificationAction === "hide") hideNotification(action.dataset.notificationActionId, "Notification hidden.");
              if (action.dataset.notificationAction === "delete") dismissNotification(action.dataset.notificationActionId, "Notification deleted.");
              if (action.dataset.notificationAction === "comments") turnOffCommentNotifications();
            }
            return;
          }
          const row = event.target.closest("[data-notification-id]");
          if (!row) return;
          const businessMode = notificationPanel && notificationPanel.dataset.notificationMode === "business";
          const item = (businessMode ? readBusinessRouteNotifications() : readNotifications()).find((notification) => notification.id === row.dataset.notificationId);
          if (businessMode) openBusinessRouteNotification(item);
          else openNotification(item);
        });
        notificationList.addEventListener("keydown", (event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          const row = event.target.closest("[data-notification-id]");
          if (!row) return;
          event.preventDefault();
          const businessMode = notificationPanel && notificationPanel.dataset.notificationMode === "business";
          const item = (businessMode ? readBusinessRouteNotifications() : readNotifications()).find((notification) => notification.id === row.dataset.notificationId);
          if (businessMode) openBusinessRouteNotification(item);
          else openNotification(item);
        });
        notificationPanel.addEventListener("click", (event) => event.stopPropagation());
        document.addEventListener("click", () => {
          closeNotificationMenus();
          setNotificationsOpen(false);
        });
        document.addEventListener("keydown", (event) => {
          if (event.key === "Escape") {
            setNotificationsOpen(false);
            setModalOpen(locationModal, false);
            setModalOpen(photoCropModal, false);
          }
        });
        window.addEventListener("resize", () => {
          if (notificationPanel && notificationPanel.classList.contains("is-open")) positionNotificationsPanel();
        });
        const profileBusinessProductStorageKeys = ["emyBusinessProducts", "emyBusinessProductList", "emyBusinessProductPosts"];
        const profileBusinessRouteStorageKeys = ["emyCustomerBusinesses", "emyCustomerRelationshipRequests", "emyBusinessCustomers", "emyBusinessProducts", "emyBusinessProductList", "emyBusinessProductPosts", "emyFeedCreatedProducts", "emyBusinessClips", "emyBusinessClipPosts", "emyFeedCreatedClips", "emyCustomerClips", "emyCustomerReels", "emyCreatedClips"];
        window.addEventListener("emy:business-products-changed", renderBusinessProfilePreview);
        window.addEventListener("emy:customer-business-changed", () => {
          renderProfileRequests();
          renderProfileCustomers();
          renderProfileShortcuts();
          renderBusinessProfilePreview();
          syncBusinessCustomerRouteChrome();
        });
        window.addEventListener("storage", (event) => {
          if (profileBusinessProductStorageKeys.indexOf(event.key) >= 0) renderBusinessProfilePreview();
          if (event && (event.key === "emyCustomerBusinesses" || event.key === "emyCustomerRelationshipRequests" || event.key === "emyBusinessCustomers" || String(event.key || "").indexOf("emyBusinessCustomers:") === 0)) {
            renderProfileRequests();
            renderProfileCustomers();
            renderProfileShortcuts();
            renderBusinessProfilePreview();
          }
          if (profileBusinessRouteStorageKeys.indexOf(event.key) >= 0 || (event.key && (event.key.indexOf("emyBusinessNotifications:") === 0 || event.key.indexOf("emyBusinessCustomers:") === 0))) syncBusinessCustomerRouteChrome();
          if (event && event.key === "emyCustomerNotifications" && typeof renderNotifications === "function") renderNotifications();
        });
        window.addEventListener("emy:customer-notification-created", () => {
          if (typeof renderNotifications === "function") renderNotifications();
        });
`;
const customer_profile_part_7 = String.raw`
        document.querySelectorAll("[data-nav]").forEach((button) => {
          button.addEventListener("click", () => {
            const nav = button.dataset.nav;
            if (nav === "profile") return;
            if (nav === "ask") { window.location.href = "ask-emy.html"; return; }
            if (nav === "chat") { window.location.href = "emy-customer-chat.html"; return; }
            if (nav === "uploads") { window.location.href = "emy-customer-home.html?tab=uploads#uploads"; return; }
            if (nav === "feeds") { window.location.href = "emy-customer-home.html#feeds"; return; }
            window.location.href = "emy-customer-home.html#" + encodeURIComponent(nav);
          });
        });
`;
const customer_profile_part_8 = String.raw`
        renderPhoto();
        renderProfile({ preview: false });
        populateCustomerDialCodes();
        renderSessionForm();
        syncBusinessCustomerRouteChrome();
        markCustomerProfilePageInteractive();
        scheduleCustomerProfileStartupTask(renderProfileExtras, 180);
        scheduleCustomerProfileStartupTask(renderFavouriteItems, 340);
        scheduleCustomerProfileStartupTask(renderNotifications, 500);
      })();
    </script>
  </body>
`;



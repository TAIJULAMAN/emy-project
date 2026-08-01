/* EMY template parts split from 32-template-customer-chat.cjs */
const customer_chat_part_1 = String.raw`
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>EMY | Chat</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
      :root { --emy-navy:#001b47; --emy-orange:#ff6a00; --emy-cream:#fff8ef; --line:rgba(0,27,71,.10); --muted:#667085; }
      * { box-sizing:border-box; }
      html, body { margin:0; min-height:100%; background:#fffdf8; color:var(--emy-navy); font-family:Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      button, input { font:inherit; }
      .page { min-height:100dvh; background:linear-gradient(180deg,#fffdf8,#fff8ef); padding-bottom:118px; }
`;
const customer_chat_part_2 = String.raw`
      .notifications-panel { position:fixed; z-index:84; top:70px; left:10px; width:min(100% - 20px,420px); max-height:min(74dvh,620px); display:none; grid-template-rows:auto minmax(0,1fr); overflow:hidden; border:1px solid rgba(0,27,71,.10); border-radius:14px; background:rgba(255,255,255,.96); box-shadow:0 24px 62px rgba(0,27,71,.20); transform:none; }
      .notifications-panel.is-open { display:grid; }
      .notifications-head { min-height:64px; display:flex; align-items:center; column-gap:14px; padding:0 18px 0 20px; border-bottom:1px solid rgba(0,27,71,.08); background:rgba(255,255,255,.88); backdrop-filter:blur(12px); }
      .notifications-head h2 { flex:1 1 auto; min-width:0; margin:0; color:#111827; font-size:18px; line-height:1.2; font-weight:650; }
      .notifications-icon { width:36px; height:36px; border:0; border-radius:999px; background:transparent; color:#111827; cursor:pointer; display:grid; place-items:center; }
      .notifications-icon:hover { background:rgba(0,27,71,.06); }
      .notifications-icon svg { width:21px; height:21px; stroke-width:2.1; }
      .notifications-scroll { min-height:220px; overflow-y:auto; }
      .notifications-section-title { margin:0; padding:14px 12px 8px; color:#111827; font-size:14px; line-height:1.25; font-weight:650; }
      .notifications-divider { height:1px; margin:8px 12px 4px; background:rgba(0,27,71,.10); }
      .notifications-empty { margin:0; padding:30px 24px 34px; color:#64748b; text-align:center; font-size:13px; line-height:1.45; font-weight:520; }
      .notifications-empty strong { display:block; margin-bottom:6px; color:var(--emy-navy); font-size:15px; font-weight:760; }
      .notification-row { position:relative; display:grid; grid-template-columns:54px minmax(0,1fr) 92px 28px; gap:10px; align-items:start; padding:10px 10px 12px 0; border-left:3px solid transparent; background:#fff; color:var(--emy-navy); cursor:pointer; text-align:left; }
      .notification-row.is-unread { border-left-color:#1677d2; }
      .notification-row:hover { background:#f4f6f8; }
      .notification-avatar { justify-self:center; width:42px; height:42px; border-radius:999px; overflow:hidden; border:1px solid rgba(0,27,71,.08); background:linear-gradient(145deg,#eef6ff,#fff); color:var(--emy-navy); display:grid; place-items:center; font-size:12px; font-weight:820; }
      .notification-thumb { width:92px; height:52px; border-radius:5px; overflow:hidden; background:linear-gradient(145deg,#fff7ed,#eef4fb); color:#c14f00; display:grid; place-items:center; font-size:10px; font-weight:850; text-transform:uppercase; }
      .notification-avatar img, .notification-thumb img, .notification-avatar video, .notification-thumb video { width:100%; height:100%; object-fit:cover; display:block; }
      .notification-avatar.is-fallback, .notification-thumb.is-fallback { color:#c14f00; }
      .notification-thumb.is-fallback { box-sizing:border-box; gap:2px; padding:6px; text-align:center; text-transform:none; background:linear-gradient(145deg,#fff7ed,#eef4fb); color:var(--emy-navy); }
      .notification-thumb.is-fallback b { display:block; font-size:10.5px; line-height:1.05; font-weight:850; }
      .notification-thumb.is-fallback small { display:block; color:#667085; font-size:9px; line-height:1; font-weight:720; }
      .notification-thumb.is-product { background:linear-gradient(145deg,#fff7ed,#fffaf4); color:#b54708; }
      .notification-thumb.is-post, .notification-thumb.is-image, .notification-thumb.is-video { background:linear-gradient(145deg,#eff6ff,#f8fbff); color:#175cd3; }
      .notification-thumb.is-clip { background:linear-gradient(145deg,#ecfdf3,#f8fff9); color:#067647; }
      .notification-thumb.is-message, .notification-thumb.is-comment, .notification-thumb.is-reply { background:linear-gradient(145deg,#f4f3ff,#fbfaff); color:#5925dc; }
      .notification-text { min-width:0; }
      .notification-text strong { display:block; color:#111827; font-size:13px; line-height:1.35; font-weight:620; }
      .notification-text span { display:block; overflow:hidden; margin-top:3px; color:#526078; font-size:12px; line-height:1.35; text-overflow:ellipsis; white-space:nowrap; }
      .notification-text time { display:block; margin-top:6px; color:#64748b; font-size:12px; line-height:1.25; font-weight:520; }
      .notification-more { width:26px; height:34px; border:0; border-radius:999px; background:transparent; color:#111827; cursor:pointer; display:grid; place-items:center; }
      .notification-more:hover { background:rgba(0,27,71,.06); }
      .notification-more svg { width:19px; height:19px; stroke-width:2.5; }
      .notification-action-menu { position:absolute; right:10px; top:44px; z-index:12; width:min(320px,calc(100vw - 40px)); overflow:hidden; border:1px solid rgba(0,27,71,.10); border-radius:10px; background:#fff; box-shadow:0 18px 42px rgba(0,27,71,.18); }
      .notification-action-menu[hidden] { display:none; }
      .notification-action-menu button { width:100%; min-height:46px; border:0; border-bottom:1px solid rgba(0,27,71,.06); background:#fff; color:#111827; cursor:pointer; display:grid; grid-template-columns:32px minmax(0,1fr); align-items:center; gap:10px; padding:0 14px; text-align:left; font-size:13px; font-weight:520; }
      .notification-action-menu button:last-child { border-bottom:0; }
      .notification-action-menu button:hover { background:#f4f6f8; }
      .notification-action-menu svg { width:22px; height:22px; stroke-width:2; }
      .page > .topbar { width:min(100%,1220px); margin:0 auto; padding-left:14px; padding-right:14px; }
      .page > .topbar.has-brand { width:min(100%,1540px); grid-template-columns:auto 46px minmax(0,1fr) 42px 42px 42px minmax(230px,346px); gap:12px; }
      .customer-topbar-brand { justify-self:start; width:max-content; max-width:168px; display:inline-flex; align-items:center; gap:10px; color:inherit; text-decoration:none; filter:drop-shadow(0 10px 18px rgba(255,106,0,.12)); }
      .customer-topbar-brand img { width:auto; height:38px; display:block; object-fit:contain; }
      .customer-topbar-brand span { min-height:24px; display:inline-flex; align-items:center; justify-content:center; border:1px solid rgba(255,106,0,.34); border-radius:999px; background:rgba(255,255,255,.76); color:#d95b00; padding:0 13px; font-size:9px; line-height:1; font-weight:760; letter-spacing:.14em; text-transform:uppercase; box-shadow:inset 0 1px 0 rgba(255,255,255,.86), 0 8px 16px rgba(255,106,0,.08); }
      .chat-business-switch { justify-self:end; width:min(100%,346px); min-height:64px; border:1px solid rgba(255,106,0,.16); border-radius:18px; background:linear-gradient(145deg,rgba(255,255,255,.96),rgba(255,247,238,.88)); color:var(--emy-navy); cursor:pointer; display:flex; align-items:center; justify-content:space-between; gap:12px; padding:12px 14px; text-align:left; box-shadow:0 18px 34px rgba(0,27,71,.08), 0 10px 24px rgba(255,106,0,.08), inset 0 1px 0 rgba(255,255,255,.94); transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease; }
      .chat-business-switch:hover { border-color:rgba(255,106,0,.34); transform:translateY(-2px); box-shadow:0 24px 46px rgba(0,27,71,.11),0 12px 28px rgba(255,106,0,.14),inset 0 1px 0 rgba(255,255,255,.96); }
      .chat-business-switch strong { display:block; color:var(--emy-navy); font-size:13px; line-height:1.2; font-weight:760; white-space:nowrap; }
      .chat-business-switch span span { display:block; margin-top:5px; color:#718099; font-size:11px; line-height:1.35; font-weight:560; white-space:nowrap; }
      .chat-business-switch .switch-track { position:relative; flex:0 0 auto; width:43px; height:26px; border:1px solid rgba(0,27,71,.10); border-radius:999px; background:linear-gradient(145deg,#f8fafc,#fff); box-shadow:inset 0 3px 8px rgba(0,27,71,.06),0 8px 18px rgba(0,27,71,.08); transition:background .55s ease,border-color .55s ease,box-shadow .55s ease; }
      .chat-business-switch .switch-track::after { content:""; position:absolute; left:3px; top:3px; width:18px; height:18px; border-radius:999px; background:linear-gradient(145deg,#fff,#edf2f7); box-shadow:0 4px 10px rgba(0,27,71,.18); transition:left .55s ease,background .55s ease,box-shadow .55s ease; }
      .chat-business-switch[data-business-switch-mode="switch"] .switch-track { display:block; opacity:1; }
      .chat-business-switch[data-business-switch-mode="create"] .switch-track,
      .chat-business-switch[data-business-switch-mode="review"] .switch-track,
      .chat-business-switch[data-business-switch-mode="rejected"] .switch-track { display:none; }
      .chat-business-switch.is-switching .switch-track { border-color:rgba(255,106,0,.36); background:linear-gradient(145deg,#fff7ef,#fff0e3); box-shadow:inset 0 3px 8px rgba(117,52,0,.08),0 8px 18px rgba(255,106,0,.14); }
      .chat-business-switch.is-switching .switch-track::after { left:22px; background:linear-gradient(145deg,#ff9b45,#ff6a00); box-shadow:0 4px 10px rgba(117,52,0,.28); }
      .chat-shell { width:min(100%,1220px); min-height:calc(100dvh - 188px); margin:0 auto 112px; display:grid; grid-template-columns:minmax(320px,420px) minmax(0,1fr); border-left:1px solid var(--line); border-right:1px solid var(--line); background:#fff; }
      .chat-list-pane { border-right:1px solid var(--line); background:linear-gradient(180deg,#fff,#fffaf4); padding:22px 16px; overflow-y:auto; }
      .chat-head { display:flex; align-items:center; justify-content:space-between; gap:14px; }
      .chat-title { min-width:0; }
      .chat-title h1 { margin:0; color:var(--emy-navy); font-size:24px; line-height:1.08; font-weight:830; }
      .chat-title span { display:block; margin-top:5px; color:#667085; font-size:12.5px; line-height:1.25; font-weight:620; }
      .chat-compose-icon { width:42px; height:42px; border:1px solid rgba(255,106,0,.22); border-radius:14px; background:#fff7ef; color:var(--emy-orange); cursor:pointer; display:grid; place-items:center; box-shadow:0 10px 22px rgba(255,106,0,.10); }
      .chat-compose-icon svg { width:22px; height:22px; stroke-width:2.25; }
      .chat-search { margin-top:18px; display:grid; grid-template-columns:22px minmax(0,1fr); align-items:center; gap:10px; height:48px; border:1px solid rgba(0,27,71,.08); border-radius:14px; background:#fff; color:#6b7280; padding:0 15px; box-shadow:0 10px 28px rgba(0,27,71,.045); }
      .chat-search svg { width:21px; height:21px; stroke-width:2; }
      .chat-search input { min-width:0; border:0; outline:0; background:transparent; color:#111827; font-size:15px; }
      .chat-context-card { margin:16px 0 18px; border:1px solid rgba(255,106,0,.16); border-radius:16px; background:linear-gradient(135deg,#fff7ef,#fff); padding:14px; box-shadow:0 16px 36px rgba(0,27,71,.06); }
      .chat-context-card strong { display:block; color:var(--emy-navy); font-size:13px; line-height:1.2; font-weight:820; }
      .chat-context-card span { display:block; margin-top:5px; color:#667085; font-size:12px; line-height:1.38; font-weight:560; }
      .chat-context-pills { display:flex; flex-wrap:wrap; gap:7px; margin-top:12px; }
      .chat-context-pills em { border-radius:999px; background:#fff; color:#a94700; padding:6px 8px; font-style:normal; font-size:10.5px; line-height:1; font-weight:780; box-shadow:inset 0 0 0 1px rgba(255,106,0,.14); }
      .messages-title { display:flex; align-items:flex-end; justify-content:space-between; gap:12px; margin:0 0 10px; }
      .messages-title strong { display:block; color:#020817; font-size:17px; font-weight:820; }
      .messages-title span { display:block; margin-top:3px; color:#667085; font-size:11.5px; line-height:1.2; font-weight:600; }
      .messages-title button { border:1px solid rgba(0,27,71,.08); border-radius:999px; background:#fff; color:var(--emy-navy); cursor:pointer; padding:7px 10px; font-size:11px; line-height:1; font-weight:780; }
      .thread-list { display:grid; gap:8px; }
      .thread-empty { border:1px dashed rgba(0,27,71,.14); border-radius:16px; background:#fff; color:#667085; padding:18px; text-align:center; font-size:13px; line-height:1.4; font-weight:620; }
      .thread-row { width:100%; min-width:0; border:1px solid transparent; border-radius:16px; background:transparent; color:inherit; cursor:pointer; display:grid; grid-template-columns:54px minmax(0,1fr) auto; gap:10px; align-items:center; padding:10px; text-align:left; }
      .thread-row:hover, .thread-row.is-active { border-color:rgba(255,106,0,.16); background:#fff; box-shadow:0 12px 26px rgba(0,27,71,.055); }
      .thread-avatar { width:48px; height:48px; border-radius:999px; overflow:hidden; display:grid; place-items:center; color:var(--emy-navy); font-size:13px; font-weight:850; box-shadow:inset 0 0 0 1px rgba(255,255,255,.70), 0 8px 18px rgba(0,27,71,.10); }
      .thread-avatar.has-image, .message-avatar.has-image { background:#fff!important; color:transparent; }
      .thread-avatar img { width:100%; height:100%; object-fit:cover; display:block; border-radius:inherit; }
      .avatar-pizza { background:radial-gradient(circle at 34% 42%, #ffd8a8 0 17px, transparent 18px), radial-gradient(circle at 66% 34%, #ed4f37 0 9px, transparent 10px), linear-gradient(135deg,#f9b15d,#7c301b); }
      .avatar-shop { background:linear-gradient(135deg,#e8edf1,#fff), radial-gradient(circle at 66% 30%, #d6a083, transparent 28px), linear-gradient(90deg,#39424f,transparent); }
      .avatar-feed { background:linear-gradient(135deg,#d6dde8,#f7ede2), radial-gradient(circle at 40% 60%, #6e5648, transparent 24px); }
      .avatar-tech { background:linear-gradient(145deg,#dbe4ec,#f8fbff); }
      .thread-copy { min-width:0; }
      .thread-copy strong { display:block; overflow:hidden; color:#111827; font-size:14px; line-height:1.2; font-weight:650; text-overflow:ellipsis; white-space:nowrap; }
      .thread-copy span { display:block; overflow:hidden; margin-top:4px; color:#6b7280; font-size:12px; line-height:1.25; text-overflow:ellipsis; white-space:nowrap; }
      .thread-time { color:#6b7280; font-size:12px; white-space:nowrap; }
      .chat-detail-pane { min-width:0; display:grid; grid-template-rows:auto minmax(0,1fr) auto; background:linear-gradient(180deg,#fff,#fffdf9); }
      .detail-head[hidden],
      .message-list[hidden],
      .empty-state[hidden],
      .chat-input-bar[hidden] { display:none !important; }
      .detail-head { min-height:72px; border-bottom:1px solid var(--line); display:flex; align-items:center; justify-content:space-between; gap:14px; padding:12px 22px; }
      .detail-business { display:flex; align-items:center; gap:10px; min-width:0; }
      .detail-business .thread-avatar { width:42px; height:42px; }
      .detail-business strong { display:block; overflow:hidden; color:#111827; font-size:15px; text-overflow:ellipsis; white-space:nowrap; }
      .detail-business span { display:flex; align-items:center; gap:6px; margin-top:2px; color:#6b7280; font-size:12px; }
      .online-dot { width:8px; height:8px; border-radius:999px; background:#24c486; }
      .detail-actions { display:flex; gap:8px; }
      .detail-actions button { width:36px; height:36px; border:1px solid var(--line); border-radius:999px; background:#fff; color:var(--emy-navy); cursor:pointer; display:grid; place-items:center; }
      .detail-actions svg { width:18px; height:18px; stroke-width:2.1; }
      .message-stage { overflow-y:auto; padding:24px; background:radial-gradient(circle at 84% 0, rgba(255,106,0,.08), transparent 260px), linear-gradient(180deg,#fff,#fffdf9); }
      .empty-state { height:100%; display:grid; place-items:center; text-align:center; color:#111827; }
      .empty-card { width:min(520px,100%); border:1px solid rgba(0,27,71,.08); border-radius:22px; background:rgba(255,255,255,.82); padding:30px; box-shadow:0 24px 54px rgba(0,27,71,.08); }
      .empty-mark { width:82px; height:82px; margin:0 auto; border-radius:24px; background:linear-gradient(135deg,var(--emy-orange),#ffb16a); color:#fff; display:grid; place-items:center; box-shadow:0 18px 34px rgba(255,106,0,.22); }
      .empty-mark svg { width:42px; height:42px; display:block; stroke:currentColor; stroke-width:1.9; fill:none; }
      .empty-state h2 { margin:20px 0 0; color:var(--emy-navy); font-size:25px; line-height:1.12; font-weight:830; }
      .empty-state p { margin:10px auto 0; max-width:390px; color:#667085; font-size:14px; line-height:1.45; font-weight:540; }
      .empty-features { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-top:20px; }
      .empty-features span { border:1px solid rgba(0,27,71,.08); border-radius:14px; background:#fff; color:var(--emy-navy); padding:11px 8px; font-size:11.5px; line-height:1.2; font-weight:780; }
      .empty-state button { margin-top:20px; height:42px; border:0; border-radius:12px; background:var(--emy-orange); color:#fff; cursor:pointer; padding:0 20px; font-size:13px; font-weight:790; box-shadow:0 12px 24px rgba(255,106,0,.20); }
      .message-list { display:grid; align-content:end; gap:10px; min-height:100%; }
      .message-row { display:grid; grid-template-columns:34px minmax(0,1fr); gap:8px; align-items:end; }
      .message-row.is-user { grid-template-columns:minmax(0,1fr) 34px; }
      .message-row.is-user .message-bubble { justify-self:end; }
      .message-avatar { width:34px; height:34px; border-radius:999px; overflow:hidden; display:grid; place-items:center; background:#eef3f8; color:var(--emy-navy); font-size:12px; font-weight:820; box-shadow:inset 0 0 0 1px rgba(255,255,255,.72), 0 8px 18px rgba(0,27,71,.08); }
      .message-avatar img { width:100%; height:100%; object-fit:cover; display:block; }
      .message-bubble { max-width:min(76%,520px); width:fit-content; border-radius:16px; background:#f2f5f9; color:#4f5b73; padding:10px 12px; font-size:13px; line-height:1.38; font-weight:520; }
      .message-bubble.is-user { justify-self:end; background:var(--emy-navy); color:#fff; }
      .message-bubble strong { display:block; margin-bottom:3px; color:inherit; font-size:12px; font-weight:780; }
      .message-role-line { display:flex; align-items:center; flex-wrap:wrap; gap:6px; margin-bottom:4px; }
      .message-role-line strong { margin-bottom:0; }
      .message-role-pill { display:inline-flex; align-items:center; height:18px; border-radius:999px; padding:0 7px; background:rgba(0,27,71,.08); color:var(--emy-navy); font-size:10px; line-height:1; font-style:normal; font-weight:860; }
      .message-bubble.is-user .message-role-pill { background:rgba(255,255,255,.16); color:#fff; }
      .message-ref { display:grid; grid-template-columns:48px minmax(0,1fr); gap:9px; align-items:center; margin-top:8px; border-radius:12px; background:rgba(255,255,255,.12); color:inherit; padding:9px; text-decoration:none; box-shadow:inset 3px 0 0 rgba(255,176,103,.95); }
      .message-ref.is-no-media { grid-template-columns:minmax(0,1fr); }
      .message-ref.is-no-media .message-ref-media { display:none; }
      .message-ref:hover { transform:translateY(-1px); }
      .message-bubble:not(.is-user) .message-ref { background:#fff; box-shadow:inset 3px 0 0 rgba(255,106,0,.72); }
      .message-ref-media { position:relative; overflow:hidden; width:48px; height:48px; border-radius:9px; background:linear-gradient(145deg,#dbe4ec,#f8fbff); box-shadow:inset 0 0 0 1px rgba(255,255,255,.65); display:block; opacity:1; }
      .message-ref-media img, .message-ref-media video { width:100%; height:100%; object-fit:cover; display:block; border-radius:inherit; }
      .message-ref-media.pizza, .message-ref-media.reel-a { background:radial-gradient(circle at 34% 42%, #ffd8a8 0 15px, transparent 16px), radial-gradient(circle at 66% 34%, #ed4f37 0 8px, transparent 9px), linear-gradient(135deg,#f9b15d,#7c301b); }
      .message-ref-media.shop { background:linear-gradient(135deg,#e8edf1,#fff), radial-gradient(circle at 66% 30%, #d6a083, transparent 26px), linear-gradient(90deg,#39424f,transparent); }
      .message-ref-media.bottle { background:linear-gradient(90deg,#e6edf2,#bfc8d0), radial-gradient(circle at 52% 42%, #44546b 0 16px, transparent 17px); }
      .message-ref-media.feed, .message-ref-media.reel, .message-ref-media.reel-b { background:linear-gradient(145deg,#d9e6ef,#786f69), radial-gradient(circle at 64% 18%, rgba(255,255,255,.55), transparent 28px); }
      .message-ref-copy { min-width:0; display:grid; gap:3px; }
      .message-ref small { width:fit-content; border-radius:999px; background:#fff4e8; color:#c14f00; padding:3px 6px; font-size:9px; line-height:1; font-weight:820; text-transform:uppercase; }
      .message-ref.is-post small { background:#eef4ff; color:#175cd3; }
      .message-ref.is-clip small { background:#eef8f3; color:#067647; }
      .message-ref b { overflow:hidden; color:inherit; font-size:12px; line-height:1.2; text-overflow:ellipsis; white-space:nowrap; }
      .message-ref-copy > span { display:-webkit-box; overflow:hidden; opacity:.82; font-size:11px; line-height:1.25; -webkit-box-orient:vertical; -webkit-line-clamp:2; }
      .chat-input-bar { position:relative; z-index:70; border-top:1px solid var(--line); padding:13px 18px; display:grid; grid-template-columns:minmax(0,1fr) auto; gap:10px; background:#fff; }
      .chat-input-bar input { position:relative; z-index:1; height:42px; border:1px solid var(--line); border-radius:12px; background:#f8fafc; color:#111827; outline:0; padding:0 14px; font-size:14px; }
      .chat-input-bar button { height:42px; border:0; border-radius:12px; background:var(--emy-orange); color:#fff; cursor:pointer; padding:0 18px; font-size:13px; font-weight:790; }
      .bottom-nav { position:fixed; left:50%; bottom:18px; z-index:55; width:min(620px, calc(100% - 40px)); transform:translateX(-50%); display:grid; grid-template-columns:repeat(8,minmax(0,1fr)); gap:2px; border:1px solid rgba(0,27,71,.06); border-radius:14px; background:rgba(248,251,255,.48); backdrop-filter:blur(18px); box-shadow:0 14px 36px rgba(0,27,71,.08); padding:8px; transition:background .18s ease, border-color .18s ease, box-shadow .18s ease; }
      .bottom-nav:hover { border-color:rgba(0,27,71,.14); background:rgba(248,251,255,.96); box-shadow:0 18px 46px rgba(0,27,71,.18); }
      .nav-item { position:relative; border:0; background:transparent; color:#56637b; cursor:pointer; display:grid; place-items:center; gap:4px; min-height:54px; min-width:0; padding:0; border-radius:11px; font-size:10px; font-weight:600; }
      .nav-item span { position:relative; z-index:1; line-height:1; padding-bottom:5px; }
`;
const customer_chat_part_3 = String.raw`
      .nav-item svg { width:34px; height:34px; stroke-width:2; color:rgba(0,27,71,.86); padding:8px; border:1px solid rgba(255,255,255,.88); border-radius:13px; background:linear-gradient(145deg, rgba(255,255,255,.92), rgba(255,255,255,.42) 54%, rgba(255,255,255,.24)), rgba(255,255,255,.34); clip-path:polygon(18% 0,100% 0,100% 74%,78% 100%,0 100%,0 22%); box-shadow:inset 0 1px 0 rgba(255,255,255,.74), inset 0 -8px 16px rgba(0,27,71,.08), 0 9px 18px rgba(0,27,71,.16); transition:transform .16s ease, border-color .16s ease, box-shadow .16s ease, background .16s ease; }
      .nav-item:hover, .nav-item.is-active { color:var(--emy-orange); background:rgba(255,106,0,.07); }
      .nav-item.is-active svg { color:var(--emy-orange); border-color:rgba(255,106,0,.36); background:linear-gradient(145deg, rgba(255,255,255,.96), rgba(255,255,255,.48) 54%, rgba(255,255,255,.28)), rgba(255,255,255,.38); transform:translateY(-1px); box-shadow:inset 0 1px 0 rgba(255,255,255,.78), inset 0 -8px 16px rgba(255,106,0,.08), 0 10px 20px rgba(0,27,71,.17); }
      .nav-item.is-active::after { content:""; position:absolute; bottom:1px; width:18px; height:2px; border-radius:999px; background:var(--emy-orange); }
      .nav-item.nav-item-ask svg { width:48px; height:48px; color:#fff; padding:0; border:0; border-radius:0; background:transparent; clip-path:none; box-shadow:none; filter:drop-shadow(0 11px 15px rgba(255,106,0,.28)); }
      .nav-item.nav-item-ask span { color:var(--emy-orange); font-size:8.8px; white-space:nowrap; }
      .nav-item.nav-item-ask:hover svg { transform:translateY(-1px); }
`;
const customer_chat_part_4 = String.raw`
      @media (max-width:760px) {
        .page > .topbar { padding-left:10px; padding-right:10px; }
        .page > .topbar.has-brand { grid-template-columns:38px 38px minmax(0,1fr) 36px 36px 36px; gap:7px; }
        .customer-topbar-brand { width:36px; max-width:36px; gap:0; overflow:hidden; }
        .customer-topbar-brand img { width:34px; height:34px; object-fit:cover; object-position:left center; }
        .customer-topbar-brand span, .chat-business-switch { display:none; }
        .chat-shell { min-height:calc(100dvh - 166px); margin-bottom:104px; grid-template-columns:1fr; border:0; }
        .chat-list-pane { border-right:0; }
        .chat-detail-pane { display:none; }
        .chat-shell.has-open-thread .chat-list-pane { display:none; }
        .chat-shell.has-open-thread .chat-detail-pane { display:grid; min-height:calc(100dvh - 166px); }
        .bottom-nav { width:min(calc(100% - 16px),430px); bottom:10px; }
      }
    </style>
  </head>
  <body>
    <main class="page">
${customerTopbarMarkup({
  brand: true,
  brandHref: 'emy-customer-home.html',
  avatarAttrs: 'data-avatar data-chat-avatar',
  locationAttrs: 'data-location data-chat-location',
  locationLabelAttrs: 'data-location-label data-chat-location-label',
  searchAttrs: 'data-open-search data-chat-search-open',
  notificationCountAttrs: 'data-notification-count data-chat-notification-count',
  notificationAttrs: 'data-notifications data-chat-notifications aria-expanded="false"',
  extraActionsMarkup: String.raw`
          <button class="business-switch chat-business-switch" type="button" data-switch-business data-chat-business-switch data-business-switch-mode="create" aria-pressed="false">
            <span><strong>Create a Business Account</strong><span>Start a business profile when you are ready.</span></span>
            <span class="switch-track" aria-hidden="true"></span>
          </button>`
})}
        <section class="notifications-panel" data-chat-notification-panel aria-label="Notifications" aria-hidden="true">
          <header class="notifications-head">
            <h2>Notifications</h2>
            <button class="notifications-icon" type="button" data-chat-notification-settings aria-label="Notification settings">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z" stroke="currentColor"/><path d="M19.4 13.4a7.7 7.7 0 0 0 .05-2.7l2-1.45-2-3.45-2.4.95a8 8 0 0 0-2.3-1.35L14.4 3h-4.8l-.35 2.4a8 8 0 0 0-2.3 1.35l-2.4-.95-2 3.45 2 1.45a7.7 7.7 0 0 0 .05 2.7l-2.05 1.5 2 3.45 2.45-.98a7.7 7.7 0 0 0 2.25 1.28l.35 2.45h4.8l.35-2.45a7.7 7.7 0 0 0 2.25-1.28l2.45.98 2-3.45-2.05-1.5Z" stroke="currentColor" stroke-linejoin="round"/></svg>
            </button>
            <button class="notifications-icon" type="button" data-chat-notification-close aria-label="Close notifications">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-linecap="round"/></svg>
            </button>
          </header>
          <div class="notifications-scroll" data-chat-notification-list></div>
        </section>
      <section class="chat-shell" data-chat-shell>
        <aside class="chat-list-pane" aria-label="Messages">
          <div class="chat-head"><div class="chat-title"><h1>EMY Chat</h1><span data-chat-title-subtitle>Business conversations</span></div><button class="chat-compose-icon" type="button" data-new-chat aria-label="New message"><svg viewBox="0 0 24 24" fill="none"><path d="M5 19h4.2L19 9.2 14.8 5 5 14.8V19Z" stroke="currentColor" stroke-linejoin="round"/><path d="M13.8 6 18 10.2" stroke="currentColor"/></svg></button></div>
          <label class="chat-search"><svg viewBox="0 0 24 24" fill="none"><path d="m20 20-4.2-4.2M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z" stroke="currentColor" stroke-linecap="round"/></svg><input type="search" data-chat-search placeholder="Search businesses or items" /></label>
          <div class="chat-context-card"><strong>One chat per business</strong><span>Messages stay connected across product pages, posts, clips, and the business profile.</span><div class="chat-context-pills"><em>Products</em><em>Posts</em><em>Clips</em></div></div>
          <div class="messages-title"><span><strong>Business inbox</strong><span>Shared conversations</span></span><button type="button">Unread</button></div>
          <div class="thread-list" data-thread-list></div>
        </aside>
        <section class="chat-detail-pane" aria-label="Selected chat">
          <div class="detail-head" data-detail-head hidden>
            <div class="detail-business"><span class="thread-avatar" data-detail-avatar></span><span><strong data-detail-name></strong><span><i class="online-dot"></i><span data-detail-status>Online and available</span></span></span></div>
            <div class="detail-actions"><button type="button" data-back-list aria-label="Back to messages"><svg viewBox="0 0 24 24" fill="none"><path d="m15 5-7 7 7 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></button><button type="button" data-detail-profile aria-label="Open business profile"><svg viewBox="0 0 24 24" fill="none"><path d="M5 5h14v14H5V5Zm4 5h6M9 14h4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div>
          </div>
          <div class="message-stage"><div class="empty-state" data-empty-state><div class="empty-card"><span class="empty-mark"><svg viewBox="0 0 24 24"><path d="M5 6.5h14v9.2H9.2L5 19V6.5Z" stroke-linejoin="round"/><path d="M8.8 10.8h6.4M8.8 13.2h4" stroke-linecap="round"/></svg></span><div class="empty-features"><span>Product questions</span><span>Post replies</span><span>Clip follow-ups</span></div><button type="button" data-empty-send>Open first chat</button></div></div><div class="message-list" data-message-list hidden></div></div>
          <form class="chat-input-bar" data-chat-form hidden><input type="text" data-chat-input placeholder="Message this business" /><button type="submit">Send</button></form>
        </section>
      </section>
`;
const customer_chat_part_5 = String.raw`
      <nav class="bottom-nav" aria-label="Customer navigation">
        <button class="nav-item" type="button" data-nav="home" data-tip="Local feed"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 11.5 12 5l8 6.5V20H6v-6h12" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Home</span></button>
        <button class="nav-item" type="button" data-nav="nearby" data-tip="Businesses close to you"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z" stroke="currentColor" stroke-linejoin="round"/><path d="M12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z" stroke="currentColor"/></svg><span>Nearby</span></button>
        <button class="nav-item" type="button" data-nav="feeds" data-tip="Product and posts"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 5h6v6H5V5Zm8 0h6v6h-6V5ZM5 13h6v6H5v-6Zm8 0h6v6h-6v-6Z" stroke="currentColor" stroke-linejoin="round"/></svg><span>Feeds</span></button>
        <button class="nav-item" type="button" data-nav="reels" data-tip="Short videos"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 7h14v12H5V7Zm3-4 2 4m4-4 2 4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Clips</span></button>
        <button class="nav-item" type="button" data-nav="uploads" data-tip="Upload status"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 16V5m0 0 4 4m-4-4-4 4M5 19h14" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Uploads</span></button>
        <button class="nav-item" type="button" data-nav="profile" data-tip="Your account"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0" stroke="currentColor" stroke-linecap="round"/></svg><span>Profile</span></button>
        <button class="nav-item is-active" type="button" data-nav="chat" data-tip="Messages"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 5.5h14v10.7H9.2L5 19.5v-14Z" stroke="currentColor" stroke-linejoin="round"/><path d="M9 10.8h.01M12 10.8h.01M15 10.8h.01" stroke="currentColor" stroke-linecap="round" stroke-width="2.6"/></svg><span>Chat</span></button>
        <button class="nav-item nav-item-ask" type="button" data-nav="ask" data-tip="AI helper"><span class="ask-emy-bubble">Hi, I'm EMY. Let me help you find what you need.</span><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.9 8.1c.35-1.08 1.36-1.8 2.5-1.8h5.2c1.14 0 2.15.72 2.5 1.8l1.7 8.7c.35 1.78-1.01 3.45-2.82 3.45H8.02c-1.81 0-3.17-1.67-2.82-3.45l1.7-8.7Z" fill="#f76512" stroke="#cf5200" stroke-linejoin="round" stroke-width="1"/><path d="M15.9 6.55c.58.35 1.02.9 1.2 1.55l1.7 8.7c.29 1.48-.6 2.88-1.96 3.32l-.98-.08c.74-.62 1.04-1.6.82-2.72l-1.25-6.7c-.28-1.5-.1-2.8.47-4.07Z" fill="#ad3e00" opacity=".2"/><path d="M6.35 10.05c2.15.62 4.02.48 5.66-.3 1.78-.85 3.62-.92 5.46-.22l.38 1.84c-2.32-.78-4.28-.63-6.04.22-1.62.78-3.45.9-5.78.28l.32-1.82Z" fill="#ffb067" opacity=".34"/><path d="M8.8 6.35c.32-1.92 1.42-3 3.2-3s2.88 1.08 3.2 3" stroke="#fff" stroke-linecap="round" stroke-width="1.18" opacity=".9"/><path d="M9.25 13.2c.46-.36.92-.36 1.38 0" stroke="#fff" stroke-linecap="round" stroke-width="1.02" opacity=".96"/><path d="M13.37 13.2c.46-.36.92-.36 1.38 0" stroke="#fff" stroke-linecap="round" stroke-width="1.02" opacity=".96"/><path d="M9.8 15.82c1.34.94 3.06.94 4.4 0" stroke="#fff" stroke-linecap="round" stroke-width="1.18" opacity=".96"/></svg><span>Ask EMY</span></button>
      </nav>
    </main>
    <script>
      (() => {
`;
const customer_chat_part_6 = String.raw`
        let businesses = [];
        const shell = document.querySelector("[data-chat-shell]");
        const headerAvatar = document.querySelector("[data-chat-avatar]");
        const headerLocation = document.querySelector("[data-chat-location]");
        const headerLocationLabel = document.querySelector("[data-chat-location-label]");
        const headerSearch = document.querySelector("[data-chat-search-open]");
        const headerNotifications = document.querySelector("[data-chat-notifications]");
        const headerNotificationCount = document.querySelector("[data-chat-notification-count]");
        const notificationPanel = document.querySelector("[data-chat-notification-panel]");
        const notificationList = document.querySelector("[data-chat-notification-list]");
        const notificationClose = document.querySelector("[data-chat-notification-close]");
        const notificationSettings = document.querySelector("[data-chat-notification-settings]");
        const firstNameLabel = document.querySelector("[data-first-name]");
        const chatTitleSubtitle = document.querySelector("[data-chat-title-subtitle]");
        const threadList = document.querySelector("[data-thread-list]");
        const searchInput = document.querySelector("[data-chat-search]");
        const messageList = document.querySelector("[data-message-list]");
        const emptyState = document.querySelector("[data-empty-state]");
        const form = document.querySelector("[data-chat-form]");
        const input = document.querySelector("[data-chat-input]");
        const detailHead = document.querySelector("[data-detail-head]");
        const detailName = document.querySelector("[data-detail-name]");
        const detailStatus = document.querySelector("[data-detail-status]");
        const detailAvatar = document.querySelector("[data-detail-avatar]");
        const detailProfile = document.querySelector("[data-detail-profile]");
        let activeKey = "";
        const clean = (value) => String(value || "").replace(/\\s+/g, " ").trim();
        const escapeAttr = (value) => String(value || "").replace(/[&<>"']/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" }[char]));
        const storageKey = (key) => "emyBusinessChatThread:" + normaliseChatBusinessKey(key || "business");
        function chatIdentitySlug(value) {
          return clean(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "customer";
        }
        function chatIdentityKey(email, name) {
          const emailText = clean(email).toLowerCase();
          if (emailText) return "email-" + chatIdentitySlug(emailText);
          const nameText = clean(name);
          if (nameText && !chatLooksPlaceholderCustomerName(nameText)) return "name-" + chatIdentitySlug(nameText);
          return "";
        }
        function chatCurrentCustomerKey() {
          return chatIdentityKey(localStorage.getItem("emyMainSignedInEmail"), chatCurrentCustomerName()) || "customer-local";
        }
        function chatMessageCustomerKey(item) {
          const explicit = clean(item && (item.customerKey || item.customerId || item.customerProfileKey));
          if (explicit) return explicit;
          const email = clean(item && (item.customerEmail || item.email));
          if (email) return chatIdentityKey(email, "");
          const senderRole = chatSenderRole(item);
          const name = clean(item && (item.customerName || item.customer || item.customerDisplayName || (senderRole === "customer" ? item.author || item.senderName || item.name : "")));
          return chatIdentityKey("", name);
        }
        function chatMessageBelongsToCurrentCustomer(item) {
          const itemKey = chatMessageCustomerKey(item);
          return !!itemKey && itemKey === chatCurrentCustomerKey();
        }
        function attachCurrentCustomerToChat(item) {
          const currentKey = chatCurrentCustomerKey();
          return Object.assign({}, item || {}, {
            customerKey: clean(item && item.customerKey) || currentKey,
            customerName: clean(item && item.customerName) || chatCurrentCustomerName(),
            customerEmail: clean(item && item.customerEmail) || clean(localStorage.getItem("emyMainSignedInEmail"))
          });
        }
        function signedInChatRole() {
          const signedRole = clean(localStorage.getItem("emyMainSignedInRole")).toLowerCase();
          if (signedRole === "business" || signedRole === "customer") return signedRole;
          return "";
        }
        if (signedInChatRole() === "business") {
          try {
            const params = new URLSearchParams(window.location.search || "");
            const businessKey = clean(params.get("business") || localStorage.getItem("emyCustomerChatOpenKey") || "");
            if (businessKey) localStorage.setItem("emyBusinessChatOpenKey", businessKey);
          } catch (error) {}
          window.location.replace("emy-business-profile.html?mode=chat");
          return;
        }
`;
const customer_chat_part_7 = String.raw`
        function chatMessageId(prefix) {
          return (prefix || "chat") + "-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
        }
        function normaliseChatBusinessKey(value) {
          const key = clean(value).toLowerCase();
          if (key.includes("angi-pizza")) return "angi-pizza";
          if (key.includes("ever-glow")) return "ever-glow";
          if (key.includes("ross-galler")) return "ross-galler";
          if (key.includes("business-111")) return "business-111";
          return key;
        }
        function readChatJson(key, fallback) {
          try {
            const parsed = JSON.parse(localStorage.getItem(key) || "null");
            return parsed && typeof parsed === "object" ? parsed : fallback;
          } catch (error) {
            return fallback;
          }
        }
        function chatAvatarForBusiness(key, name) {
          const text = clean([key, name].join(" ")).toLowerCase();
          if (text.includes("angi") || text.includes("pizza")) return "avatar-pizza";
          if (text.includes("ever") || text.includes("glow")) return "avatar-shop";
          if (text.includes("ross")) return "avatar-feed";
          return "avatar-tech";
        }
        function titleFromBusinessKey(key) {
          return clean(key).replace(/[-_]+/g, " ").replace(/\\b\\w/g, (char) => char.toUpperCase()) || "Business";
        }
        function readBusinessContactIntent() {
          const intent = readChatJson("emyBusinessContactIntent", {});
          return intent && typeof intent === "object" && !Array.isArray(intent) ? intent : {};
        }
        function readChatArray(key) {
          const value = readChatJson(key, []);
          if (Array.isArray(value)) return value;
          if (value && typeof value === "object") return Object.values(value);
          return [];
        }
        function writeChatArray(key, rows, limit) {
          try { localStorage.setItem(key, JSON.stringify((Array.isArray(rows) ? rows : []).slice(0, limit || 80))); } catch (error) {}
        }
        function pushChatNotification(key, notification, limit) {
          const rows = readChatArray(key).filter((item) => item && item.id !== notification.id);
          rows.unshift(notification);
          writeChatArray(key, rows, limit || 80);
        }
        function chatCurrentCustomerName() {
          const stored = clean(localStorage.getItem("emyCustomerDisplayName"));
          const first = clean(localStorage.getItem("emyCustomerFirstName") || localStorage.getItem("emyMainPendingSignupFirstName"));
          const last = clean(localStorage.getItem("emyCustomerLastName") || localStorage.getItem("emyMainPendingSignupLastName"));
          const email = clean(localStorage.getItem("emyMainSignedInEmail"));
          if (stored && !chatLooksPlaceholderCustomerName(stored)) return stored;
          const fullName = [first, last].filter(Boolean).join(" ");
          if (fullName && !chatLooksPlaceholderCustomerName(fullName)) return fullName;
          return chatNameFromEmail(email) || "Customer";
        }
        function chatCurrentCustomerPhoto() {
          const pendingRole = clean(localStorage.getItem("emyMainPendingSignupRole")).toLowerCase();
          const direct = [
            localStorage.getItem("emyCustomerProfilePhoto"),
            localStorage.getItem("emyCustomerProfilePhotoSrc"),
            localStorage.getItem("emyCustomerPhoto"),
            localStorage.getItem("emyCustomerPhotoSrc"),
            localStorage.getItem("emyCustomerAvatar"),
            localStorage.getItem("emyCustomerAvatarSrc"),
            localStorage.getItem("emyCustomerProfileImage"),
            localStorage.getItem("emyCustomerProfileImageSrc"),
            pendingRole === "customer" ? localStorage.getItem("emyMainPendingSignupPhoto") : "",
            pendingRole === "customer" ? localStorage.getItem("emyMainPendingSignupPhotoSrc") : ""
          ].map(chatDirectMedia).find(Boolean);
          return direct || "";
        }
        function chatCurrentCustomerPhotoRef() {
          const pendingRole = clean(localStorage.getItem("emyMainPendingSignupRole")).toLowerCase();
          return [
            localStorage.getItem("emyCustomerProfilePhotoRef"),
            localStorage.getItem("emyCustomerPhotoRef"),
            localStorage.getItem("emyCustomerAvatarRef"),
            localStorage.getItem("emyCustomerProfileImageRef"),
            pendingRole === "customer" ? localStorage.getItem("emyMainPendingSignupPhotoRef") : "",
            localStorage.getItem("emyCustomerProfilePhoto"),
            localStorage.getItem("emyCustomerProfilePhotoSrc"),
            localStorage.getItem("emyCustomerPhoto"),
            localStorage.getItem("emyCustomerPhotoSrc"),
            localStorage.getItem("emyCustomerAvatar"),
            localStorage.getItem("emyCustomerAvatarSrc"),
            localStorage.getItem("emyCustomerProfileImage"),
            localStorage.getItem("emyCustomerProfileImageSrc")
          ].map(chatMediaRef).find(Boolean) || "";
        }
        function chatCustomerMediaSet() {
          return new Set([
            localStorage.getItem("emyCustomerProfilePhoto"),
            localStorage.getItem("emyCustomerProfilePhotoSrc"),
            localStorage.getItem("emyCustomerProfilePhotoRef"),
            localStorage.getItem("emyCustomerPhoto"),
            localStorage.getItem("emyCustomerPhotoSrc"),
            localStorage.getItem("emyCustomerPhotoRef"),
            localStorage.getItem("emyCustomerAvatar"),
            localStorage.getItem("emyCustomerAvatarSrc"),
            localStorage.getItem("emyCustomerAvatarRef"),
            localStorage.getItem("emyCustomerProfileImage"),
            localStorage.getItem("emyCustomerProfileImageSrc"),
            localStorage.getItem("emyCustomerProfileImageRef"),
            localStorage.getItem("emyMainPendingSignupPhoto"),
            localStorage.getItem("emyMainPendingSignupPhotoSrc"),
            localStorage.getItem("emyMainPendingSignupPhotoRef")
          ].map((value) => clean(value)).filter(Boolean));
        }
        function chatCustomerNameKeySet() {
          const first = clean(localStorage.getItem("emyCustomerFirstName") || localStorage.getItem("emyMainPendingSignupFirstName"));
          const last = clean(localStorage.getItem("emyCustomerLastName") || localStorage.getItem("emyMainPendingSignupLastName"));
          const fullName = [first, last].filter(Boolean).join(" ");
          const emailName = clean(localStorage.getItem("emyCustomerEmail") || localStorage.getItem("emyBusinessRegistrationCustomerEmail") || localStorage.getItem("emyBusinessOwnerCustomerEmail") || localStorage.getItem("emyMainSignedInEmail") || localStorage.getItem("emyMainPendingSignupEmail")).split("@")[0].replace(/[._-]+/g, " ");
          return new Set([
            localStorage.getItem("emyCustomerDisplayName"),
            fullName,
            emailName,
            chatCurrentCustomerName()
          ].map(normaliseChatBusinessKey).filter(Boolean));
        }
        function chatLooksCurrentCustomerIdentity(value) {
          const key = normaliseChatBusinessKey(value || "");
          return !!(key && chatCustomerNameKeySet().has(key));
        }
        function chatBusinessOnlyMedia(values) {
          const customerMedia = chatCustomerMediaSet();
          return (Array.isArray(values) ? values : []).map((value) => clean(value)).find((value) => value && !customerMedia.has(value)) || "";
        }
        function chatBusinessOnlyMediaPair(media) {
          return {
            src: chatBusinessOnlyMedia([media && media.src]),
            ref: chatBusinessOnlyMedia([media && media.ref])
          };
        }
        function chatBusinessDisplayNameForRender(key, name, source) {
          const row = source && typeof source === "object" ? source : {};
          const values = [
            row.businessName,
            row.business,
            row.storeName,
            row.sellerName,
            row.companyName,
            name
          ].map(clean).filter(Boolean);
          const chosen = values.find((value) => !chatLooksCurrentCustomerIdentity(value));
          if (chosen) return chosen;
          const profileName = chatCurrentBusinessName("");
          if (profileName && !chatLooksCurrentCustomerIdentity(profileName) && (activeProfileRole() === "business" || normaliseChatBusinessKey(key) === "profile")) return profileName;
          return titleFromBusinessKey(key || "") || "Business";
        }
        function chatCurrentBusinessName(fallback) {
          const profile = readChatJson("emyBusinessProfileDraft", {});
          return clean(profile.businessName || localStorage.getItem("emyBusinessDisplayName") || localStorage.getItem("emyBusinessName") || localStorage.getItem("emyMainPendingSignupBusinessName") || profile.name || fallback || "Business");
        }
        function chatDirectMedia(value) {
          const text = clean(value);
          return text.indexOf("data:image") === 0 || text.indexOf("data:video") === 0 || text.indexOf("blob:") === 0 || text.indexOf("http://") === 0 || text.indexOf("https://") === 0 ? text : "";
        }
        function chatMediaRef(value) {
          const text = clean(value);
          if (!text || chatDirectMedia(text)) return "";
          const lower = text.toLowerCase();
          if (/^(avatar|profile|shop|feed|product|clip|post|service|event|job|customer|business)(-|$)/.test(lower)) return "";
          if (text.indexOf("emy-video-ref:") === 0) return text.slice("emy-video-ref:".length);
          if (text.indexOf("emy-ref:") === 0) return text.slice("emy-ref:".length);
          if (text.length < 6) return "";
          for (let index = 0; index < text.length; index += 1) {
            if (text.charCodeAt(index) <= 32) return "";
          }
          return text;
        }
        function chatFirstMedia(source, srcKeys, refKeys) {
          const row = source && typeof source === "object" ? source : {};
          let src = "";
          let ref = "";
          for (const key of srcKeys) {
            src = chatDirectMedia(row[key]);
            if (src) break;
          }
          for (const key of refKeys) {
            ref = chatMediaRef(row[key]);
            if (ref) break;
          }
          if (!ref) {
            for (const key of srcKeys) {
              ref = chatMediaRef(row[key]);
              if (ref) break;
            }
          }
          return { src, ref };
        }
        function chatCurrentBusinessProfile() {
          const profile = readChatJson("emyBusinessProfileDraft", {});
          return profile && typeof profile === "object" && !Array.isArray(profile) ? profile : {};
        }
        function chatBusinessIdentityMatches(key, name, source) {
          const target = normaliseChatBusinessKey(key || name || "");
          const rawTarget = clean(key || name).toLowerCase();
          if (!target && !rawTarget) return false;
          const values = [
            source && source.businessKey,
            source && source.key,
            source && source.profileKey,
            source && source.ownerKey,
            source && source.id,
            source && source.businessName,
            source && source.business,
            source && source.name,
            source && source.title,
            source && source.actor
          ].map(clean).filter(Boolean);
          return values.some((value) => {
            const next = normaliseChatBusinessKey(value);
            const raw = value.toLowerCase();
            return next === target || next.indexOf(target) >= 0 || target.indexOf(next) >= 0 || raw === rawTarget || raw.indexOf(rawTarget) >= 0 || rawTarget.indexOf(raw) >= 0;
          });
        }
        function chatStoredBusinessPhoto(key, name, source) {
          const srcKeys = ["photo", "photoSrc", "photoUrl", "profilePhoto", "profilePhotoSrc", "businessPhoto", "businessPhotoSrc", "avatar", "avatarSrc", "businessAvatar", "businessAvatarSrc", "logo", "logoSrc", "businessLogo", "businessLogoSrc", "image", "imageSrc"];
          const refKeys = ["photoRef", "photoPublicId", "profilePhotoRef", "businessPhotoRef", "avatarRef", "businessAvatarRef", "logoRef", "businessLogoRef", "imageRef"];
          const direct = chatBusinessOnlyMediaPair(chatFirstMedia(source, srcKeys, refKeys));
          if (direct.src || direct.ref) return direct;
          const profile = chatCurrentBusinessProfile();
          const profileWithSession = Object.assign({}, profile, {
            businessKey: profile.businessKey || profile.key || localStorage.getItem("emyBusinessProfileKey") || localStorage.getItem("emyBusinessKey") || "profile",
            businessName: profile.businessName || profile.name || localStorage.getItem("emyBusinessDisplayName") || localStorage.getItem("emyBusinessName"),
            photo: chatBusinessOnlyMedia([localStorage.getItem("emyBusinessProfilePhoto"), localStorage.getItem("emyBusinessProfilePhotoSrc"), localStorage.getItem("emyBusinessPhoto"), localStorage.getItem("emyBusinessPhotoSrc"), localStorage.getItem("emyBusinessAvatar"), localStorage.getItem("emyBusinessAvatarSrc"), localStorage.getItem("emyBusinessLogo"), localStorage.getItem("emyBusinessLogoSrc"), localStorage.getItem("emyBusinessProfileImage"), localStorage.getItem("emyBusinessProfileImageSrc"), localStorage.getItem("emyMainPendingSignupBusinessPhoto"), localStorage.getItem("emyMainPendingSignupBusinessPhotoSrc"), profile.photo, profile.photoSrc, profile.photoUrl, profile.profilePhoto, profile.profilePhotoSrc, profile.businessPhoto, profile.businessPhotoSrc, profile.avatar, profile.avatarSrc, profile.businessAvatar, profile.businessAvatarSrc, profile.logo, profile.logoSrc, profile.businessLogo, profile.businessLogoSrc, profile.image, profile.imageSrc]),
            photoRef: chatBusinessOnlyMedia([localStorage.getItem("emyBusinessProfilePhotoRef"), localStorage.getItem("emyBusinessPhotoRef"), localStorage.getItem("emyBusinessAvatarRef"), localStorage.getItem("emyBusinessLogoRef"), localStorage.getItem("emyBusinessProfileImageRef"), localStorage.getItem("emyMainPendingSignupBusinessPhotoRef"), profile.photoRef, profile.photoPublicId, profile.profilePhotoRef, profile.businessPhotoRef, profile.avatarRef, profile.businessAvatarRef, profile.logoRef, profile.businessLogoRef, profile.imageRef])
          });
          const profileMedia = chatBusinessOnlyMediaPair(chatFirstMedia(profileWithSession, srcKeys, refKeys));
          if (profileMedia.src || profileMedia.ref) {
            if (chatBusinessIdentityMatches(key || "profile", name, profileWithSession) || normaliseChatBusinessKey(key) === "profile" || activeProfileRole() === "business") return profileMedia;
          }
          const saved = readChatJson("emyCustomerBusinesses", {});
          const savedRows = Array.isArray(saved) ? saved : (saved && typeof saved === "object" ? Object.values(saved) : []);
          for (const item of savedRows) {
            if (!chatBusinessIdentityMatches(key, name, item)) continue;
            const media = chatBusinessOnlyMediaPair(chatFirstMedia(item, srcKeys, refKeys));
            if (media.src || media.ref) return media;
          }
          return { src: "", ref: "" };
        }
        function chatSenderRole(item) {
          const role = clean(item && (item.senderRole || item.role || item.fromRole)).toLowerCase();
          if (role === "business" || role === "customer") return role;
          const recipient = clean(item && item.recipientRole).toLowerCase();
          if (recipient === "business") return "customer";
          if (recipient === "customer") return "business";
          const author = normaliseChatBusinessKey(item && (item.author || item.senderName || item.name));
          const businessName = normaliseChatBusinessKey(item && item.businessName);
          const customerName = normaliseChatBusinessKey(item && (item.customerName || item.customer || item.customerDisplayName));
          if (author && businessName && author === businessName) return "business";
          if (author && customerName && author === customerName) return "customer";
          return item && item.mine ? "customer" : "business";
        }
        function chatOwnsCurrentView(item) {
          const role = activeProfileRole() === "business" ? "business" : "customer";
          return chatSenderRole(item) === role;
        }
        function chatNameFromEmail(email) {
          const local = clean(email).split("@")[0] || "";
          return local.replace(/[._-]+/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()).trim();
        }
        function chatLooksPlaceholderCustomerName(value, businessName) {
          const text = clean(value);
          if (!text) return true;
          const key = normaliseChatBusinessKey(text);
          const businessKey = normaliseChatBusinessKey(businessName || "");
          if (["profile", "business-profile", "business", "your-business", "customer"].includes(key)) return true;
          return !!businessKey && key === businessKey;
        }
        function chatCustomerNameFromMessage(item, business) {
          const businessName = clean(item && item.businessName) || clean(business && business.name);
          const email = clean(item && (item.customerEmail || item.email));
          const explicit = clean(item && (item.customerName || item.customer || item.customerDisplayName));
          if (!chatLooksPlaceholderCustomerName(explicit, businessName)) return explicit;
          const author = clean(item && (item.author || item.senderName || item.name));
          if (chatSenderRole(item) === "customer" && !chatLooksPlaceholderCustomerName(author, businessName)) return author;
          return chatNameFromEmail(email) || chatCurrentCustomerName();
        }
        function chatMessageDisplayName(item, business) {
          const senderRole = chatSenderRole(item);
          if (senderRole === "business") return chatBusinessDisplayNameForRender(business && business.key, business && business.name, item) || "Business";
          if (chatOwnsCurrentView(item)) return clean(item && item.customerName) || chatCurrentCustomerName();
          return chatCustomerNameFromMessage(item, business);
        }
        function chatBusinessNotificationKeys(business) {
          const values = [
            business && business.key,
            business && business.name,
            normaliseChatBusinessKey(business && business.key),
            normaliseChatBusinessKey(business && business.name),
            localStorage.getItem("emyBusinessProfileKey"),
            localStorage.getItem("emyBusinessKey"),
            localStorage.getItem("emyBusinessDisplayName"),
            localStorage.getItem("emyBusinessName")
          ].map(clean).filter(Boolean);
          return Array.from(new Set(values));
        }
        function chatStoredNotificationId(item, index) {
          return clean(item && (item.id || item.notificationId)) || "notification-" + index;
        }
        function chatNotificationTime(value) {
          const raw = clean(value);
          if (!raw) return "Just now";
          const date = new Date(raw);
          if (Number.isNaN(date.getTime())) return raw;
          const diff = Math.max(0, Date.now() - date.getTime());
          const minute = 60 * 1000;
          const hour = 60 * minute;
          const day = 24 * hour;
          if (diff < minute) return "Just now";
          if (diff < hour) return Math.max(1, Math.round(diff / minute)) + " min ago";
          if (diff < day) return Math.max(1, Math.round(diff / hour)) + " hr ago";
          return date.toLocaleDateString(undefined, { day: "numeric", month: "short" }) + ", " + date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
        }
        function chatNotificationDataMedia(value) {
          const text = clean(value);
          return text.indexOf("data:image") === 0 || text.indexOf("data:video") === 0 || text.indexOf("blob:") === 0 || text.indexOf("http://") === 0 || text.indexOf("https://") === 0 ? text : "";
        }
        function chatNotificationMediaToken(src, ref, type) {
          const direct = chatNotificationDataMedia(src);
          const source = clean(src);
          const mediaType = clean(type).toLowerCase();
          if (direct) return direct;
          if (source.indexOf("emy-video-ref:") === 0 || source.indexOf("emy-ref:") === 0) return source;
          const storedRef = clean(ref) || source;
          if (!storedRef) return "";
          return (mediaType === "video" ? "emy-video-ref:" : "emy-ref:") + storedRef;
        }
        function chatNotificationSlug(value) {
          return clean(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
        }
        function chatNotificationStoredItems() {
          const keys = ["emyFeedCreatedPosts", "emyFeedCreatedJobs", "emyFeedCreatedEvents", "emyBusinessFeedPosts", "emyBusinessPosts", "emyBusinessProducts", "emyBusinessProductList", "emyBusinessProductPosts", "emyFeedReposts", "emyBusinessClips", "emyBusinessReels", "emyBusinessProductReels"];
          const items = [];
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
          keys.forEach((key) => {
            const value = readChatJson(key, []);
            if (Array.isArray(value)) value.forEach(pushItem);
            else if (value && typeof value === "object") Object.values(value).forEach(pushItem);
          });
          return items;
        }
        function chatNotificationStoredMatch(item) {
          const raw = item && item.raw && typeof item.raw === "object" ? item.raw : item || {};
          const ref = raw.ref && typeof raw.ref === "object" ? raw.ref : {};
          const detail = raw.detailSnapshot && typeof raw.detailSnapshot === "object" ? raw.detailSnapshot : raw.original && typeof raw.original === "object" ? raw.original : {};
          const id = clean(raw.feedId || raw.itemId || raw.postId || raw.productId || ref.feedId || ref.id || detail.feedId || detail.id);
          const title = chatNotificationSlug(raw.itemTitle || raw.productTitle || raw.postTitle || ref.title || ref.productTitle || detail.title || detail.itemTitle || raw.title);
          const businessKey = chatNotificationSlug(raw.businessKey || raw.key || raw.businessName || ref.businessKey || ref.key || ref.businessName || detail.businessKey || detail.key || detail.businessName);
          return chatNotificationStoredItems().find((entry) => {
            const entryId = clean(entry && (entry.id || entry.itemId || entry.feedId || entry.postId || entry.productId || entry.originalFeedId));
            const entryTitle = chatNotificationSlug(entry && (entry.itemTitle || entry.productTitle || entry.postTitle || entry.title || entry.name || entry.text || entry.caption));
            const entryKey = chatNotificationSlug(entry && (entry.businessKey || entry.key || entry.business || entry.businessName || entry.actor));
            return (id && entryId && (id === entryId || id.indexOf(entryId) >= 0 || entryId.indexOf(id) >= 0)) ||
              (title && entryTitle && (entryTitle.indexOf(title) >= 0 || title.indexOf(entryTitle) >= 0)) ||
              (businessKey && entryKey === businessKey && (entry.mediaSrc || entry.mediaRef || entry.image || entry.imageRef || entry.video || entry.videoRef || entry.coverRef || entry.avatarSrc || entry.profilePhoto || entry.businessPhoto || (Array.isArray(entry.mediaItems) && entry.mediaItems.length)));
          }) || {};
        }
        function chatNotificationAvatar(item) {
          const raw = item && item.raw && typeof item.raw === "object" ? item.raw : item || {};
          const wrapped = raw.raw && typeof raw.raw === "object" ? raw.raw : {};
          const ref = raw.ref && typeof raw.ref === "object" ? raw.ref : wrapped.ref && typeof wrapped.ref === "object" ? wrapped.ref : {};
          const detail = raw.detailSnapshot && typeof raw.detailSnapshot === "object" ? raw.detailSnapshot : wrapped.detailSnapshot && typeof wrapped.detailSnapshot === "object" ? wrapped.detailSnapshot : ref.detailSnapshot && typeof ref.detailSnapshot === "object" ? ref.detailSnapshot : raw.original && typeof raw.original === "object" ? raw.original : ref.original && typeof ref.original === "object" ? ref.original : {};
          const match = chatNotificationStoredMatch(raw);
          const businessMedia = chatStoredBusinessPhoto(raw.businessKey || ref.businessKey || detail.businessKey || match.businessKey, raw.businessName || ref.businessName || detail.businessName || match.businessName, Object.assign({}, match, detail, ref, raw));
          return chatNotificationMediaToken(
            raw.avatar || raw.avatarSrc || raw.actorPhoto || raw.actorAvatar || raw.viewerPhoto || raw.customerPhoto || raw.customerPhotoSrc || raw.customerAvatar || raw.profilePhoto || raw.profilePhotoSrc || raw.photo || raw.photoSrc || raw.imageSrc || raw.logo || raw.businessPhoto,
            raw.avatarRef || raw.actorPhotoRef || raw.actorAvatarRef || raw.viewerPhotoRef || raw.customerPhotoRef || raw.customerAvatarRef || raw.profilePhotoRef || raw.photoRef || raw.imageRef || raw.logoRef || raw.businessPhotoRef,
            "image"
          ) || chatNotificationMediaToken(
            detail.detailAvatarSrc || detail.itemAvatarSrc || detail.avatarSrc || detail.profilePhoto || detail.businessPhoto || detail.logo || detail.photo,
            detail.detailAvatarRef || detail.itemAvatarRef || detail.avatarRef || detail.profilePhotoRef || detail.businessPhotoRef || detail.logoRef || detail.photoRef,
            "image"
          ) || chatNotificationMediaToken(
            ref.avatar || ref.avatarSrc || ref.actorPhoto || ref.customerPhoto || ref.profilePhoto || ref.logo || ref.photo || ref.businessPhoto,
            ref.avatarRef || ref.actorPhotoRef || ref.customerPhotoRef || ref.profilePhotoRef || ref.logoRef || ref.photoRef || ref.businessPhotoRef,
            "image"
          ) || chatNotificationMediaToken(
            match.avatarSrc || match.avatar || match.actorPhoto || match.viewerPhoto || match.customerPhoto || match.profilePhoto || match.logo || match.photo || match.businessPhoto,
            match.avatarRef || match.actorPhotoRef || match.viewerPhotoRef || match.customerPhotoRef || match.profilePhotoRef || match.logoRef || match.photoRef || match.businessPhotoRef,
            "image"
          ) || chatNotificationMediaToken(businessMedia.src, businessMedia.ref, "image") || chatNotificationMediaToken(chatCurrentCustomerPhoto(), chatCurrentCustomerPhotoRef(), "image");
        }
        function chatNotificationThumb(item) {
          const raw = item && item.raw && typeof item.raw === "object" ? item.raw : item || {};
          const wrapped = raw.raw && typeof raw.raw === "object" ? raw.raw : {};
          const ref = raw.ref && typeof raw.ref === "object" ? raw.ref : wrapped.ref && typeof wrapped.ref === "object" ? wrapped.ref : {};
          const detail = raw.detailSnapshot && typeof raw.detailSnapshot === "object" ? raw.detailSnapshot : wrapped.detailSnapshot && typeof wrapped.detailSnapshot === "object" ? wrapped.detailSnapshot : ref.detailSnapshot && typeof ref.detailSnapshot === "object" ? ref.detailSnapshot : raw.original && typeof raw.original === "object" ? raw.original : ref.original && typeof ref.original === "object" ? ref.original : {};
          const match = chatNotificationStoredMatch(raw);
          const mediaItems = Array.isArray(raw.mediaItems) ? raw.mediaItems : Array.isArray(ref.mediaItems) ? ref.mediaItems : Array.isArray(detail.mediaItems) ? detail.mediaItems : Array.isArray(match.mediaItems) ? match.mediaItems : [];
          const firstMedia = mediaItems[0] || {};
          return chatNotificationMediaToken(
            raw.thumb || raw.thumbnail || raw.image || raw.imageSrc || raw.cover || raw.coverSrc || raw.mediaSrc || raw.posterSrc || raw.thumbnailSrc || ref.thumb || ref.thumbnail || ref.image || ref.imageSrc || ref.cover || ref.coverSrc || ref.mediaSrc || ref.posterSrc || ref.thumbnailSrc || detail.mediaSrc || detail.posterSrc || detail.thumbnailSrc,
            raw.thumbRef || raw.thumbnailRef || raw.imageRef || raw.coverRef || raw.mediaRef || raw.posterRef || raw.thumbnailRef || ref.thumbRef || ref.thumbnailRef || ref.imageRef || ref.coverRef || ref.mediaRef || ref.posterRef || ref.thumbnailRef || detail.mediaRef || detail.posterRef || detail.thumbnailRef,
            raw.mediaType || ref.mediaType || detail.mediaType || raw.type || ref.type
          ) || chatNotificationMediaToken(
            firstMedia.src || firstMedia.mediaSrc || firstMedia.posterSrc || firstMedia.thumbnailSrc || match.image || match.video || match.mediaSrc || match.cover || match.coverSrc || match.posterSrc || match.thumbnailSrc,
            firstMedia.ref || firstMedia.mediaRef || firstMedia.posterRef || firstMedia.thumbnailRef || match.mediaRef || match.imageRef || match.videoRef || match.coverRef || match.posterRef || match.thumbnailRef,
            firstMedia.type || match.mediaType || match.coverType || raw.mediaType || ref.mediaType
          );
        }
        function chatNotificationKindLabel(item) {
          const ref = item && item.ref && typeof item.ref === "object" ? item.ref : {};
          const typeText = [item && item.type, item && item.action, item && item.itemKind, item && item.kind, ref.type, ref.kind].join(" ").toLowerCase();
          if (typeText.includes("message") || typeText.includes("chat")) return "Message";
          const text = [item && item.itemKind, item && item.kind, ref.type, ref.kind, item && item.type, item && item.action, item && item.title, item && item.body].join(" ").toLowerCase();
          if (text.includes("reply")) return "Reply";
          if (text.includes("comment")) return "Comment";
          if (text.includes("clip") || text.includes("reel")) return "Clip";
          if (text.includes("product")) return "Product";
          if (text.includes("post") || text.includes("feed")) return "Post";
          if (text.includes("message") || text.includes("chat")) return "Message";
          return "Update";
        }
        function chatNotificationThumbFallback(item) {
          return chatNotificationKindLabel(item);
        }
        function chatNotificationFallback(item) {
          const source = clean(item && (item.actorName || item.customerName || item.viewerName || item.author || item.name || item.senderName || item.initials || item.title));
          return source.split(" ").filter(Boolean).slice(0, 2).map((word) => word.charAt(0)).join("").toUpperCase() || source.slice(0, 2).toUpperCase() || "?";
        }
        function normaliseChatNotification(item, index) {
          const raw = item && typeof item === "object" ? item : {};
          const createdAt = clean(raw.createdAt || raw.created || raw.time || raw.addedAt);
          return {
            id: chatStoredNotificationId(raw, index),
            group: clean(raw.group || raw.type || (raw.important ? "important" : "more")),
            type: clean(raw.type),
            action: clean(raw.action || raw.ref && raw.ref.action),
            title: clean(raw.title || raw.message || raw.body || "Notification"),
            body: clean(raw.body || raw.message || raw.text || raw.description),
            message: clean(raw.message || raw.body || raw.text),
            href: clean(raw.href || raw.url).replace("#notifications", ""),
            businessKey: normaliseChatBusinessKey(raw.businessKey || raw.key || raw.businessName),
            customerKey: chatMessageCustomerKey(raw),
            itemKind: clean(raw.itemKind || raw.kind || raw.ref && (raw.ref.type || raw.ref.kind)),
            itemTitle: clean(raw.itemTitle || raw.productTitle || raw.postTitle || raw.ref && raw.ref.title),
            feedId: clean(raw.feedId || raw.itemId || raw.postId || raw.productId || raw.ref && (raw.ref.feedId || raw.ref.id)),
            ref: raw.ref && typeof raw.ref === "object" ? raw.ref : null,
            avatar: chatNotificationAvatar(raw),
            thumb: chatNotificationThumb(raw),
            actorName: clean(raw.actorName || raw.customerName || raw.viewerName || raw.author || raw.name || raw.senderName),
            initials: chatNotificationFallback(raw),
            unread: raw.read === true ? false : raw.unread === false ? false : true,
            hidden: !!raw.hidden,
            rawTime: createdAt,
            time: chatNotificationTime(createdAt),
            timeMs: createdAt ? (new Date(createdAt).getTime() || 0) : 0,
            raw
          };
        }
        function chatBusinessNotificationStorageKeys() {
          const keys = new Set();
          refreshKnownBusinesses().forEach((business) => {
            chatBusinessNotificationKeys(business).forEach((key) => keys.add(key));
          });
          try {
            for (let index = 0; index < localStorage.length; index += 1) {
              const storageKey = localStorage.key(index) || "";
              if (storageKey.indexOf("emyBusinessNotifications:") !== 0) continue;
              const suffix = storageKey.slice("emyBusinessNotifications:".length);
              const normalised = normaliseChatBusinessKey(suffix);
              if (!keys.size || keys.has(suffix) || keys.has(normalised)) keys.add(suffix);
            }
          } catch (error) {}
          return Array.from(keys);
        }
        function chatNotificationIsSelfAction(item) {
          const raw = item && item.raw && typeof item.raw === "object" ? item.raw : item || {};
          const type = clean(raw.type || item && item.type).toLowerCase();
          const text = [raw.title, raw.body, raw.message, item && item.title, item && item.body].map(clean).join(" ").toLowerCase();
          const currentName = chatCurrentCustomerName().toLowerCase();
          const first = clean(localStorage.getItem("emyMainPendingSignupFirstName") || localStorage.getItem("emyCustomerFirstName")).toLowerCase();
          const names = [currentName, first].filter(Boolean);
          const verbs = [" liked", " commented", " replied", " saved", " shared", " interacted", " applied"];
          return raw.notifyCustomer === false ||
            type === "business-customer" ||
            text.includes("your job post is live") ||
            text.includes("your event is live") ||
            names.some((name) => name && verbs.some((verb) => text.includes(name + verb)));
        }
        function readChatNotifications() {
          const rows = [];
          if (activeProfileRole() === "business") {
            chatBusinessNotificationStorageKeys().forEach((key) => {
              readChatArray("emyBusinessNotifications:" + key).forEach((item) => rows.push(item));
            });
          } else {
            readChatArray("emyCustomerNotifications").forEach((item) => {
              if (!chatNotificationIsSelfAction(item)) rows.push(item);
            });
          }
          const seen = new Set();
          return rows.map(normaliseChatNotification).filter((item) => {
            if (!item || item.hidden || !item.title) return false;
            const id = item.id || item.title + item.rawTime;
            if (seen.has(id)) return false;
            seen.add(id);
            return true;
          }).sort((a, b) => b.timeMs - a.timeMs);
        }
        function countChatNotifications() {
          return readChatNotifications().filter((item) => item.unread).length;
        }
        function updateChatNotificationStorage(mapper) {
          const updateKey = (key) => {
            const rows = readChatArray(key);
            writeChatArray(key, rows.map((item, index) => mapper(item, chatStoredNotificationId(item, index))).filter(Boolean), 80);
          };
          if (activeProfileRole() === "business") {
            chatBusinessNotificationStorageKeys().forEach((key) => updateKey("emyBusinessNotifications:" + key));
            return;
          }
          updateKey("emyCustomerNotifications");
        }
        function markChatNotificationsSeen(id) {
          updateChatNotificationStorage((item, storedId) => {
            if (!item || typeof item !== "object") return item;
            if (id && storedId !== id) return item;
            return Object.assign({}, item, { read: true, unread: false });
          });
        }
        function dismissChatNotification(id) {
          updateChatNotificationStorage((item, storedId) => storedId === id ? null : item);
          renderChatNotifications();
        }
        function hideChatNotification(id) {
          updateChatNotificationStorage((item, storedId) => storedId === id && item && typeof item === "object" ? Object.assign({}, item, { hidden: true, read: true, unread: false }) : item);
          renderChatNotifications();
        }
        function chatNotificationIsMessage(item) {
          const raw = item && item.raw && typeof item.raw === "object" ? item.raw : item || {};
          const ref = raw.ref && typeof raw.ref === "object" ? raw.ref : item && item.ref && typeof item.ref === "object" ? item.ref : {};
          const text = [
            raw.type, raw.action, raw.kind, raw.itemKind,
            item && item.type, item && item.action, item && item.kind, item && item.itemKind,
            ref.type, ref.kind, raw.title, raw.body, raw.message, item && item.title, item && item.body
          ].map(clean).join(" ").toLowerCase();
          return text.includes("message") || text.includes(" chat") || text.includes("new reply from");
        }
        function chatNotificationIsBusinessReview(item) {
          const raw = item && item.raw && typeof item.raw === "object" ? item.raw : item || {};
          const ref = raw.ref && typeof raw.ref === "object" ? raw.ref : item && item.ref && typeof item.ref === "object" ? item.ref : {};
          const identity = [raw.id, raw.type, raw.itemKind, raw.kind, raw.action, raw.target, item && item.type, item && item.itemKind, ref.type, ref.kind, raw.title, item && item.title].map(clean).join(" ").toLowerCase();
          const body = [raw.body, raw.message, raw.text, item && item.body, item && item.message].map(clean).join(" ").toLowerCase();
          return identity.includes("business-review") ||
            identity.includes("business-profile") ||
            identity.includes("business approved") ||
            identity.includes("business rejected") ||
            identity.includes("customer-business-approved") ||
            identity.includes("customer-business-rejected") ||
            ((identity.includes("business") || body.includes("business")) && /(approved|not approved|rejected|review|registration)/.test(identity + " " + body));
        }
        function chatNotificationBusinessKey(item) {
          const raw = item && item.raw && typeof item.raw === "object" ? item.raw : item || {};
          const ref = raw.ref && typeof raw.ref === "object" ? raw.ref : item && item.ref && typeof item.ref === "object" ? item.ref : {};
          let key = normaliseChatBusinessKey(item && item.businessKey || raw.businessKey || raw.key || raw.businessName || ref.businessKey || ref.key || ref.businessName);
          if (!key) {
            try {
              const href = clean(item && item.href || raw.href || raw.url);
              key = normaliseChatBusinessKey(new URL(href, window.location.href).searchParams.get("business") || "");
            } catch (error) {}
          }
          return key;
        }
        function chatNotificationDetailPayload(item) {
          const raw = item && item.raw && typeof item.raw === "object" ? item.raw : item || {};
          const wrapped = raw.raw && typeof raw.raw === "object" ? raw.raw : {};
          const ref = raw.ref && typeof raw.ref === "object" ? raw.ref : wrapped.ref && typeof wrapped.ref === "object" ? wrapped.ref : {};
          const detail = raw.detailSnapshot && typeof raw.detailSnapshot === "object" ? raw.detailSnapshot : wrapped.detailSnapshot && typeof wrapped.detailSnapshot === "object" ? wrapped.detailSnapshot : ref.detailSnapshot && typeof ref.detailSnapshot === "object" ? ref.detailSnapshot : raw.original && typeof raw.original === "object" ? raw.original : wrapped.original && typeof wrapped.original === "object" ? wrapped.original : ref.original && typeof ref.original === "object" ? ref.original : {};
          const match = chatNotificationStoredMatch(raw);
          const kind = clean(raw.itemKind || raw.kind || detail.itemKind || detail.detailKind || detail.kind || ref.type || ref.kind || match.itemKind || match.kind || chatNotificationKindLabel(item) || "Post");
          const title = clean(raw.itemTitle || detail.itemTitle || detail.title || ref.itemTitle || ref.title || ref.productTitle || match.itemTitle || match.title || match.name || raw.productTitle || raw.postTitle || raw.title);
          const feedId = clean(raw.feedId || raw.itemId || raw.postId || raw.productId || detail.feedId || detail.id || ref.feedId || ref.id || match.feedId || match.id);
          const avatar = chatNotificationAvatar(raw);
          const avatarRef = avatar.indexOf("emy-ref:") === 0 ? avatar.slice("emy-ref:".length) : "";
          const avatarSrc = avatarRef ? "" : avatar;
          const mediaItems = Array.isArray(detail.mediaItems) ? detail.mediaItems : Array.isArray(ref.mediaItems) ? ref.mediaItems : Array.isArray(match.mediaItems) ? match.mediaItems : Array.isArray(raw.mediaItems) ? raw.mediaItems : [];
          return {
            createdAt: Date.now(),
            id: feedId,
            feedId,
            businessKey: chatNotificationBusinessKey(item) || clean(detail.businessKey || detail.key || ref.businessKey || ref.key || match.businessKey || match.key),
            detailKind: kind,
            kind,
            title: title || kind,
            description: clean(detail.detailDescription || detail.description || detail.text || detail.caption || detail.productDescription || ref.description || ref.text || ref.caption || ref.productDescription || match.description || match.text || match.caption || match.productDescription || raw.detailDescription || raw.description || raw.body || raw.message),
            business: clean(detail.businessName || detail.business || ref.businessName || ref.business || match.businessName || match.business || raw.businessName || raw.business),
            price: clean(detail.price || detail.productPrice || ref.price || ref.productPrice || match.price || match.productPrice || raw.price || raw.productPrice),
            media: clean(detail.mediaClass || detail.media || ref.mediaClass || ref.media || match.mediaClass || match.media || raw.mediaClass || raw.media || kind),
            mediaSrc: clean(detail.mediaSrc || detail.detailMediaSrc || ref.mediaSrc || match.mediaSrc || match.image || match.video || raw.mediaSrc),
            mediaRef: clean(detail.mediaRef || detail.detailMediaRef || ref.mediaRef || match.mediaRef || match.imageRef || match.videoRef || raw.mediaRef),
            mediaType: clean(detail.mediaType || detail.detailMediaType || ref.mediaType || match.mediaType || raw.mediaType),
            posterSrc: clean(detail.posterSrc || detail.detailPosterSrc || detail.thumbnailSrc || ref.posterSrc || ref.thumbnailSrc || match.posterSrc || match.thumbnailSrc || raw.posterSrc || raw.thumbnailSrc),
            posterRef: clean(detail.posterRef || detail.detailPosterRef || detail.thumbnailRef || ref.posterRef || ref.thumbnailRef || match.posterRef || match.thumbnailRef || raw.posterRef || raw.thumbnailRef),
            avatarSrc,
            avatarRef,
            detailAvatarSrc: avatarSrc,
            detailAvatarRef: avatarRef,
            businessPhoto: avatarSrc,
            businessPhotoRef: avatarRef,
            mediaItems,
            meta: clean(raw.detailMeta || detail.meta || ref.meta || match.meta),
            ref: Object.assign({}, match, ref, detail)
          };
        }
        function chatNotificationStorePendingItemDetail(item) {
          try {
            const payload = chatNotificationDetailPayload(item);
            if (!payload.title && !payload.feedId) return false;
            localStorage.setItem("emyPendingItemDetailOpen", JSON.stringify(payload));
            return true;
          } catch (error) {}
          return false;
        }
        function chatNotificationOpenThreadInPlace(item) {
          if (!item || !chatNotificationIsMessage(item) || activeProfileRole() === "business") return false;
          const key = chatNotificationBusinessKey(item);
          if (!key) return false;
          try {
            localStorage.setItem("emyCustomerChatOpenKey", key);
            localStorage.setItem("emySelectedBusinessProfileKey", key);
            const raw = item.raw && typeof item.raw === "object" ? item.raw : item;
            const name = clean(item.businessName || raw.businessName || raw.business || raw.name);
            if (name) localStorage.setItem("emySelectedBusinessProfileName", name);
          } catch (error) {}
          openThread(key);
          setChatNotificationsOpen(false);
          return true;
        }
        function chatNotificationOpenItemInPlace(item) {
          try {
            if (!item || chatNotificationIsMessage(item) || chatNotificationIsBusinessReview(item) || typeof window.emyOpenItemDetail !== "function") return false;
            const raw = item.raw && typeof item.raw === "object" ? item.raw : item;
            const hasItemTarget = !!(item.feedId || item.itemTitle || item.ref || raw.feedId || raw.itemId || raw.postId || raw.productId || raw.detailSnapshot || raw.original || raw.ref);
            if (!hasItemTarget) return false;
            if (!chatNotificationStorePendingItemDetail(item)) return false;
            const payload = JSON.parse(localStorage.getItem("emyPendingItemDetailOpen") || "null");
            if (!payload || typeof payload !== "object") return false;
            const titleText = clean(payload.title || payload.detailTitle || payload.productTitle);
            const feedId = clean(payload.feedId || payload.id || payload.productId);
            if (!titleText && !feedId) return false;
            const kindText = clean(payload.detailKind || payload.kind || payload.type || chatNotificationKindLabel(item) || "Post");
            const kindLower = kindText.toLowerCase();
            const virtualCard = document.createElement("article");
            virtualCard.className = kindLower.includes("clip") || kindLower.includes("reel") ? "card reel-card feed-product-clip-card is-clip" : kindLower.includes("product") ? "card product-card feed-product-card is-product" : "feed-card social-feed-card is-post";
            virtualCard.setAttribute("data-card", "");
            virtualCard.setAttribute("data-open-item-detail", "");
            virtualCard.style.cssText = "position:absolute;left:-9999px;top:0;width:1px;height:1px;overflow:hidden;pointer-events:none;";
            virtualCard.setAttribute("aria-hidden", "true");
            const setData = (name, value) => {
              const cleanValue = clean(value);
              if (cleanValue) virtualCard.dataset[name] = cleanValue;
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
            setChatNotificationsOpen(false);
            return true;
          } catch (error) {}
          return false;
        }
        function chatNotificationTarget(item) {
          if (!item) return "emy-customer-home.html#feeds";
          const raw = item.raw && typeof item.raw === "object" ? item.raw : item;
          const ref = item.ref && typeof item.ref === "object" ? item.ref : raw.ref && typeof raw.ref === "object" ? raw.ref : {};
          const href = clean(item.href || raw.href || raw.url).replace("#notifications", "");
          const type = clean(item.type || raw.type).toLowerCase();
          const action = clean(item.action || raw.action || ref.action).toLowerCase();
          const kindLabel = chatNotificationKindLabel(item);
          const kind = kindLabel.toLowerCase();
          const key = chatNotificationBusinessKey(item);
          if (chatNotificationIsBusinessReview(item)) {
            if (href && /emy-business-profile\.html/i.test(href) && href.indexOf("#notifications") === -1) return href;
            return "emy-business-profile.html?view=customer" + (key ? "&business=" + encodeURIComponent(key) : "");
          }
          if (chatNotificationIsMessage(item)) {
            if (activeProfileRole() === "business" || type.includes("customer-message")) {
              const customerKey = clean(item.customerKey || raw.customerKey || raw.customerId);
              return "emy-business-profile.html?mode=chat" + (key ? "&business=" + encodeURIComponent(key) : "") + (customerKey ? "&customer=" + encodeURIComponent(customerKey) : "");
            }
            return "emy-customer-chat.html" + (key ? "?business=" + encodeURIComponent(key) : "");
          }
          const feedId = clean(item.feedId || raw.feedId || raw.itemId || raw.postId || raw.productId || ref.feedId || ref.id);
          const itemTitle = clean(item.itemTitle || raw.itemTitle || raw.productTitle || raw.postTitle || ref.title);
          if (feedId || itemTitle || ref && Object.keys(ref).length) {
            chatNotificationStorePendingItemDetail(item);
            const params = [];
            if (action) params.push("notificationAction=" + encodeURIComponent(action));
            if (feedId) params.push("feedId=" + encodeURIComponent(feedId));
            if (itemTitle) params.push("item=" + encodeURIComponent(itemTitle));
            if (kindLabel) params.push("kind=" + encodeURIComponent(kindLabel));
            const query = params.length ? "?" + params.join("&") : "";
            if (kind === "clip") return "emy-customer-home.html" + query + "#reels";
            if (kind === "product") return "emy-customer-search.html" + query + "#products";
            return "emy-customer-home.html" + query + "#feeds";
          }
          const profileOnly = /emy-customer-profile\.html/i.test(href) || (/emy-business-profile\.html/i.test(href) && /notificationAction|feedId/i.test(href));
          if (href && href !== "#" && !profileOnly) return href;
          if (key) return "emy-business-profile.html?business=" + encodeURIComponent(key);
          return "emy-customer-home.html#feeds";
        }
        function openChatNotification(item) {
          if (!item) return;
          markChatNotificationsSeen(item.id);
          if (chatNotificationOpenThreadInPlace(item)) return;
          if (chatNotificationOpenItemInPlace(item)) return;
          const target = chatNotificationTarget(item);
          if (target && target !== "#") window.location.href = target;
          else renderChatNotifications();
        }
        function chatNotificationImage(src, className, fallback) {
          let media = clean(src);
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
          if (!(media || ref)) {
            if (className.indexOf("thumb") >= 0) {
              const label = fallback || "Update";
              const kind = String(label).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "update";
              return '<span class="' + escapeAttr(className) + ' is-fallback is-' + escapeAttr(kind) + '" aria-hidden="true"><b>' + escapeAttr(label) + '</b><small>Open</small></span>';
            }
            return '<span class="' + escapeAttr(className) + ' is-fallback" aria-hidden="true">' + escapeAttr(fallback || "") + '</span>';
          }
          const refAttr = ref ? ' data-emy-media-ref="' + escapeAttr(ref) + '"' : "";
          const lower = media.toLowerCase();
          const isVideo = refType === "video" || lower.indexOf("data:video") === 0 || lower.indexOf("blob:") === 0 || lower.indexOf(".mp4") >= 0 || lower.indexOf(".webm") >= 0 || lower.indexOf(".mov") >= 0;
          return '<span class="' + escapeAttr(className) + '" aria-hidden="true">' + (isVideo ? '<video' + (media ? ' src="' + escapeAttr(media) + '"' : '') + refAttr + ' muted playsinline preload="metadata"></video>' : '<img' + (media ? ' src="' + escapeAttr(media) + '"' : '') + refAttr + ' alt="" />') + '</span>';
        }
        function renderChatNotificationGroup(title, items) {
          if (!items.length) return '<h3 class="notifications-section-title">' + escapeAttr(title) + '</h3><p class="notifications-empty">You are all caught up for now.</p>';
          return '<h3 class="notifications-section-title">' + escapeAttr(title) + '</h3>' +
            items.map((item) => (
              '<article class="notification-row' + (item.unread ? ' is-unread' : '') + '" role="button" tabindex="0" data-chat-notification-id="' + escapeAttr(item.id) + '">' +
                chatNotificationImage(item.avatar, "notification-avatar", item.initials) +
                '<span class="notification-text"><strong>' + escapeAttr(item.title) + '</strong>' + (item.body ? '<span>' + escapeAttr(item.body) + '</span>' : '') + '<time datetime="' + escapeAttr(item.rawTime) + '">' + escapeAttr(item.time) + '</time></span>' +
                chatNotificationImage(item.thumb, "notification-thumb", chatNotificationThumbFallback(item)) +
                '<button class="notification-more" type="button" data-chat-notification-menu="' + escapeAttr(item.id) + '" aria-label="Notification options" aria-expanded="false"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5.5h.01M12 12h.01M12 18.5h.01" stroke="currentColor" stroke-linecap="round"/></svg></button>' +
                '<div class="notification-action-menu" data-chat-notification-menu-panel="' + escapeAttr(item.id) + '" hidden>' +
                  '<button type="button" data-chat-notification-action="hide" data-chat-notification-action-id="' + escapeAttr(item.id) + '"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 3l18 18" stroke="currentColor" stroke-linecap="round"/><path d="M7.5 7.7C5.4 8.9 3.9 10.8 3 12c1.8 2.6 4.8 5.5 9 5.5 1.5 0 2.8-.35 4-.95" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Hide this notification</span></button>' +
                  '<button type="button" data-chat-notification-action="delete" data-chat-notification-action-id="' + escapeAttr(item.id) + '"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 7h14M10 11v6M14 11v6M8 7l1-3h6l1 3M7 7l1 14h8l1-14" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Delete this notification</span></button>' +
                '</div>' +
              '</article>'
            )).join("");
        }
        function closeChatNotificationMenus() {
          if (!notificationList) return;
          notificationList.querySelectorAll("[data-chat-notification-menu-panel]").forEach((menu) => { menu.hidden = true; });
          notificationList.querySelectorAll("[data-chat-notification-menu]").forEach((button) => { button.setAttribute("aria-expanded", "false"); });
        }
        function toggleChatNotificationMenu(id, button) {
          if (!notificationList) return;
          const menu = notificationList.querySelector('[data-chat-notification-menu-panel="' + CSS.escape(id) + '"]');
          if (!menu) return;
          const willOpen = menu.hidden;
          closeChatNotificationMenus();
          menu.hidden = !willOpen;
          if (button) button.setAttribute("aria-expanded", willOpen ? "true" : "false");
        }
        function renderChatNotifications() {
          const notifications = readChatNotifications();
          const unreadCount = notifications.filter((item) => item.unread).length;
          if (headerNotificationCount) {
            headerNotificationCount.textContent = String(unreadCount);
            headerNotificationCount.setAttribute("aria-label", unreadCount + " unread notifications");
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
          notificationList.innerHTML = renderChatNotificationGroup("Important", important) + '<div class="notifications-divider"></div>' + renderChatNotificationGroup("More notifications", more);
          if (window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(notificationList);
        }
        function positionChatNotificationsPanel() {
          if (!notificationPanel || !headerNotifications) return;
          const rect = headerNotifications.getBoundingClientRect();
          const width = Math.min(420, Math.max(280, window.innerWidth - 20));
          notificationPanel.style.width = width + "px";
          notificationPanel.style.left = Math.min(window.innerWidth - width - 10, Math.max(10, rect.right - width)) + "px";
          notificationPanel.style.right = "auto";
          notificationPanel.style.top = Math.max(10, rect.bottom + 10) + "px";
        }
        function setChatNotificationsOpen(isOpen) {
          if (!notificationPanel || !headerNotifications) return;
          notificationPanel.classList.toggle("is-open", !!isOpen);
          notificationPanel.setAttribute("aria-hidden", isOpen ? "false" : "true");
          headerNotifications.setAttribute("aria-expanded", isOpen ? "true" : "false");
          if (isOpen) {
            renderChatNotifications();
            positionChatNotificationsPanel();
          }
        }
        function notifyChatCounterpart(message, business) {
          try {
            const senderRole = chatSenderRole(message);
            const createdAt = clean(message && message.createdAt) || new Date().toISOString();
            const businessKey = clean(business && business.key || message && message.businessKey || activeKey);
            const businessName = clean(business && business.name || message && message.businessName || chatCurrentBusinessName(""));
            const businessMedia = chatStoredBusinessPhoto(businessKey, businessName, business || message);
            const customerName = clean(message && message.customerName) || chatCurrentCustomerName();
            const customerKey = chatMessageCustomerKey(message) || chatCurrentCustomerKey();
            const customerPhoto = clean(message && message.customerPhoto) || chatCurrentCustomerPhoto();
            const customerPhotoRef = clean(message && message.customerPhotoRef) || chatCurrentCustomerPhotoRef();
            const body = clean(message && message.text);
            if (senderRole === "business") {
              pushChatNotification("emyCustomerNotifications", {
                id: chatMessageId("customer-message"),
                type: "business-message",
                group: "important",
                businessKey,
                businessName,
                title: "New reply from " + (businessName || "Business"),
                body,
                href: "emy-customer-chat.html?business=" + encodeURIComponent(businessKey || businessName),
                customerKey,
                createdAt,
                read: false,
                unread: true,
                avatar: businessMedia.src,
                avatarSrc: businessMedia.src,
                avatarRef: businessMedia.ref,
                businessPhoto: businessMedia.src,
                businessPhotoRef: businessMedia.ref,
                ref: message && message.ref || null
              }, 80);
              return;
            }
            const notification = {
              id: chatMessageId("business-message"),
              type: "customer-message",
              group: "business",
              businessKey,
              businessName,
              title: "New message from " + customerName,
              body,
              customerName,
              customerKey,
              href: "emy-business-profile.html?mode=chat&business=" + encodeURIComponent(businessKey || businessName) + "&customer=" + encodeURIComponent(customerKey),
              createdAt,
              read: false,
              unread: true,
              initials: (customerName || "C").slice(0, 2).toUpperCase(),
              avatar: customerPhoto,
              avatarSrc: customerPhoto,
              avatarRef: customerPhotoRef,
              customerPhoto,
              customerPhotoRef,
              ref: message && message.ref || null
            };
            chatBusinessNotificationKeys(business).forEach((key) => pushChatNotification("emyBusinessNotifications:" + key, notification, 80));
          } catch (error) {}
        }
        function chatProductTitle(item) {
          return clean(item && (item.productName || item.productTitle || item.title || item.name || item.itemTitle));
        }
        function chatProductDescription(item) {
          return clean(item && (item.description || item.productDescription || item.productInfo || item.text));
        }
        function chatProductPrice(item) {
          return clean(item && (item.priceText || item.price || item.amount));
        }
        function chatMediaFromProduct(item) {
          const mediaItems = Array.isArray(item && item.mediaItems) ? item.mediaItems : [];
          const first = mediaItems.find((media) => media && (media.src || media.ref)) || {};
          const ref = clean(first.ref || item && (item.mediaRef || item.imageRef || item.videoRef || item.coverRef || item.photoRef));
          const src = ref ? "" : clean(first.src || item && (item.mediaSrc || item.image || item.video || item.coverSrc || item.thumbnailSrc || item.thumbnail));
          const typeText = clean(first.type || item && item.mediaType || item && item.coverType || item && item.mimeType).toLowerCase();
          const posterRef = clean(first.posterRef || first.thumbnailRef || item && (item.posterRef || item.thumbnailRef || item.coverPosterRef));
          const posterSrc = posterRef ? "" : clean(first.posterSrc || first.thumbnailSrc || item && (item.posterSrc || item.thumbnailSrc || item.coverPosterSrc));
          const settings = Object.assign({}, first.settings || item && (item.mediaSettings || item.coverSettings) || {});
          return {
            mediaSrc: src,
            mediaRef: ref,
            mediaType: typeText.includes("video") || /\\.(mp4|mov|webm)(\\?|$)/i.test(src) ? "video" : (src || ref ? "image" : ""),
            posterSrc,
            posterRef,
            mediaSettings: settings
          };
        }
        function chatBusinessMatchesProduct(item, business) {
          if (!business) return true;
          const target = normaliseChatBusinessKey(business.key || business.name || "");
          const clues = [
            item && item.businessKey,
            item && item.key,
            item && item.profileKey,
            item && item.ownerKey,
            item && item.businessName,
            item && item.business,
            item && item.storeName,
            item && item.sellerName
          ].map(normaliseChatBusinessKey).filter(Boolean);
          return !target || !clues.length || clues.some((clue) => clue === target || clue.indexOf(target) >= 0 || target.indexOf(clue) >= 0);
        }
        function chatProductRefFromStorage(title, business) {
          const target = clean(title).toLowerCase();
          if (!target) return null;
          const keys = ["emyBusinessProducts", "emyBusinessProductList", "emyBusinessProductPosts", "emyBusinessProductReels", "emyFeedCreatedPosts"];
          for (const key of keys) {
            const rows = readChatArray(key);
            for (const item of rows) {
              if (!item || typeof item !== "object") continue;
              if (!chatBusinessMatchesProduct(item, business)) continue;
              const itemTitle = chatProductTitle(item);
              if (!itemTitle) continue;
              const itemTarget = itemTitle.toLowerCase();
              if (itemTarget !== target && itemTarget.indexOf(target) < 0 && target.indexOf(itemTarget) < 0) continue;
              const media = chatMediaFromProduct(item);
              return Object.assign({
                type: "Product",
                title: itemTitle,
                description: chatProductDescription(item),
                price: chatProductPrice(item),
                href: "emy-customer-home.html#product-" + encodeURIComponent(item.id || item.productId || itemTitle),
                mediaClass: "product"
              }, media);
            }
          }
          return null;
        }
        function contactIntentRefForBusiness(business) {
          const intent = readBusinessContactIntent();
          const intentKey = normaliseChatBusinessKey(intent.businessKey || "");
          const businessKey = normaliseChatBusinessKey(business && business.key || "");
          if (intentKey && businessKey && intentKey !== businessKey) return null;
          const type = clean(intent.productType || intent.type || "Product");
          if (/business/i.test(type) && !/product|post|clip/i.test(type)) return null;
          const title = clean(intent.productTitle || intent.title || "");
          if (!title) return null;
          const stored = chatProductRefFromStorage(title, business) || {};
          const media = intent.mediaSrc || intent.mediaRef ? intent : stored;
          return {
            type: type || stored.type || "Product",
            title,
            description: clean(intent.productDescription || intent.description || stored.description),
            price: clean(intent.productPrice || intent.price || stored.price),
            href: clean(intent.href || stored.href) || "emy-customer-search.html#products",
            mediaClass: clean(intent.mediaClass || stored.mediaClass) || "product",
            mediaSrc: clean(media.mediaSrc),
            mediaRef: clean(media.mediaRef),
            mediaType: clean(media.mediaType) || (media.mediaSrc || media.mediaRef ? "image" : ""),
            posterSrc: clean(media.posterSrc),
            posterRef: clean(media.posterRef),
            mediaSettings: Object.assign({}, media.mediaSettings || {})
          };
        }
        function enrichChatReference(ref, business) {
          if (!ref || !ref.title) return ref;
          if (ref.mediaSrc || ref.mediaRef) return ref;
          const stored = chatProductRefFromStorage(ref.title, business);
          if (!stored) return ref;
          return Object.assign({}, ref, {
            description: clean(ref.description) || stored.description,
            price: clean(ref.price) || stored.price,
            href: clean(ref.href) || stored.href,
            mediaClass: clean(ref.mediaClass) || stored.mediaClass,
            mediaSrc: stored.mediaSrc,
            mediaRef: stored.mediaRef,
            mediaType: stored.mediaType,
            posterSrc: stored.posterSrc,
            posterRef: stored.posterRef,
            mediaSettings: stored.mediaSettings || {}
          });
        }
        function addKnownBusiness(rows, seen, key, name, status, source) {
          const businessKey = normaliseChatBusinessKey(key || name || "");
          const businessName = chatBusinessDisplayNameForRender(businessKey, name, source);
          if (!businessKey && !businessName) return;
          const id = businessKey || normaliseChatBusinessKey(businessName);
          if (!id || seen.has(id)) return;
          let media = chatStoredBusinessPhoto(id, businessName, source);
          if (!(media.src || media.ref) && activeProfileRole() === "business") {
            const profile = chatCurrentBusinessProfile();
            media = {
              src: chatDirectMedia(chatBusinessOnlyMedia([localStorage.getItem("emyBusinessProfilePhoto"), localStorage.getItem("emyBusinessProfilePhotoSrc"), localStorage.getItem("emyMainPendingSignupBusinessPhoto"), profile.photo, profile.photoSrc, profile.profilePhoto, profile.profilePhotoSrc])),
              ref: chatMediaRef(chatBusinessOnlyMedia([localStorage.getItem("emyBusinessProfilePhotoRef"), localStorage.getItem("emyMainPendingSignupBusinessPhotoRef"), profile.photoRef, profile.profilePhotoRef]))
            };
          }
          seen.add(id);
          rows.push({
            key: id,
            name: businessName || titleFromBusinessKey(id),
            avatar: chatAvatarForBusiness(id, businessName),
            photo: media.src,
            photoRef: media.ref,
            status: clean(status) || "Online and available"
          });
        }
        function collectKnownBusinesses() {
          const rows = [];
          const seen = new Set();
          const intent = readBusinessContactIntent();
          if (intent && (intent.businessKey || intent.businessName)) addKnownBusiness(rows, seen, intent.businessKey, intent.businessName, intent.status, intent);
          try {
            const selectedKey = localStorage.getItem("emySelectedBusinessProfileKey") || localStorage.getItem("emyCustomerChatOpenKey") || "";
            const selectedName = localStorage.getItem("emySelectedBusinessProfileName") || "";
            if (selectedKey || selectedName) addKnownBusiness(rows, seen, selectedKey, selectedName, "");
          } catch (error) {}
          try {
            for (let index = 0; index < localStorage.length; index += 1) {
              const key = localStorage.key(index) || "";
              if (key.indexOf("emyBusinessChatThread:") !== 0) continue;
              const businessKey = key.slice("emyBusinessChatThread:".length);
              const messages = readChatArray(key).filter(chatMessageBelongsToCurrentCustomer);
              if (!messages.length) continue;
              const lastBusiness = messages.find((item) => item && (item.businessName || chatSenderRole(item) === "business"));
              addKnownBusiness(rows, seen, businessKey, lastBusiness && (lastBusiness.businessName || lastBusiness.author), "", lastBusiness);
            }
          } catch (error) {}
          const saved = readChatJson("emyCustomerBusinesses", {});
          const savedRows = Array.isArray(saved) ? saved : (saved && typeof saved === "object" ? Object.values(saved) : []);
          savedRows.forEach((item) => addKnownBusiness(rows, seen, item && (item.key || item.businessKey || item.id), item && (item.name || item.businessName || item.title), item && item.status, item));
          if (activeProfileRole() === "business") {
            const profile = readChatJson("emyBusinessProfileDraft", {});
            addKnownBusiness(rows, seen, profile.businessKey || profile.key || localStorage.getItem("emyBusinessProfileKey"), chatCurrentBusinessName(""), "Business profile", profile);
          }
          return rows;
        }
        function refreshKnownBusinesses() {
          businesses = collectKnownBusinesses();
          if (activeKey && !businesses.some((item) => item.key === activeKey)) {
            const intent = readBusinessContactIntent();
            addKnownBusiness(businesses, new Set(businesses.map((item) => item.key)), activeKey, intent.businessName || titleFromBusinessKey(activeKey), intent.status, intent);
          }
          return businesses;
        }
        function ensureKnownBusiness(key) {
          let openKey = "";
          let selectedKey = "";
          let selectedName = "";
          try {
            openKey = localStorage.getItem("emyCustomerChatOpenKey") || "";
            selectedKey = localStorage.getItem("emySelectedBusinessProfileKey") || "";
            selectedName = localStorage.getItem("emySelectedBusinessProfileName") || "";
          } catch (error) {}
          const businessKey = normaliseChatBusinessKey(key || openKey || selectedKey || "");
          refreshKnownBusinesses();
          if (!businessKey) return businesses[0] || null;
          const existing = businesses.find((item) => item.key === businessKey);
          if (existing) return existing;
          const intent = readBusinessContactIntent();
          const intentKey = normaliseChatBusinessKey(intent.businessKey || "");
          const intentName = intentKey === businessKey ? clean(intent.businessName) : "";
          const businessName = intentName || clean(selectedName) || titleFromBusinessKey(businessKey);
          const media = chatStoredBusinessPhoto(businessKey, businessName, intent);
          const business = {
            key: businessKey,
            name: businessName,
            avatar: chatAvatarForBusiness(businessKey, businessName),
            photo: media.src,
            photoRef: media.ref,
            status: clean(intent.status) || "Online and available"
          };
          businesses = [business].concat(businesses.filter((item) => item.key !== business.key));
          return business;
        }
        function activeProfileRole() {
          try {
            const params = new URLSearchParams(window.location.search || "");
            const mode = clean(params.get("mode")).toLowerCase();
            const path = String(window.location.pathname || "").toLowerCase();
            if (mode === "business" || mode === "customer") return mode;
            if (/emy-customer-/i.test(path)) return "customer";
            if (/emy-business-profile\.html/i.test(path)) {
              const view = clean(params.get("view")).toLowerCase();
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
          const signedRole = clean(localStorage.getItem("emyMainSignedInRole")).toLowerCase();
          if (signedRole === "business" || signedRole === "customer") return signedRole;
          if (localStorage.getItem("emyMainSignedOut") === "1") return "";
          const pendingRole = clean(localStorage.getItem("emyMainPendingSignupRole")).toLowerCase();
          return pendingRole === "business" || pendingRole === "customer" ? pendingRole : "";
        }
        function readAskProfileImage() {
          try {
            const user = JSON.parse(localStorage.getItem("emyAskCurrentUser") || "{}");
            const image = clean(user && user.image);
            if (!image || image.includes("images.unsplash.com") || image.indexOf("data:image/svg+xml") === 0) return "";
            return image;
          } catch (error) {
            return "";
          }
        }
        function customerPendingSignupPhoto() {
          const pendingRole = clean(localStorage.getItem("emyMainPendingSignupRole")).toLowerCase();
          return pendingRole === "customer" ? (localStorage.getItem("emyMainPendingSignupPhoto") || localStorage.getItem("emyMainPendingSignupPhotoSrc") || "") : "";
        }
        function customerPendingSignupCrop(fallback) {
          const signedRole = clean(localStorage.getItem("emyMainSignedInRole")).toLowerCase();
          const pendingRole = clean(localStorage.getItem("emyMainPendingSignupRole")).toLowerCase();
          return !signedRole && pendingRole === "customer" ? readChatJson("emyMainPendingSignupPhotoCrop", fallback) : fallback;
        }
        function activeProfileCustomerMediaSet() {
          return new Set([
            localStorage.getItem("emyCustomerProfilePhoto"),
            localStorage.getItem("emyCustomerProfilePhotoSrc"),
            localStorage.getItem("emyCustomerProfilePhotoRef"),
            localStorage.getItem("emyCustomerProfileImage"),
            localStorage.getItem("emyCustomerProfileImageSrc"),
            localStorage.getItem("emyCustomerProfileImageRef"),
            localStorage.getItem("emyCustomerAvatar"),
            localStorage.getItem("emyCustomerAvatarSrc"),
            localStorage.getItem("emyCustomerAvatarRef"),
            localStorage.getItem("emyCustomerPhoto"),
            localStorage.getItem("emyCustomerPhotoSrc"),
            localStorage.getItem("emyCustomerPhotoRef"),
            localStorage.getItem("emyMainPendingSignupPhoto"),
            localStorage.getItem("emyMainPendingSignupPhotoSrc"),
            localStorage.getItem("emyMainPendingSignupPhotoRef")
          ].map((value) => clean(value)).filter(Boolean));
        }
        function activeProfileBusinessMediaSet() {
          const businessProfile = readChatJson("emyBusinessProfileDraft", {});
          return new Set([
            localStorage.getItem("emyBusinessProfilePhoto"),
            localStorage.getItem("emyBusinessProfilePhotoSrc"),
            localStorage.getItem("emyBusinessProfilePhotoRef"),
            localStorage.getItem("emyBusinessProfilePhotoBackup"),
            localStorage.getItem("emyBusinessProfilePhotoSrcBackup"),
            localStorage.getItem("emyBusinessProfilePhotoRefBackup"),
            localStorage.getItem("emyBusinessProfileImage"),
            localStorage.getItem("emyBusinessProfileImageSrc"),
            localStorage.getItem("emyBusinessProfileImageRef"),
            localStorage.getItem("emyBusinessPhoto"),
            localStorage.getItem("emyBusinessPhotoSrc"),
            localStorage.getItem("emyBusinessPhotoRef"),
            localStorage.getItem("emyBusinessAvatar"),
            localStorage.getItem("emyBusinessAvatarSrc"),
            localStorage.getItem("emyBusinessAvatarRef"),
            localStorage.getItem("emyBusinessLogo"),
            localStorage.getItem("emyBusinessLogoSrc"),
            localStorage.getItem("emyBusinessLogoRef"),
            localStorage.getItem("emyMainPendingSignupBusinessPhoto"),
            localStorage.getItem("emyMainPendingSignupBusinessPhotoSrc"),
            localStorage.getItem("emyMainPendingSignupBusinessPhotoRef"),
            businessProfile.profilePhoto,
            businessProfile.profilePhotoSrc,
            businessProfile.profilePhotoRef,
            businessProfile.photo,
            businessProfile.photoSrc,
            businessProfile.photoRef,
            businessProfile.businessPhoto,
            businessProfile.businessPhotoSrc,
            businessProfile.businessPhotoRef,
            businessProfile.avatar,
            businessProfile.avatarSrc,
            businessProfile.avatarRef,
            businessProfile.logo,
            businessProfile.logoSrc,
            businessProfile.logoRef
          ].map((value) => clean(value)).filter(Boolean));
        }
        function activeProfileBusinessOnlyMedia(values) {
          const customerMedia = activeProfileCustomerMediaSet();
          const businessMedia = activeProfileBusinessMediaSet();
          return (Array.isArray(values) ? values : []).map((value) => clean(value)).find((value) => value && (businessMedia.has(value) || !customerMedia.has(value))) || "";
        }
        function activeProfileCustomerObjects() {
          const rows = [];
          ["emyCustomerProfile", "emyCustomerProfileDraft", "emyCustomerProfileData", "emyCurrentCustomerProfile", "emyFirebaseCustomerProfile", "emyCustomerAccount", "emyAskCurrentUser", "emyMainSignedInUser", "emyAuthUser", "emyFirebaseUser"].forEach((key) => {
            const value = readChatJson(key, null);
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
        function activeProfileFirstMedia(values, excludedMedia) {
          const excluded = excludedMedia instanceof Set ? excludedMedia : new Set();
          for (const value of values) {
            const next = clean(value);
            if (next && excluded.has(next)) continue;
            if (next && !/images\.unsplash|placeholder|avatar-placeholder|demo|stock|sample|lorem|faker|dummy|randomuser|pravatar|thispersondoesnotexist|ui-avatars|dicebear|robohash|gravatar/i.test(next) && next.indexOf("data:image/svg+xml") !== 0) return next;
          }
          return "";
        }
        function purgeBusinessMediaFromCustomerProfileAliases() {
          if (activeProfileRole() === "business") return;
          const businessMedia = activeProfileBusinessMediaSet();
          if (!businessMedia.size) return;
          [
            "emyCustomerProfilePhoto", "emyCustomerProfilePhotoSrc", "emyCustomerProfilePhotoRef",
            "emyCustomerProfileImage", "emyCustomerProfileImageSrc", "emyCustomerProfileImageRef",
            "emyCustomerAvatar", "emyCustomerAvatarSrc", "emyCustomerAvatarRef",
            "emyCustomerPhoto", "emyCustomerPhotoSrc", "emyCustomerPhotoRef",
            "emyCustomerProfilePhotoBackup", "emyCustomerProfilePhotoSrcBackup", "emyCustomerProfilePhotoRefBackup"
          ].forEach((key) => {
            try {
              const value = clean(localStorage.getItem(key));
              if (value && businessMedia.has(value)) localStorage.removeItem(key);
            } catch (error) {}
          });
        }
        function activeProfileSavedCustomerPhoto() {
          purgeBusinessMediaFromCustomerProfileAliases();
          const businessMedia = activeProfileBusinessMediaSet();
          return activeProfileFirstMedia([
            localStorage.getItem("emyCustomerProfilePhoto"),
            localStorage.getItem("emyCustomerProfilePhotoSrc"),
            localStorage.getItem("emyCustomerProfileImage"),
            localStorage.getItem("emyCustomerProfileImageSrc"),
            localStorage.getItem("emyCustomerAvatar"),
            localStorage.getItem("emyCustomerAvatarSrc"),
            localStorage.getItem("emyCustomerPhoto"),
            localStorage.getItem("emyCustomerPhotoSrc"),
            localStorage.getItem("emyMainSignedInPhoto"),
            localStorage.getItem("emyMainSignedInPhotoUrl"),
            localStorage.getItem("emyFirebasePhotoURL"),
            localStorage.getItem("emyFirebasePhotoUrl"),
            localStorage.getItem("emyFirebaseUserPhoto"),
            localStorage.getItem("emyAuthPhotoURL"),
            readAskProfileImage()
          ].concat(activeProfileCustomerObjectValues(["photoUrl", "photoURL", "photo", "photoSrc", "profilePhoto", "profilePhotoSrc", "profileImage", "profileImageSrc", "avatar", "avatarSrc", "image", "imageSrc"])), businessMedia);
        }
        function activeProfileSavedCustomerPhotoRef() {
          purgeBusinessMediaFromCustomerProfileAliases();
          const businessMedia = activeProfileBusinessMediaSet();
          return activeProfileFirstMedia([
            localStorage.getItem("emyCustomerProfilePhotoRef"),
            localStorage.getItem("emyCustomerProfileImageRef"),
            localStorage.getItem("emyCustomerAvatarRef"),
            localStorage.getItem("emyCustomerPhotoRef"),
            localStorage.getItem("emyMainSignedInPhotoRef"),
            localStorage.getItem("emyFirebasePhotoRef"),
            localStorage.getItem("emyAuthPhotoRef")
          ].concat(activeProfileCustomerObjectValues(["photoPublicId", "photoRef", "profilePhotoRef", "profileImageRef", "avatarRef", "imageRef", "publicId"])), businessMedia);
        }
        function syncActiveCustomerProfilePhotoAliases(photo, ref) {
          if (activeProfileRole() === "business") return;
          try {
            const nextPhoto = clean(photo);
            const nextRef = clean(ref);
            const businessMedia = activeProfileBusinessMediaSet();
            if ((nextPhoto && businessMedia.has(nextPhoto)) || (nextRef && businessMedia.has(nextRef))) return;
            if (nextPhoto) ["emyCustomerProfilePhoto", "emyCustomerProfilePhotoSrc", "emyCustomerProfileImage", "emyCustomerProfileImageSrc", "emyCustomerAvatar", "emyCustomerAvatarSrc", "emyCustomerPhoto", "emyCustomerPhotoSrc"].forEach((key) => localStorage.setItem(key, nextPhoto));
            if (nextRef) ["emyCustomerProfilePhotoRef", "emyCustomerProfileImageRef", "emyCustomerAvatarRef", "emyCustomerPhotoRef"].forEach((key) => localStorage.setItem(key, nextRef));
            if (nextPhoto || nextRef) localStorage.setItem("emyCustomerProfileUpdatedAt", new Date().toISOString());
          } catch (error) {}
        }
        function readActiveProfilePhoto() {
          const customerPhoto = activeProfileSavedCustomerPhoto();
          const signupPhoto = customerPendingSignupPhoto();
          const businessProfile = readChatJson("emyBusinessProfileDraft", {});
          const businessPhoto = activeProfileBusinessOnlyMedia([localStorage.getItem("emyBusinessProfilePhoto"), localStorage.getItem("emyBusinessProfilePhotoSrc"), localStorage.getItem("emyMainPendingSignupBusinessPhoto"), businessProfile.profilePhoto, businessProfile.profilePhotoSrc, businessProfile.photo, businessProfile.photoSrc]);
          const customerRef = activeProfileSavedCustomerPhotoRef();
          if (customerPhoto || customerRef) syncActiveCustomerProfilePhotoAliases(customerPhoto, customerRef);
          return activeProfileRole() === "business"
            ? businessPhoto
            : (customerPhoto || signupPhoto);
        }
        function readActiveProfilePhotoRef() {
          const businessProfile = readChatJson("emyBusinessProfileDraft", {});
          return activeProfileRole() === "business"
            ? activeProfileBusinessOnlyMedia([localStorage.getItem("emyBusinessProfilePhotoRef"), localStorage.getItem("emyMainPendingSignupBusinessPhotoRef"), businessProfile.profilePhotoRef, businessProfile.photoRef])
            : (activeProfileSavedCustomerPhotoRef() || (clean(localStorage.getItem("emyMainPendingSignupRole")).toLowerCase() === "customer" ? localStorage.getItem("emyMainPendingSignupPhotoRef") : "") || "");
        }
        function defaultChatCrop() {
          return { zoom: 100, x: 50, y: 50 };
        }
        function normaliseChatCrop(crop) {
          const source = crop && typeof crop === "object" ? crop : {};
          return {
            zoom: Math.min(260, Math.max(100, Number(source.zoom) || 100)),
            x: Math.min(100, Math.max(0, Number(source.x) || 50)),
            y: Math.min(100, Math.max(0, Number(source.y) || 50))
          };
        }
        function readActiveProfileCrop() {
          const role = activeProfileRole();
          if (role === "business") return normaliseChatCrop(readChatJson("emyBusinessProfilePhotoCrop", defaultChatCrop()));
          return normaliseChatCrop(readChatJson("emyCustomerProfilePhotoCrop", customerPendingSignupCrop(defaultChatCrop())));
        }
        function applyChatCrop(image, crop) {
          const cleanCrop = normaliseChatCrop(crop);
          const overflow = cleanCrop.zoom - 100;
          image.style.objectFit = "cover";
          image.style.objectPosition = cleanCrop.x + "% " + cleanCrop.y + "%";
          image.style.width = cleanCrop.zoom + "%";
          image.style.height = cleanCrop.zoom + "%";
          image.style.left = (-overflow * (cleanCrop.x / 100)).toFixed(3) + "%";
          image.style.top = (-overflow * (cleanCrop.y / 100)).toFixed(3) + "%";
          image.style.right = "auto";
          image.style.bottom = "auto";
        }
        function readChatLocationLabel() {
          const role = activeProfileRole();
          const askLocation = readChatJson(role === "business" ? "emyBusinessAskLocation" : "emyAskLocation", {});
          const storedLocation = clean(
            askLocation.location ||
            (role === "business" ? localStorage.getItem("emyBusinessLocation") : localStorage.getItem("emyCustomerLocation")) ||
            (role === "business" ? localStorage.getItem("emyBusinessLocationLabel") : localStorage.getItem("emyCustomerLocationLabel"))
          );
          if (!storedLocation || storedLocation === "Near me" || storedLocation === "Current Location") return "Current Location";
          const label = storedLocation.split(",").map((part) => part.trim()).filter(Boolean).slice(0, 2).join(", ") || storedLocation;
          return label.length > 46 ? label.slice(0, 43).trim() + "..." : label;
        }
        function openBusinessProfile(key) {
          const businessKey = normaliseChatBusinessKey(key || activeKey || (businesses[0] && businesses[0].key) || "");
          if (!businessKey) return;
          try { localStorage.setItem("emySelectedBusinessProfileKey", businessKey); } catch (error) {}
          window.location.href = "emy-business-profile.html?business=" + encodeURIComponent(businessKey);
        }
        const chatLocationSheet = setupCustomerLocationSheet({ locationButton: headerLocation, locationLabel: headerLocationLabel, accountType: activeProfileRole() === "business" ? "business" : "customer" });
        function renderHeader() {
          const displayName = chatCurrentCustomerName();
          const firstName = clean(displayName).split(" ")[0] || "Customer";
          const photo = readActiveProfilePhoto();
          const photoRef = readActiveProfilePhotoRef();
          const crop = readActiveProfileCrop();
          const location = readChatLocationLabel();
          const notificationCount = countChatNotifications();
          if (firstNameLabel) firstNameLabel.textContent = firstName;
          if (chatTitleSubtitle) chatTitleSubtitle.textContent = firstName + " - business conversations";
          if (headerLocationLabel) headerLocationLabel.textContent = location;
          if (headerNotificationCount) {
            headerNotificationCount.textContent = String(notificationCount);
            headerNotificationCount.setAttribute("aria-label", notificationCount + " unread notifications");
          }
          if (headerAvatar) {
            headerAvatar.innerHTML = "";
            if (photo || photoRef) {
              const image = document.createElement("img");
              if (photo) image.src = photo;
              if (photoRef) image.setAttribute("data-emy-media-ref", photoRef);
              image.alt = "";
              headerAvatar.appendChild(image);
              applyChatCrop(image, crop);
              if (photoRef && window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(headerAvatar);
            } else {
              headerAvatar.textContent = firstName.slice(0, 1).toUpperCase() || "S";
            }
          }
        }
        function defaultThread(business) {
          return [];
        }
        function readThread(business) {
          try {
            const parsed = JSON.parse(localStorage.getItem(storageKey(business.key)) || "null");
            if (Array.isArray(parsed)) {
              const items = parsed.filter((item) => item && item.text && chatMessageBelongsToCurrentCustomer(item)).map((item) => Object.assign({}, item, {
                customerKey: chatMessageCustomerKey(item) || chatCurrentCustomerKey(),
                senderRole: chatSenderRole(item),
                mine: chatSenderRole(item) === "customer",
                ref: enrichChatReference(item.ref, business)
              }));
              return items;
            }
          } catch (error) {}
          return defaultThread(business);
        }
        function writeThread(key, items) {
          try {
            const storage = storageKey(key);
            const existing = readChatArray(storage);
            const others = existing.filter((item) => !chatMessageBelongsToCurrentCustomer(item));
            const current = (Array.isArray(items) ? items : []).filter((item) => item && item.text).map(attachCurrentCustomerToChat);
            localStorage.setItem(storage, JSON.stringify(others.concat(current).slice(-160)));
          } catch (error) {}
        }
        function markThreadSeenByCustomer(business) {
          const thread = readThread(business);
          let changed = false;
          const next = thread.map((item) => {
            if (chatSenderRole(item) !== "business") return item;
            if (item.readByCustomer === true && item.read === true && item.unread === false) return item;
            changed = true;
            return Object.assign({}, item, { readByCustomer: true, readByRecipient: true, read: true, unread: false });
          });
          if (changed) writeThread(business.key, next);
          return changed ? next : thread;
        }
        function markThreadNotificationsSeenByCustomer(business) {
          const keys = new Set(chatBusinessNotificationKeys(business).map(normaliseChatBusinessKey).filter(Boolean));
          if (!keys.size) return;
          updateChatNotificationStorage((item) => {
            if (!item || typeof item !== "object") return item;
            const rawKey = normaliseChatBusinessKey(item.businessKey || item.key || item.businessName || item.business || item.ref && (item.ref.businessKey || item.ref.key || item.ref.businessName || item.ref.business));
            if (!rawKey || !keys.has(rawKey)) return item;
            const typeText = [item.type, item.group, item.title, item.body, item.message, item.action].map(clean).join(" ").toLowerCase();
            if (!(typeText.includes("message") || typeText.includes("chat"))) return item;
            const customerKey = chatMessageCustomerKey(item);
            if (customerKey && customerKey !== chatCurrentCustomerKey()) return item;
            return Object.assign({}, item, { read: true, unread: false });
          });
        }
        function preview(thread) {
          const last = thread[thread.length - 1] || {};
          return (chatOwnsCurrentView(last) ? "You: " : "") + clean(last.text || "Start a conversation");
        }
        function renderReference(ref, business) {
          if (!ref || !ref.title) return "";
          const type = clean(ref.type || "Item");
          const kind = type.toLowerCase().includes("clip") ? "clip" : type.toLowerCase().includes("post") ? "post" : "product";
          const href = clean(ref.href) || (kind === "clip" ? "emy-customer-home.html#reels" : kind === "post" ? "emy-customer-home.html#feeds" : "emy-customer-search.html#products");
          const mediaClass = clean(ref.mediaClass) || kind;
          const mediaSrc = clean(ref.mediaSrc);
          const mediaRef = clean(ref.mediaRef);
          const mediaType = clean(ref.mediaType).toLowerCase();
          const posterSrc = clean(ref.posterSrc);
          const posterRef = clean(ref.posterRef);
          const summary = [clean(ref.description), clean(ref.price)].filter(Boolean).join(" - ");
          const hasMedia = !!(mediaSrc || mediaRef);
          const detailMedia = hasMedia || posterSrc || posterRef ? "feed" : mediaClass;
          const businessName = clean(ref.businessName || ref.business || business && business.name);
          const businessKey = clean(ref.businessKey || ref.key || business && business.key);
          const detailMeta = [clean(ref.description), clean(ref.price)].filter(Boolean).join("|");
          const itemAttrs = ' data-card data-open-item-detail onclick="return window.emyOpenChatReferenceDetail ? window.emyOpenChatReferenceDetail(this,event) : true;" data-business-key="' + escapeAttr(businessKey) + '" data-detail-kind="' + escapeAttr(type) + '" data-detail-title="' + escapeAttr(ref.title) + '" data-detail-description="' + escapeAttr(ref.description || "") + '" data-detail-business="' + escapeAttr(businessName) + '" data-detail-price="' + escapeAttr(ref.price || "") + '" data-detail-media="' + escapeAttr(detailMedia) + '" data-detail-media-src="' + escapeAttr(mediaSrc) + '" data-detail-media-ref="' + escapeAttr(mediaRef) + '" data-detail-media-type="' + escapeAttr(mediaType) + '" data-detail-poster-src="' + escapeAttr(posterSrc) + '" data-detail-poster-ref="' + escapeAttr(posterRef) + '" data-detail-meta="' + escapeAttr(detailMeta) + '"';
          const media = hasMedia
            ? (mediaType === "video"
              ? '<video' + (mediaSrc ? ' src="' + escapeAttr(mediaSrc) + '"' : '') + (mediaRef ? ' data-emy-media-ref="' + escapeAttr(mediaRef) + '"' : '') + (posterSrc ? ' poster="' + escapeAttr(posterSrc) + '"' : '') + (posterRef ? ' data-emy-poster-ref="' + escapeAttr(posterRef) + '"' : '') + ' muted playsinline preload="metadata"></video>'
              : '<img' + (mediaSrc ? ' src="' + escapeAttr(mediaSrc) + '"' : '') + (mediaRef ? ' data-emy-media-ref="' + escapeAttr(mediaRef) + '"' : '') + ' alt="" />')
            : "";
          return '<a class="message-ref is-' + escapeAttr(kind) + (hasMedia ? '' : ' is-no-media') + '" href="' + escapeAttr(href) + '"' + itemAttrs + '><span class="message-ref-media ' + escapeAttr(mediaClass) + (hasMedia ? ' has-image' : '') + '" aria-hidden="true">' + media + '</span><span class="message-ref-copy"><small>' + escapeAttr(type) + '</small><b>' + escapeAttr(ref.title) + '</b>' + (summary ? '<span>' + escapeAttr(summary) + '</span>' : '') + '</span></a>';
        }
        function chatAvatarInner(photo, photoRef, alt) {
          return '<img' + (photo ? ' src="' + escapeAttr(photo) + '"' : '') + (photoRef ? ' data-emy-media-ref="' + escapeAttr(photoRef) + '"' : '') + ' alt="' + escapeAttr(alt || "") + '" />';
        }
        function chatBusinessMediaForRender(business) {
          const source = business && typeof business === "object" ? business : {};
          const direct = chatBusinessOnlyMediaPair(chatFirstMedia(source, ["photo", "photoSrc", "photoUrl", "profilePhoto", "profilePhotoSrc", "businessPhoto", "businessPhotoSrc", "avatarSrc", "businessAvatar", "businessAvatarSrc", "logo", "logoSrc", "businessLogo", "businessLogoSrc", "image", "imageSrc"], ["photoRef", "photoPublicId", "profilePhotoRef", "businessPhotoRef", "avatarRef", "businessAvatarRef", "logoRef", "businessLogoRef", "imageRef"]));
          if (direct.src || direct.ref) return direct;
          return chatStoredBusinessPhoto(source.key || activeKey, source.name || "", source);
        }
        function chatBusinessAvatarClass(business, baseClass) {
          const media = chatBusinessMediaForRender(business);
          const hasImage = !!(media.src || media.ref);
          return baseClass + (hasImage ? " has-image" : " " + clean(business && business.avatar));
        }
        function chatBusinessAvatarMarkup(business, baseClass) {
          const media = chatBusinessMediaForRender(business);
          const hasImage = !!(media.src || media.ref);
          const initial = clean(business && business.name).charAt(0).toUpperCase() || "B";
          return '<span class="' + escapeAttr(chatBusinessAvatarClass(business, baseClass)) + '" aria-hidden="true">' + (hasImage ? chatAvatarInner(media.src, media.ref, business && business.name) : escapeAttr(initial)) + '</span>';
        }
        function applyChatBusinessAvatar(node, business) {
          if (!node) return;
          const media = chatBusinessMediaForRender(business);
          node.className = chatBusinessAvatarClass(business, "thread-avatar");
          node.innerHTML = media.src || media.ref ? chatAvatarInner(media.src, media.ref, business && business.name) : escapeAttr(clean(business && business.name).charAt(0).toUpperCase() || "B");
          if (media.ref && window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(node);
        }
        function messageAvatarHtml(item, business) {
          const senderRole = chatSenderRole(item);
          if (senderRole === "customer") {
            const owns = chatOwnsCurrentView(item);
            const customerPhoto = (owns ? chatCurrentCustomerPhoto() : "") || clean(item && item.customerPhoto);
            const customerPhotoRef = (owns ? chatCurrentCustomerPhotoRef() : "") || clean(item && item.customerPhotoRef);
            const initial = (clean(item && (item.customerName || item.author)) || (owns ? chatCurrentCustomerName() : "Customer")).charAt(0).toUpperCase() || "C";
            return '<span class="message-avatar' + (customerPhoto || customerPhotoRef ? ' has-image' : '') + '" aria-hidden="true">' + (customerPhoto || customerPhotoRef ? '<img' + (customerPhoto ? ' src="' + escapeAttr(customerPhoto) + '"' : '') + (customerPhotoRef ? ' data-emy-media-ref="' + escapeAttr(customerPhotoRef) + '"' : '') + ' alt="" />' : escapeAttr(initial)) + '</span>';
          }
          return chatBusinessAvatarMarkup(business, "message-avatar");
        }
        function chatMessageRoleLabel(item) {
          return chatSenderRole(item) === "business" ? "Business" : "Customer";
        }
        function chatMessageHeaderHtml(item, business) {
          return '<span class="message-role-line"><em class="message-role-pill">' + escapeAttr(chatMessageRoleLabel(item)) + '</em><strong>' + escapeAttr(chatMessageDisplayName(item, business)) + '</strong></span>';
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
        function renderMessages(business) {
          const thread = markThreadSeenByCustomer(business);
          const messagesChanged = window.emySetListHtmlIfChanged(messageList, thread.map((item) => {
            const ownMessage = chatOwnsCurrentView(item);
            const senderRole = chatSenderRole(item);
            const bubble = '<div class="message-bubble' + (ownMessage ? ' is-user' : '') + '">' + chatMessageHeaderHtml(item, business) + '<span>' + clean(item.text) + '</span>' + renderReference(item.ref, business) + '</div>';
            const avatarHtml = messageAvatarHtml(item, business);
            const messageId = escapeAttr(item && (item.id || item.messageId || item.chatMessageId || item.createdAt || item.at) || "");
            return '<div class="message-row' + (ownMessage ? ' is-user' : '') + '" data-message-sender-role="' + escapeAttr(senderRole) + '"' + (messageId ? ' data-message-id="' + messageId + '"' : '') + '>' + (ownMessage ? bubble + avatarHtml : avatarHtml + bubble) + '</div>';
          }).join(""));
          if (window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(messageList);
          messageList.hidden = !thread.length;
          emptyState.hidden = !!thread.length;
          form.hidden = false;
          detailHead.hidden = false;
          detailName.textContent = business.name;
          detailStatus.textContent = business.status;
          applyChatBusinessAvatar(detailAvatar, business);
          if (input) input.placeholder = activeProfileRole() === "business" ? "Reply to this customer" : "Message this business";
          if (messagesChanged) requestAnimationFrame(() => { messageList.parentElement.scrollTop = messageList.parentElement.scrollHeight; });
        }
        function openThread(key) {
          const business = ensureKnownBusiness(key);
          if (!business) return;
          activeKey = business.key;
          shell.classList.add("has-open-thread");
          document.querySelectorAll("[data-thread-key]").forEach((row) => row.classList.toggle("is-active", row.dataset.threadKey === activeKey));
          renderMessages(business);
          markThreadNotificationsSeenByCustomer(business);
          renderThreads();
          renderHeader();
          renderChatNotifications();
        }
        function renderThreads() {
          refreshKnownBusinesses();
          const query = clean(searchInput.value).toLowerCase();
          const visible = businesses.filter((business) => !query || business.name.toLowerCase().includes(query));
          if (!visible.length) {
            window.emySetListHtmlIfChanged(threadList, '<div class="thread-empty">No real conversations yet. Open a business or product and send the first message.</div>');
            return;
          }
          window.emySetListHtmlIfChanged(threadList, visible.map((business) => {
            const thread = readThread(business);
            return '<button class="thread-row' + (business.key === activeKey ? ' is-active' : '') + '" type="button" data-thread-key="' + business.key + '">' + chatBusinessAvatarMarkup(business, "thread-avatar") + '<span class="thread-copy"><strong>' + business.name + '</strong><span>' + preview(thread) + '</span></span><span class="thread-time">now</span></button>';
          }).join(""));
          if (window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(threadList);
        }
        function openFirstThreadIfIdle() {
          if (activeKey) return;
          refreshKnownBusinesses();
          if (businesses[0]) openThread(businesses[0].key);
        }
        function openReferenceDetailFromChat(link) {
          if (!link) return;
          if (typeof window.emyOpenItemDetail === "function" && window.emyOpenItemDetail(link)) return;
          const data = link.dataset || {};
          try {
            localStorage.setItem("emyPendingItemDetailOpen", JSON.stringify({
              createdAt: Date.now(),
              businessKey: data.businessKey || "",
              detailKind: data.detailKind || "Product",
              title: data.detailTitle || "",
              description: data.detailDescription || "",
              business: data.detailBusiness || "",
              price: data.detailPrice || "",
              media: data.detailMedia || "",
              mediaSrc: data.detailMediaSrc || "",
              mediaRef: data.detailMediaRef || "",
              mediaType: data.detailMediaType || "",
              posterSrc: data.detailPosterSrc || "",
              posterRef: data.detailPosterRef || "",
              meta: data.detailMeta || ""
            }));
          } catch (error) {}
          const href = link.getAttribute("href") || (String(data.detailKind || "").toLowerCase().includes("clip") ? "emy-customer-home.html#reels" : String(data.detailKind || "").toLowerCase().includes("post") ? "emy-customer-home.html#feeds" : "emy-customer-search.html#products");
          window.location.href = href;
        }
        window.emyOpenChatReferenceDetail = function emyOpenChatReferenceDetail(link, event) {
          if (event) {
            event.preventDefault();
            event.stopPropagation();
          }
          openReferenceDetailFromChat(link);
          return false;
        };
        document.addEventListener("click", (event) => {
          const reference = event.target.closest(".message-ref[data-open-item-detail]");
          if (!reference) return;
          event.preventDefault();
          event.stopPropagation();
          openReferenceDetailFromChat(reference);
        });
        threadList.addEventListener("click", (event) => {
          const row = event.target.closest("[data-thread-key]");
          if (row) openThread(row.dataset.threadKey);
        });
        searchInput.addEventListener("input", renderThreads);
        form.addEventListener("submit", (event) => {
          event.preventDefault();
          const text = clean(input.value);
          if (!text || !activeKey) return;
          const business = businesses.find((item) => item.key === activeKey) || businesses[0];
          const thread = readThread(business);
          const senderRole = activeProfileRole() === "business" ? "business" : "customer";
          const ref = senderRole === "customer" ? contactIntentRefForBusiness(business) : null;
          const businessMedia = chatStoredBusinessPhoto(business.key, business.name, business);
          const message = {
            id: chatMessageId("message"),
            author: senderRole === "business" ? chatCurrentBusinessName(business.name) : chatCurrentCustomerName(),
            text,
            senderRole,
            recipientRole: senderRole === "business" ? "customer" : "business",
            mine: senderRole === "customer",
            businessKey: business.key,
            businessName: business.name,
            businessPhoto: businessMedia.src,
            businessPhotoRef: businessMedia.ref,
            avatarSrc: senderRole === "business" ? businessMedia.src : "",
            avatarRef: senderRole === "business" ? businessMedia.ref : "",
            customerKey: chatCurrentCustomerKey(),
            customerName: chatCurrentCustomerName(),
            customerEmail: clean(localStorage.getItem("emyMainSignedInEmail")),
            customerPhoto: chatCurrentCustomerPhoto(),
            customerPhotoRef: chatCurrentCustomerPhotoRef(),
            likes: 0,
            ref,
            createdAt: new Date().toISOString(),
            readBySender: true,
            readByBusiness: senderRole === "business",
            readByCustomer: senderRole === "customer"
          };
          thread.push(message);
          writeThread(activeKey, thread);
          notifyChatCounterpart(message, business);
          input.value = "";
          renderThreads();
          renderMessages(business);
          renderHeader();
        });
        document.querySelector("[data-empty-send]").addEventListener("click", () => {
          refreshKnownBusinesses();
          if (businesses[0]) openThread(businesses[0].key);
        });
        document.querySelector("[data-new-chat]").addEventListener("click", () => {
          refreshKnownBusinesses();
          if (businesses[0]) openThread(businesses[0].key);
        });
        document.querySelector("[data-back-list]").addEventListener("click", () => shell.classList.remove("has-open-thread"));
        if (headerAvatar) headerAvatar.addEventListener("click", () => { window.location.href = "emy-customer-profile.html"; });
        if (headerSearch) headerSearch.addEventListener("click", () => { window.location.href = "emy-customer-search.html"; });
        document.querySelectorAll("[data-chat-business-switch]").forEach((button) => {
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
        if (headerNotifications) headerNotifications.addEventListener("click", (event) => {
          event.stopPropagation();
          setChatNotificationsOpen(!(notificationPanel && notificationPanel.classList.contains("is-open")));
        });
        if (notificationClose) notificationClose.addEventListener("click", (event) => {
          event.stopPropagation();
          setChatNotificationsOpen(false);
        });
        if (notificationSettings) notificationSettings.addEventListener("click", (event) => {
          event.stopPropagation();
          try {
            const page = window.location.pathname.split("/").pop() || "emy-customer-chat.html";
            localStorage.setItem("emyNotificationReturnPage", page + window.location.search + window.location.hash);
          } catch (error) {}
          window.location.href = "emy-notification-settings.html";
        });
        if (notificationList) notificationList.addEventListener("click", (event) => {
          const menuButton = event.target.closest("[data-chat-notification-menu]");
          if (menuButton) {
            event.stopPropagation();
            toggleChatNotificationMenu(menuButton.dataset.chatNotificationMenu, menuButton);
            return;
          }
          const action = event.target.closest("[data-chat-notification-action]");
          if (action) {
            event.stopPropagation();
            if (action.dataset.chatNotificationAction === "hide") hideChatNotification(action.dataset.chatNotificationActionId);
            if (action.dataset.chatNotificationAction === "delete") dismissChatNotification(action.dataset.chatNotificationActionId);
            return;
          }
          const row = event.target.closest("[data-chat-notification-id]");
          if (!row) return;
          const item = readChatNotifications().find((notification) => notification.id === row.dataset.chatNotificationId);
          openChatNotification(item);
        });
        if (notificationList) notificationList.addEventListener("keydown", (event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          const row = event.target.closest("[data-chat-notification-id]");
          if (!row) return;
          event.preventDefault();
          const item = readChatNotifications().find((notification) => notification.id === row.dataset.chatNotificationId);
          openChatNotification(item);
        });
        if (notificationPanel) notificationPanel.addEventListener("click", (event) => event.stopPropagation());
        document.addEventListener("click", () => {
          closeChatNotificationMenus();
          setChatNotificationsOpen(false);
        });
        document.addEventListener("keydown", (event) => {
          if (event.key === "Escape") setChatNotificationsOpen(false);
        });
        window.addEventListener("resize", () => {
          if (notificationPanel && notificationPanel.classList.contains("is-open")) positionChatNotificationsPanel();
        });
        if (detailProfile) detailProfile.addEventListener("click", () => openBusinessProfile(activeKey));
        window.addEventListener("storage", (event) => {
          if (!event || !event.key || (event.key.indexOf("emyBusinessChatThread:") !== 0 && event.key.indexOf("emyBusinessNotifications:") !== 0 && event.key !== "emyCustomerNotifications")) return;
          renderHeader();
          renderChatNotifications();
          renderThreads();
          if (activeKey) {
            const business = businesses.find((item) => item.key === activeKey);
            if (business) renderMessages(business);
          }
        });
`;
const customer_chat_part_8 = String.raw`
        document.querySelectorAll("[data-nav]").forEach((button) => {
          button.addEventListener("click", () => {
            const nav = button.dataset.nav;
            if (nav === "chat") return;
            if (nav === "home") window.location.href = "emy-customer-home.html";
            if (nav === "nearby") window.location.href = "emy-customer-home.html#nearby";
            if (nav === "feeds") window.location.href = "emy-customer-home.html#feeds";
            if (nav === "reels") window.location.href = "emy-customer-home.html#reels";
            if (nav === "uploads") window.location.href = "emy-customer-home.html?tab=uploads#uploads";
            if (nav === "profile") window.location.href = "emy-customer-profile.html";
            if (nav === "ask") window.location.href = "ask-emy.html";
          });
        });
        renderHeader();
        renderChatNotifications();
        renderThreads();
        try {
          const params = new URLSearchParams(window.location.search || "");
          const requestedBusiness = normaliseChatBusinessKey(params.get("business") || localStorage.getItem("emyCustomerChatOpenKey") || "");
          if (requestedBusiness) {
            openThread(requestedBusiness);
            localStorage.removeItem("emyCustomerChatOpenKey");
          } else {
            openFirstThreadIfIdle();
          }
        } catch (error) {
          openFirstThreadIfIdle();
        }
`;
const customer_chat_part_9 = String.raw`
      })();
    </script>
  </body>
`;

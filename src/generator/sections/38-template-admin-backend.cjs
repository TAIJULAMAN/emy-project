/* EMY generator section: 38-template-admin-backend.cjs (source lines 99463-101226) */
function emyAdminBackendPageTemplateClean() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>EMY Admin Backend</title>
    <style>
      :root { --navy:#001b47; --ink:#101828; --muted:#667085; --line:#d9e2ee; --bg:#f5f7fb; --card:#fff; --orange:#ff6a00; --green:#039855; --red:#d92d20; --blue:#1570ef; }
      * { box-sizing:border-box; }
      html, body { margin:0; min-height:100%; background:var(--bg); color:var(--ink); font-family:Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      button, input, select, textarea { font:inherit; }
      button { cursor:pointer; }
      a { color:inherit; }
      .shell { min-height:100vh; display:grid; grid-template-columns:240px minmax(0,1fr); }
      .side { border-right:1px solid var(--line); background:#fff; padding:16px 12px; }
      .brand { display:flex; align-items:center; gap:10px; padding:4px 6px 18px; }
      .brand-mark { width:36px; height:36px; border-radius:10px; display:grid; place-items:center; background:var(--orange); color:#fff; font-weight:900; }
      .brand strong { display:block; color:var(--navy); font-size:15px; line-height:1.1; }
      .brand span span { display:block; margin-top:3px; color:var(--muted); font-size:12px; font-weight:650; }
      .nav { display:grid; gap:6px; }
      .nav button { width:100%; min-height:42px; border:1px solid transparent; border-radius:10px; background:transparent; color:#344054; display:flex; align-items:center; justify-content:space-between; gap:10px; padding:0 10px; text-align:left; font-size:13px; font-weight:800; }
      .nav button:hover { background:#f8fafc; border-color:var(--line); }
      .nav button.is-active { background:#fff7ed; border-color:rgba(255,106,0,.28); color:#c14f00; }
      .nav small { min-width:24px; height:22px; border-radius:999px; display:grid; place-items:center; background:#eef2f7; color:#475467; font-size:11px; font-weight:900; }
      .nav button.is-active small { background:#fff; color:#c14f00; }
      .main { min-width:0; }
      .topbar { position:sticky; top:0; z-index:5; min-height:68px; display:flex; align-items:center; justify-content:space-between; gap:16px; border-bottom:1px solid var(--line); background:rgba(255,255,255,.92); padding:12px 18px; backdrop-filter:blur(12px); }
      .title h1 { margin:0; color:var(--navy); font-size:22px; line-height:1.1; font-weight:900; }
      .title p { margin:4px 0 0; color:var(--muted); font-size:13px; line-height:1.35; font-weight:650; }
      .top-actions { display:flex; flex-wrap:wrap; gap:8px; justify-content:flex-end; }
      .btn, .link-btn { min-height:34px; border-radius:999px; border:1px solid var(--line); background:#fff; color:var(--navy); display:inline-flex; align-items:center; justify-content:center; gap:7px; padding:0 12px; font-size:12px; line-height:1; font-weight:850; text-decoration:none; }
      .btn.primary { border-color:var(--orange); background:var(--orange); color:#fff; }
      .btn.danger { border-color:rgba(217,45,32,.24); background:#fff1f0; color:var(--red); }
      .content { padding:18px; }
      .hero { border:1px solid rgba(255,106,0,.20); border-radius:12px; background:#fff7ed; color:#7a3b00; padding:13px 14px; margin-bottom:14px; font-size:13px; line-height:1.45; font-weight:700; }
      .filters { display:grid; grid-template-columns:minmax(0,1fr) 170px auto; gap:10px; margin-bottom:14px; }
      .input, .select, .textarea { width:100%; border:1px solid var(--line); border-radius:10px; background:#fff; color:var(--navy); outline:0; padding:10px 11px; font-size:13px; line-height:1.2; font-weight:650; }
      .textarea { min-height:240px; resize:vertical; font-family:Consolas, "SFMono-Regular", monospace; line-height:1.45; }
      .metric-grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:12px; margin-bottom:14px; }
      .metric { border:1px solid var(--line); border-radius:12px; background:#fff; padding:14px; box-shadow:0 10px 24px rgba(16,24,40,.04); }
      .metric small { display:block; color:var(--muted); font-size:11px; text-transform:uppercase; letter-spacing:.06em; font-weight:900; }
      .metric strong { display:block; margin-top:8px; color:var(--navy); font-size:28px; line-height:1; font-weight:900; }
      .metric span { display:block; margin-top:7px; color:#667085; font-size:12px; line-height:1.35; font-weight:650; }
      .grid { display:grid; grid-template-columns:1.25fr .75fr; gap:14px; }
      .stats-layout { display:grid; grid-template-columns:1.1fr .9fr; gap:14px; margin-bottom:14px; }
      .chart { min-height:260px; display:flex; align-items:end; gap:10px; padding:18px 12px 10px; border:1px solid var(--line); border-radius:12px; background:linear-gradient(180deg,#fff,#fbfcff); }
      .chart-bar { flex:1; min-width:42px; display:grid; align-items:end; gap:8px; text-align:center; }
      .chart-bar span { display:block; width:100%; min-height:8px; border-radius:8px 8px 3px 3px; background:linear-gradient(180deg,var(--orange),#ff9f43); box-shadow:0 10px 18px rgba(255,106,0,.16); }
      .chart-bar b { color:var(--navy); font-size:13px; line-height:1; font-weight:900; }
      .chart-bar small { color:#667085; font-size:11px; line-height:1.2; font-weight:800; overflow-wrap:anywhere; }
      .growth-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:14px; margin-bottom:14px; }
      .growth-chart { min-height:220px; display:flex; align-items:end; gap:7px; padding:16px 10px 10px; border:1px solid var(--line); border-radius:12px; background:linear-gradient(180deg,#fff,#fbfcff); }
      .growth-bar { flex:1; min-width:24px; display:grid; align-items:end; gap:7px; text-align:center; }
      .growth-bar span { display:block; width:100%; min-height:8px; border-radius:8px 8px 3px 3px; background:linear-gradient(180deg,var(--blue),#72b7ff); box-shadow:0 10px 18px rgba(21,112,239,.13); }
      .growth-bar b { color:var(--navy); font-size:12px; line-height:1; font-weight:900; }
      .growth-bar small { color:#667085; font-size:10px; line-height:1.15; font-weight:800; overflow-wrap:anywhere; }
      .health-list { display:grid; gap:10px; }
      .health-item { border:1px solid var(--line); border-radius:10px; background:#fff; padding:11px; display:grid; gap:8px; }
      .health-top { display:flex; justify-content:space-between; gap:10px; color:var(--navy); font-size:13px; font-weight:900; }
      .health-track { height:9px; border-radius:999px; background:#eef2f7; overflow:hidden; }
      .health-track span { display:block; height:100%; border-radius:inherit; background:linear-gradient(90deg,var(--blue),#5aa7ff); }
      .split-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:14px; }
      .three-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:14px; }
      .journey { display:grid; grid-template-columns:repeat(5,minmax(0,1fr)); gap:10px; }
      .journey-step { position:relative; border:1px solid var(--line); border-radius:12px; background:#fff; padding:12px; min-height:118px; }
      .journey-step::after { content:""; position:absolute; right:-10px; top:50%; width:10px; height:2px; background:var(--line); }
      .journey-step:last-child::after { display:none; }
      .journey-step small { display:block; color:#667085; font-size:10px; font-weight:900; text-transform:uppercase; letter-spacing:.06em; }
      .journey-step strong { display:block; margin-top:8px; color:var(--navy); font-size:26px; line-height:1; font-weight:900; }
      .journey-step span { display:block; margin-top:7px; color:#667085; font-size:12px; line-height:1.35; font-weight:650; }
      .plan-grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:12px; }
      .plan-card { border:1px solid var(--line); border-radius:12px; background:#fff; padding:14px; box-shadow:0 10px 24px rgba(16,24,40,.04); }
      .plan-card h3 { margin:0; color:var(--navy); font-size:15px; line-height:1.15; font-weight:900; }
      .plan-card strong { display:block; margin-top:10px; color:var(--orange); font-size:24px; line-height:1; font-weight:900; }
      .plan-card p { margin:8px 0 0; color:#667085; font-size:12px; line-height:1.35; font-weight:650; }
      .approval-grid { display:grid; gap:12px; }
      .approval-card { border:1px solid var(--line); border-radius:12px; background:#fff; padding:14px; box-shadow:0 10px 24px rgba(16,24,40,.04); }
      .approval-top { display:grid; grid-template-columns:minmax(0,1fr) auto; gap:14px; align-items:start; }
      .approval-title h3 { margin:0; color:var(--navy); font-size:16px; line-height:1.15; font-weight:900; }
      .approval-title p { margin:6px 0 0; color:#475467; font-size:13px; line-height:1.4; font-weight:650; }
      .score-ring { width:82px; height:82px; border-radius:999px; display:grid; place-items:center; background:conic-gradient(var(--green) var(--score), #eef2f7 0); }
      .score-ring span { width:58px; height:58px; border-radius:999px; display:grid; place-items:center; background:#fff; color:var(--navy); font-size:17px; font-weight:900; box-shadow:inset 0 0 0 1px var(--line); }
      .check-grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:8px; margin:12px 0; }
      .check-item { border:1px solid var(--line); border-radius:10px; background:#fbfcff; padding:9px; color:#667085; font-size:11px; line-height:1.25; font-weight:800; }
      .check-item.good { border-color:rgba(3,152,85,.22); background:#ecfdf3; color:#027a48; }
      .check-item.missing { border-color:rgba(255,106,0,.22); background:#fff7ed; color:#c14f00; }
      .approval-note { width:100%; min-height:68px; border:1px solid var(--line); border-radius:10px; padding:10px; color:var(--navy); resize:vertical; font-size:12.5px; font-weight:650; }
      .audit-list { display:grid; gap:9px; }
      .audit-item { border:1px solid var(--line); border-radius:10px; background:#fbfcff; padding:10px; }
      .audit-item b { display:block; color:var(--navy); font-size:13px; }
      .audit-item span { display:block; margin-top:4px; color:#667085; font-size:12px; line-height:1.35; font-weight:650; }
      .panel { border:1px solid var(--line); border-radius:12px; background:#fff; overflow:hidden; box-shadow:0 10px 24px rgba(16,24,40,.04); }
      .panel-head { min-height:50px; display:flex; align-items:center; justify-content:space-between; gap:12px; border-bottom:1px solid var(--line); background:#fbfcff; padding:12px 14px; }
      .panel-head h2 { margin:0; color:var(--navy); font-size:15px; line-height:1.1; font-weight:900; }
      .panel-head p { margin:4px 0 0; color:var(--muted); font-size:12px; line-height:1.3; font-weight:650; }
      .panel-body { padding:14px; }
      .banner-editor-grid { display:grid; grid-template-columns:minmax(0,1fr) minmax(320px,.82fr); gap:14px; align-items:start; }
      .form-grid { display:grid; gap:10px; }
      .field-label { display:grid; gap:6px; color:var(--navy); font-size:12px; line-height:1.2; font-weight:850; }
      .field-label span { color:#667085; font-size:11px; font-weight:750; }
      .service-admin-grid { display:grid; grid-template-columns:minmax(0,.82fr) minmax(0,1.18fr); gap:14px; align-items:start; }
      .service-profile-list { display:grid; gap:10px; }
      .service-profile-empty { border:1px dashed rgba(255,106,0,.26); border-radius:10px; background:#fff7ed; color:#8a4b10; padding:12px; font-size:12px; line-height:1.4; font-weight:750; }
      .admin-banner-preview { position:relative; min-height:260px; overflow:hidden; border:1px solid rgba(0,27,71,.10); border-radius:14px; background:radial-gradient(circle at 88% 22%, rgba(255,106,0,.24), transparent 86px), linear-gradient(135deg,#fff 0%,#fff7ef 48%,#f6dcc9 100%); box-shadow:0 16px 34px rgba(0,27,71,.08); }
      .admin-banner-preview::before { content:""; position:absolute; inset:0; background:linear-gradient(120deg, transparent 0 42%, rgba(255,255,255,.78) 42% 46%, transparent 46%), linear-gradient(155deg, transparent 0 70%, rgba(255,106,0,.12) 70% 100%); }
      .admin-banner-preview-media { position:absolute; inset:0; z-index:0; background:#eef2f7; }
      .admin-banner-preview-media img,
      .admin-banner-preview-media video { width:100%; height:100%; object-fit:cover; display:block; }
      .admin-banner-preview.has-media::before { z-index:1; background:linear-gradient(90deg, rgba(255,255,255,.94), rgba(255,255,255,.76) 44%, rgba(255,255,255,.20)); }
      .admin-banner-preview-copy { position:relative; z-index:2; min-height:260px; display:grid; grid-template-columns:54px minmax(0,1fr); align-items:center; gap:12px; padding:20px; }
      .admin-banner-mark { width:48px; height:48px; border-radius:12px; display:grid; place-items:center; background:linear-gradient(145deg,#ff8a28,#ff5a00); color:#fff; font-size:27px; line-height:1; font-weight:900; box-shadow:inset -6px -6px 0 rgba(0,0,0,.10), 0 12px 22px rgba(255,106,0,.28); }
      .admin-banner-kicker { width:fit-content; min-height:24px; display:inline-flex; align-items:center; border:1px solid rgba(255,106,0,.20); border-radius:999px; background:rgba(255,255,255,.70); color:#b14a00; padding:0 10px; font-size:10px; line-height:1; font-weight:900; text-transform:uppercase; letter-spacing:.10em; }
      .admin-banner-preview h3 { margin:8px 0 0; color:var(--navy); font-size:28px; line-height:.98; font-weight:900; }
      .admin-banner-preview h3 span { color:var(--orange); }
      .admin-banner-preview p { max-width:380px; margin:9px 0 0; color:#5f6d86; font-size:13px; line-height:1.4; font-weight:700; }
      .admin-banner-tags { display:flex; flex-wrap:wrap; gap:6px; margin-top:10px; }
      .admin-banner-tags span { min-height:22px; display:inline-flex; align-items:center; border-radius:999px; background:rgba(0,27,71,.06); color:var(--navy); padding:0 9px; font-size:10px; line-height:1; font-weight:800; }
      .media-actions { display:flex; flex-wrap:wrap; gap:8px; align-items:center; }
      .media-actions input[type=file] { width:100%; border:1px dashed var(--line); border-radius:10px; background:#fbfcff; padding:10px; color:#667085; font-size:12px; font-weight:750; }
      .banner-media-list { display:grid; grid-template-columns:repeat(auto-fit,minmax(140px,1fr)); gap:9px; }
      .banner-media-card { min-width:0; border:1px solid var(--line); border-radius:10px; background:#fff; overflow:hidden; }
      .banner-media-card figure { margin:0; height:86px; background:#0f172a; }
      .banner-media-card img, .banner-media-card video { width:100%; height:100%; object-fit:cover; display:block; }
      .banner-media-card figcaption { display:grid; gap:6px; padding:8px; }
      .banner-media-card b { color:var(--navy); font-size:11px; line-height:1.15; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
      .banner-media-card small { color:#667085; font-size:10px; line-height:1.2; font-weight:750; }
      .banner-media-card button { min-height:28px; border:1px solid rgba(180,35,24,.18); border-radius:999px; background:#fff1f0; color:#b42318; font-size:10.5px; font-weight:850; }
      .queue { display:grid; gap:10px; }
      .record { border:1px solid var(--line); border-radius:10px; background:#fff; padding:12px; display:grid; grid-template-columns:minmax(0,1fr) auto; gap:12px; }
      .record h3 { margin:0; color:var(--navy); font-size:14px; line-height:1.2; font-weight:900; }
      .record p { margin:5px 0 0; color:#475467; font-size:12.5px; line-height:1.4; font-weight:650; }
      .record-meta { display:flex; flex-wrap:wrap; gap:6px; margin-top:9px; }
      .tag { min-height:23px; border-radius:999px; background:#eef4ff; color:#175cd3; display:inline-flex; align-items:center; padding:0 8px; font-size:11px; font-weight:850; }
      .tag.pending { background:#fff4e8; color:#c14f00; }
      .tag.good { background:#ecfdf3; color:#027a48; }
      .tag.bad { background:#fff1f0; color:#b42318; }
      .account-badge { min-height:24px; border-radius:999px; display:inline-flex; align-items:center; gap:6px; padding:0 9px; font-size:11px; line-height:1; font-weight:900; }
      .account-badge::before { content:""; width:7px; height:7px; border-radius:999px; background:currentColor; }
      .account-badge.customer { background:#eef4ff; color:#175cd3; }
      .account-badge.owner-customer { background:#eff8ff; color:#026aa2; }
      .account-badge.business { background:#fff4e8; color:#c14f00; }
      .account-badge.content { background:#ecfdf3; color:#027a48; }
      .account-badge.system { background:#f4f3ff; color:#5b3cc4; }
      .record-actions { display:flex; flex-wrap:wrap; align-content:start; justify-content:flex-end; gap:7px; }
      .record-actions a, .record-actions button { min-height:30px; border:1px solid var(--line); border-radius:999px; background:#fff; color:var(--navy); display:inline-flex; align-items:center; justify-content:center; gap:6px; padding:0 10px; font-size:11px; font-weight:850; text-decoration:none; }
      .record-actions svg { width:14px; height:14px; fill:none; stroke:currentColor; stroke-width:2; stroke-linecap:round; stroke-linejoin:round; }
      .record-actions button.primary { border-color:var(--orange); background:#fff7ed; color:#c14f00; }
      .record-actions button.danger { border-color:rgba(180,35,24,.18); background:#fff1f0; color:#b42318; }
      .record-actions button:disabled { opacity:.56; cursor:default; box-shadow:none; }
      .record-actions button.primary:disabled { border-color:rgba(3,152,85,.20); background:#ecfdf3; color:#027a48; }
      .visual-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(250px,1fr)); gap:12px; align-items:start; }
      .profile-card, .content-card, .data-card { border:1px solid var(--line); border-radius:12px; background:#fff; overflow:hidden; box-shadow:0 10px 24px rgba(16,24,40,.04); }
      .profile-cover { min-height:74px; background:linear-gradient(135deg,#f8fbff,#fff7ed); border-bottom:1px solid var(--line); }
      .profile-body { padding:0 14px 14px; display:grid; gap:10px; }
      .profile-avatar { width:78px; height:78px; margin-top:-39px; border:4px solid #fff; border-radius:18px; background:#eef4ff; color:#175cd3; display:grid; place-items:center; overflow:hidden; font-size:22px; font-weight:900; box-shadow:0 12px 24px rgba(16,24,40,.10); }
      .profile-avatar img, .profile-avatar video { width:100%; height:100%; object-fit:cover; display:block; }
      .profile-card h3, .content-card h3, .data-card h3 { margin:0; color:var(--navy); font-size:15px; line-height:1.2; font-weight:900; overflow-wrap:anywhere; }
      .profile-card p, .content-card p, .data-card p { margin:0; color:#475467; font-size:12.5px; line-height:1.4; font-weight:650; overflow-wrap:anywhere; }
      .profile-fields { display:grid; gap:6px; }
      .profile-field { display:grid; grid-template-columns:76px minmax(0,1fr); gap:8px; color:#344054; font-size:12px; line-height:1.35; font-weight:700; }
      .profile-field b { color:#667085; font-size:10px; text-transform:uppercase; letter-spacing:.06em; }
      .profile-field a { color:var(--navy); font-weight:800; text-decoration:underline; text-underline-offset:2px; }
      .content-card { display:grid; grid-template-columns:104px minmax(0,1fr); min-height:132px; }
      .content-media, .record-media, .data-media { background:#f2f4f7; color:#667085; display:grid; place-items:center; overflow:hidden; font-size:11px; font-weight:900; text-align:center; }
      .content-media img, .content-media video, .record-media img, .record-media video, .data-media img, .data-media video { width:100%; height:100%; object-fit:cover; display:block; }
      .content-body, .data-body { padding:12px; display:grid; align-content:start; gap:8px; }
      .record.has-media { grid-template-columns:72px minmax(0,1fr) auto; }
      .record-media { width:72px; height:72px; border:1px solid var(--line); border-radius:10px; }
      .data-card { display:grid; grid-template-columns:96px minmax(0,1fr); min-height:116px; }
      .data-media { min-height:116px; }
      .data-card.is-wide { grid-template-columns:1fr; }
      .data-card.is-wide .data-body { padding:14px; }
      .activity-groups { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:12px; align-items:start; }
      .activity-panel { border:1px solid var(--line); border-radius:12px; background:#fff; overflow:hidden; }
      .activity-panel-head { min-height:54px; display:flex; align-items:center; justify-content:space-between; gap:10px; border-bottom:1px solid var(--line); background:#fbfcff; padding:11px 12px; }
      .activity-panel-head h3 { margin:0; color:var(--navy); font-size:14px; line-height:1.15; font-weight:900; }
      .activity-panel-head p { margin:3px 0 0; color:#667085; font-size:11.5px; line-height:1.3; font-weight:700; }
      .activity-list { max-height:340px; overflow:auto; display:grid; }
      .activity-row { min-height:68px; display:grid; grid-template-columns:58px minmax(0,1fr) auto; gap:10px; align-items:center; border-bottom:1px solid var(--line); padding:8px 10px; }
      .activity-row:last-child { border-bottom:0; }
      .activity-media { width:58px; height:58px; border:1px solid var(--line); border-radius:9px; background:#f2f4f7; color:#667085; display:grid; place-items:center; overflow:hidden; font-size:10.5px; line-height:1.1; font-weight:900; text-align:center; }
      .activity-media img, .activity-media video { width:100%; height:100%; object-fit:cover; display:block; }
      .activity-copy { min-width:0; }
      .activity-copy h4 { margin:0; color:var(--navy); font-size:13px; line-height:1.18; font-weight:900; overflow-wrap:anywhere; }
      .activity-copy p { margin:4px 0 0; color:#475467; font-size:11.5px; line-height:1.25; font-weight:700; overflow-wrap:anywhere; }
      .activity-copy .record-meta { margin-top:6px; }
      .activity-row .record-actions { justify-content:flex-end; }
      .activity-row .record-actions button { min-height:28px; padding:0 9px; }
      .section-search { display:grid; grid-template-columns:minmax(0,1fr) auto; gap:10px; align-items:end; margin:0 0 12px; }
      .section-search label { display:grid; gap:5px; }
      .section-search span { color:#667085; font-size:10.5px; text-transform:uppercase; letter-spacing:.06em; font-weight:900; }
      .section-search small { min-height:32px; border:1px solid var(--line); border-radius:999px; background:#fbfcff; color:#475467; display:inline-flex; align-items:center; justify-content:center; padding:0 11px; font-size:11px; line-height:1; font-weight:850; white-space:nowrap; }
      .raw-block { border:1px solid var(--line); border-radius:12px; background:#fbfcff; overflow:hidden; }
      .raw-block summary { cursor:pointer; list-style:none; padding:12px 14px; color:var(--navy); font-size:13px; line-height:1; font-weight:900; border-bottom:1px solid var(--line); }
      .raw-block summary::-webkit-details-marker { display:none; }
      .detail-hero { border:1px solid var(--line); border-radius:12px; background:#fbfcff; overflow:hidden; display:grid; grid-template-columns:180px minmax(0,1fr); }
      .detail-hero-media { min-height:180px; background:#eef2f7; display:grid; place-items:center; color:#667085; font-weight:900; overflow:hidden; }
      .detail-hero-media img, .detail-hero-media video { width:100%; height:100%; object-fit:cover; display:block; }
      .detail-hero-copy { padding:14px; display:grid; align-content:center; gap:8px; }
      .detail-hero-copy h3 { margin:0; color:var(--navy); font-size:20px; line-height:1.1; font-weight:900; overflow-wrap:anywhere; }
      .detail-hero-copy p { margin:0; color:#475467; font-size:13px; line-height:1.4; font-weight:650; overflow-wrap:anywhere; }
      table { width:100%; border-collapse:collapse; min-width:720px; }
      th, td { border-bottom:1px solid var(--line); padding:10px 9px; text-align:left; vertical-align:middle; color:#344054; font-size:12.5px; line-height:1.35; font-weight:650; }
      th { background:#f8fafc; color:#667085; font-size:10.5px; letter-spacing:.06em; text-transform:uppercase; font-weight:900; }
      .table-scroll { overflow:auto; }
      .empty { border:1px dashed var(--line); border-radius:10px; background:#fbfcff; color:#667085; padding:26px; text-align:center; font-size:13px; font-weight:700; }
      .source-list { display:grid; gap:9px; }
      .source-item { border:1px solid var(--line); border-radius:10px; background:#fff; padding:11px; }
      .source-item b { display:block; color:var(--navy); font-size:13px; }
      .source-item span { display:block; margin-top:4px; color:var(--muted); font-size:12px; line-height:1.35; font-weight:650; overflow-wrap:anywhere; }
      .ai-status-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(190px,1fr)); gap:10px; margin-bottom:14px; }
      .ai-status-card { border:1px solid var(--line); border-radius:12px; background:linear-gradient(180deg,#fff,#f8fbff); padding:12px; box-shadow:0 8px 22px rgba(0,31,84,.06); }
      .ai-status-card b { display:block; color:var(--navy); font-size:12px; letter-spacing:.02em; text-transform:uppercase; }
      .ai-status-card span { display:block; margin-top:5px; color:var(--muted); font-size:12px; line-height:1.35; font-weight:700; }
      .ai-status-pill { display:inline-flex; align-items:center; gap:6px; margin-top:8px; border-radius:999px; padding:5px 9px; background:#f2f4f7; color:#344054; font-size:11px; font-weight:900; }
      .ai-status-pill.good { background:#ecfdf3; color:#027a48; }
      .ai-status-pill.warn { background:#fff7ed; color:#c14f00; }
      .ai-model-help { display:block; color:#667085; font-size:11px; line-height:1.35; font-weight:750; margin:5px 0 7px; }
      .toast { position:fixed; right:18px; bottom:18px; z-index:20; max-width:360px; border:1px solid rgba(255,106,0,.24); border-radius:12px; background:#fff7ed; color:#7a3b00; padding:12px 14px; box-shadow:0 18px 38px rgba(16,24,40,.16); font-size:12px; line-height:1.4; font-weight:760; }
      .modal { position:fixed; inset:0; z-index:15; display:grid; place-items:center; background:rgba(0,27,71,.34); padding:18px; }
      .modal-card { width:min(760px,100%); max-height:86vh; overflow:auto; border-radius:14px; background:#fff; box-shadow:0 28px 80px rgba(0,27,71,.28); }
      .modal-head { display:flex; justify-content:space-between; align-items:center; gap:10px; border-bottom:1px solid var(--line); padding:14px; }
      .modal-head h2 { margin:0; color:var(--navy); font-size:17px; }
      .modal-body { padding:14px; display:grid; gap:10px; }
      .detail-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:9px; }
      .detail { border:1px solid var(--line); border-radius:10px; background:#f8fafc; padding:10px; overflow-wrap:anywhere; }
      .detail b { display:block; color:#667085; font-size:10px; text-transform:uppercase; letter-spacing:.06em; }
      .detail span { display:block; margin-top:5px; color:#344054; font-size:12.5px; font-weight:700; }
      .field-media-preview { display:block; margin-top:8px; border:1px solid var(--line); border-radius:10px; background:#0f172a; overflow:hidden; }
      .field-media-preview img, .field-media-preview video { width:100%; max-height:280px; object-fit:contain; display:block; background:#0f172a; }
      .field-media-preview small { display:block; padding:7px 9px; background:#fff; color:#475467; font-size:11px; line-height:1.2; font-weight:850; }
      [hidden] { display:none !important; }
      @media (max-width:900px) { .shell { display:block; } .side { border-right:0; border-bottom:1px solid var(--line); } .nav { grid-template-columns:repeat(3,minmax(0,1fr)); } .grid, .filters, .stats-layout, .split-grid, .three-grid, .growth-grid, .plan-grid, .journey, .banner-editor-grid, .service-admin-grid, .detail-hero, .activity-groups { grid-template-columns:1fr; } .journey-step::after { display:none; } .metric-grid { grid-template-columns:repeat(2,minmax(0,1fr)); } .check-grid { grid-template-columns:repeat(2,minmax(0,1fr)); } }
      @media (max-width:560px) { .topbar { display:block; } .top-actions { justify-content:flex-start; margin-top:10px; } .nav, .metric-grid, .content-card, .data-card, .section-search { grid-template-columns:1fr; } .record, .record.has-media, .activity-row { grid-template-columns:1fr; } .record-actions, .activity-row .record-actions { justify-content:flex-start; } .detail-grid { grid-template-columns:1fr; } .content-media, .data-media { min-height:180px; } .activity-media { width:100%; height:150px; } .section-search small { justify-content:flex-start; border-radius:10px; } }
    </style>
  </head>
  <body>
    <div class="shell">
      <aside class="side">
        <div class="brand"><span class="brand-mark">M</span><span><strong>EMY Admin</strong><span>Connected backend view</span></span></div>
        <nav class="nav" data-nav></nav>
      </aside>
      <main class="main">
        <header class="topbar">
          <div class="title"><h1 data-title>Overview</h1><p data-subtitle>Only connected EMY data and actions are shown here.</p></div>
          <div class="top-actions">
            <a class="link-btn" href="emy-customer-home.html">Customer app</a>
            <a class="link-btn" href="emy-business-profile.html">Business profile</a>
            <button class="btn primary" type="button" data-action="snapshot">Save snapshot</button>
          </div>
        </header>
        <section class="content">
          <div class="hero">This admin page reads the same browser data saved by EMY sign up, business profile, products, posts, notifications, Ask EMY, and customer actions. It does not pretend disconnected setup sections are working.</div>
          <div class="filters">
            <input class="input" data-search placeholder="Search connected records..." />
            <select class="select" data-filter><option value="">All statuses</option><option>pending</option><option>approved</option><option>active</option><option>reported</option><option>draft</option></select>
            <button class="btn" type="button" data-action="refresh">Refresh</button>
          </div>
          <section data-root></section>
        </section>
      </main>
    </div>
    <div class="modal" data-modal hidden>
      <section class="modal-card" role="dialog" aria-modal="true">
        <header class="modal-head"><h2 data-modal-title>Record details</h2><button class="btn" type="button" data-close>Close</button></header>
        <div class="modal-body" data-modal-body></div>
      </section>
    </div>
    <div class="toast" data-toast hidden></div>
    <script>
      (function () {
        const views = [
          ['overview','Overview','Whole site pulse'],
          ['statistics','Statistics','Everything important in one view'],
          ['approvals','Approvals','Business approval center'],
          ['journey','User journey','Signup to approval funnel'],
          ['completeness','Completeness','Business profile quality scores'],
          ['services','Services','EMY service provider profiles'],
          ['customerActivity','Customer activity','Customer actions and engagement'],
          ['moderation','Moderation','Content and report queue'],
          ['analytics','Search & Ask EMY','Search and AI usage'],
          ['revenue','Revenue / plans','Plans, ads, invoices'],
          ['audit','Audit log','Admin notes and actions'],
          ['review','Review queue','Items that need admin action'],
          ['people','People','Customers and businesses'],
          ['content','Content','Products, posts, clips, jobs, events'],
          ['banner','Home banner','Customer home campaign banner'],
          ['data','Saved data','Raw connected storage'],
          ['ai','Ask EMY','AI backend status']
        ];
        const root = document.querySelector('[data-root]');
        const nav = document.querySelector('[data-nav]');
        const title = document.querySelector('[data-title]');
        const subtitle = document.querySelector('[data-subtitle]');
        const searchInput = document.querySelector('[data-search]');
        const filterInput = document.querySelector('[data-filter]');
        const modal = document.querySelector('[data-modal]');
        const modalTitle = document.querySelector('[data-modal-title]');
        const modalBody = document.querySelector('[data-modal-body]');
        const toast = document.querySelector('[data-toast]');
        let active = initialView();
        let state = {};
        const adminActionLocks = new Set();

        function esc(value) { return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) { return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]; }); }
        function recordIcon(name) {
          if (name === 'approve' || name === 'save') return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>';
          if (name === 'reject' || name === 'hide') return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>';
          if (name === 'delete') return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14M10 11v6M14 11v6M8 7l1-3h6l1 3M7 7l1 14h8l1-14"/></svg>';
          if (name === 'report') return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 9v4M12 17h.01M10.3 4.7 3.5 17a2 2 0 0 0 1.75 3h13.5a2 2 0 0 0 1.75-3L13.7 4.7a2 2 0 0 0-3.4 0Z"/></svg>';
          if (name === 'open') return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6h10v10M18 6 7 17"/><path d="M6 8v10h10"/></svg>';
          return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5Z"/><path d="M12 9.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"/></svg>';
        }
        function readJson(key, fallback) { try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch (error) { return fallback; } }
        function writeJson(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
        function asArray(value) { if (Array.isArray(value)) return value; if (value && typeof value === 'object') return Object.keys(value).map(function (key) { return Object.assign({ id:key }, value[key]); }); return []; }
        function cleanText(value) { return String(value == null ? '' : value).replace(/\\s+/g, ' ').trim(); }
        function firstText(values) {
          for (let index = 0; index < values.length; index += 1) {
            if (values[index] === false || values[index] === true) continue;
            const text = cleanText(values[index]);
            if (text && text !== '{}' && text !== '[]' && text !== 'null' && text !== 'undefined' && text !== 'false' && text !== 'true') return text;
          }
          return '';
        }
        const adminServiceCatalog = [
          { title:'Insights', category:'Insights into Customer Behaviour' },
          { title:'Logistics', category:'Direct access Services' },
          { title:'Suppliers', category:'Direct access Services' },
          { title:'Legal Support', category:'Direct access Services' },
          { title:'Financial advice', category:'Direct access Services' },
          { title:'Customer Experience', category:'Business Access Services' },
          { title:'IT Services', category:'Business Access Services' },
          { title:'Retail Tech Solutions Providers', category:'Business Access Services' },
          { title:'Payment and Checkout Solutions', category:'Business Access Services' },
          { title:'Supply Chain Optimisation', category:'Business Access Services' }
        ];
        function adminServiceCategory(value) {
          const wanted = adminSlug(value);
          const service = adminServiceCatalog.find(function (item) { return adminSlug(item.title) === wanted; });
          return service ? service.category : 'Business Access Services';
        }
        function normalizeEmail(value) { return cleanText(value).toLowerCase(); }
        function customerOwnsLinkedBusiness(row, business) {
          if (!business) return false;
          const customerEmail = normalizeEmail(firstText([row && row.email, row && row.raw && row.raw.email]));
          const ownerEmail = normalizeEmail(firstText([
            business.raw && business.raw.ownerEmail,
            business.email,
            localStorage.getItem('emyBusinessOwnerCustomerEmail'),
            localStorage.getItem('emyBusinessRegistrationCustomerEmail')
          ]));
          if (customerEmail && ownerEmail && customerEmail === ownerEmail) return true;
          if (accountKind(row) === 'owner-customer' && localStorage.getItem('emyBusinessRegistrationFromCustomer')) return true;
          if (accountKind(row) === 'owner-customer' && cleanText(business.title)) return true;
          return false;
        }
        function customerBusinessAccountField(row) {
          const kind = accountKind(row || {});
          if (kind !== 'customer' && kind !== 'owner-customer') return null;
          const business = businessRecord();
          if (!business || !customerOwnsLinkedBusiness(row, business) || !currentApproved(business, business.id)) {
            return { value:'Not open yet' };
          }
          const name = cleanText(business.title) || 'Business account';
          const href = business.open || 'emy-business-profile.html';
          return { html:'<a href="' + esc(href) + '">' + esc(name) + '</a>', searchText:name };
        }
        function parseStoredObject(value) {
          if (value && typeof value === 'object') return value;
          try {
            const parsed = JSON.parse(String(value || ''));
            return parsed && typeof parsed === 'object' ? parsed : null;
          } catch (error) {
            return null;
          }
        }
        function looksLikeMedia(value) {
          const text = cleanText(value);
          return /^(https?:|data:image|data:video|blob:)/i.test(text) || /\\.(jpg|jpeg|png|gif|webp|avif|mp4|webm|mov)(\\?|#|$)/i.test(text);
        }
        function looksLikeVideo(value) {
          return /^(data:video|blob:)|\\.(mp4|webm|mov)(\\?|#|$)/i.test(cleanText(value));
        }
        function mediaFieldLabel(key, value) {
          const text = cleanText(value);
          if (!text) return '';
          const field = String(key || '').toLowerCase();
          const mediaKey = /image|photo|avatar|logo|cover|poster|thumb|thumbnail|media|video|clip|ref|src/.test(field);
          if (/^data:video/i.test(text) || (mediaKey && looksLikeVideo(text))) return 'Uploaded video';
          if (/^data:image/i.test(text) || (mediaKey && looksLikeMedia(text))) return 'Uploaded image';
          if (mediaKey && (text.indexOf('emy-video-ref:') === 0 || /video|clip/.test(field))) return 'Video reference saved';
          if (mediaKey && (text.indexOf('emy-ref:') === 0 || text.indexOf('emy/') === 0 || text.length > 80)) return 'Image reference saved';
          if (/^data:/i.test(text) || /base64,[A-Za-z0-9+/=]{60,}/i.test(text)) return 'Uploaded media';
          return '';
        }
        function fieldDisplayText(key, value) {
          const label = mediaFieldLabel(key, value);
          if (label) return label;
          const text = cleanText(value);
          if (text.length > 220) return text.slice(0, 180) + '...';
          return text;
        }
        function fieldMediaMarkup(key, value) {
          const text = cleanText(value);
          if (!text) return '';
          const field = String(key || '').toLowerCase();
          const mediaKey = /image|photo|avatar|logo|cover|poster|thumb|thumbnail|media|video|clip|ref|src/.test(field);
          if (!mediaKey && !looksLikeMedia(text)) return '';
          let type = looksLikeVideo(text) || /video|clip/.test(field) ? 'video' : 'image';
          let src = looksLikeMedia(text) ? text : '';
          if (!src) src = cloudinaryUrlFromRef(text, type);
          if (!src) return '';
          const label = mediaFieldLabel(key, value) || (type === 'video' ? 'Uploaded video' : 'Uploaded image');
          if (type === 'video') return '<span class="field-media-preview"><video src="' + esc(src) + '" controls playsinline preload="metadata"></video><small>' + esc(label) + '</small></span>';
          return '<span class="field-media-preview"><img src="' + esc(src) + '" alt="' + esc(label) + '" /><small>' + esc(label) + '</small></span>';
        }
        function fieldDisplayMarkup(key, value) {
          const media = fieldMediaMarkup(key, value);
          if (media) return media;
          const label = mediaFieldLabel(key, value);
          return label ? '<span class="tag good">' + esc(label) + '</span>' : esc(fieldDisplayText(key, value));
        }
        function cloudinaryUrlFromRef(ref, type) {
          let value = cleanText(ref);
          if (!value || /^https?:/i.test(value) || /^data:/i.test(value)) return '';
          let refType = type;
          if (value.indexOf('emy-video-ref:') === 0) {
            value = value.slice('emy-video-ref:'.length);
            refType = 'video';
          } else if (value.indexOf('emy-ref:') === 0) {
            value = value.slice('emy-ref:'.length);
          }
          if (value.indexOf('emy/') !== 0) return '';
          return 'https://res.cloudinary.com/dupytlsjv/' + (refType === 'video' ? 'video' : 'image') + '/upload/' + value;
        }
        function mediaFromObject(input) {
          const source = input && typeof input === 'object' ? input : {};
          const mediaItems = Array.isArray(source.mediaItems) ? source.mediaItems : Array.isArray(source.media) ? source.media : [];
          for (let index = 0; index < mediaItems.length; index += 1) {
            const nested = mediaFromObject(mediaItems[index]);
            if (nested.src || nested.ref) return nested;
          }
          const video = firstText([source.videoSrc, source.video, source.mediaType === 'video' && source.mediaSrc, source.mediaType === 'video' && source.src, source.coverVideo, source.clipSrc]);
          const image = firstText([source.profilePhoto, source.profilePhotoSrc, source.customerPhoto, source.customerPhotoSrc, source.businessPhoto, source.businessPhotoSrc, source.logo, source.logoSrc, source.photo, source.photoSrc, source.image, source.imageSrc, source.cover, source.coverSrc, source.coverPhoto, source.thumbnail, source.thumbnailSrc, source.posterSrc, source.mediaType !== 'video' && source.mediaSrc, source.src]);
          const videoRef = firstText([source.videoRef, source.mediaType === 'video' && source.mediaRef, source.clipRef]);
          const imageRef = firstText([source.profilePhotoRef, source.customerPhotoRef, source.businessPhotoRef, source.logoRef, source.photoRef, source.imageRef, source.coverRef, source.coverPhotoRef, source.thumbnailRef, source.posterRef, source.mediaType !== 'video' && source.mediaRef]);
          if (looksLikeMedia(video)) return { src:video, type:'video', ref:videoRef || '' };
          if (looksLikeMedia(image)) return { src:image, type:looksLikeVideo(image) ? 'video' : 'image', ref:imageRef || '' };
          if (videoRef) return { src:cloudinaryUrlFromRef(videoRef, 'video'), type:'video', ref:videoRef };
          if (imageRef) return { src:cloudinaryUrlFromRef(imageRef, 'image'), type:'image', ref:imageRef };
          return { src:'', type:'image', ref:'' };
        }
        function adminProfileMedia(role) {
          const kind = String(role || '').toLowerCase();
          if (kind === 'customer') {
            const pendingRole = String(localStorage.getItem('emyMainPendingSignupRole') || '').toLowerCase();
            const allowPending = pendingRole === 'customer';
            return mediaFromObject({
              profilePhoto:localStorage.getItem('emyCustomerProfilePhoto') || localStorage.getItem('emyCustomerProfilePhotoSrc') || localStorage.getItem('emyCustomerPhoto') || localStorage.getItem('emyCustomerPhotoSrc') || localStorage.getItem('emyCustomerAvatar') || localStorage.getItem('emyCustomerAvatarSrc') || (allowPending ? localStorage.getItem('emyMainPendingSignupPhoto') || localStorage.getItem('emyMainPendingSignupPhotoSrc') : ''),
              profilePhotoRef:localStorage.getItem('emyCustomerProfilePhotoRef') || localStorage.getItem('emyCustomerPhotoRef') || localStorage.getItem('emyCustomerAvatarRef') || (allowPending ? localStorage.getItem('emyMainPendingSignupPhotoRef') : '')
            });
          }
          if (kind === 'business') {
            const profile = readJson('emyBusinessProfileDraft', {});
            return mediaFromObject({
              profilePhoto:localStorage.getItem('emyBusinessProfilePhoto') || localStorage.getItem('emyBusinessProfilePhotoSrc') || localStorage.getItem('emyBusinessLogo') || localStorage.getItem('emyBusinessLogoSrc') || localStorage.getItem('emyMainPendingSignupBusinessPhoto') || profile.profilePhoto || profile.profilePhotoSrc || profile.photo || profile.photoSrc || profile.logo || profile.logoSrc,
              profilePhotoRef:localStorage.getItem('emyBusinessProfilePhotoRef') || localStorage.getItem('emyBusinessLogoRef') || localStorage.getItem('emyMainPendingSignupBusinessPhotoRef') || profile.profilePhotoRef || profile.photoRef || profile.logoRef
            });
          }
          return { src:'', type:'image', ref:'' };
        }
        function adminSearchKey(value) {
          return cleanText(value).toLowerCase().replace(/[^a-z0-9@.]+/g, ' ').trim();
        }
        function adminCurrentCustomerMarkers() {
          const first = cleanText(localStorage.getItem('emyCustomerFirstName') || localStorage.getItem('emyMainPendingSignupFirstName'));
          const last = cleanText(localStorage.getItem('emyCustomerLastName') || localStorage.getItem('emyMainPendingSignupLastName'));
          return [
            localStorage.getItem('emyCustomerDisplayName'),
            [first, last].filter(Boolean).join(' '),
            localStorage.getItem('emyCustomerEmail'),
            localStorage.getItem('emyMainSignedInEmail'),
            localStorage.getItem('emyMainPendingSignupEmail'),
            localStorage.getItem('emyFirebaseUid'),
            localStorage.getItem('emyCustomerProfileKey'),
            'customer-profile'
          ].map(adminSearchKey).filter(Boolean);
        }
        function adminCurrentBusinessMarkers() {
          const profile = readJson('emyBusinessProfileDraft', {});
          return [
            localStorage.getItem('emyBusinessDisplayName'),
            localStorage.getItem('emyBusinessName'),
            localStorage.getItem('emyBusinessProfileKey'),
            localStorage.getItem('emyBusinessKey'),
            profile.businessName,
            profile.name,
            profile.key,
            profile.businessKey
          ].map(adminSearchKey).filter(Boolean);
        }
        function adminRowText(row, raw) {
          const source = raw && typeof raw === 'object' ? raw : {};
          return [
            row && row.title, row && row.business, row && row.email, row && row.id, row && row.source,
            source.actorName, source.customerName, source.viewerName, source.repostedBy, source.authorName, source.createdByName, source.name,
            source.actorEmail, source.customerEmail, source.viewerEmail, source.email,
            source.actorKey, source.customerKey, source.viewerKey, source.repostedByKey, source.businessKey, source.key,
            source.href, source.profileHref, source.actorHref, source.customerHref
          ].map(adminSearchKey).filter(Boolean).join(' ');
        }
        function adminMatchesMarkers(text, markers) {
          return markers.some(function (marker) { return marker && (text.indexOf(marker) >= 0 || marker.indexOf(text) >= 0 && text.length > 5); });
        }
        function notificationLiveRole(row, raw) {
          const source = raw && typeof raw === 'object' ? raw : {};
          const role = adminSearchKey([source.actorType, source.customerType, source.viewerType, source.repostedByType, source.owner, source.role, source.accountType].filter(Boolean).join(' '));
          const href = adminSearchKey([source.href, source.profileHref, source.actorHref, source.customerHref].filter(Boolean).join(' '));
          const text = adminRowText(row, source);
          const matchesCustomer = adminMatchesMarkers(text, adminCurrentCustomerMarkers());
          const matchesBusiness = adminMatchesMarkers(text, adminCurrentBusinessMarkers());
          if (matchesCustomer && role.indexOf('business') < 0) return 'customer';
          if (matchesBusiness && role.indexOf('customer') < 0) return 'business';
          if (matchesCustomer && (href.indexOf('emy customer profile') >= 0 || href.indexOf('customer profile') >= 0)) return 'customer';
          if (matchesBusiness && (href.indexOf('emy business profile') >= 0 || href.indexOf('business profile') >= 0)) return 'business';
          return '';
        }
        function recordMedia(row) {
          const raw = row && row.raw || {};
          if (String(row && row.type || '').toLowerCase() === 'notification') {
            const live = adminProfileMedia(notificationLiveRole(row, raw));
            if (live.src || live.ref) return live;
          }
          const direct = mediaFromObject(row || {});
          if (direct.src || direct.ref) return direct;
          const nested = mediaFromObject(raw);
          if (nested.src || nested.ref) return nested;
          const kind = accountKind(row || {});
          if (kind === 'customer' || kind === 'owner-customer') {
            return mediaFromObject({
              profilePhoto:localStorage.getItem('emyCustomerProfilePhoto') || localStorage.getItem('emyCustomerProfilePhotoSrc') || localStorage.getItem('emyMainPendingSignupPhoto'),
              profilePhotoRef:localStorage.getItem('emyCustomerProfilePhotoRef') || localStorage.getItem('emyMainPendingSignupPhotoRef')
            });
          }
          if (kind === 'business') {
            return mediaFromObject({
              profilePhoto:localStorage.getItem('emyBusinessProfilePhoto') || localStorage.getItem('emyBusinessProfilePhotoSrc') || localStorage.getItem('emyBusinessLogo') || localStorage.getItem('emyBusinessLogoSrc'),
              profilePhotoRef:localStorage.getItem('emyBusinessProfilePhotoRef') || localStorage.getItem('emyBusinessLogoRef')
            });
          }
          return { src:'', type:'image', ref:'' };
        }
        function initialsFor(row) {
          const text = firstText([row && row.title, row && row.business, row && row.email, row && row.type, 'EMY']);
          const parts = text.split(/[^A-Za-z0-9]+/).filter(Boolean);
          return ((parts[0] || 'E').charAt(0) + (parts[1] || parts[0] || 'M').charAt(0)).toUpperCase();
        }
        function mediaMarkup(row, className) {
          const media = recordMedia(row);
          const cls = className || 'record-media';
          if (media.src) {
            if (media.type === 'video') return '<span class="' + cls + '"><video src="' + esc(media.src) + '" muted playsinline preload="metadata"></video></span>';
            return '<span class="' + cls + '"><img src="' + esc(media.src) + '" alt="" /></span>';
          }
          if (media.ref) return '<span class="' + cls + '">' + esc(media.type === 'video' ? 'Video ref' : 'Image ref') + '</span>';
          return '<span class="' + cls + '">' + esc(initialsFor(row)) + '</span>';
        }
        function mediaInner(row, className) {
          const html = mediaMarkup(row, className);
          const open = '<span class="' + className + '">';
          return html.indexOf(open) === 0 && html.slice(-7) === '</span>' ? html.slice(open.length, -7) : html;
        }
        function profileFields(row) {
          const raw = row && row.raw || {};
          return [
            ['Role', accountLabel(row || {})],
            ['Email', firstText([row && row.email, raw.email, raw.customerEmail, raw.businessEmail])],
            ['Phone', firstText([row && row.phone, raw.phone, raw.mobile, raw.mobileNumber])],
            ['Status', firstText([row && row.status, raw.status, raw.reviewStatus])],
            ['UID', firstText([raw.uid, raw.firebaseUid, localStorage.getItem('emyFirebaseUid')])],
            ['Source', row && row.source]
          ].filter(function (item) { return cleanText(item[1]); });
        }
        function profileFieldMarkup(row) {
          const fields = profileFields(row).slice(0, 6);
          const businessField = customerBusinessAccountField(row);
          let markup = fields.map(function (item) { return '<div class="profile-field"><b>' + esc(item[0]) + '</b><span>' + esc(item[1]) + '</span></div>'; }).join('');
          if (businessField) {
            markup += '<div class="profile-field"><b>Business Account</b><span>' + (businessField.html || esc(businessField.value)) + '</span></div>';
          }
          return '<div class="profile-fields">' + markup + '</div>';
        }
        function storageRows() { const rows = []; for (let index = 0; index < localStorage.length; index += 1) { const key = localStorage.key(index); if (key && key.indexOf('emy') === 0) rows.push({ key:key, value:localStorage.getItem(key) || '' }); } return rows.sort(function (a, b) { return a.key.localeCompare(b.key); }); }
        function today(offset) { const date = new Date(); date.setDate(date.getDate() - (offset || 0)); return date.toLocaleDateString(undefined, { month:'short', day:'numeric', year:'numeric' }); }
        function businessDecisionKeyFromProfile(draft, name, fallback) {
          const source = draft || {};
          return adminSlug(source.businessKey || source.key || source.slug || name || fallback || 'business-profile');
        }
        function businessDecisionEntry(key, id) {
          const decisions = readJson('emyBusinessReviewDecisions', {});
          const direct = decisions && typeof decisions === 'object' ? (decisions[key] || decisions[id] || decisions['business-profile-' + key] || decisions['business-profile:' + key]) : null;
          if (!direct) return '';
          return String(typeof direct === 'string' ? direct : direct.status || '').trim().toLowerCase();
        }
        function businessRecordReviewStatus(draft, name, id) {
          const key = businessDecisionKeyFromProfile(draft, name, id);
          const decision = businessDecisionEntry(key, id);
          if (decision) return decision;
          const draftStatus = String(draft && (draft.reviewStatus || draft.status) || '').trim();
          if (draftStatus) return draftStatus;
          const globalKey = String(localStorage.getItem('emyBusinessReviewBusinessKey') || localStorage.getItem('emyBusinessApprovalBusinessKey') || localStorage.getItem('emyBusinessRejectionBusinessKey') || '').trim();
          const globalStatus = String(localStorage.getItem('emyBusinessReviewStatus') || '').trim();
          if (globalKey && businessDecisionKeyFromProfile({}, globalKey, globalKey) === key && globalStatus) return globalStatus;
          if (/^(pending|under-review)$/i.test(globalStatus) && localStorage.getItem('emyBusinessReviewSubmittedAt')) return globalStatus;
          if (localStorage.getItem('emyBusinessReviewSubmittedAt')) return 'under-review';
          return 'pending';
        }
        function currentSignup() {
          const first = localStorage.getItem('emyCustomerFirstName') || localStorage.getItem('emyMainPendingSignupFirstName') || '';
          const last = localStorage.getItem('emyCustomerLastName') || localStorage.getItem('emyMainPendingSignupLastName') || '';
          const customerDisplay = localStorage.getItem('emyCustomerDisplayName') || '';
          const email = localStorage.getItem('emyMainPendingSignupEmail') || localStorage.getItem('emyMainSignedInEmail') || '';
          const pendingRole = String(localStorage.getItem('emyMainPendingSignupRole') || '').toLowerCase();
          const signedRole = String(localStorage.getItem('emyMainSignedInRole') || '').toLowerCase();
          const ownerCustomerEmail = String(localStorage.getItem('emyBusinessOwnerCustomerEmail') || localStorage.getItem('emyBusinessRegistrationCustomerEmail') || '').trim();
          const businessRegistrationFromCustomer = String(localStorage.getItem('emyBusinessRegistrationFromCustomer') || '').trim();
          const hasCustomerIdentity = Boolean(customerDisplay || first || last || localStorage.getItem('emyCustomerProfilePhoto') || localStorage.getItem('emyCustomerPhone') || pendingRole === 'customer' || signedRole === 'customer');
          const isBusinessOwnerCustomer = Boolean((hasCustomerIdentity || ownerCustomerEmail) && (ownerCustomerEmail || businessRegistrationFromCustomer));
          const role = isBusinessOwnerCustomer ? 'owner-customer' : (pendingRole || signedRole || 'customer');
          const title = customerDisplay || [first,last].filter(Boolean).join(' ') || email || ownerCustomerEmail;
          if (!title && !email && !ownerCustomerEmail) return null;
          const raw = {
            displayName:customerDisplay || title,
            firstName:first,
            lastName:last,
            email:email || ownerCustomerEmail,
            phone:localStorage.getItem('emyCustomerPhone') || localStorage.getItem('emyMainPendingSignupPhone') || '',
            role:role,
            visibility:localStorage.getItem('emyCustomerProfileVisibility') || localStorage.getItem('emyMainPendingSignupPrivacy') || '',
            uid:localStorage.getItem('emyFirebaseUid') || '',
            profilePhoto:localStorage.getItem('emyCustomerProfilePhoto') || localStorage.getItem('emyCustomerProfilePhotoSrc') || localStorage.getItem('emyMainPendingSignupPhoto') || '',
            profilePhotoRef:localStorage.getItem('emyCustomerProfilePhotoRef') || localStorage.getItem('emyMainPendingSignupPhotoRef') || '',
            backend:localStorage.getItem('emyRealBackend') || '',
            firebaseProjectId:localStorage.getItem('emyFirebaseProjectId') || '',
            verificationChannel:localStorage.getItem('emyMainPendingVerificationChannel') || '',
            verificationError:localStorage.getItem('emyMainPendingVerificationDeliveryError') || ''
          };
          return { id:isBusinessOwnerCustomer ? 'business-owner-customer-current' : 'signup-current', type:isBusinessOwnerCustomer ? 'owner-customer' : 'signup', title:title, source:isBusinessOwnerCustomer ? 'Customer account / business owner' : 'Sign up / sign in', status:role === 'business' ? 'pending' : 'active', email:email || ownerCustomerEmail, phone:raw.phone, role:role, image:raw.profilePhoto, mediaRef:raw.profilePhotoRef, open:role === 'business' ? 'emy-business-profile.html' : 'emy-customer-profile.html', created:today(0), raw:raw };
        }
        function businessRecord() {
          const draft = readJson('emyBusinessProfileDraft', {});
          const name = localStorage.getItem('emyBusinessDisplayName') || localStorage.getItem('emyBusinessName') || draft.businessName || '';
          if (!name && !Object.keys(draft).length) return null;
          const businessKey = businessDecisionKeyFromProfile(draft, name, 'business-profile');
          const recordId = name ? 'business-profile-' + businessKey : 'business-profile';
          const raw = Object.assign({}, draft, {
            businessKey:businessKey,
            profilePhoto:firstText([draft.profilePhoto, draft.profilePhotoSrc, draft.photo, draft.logo, localStorage.getItem('emyBusinessProfilePhoto'), localStorage.getItem('emyBusinessProfilePhotoSrc'), localStorage.getItem('emyBusinessLogo')]),
            profilePhotoRef:firstText([draft.profilePhotoRef, draft.photoRef, draft.logoRef, localStorage.getItem('emyBusinessProfilePhotoRef'), localStorage.getItem('emyBusinessLogoRef')]),
            cover:firstText([draft.cover, draft.coverSrc, draft.coverPhoto, draft.coverVideo, draft.mediaSrc, localStorage.getItem('emyBusinessCoverMedia')]),
            ownerEmail:localStorage.getItem('emyBusinessOwnerCustomerEmail') || localStorage.getItem('emyBusinessRegistrationCustomerEmail') || ''
          });
          return { id:recordId, type:'business', title:name || 'Business profile draft', source:'Business profile page', status:businessRecordReviewStatus(draft, name, recordId), email:draft.email || raw.ownerEmail || localStorage.getItem('emyMainPendingSignupEmail') || '', phone:draft.phone || localStorage.getItem('emyMainPendingSignupPhone') || '', category:draft.businessCategory || draft.sector || draft.primarySector || '', image:raw.profilePhoto, mediaRef:raw.profilePhotoRef, open:'emy-business-profile.html', created:today(0), raw:raw };
        }
        function seededFallback() {
          return [];
        }
        function collect() {
          const rows = [];
          const signup = currentSignup(); if (signup) rows.push(signup);
          const business = businessRecord(); if (business) rows.push(business);
          ['emyBusinessProducts','emyBusinessProductList','emyBusinessProductPosts'].forEach(function (key) {
            asArray(readJson(key, [])).forEach(function (item, index) {
              rows.push({ id:key + '-' + index, type:'product', title:item.name || item.title || item.productName || 'Saved product', source:key, status:item.status || 'active', business:item.business || item.businessName || '', price:item.price || item.priceText || '', open:'emy-customer-search.html#products', created:item.created || today(0), raw:item });
            });
          });
          asArray(readJson('emyBusinessFeedPosts', [])).forEach(function (item, index) {
            rows.push({ id:'post-' + index, type:'post', title:item.title || item.name || 'Saved post', source:'emyBusinessFeedPosts', status:item.status || 'active', business:item.business || '', open:'emy-customer-home.html#feeds', created:item.created || today(0), raw:item });
          });
          ['emyBusinessPosts','emyBusinessProductPosts'].forEach(function (key) {
            asArray(readJson(key, [])).forEach(function (item, index) {
              rows.push({ id:key + '-' + index, type:'post', title:item.title || item.name || 'Saved post', source:key, status:item.status || 'active', business:item.business || item.businessName || '', open:'emy-customer-home.html#feeds', created:item.created || today(0), raw:item });
            });
          });
          ['emyBusinessReels','emyBusinessProductReels','emyBusinessClips'].forEach(function (key) {
            asArray(readJson(key, [])).forEach(function (item, index) {
              rows.push({ id:key + '-' + index, type:'clip', title:item.title || item.name || 'Saved clip', source:key, status:item.status || 'active', business:item.business || item.businessName || '', open:'emy-customer-home.html#reels', created:item.created || today(0), raw:item });
            });
          });
          ['emyBusinessJobs','emyBusinessJobPosts'].forEach(function (key) {
            asArray(readJson(key, [])).forEach(function (item, index) {
              rows.push({ id:key + '-' + index, type:'job', title:item.title || item.jobTitle || item.name || 'Saved job', source:key, status:item.status || 'active', business:item.business || item.businessName || '', open:'emy-customer-home.html#feeds', created:item.created || today(0), raw:item });
            });
          });
          ['emyBusinessEvents','emyBusinessEventPosts'].forEach(function (key) {
            asArray(readJson(key, [])).forEach(function (item, index) {
              rows.push({ id:key + '-' + index, type:'event', title:item.title || item.eventName || item.name || 'Saved event', source:key, status:item.status || 'active', business:item.business || item.businessName || '', open:'emy-customer-home.html#feeds', created:item.created || today(0), raw:item });
            });
          });
          ['emyContentReports','emyCustomerReports','emyReports','emyAdminReports'].forEach(function (key) {
            asArray(readJson(key, [])).forEach(function (item, index) {
              rows.push({ id:key + '-' + index, type:'report', title:item.title || item.reason || item.name || 'Reported item', source:key, status:item.status || 'reported', business:item.business || item.businessName || '', open:'emy-admin-backend.html#moderation', created:item.created || today(0), raw:item });
            });
          });
          asArray(readJson('emyCustomerNotifications', [])).forEach(function (item, index) {
            rows.push({ id:'notification-' + index, type:'notification', title:item.title || item.type || 'Notification', source:'emyCustomerNotifications', status:item.status || (item.read ? 'active' : 'pending'), message:item.body || item.message || item.text || '', open:'emy-notification-settings.html', created:item.created || today(0), raw:item });
          });
          asArray(readJson('emyAdminRowStatusOverrides', {})).forEach(function () {});
          const overrides = readJson('emyAdminRowStatusOverrides', {});
          const withOverrides = rows.map(function (row) { return Object.assign({}, row, { status:overrides[row.id] || row.status || 'active' }); });
          return { records:withOverrides.length ? withOverrides : seededFallback(), storage:storageRows(), snapshots:readJson('emyAdminSnapshots', []) };
        }
        function initialView() { const hash = String(location.hash || '').replace(/^#/, ''); return views.some(function (view) { return view[0] === hash; }) ? hash : 'overview'; }
        function filtered(records) {
          const q = (searchInput.value || '').toLowerCase().trim();
          const status = (filterInput.value || '').toLowerCase().trim();
          return records.filter(function (row) {
            const text = (JSON.stringify(row) + ' ' + accountLabel(row)).toLowerCase();
            return (!q || text.indexOf(q) >= 0) && (!status || String(row.status || '').toLowerCase() === status);
          });
        }
        function filterPlain(rows) {
          const q = (searchInput.value || '').toLowerCase().trim();
          const status = (filterInput.value || '').toLowerCase().trim();
          return rows.filter(function (row) {
            const text = JSON.stringify(row).toLowerCase();
            return (!q || text.indexOf(q) >= 0) && (!status || String(row.status || '').toLowerCase() === status);
          });
        }
        function accountKind(row) {
          const type = String(row.type || '').toLowerCase();
          const role = String(row.role || '').toLowerCase();
          if (type === 'owner-customer' || role === 'owner-customer') return 'owner-customer';
          if (type === 'business' || role === 'business') return 'business';
          if (type === 'customer' || type === 'signup' || role === 'customer') return 'customer';
          if (['product','post','clip','job','event'].indexOf(type) >= 0) return 'content';
          return 'system';
        }
        function profileAccountKind(row) {
          const kind = accountKind(row);
          return kind === 'owner-customer' ? 'customer' : kind;
        }
        function accountLabel(row) {
          const kind = accountKind(row);
          if (kind === 'owner-customer') return 'Customer + business owner';
          if (kind === 'business') return 'Business account';
          if (kind === 'customer') return 'Customer account';
          if (kind === 'content') return 'Business content';
          return 'System activity';
        }
        function accountBadge(row) {
          const kind = accountKind(row);
          return '<span class="account-badge ' + esc(kind) + '">' + esc(accountLabel(row)) + '</span>';
        }
        function removeProfileButton(row) {
          const kind = profileAccountKind(row);
          if (kind !== 'customer' && kind !== 'business') return '';
          return '<button class="danger" type="button" data-remove-profile="' + esc(row.id) + '">' + recordIcon('delete') + 'Delete ' + esc(kind) + '</button>';
        }
        function normalizedStatus(row) {
          return String(row && row.status || '').toLowerCase().trim();
        }
        function isApprovedStatus(row) {
          const status = normalizedStatus(row);
          return status === 'approved' || status === 'active' || status === 'live' || status === 'online';
        }
        function isRejectedStatus(row) {
          const status = normalizedStatus(row);
          return status === 'rejected' || status === 'denied' || status === 'refused';
        }
        function approveButton(row) {
          if (isApprovedStatus(row)) return '<button class="primary" type="button" disabled aria-disabled="true">' + recordIcon('approve') + 'Approved</button>';
          if (isRejectedStatus(row)) return '<button class="primary" type="button" disabled aria-disabled="true">' + recordIcon('approve') + 'Approve</button>';
          return '<button class="primary" type="button" data-approve="' + esc(row.id) + '">' + recordIcon('approve') + 'Approve</button>';
        }
        function rejectButton(row) {
          if (isRejectedStatus(row)) return '<button type="button" disabled aria-disabled="true">' + recordIcon('reject') + 'Rejected</button>';
          if (isApprovedStatus(row)) return '<button type="button" disabled aria-disabled="true">' + recordIcon('reject') + 'Reject</button>';
          return '<button type="button" data-reject="' + esc(row.id) + '">' + recordIcon('reject') + 'Reject</button>';
        }
        function approvalNoteButton(row, savedNote) {
          return '<button type="button" data-save-note="' + esc(row.id) + '" data-saved-note="' + esc(savedNote || '') + '" disabled aria-disabled="true">' + recordIcon('save') + (savedNote ? 'Note saved' : 'Save note') + '</button>';
        }
        function adminSlug(value) {
          return String(value || 'business').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'business';
        }
        function approvalBusinessPayload(row) {
          const record = row || {};
          const raw = record.raw || {};
          const title = record.title || raw.businessName || raw.name || localStorage.getItem('emyBusinessDisplayName') || localStorage.getItem('emyBusinessName') || 'Your business';
          const email = record.email || raw.email || raw.businessEmail || localStorage.getItem('emyMainPendingSignupEmail') || localStorage.getItem('emyMainSignedInEmail') || '';
          const key = adminSlug(raw.key || raw.businessKey || title);
          return {
            key:key,
            title:title,
            email:email,
            href:'emy-business-profile.html?business=' + encodeURIComponent(key),
            note:approvalNote(record.id || 'business-profile')
          };
        }
        function pushUniqueJson(key, item, limit) {
          const rows = readJson(key, []);
          const list = Array.isArray(rows) ? rows : [];
          const next = [item].concat(list.filter(function (row) { return String(row && row.id) !== String(item.id); }));
          writeJson(key, next.slice(0, limit || 80));
        }
        function createApprovalNotification(row) {
          const info = approvalBusinessPayload(row);
          const createdAt = new Date().toISOString();
          const businessNotification = {
            id:'business-approved-' + info.key + '-' + Date.now(),
            type:'business-review-approved',
            group:'important',
            target:'business',
            itemKind:'Business profile',
            action:'business-approved',
            businessKey:info.key,
            businessName:info.title,
            title:'Your business has been approved. Welcome to EMY Business.',
            body:'Welcome to EMY Business. ' + info.title + ' is approved and can now publish products, posts, clips, jobs, and events.',
            href:'emy-business-profile.html?mode=business',
            initials:'EMY',
            ref:{ type:'Business profile', kind:'Business profile', businessKey:info.key, title:info.title },
            read:false,
            unread:true,
            createdAt:createdAt
          };
          const customerNotification = Object.assign({}, businessNotification, {
            id:'customer-business-approved-' + info.key + '-' + Date.now(),
            target:'customer',
            itemKind:'Business profile',
            action:'business-approved',
            title:info.title + ' has been approved.',
            body:'Your business profile is approved. You can switch to the business account when you want to manage it.',
            href:'emy-business-profile.html?view=customer&business=' + encodeURIComponent(info.key),
            ref:{ type:'Business profile', kind:'Business profile', businessKey:info.key, title:info.title }
          });
          pushUniqueJson('emyCustomerNotifications', customerNotification, 80);
          pushUniqueJson('emyBusinessNotifications:' + info.key, businessNotification, 80);
          if (info.title && info.title !== info.key) pushUniqueJson('emyBusinessNotifications:' + info.title, businessNotification, 80);
          return businessNotification;
        }
        function createRejectionNotification(row) {
          const info = approvalBusinessPayload(row);
          const createdAt = new Date().toISOString();
          const note = approvalNote(row && row.id || 'business-profile');
          const businessNotification = {
            id:'business-rejected-' + info.key + '-' + Date.now(),
            type:'business-review-rejected',
            group:'important',
            target:'business',
            itemKind:'Business profile',
            action:'business-rejected',
            businessKey:info.key,
            businessName:info.title,
            title:'Your business registration was not approved.',
            body: note ? 'EMY reviewed ' + info.title + ' and needs changes before approval: ' + note : 'EMY reviewed ' + info.title + ' and needs changes before approval. Update the business details and submit again.',
            href:'emy-business-profile.html?setup=1',
            initials:'EMY',
            ref:{ type:'Business profile', kind:'Business profile', businessKey:info.key, title:info.title },
            read:false,
            unread:true,
            createdAt:createdAt
          };
          const customerNotification = Object.assign({}, businessNotification, {
            id:'customer-business-rejected-' + info.key + '-' + Date.now(),
            target:'customer',
            itemKind:'Business profile',
            action:'business-rejected',
            title:'Your business registration was not approved.',
            body: note ? 'EMY reviewed ' + info.title + ' and needs changes before approval: ' + note : 'EMY reviewed ' + info.title + ' and needs changes before approval. Update the business details and submit again.',
            href:'emy-business-profile.html?setup=1',
            ref:{ type:'Business profile', kind:'Business profile', businessKey:info.key, title:info.title }
          });
          pushUniqueJson('emyCustomerNotifications', customerNotification, 80);
          pushUniqueJson('emyBusinessNotifications:' + info.key, businessNotification, 80);
          if (info.title && info.title !== info.key) pushUniqueJson('emyBusinessNotifications:' + info.title, businessNotification, 80);
          return businessNotification;
        }
        function createApprovalEmail(row) {
          const info = approvalBusinessPayload(row);
          const createdAt = new Date().toISOString();
          const email = {
            id:'welcome-business-' + info.key + '-' + Date.now(),
            to:info.email || 'business account email missing',
            subject:'Welcome to EMY Business - your business has been approved',
            status:info.email ? 'ready to send' : 'needs email address',
            business:info.title,
            template:'business-approval-welcome',
            createdAt:createdAt,
            body:'Hi ' + info.title + ',\\n\\nGood news - your business has been approved on EMY. Welcome to EMY Business. You can now update your profile, publish products, posts, clips, jobs, and events, and receive customer activity from EMY.\\n\\nOpen your business profile: ' + info.href + '\\n\\nEMY Team'
          };
          pushUniqueJson('emyAdminEmailOutbox', email, 80);
          return email;
        }
        function counts() {
          const records = state.records || [];
          return {
            businessAccounts: records.filter(function (row) { return accountKind(row) === 'business'; }).length,
            customerAccounts: records.filter(function (row) { const kind = accountKind(row); return kind === 'customer' || kind === 'owner-customer'; }).length,
            approvals: records.filter(function (row) { return row.type === 'business'; }).length,
            journey: journeySteps().filter(function (step) { return step.value > 0; }).length,
            completeness: records.filter(function (row) { return row.type === 'business'; }).length,
            services: serviceProfileRows().length,
            customerActivity: customerActivityRows().length,
            moderation: moderationRows().length,
            analytics: analyticsRows().length,
            revenue: revenueRows().length,
            audit: auditRowsAll().length,
            review: records.filter(function (row) { return ['pending','reported','draft','verify'].indexOf(String(row.status).toLowerCase()) >= 0; }).length,
            people: records.filter(function (row) { return ['signup','customer','owner-customer','business'].indexOf(row.type) >= 0; }).length,
            content: records.filter(function (row) { return ['product','post','clip','job','event','notification'].indexOf(row.type) >= 0; }).length,
            banner: localStorage.getItem('emyAdminHomeBanner') ? 1 : 0,
            data: state.storage.length
          };
        }
        function typeCount(type) {
          return (state.records || []).filter(function (row) { return row.type === type; }).length;
        }
        function contentCount() {
          return (state.records || []).filter(function (row) { return ['product','post','clip','job','event','notification'].indexOf(row.type) >= 0; }).length;
        }
        function reviewCount() {
          return (state.records || []).filter(function (row) { return ['pending','reported','draft','verify'].indexOf(String(row.status || '').toLowerCase()) >= 0; }).length;
        }
        function connectedSourceCount() {
          return ['emyBusinessProfileDraft','emyMainPendingSignupEmail','emyMainConfirmationCompleted','emyBusinessProducts','emyBusinessProductList','emyBusinessProductPosts','emyBusinessFeedPosts','emyBusinessPosts','emyBusinessReels','emyBusinessClips','emyBusinessJobs','emyBusinessEvents','emyCustomerBusinesses','emySavedFeedItems','emyCustomerNotifications','emyAskSavedChats','emyAskLocation','emyAdminHomeBanner','emyAdminServiceProfiles','emyAdminAiSettings','emyAdminAuditLog'].filter(function (key) {
            return !!localStorage.getItem(key);
          }).length;
        }
        function percent(value, total) {
          if (!total) return 0;
          return Math.max(0, Math.min(100, Math.round((value / total) * 100)));
        }
        function barChart(items) {
          const max = Math.max.apply(null, items.map(function (item) { return item.value; }).concat([1]));
          return '<div class="chart">' + items.map(function (item) {
            const height = Math.max(8, Math.round((item.value / max) * 190));
            return '<div class="chart-bar"><span style="height:' + height + 'px"></span><b>' + esc(item.value) + '</b><small>' + esc(item.label) + '</small></div>';
          }).join('') + '</div>';
        }
        function parseRecordDate(row) {
          const raw = row.createdAt || row.created || row.date || '';
          const parsed = raw ? new Date(raw) : null;
          return parsed && !Number.isNaN(parsed.getTime()) ? parsed : new Date();
        }
        function shortDay(date) {
          return date.toLocaleDateString(undefined, { weekday:'short' });
        }
        function weekLabel(date) {
          const start = new Date(date.getFullYear(), 0, 1);
          const days = Math.floor((date - start) / 86400000);
          return 'W' + Math.max(1, Math.ceil((days + start.getDay() + 1) / 7));
        }
        function growthItems(mode) {
          const records = state.records || [];
          const now = new Date();
          const slots = [];
          const slotMap = {};
          if (mode === 'year') {
            for (let index = 4; index >= 0; index -= 1) {
              const year = now.getFullYear() - index;
              const key = String(year);
              slots.push({ key:key, label:key, value:0 });
              slotMap[key] = slots[slots.length - 1];
            }
          } else if (mode === 'week') {
            for (let index = 5; index >= 0; index -= 1) {
              const date = new Date(now);
              date.setDate(now.getDate() - (index * 7));
              const key = date.getFullYear() + '-' + weekLabel(date);
              slots.push({ key:key, label:weekLabel(date), value:0 });
              slotMap[key] = slots[slots.length - 1];
            }
          } else {
            for (let index = 6; index >= 0; index -= 1) {
              const date = new Date(now);
              date.setDate(now.getDate() - index);
              const key = date.toISOString().slice(0, 10);
              slots.push({ key:key, label:shortDay(date), value:0 });
              slotMap[key] = slots[slots.length - 1];
            }
          }
          records.forEach(function (row) {
            const date = parseRecordDate(row);
            const key = mode === 'year' ? String(date.getFullYear()) : mode === 'week' ? date.getFullYear() + '-' + weekLabel(date) : date.toISOString().slice(0, 10);
            if (slotMap[key]) slotMap[key].value += 1;
          });
          if (!slots.some(function (slot) { return slot.value > 0; })) {
            slots.forEach(function (slot, index) { slot.value = Math.max(1, Math.round((index + 1) * (mode === 'day' ? 1 : mode === 'week' ? 1.4 : 2))); });
          }
          return slots;
        }
        function growthChart(title, subtitle, mode) {
          const items = growthItems(mode);
          const max = Math.max.apply(null, items.map(function (item) { return item.value; }).concat([1]));
          return '<section class="panel"><div class="panel-head"><span><h2>' + esc(title) + '</h2><p>' + esc(subtitle) + '</p></span></div><div class="panel-body"><div class="growth-chart">' + items.map(function (item) {
            const height = Math.max(8, Math.round((item.value / max) * 170));
            return '<div class="growth-bar"><span style="height:' + height + 'px"></span><b>' + esc(item.value) + '</b><small>' + esc(item.label) + '</small></div>';
          }).join('') + '</div></div></section>';
        }
        function healthItem(label, value, total, note) {
          const pct = percent(value, total);
          return '<div class="health-item"><div class="health-top"><span>' + esc(label) + '</span><strong>' + esc(pct) + '%</strong></div><div class="health-track"><span style="width:' + pct + '%"></span></div><span>' + esc(note) + '</span></div>';
        }
        function approvalChecks(row) {
          const raw = row.raw || {};
          const fields = [
            ['Business name', row.title && row.title !== 'Business profile draft'],
            ['Email', row.email],
            ['Phone', row.phone],
            ['Category', row.category || raw.businessCategory || raw.sector || raw.primarySector],
            ['Location', raw.location || raw.address || raw.postcode || localStorage.getItem('emyBusinessLocation')],
            ['Profile image', localStorage.getItem('emyBusinessProfilePhoto') || localStorage.getItem('emyBusinessProfilePhotoRef') || raw.photo || raw.photoRef || raw.profilePhotoRef || raw.logo],
            ['Cover photo/video', raw.cover || raw.coverMedia || raw.coverPhoto || raw.coverVideo || raw.media || localStorage.getItem('emyBusinessMediaLibrary') || localStorage.getItem('emyBusinessCoverMedia')],
            ['Description', raw.description || raw.summary],
            ['Products', typeCount('product') > 0],
            ['Posts', typeCount('post') > 0],
            ['Clips', typeCount('clip') > 0]
          ];
          const passed = fields.filter(function (item) { return !!item[1]; }).length;
          return { fields:fields, passed:passed, score:percent(passed, fields.length) };
        }
        function textValue(value, fallback) {
          const text = String(value == null ? '' : value).replace(/\\s+/g, ' ').trim();
          return text || fallback || '';
        }
        function hasStored(keys) {
          return keys.some(function (key) { return textValue(localStorage.getItem(key)); });
        }
        function journeySteps() {
          const records = state.records || [];
          const signupCount = records.filter(function (row) { return ['signup','customer','business'].indexOf(row.type) >= 0; }).length || (currentSignup() ? 1 : 0);
          const confirmationDone = localStorage.getItem('emyMainConfirmationCompleted') === '1' || hasStored(['emyMainSignedInEmail','emyMainSignedInRole']);
          const businessProfiles = records.filter(function (row) { return row.type === 'business'; }).length;
          const customerProfileDone = hasStored(['emyCustomerDisplayName','emyCustomerProfilePhoto','emyCustomerProfileVisibility','emyCustomerLocationLabel','emyAskLocation']);
          const profileCount = businessProfiles + (customerProfileDone ? 1 : 0);
          const firstContent = typeCount('product') + typeCount('post');
          const approved = records.filter(function (row) { return row.type === 'business' && ['approved','active'].indexOf(String(row.status || '').toLowerCase()) >= 0; }).length;
          return [
            { label:'Sign up started', value:signupCount, note:'Customer and business accounts that started EMY signup.' },
            { label:'Confirmation', value:confirmationDone ? Math.max(1, signupCount) : 0, note:'Email/phone confirmation or signed-in account is present.' },
            { label:'Profile completed', value:profileCount, note:'Customer profile details or business profile details are saved.' },
            { label:'First product/post', value:firstContent, note:'Business products or posts have been created.' },
            { label:'Approved', value:approved, note:'Business profiles marked approved or active by admin.' }
          ];
        }
        function journey() {
          const steps = journeySteps();
          const rows = steps.map(function (step, index) {
            const previous = index ? steps[index - 1].value : step.value;
            return { stage:step.label, count:step.value, dropoff:index ? Math.max(0, previous - step.value) : 0, status:step.value > 0 ? 'connected' : 'missing', note:step.note };
          });
          return metrics() + '<section class="panel"><div class="panel-head"><span><h2>User journey stats</h2><p>Shows where people move from signup into confirmed profiles, content, and approval.</p></span></div><div class="panel-body"><div class="journey">' + steps.map(function (step, index) { return '<article class="journey-step"><small>Step ' + (index + 1) + '</small><strong>' + esc(step.value) + '</strong><span>' + esc(step.label) + '</span><span>' + esc(step.note) + '</span></article>'; }).join('') + '</div><br>' + simpleTable(rows, [{key:'stage',label:'Stage'},{key:'count',label:'Count'},{key:'dropoff',label:'Drop off'},{key:'status',label:'Status'},{key:'note',label:'Meaning'}]) + '</div></section>';
        }
        function completenessRows() {
          return (state.records || []).filter(function (row) { return row.type === 'business'; }).map(function (row) {
            const checks = approvalChecks(row);
            const missing = checks.fields.filter(function (item) { return !item[1]; }).map(function (item) { return item[0]; }).join(', ');
            return { business:row.title || 'Business profile', score:checks.score + '%', missing:missing || 'Complete', status:row.status || 'pending', source:row.source || 'Business profile', open:row.open || 'emy-business-profile.html' };
          });
        }
        function completeness() {
          const businesses = filtered(state.records).filter(function (row) { return row.type === 'business'; }).sort(function (a, b) { return approvalChecks(a).score - approvalChecks(b).score; });
          return metrics() + '<section class="panel"><div class="panel-head"><span><h2>Business profile completeness</h2><p>Each business gets a score for name, phone, email, category, location, logo, cover media, products, posts, and clips.</p></span></div><div class="panel-body"><div class="approval-grid">' + (businesses.length ? businesses.map(approvalCard).join('') : '<div class="empty">No business profiles are available yet.</div>') + '</div><br>' + simpleTable(filterPlain(completenessRows()), [{key:'business',label:'Business'},{key:'score',label:'Score'},{key:'missing',label:'Missing fields'},{key:'status',label:'Status'},{key:'source',label:'Source'},{key:'open',label:'Open'}]) + '</div></section>';
        }
        function customerActivityRows() {
          const rows = [];
          const businesses = readJson('emyCustomerBusinesses', {});
          Object.keys(businesses || {}).forEach(function (key) {
            const item = businesses[key] || {};
            rows.push({ activity:'Saved business', detail:textValue(item.name || item.title || key, 'Business'), source:'emyCustomerBusinesses', status:'active', created:item.addedAt || '', open:'emy-customer-home.html#nearby' });
          });
          const openChat = localStorage.getItem('emyCustomerChatOpenKey') || '';
          if (openChat) rows.push({ activity:'Chat opened', detail:openChat, source:'emyCustomerChatOpenKey', status:'active', created:'Current session', open:'emy-customer-chat.html' });
          (state.storage || []).filter(function (item) { return item.key.indexOf('emyBusinessChatThread:') === 0; }).forEach(function (item) {
            rows.push({ activity:'Business chat thread', detail:item.key.replace('emyBusinessChatThread:', ''), source:item.key, status:'active', created:'Saved locally', open:'emy-customer-chat.html' });
          });
          asArray(readJson('emySavedFeedItems', {})).forEach(function (item, index) {
            rows.push({ activity:item.kind || item.type || 'Saved item', detail:item.title || item.name || item.business || item.id || 'Saved product/post', source:'emySavedFeedItems', status:'saved', created:item.savedAt || item.created || today(index), open:'emy-customer-home.html#feeds' });
          });
          const feedState = readJson('emyFeedActionState', {});
          Object.keys(feedState || {}).forEach(function (key) {
            const item = feedState[key] || {};
            const actions = [item.liked ? 'liked' : '', item.saved ? 'saved' : '', item.comments && item.comments.length ? 'commented' : ''].filter(Boolean).join(', ') || 'viewed';
            rows.push({ activity:'Product/post activity', detail:key + ' - ' + actions, source:'emyFeedActionState', status:'active', created:'Saved locally', open:'emy-customer-home.html#feeds' });
          });
          asArray(readJson('emyCustomerNotifications', [])).forEach(function (item, index) {
            rows.push({ activity:'Notification', detail:item.title || item.type || item.message || 'Notification', source:'emyCustomerNotifications', status:item.read ? 'read' : 'pending', created:item.created || today(index), open:'emy-notification-settings.html' });
          });
          ['emyCustomerSavedPlaces','emySavedLocations','emyAskSavedLocations'].forEach(function (key) {
            asArray(readJson(key, [])).forEach(function (item, index) {
              rows.push({ activity:'Saved location', detail:item.label || item.name || item.address || item.id || 'Saved place', source:key, status:'active', created:item.created || today(index), open:'emy-customer-profile.html' });
            });
          });
          ['emyCustomerDisplayName','emyCustomerProfilePhoto','emyCustomerProfileVisibility','emyCustomerLocationLabel','emyAskLocation'].forEach(function (key) {
            const value = localStorage.getItem(key);
            if (textValue(value)) rows.push({ activity:'Profile update', detail:key.replace('emyCustomer', '').replace('emyAsk', 'Ask EMY ') + ': ' + textValue(value, 'Saved'), source:key, status:'saved', created:'Saved locally', open:'emy-customer-profile.html' });
          });
          return rows;
        }
        function customerActivity() {
          const rows = filterPlain(customerActivityRows());
          return metrics() + '<section class="panel"><div class="panel-head"><span><h2>Customer activity page</h2><p>Saved businesses, chats opened, products viewed or saved, notifications, and profile updates.</p></span></div><div class="panel-body">' + simpleTable(rows, [{key:'activity',label:'Activity'},{key:'detail',label:'Detail'},{key:'source',label:'Source'},{key:'created',label:'Created'},{key:'status',label:'Status'},{key:'open',label:'Open'}]) + '</div></section>';
        }
        function moderationRows() {
          return (state.records || []).filter(function (row) { return ['product','post','clip','job','event','report'].indexOf(row.type) >= 0; });
        }
        function moderationCard(row) {
          return '<article class="record"><div><h3>' + esc(row.title || 'Content item') + '</h3><p>' + esc([row.business, row.message, row.price, row.source].filter(Boolean).join(' | ') || 'Moderation item from saved EMY data') + '</p><div class="record-meta"><span class="tag">' + esc(row.type) + '</span>' + statusTag(row.status) + '<span class="tag">' + esc(row.source || 'local data') + '</span></div></div><div class="record-actions"><a href="' + esc(row.open || 'emy-admin-backend.html#moderation') + '">' + recordIcon('open') + 'Open</a><button type="button" data-row-view="' + esc(row.id) + '">' + recordIcon('view') + 'Details</button><button class="primary" type="button" data-approve="' + esc(row.id) + '">' + recordIcon('approve') + 'Approve</button><button type="button" data-hide="' + esc(row.id) + '">' + recordIcon('hide') + 'Hide</button><button type="button" data-report="' + esc(row.id) + '">' + recordIcon('report') + 'Report</button></div></article>';
        }
        function moderation() {
          const rows = filtered(moderationRows());
          return metrics() + '<section class="panel"><div class="panel-head"><span><h2>Content moderation queue</h2><p>One queue for posts, products, clips, reports, jobs, and events with approve, hide, and report actions.</p></span></div><div class="panel-body">' + (rows.length ? '<div class="queue">' + rows.map(moderationCard).join('') + '</div>' : '<div class="empty">No content or reports match this queue.</div>') + '</div></section>';
        }
        function categoryRows() {
          const groups = {};
          (state.records || []).forEach(function (row) {
            const label = textValue(row.category || row.business || row.type, 'Uncategorised');
            groups[label] = (groups[label] || 0) + 1;
          });
          return Object.keys(groups).sort(function (a, b) { return groups[b] - groups[a]; }).slice(0, 8).map(function (key) { return { category:key, searches:groups[key], status:'popular' }; });
        }
        function analyticsRows() {
          const rows = [];
          ['emySearchHistory','emyCustomerSearchHistory','emyAskSearchHistory','emyNoResultSearches','emyCustomerNoResultSearches'].forEach(function (key) {
            asArray(readJson(key, [])).forEach(function (item, index) {
              rows.push({ metric:key.indexOf('NoResult') >= 0 ? 'No-result search' : 'Customer search', value:item.query || item.text || item.term || item.title || item.id || 'Search', volume:item.count || 1, source:key, status:key.indexOf('NoResult') >= 0 ? 'needs content' : 'tracked' });
            });
          });
          asArray(readJson('emyAskSavedChats', [])).forEach(function (chat, index) {
            const messages = asArray(chat.messages || []);
            const userMessages = messages.filter(function (message) { const role = String(message.role || message.author || '').toLowerCase(); return role === 'user' || role === 'customer' || message.mine; });
            const firstUser = userMessages[0] || {};
            rows.push({ metric:'Ask EMY chat', value:chat.title || firstUser.text || firstUser.content || 'Saved Ask EMY chat', volume:messages.length || 1, source:'emyAskSavedChats', status:chat.pinned ? 'pinned' : 'saved' });
            userMessages.slice(0, 3).forEach(function (message) {
              rows.push({ metric:'Ask EMY question', value:message.text || message.content || message.message || 'Question', volume:1, source:'emyAskSavedChats', status:'asked' });
            });
          });
          const askLocation = localStorage.getItem('emyAskLocation');
          if (textValue(askLocation)) rows.push({ metric:'Ask EMY location', value:askLocation, volume:1, source:'emyAskLocation', status:'tracked' });
          categoryRows().forEach(function (item) {
            rows.push({ metric:'Popular category', value:item.category, volume:item.searches, source:'Connected records', status:'popular' });
          });
          return rows;
        }
        function analytics() {
          const rows = filterPlain(analyticsRows());
          return metrics() + '<div class="split-grid"><section class="panel"><div class="panel-head"><span><h2>Search and Ask EMY analytics</h2><p>Customer searches, Ask EMY questions, no-result searches, locations, and popular categories.</p></span></div><div class="panel-body">' + simpleTable(rows, [{key:'metric',label:'Metric'},{key:'value',label:'Search / question / category'},{key:'volume',label:'Volume'},{key:'source',label:'Source'},{key:'status',label:'Status'}]) + '</div></section><section class="panel"><div class="panel-head"><span><h2>Popular categories</h2><p>Derived from connected businesses, products, posts, and saved records.</p></span></div><div class="panel-body">' + simpleTable(categoryRows(), [{key:'category',label:'Category'},{key:'searches',label:'Connected records'},{key:'status',label:'Status'}]) + '</div></section></div>';
        }
        function revenueRows() {
          const rows = [];
          [
            ['emyBusinessPlans','Business plan'],
            ['emyBusinessSubscriptions','Subscription'],
            ['emyFeaturedListings','Featured listing'],
            ['emyAdCampaigns','Ad campaign'],
            ['emyInvoices','Invoice']
          ].forEach(function (entry) {
            const key = entry[0];
            const type = entry[1];
            asArray(readJson(key, [])).forEach(function (item, index) {
              rows.push({ item:item.name || item.title || item.plan || type + ' ' + (index + 1), type:type, status:item.status || 'active', amount:item.amount || item.price || item.total || '-', source:key });
            });
          });
          if (!rows.length) {
            return [
              { item:'Free business profile', type:'Business plan', status:'placeholder', amount:'0', source:'Plan placeholder' },
              { item:'Pro business tools', type:'Subscription', status:'not connected', amount:'TBD', source:'Future billing' },
              { item:'Featured listing', type:'Featured listing', status:'not connected', amount:'TBD', source:'Future promotion' },
              { item:'Local ad campaign', type:'Ad campaign', status:'not connected', amount:'TBD', source:'Future ads' },
              { item:'Business invoice', type:'Invoice', status:'not connected', amount:'TBD', source:'Future invoices' }
            ];
          }
          return rows;
        }
        function revenue() {
          const rows = filterPlain(revenueRows());
          const planCount = rows.filter(function (row) { return row.type === 'Business plan'; }).length;
          const subscriptionCount = rows.filter(function (row) { return row.type === 'Subscription'; }).length;
          const promoCount = rows.filter(function (row) { return row.type === 'Featured listing' || row.type === 'Ad campaign'; }).length;
          const invoiceCount = rows.filter(function (row) { return row.type === 'Invoice'; }).length;
          return metrics() + '<div class="plan-grid"><article class="plan-card"><h3>Business plans</h3><strong>' + planCount + '</strong><p>Free, Pro, and future package records.</p></article><article class="plan-card"><h3>Subscriptions</h3><strong>' + subscriptionCount + '</strong><p>Recurring business access when payments are connected.</p></article><article class="plan-card"><h3>Featured and ads</h3><strong>' + promoCount + '</strong><p>Featured listings and ad placements.</p></article><article class="plan-card"><h3>Invoices</h3><strong>' + invoiceCount + '</strong><p>Business invoice placeholders or saved billing rows.</p></article></div><br><section class="panel"><div class="panel-head"><span><h2>Revenue and plan placeholder</h2><p>Ready for business plans, subscriptions, featured listings, ads, and invoices even before payments are live.</p></span></div><div class="panel-body">' + simpleTable(rows, [{key:'item',label:'Item'},{key:'type',label:'Type'},{key:'amount',label:'Amount'},{key:'status',label:'Status'},{key:'source',label:'Source'}]) + '</div></section>';
        }
        function auditRowsAll() {
          const rows = asArray(readJson('emyAdminAuditLog', [])).map(function (item) { return Object.assign({ actor:'Local admin', status:'logged' }, item); });
          const notes = readJson('emyAdminApprovalNotes', {});
          Object.keys(notes || {}).forEach(function (key) {
            if (textValue(notes[key])) rows.push({ id:'note-' + key, actor:'Local admin', action:'admin note', recordId:key, title:key, note:notes[key], createdAt:'Saved approval note', status:'logged' });
          });
          const overrides = readJson('emyAdminRowStatusOverrides', {});
          Object.keys(overrides || {}).forEach(function (key) {
            rows.push({ id:'status-' + key, actor:'Local admin', action:'status override', recordId:key, title:key, note:'Status set to ' + overrides[key], createdAt:'Saved status override', status:'logged' });
          });
          return rows;
        }
        function auditRows() {
          return auditRowsAll().slice(0, 10);
        }
        function audit(action, id, note) {
          const rows = readJson('emyAdminAuditLog', []);
          const record = findRecord(id) || {};
          rows.unshift({ id:'audit-' + Date.now(), actor:'Local admin', action:action, recordId:id, title:record.title || id, note:note || '', createdAt:new Date().toLocaleString(), status:'logged' });
          writeJson('emyAdminAuditLog', rows.slice(0, 80));
        }
        function auditView() {
          const rows = filterPlain(auditRowsAll());
          return metrics() + '<section class="panel"><div class="panel-head"><span><h2>Admin notes and audit log</h2><p>Every approve, reject, hide, report, and note action is visible with who, what, when, action, and note.</p></span></div><div class="panel-body">' + simpleTable(rows, [{key:'createdAt',label:'When'},{key:'actor',label:'Who'},{key:'action',label:'Action'},{key:'title',label:'What'},{key:'recordId',label:'Record'},{key:'note',label:'Note'},{key:'status',label:'Status'}]) + '</div></section>';
        }
        function renderNav() {
          const c = counts();
          nav.innerHTML = views.map(function (view) {
            const number = view[0] === 'overview' ? state.records.length : view[0] === 'ai' ? '' : c[view[0]] || 0;
            return '<button type="button" class="' + (active === view[0] ? 'is-active' : '') + '" data-view="' + esc(view[0]) + '"><span>' + esc(view[1]) + '</span><small>' + esc(number) + '</small></button>';
          }).join('');
        }
        function metrics() {
          const c = counts();
          return '<div class="metric-grid"><article class="metric"><small>Customer accounts</small><strong>' + c.customerAccounts + '</strong><span>Customer signups and customer profile records.</span></article><article class="metric"><small>Business accounts</small><strong>' + c.businessAccounts + '</strong><span>Business signups and business profile records.</span></article><article class="metric"><small>Needs review</small><strong>' + c.review + '</strong><span>Pending, reported, draft, or verify status.</span></article><article class="metric"><small>Local data keys</small><strong>' + c.data + '</strong><span>EMY browser storage keys connected to this admin.</span></article></div>';
        }
        function statusTag(status) { const s = String(status || 'active').toLowerCase(); const tone = ['approved','active','online','connected','saved','tracked','popular','logged','read'].indexOf(s) >= 0 ? ' good' : ['reported','rejected','hidden','missing','needs content'].indexOf(s) >= 0 ? ' bad' : ' pending'; return '<span class="tag' + tone + '">' + esc(s) + '</span>'; }
        function adminSearchText(row) {
          const raw = row && row.raw || {};
          const fields = ['id','uid','firebaseUid','email','customerEmail','businessEmail','ownerEmail','phone','mobile','mobileNumber','displayName','firstName','lastName','businessName','name','title','productName','productTitle','clipTitle','eventName','jobTitle','business','message','source','type','status','role'];
          const businessField = customerBusinessAccountField(row || {});
          const values = [row && row.id, row && row.title, row && row.email, row && row.phone, row && row.business, row && row.message, row && row.source, row && row.type, row && row.status, accountLabel(row || {}), businessField && businessField.searchText, businessField && businessField.value];
          fields.forEach(function (key) { values.push(raw[key]); });
          return values.map(cleanText).filter(Boolean).join(' ').toLowerCase();
        }
        function profileCard(row) {
          return '<article class="profile-card" data-section-search-item data-search-text="' + esc(adminSearchText(row)) + '"><div class="profile-cover"></div><div class="profile-body"><span class="profile-avatar">' + mediaInner(row, 'profile-avatar') + '</span><span>' + accountBadge(row) + '</span><h3>' + esc(row.title || row.email || 'Profile') + '</h3><p>' + esc([row.email, row.phone].filter(Boolean).join(' | ') || row.source || 'EMY profile') + '</p>' + profileFieldMarkup(row) + '<div class="record-meta">' + statusTag(row.status) + '<span class="tag">' + esc(row.source || 'local data') + '</span></div><div class="record-actions"><a href="' + esc(row.open || 'emy-admin-backend.html') + '">' + recordIcon('open') + 'Open</a><button type="button" data-row-view="' + esc(row.id) + '">' + recordIcon('view') + 'Details</button>' + removeProfileButton(row) + '</div></div></article>';
        }
        function contentCard(row) {
          const detail = [row.business, row.price, row.message, row.source].filter(Boolean).join(' | ') || 'Content saved by EMY';
          return '<article class="content-card">' + mediaMarkup(row, 'content-media') + '<div class="content-body"><h3>' + esc(row.title || 'Content item') + '</h3><p>' + esc(detail) + '</p><div class="record-meta"><span class="tag">' + esc(row.type || 'content') + '</span>' + statusTag(row.status) + '<span class="tag">' + esc(row.source || 'local data') + '</span></div><div class="record-actions"><a href="' + esc(row.open || 'emy-admin-backend.html#content') + '">' + recordIcon('open') + 'Open</a><button type="button" data-row-view="' + esc(row.id) + '">' + recordIcon('view') + 'Details</button><button type="button" data-hide="' + esc(row.id) + '">' + recordIcon('hide') + 'Hide</button></div></div></article>';
        }
        function dataMediaCard(row) {
          const detail = fieldDisplayText(row.source || row.type || 'media', row.detail || row.source || row.key || '');
          return '<article class="data-card">' + mediaMarkup(row, 'data-media') + '<div class="data-body"><h3>' + esc(row.title || row.key || 'Media') + '</h3><p>' + esc(detail) + '</p><div class="record-meta"><span class="tag">' + esc(row.type || 'media') + '</span>' + (row.status ? statusTag(row.status) : '') + '</div>' + (row.id ? '<div class="record-actions"><button type="button" data-row-view="' + esc(row.id) + '">' + recordIcon('view') + 'Details</button></div>' : '') + '</div></article>';
        }
        function recordCard(row) {
          return '<article class="record has-media">' + mediaMarkup(row, 'record-media') + '<div><h3>' + esc(row.title || 'Untitled record') + '</h3><p>' + esc([row.email, row.phone, row.business, row.message, row.price].filter(Boolean).join(' | ') || 'Connected from ' + row.source) + '</p><div class="record-meta">' + accountBadge(row) + '<span class="tag">' + esc(row.type) + '</span>' + statusTag(row.status) + '<span class="tag">' + esc(row.source || 'local data') + '</span></div></div><div class="record-actions"><a href="' + esc(row.open || 'emy-admin-backend.html') + '">' + recordIcon('open') + 'Open page</a><button type="button" data-row-view="' + esc(row.id) + '">' + recordIcon('view') + 'Details</button>' + approveButton(row) + removeProfileButton(row) + '</div></article>';
        }
        function queue(records) { return records.length ? '<div class="queue">' + records.map(recordCard).join('') + '</div>' : '<div class="empty">No connected records match this view.</div>'; }
        function table(records, columns) {
          if (!records.length) return '<div class="empty">No connected records match this view.</div>';
          return '<div class="table-scroll"><table><thead><tr>' + columns.map(function (col) { return '<th>' + esc(col.label) + '</th>'; }).join('') + '<th>Action</th></tr></thead><tbody>' + records.map(function (row) { return '<tr>' + columns.map(function (col) { return '<td>' + (col.key === 'status' ? statusTag(row.status) : col.key === 'account' ? accountBadge(row) : fieldDisplayMarkup(col.key, row[col.key] || '')) + '</td>'; }).join('') + '<td><div class="record-actions"><a href="' + esc(row.open || 'emy-admin-backend.html') + '">' + recordIcon('open') + 'Open</a><button type="button" data-row-view="' + esc(row.id) + '">' + recordIcon('view') + 'Details</button>' + removeProfileButton(row) + '</div></td></tr>'; }).join('') + '</tbody></table></div>';
        }
        function technicalTable(title, records, columns) {
          if (!records.length) return '';
          return '<details class="raw-block technical-table"><summary>' + esc(title || 'Technical table') + '</summary>' + table(records, columns) + '</details>';
        }
        function simpleTable(records, columns) {
          if (!records.length) return '<div class="empty">No connected records match this view.</div>';
          return '<div class="table-scroll"><table><thead><tr>' + columns.map(function (col) { return '<th>' + esc(col.label) + '</th>'; }).join('') + '</tr></thead><tbody>' + records.map(function (row) {
            return '<tr>' + columns.map(function (col) {
              const value = row[col.key];
              if (col.key === 'status') return '<td>' + statusTag(value) + '</td>';
              if (col.key === 'open') return '<td>' + (value ? '<a href="' + esc(value) + '">Open</a>' : '') + '</td>';
              return '<td>' + (value == null || value === '' ? '-' : fieldDisplayMarkup(col.key, value)) + '</td>';
            }).join('') + '</tr>';
          }).join('') + '</tbody></table></div>';
        }
        function overview() {
          const reviewRows = filtered(state.records).filter(function (row) { return ['pending','reported','draft','verify'].indexOf(String(row.status).toLowerCase()) >= 0; }).slice(0, 5);
          const sources = [['Business profile','emyBusinessProfileDraft','emy-business-profile.html'], ['Signup/session','emyMainPendingSignupEmail','emy-customer-profile.html'], ['Confirmation','emyMainConfirmationCompleted','emy-confirmation.html'], ['Business products','emyBusinessProducts','emy-customer-search.html#products'], ['Business posts','emyBusinessFeedPosts','emy-customer-home.html#feeds'], ['Customer activity','emyCustomerBusinesses','emy-customer-home.html#nearby'], ['Saved feed items','emySavedFeedItems','emy-customer-home.html#feeds'], ['Service profiles','emyAdminServiceProfiles','emy-admin-backend.html#services'], ['Home banner','emyAdminHomeBanner','emy-admin-backend.html#banner'], ['Notifications','emyCustomerNotifications','emy-notification-settings.html'], ['Ask EMY chats','emyAskSavedChats','ask-emy.html'], ['Admin audit','emyAdminAuditLog','emy-admin-backend.html#audit'], ['Ask EMY settings','emyAdminAiSettings','ask-emy.html']];
          return metrics() + '<div class="grid"><section class="panel"><div class="panel-head"><span><h2>Admin work queue</h2><p>Start here. These are the connected records that need action.</p></span><button class="btn" type="button" data-view="review">Open queue</button></div><div class="panel-body">' + queue(reviewRows) + '</div></section><section class="panel"><div class="panel-head"><span><h2>Connected sources</h2><p>What this admin can actually read right now.</p></span></div><div class="panel-body"><div class="source-list">' + sources.map(function (source) { const hasData = localStorage.getItem(source[1]) ? 'Connected' : 'No saved data yet'; return '<div class="source-item"><b>' + esc(source[0]) + '</b><span>' + esc(source[1]) + ' - ' + hasData + '</span><span><a href="' + esc(source[2]) + '">Open source page</a></span></div>'; }).join('') + '</div></div></section></div>';
        }
        function statistics() {
          const records = state.records || [];
          const customerAccounts = records.filter(function (row) { const kind = accountKind(row); return kind === 'customer' || kind === 'owner-customer'; }).length;
          const businessAccounts = records.filter(function (row) { return accountKind(row) === 'business'; }).length;
          const people = customerAccounts + businessAccounts;
          const content = contentCount();
          const pending = reviewCount();
          const approved = records.filter(function (row) { return ['approved','active'].indexOf(String(row.status || '').toLowerCase()) >= 0; }).length;
          const connectedSources = connectedSourceCount();
          const recordChart = [
            { label:'Customer accounts', value:customerAccounts },
            { label:'Business accounts', value:businessAccounts },
            { label:'Products', value:typeCount('product') },
            { label:'Posts', value:typeCount('post') },
            { label:'Notifications', value:typeCount('notification') }
          ];
          const statusChart = [
            { label:'Approved/active', value:approved },
            { label:'Needs review', value:pending },
            { label:'Data keys', value:state.storage.length },
            { label:'Snapshots', value:(state.snapshots || []).length }
          ];
          return metrics() +
            '<div class="growth-grid">' +
            growthChart('Growth by day', 'Connected records added across the last 7 days.', 'day') +
            growthChart('Growth by week', 'Connected records grouped across the last 6 weeks.', 'week') +
            growthChart('Growth by year', 'Longer-term platform growth across recent years.', 'year') +
            '</div>' +
            '<div class="stats-layout"><section class="panel"><div class="panel-head"><span><h2>Platform shape</h2><p>Customers, businesses, content, and notifications currently visible to admin.</p></span></div><div class="panel-body">' + barChart(recordChart) + '</div></section><section class="panel"><div class="panel-head"><span><h2>Admin health</h2><p>What needs your attention right now.</p></span></div><div class="panel-body"><div class="health-list">' +
            healthItem('Approved or active records', approved, Math.max(records.length, 1), approved + ' of ' + records.length + ' connected records are active or approved.') +
            healthItem('Review load', pending, Math.max(records.length, 1), pending + ' records need review, approval, or checking.') +
            healthItem('Connected source coverage', connectedSources, 20, connectedSources + ' of 20 expected local sources have saved data.') +
            healthItem('Content coverage', content, Math.max(records.length, 1), content + ' content records are feeding customer-facing pages.') +
            '</div></div></section></div>' +
            '<div class="split-grid"><section class="panel"><div class="panel-head"><span><h2>Operational totals</h2><p>The numbers you need before making admin decisions.</p></span></div><div class="panel-body">' + table([
              { metric:'People records', value:people, meaning:'Customers, signups, and business profiles' },
              { metric:'Customer accounts', value:customerAccounts, meaning:'Customer signups and customer profile records' },
              { metric:'Business accounts', value:businessAccounts, meaning:'Business signups and business profile records' },
              { metric:'Content records', value:content, meaning:'Products, posts, clips, jobs, events, notifications' },
              { metric:'Pending/review records', value:pending, meaning:'Needs admin action' },
              { metric:'Saved data keys', value:state.storage.length, meaning:'Local EMY storage connected to this admin' },
              { metric:'Snapshots saved', value:(state.snapshots || []).length, meaning:'Manual backend snapshots in this browser' }
            ], [{key:'metric',label:'Metric'},{key:'value',label:'Value'},{key:'meaning',label:'Meaning'}]) + '</div></section><section class="panel"><div class="panel-head"><span><h2>Status mix</h2><p>Approved work compared with admin workload and saved data.</p></span></div><div class="panel-body">' + barChart(statusChart) + '</div></section></div>';
        }
        function review() { const rows = filtered(state.records).filter(function (row) { return ['pending','reported','draft','verify'].indexOf(String(row.status).toLowerCase()) >= 0; }); return metrics() + '<section class="panel"><div class="panel-head"><span><h2>Review queue</h2><p>Approve, inspect, or open the source page for records that need a decision.</p></span></div><div class="panel-body">' + queue(rows) + '</div></section>'; }
        function approvalCard(row) {
          const checks = approvalChecks(row);
          const savedNote = readJson('emyAdminApprovalNotes', {})[row.id] || '';
          return '<article class="approval-card"><div class="approval-top"><div class="approval-title"><h3>' + esc(row.title || 'Business profile') + '</h3><p>' + esc([row.email, row.phone, row.category].filter(Boolean).join(' | ') || 'Business profile waiting for admin review.') + '</p><div class="record-meta">' + statusTag(row.status) + '<span class="tag">' + esc(row.source || 'Business profile') + '</span></div></div><div class="score-ring" style="--score:' + checks.score + '%"><span>' + checks.score + '%</span></div></div><div class="check-grid">' + checks.fields.map(function (item) { return '<div class="check-item ' + (item[1] ? 'good' : 'missing') + '">' + esc(item[0]) + '<br>' + esc(item[1] ? 'Ready' : 'Missing') + '</div>'; }).join('') + '</div><textarea class="approval-note" data-approval-note="' + esc(row.id) + '" placeholder="Admin note for this approval...">' + esc(savedNote) + '</textarea><div class="record-actions" style="margin-top:10px"><a href="' + esc(row.open || 'emy-business-profile.html') + '">' + recordIcon('open') + 'Open profile</a><button type="button" data-row-view="' + esc(row.id) + '">' + recordIcon('view') + 'Details</button>' + approveButton(row) + rejectButton(row) + approvalNoteButton(row, savedNote) + removeProfileButton(row) + '</div></article>';
        }
        function approvals() {
          const businesses = filtered(state.records).filter(function (row) { return row.type === 'business'; });
          const audit = auditRows();
          const emails = readJson('emyAdminEmailOutbox', []);
          return metrics() + '<div class="grid"><section class="panel"><div class="panel-head"><span><h2>Pending approval center</h2><p>Open Admin backend > Pending approval center, review the score, add a note, then press Approve. Approval sends the in-app notification and generates the welcome email.</p></span><a class="btn" href="emy-business-profile.html">Open business page</a></div><div class="panel-body"><div class="approval-grid">' + (businesses.length ? businesses.map(approvalCard).join('') : '<div class="empty">No business profiles are available for approval yet.</div>') + '</div></div></section><section class="panel"><div class="panel-head"><span><h2>Approval audit log</h2><p>Recent admin approval decisions saved locally.</p></span></div><div class="panel-body"><div class="audit-list">' + (audit.length ? audit.map(function (item) { return '<div class="audit-item"><b>' + esc(item.action) + ' - ' + esc(item.title) + '</b><span>' + esc(item.createdAt || '') + '</span><span>' + esc(item.note || 'No note') + '</span></div>'; }).join('') : '<div class="empty">No approval actions yet.</div>') + '</div></div></section><section class="panel"><div class="panel-head"><span><h2>Generated welcome emails</h2><p>Approval creates this email automatically. Connect SMTP or an email API later to send these records for real.</p></span></div><div class="panel-body">' + simpleTable((Array.isArray(emails) ? emails : []).slice(0, 8), [{key:'createdAt',label:'Created'},{key:'to',label:'To'},{key:'subject',label:'Subject'},{key:'business',label:'Business'},{key:'status',label:'Status'}]) + '</div></section></div>';
        }
        function peoplePanelBody(rows, searchPlaceholder, emptyText, technicalTitle, columns) {
          if (!rows.length) return '<div class="empty">' + esc(emptyText) + '</div>';
          return '<div data-section-search-scope><div class="section-search"><label><span>Search</span><input class="input" data-section-search placeholder="' + esc(searchPlaceholder) + '" aria-label="' + esc(searchPlaceholder) + '" /></label><small data-section-search-result>' + esc(rows.length) + ' total</small></div><div class="empty" data-section-empty-search hidden>No records match that search.</div><div class="visual-grid">' + rows.map(profileCard).join('') + '</div>' + technicalTable(technicalTitle, rows, columns) + '</div>';
        }
        function people() {
          const rows = filtered(state.records).filter(function (row) { return ['signup','customer','owner-customer','business'].indexOf(row.type) >= 0; });
          const customerRows = rows.filter(function (row) { const kind = accountKind(row); return kind === 'customer' || kind === 'owner-customer'; });
          const businessRows = rows.filter(function (row) { return accountKind(row) === 'business'; });
          const columns = [{key:'account',label:'Account'},{key:'title',label:'Name'},{key:'email',label:'Email'},{key:'phone',label:'Phone'},{key:'source',label:'Source'},{key:'status',label:'Status'}];
          return metrics() + '<div class="split-grid"><section class="panel"><div class="panel-head"><span><h2>Customer accounts</h2><p>Profile photos, contact details, role, visibility, and Firebase identity.</p></span></div><div class="panel-body">' + peoplePanelBody(customerRows, 'Search Customer', 'No customer profiles match this view.', 'Technical customer table', columns) + '</div></section><section class="panel"><div class="panel-head"><span><h2>Business accounts</h2><p>Business profile image, contact details, review status, and owner data.</p></span></div><div class="panel-body">' + peoplePanelBody(businessRows, 'Search Business', 'No business profiles match this view.', 'Technical business table', columns) + '</div></section></div>';
        }
        function content() { const rows = filtered(state.records).filter(function (row) { return ['product','post','clip','job','event','notification'].indexOf(row.type) >= 0; }); const columns = [{key:'type',label:'Type'},{key:'title',label:'Title'},{key:'business',label:'Business'},{key:'source',label:'Source'},{key:'created',label:'Created'},{key:'status',label:'Status'}]; return metrics() + '<section class="panel"><div class="panel-head"><span><h2>Content connected to customer pages</h2><p>Products, posts, clips, jobs, events, and notifications with uploaded media first.</p></span></div><div class="panel-body">' + (rows.length ? '<div class="visual-grid">' + rows.map(contentCard).join('') + '</div>' + technicalTable('Technical content table', rows, columns) : '<div class="empty">No content records match this view.</div>') + '</div></section>'; }
        function serviceProfileRows() {
          return asArray(readJson('emyAdminServiceProfiles', [])).map(function (item, index) {
            const serviceTitle = firstText([item.serviceTitle, item.emyService, item.service, item.providedService]);
            const name = firstText([item.businessName, item.name, item.title, item.business]);
            if (!name || !serviceTitle) return null;
            const id = item.id || 'service-profile-' + adminSlug(name + '-' + serviceTitle) + '-' + index;
            const open = firstText([item.profileHref, item.open, item.href]) || 'emy-business-profile.html?business=' + encodeURIComponent(adminSlug(firstText([item.businessKey, item.key, name])));
            return {
              id:id,
              type:'service-profile',
              title:name,
              businessName:name,
              serviceTitle:serviceTitle,
              emyService:serviceTitle,
              category:firstText([item.category, item.emyServiceCategory, item.serviceCategory]) || adminServiceCategory(serviceTitle),
              description:firstText([item.description, item.serviceDescription, item.summary]),
              location:firstText([item.location, item.businessLocation, item.address]),
              email:firstText([item.email, item.businessEmail, item.ownerEmail]),
              phone:firstText([item.phone, item.businessPhone, item.mobile, item.mobileNumber]),
              status:firstText([item.status, item.serviceStatus]) || 'active',
              source:'Admin backend',
              open:open,
              raw:item
            };
          }).filter(Boolean);
        }
        function serviceProfileOptions(selected) {
          const selectedSlug = adminSlug(selected || '');
          return adminServiceCatalog.map(function (service) {
            return '<option value="' + esc(service.title) + '"' + (adminSlug(service.title) === selectedSlug ? ' selected' : '') + '>' + esc(service.title) + '</option>';
          }).join('');
        }
        function serviceProfileCard(row) {
          const detail = [row.serviceTitle, row.location, row.email, row.phone].filter(Boolean).join(' | ');
          return '<article class="record"><div><h3>' + esc(row.title) + '</h3><p>' + esc(row.description || detail || 'EMY service provider') + '</p><div class="record-meta"><span class="tag">' + esc(row.serviceTitle) + '</span><span class="tag">' + esc(row.category) + '</span>' + statusTag(row.status) + '<span class="tag">' + esc(row.source) + '</span></div></div><div class="record-actions"><a href="' + esc(row.open) + '">' + recordIcon('open') + 'Open profile</a><button class="danger" type="button" data-service-profile-remove="' + esc(row.id) + '">' + recordIcon('delete') + 'Remove</button></div></article>';
        }
        function services() {
          const rows = filterPlain(serviceProfileRows());
          const totals = adminServiceCatalog.map(function (service) {
            const count = serviceProfileRows().filter(function (row) { return adminSlug(row.serviceTitle) === adminSlug(service.title); }).length;
            return { service:service.title, category:service.category, providers:count, status:count ? 'active' : 'empty' };
          });
          return metrics() + '<div class="service-admin-grid"><section class="panel"><div class="panel-head"><span><h2>Add service provider</h2><p>Save businesses that should appear under EMY Services even when they were not registered as service providers.</p></span></div><div class="panel-body"><div class="form-grid"><label class="field-label">Business name<span>Name shown in the public services list.</span><input class="input" data-service-profile-name placeholder="Business name" /></label><label class="field-label">Service<span>Matches the service tiles on the business page.</span><select class="select" data-service-profile-service>' + serviceProfileOptions('Insights') + '</select></label><label class="field-label">Category<span>Leave blank to use the service default.</span><input class="input" data-service-profile-category placeholder="Category" /></label><label class="field-label">Location<span>Town, city, or service area.</span><input class="input" data-service-profile-location placeholder="Location" /></label><label class="field-label">Email<span>Optional contact email.</span><input class="input" data-service-profile-email placeholder="Email" /></label><label class="field-label">Mobile number<span>Optional contact number.</span><input class="input" data-service-profile-phone placeholder="Phone" /></label><label class="field-label">Profile link<span>Optional profile URL.</span><input class="input" data-service-profile-link placeholder="emy-business-profile.html?business=..." /></label><label class="field-label">Status<span>Inactive rows are hidden from the public service list.</span><select class="select" data-service-profile-status><option value="active">active</option><option value="pending">pending</option><option value="inactive">inactive</option></select></label><label class="field-label">Description<span>Short service note.</span><textarea class="input" data-service-profile-description rows="3" placeholder="What this business offers"></textarea></label><div class="record-actions"><button class="primary" type="button" data-action="save-service-profile">' + recordIcon('save') + 'Save service profile</button></div></div></div></section><section class="panel"><div class="panel-head"><span><h2>Service providers</h2><p>These rows are saved in emyAdminServiceProfiles and appear on the service tiles.</p></span></div><div class="panel-body"><div class="service-profile-list">' + (rows.length ? rows.map(serviceProfileCard).join('') : '<div class="service-profile-empty">No backend service profiles are saved yet.</div>') + '</div><br>' + simpleTable(totals, [{key:'service',label:'Service'},{key:'category',label:'Category'},{key:'providers',label:'Providers'},{key:'status',label:'Status'}]) + '</div></section></div>';
        }
        function bannerDefaults() {
          return { kicker:'EMY banner', title:'We did it', accent:'for you.', body:'EMY can publish campaign images or short videos here from the backend.', chips:'Images, Videos, Campaigns', mediaSrc:'', mediaType:'', mediaName:'', mediaItems:[], status:'active', savedAt:'' };
        }
        function homeBannerSettings() {
          const banner = Object.assign({}, bannerDefaults(), readJson('emyAdminHomeBanner', {}));
          banner.mediaItems = bannerMediaItems(banner);
          syncBannerPrimaryMedia(banner);
          return banner;
        }
        function bannerChipList(banner) {
          return String((banner && banner.chips) || '').split(',').map(function (chip) { return chip.trim(); }).filter(Boolean).slice(0, 5);
        }
        function bannerMediaItems(banner) {
          const rows = Array.isArray(banner && banner.mediaItems) ? banner.mediaItems : [];
          const items = rows.map(function (item) {
            if (!item || typeof item !== 'object') return null;
            const src = firstText([item.src, item.mediaSrc, item.url]);
            if (!src) return null;
            const type = /^video/i.test(firstText([item.type, item.mediaType])) || /^data:video/i.test(src) ? 'video' : 'image';
            return { id:firstText([item.id]) || 'banner-media-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7), src:src, type:type, name:firstText([item.name, item.mediaName]) || 'Banner media', savedAt:firstText([item.savedAt, item.createdAt]) || '' };
          }).filter(Boolean);
          const legacySrc = firstText([banner && banner.mediaSrc]);
          if (legacySrc && !items.some(function (item) { return item.src === legacySrc; })) {
            items.unshift({ id:'banner-media-legacy', src:legacySrc, type:/^video/i.test(firstText([banner && banner.mediaType])) || /^data:video/i.test(legacySrc) ? 'video' : 'image', name:firstText([banner && banner.mediaName]) || 'Banner media', savedAt:firstText([banner && banner.savedAt]) });
          }
          return items.slice(0, 12);
        }
        function syncBannerPrimaryMedia(banner) {
          const first = Array.isArray(banner.mediaItems) && banner.mediaItems.length ? banner.mediaItems[0] : null;
          banner.mediaSrc = first ? first.src : '';
          banner.mediaType = first ? first.type : '';
          banner.mediaName = first ? first.name : '';
          return banner;
        }
        function bannerPreviewMedia(banner) {
          const media = bannerMediaItems(banner)[0];
          if (!media) return '';
          if (media.type === 'video') return '<div class="admin-banner-preview-media"><video src="' + esc(media.src) + '" muted loop playsinline autoplay></video></div>';
          return '<div class="admin-banner-preview-media"><img src="' + esc(media.src) + '" alt="" /></div>';
        }
        function bannerMediaListMarkup(banner) {
          const items = bannerMediaItems(banner);
          if (!items.length) return '<div class="service-profile-empty">No banner media added yet.</div>';
          return '<div class="banner-media-list">' + items.map(function (item, index) {
            const media = item.type === 'video' ? '<video src="' + esc(item.src) + '" muted playsinline preload="metadata"></video>' : '<img src="' + esc(item.src) + '" alt="" />';
            return '<article class="banner-media-card"><figure>' + media + '</figure><figcaption><b>' + esc(item.name || 'Banner media') + '</b><small>' + esc(item.type) + ' slide ' + esc(index + 1) + '</small><button type="button" data-banner-remove-media="' + esc(index) + '">Remove</button></figcaption></article>';
          }).join('') + '</div>';
        }
        function bannerView() {
          const banner = homeBannerSettings();
          const chips = bannerChipList(banner);
          const mediaItems = bannerMediaItems(banner);
          const preview = '<div class="admin-banner-preview' + (mediaItems.length ? ' has-media' : '') + '">' + bannerPreviewMedia(banner) + '<div class="admin-banner-preview-copy"><span class="admin-banner-mark">m</span><span><span class="admin-banner-kicker">' + esc(banner.kicker) + '</span><h3>' + esc(banner.title) + '<br><span>' + esc(banner.accent) + '</span></h3><p>' + esc(banner.body) + '</p><div class="admin-banner-tags">' + chips.map(function (chip) { return '<span>' + esc(chip) + '</span>'; }).join('') + '</div></span></div></div>';
          return metrics() + '<section class="panel"><div class="panel-head"><span><h2>Customer home banner</h2><p>Add images or videos that play in the customer home banner carousel.</p></span><a class="btn" href="emy-customer-home.html">Open customer home</a></div><div class="panel-body"><div class="banner-editor-grid"><div class="form-grid"><label class="field-label">Kicker<span>Small label above the headline.</span><input class="input" data-banner-kicker value="' + esc(banner.kicker) + '" /></label><label class="field-label">Headline line one<span>Main text in navy.</span><input class="input" data-banner-title value="' + esc(banner.title) + '" /></label><label class="field-label">Headline line two<span>Orange accent text.</span><input class="input" data-banner-accent value="' + esc(banner.accent) + '" /></label><label class="field-label">Banner body<span>Short supporting sentence.</span><textarea class="input" data-banner-body rows="3">' + esc(banner.body) + '</textarea></label><label class="field-label">Chips<span>Separate each chip with a comma.</span><input class="input" data-banner-chips value="' + esc(banner.chips) + '" /></label><label class="field-label">Status<span>Pause hides the custom banner and shows the default.</span><select class="select" data-banner-status><option value="active"' + (banner.status !== 'paused' ? ' selected' : '') + '>active</option><option value="paused"' + (banner.status === 'paused' ? ' selected' : '') + '>paused</option></select></label><div class="media-actions"><input type="file" data-banner-file accept="image/*,video/*" multiple /><button class="btn" type="button" data-action="clear-banner-media">Clear all media</button></div><div>' + bannerMediaListMarkup(banner) + '</div><div class="record-actions"><button class="primary" type="button" data-action="save-banner">Save banner</button><button type="button" data-action="reset-banner">Reset default</button></div><div class="record-meta"><span class="tag good">emyAdminHomeBanner</span><span class="tag">' + esc(banner.status || 'active') + '</span><span class="tag">' + esc(mediaItems.length + ' media slides') + '</span></div></div>' + preview + '</div></div></section>';
        }
        function bannerFormValue() {
          const current = homeBannerSettings();
          return syncBannerPrimaryMedia({ kicker:document.querySelector('[data-banner-kicker]')?.value || '', title:document.querySelector('[data-banner-title]')?.value || '', accent:document.querySelector('[data-banner-accent]')?.value || '', body:document.querySelector('[data-banner-body]')?.value || '', chips:document.querySelector('[data-banner-chips]')?.value || '', status:document.querySelector('[data-banner-status]')?.value || 'active', mediaItems:bannerMediaItems(current), savedAt:new Date().toISOString() });
        }
        function saveBanner() {
          const next = bannerFormValue();
          writeJson('emyAdminHomeBanner', next);
          audit('home banner saved', 'home-banner', next.kicker + ' / ' + next.title);
          showToast('Home banner saved. Open customer home to see it.');
          render();
        }
        function resetBanner() {
          localStorage.removeItem('emyAdminHomeBanner');
          audit('home banner reset', 'home-banner', 'Restored default customer home banner.');
          showToast('Home banner reset to the default.');
          render();
        }
        function clearBannerMedia() {
          const next = bannerFormValue();
          next.mediaItems = [];
          syncBannerPrimaryMedia(next);
          writeJson('emyAdminHomeBanner', next);
          audit('home banner media cleared', 'home-banner', next.title);
          showToast('Banner media removed.');
          render();
        }
        function removeBannerMedia(index) {
          const next = bannerFormValue();
          const items = bannerMediaItems(next);
          items.splice(Number(index), 1);
          next.mediaItems = items;
          syncBannerPrimaryMedia(next);
          writeJson('emyAdminHomeBanner', next);
          audit('home banner media removed', 'home-banner', next.title);
          showToast('Banner media removed.');
          render();
        }
        const mediaMigrationKeys = [
          'emyFeedCreatedPosts',
          'emyFeedCreatedProducts',
          'emyFeedCreatedClips',
          'emyFeedCreatedJobs',
          'emyFeedCreatedEvents',
          'emyFeedCreatedArticles',
          'emyBusinessFeedPosts',
          'emyBusinessPosts',
          'emyBusinessArticles',
          'emyBusinessArticlePosts',
          'emyBusinessProducts',
          'emyBusinessProductList',
          'emyBusinessProductPosts',
          'emyBusinessClips',
          'emyBusinessReels',
          'emyBusinessProductReels',
          'emyBusinessJobs',
          'emyBusinessJobPosts',
          'emyBusinessEvents',
          'emyBusinessEventPosts'
        ];
        const mediaMigrationFields = [
          { ref:'mediaRef', src:['mediaSrc'] },
          { ref:'ref', src:['src'] },
          { ref:'imageRef', src:['image','imageSrc'], type:'image' },
          { ref:'videoRef', src:['video','videoSrc'], type:'video' },
          { ref:'coverRef', src:['coverSrc'] },
          { ref:'eventCoverRef', src:['eventCoverSrc'] },
          { ref:'jobCoverRef', src:['jobCoverSrc'] },
          { ref:'photoRef', src:['photo','photoSrc'], type:'image' },
          { ref:'thumbnailRef', src:['thumbnailSrc'], poster:true, type:'image' },
          { ref:'posterRef', src:['posterSrc'], poster:true, type:'image' },
          { ref:'coverPosterRef', src:['coverPosterSrc'], poster:true, type:'image' },
          { ref:'eventCoverPosterRef', src:['eventCoverPosterSrc'], poster:true, type:'image' },
          { ref:'jobCoverPosterRef', src:['jobCoverPosterSrc'], poster:true, type:'image' }
        ];
        let mediaMigrationRunning = false;
        let mediaMigrationStatus = { running:false, dryRun:false, totalRefs:0, uploaded:0, reused:0, missing:0, missingRefs:[], failed:0, updatedItems:0, updatedKeys:0, currentKey:'', lastError:'', startedAt:'', finishedAt:'' };
        function mediaMigrationLooksStoredRef(value) {
          const text = cleanText(value);
          if (!text) return false;
          if (/^(data:image\\/|data:video\\/|blob:|https?:\\/\\/|file:|\\/|\\.{1,2}\\/|assets\\/)/i.test(text)) return false;
          return /^emy-media-|^business-|^customer-|^profile-|^media-/i.test(text);
        }
        function mediaMigrationTypeHint(target, field) {
          const source = target || {};
          const explicit = cleanText(field && field.type || source.cloudinaryResourceType || source.mediaType || source.type || source.coverType || source.eventCoverType || source.jobCoverType).toLowerCase();
          if (explicit === 'video' || explicit === 'clip' || explicit === 'reel') return 'video';
          if (explicit === 'image' || field && field.poster) return 'image';
          if (field && /video/i.test(field.ref || '')) return 'video';
          return '';
        }
        function mediaMigrationSrcFields(field) {
          return Array.isArray(field && field.src) ? field.src.filter(Boolean) : [field && field.src].filter(Boolean);
        }
        function mediaMigrationFieldSource(target, field) {
          const fields = mediaMigrationSrcFields(field);
          for (let index = 0; index < fields.length; index += 1) {
            const value = cleanText(target && target[fields[index]]);
            if (/^(data:image\\/|data:video\\/|blob:|https?:\\/\\/)/i.test(value)) return value;
          }
          return '';
        }
        function mediaMigrationMap() {
          return readJson('emyCloudinaryMigratedMediaRefs', {});
        }
        function mediaMigrationSaveMap(map) {
          writeJson('emyCloudinaryMigratedMediaRefs', map || {});
        }
        function mediaMigrationMapCount() {
          const map = mediaMigrationMap();
          return Object.keys(map || {}).filter(function (key) { return map[key] && map[key].src; }).length;
        }
        function mediaMigrationReadArray(key) {
          const rows = readJson(key, []);
          return Array.isArray(rows) ? rows : [];
        }
        function mediaMigrationOpenDb() {
          return new Promise(function (resolve, reject) {
            if (!window.indexedDB) {
              reject(new Error('Browser media storage is not available.'));
              return;
            }
            const request = indexedDB.open('emy-feed-media-db', 1);
            request.onupgradeneeded = function () {
              const db = request.result;
              if (db && !db.objectStoreNames.contains('media')) db.createObjectStore('media', { keyPath:'id' });
            };
            request.onsuccess = function () { resolve(request.result); };
            request.onerror = function () { reject(request.error || new Error('Could not open browser media storage.')); };
          });
        }
        function mediaMigrationReadRecord(ref) {
          return mediaMigrationOpenDb().then(function (db) {
            return new Promise(function (resolve, reject) {
              const tx = db.transaction('media', 'readonly');
              const request = tx.objectStore('media').get(ref);
              request.onsuccess = function () {
                const record = request.result;
                if (!record || !record.blob) {
                  const error = new Error('Old browser media is missing: ' + ref);
                  error.missingMedia = true;
                  error.mediaRef = ref;
                  reject(error);
                  return;
                }
                resolve(record);
              };
              request.onerror = function () { reject(request.error || new Error('Could not read saved media: ' + ref)); };
            });
          });
        }
        function mediaMigrationBlobType(blob, hint) {
          const cleanHint = cleanText(hint).toLowerCase();
          const mime = cleanText(blob && blob.type).toLowerCase();
          if (cleanHint === 'video' || mime.indexOf('video/') === 0) return 'video';
          return 'image';
        }
        function mediaMigrationSourceType(source, hint) {
          const text = cleanText(source);
          const cleanHint = cleanText(hint).toLowerCase();
          if (cleanHint === 'video' || /^data:video\\//i.test(text) || /\\.(mp4|webm|mov|m4v)(\\?|#|$)/i.test(text)) return 'video';
          return 'image';
        }
        function mediaMigrationRecordMissingRef(ref) {
          const cleanRef = cleanText(ref);
          mediaMigrationStatus.missing += 1;
          if (cleanRef && mediaMigrationStatus.missingRefs.indexOf(cleanRef) < 0 && mediaMigrationStatus.missingRefs.length < 6) {
            mediaMigrationStatus.missingRefs.push(cleanRef);
          }
          mediaMigrationStatus.lastError = cleanRef ? 'Old browser media is missing: ' + cleanRef : 'Old browser media is missing.';
        }
        async function mediaMigrationUploadSource(source, typeHint, name, dryRun) {
          const cleanSource = cleanText(source);
          const uploadType = mediaMigrationSourceType(cleanSource, typeHint);
          if (!cleanSource) return null;
          if (/^https?:\\/\\//i.test(cleanSource)) {
            mediaMigrationStatus.reused += 1;
            return { src:cleanSource, type:uploadType, cloudinaryPublicId:'', cloudinaryResourceType:uploadType, existingSource:true };
          }
          if (!/^(data:image\\/|data:video\\/|blob:)/i.test(cleanSource)) return null;
          if (dryRun) return { src:'dry-run', type:uploadType, ref:'', dryRun:true };
          const uploader = window.emyRealAuth && typeof window.emyRealAuth.uploadToCloudinary === 'function' ? window.emyRealAuth.uploadToCloudinary : null;
          if (!uploader) throw new Error('Upload service is not ready. Refresh this admin page and try again.');
          let uploadValue = cleanSource;
          if (/^blob:/i.test(cleanSource)) {
            const response = await fetch(cleanSource);
            if (!response.ok) throw new Error('Media upload failed. Try a smaller file or check your connection.');
            uploadValue = await response.blob();
          }
          let upload = null;
          try {
            upload = await uploader(uploadValue, { role:'admin', kind:'migration', folder:'emy/migration', name:name || (uploadType === 'video' ? 'old-video' : 'old-image') });
          } catch (error) {
            throw new Error('Media upload failed. Try a smaller file or check your connection.');
          }
          if (!upload || !upload.url) throw new Error('Media upload failed. Try a smaller file or check your connection.');
          const resourceType = cleanText(upload.resourceType || uploadType).toLowerCase() === 'video' ? 'video' : 'image';
          mediaMigrationStatus.uploaded += 1;
          return { src:upload.url, type:resourceType, cloudinaryPublicId:upload.publicId || '', cloudinaryResourceType:resourceType, cloudinaryBytes:Number(upload.bytes) || 0, cloudinaryDuration:Number(upload.duration) || 0, migratedAt:new Date().toISOString() };
        }
        function mediaMigrationSetCloudFields(target, upload, field) {
          if (!target || !upload) return;
          const publicId = upload.cloudinaryPublicId || upload.publicId || '';
          const resourceType = upload.cloudinaryResourceType || upload.resourceType || upload.type || '';
          if (field && field.poster) {
            target.cloudinaryPosterPublicId = publicId;
            return;
          }
          target.cloudinaryPublicId = publicId;
          target.cloudinaryResourceType = resourceType;
          target.cloudinaryBytes = Number(upload.cloudinaryBytes || upload.bytes) || 0;
          target.cloudinaryDuration = Number(upload.cloudinaryDuration || upload.duration) || 0;
          if (field && /photo/i.test(field.ref || '')) target.photoPublicId = publicId;
          if (field && /image/i.test(field.ref || '')) target.imagePublicId = publicId;
          if (field && /video/i.test(field.ref || '')) target.videoPublicId = publicId;
        }
        function mediaMigrationStatusText(status) {
          const current = status.currentKey ? ' Current: ' + status.currentKey + '.' : '';
          const done = status.finishedAt ? ' Finished.' : status.running ? ' Running.' : '';
          const mode = status.dryRun ? 'Scan only.' : 'Migration.';
          const error = status.lastError ? ' Last issue: ' + status.lastError : '';
          const readyRefs = Math.max(0, (Number(status.totalRefs) || 0) - (Number(status.missing) || 0) - (Number(status.failed) || 0));
          const transfer = status.dryRun ? ' Ready refs: ' + readyRefs + '.' : ' Uploaded: ' + status.uploaded + '.';
          const itemLabel = status.dryRun ? 'Records with old refs' : 'Updated records';
          const keyLabel = status.dryRun ? 'Storage keys with old refs' : 'Updated storage keys';
          const missingRefs = Array.isArray(status.missingRefs) && status.missingRefs.length ? ' Missing refs: ' + status.missingRefs.join(', ') + '.' : '';
          return mode + done + ' Refs: ' + status.totalRefs + '.' + transfer + ' Reused: ' + status.reused + '. Missing old media: ' + (status.missing || 0) + '. Failed: ' + status.failed + '. ' + itemLabel + ': ' + status.updatedItems + '. ' + keyLabel + ': ' + status.updatedKeys + '.' + current + missingRefs + error;
        }
        function updateMediaMigrationPanel() {
          const statusNode = document.querySelector('[data-media-migration-status]');
          if (statusNode) statusNode.textContent = mediaMigrationStatusText(mediaMigrationStatus);
          document.querySelectorAll('[data-action="media-migration-run"],[data-action="media-migration-scan"]').forEach(function (button) {
            button.disabled = !!mediaMigrationRunning;
            button.setAttribute('aria-disabled', mediaMigrationRunning ? 'true' : 'false');
          });
        }
        function mediaMigrationPanel() {
          const saved = mediaMigrationMapCount();
          const status = mediaMigrationStatusText(mediaMigrationStatus);
          return '<section class="panel"><div class="panel-head"><span><h2>Temporary media migration</h2><p>Moves old browser-saved post, product, clip, job, and event media into uploaded media storage. Old browser copies are kept until you remove this tool.</p></span><div class="record-actions"><button type="button" data-action="media-migration-scan">Scan only</button><button class="primary" type="button" data-action="media-migration-run">Upload old browser media</button></div></div><div class="panel-body"><div class="source-list"><div class="source-item"><b>Status</b><span data-media-migration-status>' + esc(status) + '</span></div><div class="source-item"><b>Already mapped</b><span>' + esc(saved) + ' old media refs already have uploaded URLs saved in the migration map.</span></div><div class="source-item"><b>Safety</b><span>This updates saved records only after each media upload succeeds. It does not delete the old browser media blobs.</span></div></div></div></section>';
        }
        async function mediaMigrationUploadRef(ref, typeHint, migrationMap, dryRun, fallbackSource) {
          const cleanRef = cleanText(ref);
          if (!mediaMigrationLooksStoredRef(cleanRef)) return null;
          if (migrationMap[cleanRef] && migrationMap[cleanRef].src) {
            mediaMigrationStatus.reused += 1;
            return migrationMap[cleanRef];
          }
          let record = null;
          try {
            record = await mediaMigrationReadRecord(cleanRef);
          } catch (error) {
            const fallbackUpload = await mediaMigrationUploadSource(fallbackSource, typeHint, cleanRef, dryRun);
            if (fallbackUpload && fallbackUpload.src) {
              const fallbackSaved = Object.assign({}, fallbackUpload, { originalRef:cleanRef, migratedAt:fallbackUpload.migratedAt || new Date().toISOString() });
              if (!dryRun) {
                migrationMap[cleanRef] = fallbackSaved;
                mediaMigrationSaveMap(migrationMap);
              }
              return fallbackSaved;
            }
            throw error;
          }
          const uploadType = mediaMigrationBlobType(record.blob, typeHint || record.mediaType);
          if (dryRun) return { src:'dry-run', type:uploadType, ref:cleanRef, dryRun:true };
          const uploader = window.emyRealAuth && typeof window.emyRealAuth.uploadToCloudinary === 'function' ? window.emyRealAuth.uploadToCloudinary : null;
          if (!uploader) throw new Error('Upload service is not ready. Refresh this admin page and try again.');
          let upload = null;
          try {
            upload = await uploader(record.blob, { role:'admin', kind:'migration', folder:'emy/migration', name:record.name || cleanRef });
          } catch (error) {
            throw new Error('Media upload failed. Try a smaller file or check your connection.');
          }
          if (!upload || !upload.url) throw new Error('Media upload failed. Try a smaller file or check your connection.');
          const resourceType = cleanText(upload.resourceType || uploadType).toLowerCase() === 'video' ? 'video' : 'image';
          const saved = { src:upload.url, type:resourceType, cloudinaryPublicId:upload.publicId || '', cloudinaryResourceType:resourceType, cloudinaryBytes:Number(upload.bytes) || 0, cloudinaryDuration:Number(upload.duration) || 0, originalRef:cleanRef, migratedAt:new Date().toISOString() };
          migrationMap[cleanRef] = saved;
          mediaMigrationSaveMap(migrationMap);
          mediaMigrationStatus.uploaded += 1;
          return saved;
        }
        async function mediaMigrationApplyField(target, field, migrationMap, dryRun) {
          if (!target || typeof target !== 'object' || !field) return false;
          const ref = cleanText(target[field.ref]);
          if (!mediaMigrationLooksStoredRef(ref)) return false;
          mediaMigrationStatus.totalRefs += 1;
          try {
            const upload = await mediaMigrationUploadRef(ref, mediaMigrationTypeHint(target, field), migrationMap, dryRun, mediaMigrationFieldSource(target, field));
            if (!upload || !upload.src) return false;
            if (dryRun) return true;
            mediaMigrationSrcFields(field).forEach(function (srcKey) { target[srcKey] = upload.src; });
            target[field.ref] = '';
            if (!field.poster) {
              target.mediaRemoved = false;
              target.mediaClearedAt = '';
              if (!target.mediaSrc && mediaMigrationSrcFields(field).indexOf('mediaSrc') < 0) target.mediaSrc = upload.src;
              if (!target.mediaType) target.mediaType = upload.type || upload.cloudinaryResourceType || mediaMigrationTypeHint(target, field) || 'image';
            }
            mediaMigrationSetCloudFields(target, upload, field);
            return true;
          } catch (error) {
            if (error && error.missingMedia) mediaMigrationRecordMissingRef(error.mediaRef || ref);
            else {
              mediaMigrationStatus.failed += 1;
              mediaMigrationStatus.lastError = error && error.message || 'Media migration failed.';
            }
            return false;
          } finally {
            updateMediaMigrationPanel();
          }
        }
        async function mediaMigrationApplySettings(settings, migrationMap, dryRun) {
          if (!settings || typeof settings !== 'object') return false;
          let changed = false;
          const fields = [{ ref:'posterRef', src:['posterSrc'], poster:true, type:'image' }, { ref:'thumbnailRef', src:['thumbnailSrc'], poster:true, type:'image' }];
          for (let index = 0; index < fields.length; index += 1) {
            changed = await mediaMigrationApplyField(settings, fields[index], migrationMap, dryRun) || changed;
          }
          return changed;
        }
        async function mediaMigrationApplyMediaItem(item, migrationMap, dryRun) {
          if (!item || typeof item !== 'object' || item.mediaRemoved === true || item.deleted === true || item.deletedAt) return false;
          let changed = false;
          for (let index = 0; index < mediaMigrationFields.length; index += 1) {
            changed = await mediaMigrationApplyField(item, mediaMigrationFields[index], migrationMap, dryRun) || changed;
          }
          changed = await mediaMigrationApplySettings(item.settings || item.mediaSettings, migrationMap, dryRun) || changed;
          return changed;
        }
        async function mediaMigrationApplyItem(item, migrationMap, dryRun) {
          if (!item || typeof item !== 'object' || item.deleted === true || item.deletedAt) return false;
          let changed = false;
          for (let index = 0; index < mediaMigrationFields.length; index += 1) {
            changed = await mediaMigrationApplyField(item, mediaMigrationFields[index], migrationMap, dryRun) || changed;
          }
          changed = await mediaMigrationApplySettings(item.mediaSettings || item.coverSettings || item.eventCoverSettings || item.jobCoverSettings, migrationMap, dryRun) || changed;
          if (Array.isArray(item.mediaItems)) {
            for (let index = 0; index < item.mediaItems.length; index += 1) {
              changed = await mediaMigrationApplyMediaItem(item.mediaItems[index], migrationMap, dryRun) || changed;
            }
            const first = item.mediaItems.find(function (entry) { return entry && (entry.src || entry.mediaSrc); });
            if (!dryRun && first && (first.src || first.mediaSrc)) {
              if (!item.mediaSrc) item.mediaSrc = first.src || first.mediaSrc;
              if (!item.mediaType) item.mediaType = first.type || first.mediaType || 'image';
              mediaMigrationSetCloudFields(item, first, {});
            }
          }
          return changed;
        }
        async function runMediaMigration(dryRun) {
          if (mediaMigrationRunning) {
            showToast('Media migration is already running.');
            return;
          }
          if (!dryRun && !window.confirm('Upload old browser-saved media now? This updates saved records after each upload succeeds and keeps the old browser copies.')) return;
          mediaMigrationRunning = true;
          mediaMigrationStatus = { running:true, dryRun:!!dryRun, totalRefs:0, uploaded:0, reused:0, missing:0, missingRefs:[], failed:0, updatedItems:0, updatedKeys:0, currentKey:'', lastError:'', startedAt:new Date().toISOString(), finishedAt:'' };
          updateMediaMigrationPanel();
          try {
            const migrationMap = mediaMigrationMap();
            for (let keyIndex = 0; keyIndex < mediaMigrationKeys.length; keyIndex += 1) {
              const key = mediaMigrationKeys[keyIndex];
              mediaMigrationStatus.currentKey = key;
              updateMediaMigrationPanel();
              const items = mediaMigrationReadArray(key);
              if (!items.length) continue;
              let keyChanged = false;
              for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
                const changed = await mediaMigrationApplyItem(items[itemIndex], migrationMap, !!dryRun);
                if (changed) {
                  keyChanged = true;
                  mediaMigrationStatus.updatedItems += 1;
                }
                if (itemIndex % 3 === 2) await new Promise(function (resolve) { setTimeout(resolve, 0); });
              }
              if (keyChanged) {
                if (!dryRun) writeJson(key, items);
                mediaMigrationStatus.updatedKeys += 1;
              }
            }
            mediaMigrationStatus.finishedAt = new Date().toISOString();
            showToast(dryRun ? 'Media scan finished.' : 'Media migration finished.');
            if (!dryRun) audit('media migration finished', 'browser-media-migration', mediaMigrationStatusText(mediaMigrationStatus));
          } catch (error) {
            mediaMigrationStatus.lastError = error && error.message || 'Media migration failed.';
            showToast(mediaMigrationStatus.lastError);
          } finally {
            mediaMigrationStatus.running = false;
            mediaMigrationStatus.currentKey = '';
            mediaMigrationRunning = false;
            updateMediaMigrationPanel();
            if (!dryRun) render();
          }
        }
        function storageObject() {
          return state.storage.reduce(function (acc, item) { acc[item.key] = item.value; return acc; }, {});
        }
        function dataPreviewRows() {
          const rows = [];
          const signup = currentSignup();
          if (signup) rows.push(signup);
          const business = businessRecord();
          if (business) rows.push(business);
          (state.records || []).filter(function (row) { return ['product','post','clip','job','event','notification'].indexOf(row.type) >= 0; }).slice(0, 12).forEach(function (row) { rows.push(row); });
          (state.storage || []).forEach(function (item) {
            const parsed = parseStoredObject(item.value);
            const media = parsed ? mediaFromObject(parsed) : mediaFromObject({ image:looksLikeMedia(item.value) ? item.value : '', imageRef:/photo|image|media|video|ref/i.test(item.key) ? item.value : '' });
            if (!(media.src || media.ref)) return;
            const detail = mediaFieldLabel(item.key, media.src || media.ref || item.value) || (media.type === 'video' ? 'Uploaded video' : media.ref ? 'Image reference saved' : 'Uploaded image');
            rows.push({ id:'storage-media-' + item.key, type:media.type === 'video' ? 'video' : 'image', title:item.key.replace(/^emy/, 'EMY '), source:item.key, status:'saved', detail:detail, image:media.type === 'image' ? media.src : '', video:media.type === 'video' ? media.src : '', mediaRef:media.ref, raw:parsed || { key:item.key, value:item.value } });
          });
          const seen = {};
          return rows.filter(function (row) {
            const id = row.id || row.source || row.title;
            if (seen[id]) return false;
            seen[id] = true;
            return true;
          }).slice(0, 24);
        }
        function dataProfileSummary() {
          const rows = dataPreviewRows();
          const people = rows.filter(function (row) { return ['signup','customer','owner-customer','business'].indexOf(row.type) >= 0; });
          return people.length ? '<div data-section-search-scope><div class="section-search"><label><span>Search profiles</span><input class="input" data-section-search placeholder="Name, ID, email, phone, role, or status..." /></label><small data-section-search-result>' + esc(people.length) + ' profiles</small></div><div class="empty" data-section-empty-search hidden>No profiles match that search.</div><div class="visual-grid">' + people.map(profileCard).join('') + '</div></div>' : '<div class="empty">No profile records are saved in this browser yet.</div>';
        }
        function dataActivityKind(row) {
          const text = String([row && row.type, row && row.source, row && row.title, row && row.business].filter(Boolean).join(' ')).toLowerCase();
          if (/customer|notification|saved|ask|search|comment|repost|like|profile/.test(text)) return 'customer';
          if (/business|product|post|clip|reel|job|event|approval|feed/.test(text)) return 'business';
          return 'other';
        }
        function activityRow(row) {
          const detail = fieldDisplayText(row.source || row.type || 'activity', [row.business, row.price, row.message, row.detail, row.source].filter(Boolean).join(' | ') || row.source || row.type || 'Saved activity');
          return '<article class="activity-row" data-section-search-item data-search-text="' + esc(adminSearchText(row)) + '">' + mediaMarkup(row, 'activity-media') + '<div class="activity-copy"><h4>' + esc(row.title || row.key || 'Saved item') + '</h4><p>' + esc(detail) + '</p><div class="record-meta"><span class="tag">' + esc(row.type || 'activity') + '</span>' + (row.status ? statusTag(row.status) : '') + '</div></div><div class="record-actions"><button type="button" data-row-view="' + esc(row.id) + '">' + recordIcon('view') + 'Details</button></div></article>';
        }
        function activityPanel(titleText, subtitleText, rows) {
          return '<section class="activity-panel" data-section-group><div class="activity-panel-head"><span><h3>' + esc(titleText) + '</h3><p>' + esc(subtitleText) + '</p></span><span class="tag good" data-group-count>' + esc(rows.length) + '</span></div>' + (rows.length ? '<div class="activity-list">' + rows.map(activityRow).join('') + '</div>' : '<div class="empty">No saved activity in this group yet.</div>') + '</section>';
        }
        function dataMediaSummary() {
          const rows = dataPreviewRows().filter(function (row) { return ['signup','customer','owner-customer','business'].indexOf(row.type) < 0; });
          if (!rows.length) return '<div class="empty">No uploaded images, videos, products, posts, clips, jobs, or events are saved yet.</div>';
          const businessRows = rows.filter(function (row) { return dataActivityKind(row) === 'business'; });
          const customerRows = rows.filter(function (row) { return dataActivityKind(row) === 'customer'; });
          const otherRows = rows.filter(function (row) { return dataActivityKind(row) === 'other'; });
          return '<div data-section-search-scope><div class="section-search"><label><span>Search activity</span><input class="input" data-section-search placeholder="Name, ID, email, business, product, post, clip, source..." /></label><small data-section-search-result>' + esc(rows.length) + ' records</small></div><div class="empty" data-section-empty-search hidden>No activity records match that search.</div><div class="activity-groups">' +
            activityPanel('Customer activity', 'Notifications, comments, reposts, saved items, and customer actions.', customerRows) +
            activityPanel('Business activity', 'Products, posts, clips, jobs, events, and business media.', businessRows) +
            (otherRows.length ? activityPanel('Other media references', 'Uploaded media records that are not tied to a customer or business yet.', otherRows) : '') +
          '</div></div>';
        }
        function dataView() {
          const data = JSON.stringify(storageObject(), null, 2);
          const previews = dataPreviewRows();
          const profileCount = previews.filter(function (row) { return ['signup','customer','owner-customer','business'].indexOf(row.type) >= 0; }).length;
          const activityCount = previews.filter(function (row) { return ['signup','customer','owner-customer','business'].indexOf(row.type) < 0; }).length;
          return metrics() + mediaMigrationPanel() + '<br><section class="panel"><div class="panel-head"><span><h2>Saved EMY data</h2><p>Profiles, uploaded media, and connected demo records shown before the raw data.</p></span><button class="btn primary" type="button" data-action="export">Export JSON</button></div><div class="panel-body"><div class="three-grid"><article class="data-card is-wide"><div class="data-body"><h3>Profile records</h3><p>Customer and business identity data saved by the demo backend.</p><div class="record-meta"><span class="tag good">' + esc(profileCount) + ' profiles</span></div></div></article><article class="data-card is-wide"><div class="data-body"><h3>Activities and uploads</h3><p>Business content and customer activity grouped into smaller admin lists.</p><div class="record-meta"><span class="tag good">' + esc(activityCount) + ' records</span></div></div></article><article class="data-card is-wide"><div class="data-body"><h3>Storage keys</h3><p>Raw EMY keys still available for support and debugging.</p><div class="record-meta"><span class="tag">' + esc(state.storage.length) + ' keys</span></div></div></article></div><br><section class="panel"><div class="panel-head"><span><h2>Real profiles</h2><p>Customer and business records with real profile pictures when uploaded.</p></span></div><div class="panel-body">' + dataProfileSummary() + '</div></section><br><section class="panel"><div class="panel-head"><span><h2>Activity and uploaded content</h2><p>Business records and customer actions are separated into compact sections.</p></span></div><div class="panel-body">' + dataMediaSummary() + '</div></section><br><details class="raw-block"><summary>Raw JSON</summary><textarea class="textarea" data-data-json>' + esc(data) + '</textarea></details></div></section>';
        }
        function aiView() {
          const settings = readJson('emyAdminAiSettings', { provider:'openai', model:'gpt-5.4', openAiModel:'gpt-5.4', openRouterModel:'deepseek/deepseek-chat-v3-0324:free', deepSeekModel:'deepseek-chat', notes:'OpenAI gpt-5.4 is the Ask EMY default.' });
          return metrics() + '<section class="panel"><div class="panel-head"><span><h2>Ask EMY backend</h2><p>Save provider keys on this computer, then test OpenAI, OpenRouter, or DeepSeek.</p></span></div><div class="panel-body"><div class="ai-status-grid" data-ai-status-card><article class="ai-status-card"><b>Backend status</b><span>Checking saved AI settings...</span><em class="ai-status-pill warn">Checking</em></article></div><div class="grid"><div><label>Default provider<input class="input" data-ai-provider value="' + esc(settings.provider || 'openai') + '" placeholder="openrouter, deepseek, or openai" /></label><br><label>OpenAI model<span class="ai-model-help">Recommended for Ask EMY: gpt-5.4. Faster/cheaper options: gpt-5.4-mini or gpt-5.4-nano. Highest quality: gpt-5.5.</span><input class="input" data-ai-openai-model list="openai-model-options" value="' + esc(settings.openAiModel || 'gpt-5.4') + '" /></label><datalist id="openai-model-options"><option value="gpt-5.4"></option><option value="gpt-5.4-mini"></option><option value="gpt-5.5"></option><option value="gpt-5.4-nano"></option></datalist><br><label>OpenAI API key<span class="ai-model-help" data-ai-openai-key-help>Saved keys stay hidden. Leave this blank to keep the current backend key.</span><input class="input" data-ai-openai-key type="password" autocomplete="off" placeholder="Leave blank to keep saved key" /></label><br><label>OpenRouter model<input class="input" data-ai-openrouter-model value="' + esc(settings.openRouterModel || 'deepseek/deepseek-chat-v3-0324:free') + '" /></label><br><label>OpenRouter API key<input class="input" data-ai-openrouter-key type="password" autocomplete="off" placeholder="Leave blank to keep saved key" /></label><br><label>DeepSeek model<input class="input" data-ai-deepseek-model value="' + esc(settings.deepSeekModel || 'deepseek-chat') + '" /></label><br><label>DeepSeek API key<input class="input" data-ai-deepseek-key type="password" autocomplete="off" placeholder="Leave blank to keep saved key" /></label></div><div><label>Notes<textarea class="textarea" data-ai-notes>' + esc(settings.notes || '') + '</textarea></label></div></div><div class="record-actions" style="margin-top:12px"><button class="primary" type="button" data-action="save-ai">Save settings</button><button type="button" data-action="ai-status">Check status</button><button type="button" data-action="test-ai">Test selected</button><button type="button" data-action="test-ai" data-ai-test-provider="openai">Test OpenAI</button><button type="button" data-action="test-ai" data-ai-test-provider="openrouter">Test OpenRouter</button><button type="button" data-action="test-ai" data-ai-test-provider="deepseek">Test DeepSeek</button></div><pre class="source-item" data-ai-result>AI backend status will appear here.</pre></div></section>';
        }
        function render() {
          state = collect();
          renderNav();
          const meta = views.find(function (view) { return view[0] === active; }) || views[0];
          title.textContent = meta[1];
          subtitle.textContent = meta[2];
          if (active === 'statistics') root.innerHTML = statistics();
          else if (active === 'approvals') root.innerHTML = approvals();
          else if (active === 'journey') root.innerHTML = journey();
          else if (active === 'completeness') root.innerHTML = completeness();
          else if (active === 'services') root.innerHTML = services();
          else if (active === 'customerActivity') root.innerHTML = customerActivity();
          else if (active === 'moderation') root.innerHTML = moderation();
          else if (active === 'analytics') root.innerHTML = analytics();
          else if (active === 'revenue') root.innerHTML = revenue();
          else if (active === 'audit') root.innerHTML = auditView();
          else if (active === 'review') root.innerHTML = review();
          else if (active === 'people') root.innerHTML = people();
          else if (active === 'content') root.innerHTML = content();
          else if (active === 'banner') root.innerHTML = bannerView();
          else if (active === 'data') root.innerHTML = dataView();
          else if (active === 'ai') { root.innerHTML = aiView(); setTimeout(aiStatus, 0); }
          else root.innerHTML = overview();
        }
        function setView(view, push) { active = views.some(function (item) { return item[0] === view; }) ? view : 'overview'; if (push) history.pushState({ view:active }, '', active === 'overview' ? 'emy-admin-backend.html' : 'emy-admin-backend.html#' + active); render(); }
        function findRecord(id) { return (state.records || []).find(function (row) { return String(row.id) === String(id); }); }
        function showToast(message) { toast.textContent = message; toast.hidden = false; clearTimeout(showToast.timer); showToast.timer = setTimeout(function () { toast.hidden = true; }, 2600); }
        function approvalNote(id) { return document.querySelector('[data-approval-note="' + CSS.escape(id) + '"]')?.value || ''; }
        function businessDecisionIdentity(row, id) {
          const record = row || {};
          const raw = record.raw || {};
          const title = record.title || raw.businessName || raw.name || localStorage.getItem('emyBusinessDisplayName') || localStorage.getItem('emyBusinessName') || 'business';
          const key = adminSlug(raw.key || raw.businessKey || record.businessKey || title || id || 'business');
          return { id:String(id || record.id || ''), key:key, title:title };
        }
        function businessReviewDecision(row, id) {
          const identity = businessDecisionIdentity(row, id);
          const decisions = readJson('emyBusinessReviewDecisions', {});
          const candidates = [identity.key, identity.id, 'business-profile-' + identity.key, 'business-profile:' + identity.key].filter(Boolean);
          for (const candidate of candidates) {
            const entry = decisions && typeof decisions === 'object' ? decisions[candidate] : null;
            if (!entry) continue;
            const status = typeof entry === 'string' ? entry : entry.status;
            if (status) return String(status).toLowerCase().trim();
          }
          const globalKey = adminSlug(localStorage.getItem('emyBusinessReviewBusinessKey') || localStorage.getItem('emyBusinessApprovalBusinessKey') || localStorage.getItem('emyBusinessApprovedBusinessKey') || localStorage.getItem('emyBusinessRejectionBusinessKey') || localStorage.getItem('emyBusinessRejectedBusinessKey') || '');
          if (globalKey && globalKey === identity.key) return String(localStorage.getItem('emyBusinessReviewStatus') || '').toLowerCase().trim();
          return '';
        }
        function saveBusinessReviewDecision(row, id, status, decidedAt) {
          const identity = businessDecisionIdentity(row, id);
          const decisions = readJson('emyBusinessReviewDecisions', {});
          const entry = {
            status:status,
            businessKey:identity.key,
            businessName:identity.title,
            rowId:identity.id || ('business-profile-' + identity.key),
            decidedAt:decidedAt || new Date().toISOString()
          };
          decisions[identity.key] = entry;
          if (identity.id) decisions[identity.id] = entry;
          decisions['business-profile-' + identity.key] = entry;
          writeJson('emyBusinessReviewDecisions', decisions);
          localStorage.setItem('emyBusinessReviewBusinessKey', identity.key);
          return entry;
        }
        function isBusinessApprovalRecord(row, id) {
          return accountKind(row || {}) === 'business' || id === 'business-profile';
        }
        function currentApproved(row, id) {
          if (isApprovedStatus(row)) return true;
          if (isBusinessApprovalRecord(row, id)) return businessReviewDecision(row, id) === 'approved';
          return false;
        }
        function currentRejected(row, id) {
          if (isRejectedStatus(row)) return true;
          const decision = businessReviewDecision(row, id);
          if (isBusinessApprovalRecord(row, id)) return decision === 'rejected' || decision === 'denied';
          return false;
        }
        function saveApprovalNote(id) {
          const value = approvalNote(id).trim();
          const notes = readJson('emyAdminApprovalNotes', {});
          const previous = String(notes[id] || '').trim();
          if (value === previous || (!value && !previous)) {
            showToast('No note changes to save.');
            render();
            return;
          }
          if (value) notes[id] = value;
          else delete notes[id];
          writeJson('emyAdminApprovalNotes', notes);
          audit(value ? 'note saved' : 'note cleared', id, value || 'Admin note cleared.');
          showToast(value ? 'Approval note saved.' : 'Approval note cleared.');
          render();
        }
        function approve(id) {
          const row = findRecord(id) || { id:id, type:'business', title:'Business profile' };
          const lockKey = 'approve:' + id;
          if (adminActionLocks.has(lockKey) || currentApproved(row, id) || currentRejected(row, id)) {
            showToast(currentApproved(row, id) ? 'This profile is already approved.' : 'A decision is already saved for this profile.');
            render();
            return;
          }
          adminActionLocks.add(lockKey);
          const decidedAt = new Date().toISOString();
          const overrides = readJson('emyAdminRowStatusOverrides', {});
          overrides[id] = 'approved';
          writeJson('emyAdminRowStatusOverrides', overrides);
          if (accountKind(row) === 'business' || id === 'business-profile') {
            const decision = saveBusinessReviewDecision(row, id, 'approved', decidedAt);
            const notification = createApprovalNotification(row);
            const email = createApprovalEmail(row);
            localStorage.setItem('emyBusinessReviewStatus', 'approved');
            localStorage.setItem('emyBusinessApprovalBusinessKey', decision.businessKey);
            localStorage.setItem('emyBusinessApprovedBusinessKey', decision.businessKey);
            localStorage.setItem('emyBusinessApprovedAt', decidedAt);
            localStorage.removeItem('emyBusinessRejectedAt');
            localStorage.setItem('emyBusinessApprovalNotificationId', notification.id);
            localStorage.setItem('emyBusinessApprovalEmailId', email.id);
          }
          audit('approved', id, approvalNote(id) || 'Business approved. Notification created and welcome email generated.');
          showToast('Business approved. Notification created and welcome email generated.');
          render();
          adminActionLocks.delete(lockKey);
        }
        function reject(id) {
          const row = findRecord(id) || { id:id, type:'business', title:'Business profile' };
          const lockKey = 'reject:' + id;
          if (adminActionLocks.has(lockKey) || currentRejected(row, id) || currentApproved(row, id)) {
            showToast(currentRejected(row, id) ? 'This profile is already rejected.' : 'A decision is already saved for this profile.');
            render();
            return;
          }
          adminActionLocks.add(lockKey);
          const decidedAt = new Date().toISOString();
          const overrides = readJson('emyAdminRowStatusOverrides', {});
          overrides[id] = 'rejected';
          writeJson('emyAdminRowStatusOverrides', overrides);
          if (accountKind(row) === 'business' || id === 'business-profile') {
            const decision = saveBusinessReviewDecision(row, id, 'rejected', decidedAt);
            const notification = createRejectionNotification(row);
            localStorage.setItem('emyBusinessReviewStatus', 'rejected');
            localStorage.setItem('emyBusinessRejectionBusinessKey', decision.businessKey);
            localStorage.setItem('emyBusinessRejectedBusinessKey', decision.businessKey);
            localStorage.setItem('emyBusinessRejectedAt', decidedAt);
            localStorage.removeItem('emyBusinessApprovedAt');
            localStorage.setItem('emyBusinessRejectionNotificationId', notification.id);
          }
          audit('rejected', id, approvalNote(id));
          showToast('Rejected and saved in the admin backend.');
          render();
          adminActionLocks.delete(lockKey);
        }
        function setRecordStatus(id, status, action) { const overrides = readJson('emyAdminRowStatusOverrides', {}); overrides[id] = status; writeJson('emyAdminRowStatusOverrides', overrides); audit(action || status, id, 'Status set to ' + status); showToast('Record marked ' + status + '.'); render(); }
        function hideRecord(id) { setRecordStatus(id, 'hidden', 'hidden from customer pages'); }
        function reportRecord(id) { setRecordStatus(id, 'reported', 'reported for review'); }
        function removeStoragePrefixes(prefixes) {
          const keys = [];
          for (let index = 0; index < localStorage.length; index += 1) {
            const key = localStorage.key(index);
            if (key && prefixes.some(function (prefix) { return key.indexOf(prefix) === 0; })) keys.push(key);
          }
          keys.forEach(function (key) { localStorage.removeItem(key); });
          return keys.length;
        }
        function removeStorageKeys(keys) {
          keys.forEach(function (key) { localStorage.removeItem(key); });
        }
        function profileRecordTitle(row) {
          return String(row && row.title || row && row.email || row && row.id || 'profile');
        }
        function businessProfileKeys(row) {
          const raw = row && row.raw || {};
          const values = [
            row && row.id,
            row && row.title,
            row && row.business,
            raw.key,
            raw.businessKey,
            raw.slug,
            raw.businessName,
            localStorage.getItem('emyBusinessName'),
            localStorage.getItem('emyBusinessDisplayName'),
            'profile'
          ];
          return values.map(adminSlug).filter(function (value, index, list) { return value && list.indexOf(value) === index; });
        }
        function removeAdminRecordState(id) {
          const overrides = readJson('emyAdminRowStatusOverrides', {});
          if (overrides && typeof overrides === 'object') {
            delete overrides[id];
            writeJson('emyAdminRowStatusOverrides', overrides);
          }
          const notes = readJson('emyAdminApprovalNotes', {});
          if (notes && typeof notes === 'object') {
            delete notes[id];
            writeJson('emyAdminApprovalNotes', notes);
          }
        }
        function removeBusinessFromCustomerLinks(keys) {
          const saved = readJson('emyCustomerBusinesses', null);
          if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
            keys.forEach(function (key) { delete saved[key]; });
            writeJson('emyCustomerBusinesses', saved);
          }
          keys.forEach(function (key) { localStorage.removeItem('emyCustomerBusiness:' + key); });
        }
        function removeBusinessFromNotifications(keys) {
          const notifications = readJson('emyCustomerNotifications', []);
          if (!Array.isArray(notifications)) return;
          const next = notifications.filter(function (item) {
            const key = adminSlug(item && (item.businessKey || item.businessName || item.business || item.title));
            return !(item && String(item.type || '').indexOf('business-review-') === 0 && keys.indexOf(key) >= 0);
          });
          if (next.length !== notifications.length) writeJson('emyCustomerNotifications', next);
        }
        function removeBusinessApprovalRows(keys) {
          const approvals = readJson('emyAdminBusinessApprovals', []);
          if (!Array.isArray(approvals)) return;
          const next = approvals.filter(function (item) {
            const key = adminSlug(item && (item.key || item.id || item.businessKey || item.name || item.title));
            return keys.indexOf(key) < 0;
          });
          if (next.length !== approvals.length) writeJson('emyAdminBusinessApprovals', next);
        }
        function removeBusinessProfile(row) {
          const keys = businessProfileKeys(row);
          removeStoragePrefixes(['emyBusiness']);
          removeStorageKeys(['emySelectedBusinessProfileKey', 'emyCurrentBusinessProfileKey', 'emySelectedBusinessKey']);
          if (String(localStorage.getItem('emyMainPendingSignupRole') || '').toLowerCase() === 'business') {
            removeStorageKeys(['emyMainPendingSignupRole', 'emyMainPendingSignupFirstName', 'emyMainPendingSignupLastName', 'emyMainPendingSignupEmail', 'emyMainPendingSignupPhone', 'emyMainPendingSignupPhoto', 'emyMainConfirmationCompleted']);
          }
          if (String(localStorage.getItem('emyMainSignedInRole') || '').toLowerCase() === 'business') {
            removeStorageKeys(['emyMainSignedInRole', 'emyMainSignedInEmail']);
          }
          removeBusinessFromCustomerLinks(keys);
          removeBusinessFromNotifications(keys);
          removeBusinessApprovalRows(keys);
        }
        function removeCustomerProfile(row) {
          removeStoragePrefixes(['emyCustomer', 'emySaved', 'emyAsk', 'emySearchHistory', 'emyNoResultSearches']);
          if (String(localStorage.getItem('emyMainPendingSignupRole') || '').toLowerCase() !== 'business') {
            removeStorageKeys(['emyMainPendingSignupRole', 'emyMainPendingSignupFirstName', 'emyMainPendingSignupLastName', 'emyMainPendingSignupEmail', 'emyMainPendingSignupPhone', 'emyMainPendingSignupPhoto', 'emyMainConfirmationCompleted']);
          }
          if (String(localStorage.getItem('emyMainSignedInRole') || '').toLowerCase() !== 'business') {
            removeStorageKeys(['emyMainSignedInRole', 'emyMainSignedInEmail', 'emyMainSignedOut']);
          }
        }
        function showRemoveProfileConfirm(id) {
          const row = findRecord(id);
          if (!row) return;
          const kind = profileAccountKind(row);
          if (kind !== 'customer' && kind !== 'business') return;
          const titleText = profileRecordTitle(row);
          modalTitle.textContent = kind === 'business' ? 'Delete business profile?' : 'Delete customer profile?';
          modalBody.innerHTML = '<div class="source-item"><b>' + esc(titleText) + '</b><span>' + (kind === 'business' ? 'This removes the business profile, business review state, products, posts, clips, jobs, events, and business media references. The customer account is not deleted.' : 'This removes the customer profile, customer session, saved places, saved businesses, notifications, and customer activity. Business profiles are not deleted.') + '</span><span>This cannot be undone from the local backend.</span></div><div class="record-actions"><button type="button" data-cancel-remove-profile>Cancel</button><button class="danger" type="button" data-confirm-remove-profile="' + esc(id) + '">' + recordIcon('delete') + 'Delete ' + esc(kind) + '</button></div>';
          modal.hidden = false;
        }
        function removeProfileRecord(id) {
          const row = findRecord(id);
          if (!row) return;
          const kind = profileAccountKind(row);
          if (kind !== 'customer' && kind !== 'business') return;
          const titleText = profileRecordTitle(row);
          audit('deleted ' + kind + ' profile', id, titleText + ' removed from backend storage.');
          if (kind === 'business') removeBusinessProfile(row);
          if (kind === 'customer') removeCustomerProfile(row);
          removeAdminRecordState(id);
          modal.hidden = true;
          showToast((kind === 'business' ? 'Business profile' : 'Customer profile') + ' deleted from backend storage.');
          render();
        }
        function details(id) {
          const row = findRecord(id); if (!row) return;
          modalTitle.textContent = row.title || 'Record details';
          const fields = Object.keys(row).filter(function (key) { return key !== 'raw' && row[key] != null && String(row[key]).trim() !== ''; });
          const hero = '<div class="detail-hero"><div class="detail-hero-media">' + mediaInner(row, 'detail-hero-media') + '</div><div class="detail-hero-copy"><span>' + accountBadge(row) + '</span><h3>' + esc(row.title || row.email || 'Record details') + '</h3><p>' + esc([row.email, row.phone, row.business, row.message, row.price, row.source].filter(Boolean).join(' | ') || 'EMY saved record') + '</p><div class="record-meta"><span class="tag">' + esc(row.type || 'record') + '</span>' + statusTag(row.status) + '</div></div></div>';
          modalBody.innerHTML = hero + '<div class="detail-grid">' + fields.map(function (key) { return '<div class="detail"><b>' + esc(key) + '</b><span>' + fieldDisplayMarkup(key, row[key]) + '</span></div>'; }).join('') + '</div><details class="raw-block"><summary>Raw JSON</summary><textarea class="textarea" readonly>' + esc(JSON.stringify(row.raw || row, null, 2)) + '</textarea></details>';
          modal.hidden = false;
        }
        function applySectionSearch(input) {
          const scope = input && input.closest('[data-section-search-scope]');
          if (!scope) return;
          const query = String(input.value || '').toLowerCase().trim();
          const items = Array.from(scope.querySelectorAll('[data-section-search-item]'));
          let visible = 0;
          items.forEach(function (item) {
            const text = String(item.dataset.searchText || item.textContent || '').toLowerCase();
            const match = !query || text.indexOf(query) >= 0;
            item.hidden = !match;
            if (match) visible += 1;
          });
          scope.querySelectorAll('[data-section-group]').forEach(function (group) {
            const groupItems = Array.from(group.querySelectorAll('[data-section-search-item]'));
            const groupVisible = groupItems.filter(function (item) { return !item.hidden; }).length;
            const count = group.querySelector('[data-group-count]');
            if (count) count.textContent = String(groupVisible);
            group.hidden = query && groupVisible === 0;
          });
          const result = scope.querySelector('[data-section-search-result]');
          if (result) result.textContent = query ? (visible + ' of ' + items.length + ' matching') : (items.length + ' total');
          const empty = scope.querySelector('[data-section-empty-search]');
          if (empty) empty.hidden = visible !== 0;
        }
        function serviceProfileField(selector) {
          return cleanText(document.querySelector(selector)?.value || '');
        }
        function saveServiceProfile() {
          const name = serviceProfileField('[data-service-profile-name]');
          const serviceTitle = serviceProfileField('[data-service-profile-service]');
          if (!name || !serviceTitle) {
            showToast('Add a business name and service.');
            return;
          }
          const category = serviceProfileField('[data-service-profile-category]') || adminServiceCategory(serviceTitle);
          const identity = adminSlug(name + '-' + serviceTitle);
          const rows = asArray(readJson('emyAdminServiceProfiles', []));
          const existing = rows.find(function (row) {
            return adminSlug(firstText([row.businessName, row.name, row.title, row.business]) + '-' + firstText([row.serviceTitle, row.emyService, row.service, row.providedService])) === identity;
          });
          const record = Object.assign({}, existing || {}, {
            id:(existing && existing.id) || 'service-profile-' + identity + '-' + Date.now(),
            businessName:name,
            name:name,
            title:name,
            serviceTitle:serviceTitle,
            emyService:serviceTitle,
            service:serviceTitle,
            providedService:serviceTitle,
            category:category,
            emyServiceCategory:category,
            serviceCategory:category,
            location:serviceProfileField('[data-service-profile-location]'),
            email:serviceProfileField('[data-service-profile-email]'),
            phone:serviceProfileField('[data-service-profile-phone]'),
            profileHref:serviceProfileField('[data-service-profile-link]'),
            status:serviceProfileField('[data-service-profile-status]') || 'active',
            description:serviceProfileField('[data-service-profile-description]'),
            source:'Admin backend',
            updatedAt:new Date().toISOString()
          });
          if (!record.createdAt) record.createdAt = record.updatedAt;
          const next = existing ? rows.map(function (row) { return row === existing ? record : row; }) : [record].concat(rows);
          writeJson('emyAdminServiceProfiles', next.slice(0, 200));
          audit(existing ? 'service profile updated' : 'service profile added', record.id, name + ' - ' + serviceTitle);
          showToast('Service profile saved.');
          render();
        }
        function removeServiceProfile(id) {
          const rows = asArray(readJson('emyAdminServiceProfiles', []));
          const row = rows.find(function (item) { return String(item.id || '') === String(id || ''); });
          const next = rows.filter(function (item) { return String(item.id || '') !== String(id || ''); });
          writeJson('emyAdminServiceProfiles', next);
          audit('service profile removed', id, row ? firstText([row.businessName, row.name, row.title]) : 'Service profile removed');
          showToast('Service profile removed.');
          render();
        }
        function snapshot() { const snapshots = readJson('emyAdminSnapshots', []); snapshots.unshift({ id:'snapshot-' + Date.now(), createdAt:new Date().toISOString(), data:storageRows() }); writeJson('emyAdminSnapshots', snapshots.slice(0, 20)); showToast('Snapshot saved.'); }
        function exportData() { const data = document.querySelector('[data-data-json]')?.value || JSON.stringify(storageRows(), null, 2); const blob = new Blob([data], { type:'application/json' }); const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = 'emy-admin-backend-data.json'; link.click(); URL.revokeObjectURL(url); }
        function apiCandidates(path) { return [location.origin + path, path, 'http://127.0.0.1:8779' + path, 'http://127.0.0.1:8767' + path]; }
        function renderAiStatus(json) {
          const target = document.querySelector('[data-ai-result]');
          const status = document.querySelector('[data-ai-status-card]');
          const openAiInput = document.querySelector('[data-ai-openai-key]');
          const openAiHelp = document.querySelector('[data-ai-openai-key-help]');
          const openAiSaved = !!json.openAiConfigured;
          const openRouterSaved = !!json.openRouterConfigured;
          const deepSeekSaved = !!json.deepSeekConfigured;
          if (openAiInput && openAiSaved) openAiInput.placeholder = 'OpenAI key saved - leave blank to keep it';
          if (openAiHelp) openAiHelp.textContent = openAiSaved ? 'OpenAI key is saved on the local backend. It is hidden here on purpose; leave blank to keep it.' : 'No OpenAI key is saved yet. Paste a key here only when you want to replace the backend key.';
          if (status) {
            status.innerHTML =
              '<article class="ai-status-card"><b>Selected provider</b><span>' + esc(json.provider || 'local-fallback') + '</span><em class="ai-status-pill ' + (json.provider === 'local-fallback' ? 'warn' : 'good') + '">' + esc(json.provider === 'local-fallback' ? 'Fallback' : 'Connected') + '</em></article>' +
              '<article class="ai-status-card"><b>OpenAI</b><span>' + esc(openAiSaved ? 'Key saved on backend' : 'No key saved') + '</span><em class="ai-status-pill ' + (openAiSaved ? 'good' : 'warn') + '">' + esc(openAiSaved ? 'Saved' : 'Missing') + '</em></article>' +
              '<article class="ai-status-card"><b>OpenAI model</b><span>' + esc(json.openAiModel || 'gpt-5.4') + '</span><em class="ai-status-pill">Active model</em></article>' +
              '<article class="ai-status-card"><b>Other providers</b><span>OpenRouter: ' + esc(openRouterSaved ? 'saved' : 'not saved') + '<br>DeepSeek: ' + esc(deepSeekSaved ? 'saved' : 'not saved') + '</span><em class="ai-status-pill">Optional</em></article>';
          }
          if (target) {
            target.textContent = [
              'Provider: ' + (json.provider || 'local-fallback'),
              'OpenAI key: ' + (openAiSaved ? 'saved on backend' : 'not saved'),
              'OpenAI model: ' + (json.openAiModel || 'gpt-5.4'),
              'OpenRouter key: ' + (openRouterSaved ? 'saved' : 'not saved'),
              'DeepSeek key: ' + (deepSeekSaved ? 'saved' : 'not saved')
            ].join('\\n');
          }
        }
        async function aiStatus() { const target = document.querySelector('[data-ai-result]'); if (target) target.textContent = 'Checking...'; for (const endpoint of apiCandidates('/api/ask-emy/status')) { try { const response = await fetch(endpoint); const json = await response.json(); renderAiStatus(json); return; } catch (error) {} } if (target) target.textContent = 'Ask EMY backend is not reachable.'; }
        async function saveAi() { const settings = { provider:document.querySelector('[data-ai-provider]')?.value || 'openai', model:document.querySelector('[data-ai-openai-model]')?.value || 'gpt-5.4', openAiModel:document.querySelector('[data-ai-openai-model]')?.value || 'gpt-5.4', openRouterModel:document.querySelector('[data-ai-openrouter-model]')?.value || 'deepseek/deepseek-chat-v3-0324:free', deepSeekModel:document.querySelector('[data-ai-deepseek-model]')?.value || 'deepseek-chat', openAiApiKey:document.querySelector('[data-ai-openai-key]')?.value || '', openRouterApiKey:document.querySelector('[data-ai-openrouter-key]')?.value || '', deepSeekApiKey:document.querySelector('[data-ai-deepseek-key]')?.value || '', notes:document.querySelector('[data-ai-notes]')?.value || '' }; writeJson('emyAdminAiSettings', { provider:settings.provider, model:settings.model, openAiModel:settings.openAiModel, openRouterModel:settings.openRouterModel, deepSeekModel:settings.deepSeekModel, notes:settings.notes }); const target = document.querySelector('[data-ai-result]'); for (const endpoint of apiCandidates('/api/admin/ai-settings')) { try { const response = await fetch(endpoint, { method:'POST', headers:{ 'Content-Type':'application/json' }, body:JSON.stringify(settings) }); const json = await response.json(); renderAiStatus(json); return; } catch (error) {} } if (target) target.textContent = 'Saved locally. Backend endpoint was not reachable.'; }
        async function testAi(providerOverride) { const target = document.querySelector('[data-ai-result]'); const provider = providerOverride || document.querySelector('[data-ai-provider]')?.value || ''; if (target) target.textContent = 'Testing Ask EMY' + (provider ? ' with ' + provider : '') + '...'; for (const endpoint of apiCandidates('/api/ask-emy')) { try { const response = await fetch(endpoint, { method:'POST', headers:{ 'Content-Type':'application/json' }, body:JSON.stringify({ query:'show connected EMY admin records', location:'Admin', radius:'all', providerOverride:provider }) }); const json = await response.json(); if (target) target.textContent = JSON.stringify(json, null, 2); return; } catch (error) {} } if (target) target.textContent = 'Ask EMY backend is not reachable.'; }
        document.addEventListener('click', function (event) {
          const viewButton = event.target.closest('[data-view]'); if (viewButton) { setView(viewButton.dataset.view, true); return; }
          if (event.target.closest('[data-close]') || event.target === modal) { modal.hidden = true; return; }
          const button = event.target.closest('button'); if (!button) return;
          if (button.dataset.cancelRemoveProfile !== undefined) { modal.hidden = true; return; }
          if (button.dataset.confirmRemoveProfile) { removeProfileRecord(button.dataset.confirmRemoveProfile); return; }
          if (button.dataset.removeProfile) { showRemoveProfileConfirm(button.dataset.removeProfile); return; }
          if (button.dataset.serviceProfileRemove) { removeServiceProfile(button.dataset.serviceProfileRemove); return; }
          if (button.dataset.bannerRemoveMedia) { removeBannerMedia(button.dataset.bannerRemoveMedia); return; }
          if (button.dataset.rowView) details(button.dataset.rowView);
          if (button.dataset.approve) approve(button.dataset.approve);
          if (button.dataset.reject) reject(button.dataset.reject);
          if (button.dataset.hide) hideRecord(button.dataset.hide);
          if (button.dataset.report) reportRecord(button.dataset.report);
          if (button.dataset.saveNote) saveApprovalNote(button.dataset.saveNote);
          if (button.dataset.action === 'refresh') render();
          if (button.dataset.action === 'snapshot') snapshot();
          if (button.dataset.action === 'export') exportData();
          if (button.dataset.action === 'save-service-profile') saveServiceProfile();
          if (button.dataset.action === 'ai-status') aiStatus();
          if (button.dataset.action === 'save-ai') saveAi();
          if (button.dataset.action === 'test-ai') testAi(button.dataset.aiTestProvider || '');
          if (button.dataset.action === 'save-banner') saveBanner();
          if (button.dataset.action === 'reset-banner') resetBanner();
          if (button.dataset.action === 'clear-banner-media') clearBannerMedia();
          if (button.dataset.action === 'media-migration-scan') runMediaMigration(true);
          if (button.dataset.action === 'media-migration-run') runMediaMigration(false);
        });
        document.addEventListener('input', function (event) {
          const sectionSearch = event.target.closest('[data-section-search]');
          if (sectionSearch) {
            applySectionSearch(sectionSearch);
            return;
          }
          const note = event.target.closest('[data-approval-note]');
          if (!note) return;
          const id = note.dataset.approvalNote;
          const button = document.querySelector('[data-save-note="' + CSS.escape(id) + '"]');
          if (!button) return;
          const saved = String(button.dataset.savedNote || '').trim();
          const current = String(note.value || '').trim();
          const canSave = current !== saved && !!(current || saved);
          button.disabled = !canSave;
          button.setAttribute('aria-disabled', canSave ? 'false' : 'true');
          button.innerHTML = recordIcon('save') + (!canSave && saved ? 'Note saved' : 'Save note');
        });
        document.addEventListener('change', function (event) {
          const input = event.target.closest('[data-banner-file]');
          if (!input) return;
          const files = Array.from(input.files || []);
          if (!files.length) return;
          const invalid = files.find(function (file) { return !file.type || (file.type.indexOf('image/') !== 0 && file.type.indexOf('video/') !== 0); });
          if (invalid) {
            showToast('Choose only images or videos for the home banner.');
            input.value = '';
            return;
          }
          const reads = files.map(function (file) {
            return new Promise(function (resolve, reject) {
              const reader = new FileReader();
              reader.addEventListener('load', function () {
                resolve({
                  id:'banner-media-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
                  src:String(reader.result || ''),
                  type:file.type.indexOf('video/') === 0 ? 'video' : 'image',
                  name:file.name || 'banner media',
                  savedAt:new Date().toISOString()
                });
              });
              reader.addEventListener('error', reject);
              reader.readAsDataURL(file);
            });
          });
          Promise.all(reads).then(function (mediaItems) {
            const next = bannerFormValue();
            next.mediaItems = bannerMediaItems(next).concat(mediaItems).slice(0, 12);
            syncBannerPrimaryMedia(next);
            next.savedAt = new Date().toISOString();
            try {
              writeJson('emyAdminHomeBanner', next);
              audit('home banner media saved', 'home-banner', mediaItems.length + ' media item(s)');
              showToast(mediaItems.length + ' banner media item' + (mediaItems.length === 1 ? '' : 's') + ' saved.');
              render();
            } catch (error) {
              showToast('This media is too large for local browser storage. Try shorter videos or smaller images.');
            }
          }).catch(function () {
            showToast('EMY could not read that banner media file.');
          });
          input.value = '';
        });
        window.addEventListener('hashchange', function () { setView(initialView(), false); });
        window.addEventListener('popstate', function () { setView(initialView(), false); });
        searchInput.addEventListener('input', render);
        filterInput.addEventListener('change', render);
        render();
      })();
    </script>
  </body>
</html>`;
}

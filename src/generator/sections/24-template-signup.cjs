/* EMY generator section: 24-template-signup.cjs (source lines 31031-32459) */
function emySignupPageTemplate() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>EMY | Sign Up</title>
    <script src="auth-config.js"></script>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
      :root {
        --emy-navy: #001b47;
        --emy-orange: #ff6a00;
        --emy-cream: #fff8ef;
        --emy-muted: #7c7388;
      }
      * { box-sizing: border-box; }
      html, body { margin: 0; min-height: 100%; background: var(--emy-cream); color: var(--emy-navy); font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      body { min-height: 100vh; overflow-x: hidden; overflow-y: auto; }
      button, input, select { font: inherit; }
      a { color: inherit; }
      .page { position: relative; min-height: 100dvh; overflow-x: hidden; overflow-y: visible; background: radial-gradient(circle at 76% 8%, rgba(255,106,0,.13), transparent 17rem), radial-gradient(circle at 20% 92%, rgba(255,106,0,.08), transparent 16rem), linear-gradient(180deg, #fff8ef 0%, #fffdf8 58%, #fff7ed 100%); }
      .marks { pointer-events: none; position: absolute; inset: 0; overflow: hidden; color: rgba(255,106,0,.18); }
      .mark-top { position: absolute; right: clamp(18px, 16vw, 290px); top: -22px; width: 168px; height: 168px; }
      .mark-bottom { position: absolute; left: -28px; bottom: -24px; width: 260px; height: 170px; }
      .back { position: fixed; left: 22px; top: 18px; z-index: 5; border: 0; background: rgba(255,255,255,.70); color: var(--emy-navy); cursor: pointer; border-radius: 999px; padding: 8px 13px; font-size: 13px; font-weight: 760; box-shadow: 0 8px 20px rgba(0,27,71,.07); }
      .back:hover { color: var(--emy-orange); background: white; }
      .wrap { position: relative; z-index: 2; width: min(100%, 438px); min-height: 100dvh; margin: 0 auto; padding: 30px 18px 26px; display: flex; flex-direction: column; }
      h1 { margin: 0; text-align: center; font-size: 32px; line-height: 1.08; letter-spacing: 0; font-weight: 760; color: #171435; }
      .subtitle { margin: 8px auto 0; text-align: center; color: var(--emy-muted); font-size: 13px; line-height: 1.45; font-weight: 500; max-width: 330px; }
      .role-badge { margin: 11px auto 0; display: flex; width: fit-content; align-items: center; border: 1px solid rgba(255,106,0,.22); border-radius: 999px; background: #fff4e8; color: #d95600; padding: 6px 13px; font-size: 10.5px; font-weight: 760; letter-spacing: 0; text-transform: uppercase; }
      .form-shell { width: 100%; }
      .left-rail { width: 100%; margin-top: 16px; display: flex; flex-direction: column; align-items: center; gap: 14px; }
      .photo-area { display: flex; height: 94px; width: 100%; align-items: center; justify-content: center; }
      .photo-button { position: relative; display: block; flex: 0 0 auto; height: 88px; width: 88px; border: 1.5px solid rgba(0,27,71,.20); border-radius: 999px; padding: 0; cursor: pointer; background: #fff; box-shadow: 0 14px 28px rgba(0,27,71,.10); }
      .photo-button.needs-photo { border-color: #b42318; box-shadow: 0 0 0 3px rgba(180,35,24,.10), 0 14px 28px rgba(0,27,71,.10); }
      .photo-button img, .avatar-fallback { position: absolute; inset: 3px; height: calc(100% - 6px); width: calc(100% - 6px); border-radius: 999px; display: grid; place-items: center; object-fit: cover; overflow: hidden; background: #fffaf5; }
      .photo-button img[hidden], .avatar-fallback[hidden] { display: none; }
      .avatar-fallback svg { width: 72px; height: 72px; }
      .camera { position: absolute; right: -3px; bottom: 6px; height: 24px; width: 24px; border-radius: 999px; display: grid; place-items: center; background: var(--emy-orange); color: white; border: 3px solid var(--emy-cream); box-shadow: 0 6px 14px rgba(255,106,0,.28); }
      .camera svg { width: 12px; height: 12px; }
      .photo-required { margin: -8px 0 0; color: #5f5967; font-size: 11.5px; line-height: 1.2; font-weight: 600; }
      .photo-required span { color: var(--emy-orange); }
      .photo-adjust { height: 28px; margin-top: -8px; border: 1px solid rgba(0,27,71,.10); border-radius: 999px; background: rgba(255,255,255,.82); color: var(--emy-navy); cursor: pointer; padding: 0 12px; font-size: 12px; font-weight: 500; }
      .photo-adjust:hover { background: white; }
      .photo-remove { height: 28px; margin-top: -8px; border: 1px solid rgba(180,35,24,.12); border-radius: 999px; background: #fff4f2; color: #b42318; cursor: pointer; padding: 0 12px; font-size: 12px; font-weight: 500; }
      .photo-remove[hidden], .photo-adjust[hidden] { display: none; }
      .segmented { display: grid; grid-template-columns: 1fr 1fr; width: min(100%, 258px); height: 40px; overflow: hidden; border: 1px solid #d8d1cc; border-radius: 8px; background: white; box-shadow: 0 8px 18px rgba(0,27,71,.05); }
      .segmented button { border: 0; background: white; color: #736d7b; cursor: pointer; font-size: 13px; font-weight: 600; }
      .segmented button + button { border-left: 1px solid #d8d1cc; }
      .segmented button.active,
      .segmented button[aria-pressed="true"] { background: var(--emy-orange); color: white; }
      form { margin-top: 15px; }
      .grid-two { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
      .field { display: block; margin-top: 10px; color: #261548; font-size: 12px; font-weight: 760; }
      .field span { color: var(--emy-orange); }
      .control { position: relative; margin-top: 5px; }
      input {
        width: 100%; height: 40px; border: 1px solid #d6d0cc; border-radius: 7px; background: white; color: var(--emy-navy); padding: 0 12px; outline: none; font-size: 13px; font-weight: 500;
      }
      input::placeholder { color: #9b95a2; }
      input:focus { border-color: var(--emy-orange); box-shadow: 0 0 0 3px rgba(255,106,0,.10); }
      .phone-row { position: relative; display: flex; overflow: visible; }
      .phone-row input { border-radius: 0 7px 7px 0; }
      .dial-select { position: relative; flex: 0 0 104px; }
      .dial-button { width: 104px; height: 40px; border: 1px solid #d6d0cc; border-right: 0; border-radius: 7px 0 0 7px; background: white; color: var(--emy-navy); cursor: pointer; display: flex; align-items: center; justify-content: space-between; gap: 6px; padding: 0 9px; font-size: 12.5px; font-weight: 650; }
      .dial-button:hover, .dial-button[aria-expanded="true"] { border-color: rgba(255,106,0,.42); background: #fffaf5; }
      .dial-button:focus-visible { outline: none; box-shadow: 0 0 0 3px rgba(255,106,0,.10); }
      .dial-chevron { color: var(--emy-orange); font-size: 11px; line-height: 1; transition: transform .18s ease; }
      .dial-button[aria-expanded="true"] .dial-chevron { transform: rotate(180deg); }
      .dial-menu { position: absolute; left: 0; top: calc(100% + 7px); z-index: 40; width: min(292px, calc(100vw - 40px)); border: 1px solid rgba(0,27,71,.10); border-radius: 10px; background: white; padding: 8px; box-shadow: 0 12px 26px rgba(0,27,71,.12); }
      .dial-menu[hidden] { display: none; }
      .dial-search { height: 34px !important; border-radius: 8px !important; padding: 0 10px !important; font-size: 12.5px !important; font-weight: 500 !important; background: #fffdf8 !important; }
      .dial-options { display: block; max-height: 196px; overflow: auto; margin-top: 6px; padding-right: 2px; }
      .dial-option { width: 100%; min-height: 34px; border: 0; border-radius: 8px; background: transparent; color: var(--emy-navy); cursor: pointer; display: grid; grid-template-columns: 56px minmax(0, 1fr) 32px; align-items: center; gap: 8px; padding: 6px 8px; text-align: left; font-size: 12.5px; font-weight: 560; }
      .dial-option:hover, .dial-option:focus-visible { outline: none; background: #fff8f1; }
      .dial-option.is-selected { background: #fff4e8; color: #d95600; box-shadow: inset 2px 0 0 var(--emy-orange); }
      .dial-code { font-weight: 700; }
      .dial-name { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: inherit; opacity: .82; }
      .dial-iso { justify-self: end; color: inherit; opacity: .66; font-size: 11px; font-weight: 700; }
      .dial-empty { display: block; padding: 12px 8px 6px; color: #8a8396; font-size: 12px; font-weight: 500; text-align: center; }
      .dial-empty[hidden] { display: none; }
      .password-toggle { position: absolute; right: 9px; top: 50%; transform: translateY(-50%); height: 30px; width: 30px; border: 0; border-radius: 999px; background: transparent; color: var(--emy-orange); cursor: pointer; display: grid; place-items: center; }
      .password-toggle svg { display: block; height: 18px; width: 18px; }
      .password-toggle::after { content: ""; position: absolute; width: 19px; height: 2px; border-radius: 999px; background: currentColor; transform: rotate(-42deg) scaleX(1); transition: transform .18s ease; }
      .password-toggle.is-visible::after { transform: rotate(-42deg) scaleX(0); }
      .agreement { margin-top: 12px; display: flex; align-items: center; gap: 8px; color: #5f5967; font-size: 12px; line-height: 1.35; font-weight: 500; }
      .agreement input { height: 15px; width: 15px; accent-color: var(--emy-orange); flex: 0 0 auto; }
      .agreement a { color: var(--emy-orange); font-weight: 700; text-decoration: none; }
      .status { min-height: 16px; margin: 7px 0 0; color: #b42318; font-size: 12px; font-weight: 650; }
      .primary { margin-top: 8px; height: 48px; width: 100%; border: 0; border-radius: 11px; background: var(--emy-orange); color: white; cursor: pointer; font-size: 15px; font-weight: 760; box-shadow: 0 12px 24px rgba(255,106,0,.20); }
      .primary:hover { background: #f05f00; }
      .social-title { margin: 13px 0 9px; text-align: center; color: var(--emy-navy); font-size: 12px; font-weight: 500; }
      .social-row { display: flex; justify-content: center; gap: 16px; }
      .social { height: 42px; width: 42px; border: 0; border-radius: 999px; background: white; cursor: pointer; display: grid; place-items: center; box-shadow: 0 10px 22px rgba(0,27,71,.09); }
      .social svg { max-width: 25px; max-height: 25px; }
      .switch { margin: 12px 0 0; text-align: center; color: #8a8396; font-size: 12px; font-weight: 500; }
      .switch button { border: 0; background: transparent; color: var(--emy-orange); cursor: pointer; font-weight: 760; }
      .sheet-overlay { position: fixed; inset: 0; z-index: 50; display: none; align-items: center; justify-content: center; background: rgba(0,27,71,.38); padding: 18px; }
      .sheet-overlay.is-open { display: flex; }
      .photo-sheet, .camera-sheet, .crop-card { width: min(100%, 430px); border-radius: 8px; background: #fffdfa; box-shadow: 0 20px 46px rgba(0,27,71,.18); padding: 18px; }
      .photo-sheet h2, .camera-sheet h2, .crop-card h2 { margin: 0; text-align: center; color: #171435; font-size: 18px; line-height: 1.2; font-weight: 650; }
      .photo-sheet p, .camera-sheet p, .crop-help { margin: 8px auto 0; max-width: 330px; text-align: center; color: #61708c; font-size: 12px; line-height: 1.45; font-weight: 400; }
      .source-actions { margin-top: 16px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
      .source-actions button { min-height: 74px; border: 1px solid #ded7d1; border-radius: 6px; background: white; color: var(--emy-navy); cursor: pointer; display: grid; place-items: center; gap: 5px; padding: 10px; font-size: 13px; font-weight: 600; }
      .source-actions button:hover { border-color: rgba(255,106,0,.38); background: #fff4e8; }
      .source-actions strong { font-size: 15px; font-weight: 650; }
      .source-actions span { color: #61708c; font-size: 11px; line-height: 1.35; font-weight: 400; }
      .sheet-close { display: block; height: 34px; margin: 14px auto 0; border: 1px solid rgba(0,27,71,.10); border-radius: 999px; background: white; color: var(--emy-navy); cursor: pointer; padding: 0 16px; font-size: 12px; font-weight: 600; }
      .camera-preview-frame { position: relative; margin-top: 14px; width: 100%; aspect-ratio: 4 / 3; border: 1px solid rgba(0,27,71,.10); border-radius: 8px; background: #101828; overflow: hidden; }
      .camera-preview-frame .camera-preview { margin: 0; width: 100%; height: 100%; border: 0; border-radius: 0; background: #101828; object-fit: cover; object-position: center; display: block; }
      .camera-preview-frame.is-profile-camera::before {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 2;
        width: min(66%, 230px);
        aspect-ratio: 1;
        border-radius: 999px;
        border: 2px solid rgba(255,255,255,.94);
        background: rgba(255,255,255,.06);
        box-shadow: inset 0 0 24px rgba(255,255,255,.20), 0 12px 26px rgba(0,27,71,.16);
        transform: translate(-50%, -50%);
        pointer-events: none;
      }
      .camera-preview-frame.is-profile-camera::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 3;
        width: min(66%, 230px);
        aspect-ratio: 1;
        border-radius: 999px;
        outline: 1px solid rgba(0,27,71,.20);
        transform: translate(-50%, -50%);
        pointer-events: none;
      }
      .cover-type-overlay.is-cover-camera .camera-sheet { width: min(100%, 560px); }
      .cover-type-overlay.is-cover-camera .camera-preview-frame { aspect-ratio: 16 / 9; }
      .cover-type-overlay.is-cover-camera .camera-preview-frame::before, .cover-type-overlay.is-cover-camera .camera-preview-frame::after { display: none; }
      .camera-status { min-height: 17px; color: #9a4b00 !important; }
      .camera-actions { margin-top: 14px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
      .camera-actions button, .crop-actions button { height: 40px; border-radius: 5px; cursor: pointer; padding: 0 12px; font-size: 13px; font-weight: 600; }
      .camera-actions button:first-child, .crop-cancel { border: 1px solid rgba(0,27,71,.12); background: white; color: var(--emy-navy); }
      .camera-actions button:last-child, .crop-apply { border: 0; background: var(--emy-orange); color: white; }
      .crop-modal { z-index: 60; background: rgba(0,27,71,.58); }
      .crop-change { display: block; width: fit-content; height: 32px; margin: 10px auto 0; border: 1px solid rgba(255,106,0,.28); border-radius: 999px; background: #fff4e8; color: var(--emy-navy); cursor: pointer; padding: 0 14px; font-size: 12px; font-weight: 600; }
      .crop-change:hover { background: var(--emy-orange); color: white; }
      .crop-frame { position: relative; width: min(72vw, 270px); height: min(72vw, 270px); margin: 16px auto 0; overflow: hidden; border: 1px solid rgba(0,27,71,.10); border-radius: 999px; background: #f0ece7; cursor: grab; touch-action: none; user-select: none; }
      .crop-frame.is-dragging { cursor: grabbing; }
      .crop-frame::after { content: ""; position: absolute; inset: 0; z-index: 3; border-radius: 999px; pointer-events: none; box-shadow: inset 0 0 0 2px rgba(255,255,255,.95), inset 0 0 0 3px rgba(255,106,0,.45); }
      .crop-frame img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transform-origin: center; will-change: left, top, width, height; }
      .crop-controls { margin-top: 14px; display: grid; gap: 10px; }
      .crop-controls label { display: grid; grid-template-columns: 76px 1fr; align-items: center; gap: 10px; color: #173057; font-size: 12px; font-weight: 500; }
      .crop-controls input { height: auto; accent-color: var(--emy-orange); padding: 0; }
      .crop-controls input[type="range"] { appearance: none; height: 18px; background: transparent; }
      .crop-controls input[type="range"]::-webkit-slider-runnable-track { height: 5px; border-radius: 999px; background: linear-gradient(90deg, var(--emy-orange), #3f4148); }
      .crop-controls input[type="range"]::-webkit-slider-thumb { appearance: none; height: 18px; width: 18px; margin-top: -6.5px; border: 2px solid #fff8ef; border-radius: 999px; background: var(--emy-orange); box-shadow: 0 2px 7px rgba(0,27,71,.18); cursor: pointer; }
      .crop-controls input[type="range"]::-moz-range-track { height: 5px; border-radius: 999px; background: linear-gradient(90deg, var(--emy-orange), #3f4148); }
      .crop-controls input[type="range"]::-moz-range-thumb { height: 16px; width: 16px; border: 2px solid #fff8ef; border-radius: 999px; background: var(--emy-orange); box-shadow: 0 2px 7px rgba(0,27,71,.18); cursor: pointer; }
      .crop-actions { margin-top: 16px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
      .registration-leave-modal { position: fixed; inset: 0; z-index: 180; display: none; align-items: center; justify-content: center; padding: 18px; background: rgba(0,27,71,.54); backdrop-filter: blur(8px); }
      .registration-leave-modal.is-open { display: flex; }
      .registration-leave-card { width: min(100%, 430px); border: 1px solid rgba(255,255,255,.68); border-radius: 14px; background: linear-gradient(145deg, #fffefa, #fff7ed); color: var(--emy-navy); padding: 20px; box-shadow: 0 26px 70px rgba(0,27,71,.24), inset 0 1px 0 rgba(255,255,255,.86); }
      .registration-leave-mark { width: 42px; height: 42px; display: grid; place-items: center; border-radius: 12px; background: #fff4e8; color: var(--emy-orange); font-size: 24px; font-weight: 900; }
      .registration-leave-card h2 { margin: 14px 0 0; color: var(--emy-navy); font-size: 22px; line-height: 1.16; font-weight: 800; letter-spacing: 0; }
      .registration-leave-card p { margin: 9px 0 0; color: #61708c; font-size: 13px; line-height: 1.45; font-weight: 560; }
      .registration-leave-actions { display: grid; grid-template-columns: 1fr; gap: 10px; margin-top: 18px; }
      .registration-leave-actions button { min-height: 44px; border-radius: 999px; cursor: pointer; padding: 0 16px; font: inherit; font-size: 13px; font-weight: 780; }
      .registration-leave-continue { border: 0; background: var(--emy-orange); color: white; box-shadow: 0 12px 24px rgba(255,106,0,.18); }
      .registration-leave-delete { border: 1px solid rgba(180,35,24,.18); background: #fff; color: #b42318; }
      @media (max-height: 760px) and (min-width: 620px) {
        .wrap { width: min(100%, 424px); padding-top: 18px; padding-bottom: 22px; }
        .left-rail { margin-top: 10px; gap: 10px; }
        .photo-area { height: 82px; }
        .photo-button { height: 78px; width: 78px; }
        .photo-button img, .avatar-fallback { height: calc(100% - 4px); width: calc(100% - 4px); }
        .avatar-fallback svg { width: 64px; height: 64px; }
        .camera { bottom: 5px; }
        .segmented { width: min(100%, 242px); height: 38px; }
        h1 { font-size: 30px; }
        .subtitle { margin-top: 6px; }
        .role-badge { margin-top: 8px; padding: 5px 11px; }
        form { margin-top: 10px; }
        input { height: 37px; }
        .dial-button { height: 37px; }
        .field { margin-top: 8px; }
        .primary { height: 43px; }
        .social-title { margin-top: 8px; }
        .switch { margin-top: 8px; }
      }
      @media (max-width: 520px) {
        body { overflow-y: auto; }
        .page { overflow: visible; }
        .wrap { min-height: auto; padding: 22px 14px 28px; }
        .back { left: 12px; top: 12px; }
        h1 { font-size: 30px; }
        .grid-two { gap: 8px; }
      }
    </style>
  </head>
  <body>
    <main class="page">
      <div class="marks" aria-hidden="true">
        <svg class="mark-top" viewBox="0 0 180 180" fill="none"><path d="M20 10l65 135L160 5" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <svg class="mark-bottom" viewBox="0 0 360 240" fill="none"><path d="M0 210L70 55l66 155 45-88 60 88 42-58 56 58" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <button class="back" type="button" data-back>&lt; Back</button>
      <section class="wrap" aria-label="EMY registration form">
        <h1>Sign Up</h1>
        <p class="subtitle">And enjoy life during the time you just saved!</p>
        <div class="role-badge" data-role-badge>Customer account</div>
        <div class="form-shell">
          <div class="left-rail">
            <div class="photo-area">
              <button class="photo-button" type="button" data-photo-button aria-label="Add profile picture" title="Required customer profile picture. This belongs to the customer account.">
                <span class="avatar-fallback" data-avatar-fallback>
                  <svg viewBox="0 0 96 96" fill="none" aria-hidden="true">
                    <circle cx="48" cy="48" r="39" fill="#fffaf5" stroke="#001b47" stroke-width="2.6"/>
                    <circle cx="48" cy="38" r="13" stroke="#001b47" stroke-width="3.2"/>
                    <path d="M25.5 75.5c4.2-14.3 13.2-22 22.5-22s18.3 7.7 22.5 22" stroke="#001b47" stroke-width="3.2" stroke-linecap="round"/>
                    <path d="M34 75.5h28" stroke="#001b47" stroke-width="3.2" stroke-linecap="round"/>
                  </svg>
                </span>
                <img data-photo-preview alt="" hidden />
                <span class="camera"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 8l1.5-2h5L16 8h2.5A2.5 2.5 0 0 1 21 10.5v6A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-6A2.5 2.5 0 0 1 5.5 8H8Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="12" cy="13.5" r="3" stroke="currentColor" stroke-width="2"/></svg></span>
              </button>
              <input data-photo-input type="file" accept="image/*" hidden />
            </div>
            <p class="photo-required">Profile picture<span>*</span></p>
            <button class="photo-adjust" type="button" data-photo-adjust hidden>Adjust photo</button>
            <button class="photo-remove" type="button" data-photo-remove hidden>Remove photo</button>
            <div class="segmented" role="group" aria-label="Privacy mode">
              <button type="button" class="active" data-privacy="private" aria-pressed="true">Private</button>
              <button type="button" data-privacy="public" aria-pressed="false">Public</button>
            </div>
          </div>
          <form data-form novalidate>
            <div class="grid-two">
              <label class="field">First Name<span>*</span><div class="control"><input data-first placeholder="First Name" autocomplete="given-name" /></div></label>
              <label class="field">Last Name<span>*</span><div class="control"><input data-last placeholder="Last Name" autocomplete="family-name" /></div></label>
            </div>
            <label class="field">Mobile Number<span>*</span><div class="control phone-row"><span class="dial-select" data-code-widget><button class="dial-button" type="button" data-code-button aria-haspopup="listbox" aria-expanded="false"><span data-code-value>+44 UK</span><span class="dial-chevron" aria-hidden="true">v</span></button><span class="dial-menu" data-code-menu hidden><input class="dial-search" data-code-search type="search" placeholder="Search country" autocomplete="off" aria-label="Search country code" /><span class="dial-options" data-code-options role="listbox"></span><span class="dial-empty" data-code-empty hidden>No country found</span></span><input data-code type="hidden" value="+44" /></span><input data-phone placeholder="Mobile Number" autocomplete="tel" inputmode="numeric" pattern="[0-9]*" /></div></label>
            <label class="field">Email<span>*</span><div class="control"><input data-email type="email" placeholder="Email" autocomplete="email" /></div></label>
            <label class="field">Password<span>*</span><div class="control"><input data-password type="password" placeholder="New Password" autocomplete="new-password" /><button class="password-toggle" type="button" data-toggle-password="password" aria-label="Show password"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/></svg></button></div></label>
            <label class="field">Confirm Password<span>*</span><div class="control"><input data-confirm type="password" placeholder="Confirm Password" autocomplete="new-password" /><button class="password-toggle" type="button" data-toggle-password="confirm" aria-label="Show password"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/></svg></button></div></label>
            <label class="agreement"><input data-agree type="checkbox" />Yes! I Agree all <a href="terms.html">Terms & Condition</a></label>
            <p class="status" data-status></p>
            <button class="primary" type="submit">Sign Up</button>
            <p class="social-title">Or Sign Up With</p>
            <div class="social-row">
              <button class="social" type="button" data-social="google" aria-label="Sign up with Google"><svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5Z"/><path fill="#FF3D00" d="M6.3 14.7 12.9 19.5C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7Z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.8l-6.5 5C9.5 39.6 16.2 44 24 44Z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.1 5.6l6.2 5.2C36.9 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5Z"/></svg></button>
              <button class="social" type="button" data-social="facebook" aria-label="Sign up with Facebook"><svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="20" fill="#1877F2"/><path fill="#fff" d="M25.6 21.2h-3.7V34h-5.3V21.2h-2.7v-4.5h2.7v-2.9c0-2.1 1-5.5 5.5-5.5l4 .1v4.4h-2.9c-.5 0-1.3.3-1.3 1.4v2.5h4.3l-.6 4.5Z"/></svg></button>
            </div>
            <p class="switch">already have an account ? <button type="button" data-signin>Sign in</button></p>
          </form>
        </div>
      </section>
      <div class="sheet-overlay" data-photo-source-sheet aria-hidden="true">
        <section class="photo-sheet" aria-label="Choose profile photo source">
          <h2>Add profile photo</h2>
          <p>Choose a clear profile picture. You can crop it so the face sits properly inside the circle.</p>
          <div class="source-actions">
            <button type="button" data-photo-source="upload"><strong>Open gallery</strong><span>Choose an image from your phone, laptop, or files.</span></button>
            <button type="button" data-photo-source="camera"><strong>Take photo</strong><span>Use your camera to take a new profile picture.</span></button>
          </div>
          <button class="sheet-close" type="button" data-photo-source-close>Cancel</button>
        </section>
      </div>
      <div class="sheet-overlay" data-photo-camera-sheet aria-hidden="true">
        <section class="camera-sheet" aria-label="Camera capture">
          <h2>Take profile photo</h2>
          <p>Allow camera access, then capture a photo. You can crop it before continuing.</p>
          <div class="camera-preview-frame is-profile-camera" aria-label="Profile photo circle guide">
            <video class="camera-preview" data-camera-preview autoplay muted playsinline></video>
          </div>
          <p class="camera-status" data-camera-status></p>
          <div class="camera-actions">
            <button type="button" data-camera-cancel>Cancel</button>
            <button type="button" data-camera-capture>Take photo</button>
          </div>
        </section>
      </div>
      <div class="sheet-overlay crop-modal" data-photo-crop-modal aria-hidden="true">
        <section class="crop-card" aria-label="Adjust profile photo">
          <h2>Adjust profile photo</h2>
          <p class="crop-help">Drag the image to position it, then use zoom and the direction controls to fit it inside the circle.</p>
          <button class="crop-change" type="button" data-crop-change>Change image</button>
          <div class="crop-frame" data-crop-frame></div>
          <div class="crop-controls">
            <label>Zoom<input data-crop-zoom type="range" min="100" max="260" value="100" /></label>
            <label>Left / Right<input data-crop-x type="range" min="0" max="100" value="50" /></label>
            <label>Up / Down<input data-crop-y type="range" min="0" max="100" value="50" /></label>
          </div>
          <div class="crop-actions">
            <button class="crop-cancel" type="button" data-crop-cancel>Cancel</button>
            <button class="crop-apply" type="button" data-crop-apply>Apply</button>
          </div>
        </section>
      </div>
      <div class="registration-leave-modal" data-registration-leave-modal aria-hidden="true">
        <section class="registration-leave-card" role="dialog" aria-modal="true" aria-labelledby="registration-leave-title">
          <div class="registration-leave-mark" aria-hidden="true">!</div>
          <h2 id="registration-leave-title">Leave registration?</h2>
          <p>Any details you added in this registration will be deleted. If you leave now, you will need to start this registration again.</p>
          <div class="registration-leave-actions">
            <button class="registration-leave-continue" type="button" data-registration-continue>Continue registration</button>
            <button class="registration-leave-delete" type="button" data-registration-delete>Leave and delete details</button>
          </div>
        </section>
      </div>
    </main>
    <script>
${emyMediaStoreRuntimeScript}
      (function () {
        const params = new URLSearchParams(window.location.search || "");
        const role = String(params.get("role") || "customer").toLowerCase() === "business" ? "business" : "customer";
        const roleName = role === "business" ? "Business" : "Customer";
        const badge = document.querySelector("[data-role-badge]");
        const status = document.querySelector("[data-status]");
        const photoInput = document.querySelector("[data-photo-input]");
        const photoButton = document.querySelector("[data-photo-button]");
        const photoPreview = document.querySelector("[data-photo-preview]");
        const avatarFallback = document.querySelector("[data-avatar-fallback]");
        const photoAdjust = document.querySelector("[data-photo-adjust]");
        const photoRemove = document.querySelector("[data-photo-remove]");
        const photoSourceSheet = document.querySelector("[data-photo-source-sheet]");
        const photoSourceClose = document.querySelector("[data-photo-source-close]");
        const photoSourceButtons = Array.from(document.querySelectorAll("[data-photo-source]"));
        const photoCameraSheet = document.querySelector("[data-photo-camera-sheet]");
        const cameraPreview = document.querySelector("[data-camera-preview]");
        const cameraStatus = document.querySelector("[data-camera-status]");
        const cameraCancel = document.querySelector("[data-camera-cancel]");
        const cameraCapture = document.querySelector("[data-camera-capture]");
        const cropModal = document.querySelector("[data-photo-crop-modal]");
        const cropFrame = document.querySelector("[data-crop-frame]");
        const cropZoom = document.querySelector("[data-crop-zoom]");
        const cropX = document.querySelector("[data-crop-x]");
        const cropY = document.querySelector("[data-crop-y]");
        const cropChange = document.querySelector("[data-crop-change]");
        const cropCancel = document.querySelector("[data-crop-cancel]");
        const cropApply = document.querySelector("[data-crop-apply]");
        const codeInput = document.querySelector("[data-code]");
        const codeWidget = document.querySelector("[data-code-widget]");
        const codeButton = document.querySelector("[data-code-button]");
        const codeValue = document.querySelector("[data-code-value]");
        const codeMenu = document.querySelector("[data-code-menu]");
        const codeSearch = document.querySelector("[data-code-search]");
        const codeOptions = document.querySelector("[data-code-options]");
        const codeEmpty = document.querySelector("[data-code-empty]");
        const phoneInput = document.querySelector("[data-phone]");
        const dialingCountries = [
          ["GB", "United Kingdom", "+44"],
          ["AF", "Afghanistan", "+93"],
          ["AX", "Aland Islands", "+358"],
          ["AL", "Albania", "+355"],
          ["DZ", "Algeria", "+213"],
          ["AS", "American Samoa", "+1 684"],
          ["AD", "Andorra", "+376"],
          ["AO", "Angola", "+244"],
          ["AI", "Anguilla", "+1 264"],
          ["AQ", "Antarctica", "+672"],
          ["AG", "Antigua and Barbuda", "+1 268"],
          ["AR", "Argentina", "+54"],
          ["AM", "Armenia", "+374"],
          ["AW", "Aruba", "+297"],
          ["AU", "Australia", "+61"],
          ["AT", "Austria", "+43"],
          ["AZ", "Azerbaijan", "+994"],
          ["BS", "Bahamas", "+1 242"],
          ["BH", "Bahrain", "+973"],
          ["BD", "Bangladesh", "+880"],
          ["BB", "Barbados", "+1 246"],
          ["BY", "Belarus", "+375"],
          ["BE", "Belgium", "+32"],
          ["BZ", "Belize", "+501"],
          ["BJ", "Benin", "+229"],
          ["BM", "Bermuda", "+1 441"],
          ["BT", "Bhutan", "+975"],
          ["BO", "Bolivia", "+591"],
          ["BQ", "Bonaire, Sint Eustatius and Saba", "+599"],
          ["BA", "Bosnia and Herzegovina", "+387"],
          ["BW", "Botswana", "+267"],
          ["BR", "Brazil", "+55"],
          ["IO", "British Indian Ocean Territory", "+246"],
          ["VG", "British Virgin Islands", "+1 284"],
          ["BN", "Brunei", "+673"],
          ["BG", "Bulgaria", "+359"],
          ["BF", "Burkina Faso", "+226"],
          ["BI", "Burundi", "+257"],
          ["KH", "Cambodia", "+855"],
          ["CM", "Cameroon", "+237"],
          ["CA", "Canada", "+1"],
          ["CV", "Cape Verde", "+238"],
          ["KY", "Cayman Islands", "+1 345"],
          ["CF", "Central African Republic", "+236"],
          ["TD", "Chad", "+235"],
          ["CL", "Chile", "+56"],
          ["CN", "China", "+86"],
          ["CX", "Christmas Island", "+61"],
          ["CC", "Cocos Islands", "+61"],
          ["CO", "Colombia", "+57"],
          ["KM", "Comoros", "+269"],
          ["CG", "Congo", "+242"],
          ["CD", "Congo DR", "+243"],
          ["CK", "Cook Islands", "+682"],
          ["CR", "Costa Rica", "+506"],
          ["CI", "Cote d'Ivoire", "+225"],
          ["HR", "Croatia", "+385"],
          ["CU", "Cuba", "+53"],
          ["CW", "Curacao", "+599"],
          ["CY", "Cyprus", "+357"],
          ["CZ", "Czech Republic", "+420"],
          ["DK", "Denmark", "+45"],
          ["DJ", "Djibouti", "+253"],
          ["DM", "Dominica", "+1 767"],
          ["DO", "Dominican Republic", "+1 809"],
          ["EC", "Ecuador", "+593"],
          ["EG", "Egypt", "+20"],
          ["SV", "El Salvador", "+503"],
          ["GQ", "Equatorial Guinea", "+240"],
          ["ER", "Eritrea", "+291"],
          ["EE", "Estonia", "+372"],
          ["SZ", "Eswatini", "+268"],
          ["ET", "Ethiopia", "+251"],
          ["FK", "Falkland Islands", "+500"],
          ["FO", "Faroe Islands", "+298"],
          ["FJ", "Fiji", "+679"],
          ["FI", "Finland", "+358"],
          ["FR", "France", "+33"],
          ["GF", "French Guiana", "+594"],
          ["PF", "French Polynesia", "+689"],
          ["GA", "Gabon", "+241"],
          ["GM", "Gambia", "+220"],
          ["GE", "Georgia", "+995"],
          ["DE", "Germany", "+49"],
          ["GH", "Ghana", "+233"],
          ["GI", "Gibraltar", "+350"],
          ["GR", "Greece", "+30"],
          ["GL", "Greenland", "+299"],
          ["GD", "Grenada", "+1 473"],
          ["GP", "Guadeloupe", "+590"],
          ["GU", "Guam", "+1 671"],
          ["GT", "Guatemala", "+502"],
          ["GG", "Guernsey", "+44"],
          ["GN", "Guinea", "+224"],
          ["GW", "Guinea-Bissau", "+245"],
          ["GY", "Guyana", "+592"],
          ["HT", "Haiti", "+509"],
          ["HN", "Honduras", "+504"],
          ["HK", "Hong Kong", "+852"],
          ["HU", "Hungary", "+36"],
          ["IS", "Iceland", "+354"],
          ["IN", "India", "+91"],
          ["ID", "Indonesia", "+62"],
          ["IR", "Iran", "+98"],
          ["IQ", "Iraq", "+964"],
          ["IE", "Ireland", "+353"],
          ["IM", "Isle of Man", "+44"],
          ["IL", "Israel", "+972"],
          ["IT", "Italy", "+39"],
          ["JM", "Jamaica", "+1 876"],
          ["JP", "Japan", "+81"],
          ["JE", "Jersey", "+44"],
          ["JO", "Jordan", "+962"],
          ["KZ", "Kazakhstan", "+7"],
          ["KE", "Kenya", "+254"],
          ["KI", "Kiribati", "+686"],
          ["XK", "Kosovo", "+383"],
          ["KW", "Kuwait", "+965"],
          ["KG", "Kyrgyzstan", "+996"],
          ["LA", "Laos", "+856"],
          ["LV", "Latvia", "+371"],
          ["LB", "Lebanon", "+961"],
          ["LS", "Lesotho", "+266"],
          ["LR", "Liberia", "+231"],
          ["LY", "Libya", "+218"],
          ["LI", "Liechtenstein", "+423"],
          ["LT", "Lithuania", "+370"],
          ["LU", "Luxembourg", "+352"],
          ["MO", "Macao", "+853"],
          ["MG", "Madagascar", "+261"],
          ["MW", "Malawi", "+265"],
          ["MY", "Malaysia", "+60"],
          ["MV", "Maldives", "+960"],
          ["ML", "Mali", "+223"],
          ["MT", "Malta", "+356"],
          ["MH", "Marshall Islands", "+692"],
          ["MQ", "Martinique", "+596"],
          ["MR", "Mauritania", "+222"],
          ["MU", "Mauritius", "+230"],
          ["YT", "Mayotte", "+262"],
          ["MX", "Mexico", "+52"],
          ["FM", "Micronesia", "+691"],
          ["MD", "Moldova", "+373"],
          ["MC", "Monaco", "+377"],
          ["MN", "Mongolia", "+976"],
          ["ME", "Montenegro", "+382"],
          ["MS", "Montserrat", "+1 664"],
          ["MA", "Morocco", "+212"],
          ["MZ", "Mozambique", "+258"],
          ["MM", "Myanmar", "+95"],
          ["NA", "Namibia", "+264"],
          ["NR", "Nauru", "+674"],
          ["NP", "Nepal", "+977"],
          ["NL", "Netherlands", "+31"],
          ["NC", "New Caledonia", "+687"],
          ["NZ", "New Zealand", "+64"],
          ["NI", "Nicaragua", "+505"],
          ["NE", "Niger", "+227"],
          ["NG", "Nigeria", "+234"],
          ["NU", "Niue", "+683"],
          ["NF", "Norfolk Island", "+672"],
          ["KP", "North Korea", "+850"],
          ["MK", "North Macedonia", "+389"],
          ["MP", "Northern Mariana Islands", "+1 670"],
          ["NO", "Norway", "+47"],
          ["OM", "Oman", "+968"],
          ["PK", "Pakistan", "+92"],
          ["PW", "Palau", "+680"],
          ["PS", "Palestine", "+970"],
          ["PA", "Panama", "+507"],
          ["PG", "Papua New Guinea", "+675"],
          ["PY", "Paraguay", "+595"],
          ["PE", "Peru", "+51"],
          ["PH", "Philippines", "+63"],
          ["PN", "Pitcairn Islands", "+64"],
          ["PL", "Poland", "+48"],
          ["PT", "Portugal", "+351"],
          ["PR", "Puerto Rico", "+1 787"],
          ["QA", "Qatar", "+974"],
          ["RE", "Reunion", "+262"],
          ["RO", "Romania", "+40"],
          ["RU", "Russia", "+7"],
          ["RW", "Rwanda", "+250"],
          ["BL", "Saint Barthelemy", "+590"],
          ["SH", "Saint Helena", "+290"],
          ["KN", "Saint Kitts and Nevis", "+1 869"],
          ["LC", "Saint Lucia", "+1 758"],
          ["MF", "Saint Martin", "+590"],
          ["PM", "Saint Pierre and Miquelon", "+508"],
          ["VC", "Saint Vincent and the Grenadines", "+1 784"],
          ["WS", "Samoa", "+685"],
          ["SM", "San Marino", "+378"],
          ["ST", "Sao Tome and Principe", "+239"],
          ["SA", "Saudi Arabia", "+966"],
          ["SN", "Senegal", "+221"],
          ["RS", "Serbia", "+381"],
          ["SC", "Seychelles", "+248"],
          ["SL", "Sierra Leone", "+232"],
          ["SG", "Singapore", "+65"],
          ["SX", "Sint Maarten", "+1 721"],
          ["SK", "Slovakia", "+421"],
          ["SI", "Slovenia", "+386"],
          ["SB", "Solomon Islands", "+677"],
          ["SO", "Somalia", "+252"],
          ["ZA", "South Africa", "+27"],
          ["GS", "South Georgia", "+500"],
          ["KR", "South Korea", "+82"],
          ["SS", "South Sudan", "+211"],
          ["ES", "Spain", "+34"],
          ["LK", "Sri Lanka", "+94"],
          ["SD", "Sudan", "+249"],
          ["SR", "Suriname", "+597"],
          ["SJ", "Svalbard and Jan Mayen", "+47"],
          ["SE", "Sweden", "+46"],
          ["CH", "Switzerland", "+41"],
          ["SY", "Syria", "+963"],
          ["TW", "Taiwan", "+886"],
          ["TJ", "Tajikistan", "+992"],
          ["TZ", "Tanzania", "+255"],
          ["TH", "Thailand", "+66"],
          ["TL", "Timor-Leste", "+670"],
          ["TG", "Togo", "+228"],
          ["TK", "Tokelau", "+690"],
          ["TO", "Tonga", "+676"],
          ["TT", "Trinidad and Tobago", "+1 868"],
          ["TN", "Tunisia", "+216"],
          ["TR", "Turkey", "+90"],
          ["TM", "Turkmenistan", "+993"],
          ["TC", "Turks and Caicos Islands", "+1 649"],
          ["TV", "Tuvalu", "+688"],
          ["VI", "US Virgin Islands", "+1 340"],
          ["UG", "Uganda", "+256"],
          ["UA", "Ukraine", "+380"],
          ["AE", "United Arab Emirates", "+971"],
          ["US", "United States", "+1"],
          ["UY", "Uruguay", "+598"],
          ["UZ", "Uzbekistan", "+998"],
          ["VU", "Vanuatu", "+678"],
          ["VA", "Vatican City", "+39"],
          ["VE", "Venezuela", "+58"],
          ["VN", "Vietnam", "+84"],
          ["WF", "Wallis and Futuna", "+681"],
          ["EH", "Western Sahara", "+212"],
          ["YE", "Yemen", "+967"],
          ["ZM", "Zambia", "+260"],
          ["ZW", "Zimbabwe", "+263"]
        ];
        let privacy = "private";
        let hasProfilePhoto = false;
        let profilePhotoSrc = "";
        let profilePhotoRef = "";
        let profilePhotoBlob = null;
        let profilePhotoUploadPromise = null;
        let profilePhotoUploadError = "";
        let profilePhotoObjectUrl = "";
        let profileCrop = { zoom: 100, x: 50, y: 50 };
        let cropDraft = { zoom: 100, x: 50, y: 50 };
        let cropPreviewMedia = null;
        let cropDrag = null;
        let cameraStream = null;
        const registrationLeaveModal = document.querySelector("[data-registration-leave-modal]");
        const registrationContinue = document.querySelector("[data-registration-continue]");
        const registrationDelete = document.querySelector("[data-registration-delete]");
        let registrationLeaveBypass = false;
        let registrationCompleted = false;
        let pendingRegistrationLeaveAction = null;

        document.title = "EMY | " + roleName + " Sign Up";
        badge.textContent = roleName + " account";
        function signupRegistrationInputs() {
          return Array.from(document.querySelectorAll("[data-first], [data-last], [data-phone], [data-email], [data-password], [data-confirm]"));
        }
        function signupRegistrationHasProgress() {
          const hasTypedValue = signupRegistrationInputs().some((input) => String(input.value || "").trim());
          const agree = document.querySelector("[data-agree]");
          return hasTypedValue || !!profilePhotoSrc || privacy !== "private" || !!(agree && agree.checked);
        }
        function signupRegistrationShouldWarn() {
          return !registrationLeaveBypass && !registrationCompleted && signupRegistrationHasProgress();
        }
        function clearUnfinishedSignupRegistration() {
          [
            "emyMainPendingSignupRole",
            "emyMainPendingSignupFirstName",
            "emyMainPendingSignupLastName",
            "emyMainPendingSignupEmail",
            "emyMainPendingSignupPhone",
            "emyMainPendingSignupPrivacy",
            "emyMainPendingSignupPhoto",
            "emyMainPendingSignupPhotoSrc",
            "emyMainPendingSignupPhotoRef",
            "emyMainPendingSignupPhotoCrop",
            "emyMainConfirmationCompleted"
          ].forEach((key) => {
            try { localStorage.removeItem(key); } catch (error) {}
          });
          if (role === "customer") {
            try { localStorage.removeItem("emyCustomerProfileVisibility"); } catch (error) {}
          }
          if (role === "business") {
            [
              "emyBusinessRegistrationFromCustomer",
              "emyBusinessRegistrationCustomerEmail",
              "emyBusinessOwnerCustomerEmail",
              "emyBusinessProfileDraft",
              "emyBusinessProfilePhoto",
              "emyBusinessProfilePhotoRef",
              "emyBusinessProfilePhotoCrop",
              "emyBusinessHeroCoverMedia",
              "emyBusinessMediaLibrary",
              "emyBusinessCoverMedia",
              "emyBusinessWorkingDays",
              "emyBusinessWorkingDaysSchedule",
              "emyBusinessLocation",
              "emyBusinessLocationLabel",
              "emyBusinessAskLocation",
              "emyBusinessReviewStatus",
              "emyBusinessReviewSubmittedAt"
            ].forEach((key) => {
              try { localStorage.removeItem(key); } catch (error) {}
            });
          }
        }
        function setRegistrationLeaveModalOpen(isOpen) {
          if (!registrationLeaveModal) return;
          registrationLeaveModal.classList.toggle("is-open", isOpen);
          registrationLeaveModal.setAttribute("aria-hidden", isOpen ? "false" : "true");
          if (isOpen && registrationContinue) window.setTimeout(() => registrationContinue.focus(), 0);
        }
        function requestRegistrationLeave(action) {
          if (!signupRegistrationShouldWarn()) {
            if (typeof action === "function") action();
            return;
          }
          pendingRegistrationLeaveAction = action;
          setRegistrationLeaveModalOpen(true);
        }
        if (registrationContinue) registrationContinue.addEventListener("click", () => {
          pendingRegistrationLeaveAction = null;
          setRegistrationLeaveModalOpen(false);
        });
        if (registrationDelete) registrationDelete.addEventListener("click", () => {
          const action = pendingRegistrationLeaveAction;
          pendingRegistrationLeaveAction = null;
          registrationLeaveBypass = true;
          clearUnfinishedSignupRegistration();
          setRegistrationLeaveModalOpen(false);
          if (typeof action === "function") action();
        });
        if (registrationLeaveModal) registrationLeaveModal.addEventListener("click", (event) => {
          if (event.target === registrationLeaveModal) {
            pendingRegistrationLeaveAction = null;
            setRegistrationLeaveModalOpen(false);
          }
        });
        window.addEventListener("beforeunload", (event) => {
          if (!signupRegistrationShouldWarn()) return;
          event.preventDefault();
          event.returnValue = "";
        });
        try {
          history.replaceState(Object.assign({}, history.state || {}, { emySignupRegistrationBase: true }), "", window.location.href);
          history.pushState({ emySignupRegistrationGuard: true }, "", window.location.href);
          window.addEventListener("popstate", () => {
            if (registrationLeaveBypass) return;
            if (signupRegistrationShouldWarn()) {
              pendingRegistrationLeaveAction = () => {
                registrationLeaveBypass = true;
                clearUnfinishedSignupRegistration();
                history.back();
              };
              setRegistrationLeaveModalOpen(true);
              try { history.pushState({ emySignupRegistrationGuard: true }, "", window.location.href); } catch (error) {}
              return;
            }
            registrationLeaveBypass = true;
            history.back();
          });
        } catch (error) {}
        document.addEventListener("click", (event) => {
          const anchor = event.target.closest && event.target.closest("a[href]");
          if (!anchor || !document.documentElement.contains(anchor)) return;
          const href = anchor.getAttribute("href") || "";
          if (!href || href.charAt(0) === "#" || /^javascript:/i.test(href) || anchor.target === "_blank") return;
          if (!signupRegistrationShouldWarn()) return;
          event.preventDefault();
          event.stopPropagation();
          if (event.stopImmediatePropagation) event.stopImmediatePropagation();
          requestRegistrationLeave(() => { window.location.href = anchor.href; });
        }, true);
        function languageRegion(language) {
          try {
            return new Intl.Locale(language).region;
          } catch (error) {
            const match = String(language || "").match(/[-_]([A-Za-z]{2})\\b/);
            return match ? match[1].toUpperCase() : "";
          }
        }
        function preferredRegion() {
          const languages = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
          for (const language of languages) {
            const region = languageRegion(language);
            if (region && dialingCountries.some((item) => item[0] === region)) return region;
          }
          const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
          const timeZoneRegions = { "Europe/London": "GB", "Europe/Paris": "FR", "Europe/Madrid": "ES", "Europe/Rome": "IT", "Europe/Berlin": "DE", "Africa/Lagos": "NG", "Africa/Abidjan": "CI", "America/New_York": "US", "America/Los_Angeles": "US", "America/Toronto": "CA", "Asia/Dubai": "AE", "Asia/Kolkata": "IN", "Asia/Tokyo": "JP", "Australia/Sydney": "AU" };
          return timeZoneRegions[timeZone] || "GB";
        }
        function compactCountryCode(iso) {
          return iso === "GB" ? "UK" : iso;
        }
        function compactDialLabel(item) {
          return item[2] + " " + compactCountryCode(item[0]);
        }
        function keepDigitsOnly(input) {
          const digits = input.value.replace(/\\D/g, "");
          if (input.value !== digits) input.value = digits;
        }
        function normalizeDialSearch(value) {
          return String(value || "").toLowerCase().replace(/\\s+/g, " ").trim();
        }
        function firstVisibleDialOption() {
          return Array.from(codeOptions.querySelectorAll("[data-dial-option]")).find((button) => !button.hidden);
        }
        function filterDialCountries() {
          const query = normalizeDialSearch(codeSearch.value);
          let visibleCount = 0;
          Array.from(codeOptions.querySelectorAll("[data-dial-option]")).forEach((button) => {
            const haystack = normalizeDialSearch(button.dataset.search || "");
            const visible = !query || haystack.includes(query);
            button.hidden = !visible;
            if (visible) visibleCount += 1;
          });
          codeEmpty.hidden = visibleCount !== 0;
        }
        function setDialCountry(item) {
          codeInput.value = item[2];
          codeInput.dataset.iso = item[0];
          codeValue.textContent = compactDialLabel(item);
          codeButton.setAttribute("aria-label", item[1] + " country code " + item[2]);
          Array.from(codeOptions.querySelectorAll("[data-dial-option]")).forEach((button) => {
            const selected = button.dataset.iso === item[0];
            button.classList.toggle("is-selected", selected);
            button.setAttribute("aria-selected", selected ? "true" : "false");
          });
        }
        function setDialMenuOpen(open) {
          codeMenu.hidden = !open;
          codeButton.setAttribute("aria-expanded", open ? "true" : "false");
          if (open) {
            codeSearch.value = "";
            filterDialCountries();
            setTimeout(() => codeSearch.focus(), 0);
          }
        }
        function populateDialCodes() {
          const defaultRegion = preferredRegion();
          let selectedItem = dialingCountries.find((item) => item[0] === defaultRegion) || dialingCountries[0];
          codeOptions.innerHTML = "";
          dialingCountries.forEach((item) => {
            const option = document.createElement("button");
            option.type = "button";
            option.className = "dial-option";
            option.dataset.dialOption = "true";
            option.dataset.iso = item[0];
            option.dataset.search = item[0] + " " + compactCountryCode(item[0]) + " " + item[1] + " " + item[2];
            option.setAttribute("role", "option");
            option.innerHTML = '<span class="dial-code">' + item[2] + '</span><span class="dial-name">' + item[1] + '</span><span class="dial-iso">' + compactCountryCode(item[0]) + '</span>';
            option.addEventListener("click", () => {
              selectedItem = item;
              setDialCountry(item);
              setDialMenuOpen(false);
              codeButton.focus();
            });
            option.addEventListener("keydown", (event) => {
              const options = Array.from(codeOptions.querySelectorAll("[data-dial-option]")).filter((button) => !button.hidden);
              const index = options.indexOf(option);
              if (event.key === "ArrowDown") {
                event.preventDefault();
                (options[index + 1] || options[0]).focus();
              }
              if (event.key === "ArrowUp") {
                event.preventDefault();
                (options[index - 1] || options[options.length - 1]).focus();
              }
              if (event.key === "Escape") {
                event.preventDefault();
                setDialMenuOpen(false);
                codeButton.focus();
              }
            });
            codeOptions.appendChild(option);
          });
          setDialCountry(selectedItem);
          filterDialCountries();
        }
        populateDialCodes();
        codeButton.addEventListener("click", () => setDialMenuOpen(codeMenu.hidden));
        codeButton.addEventListener("keydown", (event) => {
          if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setDialMenuOpen(true);
          }
        });
        codeSearch.addEventListener("input", filterDialCountries);
        codeSearch.addEventListener("keydown", (event) => {
          if (event.key === "Enter") {
            event.preventDefault();
          }
          if (event.key === "ArrowDown") {
            event.preventDefault();
            const first = firstVisibleDialOption();
            if (first) first.focus();
          }
          if (event.key === "Escape") {
            event.preventDefault();
            setDialMenuOpen(false);
            codeButton.focus();
          }
        });
        document.addEventListener("click", (event) => {
          if (!codeWidget.contains(event.target)) setDialMenuOpen(false);
        });
        phoneInput.addEventListener("beforeinput", (event) => {
          if (event.data && /\\D/.test(event.data)) event.preventDefault();
        });
        phoneInput.addEventListener("input", () => keepDigitsOnly(phoneInput));

        function defaultCrop() {
          return { zoom: 100, x: 50, y: 50 };
        }
        function normaliseCrop(crop) {
          const source = crop && typeof crop === "object" ? crop : {};
          const rawZoom = Number(source.zoom);
          const rawX = Number(source.x);
          const rawY = Number(source.y);
          const zoom = Math.min(260, Math.max(100, Number.isFinite(rawZoom) ? rawZoom : 100));
          const x = Math.min(100, Math.max(0, Number.isFinite(rawX) ? rawX : 50));
          const y = Math.min(100, Math.max(0, Number.isFinite(rawY) ? rawY : 50));
          return { zoom, x, y };
        }
        function applyCropStyle(media, crop) {
          const clean = normaliseCrop(crop);
          const overflow = clean.zoom - 100;
          media.style.objectFit = "cover";
          media.style.objectPosition = clean.x + "% " + clean.y + "%";
          media.style.transform = "none";
          media.style.width = clean.zoom + "%";
          media.style.height = clean.zoom + "%";
          media.style.left = (-overflow * (clean.x / 100)).toFixed(3) + "%";
          media.style.top = (-overflow * (clean.y / 100)).toFixed(3) + "%";
          media.style.right = "auto";
          media.style.bottom = "auto";
        }
        function normaliseVideoSrc(src) {
          return String(src || "").replace(/^data:video\\/webm;codecs=[^;]+;base64,/i, "data:video/webm;base64,");
        }
        function videoPreviewStart(trim, duration) {
          const start = Math.max(0, Number(trim && trim.start) || 0);
          if (start || !duration || duration <= 0.12) return start;
          return 0.06;
        }
        function syncCropControls() {
          if (cropZoom) cropZoom.value = cropDraft.zoom;
          if (cropX) cropX.value = cropDraft.x;
          if (cropY) cropY.value = cropDraft.y;
        }
        function setCropDraft(next) {
          cropDraft = normaliseCrop(next);
          syncCropControls();
          if (cropPreviewMedia) applyCropStyle(cropPreviewMedia, cropDraft);
        }
        function fileToDataUrl(file) {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result || ""));
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        }
        function canvasToBlob(canvas, type, quality) {
          return new Promise((resolve) => {
            if (!canvas || !canvas.toBlob) {
              resolve(null);
              return;
            }
            canvas.toBlob((blob) => resolve(blob || null), type || "image/jpeg", quality || 0.86);
          });
        }
        function setProfilePhotoPreviewSource(src) {
          if (profilePhotoObjectUrl && profilePhotoObjectUrl !== src) {
            try { URL.revokeObjectURL(profilePhotoObjectUrl); } catch (error) {}
          }
          profilePhotoObjectUrl = /^blob:/i.test(String(src || "")) ? String(src || "") : "";
          profilePhotoSrc = String(src || "");
        }
        function signupProfilePhotoLooksBrowserRef(value) {
          const clean = String(value || "").trim();
          if (!clean) return false;
          if (/^(data:image\\/|data:video\\/|blob:|https?:\\/\\/|file:|\\/|\\.{1,2}\\/|assets\\/)/i.test(clean)) return false;
          return /^emy-media-|^business-|^customer-|^profile-|^media-/i.test(clean);
        }
        function signupUploadedPhotoRef(record) {
          const ref = String(record && (record.cloudinaryPublicId || record.publicId || record.photoPublicId || record.ref || record.id || record.mediaRef) || "").trim();
          return signupProfilePhotoLooksBrowserRef(ref) ? "" : ref;
        }
        async function storeSignupProfilePhoto(blob, name) {
          if (!blob || !window.emyPrepareFeedMediaUpload) throw new Error("Media upload is not ready.");
          const record = await window.emyPrepareFeedMediaUpload(blob, {
            type: "image",
            name: name || "signup-profile-photo",
            kind: "profile",
            role: role,
            folder: "emy/" + role + "-profiles/signup",
            allowBrowserFallback: false
          });
          const src = String(record && (record.src || record.url || record.mediaSrc) || "").trim();
          const ref = signupUploadedPhotoRef(record);
          if (!src && !ref) throw new Error("Media upload could not complete.");
          return { src, ref, record };
        }
        function applySignupProfilePhotoUpload(upload, blob) {
          if (!upload || (!upload.src && !upload.ref)) return false;
          if (blob && profilePhotoBlob !== blob) return false;
          if (upload.src) setProfilePhotoPreviewSource(upload.src);
          if (upload.ref) profilePhotoRef = upload.ref;
          if (blob && profilePhotoBlob === blob) profilePhotoBlob = null;
          profilePhotoUploadError = "";
          persistProfilePhoto();
          renderProfilePhoto();
          return true;
        }
        function queueSignupProfilePhotoUpload(blob, name) {
          profilePhotoUploadError = "";
          profilePhotoUploadPromise = storeSignupProfilePhoto(blob, name).then((upload) => {
            applySignupProfilePhotoUpload(upload, blob);
            return upload;
          }).catch(() => {
            if (!blob || profilePhotoBlob === blob) {
              profilePhotoRef = "";
              profilePhotoUploadError = "Media upload could not complete. Try again or choose a smaller file.";
              persistProfilePhoto();
              if (status) {
                status.style.color = "#b42318";
                status.textContent = profilePhotoUploadError;
              }
            }
            return null;
          });
          return profilePhotoUploadPromise;
        }
        async function ensureSignupProfilePhotoUploaded() {
          const currentRef = String(profilePhotoRef || "").trim();
          if (currentRef && !signupProfilePhotoLooksBrowserRef(currentRef)) return true;
          if (profilePhotoUploadPromise) {
            const upload = await profilePhotoUploadPromise;
            if (upload && (upload.src || upload.ref)) return true;
          }
          if (profilePhotoBlob) {
            const upload = await queueSignupProfilePhotoUpload(profilePhotoBlob, "signup-profile-photo");
            return !!(upload && (upload.src || upload.ref));
          }
          if (currentRef && signupProfilePhotoLooksBrowserRef(currentRef) && window.emyResolveFeedMedia) {
            const stored = await window.emyResolveFeedMedia(currentRef).catch(() => null);
            if (stored && stored.blob) {
              profilePhotoBlob = stored.blob;
              const upload = await queueSignupProfilePhotoUpload(stored.blob, stored.name || "signup-profile-photo");
              return !!(upload && (upload.src || upload.ref));
            }
          }
          return /^https?:\\/\\//i.test(String(profilePhotoSrc || ""));
        }
        async function resolveSignupProfilePhotoRef() {
          if (!profilePhotoRef || profilePhotoSrc || !window.emyResolveFeedMedia) return false;
          try {
            const record = await window.emyResolveFeedMedia(profilePhotoRef);
            if (!record || !record.url) return false;
            profilePhotoSrc = record.url;
            return true;
          } catch (error) {
            return false;
          }
        }
        function setSheetOpen(sheet, isOpen) {
          if (!sheet) return;
          sheet.classList.toggle("is-open", isOpen);
          sheet.setAttribute("aria-hidden", isOpen ? "false" : "true");
        }
        function persistProfilePhoto() {
          try {
            const safePhotoText = String(profilePhotoSrc || "");
            const safePhotoLower = safePhotoText.toLowerCase();
            const safeDirectPhoto = safePhotoLower.indexOf("http://") === 0 || safePhotoLower.indexOf("https://") === 0 || safePhotoText.indexOf("/") === 0 || safePhotoText.indexOf("./") === 0 || safePhotoText.indexOf("../") === 0 || safePhotoLower.indexOf("assets/") === 0 || (safePhotoLower.indexOf("data:image/") === 0 && safePhotoText.length < 120000);
            if (safeDirectPhoto) {
              localStorage.setItem("emyMainPendingSignupPhoto", safePhotoText);
              localStorage.setItem("emyMainPendingSignupPhotoSrc", safePhotoText);
            } else {
              localStorage.removeItem("emyMainPendingSignupPhoto");
              localStorage.removeItem("emyMainPendingSignupPhotoSrc");
            }
            if (profilePhotoRef) localStorage.setItem("emyMainPendingSignupPhotoRef", profilePhotoRef);
            else localStorage.removeItem("emyMainPendingSignupPhotoRef");
            localStorage.setItem("emyMainPendingSignupPhotoCrop", JSON.stringify(profileCrop));
          } catch (error) {}
        }
        function renderProfilePhoto() {
          if (!profilePhotoSrc && !profilePhotoRef) {
            photoPreview.hidden = true;
            photoPreview.removeAttribute("src");
            photoPreview.removeAttribute("data-emy-media-ref");
            avatarFallback.hidden = false;
            hasProfilePhoto = false;
            if (photoAdjust) photoAdjust.hidden = true;
            if (photoRemove) photoRemove.hidden = true;
            return;
          }
          if (profilePhotoSrc) photoPreview.src = profilePhotoSrc;
          else photoPreview.removeAttribute("src");
          if (profilePhotoRef) photoPreview.setAttribute("data-emy-media-ref", profilePhotoRef);
          else photoPreview.removeAttribute("data-emy-media-ref");
          photoPreview.hidden = false;
          avatarFallback.hidden = true;
          hasProfilePhoto = true;
          applyCropStyle(photoPreview, profileCrop);
          if (profilePhotoRef && window.emyHydrateFeedMedia) window.emyHydrateFeedMedia(photoButton);
          photoButton.classList.remove("needs-photo");
          if (photoAdjust) photoAdjust.hidden = false;
          if (photoRemove) photoRemove.hidden = false;
          if (status.textContent === "Please add a profile picture to continue.") status.textContent = "";
        }
        function clearCustomerProfilePhoto() {
          setProfilePhotoPreviewSource("");
          profilePhotoRef = "";
          profilePhotoBlob = null;
          profileCrop = defaultCrop();
          renderProfilePhoto();
          try {
            localStorage.removeItem("emyMainPendingSignupPhoto");
            localStorage.removeItem("emyMainPendingSignupPhotoSrc");
            localStorage.removeItem("emyMainPendingSignupPhotoRef");
            localStorage.removeItem("emyMainPendingSignupPhotoCrop");
          } catch (error) {}
          status.textContent = "Profile picture removed. Please add one before continuing.";
          photoButton.classList.add("needs-photo");
        }
        async function handlePhotoFile(file) {
          if (!file || !file.type.startsWith("image/")) return;
          try {
            profilePhotoBlob = file;
            profilePhotoRef = "";
            setProfilePhotoPreviewSource(URL.createObjectURL(file));
            profileCrop = defaultCrop();
            renderProfilePhoto();
            persistProfilePhoto();
            openCropEditor();
            queueSignupProfilePhotoUpload(file, file.name || "signup-profile-photo");
          } catch (error) {
            status.textContent = "This image could not be opened. Please choose another profile picture.";
          }
        }
        function openPhotoSourceSheet() {
          setSheetOpen(photoSourceSheet, true);
        }
        function choosePhotoSource(source) {
          setSheetOpen(photoSourceSheet, false);
          if (source === "camera") {
            openCamera();
            return;
          }
          photoInput.value = "";
          photoInput.click();
        }
        function setCameraStatus(text, warning) {
          if (!cameraStatus) return;
          cameraStatus.textContent = text || "";
          cameraStatus.style.color = warning ? "#9a4b00" : "#61708c";
        }
        function setCameraCaptureReady(isReady) {
          if (cameraCapture) cameraCapture.disabled = !isReady;
        }
        function waitForCameraFrame(video) {
          return new Promise((resolve) => {
            if (!video) {
              resolve(false);
              return;
            }
            if (video.readyState >= 2 && video.videoWidth && video.videoHeight) {
              resolve(true);
              return;
            }
            let finished = false;
            const finish = () => {
              if (finished) return;
              finished = true;
              video.removeEventListener("loadedmetadata", finish);
              video.removeEventListener("canplay", finish);
              video.removeEventListener("playing", finish);
              resolve(!!(video.readyState >= 2 && video.videoWidth && video.videoHeight));
            };
            video.addEventListener("loadedmetadata", finish, { once: true });
            video.addEventListener("canplay", finish, { once: true });
            video.addEventListener("playing", finish, { once: true });
            window.setTimeout(finish, 1200);
          });
        }
        function stopCameraStream() {
          if (cameraStream) cameraStream.getTracks().forEach((track) => track.stop());
          cameraStream = null;
          if (cameraPreview) cameraPreview.srcObject = null;
          setCameraCaptureReady(false);
        }
        async function openCamera() {
          setSheetOpen(photoCameraSheet, true);
          setCameraStatus("Requesting camera permission...", false);
          setCameraCaptureReady(false);
          if (window.location.protocol === "file:") {
            setCameraStatus("Camera access is blocked in this file preview. Open the site through localhost or HTTPS, or use Open gallery.", true);
            return;
          }
          if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            setCameraStatus("Camera is not available in this browser. Use Open gallery instead.", true);
            return;
          }
          try {
            cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
            cameraPreview.srcObject = cameraStream;
            const playPromise = cameraPreview.play();
            if (playPromise && typeof playPromise.catch === "function") playPromise.catch(() => {});
            const hasFrame = await waitForCameraFrame(cameraPreview);
            if (!hasFrame) {
              setCameraStatus("Camera is opening. Wait for the preview to appear, then take the photo.", true);
              return;
            }
            setCameraCaptureReady(true);
            setCameraStatus("Camera ready.", false);
          } catch (error) {
            setCameraStatus("Camera permission was not allowed. Use Open gallery instead.", true);
          }
        }
        function closeCamera() {
          stopCameraStream();
          setSheetOpen(photoCameraSheet, false);
        }
        async function captureCameraPhoto() {
          if (!cameraPreview || !cameraStream) {
            setCameraStatus("Camera is not ready yet.", true);
            return;
          }
          if (!cameraPreview.videoWidth || !cameraPreview.videoHeight || cameraPreview.readyState < 2) {
            setCameraStatus("Camera is still opening. Wait until the preview appears, then take the photo.", true);
            return;
          }
          const canvas = document.createElement("canvas");
          canvas.width = cameraPreview.videoWidth;
          canvas.height = cameraPreview.videoHeight;
          const context = canvas.getContext("2d");
          if (!context) return;
          context.drawImage(cameraPreview, 0, 0, canvas.width, canvas.height);
          const blob = await canvasToBlob(canvas, "image/jpeg", 0.86);
          if (!blob) {
            status.textContent = "This camera photo could not be saved. Please try again.";
            return;
          }
          profilePhotoBlob = blob;
          profilePhotoRef = "";
          setProfilePhotoPreviewSource(URL.createObjectURL(blob));
          profileCrop = defaultCrop();
          closeCamera();
          renderProfilePhoto();
          persistProfilePhoto();
          openCropEditor();
          queueSignupProfilePhotoUpload(blob, "camera-profile-photo.jpg");
        }
        function renderCropPreview() {
          if (!cropFrame || !profilePhotoSrc) return;
          cropFrame.innerHTML = "";
          const media = document.createElement("img");
          media.src = profilePhotoSrc;
          media.alt = "Crop preview";
          cropFrame.appendChild(media);
          cropPreviewMedia = media;
          setCropDraft(cropDraft);
        }
        async function openCropEditor() {
          if (!profilePhotoSrc && profilePhotoRef) {
            await resolveSignupProfilePhotoRef();
            renderProfilePhoto();
          }
          if (!profilePhotoSrc) {
            openPhotoSourceSheet();
            return;
          }
          cropDraft = normaliseCrop(profileCrop);
          syncCropControls();
          renderCropPreview();
          setSheetOpen(cropModal, true);
        }
        function updateCropPreview() {
          if (!cropPreviewMedia) return;
          setCropDraft({
            zoom: cropZoom ? cropZoom.value : cropDraft.zoom,
            x: cropX ? cropX.value : cropDraft.x,
            y: cropY ? cropY.value : cropDraft.y
          });
        }
        async function applyCropEditor() {
          updateCropPreview();
          profileCrop = normaliseCrop(cropDraft);
          renderProfilePhoto();
          persistProfilePhoto();
          setSheetOpen(cropModal, false);
        }
        function beginCropDrag(event) {
          if (!cropFrame || !cropPreviewMedia || event.button > 0) return;
          event.preventDefault();
          cropDrag = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            cropX: cropDraft.x,
            cropY: cropDraft.y
          };
          cropFrame.classList.add("is-dragging");
          cropFrame.setPointerCapture(event.pointerId);
        }
        function moveCropDrag(event) {
          if (!cropDrag || !cropFrame || cropDrag.pointerId !== event.pointerId) return;
          event.preventDefault();
          const rect = cropFrame.getBoundingClientRect();
          const overflowFactor = Math.max(0.08, cropDraft.zoom / 100 - 1);
          const nextX = cropDrag.cropX - ((event.clientX - cropDrag.startX) / Math.max(1, rect.width)) * (100 / overflowFactor);
          const nextY = cropDrag.cropY - ((event.clientY - cropDrag.startY) / Math.max(1, rect.height)) * (100 / overflowFactor);
          setCropDraft({ ...cropDraft, x: nextX, y: nextY });
        }
        function endCropDrag(event) {
          if (!cropDrag || !cropFrame || cropDrag.pointerId !== event.pointerId) return;
          cropFrame.classList.remove("is-dragging");
          cropFrame.releasePointerCapture(event.pointerId);
          cropDrag = null;
        }
        function zoomCropFromWheel(event) {
          if (!cropPreviewMedia) return;
          event.preventDefault();
          const change = event.deltaY > 0 ? -4 : 4;
          setCropDraft({ ...cropDraft, zoom: cropDraft.zoom + change });
        }

        document.querySelector("[data-back]").addEventListener("click", () => {
          requestRegistrationLeave(() => { window.location.href = "index.html?emyAuth=signup"; });
        });
        document.querySelector("[data-signin]").addEventListener("click", () => {
          requestRegistrationLeave(() => { window.location.href = "index.html?emyAuth=signin"; });
        });
        photoButton.addEventListener("click", openPhotoSourceSheet);
        if (photoAdjust) photoAdjust.addEventListener("click", openCropEditor);
        if (photoRemove) photoRemove.addEventListener("click", clearCustomerProfilePhoto);
        if (photoSourceClose) photoSourceClose.addEventListener("click", () => setSheetOpen(photoSourceSheet, false));
        photoSourceButtons.forEach((button) => {
          button.addEventListener("click", () => choosePhotoSource(button.dataset.photoSource));
        });
        if (photoSourceSheet) photoSourceSheet.addEventListener("click", (event) => {
          if (event.target === photoSourceSheet) setSheetOpen(photoSourceSheet, false);
        });
        if (cameraCancel) cameraCancel.addEventListener("click", closeCamera);
        if (cameraCapture) cameraCapture.addEventListener("click", captureCameraPhoto);
        if (photoCameraSheet) photoCameraSheet.addEventListener("click", (event) => {
          if (event.target === photoCameraSheet) closeCamera();
        });
        photoInput.addEventListener("change", () => {
          const file = photoInput.files && photoInput.files[0];
          handlePhotoFile(file);
          photoInput.value = "";
        });
        [cropZoom, cropX, cropY].forEach((control) => {
          if (control) control.addEventListener("input", updateCropPreview);
        });
        if (cropFrame) {
          cropFrame.addEventListener("pointerdown", beginCropDrag);
          cropFrame.addEventListener("pointermove", moveCropDrag);
          cropFrame.addEventListener("pointerup", endCropDrag);
          cropFrame.addEventListener("pointercancel", endCropDrag);
          cropFrame.addEventListener("wheel", zoomCropFromWheel, { passive: false });
        }
        if (cropCancel) cropCancel.addEventListener("click", () => setSheetOpen(cropModal, false));
        if (cropChange) cropChange.addEventListener("click", () => {
          setSheetOpen(cropModal, false);
          openPhotoSourceSheet();
        });
        if (cropApply) cropApply.addEventListener("click", applyCropEditor);
        if (cropModal) cropModal.addEventListener("click", (event) => {
          if (event.target === cropModal) setSheetOpen(cropModal, false);
        });
        try {
          const storedPhoto = localStorage.getItem("emyMainPendingSignupPhoto") || "";
          const storedPhotoRef = localStorage.getItem("emyMainPendingSignupPhotoRef") || "";
          if (storedPhoto || storedPhotoRef) {
            profilePhotoSrc = storedPhoto;
            profilePhotoRef = storedPhotoRef;
            try { profileCrop = normaliseCrop(JSON.parse(localStorage.getItem("emyMainPendingSignupPhotoCrop") || "{}")); } catch (error) { profileCrop = defaultCrop(); }
            renderProfilePhoto();
          }
          const storedPrivacy = String(localStorage.getItem("emyMainPendingSignupPrivacy") || localStorage.getItem("emyCustomerProfileVisibility") || "").toLowerCase();
          if (storedPrivacy === "public") privacy = "public";
        } catch (error) {}
        function syncPrivacyButtons() {
          document.querySelectorAll("[data-privacy]").forEach((item) => {
            const active = (item.dataset.privacy || "private") === privacy;
            item.classList.toggle("active", active);
            item.setAttribute("aria-pressed", active ? "true" : "false");
            item.style.backgroundColor = active ? "#ff6a00" : "";
            item.style.color = active ? "#fff" : "";
          });
        }
        document.querySelectorAll("[data-privacy]").forEach((button) => {
          button.addEventListener("click", () => {
            privacy = button.dataset.privacy || "private";
            try {
              localStorage.setItem("emyMainPendingSignupPrivacy", privacy);
              localStorage.setItem("emyCustomerProfileVisibility", privacy);
            } catch (error) {}
            syncPrivacyButtons();
          });
        });
        syncPrivacyButtons();
        document.querySelectorAll("[data-toggle-password]").forEach((button) => {
          button.addEventListener("click", () => {
            const target = document.querySelector(button.dataset.togglePassword === "confirm" ? "[data-confirm]" : "[data-password]");
            const showing = target.type === "text";
            target.type = showing ? "password" : "text";
            button.classList.toggle("is-visible", !showing);
            button.setAttribute("aria-label", showing ? "Show password" : "Hide password");
          });
        });
        document.querySelector("[data-form]").addEventListener("submit", async (event) => {
          event.preventDefault();
          status.style.color = "#b42318";
          const first = document.querySelector("[data-first]");
          const last = document.querySelector("[data-last]");
          const phone = document.querySelector("[data-phone]");
          const email = document.querySelector("[data-email]");
          const password = document.querySelector("[data-password]");
          const confirm = document.querySelector("[data-confirm]");
          const agree = document.querySelector("[data-agree]");
          if (!hasProfilePhoto) {
            status.textContent = "Please add a profile picture to continue.";
            photoButton.classList.add("needs-photo");
            openPhotoSourceSheet();
            photoButton.focus();
            return;
          }
          const required = [first, last, phone, email, password, confirm];
          const missing = required.find((input) => !input.value.trim());
          if (missing) {
            status.textContent = "Please complete all required fields.";
            missing.focus();
            return;
          }
          if (password.value !== confirm.value) {
            status.textContent = "Passwords do not match.";
            confirm.focus();
            return;
          }
          if (!agree.checked) {
            status.textContent = "Please agree to the Terms & Condition.";
            agree.focus();
            return;
          }
          status.style.color = "#61708c";
          status.textContent = "Uploading your profile picture...";
          const profilePhotoReady = await ensureSignupProfilePhotoUploaded();
          if (!profilePhotoReady) {
            status.style.color = "#b42318";
            status.textContent = profilePhotoUploadError || "Media upload could not complete. Try again or choose a smaller file.";
            return;
          }
          function isLocalPreviewEnvironment() {
            if (location.protocol === "file:") return true;
            if (/^(127\.0\.0\.1|localhost|::1)$/.test(location.hostname)) return true;
            if (localStorage.getItem("emyTestModeEnabled") === "true") return true;
            if (localStorage.getItem("emyLocalDevAccess") === "1") return true;
            return false;
          }
          if (isLocalPreviewEnvironment()) {
            try {
              localStorage.setItem("emyMainPendingSignupRole", role);
              localStorage.setItem("emyMainPendingSignupFirstName", first.value.trim());
              localStorage.setItem("emyMainPendingSignupLastName", last.value.trim());
              localStorage.setItem("emyMainPendingSignupEmail", email.value.trim());
              localStorage.setItem("emyMainPendingSignupPhone", codeInput.value + " " + phone.value.trim());
              localStorage.setItem("emyMainSignedInRole", role);
              localStorage.setItem("emyMainSignedInEmail", email.value.trim());
              localStorage.removeItem("emyMainSignedOut");
              if (role === "customer") {
                localStorage.setItem("emyCustomerDisplayName", first.value.trim() + " " + last.value.trim());
                localStorage.setItem("emyCustomerProfileVisibility", privacy);
              }
            } catch (error) {}
            window.location.href = role === "customer" ? "emy-customer-home.html" : "emy-business-profile.html?setup=1";
            return;
          }
          if (!window.emyRealAuth) {
            status.textContent = "Firebase account backend is still loading. Refresh and try again.";
            return;
          }
          status.style.color = "#61708c";
          status.textContent = "Creating your real EMY account and sending email verification...";
          let realRegistration = null;
          try {
            const profilePhotoTextForUpload = String(profilePhotoSrc || "");
            realRegistration = await window.emyRealAuth.registerAccount({
              role: role,
              firstName: first.value.trim(),
              lastName: last.value.trim(),
              phone: codeInput.value + " " + phone.value.trim(),
              email: email.value.trim(),
              password: password.value,
              privacy: privacy,
              photoBlob: profilePhotoBlob,
              photoDataUrl: profilePhotoTextForUpload.toLowerCase().indexOf("data:image/") === 0 ? profilePhotoTextForUpload : "",
              photoRef: profilePhotoRef,
              photoCrop: profileCrop
            });
          } catch (error) {
            status.style.color = "#b42318";
            status.textContent = window.emyRealAuth && window.emyRealAuth.publicError ? window.emyRealAuth.publicError(error) : (error.message || "Account creation failed.");
            return;
          }
          try {
            localStorage.setItem("emyMainPendingSignupRole", role);
            localStorage.setItem("emyMainPendingSignupFirstName", first.value.trim());
            localStorage.setItem("emyMainPendingSignupLastName", last.value.trim());
            localStorage.setItem("emyMainPendingSignupEmail", email.value.trim());
            localStorage.setItem("emyMainPendingSignupPhone", codeInput.value + " " + phone.value.trim());
            localStorage.setItem("emyMainPendingSignupPrivacy", privacy);
            if (role === "customer") localStorage.setItem("emyCustomerProfileVisibility", privacy);
            localStorage.removeItem("emyMainSignedOut");
            const safePhotoText = String(profilePhotoSrc || "");
            const safePhotoLower = safePhotoText.toLowerCase();
            const safeDirectPhoto = safePhotoLower.indexOf("http://") === 0 || safePhotoLower.indexOf("https://") === 0 || safePhotoText.indexOf("/") === 0 || safePhotoText.indexOf("./") === 0 || safePhotoText.indexOf("../") === 0 || safePhotoLower.indexOf("assets/") === 0 || (safePhotoLower.indexOf("data:image/") === 0 && safePhotoText.length < 120000);
            const savedProfilePhoto = realRegistration && realRegistration.photoUrl ? realRegistration.photoUrl : (safeDirectPhoto ? safePhotoText : "");
            const savedProfilePhotoRef = realRegistration && realRegistration.photoPublicId ? realRegistration.photoPublicId : profilePhotoRef;
            if (savedProfilePhoto) localStorage.setItem("emyMainPendingSignupPhoto", savedProfilePhoto);
            if (savedProfilePhoto) localStorage.setItem("emyMainPendingSignupPhotoSrc", savedProfilePhoto);
            if (savedProfilePhotoRef) localStorage.setItem("emyMainPendingSignupPhotoRef", savedProfilePhotoRef);
            localStorage.setItem("emyMainPendingSignupPhotoCrop", JSON.stringify(profileCrop));
          } catch (error) {}
          registrationCompleted = true;
          registrationLeaveBypass = true;
          window.location.href = "emy-confirmation.html?role=" + encodeURIComponent(role);
        });
        function socialRedirect(provider) {
          const config = window.EMY_AUTH_CONFIG || {};
          const redirectUri = config.redirectUri || (window.location.origin && window.location.origin !== "null" ? window.location.origin + "/auth/callback" : window.location.href.split("#")[0]);
          if (provider === "google") {
            if (!config.googleClientId) {
              status.textContent = "Add a Google client ID in auth-config.js to enable Google sign up.";
              return;
            }
            const auth = new URLSearchParams({ client_id: config.googleClientId, redirect_uri: redirectUri, response_type: "code", scope: "openid email profile", state: "emy-main-" + role + "-signup-google" });
            window.location.href = "https://accounts.google.com/o/oauth2/v2/auth?" + auth.toString();
            return;
          }
          if (!config.facebookAppId) {
            status.textContent = "Add a Facebook app ID in auth-config.js to enable Facebook sign up.";
            return;
          }
          const auth = new URLSearchParams({ client_id: config.facebookAppId, redirect_uri: redirectUri, response_type: "code", scope: "email,public_profile", state: "emy-main-" + role + "-signup-facebook" });
          window.location.href = "https://www.facebook.com/v20.0/dialog/oauth?" + auth.toString();
        }
        document.querySelectorAll("[data-social]").forEach((button) => {
          button.addEventListener("click", () => requestRegistrationLeave(() => socialRedirect(button.dataset.social)));
        });
      })();
    </script>
  </body>
</html>`;
}

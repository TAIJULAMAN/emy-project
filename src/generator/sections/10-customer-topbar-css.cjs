/* EMY generator section: 10-customer-topbar-css.cjs (source lines 8533-8623) */
const customerTopbarCss = String.raw`
      .topbar { display: grid; grid-template-columns: 46px minmax(0, 1fr) auto auto auto; align-items: center; gap: 10px; min-height: 58px; }
      .avatar { position: relative; height: 42px; width: 42px; border: 2px solid rgba(255,255,255,.92); border-radius: 999px; background: linear-gradient(135deg, #e7edf6, #fff7ed); display: grid; place-items: center; overflow: hidden; cursor: pointer; padding: 0; color: var(--emy-navy); font: inherit; font-size: 14px; font-weight: 700; box-shadow: 0 0 0 1px rgba(0,27,71,.12), 0 8px 18px rgba(0,27,71,.08); transition: border-color .16s ease, box-shadow .16s ease, transform .16s ease; }
      .avatar:hover, .avatar:focus-visible { border-color: rgba(255,106,0,.55); box-shadow: 0 0 0 3px rgba(255,106,0,.12), 0 10px 22px rgba(0,27,71,.11); outline: none; transform: translateY(-1px); }
      .avatar img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; transform-origin: center; }
      .hello { min-width: 0; display: grid; gap: 3px; }
      .hello strong { display: block; color: var(--emy-navy); font-size: 14px; line-height: 1.05; font-weight: 700; letter-spacing: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .hello strong span { display: inline; margin: 0; color: inherit; font: inherit; white-space: inherit; }
      .location-btn { width: fit-content; max-width: 100%; min-width: 0; border: 1px solid rgba(0,27,71,.09); border-radius: 999px; background: rgba(255,255,255,.76); color: #59667f; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; padding: 4px 9px; font-size: 11px; line-height: 1.2; font-weight: 430; text-decoration: none; box-shadow: 0 5px 14px rgba(0,27,71,.04); transition: background .16s ease, border-color .16s ease, color .16s ease, box-shadow .16s ease; }
      .location-btn:hover { border-color: rgba(255,106,0,.26); background: #fff; color: var(--emy-navy); box-shadow: 0 8px 18px rgba(0,27,71,.07); }
      .location-btn svg { flex: 0 0 auto; width: 13px; height: 13px; stroke-width: 2.2; }
      .location-pin { color: var(--emy-orange); }
      .location-chevron { color: #8993a8; }
      .location-btn span { display: block; flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .icon-btn { position: relative; width: 36px; height: 36px; border: 0; border-radius: 999px; background: rgba(255,255,255,.62); color: var(--emy-navy); cursor: pointer; display: grid; place-items: center; padding: 0; box-shadow: none; }
      .icon-btn:hover { background: #fff; color: var(--emy-navy); box-shadow: 0 8px 18px rgba(0,27,71,.08); }
      .icon-btn svg { width: 19px; height: 19px; stroke: currentColor; stroke-width: 2.2; filter: none; }
      .ask-mini-btn { position: relative; width: 36px; min-width: 36px; height: 36px; border: 0; border-radius: 999px; background: rgba(255,255,255,.62); color: var(--emy-navy); cursor: pointer; display: grid; place-items: center; padding: 0; box-shadow: none; backdrop-filter: blur(14px) saturate(1.05); transition: transform .16s ease, border-color .16s ease, box-shadow .16s ease, background .16s ease, color .16s ease; }
      .ask-mini-btn:hover, .ask-mini-btn[aria-expanded="true"] { transform: translateY(-1px); border-color: rgba(255,106,0,.24); background: #fff; color: var(--emy-navy); box-shadow: 0 8px 18px rgba(0,27,71,.08), 0 6px 16px rgba(255,106,0,.08); }
      .ask-mini-mark { width: 24px; height: 24px; border-radius: 7px; background: transparent; display: grid; place-items: center; overflow: visible; box-shadow: none; }
      .ask-mini-mark img, .ask-mini-icon img { width: 100%; height: 100%; object-fit: contain; display: block; }
      .ask-mini-label { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
      .ask-mini-panel { position: fixed; top: 78px; right: max(14px, calc((100vw - min(1220px, calc(100vw - 28px))) / 2)); z-index: 1200; display: none; width: min(440px, calc(100vw - 28px)); }
      .ask-mini-panel.is-open { display: block; }
      .ask-mini-card { position: relative; overflow: hidden; border: 1px solid rgba(255,255,255,.72); border-radius: 20px; background: linear-gradient(145deg, rgba(255,255,255,.78), rgba(255,248,239,.62)); color: var(--emy-navy); box-shadow: 0 30px 80px rgba(0,27,71,.20), 0 14px 36px rgba(255,106,0,.10), inset 0 1px 0 rgba(255,255,255,.96); backdrop-filter: blur(26px) saturate(1.18); }
      .ask-mini-card::before { content: ""; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(135deg, rgba(255,255,255,.74), rgba(255,255,255,.18) 42%, rgba(255,106,0,.08)); }
      .ask-mini-card > * { position: relative; z-index: 1; }
      .ask-mini-head { min-height: 76px; display: grid; grid-template-columns: 42px minmax(0,1fr) 38px; gap: 11px; align-items: center; padding: 12px 14px 12px 16px; border-bottom: 1px solid rgba(0,27,71,.07); background: rgba(255,255,255,.34); }
      .ask-mini-brand { width: 40px; height: 40px; border-radius: 13px; display: grid; place-items: center; overflow: visible; background: transparent; box-shadow: none; }
      .ask-mini-brand img { width: 30px; height: 30px; object-fit: contain; display: block; }
      .ask-mini-title { min-width: 0; display: grid; gap: 3px; }
      .ask-mini-head h2 { margin: 0; color: #061f4a; font-size: 17px; line-height: 1.08; font-weight: 620; letter-spacing: 0; }
      .ask-mini-head p { margin: 0; color: #667085; font-size: 12px; line-height: 1.28; font-weight: 400; }
      .ask-mini-close { width: 36px; height: 36px; border: 1px solid rgba(0,27,71,.08); border-radius: 999px; background: rgba(255,255,255,.62); color: #061f4a; cursor: pointer; display: grid; place-items: center; padding: 0; font: inherit; font-size: 22px; line-height: 1; font-weight: 620; box-shadow: 0 8px 18px rgba(0,27,71,.06); }
      .ask-mini-close:hover { background: #fff; color: var(--emy-orange); box-shadow: 0 12px 22px rgba(0,27,71,.10); }
      .ask-mini-scroll { min-height: 292px; max-height: min(58dvh, 410px); overflow-y: auto; display: flex; flex-direction: column; gap: 13px; padding: 18px 18px 16px; scroll-behavior: smooth; background: linear-gradient(180deg, rgba(255,255,255,.14), rgba(255,255,255,.36)); }
      .ask-mini-message { max-width: 100%; display: grid; grid-template-columns: 30px minmax(0, 1fr); gap: 9px; align-self: stretch; align-items: start; }
      .ask-mini-message.is-user { display: flex; justify-content: flex-end; align-self: stretch; }
      .ask-mini-icon { width: 28px; height: 28px; border-radius: 9px; background: transparent; display: grid; place-items: center; overflow: visible; box-shadow: none; }
      .ask-mini-bubble { border: 1px solid rgba(255,255,255,.72); border-radius: 18px; background: rgba(255,255,255,.58); padding: 13px 14px; color: #233047; font-size: 13.5px; line-height: 1.48; font-weight: 400; box-shadow: 0 16px 34px rgba(0,27,71,.07), inset 0 1px 0 rgba(255,255,255,.92); backdrop-filter: blur(16px) saturate(1.12); }
      .ask-mini-message.is-user .ask-mini-bubble { max-width: 84%; border-color: rgba(255,106,0,.20); background: rgba(255,244,232,.78); color: #6f3904; font-weight: 400; }
      .ask-mini-kicker { display: inline-flex; width: fit-content; margin-bottom: 8px; border: 1px solid rgba(255,106,0,.18); border-radius: 999px; background: rgba(255,255,255,.62); color: var(--emy-orange); padding: 4px 8px; font-size: 10px; line-height: 1; font-weight: 500; text-transform: uppercase; letter-spacing: 0; }
      .ask-mini-bubble strong { display: block; margin-bottom: 5px; color: #061f4a; font-size: 14px; line-height: 1.25; font-weight: 500; }
      .ask-mini-bubble p { margin: 0; }
      .ask-mini-bubble p + p { margin-top: 7px; color: #5f6b82; font-size: 13px; line-height: 1.45; font-weight: 400; }
      .ask-mini-prompt-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; margin-top: 13px; }
      .ask-mini-prompt { min-width: 0; border: 1px solid rgba(0,27,71,.08); border-radius: 14px; background: rgba(255,255,255,.66); color: #061f4a; cursor: pointer; display: grid; gap: 4px; min-height: 58px; padding: 10px 11px; text-align: left; font: inherit; box-shadow: 0 10px 22px rgba(0,27,71,.05), inset 0 1px 0 rgba(255,255,255,.88); transition: transform .16s ease, background .16s ease, border-color .16s ease, box-shadow .16s ease; }
      .ask-mini-prompt:hover { transform: translateY(-1px); border-color: rgba(255,106,0,.24); background: rgba(255,255,255,.88); box-shadow: 0 14px 28px rgba(0,27,71,.08), 0 8px 18px rgba(255,106,0,.07); }
      .ask-mini-prompt b { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: #061f4a; font-size: 12.5px; line-height: 1.15; font-weight: 500; }
      .ask-mini-prompt span { color: #667085; font-size: 11px; line-height: 1.3; font-weight: 400; }
      .ask-mini-results { display: grid; gap: 7px; margin-top: 10px; }
      .ask-mini-result { display: grid; gap: 2px; border: 1px solid rgba(0,27,71,.08); border-radius: 12px; background: rgba(255,255,255,.72); padding: 9px 10px; color: inherit; text-decoration: none; box-shadow: inset 0 1px 0 rgba(255,255,255,.8); }
      .ask-mini-result b { color: var(--emy-navy); font-size: 12.5px; line-height: 1.25; font-weight: 500; }
      .ask-mini-result span { color: #667085; font-size: 11.5px; line-height: 1.35; font-weight: 400; }
      .ask-mini-foot { border-top: 1px solid rgba(0,27,71,.06); background: rgba(255,255,255,.40); padding: 13px 15px 14px; backdrop-filter: blur(18px); }
      .ask-mini-form { display: grid; grid-template-columns: minmax(0,1fr) 38px; align-items: center; gap: 7px; border: 1px solid rgba(255,106,0,.18); border-radius: 999px; background: rgba(255,255,255,.70); padding: 5px; box-shadow: 0 14px 32px rgba(0,27,71,.07), inset 0 1px 0 rgba(255,255,255,.88); }
      .ask-mini-form:focus-within { border-color: rgba(255,106,0,.38); box-shadow: 0 0 0 3px rgba(255,106,0,.10), 0 16px 34px rgba(0,27,71,.09); }
      .ask-mini-input { width: 100%; height: 38px; min-width: 0; border: 0; border-radius: 999px; background: transparent; color: #061f4a; outline: none; padding: 0 13px; font: inherit; font-size: 14.5px; line-height: 1; font-weight: 400; }
      .ask-mini-input::placeholder { color: #7b8494; font-weight: 400; }
      .ask-mini-send { width: 38px; height: 38px; border: 0; border-radius: 999px; background: linear-gradient(145deg,#ff7a1a,#ff6a00); color: #fff; cursor: pointer; display: grid; place-items: center; padding: 0; box-shadow: 0 10px 20px rgba(255,106,0,.20), inset 0 1px 0 rgba(255,255,255,.32); }
      .ask-mini-send:hover { transform: translateY(-1px); box-shadow: 0 13px 24px rgba(255,106,0,.25), inset 0 1px 0 rgba(255,255,255,.36); }
      .ask-mini-send svg { width: 23px; height: 23px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
      .ask-mini-disclaimer { display: flex; align-items: center; justify-content: center; gap: 7px; margin: 10px 0 0; color: #6b7280; font-size: 10.5px; line-height: 1.25; font-weight: 400; }
      .ask-mini-disclaimer .ask-mini-mark { width: 17px; height: 17px; border-radius: 5px; box-shadow: none; }
      .notification-btn { width: 40px !important; height: 42px !important; padding: 0 !important; border: 0 !important; border-radius: 0 !important; background: transparent !important; box-shadow: none !important; }
      .notification-btn:hover { background: transparent !important; box-shadow: none !important; color: var(--emy-orange); }
      .notification-btn svg { width: 28px; height: 28px; overflow: visible; filter: drop-shadow(0 2px 2px rgba(0,27,71,.22)) drop-shadow(0 9px 18px rgba(0,27,71,.16)); }
      .notification-btn .bell-body { fill: url(#emyBellFill); stroke: url(#emyBellStroke); stroke-width: 1.8; }
      .notification-btn .bell-rim { stroke: rgba(0,27,71,.92); stroke-width: 1.7; }
      .notification-btn .bell-highlight { stroke: rgba(255,255,255,.82); stroke-width: 1.15; }
      .notification-btn .bell-clapper { fill: rgba(0,27,71,.86); stroke: rgba(255,255,255,.78); stroke-width: .65; }
      .notification-btn:hover svg { transform: translateY(-1px); filter: drop-shadow(0 3px 3px rgba(0,27,71,.24)) drop-shadow(0 10px 20px rgba(0,27,71,.18)); }
      .notification-count { position: absolute; right: 1px; top: 1px; min-width: 16px; height: 16px; padding: 0 4px; border: 1px solid rgba(255,255,255,.88); border-radius: 999px; background: rgba(248,251,255,.95); color: var(--emy-navy); display: grid; place-items: center; font-size: 9px; line-height: 1; font-weight: 800; box-shadow: 0 0 0 1px rgba(0,27,71,.08), 0 5px 12px rgba(0,27,71,.14); }
      .notification-count[aria-label="0 notifications"],
      .notification-count[aria-label="0 unread notifications"],
      .notification-count.is-empty { display: none !important; }
      @media (min-width: 760px) {
        .topbar { position: sticky; top: 0; z-index: 30; min-height: 70px; border-bottom: 1px solid rgba(0,27,71,.08); background: rgba(255,253,248,.86); backdrop-filter: blur(16px); padding: 0 4px; }
        .avatar { width: 44px; height: 44px; }
        .hello strong { font-size: 16px; }
        .location-btn { font-size: 12px; }
        .icon-btn, .ask-mini-btn { width: 42px; height: 42px; min-width: 42px; background: #fff; border: 1px solid rgba(0,27,71,.08); }
        .notification-btn { border: 0 !important; background: transparent !important; box-shadow: none !important; }
      }
      @media (max-width: 520px) {
        .topbar { grid-template-columns: 42px minmax(0, 1fr) auto auto auto; gap: 7px; }
        .ask-mini-btn { min-width: 36px; width: 36px; padding: 0; gap: 0; }
        .ask-mini-panel { top: 70px; left: 10px; right: 10px; width: auto; }
        .ask-mini-scroll { min-height: 300px; max-height: calc(100dvh - 230px); padding: 18px 16px; }
        .ask-mini-card { border-radius: 15px; }
        .ask-mini-prompt-grid { grid-template-columns: 1fr; }
        .ask-mini-bubble p + p { font-size: 13px; }
      }

      /* EMY central customer shell */
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
      .bottom-nav,
      .public-customer-bottom-nav,
      body.is-public-customer-shell .public-customer-bottom-nav {
        position: fixed;
        left: 50%;
        bottom: 10px;
        z-index: 65;
        width: min(calc(100% - 16px), 430px);
        transform: translateX(-50%);
        display: grid;
        grid-template-columns: repeat(8, minmax(0, 1fr));
        gap: 0;
        border: 1px solid rgba(0,27,71,.06);
        border-radius: 16px;
        background: rgba(248,251,255,.48);
        backdrop-filter: blur(18px);
        -webkit-backdrop-filter: blur(18px);
        padding: 8px;
        box-shadow: 0 12px 30px rgba(0,27,71,.08);
        transition: background .18s ease, border-color .18s ease, box-shadow .18s ease;
      }
      .bottom-nav:hover,
      .public-customer-bottom-nav:hover,
      body.is-public-customer-shell .public-customer-bottom-nav:hover {
        border-color: rgba(0,27,71,.14);
        background: rgba(248,251,255,.96);
        box-shadow: 0 18px 46px rgba(0,27,71,.18);
      }
      .bottom-nav[hidden],
      .public-customer-bottom-nav[hidden] {
        display: none !important;
      }
      .bottom-nav .nav-item,
      .public-customer-bottom-nav .nav-item,
      body.is-public-customer-shell .public-customer-bottom-nav .nav-item {
        position: relative;
        min-width: 0;
        min-height: 56px;
        border: 0;
        border-radius: 11px;
        background: transparent;
        color: #68748c;
        cursor: pointer;
        display: grid;
        place-items: center;
        gap: 4px;
        padding: 0;
        font: inherit;
        font-size: 9.5px;
        line-height: 1;
        font-weight: 600;
        transition: background .16s ease, color .16s ease, transform .16s ease;
      }
      .bottom-nav .nav-item span,
      .public-customer-bottom-nav .nav-item span,
      body.is-public-customer-shell .public-customer-bottom-nav .nav-item span {
        position: relative;
        z-index: 1;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 1;
        padding-bottom: 5px;
      }
      .bottom-nav .nav-item svg,
      .public-customer-bottom-nav .nav-item svg,
      body.is-public-customer-shell .public-customer-bottom-nav .nav-item svg {
        width: 34px;
        height: 34px;
        box-sizing: border-box;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
        color: rgba(0,27,71,.86);
        padding: 8px;
        border: 1px solid rgba(255,255,255,.88);
        border-radius: 13px;
        background:
          linear-gradient(145deg, rgba(255,255,255,.92), rgba(255,255,255,.42) 54%, rgba(255,255,255,.24)),
          rgba(255,255,255,.34);
        clip-path: polygon(18% 0, 100% 0, 100% 74%, 78% 100%, 0 100%, 0 22%);
        box-shadow:
          inset 0 1px 0 rgba(255,255,255,.74),
          inset 0 -8px 16px rgba(0,27,71,.08),
          0 9px 18px rgba(0,27,71,.16);
      }
      .bottom-nav .nav-item:hover,
      .bottom-nav .nav-item.is-active,
      .public-customer-bottom-nav .nav-item:hover,
      .public-customer-bottom-nav .nav-item.is-active,
      body.is-public-customer-shell .public-customer-bottom-nav .nav-item:hover,
      body.is-public-customer-shell .public-customer-bottom-nav .nav-item.is-active {
        color: var(--emy-orange);
        background: rgba(0,27,71,.035);
        transform: translateY(-1px);
      }
      .bottom-nav .nav-item.is-active svg,
      .public-customer-bottom-nav .nav-item.is-active svg,
      body.is-public-customer-shell .public-customer-bottom-nav .nav-item.is-active svg {
        color: var(--emy-orange);
        border-color: rgba(255,106,0,.36);
        background:
          linear-gradient(145deg, rgba(255,255,255,.96), rgba(255,255,255,.48) 54%, rgba(255,255,255,.28)),
          rgba(255,255,255,.38);
        box-shadow:
          inset 0 1px 0 rgba(255,255,255,.78),
          inset 0 -8px 16px rgba(255,106,0,.08),
          0 10px 20px rgba(0,27,71,.17);
      }
      .bottom-nav .nav-item.is-active::after,
      .public-customer-bottom-nav .nav-item.is-active::after,
      body.is-public-customer-shell .public-customer-bottom-nav .nav-item.is-active::after {
        content: "";
        position: absolute;
        bottom: 1px;
        width: 18px;
        height: 2px;
        border-radius: 999px;
        background: var(--emy-orange);
      }
      .bottom-nav .nav-item.nav-item-ask,
      .public-customer-bottom-nav .nav-item.nav-item-ask,
      body.is-public-customer-shell .public-customer-bottom-nav .nav-item.nav-item-ask {
        overflow: visible;
      }
      .bottom-nav .nav-item.nav-item-ask svg,
      .public-customer-bottom-nav .nav-item.nav-item-ask svg,
      body.is-public-customer-shell .public-customer-bottom-nav .nav-item.nav-item-ask svg {
        width: 44px;
        height: 44px;
        color: #fff;
        padding: 0;
        border: 0;
        border-radius: 0;
        background: transparent;
        clip-path: none;
        box-shadow: none;
        filter: drop-shadow(0 11px 15px rgba(255,106,0,.28));
        transform-origin: 50% 82%;
        transition: transform .18s ease, filter .16s ease;
      }
      .bottom-nav .nav-item.nav-item-ask span:not(.ask-emy-bubble),
      .public-customer-bottom-nav .nav-item.nav-item-ask span:not(.ask-emy-bubble),
      body.is-public-customer-shell .public-customer-bottom-nav .nav-item.nav-item-ask span:not(.ask-emy-bubble) {
        color: var(--emy-orange);
        font-size: 8.8px;
        white-space: nowrap;
      }
      .bottom-nav .nav-item.nav-item-ask:hover svg,
      .bottom-nav .nav-item.nav-item-ask:focus-visible svg,
      .public-customer-bottom-nav .nav-item.nav-item-ask:hover svg,
      .public-customer-bottom-nav .nav-item.nav-item-ask:focus-visible svg,
      body.is-public-customer-shell .public-customer-bottom-nav .nav-item.nav-item-ask:hover svg,
      body.is-public-customer-shell .public-customer-bottom-nav .nav-item.nav-item-ask:focus-visible svg {
        transform: translateY(-1px);
      }
      @media (min-width: 760px) {
        .bottom-nav,
        .public-customer-bottom-nav,
        body.is-public-customer-shell .public-customer-bottom-nav {
          bottom: 18px;
          width: min(620px, calc(100% - 40px));
          gap: 2px;
        }
        .bottom-nav .nav-item,
        .public-customer-bottom-nav .nav-item,
        body.is-public-customer-shell .public-customer-bottom-nav .nav-item {
          min-height: 54px;
          font-size: 10px;
        }
        .bottom-nav .nav-item.nav-item-ask svg,
        .public-customer-bottom-nav .nav-item.nav-item-ask svg,
        body.is-public-customer-shell .public-customer-bottom-nav .nav-item.nav-item-ask svg {
          width: 48px;
          height: 48px;
        }
      }
      @media (max-width: 520px) {
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
        .bottom-nav,
        .public-customer-bottom-nav,
        body.is-public-customer-shell .public-customer-bottom-nav {
          width: min(calc(100% - 16px), 430px);
          bottom: 10px;
          padding: 7px;
        }
      }`;

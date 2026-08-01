/* EMY generator section: 07-ask-styles-mascots.cjs (source lines 3016-3200) */
const askSoftTypeCss = [
  '  #root .font-black { font-weight: 500 !important; }',
  '  #root .font-extrabold { font-weight: 500 !important; }',
  '  #root .font-bold { font-weight: 400 !important; }',
  '  #root .font-semibold { font-weight: 400 !important; }',
  '  #root input, #root textarea { font-weight: 400 !important; }',
  '  #root input::placeholder, #root textarea::placeholder { font-weight: 400 !important; }',
  "  #root input[class*='h-14'][class*='bg-transparent'] { font-size: 15px !important; line-height: 1.35 !important; font-weight: 400 !important; }",
  '  #root main { font-weight: 400 !important; }',
  '  #root main .font-medium, #root main .font-semibold, #root main .font-bold { font-weight: 400 !important; }',
  '  #root main .font-black, #root main .font-extrabold { font-weight: 500 !important; }',
  "  #root main p[class*='rounded-2xl'], #root main div[class*='rounded-2xl'] { font-weight: 400 !important; }",
  '  #root main h1, #root main h2, #root main h3, #root main strong, #root main b { font-weight: 500 !important; }',
  '  #root main p { font-weight: 400 !important; }',
  "  #root aside[aria-label='Ask EMY sidebar'] { font-size: 14px; }",
  "  #root aside[aria-label='Ask EMY sidebar'] .font-medium, #root aside[aria-label='Ask EMY sidebar'] .font-semibold, #root aside[aria-label='Ask EMY sidebar'] .font-bold { font-weight: 400 !important; }",
  "  #root aside[aria-label='Ask EMY sidebar'] .font-black, #root aside[aria-label='Ask EMY sidebar'] .font-extrabold { font-weight: 500 !important; }",
  "  #root aside[aria-label='Ask EMY sidebar'] button { font-weight: 400 !important; }",
  "  #root aside[aria-label='Ask EMY sidebar'] .text-base { font-size: 14px !important; line-height: 1.35 !important; }",
  "  #root aside[aria-label='Ask EMY sidebar'] .text-lg { font-size: 15px !important; line-height: 1.35 !important; }",
  "  #root aside[aria-label='Ask EMY sidebar'] .text-sm { font-size: 13px !important; line-height: 1.4 !important; }",
  "  #root aside[aria-label='Ask EMY sidebar'] h2 { font-size: 11px !important; font-weight: 500 !important; letter-spacing: 0.16em !important; }",
  "  #root aside[aria-label='Ask EMY sidebar'] strong, #root aside[aria-label='Ask EMY sidebar'] b { font-weight: 500 !important; }",
  "  #root aside[aria-label='Ask EMY sidebar'] p { font-weight: 400 !important; }",
  "  #root aside[aria-label='Ask EMY sidebar'] > div:first-child { padding: 14px 16px !important; }",
  "  #root aside[aria-label='Ask EMY sidebar'] > div:first-child img { height: 34px !important; }",
  "  #root aside[aria-label='Ask EMY sidebar'] > div:last-child { padding: 14px !important; height: calc(100% - 65px) !important; }",
  "  #root aside[aria-label='Ask EMY sidebar'] > div:last-child > div:first-child { padding: 12px !important; border-radius: 14px !important; }",
  "  #root aside[aria-label='Ask EMY sidebar'] > div:last-child > div:first-child img { width: 40px !important; height: 40px !important; }",
  "  #root aside[aria-label='Ask EMY sidebar'] [class*='rounded-2xl'] { border-radius: 10px !important; }",
  "  #root aside[aria-label='Ask EMY sidebar'] button { padding-top: 8px !important; padding-bottom: 8px !important; }",
  "  #root aside[aria-label='Ask EMY sidebar'] [class*='py-3'] { padding-top: 8px !important; padding-bottom: 8px !important; }",
  "  #root aside[aria-label='Ask EMY sidebar'] [class*='px-4'] { padding-left: 12px !important; padding-right: 12px !important; }",
  "  #root aside[aria-label='Ask EMY sidebar'] [class*='px-3'] { padding-left: 10px !important; padding-right: 10px !important; }",
  "  #root aside[aria-label='Ask EMY sidebar'] [class*='mt-8'] { margin-top: 22px !important; }",
  "  #root aside[aria-label='Ask EMY sidebar'] [class*='mt-4'] { margin-top: 10px !important; }",
  "  #root aside[aria-label='Ask EMY sidebar'] [class*='mt-5'] { margin-top: 12px !important; }",
  "  #root aside[aria-label='Ask EMY sidebar'] [class*='space-y-2'] > :not([hidden]) ~ :not([hidden]) { margin-top: 4px !important; }",
  "  #root aside[aria-label='Ask EMY sidebar'] .shadow-sm { box-shadow: 0 1px 2px rgba(0,27,71,0.04) !important; }",
].join('\n');

const askEmyMenuMascot = String.raw`<a href="about-ask-emy.html" aria-label="About Ask EMY" className="group relative flex h-12 w-12 shrink-0 items-center justify-center overflow-visible">
          <span className="pointer-events-none absolute bottom-full left-1/2 z-[120] mb-2 w-48 -translate-x-1/2 translate-y-2 rounded-2xl border border-orange-200 bg-white/95 px-3 py-2 text-left text-xs font-bold leading-snug text-[#001B47] opacity-0 shadow-xl shadow-[#001B47]/10 backdrop-blur transition group-hover:translate-y-0 group-hover:opacity-100">Hi, I'm EMY. Click me to find out more about me.</span>
          <svg className="h-12 w-12 animate-bounce drop-shadow-xl transition group-hover:scale-110" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.9 8.1c.35-1.08 1.36-1.8 2.5-1.8h5.2c1.14 0 2.15.72 2.5 1.8l1.7 8.7c.35 1.78-1.01 3.45-2.82 3.45H8.02c-1.81 0-3.17-1.67-2.82-3.45l1.7-8.7Z" fill="#f76512" stroke="#cf5200" strokeLinejoin="round" strokeWidth="1"/><path d="M15.9 6.55c.58.35 1.02.9 1.2 1.55l1.7 8.7c.29 1.48-.6 2.88-1.96 3.32l-.98-.08c.74-.62 1.04-1.6.82-2.72l-1.25-6.7c-.28-1.5-.1-2.8.47-4.07Z" fill="#ad3e00" opacity=".2"/><path d="M6.35 10.05c2.15.62 4.02.48 5.66-.3 1.78-.85 3.62-.92 5.46-.22l.38 1.84c-2.32-.78-4.28-.63-6.04.22-1.62.78-3.45.9-5.78.28l.32-1.82Z" fill="#ffb067" opacity=".34"/><path d="M8.8 6.35c.32-1.92 1.42-3 3.2-3s2.88 1.08 3.2 3" stroke="#fff" strokeLinecap="round" strokeWidth="1.18" opacity=".9"/><path d="M9.25 13.2c.46-.36.92-.36 1.38 0" stroke="#fff" strokeLinecap="round" strokeWidth="1.02" opacity=".96"/><path d="M13.37 13.2c.46-.36.92-.36 1.38 0" stroke="#fff" strokeLinecap="round" strokeWidth="1.02" opacity=".96"/><path d="M9.8 15.82c1.34.94 3.06.94 4.4 0" stroke="#fff" strokeLinecap="round" strokeWidth="1.18" opacity=".96"/></svg>
        </a>`;

const askEmyPromptMascot = String.raw`<span className="group relative flex h-20 w-20 shrink-0 items-center justify-center overflow-visible">
            <span className="pointer-events-none absolute bottom-full left-1/2 z-[80] mb-2 w-52 -translate-x-1/2 translate-y-2 rounded-2xl border border-orange-200 bg-white/95 px-3 py-2 text-left text-xs font-bold leading-snug text-[#001B47] opacity-0 shadow-xl shadow-[#001B47]/10 backdrop-blur transition group-hover:translate-y-0 group-hover:opacity-100">Hi, I'm EMY. Click me to find out more about me.</span>
            <svg className="h-20 w-20 animate-bounce drop-shadow-2xl transition group-hover:scale-110" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.9 8.1c.35-1.08 1.36-1.8 2.5-1.8h5.2c1.14 0 2.15.72 2.5 1.8l1.7 8.7c.35 1.78-1.01 3.45-2.82 3.45H8.02c-1.81 0-3.17-1.67-2.82-3.45l1.7-8.7Z" fill="#f76512" stroke="#cf5200" strokeLinejoin="round" strokeWidth="1"/><path d="M15.9 6.55c.58.35 1.02.9 1.2 1.55l1.7 8.7c.29 1.48-.6 2.88-1.96 3.32l-.98-.08c.74-.62 1.04-1.6.82-2.72l-1.25-6.7c-.28-1.5-.1-2.8.47-4.07Z" fill="#ad3e00" opacity=".2"/><path d="M6.35 10.05c2.15.62 4.02.48 5.66-.3 1.78-.85 3.62-.92 5.46-.22l.38 1.84c-2.32-.78-4.28-.63-6.04.22-1.62.78-3.45.9-5.78.28l.32-1.82Z" fill="#ffb067" opacity=".34"/><path d="M8.8 6.35c.32-1.92 1.42-3 3.2-3s2.88 1.08 3.2 3" stroke="#fff" strokeLinecap="round" strokeWidth="1.18" opacity=".9"/><path d="M9.25 13.2c.46-.36.92-.36 1.38 0" stroke="#fff" strokeLinecap="round" strokeWidth="1.02" opacity=".96"/><path d="M13.37 13.2c.46-.36.92-.36 1.38 0" stroke="#fff" strokeLinecap="round" strokeWidth="1.02" opacity=".96"/><path d="M9.8 15.82c1.34.94 3.06.94 4.4 0" stroke="#fff" strokeLinecap="round" strokeWidth="1.18" opacity=".96"/></svg>
          </span>`;

const askBagDoodleCss = String.raw`
      .nav-item.nav-item-ask { overflow: visible; }
      .nav-item.nav-item-ask svg {
        transform-origin: 50% 82%;
        transition: transform .18s ease;
      }
      .nav-item.nav-item-ask .ask-emy-bubble {
        display: block;
        position: absolute;
        left: 50%;
        bottom: calc(100% + 13px);
        z-index: 8;
        width: 206px;
        max-width: min(206px, calc(100vw - 32px));
        transform: translate(-50%, 6px) scale(.96);
        opacity: 0;
        pointer-events: none;
        border: 1px solid rgba(255,106,0,.22);
        border-radius: 14px;
        background: rgba(255,255,255,.96);
        color: var(--emy-navy);
        box-shadow: 0 18px 40px rgba(0,27,71,.16), 0 8px 24px rgba(255,106,0,.12);
        padding: 10px 12px;
        font-size: 12px;
        font-weight: 700;
        line-height: 1.35;
        text-align: left;
        white-space: normal;
        backdrop-filter: blur(14px);
        transition: opacity .2s ease, transform .2s ease;
      }
      .nav-item.nav-item-ask .ask-emy-bubble::after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: -7px;
        z-index: 9;
        width: 12px;
        height: 12px;
        transform: translateX(-50%) rotate(45deg);
        pointer-events: none;
        border-bottom: 1px solid rgba(255,106,0,.22);
        border-right: 1px solid rgba(255,106,0,.22);
        background: rgba(255,255,255,.96);
      }
      .nav-item.nav-item-ask.is-emy-intro .ask-emy-bubble {
        animation: emyAskBubbleIntro 6.8s ease both;
      }
      .nav-item.nav-item-ask.is-emy-intro svg {
        animation: emyAskBagHello 2.8s ease-in-out .15s 2;
      }
      .nav-item.nav-item-ask:hover svg,
      .nav-item.nav-item-ask:focus-visible svg {
        animation: emyAskBagWave .7s ease-in-out infinite;
      }
      @keyframes emyAskBagHello {
        0%, 56%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
        8% { transform: translateY(-7px) rotate(-8deg) scale(1.10); }
        16% { transform: translateY(-3px) rotate(7deg) scale(1.08); }
        24% { transform: translateY(-6px) rotate(-5deg) scale(1.10); }
        32% { transform: translateY(0) rotate(0deg) scale(1); }
      }
      @keyframes emyAskBagWave {
        0%, 100% { transform: translateY(-3px) rotate(-7deg) scale(1.10); }
        50% { transform: translateY(-8px) rotate(8deg) scale(1.14); }
      }
      @keyframes emyAskBubbleIntro {
        0%, 8% { opacity: 0; transform: translate(-50%, 8px) scale(.96); }
        14%, 66% { opacity: 1; transform: translate(-50%, 0) scale(1); }
        76%, 100% { opacity: 0; transform: translate(-50%, 6px) scale(.98); }
      }`;

const askBagDoodleScript = String.raw`
        const askBagIntroKey = "emyAskMenuIntroSeen";
        const askBagIntroItem = document.querySelector(".nav-item.nav-item-ask");
        if (askBagIntroItem) {
          let hasSeenAskBagIntro = false;
          try { hasSeenAskBagIntro = window.localStorage.getItem(askBagIntroKey) === "1"; } catch (error) {}
          if (!hasSeenAskBagIntro) {
            askBagIntroItem.classList.add("is-emy-intro");
            try { window.localStorage.setItem(askBagIntroKey, "1"); } catch (error) {}
            window.setTimeout(() => askBagIntroItem.classList.remove("is-emy-intro"), 7200);
          }
        }
`;

const bottomNavTooltipCss = String.raw`
      .nav-item[data-tip]::before {
        content: attr(data-tip);
        position: absolute;
        left: 50%;
        bottom: calc(100% + 10px);
        z-index: 20;
        width: max-content;
        max-width: min(190px, calc(100vw - 24px));
        transform: translate(-50%, 7px);
        opacity: 0;
        pointer-events: none;
        border-radius: 7px;
        background: rgba(0,27,71,.74);
        color: #fff;
        padding: 6px 8px;
        font-size: 11px;
        line-height: 1.25;
        font-weight: 560;
        white-space: nowrap;
        box-shadow: 0 10px 24px rgba(0,27,71,.18);
        backdrop-filter: blur(10px);
        transition: opacity .16s ease, transform .16s ease;
      }
      .nav-item[data-tip]:hover::before,
      .nav-item[data-tip]:focus-visible::before {
        opacity: 1;
        transform: translate(-50%, 0);
      }
      .nav-item[data-nav="home"][data-tip]::before {
        left: 0;
        transform: translate(0, 7px);
      }
      .nav-item[data-nav="home"][data-tip]:hover::before,
      .nav-item[data-nav="home"][data-tip]:focus-visible::before {
        transform: translate(0, 0);
      }
      .nav-item[data-nav="ask"][data-tip]::before {
        left: auto;
        right: 0;
        transform: translate(0, 7px);
      }
      .nav-item[data-nav="ask"][data-tip]:hover::before,
      .nav-item[data-nav="ask"][data-tip]:focus-visible::before {
        transform: translate(0, 0);
      }
      .nav-item.nav-item-ask.is-emy-intro::before { display: none; }`;


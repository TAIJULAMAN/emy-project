/* EMY generator section: 09-feed-create-flow-css.cjs (source lines 7707-8532) */
const feedCreateFlowCss = String.raw`
      .feed-create-open { min-height: 34px; border: 0; border-radius: 999px; background: #064985; color: #fff; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 0 14px; font-size: 12px; line-height: 1; font-weight: 860; box-shadow: 0 12px 24px rgba(0,73,133,.20); }
      .feed-create-open:hover { background: #053f73; transform: translateY(-1px); }
      .feed-create-modal { position: fixed; inset: 0; z-index: 120; display: none; align-items: center; justify-content: center; background: rgba(24,31,42,.58); padding: 18px; backdrop-filter: blur(8px); }
      .feed-create-modal.is-open { display: flex; }
      .feed-create-menu, .feed-post-sheet, .feed-post-source-sheet, .feed-event-sheet, .feed-hiring-sheet, .feed-job-apply-sheet, .feed-article-publish, .feed-discard-dialog { width: min(100%, 650px); max-height: calc(100dvh - 36px); overflow: auto; border: 1px solid rgba(0,27,71,.10); border-radius: 6px; background: #fff; color: #242424; box-shadow: 0 24px 70px rgba(0,27,71,.24); }
      .feed-create-head, .feed-mini-head { min-height: 58px; display: grid; grid-template-columns: minmax(0,1fr) 36px; gap: 10px; align-items: center; border-bottom: 1px solid rgba(0,27,71,.10); padding: 0 12px; }
      .feed-create-head h2, .feed-mini-head h2 { margin: 0; color: #242424; font-size: 22px; line-height: 1.1; font-weight: 680; }
      .feed-create-head button, .feed-mini-head button, .feed-post-head button, .feed-article-top > button { width: 34px; height: 34px; border: 0; border-radius: 999px; background: transparent; color: #333; cursor: pointer; font: inherit; font-size: 18px; line-height: 1; }
      .feed-create-head button:hover, .feed-mini-head button:hover, .feed-post-head button:hover, .feed-article-top > button:hover { background: #eef0f2; }
      .feed-create-options { display: grid; gap: 8px; padding: 18px 28px 20px 8px; }
      .feed-create-option { width: 100%; min-height: 78px; display: grid; grid-template-columns: 42px minmax(0,1fr); gap: 16px; align-items: center; border: 0; background: #fff; color: #3f3f3f; cursor: pointer; padding: 10px 16px; text-align: left; }
      .feed-create-option:hover, .feed-create-option.is-primary { background: #f1f1f1; }
      .feed-create-icon { width: 28px; height: 28px; display: grid; place-items: center; color: #444; font-size: 20px; line-height: 1; font-weight: 820; }
      .feed-create-option strong { display: block; color: #414141; font-size: 19px; line-height: 1.15; font-weight: 680; }
      .feed-create-option small { display: block; margin-top: 5px; color: #555; font-size: 15px; line-height: 1.25; font-weight: 420; }
      .feed-post-sheet { min-height: min(650px, calc(100dvh - 36px)); display: grid; grid-template-rows: auto minmax(180px,1fr) auto auto auto auto; }
      .feed-post-head { min-height: 84px; display: grid; grid-template-columns: 48px minmax(0,1fr) 38px; gap: 12px; align-items: center; padding: 16px 20px; }
      .feed-create-brand-mark { position: relative; width: 44px; height: 44px; display: grid; place-items: center; overflow: hidden; border: 1px solid rgba(0,27,71,.10); border-radius: 14px; background: linear-gradient(145deg,#fff,#fff5ec); color: var(--emy-navy); font-size: 15px; font-weight: 900; box-shadow: 0 0 0 4px rgba(255,246,237,.92), 0 8px 18px rgba(0,27,71,.10); }
      .feed-create-brand-mark img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; }
      .feed-post-head strong { display: block; overflow: hidden; color: #202020; font-size: 21px; line-height: 1.12; font-weight: 740; text-overflow: ellipsis; white-space: nowrap; }
      .feed-post-head small { display: block; margin-top: 3px; color: #303030; font-size: 14px; line-height: 1.1; }
      .feed-post-text { width: 100%; min-height: 280px; resize: none; border: 0; outline: 0; background: transparent; color: #222; padding: 18px 24px; font: inherit; font-size: 24px; line-height: 1.35; }
      .feed-post-text::placeholder, .feed-article-title::placeholder, .feed-article-body::placeholder, .feed-article-publish textarea::placeholder { color: #686868; opacity: 1; }
      .feed-post-foot, .feed-mini-foot { display: flex; flex-wrap: wrap; align-items: center; justify-content: flex-end; gap: 10px; border-top: 1px solid rgba(0,27,71,.10); padding: 12px 16px; background: #fff; }
      .feed-post-sheet .feed-post-foot { position: sticky; bottom: 0; z-index: 12; background: linear-gradient(180deg,#fffdf8,#fff8ef); backdrop-filter: none; box-shadow: 0 -10px 24px rgba(0,27,71,.06); }
      .feed-create-submit { min-height: 34px; border: 0; border-radius: 999px; background: #0a66c2; color: #fff; cursor: pointer; padding: 0 16px; font: inherit; font-size: 13px; line-height: 1; font-weight: 760; }
      .feed-create-submit:disabled { background: #e2e6ea; color: #949ba5; cursor: not-allowed; }
      .feed-event-sheet { width: min(100%, 540px); max-height: min(92dvh, 720px); display: grid; grid-template-rows: auto minmax(0,1fr) auto; overflow: hidden; }
      .feed-event-cover, .feed-article-cover { min-height: 150px; display: grid; place-items: center; gap: 5px; border: 0; border-bottom: 1px solid rgba(0,27,71,.08); background: #efeee9; color: #333; text-align: center; padding: 20px; }
      .feed-event-cover strong, .feed-article-cover strong { font-size: 12px; font-weight: 760; }
      .feed-event-cover span, .feed-article-cover span { font-size: 11px; color: #5f5f5f; }
      .feed-event-template { min-height: 0; overflow-y: auto; display: grid; gap: 10px; padding: 12px; }
      .feed-event-preview { position: relative; min-height: 112px; display: grid; align-content: end; gap: 6px; overflow: hidden; border: 1px solid rgba(255,255,255,.72); border-radius: 14px; background: radial-gradient(circle at 86% 22%, rgba(255,106,0,.24), transparent 82px), linear-gradient(145deg, rgba(255,255,255,.84), rgba(255,245,236,.60)); color: var(--emy-navy); padding: 13px; box-shadow: inset 0 1px 0 rgba(255,255,255,.86), 0 12px 22px rgba(0,27,71,.07); }
      .feed-event-preview::after { content: ""; position: absolute; inset: 0; z-index: 1; display: none; background: linear-gradient(180deg, rgba(0,27,71,.05), rgba(0,27,71,.58)); pointer-events: none; }
      .feed-event-preview.has-cover::after { display: block; }
      .feed-event-preview > img { position: absolute; inset: 0; z-index: 0; width: 100%; height: 100%; object-fit: cover; display: block; }
      .feed-event-preview > img[hidden] { display: none; }
      .feed-event-preview-badge, .feed-event-preview strong, .feed-event-preview small { position: relative; z-index: 2; }
      .feed-event-preview-badge { width: fit-content; min-height: 24px; display: inline-flex; align-items: center; border-radius: 999px; background: rgba(255,255,255,.78); color: var(--emy-orange); padding: 0 9px; font-size: 10.5px; line-height: 1; font-weight: 840; box-shadow: inset 0 0 0 1px rgba(255,106,0,.18); }
      .feed-event-preview strong { display: block; color: var(--emy-navy); font-size: 18px; line-height: 1.12; font-weight: 860; overflow-wrap: anywhere; }
      .feed-event-preview small { color: #667085; font-size: 11.5px; line-height: 1.3; font-weight: 640; overflow-wrap: anywhere; }
      .feed-event-preview.has-cover strong, .feed-event-preview.has-cover small { color: #fff; text-shadow: 0 1px 12px rgba(0,27,71,.48); }
      .feed-event-cover-tools { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
      .feed-event-cover-tools button { min-height: 34px; border: 1px solid rgba(0,27,71,.10); border-radius: 999px; background: rgba(255,255,255,.78); color: var(--emy-navy); cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 7px; padding: 0 12px; font: inherit; font-size: 12px; line-height: 1; font-weight: 820; }
      .feed-event-cover-tools button:hover { border-color: rgba(255,106,0,.28); background: #fff4e8; color: var(--emy-orange); }
      .feed-event-cover-tools button svg { width: 15px; height: 15px; stroke-width: 2.1; }
      .feed-event-form { padding: 0; }
      .feed-event-title-field input { min-height: 38px; font-size: 14px; font-weight: 720; }
      .feed-event-type-pills { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 8px; }
      .feed-event-type-pills label { min-height: 34px; display: flex; align-items: center; justify-content: center; gap: 6px; border: 1px solid rgba(0,27,71,.10); border-radius: 999px; background: rgba(255,255,255,.70); color: var(--emy-navy); cursor: pointer; font-size: 11.5px; font-weight: 740; }
      .feed-event-type-pills input { width: 13px; min-width: 13px; height: 13px; accent-color: var(--emy-orange); }
      .feed-event-note { margin: 0; color: #667085; font-size: 11px; line-height: 1.35; font-weight: 620; }
      .feed-form-grid { display: grid; gap: 12px; padding: 14px; }
      .feed-form-grid label { display: grid; gap: 5px; color: #333; font-size: 11px; font-weight: 720; }
      .feed-form-grid input, .feed-form-grid select, .feed-form-grid textarea { width: 100%; min-width: 0; border: 1px solid #a4a4a4; border-radius: 0; background: #fff; color: #222; outline: 0; padding: 0 8px; font: inherit; font-size: 12px; }
      .feed-form-grid input, .feed-form-grid select { height: 32px; }
      .feed-form-grid textarea { min-height: 100px; resize: vertical; padding-top: 8px; }
      .feed-radio-row { display: flex; align-items: center; gap: 12px; font-weight: 500; }
      .feed-two-col { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 12px; }
      .feed-hiring-sheet { width: min(100%, 930px); background: #f5f6f7; }
      .feed-hiring-body { display: grid; grid-template-columns: minmax(0,650px) minmax(170px,230px); gap: 24px; padding: 0 18px 18px; }
      .feed-hiring-body .feed-form-grid { border: 1px solid #c9c9c9; background: #fff; }
      .feed-hiring-body aside { padding-top: 28px; color: #5c626a; font-size: 11px; line-height: 1.4; }
      .feed-hiring-body aside strong { display: block; color: #333; font-size: 13px; }
      .feed-article-editor-modal { z-index: 122; align-items: stretch; padding: 0; background: rgba(37,37,37,.58); }
      .feed-article-editor { width: 100%; min-height: 100dvh; display: grid; grid-template-rows: 54px minmax(0,1fr); background: #fff; color: #1d1d1d; }
      .feed-article-top { display: grid; grid-template-columns: 44px minmax(130px,220px) minmax(0,1fr) auto 34px; gap: 10px; align-items: center; border-bottom: 1px solid rgba(0,27,71,.10); padding: 0 14px; }
      .feed-article-top strong { display: block; overflow: hidden; font-size: 13px; text-overflow: ellipsis; white-space: nowrap; }
      .feed-article-top small { display: block; font-size: 11px; color: #333; }
      .feed-article-tools { display: flex; justify-content: center; gap: 4px; }
      .feed-article-tools button, .feed-article-top > button:not(.feed-create-submit) { min-height: 30px; width: auto; border: 1px solid rgba(0,27,71,.10); border-radius: 999px; background: #f7f7f7; padding: 0 10px; font-size: 12px; }
      .feed-article-canvas { width: min(100%, 600px); margin: 0 auto; display: grid; gap: 20px; padding: 22px 16px 70px; }
      .feed-article-cover { min-height: 250px; border: 1px solid rgba(0,27,71,.08); cursor: pointer; }
      .feed-article-title, .feed-article-body { width: 100%; border: 0; outline: 0; background: transparent; color: #222; padding: 0; font: inherit; }
      .feed-article-title { font-size: 26px; line-height: 1.2; font-weight: 760; }
      .feed-article-body { min-height: 330px; resize: vertical; font-size: 15px; line-height: 1.7; }
      .feed-article-publish { min-height: 430px; display: grid; grid-template-rows: auto minmax(0,1fr) auto; }
      .feed-article-publish textarea { width: 100%; min-height: 140px; resize: none; border: 0; outline: 0; background: transparent; color: #222; padding: 16px; font: inherit; font-size: 15px; line-height: 1.45; }
      .feed-article-preview { margin: 0 16px 16px; border: 1px solid rgba(0,27,71,.10); border-radius: 5px; background: #f6f8fa; padding: 12px; }
      .feed-article-preview strong, .feed-article-preview span { display: block; color: #17233d; font-size: 14px; line-height: 1.3; }
      .feed-article-preview span { margin-top: 6px; color: #68738a; font-size: 12px; }
      .feed-discard-modal { z-index: 126; }
      .feed-discard-dialog { width: min(100%, 290px); }
      .feed-discard-dialog p { margin: 0; padding: 14px 14px 16px; color: #333; font-size: 12px; line-height: 1.35; }
      .feed-create-modal { background: radial-gradient(circle at 76% 10%, rgba(255,106,0,.18), transparent 260px), rgba(0,27,71,.50); }
      .feed-create-menu, .feed-post-sheet, .feed-post-source-sheet, .feed-event-sheet, .feed-hiring-sheet, .feed-job-apply-sheet, .feed-article-publish, .feed-discard-dialog {
        border: 1px solid rgba(255,255,255,.62);
        border-radius: 18px;
        background: linear-gradient(145deg, rgba(255,255,255,.92), rgba(255,250,245,.80));
        color: var(--emy-navy);
        box-shadow: 0 30px 80px rgba(0,27,71,.24), inset 0 1px 0 rgba(255,255,255,.86);
        backdrop-filter: blur(22px);
      }
      .feed-create-menu { width: min(100%, 560px); overflow: hidden; }
      .feed-create-head, .feed-mini-head {
        min-height: 66px;
        border-bottom: 1px solid rgba(0,27,71,.08);
        background: linear-gradient(180deg, rgba(255,255,255,.70), rgba(255,255,255,.34));
        padding: 0 18px 0 20px;
      }
      .feed-create-head h2, .feed-mini-head h2 { color: var(--emy-navy); font-size: 22px; font-weight: 860; }
      .feed-create-head button, .feed-mini-head button, .feed-post-head button, .feed-article-top > button {
        color: var(--emy-navy);
        box-shadow: none;
      }
      .feed-create-options { gap: 10px; padding: 14px; }
      .feed-create-option {
        min-height: 74px;
        grid-template-columns: 46px minmax(0,1fr);
        gap: 13px;
        border: 1px solid rgba(255,255,255,.70);
        border-radius: 15px;
        background: linear-gradient(145deg, rgba(255,255,255,.72), rgba(255,255,255,.38));
        color: var(--emy-navy);
        padding: 12px;
        box-shadow: 0 12px 26px rgba(0,27,71,.07), inset 0 1px 0 rgba(255,255,255,.88);
        transition: transform .16s ease, border-color .16s ease, box-shadow .16s ease, background .16s ease;
      }
      .feed-create-option:hover, .feed-create-option.is-primary {
        border-color: rgba(255,106,0,.28);
        background: linear-gradient(145deg, rgba(255,255,255,.92), rgba(255,244,232,.70));
        transform: translateY(-1px);
        box-shadow: 0 16px 32px rgba(0,27,71,.10), 0 10px 22px rgba(255,106,0,.10), inset 0 1px 0 rgba(255,255,255,.90);
      }
      .feed-create-icon {
        width: 42px;
        height: 42px;
        border: 1px solid rgba(255,255,255,.84);
        border-radius: 14px;
        background: linear-gradient(145deg, rgba(255,255,255,.94), rgba(255,255,255,.42));
        color: var(--emy-navy);
        box-shadow: inset 0 1px 0 rgba(255,255,255,.84), inset 0 -8px 14px rgba(0,27,71,.06), 0 10px 20px rgba(0,27,71,.10);
      }
      .feed-create-icon svg { width: 22px; height: 22px; stroke-width: 2.1; }
      .feed-create-option:hover .feed-create-icon, .feed-create-option.is-primary .feed-create-icon { color: var(--emy-orange); border-color: rgba(255,106,0,.26); box-shadow: inset 0 1px 0 rgba(255,255,255,.88), inset 0 -8px 14px rgba(255,106,0,.08), 0 12px 22px rgba(0,27,71,.12); }
      .feed-create-option strong { color: var(--emy-navy); font-size: 16px; font-weight: 860; }
      .feed-create-option small { margin-top: 4px; color: #667085; font-size: 12.5px; line-height: 1.32; font-weight: 560; }
      .feed-post-sheet, .feed-article-publish { width: min(100%, 640px); border-radius: 18px; }
      .feed-post-head { min-height: 78px; padding: 15px 18px; }
      .feed-post-head strong { color: var(--emy-navy); font-size: 18px; font-weight: 860; }
      .feed-post-head small { color: #667085; font-size: 12px; font-weight: 640; }
      .feed-post-text {
        min-height: 240px;
        color: var(--emy-navy);
        font-size: 21px;
        background: rgba(255,255,255,.32);
      }
      .feed-post-kind-tabs { display: grid; grid-template-columns: repeat(4,minmax(0,1fr)); gap: 8px; padding: 0 16px 10px; }
      .feed-post-sheet.is-clip-composer .feed-post-kind-tabs { grid-template-columns: 1fr; }
      .feed-post-sheet.is-clip-composer .feed-post-kind-tabs button:not([data-feed-post-mode="video"]) { display: none; }
      .feed-post-sheet.is-clip-composer.is-video-post-active .feed-post-text,
      .feed-post-sheet.is-clip-composer.is-video-post-active [data-feed-post-text] { display: none !important; }
      .feed-post-sheet.is-clip-composer.is-clip-media-locked .feed-post-kind-tabs button:not([data-feed-post-mode="video"]),
      .feed-post-sheet.is-clip-composer.is-video-post-active .feed-post-kind-tabs button:not([data-feed-post-mode="video"]) { display: none !important; }
      .feed-post-kind-tabs button, .feed-post-tools button, .feed-post-media > [data-feed-post-edit-media], .feed-post-media > [data-feed-post-remove-media] {
        min-height: 38px;
        border: 1px solid rgba(255,255,255,.78);
        border-radius: 999px;
        background: linear-gradient(145deg, rgba(255,255,255,.78), rgba(255,255,255,.36));
        color: var(--emy-navy);
        cursor: pointer;
        font: inherit;
        font-size: 12px;
        line-height: 1;
        font-weight: 780;
        box-shadow: inset 0 1px 0 rgba(255,255,255,.82), 0 10px 22px rgba(0,27,71,.08);
      }
      .feed-post-kind-tabs button:hover, .feed-post-kind-tabs button.is-active, .feed-post-tools button:hover, .feed-post-media > [data-feed-post-edit-media]:hover, .feed-post-media > [data-feed-post-remove-media]:hover {
        border-color: rgba(255,106,0,.34);
        background: linear-gradient(145deg, rgba(255,255,255,.94), rgba(255,244,232,.70));
        color: var(--emy-orange);
      }
      .feed-post-tools { display: block; padding: 0 16px 12px; }
      .feed-post-tools button { display: none; }
      .feed-post-tools svg { width: 17px; height: 17px; stroke-width: 2.2; }
      .feed-post-tools span[data-feed-post-help] { min-width: 0; color: #667085; font-size: 12px; line-height: 1.3; font-weight: 640; overflow-wrap: anywhere; }
      .feed-post-media { position: relative; isolation: isolate; min-height: 280px; overflow: hidden; margin: 0 16px 14px; border: 1px solid rgba(255,255,255,.70); border-radius: 16px; background: #101828; aspect-ratio: var(--media-aspect-ratio, 1 / 1); box-shadow: inset 0 1px 0 rgba(255,255,255,.18), 0 14px 28px rgba(0,27,71,.08); }
      .feed-post-media[hidden] { display: none; }
      .feed-post-media[data-clip-frame="phone"] { width: min(calc(100% - 56px), 230px); min-height: 0; max-height: min(420px, 48dvh); margin-inline: auto; border-radius: 28px; aspect-ratio: 9 / 16; box-shadow: 0 18px 40px rgba(0,27,71,.18), inset 0 1px 0 rgba(255,255,255,.18); }
      .feed-post-media[data-clip-frame="phone"]::before { content: ""; position: absolute; inset: 7px; z-index: 1; border: 1px solid rgba(255,255,255,.16); border-radius: 22px; pointer-events: none; }
      .feed-post-sheet.has-media, [data-feed-post-sheet].has-media .feed-post-sheet { grid-template-rows: auto auto auto auto minmax(0,auto) auto; }
      .feed-post-sheet.has-media .feed-post-text, [data-feed-post-sheet].has-media .feed-post-text { min-height: 104px; max-height: 150px; font-size: 19px; }
      .feed-post-sheet.has-media .feed-post-media, [data-feed-post-sheet].has-media .feed-post-media { max-height: min(460px, 52dvh); min-height: min(320px, 46dvh); align-self: start; }
      .feed-post-sheet.has-media .feed-post-media[data-clip-frame="phone"], [data-feed-post-sheet].has-media .feed-post-media[data-clip-frame="phone"] { max-height: min(420px, 48dvh); }
      .feed-post-sheet.has-media .feed-post-foot, [data-feed-post-sheet].has-media .feed-post-foot { position: static; z-index: 4; box-shadow: none; }
      .feed-post-media img, .feed-post-media video { position: absolute; inset: 0; width: 100%; height: 100%; min-height: 0; object-fit: var(--media-fit, contain); transform: translate(var(--media-x, 0%), var(--media-y, 0%)) scale(var(--media-zoom, 1)); transform-origin: center; display: block; background: #101828; }
      .feed-post-media img[hidden], .feed-post-media video[hidden] { display: none; }
      .feed-post-media::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; z-index: 2; height: 88px; background: linear-gradient(180deg, transparent, rgba(0,27,71,.52)); pointer-events: none; }
      .feed-post-media > [data-feed-post-edit-media],
      .feed-post-media > [data-feed-post-remove-media] { position: absolute; right: 12px; bottom: 10px; z-index: 6; min-height: 34px; border: 1px solid rgba(255,255,255,.68); border-radius: 999px; background: rgba(255,255,255,.84); color: var(--emy-navy); cursor: pointer; padding: 0 13px; font: inherit; font-size: 12px; line-height: 1; font-weight: 780; box-shadow: 0 12px 24px rgba(0,27,71,.18), inset 0 1px 0 rgba(255,255,255,.88); backdrop-filter: blur(12px) saturate(1.08); }
      .feed-post-media > [data-feed-post-edit-media] { left: 12px; right: auto; }
      .feed-post-media > [data-feed-post-remove-media] { color: #b42318; }
      .feed-post-media.has-carousel { padding-bottom: 52px; }
      .feed-post-media.has-carousel::after { height: 108px; }
      .feed-post-media.has-carousel > [data-feed-post-edit-media],
      .feed-post-media.has-carousel > [data-feed-post-remove-media] { bottom: 8px; z-index: 12; }
      .feed-post-media .feed-media-carousel { z-index: 3; }
      .feed-post-media.has-carousel > img,
      .feed-post-media.has-carousel > video { display: none !important; }
      .feed-post-media .feed-media-carousel-slide.is-active .emy-video-player,
      .feed-post-media .feed-media-carousel-slide.is-active video { pointer-events: auto; }
      .feed-post-media .feed-media-carousel-arrow { z-index: 14; pointer-events: auto; top: calc(50% - 26px); bottom: auto; right: auto; transform: translateY(-50%); }
      .feed-post-media .feed-media-carousel-arrow.is-prev { left: 10px; }
      .feed-post-media .feed-media-carousel-arrow.is-next { right: 10px; }
      .feed-post-media .feed-media-carousel-dots { bottom: 58px; z-index: 13; }
      .feed-post-media .feed-media-carousel-count { bottom: 58px; z-index: 13; }
      .feed-post-media .feed-media-carousel-slide .emy-video-player .emy-video-controls { bottom: 54px; }
      .emy-media-overlay-text { position: absolute; left: var(--overlay-x, 50%); top: var(--overlay-y, 84%); z-index: 3; width: max-content; max-width: min(86%, calc(100% - 24px)); color: #fff; font-size: clamp(18px, 4vw, 30px); line-height: 1.08; font-weight: 900; letter-spacing: 0; text-align: center; white-space: pre-wrap; overflow-wrap: anywhere; text-shadow: 0 2px 16px rgba(0,27,71,.72); transform: translate(-50%, -50%); pointer-events: none; }
      .emy-media-overlay-text[hidden] { display: none !important; }
      .emy-media-editor-stage .emy-media-overlay-text { pointer-events: auto; cursor: grab; touch-action: none; user-select: none; }
      .emy-media-editor-stage .emy-media-overlay-text.is-dragging { cursor: grabbing; }
      body.emy-media-editor-locked { overflow: hidden; }
      .emy-media-editor-modal { position: fixed; inset: 0; z-index: 10080; display: none; align-items: center; justify-content: center; padding: 18px; background: rgba(0,27,71,.52); backdrop-filter: blur(12px); }
      .emy-media-editor-modal.is-open { display: flex; }
      .emy-media-editor { width: min(100%, 900px); max-height: calc(100dvh - 36px); overflow: auto; border: 1px solid rgba(255,255,255,.68); border-radius: 18px; background: radial-gradient(circle at 86% 10%, rgba(255,106,0,.16), transparent 250px), linear-gradient(180deg,#fff,#fff8ef); color: var(--emy-navy); box-shadow: 0 30px 86px rgba(0,27,71,.30); }
      .emy-media-editor-head { min-height: 72px; display: grid; grid-template-columns: minmax(0,1fr) 38px; gap: 12px; align-items: center; border-bottom: 1px solid rgba(0,27,71,.08); padding: 14px 18px; }
      .emy-media-editor-head h2 { margin: 0; font-size: 22px; line-height: 1.12; font-weight: 900; }
      .emy-media-editor-head p { margin: 5px 0 0; color: #667085; font-size: 12.5px; line-height: 1.35; font-weight: 560; }
      .emy-media-editor-head button { width: 38px; height: 38px; border: 1px solid rgba(0,27,71,.08); border-radius: 999px; background: rgba(255,255,255,.86); color: var(--emy-navy); cursor: pointer; font: inherit; font-size: 18px; font-weight: 820; }
      .emy-media-editor-body { display: grid; grid-template-columns: minmax(0,460px) 320px; justify-content: center; gap: 18px; padding: 18px; }
      .emy-media-editor-preview { min-width: 0; display: grid; place-items: center; border-radius: 16px; background: linear-gradient(145deg, rgba(0,27,71,.08), rgba(255,106,0,.08)); padding: 14px; }
      .emy-media-editor-stage { position: relative; width: min(100%, 460px); overflow: hidden; border-radius: 16px; background: #101828; aspect-ratio: var(--media-aspect-ratio, 1 / 1); box-shadow: 0 20px 48px rgba(0,27,71,.24); }
      .emy-media-editor-stage.is-phone-frame { width: min(100%, 280px); border-radius: 28px; box-shadow: 0 22px 50px rgba(0,27,71,.26), inset 0 0 0 7px #101828; }
      .emy-media-editor-stage img, .emy-media-editor-stage video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: var(--media-fit, contain); transform: translate(var(--media-x, 0%), var(--media-y, 0%)) scale(var(--media-zoom, 1)); transform-origin: center; background: #101828; }
      .emy-media-editor-stage img[hidden], .emy-media-editor-stage video[hidden] { display: none; }
      .emy-media-editor-panel { display: grid; gap: 12px; align-content: start; }
      .emy-media-editor-panel label { display: grid; gap: 7px; color: #173057; font-size: 12px; line-height: 1.25; font-weight: 780; }
      .emy-media-editor-panel input, .emy-media-editor-panel select, .emy-media-editor-panel textarea { min-height: 40px; width: 100%; border: 1px solid rgba(0,27,71,.10); border-radius: 12px; background: rgba(255,255,255,.86); color: var(--emy-navy); padding: 0 12px; font: inherit; font-size: 13px; font-weight: 620; outline: none; }
      .emy-media-editor-panel input[type="range"] { min-height: 24px; padding: 0; accent-color: var(--emy-orange); background: transparent; }
      .emy-media-editor-panel textarea { min-height: 64px; padding: 10px 12px; resize: vertical; }
      .emy-media-editor-product-fields { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 9px; border: 1px solid rgba(255,107,0,.24); border-radius: 14px; background: rgba(255,255,255,.62); padding: 10px; box-shadow: inset 0 1px 0 rgba(255,255,255,.72); }
      .emy-media-editor-product-fields[hidden] { display: none; }
      .emy-media-editor-product-fields > strong { grid-column: 1 / -1; color: var(--emy-navy); font-size: 13px; line-height: 1.2; }
      .emy-media-editor-product-fields .is-wide { grid-column: 1 / -1; }
      .emy-media-editor-money-row { display: grid; grid-template-columns: minmax(82px,.42fr) minmax(0,1fr); gap: 7px; }
      .emy-media-editor-money-row select, .emy-media-editor-money-row input { min-width: 0; }
      .emy-media-editor-choice { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 8px; }
      .emy-media-editor-choice button, .emy-media-editor-foot button { min-height: 40px; border: 1px solid rgba(0,27,71,.10); border-radius: 999px; background: rgba(255,255,255,.86); color: var(--emy-navy); cursor: pointer; font: inherit; font-size: 12px; font-weight: 840; }
      .emy-media-editor-choice button.is-active, .emy-media-editor-foot button[data-emy-media-editor-post] { border-color: rgba(255,106,0,.34); background: linear-gradient(135deg,#ff7a1a,#ff6a00); color: #fff; box-shadow: 0 12px 24px rgba(255,106,0,.20); }
      .emy-media-editor-muted { grid-template-columns: auto minmax(0,1fr) !important; align-items: center; }
      .emy-media-editor-muted input { width: 18px; min-height: 18px; accent-color: var(--emy-orange); }
      .emy-media-editor-muted[hidden] { display: none; }
      .emy-media-editor-thumbnail { display: grid; gap: 8px; border: 1px solid rgba(0,27,71,.08); border-radius: 14px; background: rgba(255,255,255,.58); padding: 10px; box-shadow: inset 0 1px 0 rgba(255,255,255,.78); }
      .emy-media-editor-thumbnail[hidden] { display: none; }
      .emy-media-editor-thumbnail-preview { position: relative; min-height: 74px; overflow: hidden; border: 1px solid rgba(0,27,71,.10); border-radius: 12px; background: linear-gradient(145deg, rgba(238,243,248,.96), rgba(255,248,241,.92)); display: grid; place-items: center; color: #667085; font-size: 12px; font-weight: 760; text-align: center; }
      .emy-media-editor-thumbnail.is-phone-frame .emy-media-editor-thumbnail-preview { width: min(100%, 124px); min-height: 0; aspect-ratio: 9 / 16; justify-self: center; border-radius: 18px; }
      .emy-media-editor-thumbnail-preview img { width: 100%; height: 100%; object-fit: cover; display: block; }
      .emy-media-editor-thumbnail-actions { display: grid; grid-template-columns: 1fr auto; gap: 8px; align-items: center; }
      .emy-media-editor-thumbnail-actions button { min-height: 36px; border: 1px solid rgba(0,27,71,.10); border-radius: 999px; background: rgba(255,255,255,.88); color: var(--emy-navy); cursor: pointer; padding: 0 12px; font: inherit; font-size: 12px; font-weight: 840; }
      .emy-media-editor-thumbnail-actions button:first-child { border-color: rgba(255,106,0,.24); color: #c14f00; }
      .emy-media-editor-thumbnail-actions button[hidden] { display: none; }
      .emy-media-editor-thumbnail small { color: #667085; font-size: 11.5px; line-height: 1.3; font-weight: 620; }
      .emy-media-editor-foot { display: grid; grid-template-columns: auto minmax(0,1fr) auto auto; gap: 10px; align-items: center; border-top: 1px solid rgba(0,27,71,.08); padding: 14px 18px 18px; }
      .emy-media-editor-foot button[data-emy-media-editor-apply] { border-color: rgba(0,27,71,.14); background: #fff; }
      @media (max-width: 760px) {
        .emy-media-editor { max-height: 100dvh; border-radius: 18px 18px 0 0; }
        .emy-media-editor-modal { align-items: flex-end; padding: 0; }
        .emy-media-editor-body { grid-template-columns: 1fr; padding: 12px; }
        .emy-media-editor-stage.is-phone-frame { width: min(72vw, 220px); }
        .emy-media-editor-foot { grid-template-columns: 1fr 1fr; }
        .emy-media-editor-foot span { display: none; }
      }
      .feed-post-source-sheet { width: min(100%, 430px); padding: 16px; border-radius: 18px; }
      .feed-post-source-head { display: grid; grid-template-columns: minmax(0,1fr) 34px; gap: 10px; align-items: start; padding: 2px 0 12px; }
      .feed-post-source-head h2 { margin: 0; color: var(--emy-navy); font-size: 20px; line-height: 1.15; font-weight: 880; }
      .feed-post-source-head p { margin: 6px 0 0; color: #667085; font-size: 12.5px; line-height: 1.35; font-weight: 600; }
      .feed-post-source-head button { width: 34px; height: 34px; border: 0; border-radius: 999px; background: rgba(255,255,255,.68); color: var(--emy-navy); cursor: pointer; font-size: 18px; }
      .feed-post-source-options { display: grid; gap: 10px; }
      .feed-post-source-options button {
        min-height: 70px;
        display: grid;
        grid-template-columns: 42px minmax(0,1fr);
        gap: 12px;
        align-items: center;
        border: 1px solid rgba(255,255,255,.72);
        border-radius: 15px;
        background: linear-gradient(145deg, rgba(255,255,255,.84), rgba(255,255,255,.42));
        color: var(--emy-navy);
        cursor: pointer;
        padding: 12px;
        text-align: left;
        box-shadow: inset 0 1px 0 rgba(255,255,255,.84), 0 12px 24px rgba(0,27,71,.08);
      }
      .feed-post-source-options button:hover { border-color: rgba(255,106,0,.30); color: var(--emy-orange); transform: translateY(-1px); }
      .feed-post-source-icon { width: 42px; height: 42px; display: grid; place-items: center; border-radius: 14px; background: rgba(255,255,255,.78); box-shadow: inset 0 1px 0 rgba(255,255,255,.88), 0 8px 16px rgba(0,27,71,.08); }
      .feed-post-source-icon svg { width: 21px; height: 21px; stroke-width: 2.2; }
      .feed-post-source-options strong { display: block; color: currentColor; font-size: 14px; line-height: 1.15; font-weight: 860; }
      .feed-post-source-options small { display: block; margin-top: 4px; color: #667085; font-size: 11.5px; line-height: 1.3; font-weight: 600; }
      .feed-clip-frame-sheet { width: min(100%, 640px); max-height: calc(100dvh - 36px); overflow: auto; border: 1px solid rgba(255,255,255,.78); border-radius: 18px; background: linear-gradient(180deg,#fff,#fff8ef); color: var(--emy-navy); box-shadow: 0 26px 72px rgba(0,27,71,.28); }
      .feed-clip-frame-body { display: grid; gap: 13px; padding: 14px; background: rgba(255,255,255,.80); }
      .feed-clip-frame-intro { margin: 0; color: #173057; font-size: 13.5px; line-height: 1.35; font-weight: 820; }
      .feed-clip-frame-options { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 12px; }
      .feed-clip-frame-choice { min-width: 0; display: grid; grid-template-columns: 76px minmax(0,1fr); gap: 12px; align-items: center; border: 1px solid rgba(0,27,71,.10); border-radius: 16px; background: rgba(255,255,255,.94); color: var(--emy-navy); cursor: pointer; padding: 12px; text-align: left; box-shadow: inset 0 1px 0 rgba(255,255,255,.90), 0 12px 24px rgba(0,27,71,.08); }
      .feed-clip-frame-choice:hover, .feed-clip-frame-choice.is-active { border-color: rgba(255,106,0,.34); background: linear-gradient(145deg, rgba(255,255,255,.96), rgba(255,244,232,.74)); color: var(--emy-orange); transform: translateY(-1px); }
      .feed-clip-frame-choice strong { display: block; color: var(--emy-navy); font-size: 14.5px; line-height: 1.14; font-weight: 900; }
      .feed-clip-frame-choice small { display: block; margin-top: 4px; color: #42526b; font-size: 12px; line-height: 1.28; font-weight: 740; }
      .feed-clip-frame-preview { min-width: 0; height: 86px; display: grid; place-items: center; border-radius: 15px; background: linear-gradient(145deg, rgba(238,243,248,.96), rgba(255,248,241,.92)); box-shadow: inset 0 1px 0 rgba(255,255,255,.88), 0 8px 16px rgba(0,27,71,.06); }
      .feed-clip-frame-preview i { display: block; background: #101828; box-shadow: inset 0 1px 0 rgba(255,255,255,.16), 0 10px 18px rgba(0,27,71,.18); }
      .feed-clip-frame-preview.is-phone i { width: 38px; height: 68px; border: 4px solid #0b1528; border-radius: 13px; }
      .feed-clip-frame-preview.is-original i { width: 58px; height: 42px; border: 4px solid #0b1528; border-radius: 11px; }
      .feed-clip-kind-options { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 10px; }
      .feed-clip-kind-choice { min-height: 64px; display: grid; gap: 5px; align-content: center; border: 1px solid rgba(0,27,71,.10); border-radius: 15px; background: rgba(255,255,255,.94); color: var(--emy-navy); cursor: pointer; padding: 11px 12px; text-align: left; box-shadow: inset 0 1px 0 rgba(255,255,255,.88), 0 10px 20px rgba(0,27,71,.07); }
      .feed-clip-kind-choice strong { color: var(--emy-navy); font-size: 13.5px; line-height: 1.1; font-weight: 900; }
      .feed-clip-kind-choice small { color: #42526b; font-size: 11.8px; line-height: 1.25; font-weight: 740; }
      .feed-clip-kind-choice:hover, .feed-clip-kind-choice.is-active { border-color: rgba(255,106,0,.34); background: linear-gradient(145deg, rgba(255,255,255,.94), rgba(255,244,232,.74)); color: var(--emy-orange); }
      .feed-post-product-fields { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 9px; margin: 0 16px 12px; border: 1px solid rgba(255,255,255,.64); border-radius: 15px; background: rgba(255,255,255,.50); padding: 10px; box-shadow: inset 0 1px 0 rgba(255,255,255,.78); }
      .feed-post-product-fields[hidden] { display: none; }
      .feed-post-product-fields label { display: grid; gap: 5px; color: var(--emy-navy); font-size: 11.4px; line-height: 1.2; font-weight: 780; }
      .feed-post-product-fields input, .feed-post-product-fields select, .feed-post-product-fields textarea { width: 100%; min-width: 0; border: 1px solid rgba(0,27,71,.10); border-radius: 11px; background: rgba(255,255,255,.86); color: var(--emy-navy); padding: 0 10px; font: inherit; font-size: 12px; font-weight: 650; outline: none; }
      .feed-post-product-fields input, .feed-post-product-fields select { min-height: 36px; }
      .feed-post-product-fields textarea { min-height: 62px; padding-top: 8px; resize: vertical; }
      .feed-post-product-fields .is-wide { grid-column: 1 / -1; }
      .feed-product-money-row { display: grid; grid-template-columns: minmax(82px,.42fr) minmax(0,1fr); gap: 7px; }
      .feed-product-money-row select, .feed-product-money-row input { min-width: 0; }
      .feed-post-camera-sheet { width: min(100%, 520px); padding: 16px; border-radius: 18px; }
      .feed-post-camera-frame { position: relative; margin-top: 14px; width: 100%; aspect-ratio: 4 / 3; overflow: hidden; border: 1px solid rgba(0,27,71,.12); border-radius: 15px; background: #101828; }
      .feed-post-camera-frame.is-video { aspect-ratio: 16 / 9; }
      .feed-post-camera-frame.is-phone-frame { width: min(100%, 300px); margin-inline: auto; aspect-ratio: 9 / 16; border: 7px solid #101828; border-radius: 30px; box-shadow: 0 20px 42px rgba(0,27,71,.24), inset 0 1px 0 rgba(255,255,255,.18); }
      .feed-post-camera-frame.is-phone-frame::before { content: ""; position: absolute; left: 50%; top: 7px; z-index: 2; width: 68px; height: 5px; border-radius: 999px; background: rgba(255,255,255,.22); transform: translateX(-50%); pointer-events: none; }
      .feed-post-camera-preview { display: block; width: 100%; height: 100%; object-fit: cover; background: #101828; }
      .feed-post-camera-sound { display: none; align-items: center; justify-content: center; gap: 8px; min-height: 36px; margin-top: 10px; border: 1px solid rgba(0,27,71,.10); border-radius: 10px; background: rgba(255,255,255,.72); color: var(--emy-navy); font-size: 12px; font-weight: 720; }
      .feed-post-camera-sound.is-visible { display: flex; }
      .feed-post-camera-sound input { width: 15px; height: 15px; margin: 0; accent-color: var(--emy-orange); }
      .feed-post-camera-timer { display: none; width: fit-content; margin: 10px auto 0; border-radius: 999px; background: #fff4e8; color: #9a4b00; padding: 5px 12px; font-size: 12px; line-height: 1; font-weight: 760; }
      .feed-post-camera-timer.is-visible { display: block; }
      .feed-post-camera-status { min-height: 18px; margin: 10px 0 0; color: #9a4b00; text-align: center; font-size: 12px; line-height: 1.35; font-weight: 650; }
      .feed-post-camera-actions { margin-top: 14px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
      .feed-post-camera-actions button { min-height: 40px; border-radius: 9px; cursor: pointer; padding: 0 12px; font-size: 13px; font-weight: 760; }
      .feed-post-camera-actions button:first-child { border: 1px solid rgba(0,27,71,.12); background: #fff; color: var(--emy-navy); }
      .feed-post-camera-actions button:not(:first-child) { border: 0; background: var(--emy-orange); color: #fff; }
      .feed-post-camera-actions .feed-post-camera-stop { background: #b42318; }
      .feed-post-camera-actions button[hidden] { display: none; }
      .feed-post-foot, .feed-mini-foot { background: rgba(255,255,255,.44); }
      .feed-post-sheet .feed-post-foot { background: linear-gradient(180deg,#fffdf8,#fff8ef); }
      .feed-post-foot button, .feed-mini-foot button {
        min-height: 38px;
        border: 1px solid rgba(0,27,71,.10);
        border-radius: 999px;
        background: linear-gradient(145deg, rgba(255,255,255,.88), rgba(255,255,255,.50));
        color: var(--emy-navy);
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        padding: 0 14px;
        font: inherit;
        font-size: 12.5px;
        line-height: 1;
        font-weight: 820;
        white-space: nowrap;
        box-shadow: inset 0 1px 0 rgba(255,255,255,.86), 0 10px 22px rgba(0,27,71,.08);
        transition: transform .16s ease, border-color .16s ease, background .16s ease, color .16s ease, box-shadow .16s ease;
      }
      .feed-post-foot button:hover, .feed-mini-foot button:hover {
        border-color: rgba(255,106,0,.28);
        background: #fff4e8;
        color: #c14f00;
        transform: translateY(-1px);
        box-shadow: inset 0 1px 0 rgba(255,255,255,.90), 0 12px 24px rgba(255,106,0,.10), 0 10px 22px rgba(0,27,71,.08);
      }
      .feed-create-submit, .feed-post-foot .feed-create-submit, .feed-mini-foot .feed-create-submit {
        border-color: transparent;
        background: var(--emy-orange);
        color: #fff;
        box-shadow: 0 12px 24px rgba(255,106,0,.18);
      }
      .feed-create-submit:hover:not(:disabled), .feed-post-foot .feed-create-submit:hover:not(:disabled), .feed-mini-foot .feed-create-submit:hover:not(:disabled) {
        border-color: transparent;
        background: #f25f00;
        color: #fff;
        transform: translateY(-1px);
      }
      .feed-post-foot button:disabled, .feed-mini-foot button:disabled, .feed-create-submit:disabled {
        border-color: rgba(0,27,71,.06);
        background: linear-gradient(145deg, #fff7ed, #eef4fb);
        color: #98a2b3;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
      }
      .feed-event-sheet, .feed-hiring-sheet { border-radius: 18px; }
      .feed-event-cover, .feed-article-cover {
        border: 1px solid rgba(255,255,255,.66);
        border-radius: 15px;
        background: linear-gradient(145deg, rgba(255,255,255,.54), rgba(255,244,232,.56));
        color: var(--emy-navy);
        box-shadow: inset 0 1px 0 rgba(255,255,255,.84);
      }
      .feed-event-template .feed-form-grid { gap: 9px; border: 1px solid rgba(255,255,255,.58); border-radius: 16px; background: rgba(255,255,255,.46); padding: 10px; box-shadow: inset 0 1px 0 rgba(255,255,255,.74); }
      .feed-event-template .feed-form-grid label { gap: 4px; color: var(--emy-navy); font-size: 11.5px; font-weight: 760; }
      .feed-event-template .feed-form-grid input, .feed-event-template .feed-form-grid select { height: 38px; font-size: 12.5px; font-weight: 650; }
      .feed-event-template .feed-form-grid textarea { min-height: 82px; padding-top: 8px; font-size: 12.5px; font-weight: 650; }
      .feed-event-sheet .feed-mini-foot { position: sticky; bottom: 0; z-index: 3; background: rgba(255,255,255,.78); backdrop-filter: blur(14px); padding: 10px 14px; }
      .feed-event-sheet .feed-create-submit { min-width: 118px; min-height: 38px; }
      .feed-form-grid input, .feed-form-grid select, .feed-form-grid textarea {
        border: 1px solid rgba(0,27,71,.12);
        border-radius: 10px;
        background: rgba(255,255,255,.78);
        color: var(--emy-navy);
      }
      .feed-hiring-sheet { background: linear-gradient(145deg, rgba(255,255,255,.88), rgba(255,250,245,.76)); }
      .feed-hiring-body .feed-form-grid { border-color: rgba(255,255,255,.62); border-radius: 15px; background: rgba(255,255,255,.54); }
      .feed-article-editor { background: linear-gradient(180deg, rgba(255,253,248,.98), rgba(255,248,241,.96)); }
      .feed-article-top { border-bottom-color: rgba(0,27,71,.08); background: rgba(255,255,255,.80); backdrop-filter: blur(18px); }
      .feed-article-tools button, .feed-article-top > button:not(.feed-create-submit) { border-color: rgba(0,27,71,.08); background: rgba(255,255,255,.78); color: var(--emy-navy); }
      .feed-article-canvas { gap: 18px; }
      .feed-article-title, .feed-article-body { color: var(--emy-navy); }
      .feed-article-preview { border-color: rgba(255,255,255,.64); border-radius: 14px; background: rgba(255,255,255,.62); box-shadow: inset 0 1px 0 rgba(255,255,255,.78); }
      .feed-article-editor-modal { align-items: stretch; padding: 0; background: radial-gradient(circle at 76% 10%, rgba(255,106,0,.18), transparent 280px), rgba(0,27,71,.52); }
      .feed-article-editor { min-height: 100dvh; grid-template-rows: auto minmax(0,1fr); background: linear-gradient(180deg,#fffdf8,#fff8ef); }
      .feed-article-top { min-height: 72px; grid-template-columns: 44px minmax(0,1fr) auto auto 38px; gap: 12px; padding: 12px 18px; }
      .feed-article-top strong { color: var(--emy-navy); font-size: 17px; line-height: 1.12; font-weight: 880; }
      .feed-article-top small { color: #667085; font-size: 12px; line-height: 1.2; font-weight: 680; }
      .feed-article-tools { display: inline-flex; align-items: center; justify-content: flex-end; gap: 7px; min-width: 0; }
      .feed-article-tools span { min-height: 28px; display: inline-flex; align-items: center; border-radius: 999px; background: rgba(255,255,255,.72); color: #667085; padding: 0 10px; font-size: 11.5px; line-height: 1; font-weight: 780; box-shadow: inset 0 0 0 1px rgba(0,27,71,.07); }
      .feed-article-tools span:first-child { background: #fff4e8; color: var(--emy-orange); box-shadow: inset 0 0 0 1px rgba(255,106,0,.18); }
      .feed-article-top .feed-create-submit { width: auto; min-width: 154px; min-height: 42px; display: inline-flex; align-items: center; justify-content: center; flex: 0 0 auto; padding: 0 22px; white-space: nowrap; font-size: 13.5px; line-height: 1; font-weight: 780; text-align: center; box-shadow: 0 14px 28px rgba(255,106,0,.22), inset 0 1px 0 rgba(255,255,255,.22); }
      .feed-article-workspace { min-height: 0; overflow: auto; display: grid; grid-template-columns: minmax(0,1fr) minmax(280px,340px); gap: 18px; padding: 18px; }
      .feed-article-canvas { width: 100%; max-width: 780px; margin: 0 0 0 auto; align-content: start; gap: 12px; padding: 0; }
      .feed-article-field { display: grid; gap: 7px; }
      .feed-article-field > span { color: #667085; font-size: 11.5px; line-height: 1; font-weight: 820; }
      .feed-article-title, .feed-article-body, .feed-article-field textarea[data-feed-article-share] { border: 1px solid rgba(0,27,71,.10); border-radius: 14px; background: rgba(255,255,255,.74); color: var(--emy-navy); padding: 12px 13px; box-shadow: inset 0 1px 0 rgba(255,255,255,.78); }
      .feed-article-title { min-height: 54px; font-size: 22px; line-height: 1.18; font-weight: 880; }
      .feed-article-body { min-height: 300px; resize: vertical; font-size: 15px; line-height: 1.62; font-weight: 560; }
      .feed-article-field textarea[data-feed-article-share] { min-height: 92px; resize: vertical; outline: 0; font: inherit; font-size: 13.5px; line-height: 1.5; font-weight: 560; }
      .feed-article-title:focus, .feed-article-body:focus, .feed-article-field textarea[data-feed-article-share]:focus { border-color: rgba(255,106,0,.38); box-shadow: 0 0 0 3px rgba(255,106,0,.10), inset 0 1px 0 rgba(255,255,255,.80); }
      .feed-article-cover { position: relative; min-height: 190px; overflow: hidden; align-content: center; justify-items: center; gap: 8px; border-radius: 16px; background: linear-gradient(145deg,rgba(255,255,255,.82),rgba(255,244,232,.58)); }
      .feed-article-cover i { width: 44px; height: 44px; display: grid; place-items: center; border-radius: 15px; background: rgba(255,255,255,.78); color: var(--emy-orange); box-shadow: inset 0 1px 0 rgba(255,255,255,.84), 0 10px 20px rgba(0,27,71,.08); }
      .feed-article-cover svg { width: 23px; height: 23px; stroke-width: 2.1; }
      .feed-article-cover strong { position: relative; z-index: 2; color: var(--emy-navy); font-size: 15px; font-weight: 880; }
      .feed-article-cover span { position: relative; z-index: 2; color: #667085; font-size: 12px; font-weight: 650; }
      .feed-article-cover.has-media { background-size: cover; background-position: center; color: #fff; }
      .feed-article-cover.has-media::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg,rgba(0,27,71,.08),rgba(0,27,71,.52)); }
      .feed-article-cover.has-media i { display: none; }
      .feed-article-cover.has-media strong, .feed-article-cover.has-media span { color: #fff; text-shadow: 0 1px 12px rgba(0,27,71,.42); }
      .feed-article-cover img, .feed-article-cover video, .feed-article-preview-cover img, .feed-article-preview-cover video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
      .feed-article-preview-panel { min-width: 0; align-self: start; position: sticky; top: 0; display: grid; gap: 10px; }
      .feed-article-preview-label { color: #667085; font-size: 11.5px; font-weight: 820; }
      .feed-article-preview-card { overflow: hidden; border: 1px solid rgba(0,27,71,.08); border-radius: 16px; background: rgba(255,255,255,.78); padding: 13px; box-shadow: 0 16px 36px rgba(0,27,71,.10), inset 0 1px 0 rgba(255,255,255,.80); }
      .feed-article-preview-cover { position: relative; min-height: 136px; margin: -13px -13px 12px; overflow: hidden; background-size: cover; background-position: center; background-color: #eef3f8; }
      .feed-article-preview-chip { width: fit-content; min-height: 23px; display: inline-flex; align-items: center; border-radius: 999px; background: #fff4e8; color: var(--emy-orange); padding: 0 9px; font-size: 10.5px; line-height: 1; font-weight: 860; box-shadow: inset 0 0 0 1px rgba(255,106,0,.18); }
      .feed-article-preview-card strong { display: block; margin: 10px 0 7px; color: var(--emy-navy); font-size: 20px; line-height: 1.16; font-weight: 900; overflow-wrap: anywhere; }
      .feed-article-preview-card p { margin: 0; color: #46556f; font-size: 13px; line-height: 1.48; font-weight: 620; white-space: pre-wrap; overflow-wrap: anywhere; }
      .feed-article-preview-card small { width: fit-content; min-height: 24px; display: inline-flex; align-items: center; margin-top: 12px; border-radius: 999px; background: #f2f4f7; color: #667085; padding: 0 9px; font-size: 10.5px; line-height: 1; font-weight: 780; }
      .social-feed-event-card .feed-event-post { margin: 0 10px 4px; overflow: hidden; border: 1px solid rgba(0,27,71,.075); border-radius: 10px; background: #fff; box-shadow: none; }
      .feed-event-post-hero { min-height: 92px; display: grid; align-content: end; gap: 6px; background: linear-gradient(135deg, #fffaf5, #eef3f8); padding: 12px 14px; }
      .feed-event-post.has-cover .feed-event-post-hero { position: relative; isolation: isolate; overflow: hidden; min-height: 176px; background-color: #001b47; background-size: cover; background-position: center; }
      .feed-event-card-cover-image, .feed-event-post-hero img[data-emy-event-card-cover] { position: absolute; inset: 0; z-index: 0; width: 100%; height: 100%; object-fit: cover; display: block; }
      .feed-event-post.has-cover .feed-event-post-hero::after { content: ""; position: absolute; inset: 0; z-index: 1; background: linear-gradient(180deg, rgba(0,27,71,.04) 0%, rgba(0,27,71,.16) 46%, rgba(0,27,71,.66) 100%); pointer-events: none; }
      .feed-event-post.has-cover .feed-event-post-hero span, .feed-event-post.has-cover .feed-event-post-hero strong { position: relative; z-index: 2; color: #fff; text-shadow: 0 1px 14px rgba(0,27,71,.48); }
      .feed-event-post.has-cover .feed-event-post-hero span { background: rgba(255,255,255,.22); color: #fff; box-shadow: inset 0 0 0 1px rgba(255,255,255,.36); }
      .feed-event-post-hero span { width: fit-content; min-height: 21px; display: inline-flex; align-items: center; border-radius: 999px; background: rgba(255,255,255,.78); color: var(--emy-orange); padding: 0 9px; font-size: 10px; line-height: 1; font-weight: 820; box-shadow: inset 0 0 0 1px rgba(255,106,0,.18); }
      .feed-event-post-hero strong { color: var(--emy-navy); font-size: 19px; line-height: 1.12; font-weight: 850; }
      .feed-event-post-details { display: grid; gap: 7px; padding: 10px 12px 12px; }
      .feed-event-post-details p { display: -webkit-box; margin: 0; color: #46556f; font-size: 12.5px; line-height: 1.35; font-weight: 600; white-space: normal; overflow: hidden; overflow-wrap: anywhere; -webkit-box-orient: vertical; -webkit-line-clamp: 3; }
      .feed-event-post-meta { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 7px; }
      .feed-event-post-meta span { min-width: 0; border-radius: 8px; background: #fff; color: var(--emy-navy); padding: 7px 9px; font-size: 10.8px; line-height: 1.22; font-weight: 760; box-shadow: inset 0 0 0 1px rgba(0,27,71,.06); overflow-wrap: anywhere; }
      .feed-event-post-meta span b { display: block; margin-bottom: 3px; color: #667085; font-size: 9px; line-height: 1; font-weight: 820; text-transform: uppercase; }
      .social-feed-article-card .feed-article-card-body { margin: 0 10px 4px; border: 1px solid rgba(0,27,71,.075); border-radius: 10px; background: linear-gradient(180deg,#fff,#fffaf5); padding: 14px; box-shadow: none; }
      .feed-article-card-body > span { width: fit-content; min-height: 21px; display: inline-flex; align-items: center; border-radius: 999px; background: #fff4e8; color: var(--emy-orange); padding: 0 9px; font-size: 10px; line-height: 1; font-weight: 860; box-shadow: inset 0 0 0 1px rgba(255,106,0,.18); }
      .feed-article-card-body h2 { margin: 10px 0 7px; color: var(--emy-navy); font-size: 21px; line-height: 1.14; font-weight: 880; overflow-wrap: anywhere; }
      .feed-article-card-body p { margin: 0; color: #46556f; font-size: 13px; line-height: 1.5; font-weight: 600; white-space: pre-wrap; overflow: hidden; overflow-wrap: anywhere; display: -webkit-box; -webkit-line-clamp: 6; -webkit-box-orient: vertical; }
      .feed-article-card-cover { position: relative; height: 170px; overflow: hidden; border-radius: 9px; background: #eef3f8; margin-bottom: 12px; }
      .feed-article-card-cover img, .feed-article-card-cover video { width: 100%; height: 100%; display: block; object-fit: cover; }
      .feed-article-card-meta { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 12px; }
      .feed-article-card-meta small { min-height: 24px; display: inline-flex; align-items: center; border-radius: 999px; background: #f2f4f7; color: #667085; padding: 0 9px; font-size: 10.5px; line-height: 1; font-weight: 780; }
      .feed-hiring-preview-sheet { width: min(100%, 560px); overflow: hidden; }
      .feed-hiring-preview-body { padding: 14px; }
      .feed-job-apply-modal { z-index: 10180; }
      .feed-job-apply-sheet { position: relative; isolation: isolate; width: min(100%, 520px); overflow: hidden; }
      .feed-job-apply-body { display: grid; gap: 12px; padding: 14px; }
      .feed-job-apply-summary { display: grid; gap: 4px; border: 1px solid rgba(255,255,255,.66); border-radius: 15px; background: linear-gradient(145deg, rgba(255,255,255,.82), rgba(255,244,232,.54)); padding: 13px; box-shadow: inset 0 1px 0 rgba(255,255,255,.86), 0 12px 24px rgba(0,27,71,.06); }
      .feed-job-apply-summary small { color: var(--emy-orange); font-size: 10.5px; line-height: 1; font-weight: 860; text-transform: uppercase; }
      .feed-job-apply-summary strong { color: var(--emy-navy); font-size: 18px; line-height: 1.14; font-weight: 880; overflow-wrap: anywhere; }
      .feed-job-apply-summary span { color: #667085; font-size: 12px; line-height: 1.35; font-weight: 650; overflow-wrap: anywhere; }
      .feed-job-apply-body label { display: grid; gap: 6px; color: var(--emy-navy); font-size: 11.5px; line-height: 1.2; font-weight: 760; }
      .feed-job-apply-body textarea, .feed-job-apply-body input { width: 100%; min-width: 0; border: 1px solid rgba(0,27,71,.12); border-radius: 12px; background: rgba(255,255,255,.82); color: var(--emy-navy); outline: 0; padding: 10px 11px; font: inherit; font-size: 13px; font-weight: 560; }
      .feed-job-apply-body textarea { min-height: 94px; resize: vertical; }
      .feed-job-apply-body textarea:focus, .feed-job-apply-body input:focus { border-color: rgba(255,106,0,.38); box-shadow: 0 0 0 3px rgba(255,106,0,.10); }
      .feed-job-apply-methods { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 9px; }
      .feed-job-apply-option { min-height: 46px; border: 1px solid rgba(0,27,71,.10); border-radius: 14px; background: linear-gradient(145deg, rgba(255,255,255,.92), rgba(255,250,244,.72)); color: var(--emy-navy); cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 7px; padding: 0 12px; font-size: 12px; line-height: 1.1; font-weight: 820; box-shadow: 0 10px 22px rgba(0,27,71,.06), inset 0 1px 0 rgba(255,255,255,.82); }
      .feed-job-apply-option:hover, .feed-job-apply-option.is-active { border-color: rgba(255,106,0,.32); background: #fff4e8; color: #c14f00; }
      .feed-job-apply-file-name { display: block; margin-top: -3px; color: #667085; font-size: 11.5px; line-height: 1.3; font-weight: 650; }
      .feed-job-apply-consent { display: flex !important; grid-template-columns: none !important; align-items: flex-start; gap: 9px !important; color: #667085 !important; font-size: 12px !important; line-height: 1.35 !important; font-weight: 620 !important; }
      .feed-job-apply-consent input { width: 16px; min-width: 16px; height: 16px; padding: 0; accent-color: var(--emy-orange); }
      .feed-job-applicants-modal { z-index: 10160; background: rgba(6,22,45,.72); backdrop-filter: blur(14px) saturate(1.05); }
      .feed-job-applicants-sheet { position: relative; isolation: isolate; width: min(100%, 680px); overflow: hidden; border: 1px solid rgba(255,255,255,.80); border-top: 4px solid var(--emy-orange); border-radius: 24px; background: #f7f9fc; color: var(--emy-navy); box-shadow: 0 34px 96px rgba(0,18,48,.38), inset 0 1px 0 rgba(255,255,255,.92); }
      .feed-job-applicants-sheet .feed-mini-head { min-height: 72px; border-bottom: 1px solid rgba(0,27,71,.08); background: #fff; backdrop-filter: none; padding: 0 20px; }
      .feed-job-applicants-sheet .feed-mini-head h2 { color: var(--emy-navy); font-size: 24px; line-height: 1.08; font-weight: 880; letter-spacing: 0; }
      .feed-job-applicants-sheet .feed-mini-head button { background: #fff; color: var(--emy-navy); box-shadow: 0 10px 22px rgba(0,27,71,.08); }
      .feed-job-applicants-sheet .feed-mini-foot { border-top: 1px solid rgba(0,27,71,.08); background: #fff; padding: 14px 20px; }
      .feed-job-applicants-body { display: grid; gap: 12px; padding: 18px 20px; max-height: min(62dvh, 540px); overflow: auto; background: #f7f9fc; }
      .feed-job-applicants-summary { display: grid; gap: 4px; border: 1px solid rgba(0,27,71,.08); border-radius: 16px; background: #fff; padding: 14px 15px; box-shadow: 0 12px 24px rgba(0,27,71,.06); }
      .feed-job-applicants-summary strong { color: var(--emy-navy); font-size: 18px; line-height: 1.14; font-weight: 880; overflow-wrap: anywhere; }
      .feed-job-applicants-summary span { color: #667085; font-size: 12px; line-height: 1.35; font-weight: 650; }
      .feed-job-applicants-list { display: grid; gap: 10px; }
      .feed-job-applicant-card { display: grid; gap: 9px; border: 1px solid rgba(0,27,71,.08); border-radius: 16px; background: #fff; padding: 14px 15px; box-shadow: 0 12px 26px rgba(0,27,71,.06); }
      .feed-job-applicant-top { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px; }
      .feed-job-applicant-top strong { color: var(--emy-navy); font-size: 14px; line-height: 1.2; font-weight: 860; overflow-wrap: anywhere; }
      .feed-job-applicant-badge { min-height: 22px; display: inline-flex; align-items: center; border-radius: 999px; background: #fff4e8; color: var(--emy-orange); padding: 0 9px; font-size: 10px; line-height: 1; font-weight: 820; box-shadow: inset 0 0 0 1px rgba(255,106,0,.14); }
      .feed-job-applicant-date { color: #667085; font-size: 11px; line-height: 1.3; font-weight: 650; }
      .feed-job-applicant-message { margin: 0; color: #46556f; font-size: 12.5px; line-height: 1.38; font-weight: 590; white-space: pre-wrap; overflow-wrap: anywhere; }
      .feed-job-applicant-actions { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
      .feed-job-applicant-link { min-height: 30px; border: 0; display: inline-flex; align-items: center; border-radius: 999px; background: var(--emy-orange); color: #fff; cursor: pointer; font-family: inherit; text-decoration: none; padding: 0 12px; font-size: 11.5px; line-height: 1; font-weight: 800; box-shadow: 0 8px 16px rgba(255,106,0,.14); }
      .feed-job-applicant-file { color: #667085; font-size: 11.5px; line-height: 1.3; font-weight: 650; overflow-wrap: anywhere; }
      .feed-job-applicant-file small { color: #98a2b3; font-size: 11px; font-weight: 720; }
      .feed-job-applicants-more { min-height: 38px; border: 1px solid rgba(0,27,71,.10); border-radius: 999px; background: #fff; color: var(--emy-navy); cursor: pointer; justify-self: center; padding: 0 15px; font-family: inherit; font-size: 12px; line-height: 1; font-weight: 820; box-shadow: 0 10px 20px rgba(0,27,71,.06); }
      .feed-job-applicants-more:hover { border-color: rgba(255,106,0,.28); background: #fff8ef; color: var(--emy-orange); }
      .feed-job-applicants-empty { display: grid; gap: 6px; border: 1px dashed rgba(0,27,71,.12); border-radius: 14px; background: rgba(248,250,252,.88); padding: 18px; text-align: center; }
      .feed-job-applicants-empty strong { color: var(--emy-navy); font-size: 15px; line-height: 1.2; font-weight: 860; }
      .feed-job-applicants-empty span { color: #667085; font-size: 12px; line-height: 1.35; font-weight: 620; }
      .feed-job-cover-editor { position: relative; min-height: 150px; overflow: hidden; display: grid; align-content: end; gap: 7px; border: 1px solid rgba(0,27,71,.08); border-radius: 15px; background: linear-gradient(135deg,#fffaf5,#eef3f8); padding: 14px; color: var(--emy-navy); box-shadow: inset 0 1px 0 rgba(255,255,255,.78); }
      .feed-job-cover-editor::after { content: ""; position: absolute; inset: 0; z-index: 1; display: none; background: linear-gradient(180deg,rgba(0,27,71,.05),rgba(0,27,71,.58)); pointer-events: none; }
      .feed-job-cover-editor.has-cover::after { display: block; }
      .feed-job-cover-editor img, .feed-job-cover-editor video { position: absolute; inset: 0; z-index: 0; width: 100%; height: 100%; object-fit: var(--media-fit,cover); transform: translate(var(--media-x,0%),var(--media-y,0%)) scale(var(--media-zoom,1)); transform-origin: center; background: #0b1f3f; }
      .feed-job-cover-editor > span, .feed-job-cover-editor > strong, .feed-job-cover-editor > small { position: relative; z-index: 2; }
      .feed-job-cover-editor > span { width: fit-content; min-height: 21px; display: inline-flex; align-items: center; border-radius: 999px; background: rgba(255,244,232,.92); color: var(--emy-orange); padding: 0 9px; font-size: 10px; line-height: 1; font-weight: 860; box-shadow: inset 0 0 0 1px rgba(255,106,0,.16); }
      .feed-job-cover-editor > strong { display: block; font-size: 20px; line-height: 1.12; font-weight: 880; overflow-wrap: anywhere; }
      .feed-job-cover-editor > small { color: #667085; font-size: 12px; line-height: 1.32; font-weight: 650; }
      .feed-job-cover-editor.has-cover > strong, .feed-job-cover-editor.has-cover > small { color: #fff; text-shadow: 0 1px 14px rgba(0,27,71,.50); }
      .feed-job-cover-editor.has-cover > span { background: rgba(255,255,255,.22); color: #fff; box-shadow: inset 0 0 0 1px rgba(255,255,255,.36); }
      .feed-job-cover-tools { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-top: -3px; }
      .feed-job-cover-tools button { min-height: 34px; border: 1px solid rgba(0,27,71,.10); border-radius: 999px; background: rgba(255,255,255,.82); color: var(--emy-navy); cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 7px; padding: 0 12px; font: inherit; font-size: 12px; line-height: 1; font-weight: 820; box-shadow: 0 10px 22px rgba(0,27,71,.05); }
      .feed-job-cover-tools button:hover { border-color: rgba(255,106,0,.30); background: #fff4e8; color: var(--emy-orange); }
      .feed-job-cover-tools svg { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 2.1; stroke-linecap: round; stroke-linejoin: round; }
      .feed-job-card { overflow: hidden; border: 1px solid rgba(0,27,71,.08); border-radius: 10px; background: #fff; color: var(--emy-navy); box-shadow: 0 6px 18px rgba(0,27,71,.045); font-family: inherit; }
      .feed-list .feed-job-card { width: min(100%, 502px); justify-self: center; }
      .feed-job-hero { position: relative; min-height: 96px; display: grid; align-content: end; gap: 7px; overflow: hidden; background: linear-gradient(135deg,#fffaf5,#eef3f8); padding: 12px 14px; isolation: isolate; }
      .feed-job-hero.has-cover, .feed-job-card.has-cover > .feed-job-hero, .feed-job-card.has-cover .feed-job-hero { min-height: 150px; background: #001b47; }
      .feed-job-hero.has-cover::after, .feed-job-card.has-cover > .feed-job-hero::after, .feed-job-card.has-cover .feed-job-hero::after { content: ""; position: absolute; inset: 0; z-index: 1; background: linear-gradient(180deg,rgba(0,27,71,.04) 0%,rgba(0,27,71,.18) 44%,rgba(0,27,71,.72) 100%); pointer-events: none; }
      .feed-job-cover-media { position: absolute; inset: 0; z-index: 0; width: 100%; height: 100%; object-fit: var(--media-fit,cover); transform: translate(var(--media-x,0%),var(--media-y,0%)) scale(var(--media-zoom,1)); transform-origin: center; background: #0b1f3f; }
      .feed-job-hero span { width: fit-content; min-height: 21px; display: inline-flex; align-items: center; border-radius: 999px; background: #fff4e8; color: var(--emy-orange); padding: 0 9px; font-size: 10px; line-height: 1; font-weight: 840; box-shadow: inset 0 0 0 1px rgba(255,106,0,.16); }
      .feed-job-hero strong { display: block; color: var(--emy-navy); font-size: 19px; line-height: 1.12; font-weight: 850; letter-spacing: 0; overflow-wrap: anywhere; }
      .feed-job-hero span, .feed-job-hero strong { position: relative; z-index: 2; }
      .feed-job-hero.has-cover span, .feed-job-card.has-cover .feed-job-hero span { background: rgba(255,255,255,.22); color: #fff; box-shadow: inset 0 0 0 1px rgba(255,255,255,.36); }
      .feed-job-hero.has-cover strong, .feed-job-card.has-cover .feed-job-hero strong { color: #fff; text-shadow: 0 1px 14px rgba(0,27,71,.50); }
      .feed-job-body { display: grid; gap: 8px; padding: 11px 12px 12px; }
      .feed-job-business { display: flex; align-items: center; gap: 8px; color: #667085; font-size: 11.5px; line-height: 1.2; font-weight: 730; }
      .feed-job-business i { width: 25px; height: 25px; display: grid; place-items: center; border-radius: 999px; background: #f3f6fb; color: var(--emy-navy); font-style: normal; font-size: 11px; font-weight: 860; box-shadow: inset 0 0 0 1px rgba(0,27,71,.07); }
      .feed-job-business i.has-image { overflow: hidden; background: #fff; color: transparent; }
      .feed-job-business i img { width: 100%; height: 100%; display: block; object-fit: cover; border-radius: inherit; }
      .feed-job-desc { display: -webkit-box; margin: 0; color: #46556f; font-size: 12.5px; line-height: 1.38; font-weight: 590; white-space: normal; overflow: hidden; overflow-wrap: anywhere; -webkit-box-orient: vertical; -webkit-line-clamp: 3; }
      .feed-job-meta { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 7px; }
      .feed-job-meta span { min-width: 0; border-radius: 8px; background: #f8fafc; color: var(--emy-navy); padding: 7px 9px; font-size: 10.8px; line-height: 1.22; font-weight: 730; box-shadow: inset 0 0 0 1px rgba(0,27,71,.06); overflow-wrap: anywhere; }
      .feed-job-meta span b { display: block; margin-bottom: 3px; color: #667085; font-size: 9px; line-height: 1; font-weight: 820; text-transform: uppercase; }
      .feed-job-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 7px; padding-top: 2px; }
      .feed-job-apply, .feed-job-manage, .feed-job-delete { min-height: 31px; border-radius: 999px; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; padding: 0 12px; font-size: 11.5px; line-height: 1; font-weight: 800; font-family: inherit; }
      .feed-job-actions button svg, .home-created-actions button svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
      .feed-job-actions button, .home-created-actions button { gap: 6px; }
      .feed-job-apply { border: 0; background: var(--emy-orange); color: #fff; box-shadow: 0 8px 16px rgba(255,106,0,.16); }
      .feed-job-apply.is-active { background: #0f8f57; box-shadow: 0 8px 16px rgba(16,185,129,.12); }
      .feed-job-apply.is-applied { padding: 0 10px; font-size: 10.2px; line-height: 1.05; text-align: center; white-space: normal; max-width: 220px; }
      .feed-job-manage { border: 1px solid rgba(0,27,71,.10); background: rgba(255,255,255,.76); color: var(--emy-navy); }
      .feed-job-delete { border: 1px solid rgba(248,113,113,.22); background: rgba(255,255,255,.76); color: #b42318; }
      .feed-job-owner-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-left: auto; }
      .feed-job-count { color: #667085; font-size: 11.5px; font-weight: 760; }
      .home-posted-jobs-section { padding-bottom: 28px; }
      .posted-jobs-list { width: min(100%, 860px); display: grid; grid-template-columns: repeat(2,minmax(260px,1fr)); gap: 14px; align-items: start; }
      .posted-jobs-list .feed-job-card { width: 100%; min-height: 0; justify-self: stretch; }
      .posted-jobs-list .feed-job-hero { min-height: 98px; padding: 14px; }
      .posted-jobs-list .feed-job-hero strong { font-size: 20px; }
      .home-posted-job-card { position: relative; }
      .home-posted-job-card .feed-job-owner-actions { display: none; }
      .home-posted-job-card > .social-feed-more { position: absolute; right: 12px; top: 12px; z-index: 8; width: 32px; min-width: 32px; height: 32px; min-height: 32px; border: 1px solid rgba(255,255,255,.72); border-radius: 999px; background: rgba(255,255,255,.86); color: #26364f; display: grid; place-items: center; padding: 0; font-size: 16px; line-height: 1; box-shadow: 0 8px 18px rgba(0,27,71,.08); backdrop-filter: blur(10px); }
      .home-posted-job-card > .social-feed-more:hover, .home-posted-job-card > .social-feed-more[aria-expanded="true"] { border-color: rgba(255,106,0,.32); background: #fff4e8; color: var(--emy-orange); }
      .home-posted-job-card .feed-job-actions { gap: 8px; }
      .home-section-intro {
        width: min(100%, 860px);
        margin: 0 0 10px;
      }
      .home-section-intro[hidden] { display: none !important; }
      .home-section-intro-inner {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 0;
        align-items: start;
        border-left: 4px solid var(--emy-orange);
        background: linear-gradient(90deg, rgba(255,106,0,.10), rgba(255,250,244,.72) 44%, rgba(255,255,255,.45));
        padding: 13px 14px 14px 13px;
      }
      .feed-section-intro,
      .feed-empty-guide {
        width: min(100%, 860px);
        margin: 0 0 10px;
      }
      .home-list-empty,
      .feed-section-intro .posted-jobs-empty {
        margin: 0;
        width: 100%;
      }
      [data-home-static-product-list]:has(> .home-list-empty),
      [data-home-static-clip-list]:has(> .home-list-empty),
      [data-home-flow-list]:has(> .home-list-empty),
      [data-product-list] [data-home-static-product-list][data-unified-feed-cards="true"]:has(> .home-list-empty),
      [data-views="home reels"] [data-home-static-clip-list][data-unified-feed-cards="true"]:has(> .home-list-empty),
      .home-flow-list[data-unified-feed-cards="true"]:has(> .home-list-empty) {
        display: block !important;
        width: 100% !important;
        max-width: none !important;
        margin-inline: 0 !important;
        padding: 0 !important;
        overflow: visible !important;
      }
      [data-home-static-product-list] > .home-list-empty,
      [data-home-static-clip-list] > .home-list-empty,
      [data-home-flow-list] > .home-list-empty,
      [data-product-list] [data-home-static-product-list][data-unified-feed-cards="true"] > .home-list-empty,
      [data-views="home reels"] [data-home-static-clip-list][data-unified-feed-cards="true"] > .home-list-empty,
      .home-flow-list[data-unified-feed-cards="true"] > .home-list-empty,
      .product-list-grid > .home-list-empty,
      .feed-list > .home-list-empty {
        box-sizing: border-box !important;
        display: block !important;
        grid-column: 1 / -1 !important;
        flex: 0 0 100% !important;
        width: 100% !important;
        max-width: none !important;
        min-height: 52px !important;
        margin: 0 0 14px !important;
        border: 1px solid rgba(0,27,71,.08) !important;
        border-radius: 14px !important;
        background: rgba(255,255,255,.72) !important;
        color: #667085 !important;
        padding: 14px !important;
        line-height: 1.4 !important;
        text-align: center !important;
        justify-self: stretch !important;
        align-self: start !important;
      }
      .feed-list > .emy-real-empty,
      .feed-list > [data-emy-real-empty] {
        box-sizing: border-box;
        justify-self: center;
        width: min(100%, 520px);
        max-width: 520px;
        margin: 18px auto 8px;
        border: 1px dashed rgba(0,27,71,.14);
        border-radius: 8px;
        background: rgba(255,255,255,.72);
        color: #68738a;
        padding: 14px 16px;
        font-size: 13px;
        line-height: 1.35;
        font-weight: 750;
        text-align: center;
      }
      .home-section-icon {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        color: var(--emy-orange);
        font-weight: 900;
        font-size: 13px;
        box-shadow: 0 8px 18px rgba(0,27,71,.08);
      }
      .home-section-copy {
        display: flex;
        flex-direction: column;
        gap: 7px;
        min-width: 0;
      }
      .home-section-kicker {
        align-self: flex-start;
        border-radius: 999px;
        padding: 0 9px;
        min-height: 22px;
        display: inline-flex;
        align-items: center;
        background: #fff;
        color: #d85a00;
        font-weight: 870;
        font-size: 10px;
        line-height: 1;
        text-transform: uppercase;
      }
      .home-section-copy h3 {
        margin: 0;
        color: var(--emy-navy);
        font-size: 20px;
        line-height: 1.14;
        letter-spacing: 0;
        font-weight: 880;
      }
      .home-section-copy p {
        max-width: 640px;
        margin: 0;
        color: #526078;
        font-size: 12.5px;
        line-height: 1.42;
        font-weight: 620;
      }
      .home-section-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        padding-top: 2px;
      }
      .home-section-tags span {
        min-height: 24px;
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        background: rgba(255,255,255,.78);
        color: #667085;
        padding: 0 9px;
        font-size: 10.5px;
        line-height: 1;
        font-weight: 760;
        box-shadow: inset 0 0 0 1px rgba(0,27,71,.06);
      }
      .home-owned-divider {
        width: min(100%, 860px);
        margin: 2px 0 10px;
        padding: 18px 0 4px;
        border-top: 1px solid rgba(0,27,71,.10);
      }
      .home-owned-divider-inner {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 0;
        align-items: start;
        border-left: 4px solid var(--emy-orange);
        background: linear-gradient(90deg, rgba(255,106,0,.10), rgba(255,250,244,.72) 44%, rgba(255,255,255,.45));
        padding: 13px 14px 14px 13px;
      }
      .home-owned-avatar {
        width: 38px;
        height: 38px;
        display: grid;
        place-items: center;
        overflow: hidden;
        border-radius: 999px;
        background: #fff;
        color: var(--emy-orange);
        font-size: 13px;
        line-height: 1;
        font-weight: 900;
        box-shadow: inset 0 0 0 1px rgba(255,106,0,.18), 0 8px 18px rgba(0,27,71,.08);
      }
      .home-owned-avatar img { width: 100%; height: 100%; display: block; object-fit: cover; border-radius: inherit; }
      .home-owned-copy { min-width: 0; display: grid; gap: 7px; }
      .home-owned-kicker {
        display: inline-flex;
        width: fit-content;
        min-height: 22px;
        align-items: center;
        border-radius: 999px;
        background: #fff;
        color: #d85a00;
        padding: 0 9px;
        font-size: 10px;
        line-height: 1;
        font-weight: 870;
        text-transform: uppercase;
      }
      .home-owned-copy h2 {
        margin: 0;
        color: var(--emy-navy);
        font-size: 20px;
        line-height: 1.14;
        font-weight: 880;
        letter-spacing: 0;
      }
      .home-owned-copy p {
        max-width: 640px;
        margin: 0;
        color: #526078;
        font-size: 12.5px;
        line-height: 1.42;
        font-weight: 620;
      }
      .home-owned-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        padding-top: 2px;
      }
      .home-owned-tags span {
        min-height: 24px;
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        background: rgba(255,255,255,.78);
        color: #667085;
        padding: 0 9px;
        font-size: 10.5px;
        line-height: 1;
        font-weight: 760;
        box-shadow: inset 0 0 0 1px rgba(0,27,71,.06);
      }
      .home-created-section { padding-bottom: 28px; }
      .home-created-list { width: min(100%, 860px); display: grid; grid-template-columns: repeat(2,minmax(260px,1fr)); gap: 14px; align-items: start; }
      .home-created-card { min-width: 0; overflow: hidden; border: 1px solid rgba(0,27,71,.08); border-radius: 10px; background: rgba(255,255,255,.96); color: var(--emy-navy); box-shadow: 0 6px 18px rgba(0,27,71,.045); }
      .home-created-list > *,
      .posted-jobs-list > *,
      .feed-list > *,
      .annexed-feed-middle .feed-list > *,
      .home-flow-list > *,
      .product-list-grid > * { align-self: start; }
      .home-created-top { min-height: 54px; display: grid; grid-template-columns: 36px minmax(0,1fr) auto; gap: 9px; align-items: center; border-bottom: 1px solid rgba(0,27,71,.06); padding: 9px 11px; }
      .home-created-avatar { width: 34px; height: 34px; display: grid; place-items: center; overflow: hidden; border-radius: 999px; background: #f3f6fb; color: var(--emy-navy); font-size: 12px; font-weight: 860; box-shadow: inset 0 0 0 1px rgba(0,27,71,.07); }
      .home-created-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
      .home-created-top strong { display: block; overflow: hidden; color: var(--emy-navy); font-size: 13px; line-height: 1.12; font-weight: 850; text-overflow: ellipsis; white-space: nowrap; }
      .home-created-top small { display: block; margin-top: 3px; overflow: hidden; color: #69758d; font-size: 10.5px; line-height: 1.1; font-weight: 680; text-overflow: ellipsis; white-space: nowrap; }
      .home-created-pill { min-height: 23px; display: inline-flex; align-items: center; border-radius: 999px; background: #fff4e8; color: #d85a00; padding: 0 9px; font-size: 10px; line-height: 1; font-weight: 850; }
      .home-created-media { position: relative; min-height: 138px; overflow: hidden; background: linear-gradient(135deg,#eef3f8,#fff8ef); }
      .home-created-media::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(255,255,255,.05), rgba(0,27,71,.10)); pointer-events: none; }
      .home-created-media img, .home-created-media video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: var(--media-fit, contain); transform: translate(var(--media-x, 0%), var(--media-y, 0%)) scale(var(--media-zoom, 1)); transform-origin: center; display: block; background: #101828; }
      .home-created-media .home-created-pill { position: absolute; left: 10px; top: 10px; z-index: 2; background: rgba(255,255,255,.94); }
      .home-created-media.is-text { min-height: 86px; display: grid; align-content: end; gap: 5px; padding: 12px; }
      .home-created-media.is-text strong { position: relative; z-index: 1; color: var(--emy-navy); font-size: 18px; line-height: 1.12; font-weight: 880; }
      .home-created-media.is-text span { position: relative; z-index: 1; color: #667085; font-size: 12px; line-height: 1.25; font-weight: 650; }
      .home-created-card.is-event .home-created-media { min-height: 112px; display: grid; align-content: end; gap: 7px; padding: 13px; background: radial-gradient(circle at 86% 22%, rgba(255,106,0,.24), transparent 82px), linear-gradient(145deg,#fffaf5,#eef3f8); }
      .home-created-card.is-event .home-created-media.has-event-cover { min-height: 128px; isolation: isolate; background: #001b47; }
      .home-created-card.is-event .home-created-media.has-event-cover::after { z-index: 1; background: linear-gradient(180deg, rgba(0,27,71,.04), rgba(0,27,71,.18) 42%, rgba(0,27,71,.70)); }
      .home-created-card.is-event .home-created-media.has-event-cover img { z-index: 0; object-fit: cover; transform: none; background: #001b47; }
      .home-created-card.is-event .home-created-media .home-created-pill { position: relative; left: auto; top: auto; width: fit-content; }
      .home-created-card.is-event .home-created-media strong { position: relative; z-index: 1; color: var(--emy-navy); font-size: 18px; line-height: 1.12; font-weight: 880; }
      .home-created-card.is-event .home-created-media span:not(.home-created-pill) { position: relative; z-index: 1; color: #667085; font-size: 12px; line-height: 1.25; font-weight: 650; }
      .home-created-card.is-event .home-created-media.has-event-cover .home-created-pill { z-index: 2; background: rgba(255,255,255,.24); color: #fff; box-shadow: inset 0 0 0 1px rgba(255,255,255,.36); }
      .home-created-card.is-event .home-created-media.has-event-cover strong { z-index: 2; color: #fff; text-shadow: 0 1px 12px rgba(0,27,71,.50); }
      .home-created-card.is-event .home-created-media.has-event-cover span:not(.home-created-pill) { z-index: 2; color: rgba(255,255,255,.88); text-shadow: 0 1px 10px rgba(0,27,71,.42); }
      .home-created-card.is-article .home-created-media { min-height: 116px; background: radial-gradient(circle at 88% 16%, rgba(255,106,0,.18), transparent 84px), linear-gradient(135deg,#fffaf5,#f3f6fb); }
      .home-created-card > img,
      .home-created-card > video { display: none !important; }
      .home-created-body { display: grid; gap: 8px; padding: 11px 12px 12px; }
      .home-created-stat { width: fit-content; min-height: 22px; display: inline-flex; align-items: center; border-radius: 999px; background: #eef3f8; color: #59667f; padding: 0 9px; font-size: 10.5px; line-height: 1; font-weight: 820; }
      .home-created-body h3 { display: -webkit-box; margin: 0; overflow: hidden; color: var(--emy-navy); font-size: 15.5px; line-height: 1.22; font-weight: 820; overflow-wrap: anywhere; word-break: break-word; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
      .home-created-body p { display: -webkit-box; overflow: hidden; margin: 0; color: #526078; font-size: 12.5px; line-height: 1.38; font-weight: 560; white-space: pre-wrap; overflow-wrap: anywhere; -webkit-box-orient: vertical; -webkit-line-clamp: 3; }
      .home-created-card.is-article .home-created-body p { -webkit-line-clamp: 5; }
      .home-created-meta { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 7px; }
      .home-created-meta span { min-width: 0; border-radius: 8px; background: #f8fafc; color: var(--emy-navy); padding: 7px 9px; font-size: 10.8px; line-height: 1.22; font-weight: 730; box-shadow: inset 0 0 0 1px rgba(0,27,71,.06); overflow-wrap: anywhere; }
      .home-created-meta b { display: block; margin-bottom: 3px; color: #667085; font-size: 9px; line-height: 1; font-weight: 820; text-transform: uppercase; }
      .home-created-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 7px; border-top: 1px solid rgba(0,27,71,.07); padding-top: 8px; }
      .home-created-actions button { min-height: 30px; border: 1px solid rgba(0,27,71,.08); border-radius: 999px; background: #fff; color: #59667f; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; padding: 0 11px; font: inherit; font-size: 11.2px; line-height: 1; font-weight: 800; }
      .home-created-actions button:hover, .home-created-actions button.is-active { border-color: rgba(255,106,0,.24); background: #fff4e8; color: var(--emy-orange); }
      .home-created-actions button[data-home-created-open] { margin-left: auto; background: var(--emy-orange); color: #fff; border-color: var(--emy-orange); box-shadow: 0 8px 16px rgba(255,106,0,.14); }
      .home-created-card .social-feed-more { justify-self: end; width: 32px; min-width: 32px; height: 32px; min-height: 32px; border: 0; border-radius: 999px; background: transparent; color: #071326; cursor: pointer; padding: 0; font-size: 18px; line-height: 1; }
      .home-created-card .social-feed-more:hover, .home-created-card .social-feed-more[aria-expanded="true"] { background: #fff4e8; color: var(--emy-orange); }
      .home-created-card .home-created-social { display: grid; grid-template-columns: minmax(0,1fr) auto; align-items: start; gap: 4px; margin: 1px 6px 0; border-top: 1px solid rgba(0,27,71,.07); padding: 4px 0 0; }
      .home-created-card .home-created-action-set { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 5px; min-width: 0; }
      .home-created-card .home-created-action-pair { display: inline-flex; align-items: center; gap: 3px; min-width: 0; }
      .home-created-card .home-created-action-pair strong, .home-created-card .home-created-social-meta strong { min-width: 7px; color: #647089; font-size: 12.5px; line-height: 1; font-weight: 560; }
      .home-created-card .home-created-social .social-feed-icon { width: 25px; min-width: 25px; height: 24px; min-height: 24px; border-radius: 7px; }
      .home-created-card .home-created-social .social-feed-icon svg { width: 13px; height: 13px; }
      .home-created-card .home-created-save { justify-self: end; margin-left: 2px; }
      .home-created-card .home-created-social-meta { display: grid; grid-template-columns: auto minmax(0,1fr) auto; align-items: center; gap: 4px; padding: 3px 6px 7px; }
      .home-created-card .home-created-hidden-stat { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; }
      .home-created-card .social-feed-comments-link { min-width: 0; margin: 0; border: 0; border-radius: 999px; background: #fff4e8; color: var(--emy-orange); cursor: pointer; padding: 2px 6px; font: inherit; font-size: 10px; line-height: 1.1; font-weight: 780; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .home-created-card .social-feed-time { justify-self: end; color: #98a2b3; font-size: 10px; line-height: 1.15; font-weight: 660; }
      .home-created-card .feed-comments { position: relative; z-index: 9; isolation: isolate; display: none; margin: 0; border-top: 1px solid rgba(0,27,71,.07); padding: 10px 12px 12px; background: #fff; box-sizing: border-box; overflow: hidden; }
      .home-created-card.is-comments-open .feed-comments { display: block; }
      .home-created-card .feed-comment { display: grid; grid-template-columns: 32px minmax(0,1fr); align-items: start; gap: 9px; margin-top: 10px; }
      .home-created-card .feed-comment-avatar { width: 32px; height: 32px; border-radius: 999px; display: grid; place-items: center; overflow: hidden; background: #eef3f8; color: var(--emy-navy); font-size: 11px; font-weight: 820; text-decoration: none; }
      .home-created-card .feed-comment-avatar.has-image { background: #fff; color: transparent; }
      .home-created-card .feed-comment-avatar img { width: 100%; height: 100%; display: block; border-radius: inherit; object-fit: cover; }
      .home-created-card .feed-comment-bubble { min-width: 0; max-width: 100%; overflow: hidden; border-radius: 14px; background: #f6f8fb; color: #364157; padding: 9px 10px; font-size: 12.5px; line-height: 1.38; font-weight: 520; overflow-wrap: anywhere; }
      .home-created-card .feed-comment-bubble strong { display: block; margin-bottom: 2px; color: var(--emy-navy); font-size: 12px; line-height: 1.2; font-weight: 830; }
      .home-created-card .feed-comment-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 4px; margin-top: 7px; color: #7a869e; font-size: 11px; line-height: 1; font-weight: 760; }
      .home-created-card .feed-comment-actions button { width: auto; min-width: 18px; height: 22px; min-height: 22px; display: inline-flex; align-items: center; justify-content: center; border: 0; border-radius: 6px; background: transparent; color: inherit; cursor: pointer; padding: 0 2px; font: inherit; font-size: 0; box-shadow: none; }
      .home-created-card .feed-comment-actions button svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
      .home-created-card .feed-comment-action-count { color: #7a869e; font-size: 11px; font-weight: 760; min-width: 14px; text-align: center; }
      .home-created-card .feed-comment-replies { display: grid; gap: 6px; margin-top: 8px; padding-left: 8px; border-left: 2px solid rgba(0,27,71,.08); }
      .home-created-card .feed-comment-reply { display: grid; grid-template-columns: 24px minmax(0,1fr); gap: 7px; align-items: start; }
      .home-created-card .feed-comment-reply .feed-comment-avatar { width: 24px; height: 24px; font-size: 9px; }
      .home-created-card .feed-comment-reply-bubble { display: block; min-width: 0; overflow: hidden; border-radius: 12px; background: rgba(255,255,255,.76); color: #4b5568; padding: 7px 9px; font-size: 11.5px; line-height: 1.35; overflow-wrap: anywhere; }
      .home-created-card .feed-comments [data-feed-comments-list] { position: relative; z-index: 1; background: #fff; }
      .home-created-card .feed-comment-form,
      .home-created-card .feed-comment-reply-form { position: relative; z-index: 1; width: 100%; max-width: 100%; box-sizing: border-box; display: grid; grid-template-columns: minmax(0,1fr) auto; align-items: center; gap: 8px; margin-top: 10px; background: #fff; }
      .home-created-card .feed-comment-reply-form[hidden] { display: none; }
      .home-created-card .feed-comment-form input,
      .home-created-card .feed-comment-reply-form input { min-width: 0; height: 36px; border: 1px solid rgba(0,27,71,.10); border-radius: 999px; background: #fff; color: #071326; outline: none; padding: 0 12px; font: inherit; font-size: 12.5px; font-weight: 560; box-shadow: inset 0 1px 0 rgba(255,255,255,.86); }
      .home-created-card .feed-comment-form button,
      .home-created-card .feed-comment-reply-form button { min-height: 36px; border: 0; border-radius: 999px; background: var(--emy-orange); color: #fff; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 5px; padding: 0 13px; font: inherit; font-size: 12px; line-height: 1; font-weight: 820; white-space: nowrap; box-shadow: 0 8px 16px rgba(255,106,0,.18); }
      .home-created-card .feed-comment-reply-form button { min-width: 54px; height: 30px; min-height: 30px; gap: 4px; padding: 0 9px; font-size: 11px; font-weight: 780; box-shadow: 0 6px 12px rgba(255,106,0,.14); }
      .home-created-card .feed-comment-reply-form button::after { content: "Reply"; }
      .home-created-card .feed-comment-reply-form button svg { width: 13px; height: 13px; }
      .social-feed-actions.social-feed-actions-counted { display: grid; grid-template-columns: minmax(0,1fr) auto; align-items: start; gap: 4px; margin: 1px 6px 0; border-top: 1px solid rgba(0,27,71,.07); border-bottom: 0; padding: 4px 0 0; }
      .social-feed-actions-counted .social-feed-action-set { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 5px; min-width: 0; }
      .social-feed-actions-counted .social-feed-icon { width: 25px; min-width: 25px; height: 24px; min-height: 24px; border-radius: 7px; }
      .social-feed-actions-counted .social-feed-icon svg { width: 13px; height: 13px; }
      .social-feed-action-pair { display: inline-flex; align-items: center; gap: 3px; min-width: 0; }
      .social-feed-action-pair strong, .social-feed-body-counted > strong { min-width: 7px; color: #647089; font-size: 12.5px; line-height: 1; font-weight: 560; }
      .social-feed-body-counted > [data-feed-comment-total],
      .home-created-social-meta > [data-home-created-comment-total] { display: none !important; }
      .social-feed-actions-counted .social-feed-save { justify-self: end; margin-left: 2px; }
      .social-feed-body.social-feed-body-counted { display: grid; grid-template-columns: auto minmax(0,1fr) auto; align-items: center; gap: 4px; padding: 3px 6px 7px; }
      .social-feed-body-counted .social-feed-caption { grid-column: 1 / -1; margin: 0; }
      .social-feed-hidden-stat { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; }
      .social-feed-body-counted .social-feed-comments-link { min-width: 0; margin: 0; border: 0; border-radius: 999px; background: #fff4e8; color: var(--emy-orange); cursor: pointer; padding: 2px 6px; font: inherit; font-size: 10px; line-height: 1.1; font-weight: 780; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      [data-feed-id]:not(.is-comments-open) .social-feed-body-counted .social-feed-comments-link,
      [data-feed-id]:not(.is-comments-open) .home-created-social-meta .social-feed-comments-link { display: none !important; }
      [data-feed-id]:not(.is-comments-open) .social-feed-body-counted .social-feed-time,
      [data-feed-id]:not(.is-comments-open) .home-created-social-meta .social-feed-time { grid-column: 3; }
      .social-feed-body-counted .social-feed-time { justify-self: end; margin: 0; color: #98a2b3; font-size: 10px; line-height: 1.15; font-weight: 660; text-transform: none; letter-spacing: 0; }
      .posted-jobs-empty { margin: 0; border: 1px solid rgba(0,27,71,.08); border-radius: 14px; background: rgba(255,255,255,.72); color: #667085; padding: 14px; font-size: 13px; line-height: 1.4; font-weight: 620; text-align: center; }
      .posted-jobs-empty[hidden] { display: none; }
      @media (max-width: 700px) {
        .home-section-intro-inner { grid-template-columns: minmax(0, 1fr); gap: 0; padding: 12px; }
        .home-owned-divider-inner { grid-template-columns: minmax(0, 1fr); gap: 0; padding: 12px; }
        .home-section-copy h3, .home-owned-copy h2 { font-size: 18px; }
        .home-created-list, .posted-jobs-list { grid-template-columns: 1fr; }
        .home-created-actions button[data-home-created-open] { margin-left: 0; }
        .feed-create-modal { align-items: flex-end; padding: 0; }
        .feed-create-menu, .feed-post-sheet, .feed-event-sheet, .feed-hiring-sheet, .feed-job-apply-sheet, .feed-article-publish { width: 100%; max-height: 100dvh; border-radius: 16px 16px 0 0; }
        .feed-post-source-sheet { width: 100%; border-radius: 16px 16px 0 0; }
        .feed-post-sheet { min-height: min(720px, 100dvh); }
        .feed-post-kind-tabs { grid-template-columns: repeat(2,minmax(0,1fr)); padding-inline: 12px; }
        .feed-post-tools { padding-inline: 12px; }
        .feed-post-text { min-height: 190px; font-size: 18px; }
        .feed-clip-frame-options { grid-template-columns: 1fr; }
        .feed-clip-kind-options, .feed-post-product-fields, .emy-media-editor-product-fields { grid-template-columns: 1fr; }
        .feed-post-product-fields .is-wide, .emy-media-editor-product-fields .is-wide, .emy-media-editor-product-fields > strong { grid-column: auto; }
        .feed-clip-frame-sheet { width: 100%; max-height: 100dvh; border-radius: 16px 16px 0 0; }
        .feed-post-sheet.has-media .feed-post-text, [data-feed-post-sheet].has-media .feed-post-text { min-height: 84px; max-height: 120px; font-size: 16px; }
        .feed-post-media { margin-inline: 12px; }
        .feed-post-sheet.has-media .feed-post-media, [data-feed-post-sheet].has-media .feed-post-media { max-height: 46dvh; min-height: min(260px, 40dvh); }
        .feed-create-options { padding: 14px 12px 18px; }
        .feed-two-col, .feed-hiring-body { grid-template-columns: 1fr; }
        .feed-event-template { padding: 12px; }
        .feed-event-preview { min-height: 104px; }
        .feed-event-post-meta { grid-template-columns: 1fr; }
        .feed-job-meta { grid-template-columns: 1fr; }
        .feed-job-owner-actions { width: 100%; margin-left: 0; }
        .feed-post-foot, .feed-mini-foot { justify-content: stretch; padding: 10px 12px; }
        .feed-post-foot button, .feed-mini-foot button { flex: 1 1 auto; min-width: max-content; }
        .posted-jobs-list { grid-template-columns: 1fr; }
        .feed-hiring-body aside { display: none; }
        .feed-article-editor-modal { align-items: stretch; }
        .feed-article-top { grid-template-columns: 38px minmax(0,1fr) auto 34px; min-height: 64px; gap: 8px; padding: 10px 12px; }
        .feed-article-tools { display: none; }
        .feed-article-top .feed-create-submit { min-width: 136px; min-height: 40px; padding: 0 16px; font-size: 13px; white-space: nowrap; }
        .feed-article-workspace { display: block; padding: 12px; }
        .feed-article-canvas { max-width: none; }
        .feed-article-preview-panel { position: static; margin-top: 14px; }
        .feed-article-cover { min-height: 170px; }
        .feed-article-body { min-height: 240px; }
      }`;

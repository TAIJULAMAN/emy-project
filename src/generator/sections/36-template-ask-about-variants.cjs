/* EMY generator section: 36-template-ask-about-variants.cjs (source lines 96386-99415) */
function askEmyAboutMatchedPageTemplate() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>EMY | About Ask EMY</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
      :root { --navy: #001b47; --orange: #ff6a00; --muted: #8793aa; --line: rgba(0,27,71,.1); --cream: #fbfaf8; }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        color: var(--navy);
        background: radial-gradient(circle at 52% 41%, rgba(255,106,0,.10), transparent 34%), linear-gradient(180deg, #fff 0%, var(--cream) 100%);
      }
      a { color: inherit; text-decoration: none; }
      .topbar {
        display: flex;
        min-height: 88px;
        align-items: center;
        justify-content: space-between;
        gap: 18px;
        padding: 0 32px;
        border-top: 1px solid rgba(255,106,0,.15);
        background: rgba(255,255,255,.72);
      }
      .brand img { display: block; width: auto; height: 44px; object-fit: contain; }
      .nav { display: flex; align-items: center; justify-content: flex-end; gap: 18px; flex-wrap: wrap; }
      .nav a {
        display: inline-flex;
        min-height: 48px;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        padding: 0 18px;
        color: rgba(0,27,71,.72);
        font-size: 14px;
        font-weight: 800;
      }
      .nav a:hover { color: var(--orange); }
      .nav .soft {
        border: 1px solid var(--line);
        background: rgba(255,255,255,.78);
        color: var(--navy);
        box-shadow: 0 8px 22px rgba(0,27,71,.08);
      }
      .nav .primary {
        background: var(--navy);
        color: #fff;
        box-shadow: 0 12px 28px rgba(0,27,71,.16);
      }
      main {
        min-height: calc(100vh - 88px);
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding: 110px 18px 48px;
      }
      .center {
        width: min(100%, 760px);
        text-align: center;
      }
      .wordmark {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        color: var(--navy);
        font-size: 18px;
        font-weight: 900;
      }
      .wordmark img { width: 122px; height: auto; }
      .bag {
        display: inline-flex;
        width: 42px;
        height: 42px;
        align-items: center;
        justify-content: center;
        filter: drop-shadow(0 12px 18px rgba(255,106,0,.22));
      }
      .beta {
        display: inline-flex;
        margin-top: 22px;
        border: 1px solid rgba(255,106,0,.13);
        border-radius: 999px;
        background: rgba(255,246,238,.92);
        padding: 9px 20px;
        color: var(--orange);
        font-size: 12px;
        font-weight: 900;
        letter-spacing: .28em;
      }
      h1 {
        max-width: 760px;
        margin: 26px auto 0;
        color: var(--navy);
        font-size: 17px;
        line-height: 1.55;
        letter-spacing: 0;
        font-weight: 800;
      }
      .about-box {
        display: flex;
        width: min(100%, 720px);
        min-height: 74px;
        align-items: center;
        gap: 16px;
        margin: 32px auto 0;
        border: 1px solid rgba(0,27,71,.1);
        border-radius: 28px;
        background: rgba(255,255,255,.82);
        padding: 14px 18px;
        text-align: left;
        box-shadow: 0 22px 52px rgba(0,27,71,.08);
      }
      .about-icon {
        display: inline-flex;
        width: 48px;
        height: 48px;
        flex: 0 0 auto;
        align-items: center;
        justify-content: center;
        border-radius: 16px;
        background: #fff3ea;
        color: var(--orange);
        font-size: 20px;
        font-weight: 900;
      }
      .about-box strong { display: block; color: var(--navy); font-size: 15px; font-weight: 900; }
      .about-box span { display: block; margin-top: 4px; color: var(--muted); font-size: 14px; font-weight: 700; line-height: 1.45; }
      .chips { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 30px; }
      .chips span {
        display: inline-flex;
        min-height: 48px;
        align-items: center;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 999px;
        background: rgba(255,255,255,.62);
        padding: 0 22px;
        color: var(--muted);
        font-size: 14px;
        font-weight: 800;
        box-shadow: 0 8px 20px rgba(0,27,71,.05);
      }
      .terms { margin-top: 30px; color: var(--muted); font-size: 14px; font-weight: 700; }
      .terms a { color: var(--navy); font-weight: 900; text-decoration: underline; text-decoration-color: rgba(255,106,0,.5); text-underline-offset: 5px; }
      @media (max-width: 720px) {
        .topbar { align-items: flex-start; flex-direction: column; padding: 18px; }
        .nav { justify-content: flex-start; gap: 8px; }
        .nav a { min-height: 38px; padding: 0 12px; font-size: 12px; }
        main { min-height: auto; padding-top: 54px; }
        .wordmark { gap: 8px; font-size: 16px; }
        .wordmark img { width: 104px; }
        .about-box { align-items: flex-start; border-radius: 22px; }
      }
    </style>
  </head>
  <body>
    <header class="topbar">
      <a class="brand" href="index.html" aria-label="EMY home">
        <img src="https://iqlance-demo.com/design/EMY-Web/img/logo-landing.png" alt="EMY" />
      </a>
      <nav class="nav" aria-label="Ask EMY navigation">
        <a href="index.html">EMY Home</a>
        <a href="about-ask-emy.html">About Ask EMY</a>
        <a class="soft" href="emy-signin.html">Sign In</a>
        <a class="primary" href="emy-signup.html">Sign up</a>
      </nav>
    </header>
    <main>
      <section class="center" aria-label="About Ask EMY">
        <div class="wordmark">
          <span>Ask</span>
          <img src="https://iqlance-demo.com/design/EMY-Web/img/logo-landing.png" alt="EMY" />
          <span class="bag" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M6.9 8.1c.35-1.08 1.36-1.8 2.5-1.8h5.2c1.14 0 2.15.72 2.5 1.8l1.7 8.7c.35 1.78-1.01 3.45-2.82 3.45H8.02c-1.81 0-3.17-1.67-2.82-3.45l1.7-8.7Z" fill="#f76512" stroke="#cf5200" stroke-linejoin="round" stroke-width="1"/>
              <path d="M15.9 6.55c.58.35 1.02.9 1.2 1.55l1.7 8.7c.29 1.48-.6 2.88-1.96 3.32l-.98-.08c.74-.62 1.04-1.6.82-2.72l-1.25-6.7c-.28-1.5-.1-2.8.47-4.07Z" fill="#ad3e00" opacity=".2"/>
              <path d="M6.35 10.05c2.15.62 4.02.48 5.66-.3 1.78-.85 3.62-.92 5.46-.22l.38 1.84c-2.32-.78-4.28-.63-6.04.22-1.62.78-3.45.9-5.78.28l.32-1.82Z" fill="#ffb067" opacity=".34"/>
              <path d="M8.8 6.35c.32-1.92 1.42-3 3.2-3s2.88 1.08 3.2 3" stroke="#fff" stroke-linecap="round" stroke-width="1.18" opacity=".9"/>
              <path d="M9.25 13.2c.46-.36.92-.36 1.38 0" stroke="#fff" stroke-linecap="round" stroke-width="1.02" opacity=".96"/>
              <path d="M13.37 13.2c.46-.36.92-.36 1.38 0" stroke="#fff" stroke-linecap="round" stroke-width="1.02" opacity=".96"/>
              <path d="M9.8 15.82c1.34.94 3.06.94 4.4 0" stroke="#fff" stroke-linecap="round" stroke-width="1.18" opacity=".96"/>
            </svg>
          </span>
        </div>
        <div class="beta">BETA</div>
        <h1>Ask EMY is EMY's AI project assistant. It chats with customers to help them find businesses, services, products, places, and answers.</h1>
        <div class="about-box">
          <span class="about-icon">AI</span>
          <div>
            <strong>What it does</strong>
            <span>It understands what customers are looking for and guides them to the right EMY result.</span>
          </div>
        </div>
        <div class="chips" aria-label="Ask EMY highlights">
          <span>Ask naturally</span>
          <span>Find faster</span>
          <span>Get guided</span>
        </div>
        <p class="terms">Ready to try it? <a href="ask-emy.html">Open Ask EMY</a>.</p>
      </section>
    </main>
  </body>
</html>`;
}

function askEmyAboutCleanPageTemplate() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>EMY | About Ask EMY</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
      :root { --navy: #001b47; --orange: #ff6a00; --muted: #8793aa; --line: rgba(0,27,71,.1); --cream: #fbfaf8; }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        color: var(--navy);
        background: radial-gradient(circle at 48% 38%, rgba(255,106,0,.09), transparent 34%), linear-gradient(180deg, #fff 0%, var(--cream) 100%);
      }
      a { color: inherit; text-decoration: none; }
      .topbar {
        display: flex;
        min-height: 88px;
        align-items: center;
        justify-content: space-between;
        gap: 18px;
        padding: 0 32px;
        border-top: 1px solid rgba(255,106,0,.15);
        background: rgba(255,255,255,.72);
      }
      .brand img { display: block; width: auto; height: 44px; object-fit: contain; }
      .nav { display: flex; align-items: center; justify-content: flex-end; gap: 18px; flex-wrap: wrap; }
      .nav a {
        display: inline-flex;
        min-height: 48px;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        padding: 0 18px;
        color: rgba(0,27,71,.72);
        font-size: 14px;
        font-weight: 800;
      }
      .nav a:hover { color: var(--orange); }
      .nav .soft { border: 1px solid var(--line); background: rgba(255,255,255,.78); color: var(--navy); box-shadow: 0 8px 22px rgba(0,27,71,.08); }
      .nav .primary { background: var(--navy); color: #fff; box-shadow: 0 12px 28px rgba(0,27,71,.16); }
      main { width: min(100%, 980px); margin: 0 auto; padding: 88px 18px 56px; }
      .about {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 320px;
        gap: 18px;
        align-items: stretch;
      }
      .panel,
      .side {
        border: 1px solid var(--line);
        border-radius: 28px;
        background: rgba(255,255,255,.82);
        box-shadow: 0 22px 52px rgba(0,27,71,.08);
      }
      .panel { padding: 34px; }
      .title-row { display: flex; align-items: center; gap: 12px; }
      .bag {
        display: inline-flex;
        width: 42px;
        height: 42px;
        align-items: center;
        justify-content: center;
        filter: drop-shadow(0 12px 18px rgba(255,106,0,.22));
      }
      .eyebrow {
        display: inline-flex;
        border: 1px solid rgba(255,106,0,.13);
        border-radius: 999px;
        background: rgba(255,246,238,.92);
        padding: 8px 14px;
        color: var(--orange);
        font-size: 12px;
        font-weight: 900;
        letter-spacing: .18em;
      }
      h1 {
        max-width: 520px;
        margin: 22px 0 0;
        font-size: 31px;
        line-height: 1.12;
        letter-spacing: 0;
        font-weight: 900;
      }
      .lead {
        max-width: 560px;
        margin: 16px 0 0;
        color: var(--muted);
        font-size: 15px;
        font-weight: 700;
        line-height: 1.62;
      }
      .actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
      .button {
        display: inline-flex;
        min-height: 46px;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--line);
        border-radius: 999px;
        background: #fff;
        padding: 0 18px;
        font-size: 14px;
        font-weight: 900;
      }
      .button.primary { border-color: transparent; background: var(--orange); color: #fff; box-shadow: 0 14px 30px rgba(255,106,0,.22); }
      .side { padding: 22px; }
      .side h2 { margin: 0; font-size: 18px; line-height: 1.25; font-weight: 900; }
      .list { display: grid; gap: 12px; margin-top: 18px; }
      .item {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 11px;
        align-items: start;
        border-top: 1px solid var(--line);
        padding-top: 12px;
      }
      .item:first-child { border-top: 0; padding-top: 0; }
      .dot {
        display: inline-flex;
        width: 27px;
        height: 27px;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        background: #fff3ea;
        color: var(--orange);
        font-size: 12px;
        font-weight: 900;
      }
      .item strong { display: block; font-size: 14px; }
      .item span { display: block; margin-top: 4px; color: var(--muted); font-size: 12px; font-weight: 750; line-height: 1.4; }
      .note {
        margin-top: 18px;
        border-radius: 20px;
        background: var(--navy);
        padding: 16px;
        color: #fff;
        font-size: 13px;
        font-weight: 800;
        line-height: 1.45;
      }
      @media (max-width: 800px) {
        .topbar { align-items: flex-start; flex-direction: column; padding: 18px; }
        .nav { justify-content: flex-start; gap: 8px; }
        .nav a { min-height: 38px; padding: 0 12px; font-size: 12px; }
        main { padding-top: 44px; }
        .about { grid-template-columns: 1fr; }
        .panel { padding: 24px; }
        h1 { font-size: 28px; }
      }
    </style>
  </head>
  <body>
    <header class="topbar">
      <a class="brand" href="index.html" aria-label="EMY home">
        <img src="https://iqlance-demo.com/design/EMY-Web/img/logo-landing.png" alt="EMY" />
      </a>
      <nav class="nav" aria-label="Ask EMY navigation">
        <a href="index.html">EMY Home</a>
        <a href="ask-emy.html">Ask EMY</a>
        <a class="soft" href="emy-signin.html">Sign In</a>
        <a class="primary" href="emy-signup.html">Sign up</a>
      </nav>
    </header>
    <main>
      <section class="about" aria-label="About Ask EMY">
        <div class="panel">
          <div class="title-row">
            <span class="eyebrow">About Ask EMY</span>
            <span class="bag" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M6.9 8.1c.35-1.08 1.36-1.8 2.5-1.8h5.2c1.14 0 2.15.72 2.5 1.8l1.7 8.7c.35 1.78-1.01 3.45-2.82 3.45H8.02c-1.81 0-3.17-1.67-2.82-3.45l1.7-8.7Z" fill="#f76512" stroke="#cf5200" stroke-linejoin="round" stroke-width="1"/>
                <path d="M15.9 6.55c.58.35 1.02.9 1.2 1.55l1.7 8.7c.29 1.48-.6 2.88-1.96 3.32l-.98-.08c.74-.62 1.04-1.6.82-2.72l-1.25-6.7c-.28-1.5-.1-2.8.47-4.07Z" fill="#ad3e00" opacity=".2"/>
                <path d="M6.35 10.05c2.15.62 4.02.48 5.66-.3 1.78-.85 3.62-.92 5.46-.22l.38 1.84c-2.32-.78-4.28-.63-6.04.22-1.62.78-3.45.9-5.78.28l.32-1.82Z" fill="#ffb067" opacity=".34"/>
                <path d="M8.8 6.35c.32-1.92 1.42-3 3.2-3s2.88 1.08 3.2 3" stroke="#fff" stroke-linecap="round" stroke-width="1.18" opacity=".9"/>
                <path d="M9.25 13.2c.46-.36.92-.36 1.38 0" stroke="#fff" stroke-linecap="round" stroke-width="1.02" opacity=".96"/>
                <path d="M13.37 13.2c.46-.36.92-.36 1.38 0" stroke="#fff" stroke-linecap="round" stroke-width="1.02" opacity=".96"/>
                <path d="M9.8 15.82c1.34.94 3.06.94 4.4 0" stroke="#fff" stroke-linecap="round" stroke-width="1.18" opacity=".96"/>
              </svg>
            </span>
          </div>
          <h1>EMY's AI assistant for customer support and discovery.</h1>
          <p class="lead">Ask EMY works through chat. It helps customers say what they need, find useful things on EMY, and move to the right place faster.</p>
          <div class="actions">
            <a class="button primary" href="ask-emy.html">Open Ask EMY</a>
            <a class="button" href="index.html">Back to EMY</a>
          </div>
        </div>
        <aside class="side">
          <h2>What it helps with</h2>
          <div class="list">
            <div class="item"><span class="dot">1</span><span><strong>Understand</strong><span>Chat naturally about what you need.</span></span></div>
            <div class="item"><span class="dot">2</span><span><strong>Find</strong><span>See businesses, products, places, and answers.</span></span></div>
            <div class="item"><span class="dot">3</span><span><strong>Guide</strong><span>Go to the useful EMY page or result.</span></span></div>
          </div>
          <div class="note">Simple, helpful, and built into EMY.</div>
        </aside>
      </section>
    </main>
  </body>
</html>`;
}

function askEmyAboutHowItWorksPageTemplate() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>EMY | About Ask EMY</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
      :root { --emy-page-scale: 0.85; --emy-page-shift: clamp(-220px, -10vw, -88px); --navy: #001B47; --orange: #f97316; }
      * { box-sizing: border-box; }
      html { scroll-behavior: smooth; background: #fbfaf8; }
      body {
        margin: 0;
        min-height: 100vh;
        overflow-x: hidden;
        background: #fbfaf8;
        color: var(--navy);
        font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      a { color: inherit; text-decoration: none; }
      #root { min-height: 100vh; width: 100%; }
      @media (min-width: 768px) {
        #root {
          width: calc(100% / var(--emy-page-scale));
          min-height: calc(100vh / var(--emy-page-scale));
          margin-left: var(--emy-page-shift);
          zoom: var(--emy-page-scale);
        }
      }
      .ask-shell {
        position: relative;
        min-height: 100vh;
        overflow: visible;
        background: #fbfaf8;
        color: var(--navy);
        -webkit-font-smoothing: antialiased;
        text-rendering: geometricPrecision;
      }
      .blob {
        position: absolute;
        pointer-events: none;
        border-radius: 999px;
        filter: blur(44px);
      }
      .blob.one { left: 50%; top: 96px; width: 520px; height: 520px; transform: translateX(-50%); background: rgba(255,237,213,.60); }
      .blob.two { right: -96px; top: 144px; width: 320px; height: 320px; background: rgba(254,215,170,.40); }
      .blob.three { left: -96px; bottom: 80px; width: 320px; height: 320px; background: rgba(0,27,71,.05); }
      .topbar {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 50;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px;
        color: var(--navy);
        transition: all .3s ease;
      }
      .brand {
        display: flex;
        cursor: pointer;
        align-items: center;
      }
      .brand img { display: block; width: auto; height: 44px; object-fit: contain; }
      .nav {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 12px;
      }
      .nav a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        padding: 12px 16px;
        color: rgba(0,27,71,.70);
        font-size: 14px;
        line-height: 1.25;
        font-weight: 700;
        transition: background .18s ease, color .18s ease;
      }
      .nav a:hover { background: #fff7ed; color: #ea580c; }
      .nav .soft {
        border: 1px solid rgba(0,27,71,.10);
        background: rgba(255,255,255,.70);
        padding-left: 20px;
        padding-right: 20px;
        color: var(--navy);
        font-weight: 600;
        box-shadow: 0 1px 2px rgba(0,27,71,.06);
      }
      .nav .primary {
        background: var(--navy);
        padding-left: 20px;
        padding-right: 20px;
        color: #fff;
        font-weight: 600;
        box-shadow: 0 8px 20px rgba(0,27,71,.10);
      }
      .nav .primary:hover { background: #ea580c; color: #fff; }
      .about-main {
        position: relative;
        z-index: 10;
        display: flex;
        min-height: 100vh;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding: 112px 20px 88px;
      }
      .center {
        width: min(100%, 1120px);
        margin: 0 auto;
        text-align: center;
      }
      .hero-stage {
        position: relative;
        display: flex;
        width: min(100%, 980px);
        height: 326px;
        align-items: center;
        justify-content: center;
        margin: -8px auto 4px;
      }
      .hero-stage::before {
        content: "";
        position: absolute;
        inset: 34px 170px 38px;
        border-radius: 999px;
        background: radial-gradient(circle, rgba(249,115,22,.24), rgba(249,115,22,.09) 44%, transparent 72%);
        filter: blur(7px);
      }
      .hero-stage::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        width: 560px;
        height: 194px;
        transform: translate(-50%, -50%);
        border: 1px solid rgba(0,27,71,.06);
        border-radius: 999px;
        opacity: .55;
      }
      .hero-ring {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 690px;
        height: 244px;
        transform: translate(-50%, -50%);
        border: 1px solid rgba(249,115,22,.12);
        border-radius: 999px;
        opacity: .7;
        animation: ringBreath 5.8s ease-in-out infinite;
      }
      .hero-ring.second {
        width: 808px;
        height: 292px;
        border-color: rgba(0,27,71,.06);
        animation-delay: -2s;
      }
      .identity {
        position: relative;
        z-index: 4;
        display: flex;
        min-width: 326px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 16px;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 34px;
        background: rgba(255,255,255,.68);
        padding: 24px 32px;
        box-shadow: 0 24px 58px rgba(0,27,71,.10), 0 16px 44px rgba(249,115,22,.12);
        backdrop-filter: blur(16px);
      }
      .wordmark {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }
      .wordmark .ask {
        color: rgba(0,27,71,.75);
        font-size: 15px;
        line-height: 1;
        font-weight: 700;
        letter-spacing: 0;
      }
      .divider {
        display: block;
        width: 1px;
        height: 28px;
        border-radius: 999px;
        background: #d7dbe5;
      }
      .wordmark img { display: block; width: auto; height: 36px; object-fit: contain; }
      .bag {
        position: relative;
        display: flex;
        width: 48px;
        height: 48px;
        flex: 0 0 auto;
        align-items: center;
        justify-content: center;
        overflow: visible;
      }
      .bag svg {
        width: 48px;
        height: 48px;
        filter: drop-shadow(0 14px 18px rgba(0,27,71,.12));
        animation: bagHello 3.8s ease-in-out infinite;
      }
      .tool-pill {
        position: absolute;
        z-index: 3;
        display: inline-flex;
        min-height: 38px;
        align-items: center;
        justify-content: center;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 999px;
        background: rgba(255,255,255,.72);
        padding: 0 16px;
        color: rgba(0,27,71,.52);
        font-size: 13px;
        font-weight: 650;
        box-shadow: 0 14px 32px rgba(0,27,71,.07);
        backdrop-filter: blur(12px);
        animation: floatTool 5.4s ease-in-out infinite;
      }
      .tool-pill.one { left: 132px; top: 18px; animation-delay: -.8s; }
      .tool-pill.two { right: 128px; top: 26px; animation-delay: -1.9s; }
      .tool-pill.three { left: 214px; bottom: 18px; animation-delay: -2.7s; }
      .tool-pill.four { right: 214px; bottom: 20px; animation-delay: -3.5s; }
      .flow-card {
        position: absolute;
        z-index: 2;
        width: 212px;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 22px;
        background: rgba(255,255,255,.76);
        padding: 14px 15px;
        text-align: left;
        box-shadow: 0 18px 42px rgba(0,27,71,.08);
        backdrop-filter: blur(16px);
        animation: floatCard 6.2s ease-in-out infinite;
      }
      .flow-card.ask-card { left: 0; top: 94px; }
      .flow-card.answer-card { right: 0; top: 92px; animation-delay: -2.1s; }
      .flow-card.profile-card { left: 94px; bottom: 54px; width: 186px; animation-delay: -3.4s; }
      .flow-card.clip-card { right: 94px; bottom: 54px; width: 186px; animation-delay: -4.4s; }
      .flow-card small {
        display: inline-flex;
        margin-bottom: 8px;
        border-radius: 999px;
        background: #fff7ed;
        padding: 6px 9px;
        color: #f97316;
        font-size: 10px;
        line-height: 1;
        font-weight: 700;
      }
      .flow-card strong {
        display: block;
        color: var(--navy);
        font-size: 14px;
        line-height: 1.28;
        font-weight: 700;
      }
      .flow-card span {
        display: block;
        margin-top: 6px;
        color: rgba(0,27,71,.48);
        font-size: 12px;
        line-height: 1.38;
        font-weight: 500;
      }
      .flow-line {
        position: absolute;
        z-index: 1;
        height: 2px;
        border-radius: 999px;
        background: linear-gradient(90deg, transparent, rgba(249,115,22,.38), transparent);
        opacity: .65;
        animation: linePulse 3.6s ease-in-out infinite;
      }
      .flow-line.one { left: 206px; top: 150px; width: 184px; transform: rotate(-6deg); }
      .flow-line.two { right: 206px; top: 150px; width: 184px; transform: rotate(6deg); animation-delay: -1.3s; }
      .flow-line.three { left: 268px; bottom: 103px; width: 160px; transform: rotate(14deg); animation-delay: -2s; }
      .flow-line.four { right: 268px; bottom: 104px; width: 160px; transform: rotate(-14deg); animation-delay: -2.6s; }
      @keyframes bagHello {
        0%, 62%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
        12% { transform: translateY(-6px) rotate(-6deg) scale(1.07); }
        24% { transform: translateY(-3px) rotate(6deg) scale(1.05); }
        36% { transform: translateY(-5px) rotate(-3deg) scale(1.06); }
      }
      @keyframes ringBreath {
        0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: .56; }
        50% { transform: translate(-50%, -50%) scale(1.025); opacity: .9; }
      }
      @keyframes floatTool {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      @keyframes floatCard {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
      @keyframes linePulse {
        0%, 100% { opacity: .25; }
        50% { opacity: .75; }
      }
      .beta {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #ffedd5;
        border-radius: 999px;
        background: #fff7ed;
        padding: 8px 16px;
        color: #f97316;
        font-size: 12px;
        line-height: 1;
        font-weight: 700;
        letter-spacing: .22em;
        text-transform: uppercase;
      }
      h1 {
        max-width: 760px;
        margin: 20px auto 0;
        color: var(--navy);
        font-size: 24px;
        line-height: 1.28;
        font-weight: 700;
        letter-spacing: 0;
      }
      .lead {
        max-width: 768px;
        margin: 14px auto 0;
        padding: 0 12px;
        color: rgba(0,27,71,.56);
        font-size: 15px;
        line-height: 1.6;
        font-weight: 500;
      }
      .answer-box {
        position: relative;
        display: grid;
        width: min(100%, 860px);
        min-height: 104px;
        grid-template-columns: auto minmax(0, 1fr) minmax(190px, .42fr);
        align-items: center;
        gap: 18px;
        overflow: hidden;
        margin: 28px auto 0;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 28px;
        background:
          linear-gradient(135deg, rgba(255,255,255,.90), rgba(255,247,237,.72)),
          radial-gradient(circle at 88% 20%, rgba(249,115,22,.14), transparent 36%);
        padding: 18px;
        text-align: left;
        box-shadow: 0 20px 52px rgba(0,27,71,.09), 0 16px 34px rgba(249,115,22,.08);
        backdrop-filter: blur(14px);
      }
      .answer-box::before {
        content: "";
        position: absolute;
        left: 0;
        top: 22px;
        bottom: 22px;
        width: 4px;
        border-radius: 999px;
        background: linear-gradient(180deg, #fb923c, #f97316);
        box-shadow: 0 0 24px rgba(249,115,22,.24);
      }
      .answer-icon {
        position: relative;
        z-index: 1;
        display: inline-flex;
        width: 56px;
        height: 56px;
        flex: 0 0 auto;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        background: #fff4e8;
        color: #f97316;
        box-shadow: inset 0 0 0 1px rgba(249,115,22,.12), 0 12px 24px rgba(249,115,22,.13);
      }
      .answer-icon::after {
        content: "";
        position: absolute;
        inset: 10px;
        border-radius: 999px;
        background: rgba(249,115,22,.08);
      }
      .answer-icon svg { position: relative; z-index: 1; }
      .answer-copy { position: relative; z-index: 1; }
      .answer-copy strong {
        display: block;
        color: var(--navy);
        font-size: 17px;
        line-height: 1.22;
        font-weight: 700;
      }
      .answer-copy span {
        display: block;
        max-width: 560px;
        margin-top: 6px;
        color: rgba(0,27,71,.52);
        font-size: 14px;
        line-height: 1.5;
        font-weight: 500;
      }
      .answer-flow {
        position: relative;
        z-index: 1;
        display: grid;
        gap: 8px;
        color: rgba(0,27,71,.54);
        font-size: 12px;
        font-weight: 650;
      }
      .answer-flow span {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        border-bottom: 1px solid rgba(0,27,71,.07);
        padding: 0 0 7px;
      }
      .answer-flow span:last-child { border-bottom: 0; padding-bottom: 0; }
      .answer-flow b {
        color: #f97316;
        font-size: 10px;
        font-weight: 800;
        letter-spacing: .12em;
        text-transform: uppercase;
      }
      .chips {
        position: relative;
        z-index: 0;
        display: grid;
        width: min(100%, 860px);
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 10px;
        margin: 16px auto 0;
      }
      .chips span,
      .chips a {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 10px;
        min-height: 58px;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 18px;
        background: rgba(255,255,255,.64);
        padding: 11px 12px;
        color: rgba(0,27,71,.58);
        font-size: 13px;
        line-height: 1.25;
        font-weight: 600;
        text-align: left;
        box-shadow: 0 10px 26px rgba(0,27,71,.055);
        backdrop-filter: blur(10px);
        transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease, color .18s ease, background .18s ease;
      }
      .chips i {
        display: inline-flex;
        width: 32px;
        height: 32px;
        flex: 0 0 auto;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
        background: #fff7ed;
        color: #f97316;
        font-style: normal;
        font-size: 11px;
        font-weight: 800;
      }
      .chips a {
        border-color: rgba(249,115,22,.18);
        background: #001B47;
        color: #fff;
        box-shadow: 0 14px 30px rgba(0,27,71,.13);
      }
      .chips a i { background: rgba(255,255,255,.14); color: #fff; }
      .chips span:hover,
      .chips a:hover {
        transform: translateY(-2px);
        border-color: rgba(249,115,22,.22);
        box-shadow: 0 16px 34px rgba(0,27,71,.08);
      }
      .chips a:hover { background: #ea580c; color: #fff; }
      .tools-section {
        width: min(100%, 980px);
        margin: 34px auto 0;
        text-align: left;
      }
      .tools-head {
        display: flex;
        align-items: end;
        justify-content: space-between;
        gap: 18px;
        margin-bottom: 14px;
        padding: 0 4px;
      }
      .tools-head strong {
        display: block;
        color: var(--navy);
        font-size: 22px;
        line-height: 1.15;
        font-weight: 700;
      }
      .tools-head span {
        display: block;
        margin-bottom: 6px;
        color: #f97316;
        font-size: 11px;
        line-height: 1;
        font-weight: 700;
        letter-spacing: .18em;
        text-transform: uppercase;
      }
      .tools-head p {
        max-width: 360px;
        margin: 0;
        color: rgba(0,27,71,.50);
        font-size: 13px;
        line-height: 1.5;
        font-weight: 500;
      }
      .tool-grid {
        display: grid;
        grid-template-columns: minmax(0, 1.2fr) minmax(260px, .8fr);
        gap: 14px;
      }
      .action-card {
        position: relative;
        overflow: hidden;
        min-height: 170px;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 24px;
        background: rgba(255,255,255,.72);
        padding: 20px;
        box-shadow: 0 16px 38px rgba(0,27,71,.07);
        backdrop-filter: blur(14px);
      }
      .action-card::after {
        content: "";
        position: absolute;
        right: -56px;
        top: -60px;
        width: 160px;
        height: 160px;
        border-radius: 999px;
        background: rgba(249,115,22,.10);
      }
      .action-card.wide {
        display: grid;
        grid-template-columns: minmax(0, .9fr) minmax(260px, 1.1fr);
        gap: 18px;
        min-height: 232px;
      }
      .action-copy { position: relative; z-index: 1; }
      .action-copy small {
        display: inline-flex;
        margin-bottom: 12px;
        border-radius: 999px;
        background: #fff7ed;
        padding: 7px 10px;
        color: #f97316;
        font-size: 11px;
        line-height: 1;
        font-weight: 700;
      }
      .action-copy h2,
      .action-copy h3 {
        margin: 0;
        color: var(--navy);
        line-height: 1.18;
        letter-spacing: 0;
        font-weight: 700;
      }
      .action-copy h2 { font-size: 24px; }
      .action-copy h3 { font-size: 18px; }
      .action-copy p {
        margin: 10px 0 0;
        color: rgba(0,27,71,.52);
        font-size: 14px;
        line-height: 1.55;
        font-weight: 500;
      }
      .mini-chat {
        position: relative;
        z-index: 1;
        display: grid;
        align-content: center;
        gap: 10px;
      }
      .mini-chat span {
        display: block;
        max-width: 86%;
        border: 1px solid rgba(0,27,71,.07);
        border-radius: 18px;
        background: rgba(255,255,255,.82);
        padding: 12px 14px;
        color: rgba(0,27,71,.58);
        font-size: 13px;
        line-height: 1.35;
        font-weight: 600;
        box-shadow: 0 10px 24px rgba(0,27,71,.06);
      }
      .mini-chat span:nth-child(2) {
        justify-self: end;
        background: #001B47;
        color: #fff;
      }
      .route-list {
        position: relative;
        z-index: 1;
        display: grid;
        gap: 8px;
        margin-top: 14px;
      }
      .route-list span {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        border-radius: 16px;
        background: rgba(0,27,71,.045);
        padding: 10px 12px;
        color: rgba(0,27,71,.58);
        font-size: 13px;
        font-weight: 600;
      }
      .route-list b {
        color: var(--navy);
        font-size: 12px;
        font-weight: 700;
      }
      .terms {
        margin: 28px 0 0;
        padding: 0 20px;
        color: rgba(0,27,71,.45);
        font-size: 14px;
        font-weight: 500;
        text-align: center;
      }
      .terms a {
        color: var(--navy);
        font-weight: 700;
        text-decoration: underline;
        text-decoration-color: #fdba74;
        text-decoration-thickness: 2px;
        text-underline-offset: 4px;
      }
      @media (min-width: 768px) {
        .topbar { padding-left: 32px; padding-right: 32px; }
        .nav { gap: 16px; }
        .wordmark .ask { font-size: 16px; }
        .about-main { padding-top: 128px; }
      }
      @media (max-width: 720px) {
        .topbar { gap: 12px; padding: 16px 20px; }
        .brand img { height: 44px; }
        .nav { gap: 8px; }
        .nav .home { display: none; }
        .nav a { padding: 10px 12px; font-size: 12px; }
        .nav .soft, .nav .primary { padding-left: 14px; padding-right: 14px; }
        h1 { font-size: 21px; }
        .lead { font-size: 14px; }
        .answer-box { grid-template-columns: auto minmax(0,1fr); align-items: flex-start; border-radius: 20px; }
        .answer-flow { grid-column: 1 / -1; grid-template-columns: repeat(3, 1fr); }
        .answer-flow span { border-bottom: 0; border-right: 1px solid rgba(0,27,71,.07); padding: 0 10px 0 0; }
        .answer-flow span:last-child { border-right: 0; padding-right: 0; }
        .chips { gap: 8px; }
        .chips { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .chips span, .chips a { min-height: 52px; padding: 10px; font-size: 12px; }
        .hero-stage { width: 100%; height: 260px; margin-top: 0; }
        .hero-stage::before { inset: 44px 18px 32px; }
        .hero-stage::after { width: min(88vw, 360px); height: 148px; }
        .hero-ring { width: min(94vw, 420px); height: 174px; }
        .hero-ring.second { width: min(98vw, 460px); height: 210px; }
        .identity { min-width: 0; padding: 18px 22px; border-radius: 28px; }
        .tool-pill { min-height: 34px; padding: 0 12px; font-size: 12px; }
        .tool-pill.one { left: 0; top: 20px; }
        .tool-pill.two { right: 0; top: 28px; }
        .tool-pill.three { left: 18px; bottom: 18px; }
        .tool-pill.four { right: 18px; bottom: 12px; }
        .flow-card,
        .flow-line { display: none; }
        .tools-head { align-items: flex-start; flex-direction: column; }
        .tool-grid,
        .action-card.wide { grid-template-columns: 1fr; }
        .action-card { border-radius: 20px; }
      }
    </style>
  </head>
  <body>
    <div id="root">
      <div class="ask-shell">
        <div class="blob one" aria-hidden="true"></div>
        <div class="blob two" aria-hidden="true"></div>
        <div class="blob three" aria-hidden="true"></div>
        <header class="topbar">
          <a class="brand" href="index.html" aria-label="EMY home">
            <img src="https://iqlance-demo.com/design/EMY-Web/img/logo-landing.png" alt="EMY" />
          </a>
          <nav class="nav" aria-label="Ask EMY navigation">
            <a class="home" href="index.html">EMY Home</a>
            <a href="ask-emy.html">Ask EMY</a>
            <a class="soft" href="emy-signin.html">Sign In</a>
            <a class="primary" href="emy-signup.html">Sign up</a>
          </nav>
        </header>
        <main class="about-main">
          <section class="center" aria-label="About Ask EMY">
            <div class="hero-stage">
              <span class="hero-ring" aria-hidden="true"></span>
              <span class="hero-ring second" aria-hidden="true"></span>
              <span class="flow-line one" aria-hidden="true"></span>
              <span class="flow-line two" aria-hidden="true"></span>
              <span class="flow-line three" aria-hidden="true"></span>
              <span class="flow-line four" aria-hidden="true"></span>
              <span class="tool-pill one" aria-hidden="true">Chat</span>
              <span class="tool-pill two" aria-hidden="true">Nearby</span>
              <span class="tool-pill three" aria-hidden="true">Products</span>
              <span class="tool-pill four" aria-hidden="true">Answers</span>
              <span class="flow-card ask-card">
                <small>Customer asks</small>
                <strong>&quot;What is open near me?&quot;</strong>
                <span>Ask EMY starts with normal words.</span>
              </span>
              <span class="flow-card answer-card">
                <small>EMY answers</small>
                <strong>Nearby matches, offers, and useful next steps.</strong>
                <span>The assistant turns intent into EMY actions.</span>
              </span>
              <span class="flow-card profile-card">
                <small>Go deeper</small>
                <strong>Open business profile</strong>
                <span>Products, posts, clips, location.</span>
              </span>
              <span class="flow-card clip-card">
                <small>Keep exploring</small>
                <strong>Show fresh clips</strong>
                <span>Quick updates from nearby businesses.</span>
              </span>
              <div class="identity">
                <div class="wordmark">
                  <span class="ask">Ask</span>
                  <span class="divider" aria-hidden="true"></span>
                  <img src="https://iqlance-demo.com/design/EMY-Web/img/logo-landing.png" alt="EMY" />
                  <span class="bag" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M6.9 8.1c.35-1.08 1.36-1.8 2.5-1.8h5.2c1.14 0 2.15.72 2.5 1.8l1.7 8.7c.35 1.78-1.01 3.45-2.82 3.45H8.02c-1.81 0-3.17-1.67-2.82-3.45l1.7-8.7Z" fill="#f76512" stroke="#cf5200" stroke-linejoin="round" stroke-width="1"/>
                      <path d="M15.9 6.55c.58.35 1.02.9 1.2 1.55l1.7 8.7c.29 1.48-.6 2.88-1.96 3.32l-.98-.08c.74-.62 1.04-1.6.82-2.72l-1.25-6.7c-.28-1.5-.1-2.8.47-4.07Z" fill="#ad3e00" opacity=".2"/>
                      <path d="M6.35 10.05c2.15.62 4.02.48 5.66-.3 1.78-.85 3.62-.92 5.46-.22l.38 1.84c-2.32-.78-4.28-.63-6.04.22-1.62.78-3.45.9-5.78.28l.32-1.82Z" fill="#ffb067" opacity=".34"/>
                      <path d="M8.8 6.35c.32-1.92 1.42-3 3.2-3s2.88 1.08 3.2 3" stroke="#fff" stroke-linecap="round" stroke-width="1.18" opacity=".9"/>
                      <path d="M9.25 13.2c.46-.36.92-.36 1.38 0" stroke="#fff" stroke-linecap="round" stroke-width="1.02" opacity=".96"/>
                      <path d="M13.37 13.2c.46-.36.92-.36 1.38 0" stroke="#fff" stroke-linecap="round" stroke-width="1.02" opacity=".96"/>
                      <path d="M9.8 15.82c1.34.94 3.06.94 4.4 0" stroke="#fff" stroke-linecap="round" stroke-width="1.18" opacity=".96"/>
                    </svg>
                  </span>
                </div>
                <span class="beta">Beta</span>
              </div>
            </div>
            <h1>Ask EMY is EMY's AI project assistant for chat-based help and discovery.</h1>
            <p class="lead">It supports customers by chatting with them, understanding what they need, and guiding them toward businesses, products, places, answers, posts, and clips inside EMY.</p>
            <div class="answer-box">
              <span class="answer-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
                  <path d="M5 12.5c0-3.6 2.95-6.5 7-6.5s7 2.9 7 6.5-2.95 6.5-7 6.5c-.72 0-1.4-.1-2.03-.29L6 20l1.28-3.03A6.17 6.17 0 0 1 5 12.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
                  <path d="M9 12h6M9 15h3.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                </svg>
              </span>
              <span class="answer-copy">
                <strong>Built into EMY, not another app.</strong>
                <span>Ask EMY sits inside the same experience, so a customer can ask, discover, and continue without feeling sent somewhere else.</span>
              </span>
              <span class="answer-flow" aria-hidden="true">
                <span>Chat <b>Ask</b></span>
                <span>Match <b>Find</b></span>
                <span>Continue <b>Open</b></span>
              </span>
            </div>
            <div class="chips" aria-label="Ask EMY highlights">
              <span><i>01</i>Find nearby services</span>
              <span><i>02</i>Compare products</span>
              <span><i>03</i>Understand results</span>
              <a href="ask-emy.html"><i>GO</i>Open Ask EMY</a>
            </div>
            <section class="tools-section" aria-label="Ask EMY tools in action">
              <div class="tools-head">
                <div>
                  <span>Tools in action</span>
                  <strong>How Ask EMY helps inside EMY</strong>
                </div>
                <p>Short, practical steps that move a customer from a question to the right EMY place.</p>
              </div>
              <div class="tool-grid">
                <article class="action-card wide">
                  <div class="action-copy">
                    <small>Chat to search</small>
                    <h2>A customer can ask normally.</h2>
                    <p>Ask EMY reads the request, uses location and intent, then turns it into something EMY can show clearly.</p>
                  </div>
                  <div class="mini-chat" aria-hidden="true">
                    <span>I need somewhere nearby that is open and sells pizza.</span>
                    <span>Here are nearby businesses, offers, and clips you can check now.</span>
                    <span>Open the business profile to compare products, posts, and location.</span>
                  </div>
                </article>
                <article class="action-card">
                  <div class="action-copy">
                    <small>Discover</small>
                    <h3>Find what is active near you.</h3>
                    <p>Nearby businesses, new products, updates, and clips can surface from one conversation.</p>
                  </div>
                  <div class="route-list" aria-hidden="true">
                    <span>Business List <b>nearby</b></span>
                    <span>Product List <b>fresh</b></span>
                  </div>
                </article>
                <article class="action-card">
                  <div class="action-copy">
                    <small>Continue</small>
                    <h3>Send people to the right page.</h3>
                    <p>When chat is not enough, Ask EMY can guide the customer into search, profile, posts, or clips.</p>
                  </div>
                  <div class="route-list" aria-hidden="true">
                    <span>Search results <b>open</b></span>
                    <span>Business profile <b>visit</b></span>
                  </div>
                </article>
              </div>
            </section>
            <p class="terms">Ask EMY follows the same EMY experience. <a href="terms.html">Terms</a> and <a href="privacy.html">Privacy Policy</a>.</p>
          </section>
        </main>
      </div>
    </div>
  </body>
</html>`;
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>EMY | About Ask EMY</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
      :root { --navy: #001b47; --orange: #ff6a00; --muted: #6d7891; --line: rgba(0,27,71,.1); --cream: #fbfaf8; }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        color: var(--navy);
        background: linear-gradient(180deg, #fff 0%, var(--cream) 100%);
      }
      a { color: inherit; text-decoration: none; }
      .topbar {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 50;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px;
        color: var(--navy);
        background: transparent;
      }
      .brand img { display: block; width: auto; height: 44px; object-fit: contain; }
      .nav { display: flex; align-items: center; justify-content: flex-end; gap: 12px; flex-wrap: wrap; }
      .nav a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        padding: 12px 16px;
        color: rgba(0,27,71,.70);
        font-size: 14px;
        font-weight: 900;
        line-height: 1.25;
        transition: background .18s ease, color .18s ease, transform .18s ease;
      }
      .nav a:hover { transform: translateY(-1px); background: #fff7ed; color: var(--orange); }
      .nav .soft {
        border: 1px solid var(--line);
        background: rgba(255,255,255,.70);
        padding: 12px 20px;
        color: var(--navy);
        font-weight: 700;
        box-shadow: 0 1px 2px rgba(0,27,71,.06);
      }
      .nav .primary {
        background: var(--navy);
        padding: 12px 20px;
        color: #fff;
        font-weight: 700;
        box-shadow: 0 10px 24px rgba(0,27,71,.10);
      }
      .nav .primary:hover { background: #ea580c; color: #fff; }
      @media (min-width: 768px) {
        .topbar { padding-left: 32px; padding-right: 32px; }
        .nav { gap: 16px; }
      }
      main { overflow: hidden; }
      .hero {
        position: relative;
        width: min(100%, 1060px);
        margin: 0 auto;
        padding: 120px 18px 42px;
        text-align: center;
      }
      .motion {
        position: relative;
        width: min(100%, 560px);
        height: 230px;
        margin: 0 auto 18px;
      }
      .glow {
        position: absolute;
        inset: 38px 70px 10px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255,106,0,.14), transparent 67%);
        filter: blur(2px);
      }
      .core {
        position: absolute;
        left: 50%;
        top: 50%;
        display: flex;
        align-items: center;
        gap: 10px;
        transform: translate(-50%, -50%);
        border: 1px solid var(--line);
        border-radius: 28px;
        background: rgba(255,255,255,.88);
        padding: 18px 22px;
        box-shadow: 0 24px 58px rgba(0,27,71,.10);
      }
      .core img { width: 116px; height: auto; display: block; }
      .bag {
        display: inline-flex;
        width: 46px;
        height: 46px;
        align-items: center;
        justify-content: center;
        filter: drop-shadow(0 12px 18px rgba(255,106,0,.24));
        animation: bagHello 3.8s ease-in-out infinite;
      }
      .tile {
        position: absolute;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 42px;
        border: 1px solid rgba(0,27,71,.09);
        border-radius: 999px;
        background: rgba(255,255,255,.82);
        padding: 0 17px;
        color: var(--muted);
        font-size: 13px;
        font-weight: 850;
        box-shadow: 0 14px 32px rgba(0,27,71,.07);
        animation: floatTile 5s ease-in-out infinite;
      }
      .tile.one { left: 38px; top: 36px; animation-delay: -.6s; }
      .tile.two { right: 38px; top: 40px; animation-delay: -1.7s; }
      .tile.three { left: 86px; bottom: 24px; animation-delay: -2.4s; }
      .tile.four { right: 78px; bottom: 20px; animation-delay: -3.1s; }
      @keyframes floatTile {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-12px); }
      }
      @keyframes bagHello {
        0%, 62%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
        12% { transform: translateY(-7px) rotate(-7deg) scale(1.08); }
        24% { transform: translateY(-3px) rotate(7deg) scale(1.06); }
        36% { transform: translateY(-6px) rotate(-4deg) scale(1.08); }
      }
      .beta {
        display: inline-flex;
        border: 1px solid rgba(255,106,0,.13);
        border-radius: 999px;
        background: rgba(255,246,238,.92);
        padding: 8px 18px;
        color: var(--orange);
        font-size: 12px;
        font-weight: 900;
        letter-spacing: .26em;
      }
      h1 {
        max-width: 740px;
        margin: 22px auto 0;
        font-size: clamp(34px, 5vw, 58px);
        line-height: 1.02;
        letter-spacing: 0;
        font-weight: 900;
      }
      .lead {
        max-width: 700px;
        margin: 18px auto 0;
        color: var(--muted);
        font-size: 16px;
        font-weight: 720;
        line-height: 1.65;
      }
      .section {
        width: min(100%, 980px);
        margin: 0 auto;
        padding: 18px 18px 58px;
      }
      .section h2 {
        margin: 0 0 18px;
        font-size: 24px;
        line-height: 1.15;
        font-weight: 900;
      }
      .cards {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 14px;
      }
      .card {
        min-height: 184px;
        border: 1px solid var(--line);
        border-radius: 26px;
        background: rgba(255,255,255,.86);
        padding: 22px;
        box-shadow: 0 18px 42px rgba(0,27,71,.07);
      }
      .mock {
        display: grid;
        gap: 8px;
        margin-top: 16px;
      }
      .mock span {
        display: block;
        height: 10px;
        border-radius: 999px;
        background: rgba(0,27,71,.08);
      }
      .mock span:nth-child(1) { width: 74%; background: rgba(255,106,0,.18); }
      .mock span:nth-child(2) { width: 92%; }
      .mock span:nth-child(3) { width: 54%; }
      .card b {
        display: inline-flex;
        width: 34px;
        height: 34px;
        align-items: center;
        justify-content: center;
        border-radius: 13px;
        background: #fff3ea;
        color: var(--orange);
        font-size: 13px;
        font-weight: 900;
      }
      .card h3 { margin: 18px 0 0; font-size: 18px; line-height: 1.22; }
      .card p { margin: 9px 0 0; color: var(--muted); font-size: 14px; font-weight: 700; line-height: 1.55; }
      .closing {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 18px;
        margin-top: 16px;
        border: 1px solid var(--line);
        border-radius: 26px;
        background: var(--navy);
        padding: 20px 22px;
        color: #fff;
      }
      .closing strong { display: block; font-size: 18px; }
      .closing span { display: block; margin-top: 4px; color: rgba(255,255,255,.72); font-size: 13px; font-weight: 700; }
      .button {
        display: inline-flex;
        min-height: 44px;
        flex: 0 0 auto;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        background: var(--orange);
        padding: 0 18px;
        color: #fff;
        font-size: 14px;
        font-weight: 900;
      }
      @media (max-width: 780px) {
        .topbar { padding: 16px 20px; }
        .brand img { height: 44px; }
        .nav { justify-content: flex-end; gap: 8px; }
        .nav a { padding: 10px 12px; font-size: 12px; }
        .nav .soft, .nav .primary { padding: 10px 14px; }
        .hero { padding-top: 112px; }
        .motion { height: 214px; }
        .tile.one { left: 6px; }
        .tile.two { right: 6px; }
        .tile.three { left: 20px; }
        .tile.four { right: 18px; }
        .cards { grid-template-columns: 1fr; }
        .closing { align-items: flex-start; flex-direction: column; }
      }
    </style>
  </head>
  <body>
    <header class="topbar">
      <a class="brand" href="index.html" aria-label="EMY home">
        <img src="https://iqlance-demo.com/design/EMY-Web/img/logo-landing.png" alt="EMY" />
      </a>
      <nav class="nav" aria-label="Ask EMY navigation">
        <a href="index.html">EMY Home</a>
        <a href="ask-emy.html">Ask EMY</a>
        <a class="soft" href="emy-signin.html">Sign In</a>
        <a class="primary" href="emy-signup.html">Sign up</a>
      </nav>
    </header>
    <main>
      <section class="hero" aria-label="How Ask EMY works">
        <div class="motion" aria-hidden="true">
          <div class="glow"></div>
          <span class="tile one">Chat</span>
          <span class="tile two">Nearby</span>
          <span class="tile three">Products</span>
          <span class="tile four">Answers</span>
          <div class="core">
            <img src="https://iqlance-demo.com/design/EMY-Web/img/logo-landing.png" alt="" />
            <span class="bag">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M6.9 8.1c.35-1.08 1.36-1.8 2.5-1.8h5.2c1.14 0 2.15.72 2.5 1.8l1.7 8.7c.35 1.78-1.01 3.45-2.82 3.45H8.02c-1.81 0-3.17-1.67-2.82-3.45l1.7-8.7Z" fill="#f76512" stroke="#cf5200" stroke-linejoin="round" stroke-width="1"/>
                <path d="M15.9 6.55c.58.35 1.02.9 1.2 1.55l1.7 8.7c.29 1.48-.6 2.88-1.96 3.32l-.98-.08c.74-.62 1.04-1.6.82-2.72l-1.25-6.7c-.28-1.5-.1-2.8.47-4.07Z" fill="#ad3e00" opacity=".2"/>
                <path d="M6.35 10.05c2.15.62 4.02.48 5.66-.3 1.78-.85 3.62-.92 5.46-.22l.38 1.84c-2.32-.78-4.28-.63-6.04.22-1.62.78-3.45.9-5.78.28l.32-1.82Z" fill="#ffb067" opacity=".34"/>
                <path d="M8.8 6.35c.32-1.92 1.42-3 3.2-3s2.88 1.08 3.2 3" stroke="#fff" stroke-linecap="round" stroke-width="1.18" opacity=".9"/>
                <path d="M9.25 13.2c.46-.36.92-.36 1.38 0" stroke="#fff" stroke-linecap="round" stroke-width="1.02" opacity=".96"/>
                <path d="M13.37 13.2c.46-.36.92-.36 1.38 0" stroke="#fff" stroke-linecap="round" stroke-width="1.02" opacity=".96"/>
                <path d="M9.8 15.82c1.34.94 3.06.94 4.4 0" stroke="#fff" stroke-linecap="round" stroke-width="1.18" opacity=".96"/>
              </svg>
            </span>
          </div>
        </div>
        <span class="beta">BETA</span>
        <h1>Wondering how Ask EMY works?</h1>
        <p class="lead">Ask EMY is EMY's AI project assistant. It supports customers through chat, helping them find local businesses, services, products, places, and answers.</p>
      </section>
      <section class="section" aria-label="Ask EMY steps">
        <h2>Tools in action</h2>
        <div class="cards">
          <article class="card"><b>1</b><h3>Find nearby</h3><p>Ask EMY can help customers discover local businesses, products, and places.</p><div class="mock"><span></span><span></span><span></span></div></article>
          <article class="card"><b>2</b><h3>Guide the search</h3><p>It can turn a simple question into a clearer EMY result or page.</p><div class="mock"><span></span><span></span><span></span></div></article>
          <article class="card"><b>3</b><h3>Show what is new</h3><p>It can surface fresh products, posts, clips, and business updates.</p><div class="mock"><span></span><span></span><span></span></div></article>
        </div>
        <div class="closing">
          <div>
            <strong>Built for the EMY customer journey.</strong>
            <span>A simple AI layer that helps people search, decide, and continue.</span>
          </div>
          <a class="button" href="ask-emy.html">Open Ask EMY</a>
        </div>
      </section>
    </main>
  </body>
</html>`;
}

function emyAdminBackendPageTemplate() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>EMY | Admin Backend</title>
    <style>
      :root { --navy:#001b47; --orange:#ff6a00; --muted:#667085; --line:rgba(0,27,71,.10); --green:#039855; --red:#d92d20; --bg:#fffaf4; }
      * { box-sizing:border-box; }
      html, body { margin:0; min-height:100%; background:var(--bg); color:var(--navy); font-family:Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      body { min-height:100vh; }
      button, input, select, textarea { font:inherit; }
      button { cursor:pointer; }
      .page { min-height:100vh; background:radial-gradient(circle at 90% 0%, rgba(255,106,0,.12), transparent 280px), linear-gradient(180deg,#fff8ef,#fffdf9 46%,#fff7ef); }
      .shell { width:min(100%,1380px); margin:0 auto; padding:18px 18px 40px; }
      .top { position:sticky; top:0; z-index:10; display:grid; grid-template-columns:minmax(0,1fr) auto; gap:14px; align-items:center; margin:-18px -18px 18px; padding:18px; border-bottom:1px solid var(--line); background:rgba(255,250,244,.86); backdrop-filter:blur(16px); box-shadow:0 12px 34px rgba(0,27,71,.06); }
      .brand { display:flex; align-items:center; gap:12px; min-width:0; }
      .mark { width:44px; height:44px; border-radius:14px; background:conic-gradient(from 45deg,#ff6a00,#ffb000,#12b76a,#2e90fa,#7a5cff,#ff6a00); box-shadow:0 12px 26px rgba(0,27,71,.14); }
      .brand h1 { margin:0; color:var(--navy); font-size:24px; line-height:1.05; font-weight:880; letter-spacing:0; }
      .brand p { margin:4px 0 0; color:var(--muted); font-size:13px; line-height:1.35; font-weight:620; }
      .top-actions { display:flex; flex-wrap:wrap; gap:9px; justify-content:flex-end; }
      .pill, .primary, .danger { min-height:38px; border-radius:999px; display:inline-flex; align-items:center; justify-content:center; gap:7px; padding:0 14px; font-size:12.5px; line-height:1; font-weight:820; text-decoration:none; }
      .pill { border:1px solid rgba(0,27,71,.10); background:rgba(255,255,255,.78); color:var(--navy); box-shadow:0 9px 20px rgba(0,27,71,.05); }
      .primary { border:0; background:var(--orange); color:#fff; box-shadow:0 12px 24px rgba(255,106,0,.20); }
      .danger { border:1px solid rgba(217,45,32,.18); background:#fff2f0; color:var(--red); }
      .notice { margin:0 0 16px; border:1px solid rgba(255,106,0,.18); border-radius:16px; background:rgba(255,244,232,.72); padding:13px 15px; color:#6b3a00; font-size:13px; line-height:1.45; font-weight:650; }
      .layout { display:grid; grid-template-columns:230px minmax(0,1fr); gap:18px; }
      .side { position:sticky; top:96px; align-self:start; border:1px solid var(--line); border-radius:18px; background:rgba(255,255,255,.78); padding:10px; box-shadow:0 18px 42px rgba(0,27,71,.08); backdrop-filter:blur(14px); }
      .nav { display:grid; gap:6px; }
      .nav button { width:100%; min-height:42px; border:0; border-radius:12px; background:transparent; color:#526079; display:flex; align-items:center; justify-content:space-between; gap:8px; padding:0 11px; text-align:left; font-size:13px; font-weight:780; }
      .nav button.is-active { background:#fff4e8; color:#c14f00; box-shadow:inset 0 0 0 1px rgba(255,106,0,.18); }
      .nav small { min-width:22px; height:22px; border-radius:999px; background:rgba(0,27,71,.06); color:inherit; display:grid; place-items:center; font-size:10px; font-weight:900; }
      .main { min-width:0; display:grid; gap:16px; }
      .toolbar { display:grid; grid-template-columns:minmax(0,1fr) auto auto; gap:10px; }
      .search, .select, .textarea, .input { width:100%; border:1px solid var(--line); border-radius:14px; background:rgba(255,255,255,.88); color:var(--navy); outline:0; padding:11px 12px; font-size:13px; font-weight:650; box-shadow:inset 0 1px 0 rgba(255,255,255,.82); }
      .textarea { min-height:140px; resize:vertical; font-family:Consolas, "SFMono-Regular", monospace; font-size:12px; line-height:1.45; }
      .cards { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:12px; }
      .metric { border:1px solid var(--line); border-radius:16px; background:linear-gradient(145deg,rgba(255,255,255,.92),rgba(255,250,245,.78)); padding:14px; box-shadow:0 14px 34px rgba(0,27,71,.07); }
      .metric small { display:block; color:var(--muted); font-size:11px; line-height:1.2; font-weight:800; text-transform:uppercase; letter-spacing:.08em; }
      .metric strong { display:block; margin-top:8px; color:var(--navy); font-size:28px; line-height:1; font-weight:900; }
      .metric span { display:block; margin-top:7px; color:#748099; font-size:12px; line-height:1.3; font-weight:620; }
      .panel { border:1px solid var(--line); border-radius:18px; background:rgba(255,255,255,.86); overflow:hidden; box-shadow:0 18px 42px rgba(0,27,71,.08); }
      .panel-head { display:flex; align-items:center; justify-content:space-between; gap:12px; min-height:58px; padding:14px 16px; border-bottom:1px solid rgba(0,27,71,.08); background:rgba(255,255,255,.62); }
      .panel-head h2 { margin:0; color:var(--navy); font-size:17px; line-height:1.15; font-weight:880; }
      .panel-head p { margin:3px 0 0; color:var(--muted); font-size:12px; line-height:1.35; font-weight:620; }
      .panel-body { padding:14px; }
      .grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:12px; }
      .row-card { border:1px solid rgba(0,27,71,.09); border-radius:15px; background:linear-gradient(145deg,rgba(255,255,255,.94),rgba(248,251,255,.76)); padding:13px; box-shadow:0 12px 26px rgba(0,27,71,.055); }
      .row-card h3 { margin:0; color:var(--navy); font-size:15px; line-height:1.2; font-weight:880; overflow-wrap:anywhere; }
      .row-card p { margin:7px 0 0; color:#667085; font-size:12.5px; line-height:1.42; font-weight:610; overflow-wrap:anywhere; }
      .row-meta { display:flex; flex-wrap:wrap; gap:6px; margin-top:10px; }
      .tag { min-height:24px; display:inline-flex; align-items:center; border-radius:999px; background:#f2f4f7; color:#526079; padding:0 9px; font-size:10.5px; line-height:1; font-weight:820; }
      .tag.green { background:#ecfdf3; color:#027a48; }
      .tag.orange { background:#fff4e8; color:#c14f00; }
      .tag.red { background:#fff1f0; color:#b42318; }
      .row-actions { display:flex; flex-wrap:wrap; gap:8px; margin-top:12px; }
      .row-actions button { min-height:32px; border-radius:999px; border:1px solid rgba(0,27,71,.10); background:#fff; color:var(--navy); display:inline-flex; align-items:center; justify-content:center; gap:6px; padding:0 11px; font-size:11.5px; font-weight:820; }
      .row-actions button svg { width:14px; height:14px; fill:none; stroke:currentColor; stroke-width:2; stroke-linecap:round; stroke-linejoin:round; }
      .row-actions button.approve { border-color:rgba(3,152,85,.18); background:#ecfdf3; color:#027a48; }
      .row-actions button.reject { border-color:rgba(217,45,32,.18); background:#fff1f0; color:#b42318; }
      .table { width:100%; border-collapse:collapse; }
      .table th, .table td { border-bottom:1px solid rgba(0,27,71,.07); padding:10px 8px; text-align:left; vertical-align:top; font-size:12.5px; line-height:1.35; }
      .table th { color:#667085; font-size:10.5px; text-transform:uppercase; letter-spacing:.08em; font-weight:900; }
      .empty { padding:28px; text-align:center; color:#7b879d; font-size:13px; font-weight:650; }
      .detail { display:grid; gap:10px; }
      .detail label { display:grid; gap:6px; color:var(--muted); font-size:11px; font-weight:840; text-transform:uppercase; letter-spacing:.06em; }
      .ai-result { white-space:pre-wrap; border:1px solid rgba(0,27,71,.08); border-radius:14px; background:#f8fafc; color:#344054; padding:12px; font-size:12.5px; line-height:1.45; font-weight:620; }
      [hidden] { display:none !important; }
      @media (max-width:980px) { .layout { grid-template-columns:1fr; } .side { position:relative; top:auto; } .nav { grid-template-columns:repeat(2,minmax(0,1fr)); } .cards, .grid { grid-template-columns:1fr 1fr; } .toolbar { grid-template-columns:1fr; } }
      @media (max-width:620px) { .top { grid-template-columns:1fr; } .cards, .grid, .nav { grid-template-columns:1fr; } .shell { padding-left:12px; padding-right:12px; } }
    </style>
  </head>
  <body>
    <div class="page">
      <header class="top">
        <div class="brand"><span class="mark" aria-hidden="true"></span><span><h1>EMY administrator</h1><p>Backoffice link for customers, businesses, approvals, content, messages, AI, and saved backend data.</p></span></div>
        <div class="top-actions">
          <a class="pill" href="emy-customer-home.html">Customer app</a>
          <a class="pill" href="emy-business-profile.html">Business profile</a>
          <button class="primary" type="button" data-action="snapshot">Save backend snapshot</button>
        </div>
      </header>
      <main class="shell">
        <p class="notice"><strong>Admin note:</strong> this page manages the static test backend stored in this browser's localStorage. In production these same panels should connect to the real API/database with administrator authentication and audit logs.</p>
        <div class="layout">
          <aside class="side">
            <nav class="nav" data-admin-nav>
              <button class="is-active" type="button" data-view="overview">Overview <small data-count="overview">0</small></button>
              <button type="button" data-view="approvals">Approvals <small data-count="approvals">0</small></button>
              <button type="button" data-view="people">People <small data-count="people">0</small></button>
              <button type="button" data-view="businesses">Businesses <small data-count="businesses">0</small></button>
              <button type="button" data-view="content">Content <small data-count="content">0</small></button>
              <button type="button" data-view="messages">Messages <small data-count="messages">0</small></button>
              <button type="button" data-view="ai">Ask EMY AI <small data-count="ai">0</small></button>
              <button type="button" data-view="data">Data store <small data-count="data">0</small></button>
            </nav>
          </aside>
          <section class="main">
            <div class="toolbar">
              <input class="search" data-search placeholder="Search customers, businesses, products, emails, phone numbers, messages..." />
              <select class="select" data-status-filter><option value="">All statuses</option><option>Pending</option><option>Approved</option><option>Rejected</option><option>Customer</option><option>Business</option></select>
              <button class="pill" type="button" data-action="refresh">Refresh data</button>
            </div>
            <section data-view-panel="overview"></section>
            <section data-view-panel="approvals" hidden></section>
            <section data-view-panel="people" hidden></section>
            <section data-view-panel="businesses" hidden></section>
            <section data-view-panel="content" hidden></section>
            <section data-view-panel="messages" hidden></section>
            <section data-view-panel="ai" hidden></section>
            <section data-view-panel="data" hidden></section>
          </section>
        </div>
      </main>
    </div>
    <script>
      (function () {
        const nav = document.querySelector("[data-admin-nav]");
        const panels = Array.from(document.querySelectorAll("[data-view-panel]"));
        const searchInput = document.querySelector("[data-search]");
        const statusFilter = document.querySelector("[data-status-filter]");
        let activeView = "overview";
        let state = {};

        function esc(value) {
          return String(value == null ? "" : value).replace(/[&<>"']/g, function (char) {
            return { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[char];
          });
        }
        function actionIcon(name) {
          if (name === "approve") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>';
          if (name === "reject") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>';
          return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5Z"/><path d="M12 9.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"/></svg>';
        }
        function readJson(key, fallback) {
          try {
            const value = localStorage.getItem(key);
            if (!value) return fallback;
            const parsed = JSON.parse(value);
            return parsed == null ? fallback : parsed;
          } catch (error) {
            return fallback;
          }
        }
        function writeJson(key, value) {
          localStorage.setItem(key, JSON.stringify(value));
        }
        function slug(value) {
          return String(value || "item").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "item";
        }
        function allStorage() {
          const items = [];
          for (let index = 0; index < localStorage.length; index += 1) {
            const key = localStorage.key(index);
            if (!key || key.indexOf("emy") !== 0) continue;
            items.push({ key, value: localStorage.getItem(key) || "" });
          }
          return items.sort(function (a, b) { return a.key.localeCompare(b.key); });
        }
        function short(value, length) {
          const text = String(value || "");
          return text.length > length ? text.slice(0, length - 1) + "..." : text;
        }
        function asArray(value) {
          if (Array.isArray(value)) return value;
          if (value && typeof value === "object") return Object.keys(value).map(function (key) { return Object.assign({ key: key }, value[key]); });
          return [];
        }
        function collectState() {
          const storage = allStorage();
          const pendingSignup = {
            role: localStorage.getItem("emyMainPendingSignupRole") || "",
            firstName: localStorage.getItem("emyMainPendingSignupFirstName") || "",
            lastName: localStorage.getItem("emyMainPendingSignupLastName") || "",
            email: localStorage.getItem("emyMainPendingSignupEmail") || "",
            phone: localStorage.getItem("emyMainPendingSignupPhone") || "",
            photo: localStorage.getItem("emyMainPendingSignupPhoto") || "",
            privacy: localStorage.getItem("emyMainPendingSignupPrivacy") || "",
          };
          const askUser = readJson("emyAskCurrentUser", {});
          const businessProfile = readJson("emyBusinessProfileDraft", {});
          const customerBusinesses = readJson("emyCustomerBusinesses", {});
          const approvals = buildApprovals(pendingSignup, businessProfile);
          const customers = buildCustomers(pendingSignup, askUser);
          const businesses = buildBusinesses(businessProfile, customerBusinesses, approvals);
          const jobs = readJson("emyFeedCreatedJobs", []);
          const events = readJson("emyFeedCreatedEvents", []);
          const applications = readJson("emyJobApplications", []);
          const saved = asArray(readJson("emySavedFeedItems", {}));
          const products = collectProducts();
          const messages = collectMessages(storage, applications);
          const aiChats = readJson("emyAskSavedChats", []);
          const aiSettings = readJson("emyAdminAiSettings", { provider:"OpenAI / OpenRouter / DeepSeek", model:"gpt-5.4", status:"OpenAI gpt-5.4 unless another provider is selected", notes:"Server endpoint: /api/ask-emy" });
          return { storage, pendingSignup, approvals, customers, businesses, jobs, events, applications, saved, products, messages, aiChats, aiSettings };
        }
        function buildApprovals(pendingSignup, businessProfile) {
          const stored = readJson("emyAdminBusinessApprovals", []);
          const byId = {};
          stored.forEach(function (item) { if (item && item.id) byId[item.id] = item; });
          if (pendingSignup.role === "business" && (pendingSignup.email || pendingSignup.firstName || pendingSignup.phone)) {
            const name = [pendingSignup.firstName, pendingSignup.lastName].filter(Boolean).join(" ") || pendingSignup.email || "New business signup";
            const id = "signup-" + slug(pendingSignup.email || name);
            byId[id] = Object.assign({
              id,
              name,
              email: pendingSignup.email,
              phone: pendingSignup.phone,
              source: "Business sign up",
              status: localStorage.getItem("emyBusinessReviewStatus") || "Pending",
              createdAt: localStorage.getItem("emyBusinessReviewSubmittedAt") || new Date().toISOString(),
            }, byId[id] || {});
          }
          const businessName = businessProfile.businessName || localStorage.getItem("emyBusinessDisplayName") || localStorage.getItem("emyBusinessName") || "";
          if (businessName) {
            const id = "profile-" + slug(businessName);
            byId[id] = Object.assign({
              id,
              name: businessName,
              email: businessProfile.email || localStorage.getItem("emyMainPendingSignupEmail") || "",
              phone: businessProfile.phone || localStorage.getItem("emyMainPendingSignupPhone") || "",
              source: "Business profile",
              status: localStorage.getItem("emyBusinessReviewStatus") || "Pending",
              createdAt: localStorage.getItem("emyBusinessReviewSubmittedAt") || new Date().toISOString(),
              details: businessProfile,
            }, byId[id] || {});
          }
          return Object.keys(byId).map(function (key) { return byId[key]; });
        }
        function buildCustomers(pendingSignup, askUser) {
          const customers = [];
          if (pendingSignup.role === "customer" || pendingSignup.email || pendingSignup.phone) {
            customers.push({
              id: "customer-" + slug(pendingSignup.email || pendingSignup.firstName || "current"),
              name: [pendingSignup.firstName, pendingSignup.lastName].filter(Boolean).join(" ") || askUser.name || "Customer",
              email: pendingSignup.email || askUser.email || "",
              phone: pendingSignup.phone || localStorage.getItem("emyCustomerPhone") || "",
              role: pendingSignup.role || localStorage.getItem("emyMainSignedInRole") || "customer",
              photo: localStorage.getItem("emyCustomerProfilePhoto") || localStorage.getItem("emyCustomerProfilePhotoSrc") || (!String(localStorage.getItem("emyMainSignedInRole") || "").trim() && pendingSignup.role === "customer" ? pendingSignup.photo : "") || "",
              location: localStorage.getItem("emyCustomerLocationLabel") || localStorage.getItem("emyCustomerLocation") || "",
              status: "Customer",
            });
          }
          const displayName = localStorage.getItem("emyCustomerDisplayName") || "";
          if (displayName && !customers.some(function (item) { return item.name === displayName; })) {
            customers.push({ id:"customer-profile", name:displayName, email:localStorage.getItem("emyMainSignedInEmail") || "", phone:localStorage.getItem("emyCustomerPhone") || "", role:"customer", status:"Customer", location:localStorage.getItem("emyCustomerLocationLabel") || "" });
          }
          return customers;
        }
        function buildBusinesses(profile, customerBusinesses, approvals) {
          const businesses = approvals.map(function (item) {
            return { id:item.id, name:item.name, email:item.email, phone:item.phone, status:item.status, source:item.source, details:item.details || {} };
          });
          Object.keys(customerBusinesses || {}).forEach(function (key) {
            const item = customerBusinesses[key] || {};
            if (!businesses.some(function (business) { return business.id === key || business.name === item.name; })) {
              businesses.push({ id:key, name:item.name || key, email:item.email || "", phone:item.phone || "", status:item.status || "Opened", source:"My Businesses", details:item });
            }
          });
          const businessName = localStorage.getItem("emyBusinessDisplayName") || localStorage.getItem("emyBusinessName") || profile.businessName || "";
          if (businessName && !businesses.some(function (item) { return item.name === businessName; })) {
            businesses.push({ id:"active-business", name:businessName, email:profile.email || "", phone:profile.phone || "", status:localStorage.getItem("emyBusinessReviewStatus") || "Pending", source:"Active profile", details:profile });
          }
          return businesses;
        }
        function collectProducts() {
          const keys = ["emyBusinessProducts", "emyBusinessProductList", "emyBusinessProductPosts", "emyBusinessProductReels", "emyBusinessPosts", "emyBusinessReels"];
          const items = [];
          keys.forEach(function (key) {
            asArray(readJson(key, [])).forEach(function (item, index) {
              items.push(Object.assign({ id:key + "-" + index, source:key, title:item.title || item.name || item.productName || "Saved item" }, item));
            });
          });
          return items;
        }
        function collectMessages(storage, applications) {
          const messages = [];
          storage.forEach(function (entry) {
            if (entry.key.indexOf("emyBusinessChatThread:") === 0 || entry.key.indexOf("emyBusinessNotifications:") === 0 || entry.key === "emyCustomerNotifications") {
              messages.push({ key:entry.key, type:entry.key.indexOf("Notifications") >= 0 ? "Notification" : "Chat", value:entry.value });
            }
          });
          applications.forEach(function (item) {
            messages.push({ key:item.id || "job-application", type:"Job application", value:JSON.stringify(item) });
          });
          return messages;
        }
        function matches(item) {
          const q = (searchInput.value || "").toLowerCase().trim();
          const status = statusFilter.value || "";
          const text = JSON.stringify(item || {}).toLowerCase();
          const statusText = String(item.status || item.role || item.type || "").toLowerCase();
          return (!q || text.indexOf(q) >= 0) && (!status || statusText === status.toLowerCase());
        }
        function card(item, actions) {
          const status = item.status || item.role || item.type || item.source || "Saved";
          const statusClass = /approved|customer|opened|online/i.test(status) ? "green" : /reject|error/i.test(status) ? "red" : "orange";
          return '<article class="row-card"><h3>' + esc(item.name || item.title || item.jobTitle || item.key || item.id || "Saved record") + '</h3><p>' + esc(item.email || item.phone || item.desc || item.description || item.text || item.source || "No extra detail saved yet.") + '</p><div class="row-meta"><span class="tag ' + statusClass + '">' + esc(status) + '</span>' + (item.phone ? '<span class="tag">' + esc(item.phone) + '</span>' : '') + (item.price ? '<span class="tag orange">' + esc(item.price) + '</span>' : '') + '</div>' + (actions || "") + '</article>';
        }
        function panel(title, subtitle, body) {
          return '<div class="panel"><div class="panel-head"><span><h2>' + esc(title) + '</h2><p>' + esc(subtitle || "") + '</p></span></div><div class="panel-body">' + body + '</div></div>';
        }
        function grid(items, empty, actionBuilder) {
          const filtered = items.filter(matches);
          if (!filtered.length) return '<div class="empty">' + esc(empty) + '</div>';
          return '<div class="grid">' + filtered.map(function (item) { return card(item, actionBuilder ? actionBuilder(item) : ""); }).join("") + '</div>';
        }
        function table(items, empty) {
          const filtered = items.filter(matches);
          if (!filtered.length) return '<div class="empty">' + esc(empty) + '</div>';
          return '<table class="table"><thead><tr><th>Name / key</th><th>Type</th><th>Saved value</th></tr></thead><tbody>' + filtered.map(function (item) {
            return '<tr><td>' + esc(item.name || item.title || item.key || item.id) + '</td><td>' + esc(item.type || item.source || item.status || "") + '</td><td>' + esc(short(item.value || item.desc || item.description || JSON.stringify(item), 240)) + '</td></tr>';
          }).join("") + '</tbody></table>';
        }
        function counts() {
          return {
            overview: state.storage.length,
            approvals: state.approvals.length,
            people: state.customers.length,
            businesses: state.businesses.length,
            content: state.products.length + state.jobs.length + state.events.length + state.saved.length,
            messages: state.messages.length,
            ai: state.aiChats.length,
            data: state.storage.length,
          };
        }
        function renderCounts() {
          const c = counts();
          Object.keys(c).forEach(function (key) {
            const node = document.querySelector('[data-count="' + key + '"]');
            if (node) node.textContent = c[key];
          });
        }
        function renderOverview() {
          const c = counts();
          return '<div class="cards">' +
            '<div class="metric"><small>Customers</small><strong>' + c.people + '</strong><span>Saved people and account details</span></div>' +
            '<div class="metric"><small>Businesses</small><strong>' + c.businesses + '</strong><span>Profiles and customer businesses</span></div>' +
            '<div class="metric"><small>Approvals</small><strong>' + c.approvals + '</strong><span>Business signups needing review</span></div>' +
            '<div class="metric"><small>Messages</small><strong>' + c.messages + '</strong><span>Chats, notifications, applications</span></div>' +
          '</div>' + panel("Admin activity", "Everything currently saved in this browser for EMY.", table(state.storage.slice(0, 12), "No EMY data saved yet."));
        }
        function renderApprovals() {
          return panel("Business approvals", "Approve or reject businesses that sign up or submit profile information.", grid(state.approvals, "No pending business signup or profile approval data yet.", function (item) {
            return '<div class="row-actions"><button class="approve" data-approve="' + esc(item.id) + '">' + actionIcon("approve") + 'Approve</button><button class="reject" data-reject="' + esc(item.id) + '">' + actionIcon("reject") + 'Reject</button><button data-view-json="' + esc(item.id) + '">' + actionIcon("view") + 'View saved info</button></div>';
          }));
        }
        function renderPeople() {
          return panel("Customers and people", "Emails, phone numbers, profile images, locations, and role data.", grid(state.customers, "No customer records saved yet."));
        }
        function renderBusinesses() {
          return panel("Businesses", "Business profiles, customer relationships, status, contact details, and saved fields.", grid(state.businesses, "No business records saved yet."));
        }
        function renderContent() {
          const items = []
            .concat(state.products.map(function (item) { return Object.assign({ type:"Product" }, item); }))
            .concat(state.jobs.map(function (item) { return Object.assign({ type:"Job", title:item.jobTitle || item.title, description:item.text || item.description }, item); }))
            .concat(state.events.map(function (item) { return Object.assign({ type:"Event", title:item.title || item.eventName, description:item.description || item.eventWhere }, item); }))
            .concat(state.saved.map(function (item) { return Object.assign({ type:"Saved" }, item); }));
          return panel("Products, posts, clips, jobs, events", "Content created in feeds and business pages.", grid(items, "No content saved yet."));
        }
        function renderMessages() {
          return panel("Messages and notifications", "Customer messages, business notifications, job applications, and saved communication records.", table(state.messages, "No messages or notifications saved yet."));
        }
        function renderAi() {
          return panel("Ask EMY AI access", "Configure the real local backend provider, then test the /api/ask-emy route.", '<div class="detail"><label>Provider<input class="input" data-ai-provider value="' + esc(state.aiSettings.provider || "OpenAI / OpenRouter / DeepSeek") + '" placeholder="OpenAI, OpenRouter, or DeepSeek" /></label><label>Model<input class="input" data-ai-model value="' + esc(state.aiSettings.model || "gpt-5.4") + '" /></label><label>Server API key<input class="input" data-ai-key type="password" placeholder="Paste OpenAI, OpenRouter, or DeepSeek key on this machine" /></label><label>Notes<textarea class="textarea" data-ai-notes>' + esc(state.aiSettings.notes || "The key is saved to ask-emy.env for this local server only.") + '</textarea></label><div class="row-actions"><button class="primary" data-action="save-ai">Save to backend</button><button data-action="ai-status">Check server status</button><button data-action="test-ai">Test Ask EMY</button></div><div class="ai-result" data-ai-result>Ask EMY chats saved: ' + state.aiChats.length + '</div></div>');
        }
        function renderData() {
          return panel("Data store", "Export, import, inspect, and preserve all EMY local backend records.", '<details class="raw-block"><summary>Raw JSON</summary><textarea class="textarea" data-data-json>' + esc(JSON.stringify(state.storage.reduce(function (acc, item) { acc[item.key] = item.value; return acc; }, {}), null, 2)) + '</textarea></details><div class="row-actions"><button class="primary" data-action="export">Download JSON</button><button data-action="import">Import JSON from box</button><button class="danger" data-action="clear-admin">Clear admin snapshots only</button></div>');
        }
        function render() {
          state = collectState();
          renderCounts();
          const renderers = { overview:renderOverview, approvals:renderApprovals, people:renderPeople, businesses:renderBusinesses, content:renderContent, messages:renderMessages, ai:renderAi, data:renderData };
          panels.forEach(function (panelNode) {
            const view = panelNode.dataset.viewPanel;
            panelNode.hidden = view !== activeView;
            if (view === activeView) panelNode.innerHTML = renderers[view]();
          });
        }
        function createLegacyReviewNotification(item, status) {
          const normalized = String(status || "").toLowerCase();
          const isApproved = normalized === "approved";
          const isRejected = normalized === "rejected";
          if (!isApproved && !isRejected) return null;
          const profile = readJson("emyBusinessProfileDraft", {});
          const businessName = item && (item.name || item.title) || profile.businessName || localStorage.getItem("emyBusinessDisplayName") || localStorage.getItem("emyBusinessName") || "Your business";
          const businessKey = slug(item && (item.key || item.id) || profile.businessKey || profile.key || businessName || "business");
          const createdAt = new Date().toISOString();
          const notification = {
            id:(isApproved ? "business-approved-" : "business-rejected-") + businessKey + "-" + Date.now(),
            type:isApproved ? "business-review-approved" : "business-review-rejected",
            group:"important",
            target:"customer",
            itemKind:"Business profile",
            action:isApproved ? "business-approved" : "business-rejected",
            businessKey:businessKey,
            businessName:businessName,
            title:isApproved ? "Your business has been approved. Welcome to EMY Business." : "Your business registration was not approved.",
            body:isApproved ? "Welcome to EMY Business. " + businessName + " is approved and can now publish products, posts, clips, jobs, and events." : "EMY reviewed " + businessName + " and needs changes before approval. Update the business details and submit again.",
            href:isApproved ? "emy-business-profile.html?view=customer&business=" + encodeURIComponent(businessKey) : "emy-business-profile.html?setup=1",
            initials:"EMY",
            ref:{ type:"Business profile", kind:"Business profile", businessKey:businessKey, title:businessName },
            read:false,
            unread:true,
            createdAt:createdAt
          };
          const stored = readJson("emyCustomerNotifications", []);
          const rows = Array.isArray(stored) ? stored.filter(function (row) {
            return !(row && row.type === notification.type && slug(row.businessKey || row.businessName) === businessKey);
          }) : [];
          rows.unshift(notification);
          writeJson("emyCustomerNotifications", rows.slice(0, 80));
          return notification;
        }
        function setApproval(id, status) {
          const now = new Date().toISOString();
          let reviewedItem = null;
          const approvals = collectState().approvals.map(function (item) {
            if (item.id !== id) return item;
            reviewedItem = Object.assign({}, item, { status:status, reviewedAt:now });
            return reviewedItem;
          });
          writeJson("emyAdminBusinessApprovals", approvals);
          localStorage.setItem("emyBusinessReviewStatus", status);
          if (status === "Approved") {
            localStorage.setItem("emyBusinessApprovedAt", now);
            localStorage.removeItem("emyBusinessRejectedAt");
          }
          if (status === "Rejected") {
            localStorage.setItem("emyBusinessRejectedAt", now);
            localStorage.removeItem("emyBusinessApprovedAt");
          }
          const notification = createLegacyReviewNotification(reviewedItem || { id:id }, status);
          if (notification && status === "Approved") localStorage.setItem("emyBusinessApprovalNotificationId", notification.id);
          if (notification && status === "Rejected") localStorage.setItem("emyBusinessRejectionNotificationId", notification.id);
          render();
        }
        function saveSnapshot() {
          const snapshots = readJson("emyAdminSnapshots", []);
          snapshots.unshift({ id:"snapshot-" + Date.now(), createdAt:new Date().toISOString(), data:allStorage() });
          writeJson("emyAdminSnapshots", snapshots.slice(0, 20));
          render();
        }
        function downloadJson() {
          const data = document.querySelector("[data-data-json]")?.value || "{}";
          const blob = new Blob([data], { type:"application/json" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "emy-admin-backend-data.json";
          link.click();
          URL.revokeObjectURL(url);
        }
        function importJson() {
          try {
            const parsed = JSON.parse(document.querySelector("[data-data-json]")?.value || "{}");
            Object.keys(parsed).forEach(function (key) { if (key.indexOf("emy") === 0) localStorage.setItem(key, String(parsed[key])); });
            render();
          } catch (error) {
            alert("The JSON could not be imported.");
          }
        }
        function adminAskEmyApiCandidates() {
          const urls = [];
          const add = (url) => { if (url && !urls.includes(url)) urls.push(url); };
          if (window.location.protocol === "http:" || window.location.protocol === "https:") {
            add(window.location.origin + "/api/ask-emy");
            add("/api/ask-emy");
          }
          add("http://127.0.0.1:8779/api/ask-emy");
          add("http://localhost:8779/api/ask-emy");
          add("http://127.0.0.1:8767/api/ask-emy");
          add("http://localhost:8767/api/ask-emy");
          return urls;
        }
        function adminApiCandidates(pathname) {
          return adminAskEmyApiCandidates().map((url) => url.replace(/\/api\/ask-emy$/, pathname));
        }
        async function checkAiStatus() {
          const target = document.querySelector("[data-ai-result]");
          if (target) target.textContent = "Checking Ask EMY server...";
          let lastError = "";
          for (const endpoint of adminApiCandidates("/api/ask-emy/status")) {
            try {
              const response = await fetch(endpoint, { method:"GET" });
              const json = await response.json();
              if (target) target.textContent = JSON.stringify(json, null, 2);
              return;
            } catch (error) {
              lastError = error && error.message ? error.message : "Ask EMY status is not reachable";
            }
          }
          if (target) target.textContent = "Ask EMY status is not reachable. Start serve-linked-pages.cjs. Last error: " + lastError;
        }
        async function saveAiSettings() {
          const target = document.querySelector("[data-ai-result]");
          const settings = {
            provider: document.querySelector("[data-ai-provider]")?.value || "OpenRouter",
            model: document.querySelector("[data-ai-model]")?.value || "gpt-5.4",
            apiKey: document.querySelector("[data-ai-key]")?.value || "",
            notes: document.querySelector("[data-ai-notes]")?.value || "",
          };
          writeJson("emyAdminAiSettings", { provider:settings.provider, model:settings.model, notes:settings.notes, savedAt:new Date().toISOString() });
          if (target) target.textContent = "Saving Ask EMY AI settings to the local backend...";
          let lastError = "";
          for (const endpoint of adminApiCandidates("/api/admin/ai-settings")) {
            try {
              const response = await fetch(endpoint, { method:"POST", headers:{ "Content-Type":"application/json" }, body:JSON.stringify(settings) });
              const json = await response.json();
              if (target) target.textContent = JSON.stringify(json, null, 2);
              return;
            } catch (error) {
              lastError = error && error.message ? error.message : "Could not save settings";
            }
          }
          if (target) target.textContent = "Saved the visible settings in this browser, but the backend was not reachable. Last error: " + lastError;
        }
        async function testAi() {
          const target = document.querySelector("[data-ai-result]");
          if (target) target.textContent = "Testing Ask EMY...";
          let lastError = "";
          const body = JSON.stringify({ query:"show nearby products, jobs, messages, and business approvals for admin", location:"Admin", radius:"all" });
          for (const endpoint of adminAskEmyApiCandidates()) {
            try {
              const response = await fetch(endpoint, { method:"POST", headers:{ "Content-Type":"application/json" }, body });
              const json = await response.json();
              if (target) target.textContent = JSON.stringify(json, null, 2);
              return;
            } catch (error) {
              lastError = error && error.message ? error.message : "Ask EMY backend is not reachable";
            }
          }
          try {
            const response = await fetch("/api/ask-emy", { method:"POST", headers:{ "Content-Type":"application/json" }, body:JSON.stringify({ query:"show nearby products, jobs, messages, and business approvals for admin", location:"Admin", radius:"all" }) });
            const json = await response.json();
            if (target) target.textContent = JSON.stringify(json, null, 2);
          } catch (error) {
            if (target) target.textContent = "Ask EMY backend is not reachable from this page. Start serve-linked-pages.cjs to test /api/ask-emy. Last error: " + lastError;
          }
        }
        document.addEventListener("click", function (event) {
          const button = event.target.closest("button, a");
          if (!button) return;
          if (button.dataset.view) {
            activeView = button.dataset.view;
            nav.querySelectorAll("button").forEach(function (node) { node.classList.toggle("is-active", node === button); });
            render();
            return;
          }
          if (button.dataset.approve) setApproval(button.dataset.approve, "Approved");
          if (button.dataset.reject) setApproval(button.dataset.reject, "Rejected");
          if (button.dataset.viewJson) {
            activeView = "data";
            nav.querySelectorAll("button").forEach(function (node) { node.classList.toggle("is-active", node.dataset.view === "data"); });
            render();
          }
          if (button.dataset.action === "refresh") render();
          if (button.dataset.action === "snapshot") saveSnapshot();
          if (button.dataset.action === "export") downloadJson();
          if (button.dataset.action === "import") importJson();
          if (button.dataset.action === "clear-admin") { localStorage.removeItem("emyAdminSnapshots"); render(); }
          if (button.dataset.action === "save-ai") {
            saveAiSettings();
          }
          if (button.dataset.action === "ai-status") checkAiStatus();
          if (button.dataset.action === "test-ai") testAi();
        });
        searchInput.addEventListener("input", render);
        statusFilter.addEventListener("change", render);
        render();
      })();
    </script>
  </body>
</html>`;
}

function emyAdminBackendPageTemplateV2() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>EMY Admin Backend</title>
    <style>
      :root {
        --navy:#001b47;
        --ink:#0f172a;
        --muted:#667085;
        --soft:#f6f8fb;
        --line:#dfe5ee;
        --orange:#ff6a00;
        --green:#039855;
        --red:#d92d20;
        --blue:#1570ef;
        --violet:#7a5af8;
        --bg:#f4f7fb;
      }
      * { box-sizing:border-box; }
      html, body { margin:0; min-height:100%; background:var(--bg); color:var(--ink); font-family:Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      button, input, select, textarea { font:inherit; }
      button { cursor:pointer; }
      .admin-shell { min-height:100vh; display:grid; grid-template-columns:276px minmax(0,1fr); }
      .side { position:sticky; top:0; height:100vh; overflow:auto; border-right:1px solid rgba(0,27,71,.08); background:linear-gradient(180deg,rgba(255,255,255,.96),rgba(249,251,255,.92)); box-shadow:12px 0 34px rgba(15,23,42,.04); }
      .brand { display:flex; align-items:center; gap:10px; min-height:64px; padding:14px 16px; border-bottom:1px solid var(--line); }
      .brand-mark { width:34px; height:34px; border-radius:10px; display:grid; place-items:center; background:var(--orange); color:#fff; font-size:14px; font-weight:900; box-shadow:0 10px 22px rgba(255,106,0,.22); }
      .brand strong { display:block; color:var(--navy); font-size:15px; line-height:1; font-weight:900; }
      .brand span { display:block; margin-top:3px; color:var(--muted); font-size:11px; line-height:1.2; font-weight:650; }
      .nav { display:grid; gap:6px; padding:14px 10px 22px; }
      .nav-section { display:grid; gap:4px; }
      .nav-section-title { display:flex; align-items:center; gap:7px; margin:12px 8px 4px; color:#8a94a8; font-size:10px; line-height:1; font-weight:900; letter-spacing:.12em; text-transform:uppercase; }
      .nav-section-title::before { content:""; width:5px; height:5px; border-radius:999px; background:var(--orange); opacity:.7; }
      .nav a { min-height:38px; border:1px solid transparent; border-radius:11px; background:transparent; color:#344054; display:grid; grid-template-columns:28px minmax(0,1fr) auto; align-items:center; gap:9px; padding:0 10px; text-align:left; font-size:12.5px; line-height:1; font-weight:760; text-decoration:none; }
      .nav a:hover { border-color:rgba(0,27,71,.08); background:rgba(255,255,255,.82); color:var(--navy); box-shadow:0 8px 18px rgba(15,23,42,.045); }
      .nav a.is-active { border-color:rgba(255,106,0,.34); background:linear-gradient(135deg,#fff7ed,#fff); color:var(--orange); box-shadow:0 12px 28px rgba(255,106,0,.12); }
      .nav i { width:28px; height:28px; border-radius:9px; display:grid; place-items:center; background:rgba(0,27,71,.05); color:inherit; font-size:10px; font-style:normal; font-weight:900; }
      .nav a.is-active i { background:var(--orange); color:#fff; }
      .nav small { min-width:22px; height:20px; border-radius:999px; display:grid; place-items:center; background:rgba(0,27,71,.06); color:inherit; font-size:9.5px; line-height:1; font-weight:900; }
      .nav a.is-active small { background:#fff4e8; color:#c14f00; }
      .main { min-width:0; display:grid; grid-template-rows:auto 1fr; }
      .topbar { position:sticky; top:0; z-index:9; display:grid; grid-template-columns:minmax(0,1fr) auto; gap:14px; align-items:center; min-height:64px; border-bottom:1px solid var(--line); background:rgba(255,255,255,.86); padding:10px 18px; backdrop-filter:blur(14px); }
      .crumb { display:flex; flex-wrap:wrap; align-items:center; gap:9px; min-width:0; }
      .crumb h1 { margin:0; color:var(--navy); font-size:20px; line-height:1.1; font-weight:900; letter-spacing:0; }
      .crumb span { color:var(--muted); font-size:12px; font-weight:650; }
      .top-actions { display:flex; flex-wrap:wrap; justify-content:flex-end; gap:8px; }
      .pill, .primary, .danger { min-height:34px; border-radius:999px; display:inline-flex; align-items:center; justify-content:center; gap:7px; padding:0 13px; font-size:12px; line-height:1; font-weight:820; text-decoration:none; }
      .pill { border:1px solid var(--line); background:#fff; color:var(--navy); }
      .primary { border:0; background:var(--orange); color:#fff; box-shadow:0 10px 20px rgba(255,106,0,.18); }
      .danger { border:1px solid rgba(217,45,32,.20); background:#fff1f0; color:var(--red); }
      .content { min-width:0; padding:16px 18px 34px; }
      .tools { display:grid; grid-template-columns:minmax(0,1fr) 160px 132px; gap:10px; margin-bottom:14px; }
      .input, .select, .textarea { width:100%; border:1px solid var(--line); border-radius:10px; background:#fff; color:var(--navy); outline:0; padding:10px 11px; font-size:12.5px; line-height:1.2; font-weight:650; box-shadow:inset 0 1px 0 rgba(255,255,255,.9); }
      .textarea { min-height:132px; resize:vertical; font-family:Consolas, "SFMono-Regular", monospace; line-height:1.45; }
      .notice { margin:0 0 14px; border:1px solid rgba(255,106,0,.18); border-radius:12px; background:#fff7ed; color:#7a3b00; padding:11px 13px; font-size:12.5px; line-height:1.45; font-weight:650; }
      .stats-grid { display:grid; grid-template-columns:repeat(6,minmax(0,1fr)); gap:10px; margin-bottom:14px; }
      .stat { min-height:88px; border:1px solid var(--line); border-radius:10px; background:#fff; padding:12px; box-shadow:0 10px 26px rgba(15,23,42,.04); }
      .stat-head { display:flex; align-items:center; justify-content:space-between; gap:10px; }
      .stat small { color:#667085; font-size:10px; text-transform:uppercase; letter-spacing:.06em; font-weight:900; }
      .stat i { width:28px; height:28px; border-radius:8px; display:grid; place-items:center; background:#eef6ff; color:var(--blue); font-style:normal; font-size:12px; font-weight:900; }
      .stat:nth-child(2) i { background:#ecfdf3; color:var(--green); }
      .stat:nth-child(3) i { background:#fff4e8; color:var(--orange); }
      .stat:nth-child(4) i { background:#f4f3ff; color:var(--violet); }
      .stat strong { display:block; margin-top:9px; color:var(--navy); font-size:24px; line-height:1; font-weight:900; }
      .stat span { display:block; margin-top:6px; color:#7b8498; font-size:11px; line-height:1.25; font-weight:650; }
      .dashboard-grid { display:grid; grid-template-columns:2fr 1fr; gap:14px; margin-bottom:14px; }
      .panel { border:1px solid var(--line); border-radius:10px; background:#fff; box-shadow:0 12px 28px rgba(15,23,42,.045); overflow:hidden; }
      .panel-head { min-height:44px; display:flex; align-items:center; justify-content:space-between; gap:10px; border-bottom:1px solid var(--line); background:#fbfcff; padding:10px 12px; }
      .panel-head h2 { margin:0; color:var(--navy); font-size:13px; line-height:1.15; font-weight:900; }
      .panel-head p { margin:3px 0 0; color:#667085; font-size:11px; line-height:1.25; font-weight:650; }
      .panel-body { padding:12px; }
      .chart-wrap { height:232px; position:relative; }
      .chart-wrap svg { width:100%; height:100%; display:block; }
      .mini-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
      .mini-card { border:1px solid var(--line); border-radius:10px; background:#fff; padding:12px; }
      .donut { width:148px; height:148px; margin:4px auto; border-radius:999px; background:conic-gradient(var(--orange) 0 44%, var(--blue) 44% 71%, var(--green) 71% 88%, #e5e7eb 88% 100%); display:grid; place-items:center; }
      .donut::before { content:""; width:88px; height:88px; border-radius:999px; background:#fff; box-shadow:inset 0 0 0 1px var(--line); }
      .legend { display:grid; gap:7px; margin-top:12px; }
      .legend span { display:flex; align-items:center; justify-content:space-between; gap:8px; color:#667085; font-size:11px; font-weight:720; }
      .legend b { color:var(--navy); font-weight:900; }
      .dot { width:9px; height:9px; border-radius:999px; display:inline-block; margin-right:7px; background:var(--orange); }
      .bars { display:grid; gap:9px; }
      .bar-row { display:grid; grid-template-columns:84px minmax(0,1fr) 32px; align-items:center; gap:8px; color:#667085; font-size:11px; font-weight:720; }
      .bar { height:9px; border-radius:999px; background:#eef2f7; overflow:hidden; }
      .bar span { display:block; height:100%; border-radius:inherit; background:linear-gradient(90deg,var(--orange),#ff9f43); }
      .table-panel { margin-top:14px; }
      .table-scroll { overflow:auto; }
      table { width:100%; border-collapse:collapse; min-width:860px; }
      th, td { border-bottom:1px solid var(--line); padding:10px 9px; text-align:left; vertical-align:middle; color:#344054; font-size:12px; line-height:1.3; font-weight:640; }
      th { background:#f8fafc; color:#667085; font-size:10px; letter-spacing:.06em; text-transform:uppercase; font-weight:900; }
      tr:hover td { background:#fffaf5; }
      .avatar { width:34px; height:34px; border-radius:9px; display:grid; place-items:center; overflow:hidden; background:linear-gradient(135deg,#dbe4ee,#fff); color:var(--navy); font-size:12px; font-weight:900; box-shadow:inset 0 0 0 1px rgba(255,255,255,.8), 0 6px 14px rgba(15,23,42,.08); }
      .avatar img { width:100%; height:100%; object-fit:cover; display:block; }
      .status { min-height:23px; display:inline-flex; align-items:center; justify-content:center; border-radius:999px; background:#eef4ff; color:#175cd3; padding:0 9px; font-size:10px; line-height:1; font-weight:900; }
      .status.active, .status.approved, .status.opened, .status.online { background:#ecfdf3; color:#027a48; }
      .status.pending, .status.verify, .status.draft { background:#fff4e8; color:#c14f00; }
      .status.rejected, .status.reported { background:#fff1f0; color:#b42318; }
      .row-actions { display:flex; flex-wrap:wrap; gap:6px; }
      .row-actions button { min-height:28px; border:1px solid var(--line); border-radius:999px; background:#fff; color:var(--navy); display:inline-flex; align-items:center; justify-content:center; gap:5px; padding:0 10px; font-size:10.5px; font-weight:850; }
      .row-actions button svg { width:13px; height:13px; fill:none; stroke:currentColor; stroke-width:2; stroke-linecap:round; stroke-linejoin:round; }
      .row-actions button:hover { border-color:rgba(255,106,0,.30); color:var(--orange); }
      .module-grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:12px; margin-bottom:14px; }
      .module-card { min-height:206px; border:1px solid rgba(0,27,71,.09); border-radius:14px; background:rgba(255,255,255,.86); padding:12px; box-shadow:0 12px 26px rgba(15,23,42,.045), inset 0 1px 0 rgba(255,255,255,.9); display:grid; grid-template-rows:auto 1fr auto; gap:10px; }
      .module-card:hover { border-color:rgba(255,106,0,.22); box-shadow:0 18px 36px rgba(15,23,42,.07), inset 0 1px 0 rgba(255,255,255,.9); }
      .module-top { display:grid; grid-template-columns:52px minmax(0,1fr) auto; align-items:center; gap:10px; }
      .module-icon { width:52px; height:52px; border-radius:14px; display:grid; place-items:center; color:var(--navy); font-size:13px; font-weight:900; background:linear-gradient(145deg,#fff,#edf3f8); box-shadow:inset 0 1px 0 rgba(255,255,255,.95), 0 10px 22px rgba(0,27,71,.07); }
      .module-card[data-tone="orange"] .module-icon { color:#c14f00; background:linear-gradient(145deg,#fff7ed,#ffe6cc); }
      .module-card[data-tone="green"] .module-icon { color:#027a48; background:linear-gradient(145deg,#f2fff8,#d8f7e5); }
      .module-card[data-tone="blue"] .module-icon { color:#175cd3; background:linear-gradient(145deg,#f3f8ff,#dcecff); }
      .module-card[data-tone="violet"] .module-icon { color:#5b3cc4; background:linear-gradient(145deg,#f7f5ff,#e8e2ff); }
      .module-card[data-tone="red"] .module-icon { color:#b42318; background:linear-gradient(145deg,#fff7f6,#ffe0dd); }
      .module-copy { min-width:0; }
      .module-copy h3 { margin:0; color:var(--navy); font-size:14px; line-height:1.15; font-weight:900; }
      .module-copy p { margin:5px 0 0; color:#667085; font-size:11.5px; line-height:1.35; font-weight:640; }
      .module-count { min-width:34px; height:34px; border-radius:12px; display:grid; place-items:center; background:#fff4e8; color:var(--orange); font-size:18px; line-height:1; font-weight:900; }
      .module-info { display:grid; gap:7px; color:#536079; font-size:11.5px; line-height:1.35; font-weight:650; }
      .module-info span { display:flex; align-items:center; gap:7px; }
      .module-info span::before { content:""; width:6px; height:6px; border-radius:999px; background:var(--orange); opacity:.72; }
      .module-actions { display:grid; grid-template-columns:1fr 1fr; gap:7px; margin-top:2px; }
      .module-actions a { min-height:32px; border-radius:999px; border:1px solid var(--line); background:#fff; color:var(--navy); display:inline-flex; align-items:center; justify-content:center; padding:0 10px; font-size:11px; line-height:1; font-weight:850; text-decoration:none; }
      .module-actions a:first-child { border-color:rgba(255,106,0,.24); background:#fff7ed; color:#c14f00; }
      .module-actions a:hover { border-color:rgba(255,106,0,.38); color:var(--orange); box-shadow:0 10px 20px rgba(255,106,0,.08); }
      .module-actions.is-single { grid-template-columns:1fr; }
      .admin-intro { border:1px solid rgba(0,27,71,.08); border-radius:14px; background:linear-gradient(145deg,#fff,#f8fbff); padding:14px; margin-bottom:14px; box-shadow:0 12px 28px rgba(15,23,42,.045); }
      .admin-intro-top { display:flex; align-items:flex-start; justify-content:space-between; gap:14px; }
      .admin-intro h2 { margin:0; color:var(--navy); font-size:18px; line-height:1.15; font-weight:900; }
      .admin-intro p { margin:6px 0 0; color:#5f6b83; font-size:12.5px; line-height:1.45; font-weight:650; }
      .admin-intro-actions { display:flex; flex-wrap:wrap; gap:8px; justify-content:flex-end; }
      .admin-intro-actions a, .admin-intro-actions button { min-height:32px; border-radius:999px; border:1px solid var(--line); background:#fff; color:var(--navy); padding:0 12px; font-size:11px; line-height:1; font-weight:850; text-decoration:none; }
      .admin-intro-actions a:first-child { border-color:rgba(255,106,0,.22); background:#fff7ed; color:#c14f00; }
      .admin-intro-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:10px; margin-top:12px; }
      .admin-intro-card { border:1px solid rgba(0,27,71,.07); border-radius:12px; background:rgba(255,255,255,.76); padding:10px; }
      .admin-intro-card small { display:block; color:#667085; font-size:10px; line-height:1; font-weight:900; letter-spacing:.06em; text-transform:uppercase; }
      .admin-intro-card strong { display:block; margin-top:6px; color:var(--navy); font-size:13px; line-height:1.25; font-weight:900; }
      .admin-modal { position:fixed; inset:0; z-index:90; display:grid; place-items:center; background:rgba(0,27,71,.32); padding:18px; backdrop-filter:blur(10px); }
      .admin-modal-panel { width:min(100%,720px); max-height:min(86vh,720px); overflow:auto; border:1px solid rgba(255,255,255,.72); border-radius:18px; background:#fff; box-shadow:0 28px 80px rgba(0,27,71,.28); }
      .admin-modal-head { display:flex; align-items:center; justify-content:space-between; gap:12px; border-bottom:1px solid var(--line); padding:14px 16px; }
      .admin-modal-head h2 { margin:0; color:var(--navy); font-size:18px; line-height:1.15; font-weight:900; }
      .admin-modal-head button { width:34px; height:34px; border:1px solid var(--line); border-radius:999px; background:#fff; color:var(--navy); font-size:18px; line-height:1; }
      .admin-modal-body { display:grid; gap:12px; padding:14px 16px 16px; }
      .admin-detail-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:9px; }
      .admin-detail-item { border:1px solid var(--line); border-radius:12px; background:#f8fafc; padding:10px; color:#344054; font-size:12px; line-height:1.35; font-weight:700; overflow-wrap:anywhere; }
      .admin-detail-item b { display:block; margin-bottom:4px; color:#667085; font-size:10px; line-height:1; font-weight:900; text-transform:uppercase; letter-spacing:.06em; }
      .admin-toast { position:fixed; right:18px; bottom:18px; z-index:110; max-width:360px; border:1px solid rgba(255,106,0,.22); border-radius:14px; background:#fff7ed; color:#7a3b00; padding:12px 14px; box-shadow:0 18px 38px rgba(0,27,71,.16); font-size:12px; line-height:1.4; font-weight:760; }
      .shortcut-grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:12px; margin:0 0 14px; }
      .shortcut-card { min-height:112px; border:1px solid var(--line); border-radius:12px; background:#fff; color:var(--navy); display:grid; grid-template-columns:72px minmax(0,1fr); align-items:center; gap:12px; padding:13px; text-decoration:none; box-shadow:0 12px 28px rgba(15,23,42,.045); }
      .shortcut-card:hover { transform:translateY(-1px); border-color:rgba(255,106,0,.28); box-shadow:0 18px 34px rgba(15,23,42,.07); }
      .shortcut-art { width:72px; height:72px; border-radius:14px; background:radial-gradient(circle at 35% 40%, rgba(255,255,255,.86) 0 18px, transparent 19px), radial-gradient(circle at 68% 32%, rgba(255,106,0,.72) 0 10px, transparent 11px), linear-gradient(135deg,#dce5ef,#f7ede3); box-shadow:inset 0 1px 0 rgba(255,255,255,.9), 0 10px 24px rgba(0,27,71,.08); }
      .shortcut-copy { display:block; min-width:0; }
      .shortcut-copy strong { display:block; font-size:14px; line-height:1.15; font-weight:900; }
      .shortcut-copy span { display:block; margin-top:6px; color:#667085; font-size:12px; line-height:1.35; font-weight:650; }
      .empty { padding:30px; text-align:center; color:#7b8498; font-size:13px; font-weight:650; }
      .ai-result { white-space:pre-wrap; border:1px solid var(--line); border-radius:10px; background:#f8fafc; color:#344054; padding:12px; font-size:12px; line-height:1.45; font-weight:650; }
      [hidden] { display:none !important; }
      @media (max-width:980px) { .stats-grid { grid-template-columns:repeat(3,minmax(0,1fr)); } .dashboard-grid { grid-template-columns:1fr; } .module-grid, .shortcut-grid { grid-template-columns:repeat(2,minmax(0,1fr)); } }
      @media (max-width:720px) { .admin-shell { display:block; } .side { position:relative; height:auto; } .nav { grid-template-columns:1fr; } .nav b, .nav small, .brand strong, .nav-section-title { display:flex; } .topbar, .tools { grid-template-columns:1fr; } .stats-grid, .mini-grid, .module-grid, .shortcut-grid { grid-template-columns:1fr; } }
    </style>
  </head>
  <body>
    <div class="admin-shell">
      <aside class="side">
        <div class="brand"><span class="brand-mark">M</span><span><strong>EMY Admin</strong><span>Backoffice control</span></span></div>
        <nav class="nav" data-admin-nav></nav>
      </aside>
      <main class="main">
        <header class="topbar">
          <div class="crumb"><h1 data-page-title>Dashboard</h1><span data-page-subtitle>Manage the whole EMY website from one backend view.</span></div>
          <div class="top-actions">
            <a class="pill" href="emy-customer-home.html">Customer app</a>
            <a class="pill" href="emy-customer-home.html#feeds">Feeds</a>
            <a class="pill" href="emy-customer-home.html#reels">Clips</a>
            <a class="pill" href="emy-business-profile.html">Business profile</a>
            <button class="primary" type="button" data-action="snapshot">Save snapshot</button>
          </div>
        </header>
        <section class="content">
          <p class="notice">This backend is the control page for EMY. Use the left menu to manage people, businesses, content, services, support, Ask EMY AI, and saved data. Shortcut cards open the real customer or business pages so you can check what users see.</p>
          <div class="tools">
            <input class="input" data-search placeholder="Search name, email, phone, product, business, category, report..." />
            <select class="select" data-status-filter><option value="">All statuses</option><option>active</option><option>pending</option><option>approved</option><option>verify</option><option>reported</option><option>draft</option></select>
            <button class="pill" type="button" data-action="refresh">Refresh</button>
          </div>
          <section data-view-root></section>
        </section>
      </main>
    </div>
    <div class="admin-modal" data-admin-modal hidden>
      <section class="admin-modal-panel" role="dialog" aria-modal="true" aria-labelledby="admin-modal-title">
        <header class="admin-modal-head">
          <h2 id="admin-modal-title" data-admin-modal-title>Record details</h2>
          <button type="button" data-admin-modal-close aria-label="Close details">x</button>
        </header>
        <div class="admin-modal-body" data-admin-modal-body></div>
      </section>
    </div>
    <div class="admin-toast" data-admin-toast hidden></div>
    <script>
      (function () {
        const modules = [
          ["dashboard","Dashboard","D","Start","emy-admin-backend.html","Stats, charts, today activity, and the main shortcuts."],
          ["customers","Customers","CU","People","emy-customer-profile.html","Customer accounts, emails, phone numbers, images, and status."],
          ["business","Businesses","B","People","emy-business-profile.html","Business profiles, signup approval, verification, and contact records."],
          ["partner","Partners","P","People","emy-admin-backend.html","Partners, partner status, and partner contact details."],
          ["product","Products","PR","Content","emy-customer-search.html#products","Products, prices, categories, images, and owner businesses."],
          ["post","Posts","PO","Content","emy-customer-home.html#feeds","Posts, offers, questions, photos, and feed content."],
          ["reel","Clips","CL","Content","emy-customer-home.html#reels","Business clips and product clips shown inside EMY."],
          ["jobs","Jobs","JO","Content","emy-customer-home.html#feeds","Job posts, applications, CV links, and hiring notifications."],
          ["events","Events","EV","Content","emy-customer-home.html#feeds","Events created by businesses for customers."],
          ["banner","Banners","BA","Content","emy-customer-home.html","Home and promotional banners."],
          ["servicesBanner","Service banners","SB","Content","emy-customer-home.html","Service promotion banners shown on EMY."],
          ["businessPosition","Business positions","BP","Setup","emy-admin-backend.html","Business role and position labels used by profiles."],
          ["businessCategory","Business categories","BC","Setup","emy-customer-search.html#business","Business categories used for search and filters."],
          ["businessSector","Business sectors","BS","Setup","emy-customer-search.html#business","Business sectors such as food, beauty, retail, and services."],
          ["productCategory","Product categories","PC","Setup","emy-customer-search.html#products","Product categories used for customer search."],
          ["productSubCategory","Product subcategories","PS","Setup","emy-customer-search.html#products","Smaller product groups used under each category."],
          ["findUs","Find us","FU","Services","contact.html","Public location, contact, and find-us information."],
          ["services","Services","S","Services","emy-customer-search.html","Services available through EMY."],
          ["serviceBusiness","Business services","BS","Services","emy-business-profile.html","Services attached to business profiles."],
          ["partnerService","Partner services","PS","Services","emy-admin-backend.html","Services offered through partners."],
          ["contactUs","Contact Us","C","Support","contact.html","Messages from customers and businesses."],
          ["report","Reports","RE","Support","emy-admin-backend.html","Reported posts, products, businesses, and account issues."],
          ["notification","Notifications","N","Support","emy-notification-settings.html","System, customer, business, and Ask EMY notifications."],
          ["faq","FAQ","F","Support","faqs.html","Questions and answers shown to customers."],
          ["cms","CMS pages","CM","Support","index.html","Website pages such as home, about, terms, and privacy."],
          ["ai","Ask EMY AI","AI","System","ask-emy.html","AI provider settings, tests, and Ask EMY backend status."],
          ["data","Data store","DS","System","emy-admin-backend.html","Saved browser data, snapshots, exports, and backend inspection."]
        ];
        const navGroups = ["Start","People","Content","Setup","Services","Support","System"];
        const root = document.querySelector("[data-view-root]");
        const nav = document.querySelector("[data-admin-nav]");
        const pageTitle = document.querySelector("[data-page-title]");
        const pageSubtitle = document.querySelector("[data-page-subtitle]");
        const searchInput = document.querySelector("[data-search]");
        const statusFilter = document.querySelector("[data-status-filter]");
        const adminModal = document.querySelector("[data-admin-modal]");
        const adminModalTitle = document.querySelector("[data-admin-modal-title]");
        const adminModalBody = document.querySelector("[data-admin-modal-body]");
        const adminToast = document.querySelector("[data-admin-toast]");
        let activeView = initialAdminView();
        let state = {};

        function esc(value) {
          return String(value == null ? "" : value).replace(/[&<>"']/g, function (char) {
            return { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[char];
          });
        }
        function readJson(key, fallback) {
          try {
            const raw = localStorage.getItem(key);
            if (!raw) return fallback;
            const parsed = JSON.parse(raw);
            return parsed == null ? fallback : parsed;
          } catch (error) {
            return fallback;
          }
        }
        function writeJson(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
        function asArray(value) {
          if (Array.isArray(value)) return value;
          if (value && typeof value === "object") return Object.keys(value).map(function (key) { return Object.assign({ id:key }, value[key]); });
          return [];
        }
        function adminCustomerMediaSet() {
          return new Set([
            localStorage.getItem("emyCustomerProfilePhoto"),
            localStorage.getItem("emyCustomerProfilePhotoSrc"),
            localStorage.getItem("emyCustomerProfilePhotoRef"),
            localStorage.getItem("emyMainPendingSignupPhoto"),
            localStorage.getItem("emyMainPendingSignupPhotoSrc"),
            localStorage.getItem("emyMainPendingSignupPhotoRef")
          ].map(function (value) { return String(value || "").trim(); }).filter(Boolean));
        }
        function adminBusinessOnlyMedia(values) {
          const customerMedia = adminCustomerMediaSet();
          return (Array.isArray(values) ? values : []).map(function (value) { return String(value || "").trim(); }).find(function (value) { return value && !customerMedia.has(value); }) || "";
        }
        function allStorage() {
          const rows = [];
          for (let index = 0; index < localStorage.length; index += 1) {
            const key = localStorage.key(index);
            if (key && key.indexOf("emy") === 0) rows.push({ key:key, value:localStorage.getItem(key) || "" });
          }
          return rows.sort(function (a, b) { return a.key.localeCompare(b.key); });
        }
        function todayText(offset) {
          const date = new Date(Date.now() - (Number(offset) || 0) * 86400000);
          return date.toLocaleDateString("en-GB");
        }
        function initials(value) {
          return String(value || "E").split(/\s+/).filter(Boolean).slice(0, 2).map(function (part) { return part.charAt(0).toUpperCase(); }).join("") || "E";
        }
        function avatarHtml(row) {
          const image = row.image || row.photo || row.profile || row.avatar || "";
          return '<span class="avatar">' + (image ? '<img src="' + esc(image) + '" alt="" />' : esc(initials(row.name || row.businessName || row.title || row.email))) + '</span>';
        }
        function statusHtml(value) {
          const text = String(value || "active").toLowerCase();
          return '<span class="status ' + esc(text.replace(/[^a-z0-9]+/g, "-")) + '">' + esc(value || "active") + '</span>';
        }
        function moduleById(id) {
          return modules.find(function (mod) { return mod[0] === id; }) || modules[0];
        }
        function moduleLabel(id) {
          return moduleById(id)[1] || "Module";
        }
        function moduleHref(id) {
          return moduleById(id)[4] || "emy-admin-backend.html";
        }
        function moduleDescription(id) {
          return moduleById(id)[5] || ("Manage " + moduleLabel(id).toLowerCase() + ".");
        }
        function moduleActionLabel(id) {
          if (id === "ai") return "Open Ask EMY";
          if (id === "data") return "Inspect data";
          if (id === "business") return "Open business page";
          if (id === "product") return "Open products";
          if (id === "post" || id === "jobs" || id === "events") return "Open feeds";
          if (id === "reel") return "Open clips";
          return "Open page";
        }
        function isAdminView(id) {
          return modules.some(function (mod) { return mod[0] === id; });
        }
        function initialAdminView() {
          const hash = decodeURIComponent(String(window.location.hash || "").replace(/^#/, "")).trim();
          return isAdminView(hash) ? hash : "dashboard";
        }
        function adminModuleHref(id) {
          return "emy-admin-backend.html#" + encodeURIComponent(id);
        }
        function moduleTone(id) {
          if (["business","product","post","reel","jobs","events","ai"].indexOf(id) >= 0) return "orange";
          if (["customers","partner","notification"].indexOf(id) >= 0) return "blue";
          if (["contactUs","services","serviceBusiness","partnerService"].indexOf(id) >= 0) return "green";
          if (["report"].indexOf(id) >= 0) return "red";
          if (["data","cms","faq"].indexOf(id) >= 0) return "violet";
          return "default";
        }
        function moduleInfoLines(id, count) {
          if (id === "customers") return ["View customer emails, phones, photos, and status.", "Open records saved from sign up and profiles."];
          if (id === "business") return ["Approve, verify, and review business profiles.", "Open the business profile page to check the public flow."];
          if (id === "product") return ["Manage prices, categories, product images, and owners.", "Open products exactly where customers browse them."];
          if (id === "post") return ["Review feed posts, offers, images, and text updates.", "Open Feeds to see the public card design."];
          if (id === "reel") return ["Manage business clips and product clips.", "Open the Clips page to check playback cards."];
          if (id === "jobs") return ["Track job posts and applications.", "Open Feeds to check the job card and apply flow."];
          if (id === "events") return ["Track event cards and event links.", "Open Feeds to check the event post design."];
          if (id === "notification") return ["Review likes, applications, reports, and system messages.", "Open notification settings for the customer view."];
          if (id === "ai") return ["Save AI provider keys on this computer.", "Test Ask EMY through the backend endpoint."];
          if (id === "data") return ["Inspect local browser data and export snapshots.", "Use this when something must be debugged."];
          return ["Manage " + moduleLabel(id).toLowerCase() + " records.", "Records in this section: " + count + "."];
        }
        function showToast(message) {
          if (!adminToast) return;
          adminToast.textContent = message;
          adminToast.hidden = false;
          window.clearTimeout(showToast.timer);
          showToast.timer = window.setTimeout(function () { adminToast.hidden = true; }, 2600);
        }
        function seedData() {
          return {
            customers:[
              { id:"c1", name:"shivani patel", firstName:"shivani", lastName:"patel", email:"shivani13@gmail.com", phone:"+44 7700 100001", created:todayText(0), status:"active" },
              { id:"c2", name:"rehila patel", firstName:"rehila", lastName:"patel", email:"rehila@yahoo.com", phone:"+44 7700 100002", created:todayText(0), status:"active" },
              { id:"c3", name:"Stephane Isaac", firstName:"Stephane", lastName:"Isaac", email:"stephaneelkrak@hotmail.com", phone:"+44 7700 100003", created:todayText(1), status:"active" },
              { id:"c4", name:"ethy patel", firstName:"ethy", lastName:"patel", email:"ethy@gmail.com", phone:"+44 7700 100004", created:todayText(2), status:"active" }
            ],
            businesses:[
              { id:"b1", name:"Stephane", email:"stephane@gmail.com", phone:"+44 7700 200001", created:todayText(0), status:"active", verify:"verify", sector:"Retail" },
              { id:"b2", name:"Angi Pizza Zone", email:"angi@pizza.com", phone:"+44 7700 200002", created:todayText(1), status:"active", verify:"verified", sector:"Food" },
              { id:"b3", name:"Ever Glow Face Wash", email:"everglow@gmail.com", phone:"+44 7700 200003", created:todayText(2), status:"active", verify:"verified", sector:"Beauty" },
              { id:"b4", name:"business 111", email:"business111@gmail.com", phone:"+44 7700 200004", created:todayText(3), status:"pending", verify:"verify", sector:"Retail" }
            ],
            partners:[
              { id:"p1", name:"Vaibhav Rathod", email:"vaibhav@gmail.com", phone:"+44 7700 300001", created:todayText(1), status:"active" },
              { id:"p2", name:"esha patel", email:"esha@gmail.com", phone:"+44 7700 300002", created:todayText(2), status:"active" },
              { id:"p3", name:"nirav shah", email:"nirav@gmail.com", phone:"+44 7700 300003", created:todayText(3), status:"active" }
            ],
            products:[
              { id:"pr1", name:"Face Wash", business:"Ever Glow Face Wash", category:"Beauty", subCategory:"Skincare", price:"GBP 18.00", status:"active", created:todayText(0) },
              { id:"pr2", name:"Steel Water Bottle", business:"business 111", category:"Retail", subCategory:"Bottle", price:"GBP 200.00", status:"active", created:todayText(1) },
              { id:"pr3", name:"Pizza Slice", business:"Angi Pizza Zone", category:"Food", subCategory:"Pizza", price:"GBP 250.00", status:"active", created:todayText(1) }
            ],
            posts:[
              { id:"po1", name:"Lunch deal", business:"Angi Pizza Zone", type:"Offer", status:"active", created:todayText(0) },
              { id:"po2", name:"New stock ready", business:"business 111", type:"Post", status:"active", created:todayText(1) },
              { id:"po3", name:"Simple skincare routine", business:"Ever Glow Face Wash", type:"Post", status:"active", created:todayText(2) }
            ],
            reels:[
              { id:"r1", name:"Good day", business:"business 111", views:42, likes:1, status:"active", created:todayText(0) },
              { id:"r2", name:"Pizza Slice", business:"Angi Pizza Zone", views:31, likes:4, status:"active", created:todayText(1) }
            ],
            contacts:[
              { id:"ct1", name:"Isaac Stephane", email:"i.stephane@my-emy.com", subject:"Testing Ask EMY", status:"new", created:todayText(0) }
            ],
            reports:[
              { id:"rp1", name:"Post report", business:"Stephane", reason:"Spam or incorrect listing", status:"reported", created:todayText(0) }
            ],
            notifications:[
              { id:"n1", name:"Business approval", message:"A business is waiting for verification.", status:"pending", created:todayText(0) },
              { id:"n2", name:"Job application", message:"A customer applied with a CV/profile link.", status:"active", created:todayText(0) }
            ]
          };
        }
        function collectState() {
          const seed = seedData();
          const pendingEmail = localStorage.getItem("emyMainPendingSignupEmail") || "";
          const pendingRole = localStorage.getItem("emyMainPendingSignupRole") || "";
          const customerName = [localStorage.getItem("emyMainPendingSignupFirstName") || "", localStorage.getItem("emyMainPendingSignupLastName") || ""].filter(Boolean).join(" ");
          const businessProfile = readJson("emyBusinessProfileDraft", {});
          const activeBusinessName = localStorage.getItem("emyBusinessDisplayName") || localStorage.getItem("emyBusinessName") || businessProfile.businessName || "";
          const approvals = readJson("emyAdminBusinessApprovals", []);
          const createdJobs = asArray(readJson("emyFeedCreatedJobs", [])).map(function (item, index) {
            return {
              id:item.id || "job-" + index,
              name:item.jobTitle || item.title || "Help wanted",
              business:item.business || activeBusinessName || "Business",
              location:item.location || item.jobLocation || "Location to confirm",
              workplace:item.workplace || "On-site",
              employment:item.employment || "Flexible",
              apply:item.apply || "Message this business on EMY",
              notes:item.notes || item.pay || "",
              applicants:item.applicants || 0,
              created:item.created || item.createdAt || todayText(0),
              status:item.status || "active"
            };
          });
          const createdEvents = asArray(readJson("emyFeedCreatedEvents", [])).map(function (item, index) {
            return {
              id:item.id || "event-" + index,
              name:item.title || item.eventName || "Event",
              business:item.business || activeBusinessName || "Business",
              eventType:item.eventType || item.type || "Event",
              date:item.date || item.startDate || item.eventDate || "",
              time:item.time || item.startTime || item.eventTime || "",
              place:item.place || item.location || item.eventWhere || item.link || "",
              description:item.description || item.text || "",
              created:item.created || item.createdAt || todayText(0),
              status:item.status || "active"
            };
          });
          const applications = readJson("emyJobApplications", []);
          const savedProducts = ["emyBusinessProducts","emyBusinessProductList","emyBusinessProductPosts"].flatMap(function (key) {
            return asArray(readJson(key, [])).map(function (item, index) { return Object.assign({ id:key + "-" + index, source:key }, item); });
          });
          const customers = seed.customers.slice();
          if (pendingEmail || customerName) customers.unshift({ id:"current-customer", name:customerName || pendingEmail || "Current user", email:pendingEmail, phone:localStorage.getItem("emyMainPendingSignupPhone") || "", created:todayText(0), status:pendingRole === "business" ? "business" : "active", image:localStorage.getItem("emyCustomerProfilePhoto") || "" });
          const businesses = seed.businesses.slice();
          if (activeBusinessName) businesses.unshift({ id:"active-business", name:activeBusinessName, email:businessProfile.email || pendingEmail, phone:businessProfile.phone || localStorage.getItem("emyMainPendingSignupPhone") || "", created:todayText(0), status:localStorage.getItem("emyBusinessReviewStatus") || "pending", verify:localStorage.getItem("emyBusinessReviewStatus") || "verify", sector:businessProfile.sector || "Retail", image:adminBusinessOnlyMedia([localStorage.getItem("emyBusinessProfilePhoto"), localStorage.getItem("emyBusinessProfilePhotoSrc"), localStorage.getItem("emyMainPendingSignupBusinessPhoto"), businessProfile.photo, businessProfile.photoSrc, businessProfile.profilePhoto, businessProfile.profilePhotoSrc]) });
          approvals.forEach(function (item) {
            if (!businesses.some(function (business) { return business.id === item.id; })) businesses.push({ id:item.id, name:item.name, email:item.email, phone:item.phone, created:item.createdAt || todayText(0), status:item.status || "pending", verify:item.status || "verify" });
          });
          const products = seed.products.concat(savedProducts.map(function (item, index) {
            return { id:item.id || "saved-product-" + index, name:item.name || item.title || item.productName || "Saved product", business:item.business || item.businessName || "Business", category:item.category || "Product", subCategory:item.subCategory || item.tag || "General", price:item.price || item.priceText || "", status:item.status || "active", created:item.created || todayText(0) };
          }));
          const posts = seed.posts.concat(asArray(readJson("emyBusinessPosts", [])).map(function (item, index) {
            return { id:item.id || "saved-post-" + index, name:item.title || item.name || "Saved post", business:item.business || "Business", type:item.type || "Post", status:item.status || "active", created:item.created || todayText(0) };
          }));
          const reels = seed.reels.concat(asArray(readJson("emyBusinessReels", [])).map(function (item, index) {
            return { id:item.id || "saved-reel-" + index, name:item.title || item.name || "Saved clip", business:item.business || "Business", views:item.views || 0, likes:item.likes || 0, status:item.status || "active", created:item.created || todayText(0) };
          }));
          const notifications = seed.notifications.concat(asArray(readJson("emyCustomerNotifications", [])).map(function (item, index) {
            return { id:item.id || "saved-note-" + index, name:item.title || item.type || "Notification", message:item.body || item.message || item.text || "", status:item.status || "active", created:item.created || todayText(0) };
          }));
          return { storage:allStorage(), customers:customers, businesses:businesses, partners:seed.partners, products:products, posts:posts, reels:reels, contacts:seed.contacts, reports:seed.reports, notifications:notifications, jobs:createdJobs, events:createdEvents, applications:applications };
        }
        function filterRows(rows) {
          const q = String(searchInput.value || "").toLowerCase().trim();
          const status = String(statusFilter.value || "").toLowerCase();
          return rows.filter(function (row) {
            const text = JSON.stringify(row).toLowerCase();
            const rowStatus = String(row.status || row.verify || "").toLowerCase();
            return (!q || text.indexOf(q) >= 0) && (!status || rowStatus === status);
          });
        }
        function countToday(rows) {
          const today = todayText(0);
          return rows.filter(function (row) { return String(row.created || "").indexOf(today) >= 0; }).length;
        }
        function counts() {
          return {
            dashboard: state.storage.length,
            customers: state.customers.length,
            business: state.businesses.length,
            partner: state.partners.length,
            businessPosition: 6,
            businessCategory: 9,
            productCategory: 7,
            productSubCategory: 14,
            businessSector: 8,
            product: state.products.length,
            post: state.posts.length,
            banner: 5,
            servicesBanner: 4,
            reel: state.reels.length,
            jobs: state.jobs.length,
            events: state.events.length,
            findUs: 3,
            services: 12,
            serviceBusiness: 6,
            partnerService: 5,
            contactUs: state.contacts.length,
            report: state.reports.length,
            cms: 8,
            faq: 16,
            notification: state.notifications.length,
            ai: readJson("emyAskSavedChats", []).length,
            data: state.storage.length
          };
        }
        function renderNav() {
          const c = counts();
          nav.innerHTML = navGroups.map(function (group) {
            const items = modules.filter(function (mod) { return mod[3] === group; });
            if (!items.length) return "";
            return '<section class="nav-section"><span class="nav-section-title">' + esc(group) + '</span>' + items.map(function (mod) {
              return '<a class="' + (activeView === mod[0] ? 'is-active' : '') + '" href="' + esc(adminModuleHref(mod[0])) + '" data-view-link="' + esc(mod[0]) + '"><i>' + esc(mod[2]) + '</i><b>' + esc(mod[1]) + '</b><small>' + esc(c[mod[0]] == null ? 0 : c[mod[0]]) + '</small></a>';
            }).join("") + '</section>';
          }).join("");
        }
        function stat(label, value, note, icon) {
          return '<article class="stat"><div class="stat-head"><small>' + esc(label) + '</small><i>' + esc(icon) + '</i></div><strong>' + esc(value) + '</strong><span>' + esc(note) + '</span></article>';
        }
        function renderStats() {
          const c = counts();
          return '<div class="stats-grid">' +
            stat("Total customers", c.customers, countToday(state.customers) + " joined today", "CU") +
            stat("Businesses", c.business, countToday(state.businesses) + " today", "B") +
            stat("Partners", c.partner, "Partner network", "P") +
            stat("Products", c.product, "Products and prices", "PR") +
            stat("Posts", c.post, "Feed posts", "PO") +
            stat("Contact us", c.contactUs, "Messages waiting", "C") +
          '</div>';
        }
        function lineChart() {
          const points = "20,166 190,166 360,166 530,164 700,168 870,122 1040,94 1210,78";
          return '<div class="chart-wrap"><svg viewBox="0 0 1230 220" role="img" aria-label="Active user graph"><defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#2e90fa" stop-opacity=".32"/><stop offset="1" stop-color="#2e90fa" stop-opacity=".03"/></linearGradient></defs><g stroke="#edf1f7"><path d="M20 20H1210M20 68H1210M20 116H1210M20 164H1210M20 206H1210"/></g><path d="M20 166 L190 166 L360 166 L530 164 L700 168 L870 122 L1040 94 L1210 78 L1210 206 L20 206 Z" fill="url(#area)"/><polyline points="' + points + '" fill="none" stroke="#1570ef" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><g fill="#667085" font-size="11" font-weight="700"><text x="20" y="218">12 May</text><text x="350" y="218">14 May</text><text x="690" y="218">16 May</text><text x="1030" y="218">Today</text></g></svg></div>';
        }
        function bars() {
          const rows = [["Customers",82],["Businesses",64],["Products",76],["Clips",52],["Messages",24]];
          return '<div class="bars">' + rows.map(function (row) { return '<div class="bar-row"><span>' + esc(row[0]) + '</span><div class="bar"><span style="width:' + esc(row[1]) + '%"></span></div><b>' + esc(row[1]) + '</b></div>'; }).join("") + '</div>';
        }
        function adminActionIcon(name) {
          if (name === "edit") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4.5L19 9.5 14.5 5 4 15.5V20Z"/><path d="m13.5 6 4.5 4.5"/></svg>';
          if (name === "approve") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>';
          if (name === "close") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>';
          return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5Z"/><path d="M12 9.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"/></svg>';
        }
        function adminMediaLabel(key, value) {
          const text = String(value == null ? "" : value).replace(/\\s+/g, " ").trim();
          if (!text) return "";
          const field = String(key || "").toLowerCase();
          const mediaKey = /image|photo|avatar|logo|cover|poster|thumb|thumbnail|media|video|clip|ref|src/.test(field);
          if (/^data:video/i.test(text) || (mediaKey && /\\.(mp4|webm|mov|m4v)(\\?|#|$)/i.test(text))) return "Uploaded video";
          if (/^data:image/i.test(text) || (mediaKey && /^(https?:|blob:)/i.test(text)) || (mediaKey && /\\.(jpg|jpeg|png|gif|webp|avif|svg)(\\?|#|$)/i.test(text))) return "Uploaded image";
          if (/^data:/i.test(text) || /base64,[A-Za-z0-9+/=]{60,}/i.test(text)) return "Uploaded media";
          if (mediaKey && (text.indexOf("emy-ref:") === 0 || text.indexOf("emy-video-ref:") === 0 || text.indexOf("emy/") === 0 || text.length > 80)) return "Media reference saved";
          return "";
        }
        function adminMediaPreviewHtml(key, value) {
          const text = String(value == null ? "" : value).replace(/\\s+/g, " ").trim();
          if (!text) return "";
          const field = String(key || "").toLowerCase();
          const mediaKey = /image|photo|avatar|logo|cover|poster|thumb|thumbnail|media|video|clip|ref|src/.test(field);
          if (!mediaKey && !/^(https?:|data:image|data:video|blob:)/i.test(text)) return "";
          const type = /^data:video/i.test(text) || /video|clip/.test(field) || /\\.(mp4|webm|mov|m4v)(\\?|#|$)/i.test(text) ? "video" : "image";
          let src = /^(https?:|data:image|data:video|blob:)/i.test(text) ? text : "";
          if (!src && text.indexOf("emy/") === 0) src = "https://res.cloudinary.com/dupytlsjv/" + type + "/upload/" + text;
          if (!src) return "";
          const label = adminMediaLabel(key, value) || (type === "video" ? "Uploaded video" : "Uploaded image");
          if (type === "video") return '<span class="field-media-preview"><video src="' + esc(src) + '" controls playsinline preload="metadata"></video><small>' + esc(label) + '</small></span>';
          return '<span class="field-media-preview"><img src="' + esc(src) + '" alt="' + esc(label) + '" /><small>' + esc(label) + '</small></span>';
        }
        function adminDisplayHtml(key, value) {
          const media = adminMediaPreviewHtml(key, value);
          if (media) return media;
          const label = adminMediaLabel(key, value);
          const text = label || String(value == null ? "" : value).replace(/\\s+/g, " ").trim();
          return esc(text.length > 220 ? text.slice(0, 180) + "..." : text);
        }
        function table(title, rows, columns, subtitle) {
          const filtered = filterRows(rows);
          if (!filtered.length) return '<section class="panel table-panel"><div class="panel-head"><span><h2>' + esc(title) + '</h2><p>' + esc(subtitle || "") + '</p></span></div><div class="empty">No records found.</div></section>';
          return '<section class="panel table-panel"><div class="panel-head"><span><h2>' + esc(title) + '</h2><p>' + esc(subtitle || filtered.length + " records") + '</p></span><button class="pill" type="button" data-action="see-more">See More</button></div><div class="table-scroll"><table><thead><tr>' + columns.map(function (col) { return '<th>' + esc(col.label) + '</th>'; }).join("") + '<th>Actions</th></tr></thead><tbody>' + filtered.map(function (row, index) {
            const rowId = String(row.id || row.name || index);
            const overrides = readJson("emyAdminRowStatusOverrides", {});
            return '<tr>' + columns.map(function (col) {
              const value = col.key === "index" ? index + 1 : row[col.key];
              if (col.key === "profile") return '<td>' + avatarHtml(row) + '</td>';
              if (col.key === "status" || col.key === "verify") return '<td>' + statusHtml(overrides[rowId] || value) + '</td>';
              return '<td>' + adminDisplayHtml(col.key, value || "") + '</td>';
            }).join("") + '<td><div class="row-actions"><button type="button" data-row-view="' + esc(rowId) + '">' + adminActionIcon("view") + 'View</button><button type="button" data-row-edit="' + esc(rowId) + '">' + adminActionIcon("edit") + 'Edit</button><button type="button" data-row-approve="' + esc(rowId) + '">' + adminActionIcon("approve") + 'Approve</button></div></td></tr>';
          }).join("") + '</tbody></table></div></section>';
        }
        function shortcutCards() {
          const shortcuts = [
            ["business","emy-business-profile.html","Business profile","Check the page businesses use to register and manage their profile."],
            ["product","emy-customer-search.html#products","Product search","See how products and prices appear to customers."],
            ["post","emy-customer-home.html#feeds","Feeds","Open posts, jobs, events, products, and clips in the customer feed."],
            ["reel","emy-customer-home.html#reels","Clips","Open the short video clips section."],
            ["notification","emy-notification-settings.html","Notifications","Open customer notification settings."],
            ["ai","ask-emy.html","Ask EMY","Test the AI assistant customers use."],
            ["contactUs","contact.html","Contact page","Open the public contact and message page."],
            ["faq","faqs.html","FAQ page","Open customer help questions."]
          ];
          return '<div class="shortcut-grid">' + shortcuts.map(function (item) {
            return '<a class="shortcut-card" href="' + esc(item[1]) + '"><span class="shortcut-art" aria-hidden="true"></span><span class="shortcut-copy"><strong>' + esc(item[2]) + '</strong><span>' + esc(item[3]) + '</span></span></a>';
          }).join("") + '</div>';
        }
        function moduleCards() {
          const c = counts();
          const visibleIds = ["customers","business","product","post","reel","jobs","events","notification","contactUs","report","ai","data"];
          const visible = visibleIds.map(moduleById);
          return '<div class="module-grid">' + visible.map(function (mod) {
            const href = moduleHref(mod[0]);
            const count = c[mod[0]] || 0;
            const lines = moduleInfoLines(mod[0], count);
            const externalLink = href && href !== "emy-admin-backend.html" ? '<a href="' + esc(href) + '">' + esc(moduleActionLabel(mod[0])) + '</a>' : '';
            return '<article class="module-card" data-module="' + esc(mod[0]) + '" data-tone="' + esc(moduleTone(mod[0])) + '">' +
              '<div class="module-top"><span class="module-icon">' + esc(mod[2]) + '</span><span class="module-copy"><h3>' + esc(mod[1]) + '</h3><p>' + esc(moduleDescription(mod[0])) + '</p></span><strong class="module-count">' + esc(count) + '</strong></div>' +
              '<div class="module-info"><span>' + esc(lines[0]) + '</span><span>' + esc(lines[1]) + '</span></div>' +
              '<div class="module-actions' + (externalLink ? '' : ' is-single') + '"><a href="' + esc(adminModuleHref(mod[0])) + '" data-view-link="' + esc(mod[0]) + '">Manage ' + esc(mod[1]) + '</a>' + externalLink + '</div>' +
            '</article>';
          }).join("") + '</div>';
        }
        function renderDashboard() {
          return renderStats() + shortcutCards() + '<div class="dashboard-grid"><section class="panel"><div class="panel-head"><span><h2>Analysis of active user data</h2><p>Daily platform activity, customer movement, and business growth.</p></span><select class="select" style="max-width:118px"><option>Weekly</option><option>Monthly</option></select></div><div class="panel-body">' + lineChart() + '</div></section><section class="panel"><div class="panel-head"><span><h2>Platform mix</h2><p>Customers, businesses, products, posts, and clips.</p></span></div><div class="panel-body"><div class="mini-grid"><div class="mini-card"><div class="donut" aria-label="Distribution chart"></div><div class="legend"><span><span><i class="dot"></i>Businesses</span><b>' + state.businesses.length + '</b></span><span><span><i class="dot" style="background:#1570ef"></i>Customers</span><b>' + state.customers.length + '</b></span><span><span><i class="dot" style="background:#039855"></i>Products</span><b>' + state.products.length + '</b></span></div></div><div class="mini-card">' + bars() + '</div></div></div></section></div>' + moduleCards() + table("Customers List", state.customers, customerCols(), "Latest customer accounts") + table("Business List", state.businesses, businessCols(), "Business profile and verify status") + table("Partner List", state.partners, partnerCols(), "Active partner accounts");
        }
        function customerCols() { return [{key:"index",label:"Sr No"},{key:"profile",label:"Profile"},{key:"firstName",label:"First Name"},{key:"lastName",label:"Last Name"},{key:"email",label:"Email"},{key:"phone",label:"Phone"},{key:"created",label:"Created Date"},{key:"status",label:"Status"}]; }
        function businessCols() { return [{key:"index",label:"Sr No"},{key:"profile",label:"Business Profile Image"},{key:"name",label:"Business Name"},{key:"email",label:"Business Email"},{key:"phone",label:"Phone"},{key:"created",label:"Register Date"},{key:"status",label:"Business Status"},{key:"verify",label:"Verify Status"}]; }
        function partnerCols() { return [{key:"index",label:"Sr No"},{key:"profile",label:"Profile"},{key:"name",label:"Name"},{key:"email",label:"Email"},{key:"phone",label:"Phone"},{key:"status",label:"Status"},{key:"created",label:"Created Date"}]; }
        function simpleRows(kind, count) {
          const rows = [];
          for (let index = 1; index <= count; index += 1) rows.push({ id:kind + "-" + index, name:kind.replace(/([A-Z])/g, " $1").trim() + " " + index, title:kind + " item " + index, email:"admin" + index + "@my-emy.com", status:index % 4 === 0 ? "pending" : "active", created:todayText(index % 5), description:"Manage visibility, image, ordering, and status for this backend item." });
          return rows;
        }
        function adminViewConfig(view) {
          const map = {
            customers:[state.customers, customerCols(), "Customers", "Customer accounts, emails, phone numbers, images, and status."],
            business:[state.businesses, businessCols(), "Businesses", "Business profiles, signup approval, verification, and contact records."],
            partner:[state.partners, partnerCols(), "Partners", "Partner users and partner status."],
            product:[state.products, [{key:"index",label:"Sr No"},{key:"profile",label:"Image"},{key:"name",label:"Product"},{key:"business",label:"Business"},{key:"category",label:"Category"},{key:"subCategory",label:"Sub Category"},{key:"price",label:"Price"},{key:"status",label:"Status"}], "Products", "All products, prices, categories, and business ownership."],
            post:[state.posts, [{key:"index",label:"Sr No"},{key:"profile",label:"Image"},{key:"name",label:"Post"},{key:"business",label:"Business"},{key:"type",label:"Type"},{key:"created",label:"Created"},{key:"status",label:"Status"}], "Posts", "All customer and business feed posts."],
            reel:[state.reels, [{key:"index",label:"Sr No"},{key:"profile",label:"Cover"},{key:"name",label:"Clip"},{key:"business",label:"Business"},{key:"views",label:"Views"},{key:"likes",label:"Likes"},{key:"status",label:"Status"}], "Clips", "Short videos, product clips, and business clips."],
            jobs:[state.jobs, [{key:"index",label:"Sr No"},{key:"profile",label:"Business"},{key:"name",label:"Job"},{key:"business",label:"Business"},{key:"location",label:"Location"},{key:"workplace",label:"Workplace"},{key:"applicants",label:"Applicants"},{key:"status",label:"Status"}], "Jobs", "Job posts, applications, CV/profile links, and hiring status."],
            events:[state.events, [{key:"index",label:"Sr No"},{key:"profile",label:"Image"},{key:"name",label:"Event"},{key:"business",label:"Business"},{key:"eventType",label:"Type"},{key:"date",label:"Date"},{key:"place",label:"Place or link"},{key:"status",label:"Status"}], "Events", "Business events posted into Feeds."],
            contactUs:[state.contacts, [{key:"index",label:"Sr No"},{key:"name",label:"Name"},{key:"email",label:"Email"},{key:"subject",label:"Subject"},{key:"created",label:"Created"},{key:"status",label:"Status"}], "Contact Us", "Messages from customers and businesses."],
            report:[state.reports, [{key:"index",label:"Sr No"},{key:"name",label:"Report"},{key:"business",label:"Business"},{key:"reason",label:"Reason"},{key:"created",label:"Created"},{key:"status",label:"Status"}], "Reports", "Reported posts, products, businesses, and account issues."],
            notification:[state.notifications, [{key:"index",label:"Sr No"},{key:"name",label:"Notification"},{key:"message",label:"Message"},{key:"created",label:"Created"},{key:"status",label:"Status"}], "Notifications", "System, customer, business, and Ask EMY notifications."]
          };
          if (map[view]) return { rows:map[view][0], columns:map[view][1], title:map[view][2], subtitle:map[view][3] };
          const label = moduleLabel(view);
          return { rows:simpleRows(label, counts()[view] || 6), columns:[{key:"index",label:"Sr No"},{key:"profile",label:"Image"},{key:"name",label:"Name"},{key:"description",label:"Description"},{key:"created",label:"Created"},{key:"status",label:"Status"}], title:label, subtitle:moduleDescription(view) };
        }
        function moduleIntro(view) {
          const cfg = adminViewConfig(view);
          const href = moduleHref(view);
          const liveLink = href && href !== "emy-admin-backend.html" ? '<a href="' + esc(href) + '">' + esc(moduleActionLabel(view)) + '</a>' : '';
          const lines = moduleInfoLines(view, cfg.rows.length);
          return '<section class="admin-intro" data-module-intro="' + esc(view) + '"><div class="admin-intro-top"><span><h2>' + esc(cfg.title) + '</h2><p>' + esc(cfg.subtitle) + '</p></span><div class="admin-intro-actions">' + liveLink + '<a href="' + esc(adminModuleHref(view)) + '" data-view-link="' + esc(view) + '">Section link</a><button type="button" data-action="snapshot">Save snapshot</button></div></div><div class="admin-intro-grid"><div class="admin-intro-card"><small>Records</small><strong>' + esc(cfg.rows.length) + ' saved items</strong></div><div class="admin-intro-card"><small>What this controls</small><strong>' + esc(lines[0]) + '</strong></div><div class="admin-intro-card"><small>Connected page</small><strong>' + esc(href === "emy-admin-backend.html" ? "Backend section" : href) + '</strong></div></div></section>';
        }
        function renderGeneric(view) {
          const cfg = adminViewConfig(view);
          return renderStats() + moduleIntro(view) + table(cfg.title, cfg.rows, cfg.columns, cfg.subtitle);
        }
        function adminAskEmyApiCandidates() {
          const urls = [];
          const add = function (url) { if (url && urls.indexOf(url) === -1) urls.push(url); };
          if (window.location.protocol === "http:" || window.location.protocol === "https:") {
            add(window.location.origin + "/api/ask-emy");
            add("/api/ask-emy");
          }
          add("http://127.0.0.1:8779/api/ask-emy");
          add("http://localhost:8779/api/ask-emy");
          add("http://127.0.0.1:8767/api/ask-emy");
          add("http://localhost:8767/api/ask-emy");
          return urls;
        }
        function adminApiCandidates(pathname) { return adminAskEmyApiCandidates().map(function (url) { return url.replace(/\\/api\\/ask-emy$/, pathname); }); }
        async function checkAiStatus() {
          const target = document.querySelector("[data-ai-result]");
          if (target) target.textContent = "Checking Ask EMY server...";
          for (const endpoint of adminApiCandidates("/api/ask-emy/status")) {
            try {
              const response = await fetch(endpoint, { method:"GET" });
              const json = await response.json();
              if (target) target.textContent = JSON.stringify(json, null, 2);
              return;
            } catch (error) {}
          }
          if (target) target.textContent = "Ask EMY server is not reachable. Start serve-linked-pages.cjs.";
        }
        async function saveAiSettings() {
          const target = document.querySelector("[data-ai-result]");
          const settings = { provider:document.querySelector("[data-ai-provider]")?.value || "OpenAI", model:document.querySelector("[data-ai-model]")?.value || "gpt-5.4", apiKey:document.querySelector("[data-ai-key]")?.value || "", notes:document.querySelector("[data-ai-notes]")?.value || "" };
          writeJson("emyAdminAiSettings", { provider:settings.provider, model:settings.model, notes:settings.notes, savedAt:new Date().toISOString() });
          if (target) target.textContent = "Saving Ask EMY AI settings...";
          for (const endpoint of adminApiCandidates("/api/admin/ai-settings")) {
            try {
              const response = await fetch(endpoint, { method:"POST", headers:{ "Content-Type":"application/json" }, body:JSON.stringify(settings) });
              const json = await response.json();
              if (target) target.textContent = JSON.stringify(json, null, 2);
              return;
            } catch (error) {}
          }
          if (target) target.textContent = "Saved in this browser, but the backend was not reachable.";
        }
        async function testAi() {
          const target = document.querySelector("[data-ai-result]");
          if (target) target.textContent = "Testing Ask EMY...";
          const body = JSON.stringify({ query:"show customers, business approvals, products, reports, and notifications", location:"Admin", radius:"all" });
          for (const endpoint of adminAskEmyApiCandidates()) {
            try {
              const response = await fetch(endpoint, { method:"POST", headers:{ "Content-Type":"application/json" }, body:body });
              const json = await response.json();
              if (target) target.textContent = JSON.stringify(json, null, 2);
              return;
            } catch (error) {}
          }
          if (target) target.textContent = "Ask EMY backend is not reachable.";
        }
        function renderAi() {
          const settings = readJson("emyAdminAiSettings", { provider:"OpenAI / OpenRouter / DeepSeek", model:"gpt-5.4", notes:"Paste the API key here, then save to backend." });
          return renderStats() + '<section class="panel"><div class="panel-head"><span><h2>Ask EMY AI access</h2><p>Configure the local backend provider and test AI responses.</p></span></div><div class="panel-body"><div class="mini-grid"><label>Provider<input class="input" data-ai-provider value="' + esc(settings.provider || "") + '" /></label><label>Model<input class="input" data-ai-model value="' + esc(settings.model || "") + '" /></label><label>Server API key<input class="input" data-ai-key type="password" placeholder="OpenAI, OpenRouter, or DeepSeek key" /></label><label>Notes<input class="input" data-ai-notes value="' + esc(settings.notes || "") + '" /></label></div><div class="row-actions" style="margin-top:12px"><button class="primary" type="button" data-action="save-ai">Save to backend</button><button type="button" data-action="ai-status">Check server status</button><button type="button" data-action="test-ai">Test Ask EMY</button></div><div class="ai-result" data-ai-result style="margin-top:12px">AI backend status will appear here.</div></div></section>';
        }
        function renderData() {
          const data = JSON.stringify(state.storage.reduce(function (acc, item) { acc[item.key] = item.value; return acc; }, {}), null, 2);
          return renderStats() + '<section class="panel"><div class="panel-head"><span><h2>Data Store</h2><p>Inspect and export all local EMY backend data.</p></span></div><div class="panel-body"><details class="raw-block"><summary>Raw JSON</summary><textarea class="textarea" data-data-json>' + esc(data) + '</textarea></details><div class="row-actions" style="margin-top:12px"><button class="primary" type="button" data-action="export">Download JSON</button><button type="button" data-action="snapshot">Save snapshot</button></div></div></section>';
        }
        function setActiveView(view, shouldPush) {
          if (!isAdminView(view)) view = "dashboard";
          activeView = view;
          if (shouldPush) {
            const nextUrl = view === "dashboard" ? "emy-admin-backend.html" : adminModuleHref(view);
            history.pushState({ view:view }, "", nextUrl);
          }
          render();
        }
        function findRecordById(id) {
          const cfg = adminViewConfig(activeView);
          return (cfg.rows || []).find(function (row, index) {
            return String(row.id || row.name || index) === String(id);
          }) || null;
        }
        function openRecordModal(id, mode) {
          const row = findRecordById(id);
          if (!row || !adminModal || !adminModalBody || !adminModalTitle) {
            showToast("I could not find that saved record in this section.");
            return;
          }
          const title = row.name || row.title || row.email || row.id || "Saved record";
          adminModalTitle.textContent = (mode === "edit" ? "Edit " : "View ") + title;
          const keys = Object.keys(row).filter(function (key) { return row[key] != null && String(row[key]).trim() !== ""; });
          const details = keys.map(function (key) {
            return '<div class="admin-detail-item"><b>' + esc(key.replace(/([A-Z])/g, " $1")) + '</b>' + adminDisplayHtml(key, row[key]) + '</div>';
          }).join("");
          const editBox = mode === "edit" ? '<label><span style="display:block;margin:0 0 6px;color:#667085;font-size:11px;font-weight:900;text-transform:uppercase">Admin note</span><textarea class="textarea" data-admin-edit-note placeholder="Add an internal note for this record.">' + esc((readJson("emyAdminEditedRecords", {})[id] || {}).note || "") + '</textarea></label><div class="row-actions"><button class="primary" type="button" data-admin-save-edit="' + esc(id) + '">Save note</button></div>' : '';
          adminModalBody.innerHTML = '<div class="admin-detail-grid">' + details + '</div>' + editBox + '<div class="row-actions"><button type="button" data-admin-modal-close>' + adminActionIcon("close") + 'Close</button><button type="button" data-row-approve="' + esc(id) + '">' + adminActionIcon("approve") + 'Approve</button></div>';
          adminModal.hidden = false;
        }
        function closeRecordModal() {
          if (adminModal) adminModal.hidden = true;
        }
        function approveRecord(id) {
          const overrides = readJson("emyAdminRowStatusOverrides", {});
          overrides[id] = "approved";
          writeJson("emyAdminRowStatusOverrides", overrides);
          showToast("Approved and saved in the local admin backend.");
          closeRecordModal();
          render();
        }
        function saveRecordNote(id) {
          const edited = readJson("emyAdminEditedRecords", {});
          const note = document.querySelector("[data-admin-edit-note]")?.value || "";
          edited[id] = { id:id, view:activeView, note:note, savedAt:new Date().toISOString() };
          writeJson("emyAdminEditedRecords", edited);
          showToast("Admin note saved for this record.");
          closeRecordModal();
        }
        function render() {
          state = collectState();
          renderNav();
          const current = modules.find(function (mod) { return mod[0] === activeView; }) || modules[0];
          pageTitle.textContent = current[1];
          pageSubtitle.textContent = activeView === "dashboard" ? "Simple shortcuts, stats, people, businesses, content, reports, AI, and saved data." : moduleDescription(activeView);
          if (activeView === "dashboard") root.innerHTML = renderDashboard();
          else if (activeView === "ai") root.innerHTML = renderAi();
          else if (activeView === "data") root.innerHTML = renderData();
          else root.innerHTML = renderGeneric(activeView);
        }
        function saveSnapshot() {
          const snapshots = readJson("emyAdminSnapshots", []);
          snapshots.unshift({ id:"snapshot-" + Date.now(), createdAt:new Date().toISOString(), data:allStorage() });
          writeJson("emyAdminSnapshots", snapshots.slice(0, 20));
          render();
        }
        function exportData() {
          const data = document.querySelector("[data-data-json]")?.value || "{}";
          const blob = new Blob([data], { type:"application/json" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "emy-admin-backend-data.json";
          link.click();
          URL.revokeObjectURL(url);
        }
        document.addEventListener("click", function (event) {
          const viewLink = event.target.closest("[data-view-link]");
          if (viewLink) {
            event.preventDefault();
            setActiveView(viewLink.dataset.viewLink, true);
            return;
          }
          const closeModal = event.target.closest("[data-admin-modal-close]");
          if (closeModal) {
            closeRecordModal();
            return;
          }
          if (event.target === adminModal) {
            closeRecordModal();
            return;
          }
          const button = event.target.closest("button");
          if (!button) return;
          if (button.dataset.view) { setActiveView(button.dataset.view, true); return; }
          if (button.dataset.action === "refresh") render();
          if (button.dataset.action === "snapshot") saveSnapshot();
          if (button.dataset.action === "export") exportData();
          if (button.dataset.action === "see-more") showToast("This section is already showing every saved local record for the current filter.");
          if (button.dataset.action === "save-ai") saveAiSettings();
          if (button.dataset.action === "ai-status") checkAiStatus();
          if (button.dataset.action === "test-ai") testAi();
          if (button.dataset.rowView) openRecordModal(button.dataset.rowView, "view");
          if (button.dataset.rowEdit) openRecordModal(button.dataset.rowEdit, "edit");
          if (button.dataset.rowApprove) approveRecord(button.dataset.rowApprove);
          if (button.dataset.adminSaveEdit) saveRecordNote(button.dataset.adminSaveEdit);
        });
        window.addEventListener("hashchange", function () {
          const next = initialAdminView();
          if (next !== activeView) setActiveView(next, false);
        });
        window.addEventListener("popstate", function () {
          const next = initialAdminView();
          if (next !== activeView) setActiveView(next, false);
        });
        searchInput.addEventListener("input", render);
        statusFilter.addEventListener("change", render);
        render();
      })();
    </script>
  </body>
</html>`;
}

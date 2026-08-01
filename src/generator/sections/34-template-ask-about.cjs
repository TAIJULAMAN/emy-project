/* EMY generator section: 34-template-ask-about.cjs (source lines 95549-96368) */
function askEmyAboutPageTemplate() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>EMY | About Ask EMY</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
      :root {
        --navy: #001b47;
        --orange: #ff6a00;
        --ink-soft: #64708a;
        --line: rgba(0, 27, 71, .1);
        --surface: #ffffff;
        --wash: #fbfaf8;
        --blue-soft: #eaf2ff;
        --green-soft: #eaf8f1;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        color: var(--navy);
        background:
          linear-gradient(90deg, rgba(255,255,255,.72), rgba(255,255,255,.94)),
          linear-gradient(180deg, #fffaf4 0%, #ffffff 42%, #f7fbff 100%);
      }
      a { color: inherit; text-decoration: none; }
      .topbar {
        position: sticky;
        top: 0;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 18px;
        padding: 18px clamp(18px, 5vw, 72px);
        border-bottom: 1px solid rgba(0,27,71,.07);
        background: rgba(255,255,255,.86);
        backdrop-filter: blur(16px);
      }
      .brand { display: inline-flex; align-items: center; gap: 14px; font-weight: 900; letter-spacing: .02em; }
      .brand img { width: 128px; height: auto; display: block; }
      .nav { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; justify-content: flex-end; }
      .nav a {
        display: inline-flex;
        min-height: 42px;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        padding: 0 16px;
        font-size: 14px;
        font-weight: 800;
        color: rgba(0,27,71,.72);
        transition: transform .18s ease, background .18s ease, color .18s ease, box-shadow .18s ease;
      }
      .nav a:hover { transform: translateY(-1px); background: #fff3ea; color: var(--orange); }
      .nav .primary { background: var(--navy); color: #fff; box-shadow: 0 14px 32px rgba(0,27,71,.18); }
      .nav .primary:hover { background: var(--orange); color: #fff; }
      main { overflow: hidden; }
      .hero {
        display: grid;
        grid-template-columns: minmax(0, 1.02fr) minmax(320px, .98fr);
        align-items: center;
        gap: clamp(28px, 5vw, 78px);
        max-width: 1180px;
        margin: 0 auto;
        padding: clamp(54px, 8vw, 96px) clamp(18px, 5vw, 42px) 42px;
      }
      .kicker {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        border: 1px solid rgba(255,106,0,.25);
        border-radius: 999px;
        background: rgba(255,255,255,.8);
        padding: 8px 12px;
        color: #bf4c00;
        font-size: 12px;
        font-weight: 900;
        letter-spacing: .12em;
        text-transform: uppercase;
        box-shadow: 0 12px 30px rgba(255,106,0,.08);
      }
      h1 {
        max-width: 760px;
        margin: 18px 0 0;
        font-size: clamp(42px, 7vw, 78px);
        line-height: .95;
        letter-spacing: 0;
        font-weight: 900;
      }
      .lead {
        max-width: 640px;
        margin: 24px 0 0;
        color: var(--ink-soft);
        font-size: clamp(17px, 2vw, 21px);
        font-weight: 700;
        line-height: 1.65;
      }
      .cta-row { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px; }
      .cta {
        display: inline-flex;
        min-height: 52px;
        align-items: center;
        justify-content: center;
        border-radius: 16px;
        padding: 0 22px;
        font-size: 15px;
        font-weight: 900;
        border: 1px solid rgba(0,27,71,.1);
        background: #fff;
        color: var(--navy);
        box-shadow: 0 14px 34px rgba(0,27,71,.08);
        transition: transform .18s ease, box-shadow .18s ease, background .18s ease;
      }
      .cta:hover { transform: translateY(-2px); box-shadow: 0 22px 44px rgba(0,27,71,.12); background: #fff7f0; }
      .cta.primary { border-color: transparent; background: var(--orange); color: #fff; box-shadow: 0 18px 42px rgba(255,106,0,.28); }
      .assistant-stage {
        position: relative;
        min-height: 520px;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 34px;
        background: linear-gradient(145deg, rgba(255,255,255,.98), rgba(255,249,243,.94));
        box-shadow: 0 42px 90px rgba(0,27,71,.13);
        padding: clamp(18px, 3vw, 30px);
      }
      .assistant-card {
        position: relative;
        z-index: 2;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 28px;
        background: rgba(255,255,255,.92);
        padding: 24px;
        box-shadow: 0 26px 64px rgba(0,27,71,.12);
      }
      .assistant-top { display: flex; align-items: center; gap: 16px; }
      .bag {
        display: inline-flex;
        width: 76px;
        height: 76px;
        align-items: center;
        justify-content: center;
        filter: drop-shadow(0 18px 24px rgba(255,106,0,.26));
      }
      .assistant-title strong { display: block; font-size: 24px; line-height: 1; }
      .assistant-title span { display: block; margin-top: 6px; color: var(--ink-soft); font-size: 14px; font-weight: 800; }
      .chat {
        display: grid;
        gap: 13px;
        margin-top: 24px;
      }
      .bubble {
        width: fit-content;
        max-width: 88%;
        border-radius: 18px;
        padding: 13px 15px;
        font-size: 14px;
        font-weight: 800;
        line-height: 1.45;
      }
      .bubble.user { justify-self: end; background: var(--navy); color: #fff; border-bottom-right-radius: 7px; }
      .bubble.ai { background: #fff3ea; color: var(--navy); border: 1px solid rgba(255,106,0,.18); border-bottom-left-radius: 7px; }
      .result-strip {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        margin-top: 22px;
      }
      .result {
        min-height: 112px;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 18px;
        background: #fff;
        padding: 14px;
        box-shadow: 0 18px 36px rgba(0,27,71,.08);
      }
      .result span { display: inline-flex; border-radius: 999px; background: #fff0e4; padding: 5px 8px; color: #d65300; font-size: 11px; font-weight: 900; }
      .result strong { display: block; margin-top: 12px; font-size: 14px; line-height: 1.25; }
      .floating-note {
        position: absolute;
        right: -22px;
        bottom: 54px;
        z-index: 3;
        width: 206px;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 24px;
        background: rgba(255,255,255,.95);
        padding: 18px;
        box-shadow: 0 28px 58px rgba(0,27,71,.14);
      }
      .floating-note b { display: block; font-size: 30px; line-height: 1; color: var(--orange); }
      .floating-note span { display: block; margin-top: 8px; color: var(--ink-soft); font-size: 13px; font-weight: 800; line-height: 1.45; }
      .section {
        max-width: 1180px;
        margin: 0 auto;
        padding: 46px clamp(18px, 5vw, 42px);
      }
      .section-head {
        display: flex;
        align-items: end;
        justify-content: space-between;
        gap: 22px;
        margin-bottom: 18px;
      }
      .section h2 { margin: 0; font-size: clamp(28px, 4vw, 42px); line-height: 1.08; font-weight: 900; }
      .section-head p { max-width: 520px; margin: 0; color: var(--ink-soft); font-size: 15px; font-weight: 700; line-height: 1.6; }
      .definition {
        border-top: 1px solid var(--line);
        border-bottom: 1px solid var(--line);
        background: rgba(255,255,255,.66);
      }
      .definition .inner {
        display: grid;
        grid-template-columns: .75fr 1.25fr;
        gap: 30px;
        max-width: 1180px;
        margin: 0 auto;
        padding: 42px clamp(18px, 5vw, 42px);
      }
      .definition strong { font-size: 18px; }
      .definition p { margin: 0; color: var(--ink-soft); font-size: clamp(19px, 2.3vw, 27px); font-weight: 800; line-height: 1.45; }
      .grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 14px;
      }
      .feature {
        min-height: 230px;
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 24px;
        background: #fff;
        padding: 22px;
        box-shadow: 0 20px 44px rgba(0,27,71,.08);
      }
      .feature:nth-child(2) { background: var(--blue-soft); }
      .feature:nth-child(3) { background: var(--green-soft); }
      .feature .number {
        display: inline-flex;
        width: 38px;
        height: 38px;
        align-items: center;
        justify-content: center;
        border-radius: 14px;
        background: var(--navy);
        color: #fff;
        font-size: 13px;
        font-weight: 900;
      }
      .feature h3 { margin: 18px 0 0; font-size: 19px; line-height: 1.2; }
      .feature p { margin: 10px 0 0; color: var(--ink-soft); font-size: 14px; font-weight: 700; line-height: 1.55; }
      .split {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
      }
      .panel {
        border: 1px solid rgba(0,27,71,.08);
        border-radius: 28px;
        background: #fff;
        padding: 28px;
        box-shadow: 0 22px 54px rgba(0,27,71,.09);
      }
      .panel h3 { margin: 0; font-size: 24px; }
      .panel ul { display: grid; gap: 12px; margin: 20px 0 0; padding: 0; list-style: none; }
      .panel li { display: flex; gap: 10px; color: var(--ink-soft); font-size: 15px; font-weight: 800; line-height: 1.5; }
      .dot { width: 10px; height: 10px; margin-top: 7px; flex: 0 0 auto; border-radius: 50%; background: var(--orange); box-shadow: 0 0 0 6px rgba(255,106,0,.1); }
      .closing {
        margin-bottom: 56px;
        border-radius: 34px;
        background: var(--navy);
        color: #fff;
        padding: clamp(28px, 5vw, 46px);
        box-shadow: 0 34px 80px rgba(0,27,71,.18);
      }
      .closing h2 { color: #fff; }
      .closing p { max-width: 760px; color: rgba(255,255,255,.72); font-size: 17px; font-weight: 700; line-height: 1.65; }
      .closing .cta { background: #fff; color: var(--navy); }
      .closing .cta.primary { background: var(--orange); color: #fff; }
      footer {
        border-top: 1px solid rgba(0,27,71,.08);
        padding: 28px clamp(18px, 5vw, 72px);
        color: var(--ink-soft);
        font-size: 13px;
        font-weight: 700;
        text-align: center;
      }
      @media (max-width: 980px) {
        .hero { grid-template-columns: 1fr; }
        .assistant-stage { min-height: auto; }
        .floating-note { position: static; width: auto; margin-top: 16px; }
        .grid { grid-template-columns: repeat(2, 1fr); }
        .definition .inner, .split { grid-template-columns: 1fr; }
      }
      @media (max-width: 640px) {
        .topbar { align-items: flex-start; flex-direction: column; }
        .brand img { width: 108px; }
        .nav { width: 100%; justify-content: flex-start; }
        .nav a { min-height: 38px; padding: 0 12px; font-size: 12px; }
        .hero { padding-top: 36px; }
        .result-strip, .grid { grid-template-columns: 1fr; }
        h1 { font-size: 42px; }
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
        <a href="emy-signin.html">Sign In</a>
        <a class="primary" href="emy-signup.html">Sign up</a>
      </nav>
    </header>
    <main>
      <section class="hero">
        <div>
          <span class="kicker">EMY AI project assistant</span>
          <h1>Ask EMY helps people find what they need by chatting.</h1>
          <p class="lead">Ask EMY is our AI project assistant. It supports customers through conversation, helping them search, compare, understand, and move through EMY without feeling lost.</p>
          <div class="cta-row">
            <a class="cta primary" href="ask-emy.html">Open Ask EMY</a>
            <a class="cta" href="emy-customer-home.html">Go to Customer Home</a>
          </div>
        </div>
        <div class="assistant-stage" aria-label="Ask EMY conversation preview">
          <div class="assistant-card">
            <div class="assistant-top">
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
              <div class="assistant-title">
                <strong>Ask EMY</strong>
                <span>Chat with EMY to find businesses, products, posts, and clips.</span>
              </div>
            </div>
            <div class="chat">
              <div class="bubble user">I need something nearby that is open now.</div>
              <div class="bubble ai">I can help. I will use your saved location, customer businesses, and fresh updates to suggest useful options.</div>
              <div class="bubble user">Can you show products too?</div>
              <div class="bubble ai">Yes. I can surface nearby products, customer feed products, posts, and clips so you can decide faster.</div>
            </div>
            <div class="result-strip">
              <div class="result"><span>Nearby</span><strong>Open businesses close to your saved location.</strong></div>
              <div class="result"><span>Products</span><strong>Items from local and customer businesses.</strong></div>
              <div class="result"><span>Updates</span><strong>Fresh posts and clips from the EMY feed.</strong></div>
            </div>
          </div>
          <aside class="floating-note">
            <b>AI</b>
            <span>Built to support the customer journey, not replace the EMY experience.</span>
          </aside>
        </div>
      </section>

      <section class="definition">
        <div class="inner">
          <strong>What is Ask EMY?</strong>
          <p>Ask EMY is the conversational assistant inside EMY. Instead of only tapping filters and menus, customers can chat naturally and let EMY guide them to the most useful place, product, business, post, or clip.</p>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <h2>How it helps</h2>
          <p>The assistant is designed around real customer tasks: finding something, understanding what is nearby, checking what is new, and moving to the right part of EMY.</p>
        </div>
        <div class="grid">
          <article class="feature">
            <span class="number">01</span>
            <h3>Chat first</h3>
            <p>People can ask in their own words instead of guessing which page, filter, or category they need first.</p>
          </article>
          <article class="feature">
            <span class="number">02</span>
            <h3>Find faster</h3>
            <p>Ask EMY can point customers toward nearby businesses, fresh products, useful posts, and clips.</p>
          </article>
          <article class="feature">
            <span class="number">03</span>
            <h3>Use context</h3>
            <p>It can work with saved location, distance, customer businesses, and recent activity as the backend grows.</p>
          </article>
          <article class="feature">
            <span class="number">04</span>
            <h3>Guide action</h3>
            <p>When the answer is not enough, Ask EMY can send the customer to the right profile, list, result, or next step.</p>
          </article>
        </div>
      </section>

      <section class="section">
        <div class="split">
          <article class="panel">
            <h3>For customers</h3>
            <ul>
              <li><span class="dot"></span><span>Ask for businesses, services, products, posts, clips, or ideas nearby.</span></li>
              <li><span class="dot"></span><span>Get help comparing options before opening a business profile.</span></li>
              <li><span class="dot"></span><span>Use the assistant as a shortcut when the app feels busy.</span></li>
            </ul>
          </article>
          <article class="panel">
            <h3>For businesses</h3>
            <ul>
              <li><span class="dot"></span><span>Help customers discover profile information, products, updates, and offers.</span></li>
              <li><span class="dot"></span><span>Make new posts, clips, and products easier to surface when they are relevant.</span></li>
              <li><span class="dot"></span><span>Support future EMY workflows without forcing customers to search manually.</span></li>
            </ul>
          </article>
        </div>
      </section>

      <section class="section">
        <div class="closing">
          <h2>Ask EMY is the friendly doorway into EMY.</h2>
          <p>It is not just a chatbot button. It is the AI assistant that helps the customer ask for what they need, understand what EMY knows, and move toward the right result with less friction.</p>
          <div class="cta-row">
            <a class="cta primary" href="ask-emy.html">Try Ask EMY</a>
            <a class="cta" href="index.html">Back to EMY</a>
          </div>
        </div>
      </section>
    </main>
    <footer>Ask EMY is part of the EMY customer experience and will connect more deeply to EMY data as the backend grows.</footer>
  </body>
</html>`;
}

function askEmyAboutCompactPageTemplate() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>EMY | About Ask EMY</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
      :root {
        --navy: #001b47;
        --orange: #ff6a00;
        --muted: #68748c;
        --line: rgba(0, 27, 71, .09);
        --cream: #fbfaf8;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        color: var(--navy);
        background: var(--cream);
      }
      a { color: inherit; text-decoration: none; }
      .topbar {
        position: sticky;
        top: 0;
        z-index: 20;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
        padding: 14px clamp(18px, 5vw, 44px);
        border-bottom: 1px solid var(--line);
        background: rgba(251,250,248,.92);
        backdrop-filter: blur(16px);
      }
      .brand { display: inline-flex; align-items: center; }
      .brand img { width: 118px; height: auto; display: block; }
      .nav { display: flex; align-items: center; justify-content: flex-end; gap: 9px; flex-wrap: wrap; }
      .nav a {
        display: inline-flex;
        min-height: 40px;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        padding: 0 15px;
        font-size: 14px;
        font-weight: 800;
        color: rgba(0,27,71,.72);
        transition: transform .18s ease, background .18s ease, color .18s ease;
      }
      .nav a:hover { transform: translateY(-1px); background: #fff3ea; color: var(--orange); }
      .nav .primary { background: var(--navy); color: #fff; box-shadow: 0 12px 28px rgba(0,27,71,.14); }
      .nav .primary:hover { background: var(--orange); color: #fff; }
      main {
        width: min(100%, 1040px);
        margin: 0 auto;
        padding: 28px clamp(16px, 4vw, 34px) 44px;
      }
      .intro {
        display: grid;
        grid-template-columns: minmax(0, .95fr) minmax(330px, .78fr);
        gap: 18px;
        align-items: stretch;
      }
      .hero-copy,
      .assistant-card,
      .definition,
      .help-card,
      .panel {
        border: 1px solid var(--line);
        background: rgba(255,255,255,.9);
        box-shadow: 0 18px 44px rgba(0,27,71,.07);
      }
      .hero-copy {
        border-radius: 28px;
        padding: clamp(24px, 4vw, 34px);
      }
      .kicker {
        display: inline-flex;
        align-items: center;
        border: 1px solid rgba(255,106,0,.25);
        border-radius: 999px;
        background: #fff;
        padding: 7px 11px;
        color: #bf4c00;
        font-size: 11px;
        font-weight: 900;
        letter-spacing: .08em;
        text-transform: uppercase;
      }
      h1 {
        max-width: 620px;
        margin: 16px 0 0;
        font-size: clamp(32px, 4.3vw, 46px);
        line-height: 1.04;
        letter-spacing: 0;
        font-weight: 900;
      }
      .lead {
        max-width: 560px;
        margin: 16px 0 0;
        color: var(--muted);
        font-size: 16px;
        font-weight: 700;
        line-height: 1.62;
      }
      .cta-row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 22px; }
      .cta {
        display: inline-flex;
        min-height: 46px;
        align-items: center;
        justify-content: center;
        border-radius: 14px;
        border: 1px solid var(--line);
        background: #fff;
        padding: 0 18px;
        color: var(--navy);
        font-size: 14px;
        font-weight: 900;
        box-shadow: 0 12px 28px rgba(0,27,71,.06);
        transition: transform .18s ease, background .18s ease;
      }
      .cta:hover { transform: translateY(-1px); background: #fff7f0; }
      .cta.primary { border-color: transparent; background: var(--orange); color: #fff; box-shadow: 0 14px 34px rgba(255,106,0,.22); }
      .assistant-card {
        display: flex;
        min-height: 100%;
        flex-direction: column;
        border-radius: 28px;
        padding: 20px;
      }
      .assistant-head { display: flex; align-items: center; gap: 14px; }
      .bag {
        display: inline-flex;
        width: 64px;
        height: 64px;
        align-items: center;
        justify-content: center;
        filter: drop-shadow(0 14px 18px rgba(255,106,0,.22));
      }
      .assistant-head strong { display: block; font-size: 22px; line-height: 1; }
      .assistant-head span { display: block; margin-top: 5px; color: var(--muted); font-size: 13px; font-weight: 800; }
      .chat { display: grid; gap: 10px; margin-top: 18px; }
      .bubble {
        width: fit-content;
        max-width: 92%;
        border-radius: 17px;
        padding: 11px 13px;
        font-size: 13px;
        font-weight: 800;
        line-height: 1.45;
      }
      .bubble.user { justify-self: end; background: var(--navy); color: #fff; border-bottom-right-radius: 7px; }
      .bubble.ai { border: 1px solid rgba(255,106,0,.18); background: #fff3ea; color: var(--navy); border-bottom-left-radius: 7px; }
      .chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: auto; padding-top: 18px; }
      .chips span {
        display: inline-flex;
        border-radius: 999px;
        background: #f4f6fa;
        padding: 7px 10px;
        color: rgba(0,27,71,.72);
        font-size: 12px;
        font-weight: 900;
      }
      .definition {
        margin-top: 18px;
        border-radius: 24px;
        padding: 22px;
      }
      .definition strong { display: block; font-size: 18px; }
      .definition p { margin: 10px 0 0; color: var(--muted); font-size: 15px; font-weight: 750; line-height: 1.6; }
      .section { margin-top: 22px; }
      .section-title {
        display: flex;
        align-items: end;
        justify-content: space-between;
        gap: 14px;
        margin-bottom: 12px;
      }
      .section-title h2 { margin: 0; font-size: 25px; line-height: 1.12; font-weight: 900; }
      .section-title p { max-width: 460px; margin: 0; color: var(--muted); font-size: 14px; font-weight: 700; line-height: 1.5; }
      .help-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
      .help-card {
        min-height: 170px;
        border-radius: 18px;
        padding: 16px;
      }
      .help-card:nth-child(2) { background: #f7fbff; }
      .help-card:nth-child(3) { background: #fff8f1; }
      .help-card b {
        display: inline-flex;
        width: 32px;
        height: 32px;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
        background: var(--orange);
        color: #fff;
        font-size: 12px;
        font-weight: 900;
      }
      .help-card h3 { margin: 14px 0 0; font-size: 17px; line-height: 1.22; }
      .help-card p { margin: 8px 0 0; color: var(--muted); font-size: 13px; font-weight: 700; line-height: 1.5; }
      .flow { display: grid; grid-template-columns: 1.05fr .95fr; gap: 14px; }
      .panel {
        border-radius: 22px;
        padding: 20px;
      }
      .panel h2 { margin: 0; font-size: 24px; line-height: 1.1; }
      .panel p { margin: 10px 0 0; color: var(--muted); font-size: 14px; font-weight: 700; line-height: 1.6; }
      .steps { display: grid; gap: 10px; margin-top: 16px; }
      .step {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 12px;
        align-items: start;
        border-top: 1px solid var(--line);
        padding-top: 12px;
      }
      .step span:first-child {
        display: inline-flex;
        width: 30px;
        height: 30px;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: #fff0e4;
        color: #d65300;
        font-size: 12px;
        font-weight: 900;
      }
      .step strong { display: block; font-size: 14px; }
      .step small { display: block; margin-top: 4px; color: var(--muted); font-size: 12px; font-weight: 750; line-height: 1.45; }
      .callout { background: var(--navy); color: #fff; }
      .callout p { color: rgba(255,255,255,.74); }
      .callout .cta { margin-top: 18px; border: 0; box-shadow: none; }
      footer {
        width: min(100%, 1040px);
        margin: 0 auto;
        border-top: 1px solid var(--line);
        padding: 22px clamp(16px, 4vw, 34px) 32px;
        color: var(--muted);
        font-size: 13px;
        font-weight: 700;
        text-align: center;
      }
      @media (max-width: 900px) {
        .intro, .flow { grid-template-columns: 1fr; }
        .help-grid { grid-template-columns: repeat(2, 1fr); }
      }
      @media (max-width: 640px) {
        .topbar { align-items: flex-start; flex-direction: column; padding-bottom: 12px; }
        .nav { width: 100%; justify-content: flex-start; }
        .nav a { min-height: 36px; padding: 0 11px; font-size: 12px; }
        main { padding-top: 20px; }
        .help-grid { grid-template-columns: 1fr; }
        .section-title { align-items: start; flex-direction: column; }
        h1 { font-size: 32px; }
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
        <a href="emy-signin.html">Sign In</a>
        <a class="primary" href="emy-signup.html">Sign up</a>
      </nav>
    </header>
    <main>
      <section class="intro" aria-label="About Ask EMY">
        <div class="hero-copy">
          <span class="kicker">EMY AI project assistant</span>
          <h1>Ask EMY is the chat assistant for finding things on EMY.</h1>
          <p class="lead">It supports customers through simple conversation, helping them find nearby businesses, products, posts, clips, and the right next step inside EMY.</p>
          <div class="cta-row">
            <a class="cta primary" href="ask-emy.html">Open Ask EMY</a>
            <a class="cta" href="index.html">Back to EMY</a>
          </div>
        </div>
        <aside class="assistant-card">
          <div class="assistant-head">
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
            <div>
              <strong>Ask EMY</strong>
              <span>AI support through chat</span>
            </div>
          </div>
          <div class="chat">
            <div class="bubble user">I need something nearby.</div>
            <div class="bubble ai">I can help you find businesses, products, posts, and clips around your saved location.</div>
            <div class="bubble user">Can you guide me?</div>
            <div class="bubble ai">Yes. I can suggest options and take you to the right EMY page.</div>
          </div>
          <div class="chips">
            <span>Nearby</span>
            <span>Products</span>
            <span>Posts</span>
            <span>Clips</span>
            <span>Customer feed</span>
          </div>
        </aside>
      </section>

      <section class="definition">
        <strong>What it means</strong>
        <p>Ask EMY is not a separate app. It is the AI assistant inside EMY that listens to what the customer wants, understands the context, and helps them move toward a useful result.</p>
      </section>

      <section class="section">
        <div class="section-title">
          <h2>What it helps with</h2>
          <p>Small, useful jobs that make the EMY experience easier to navigate.</p>
        </div>
        <div class="help-grid">
          <article class="help-card">
            <b>01</b>
            <h3>Find faster</h3>
            <p>Customers can ask in natural language instead of guessing which filter or page to use.</p>
          </article>
          <article class="help-card">
            <b>02</b>
            <h3>Use location</h3>
            <p>It can support nearby discovery from saved location and distance settings.</p>
          </article>
          <article class="help-card">
            <b>03</b>
            <h3>Show activity</h3>
            <p>It can surface fresh products, posts, clips, and updates from businesses.</p>
          </article>
          <article class="help-card">
            <b>04</b>
            <h3>Guide action</h3>
            <p>When the answer is not enough, it can point customers to the right profile or result page.</p>
          </article>
        </div>
      </section>

      <section class="section">
        <div class="flow">
          <article class="panel">
            <h2>How it works</h2>
            <p>The customer asks, Ask EMY interprets, then EMY can show the most relevant place to continue.</p>
            <div class="steps">
              <div class="step"><span>1</span><span><strong>Ask</strong><small>The customer types what they need.</small></span></div>
              <div class="step"><span>2</span><span><strong>Understand</strong><small>Ask EMY checks intent, location, and useful context.</small></span></div>
              <div class="step"><span>3</span><span><strong>Guide</strong><small>The assistant answers or sends the customer to the right EMY area.</small></span></div>
            </div>
          </article>
          <article class="panel callout">
            <h2>Why it matters</h2>
            <p>Ask EMY gives the platform a friendly assistant layer. It reduces searching, supports customers, and helps business content become easier to discover.</p>
            <a class="cta" href="ask-emy.html">Try Ask EMY</a>
          </article>
        </div>
      </section>
    </main>
    <footer>Ask EMY is EMY's AI project assistant for chat-based support and discovery.</footer>
  </body>
</html>`;
}


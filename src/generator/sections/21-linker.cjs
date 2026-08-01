/* EMY generator section: 21-linker.cjs (source lines 30279-30616) */
const linker = String.raw`
function __targetForEMYLabel(label) {
  const text = String(label || '').trim().toLowerCase();
  if (!text) return null;
  if (text === 'home') return 'index.html';
  if (text === 'about' || text === 'about us') return 'about.html';
  if (text === 'business' || text === 'for businesses' || text.includes('businesses: find out more')) return 'business.html';
  if (text === 'ask emy' || text === 'askemy') return 'ask-emy.html';
  if (text === 'faqs' || text === 'faq') return 'faqs.html';
  if (text === 'contact' || text === 'contact support') return 'contact.html';
  if (text === 'privacy policy' || text === 'privacy') return 'privacy.html';
  if (text === 'terms of use' || text === 'terms') return 'terms.html';
  return null;
}

function __showEMYSignupRoles(mode) {
  const existing = document.getElementById('emy-signup-role-page');
  if (existing) existing.remove();
  const oldComingSoon = document.getElementById('emy-coming-soon-modal');
  if (oldComingSoon) oldComingSoon.remove();
  const flow = String(mode || 'signup').trim().toLowerCase();
  const isSignInFlow = flow === 'signin' || flow === 'sign in' || flow === 'login' || flow === 'log in';
  const roleTitle = isSignInFlow ? 'Sign in as' : 'Select your role';
  const roleIntro = isSignInFlow
    ? 'Choose the EMY account type you want to access.'
    : 'Choose how you want to join EMY.';

  const userIcon =
    '<svg width="106" height="106" viewBox="0 0 120 120" fill="none" aria-hidden="true">' +
      '<circle cx="60" cy="60" r="43" stroke="#001B47" stroke-width="5"/>' +
      '<circle cx="60" cy="48" r="17" stroke="#001B47" stroke-width="5"/>' +
      '<path d="M29 92c7.5-19 20-28 31-28s23.5 9 31 28" stroke="#001B47" stroke-width="5" stroke-linecap="round"/>' +
    '</svg>';

  const businessIcon =
    '<svg width="106" height="106" viewBox="0 0 120 120" fill="none" aria-hidden="true">' +
      '<rect x="20" y="42" width="80" height="50" rx="6" stroke="#001B47" stroke-width="5"/>' +
      '<path d="M45 42v-9c0-4 3-7 7-7h16c4 0 7 3 7 7v9" stroke="#001B47" stroke-width="5" stroke-linecap="round"/>' +
      '<path d="M20 58c20 12 60 12 80 0" stroke="#001B47" stroke-width="5" stroke-linecap="round"/>' +
      '<path d="M54 66h12" stroke="#001B47" stroke-width="5" stroke-linecap="round"/>' +
    '</svg>';

  const roleDescriptions = isSignInFlow
    ? {
        Customer: 'Sign in to your customer account.',
        Business: 'Sign in to your business account.'
      }
    : {
        Customer: 'Find services, shops, offers, and places near you.',
        Business: 'Offer services and connect with local customers.'
      };
  const roleDescription = (role) => roleDescriptions[role] || '';

  const roleCard = (role, icon) =>
    '<button type="button" title="' + roleDescription(role) + '" aria-label="' + role + ': ' + roleDescription(role) + '" data-emy-role-card="' + role + '" class="emy-role-card group flex cursor-pointer flex-col items-center justify-center bg-white text-center text-[#171435] transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl focus-visible:outline focus-visible:outline-3 focus-visible:outline-orange-400" style="border:1px solid rgba(0,27,71,0.10);border-radius:18px;box-shadow:0 12px 24px rgba(0,27,71,0.08);">' +
      '<span class="emy-role-icon flex items-center justify-center text-[#001B47]">' + icon + '</span>' +
      '<span class="emy-role-label mt-4 text-xl font-semibold leading-tight">' + role + '</span>' +
      '<span class="emy-role-desc">' + roleDescription(role) + '</span>' +
    '</button>';

  const overlay = document.createElement('div');
  overlay.id = 'emy-signup-role-page';
  overlay.className = 'fixed inset-0 z-[140] overflow-hidden bg-[#fff8ef] text-[#001B47]';
  overlay.style.fontFamily = "'Inter', sans-serif";
  overlay.innerHTML =
    '<style>' +
      '#emy-signup-role-page{background:#fff8ef;background-image:radial-gradient(circle at 76% 14%,rgba(255,106,0,.13),transparent 23rem),radial-gradient(circle at 16% 86%,rgba(0,27,71,.07),transparent 19rem),linear-gradient(180deg,#fff8ef 0%,#fffdf8 54%,#fff7ed 100%);}' +
      '.emy-role-card{position:relative;overflow:hidden;width:min(62vw,calc((100vh - 170px)/2),222px);aspect-ratio:1/1;padding:18px 18px 16px;}' +
      '.emy-role-card::after{content:"";position:absolute;left:50%;bottom:12px;width:40px;height:3px;border-radius:999px;background:#ff6a00;opacity:.42;transform:translateX(-50%);transition:opacity .22s ease,width .22s ease;}' +
      '.emy-role-icon svg{width:54px;height:54px;}' +
      '.emy-role-desc{display:block;max-width:170px;margin-top:7px;font-size:12px;line-height:1.32;font-weight:400;color:rgba(0,27,71,.62);transition:color .22s ease;}' +
      '.emy-role-card:hover::after,.emy-role-card:focus-visible::after{width:56px;opacity:1;}' +
      '.emy-role-card:hover .emy-role-desc,.emy-role-card:focus-visible .emy-role-desc{color:rgba(0,27,71,.82);}' +
      '@media (min-width:768px){.emy-role-card{width:min(calc((100vh - 170px)/2),210px);}.emy-role-icon svg{width:52px;height:52px;}}' +
      '@media (max-width:480px){.emy-role-card{width:min(64vw,calc((100vh - 160px)/2),214px);padding:16px 16px 15px;}.emy-role-title{font-size:2rem!important;}.emy-role-label{margin-top:12px!important;font-size:1.12rem!important;}.emy-role-desc{max-width:160px;font-size:11.5px;line-height:1.3;}.emy-role-icon svg{width:48px;height:48px;}}' +
    '</style>' +
    '<div class="pointer-events-none absolute inset-0 overflow-hidden">' +
      '<svg class="absolute right-2 top-3 h-36 w-36 text-orange-200/50 md:right-[18%] md:h-48 md:w-48" viewBox="0 0 180 180" fill="none" aria-hidden="true"><path d="M20 10l65 135L160 5" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      '<svg class="absolute -bottom-8 -left-10 h-40 w-60 text-orange-200/55 md:h-48 md:w-72" viewBox="0 0 360 240" fill="none" aria-hidden="true"><path d="M0 210L70 55l66 155 45-88 60 88 42-58 56 58" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
    '</div>' +
    '<button type="button" data-emy-close-signup-role class="absolute right-5 top-5 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white text-xl font-semibold text-[#001B47] shadow-lg shadow-[#001B47]/10 hover:bg-orange-50" aria-label="Close role selection">×</button>' +
    '<main class="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center px-5 pb-7 pt-7 md:pt-8">' +
      '<h1 class="emy-role-title text-center text-3xl font-semibold leading-tight text-[#171435] md:text-4xl">' + roleTitle + '</h1>' +
      '<p class="mt-3 max-w-sm text-center text-sm font-medium leading-6 text-[#001B47]/60">' + roleIntro + '</p>' +
      '<div class="mt-6 flex w-full flex-col items-center gap-5 md:mt-7 md:gap-5">' +
        roleCard('Customer', userIcon) +
        roleCard('Business', businessIcon) +
      '</div>' +
    '</main>';

  overlay.querySelector('[data-emy-close-signup-role]').addEventListener('click', () => overlay.remove());
  overlay.querySelectorAll('[data-emy-role-card]').forEach((button) => {
    button.addEventListener('click', () => {
      const role = button.dataset.emyRoleCard || 'Account';
      if (isSignInFlow) {
        window.location.href = 'emy-signin.html?role=' + encodeURIComponent(role.toLowerCase());
        return;
      }
      window.location.href = 'emy-signup.html?role=' + encodeURIComponent(role.toLowerCase());
    });
  });
  document.body.appendChild(overlay);
  document.documentElement.removeAttribute('data-emy-auth-pending');
}

function __showEMYComingSoon(action) {
  const existing = document.getElementById('emy-coming-soon-modal');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'emy-coming-soon-modal';
  overlay.className = 'fixed inset-0 z-[120] flex items-center justify-center bg-[#001B47]/75 px-4 backdrop-blur-md';
  overlay.innerHTML =
    '<div class="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/95 p-7 text-center text-[#001B47] shadow-2xl backdrop-blur-2xl md:p-9">' +
      '<div class="pointer-events-none absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_18%_12%,rgba(249,115,22,0.20),transparent_34%),radial-gradient(circle_at_90%_90%,rgba(0,27,71,0.12),transparent_36%)]"></div>' +
      '<div class="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-orange-200/50 blur-2xl"></div>' +
      '<div class="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-[#001B47]/10 blur-2xl"></div>' +
      '<button type="button" data-emy-close-coming-soon class="absolute right-5 top-5 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl bg-white text-[#001B47] shadow-lg shadow-[#001B47]/10 ring-1 ring-orange-100 transition hover:bg-orange-100" aria-label="Close coming soon modal">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>' +
      '</button>' +
      '<div class="relative z-10 flex justify-center"><div class="flex items-center gap-3"><img src="https://iqlance-demo.com/design/EMY-Web/img/logo-landing.png" alt="EMY" class="h-12 w-auto object-contain" /><span class="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-orange-600">Beta</span></div></div>' +
      '<h3 class="relative z-10 mt-5 text-3xl font-black leading-tight text-[#001B47]">' + action + ' is coming soon</h3>' +
      '<p class="relative z-10 mx-auto mt-4 max-w-sm text-base font-semibold leading-7 text-[#001B47]/65">We are still polishing this experience so it feels smooth, secure, and ready for everyone. Thank you for trying EMY while we build the next version.</p>' +
      '<div class="relative z-10 mt-8 rounded-3xl border border-orange-100 bg-[#fff8ef] p-4 text-left">' +
        '<p class="text-sm font-black text-[#001B47]">What is next?</p>' +
        '<p class="mt-1 text-sm leading-6 text-[#001B47]/60">Account access, business onboarding, and profile tools will be available soon.</p>' +
      '</div>' +
    '</div>';

  const close = () => overlay.remove();
  overlay.addEventListener('click', close);
  overlay.querySelector('div').addEventListener('click', (event) => event.stopPropagation());
  overlay.querySelector('[data-emy-close-coming-soon]').addEventListener('click', close);
  document.body.appendChild(overlay);
}

function __linkEMYPages() {
  const pathLinks = {
    '/': 'index.html',
    '/about': 'about.html',
    '/business': 'business.html',
    '/ask-emy': 'ask-emy.html',
    '/contact': 'contact.html',
    '/faqs': 'faqs.html',
    '/privacy': 'privacy.html',
    '/terms': 'terms.html',
    '/sign-in': '#login',
    '/sign-up': '#signup'
  };

  document.querySelectorAll('header').forEach((header) => {
    if (header.dataset.emyStandardized === 'true') return;
    header.dataset.emyStandardized = 'true';

    const navItems = [
      ['Home', 'index.html'],
      ['About', 'about.html'],
      ['Business', 'business.html'],
      ['Ask EMY', 'ask-emy.html'],
      ['Contact', 'contact.html'],
      ['FAQs', 'faqs.html'],
      ['Admin', 'emy-admin-backend.html'],
      ['Sign In', '#login'],
      ['Sign up', '#signup']
    ];

    const linkClass = 'rounded-full px-5 py-2 text-sm font-bold text-[#001B47] transition hover:bg-orange-50 hover:text-orange-600';
    const askClass = 'rounded-full border border-orange-200 bg-orange-50 px-5 py-2 text-sm font-black text-orange-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-orange-500 hover:text-white hover:shadow-lg hover:shadow-orange-500/20';
    const loginClass = 'rounded-full border border-[#001B47]/10 bg-white/80 px-6 py-2 text-sm font-bold text-[#001B47] shadow-sm backdrop-blur transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600';
    const signupClass = 'rounded-full bg-orange-500 px-6 py-2 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600';
    const mobileClass = 'block w-full rounded-xl px-4 py-3 text-left text-sm font-bold text-[#001B47] transition hover:bg-orange-50 hover:text-orange-600';
    const mobileSignupClass = 'block w-full rounded-xl bg-orange-500 px-4 py-3 text-left text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600';

    header.className = 'fixed left-0 right-0 top-0 z-50 border-b border-white/50 bg-white/90 backdrop-blur';
    const navHtml = navItems.map(([label, href]) => {
      const base = label === 'Ask EMY' ? askClass : label === 'Sign In' ? loginClass : label === 'Sign up' ? signupClass : linkClass;
      if (label === 'Sign In' || label === 'Sign up') {
        return '<button type="button" data-emy-coming-soon="' + label + '" class="' + base + '">' + label + '</button>';
      }
      return '<a href="' + href + '" class="' + base + '">' + label + '</a>';
    }).join('');
    const mobileNavHtml = navItems.map(([label, href]) => {
      const base = label === 'Sign up' ? mobileSignupClass : label === 'Ask EMY' ? mobileSignupClass : mobileClass;
      if (label === 'Sign In' || label === 'Sign up') {
        return '<button type="button" data-emy-coming-soon="' + label + '" class="' + base + '">' + label + '</button>';
      }
      return '<a href="' + href + '" class="' + base + '">' + label + '</a>';
    }).join('');
    header.innerHTML =
      '<div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">' +
        '<a href="index.html" aria-label="Go to homepage" class="flex items-center gap-3">' +
          '<img src="https://iqlance-demo.com/design/EMY-Web/img/logo-landing.png" alt="EMY" class="h-12 w-auto object-contain" />' +
          '<span class="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-orange-600">Beta</span>' +
        '</a>' +
        '<nav class="hidden items-center gap-3 sm:flex" aria-label="Main navigation" data-emy-standard-nav="true">' +
          navHtml +
        '</nav>' +
        '<button type="button" data-emy-menu-toggle class="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#001B47]/10 bg-white text-[#001B47] shadow-sm sm:hidden" aria-expanded="false" aria-label="Open menu">' +
          '<span class="grid gap-1.5"><span class="block h-0.5 w-5 rounded-full bg-current"></span><span class="block h-0.5 w-5 rounded-full bg-current"></span><span class="block h-0.5 w-5 rounded-full bg-current"></span></span>' +
        '</button>' +
      '</div>' +
      '<div data-emy-mobile-menu class="hidden border-t border-orange-100 bg-white/95 px-4 pb-4 shadow-xl sm:hidden">' +
        '<div class="mx-auto grid max-w-7xl gap-2 pt-3">' +
          mobileNavHtml +
        '</div>' +
      '</div>';
  });

  document.querySelectorAll('a').forEach((anchor) => {
    const href = anchor.getAttribute('href') || '';
    if (pathLinks[href]) {
      anchor.setAttribute('href', pathLinks[href]);
      return;
    }
    if (href === '#' || href === '') {
      const target = __targetForEMYLabel(anchor.textContent);
      if (target) anchor.setAttribute('href', target);
    }
  });

  document.querySelectorAll('[data-emy-coming-soon]').forEach((button) => {
    if (button.dataset.emyComingSoonBound === 'true') return;
    button.dataset.emyComingSoonBound = 'true';
    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (event.stopImmediatePropagation) event.stopImmediatePropagation();
      const menu = document.querySelector('[data-emy-mobile-menu]');
      const menuButton = document.querySelector('[data-emy-menu-toggle]');
      if (menu) menu.classList.add('hidden');
      if (menuButton) menuButton.setAttribute('aria-expanded', 'false');
      const action = button.dataset.emyComingSoon || 'This feature';
      if (String(action).trim().toLowerCase() === 'sign up') {
        __showEMYSignupRoles('signup');
        return;
      }
      if (String(action).trim().toLowerCase() === 'sign in' || String(action).trim().toLowerCase() === 'log in') {
        __showEMYSignupRoles('signin');
        return;
      }
      __showEMYComingSoon(action);
    }, true);
  });

  document.querySelectorAll('[data-emy-menu-toggle]').forEach((button) => {
    if (button.dataset.emyMenuBound === 'true') return;
    button.dataset.emyMenuBound = 'true';
    button.addEventListener('click', () => {
      const menu = document.querySelector('[data-emy-mobile-menu]');
      if (!menu) return;
      const isOpen = menu.classList.toggle('hidden') === false;
      button.setAttribute('aria-expanded', String(isOpen));
    });
  });

  document.querySelectorAll('[data-emy-mobile-menu] a, [data-emy-mobile-menu] button').forEach((item) => {
    if (item.dataset.emyMenuCloseBound === 'true') return;
    item.dataset.emyMenuCloseBound = 'true';
    item.addEventListener('click', () => {
      const menu = document.querySelector('[data-emy-mobile-menu]');
      const button = document.querySelector('[data-emy-menu-toggle]');
      if (menu) menu.classList.add('hidden');
      if (button) button.setAttribute('aria-expanded', 'false');
    });
  });

  document.querySelectorAll('header nav').forEach((nav) => {
    const desired = [
      ['Home', 'index.html'],
      ['About', 'about.html'],
      ['Business', 'business.html'],
      ['Ask EMY', 'ask-emy.html'],
      ['Contact', 'contact.html'],
      ['FAQs', 'faqs.html'],
      ['Admin', 'emy-admin-backend.html']
    ];
    const existing = Array.from(nav.querySelectorAll('a,button')).map((item) => item.textContent.trim().toLowerCase());
    const loginItem = Array.from(nav.children).find((item) => item.textContent.trim().toLowerCase() === 'sign in' || item.textContent.trim().toLowerCase() === 'log in');
    desired.forEach(([label, href]) => {
      if (existing.includes(label.toLowerCase())) return;
      const link = document.createElement('a');
      link.href = href;
      link.textContent = label;
      link.className = 'cursor-pointer rounded-full px-5 py-2 text-sm font-bold text-[#001B47] transition hover:bg-orange-50 hover:text-orange-600';
      nav.insertBefore(link, loginItem || null);
      existing.push(label.toLowerCase());
    });
  });

  document.querySelectorAll('button').forEach((button) => {
    if (button.dataset.emyLinked === 'true') return;
    if (button.dataset.emyComingSoon) return;
    const text = String(button.textContent || '').trim().toLowerCase();
    if (text === 'sign up') {
      button.dataset.emyLinked = 'true';
      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.stopImmediatePropagation) event.stopImmediatePropagation();
        __showEMYSignupRoles('signup');
      }, true);
      return;
    }
    if (text === 'sign in' || text === 'log in') {
      button.dataset.emyLinked = 'true';
      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.stopImmediatePropagation) event.stopImmediatePropagation();
        __showEMYSignupRoles('signin');
      }, true);
      return;
    }
    let target = text.includes('businesses: find out more') ? 'business.html' : null;
    if (!target) return;
    button.dataset.emyLinked = 'true';
    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (event.stopImmediatePropagation) event.stopImmediatePropagation();
      window.location.href = target;
    }, true);
  });

  if (!window.__emyAuthDeepLinkHandled) {
    const params = new URLSearchParams(window.location.search || '');
    const authMode = String(params.get('emyAuth') || '').trim().toLowerCase();
    if (authMode === 'signup' || authMode === 'sign-up') {
      window.__emyAuthDeepLinkHandled = true;
      __showEMYSignupRoles('signup');
    } else if (authMode === 'signin' || authMode === 'sign-in' || authMode === 'login') {
      window.__emyAuthDeepLinkHandled = true;
      __showEMYSignupRoles('signin');
    } else if (params.has('emyAuth')) {
      document.documentElement.removeAttribute('data-emy-auth-pending');
    }
  }
}
`;


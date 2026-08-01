'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', '..');
const businessRuntimePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-business-profile-page.js');
const customerRuntimePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-customer-profile-page.js');
const customerHtmlPath = path.join(root, 'linked-pages', 'restore-may20', 'emy-customer-profile.html');
const businessRuntime = fs.readFileSync(businessRuntimePath, 'utf8');
const customerRuntime = fs.readFileSync(customerRuntimePath, 'utf8');
const customerHtml = fs.readFileSync(customerHtmlPath, 'utf8');

const businessMarkers = [
  'function clearPublicCustomerProfilePreviewContext()',
  '"emySelectedCustomerProfileKey"',
  '"emySelectedCustomerProfilePhotoSource"',
  'sessionStorage.setItem("emyCustomerProfileFullView", "1");',
  'sessionStorage.setItem("emyBusinessCustomerProfileView", "1");',
  'if (nav === "profile") return "emy-customer-profile.html?view=customer";',
  'if (nav === "profile") clearPublicCustomerProfilePreviewContext();',
  'window.location.href = "emy-customer-profile.html?customer=" + encodeURIComponent(target) + "&from=business";',
];

const customerMarkers = [
  'function isFullCustomerProfileRoute()',
  'function isBusinessCustomerProfileRoute()',
  'function normaliseCustomerProfileStartupRoute()',
  'url.searchParams.delete("customer");',
  'url.searchParams.set("view", "customer");',
  'url.hash = "";',
  'normaliseCustomerProfileStartupRoute();',
  'if (isFullCustomerProfileRoute()) return null;',
  'if (isBusinessCustomerProfileRoute() && !window.location.hash)',
  'const profileBusinessBottomNavButtons = Array.from(document.querySelectorAll("[data-business-nav]"));',
  'const profileBusinessRouteTopbar = document.querySelector(".business-app-header[data-business-shell]");',
  'const profileBusinessRouteName = document.querySelector("[data-business-top-name]");',
  'const profileBusinessRouteNotificationButton = document.querySelector("[data-business-top-notifications]");',
  'function businessShellNavFromElement(target)',
  'function openBusinessShellRoute(nav)',
  'if (value === "customer") return "emy-customer-home.html";',
  'if (value === "search") return "emy-customer-search.html";',
  'switchButton.classList.add("is-switching");',
  'window.setTimeout(() => { window.location.href = profileBusinessRouteUrl(value); }, 560);',
  'function syncBusinessCustomerRouteChrome()',
  'function profileBusinessRouteUrl(nav)',
  'return "emy-business-profile.html?mode=" + encodeURIComponent(value === "home" ? "business" : value);',
  'window.emyPrepareAskMiniPanel = function (trigger, panel)',
  'const businessTrigger = !!(trigger && trigger.closest && trigger.closest(".business-app-header[data-business-shell]"));',
  'const mode = isBusinessCustomerProfileRoute() || businessTrigger ? "business" : "customer";',
  '<span class="ask-mini-kicker">Business support</span>',
  'function readBusinessRouteNotifications()',
  'function markBusinessRouteNotificationsSeen()',
  'function renderBusinessRouteNotifications()',
  'profileBusinessRouteNotificationButton.addEventListener("click"',
  'notificationPanel.dataset.notificationMode === "business"',
];

const customerHtmlMarkers = [
  'body.is-business-customer-profile-view .profile-public-preview .profile-view-head',
  'body.is-business-customer-profile-view [data-customer-profile-bottom-nav]',
  'data-business-shell',
  'data-business-top-name',
  'data-business-top-search',
  'data-business-switch-customer',
  'data-business-bottom-nav',
  'data-business-nav="customers"',
  'class="business-app-header"',
  'Open your customer home page.',
  'grid-template-columns:minmax(220px,.8fr) minmax(300px,1.2fr) minmax(330px,.9fr);',
  'grid-template-columns:minmax(14px, 1fr) 272px 22px minmax(0, min(calc(100vw - 660px), 1120px)) 22px 276px minmax(18px, 1fr);',
  'body.is-business-customer-profile-view .business-mode-switch > span:first-child { min-width:0; }',
  'left:auto;\n        right:3px;',
  'class="business-nav-tip" aria-hidden="true">Services</em>',
  'business-nav-services.is-active .business-nav-emy-mark',
  '@keyframes emyAskBagWave',
  'body.is-business-customer-profile-view .business-app-header[data-business-shell] .notification-btn .bell-body',
  'id="emyBusinessCustomerBellFill"',
  'class="bell-clapper"',
];

const forbiddenBusinessMarkers = [
  'if (nav === "profile") return "emy-customer-profile.html";',
  'window.location.href = "emy-customer-profile.html?customer=" + encodeURIComponent(target) + "#preview";',
];

const forbiddenCustomerMarkers = [
  'event.target.closest("[data-business-nav], [data-business-top-search], [data-business-top-notifications], [data-open-ask-mini], [data-business-switch-customer], [data-back]")',
];

const forbiddenCustomerHtmlMarkers = [
  'data-business-customer-profile-shell',
  'data-business-customer-profile-left-rail',
  'data-business-customer-profile-right-rail',
  'profile-business-bottom-nav',
  'profile-business-nav-item',
  'profile-business-account-topbar',
  'data-profile-business-route-topbar',
  'data-profile-business-route-bottom-nav',
  'data-profile-business-route-nav',
  'href="emy-admin-backend.html"',
];

const missingBusiness = businessMarkers.filter((marker) => !businessRuntime.includes(marker));
if (missingBusiness.length) {
  console.error('Public customer shell profile navigation is missing full-profile guards:', missingBusiness.join(', '));
  process.exit(1);
}

const missingCustomer = customerMarkers.filter((marker) => !customerRuntime.includes(marker));
if (missingCustomer.length) {
  console.error('Customer profile page can still inherit preview mode from customer-shell navigation:', missingCustomer.join(', '));
  process.exit(1);
}

const missingCustomerHtml = customerHtmlMarkers.filter((marker) => !customerHtml.includes(marker));
if (missingCustomerHtml.length) {
  console.error('Customer profile page is missing business-customer preview chrome guards:', missingCustomerHtml.join(', '));
  process.exit(1);
}

const forbiddenBusiness = forbiddenBusinessMarkers.filter((marker) => businessRuntime.includes(marker));
if (forbiddenBusiness.length) {
  console.error('Public customer shell still uses the ambiguous customer profile URL:', forbiddenBusiness.join(', '));
  process.exit(1);
}

const forbiddenCustomer = forbiddenCustomerMarkers.filter((marker) => customerRuntime.includes(marker));
if (forbiddenCustomer.length) {
  console.error('Business customer profile topbar still hijacks EMY or notification buttons:', forbiddenCustomer.join(', '));
  process.exit(1);
}

const forbiddenCustomerHtml = forbiddenCustomerHtmlMarkers.filter((marker) => customerHtml.includes(marker));
if (forbiddenCustomerHtml.length) {
  console.error('Customer profile page still generates business-side rail markup:', forbiddenCustomerHtml.join(', '));
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  publicCustomerShellProfileRoute: 'emy-customer-profile.html?view=customer',
  customerOwnedPreviewRouteStillSeparate: 'emy-customer-profile.html#preview',
  businessCustomerProfileRoute: 'emy-customer-profile.html?customer=...&from=business',
}, null, 2));

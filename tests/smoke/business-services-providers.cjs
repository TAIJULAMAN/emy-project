'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { JSDOM } = require('jsdom');

const root = path.join(__dirname, '..', '..');
const businessTemplatePath = path.join(root, 'src', 'generator', 'sections', '26-business-profile-template-parts.cjs');
const adminTemplatePath = path.join(root, 'src', 'generator', 'sections', '38-template-admin-backend.cjs');
const businessRuntimePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-business-profile-page.js');
const businessHtmlPath = path.join(root, 'linked-pages', 'restore-may20', 'emy-business-profile.html');
const adminHtmlPath = path.join(root, 'linked-pages', 'restore-may20', 'emy-admin-backend.html');

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function assertContains(label, text, needle) {
  if (!text.includes(needle)) {
    console.error(`${label}: missing ${needle}`);
    process.exit(1);
  }
}

const businessTemplate = read(businessTemplatePath);
const adminTemplate = read(adminTemplatePath);

[
  'data-business-service-results',
  'data-business-service-card',
  'activeBusinessServiceTitle',
  'function collectBusinessServiceProviders',
  'function renderBusinessServiceResults',
  'function businessServiceProviderFromRow',
  'providesServicesAnswer',
  'emyAdminServiceProfiles',
  'No businesses are listed for '
].forEach((marker) => assertContains('business services template', businessTemplate, marker));

[
  "['services','Services','EMY service provider profiles']",
  'function serviceProfileRows',
  'function saveServiceProfile',
  'data-service-profile-service',
  'data-action="save-service-profile"',
  'emyAdminServiceProfiles',
  "else if (active === 'services') root.innerHTML = services();"
].forEach((marker) => assertContains('admin services template', adminTemplate, marker));

if (fs.existsSync(businessRuntimePath)) {
  const runtime = read(businessRuntimePath);
  [
    'data-business-service-card',
    'function collectBusinessServiceProviders',
    'function renderBusinessServiceResults',
    'emyAdminServiceProfiles'
  ].forEach((marker) => assertContains('generated business runtime', runtime, marker));

  const start = runtime.indexOf('function businessServiceSlug');
  const end = runtime.indexOf('function businessChatStorageKey', start);
  if (start < 0 || end <= start) {
    console.error('generated business runtime: missing executable service helper block');
    process.exit(1);
  }
  const dom = new JSDOM('<div data-business-service-grid></div><div data-business-service-results hidden></div>');
  const storage = {
    emyAdminServiceProfiles: JSON.stringify([
      { businessName:'Admin Logistics', serviceTitle:'Logistics', category:'Direct access Services', status:'active', location:'London' }
    ]),
    emyBusinessProfileDraft: JSON.stringify({
      businessName:'Registered Logistics',
      providesServices:true,
      providesServicesAnswer:'Yes',
      emyService:'Logistics',
      emyServiceCategory:'Direct access Services',
      status:'approved'
    })
  };
  const context = {
    document: dom.window.document,
    localStorage: { getItem: (key) => Object.prototype.hasOwnProperty.call(storage, key) ? storage[key] : '' },
    encodeURIComponent,
    console
  };
  vm.runInNewContext(`
    const businessServiceGrid = document.querySelector('[data-business-service-grid]');
    const businessServiceResults = document.querySelector('[data-business-service-results]');
    let activeBusinessServiceTitle = 'Logistics';
    const emyServices = [
      { title:'Insights', category:'Insights into Customer Behaviour', image:'insights.png', description:'Insights' },
      { title:'Logistics', category:'Direct access Services', image:'logistics.png', description:'Logistics help' },
      { title:'Legal Support', category:'Direct access Services', image:'legal.png', description:'Legal help' }
    ];
    function escapeText(value) { return String(value || '').replace(/[&<>"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#039;' }[char])); }
    function readJson(key, fallback) { try { const parsed = JSON.parse(localStorage.getItem(key) || 'null'); return parsed && typeof parsed === 'object' ? parsed : fallback; } catch (error) { return fallback; } }
    function firstClean(values) { const list = Array.isArray(values) ? values : [values]; for (const value of list) { const text = String(value || '').trim(); if (text) return text; } return ''; }
    function businessProductText(value, fallback) { const text = String(value || '').replace(/\\s+/g, ' ').trim(); return text || (fallback || ''); }
    function normaliseBusinessKey(value) { return String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'profile'; }
    function businessCloudinaryMediaUrl() { return ''; }
    function serviceCategory(value) { const service = emyServices.find((item) => item.title === value); return service ? service.category : ''; }
    ${runtime.slice(start, end)}
    const logisticsProviders = collectBusinessServiceProviders({ title:'Logistics' });
    const legalProviders = collectBusinessServiceProviders({ title:'Legal Support' });
    if (logisticsProviders.length !== 2) throw new Error('Expected two Logistics providers, got ' + logisticsProviders.length);
    if (legalProviders.length !== 0) throw new Error('Legal Support should not receive Logistics providers');
    renderBusinessServices();
    if (businessServiceResults.hidden) throw new Error('Active service results should be visible');
    const resultText = businessServiceResults.textContent;
    if (!resultText.includes('Admin Logistics') || !resultText.includes('Registered Logistics')) throw new Error('Service results did not render both provider sources');
  `, context);
}

if (fs.existsSync(businessHtmlPath)) {
  assertContains('generated business html', read(businessHtmlPath), 'data-business-service-results');
}

if (fs.existsSync(adminHtmlPath)) {
  const adminHtml = read(adminHtmlPath);
  [
    'EMY service provider profiles',
    'data-service-profile-service',
    'data-action="save-service-profile"',
    'emyAdminServiceProfiles'
  ].forEach((marker) => assertContains('generated admin html', adminHtml, marker));
}

console.log(JSON.stringify({
  ok: true,
  page: 'emy-business-profile.html',
  admin: 'emy-admin-backend.html#services',
  serviceTilesOpenProviderLists: true,
  readsRegistrationServiceProviders: true,
  supportsBackendServiceProfiles: true
}, null, 2));

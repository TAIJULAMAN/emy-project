'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { JSDOM } = require('jsdom');

const root = path.join(__dirname, '..', '..');
const homeTemplatePath = path.join(root, 'src', 'generator', 'sections', '27-customer-home-template-parts.cjs');
const adminTemplatePath = path.join(root, 'src', 'generator', 'sections', '38-template-admin-backend.cjs');
const homeRuntimePath = path.join(root, 'linked-pages', 'restore-may20', 'assets', 'emy-customer-home-page.js');
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

const homeTemplate = read(homeTemplatePath);
const adminTemplate = read(adminTemplatePath);

[
  'data-home-banner-dots',
  'hero-banner-media-slide',
  'function homeBannerMediaItems',
  'function setHomeBannerSlide',
  'banner.mediaItems',
  'data-home-banner-slide',
  'emyAdminHomeBanner") applyHomeBannerSettings'
].forEach((marker) => assertContains('customer home banner template', homeTemplate, marker));

[
  'mediaItems:[]',
  'function bannerMediaItems',
  'function bannerMediaListMarkup',
  'multiple />',
  'data-banner-remove-media',
  'Promise.all(reads)',
  'concat(mediaItems).slice(0, 12)'
].forEach((marker) => assertContains('admin banner template', adminTemplate, marker));

const start = homeTemplate.indexOf('let homeBannerSlideIndex = 0;');
const end = homeTemplate.indexOf('function normaliseBusinessCrop', start);
if (start < 0 || end <= start) {
  console.error('customer home banner template: missing executable banner helper block');
  process.exit(1);
}

const dom = new JSDOM(`
  <section class="hero" data-home-banner>
    <div data-home-banner-media hidden></div>
    <span data-home-banner-kicker></span>
    <h1 data-home-banner-title></h1>
    <span data-home-banner-accent></span>
    <p data-home-banner-body></p>
    <div data-home-banner-tags></div>
  </section>
  <div data-home-banner-dots></div>
`, { url:'http://127.0.0.1:8767/restore-may20/emy-customer-home.html' });

dom.window.HTMLMediaElement.prototype.play = function () { return { catch() {} }; };
dom.window.HTMLMediaElement.prototype.pause = function () {};

const banner = {
  status:'active',
  kicker:'EMY banner',
  title:'Campaign',
  accent:'live now',
  body:'Images and videos',
  chips:'Images,Videos',
  mediaItems:[
    { src:'data:image/png;base64,AAA', type:'image', name:'image slide' },
    { src:'data:video/mp4;base64,BBB', type:'video', name:'video slide' }
  ]
};

const context = {
  window: dom.window,
  document: dom.window.document,
  localStorage: { getItem: (key) => key === 'emyAdminHomeBanner' ? JSON.stringify(banner) : '' },
  console
};

vm.runInNewContext(`
  const homeBanner = document.querySelector('[data-home-banner]');
  const homeBannerMedia = document.querySelector('[data-home-banner-media]');
  const homeBannerDots = document.querySelector('[data-home-banner-dots]');
  const homeBannerKicker = document.querySelector('[data-home-banner-kicker]');
  const homeBannerTitle = document.querySelector('[data-home-banner-title]');
  const homeBannerAccent = document.querySelector('[data-home-banner-accent]');
  const homeBannerBody = document.querySelector('[data-home-banner-body]');
  const homeBannerTags = document.querySelector('[data-home-banner-tags]');
  function readBusinessJson(key, fallback) {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : fallback;
    } catch (error) {
      return fallback;
    }
  }
  ${homeTemplate.slice(start, end)}
  applyHomeBannerSettings();
  const slides = document.querySelectorAll('[data-home-banner-slide]');
  if (slides.length !== 2) throw new Error('Expected two banner slides, got ' + slides.length);
  if (!slides[0].querySelector('img')) throw new Error('First banner slide should be an image');
  if (!slides[1].querySelector('video')) throw new Error('Second banner slide should be a video');
  if (homeBannerDots.querySelectorAll('span').length !== 2) throw new Error('Banner dots should match media items');
  setHomeBannerSlide(1);
  if (!slides[1].classList.contains('is-active')) throw new Error('Video slide should become active');
  stopHomeBannerCarousel();
`, context);

if (fs.existsSync(homeRuntimePath)) {
  const runtime = read(homeRuntimePath);
  [
    'function homeBannerMediaItems',
    'hero-banner-media-slide',
    'data-home-banner-slide',
    'emyAdminHomeBanner") applyHomeBannerSettings'
  ].forEach((marker) => assertContains('generated customer home runtime', runtime, marker));
}

if (fs.existsSync(adminHtmlPath)) {
  const adminHtml = read(adminHtmlPath);
  [
    'function bannerMediaItems',
    'data-banner-remove-media',
    'multiple />',
    'mediaItems:[]'
  ].forEach((marker) => assertContains('generated admin html', adminHtml, marker));
}

console.log(JSON.stringify({
  ok: true,
  customerHomeBannerMedia: true,
  backendMediaItems: true,
  supportsImages: true,
  supportsVideos: true,
  carouselDots: true
}, null, 2));

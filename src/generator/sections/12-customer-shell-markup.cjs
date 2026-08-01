/* EMY generator section: 12-customer-shell-markup.cjs (source lines 12333-13007) */
function customerTopbarMarkup(options = {}) {
  const avatarAttrs = options.avatarAttrs || 'data-avatar';
  const locationAttrs = options.locationAttrs || 'data-location';
  const locationLabelAttrs = options.locationLabelAttrs || 'data-location-label';
  const askAttrs = options.askAttrs || 'data-open-ask-mini aria-expanded="false"';
  const searchAttrs = options.searchAttrs || 'data-open-search';
  const notificationAttrs = options.notificationAttrs || 'data-notifications';
  const notificationCountAttrs = options.notificationCountAttrs || 'data-notification-count';
  const firstNameAttrs = options.firstNameAttrs || 'data-first-name';
  const hasBrand = !!options.brand;
  const brandHref = options.brandHref || 'index.html';
  const headerClass = options.headerClass || `topbar${hasBrand ? ' has-brand' : ''}`;
  const headerAttrs = options.headerAttrs ? ' ' + options.headerAttrs : '';
  const extraActionsMarkup = options.extraActionsMarkup || '';
  const brandMarkup = hasBrand ? `
          <a class="customer-topbar-brand" href="${brandHref}" aria-label="EMY home">
            <img src="https://iqlance-demo.com/design/EMY-Web/img/logo-landing.png" alt="EMY" />
            <span>BETA</span>
          </a>` : '';
  const headerMarkup = String.raw`
        <header class="${headerClass}"${headerAttrs}>
${brandMarkup}
          <button class="avatar" type="button" ${avatarAttrs} aria-label="Open customer profile">E</button>
          <div class="hello">
            <strong>Hello, <span ${firstNameAttrs}>EMY</span></strong>
            <a class="location-btn" href="#emy-location" ${locationAttrs} title="Current Location">
              <svg class="location-pin" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z" stroke="currentColor" stroke-linejoin="round"/><path d="M12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z" stroke="currentColor"/></svg>
              <span ${locationLabelAttrs}>Current Location</span>
              <svg class="location-chevron" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m7 10 5 5 5-5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
          </div>
          <button class="ask-mini-btn" type="button" ${askAttrs} aria-label="Open EMY">
            <span class="ask-mini-mark" aria-hidden="true">${askMiniLogoMarkup}</span>
            <span class="ask-mini-label">EMY</span>
          </button>
          <button class="icon-btn" type="button" ${searchAttrs} aria-label="Search EMY">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m21 21-4.3-4.3M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <button class="icon-btn notification-btn" type="button" ${notificationAttrs} aria-label="Notifications">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <defs>
                <linearGradient id="emyBellFill" x1="6" y1="4" x2="18" y2="18" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stop-color="#ffffff"/>
                  <stop offset=".54" stop-color="#ffffff" stop-opacity=".62"/>
                  <stop offset="1" stop-color="#e7edf5" stop-opacity=".86"/>
                </linearGradient>
                <linearGradient id="emyBellStroke" x1="5" y1="3" x2="19" y2="19" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stop-color="#001b47"/>
                  <stop offset=".62" stop-color="#001b47" stop-opacity=".86"/>
                  <stop offset="1" stop-color="#56637b"/>
                </linearGradient>
              </defs>
              <path class="bell-body" d="M17.8 9.3a5.8 5.8 0 0 0-11.6 0v2.4c0 1.42-.42 2.72-1.15 3.82L4.25 16.8h15.5l-.8-1.28a7.1 7.1 0 0 1-1.15-3.82V9.3Z" stroke-linecap="round" stroke-linejoin="round"/>
              <path class="bell-highlight" d="M8.1 9.25c.18-2.28 1.68-3.78 3.86-4" fill="none" stroke-linecap="round"/>
              <path class="bell-rim" d="M8.95 19.05h6.1" fill="none" stroke-linecap="round"/>
              <path class="bell-rim" d="M9.9 19.3a2.38 2.38 0 0 0 4.2 0" fill="none" stroke-linecap="round"/>
              <circle class="bell-clapper" cx="12" cy="3.65" r="1.15"/>
            </svg>
            <span class="notification-count" ${notificationCountAttrs} aria-label="0 notifications">0</span>
          </button>
${extraActionsMarkup}
        </header>`;
  if (options.includeAskPanel === false) return headerMarkup;
  return headerMarkup + String.raw`
        <section class="ask-mini-panel" data-ask-mini-panel aria-hidden="true">
          <div class="ask-mini-card" role="dialog" aria-label="EMY chat">
            <header class="ask-mini-head">
              <span class="ask-mini-brand" aria-hidden="true">${askMiniLogoMarkup}</span>
              <span class="ask-mini-title">
                <h2>EMY</h2>
                <p>Hi, I'm EMY.</p>
              </span>
              <button class="ask-mini-close" type="button" data-ask-mini-close aria-label="Close EMY">x</button>
            </header>
            <div class="ask-mini-scroll" data-ask-mini-messages aria-live="polite">
              <article class="ask-mini-message is-assistant">
                <span class="ask-mini-icon" aria-hidden="true">${askMiniLogoMarkup}</span>
                <div class="ask-mini-bubble">
                  <span class="ask-mini-kicker">Local discovery</span>
                  <strong>What are you looking for today?</strong>
                  <p>Ask for nearby shops, products, offers, services, events, or jobs.</p>
                  <div class="ask-mini-prompt-grid" aria-label="EMY suggestions">
                    <button class="ask-mini-prompt" type="button" data-ask-mini-prompt="Find shops near me"><b>Find shops</b><span>Nearby places to buy from.</span></button>
                    <button class="ask-mini-prompt" type="button" data-ask-mini-prompt="Show products I can buy nearby"><b>Products nearby</b><span>Items from local sellers.</span></button>
                    <button class="ask-mini-prompt" type="button" data-ask-mini-prompt="Find local services near me"><b>Local services</b><span>Businesses that can help.</span></button>
                    <button class="ask-mini-prompt" type="button" data-ask-mini-prompt="Find offers near me"><b>Find offers</b><span>Deals from nearby shops.</span></button>
                  </div>
                </div>
              </article>
            </div>
            <footer class="ask-mini-foot">
              <form class="ask-mini-form" data-ask-mini-form>
                <input class="ask-mini-input" data-ask-mini-input type="text" placeholder="Ask me..." autocomplete="off" />
                <button class="ask-mini-send" type="submit" aria-label="Send EMY message">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20 20 12 4 4l3.2 7.6L20 12 7.2 12.4 4 20Z"/></svg>
                </button>
              </form>
              <p class="ask-mini-disclaimer"><span class="ask-mini-mark" aria-hidden="true">${askMiniLogoMarkup}</span><span>AI can make mistakes, so double-check it.</span></p>
            </footer>
          </div>
        </section>`;
}

function customerBottomNavMarkup(options = {}) {
  const navClass = options.navClass || 'bottom-nav';
  const navAttrs = options.navAttrs || 'aria-label="Customer navigation"';
  const itemClass = options.itemClass || 'nav-item';
  const dataAttr = options.dataAttr || 'data-nav';
  const activeNav = options.activeNav || 'home';
  const clipValue = options.clipValue || 'reels';
  const navItems = [
    {
      key: 'home',
      tip: 'Local feed',
      label: 'Home',
      icon: '<path d="M4 11.5 12 5l8 6.5V20H6v-6h12" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>'
    },
    {
      key: 'nearby',
      tip: 'Businesses close to you',
      label: 'Nearby',
      icon: '<path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z" stroke="currentColor" stroke-linejoin="round"/><path d="M12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z" stroke="currentColor"/>'
    },
    {
      key: 'feeds',
      tip: 'Product and posts',
      label: 'Feeds',
      icon: '<path d="M5 5h6v6H5V5Zm8 0h6v6h-6V5ZM5 13h6v6H5v-6Zm8 0h6v6h-6v-6Z" stroke="currentColor" stroke-linejoin="round"/>'
    },
    {
      key: clipValue,
      tip: 'Short videos',
      label: 'Clips',
      icon: '<path d="M5 7h14v12H5V7Zm3-4 2 4m4-4 2 4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>'
    },
    {
      key: 'uploads',
      tip: 'Upload status',
      label: 'Uploads',
      icon: '<path d="M12 16V5m0 0 4 4m-4-4-4 4M5 19h14" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>'
    },
    {
      key: 'profile',
      tip: 'Your account',
      label: 'Profile',
      icon: '<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0" stroke="currentColor" stroke-linecap="round"/>'
    },
    {
      key: 'chat',
      tip: 'Messages',
      label: 'Chat',
      icon: '<path d="M5 5.5h14v10.7H9.2L5 19.5v-14Z" stroke="currentColor" stroke-linejoin="round"/><path d="M9 10.8h.01M12 10.8h.01M15 10.8h.01" stroke="currentColor" stroke-linecap="round" stroke-width="2.6"/>'
    },
    {
      key: 'ask',
      tip: 'AI helper',
      label: 'Ask EMY',
      ask: true,
      icon: '<path d="M6.9 8.1c.35-1.08 1.36-1.8 2.5-1.8h5.2c1.14 0 2.15.72 2.5 1.8l1.7 8.7c.35 1.78-1.01 3.45-2.82 3.45H8.02c-1.81 0-3.17-1.67-2.82-3.45l1.7-8.7Z" fill="#f76512" stroke="#cf5200" stroke-linejoin="round" stroke-width="1"/><path d="M15.9 6.55c.58.35 1.02.9 1.2 1.55l1.7 8.7c.29 1.48-.6 2.88-1.96 3.32l-.98-.08c.74-.62 1.04-1.6.82-2.72l-1.25-6.7c-.28-1.5-.1-2.8.47-4.07Z" fill="#ad3e00" opacity=".2"/><path d="M6.35 10.05c2.15.62 4.02.48 5.66-.3 1.78-.85 3.62-.92 5.46-.22l.38 1.84c-2.32-.78-4.28-.63-6.04.22-1.62.78-3.45.9-5.78.28l.32-1.82Z" fill="#ffb067" opacity=".34"/><path d="M8.8 6.35c.32-1.92 1.42-3 3.2-3s2.88 1.08 3.2 3" stroke="#fff" stroke-linecap="round" stroke-width="1.18" opacity=".9"/><path d="M9.25 13.2c.46-.36.92-.36 1.38 0" stroke="#fff" stroke-linecap="round" stroke-width="1.02" opacity=".96"/><path d="M13.37 13.2c.46-.36.92-.36 1.38 0" stroke="#fff" stroke-linecap="round" stroke-width="1.02" opacity=".96"/><path d="M9.8 15.82c1.34.94 3.06.94 4.4 0" stroke="#fff" stroke-linecap="round" stroke-width="1.18" opacity=".96"/>'
    }
  ];
  return `
      <nav class="${navClass}" ${navAttrs}>
${navItems.map((item) => {
    const classes = itemClass + (item.ask ? ' nav-item-ask' : '') + (item.key === activeNav ? ' is-active' : '');
    return `        <button class="${classes}" type="button" ${dataAttr}="${item.key}" data-tip="${item.tip}">
          ${item.ask ? '<span class="ask-emy-bubble">Hi, I&#039;m EMY. Let me help you find what you need.</span>' : ''}
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">${item.icon}</svg>
          <span>${item.label}</span>
        </button>`;
  }).join('\n')}
      </nav>`;
}

const customerLocationSheetMarkup = String.raw`
      <div class="location-overlay" id="emy-location" data-location-sheet aria-hidden="true">
        <section class="location-sheet" aria-label="Select location">
          <div class="location-head">
            <div class="location-title">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z" stroke="currentColor" stroke-linejoin="round"/><path d="M12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z" stroke="currentColor"/></svg>
              <span>Select Location</span>
            </div>
            <div class="location-actions">
              <button class="location-add" type="button" data-location-add>Add +</button>
              <button class="location-close" type="button" data-location-close aria-label="Close location selector">x</button>
            </div>
          </div>
          <button class="location-current" type="button" data-use-current-location aria-pressed="false">
            <span class="location-current-copy">
              <strong data-current-location-title>Use Current Location</strong>
              <small data-current-location-detail>Detect your position for nearby businesses and posts.</small>
            </span>
            <span class="radio-dot" aria-hidden="true"></span>
          </button>
          <div class="current-radius" data-current-radius hidden>
            <div class="current-radius-head">
              <span>Distance radius from your current location</span>
              <strong data-current-radius-value>5 miles</strong>
            </div>
            <div class="radius-options compact">
              <button type="button" data-radius="1">1 mi</button>
              <button type="button" data-radius="3">3 mi</button>
              <button class="is-active" type="button" data-radius="5">5 mi</button>
              <button type="button" data-radius="8">8 mi</button>
              <button type="button" data-radius="10">10 mi</button>
            </div>
          </div>
          <p class="location-empty">Saved coordinates help EMY show accurate businesses, products, and posts near you.</p>
          <div class="place-list" data-place-list></div>
          <p class="location-empty" data-location-empty>No saved locations yet. Click Add + to save Home, Office, or Other.</p>
          <form class="location-form" data-location-form>
            <div class="place-tabs" role="tablist" aria-label="Location type">
              <button class="is-active" type="button" data-place-tab="Home">Home</button>
              <button type="button" data-place-tab="Office">Office</button>
              <button type="button" data-place-tab="Other">Other</button>
            </div>
            <div class="location-search">
              <input class="location-field" data-place-input placeholder="Location*" autocomplete="off" aria-autocomplete="list" aria-expanded="false" />
              <div class="location-suggestions" data-place-suggestions hidden></div>
            </div>
            <p class="radius-title">Distance radius</p>
            <div class="radius-options" data-radius-options>
              <button type="button" data-radius="1">1</button>
              <button type="button" data-radius="3">3</button>
              <button class="is-active" type="button" data-radius="5">5</button>
              <button type="button" data-radius="8">8</button>
              <button type="button" data-radius="10">10</button>
            </div>
            <button class="location-submit" type="submit">Submit</button>
          </form>
          <p class="location-status" data-location-status></p>
        </section>
      </div>`;

const customerLocationSheetScript = String.raw`
        function setupCustomerLocationSheet(options = {}) {
          const locationButton = options.locationButton || document.querySelector("[data-location]");
          const locationLabelNode = options.locationLabel || document.querySelector("[data-location-label]");
          const locationSheet = document.querySelector("[data-location-sheet]");
          if (!locationButton || !locationLabelNode || !locationSheet) return { update: () => {} };
          const locationClose = locationSheet.querySelector("[data-location-close]");
          const locationAdd = locationSheet.querySelector("[data-location-add]");
          const useCurrentLocationButton = locationSheet.querySelector("[data-use-current-location]");
          const currentLocationTitle = locationSheet.querySelector("[data-current-location-title]");
          const currentLocationDetail = locationSheet.querySelector("[data-current-location-detail]");
          const currentRadius = locationSheet.querySelector("[data-current-radius]");
          const currentRadiusValue = locationSheet.querySelector("[data-current-radius-value]");
          const placeList = locationSheet.querySelector("[data-place-list]");
          const locationEmpty = locationSheet.querySelector("[data-location-empty]");
          const locationForm = locationSheet.querySelector("[data-location-form]");
          const placeTabs = Array.from(locationSheet.querySelectorAll("[data-place-tab]"));
          const placeInput = locationSheet.querySelector("[data-place-input]");
          const placeSuggestions = locationSheet.querySelector("[data-place-suggestions]");
          const radiusButtons = Array.from(locationSheet.querySelectorAll("[data-radius]"));
          const locationStatus = locationSheet.querySelector("[data-location-status]");
          const accountType = String(options.accountType || options.role || "").toLowerCase() === "business" ? "business" : "customer";
          const askLocationKey = options.locationStorageKey || (accountType === "business" ? "emyBusinessAskLocation" : "emyAskLocation");
          const savedPlacesKey = options.savedPlacesStorageKey || (accountType === "business" ? "emyBusinessSavedPlaces" : "emyCustomerSavedPlaces");
          const profileLocationKey = options.profileLocationKey || (accountType === "business" ? "emyBusinessLocation" : "emyCustomerLocation");
          const profileLocationLabelKey = options.profileLocationLabelKey || (accountType === "business" ? "emyBusinessLocationLabel" : "emyCustomerLocationLabel");
          const cleanLocationText = (value) => String(value || "").replace(/\s+/g, " ").trim();
          const escapeLocationHtml = (value) => cleanLocationText(value).replace(/[&<>"']/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[char]));
          function readLocationJson(key, fallback) {
            try {
              const parsed = JSON.parse(localStorage.getItem(key) || "null");
              return parsed && typeof parsed === "object" ? parsed : fallback;
            } catch (error) {
              return fallback;
            }
          }
          function cleanRadius(value) {
            const numeric = Number(value);
            return Number.isFinite(numeric) ? Math.min(10, Math.max(1, Math.round(numeric))) : 5;
          }
          function cleanCoordinate(value) {
            if (value === null || value === undefined || value === "") return null;
            const numeric = Number(value);
            return Number.isFinite(numeric) ? numeric : null;
          }
          function shortLocationLabel(value) {
            const cleanValue = cleanLocationText(value);
            if (!cleanValue || cleanValue === "Near me") return "Current Location";
            return cleanValue.split(",")[0].trim() || "Current Location";
          }
          function headerLocationLabel(value) {
            const cleanValue = cleanLocationText(value);
            if (!cleanValue || cleanValue === "Near me" || cleanValue === "Current Location") return "Current Location";
            const label = cleanValue.split(",").map((part) => part.trim()).filter(Boolean).slice(0, 2).join(", ") || cleanValue;
            return label.length > 46 ? label.slice(0, 43).trim() + "..." : label;
          }
          function readAskLocation() {
            const stored = readLocationJson(askLocationKey, {});
            const fallbackLocation = cleanLocationText(localStorage.getItem(profileLocationKey) || localStorage.getItem(profileLocationLabelKey) || "");
            return {
              location: cleanLocationText(stored.location) || fallbackLocation || "Near me",
              radius: cleanRadius(stored.radius),
              latitude: cleanCoordinate(stored.latitude),
              longitude: cleanCoordinate(stored.longitude),
              locationSource: stored.locationSource === "saved" || stored.locationSource === "current" ? stored.locationSource : "",
              savedLocations: Array.isArray(stored.savedLocations) ? stored.savedLocations.map(cleanLocationText).filter(Boolean) : []
            };
          }
          function readPlaces(initialLocation) {
            const stored = readLocationJson(savedPlacesKey, null);
            if (Array.isArray(stored)) {
              return stored.filter((place) => place && cleanLocationText(place.address)).map((place) => ({
                id: cleanLocationText(place.id) || String(Date.now() + Math.random()),
                label: cleanLocationText(place.label) || "Home",
                address: cleanLocationText(place.address),
                radius: cleanRadius(place.radius),
                latitude: cleanCoordinate(place.latitude),
                longitude: cleanCoordinate(place.longitude)
              }));
            }
            return (initialLocation.savedLocations || []).map((address, index) => ({
              id: "ask-" + index + "-" + address.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
              label: "Home",
              address,
              radius: initialLocation.radius || 5,
              latitude: initialLocation.location === address ? initialLocation.latitude : null,
              longitude: initialLocation.location === address ? initialLocation.longitude : null
            }));
          }
          let selectedLocationState = readAskLocation();
          let places = readPlaces(selectedLocationState);
          let selectedLocation = selectedLocationState.location || "Near me";
          let selectedRadius = cleanRadius(selectedLocationState.radius);
          let selectedLatitude = selectedLocationState.latitude;
          let selectedLongitude = selectedLocationState.longitude;
          let usingCurrentLocation = selectedLocationState.locationSource ? selectedLocationState.locationSource === "current" : selectedLocation === "Near me" || selectedLocation === "Current Location";
          let activePlaceLabel = "Home";
          let editingPlaceId = "";
          let suggestionTimer = null;
          let suggestionRequestId = 0;
          let currentPlaceSuggestions = [];
          let selectedPlaceSuggestion = null;
          function shortSuggestionLabel(address) {
            const cleanAddress = cleanLocationText(address);
            if (!cleanAddress) return "Location";
            return cleanAddress.split(",").map((part) => part.trim()).filter(Boolean).slice(0, 2).join(", ") || cleanAddress;
          }
          function hidePlaceSuggestions() {
            if (!placeSuggestions || !placeInput) return;
            placeSuggestions.hidden = true;
            placeSuggestions.innerHTML = "";
            currentPlaceSuggestions = [];
            placeInput.setAttribute("aria-expanded", "false");
          }
          function renderPlaceSuggestions(items, message) {
            if (!placeSuggestions || !placeInput) return;
            placeSuggestions.innerHTML = "";
            currentPlaceSuggestions = items || [];
            if (message) {
              placeSuggestions.innerHTML = '<div class="location-suggestion-empty">' + escapeLocationHtml(message) + '</div>';
              placeSuggestions.hidden = false;
              placeInput.setAttribute("aria-expanded", "true");
              return;
            }
            currentPlaceSuggestions.forEach((item, index) => {
              const button = document.createElement("button");
              button.type = "button";
              button.className = "location-suggestion";
              button.dataset.suggestionIndex = String(index);
              button.innerHTML = '<strong>' + escapeLocationHtml(shortSuggestionLabel(item.address)) + '</strong><small>' + escapeLocationHtml(item.address) + '</small>';
              placeSuggestions.appendChild(button);
            });
            placeSuggestions.hidden = !currentPlaceSuggestions.length;
            placeInput.setAttribute("aria-expanded", currentPlaceSuggestions.length ? "true" : "false");
          }
          function uniqueLocationSuggestions(items) {
            const seen = new Set();
            return (items || []).filter((item) => {
              const address = cleanLocationText(item && item.address);
              const key = address.toLowerCase();
              if (!address || seen.has(key)) return false;
              seen.add(key);
              item.address = address;
              return true;
            }).slice(0, 6);
          }
          function extractUkPostcode(value) {
            const match = cleanLocationText(value).toUpperCase().match(/\b[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}\b/);
            return match ? match[0].replace(/\s+/, " ") : "";
          }
          function postcodeAddress(result, typedAddress) {
            const typed = cleanLocationText(typedAddress);
            const postcode = cleanLocationText(result && result.postcode);
            const typedKey = typed.toUpperCase().replace(/\s+/g, "");
            const postcodeKey = postcode.toUpperCase().replace(/\s+/g, "");
            const parts = [];
            if (typed) parts.push(typed);
            if (postcode && (!typedKey || typedKey.indexOf(postcodeKey) === -1)) parts.push(postcode);
            if (result && result.admin_district) parts.push(result.admin_district);
            if (result && result.country) parts.push(result.country);
            const seen = new Set();
            return parts.filter((part) => {
              const key = cleanLocationText(part).toLowerCase();
              if (!key || seen.has(key)) return false;
              seen.add(key);
              return true;
            }).join(", ");
          }
          async function lookupPostcodeLocation(postcode) {
            const clean = cleanLocationText(postcode).replace(/\s+/g, "");
            if (!clean) return null;
            try {
              const response = await fetch("https://api.postcodes.io/postcodes/" + encodeURIComponent(clean), { headers: { Accept: "application/json" } });
              if (!response.ok) return null;
              const data = await response.json();
              return data && data.result ? data.result : null;
            } catch (error) {
              return null;
            }
          }
          function photonLocationSuggestion(feature) {
            const properties = feature && feature.properties ? feature.properties : {};
            const coordinates = feature && feature.geometry && Array.isArray(feature.geometry.coordinates) ? feature.geometry.coordinates : [];
            const latitude = Number(coordinates[1]);
            const longitude = Number(coordinates[0]);
            if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
            const streetLine = [properties.housenumber, properties.street || properties.name].filter(Boolean).join(" ");
            const parts = [streetLine || properties.name, properties.city || properties.locality || properties.county, properties.postcode, properties.country].filter(Boolean);
            return { address: parts.join(", "), latitude, longitude };
          }
          async function lookupPhotonLocations(query, bias) {
            const text = cleanLocationText(query);
            if (text.length < 3) return [];
            try {
              let url = "https://photon.komoot.io/api/?q=" + encodeURIComponent(text + ", United Kingdom") + "&limit=6&lang=en";
              if (bias && Number.isFinite(Number(bias.latitude)) && Number.isFinite(Number(bias.longitude))) {
                url += "&lat=" + encodeURIComponent(bias.latitude) + "&lon=" + encodeURIComponent(bias.longitude);
              }
              const response = await fetch(url, { headers: { Accept: "application/json" } });
              if (!response.ok) return [];
              const data = await response.json();
              return (Array.isArray(data && data.features) ? data.features : []).map(photonLocationSuggestion).filter(Boolean);
            } catch (error) {
              return [];
            }
          }
          async function lookupLocationSuggestions(query) {
            const text = cleanLocationText(query);
            if (text.length < 3) return [];
            const suggestions = [];
            const postcodeInText = extractUkPostcode(text);
            const directPostcode = postcodeInText ? await lookupPostcodeLocation(postcodeInText) : null;
            if (directPostcode && Number.isFinite(Number(directPostcode.latitude)) && Number.isFinite(Number(directPostcode.longitude))) {
              suggestions.push({
                address: postcodeAddress(directPostcode, text),
                latitude: Number(directPostcode.latitude),
                longitude: Number(directPostcode.longitude)
              });
            }
            const compactPostcode = (postcodeInText || text).replace(/\s+/g, "").toUpperCase();
            try {
              const postcodeResponse = await fetch("https://api.postcodes.io/postcodes/" + encodeURIComponent(compactPostcode) + "/autocomplete", { headers: { Accept: "application/json" } });
              if (postcodeResponse.ok) {
                const postcodeData = await postcodeResponse.json();
                const postcodes = Array.isArray(postcodeData && postcodeData.result) ? postcodeData.result : [];
                postcodes.slice(0, 5).forEach((postcode) => suggestions.push({ address: postcode, latitude: null, longitude: null }));
              }
            } catch (error) {}
            suggestions.push(...await lookupPhotonLocations(text, directPostcode));
            try {
              const url = "https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&countrycodes=gb&limit=6&q=" + encodeURIComponent(text);
              const response = await fetch(url, { headers: { Accept: "application/json" } });
              if (response.ok) {
                const data = await response.json();
                (Array.isArray(data) ? data : []).forEach((item) => {
                  const latitude = Number(item.lat);
                  const longitude = Number(item.lon);
                  if (item.display_name && Number.isFinite(latitude) && Number.isFinite(longitude)) {
                    suggestions.push({ address: item.display_name, latitude, longitude });
                  }
                });
              }
            } catch (error) {}
            return uniqueLocationSuggestions(suggestions);
          }
          async function geocodeAddress(address) {
            const cleanAddress = cleanLocationText(address);
            if (!cleanAddress) return null;
            const compactPostcode = cleanAddress.replace(/\s+/g, "").toUpperCase();
            const looksLikeUkPostcode = /^[A-Z]{1,2}\d[A-Z\d]?\d[A-Z]{2}$/.test(compactPostcode);
            const postcodeResult = await lookupPostcodeLocation(extractUkPostcode(cleanAddress) || (looksLikeUkPostcode ? compactPostcode : ""));
            if (postcodeResult && Number.isFinite(Number(postcodeResult.latitude)) && Number.isFinite(Number(postcodeResult.longitude))) {
              return { latitude: Number(postcodeResult.latitude), longitude: Number(postcodeResult.longitude), address: postcodeAddress(postcodeResult, cleanAddress) || cleanAddress };
            }
            const photonResults = await lookupPhotonLocations(cleanAddress, null);
            if (photonResults.length) return photonResults[0];
            try {
              const url = "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=gb&q=" + encodeURIComponent(cleanAddress);
              const response = await fetch(url, { headers: { Accept: "application/json" } });
              if (!response.ok) return null;
              const data = await response.json();
              const first = Array.isArray(data) ? data[0] : null;
              const latitude = Number(first && first.lat);
              const longitude = Number(first && first.lon);
              if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
              return { latitude, longitude, address: (first && first.display_name) || cleanAddress };
            } catch (error) {
              return null;
            }
          }
          async function reverseLookup(latitude, longitude) {
            try {
              const url = "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" + encodeURIComponent(latitude) + "&lon=" + encodeURIComponent(longitude);
              const response = await fetch(url, { headers: { Accept: "application/json" } });
              if (!response.ok) return "";
              const data = await response.json();
              return cleanLocationText(data && data.display_name);
            } catch (error) {
              return "";
            }
          }
          function schedulePlaceSuggestions() {
            selectedPlaceSuggestion = null;
            window.clearTimeout(suggestionTimer);
            if (!placeInput) return;
            const query = cleanLocationText(placeInput.value);
            if (query.length < 3) {
              hidePlaceSuggestions();
              return;
            }
            suggestionTimer = window.setTimeout(async () => {
              const requestId = ++suggestionRequestId;
              renderPlaceSuggestions([], "Searching locations...");
              const suggestions = await lookupLocationSuggestions(query);
              if (requestId !== suggestionRequestId) return;
              if (cleanLocationText(placeInput.value) !== query) return;
              renderPlaceSuggestions(suggestions, suggestions.length ? "" : "No matching locations found yet. You can still submit the typed address.");
            }, 280);
          }
          function savePlaces() {
            try { localStorage.setItem(savedPlacesKey, JSON.stringify(places)); } catch (error) {}
          }
          function saveLocation() {
            try {
              const savedLocations = places.map((place) => place.address).filter(Boolean);
              localStorage.setItem(askLocationKey, JSON.stringify({
                location: selectedLocation || "Near me",
                radius: selectedRadius || 5,
                savedLocations,
                latitude: cleanCoordinate(selectedLatitude),
                longitude: cleanCoordinate(selectedLongitude),
                locationLabel: shortLocationLabel(selectedLocation),
                locationSource: usingCurrentLocation ? "current" : "saved"
              }));
              localStorage.setItem(profileLocationKey, selectedLocation || "Near me");
              localStorage.setItem(profileLocationLabelKey, shortLocationLabel(selectedLocation));
              window.dispatchEvent(new CustomEvent("emy:location-updated", {
                detail: {
                  accountType,
                  location: selectedLocation || "Near me",
                  label: shortLocationLabel(selectedLocation),
                  radius: selectedRadius || 5,
                  latitude: cleanCoordinate(selectedLatitude),
                  longitude: cleanCoordinate(selectedLongitude),
                  locationSource: usingCurrentLocation ? "current" : "saved"
                }
              }));
            } catch (error) {}
          }
          function setActiveRadius(radius) {
            selectedRadius = cleanRadius(radius);
            radiusButtons.forEach((button) => button.classList.toggle("is-active", Number(button.dataset.radius) === selectedRadius));
          }
          function setActivePlaceLabel(label) {
            activePlaceLabel = label || "Home";
            placeTabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.placeTab === activePlaceLabel));
          }
          function updateLocationUi() {
            const radiusText = selectedRadius + (selectedRadius === 1 ? " mile" : " miles");
            const detailLocation = selectedLocation && selectedLocation !== "Near me" ? shortLocationLabel(selectedLocation) : "your current position";
            locationLabelNode.textContent = headerLocationLabel(selectedLocation);
            locationButton.title = selectedLocation && selectedLocation !== "Near me" ? selectedLocation : "Current Location";
            if (useCurrentLocationButton) {
              useCurrentLocationButton.classList.toggle("is-selected", usingCurrentLocation);
              useCurrentLocationButton.setAttribute("aria-pressed", usingCurrentLocation ? "true" : "false");
            }
            if (currentLocationTitle) currentLocationTitle.textContent = usingCurrentLocation ? "Using Current Location" : "Use Current Location";
            if (currentLocationDetail) currentLocationDetail.textContent = usingCurrentLocation ? "Within " + radiusText + " of " + detailLocation + "." : "Detect your position for nearby businesses and posts.";
            if (currentRadius) currentRadius.hidden = !usingCurrentLocation;
            if (currentRadiusValue) currentRadiusValue.textContent = radiusText;
            saveLocation();
          }
          function renderPlaces() {
            if (!placeList) return;
            placeList.innerHTML = places.map((place) => (
              '<div class="place-card' + (place.address === selectedLocation ? ' is-selected' : '') + '">' +
              '<button class="place-main" type="button" data-select-place="' + escapeLocationHtml(place.id) + '"><strong>' + escapeLocationHtml(place.label) + '</strong><span>' + escapeLocationHtml(place.address) + '</span></button>' +
              '<div class="place-tools"><button class="place-check" type="button" data-select-place="' + escapeLocationHtml(place.id) + '" aria-label="Use ' + escapeLocationHtml(place.label) + ' location"></button><button type="button" data-edit-place="' + escapeLocationHtml(place.id) + '">Edit</button><button type="button" data-delete-place="' + escapeLocationHtml(place.id) + '" aria-label="Delete ' + escapeLocationHtml(place.label) + '">Delete</button></div>' +
              '</div>'
            )).join("");
            if (locationEmpty) locationEmpty.hidden = places.length > 0;
            updateLocationUi();
          }
          function setLocationSheetOpen(isOpen) {
            locationSheet.classList.toggle("is-open", isOpen);
            locationSheet.setAttribute("aria-hidden", isOpen ? "false" : "true");
            if (isOpen) renderPlaces();
          }
          function openLocationForm(place) {
            editingPlaceId = place ? place.id : "";
            setActivePlaceLabel(place ? place.label : "Home");
            if (placeInput) placeInput.value = place ? place.address : "";
            selectedPlaceSuggestion = null;
            hidePlaceSuggestions();
            setActiveRadius(place ? place.radius : selectedRadius);
            if (locationStatus) locationStatus.textContent = "";
            if (locationForm) locationForm.classList.add("is-open");
            if (locationAdd) locationAdd.textContent = "Close Add +";
            window.setTimeout(() => { if (placeInput) placeInput.focus(); }, 50);
          }
          function closeLocationForm() {
            editingPlaceId = "";
            if (placeInput) placeInput.value = "";
            selectedPlaceSuggestion = null;
            hidePlaceSuggestions();
            if (locationStatus) locationStatus.textContent = "";
            if (locationForm) locationForm.classList.remove("is-open");
            if (locationAdd) locationAdd.textContent = "Add +";
            setActivePlaceLabel("Home");
          }
          function selectPlace(place) {
            selectedLocation = place.address;
            selectedRadius = cleanRadius(place.radius);
            selectedLatitude = cleanCoordinate(place.latitude);
            selectedLongitude = cleanCoordinate(place.longitude);
            usingCurrentLocation = false;
            renderPlaces();
            setLocationSheetOpen(false);
            if (locationStatus) locationStatus.textContent = "Showing results near " + shortLocationLabel(selectedLocation) + ".";
          }
          function useCurrentLocation() {
            selectedLocation = "Current Location";
            selectedLatitude = null;
            selectedLongitude = null;
            usingCurrentLocation = true;
            renderPlaces();
            if (locationStatus) locationStatus.textContent = "Finding your current location...";
            if (!navigator.geolocation) {
              if (locationStatus) locationStatus.textContent = "Current location is not available in this browser. Add an address manually.";
              return;
            }
            navigator.geolocation.getCurrentPosition(async (position) => {
              selectedLatitude = Number(position.coords.latitude);
              selectedLongitude = Number(position.coords.longitude);
              const address = await reverseLookup(selectedLatitude, selectedLongitude);
              if (address) selectedLocation = address;
              updateLocationUi();
              if (locationStatus) locationStatus.textContent = address ? "Current location saved as " + shortLocationLabel(address) + "." : "Current location saved. You can add the exact address manually.";
            }, () => {
              if (locationStatus) locationStatus.textContent = "Location permission was not allowed. You can add an address manually.";
            }, { enableHighAccuracy: true, timeout: 9000, maximumAge: 60000 });
          }
          locationButton.addEventListener("click", (event) => {
            if (event) event.preventDefault();
            setLocationSheetOpen(true);
          });
          if (locationClose) locationClose.addEventListener("click", () => setLocationSheetOpen(false));
          locationSheet.addEventListener("click", (event) => {
            if (event.target === locationSheet) setLocationSheetOpen(false);
          });
          if (locationAdd) locationAdd.addEventListener("click", () => {
            if (locationForm && locationForm.classList.contains("is-open")) closeLocationForm();
            else openLocationForm(null);
          });
          if (useCurrentLocationButton) useCurrentLocationButton.addEventListener("click", useCurrentLocation);
          placeTabs.forEach((tab) => tab.addEventListener("click", () => setActivePlaceLabel(tab.dataset.placeTab)));
          if (placeInput) {
            placeInput.addEventListener("input", schedulePlaceSuggestions);
            placeInput.addEventListener("keydown", (event) => {
              if (event.key === "Escape") hidePlaceSuggestions();
            });
          }
          if (placeSuggestions) placeSuggestions.addEventListener("click", (event) => {
            const button = event.target.closest("[data-suggestion-index]");
            if (!button) return;
            const index = Number(button.dataset.suggestionIndex);
            const suggestion = currentPlaceSuggestions[index];
            if (!suggestion || !placeInput) return;
            selectedPlaceSuggestion = suggestion;
            placeInput.value = suggestion.address;
            hidePlaceSuggestions();
            if (locationStatus) locationStatus.textContent = "Location selected. Choose a distance radius, then submit.";
          });
          radiusButtons.forEach((button) => button.addEventListener("click", () => {
            setActiveRadius(button.dataset.radius);
            if (button.closest("[data-current-radius]") && usingCurrentLocation) updateLocationUi();
          }));
          if (placeList) placeList.addEventListener("click", (event) => {
            const selectButton = event.target.closest("[data-select-place]");
            const editButton = event.target.closest("[data-edit-place]");
            const deleteButton = event.target.closest("[data-delete-place]");
            if (selectButton) {
              const place = places.find((item) => item.id === selectButton.dataset.selectPlace);
              if (place) selectPlace(place);
              return;
            }
            if (editButton) {
              const place = places.find((item) => item.id === editButton.dataset.editPlace);
              if (place) openLocationForm(place);
              return;
            }
            if (deleteButton) {
              const deleted = places.find((item) => item.id === deleteButton.dataset.deletePlace);
              places = places.filter((item) => item.id !== deleteButton.dataset.deletePlace);
              if (deleted && deleted.address === selectedLocation) {
                selectedLocation = "Near me";
                selectedRadius = 5;
                selectedLatitude = null;
                selectedLongitude = null;
                usingCurrentLocation = false;
              }
              savePlaces();
              renderPlaces();
            }
          });
          if (locationForm) locationForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const address = cleanLocationText(placeInput && placeInput.value);
            if (!address) {
              if (locationStatus) locationStatus.textContent = "Please enter a location or postcode.";
              return;
            }
            if (locationStatus) locationStatus.textContent = "Checking location coordinates...";
            const existingPlace = editingPlaceId ? places.find((item) => item.id === editingPlaceId) : null;
            const matchedSuggestion = selectedPlaceSuggestion && selectedPlaceSuggestion.address === address && cleanCoordinate(selectedPlaceSuggestion.latitude) !== null && cleanCoordinate(selectedPlaceSuggestion.longitude) !== null
              ? selectedPlaceSuggestion
              : null;
            const geocoded = matchedSuggestion || await geocodeAddress(address);
            const canKeepExistingCoordinates = existingPlace && existingPlace.address === address && cleanCoordinate(existingPlace.latitude) !== null && cleanCoordinate(existingPlace.longitude) !== null;
            const place = {
              id: editingPlaceId || ("place-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7)),
              label: activePlaceLabel || "Home",
              address,
              radius: selectedRadius || 5,
              latitude: geocoded ? cleanCoordinate(geocoded.latitude) : canKeepExistingCoordinates ? cleanCoordinate(existingPlace.latitude) : null,
              longitude: geocoded ? cleanCoordinate(geocoded.longitude) : canKeepExistingCoordinates ? cleanCoordinate(existingPlace.longitude) : null,
              resolvedAddress: geocoded ? geocoded.address : ""
            };
            places = editingPlaceId ? places.map((item) => item.id === editingPlaceId ? place : item) : places.concat(place);
            savePlaces();
            closeLocationForm();
            selectPlace(place);
            if (locationStatus) locationStatus.textContent = geocoded || canKeepExistingCoordinates ? "Location saved with coordinates." : "Location saved. Add a full postcode later for stronger distance accuracy.";
          });
          setActiveRadius(selectedRadius);
          renderPlaces();
          return { update: updateLocationUi, open: () => setLocationSheetOpen(true) };
        }`;

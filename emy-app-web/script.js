const productImage = "assets/product.png";

const businesses = [
  {
    name: "Angi Pizza Zone",
    type: "Food and takeaway",
    distance: "0.8 mi",
    rating: "4.8",
    icon: "🍕",
    tags: ["Open now", "Delivery", "Offers"],
  },
  {
    name: "Ever Glow Beauty",
    type: "Beauty and skincare",
    distance: "1.2 mi",
    rating: "4.7",
    icon: "✦",
    tags: ["Products", "Local shop"],
  },
  {
    name: "Bright IT Support",
    type: "Business services",
    distance: "2.1 mi",
    rating: "4.9",
    icon: "⌘",
    tags: ["Mobile service", "Business"],
  },
];

const products = [
  { name: "Tropical Shirt", shop: "Urban Local", price: "£24.99", image: productImage },
  { name: "Glow Face Wash", shop: "Ever Glow", price: "£8.50", image: productImage },
  { name: "Smart Home Setup", shop: "Bright IT", price: "From £45", image: productImage },
  { name: "Weekend Offer", shop: "Angi Pizza Zone", price: "£12.99", image: productImage },
];

const visibleBusinesses = businesses.filter((item) => item.name !== "Bright IT Support");
const visibleProducts = products.filter((item) => item.shop !== "Bright IT");

const services = [
  "Nearby businesses",
  "Products",
  "Food and drink",
  "Beauty",
  "Business services",
  "Customer support",
];

let route = "home";
let query = "";

const title = document.querySelector("#page-title");
const view = document.querySelector("#view");

function setRoute(nextRoute) {
  route = nextRoute;
  document.querySelectorAll("[data-route]").forEach((item) => {
    item.classList.toggle("active", item.dataset.route === route);
  });
  render();
}

function businessCard(item) {
  return `
    <article class="business-card">
      <div class="business-media">${item.icon}</div>
      <div class="card-body">
        <h3>${item.name}</h3>
        <p class="meta">${item.type} · ${item.distance} · ★ ${item.rating}</p>
        <div class="tag-row">${item.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
      </div>
    </article>
  `;
}

function productCard(item) {
  return `
    <article class="product-card">
      <div class="product-media"><img src="${item.image}" alt="${item.name}" /></div>
      <div class="card-body">
        <h3>${item.name}</h3>
        <p class="meta">${item.shop}</p>
        <div class="tag-row"><span class="tag">${item.price}</span><span class="tag">View</span></div>
      </div>
    </article>
  `;
}

function searchBlock() {
  return `
    <div class="search-card">
      <h2>Find businesses, products, and services</h2>
      <p class="meta">Search EMY marketplace around your location.</p>
      <form class="search-row" data-search-form>
        <input value="${query}" name="q" placeholder="Search EMY..." autocomplete="off" />
        <button class="primary-button" type="submit">Search</button>
      </form>
      <div class="chips">
        ${services.slice(0, 5).map((item) => `<button class="chip" data-query="${item}">${item}</button>`).join("")}
      </div>
    </div>
  `;
}

function renderHome() {
  title.textContent = "Home";
  view.innerHTML = `
    <section class="hero-panel">
      ${searchBlock()}
      <aside class="panel">
        <h2>EMY account</h2>
        <p class="meta">Signed in as Stephane Elkrak</p>
        <div class="stat-grid">
          <div class="stat"><strong>24</strong><span class="meta">Saved items</span></div>
          <div class="stat"><strong>8</strong><span class="meta">Recent shops</span></div>
          <div class="stat"><strong>3</strong><span class="meta">Offers</span></div>
        </div>
      </aside>
    </section>
    <div class="section-head">
      <h2>Nearby businesses</h2>
      <button class="secondary-button" data-route="businesses">View all</button>
    </div>
    <section class="grid business-grid">${visibleBusinesses.map(businessCard).join("")}</section>
    <div class="section-head">
      <h2>Products today</h2>
      <button class="secondary-button" data-route="products">View all</button>
    </div>
    <section class="grid product-grid">${visibleProducts.map(productCard).join("")}</section>
  `;
}

function renderSearch() {
  title.textContent = "Search";
  const searchTerm = query.trim().toLowerCase();
  const results = searchTerm
    ? visibleBusinesses.filter((item) => `${item.name} ${item.type} ${item.tags.join(" ")}`.toLowerCase().includes(searchTerm))
    : visibleBusinesses;

  view.innerHTML = `
    ${searchBlock()}
    <div class="section-head">
      <h2>${searchTerm ? "Search results" : "Popular near you"}</h2>
      <span class="meta">${results.length} matches</span>
    </div>
    <section class="list">
      ${results.map((item) => `
        <article class="list-row">
          <div class="list-icon">${item.icon}</div>
          <div>
            <h3>${item.name}</h3>
            <p class="meta">${item.type} · ${item.distance} · ★ ${item.rating}</p>
          </div>
          <button class="primary-button" data-route="businesses">View</button>
        </article>
      `).join("") || `<p class="meta">No results found.</p>`}
    </section>
  `;
}

function renderBusinesses() {
  title.textContent = "Businesses";
  view.innerHTML = `
    <section class="two-column">
      <div>
        <div class="section-head"><h2>Business list</h2><button class="secondary-button">Filter</button></div>
        <section class="grid business-grid">${visibleBusinesses.map(businessCard).join("")}</section>
      </div>
      <aside class="detail-panel">
        <h2>${visibleBusinesses[0].name}</h2>
        <p class="meta">${visibleBusinesses[0].type} · ${visibleBusinesses[0].distance}</p>
        <div class="tag-row">${visibleBusinesses[0].tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
        <button class="primary-button" style="margin-top:18px;width:100%">Contact business</button>
      </aside>
    </section>
  `;
}

function renderProducts() {
  title.textContent = "Products";
  view.innerHTML = `
    <div class="section-head"><h2>Product list</h2><button class="secondary-button">Sort</button></div>
    <section class="grid product-grid">${visibleProducts.map(productCard).join("")}</section>
  `;
}

function renderProfile() {
  title.textContent = "Profile";
  view.innerHTML = `
    <section class="two-column">
      <article class="profile-panel">
        <div class="profile-header">
          <div class="profile-avatar">SE</div>
          <div>
            <h2>Stephane Elkrak</h2>
            <p class="meta">Customer profile · London</p>
          </div>
        </div>
        <div class="stat-grid">
          <div class="stat"><strong>24</strong><span class="meta">Saved</span></div>
          <div class="stat"><strong>6</strong><span class="meta">Orders</span></div>
          <div class="stat"><strong>4.9</strong><span class="meta">Rating</span></div>
        </div>
      </article>
      <aside class="profile-panel">
        <h2>Settings</h2>
        <div class="settings-list">
          <button>Switch profile <span>›</span></button>
          <button>Favourites <span>›</span></button>
          <button>Notifications <span>›</span></button>
          <button>Privacy policy <span>›</span></button>
          <button>Terms <span>›</span></button>
        </div>
      </aside>
    </section>
  `;
}

function render() {
  if (route === "home") renderHome();
  if (route === "search") renderSearch();
  if (route === "businesses") renderBusinesses();
  if (route === "products") renderProducts();
  if (route === "profile") renderProfile();
}

document.addEventListener("click", (event) => {
  const routeButton = event.target.closest("[data-route]");
  if (routeButton) {
    setRoute(routeButton.dataset.route);
    return;
  }

  const queryButton = event.target.closest("[data-query]");
  if (queryButton) {
    query = queryButton.dataset.query;
    setRoute("search");
  }
});

document.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-search-form]");
  if (!form) return;
  event.preventDefault();
  query = new FormData(form).get("q") || "";
  setRoute("search");
});

render();

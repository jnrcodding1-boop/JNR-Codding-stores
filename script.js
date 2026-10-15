"use strict";
const STORE_WHATSAPP = "07086368914";

const $ = (id) => document.getElementById(id);

const money = (amount) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0
  }).format(amount);

const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
};

const saveStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    showToast("Unable to save data in this browser.");
  }
};

const categories = [
  { name: "Phones & Accessories", icon: "📱" },
  { name: "Laptops & Computers", icon: "💻" },
  { name: "Electronics", icon: "📺" },
  { name: "Fashion", icon: "👟" },
  { name: "Home & Kitchen", icon: "🏠" },
  { name: "Gaming", icon: "🎮" },
  { name: "Beauty & Personal Care", icon: "✨" },
  { name: "Sports & Fitness", icon: "⚽" },
  { name: "Baby Products", icon: "🧸" },
  { name: "Groceries & Essentials", icon: "🛒" }
];

// Products are sample listings. Update prices and stock before selling.
const productData = [
  ["Samsung Galaxy Phone", "Phones & Accessories", 185000, "photo-1511707171634-5f897ff02aa9"],
  ["iPhone Smartphone", "Phones & Accessories", 450000, "photo-1592899677977-9c10ca588bbd"],
  ["Wireless Earbuds", "Phones & Accessories", 18000, "photo-1606220945770-b5b6c2c55bf1"],
  ["Fast Phone Charger", "Phones & Accessories", 6500, "photo-1583863788434-e58a36330cf0"],
  ["Power Bank", "Phones & Accessories", 22000, "photo-1609091839311-d5365f9ff1c5"],

  ["HP Laptop", "Laptops & Computers", 450000, "photo-1496181133206-80ce9b88a853"],
  ["MacBook Laptop", "Laptops & Computers", 1200000, "photo-1517336714731-489689fd1ca8"],
  ["Computer Keyboard", "Laptops & Computers", 18000, "photo-1587829741301-dc798b83add3"],
  ["Wireless Mouse", "Laptops & Computers", 8500, "photo-1527814050087-3793815479db"],
  ["Computer Monitor", "Laptops & Computers", 185000, "photo-1527443224154-c4a3942d3acf"],

  ["Smart Television", "Electronics", 320000, "photo-1593359677879-a4bb92f829d1"],
  ["Bluetooth Speaker", "Electronics", 25000, "photo-1608043152269-423dbba4e7e1"],
  ["Digital Camera", "Electronics", 280000, "photo-1516035069371-29a1b244cc32"],
  ["Over-Ear Headphones", "Electronics", 22000, "photo-1505740420928-5e560c06d30e"],
  ["Smart Watch", "Electronics", 35000, "photo-1523275335684-37898b6baf30"],

  ["Men's Sneakers", "Fashion", 28000, "photo-1542291026-7eec264c27ff"],
  ["Women's Handbag", "Fashion", 35000, "photo-1584917865442-de89df76afd3"],
  ["Classic Wristwatch", "Fashion", 24000, "photo-1524592094714-0f0654e20314"],
  ["Casual T-Shirt", "Fashion", 12000, "photo-1521572163474-6864f9cf17ab"],
  ["Leather Shoes", "Fashion", 42000, "photo-1614252369475-531eba835eb1"],

  ["Electric Blender", "Home & Kitchen", 35000, "photo-1570222094114-d054a817e56b"],
  ["Electric Kettle", "Home & Kitchen", 16000, "photo-1594213114663-d94db9b171a6"],
  ["Cooking Pot Set", "Home & Kitchen", 45000, "photo-1556911220-bff31c812dba"],
  ["Standing Fan", "Home & Kitchen", 38000, "photo-1585338107529-13afc5f02586"],
  ["Modern Chair", "Home & Kitchen", 55000, "photo-1503602642458-232111445657"],

  ["Gaming Controller", "Gaming", 42000, "photo-1600080972464-8e5f35f63d08"],
  ["Gaming Headset", "Gaming", 32000, "photo-1599669454699-248893623440"],
  ["Gaming Laptop", "Gaming", 950000, "photo-1603302576837-37561b2e2302"],
  ["Gaming Keyboard", "Gaming", 28000, "photo-1595225476474-87563907a212"],
  ["Gaming Mouse", "Gaming", 16000, "photo-1615663245857-ac93bb7c39e7"],

  ["Perfume", "Beauty & Personal Care", 18000, "photo-1541643600914-78b084683601"],
  ["Skincare Set", "Beauty & Personal Care", 22000, "photo-1608248543803-ba4f8c70ae0b"],
  ["Hair Dryer", "Beauty & Personal Care", 25000, "photo-1522338242992-e1a54906a8da"],
  ["Makeup Kit", "Beauty & Personal Care", 30000, "photo-1512496015851-a90fb38ba796"],
  ["Electric Shaver", "Beauty & Personal Care", 19000, "photo-1621607512214-68297480165e"],

  ["Football", "Sports & Fitness", 12000, "photo-1614632537423-1e6c2e7e0c5c"],
  ["Running Shoes", "Sports & Fitness", 35000, "photo-1460353581641-37baddab0fa2"],
  ["Dumbbells Set", "Sports & Fitness", 28000, "photo-1583454110551-21f2fa2afe61"],
  ["Gym Bag", "Sports & Fitness", 18000, "photo-1553062407-98eeb64c6a62"],
  ["Sports Water Bottle", "Sports & Fitness", 8500, "photo-1602143407151-7111542de6e8"],

  ["Baby Stroller", "Baby Products", 95000, "photo-1519689680058-324335c77eba"],
  ["Baby Clothing Set", "Baby Products", 15000, "photo-1519238263530-99bdd11df2ea"],
  ["Baby Feeding Bottle", "Baby Products", 6500, "photo-1604917877934-07d8d248d396"],
  ["Baby Toys", "Baby Products", 12000, "photo-1559454403-b8fb88521f11"],
  ["Baby Backpack", "Baby Products", 18000, "photo-1553062407-98eeb64c6a62"],

  ["Rice Pack", "Groceries & Essentials", 25000, "photo-1586201375761-83865001e31c"],
  ["Cooking Oil", "Groceries & Essentials", 12000, "photo-1474979266404-7eaacbcd87c5"],
  ["Breakfast Cereal", "Groceries & Essentials", 6500, "photo-1517093157656-b9eccef91cb1"],
  ["Coffee Pack", "Groceries & Essentials", 8500, "photo-1445116572660-236099ec97a0"],
  ["Food Storage Containers", "Groceries & Essentials", 14000, "photo-1499933374294-4584851497cc"]
];

const products = productData.map((item, index) => ({
  id: index + 1,
  name: item[0],
  category: item[1],
  price: item[2],
  oldPrice: Math.round(item[2] * 1.12),
  image: `https://images.unsplash.com/${item[3]}?auto=format&fit=crop&w=700&q=80`,
  rating: Number((4 + ((index % 10) / 10)).toFixed(1)),
  stock: 10 + (index % 20),
  description: `${item[0]} from JNR Codding Store. Please confirm product details and availability before ordering.`
}));

let cart = readStorage("jnr_cart", []);
let wishlist = readStorage("jnr_wishlist", []);
let orders = readStorage("jnr_orders", []);
let account = readStorage("jnr_account", {});
let currentPage = "home";
let toastTimer;

function showToast(message) {
  const toast = $("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function saveCart() {
  saveStorage("jnr_cart", cart);
  updateCounts();
}

function saveWishlist() {
  saveStorage("jnr_wishlist", wishlist);
  updateCounts();
}

function updateCounts() {
  $("cartCount").textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  $("wishlistCount").textContent = wishlist.length;
}

function getProduct(id) {
  return products.find(product => product.id === Number(id));
}

function categoryIcon(category) {
  return categories.find(item => item.name === category)?.icon || "🛍️";
}

function productCard(product) {
  const saved = wishlist.includes(product.id);

  return `
    <article class="product-card">
      <div class="product-image-wrap">
        <img
          class="product-image"
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
          onerror="this.onerror=null;this.src='https://placehold.co/600x400?text=Product+Image';"
        >
        <button
          class="wishlist-button ${saved ? "active" : ""}"
          data-action="wishlist"
          data-id="${product.id}"
          aria-label="${saved ? "Remove from wishlist" : "Add to wishlist"}"
          title="${saved ? "Remove from wishlist" : "Add to wishlist"}"
        >${saved ? "♥" : "♡"}</button>
      </div>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-rating">★ ${product.rating.toFixed(1)} <span class="muted">(${product.stock} in stock)</span></div>
        <p class="product-price">
          ${money(product.price)}
          <span class="old-price">${money(product.oldPrice)}</span>
        </p>
        <div class="product-actions">
          <button class="primary-button" data-action="add" data-id="${product.id}">Add to Cart</button>
          <button class="secondary-button" data-action="details" data-id="${product.id}">Details</button>
        </div>
      </div>
    </article>
  `;
}

function renderCategories() {
  $("categoryGrid").innerHTML = categories.map(category => {
    const count = products.filter(p => p.category === category.name).length;

    return `
      <button class="category-card" data-category="${category.name}">
        <span class="category-icon">${category.icon}</span>
        <span>
          <strong>${category.name}</strong>
          <small>${count} products</small>
        </span>
      </button>
    `;
  }).join("");

  $("categoryFilter").innerHTML =
    `<option value="all">All Categories</option>` +
    categories.map(category =>
      `<option value="${category.name}">${category.name}</option>`
    ).join("");
}

function renderHome() {
  $("homeProducts").innerHTML = products.slice(0, 8).map(productCard).join("");
}

function renderProducts() {
  const query = $("searchInput").value.trim().toLowerCase();
  const category = $("categoryFilter").value;
  const maxPrice = Number($("maxPrice").value);
  const sort = $("sortFilter").value;

  let result = products.filter(product => {
    const matchesQuery =
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query);

    const matchesCategory = category === "all" || product.category === category;
    const matchesPrice = !maxPrice || product.price <= maxPrice;

    return matchesQuery && matchesCategory && matchesPrice;
  });

  if (sort === "low") result.sort((a, b) => a.price - b.price);
  if (sort === "high") result.sort((a, b) => b.price - a.price);
  if (sort === "rating") result.sort((a, b) => b.rating - a.rating);
  if (sort === "name") result.sort((a, b) => a.name.localeCompare(b.name));

  $("productResultCount").textContent = `${result.length} product(s) found`;

  $("productGrid").innerHTML = result.length
    ? result.map(productCard).join("")
    : `<div class="empty-state"><h2>No products found</h2><p>Try another search or reset your filters.</p></div>`;
}

function addToCart(id) {
  const product = getProduct(id);
  if (!product) return;

  const existing = cart.find(item => item.id === product.id);
  const quantity = existing ? existing.quantity : 0;

  if (quantity >= product.stock) {
    showToast("Sorry, the available sample stock has been reached.");
    return;
  }

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: product.id, quantity: 1 });
  }

  saveCart();
  showToast(`${product.name} added to cart.`);
}

function toggleWishlist(id) {
  id = Number(id);

  if (!getProduct(id)) return;

  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(savedId => savedId !== id);
    showToast("Removed from wishlist.");
  } else {
    wishlist.push(id);
    showToast("Added to wishlist.");
  }

  saveWishlist();
  renderHome();
  renderProducts();

  if (currentPage === "wishlist") renderWishlist();
}

function renderWishlist() {
  const savedProducts = wishlist.map(getProduct).filter(Boolean);

  $("wishlistProducts").innerHTML = savedProducts.length
    ? savedProducts.map(productCard).join("")
    : `<div class="empty-state"><h2>Your wishlist is empty</h2><p>Save products you like to find them here.</p><button class="primary-button" data-page="shop">Explore Products</button></div>`;
}

function changeQuantity(id, amount) {
  const item = cart.find(entry => entry.id === Number(id));
  const product = getProduct(id);
  if (!item || !product) return;

  const newQuantity = item.quantity + amount;

  if (newQuantity > product.stock) {
    showToast("That is more than the sample stock available.");
    return;
  }

  if (newQuantity < 1) {
    cart = cart.filter(entry => entry.id !== Number(id));
  } else {
    item.quantity = newQuantity;
  }

  saveCart();
  renderCart();
}

function removeCartItem(id) {
  cart = cart.filter(item => item.id !== Number(id));
  saveCart();
  renderCart();
  showToast("Item removed from cart.");
}

function cartTotal() {
  return cart.reduce((total, item) => {
    const product = getProduct(item.id);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);
}

function renderCart() {
  const validItems = cart.filter(item => getProduct(item.id));
  cart = validItems;

  if (!cart.length) {
    $("cartContent").innerHTML = `
      <div class="empty-state">
        <h2>Your cart is empty 🛒</h2>
        <p>Add some products before checking out.</p>
        <button class="primary-button" data-page="shop">Start Shopping</button>
      </div>`;
    saveCart();
    return;
  }

  const itemsHTML = cart.map(item => {
    const product = getProduct(item.id);

    return `
      <div class="cart-item">
        <img src="${product.image}" alt="${product.name}"
          onerror="this.onerror=null;this.src='https://placehold.co/200x200?text=Product';">
        <div>
          <h3>${product.name}</h3>
          <p>${money(product.price)} each</p>
          <div class="quantity-controls">
            <button data-action="quantity" data-id="${product.id}" data-amount="-1" aria-label="Decrease quantity">−</button>
            <strong>${item.quantity}</strong>
            <button data-action="quantity" data-id="${product.id}" data-amount="1" aria-label="Increase quantity">+</button>
          </div>
          <button class="remove-button" data-action="remove" data-id="${product.id}">Remove</button>
        </div>
        <strong>${money(product.price * item.quantity)}</strong>
      </div>`;
  }).join("");

  $("cartContent").innerHTML = `
    <div class="cart-layout">
      <div class="cart-list">${itemsHTML}</div>
      <aside class="summary-card">
        <h2>Order Summary</h2>
        <div class="summary-line"><span>Items</span><span>${cart.reduce((sum, item) => sum + item.quantity, 0)}</span></div>
        <div class="summary-line"><span>Subtotal</span><strong>${money(cartTotal())}</strong></div>
        <div class="summary-line"><span>Delivery</span><span>Confirm at checkout</span></div>
        <div class="summary-line summary-total"><span>Total</span><span>${money(cartTotal())}</span></div>
        <button class="primary-button full-width" data-page="checkout">Proceed to Checkout</button>
        <button class="secondary-button full-width" data-page="shop" style="margin-top:10px">Continue Shopping</button>
      </aside>
    </div>`;
}

function renderCheckout() {
  if (!cart.length) {
    $("checkoutContent").innerHTML = `
      <div class="empty-state">
        <h2>Your cart is empty</h2>
        <button class="primary-button" data-page="shop">Shop Products</button>
      </div>`;
    return;
  }

  $("checkoutContent").innerHTML = `
    <div class="cart-layout">
      <form id="checkoutForm" class="form-card">
        <h2>Delivery Details</h2>
        <label for="checkoutName">Full Name</label>
        <input id="checkoutName" required value="${escapeAttribute(account.name || "")}" placeholder="Your full name">

        <label for="checkoutPhone">Phone Number</label>
        <input id="checkoutPhone" type="tel" required value="${escapeAttribute(account.phone || "")}" placeholder="Your phone number">

        <label for="checkoutEmail">Email Address (optional)</label>
        <input id="checkoutEmail" type="email" value="${escapeAttribute(account.email || "")}" placeholder="Your email address">

        <label for="checkoutAddress">Delivery Address</label>
        <textarea id="checkoutAddress" required rows="3" placeholder="Your complete delivery address">${escapeHTML(account.address || "")}</textarea>

        <label for="checkoutPayment">Payment Method</label>
        <select id="checkoutPayment" required>
          <option value="Pay on delivery">Pay on delivery (confirm availability)</option>
          <option value="Bank transfer">Bank transfer (confirm with seller)</option>
        </select>

        <button class="primary-button full-width" type="submit">Place Order</button>
        <p class="muted">This demo does not process payments online.</p>
      </form>

      <aside class="summary-card">
        <h2>Your Items</h2>
        ${cart.map(item => {
          const product = getProduct(item.id);
          return `<div class="summary-line"><span>${product.name} × ${item.quantity}</span><strong>${money(product.price * item.quantity)}</strong></div>`;
        }).join("")}
        <div class="summary-line summary-total"><span>Total</span><span>${money(cartTotal())}</span></div>
      </aside>
    </div>`;
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function escapeAttribute(value) {
  return escapeHTML(value);
}

function placeOrder(event) {
  event.preventDefault();

  if (!cart.length) {
    showToast("Your cart is empty.");
    showPage("shop");
    return;
  }

  const name = $("checkoutName").value.trim();
  const phone = $("checkoutPhone").value.trim();
  const email = $("checkoutEmail").value.trim();
  const address = $("checkoutAddress").value.trim();
  const payment = $("checkoutPayment").value;

  if (!name || !phone || !address) {
    showToast("Please complete your name, phone number and address.");
    return;
  }

  const order = {
    orderNumber: "JNR-" + Date.now().toString().slice(-9),
    date: new Date().toLocaleString(),
    name,
    phone,
    email,
    address,
    payment,
    items: cart.map(item => ({
      id: item.id,
      name: getProduct(item.id).name,
      price: getProduct(item.id).price,
      quantity: item.quantity
    })),
    total: cartTotal(),
    status: "Order placed — awaiting seller confirmation"
  };

  orders.unshift(order);
  saveStorage("jnr_orders", orders);

  account = { name, phone, email, address };
  saveStorage("jnr_account", account);

  cart = [];
  saveCart();

  $("confirmationContent").innerHTML = `
    <div class="confirmation">
      <div class="confirmation-icon">✅</div>
      <h1>Thank you, ${escapeHTML(name)}!</h1>
      <p>Your order has been recorded in this browser.</p>
      <p><strong>Order number:</strong> ${order.orderNumber}</p>
      <p><strong>Order total:</strong> ${money(order.total)}</p>
      <p>Your seller must confirm availability, delivery and payment arrangements.</p>
      <button class="primary-button" data-page="orders">View My Orders</button>
      <button class="secondary-button" data-page="shop">Continue Shopping</button>
    </div>`;

  showPage("confirmation");

  const validNumber = /^\d{10,15}$/.test(STORE_WHATSAPP);
  if (validNumber && STORE_WHATSAPP !== "2348012345678") {
    const message = [
      "NEW ORDER — JNR CODDING STORE",
      `Order: ${order.orderNumber}`,
      `Customer: ${order.name}`,
      `Phone: ${order.phone}`,
      `Email: ${order.email || "Not provided"}`,
      `Address: ${order.address}`,
      `Payment preference: ${order.payment}`,
      "",
      "Items:",
      ...order.items.map(item => `- ${item.name} x ${item.quantity}: ${money(item.price * item.quantity)}`),
      "",
      `TOTAL: ${money(order.total)}`,
      "Please confirm this order."
    ].join("\n");

    const whatsappURL = `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(message)}`;
    const whatsappLink = document.createElement("a");
    whatsappLink.href = whatsappURL;
    whatsappLink.target = "_blank";
    whatsappLink.rel = "noopener";
    whatsappLink.className = "primary-button";
    whatsappLink.textContent = "Send Order to WhatsApp";
    whatsappLink.style.marginTop = "12px";
    $("confirmationContent").querySelector(".confirmation").appendChild(whatsappLink);
  } else {
    const note = document.createElement("p");
    note.className = "muted";
    note.textContent = "To notify the seller, add your real WhatsApp number in script.js and send the order message.";
    $("confirmationContent").querySelector(".confirmation").appendChild(note);
  }
}

function renderOrders() {
  if (!orders.length) {
    $("ordersContent").innerHTML = `
      <div class="empty-state">
        <h2>No orders yet</h2>
        <p>Your placed orders will appear here on this browser.</p>
        <button class="primary-button" data-page="shop">Start Shopping</button>
      </div>`;
    return;
  }

  $("ordersContent").innerHTML = orders.map(order => `
    <article class="order-card">
      <h2>Order ${escapeHTML(order.orderNumber)}</h2>
      <p class="muted">${escapeHTML(order.date)}</p>
      <p><strong>Customer:</strong> ${escapeHTML(order.name)}</p>
      <p><strong>Phone:</strong> ${escapeHTML(order.phone)}</p>
      <p><strong>Delivery address:</strong> ${escapeHTML(order.address)}</p>
      <ul>
        ${order.items.map(item => `<li>${escapeHTML(item.name)} × ${item.quantity} — ${money(item.price * item.quantity)}</li>`).join("")}
      </ul>
      <p><strong>Total:</strong> ${money(order.total)}</p>
      <p><strong>Payment preference:</strong> ${escapeHTML(order.payment)}</p>
      <p class="order-status">${escapeHTML(order.status)}</p>
    </article>
  `).join("");
}

function setupAccount() {
  $("accountName").value = account.name || "";
  $("accountPhone").value = account.phone || "";
  $("accountEmail").value = account.email || "";
  $("accountAddress").value = account.address || "";
}

function saveAccount(event) {
  event.preventDefault();

  account = {
    name: $("accountName").value.trim(),
    phone: $("accountPhone").value.trim(),
    email: $("accountEmail").value.trim(),
    address: $("accountAddress").value.trim()
  };

  saveStorage("jnr_account", account);
  showToast("Your account details have been saved.");
}

function showProductDetails(id) {
  const product = getProduct(id);
  if (!product) return;

  const existing = $("productDetails");
  if (existing) existing.remove();

  const dialog = document.createElement("dialog");
  dialog.id = "productDetails";
  dialog.className = "product-dialog";
  dialog.innerHTML = `
    <div class="dialog-content">
      <button class="dialog-close" aria-label="Close details">×</button>
      <img src="${product.image}" alt="${escapeHTML(product.name)}"
        onerror="this.onerror=null;this.src='https://placehold.co/600x400?text=Product';">
      <p class="product-category">${escapeHTML(product.category)}</p>
      <h2>${escapeHTML(product.name)}</h2>
      <p class="product-rating">★ ${product.rating.toFixed(1)}</p>
      <p>${escapeHTML(product.description)}</p>
      <p class="product-price">${money(product.price)}</p>
      <p class="muted">${product.stock} sample units available</p>
      <button class="primary-button full-width" data-action="add" data-id="${product.id}">Add to Cart</button>
    </div>`;

  document.body.appendChild(dialog);
  dialog.showModal();
}

function showPage(page) {
  const allowed = [
    "home", "shop", "wishlist", "cart", "checkout",
    "confirmation", "orders", "account", "contact"
  ];

  if (!allowed.includes(page)) page = "home";
  currentPage = page;

  document.querySelectorAll(".page-view").forEach(section => {
    section.classList.add("hidden");
  });

  const activeSection = $(page + "Page");
  if (activeSection) activeSection.classList.remove("hidden");

  $("navLinks").classList.remove("open");

  if (page === "shop") renderProducts();
  if (page === "wishlist") renderWishlist();
  if (page === "cart") renderCart();
  if (page === "checkout") renderCheckout();
  if (page === "orders") renderOrders();
  if (page === "account") setupAccount();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function applyTheme(dark) {
  document.body.classList.toggle("dark", dark);
  $("themeToggle").textContent = dark ? "☀️" : "🌙";
  saveStorage("jnr_theme", dark ? "dark" : "light");
}

function applyCustomColor(color) {
  if (!/^#[0-9a-f]{6}$/i.test(color)) return;
  document.documentElement.style.setProperty("--primary", color);
  saveStorage("jnr_custom_color", color);
}

function setupSearch() {
  $("searchForm").addEventListener("submit", event => {
    event.preventDefault();
    showPage("shop");
    renderProducts();
  });

  $("searchInput").addEventListener("input", renderProducts);
  $("categoryFilter").addEventListener("change", renderProducts);
  $("sortFilter").addEventListener("change", renderProducts);
  $("maxPrice").addEventListener("input", renderProducts);

  $("resetFilters").addEventListener("click", () => {
    $("searchInput").value = "";
    $("categoryFilter").value = "all";
    $("sortFilter").value = "default";
    $("maxPrice").value = "";
    renderProducts();
  });
}

function setupNavigation() {
  document.addEventListener("click", event => {
    const pageButton = event.target.closest("[data-page]");
    if (pageButton) {
      event.preventDefault();
      const page = pageButton.dataset.page;
      if (window.location.hash !== `#${page}`) {
        history.pushState(null, "", `#${page}`);
      }
      showPage(page);
      return;
    }

    const categoryButton = event.target.closest("[data-category]");
    if (categoryButton) {
      $("categoryFilter").value = categoryButton.dataset.category;
      $("searchInput").value = "";
      history.pushState(null, "", "#shop");
      showPage("shop");
      renderProducts();
      return;
    }

    const actionButton = event.target.closest("[data-action]");
    if (actionButton) {
      const { action, id, amount } = actionButton.dataset;

      if (action === "add") addToCart(id);
      if (action === "wishlist") toggleWishlist(id);
      if (action === "quantity") changeQuantity(id, Number(amount));
      if (action === "remove") removeCartItem(id);
      if (action === "details") showProductDetails(id);
    }

    if (event.target.closest(".dialog-close")) {
      const dialog = event.target.closest("dialog");
      if (dialog) dialog.close();
    }
  });

  document.addEventListener("click", event => {
    if (event.target.matches("dialog")) {
      event.target.close();
    }
  });

  window.addEventListener("hashchange", () => {
    showPage(location.hash.slice(1) || "home");
  });

  window.addEventListener("popstate", () => {
    showPage(location.hash.slice(1) || "home");
  });

  $("menuToggle").addEventListener("click", () => {
    $("navLinks").classList.toggle("open");
  });
}

function setupAppearance() {
  const savedTheme = readStorage("jnr_theme", "light");
  applyTheme(savedTheme === "dark");

  $("themeToggle").addEventListener("click", () => {
    applyTheme(!document.body.classList.contains("dark"));
  });

  const savedColor = readStorage("jnr_custom_color", "#f36b21");
  $("siteColor").value = savedColor;
  applyCustomColor(savedColor);

  $("siteColor").addEventListener("input", event => {
    applyCustomColor(event.target.value);
  });

  $("resetColor").addEventListener("click", () => {
    $("siteColor").value = "#f36b21";
    applyCustomColor("#f36b21");
    showToast("Store colour reset.");
  });
}

function setupFooter() {
  $("year").textContent = new Date().getFullYear();

  const validNumber = /^\d{10,15}$/.test(STORE_WHATSAPP) &&
    STORE_WHATSAPP !== "2348012345678";

  $("contactWhatsApp").href = validNumber
    ? `https://wa.me/${STORE_WHATSAPP}`
    : "https://www.whatsapp.com/";

  $("accountForm").addEventListener("submit", saveAccount);
  $("checkoutContent").addEventListener("submit", event => {
    if (event.target.id === "checkoutForm") placeOrder(event);
  });
}

function initStore() {
  renderCategories();
  renderHome();
  updateCounts();
  setupSearch();
  setupNavigation();
  setupAppearance();
  setupFooter();

  showPage(location.hash.slice(1) || "home");
}

document.addEventListener("DOMContentLoaded", initStore);
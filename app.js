// Product Data
const products = [
  { id: 1, name: "Abysm Sovereign 58mm Badge A", price: 7, img: "images/58mm Badge.png", category: "Official Merch", realImg: "images/rba.jpg"},
  { id: 2, name: "Abysm Sovereign 58mm Badge B", price: 7, img: "images/B.png", category: "Official Merch", realImg: "images/rbb.jpg"},
  { id: 3, name: "Abysm Sovereign Square badge A", price: 8.5, img: "images/Square badge.png", category: "Official Merch", realImg: "images/sba.jpg"},
  { id: 4, name: "Abysm Sovereign Square badge B", price: 8.5, img: "images/Square badge.png", category: "Official Merch", realImg: "images/sbb.jpg" },
  { id: 5, name: "Abysm Sovereign Shikishi A", price: 18.5, img: "images/Shikishi.png", category: "Official Merch" },
  { id: 6, name: "Abysm Sovereign Shikishi B", price: 18.5, img: "images/ShikishiB.png", category: "Official Merch" },
  { id: 7, name: "Abysm Sovereign Multi-frame card", price: 12, img: "images/Multi-frame card.png", category: "Official Merch" },
  { id: 8, name: "Abysm Sovereign Standee", price: 35, img: "images/Standee.png", category: "Official Merch" },
  { id: 9, name: "Abysm Sovereign Quick Sand Block", price: 45, img: "images/Quick sand block.png", category: "Official Merch" },
  { id: 10, name: "Abysm Sovereign Hairband", price: 30, img: "images/Hairband.png", category: "Official Merch" },
  { id: 11, name: "Abysm Sovereign Silk Scarf", price: 68, img: "images/Scarf.png", category: "Official Merch" },
  { id: 12, name: "Birthday Metal Pin: Gifted Arrival", price: 8, img: "images/Birthday metal pin 1.png", category: "Official Merch" },
  { id: 13, name: "Birthday Metal Pin: Where Hearts Live ", price: 8, img: "images/Birthday metal pin 2.png", category: "Official Merch" },
  { id: 14, name: "Birthday Chibi Metal Pin", price: 8, img: "images/Birthday chibi badge.png", category: "Official Merch" },
  { id: 15, name: "Birthday Polaroid Set", price: 12, img: "images/Birthday polaroid card.png", category: "Official Merch" },
  { id: 16, name: "Birthday Art Standee", price: 28, img: "images/Hairband.png", category: "Official Merch" },
  { id: 17, name: "Birthday Card Set", price: 10, img: "images/Birthday card set.png", category: "Official Merch" },
  { id: 18, name: "Birthday Plushie Keychain", price: 28, img: "images/Birthday plushie.png", category: "Official Merch" },
  { id: 19, name: "Birthday Arcylic Photocard", price: 10, img: "images/Birthday Arcylic Photocard.png", category: "Official Merch" },
  { id: 20, name: "Birthday", price: 30, img: "images/.png", category: "Official Merch" },
  { id: 21, name: "Birthday", price: 30, img: "images/.png", category: "Official Merch" },
  { id: 22, name: "Birthday", price: 30, img: "images/.png", category: "Official Merch" },
  { id: 23, name: "Birthday", price: 30, img: "images/.png", category: "Official Merch" },
  { id: 24, name: "Birthday", price: 30, img: "images/.png", category: "Official Merch" },
  { id: 25, name: "Birthday", price: 30, img: "images/.png", category: "Official Merch" },
  { id: 26, name: "Birthday", price: 30, img: "images/.png", category: "Official Merch" },
  { id: 27, name: "Birthday", price: 30, img: "images/.png", category: "Official Merch" },
  { id: 28, name: "Birthday", price: 30, img: "images/.png", category: "Official Merch" },
  { id: 29, name: "Birthday", price: 30, img: "images/.png", category: "Official Merch" },
  { id: 30, name: "Birthday", price: 30, img: "images/.png", category: "Official Merch" }
];


let cart = JSON.parse(localStorage.getItem("cart")) || [];
let filteredProducts = [...products]; 

// Register/Login
function registerUser() {
  const email = document.getElementById("email").value;
  if (email) {
    localStorage.setItem("user", email);
    document.getElementById("user-info").innerText = "Current User: " + email;
  }
}

// Search + Category + Sort
function applyFilters() {
  const searchText = document.getElementById("search-input").value.toLowerCase();
  const sortOption = document.getElementById("sort-select") ? document.getElementById("sort-select").value : "default";
  const category = document.getElementById("category-select") ? document.getElementById("category-select").value : "all";

  filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchText);
    const matchCategory = category === "all" || p.category === category;
    return matchSearch && matchCategory;
  });

  if (sortOption === "price-asc") filteredProducts.sort((a,b) => a.price - b.price);
  else if (sortOption === "price-desc") filteredProducts.sort((a,b) => b.price - a.price);

  renderProducts();
}

// Render Product List (no category shown)
function renderProducts() {
  const productList = document.getElementById("product-list");
  if (!productList) return;
  productList.innerHTML = "";

  filteredProducts.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}" onclick="viewDetail(${p.id})">
      <h3 onclick="viewDetail(${p.id})" style="cursor:pointer">${p.name}</h3>
      <p>€${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

// Render Product Detail (show category)
function renderDetail() {
  const detailDiv = document.getElementById("product-detail");
  if (!detailDiv) return;
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const product = products.find(p => p.id === id);

  if (product) {
    detailDiv.innerHTML = `
      <h2>${product.name}</h2>
      <img src="${product.img}" alt="${product.name}">
      <p>Price: €${product.price}</p>
      <p>Category: ${product.category}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>

      <h3>Real Product Image</h3>
      <img src="${product.realImg}" alt="Real ${product.name}" style="width:100%; margin-top:10px;">
    `;
  }
}


// View Detail
function viewDetail(id) {
  window.location.href = `product.html?id=${id}`;
}

// Add to Cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) existing.quantity += 1;
  else cart.push({ ...product, quantity: 1 });

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Remove from Cart
function removeFromCart(id) {
  const index = cart.findIndex(item => item.id === id);
  if (index !== -1) {
    if (cart[index].quantity > 1) cart[index].quantity -= 1;
    else cart.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Render Cart
// Render Cart - 2x2 px Images
function renderCart() {
  const cartList = document.getElementById("cart-list");
  if (!cartList) return;
  cartList.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    // 条目容器
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.gap = "8px";
    div.style.marginBottom = "4px";

    // 超小购物车图
    const img = document.createElement("img");
    img.src = item.img;
    img.alt = item.name;
    img.style.width = "70px";
    img.style.height = "70px";
    img.style.objectFit = "cover";
    img.style.borderRadius = "1px";

    // 商品信息
    const span = document.createElement("span");
    span.innerText = `${item.name} ×${item.quantity} - €${(item.price * item.quantity).toFixed(2)}`;

    // 删除按钮
    const button = document.createElement("button");
    button.innerText = "Remove One";
    button.onclick = () => removeFromCart(item.id);

    // 添加到容器
    div.appendChild(img);
    div.appendChild(span);
    div.appendChild(button);

    cartList.appendChild(div);
  });

  // 更新总价
  document.getElementById("total-price").innerText = "€" + total.toFixed(2);
}



// Init
window.onload = () => {
  if (document.getElementById("product-list")) applyFilters();
  if (document.getElementById("product-detail")) renderDetail();
  renderCart();
  const user = localStorage.getItem("user");
  if (user && document.getElementById("user-info")) document.getElementById("user-info").innerText = "Current User: " + user;
};

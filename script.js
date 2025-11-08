// let allMobilesCache = [];

// function setLoading(isLoading) {
//   const loader = document.getElementById("loader");
//   const btn = document.getElementById("showAllBtn");
//   loader.style.display = isLoading ? "block" : "none";
//   if (btn) btn.disabled = isLoading;
// }

// function handleSearch() {
//   const searchValue = document.getElementById("search_item").value.trim();
//   loadMobileData(searchValue || "iphone");
// }

// document.addEventListener("DOMContentLoaded", () => {
//   loadMobileData("iphone");
//   document.getElementById("showAllBtn").addEventListener("click", () => {
//     // Show all cards and hide the button
//     displayMobileData(allMobilesCache, { limit: null });
//     document.getElementById("all-product").classList.add("hidden");
//   });
// });

// function loadMobileData(query) {
//   const url = `https://openapi.programming-hero.com/api/phones?search=${encodeURIComponent(
//     query
//   )}`;
//   setLoading(true);
//   fetch(url)
//     .then((res) => res.json())
//     .then(({ data }) => {
//       allMobilesCache = Array.isArray(data) ? data : [];
//       // show first 3 initially
//       displayMobileData(allMobilesCache, { limit: 3 });
//       // toggle "Show All" visibility
//       const wrap = document.getElementById("all-product");
//       if (allMobilesCache.length > 3) {
//         wrap.classList.remove("hidden");
//       } else {
//         wrap.classList.add("hidden");
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       displayMobileData([]);
//       document.getElementById("all-product").classList.add("hidden");
//     })
//     .finally(() => setLoading(false));
// }

// function displayMobileData(mobiles = [], opts = {}) {
//   const { limit = null } = opts;
//   const container = document.getElementById("cards");
//   container.innerHTML = "";

//   if (!mobiles.length) {
//     container.innerHTML = `<p style="text-align:center;color:#6b7280">No results found.</p>`;
//     return;
//   }

//   const list = limit ? mobiles.slice(0, limit) : mobiles;
//   list.forEach((mobile) => {
//     const card = document.createElement("div");
//     card.className = "product-card";
//     card.innerHTML = `
//       <div class="product-media">
//         <img src="${mobile.image}" alt="${mobile.phone_name}" />
//       </div>
//       <h3 class="product-title">${mobile.phone_name}</h3>
//       <p class="product-desc">${mobile.slug}</p>
//       <div class="product-price">$ 999</div>
//       <button class="btn">Show Details</button>
//     `;
//     container.appendChild(card);
//   });
// }







function handleSearch() {
  const searchValue = document.getElementById("search_item").value.trim();
  loadMobileData(searchValue || "iphone");
}

document.addEventListener("DOMContentLoaded", () => {
  // show something initially
  loadMobileData("iphone");
});

function loadMobileData(query) {
  const url = `https://openapi.programming-hero.com/api/phones?search=${encodeURIComponent(query)}`;
  fetch(url)
    .then(res => res.json())
    .then(({ data }) => displayMobileData(data))  // ✅ render the cards
    .catch(err => {
      console.error(err);
      displayMobileData([]);
    });
}

function displayMobileData(mobiles = []) {
  const loadingSpinner = document.createElement("p");
  loadingSpinner.style.textAlign = "center"; 
  
  const container = document.getElementById("cards");
  container.innerHTML = "";

  if (!mobiles.length) {
    container.innerHTML = `<p style="text-align:center;color:#6b7280">No results found.</p>`;
    return;
  }
  const list = limit ? mobiles.slice(0, limit) : mobiles;
  mobiles.slice(0, 12).forEach(mobile => {

    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-media">
        <img src="${mobile.image}" alt="${mobile.phone_name}" />
      </div>
      <h3 class="product-title">${mobile.phone_name}</h3>
      <p class="product-desc">${mobile.slug}</p>
      <div class="product-price">$ 999</div>
      <button class="btn">Show Details</button>
    `;
    container.appendChild(card);
  });
}
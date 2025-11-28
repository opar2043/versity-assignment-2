
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
;
  fetch(url)
    .then(res => res.json())
    .then(({ data }) => displayMobileData(data))  // ✅ render the cards
    .catch(err => {
      console.error(err);
      displayMobileData([]);
    });
}
 
function displayMobileData(mobiles = []) {
  const container = document.getElementById("cards");
  container.innerHTML = "";

  if (!mobiles.length) {
    container.innerHTML = `<p style="text-align:center;color:#6b7280">No results found.</p>`;
    return;
  }

  mobiles.slice(0, 3).forEach((mobile) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-media">
        <img src="${mobile.image}" alt="${mobile.phone_name}" />
      </div>
      <h3 class="product-title">${mobile.phone_name}</h3>
      <p class="product-desc">${mobile.slug}</p>
      <div class="product-price">$ 999</div>
      <button class="btn add-cart">Add to Cart</button>
    `;

    container.appendChild(card);
    // ✅ find the button inside THIS card
    const btn = card.querySelector(".add-cart");

    // ✅ attach click handler for this specific mobile
    btn.addEventListener("click", () => {
      addtocart(mobile);
    });
  });
}


// ✅ This will be called only when user clicks the button
const addtocart = (mobile) => {
  console.log("Clicked mobile:", mobile);

  //? later you can send to backend like:

  fetch("http://localhost:5000/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mobile),
  })
  .then((data) => {
      console.log("cart added", data);
      alert(`"${mobile.phone_name}" added to cart successfully!`);
    })
  .catch((err) =>{
      console.log(err);
      alert(`${err.message} `)
  })
};


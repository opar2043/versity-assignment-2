// Load all cart items from backend cart.js
function loadCartData() {
  const url = `https://server-nu-six-15.vercel.app/cart`;

  fetch(url)
    .then((res) => res.json())
    .then((carts) => {
      // carts is already an array from your Express API
      console.log("Cart data from server:", carts);
      showCart(carts);
    })
    .catch((err) => {
      console.error(err);
      showCart([]);
    });
}

// Render cart items nicely
function showCart(carts = []) {
  console.log("Rendering carts:", carts);
  const container = document.getElementById("all-cart");
  const countText = document.getElementById("cart-count-text");
  container.innerHTML = "";

  if (countText) {
    countText.textContent = carts.length ? `${carts.length} item` : "No items";
  }

  if (!carts.length) {
    container.innerHTML = `<p style="text-align:center;color:#6b7280">No cart added.</p>`;
    return;
  }

  carts.forEach((cart) => {
    const card = document.createElement("div");
    card.className = "cart-item";

    card.innerHTML = `
      <div class="cart-item-image">
        <img src="${cart.image}" alt="${cart.phone_name}" />
      </div>

      <div class="cart-item-info">
        <h3 class="cart-item-title">${cart.phone_name}</h3>
        <p class="cart-item-slug">${cart.slug}</p>
        <div class="cart-item-price">$ 999</div>
      </div>

      <div class="cart-item-actions">
        
        <button class="btn btn-danger del-cart">Delete</button>
      </div>
    `;

    container.appendChild(card);
    const btn = card.querySelector(".del-cart");

    // ✅ attach click handler for this specific cart item
    btn.addEventListener("click", () => {
      deleteCart(cart._id, card);
    });
  });
}

// ✅ Delete from backend + remove from UI
const deleteCart = (id, cardData) => {
  fetch(`https://server-nu-six-15.vercel.app/cart/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      cardData.remove();
      alert("Item removed from cart.");
    })
    .catch(() => {
      alert("Could not remove item. Try again.");
    });
};

// Call this when the page loads
document.addEventListener("DOMContentLoaded", () => {
  loadCartData();
});

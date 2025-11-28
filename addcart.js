// function loadCartData(query) {
//   const url = `http://localhost:5000/cart`;
// ;
//   fetch(url)
//     .then(res => res.json())
//     .then(({ data }) => {
//         showCart(data)
//         console.log(data);
//     })  // ✅ render the cards
//     .catch(err => {
//       console.error(err);
//       showCart([]);
//     });
// }
 
// function showCart(carts = []) {
//     console.log(carts);
//   const container = document.getElementById("all-cart");
//   container.innerHTML = "";

//   if (!carts.length) {
//     container.innerHTML = `<p style="text-align:center;color:#6b7280">No cart added.</p>`;
//     return;
//   }

// //   make a good looking cart 
  
//     carts.forEach((cart) => {
//     const card = document.createElement("div");
//     card.className = "my-cart";
//     card.innerHTML = `
//       <div class="product-media">
//         <img src="${cart.image}" alt="${cart.phone_name}" />
//       </div>
//       <h3 class="product-title">${cart.phone_name}</h3>
//       <p class="product-desc">${cart.slug}</p>
//       <div class="product-price">$ 999</div>
//       <button class="btn del-cart">Delete</button>
//     `;

//     container.appendChild(card);
    
//     const btn = card.querySelector(".del-cart");

//     // ✅ attach click handler for this specific cart
//     btn.addEventListener("click", () => {
//       addtocart(cart);
//     });
//   });
// }

// showCart()













// Load all cart items from backend
function loadCartData() {
  const url = `http://localhost:5000/cart`;

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
    countText.textContent = carts.length
      ? `${carts.length} item`
      : "No items";
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

  fetch(`http://localhost:5000/cart/${id}`, {
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

function addToCart(name, price) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push({ name, price });
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
    }

    function displayCart() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const cartItems = document.getElementById("cart-items");
      cartItems.innerHTML = "";

      cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${item.name} - ₹${item.price}
          <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>`;
        cartItems.appendChild(li);
      });
    }

    function removeFromCart(index) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
    }

    window.onload = displayCart;

    
// demo.js

// This array will hold cart items
// const cartItems = [];

// function addToCart(productName, price) {
//   // Add item to the cart array
//   cartItems.push({ name: productName, price: price });

//   // Update cart display
//   displayCart();
// }

// function displayCart() {
//   const cartList = document.getElementById("cart-items");
  
//   // Clear existing cart content
//   cartList.innerHTML = "";

//   // Loop through cart items and add them to the list
//   cartItems.forEach((item, index) => {
//     const li = document.createElement("li");
//     li.textContent = `${item.name} - ₹${item.price}`;
    
//     // Optional: Add remove button
//     const removeBtn = document.createElement("button");
//     removeBtn.textContent = "❌";
//     removeBtn.style.marginLeft = "10px";
//     removeBtn.onclick = () => {
//       removeFromCart(index);
//     };

//     li.appendChild(removeBtn);
//     cartList.appendChild(li);
//   });
// }

// function removeFromCart(index) {
//   cartItems.splice(index, 1);
//   displayCart();
// }

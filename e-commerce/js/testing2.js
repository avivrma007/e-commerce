let cartCount = 0;

document.querySelector('.add-to-cart-btn').addEventListener('click', () => {
  cartCount++;
  document.getElementById('cart-count').textContent = cartCount;
});

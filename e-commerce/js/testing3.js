// Mobile Menu Toggle
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Cart Functionality
        const cartIcon = document.querySelector('.cart-icon');
        const cartDropdown = document.querySelector('.cart-dropdown');
        const cartCount = document.querySelector('.cart-count');
        const cartItemsContainer = document.querySelector('.cart-items');
        const cartTotal = document.querySelector('.cart-total');
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        
        let cart = [];
        
        // Toggle Cart Dropdown
        cartIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            cartDropdown.classList.toggle('active');
        });
        
        // Close cart when clicking outside
        document.addEventListener('click', (e) => {
            if (!cartIcon.contains(e.target)) {
                cartDropdown.classList.remove('active');
            }
        });
        
        // Add to Cart Function
        function addToCart(product) {
            const existingItem = cart.find(item => item.id === product.id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    ...product,
                    quantity: 1
                });
            }
            
            updateCart();
        }
        
        // Remove from Cart Function
        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCart();
        }
        
        // Update Cart UI
        function updateCart() {
            // Update cart count
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
            
            // Update cart items
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
            } else {
                cartItemsContainer.innerHTML = '';
                cart.forEach(item => {
                    const cartItemElement = document.createElement('div');
                    cartItemElement.className = 'cart-item';
                    cartItemElement.innerHTML = `
                        <img src="${item.image}" alt="${item.name}">
                        <div class="cart-item-info">
                            <div class="cart-item-title">${item.name}</div>
                            <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                            <div>Qty: ${item.quantity}</div>
                        </div>
                        <i class="fas fa-times remove-item" data-id="${item.id}"></i>
                    `;
                    cartItemsContainer.appendChild(cartItemElement);
                });
                
                // Add event listeners to remove buttons
                document.querySelectorAll('.remove-item').forEach(button => {
                    button.addEventListener('click', (e) => {
                        removeFromCart(parseInt(e.target.dataset.id));
                    });
                });
            }
            
            // Update total
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotal.textContent = `Total: $${total.toFixed(2)}`;
        }
        
        // Add event listeners to all "Add to Cart" buttons
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const product = {
                    id: parseInt(button.dataset.id),
                    name: button.dataset.name,
                    price: parseFloat(button.dataset.price),
                    image: button.dataset.image
                };
                
                addToCart(product);
                
                // Show cart dropdown
                cartDropdown.classList.add('active');
                
                // Add animation to cart icon
                cartIcon.classList.add('animate');
                setTimeout(() => {
                    cartIcon.classList.remove('animate');
                }, 500);
            });
        });
        
        // Checkout button
        const checkoutBtn = document.querySelector('.checkout-btn');
        checkoutBtn.addEventListener('click', () => {
            if (cart.length > 0) {
                alert(`Thank you for your purchase! Total: $${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}`);
                cart = [];
                updateCart();
                cartDropdown.classList.remove('active');
            } else {
                alert('Your cart is empty!');
            }
        });
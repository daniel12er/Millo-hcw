document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });

    // Product Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            productCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Product Modal
    const modal = document.getElementById('product-modal');
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    const closeModal = document.querySelector('.close-modal');
    const modalProductName = document.getElementById('modal-product-name');
    const modalProductPrice = document.getElementById('modal-product-price');
    const modalProductImg = document.getElementById('modal-product-img');

    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productCard = button.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            const productImg = productCard.querySelector('img').src;
            
            modalProductName.textContent = productName;
            modalProductPrice.textContent = productPrice;
            modalProductImg.src = productImg;
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Quantity Selector in Modal
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    const quantityInput = document.getElementById('quantity');

    minusBtn.addEventListener('click', () => {
        let value = parseInt(quantityInput.value);
        if (value > 1) {
            quantityInput.value = value - 1;
        }
    });

    plusBtn.addEventListener('click', () => {
        let value = parseInt(quantityInput.value);
        quantityInput.value = value + 1;
    });

    // Shopping Cart
    const cartSidebar = document.getElementById('shopping-cart');
    const cartOverlay = document.querySelector('.cart-overlay');
    const closeCart = document.querySelector('.close-cart');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const addToCartModalButton = document.querySelector('.add-to-cart-modal');
    const cartItems = document.querySelector('.cart-items');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    const totalAmount = document.querySelector('.total-amount');
    let cart = [];

    // Open cart
    function openCart() {
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    // Close cart
    function closeCartFunc() {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('open');
        document.body.style.overflow = 'auto';
    }

    // Add event listeners for cart open/close
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent.replace('$', '');
            const productImg = productCard.querySelector('img').src;
            
            addToCart(productName, parseFloat(productPrice), productImg, 1);
            openCart();
        });
    });

    addToCartModalButton.addEventListener('click', () => {
        const productName = modalProductName.textContent;
        const productPrice = modalProductPrice.textContent.replace('$', '');
        const productImg = modalProductImg.src;
        const quantity = parseInt(quantityInput.value);
        
        addToCart(productName, parseFloat(productPrice), productImg, quantity);
        modal.style.display = 'none';
        openCart();
    });

    closeCart.addEventListener('click', closeCartFunc);
    cartOverlay.addEventListener('click', closeCartFunc);

    // Add to cart function
    function addToCart(name, price, img, quantity) {
        const existingItemIndex = cart.findIndex(item => item.name === name);
        
        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push({
                name,
                price,
                img,
                quantity
            });
        }
        
        updateCart();
    }

    // Update cart function
    function updateCart() {
        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
        } else {
            emptyCartMessage.style.display = 'none';
        }
        
        // Clear cart items
        cartItems.innerHTML = '';
        if (cart.length === 0) {
            cartItems.appendChild(emptyCartMessage);
        }
        
        let total = 0;
        
        // Add cart items
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            cartItem.innerHTML = `
                <div class="cart-item-img">
                    <img src="${item.img}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <div class="cart-item-quantity">
                        <button class="cart-quantity-btn minus" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="cart-quantity-btn plus" data-index="${index}">+</button>
                    </div>
                    <a href="#" class="cart-item-remove" data-index="${index}">Remove</a>
                </div>
            `;
            
            cartItems.appendChild(cartItem);
        });
        
        // Update total
        totalAmount.textContent = `$${total.toFixed(2)}`;
        
        // Add event listeners for cart item buttons
        document.querySelectorAll('.cart-quantity-btn.minus').forEach(button => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                    updateCart();
                }
            });
        });
        
        document.querySelectorAll('.cart-quantity-btn.plus').forEach(button => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                cart[index].quantity++;
                updateCart();
            });
        });
        
        document.querySelectorAll('.cart-item-remove').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const index = button.getAttribute('data-index');
                cart.splice(index, 1);
                updateCart();
            });
        });
    }

    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        alert('Thank you for your order! Redirecting to checkout...');
        // Here you would normally redirect to a checkout page
    });

    // Form submissions
    const trackingForm = document.getElementById('tracking-form');
    if (trackingForm) {
        trackingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Tracking information will be sent to your email.');
            trackingForm.reset();
        });
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }

    // Animate team members on scroll
    const teamMembers = document.querySelectorAll('.team-member');
    
    function checkScroll() {
        teamMembers.forEach(member => {
            const memberPosition = member.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (memberPosition < screenPosition) {
                member.classList.add('animate');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on page load
});
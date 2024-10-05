let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(itemName, itemPrice, sizeId, quantityId) {
    const size = document.getElementById(sizeId).value;
    const quantity = parseInt(document.getElementById(quantityId).value);

    if (size === "select size") {
        alert("Please select a size.");
        return;
    }

    const item = {
        name: itemName,
        price: itemPrice,
        size: size,
        quantity: quantity
    };

    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${itemName} added to cart!`);
}

function removeFromCart(itemName) {
    cart = cart.filter(item => item.name !== itemName);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${itemName} removed from cart!`);
}

function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').innerText = cartCount;
}

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('tr');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <td>${item.name}</td>
            <td>${item.size}</td>
            <td>${item.quantity}</td>
            <td>Ksh ${item.price}</td>
            <td>Ksh ${item.price * item.quantity}</td>
            <td><button class="remove-btn" data-item-name="${item.name}">Remove</button></td>
        `;
        cartItemsContainer.appendChild(itemElement);

        total += item.price * item.quantity;
    });

    document.getElementById('cart-total').innerText = `Total: Ksh ${total}`;

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            const itemName = this.getAttribute('data-item-name');
            removeFromCart(itemName);
            displayCartItems(); // Refresh the cart display
        });
    });
}

// Call displayCartItems when the cart page loads
if (document.getElementById('cart-items')) {
    displayCartItems();
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', updateCartCount);

function checkoutWithFlutterwave() {
    FlutterwaveCheckout({
        public_key: "your-public-key-here",
        tx_ref: "hooli-tx-1920bbtytty",
        amount: cart.reduce((total, item) => total + item.price * item.quantity, 0),
        currency: "KES",
        payment_options: "mpesa",
        redirect_url: "https://your-website.com/payment-success",
        customer: {
            email: "customer-email@example.com",
            phone_number: "254123456789",
            name: "Customer Name",
        },
        customizations: {
            title: "LASHY KIDS",
            description: "Payment for items in cart",
            logo: "https://your-website.com/logo.png",
        },
    });
}
paypal.Buttons({
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            alert('Transaction completed by ' + details.payer.name.given_name);
            // Redirect to a success page or update the UI
            window.location.href = 'https://your-website.com/payment-success';
        });
    }
}).render('#paypal-button-container');
document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmountElement = document.getElementById('total-amount');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let totalAmount = 0;

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        totalAmount = 0;

        cartItems.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <h4>${item.name}</h4>
                <p>₹${item.price.toFixed(2)}</p>
                <button class="btn btn-remove" data-name="${item.name}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
            totalAmount += item.price;
        });

        totalAmountElement.textContent = totalAmount.toFixed(2);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            cartItems.push({ name, price });
            updateCart();
        });
    });

    cartItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-remove')) {
            const name = event.target.getAttribute('data-name');
            cartItems = cartItems.filter(item => item.name !== name);
            updateCart();
        }
    });

    document.getElementById('payment-form').addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Payment submitted successfully! This is a demo.');
    });

    updateCart();
});

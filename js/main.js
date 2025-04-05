// Cart data
const cartItems = [
    {
        id: 1,
        name: 'iPhone 11 pro',
        specs: '256GB, Navy Blue',
        price: 900,
        quantity: 2,
        image: 'https://placehold.co/80x80'
    },
    {
        id: 2,
        name: 'Samsung galaxy Note 10',
        specs: '256GB, Navy Blue',
        price: 900,
        quantity: 2,
        image: 'https://placehold.co/80x80'
    },
    {
        id: 3,
        name: 'Canon EOS M50',
        specs: 'Onyx Black',
        price: 1199,
        quantity: 1,
        image: 'https://placehold.co/80x80'
    },
    {
        id: 4,
        name: 'MacBook Pro',
        specs: '1TB, Graphite',
        price: 1799,
        quantity: 1,
        image: 'https://placehold.co/80x80'
    }
];

// DOM Elements
const cartItemsContainer = document.getElementById('cartItems');
const subtotalElement = document.getElementById('subtotal');
const totalElement = document.getElementById('total');
const sortSelect = document.getElementById('sortSelect');

// Render cart items
function renderCartItems(items) {
    cartItemsContainer.innerHTML = items.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p>${item.specs}</p>
            </div>
            <input type="number" class="quantity" value="${item.quantity}" min="1">
            <span class="price">$${item.price}</span>
            <button class="delete-btn">🗑️</button>
        </div>
    `).join('');

    // Add event listeners to quantity inputs and delete buttons
    attachEventListeners();
}

// Calculate and update totals
function updateTotals() {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 20;
    const total = subtotal + shipping;

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
    
    // Update checkout button amount
    document.querySelector('.checkout-btn span:first-child').textContent = `$${total.toFixed(2)}`;
}

// Sort cart items
function sortItems(method) {
    const sortedItems = [...cartItems].sort((a, b) => {
        if (method === 'price') {
            return b.price - a.price;
        } else {
            return a.name.localeCompare(b.name);
        }
    });
    renderCartItems(sortedItems);
}

// Attach event listeners
function attachEventListeners() {
    // Quantity change handlers
    document.querySelectorAll('.quantity').forEach(input => {
        input.addEventListener('change', (e) => {
            const id = parseInt(e.target.closest('.cart-item').dataset.id);
            const item = cartItems.find(item => item.id === id);
            if (item) {
                item.quantity = parseInt(e.target.value);
                updateTotals();
            }
        });
    });

    // Delete button handlers
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('.cart-item').dataset.id);
            const index = cartItems.findIndex(item => item.id === id);
            if (index !== -1) {
                cartItems.splice(index, 1);
                renderCartItems(cartItems);
                updateTotals();
            }
        });
    });
}

// Sort select handler
sortSelect.addEventListener('change', (e) => {
    sortItems(e.target.value);
});

// Initial render
renderCartItems(cartItems);
updateTotals();
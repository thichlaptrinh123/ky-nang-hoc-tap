// Progress Circle Animation
function setProgress(element, progress) {
    const circle = element.querySelector('.progress');
    const radius = 60;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = offset;
}

// Recent Orders Data
const orders = [
    {
        id: '#ORD-12345',
        date: '2024-01-15',
        status: 'Delivered',
        total: 299.99,
        items: 3
    },
    {
        id: '#ORD-12344',
        date: '2024-01-10',
        status: 'In Transit',
        total: 149.99,
        items: 2
    },
    {
        id: '#ORD-12343',
        date: '2024-01-05',
        status: 'Processing',
        total: 89.99,
        items: 1
    }
];

// Populate Orders
function populateOrders() {
    const ordersList = document.querySelector('.orders-list');
    orders.forEach(order => {
        const orderElement = document.createElement('div');
        orderElement.className = 'order-item';
        orderElement.innerHTML = `
            <div class="order-header">
                <div>
                    <h3>${order.id}</h3>
                    <p>${new Date(order.date).toLocaleDateString()}</p>
                </div>
                <span class="status ${order.status.toLowerCase()}">${order.status}</span>
            </div>
            <div class="order-details">
                <p>${order.items} items</p>
                <p class="total">$${order.total}</p>
            </div>
        `;
        ordersList.appendChild(orderElement);
    });
}

// Recently Viewed Products
const recentProducts = [
    {
        name: 'Wireless Headphones',
        price: 99.99,
        image: 'https://placekitten.com/200/200'
    },
    {
        name: 'Smart Watch',
        price: 199.99,
        image: 'https://placekitten.com/201/201'
    },
    {
        name: 'Laptop Stand',
        price: 49.99,
        image: 'https://placekitten.com/202/202'
    }
];

// Populate Recently Viewed Products
function populateRecentProducts() {
    const productsGrid = document.querySelector('.products-grid');
    recentProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button class="add-to-cart">Add to Cart</button>
        `;
        productsGrid.appendChild(productElement);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Set profile completion progress
    const progressElement = document.querySelector('.progress-circle');
    setProgress(progressElement, 85);

    // Populate orders and products
    populateOrders();
    populateRecentProducts();

    // Add event listeners for navigation
    document.querySelectorAll('.nav-links li').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelector('.nav-links li.active').classList.remove('active');
            item.classList.add('active');
        });
    });
});
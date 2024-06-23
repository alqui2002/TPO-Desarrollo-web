// Lista de productos artesanales
const products = [
    {
        id: 1,
        name: "Jarrón de Cerámica",
        price: 35.00,
        image: "jarron.jpg",
        description: "Un hermoso jarrón hecho a mano con detalles únicos."
    },
    {
        id: 2,
        name: "Bolsa Tejida",
        price: 25.00,
        image: "bolsa.jpg",
        description: "Una bolsa tejida a mano perfecta para cualquier ocasión."
    },
    {
        id: 3,
        name: "Collar de Piedras",
        price: 15.00,
        image: "collar.jpg",
        description: "Un collar elegante con piedras naturales."
    }
];

// Función para obtener los parámetros de la URL
function getQueryParams() {
    const params = {};
    window.location.search.substring(1).split("&").forEach(pair => {
        const [key, value] = pair.split("=");
        params[key] = decodeURIComponent(value);
    });
    return params;
}

// Función para renderizar los detalles del producto
function renderProductDetails(productId) {
    const product = products.find(p => p.id === parseInt(productId));
    if (product) {
        const productDetails = document.getElementById('product-details');
        productDetails.innerHTML = `
            <h1>${product.name}</h1>
            <img src="${product.image}" alt="${product.name}" class="img-fluid">
            <p>${product.description}</p>
            <p><strong>Precio:</strong> $${product.price.toFixed(2)}</p>
            <button class="btn btn-primary" onclick="addToCart(${product.id})">Añadir al carrito</button>
        `;
    } else {
        document.getElementById('product-details').innerHTML = '<p>Producto no encontrado.</p>';
    }
}

// Función para añadir productos al carrito
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Función para actualizar el contador del carrito
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cart-count');
    cartCount.innerText = cart.length;
}

// Renderizar detalles del producto al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const params = getQueryParams();
    if (params.id) {
        renderProductDetails(params.id);
    }
    updateCartCount();
});
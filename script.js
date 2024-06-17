// Lista de productos artesanales
const products = [
    {
        id: 1,
        name: "Jarrón de Cerámica",
        price: 35.00,
        image: "jarron.jpg"
    },
    {
        id: 2,
        name: "Bolsa Tejida",
        price: 25.00,
        image: "bolsa.jpg"
    },
    {
        id: 3,
        name: "Collar de Piedras",
        price: 15.00,
        image: "collar.jpg"
    }
];

// Función para renderizar productos
function renderProducts(filteredProducts = products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Limpiar productos anteriores
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-md-4 product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h5>${product.name}</h5>
            <p>$${product.price.toFixed(2)}</p>
        `;
        productCard.addEventListener('click', () => {
            window.open(`producto.html?id=${product.id}`, '_blank');
        });
        productList.appendChild(productCard);
    });
}

// Función de búsqueda
function searchProducts() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query)
    );
    renderProducts(filteredProducts);
}

// Función de ordenación
function sortProducts() {
    const sortOrder = document.getElementById('sort-select').value;
    let sortedProducts = [...products];
    if (sortOrder === 'asc') {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
        sortedProducts.sort((a, b) => b.price - a.price);
    }
    renderProducts(sortedProducts);
}

// Renderizar productos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartCount();

    // Agregar eventos de búsqueda y ordenación
    document.getElementById('search-input').addEventListener('input', searchProducts);
    document.getElementById('sort-select').addEventListener('change', sortProducts);
});

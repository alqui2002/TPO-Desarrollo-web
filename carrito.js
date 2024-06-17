// Función para renderizar los productos en el carrito
function renderCartItems() {
    const cartItems = document.getElementById('cart-items');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.innerHTML = '';
    cart.forEach((product, index) => {
        const cartItem = document.createElement('li');
        cartItem.className = 'list-group-item';
        cartItem.innerHTML = `
            ${product.name} - $${product.price.toFixed(2)}
            <button class="btn btn-danger btn-sm float-right" onclick="removeFromCart(${index})">Eliminar</button>
        `;
        cartItems.appendChild(cartItem);
    });
}

// Función para eliminar productos del carrito
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
    updateCartCount();
}

// Función para actualizar el contador del carrito
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cart-count');
    cartCount.innerText = cart.length;
}

// Renderizar productos en el carrito al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    renderCartItems();
    updateCartCount();
});

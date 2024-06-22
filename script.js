document.addEventListener('DOMContentLoaded', () => {
    // Datos de ejemplo
    const products = [
        { id: 1, name: "Bolsa Tejida", price: 150, image: "img/bolsatejida.jpg", description: "Bolsa tejida a mano con materiales orgánicos y diseño único." },
        { id: 2, name: "Jarrón de Cerámica", price: 200, image: "img/jarronceramica.jpeg", description: "Jarrón de cerámica hecho a mano, ideal para decorar tu hogar." },
        { id: 3, name: "Collar Artesanal", price: 100, image: "img/collarartesanal.jpeg", description: "Collar artesanal hecho con piedras naturales y técnicas tradicionales." }
    ];

    const productContainer = document.getElementById('product-list');
    const cartCountElement = document.getElementById('cart-count');
    const cartItemsElement = document.getElementById('cart-items');

    let cart = [];

    function renderProducts(productList) {
        productContainer.innerHTML = '';
        productList.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('col-md-4', 'product-card');
            productCard.dataset.id = product.id;
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Precio: $${product.price}</p>
            `;
            productContainer.appendChild(productCard);
        });
    }

    function showProductDetails(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            const productDetailsModal = document.createElement('div');
            productDetailsModal.classList.add('modal', 'fade');
            productDetailsModal.id = 'productDetailsModal';
            productDetailsModal.tabIndex = -1;
            productDetailsModal.role = 'dialog';
            productDetailsModal.innerHTML = `
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${product.name}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <img src="${product.image}" alt="${product.name}" class="img-fluid">
                            <p>${product.description}</p>
                            <p>Precio: $${product.price}</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-primary" data-id="${product.id}" id="add-to-cart-btn">Agregar al carrito</button>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(productDetailsModal);
            $('#productDetailsModal').modal('show');
            document.getElementById('add-to-cart-btn').addEventListener('click', () => {
                addToCart(product.id);
                $('#productDetailsModal').modal('hide');
            });
            $('#productDetailsModal').on('hidden.bs.modal', function (e) {
                document.body.removeChild(productDetailsModal);
            });
        }
    }

    function renderCart() {
        cartItemsElement.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('li');
            cartItem.classList.add('list-group-item');
            cartItem.innerHTML = `${item.name} - $${item.price} <button data-id="${item.id}">Eliminar</button>`;
            cartItemsElement.appendChild(cartItem);
        });
        cartCountElement.textContent = cart.length;
    }

    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.push(product);
            renderCart();
        }
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        renderCart();
    }

    productContainer.addEventListener('click', (event) => {
        const productCard = event.target.closest('.product-card');
        if (productCard) {
            const productId = parseInt(productCard.dataset.id);
            showProductDetails(productId);
        }
    });

    cartItemsElement.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const productId = parseInt(event.target.getAttribute('data-id'));
            removeFromCart(productId);
        }
    });

    document.getElementById('search-input').addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
        renderProducts(filteredProducts);
    });

    document.getElementById('sort-select').addEventListener('change', (event) => {
        const sortOption = event.target.value;
        let sortedProducts;
        if (sortOption === 'asc') {
            sortedProducts = [...products].sort((a, b) => a.price - b.price);
        } else if (sortOption === 'desc') {
            sortedProducts = [...products].sort((a, b) => b.price - a.price);
        } else {
            sortedProducts = products;
        }
        renderProducts(sortedProducts);
    });

    document.getElementById('filter-button').addEventListener('click', () => {
        alert('La funcionalidad de filtros está en construcción.');
    });

    document.getElementById('cart-icon').addEventListener('click', (event) => {
        event.preventDefault(); // Evitar el comportamiento predeterminado de apertura de enlace
        $('#cartModal').modal('show');
    });

    // Inicializar la página con los productos
    renderProducts(products);
    renderCart();
});
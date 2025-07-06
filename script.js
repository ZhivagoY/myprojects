document.addEventListener('DOMContentLoaded', function() {
    const categories = document.querySelectorAll('.category-header');
    categories.forEach(category => {
        category.addEventListener('click', function() {
            const allCategories = document.querySelectorAll('.category');
            allCategories.forEach(cat => {
                if (cat !== this.parentElement) {
                    cat.classList.remove('active');
                    cat.querySelector('.category-header').classList.remove('active');
                }
            });
            
            this.parentElement.classList.toggle('active');
            this.classList.toggle('active');
        });
    });
    
    async function loadProducts() {
        try {
            const response = await fetch('products.json');
            const data = await response.json();
            return data.products;
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
            return [];
        }
    }
    
    function displayProducts(products, containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-card-image">
                    <img src="images/${product.image || 'default.jpg'}" alt="${product.name}">
                </div>
                <div class="product-card-content">
                    <div class="product-card-price-info">
                        <div class="product-card-price"><strong>${product.price} ₽</strong></div>
                        ${product.oldPrice ? `<div class="product-card-prev-price"><s>${product.oldPrice} ₽</s></div>` : ''}
                    </div>
                    <div class="product-card-title">${product.name}</div>
                    <button class="add-to-cart-btn">Добавить в корзину</button>
                    <a href="product.html?id=${product.id}" class="product-details-link">Подробнее</a>
                </div>
            `;
            container.appendChild(productCard);
        });
    }
    
    function filterProductsByCategory(products, category) {
        return products.filter(product => product.category === category);
    }
    
    async function init() {
        const products = await loadProducts();
        
        displayProducts(products, 'items');
        
        const subcategories = document.querySelectorAll('.subcategory');
        const modal = document.getElementById('category-modal');
        const modalTitle = document.getElementById('modal-title');
        const closeBtn = document.querySelector('.close-btn');
        
        subcategories.forEach(sub => {
            sub.addEventListener('click', async () => {
                const category = sub.getAttribute('data-category');
                const categoryName = sub.textContent;
                const allProducts = await loadProducts();
                const filteredProducts = filterProductsByCategory(allProducts, category);
                
                modalTitle.textContent = categoryName;
                displayProducts(filteredProducts, 'category-products');
                
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        closeBtn.addEventListener('click', closeModal);
        
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }
    
    init();
});
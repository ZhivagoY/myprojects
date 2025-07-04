document.addEventListener('DOMContentLoaded', function() {
    const categories = document.querySelectorAll('.category-header');
    
    categories.forEach(category => {
        category.addEventListener('click', function() {
            // Закрываем все категории
            const allCategories = document.querySelectorAll('.category');
            allCategories.forEach(cat => {
                if (cat !== this.parentElement) {
                    cat.classList.remove('active');
                    cat.querySelector('.category-header').classList.remove('active');
                }
            });
            
            // Открываем/закрываем текущую категорию
            this.parentElement.classList.toggle('active');
            this.classList.toggle('active');
        });
    });
    
    const subcategories = document.querySelectorAll('.subcategory');
    
    subcategories.forEach(sub => {
        sub.addEventListener('click', function() {
            // Удаляем активный класс у всех подкатегорий
            subcategories.forEach(s => s.classList.remove('active'));
            
            // Добавляем активный класс текущей подкатегории
            this.classList.add('active');
            
            // Здесь можно добавить логику загрузки товаров выбранной подкатегории
            console.log('Выбрана подкатегория:', this.textContent);
        });
    });
});
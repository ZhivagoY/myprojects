// Ждем полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы
    const modal = document.getElementById("catalogModal");
    const btn = document.getElementById("catalogBtn");
    const span = document.getElementsByClassName("close")[0];
    
    // Открываем модальное окно при клике на кнопку
    btn.addEventListener('click', function() {
        modal.style.display = "block";
    });
    
    // Закрываем модальное окно при клике на крестик
    span.addEventListener('click', function() {
        modal.style.display = "none";
    });
    
    // Закрываем модальное окно при клике вне его
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});
const contactsBtn = document.getElementById("contactsBtn");
contactsBtn.addEventListener('click', function() {
    alert("Контактная информация:\nТелефон: +7 (123) 456-78-90\nEmail: info@computer-store.ru");})

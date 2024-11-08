document.addEventListener('DOMContentLoaded', () => {
    function displayCartItems() {
        console.log('Попытка получить элемент с ID cart-items');
        const cartContainer = document.getElementById('cart-items');
        console.log('cartContainer:', cartContainer); // Это должно показать, что cartContainer не null
        
        // Очищаем текущее содержимое
        cartContainer.innerHTML = '';
        
        // Отображаем товары
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.innerHTML = `
                <p>${item.name} - ${item.quantity} шт. - ${(item.price * item.quantity).toFixed(2)} руб.</p>
                <button class="remove-item" data-id="${item.id}">Удалить</button>
            `;
            cartContainer.appendChild(itemElement);
        });
    }

    function removeFromCart(event) {
        const productId = event.target.dataset.id;
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Удаляем товар
        cart = cart.filter(item => item.id !== productId);
        
        // Сохраняем обновленную корзину
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Обновляем отображение
        displayCartItems();
    }

    function clearCart() {
        localStorage.removeItem('cart');
        displayCartItems();
    }

    // Отображаем товары при загрузке
    displayCartItems();

    // Навешиваем обработчик очистки корзины
    const clearCartButton = document.getElementById('clear-cart-button');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', clearCart);
        clearCartButton.style.backgroundColor = '#ff66b2'; // Пример стилизации
        clearCartButton.style.color = '#fff'; // Цвет текста
        clearCartButton.style.border = 'none'; // Убираем границу
        clearCartButton.style.padding = '10px 20px'; // Отступы
        clearCartButton.style.borderRadius = '5px'; // Закругленные углы
        clearCartButton.style.cursor = 'pointer'; // Курсор при наведении
    }
});
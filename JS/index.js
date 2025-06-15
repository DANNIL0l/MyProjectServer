document.addEventListener('DOMContentLoaded', function() {
    // Открытие модального окна бронирования
    const bookButtons = document.querySelectorAll('.book-btn:not(:disabled)');
    const modal = document.getElementById('booking-modal');
    const closeModal = document.querySelector('.close-modal');
    const bookingForm = document.getElementById('booking-form');
    
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const roomCard = this.closest('.room-card');
            const roomName = roomCard.querySelector('h3').textContent;
            const roomPrice = roomCard.querySelector('.price').textContent;
            
            document.getElementById('modal-room').value = roomName;
            document.getElementById('modal-price').value = roomPrice;
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Закрытие модального окна
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Обработка формы бронирования
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        //логика отправки данных на сервер
        const formData = {
            room: document.getElementById('modal-room').value,
            checkIn: document.getElementById('modal-check-in').value,
            checkOut: document.getElementById('modal-check-out').value,
            guests: document.getElementById('modal-guests').value,
            name: document.getElementById('modal-name').value,
            phone: document.getElementById('modal-phone').value,
            email: document.getElementById('modal-email').value
        };
        
        console.log('Данные бронирования:', formData);
        
        //оповещение успешного бронирования
        alert(`Бронирование номера ${formData.room} успешно оформлено! На email ${formData.email} отправлено подтверждение.`);
        
        // Закрытие окна и сброс формы
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        this.reset();
    });
    
    // Фильтрация номеров
    const filterButtons = document.querySelectorAll('.filter-btn');
    const roomCards = document.querySelectorAll('.room-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаление активного класса у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавление активного класса текущей кнопке
            this.classList.add('active');
            
            const filterValue = this.textContent.trim().toLowerCase();
            
            roomCards.forEach(card => {
                if (filterValue === 'все номера') {
                    card.style.display = 'block';
                } else if (filterValue === 'доступные') {
                    if (card.classList.contains('available')) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                } else {
                    const roomType = card.querySelector('h3').textContent.toLowerCase();
                    if (roomType.includes(filterValue)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // Установка даты для заезда
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('check-in').min = today;
    document.getElementById('modal-check-in').min = today;
    
    // Обновление даты для выезда
    document.getElementById('check-in').addEventListener('change', function() {
        document.getElementById('check-out').min = this.value;
    });
    
    document.getElementById('modal-check-in').addEventListener('change', function() {
        document.getElementById('modal-check-out').min = this.value;
    });
});

// Проверка прав админа 
function checkAdminAccess() {
   
    const isAdmin = localStorage.getItem('adminLoggedIn') === 'true';
    
    if (!isAdmin) {
        window.location.href = 'admin-login.html';
        return false;
    }
    return true;
}

// Обработчик кнопки админ-панели
document.querySelector('.admin-btn')?.addEventListener('click', function(e) {
    if (!checkAdminAccess()) {
        e.preventDefault();
    }
});
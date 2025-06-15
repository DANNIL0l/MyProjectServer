document.addEventListener('DOMContentLoaded', function() {
    // Переключение между разделами
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Удаляем активный класс у всех ссылок и секций
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Добавляем активный класс к текущей ссылке
            this.classList.add('active');
            
            // Показываем соответствующую секцию
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
        });
    });
    
    // Имитация функционала кнопок (в реальном приложении здесь были бы обработчики)
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('add-btn')) {
                alert('Добавление новой записи');
            } else if (this.classList.contains('edit-btn')) {
                alert('Редактирование записи');
            } else if (this.classList.contains('delete-btn')) {
                if (confirm('Вы уверены, что хотите удалить эту запись?')) {
                    alert('Запись удалена');
                }
            }
        });
    });
});
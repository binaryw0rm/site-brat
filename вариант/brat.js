document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    const conceptNav = document.getElementById('conceptNav');
    const conceptWords = document.querySelectorAll('.concept-words li');
    const navBlocks = {
        about: document.getElementById('navAbout'),
        catalog: document.getElementById('navCatalog'),
        contact: document.getElementById('navContact')
    };

    // Показ классического меню при наведении на хедер или скролле
    function activateNav() {
        conceptNav.classList.add('active');
    }
    function deactivateNav() {
        // Деактивируем только если курсор не на словах
        if (!conceptNav.matches(':hover')) {
            conceptNav.classList.remove('active');
            // Скрываем все блоки навигации
            Object.values(navBlocks).forEach(block => {
                block.style.opacity = '0';
                block.style.pointerEvents = 'none';
            });
        }
    }

    header.addEventListener('mouseenter', activateNav);
    header.addEventListener('mouseleave', deactivateNav);
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            activateNav();
        } else {
            deactivateNav();
        }
    });

    // Обработка наведения на концепт-слова
    conceptWords.forEach(word => {
        word.addEventListener('mouseenter', function() {
            const target = this.getAttribute('data-target');
            // Скрываем все блоки
            Object.values(navBlocks).forEach(block => {
                block.style.opacity = '0';
                block.style.pointerEvents = 'none';
                block.style.transition = 'opacity 0.3s ease';
            });
            // Показываем нужный блок
            if (navBlocks[target]) {
                navBlocks[target].style.opacity = '1';
                navBlocks[target].style.pointerEvents = 'all';
            }
            activateNav(); // На всякий случай активируем меню
        });
    });

    // Плавный скролл для якорных ссылок (если на одной странице)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if(href === '#') return;

            if(href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
            // Если это обычная ссылка на другую страницу, переход будет стандартным
        });
    });
});
// js/navigation.js
class PageNavigationSystem {
    constructor() {
        this.initNavigation();
        this.initPageTransitions();
    }
    
    initNavigation() {
        // Индикатор активной страницы
        const currentPage = this.getCurrentPage();
        document.querySelectorAll('.nav-word').forEach(word => {
            if (word.getAttribute('data-page') === currentPage) {
                word.classList.add('active');
            }
        });
        
        // Плавные переходы
        document.querySelectorAll('[data-page]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = link.getAttribute('data-page');
                if (targetPage !== currentPage) {
                    this.animateTransition(targetPage);
                }
            });
        });
    }
    
    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('project')) return 'project';
        if (path.includes('services')) return 'services';
        if (path.includes('portfolio')) return 'portfolio';
        if (path.includes('process')) return 'process';
        if (path.includes('contact')) return 'contact';
        return 'home';
    }
    
    animateTransition(targetPage) {
        // Создаем overlay для анимации
        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #004B58;
            z-index: 9999;
            transform: scaleY(0);
            transform-origin: bottom;
            transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1);
        `;
        
        document.body.appendChild(overlay);
        
        // Анимация
        setTimeout(() => {
            overlay.style.transform = 'scaleY(1)';
        }, 10);
        
        // Переход на новую страницу
        setTimeout(() => {
            const url = targetPage === 'home' ? '../index.html' : `${targetPage}.html`;
            window.location.href = url;
        }, 300);
    }
    
    initPageTransitions() {
        // Анимация появления контента при загрузке
        document.body.style.opacity = '0';
        
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.8s ease';
            document.body.style.opacity = '1';
        }, 100);
        
        // Добавляем класс fade-in к элементам при скролле
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.timeline-item, .team-card, .price-card, .grid-item').forEach(el => {
            observer.observe(el);
        });
    }
}

// Запускаем при загрузке
document.addEventListener('DOMContentLoaded', () => {
    new PageNavigationSystem();
});
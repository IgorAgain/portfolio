/* ========================================
   Portfolio Landing Page - Animations
======================================== */

document.addEventListener('DOMContentLoaded', function() {
    initAnimations();
    initActiveCardHighlight();
    initSmoothScroll();
    initButtonFeedback();
});

/**
 * Inicializa as animações de entrada
 */
function initAnimations() {
    const animateItems = document.querySelectorAll('.animate-item');
    
    setTimeout(() => {
        animateItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 100);
        });
    }, 100);
}

/**
 * Destaca o card que está mais visível na viewport
 */
function initActiveCardHighlight() {
    const cards = document.querySelectorAll('.portfolio-card');
    
    if (cards.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '-35% 0px -35% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1]
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
                cards.forEach(card => card.classList.remove('active'));
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    cards.forEach(card => observer.observe(card));
}

/**
 * Smooth scroll para links internos
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Feedback visual nos botões
 */
function initButtonFeedback() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-follow, .btn-portfolio');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

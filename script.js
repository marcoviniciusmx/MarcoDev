// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initParticles();
    initScrollAnimations();
    initStatsCounter();
    initContactForm();
    initSmoothScroll();
});

// ========================================
// NAVIGATION
// ========================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);

        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ========================================
// PARTICLES ANIMATION
// ========================================
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    const startX = Math.random() * 100;
    particle.style.left = startX + '%';
    particle.style.bottom = '0';
    
    // Random animation delay
    const delay = Math.random() * 20;
    particle.style.animationDelay = delay + 's';
    
    // Random size
    const size = Math.random() * 3 + 1;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation
    setTimeout(() => {
        particle.remove();
        createParticle(container);
    }, (20 + delay) * 1000);
}

// ========================================
// SMOOTH SCROLL
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for empty hrefs
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Observe cards
    document.querySelectorAll('.feature-card, .pricing-card, .ai-card, .portfolio-card, .timeline-item').forEach(card => {
        card.classList.add('fade-in');
        observer.observe(card);
    });
}

// ========================================
// STATS COUNTER ANIMATION
// ========================================
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateStats();
            }
        });
    }, observerOptions);

    const resultsSection = document.querySelector('.results');
    if (resultsSection) {
        observer.observe(resultsSection);
    }

    function animateStats() {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = '+' + Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = '+' + target;
                }
            };

            updateCounter();
        });
    }
}

// ========================================
// CONTACT FORM HANDLER
// ========================================
function initContactForm() {
    const form = document.getElementById('contactForm');

    if (!form) return;

    form.addEventListener('submit', function() {
        setTimeout(() => {
            form.reset();
        }, 100);
    });
}
// ========================================
// PARALLAX EFFECT (subtle)
// ========================================
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-glow');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translate(-50%, -50%) translateY(${scrolled * speed}px)`;
    });
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll listeners
const optimizedScroll = debounce(function() {
    // Add any scroll-based optimizations here
}, 10);

window.addEventListener('scroll', optimizedScroll);

// ========================================
// PRELOAD OPTIMIZATION
// ========================================
window.addEventListener('load', function() {
    // Remove loading class if you add one
    document.body.classList.add('loaded');
});

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================
// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// ========================================
// UTILITY FUNCTIONS
// ========================================
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// CONSOLE WELCOME MESSAGE
// ========================================
console.log('%c👨‍💻 MarcoDev Portfolio', 'color: #00d4ff; font-size: 24px; font-weight: bold;');
console.log('%c🚀 Landing Pages que Vendem', 'color: #0066ff; font-size: 16px;');
console.log('%c💼 Entre em contato: https://wa.me/5561983179319', 'color: #00d4ff; font-size: 14px;');
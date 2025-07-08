// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initScrollAnimations();
    initEffectivenessAnimations();
    initCounterAnimations();
    initSmoothScrolling();
});

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Timeline items
    const timelineItems = document.querySelectorAll('.timeline__item');
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(item);
    });

    // Leadership cards
    const leadershipCards = document.querySelectorAll('.leadership__card');
    leadershipCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Breakthrough cards
    const breakthroughCards = document.querySelectorAll('.breakthrough__card');
    breakthroughCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(card);
    });

    // Impact statistics
    const impactStats = document.querySelectorAll('.impact__stat');
    impactStats.forEach((stat, index) => {
        stat.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(stat);
    });

    // Legacy symbols
    const legacySymbols = document.querySelectorAll('.symbol-item');
    legacySymbols.forEach((symbol, index) => {
        symbol.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(symbol);
    });
}

// Effectiveness bar animations
function initEffectivenessAnimations() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const effectivenessObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target.querySelector('.effectiveness-fill');
                const effectiveness = entry.target.getAttribute('data-effectiveness');
                
                if (bar && effectiveness) {
                    setTimeout(() => {
                        bar.style.width = effectiveness + '%';
                    }, 300);
                }
            }
        });
    }, observerOptions);

    const effectivenessBars = document.querySelectorAll('.effectiveness-bar');
    effectivenessBars.forEach(bar => {
        effectivenessObserver.observe(bar);
    });
}

// Counter animations for statistics
function initCounterAnimations() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                
                if (target && !counter.classList.contains('counted')) {
                    counter.classList.add('counted');
                    animateCounter(counter, target);
                }
            }
        });
    }, observerOptions);

    const counters = document.querySelectorAll('.stat__number');
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Animate counter from 0 to target value
function animateCounter(element, target) {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format large numbers with commas
        const formattedNumber = formatNumber(Math.floor(current));
        element.textContent = formattedNumber;
    }, duration / steps);
}

// Format numbers with commas for thousands
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K';
    } else {
        return num.toString();
    }
}

// Smooth scrolling for navigation
function initSmoothScrolling() {
    // Add smooth scrolling to all anchor links
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

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Phoenix icon animation on hover
    const phoenixIcon = document.querySelector('.phoenix-icon');
    if (phoenixIcon) {
        phoenixIcon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        phoenixIcon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }

    // Timeline marker pulse effect
    const timelineMarkers = document.querySelectorAll('.timeline__marker');
    timelineMarkers.forEach(marker => {
        marker.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.borderColor = '#16a34a';
            this.style.transition = 'all 0.3s ease';
        });
        
        marker.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.borderColor = '#f97316';
        });
    });

    // Leadership card icon bounce
    const leadershipIcons = document.querySelectorAll('.leadership__icon');
    leadershipIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
    });

    // Add keyboard navigation support
    addKeyboardSupport();
});

// Keyboard navigation support
function addKeyboardSupport() {
    const focusableElements = document.querySelectorAll(
        '.leadership__card, .breakthrough__card, .impact__stat, .symbol-item'
    );

    focusableElements.forEach(element => {
        element.setAttribute('tabindex', '0');
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // Trigger hover effect
                this.style.transform = 'translateY(-8px) scale(1.02)';
                this.style.transition = 'transform 0.3s ease';
                
                setTimeout(() => {
                    this.style.transform = '';
                }, 300);
            }
        });
    });
}

// Add scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #f97316, #16a34a, #f59e0b);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress on load
document.addEventListener('DOMContentLoaded', addScrollProgress);

// Add parallax effect to hero section
function addParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
}

// Initialize parallax effect
document.addEventListener('DOMContentLoaded', addParallaxEffect);

// Add resize handler for responsive animations
window.addEventListener('resize', function() {
    // Recalculate animations on resize
    const animatedElements = document.querySelectorAll('.animate');
    animatedElements.forEach(element => {
        // Reset animation state
        element.classList.remove('animate');
        
        // Re-trigger animation after a short delay
        setTimeout(() => {
            element.classList.add('animate');
        }, 100);
    });
});

// Performance optimization: Throttle scroll events
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

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll-based animations can be added here
}, 16)); // ~60fps

// Add loading animation
function addLoadingAnimation() {
    const elements = document.querySelectorAll('.hero__content > *');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Initialize loading animation
document.addEventListener('DOMContentLoaded', addLoadingAnimation);

// Add error handling for animations
function handleAnimationErrors() {
    window.addEventListener('error', function(e) {
        console.warn('Animation error:', e);
        // Fallback: ensure elements are visible
        const hiddenElements = document.querySelectorAll('[style*="opacity: 0"]');
        hiddenElements.forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'none';
        });
    });
}

// Initialize error handling
document.addEventListener('DOMContentLoaded', handleAnimationErrors);

// Add accessibility announcements for screen readers
function addAccessibilityAnnouncements() {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `;
    document.body.appendChild(announcer);

    // Announce when sections come into view
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionTitle = entry.target.querySelector('.section-title');
                if (sectionTitle) {
                    announcer.textContent = `Now viewing: ${sectionTitle.textContent}`;
                }
            }
        });
    }, { threshold: 0.5 });

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', addAccessibilityAnnouncements);
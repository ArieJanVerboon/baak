// Application state
let expandedCard = null;

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollAnimations();
    initializeCardInteractions();
    initializeSmoothScrolling();
});

// Scroll animations
function initializeScrollAnimations() {
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

    // Observe all fade-in-up elements
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Card interactions
function initializeCardInteractions() {
    const phaseCards = document.querySelectorAll('.phase-card');
    
    phaseCards.forEach(card => {
        card.addEventListener('click', function() {
            toggleCard(this);
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            if (expandedCard && expandedCard !== this) {
                return;
            }
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (expandedCard && expandedCard === this) {
                return;
            }
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Toggle card expansion
function toggleCard(card) {
    if (expandedCard === card) {
        // Collapse the card
        collapseCard(card);
        expandedCard = null;
    } else {
        // Collapse any currently expanded card
        if (expandedCard) {
            collapseCard(expandedCard);
        }
        
        // Expand the clicked card
        expandCard(card);
        expandedCard = card;
    }
}

// Expand card with animation
function expandCard(card) {
    card.classList.add('expanded');
    card.style.transform = 'translateY(-8px) scale(1.02)';
    card.style.zIndex = '10';
    card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
    
    // Smooth scroll to center the card
    setTimeout(() => {
        const cardRect = card.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const cardCenter = cardRect.top + cardRect.height / 2;
        const windowCenter = windowHeight / 2;
        const scrollOffset = cardCenter - windowCenter;
        
        window.scrollBy({
            top: scrollOffset,
            behavior: 'smooth'
        });
    }, 100);
    
    // Update expand indicator
    const indicator = card.querySelector('.expand-indicator');
    if (indicator) {
        indicator.textContent = 'Minder Details ✕';
    }
}

// Collapse card with animation
function collapseCard(card) {
    card.classList.remove('expanded');
    card.style.transform = 'translateY(0) scale(1)';
    card.style.zIndex = '1';
    card.style.boxShadow = '';
    
    // Reset expand indicator
    const indicator = card.querySelector('.expand-indicator');
    if (indicator) {
        indicator.textContent = 'Meer Details';
    }
}

// Smooth scrolling for internal links
function initializeSmoothScrolling() {
    // Add smooth scrolling behavior to the document
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Handle scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const mainContent = document.querySelector('.main-content');
            if (mainContent) {
                mainContent.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Add some interactive visual effects
function addVisualEffects() {
    // Create floating particles for the header
    const header = document.querySelector('.header');
    if (header) {
        createFloatingParticles(header);
    }
}

// Create floating particles effect
function createFloatingParticles(container) {
    const particleCount = window.innerWidth > 768 ? 20 : 10;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s infinite linear;
            pointer-events: none;
            z-index: 1;
        `;
        container.appendChild(particle);
    }
    
    // Add CSS animation for particles
    if (!document.querySelector('#particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes float {
                0% {
                    transform: translateY(0px) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
    // Reset any expanded cards on mobile
    if (window.innerWidth <= 768 && expandedCard) {
        collapseCard(expandedCard);
        expandedCard = null;
    }
});

// Add keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && expandedCard) {
        collapseCard(expandedCard);
        expandedCard = null;
    }
});

// Initialize visual effects after page load
window.addEventListener('load', function() {
    addVisualEffects();
});

// Add touch support for mobile devices
function initializeTouchSupport() {
    const phaseCards = document.querySelectorAll('.phase-card');
    
    phaseCards.forEach(card => {
        let touchStartY = 0;
        let touchStartTime = 0;
        
        card.addEventListener('touchstart', function(e) {
            touchStartY = e.touches[0].clientY;
            touchStartTime = Date.now();
        });
        
        card.addEventListener('touchend', function(e) {
            const touchEndY = e.changedTouches[0].clientY;
            const touchDuration = Date.now() - touchStartTime;
            const touchDistance = Math.abs(touchEndY - touchStartY);
            
            // Only trigger click if it was a tap (not a scroll)
            if (touchDuration < 500 && touchDistance < 10) {
                toggleCard(this);
            }
        });
    });
}

// Initialize touch support
initializeTouchSupport();

// Performance optimization: Throttle scroll events
let ticking = false;

function updateScrollAnimations() {
    // Update any scroll-based animations here
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateScrollAnimations);
        ticking = true;
    }
});
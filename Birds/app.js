// Birds of Cyclades Infographic - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize the application
    initializeApp();
    
    function initializeApp() {
        addScrollEffects();
        addCardInteractions();
        addAccessibilityFeatures();
        addSmoothScrolling();
    }
    
    // Add scroll-based animation effects
    function addScrollEffects() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        // Observe bird cards and sections
        const birdCards = document.querySelectorAll('.bird-card');
        const sections = document.querySelectorAll('.intro, .footer');
        
        birdCards.forEach(card => observer.observe(card));
        sections.forEach(section => observer.observe(section));
    }
    
    // Add interactive card behaviors
    function addCardInteractions() {
        const birdCards = document.querySelectorAll('.bird-card');
        
        birdCards.forEach((card, index) => {
            // Add click handler for better mobile interaction
            card.addEventListener('click', function() {
                this.classList.toggle('active');
            });
            
            // Add keyboard navigation support
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'article');
            card.setAttribute('aria-label', `Vogel ${index + 1}: ${card.querySelector('.bird-name').textContent}`);
            
            // Keyboard interaction
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.classList.toggle('active');
                }
            });
            
            // Enhanced hover effects
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // Add accessibility features
    function addAccessibilityFeatures() {
        // Add skip navigation
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Ga naar hoofdinhoud';
        skipLink.className = 'skip-link sr-only';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--greek-primary-blue);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
            this.classList.remove('sr-only');
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
            this.classList.add('sr-only');
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add main content landmark
        const mainSection = document.querySelector('.birds-section');
        if (mainSection) {
            mainSection.id = 'main-content';
        }
        
        // Add proper heading structure
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.setAttribute('role', 'banner');
        }
    }
    
    // Add smooth scrolling for better UX
    function addSmoothScrolling() {
        // Smooth scroll to sections when needed
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Add performance optimizations
    function optimizePerformance() {
        // Lazy load animations only when needed
        if ('IntersectionObserver' in window) {
            const lazyAnimations = document.querySelectorAll('.bird-card');
            
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                        animationObserver.unobserve(entry.target);
                    }
                });
            });
            
            lazyAnimations.forEach(card => {
                card.style.animationPlayState = 'paused';
                animationObserver.observe(card);
            });
        }
    }
    
    // Error handling
    window.addEventListener('error', function(e) {
        console.warn('Non-critical error in birds infographic:', e.message);
        // Continue gracefully without breaking the user experience
    });
    
    // Handle reduced motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    function handleReducedMotion(mediaQuery) {
        if (mediaQuery.matches) {
            // Disable animations for users who prefer reduced motion
            document.documentElement.style.setProperty('--duration-fast', '0ms');
            document.documentElement.style.setProperty('--duration-normal', '0ms');
            
            // Remove hover transforms
            const cards = document.querySelectorAll('.bird-card');
            cards.forEach(card => {
                card.style.transition = 'none';
            });
        }
    }
    
    // Listen for changes in motion preferences
    prefersReducedMotion.addListener(handleReducedMotion);
    handleReducedMotion(prefersReducedMotion);
    
    // Initialize performance optimizations
    optimizePerformance();
    
    console.log('Belangrijke Vogels van de Cycladen infographic loaded successfully!');
});
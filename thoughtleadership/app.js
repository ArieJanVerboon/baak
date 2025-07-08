document.addEventListener('DOMContentLoaded', function() {
    // Progress bar functionality
    const progressBar = document.getElementById('progressBar');
    
    function updateProgressBar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollTop / documentHeight) * 100;
        
        progressBar.style.width = scrollPercentage + '%';
    }
    
    // Throttle scroll events for better performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateProgressBar);
            ticking = true;
        }
    }
    
    function handleScroll() {
        ticking = false;
        requestTick();
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Initialize progress bar
    updateProgressBar();
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections for animation
    const animatedElements = document.querySelectorAll('.phase-card, .framework-card, .success-factor, .matrix-column');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease-out';
        observer.observe(element);
    });
    
    // Phase card hover effects
    const phaseCards = document.querySelectorAll('.phase-card');
    phaseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -1px rgba(0, 0, 0, 0.02)';
        });
    });
    
    // Framework card interactions
    const frameworkCards = document.querySelectorAll('.framework-card');
    frameworkCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.framework-header i');
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.framework-header i');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Success factor card interactions
    const successFactors = document.querySelectorAll('.success-factor');
    successFactors.forEach(factor => {
        factor.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.factor-icon');
            icon.style.transform = 'scale(1.15) rotate(10deg)';
            icon.style.background = 'linear-gradient(135deg, var(--color-primary), var(--color-primary-hover))';
        });
        
        factor.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.factor-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
            icon.style.background = 'var(--color-primary)';
        });
    });
    
    // Smooth reveal animation for lists
    const lists = document.querySelectorAll('.actions-section ul, .roles-section ul, .framework-card ul, .role-group ul');
    lists.forEach(list => {
        const items = list.querySelectorAll('li');
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = `all 0.4s ease-out ${index * 0.1}s`;
        });
    });
    
    // Observe lists for staggered animation
    const listObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('li');
                items.forEach(item => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                });
            }
        });
    }, observerOptions);
    
    lists.forEach(list => {
        listObserver.observe(list);
    });
    
    // Add click-to-expand functionality for phase cards on mobile
    if (window.innerWidth <= 768) {
        phaseCards.forEach(card => {
            const content = card.querySelector('.phase-content');
            const header = card.querySelector('.phase-header');
            
            // Initially collapse content on mobile
            content.style.maxHeight = '0';
            content.style.overflow = 'hidden';
            content.style.transition = 'max-height 0.4s ease-out';
            
            // Add expand indicator
            const expandIndicator = document.createElement('div');
            expandIndicator.innerHTML = '<i class="fas fa-chevron-down"></i>';
            expandIndicator.style.cssText = `
                margin-left: auto;
                color: var(--color-primary);
                transition: transform 0.3s ease;
                cursor: pointer;
            `;
            header.appendChild(expandIndicator);
            
            header.addEventListener('click', function() {
                const isExpanded = content.style.maxHeight !== '0px';
                
                if (isExpanded) {
                    content.style.maxHeight = '0';
                    expandIndicator.style.transform = 'rotate(0deg)';
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    expandIndicator.style.transform = 'rotate(180deg)';
                }
            });
        });
    }
    
    // Add subtle parallax effect to hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Add typing animation to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid var(--color-btn-primary-text)';
        
        let i = 0;
        const typeWriter = function() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 500);
            }
        };
        
        // Start typing animation after a brief delay
        setTimeout(typeWriter, 500);
    }
    
    // Add number counting animation for phase numbers
    const phaseNumbers = document.querySelectorAll('.phase-number');
    const numberObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const number = entry.target;
                const target = parseInt(number.textContent);
                let current = 0;
                
                const increment = target / 20;
                const timer = setInterval(() => {
                    current += increment;
                    number.textContent = Math.floor(current);
                    
                    if (current >= target) {
                        number.textContent = target;
                        clearInterval(timer);
                    }
                }, 50);
            }
        });
    }, observerOptions);
    
    phaseNumbers.forEach(number => {
        numberObserver.observe(number);
    });
    
    // Add smooth hover effects for all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .phase-card, .framework-card, .success-factor');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            window.scrollBy(0, 100);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            window.scrollBy(0, -100);
        }
    });
    
    // Add resize handler for responsive adjustments
    window.addEventListener('resize', function() {
        // Recalculate progress bar
        updateProgressBar();
        
        // Adjust mobile interactions based on screen size
        if (window.innerWidth > 768) {
            // Remove mobile-specific interactions if screen becomes larger
            phaseCards.forEach(card => {
                const content = card.querySelector('.phase-content');
                if (content) {
                    content.style.maxHeight = 'none';
                    content.style.overflow = 'visible';
                }
            });
        }
    });
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });
});
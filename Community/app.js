// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initScrollAnimations();
    initInteractiveElements();
    initNavigationHighlight();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for sticky nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animate elements when they come into view
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
            }
        });
    }, observerOptions);
    
    // Observe all sections and key elements
    const elementsToAnimate = document.querySelectorAll(
        'section, .benefit-card, .feature-item, .pillar, .support-item'
    );
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Add interactive behaviors
function initInteractiveElements() {
    // Highlight box pulse effect
    const highlightBox = document.querySelector('.highlight-box');
    if (highlightBox) {
        setInterval(() => {
            highlightBox.style.transform = 'scale(1.05)';
            setTimeout(() => {
                highlightBox.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    }
    
    // Collaboration diagram rotation
    const diagramCircle = document.querySelector('.diagram-circle');
    if (diagramCircle) {
        let rotation = 0;
        setInterval(() => {
            rotation += 1;
            diagramCircle.style.transform = `rotate(${rotation}deg)`;
        }, 100);
    }
    
    // CTA button hover effect enhancement
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.05)';
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                pointer-events: none;
                animation: rippleEffect 0.6s ease-out;
                z-index: 1;
            `;
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Show success message with slight delay for ripple effect
            setTimeout(() => {
                showJoinMessage();
            }, 100);
        });
    }
    
    // Add hover effects to icon items
    const iconItems = document.querySelectorAll('.icon-item');
    iconItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElement = document.querySelector('.hero-visual');
        if (parallaxElement) {
            const speed = scrolled * 0.3;
            parallaxElement.style.transform = `translateY(${speed}px)`;
        }
    });
}

// Highlight current section in navigation
function initNavigationHighlight() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Show join message when CTA is clicked
function showJoinMessage() {
    // Remove any existing modals
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // Create modal content
    const modal = document.createElement('div');
    modal.className = 'modal-content';
    modal.style.cssText = `
        background: var(--color-surface);
        padding: var(--space-32);
        border-radius: var(--radius-lg);
        text-align: center;
        max-width: 500px;
        width: 90%;
        margin: var(--space-16);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        transform: translateY(50px);
        transition: transform 0.3s ease;
        border: 1px solid var(--color-card-border);
    `;
    
    // Create close button
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.style.cssText = `
        position: absolute;
        top: 10px;
        right: 15px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: var(--color-text-secondary);
        padding: 5px;
        border-radius: var(--radius-sm);
        transition: color 0.2s ease;
    `;
    closeButton.addEventListener('mouseenter', function() {
        this.style.color = 'var(--color-text)';
    });
    closeButton.addEventListener('mouseleave', function() {
        this.style.color = 'var(--color-text-secondary)';
    });
    
    modal.innerHTML = `
        <div style="font-size: 3rem; color: var(--color-success); margin-bottom: var(--space-16);">
            <i class="fas fa-check-circle"></i>
        </div>
        <h3 style="color: var(--color-text); margin-bottom: var(--space-16); font-size: var(--font-size-2xl);">Welkom bij de community!</h3>
        <p style="color: var(--color-text-secondary); margin-bottom: var(--space-24); line-height: var(--line-height-normal);">
            Bedankt voor je interesse! We nemen binnenkort contact met je op om je te helpen bij het starten van je kennisdeelreis.
        </p>
        <button class="btn btn--primary modal-close-btn" style="font-size: var(--font-size-base); padding: var(--space-12) var(--space-24);">
            <i class="fas fa-thumbs-up" style="margin-right: var(--space-8);"></i>
            Geweldig!
        </button>
    `;
    
    // Add close button
    modal.style.position = 'relative';
    modal.appendChild(closeButton);
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Animate modal in
    setTimeout(() => {
        overlay.style.opacity = '1';
        modal.style.transform = 'translateY(0)';
    }, 10);
    
    // Close modal function
    function closeModal() {
        overlay.style.opacity = '0';
        modal.style.transform = 'translateY(50px)';
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.remove();
            }
        }, 300);
    }
    
    // Close modal when clicking close button or modal button
    const modalCloseBtn = modal.querySelector('.modal-close-btn');
    modalCloseBtn.addEventListener('click', closeModal);
    closeButton.addEventListener('click', closeModal);
    
    // Close modal when clicking overlay
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    function handleEscape(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    }
    document.addEventListener('keydown', handleEscape);
}

// Add CSS for animations and effects
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes rippleEffect {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .nav-links a.active {
        background: var(--color-primary);
        color: var(--color-btn-primary-text);
    }
    
    .highlight-box {
        transition: transform 0.3s ease;
    }
    
    .diagram-circle {
        transition: transform 0.1s ease;
    }
    
    .cta-button {
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
    }
    
    /* Floating animation for opportunity icons */
    .icon-item {
        animation: float 3s ease-in-out infinite;
    }
    
    .icon-item:nth-child(2) {
        animation-delay: -1s;
    }
    
    .icon-item:nth-child(3) {
        animation-delay: -2s;
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
        }
    }
    
    /* Pulse effect for benefit cards */
    .benefit-card:hover .benefit-icon {
        animation: pulse 0.6s ease-in-out;
    }
    
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }
    
    /* Modal styling fixes */
    .modal-overlay {
        backdrop-filter: blur(4px);
    }
    
    .modal-content {
        animation: modalAppear 0.3s ease-out;
    }
    
    @keyframes modalAppear {
        from {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
`;

document.head.appendChild(style);

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
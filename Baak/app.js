// Enhanced JavaScript for the Greek Islands Sailing Itinerary
(function () {
  'use strict';

  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  /**
   * Toggle between light and dark themes
   */
  function toggleTheme() {
    const current = html.getAttribute('data-color-scheme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-color-scheme', next);
    
    // Update theme toggle icon
    updateThemeIcon(next);
  }

  /**
   * Update the theme toggle icon based on current theme
   */
  function updateThemeIcon(theme) {
    const svg = themeToggle.querySelector('svg');
    if (theme === 'dark') {
      // Moon icon for dark mode
      svg.innerHTML = `
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      `;
    } else {
      // Sun icon for light mode
      svg.innerHTML = `
        <circle cx="12" cy="12" r="5"></circle>
        <path d="M12 1v2"></path>
        <path d="M12 21v2"></path>
        <path d="M4.22 4.22l1.42 1.42"></path>
        <path d="M18.36 18.36l1.42 1.42"></path>
        <path d="M1 12h2"></path>
        <path d="M21 12h2"></path>
        <path d="M4.22 19.78l1.42-1.42"></path>
        <path d="M18.36 5.64l1.42-1.42"></path>
      `;
    }
  }

  /**
   * Expand / collapse card highlights on mobile (<768px)
   */
  function handleCardInteraction(event) {
    // Only enable accordion style interaction on small screens
    if (window.innerWidth >= 768) return;

    const card = event.currentTarget;
    const expanded = card.classList.contains('expanded');

    // Collapse all other cards first
    document.querySelectorAll('.day-card.expanded').forEach((el) => {
      if (el !== card) {
        el.classList.remove('expanded');
        el.setAttribute('aria-expanded', 'false');
      }
    });

    // Toggle the selected card
    if (expanded) {
      card.classList.remove('expanded');
      card.setAttribute('aria-expanded', 'false');
    } else {
      card.classList.add('expanded');
      card.setAttribute('aria-expanded', 'true');
      
      // Smooth scroll to bring the expanded card into view
      setTimeout(() => {
        card.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 150);
    }
  }

  /**
   * Keyboard support (Enter / Space)
   */
  function handleCardKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardInteraction(event);
    }
  }

  /**
   * Remove any expanded states when switching to desktop view
   */
  function resetExpandedOnResize() {
    if (window.innerWidth >= 768) {
      document.querySelectorAll('.day-card.expanded').forEach((card) => {
        card.classList.remove('expanded');
        card.setAttribute('aria-expanded', 'false');
      });
    }
  }

  /**
   * Add enhanced hover effects for desktop
   */
  function enhanceDesktopInteractions() {
    if (window.innerWidth < 768) return;
    
    const cards = document.querySelectorAll('.day-card');
    
    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
        card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
      });
    });
  }

  /**
   * Handle image loading states
   */
  function initImageLoading() {
    const images = document.querySelectorAll('.card__image img');
    
    images.forEach(img => {
      // Set initial loading state
      img.style.opacity = '0';
      
      // Handle load event
      img.addEventListener('load', () => {
        img.style.opacity = '1';
        img.classList.add('loaded');
      });

      // Handle error state
      img.addEventListener('error', () => {
        const placeholder = document.createElement('div');
        placeholder.style.cssText = `
          width: 100%;
          height: 100%;
          background: var(--color-bg-2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-secondary);
          font-size: var(--font-size-sm);
        `;
        placeholder.textContent = 'Image not available';
        img.parentNode.replaceChild(placeholder, img);
      });

      // If image is already loaded (cached)
      if (img.complete) {
        img.style.opacity = '1';
        img.classList.add('loaded');
      }
    });
  }

  /**
   * Add intersection observer for scroll animations
   */
  function addScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '50px'
    });

    // Observe all cards and icons
    document.querySelectorAll('.day-card, .sail-icon').forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      observer.observe(el);
    });
  }

  /**
   * Add smooth scrolling behavior
   */
  function addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
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
   * Add touch gestures for mobile enhancement
   */
  function addTouchGestures() {
    let startY = 0;
    let startX = 0;
    
    document.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
      startX = e.touches[0].clientX;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      if (!startY || !startX) return;
      
      const endY = e.changedTouches[0].clientY;
      const endX = e.changedTouches[0].clientX;
      const diffY = startY - endY;
      const diffX = startX - endX;
      
      // Reset values
      startY = 0;
      startX = 0;
      
      // Add subtle haptic feedback if available
      if ('vibrate' in navigator && Math.abs(diffY) > 50) {
        navigator.vibrate(10);
      }
    }, { passive: true });
  }

  /**
   * Initialize performance optimizations
   */
  function initPerformanceOptimizations() {
    // Add loading optimization for images
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px'
    });

    // Observe images for lazy loading
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  /**
   * Initialize everything
   */
  function init() {
    // Set initial theme if not set
    if (!html.hasAttribute('data-color-scheme')) {
      html.setAttribute('data-color-scheme', 'light');
    }

    // Update theme icon on load
    updateThemeIcon(html.getAttribute('data-color-scheme'));

    // Theme toggle
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
    }

    // Add interaction listeners to each day card
    document.querySelectorAll('.day-card').forEach((card) => {
      card.addEventListener('click', handleCardInteraction);
      card.addEventListener('keydown', handleCardKeydown);
      // Set initial aria-expanded state
      card.setAttribute('aria-expanded', 'false');
    });

    // Watch for viewport changes
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resetExpandedOnResize();
        enhanceDesktopInteractions();
      }, 250);
    });

    // Initialize enhancements
    initImageLoading();
    enhanceDesktopInteractions();
    addScrollAnimations();
    addSmoothScrolling();
    addTouchGestures();
    initPerformanceOptimizations();

    // Add subtle page entrance animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    // Show page after a brief delay
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Handle visibility changes for performance
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // Pause any animations when tab is not visible
      document.querySelectorAll('.day-card').forEach(card => {
        card.style.animationPlayState = 'paused';
      });
    } else {
      // Resume animations when tab becomes visible
      document.querySelectorAll('.day-card').forEach(card => {
        card.style.animationPlayState = 'running';
      });
    }
  });

})();
// Minimal JavaScript for Cyclades Birds Infographic
// Enhances accessibility and user experience

// Helper function to remove inline style property safely
function removeInlineStyle(el, prop) {
  if (el.style && el.style[prop] !== undefined) {
    el.style.removeProperty(prop);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // Make all species cards keyboard accessible and animate on scroll
  const cards = document.querySelectorAll('.species-card');

  cards.forEach((card) => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'article');

    // Keyboard interaction: pressing Enter or Space focuses title (screen-reader friendly)
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const title = card.querySelector('.species-card__title');
        if (title) {
          title.focus();
        }
      }
    });
  });

  // Intersection Observer for fade-in effect (opacity only to avoid transform conflict)
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            // Remove transform once card becomes visible so :hover transform takes precedence
            removeInlineStyle(entry.target, 'transform');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    cards.forEach((card) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)'; // initial entry state
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(card);
    });
  }

  // Subtle parallax effect for hero stripes
  const heroStripes = document.querySelector('.hero-stripes');
  if (heroStripes) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      heroStripes.style.transform = `translateY(${scrolled * 0.1}px)`;
    });
  }
});
// JavaScript for the updated Greek Islands Sailing Itinerary (bug-fixed)
(function () {
  'use strict';

  /* ------------------------------------------------------------------
   *  DATA
   * ------------------------------------------------------------------ */
  const itineraryData = [
    {"id":1,"dayLabel":"Day 1","weekday":"Sun","date":"2025-09-07","destination":"Kea","distanceNM":"38 NM","image":"https://pplx-res.cloudinary.com/image/upload/v1753821611/pplx_project_search_images/77b3797c4321b02c3952b51249df0cb6cdb9cd32.jpg","highlights":"Early hop to Vourkari; shelter from afternoon Meltemi behind the breakwater and enjoy waterfront tavernas."},
    {"id":2,"dayLabel":"Day 2","weekday":"Mon","date":"2025-09-08","destination":"Kythnos (Kolona)","distanceNM":"25 NM","image":"https://pplx-res.cloudinary.com/image/upload/v1753780420/pplx_project_search_images/be2fb555e1833b94adcf0cca5f32b62462def51b.jpg","highlights":"Anchor on the double-sided sandbar at Kolona; swim in turquoise bays and hike up to the chapel."},
    {"id":3,"dayLabel":"Day 3","weekday":"Tue","date":"2025-09-09","destination":"Serifos","distanceNM":"35 NM","image":"https://pplx-res.cloudinary.com/image/upload/v1753821611/pplx_project_search_images/f10cad539f569f12d143dec3f0a087aa7591935f.jpg","highlights":"Arrive Livadi, bus up to dramatic Chora for sunset views and cycladic nightlife."},
    {"id":4,"dayLabel":"Day 4","weekday":"Wed","date":"2025-09-10","destination":"Sifnos","distanceNM":"22 NM","image":"https://pplx-res.cloudinary.com/image/upload/v1752753490/pplx_project_search_images/16c540baaf9eaff13b0e959cd4ae4cbd49f1725a.jpg","highlights":"Short reach to Kamares; refuel and sample renowned island gastronomy in Apollonia."},
    {"id":5,"dayLabel":"Day 5","weekday":"Thu","date":"2025-09-11","destination":"Milos","distanceNM":"28 NM","image":"https://pplx-res.cloudinary.com/image/upload/v1753780420/pplx_project_search_images/ba64cb5716b6be674382e5b2479183c86ac56625.jpg","highlights":"Sail past Kleftiko’s white cliffs, overnight in Adamas; visit lunar Sarakiniko beach."},
    {"id":6,"dayLabel":"Day 6","weekday":"Fri","date":"2025-09-12","destination":"Kimolos","distanceNM":"12 NM","image":"https://pplx-res.cloudinary.com/image/upload/v1753821612/pplx_project_search_images/813c5d39e0c3e37411e250bd0705442016e6db13.jpg","highlights":"Quick morning hop; quiet anchorage at Psathi, explore untouched Chorio village."},
    {"id":7,"dayLabel":"Day 7","weekday":"Sat","date":"2025-09-13","destination":"Santorini (Fira)","distanceNM":"60 NM","image":"https://pplx-res.cloudinary.com/image/upload/v1753821611/pplx_project_search_images/cc0208979f4efc2ecd5a89dbf095e4ded19f8c86.jpg","highlights":"Longest passage; enter iconic caldera under sail, moor at old port and enjoy sunset in Oia."},
    {"id":8,"dayLabel":"Day 8","weekday":"Sun","date":"2025-09-14","destination":"Santorini (Rest)","distanceNM":"0 NM","image":"https://source.unsplash.com/800x600/?santorini,architecture","highlights":"Rest day: winery tour, archaeological site of Akrotiri, provisioning."},
    {"id":9,"dayLabel":"Day 9","weekday":"Mon","date":"2025-09-15","destination":"Ios","distanceNM":"23 NM","image":"https://source.unsplash.com/800x600/?ios,greece","highlights":"Reach to secluded Manganari bay; hike to Homer’s tomb and lively Chora."},
    {"id":10,"dayLabel":"Day 10","weekday":"Tue","date":"2025-09-16","destination":"Folegandros","distanceNM":"20 NM","image":"https://source.unsplash.com/800x600/?folegandros,island","highlights":"Drop anchor in Karavostasis; bus up to clifftop Chora and the Panagia church trail."},
    {"id":11,"dayLabel":"Day 11","weekday":"Wed","date":"2025-09-17","destination":"Sifnos (Vathi)","distanceNM":"34 NM","image":"https://pplx-res.cloudinary.com/image/upload/v1752753490/pplx_project_search_images/16c540baaf9eaff13b0e959cd4ae4cbd49f1725a.jpg","highlights":"Beam reach to the sheltered bay of Vathi; quiet beaches and tavern-lined waterfront."},
    {"id":12,"dayLabel":"Day 12","weekday":"Thu","date":"2025-09-18","destination":"Poros","distanceNM":"60 NM","image":"https://source.unsplash.com/800x600/?poros,island","highlights":"Early start across open water into the Saronic Gulf; tie stern-to on Poros town quay."},
    {"id":13,"dayLabel":"Day 13","weekday":"Fri","date":"2025-09-19","destination":"Poros ➜ Hydra","distanceNM":"26 NM","image":"https://source.unsplash.com/800x600/?hydra,harbor","highlights":"Leisurely brunch sail, stopping for a swim at Russian Bay before continuing to Hydra."},
    {"id":14,"dayLabel":"Day 14","weekday":"Sat","date":"2025-09-20","destination":"Hydra","distanceNM":"13 NM","image":"https://source.unsplash.com/800x600/?hydra,greece","highlights":"Final morning exploring car-free Hydra; hike the bastions before disembarkation."}
  ];

  /* ------------------------------------------------------------------
   *  THEME TOGGLE
   * ------------------------------------------------------------------ */
  const themeToggleBtn = document.getElementById('themeToggle');
  const html = document.documentElement;

  function setScheme(scheme) {
    html.setAttribute('data-color-scheme', scheme);
    updateToggleIcon(scheme);
  }

  function toggleScheme() {
    const current = html.getAttribute('data-color-scheme') === 'dark' ? 'dark' : 'light';
    const next = current === 'light' ? 'dark' : 'light';
    setScheme(next);
  }

  function updateToggleIcon(scheme) {
    const svg = themeToggleBtn.querySelector('svg');
    if (!svg) return;

    if (scheme === 'dark') {
      svg.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
    } else {
      svg.innerHTML = [
        '<circle cx="12" cy="12" r="5"></circle>',
        '<path d="M12 1v2"></path>',
        '<path d="M12 21v2"></path>',
        '<path d="M4.22 4.22l1.42 1.42"></path>',
        '<path d="M18.36 18.36l1.42 1.42"></path>',
        '<path d="M1 12h2"></path>',
        '<path d="M21 12h2"></path>',
        '<path d="M4.22 19.78l1.42-1.42"></path>',
        '<path d="M18.36 5.64l1.42-1.42"></path>'
      ].join('');
    }
  }

  /* ------------------------------------------------------------------
   *  UTILS
   * ------------------------------------------------------------------ */
  function formatDateParts(dateStr) {
    const date = new Date(dateStr);
    const options = { weekday: 'short' };
    const dayOfWeek = date.toLocaleDateString('en-US', options);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dateNumber = `${months[date.getMonth()]} ${date.getDate()}`;
    const year = date.getFullYear();
    return { dayOfWeek, dateNumber, year };
  }

  function computeTotalDistance() {
    return itineraryData.reduce((sum, d) => sum + (parseInt(d.distanceNM) || 0), 0);
  }

  /* ------------------------------------------------------------------
   *  DOM BUILDERS
   * ------------------------------------------------------------------ */
  function buildDayCard(day) {
    const { dayOfWeek, dateNumber, year } = formatDateParts(day.date);

    const article = document.createElement('article');
    article.className = 'card day-card';
    article.tabIndex = 0;
    article.setAttribute('role', 'button');
    article.setAttribute('aria-expanded', 'false');

    article.innerHTML = `
      <div class="date-badge">
        <span class="day-of-week">${dayOfWeek}</span>
        <span class="date-number">${dateNumber}</span>
        <span class="year">${year}</span>
      </div>
      <figure class="card__image">
        <img data-src="${day.image}" alt="${day.destination} island view" crossorigin="anonymous" />
      </figure>
      <div class="card__header">
        <h2>${day.dayLabel}</h2>
        <h3>${day.destination}</h3>
      </div>
      <div class="card__body">
        <p class="distance"><strong>Distance:</strong> ${day.distanceNM}</p>
        <p class="highlights">${day.highlights}</p>
        <div class="weather-tip"><strong>⛵ Sailing Tip:</strong> ${sailingTipForDistance(parseInt(day.distanceNM) || 0)}</div>
      </div>`;

    return article;
  }

  function buildSailIcon() {
    const div = document.createElement('div');
    div.className = 'sail-icon';
    div.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 22h18"/><path d="M16 3.13a4 4 0 0 1 0 7.75V21"/><path d="M12 12H2l10-9v9z"/></svg>`;
    return div;
  }

  /* ------------------------------------------------------------------
   *  LOGIC HELPERS
   * ------------------------------------------------------------------ */
  function sailingTipForDistance(dist) {
    if (dist === 0) return 'Perfect rest day to explore ashore';
    if (dist <= 15) return 'Short hop – relaxed morning departure';
    if (dist <= 30) return 'Moderate sail – arrive in time for exploration';
    if (dist <= 45) return 'Early start advised – steady passage';
    return 'Longest leg – depart at first light';
  }

  /* ------------------------------------------------------------------
   *  RENDER
   * ------------------------------------------------------------------ */
  function renderTimeline() {
    const timeline = document.getElementById('itinerary-timeline');
    const frag = document.createDocumentFragment();

    itineraryData.forEach((day, idx) => {
      frag.appendChild(buildDayCard(day));
      if (idx < itineraryData.length - 1) frag.appendChild(buildSailIcon());
    });

    timeline.appendChild(frag);
  }

  /* ------------------------------------------------------------------
   *  INTERACTION HANDLERS
   * ------------------------------------------------------------------ */
  function onCardClick(e) {
    if (window.innerWidth >= 768) return;
    const card = e.currentTarget;
    const expanded = card.classList.toggle('expanded');
    card.setAttribute('aria-expanded', expanded.toString());
    if (expanded) {
      setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'center' }), 150);
    }
  }

  function attachCardListeners() {
    document.querySelectorAll('.day-card').forEach(card => {
      card.addEventListener('click', onCardClick);
      card.addEventListener('keydown', e => {
        if (['Enter', ' '].includes(e.key)) {
          e.preventDefault();
          onCardClick(e);
        }
      });
    });
  }

  /* ------------------------------------------------------------------
   *  SCROLL ANIMATIONS
   * ------------------------------------------------------------------ */
  function initScrollFadeIn() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '80px' });

    document.querySelectorAll('.day-card, .sail-icon').forEach((el, idx) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = `opacity 0.6s ease ${idx * 0.06}s, transform 0.6s ease ${idx * 0.06}s`;
      observer.observe(el);
    });
  }

  /* ------------------------------------------------------------------
   *  LAZY IMAGE LOADING – with fallback after timeout
   * ------------------------------------------------------------------ */
  function lazyLoadImages() {
    const imgs = document.querySelectorAll('img[data-src]');
    imgs.forEach(img => {
      img.classList.add('loading');
      const src = img.getAttribute('data-src');
      img.src = src;

      const timeout = setTimeout(() => {
        if (!img.complete) setImageError(img);
      }, 8000); // 8-second fallback

      img.addEventListener('load', () => {
        clearTimeout(timeout);
        img.classList.remove('loading');
      });
      img.addEventListener('error', () => {
        clearTimeout(timeout);
        setImageError(img);
      });
    });
  }

  function setImageError(img) {
    img.classList.add('error');
    const placeholder = document.createElement('div');
    placeholder.style.cssText = 'width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:var(--color-bg-2);color:var(--color-text-secondary);font-size:12px;';
    placeholder.textContent = 'Image unavailable';
    img.parentNode.replaceChild(placeholder, img);
  }

  /* ------------------------------------------------------------------
   *  INIT
   * ------------------------------------------------------------------ */
  function init() {
    renderTimeline();

    // Set distance in footer
    const totalDistanceEl = document.getElementById('total-distance');
    if (totalDistanceEl) totalDistanceEl.textContent = `~${computeTotalDistance()} NM`;

    // Set initial theme
    if (!html.hasAttribute('data-color-scheme')) setScheme('light');
    else updateToggleIcon(html.getAttribute('data-color-scheme'));

    themeToggleBtn.addEventListener('click', toggleScheme);

    attachCardListeners();

    // Scroll fade-in
    setTimeout(initScrollFadeIn, 50);

    // Lazy images
    lazyLoadImages();

    // Collapse expanded states on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        document.querySelectorAll('.day-card.expanded').forEach(c => c.classList.remove('expanded'));
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
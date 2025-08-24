// Application data
const photographersData = [
    {
        "name": "Henri Cartier-Bresson",
        "nationality": "French",
        "islands": ["Sifnos"],
        "period": "1961",
        "famous_work": "Sifnos, Greece (Girl running up steps)",
        "description": "Pioneer of street photography and photojournalism. Captured the 'decisive moment' of a young girl running up whitewashed steps in Sifnos, creating one of the most iconic images of Greek island life.",
        "style": "Street Photography, Documentary",
        "exhibitions": "MoMA, RISD Museum, International Center of Photography"
    },
    {
        "name": "Robert A. McCabe",
        "nationality": "American",
        "islands": ["Hydra", "Cyclades", "Saronic Gulf Islands"],
        "period": "1954-1965",
        "famous_work": "Images of an Enchanted Land series",
        "description": "Documented Greek islands extensively before mass tourism. His black-and-white photographs captured traditional island life, fishing communities, and architectural details with remarkable sensitivity.",
        "style": "Documentary, Landscape",
        "exhibitions": "Princeton, Athens galleries, International exhibitions"
    },
    {
        "name": "W. Mark Wilman",
        "nationality": "British",
        "islands": ["Anafi", "Santorini", "Ios", "Sikinos", "Folegandros", "Milos", "Sifnos", "Serifos", "Kythnos"],
        "period": "2014-present",
        "famous_work": "Discovering the Beauty of the Cyclades project",
        "description": "Contemporary photographer dedicated to capturing the natural beauty and landscapes of the Cyclades. His work has been exhibited internationally and focuses on preserving the islands' pristine environments.",
        "style": "Landscape, Nature",
        "exhibitions": "Milan, International galleries, Greek exhibitions"
    },
    {
        "name": "Contemporary Greek Photographers",
        "nationality": "Greek",
        "islands": ["Hydra", "Spetses", "Poros", "Aegina"],
        "period": "2000-present",
        "famous_work": "Wedding and architectural photography",
        "description": "Including Nikolaos-Panagiotis Kiafas, Dimitris Alexandrakis, and others who document modern island life, weddings, and architectural heritage across the Saronic Gulf islands.",
        "style": "Portrait, Architecture, Documentary",
        "exhibitions": "Local galleries, online portfolios"
    }
];

const islandsData = [
    {"name": "Sifnos", "group": "Cyclades", "famous_for": "Cartier-Bresson's iconic photograph"},
    {"name": "Hydra", "group": "Saronic Gulf", "famous_for": "Artists' colony, McCabe's documentation"},
    {"name": "Spetses", "group": "Saronic Gulf", "famous_for": "Neo-classical architecture, wedding photography"},
    {"name": "Poros", "group": "Saronic Gulf", "famous_for": "Traditional fishing communities"},
    {"name": "Santorini", "group": "Cyclades", "famous_for": "Dramatic landscapes, contemporary photography"},
    {"name": "Milos", "group": "Cyclades", "famous_for": "Volcanic landscapes, colorful geology"}
];

const timelineData = [
    {"year": "1961", "event": "Henri Cartier-Bresson captures iconic Sifnos photograph"},
    {"year": "1954-1965", "event": "Robert McCabe documents Greek islands extensively"},
    {"year": "1960s-1970s", "event": "Hydra becomes international artists' colony"},
    {"year": "2000s", "event": "Rise of Greek wedding and architectural photographers"},
    {"year": "2014-present", "event": "W. Mark Wilman's contemporary Cyclades project"}
];

// DOM elements - will be initialized after DOM loads
let photographersGrid, timelineEvents, islandsGrid, modal, modalOverlay, modalClose, modalBody;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize DOM elements
    photographersGrid = document.getElementById('photographersGrid');
    timelineEvents = document.getElementById('timelineEvents');
    islandsGrid = document.getElementById('islandsGrid');
    modal = document.getElementById('photographerModal');
    modalOverlay = document.getElementById('modalOverlay');
    modalClose = document.getElementById('modalClose');
    modalBody = document.getElementById('modalBody');
    
    // Ensure modal starts hidden
    if (modal) {
        modal.classList.add('hidden');
    }
    
    // Render content
    renderPhotographers();
    renderTimeline();
    renderIslands();
    setupModal();
    setupScrollAnimations();
});

// Render photographer cards
function renderPhotographers() {
    if (!photographersGrid) return;
    
    photographersGrid.innerHTML = '';
    
    photographersData.forEach((photographer, index) => {
        const card = document.createElement('div');
        card.className = 'photographer-card fade-in-up';
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Add click event listener
        card.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openPhotographerModal(photographer);
        });
        
        const islandsHtml = photographer.islands.map(island => 
            `<span class="island-tag">${island}</span>`
        ).join('');
        
        card.innerHTML = `
            <div class="photographer-card__header">
                <h3 class="photographer-card__name">${photographer.name}</h3>
                <p class="photographer-card__nationality">${photographer.nationality}</p>
            </div>
            <div class="photographer-card__period">${photographer.period}</div>
            <div class="photographer-card__islands">
                <div class="photographer-card__islands-title">Islands Photographed:</div>
                <div class="photographer-card__islands-list">
                    ${islandsHtml}
                </div>
            </div>
            <div class="photographer-card__work">${photographer.famous_work}</div>
            <p class="photographer-card__description">${photographer.description}</p>
        `;
        
        photographersGrid.appendChild(card);
    });
}

// Render timeline events
function renderTimeline() {
    if (!timelineEvents) return;
    
    timelineEvents.innerHTML = '';
    
    timelineData.forEach((event, index) => {
        const eventElement = document.createElement('div');
        eventElement.className = 'timeline-event fade-in-up';
        eventElement.style.animationDelay = `${index * 0.2}s`;
        
        eventElement.innerHTML = `
            <div class="timeline-event__content">
                <div class="timeline-event__year">${event.year}</div>
                <p class="timeline-event__description">${event.event}</p>
            </div>
            <div class="timeline-event__dot"></div>
        `;
        
        timelineEvents.appendChild(eventElement);
    });
}

// Render islands grid
function renderIslands() {
    if (!islandsGrid) return;
    
    islandsGrid.innerHTML = '';
    
    islandsData.forEach((island, index) => {
        const card = document.createElement('div');
        card.className = 'island-card fade-in-up';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <h3 class="island-card__name">${island.name}</h3>
            <p class="island-card__group">${island.group} Islands</p>
            <p class="island-card__famous-for">Famous for: ${island.famous_for}</p>
        `;
        
        islandsGrid.appendChild(card);
    });
}

// Open photographer modal
function openPhotographerModal(photographer) {
    if (!modal || !modalBody) return;
    
    const islandsHtml = photographer.islands.map(island => 
        `<span class="island-tag">${island}</span>`
    ).join('');
    
    modalBody.innerHTML = `
        <h2 class="modal__photographer-name">${photographer.name}</h2>
        <div class="modal__photographer-details">
            <div class="modal__detail-group">
                <div class="modal__detail-label">Nationality</div>
                <div class="modal__detail-value">${photographer.nationality}</div>
            </div>
            <div class="modal__detail-group">
                <div class="modal__detail-label">Active Period</div>
                <div class="modal__detail-value">${photographer.period}</div>
            </div>
            <div class="modal__detail-group">
                <div class="modal__detail-label">Photography Style</div>
                <div class="modal__detail-value">${photographer.style}</div>
            </div>
            <div class="modal__detail-group">
                <div class="modal__detail-label">Islands Photographed</div>
                <div class="modal__detail-value">
                    <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px;">
                        ${islandsHtml}
                    </div>
                </div>
            </div>
            <div class="modal__detail-group">
                <div class="modal__detail-label">Famous Work</div>
                <div class="modal__detail-value">${photographer.famous_work}</div>
            </div>
            <div class="modal__detail-group">
                <div class="modal__detail-label">Exhibitions</div>
                <div class="modal__detail-value">${photographer.exhibitions}</div>
            </div>
            <div class="modal__detail-group">
                <div class="modal__detail-label">Description</div>
                <div class="modal__detail-value">${photographer.description}</div>
            </div>
        </div>
    `;
    
    // Show modal
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Focus on close button for accessibility
    if (modalClose) {
        modalClose.focus();
    }
}

// Close photographer modal
function closePhotographerModal() {
    if (!modal) return;
    
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

// Setup modal event listeners
function setupModal() {
    if (!modal || !modalClose || !modalOverlay) return;
    
    // Close button
    modalClose.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        closePhotographerModal();
    });
    
    // Overlay click
    modalOverlay.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        closePhotographerModal();
    });
    
    // Prevent modal content clicks from closing modal
    const modalContent = modal.querySelector('.modal__content');
    if (modalContent) {
        modalContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
            closePhotographerModal();
        }
    });
}

// Setup scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    const animatableElements = document.querySelectorAll('.photographer-card, .timeline-event, .island-card');
    animatableElements.forEach(element => {
        observer.observe(element);
    });
}

// Smooth scroll for internal links
function setupSmoothScroll() {
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

// Initialize smooth scroll
document.addEventListener('DOMContentLoaded', setupSmoothScroll);

// Utility function to truncate text for responsive design
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}

// Handle responsive behavior
function handleResize() {
    const isMobile = window.innerWidth < 768;
    
    // Adjust descriptions for mobile
    if (isMobile) {
        document.querySelectorAll('.photographer-card__description').forEach(desc => {
            const originalText = desc.dataset.originalText || desc.textContent;
            desc.dataset.originalText = originalText;
            desc.textContent = truncateText(originalText, 100);
        });
    } else {
        document.querySelectorAll('.photographer-card__description').forEach(desc => {
            if (desc.dataset.originalText) {
                desc.textContent = desc.dataset.originalText;
            }
        });
    }
}

// Initialize resize handling
window.addEventListener('resize', handleResize);
window.addEventListener('load', handleResize);

// Performance optimization: Lazy load animations
function initializeLazyAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-up');
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Initialize lazy animations after DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeLazyAnimations, 100);
});

// Error handling for missing elements
function handleMissingElements() {
    const requiredElements = [
        'photographersGrid',
        'timelineEvents', 
        'islandsGrid',
        'photographerModal'
    ];
    
    requiredElements.forEach(elementId => {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error(`Required element with id '${elementId}' not found`);
        }
    });
}

// Initialize error handling
document.addEventListener('DOMContentLoaded', handleMissingElements);
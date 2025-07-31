// Henry Miller's journey data
const MILLER_JOURNEY = [
  {
    name: "Athens",
    coordinates: [37.9755, 23.7348],
    event: "Arrival and meeting George Katsimbalis",
    description: "Miller arrives at Piraeus in July 1939 and meets the charismatic poet George Katsimbalis, the 'Colossus' of his book title. Through Katsimbalis, he discovers Greek hospitality and the Greek spirit that will transform him.",
    quote: "The light of Greece opened my eyes, penetrated my pores, expanded my whole being",
    significance: "Starting point of spiritual transformation"
  },
  {
    name: "Delos",
    coordinates: [37.3893, 25.2708],
    event: "Spiritual rebirth experience",
    description: "On the sacred uninhabited island of Delos, birthplace of Apollo, Miller experiences what he describes as a spiritual rebirth. The ancient ruins and divine silence move him to tears and profound realization.",
    quote: "Marvelous things happen to one in Greece—marvelous good things which can happen to one nowhere else on earth",
    significance: "Peak spiritual experience"
  },
  {
    name: "Mykonos",
    coordinates: [37.4453, 25.3287],
    event: "Dazzling light and island life",
    description: "Miller is struck by the brilliant clarity of Cycladic light and the simplicity of island life. The sea's brilliance and landscape inspire meditations on freedom and beauty.",
    quote: "The dazzling clarity of the light, the sea's brilliance, and the simplicity of island life",
    significance: "Illumination and freedom"
  },
  {
    name: "Poros",
    coordinates: [37.517, 23.483],
    event: "Timeless, mystical Greece",
    description: "The dreamlike approach by boat to Poros fills Miller with a sense of eternal, mystical Greece. He feels transported beyond worldly concerns.",
    quote: "To sail slowly through the streets of Poros is to recapture the joy of passing through the neck of the womb",
    significance: "Transcendence of time"
  },
  {
    name: "Hydra",
    coordinates: [37.335, 23.4725],
    event: "Artistic inspiration and serenity",
    description: "The island that later inspired artists like Leonard Cohen. Miller finds peace and artistic inspiration in its cobblestone alleys and timeless beauty.",
    quote: "A moment which endures beyond world wars",
    significance: "Eternal artistic inspiration"
  },
  {
    name: "Crete/Knossos",
    coordinates: [35.3387, 25.1442],
    event: "Sitting on the Throne of Minos",
    description: "Miller visits the Palace of Knossos and sits on King Minos' throne, feeling connected to ancient civilizations and the hub of European culture.",
    quote: "Seated on King Minos throne I felt closer to Montezuma than to Homer",
    significance: "Connection to ancient wisdom"
  }
];

// Global variables
let map;
let markers = [];
let routeLine;
let currentActiveLocation = null;
let markersGroup;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    setupEventListeners();
    setupMobileMenu();
    setupInfoPanel();
});

// Initialize Leaflet map
function initializeMap() {
    // Create map centered on Cyclades region
    map = L.map('map', {
        center: [37.5, 25.0],
        zoom: 7,
        zoomControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true
    });

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors | Henry Miller\'s Journey 1939',
        maxZoom: 18,
        minZoom: 5
    }).addTo(map);

    // Add markers and create route
    addMarkersAndRoute();
    
    // Setup map events
    setupMapEvents();
}

// Add markers for each location and create route line
function addMarkersAndRoute() {
    const routeCoordinates = [];
    markers = [];

    MILLER_JOURNEY.forEach((location, index) => {
        const [lat, lon] = location.coordinates;
        
        // Add coordinates to route
        routeCoordinates.push([lat, lon]);

        // Create custom icon for markers
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="
                background: linear-gradient(135deg, #218B8D 0%, #1a6b6d 100%);
                color: white;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 16px;
                border: 3px solid white;
                box-shadow: 0 4px 12px rgba(33, 139, 141, 0.4);
                cursor: pointer;
                transition: all 0.3s ease;
            " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">${index + 1}</div>`,
            iconSize: [40, 40],
            iconAnchor: [20, 20],
            popupAnchor: [0, -20]
        });

        // Create popup content
        const popupContent = createPopupContent(location, index);

        // Create marker
        const marker = L.marker([lat, lon], { icon: customIcon })
            .bindPopup(popupContent, {
                maxWidth: 420,
                className: 'custom-popup',
                closeButton: true,
                autoClose: true,
                closeOnClick: false,
                keepInView: true
            })
            .addTo(map);

        // Store data with marker
        marker.locationIndex = index;
        marker.locationData = location;
        markers.push(marker);

        // Add click events
        marker.on('click', function(e) {
            e.originalEvent?.stopPropagation();
            setActiveLocation(index);
            
            // Smooth pan to marker
            map.setView(this.getLatLng(), Math.max(map.getZoom(), 10), {
                animate: true,
                duration: 0.8
            });
            
            // Open popup after animation
            setTimeout(() => {
                this.openPopup();
            }, 400);
        });

        // Hover effects
        marker.on('mouseover', function() {
            if (currentActiveLocation !== index) {
                this.getElement().style.zIndex = '999';
            }
        });

        marker.on('mouseout', function() {
            if (currentActiveLocation !== index) {
                this.getElement().style.zIndex = '600';
            }
        });
    });

    // Create feature group for bounds calculation
    markersGroup = new L.featureGroup(markers);

    // Create route line
    if (routeLine) {
        map.removeLayer(routeLine);
    }
    
    routeLine = L.polyline(routeCoordinates, {
        color: '#218B8D',
        weight: 4,
        opacity: 0.8,
        dashArray: '12, 8',
        smoothFactor: 1.0
    }).addTo(map);

    // Add route line interactions
    routeLine.on('mouseover', function(e) {
        this.setStyle({
            weight: 6,
            opacity: 1.0
        });
    });

    routeLine.on('mouseout', function(e) {
        this.setStyle({
            weight: 4,
            opacity: 0.8
        });
    });
}

// Create popup content for a location
function createPopupContent(location, index) {
    return `
        <div class="popup-header">
            <h2>${location.name}</h2>
        </div>
        <div class="popup-event">${location.event}</div>
        <div class="popup-date">Henry Miller - 1939</div>
        <div class="popup-description">${location.description}</div>
        <div class="popup-quote">"${location.quote}"</div>
        <div class="popup-significance">${location.significance}</div>
    `;
}

// Set active location and update UI
function setActiveLocation(index) {
    // Close all popups first
    map.closePopup();
    markers.forEach(marker => marker.closePopup());
    
    // Remove previous active state
    if (currentActiveLocation !== null) {
        const prevElement = document.querySelector(`[data-index="${currentActiveLocation}"]`);
        if (prevElement) {
            prevElement.classList.remove('active');
        }
        
        // Reset previous marker z-index
        if (markers[currentActiveLocation]) {
            const prevMarkerElement = markers[currentActiveLocation].getElement();
            if (prevMarkerElement) {
                prevMarkerElement.style.zIndex = '600';
            }
        }
    }

    // Set new active state
    currentActiveLocation = index;
    const currentElement = document.querySelector(`[data-index="${index}"]`);
    if (currentElement) {
        currentElement.classList.add('active');
        
        // Scroll the sidebar item into view
        currentElement.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    }

    // Highlight active marker
    if (markers[index]) {
        const markerElement = markers[index].getElement();
        if (markerElement) {
            markerElement.style.zIndex = '1000';
        }
    }

    // Close mobile sidebar if open
    if (window.innerWidth <= 768) {
        closeMobileSidebar();
    }

    // Hide intro panel if shown
    hideIntroPanel();
}

// Setup event listeners
function setupEventListeners() {
    // Location item clicks - use event delegation
    const locationsList = document.querySelector('.locations-list');
    if (locationsList) {
        locationsList.addEventListener('click', function(e) {
            const locationItem = e.target.closest('.location-item');
            if (locationItem) {
                const index = parseInt(locationItem.getAttribute('data-index'));
                if (!isNaN(index) && index >= 0 && index < MILLER_JOURNEY.length) {
                    setActiveLocation(index);
                    
                    // Get the marker and animate to it
                    const marker = markers[index];
                    if (marker) {
                        map.setView(marker.getLatLng(), 11, {
                            animate: true,
                            duration: 1.0
                        });
                        
                        // Open popup after animation
                        setTimeout(() => {
                            marker.openPopup();
                        }, 600);
                    }
                }
            }
        });
    }

    // Reset view button
    const resetBtn = document.getElementById('resetView');
    if (resetBtn) {
        resetBtn.addEventListener('click', function(e) {
            e.preventDefault();
            resetMapView();
        });
    }

    // Toggle info button
    const toggleInfoBtn = document.getElementById('toggleInfo');
    if (toggleInfoBtn) {
        toggleInfoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleInfoPanel();
        });
    }

    // Window resize handler
    window.addEventListener('resize', function() {
        if (map) {
            setTimeout(() => {
                map.invalidateSize();
            }, 250);
        }
        
        // Close mobile sidebar if screen becomes larger
        if (window.innerWidth > 768) {
            closeMobileSidebar();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            resetMapView();
            closeMobileSidebar();
        }
        
        // Arrow keys for location navigation
        if (currentActiveLocation !== null) {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                const nextIndex = (currentActiveLocation + 1) % MILLER_JOURNEY.length;
                setActiveLocation(nextIndex);
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                const prevIndex = currentActiveLocation === 0 ? MILLER_JOURNEY.length - 1 : currentActiveLocation - 1;
                setActiveLocation(prevIndex);
            }
        }
    });
}

// Reset map view function
function resetMapView() {
    // Force close all popups immediately
    map.closePopup();
    markers.forEach(marker => {
        marker.closePopup();
    });
    
    // Remove active state from all location items
    document.querySelectorAll('.location-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Reset marker z-indexes
    markers.forEach(marker => {
        const element = marker.getElement();
        if (element) {
            element.style.zIndex = '600';
        }
    });
    
    // Reset current active location
    currentActiveLocation = null;
    
    // Fit map to show all markers with padding
    if (markersGroup && markers.length > 0) {
        map.fitBounds(markersGroup.getBounds().pad(0.1), {
            animate: true,
            duration: 1.0
        });
    }
    
    // Show intro panel
    showIntroPanel();
    
    // Close mobile sidebar if open
    closeMobileSidebar();
}

// Setup mobile menu functionality
function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    if (!hamburger || !sidebar || !overlay) return;

    // Hamburger click handler
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        toggleMobileSidebar();
    });

    // Overlay click handler
    overlay.addEventListener('click', function() {
        closeMobileSidebar();
    });
}

// Toggle mobile sidebar
function toggleMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.getElementById('hamburger');
    
    if (sidebar && sidebar.classList.contains('open')) {
        closeMobileSidebar();
    } else {
        openMobileSidebar();
    }
}

// Open mobile sidebar
function openMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const hamburger = document.getElementById('hamburger');
    
    if (sidebar) sidebar.classList.add('open');
    if (overlay) overlay.classList.add('active');
    if (hamburger) hamburger.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close mobile sidebar
function closeMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const hamburger = document.getElementById('hamburger');
    
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    if (hamburger) hamburger.classList.remove('active');
    document.body.style.overflow = '';
}

// Setup info panel functionality
function setupInfoPanel() {
    const closeBtn = document.getElementById('closeIntro');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            hideIntroPanel();
        });
    }
}

// Show intro panel
function showIntroPanel() {
    const panel = document.getElementById('introPanel');
    if (panel) {
        panel.classList.remove('hidden');
    }
}

// Hide intro panel
function hideIntroPanel() {
    const panel = document.getElementById('introPanel');
    if (panel) {
        panel.classList.add('hidden');
    }
}

// Toggle info panel
function toggleInfoPanel() {
    const panel = document.getElementById('introPanel');
    if (panel) {
        if (panel.classList.contains('hidden')) {
            showIntroPanel();
        } else {
            hideIntroPanel();
        }
    }
}

// Handle map events
function setupMapEvents() {
    if (!map) return;
    
    // Close mobile sidebar when map is clicked
    map.on('click', function(e) {
        if (window.innerWidth <= 768) {
            closeMobileSidebar();
        }
    });

    // Handle popup events
    map.on('popupopen', function(e) {
        const popup = e.popup;
        if (popup) {
            const container = popup.getElement();
            if (container) {
                container.style.zIndex = '1000';
            }
        }
        
        // Hide intro panel when popup opens
        hideIntroPanel();
    });

    // Handle popup close events
    map.on('popupclose', function(e) {
        // Don't remove active state immediately to prevent flicker
        setTimeout(() => {
            if (currentActiveLocation !== null) {
                const marker = markers[currentActiveLocation];
                // Only remove active state if popup was closed manually (not by opening another)
                if (marker && !marker.isPopupOpen()) {
                    const activeElement = document.querySelector(`[data-index="${currentActiveLocation}"]`);
                    if (activeElement) {
                        activeElement.classList.remove('active');
                    }
                    
                    // Reset marker z-index
                    const markerElement = marker.getElement();
                    if (markerElement) {
                        markerElement.style.zIndex = '600';
                    }
                    
                    currentActiveLocation = null;
                }
            }
        }, 100);
    });

    // Handle zoom events
    map.on('zoomend', function() {
        // Update marker visibility based on zoom level
        const currentZoom = map.getZoom();
        markers.forEach(marker => {
            const element = marker.getElement();
            if (element) {
                if (currentZoom < 6) {
                    element.style.opacity = '0.7';
                } else {
                    element.style.opacity = '1';
                }
            }
        });
    });

    // Handle drag events
    map.on('dragstart', function() {
        // Close popups when dragging starts
        map.closePopup();
        markers.forEach(marker => marker.closePopup());
    });
}

// Initialize animations and interactions after map loads
map?.whenReady(function() {
    // Add subtle animation to route line
    if (routeLine) {
        let animationOffset = 0;
        
        const animateRoute = () => {
            animationOffset += 2;
            routeLine.setStyle({
                dashOffset: -animationOffset
            });
            requestAnimationFrame(animateRoute);
        };
        
        // Start animation after a delay
        setTimeout(() => {
            animateRoute();
        }, 2000);
    }
});
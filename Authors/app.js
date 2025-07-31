// Pilgrim route data
const PILGRIM_STOPS = [
  {
    "name": "Mykonos (Start)",
    "lat": 37.450001,
    "lon": 25.350000,
    "authors": [
      "John Freely – embarked here to research his seminal guide 'The Cyclades' (2010)",
      "Peter Fiennes – used Mykonos as gateway to explore sacred Delos during travels for 'A Thing of Beauty' (2022)"
    ]
  },
  {
    "name": "Delos",
    "lat": 37.392109,
    "lon": 25.271000,
    "authors": [
      "John Freely – chronicled Delos' 7,000-year history and mythic stature in 'The Cyclades' (2010)",
      "Stephen Fry – centerpiece of Apollo & Artemis myths retold in 'Mythos' (2017)",
      "Peter Fiennes – walked the oracle-strewn ruins reflecting on hope & heritage (2022)"
    ]
  },
  {
    "name": "Paros",
    "lat": 37.083300,
    "lon": 25.150000,
    "authors": [
      "John Freely – praised Parian marble and port towns in his island guide (2010)",
      "Peter Fiennes – sought 'the most beautiful beach in Greece' near Kolymbithres (2022)"
    ]
  },
  {
    "name": "Naxos",
    "lat": 37.105560,
    "lon": 25.376390,
    "authors": [
      "Henry Miller – celebrated the Cycladic 'light that opens the pores' while roaming Naxos in 1939, inspiration for 'The Colossus of Maroussi' (1941)",
      "John Freely – explored Dionysian myths and fertile valleys here (2010)",
      "Peter Fiennes – ascended Mt. Zas tracing Zeus legends (2022)"
    ]
  },
  {
    "name": "Santorini (End)",
    "lat": 36.393100,
    "lon": 25.461500,
    "authors": [
      "John Freely – linked Santorini's caldera to the Atlantis legend (2010)",
      "Peter Fiennes – watched volcanic sunsets while meditating on climate change (2022)"
    ]
  }
];

// Global variables
let map;
let markers = [];
let routeLine;
let currentActiveStop = null;
let markersGroup;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    setupEventListeners();
    setupMobileMenu();
});

// Initialize Leaflet map
function initializeMap() {
    // Create map centered on Cyclades
    map = L.map('map', {
        zoomControl: true,
        scrollWheelZoom: true
    });

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);

    // Add markers and create route
    addMarkersAndRoute();
    
    // Fit map to show all markers
    fitMapToMarkers();
    
    // Setup map events
    setupMapEvents();
}

// Add markers for each stop and create route line
function addMarkersAndRoute() {
    const routeCoordinates = [];
    markers = []; // Reset markers array

    PILGRIM_STOPS.forEach((stop, index) => {
        const lat = stop.lat;
        const lon = stop.lon;
        
        // Add coordinates to route
        routeCoordinates.push([lat, lon]);

        // Create custom icon for markers
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="
                background-color: #218B8D;
                color: white;
                border-radius: 50%;
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 14px;
                border: 3px solid white;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            ">${index + 1}</div>`,
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -16]
        });

        // Create popup content
        const popupContent = createPopupContent(stop);

        // Create marker
        const marker = L.marker([lat, lon], { icon: customIcon })
            .bindPopup(popupContent, {
                maxWidth: 350,
                className: 'custom-popup',
                closeButton: true,
                autoClose: false,
                closeOnClick: false
            })
            .addTo(map);

        // Store marker reference with index
        marker.stopIndex = index;
        markers.push(marker);

        // Add click event to marker
        marker.on('click', function(e) {
            e.originalEvent.stopPropagation();
            setActiveStop(index);
            this.openPopup();
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
        weight: 3,
        opacity: 0.8,
        dashArray: '10, 5'
    }).addTo(map);
}

// Create popup content for a stop
function createPopupContent(stop) {
    const authorsHtml = stop.authors.map(author => `<li>${author}</li>`).join('');
    
    return `
        <div>
            <h2>${stop.name}</h2>
            <div class="coordinates">${stop.lat.toFixed(6)}, ${stop.lon.toFixed(6)}</div>
            <ul>
                ${authorsHtml}
            </ul>
        </div>
    `;
}

// Fit map to show all markers
function fitMapToMarkers() {
    if (markersGroup && markers.length > 0) {
        map.fitBounds(markersGroup.getBounds().pad(0.1));
    }
}

// Set active stop and update UI
function setActiveStop(index) {
    // Close all popups first
    map.closePopup();
    
    // Remove previous active state
    if (currentActiveStop !== null) {
        const prevElement = document.querySelector(`[data-index="${currentActiveStop}"]`);
        if (prevElement) {
            prevElement.classList.remove('active');
        }
    }

    // Set new active state
    currentActiveStop = index;
    const currentElement = document.querySelector(`[data-index="${index}"]`);
    if (currentElement) {
        currentElement.classList.add('active');
    }

    // Get the marker for this stop
    const marker = markers[index];
    if (marker) {
        // Pan and zoom to marker
        map.setView(marker.getLatLng(), 13, {
            animate: true,
            duration: 1
        });

        // Open popup after a short delay
        setTimeout(() => {
            marker.openPopup();
        }, 800);
    }

    // Close mobile sidebar if open
    if (window.innerWidth <= 700) {
        closeMobileSidebar();
    }
}

// Setup event listeners
function setupEventListeners() {
    // Stop item clicks - use event delegation
    const stopsList = document.querySelector('.stops-list');
    if (stopsList) {
        stopsList.addEventListener('click', function(e) {
            const stopItem = e.target.closest('.stop-item');
            if (stopItem) {
                const index = parseInt(stopItem.getAttribute('data-index'));
                if (!isNaN(index)) {
                    setActiveStop(index);
                }
            }
        });
    }

    // Reset view button
    const resetBtn = document.getElementById('resetView');
    if (resetBtn) {
        resetBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close all popups
            map.closePopup();
            
            // Remove active state
            if (currentActiveStop !== null) {
                const activeElement = document.querySelector(`[data-index="${currentActiveStop}"]`);
                if (activeElement) {
                    activeElement.classList.remove('active');
                }
                currentActiveStop = null;
            }

            // Fit map to show all markers
            fitMapToMarkers();
        });
    }

    // Window resize handler
    window.addEventListener('resize', function() {
        if (map) {
            map.invalidateSize();
        }
        
        // Close mobile sidebar if screen becomes larger
        if (window.innerWidth > 700) {
            closeMobileSidebar();
        }
    });
}

// Setup mobile menu functionality
function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    
    if (!hamburger || !sidebar) return;
    
    // Create overlay element
    let overlay = document.getElementById('overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.id = 'overlay';
        document.body.appendChild(overlay);
    }

    // Hamburger click handler
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        toggleMobileSidebar();
    });

    // Overlay click handler
    overlay.addEventListener('click', function() {
        closeMobileSidebar();
    });

    // Close sidebar on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileSidebar();
        }
    });
}

// Toggle mobile sidebar
function toggleMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    
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
    
    if (sidebar) sidebar.classList.add('open');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close mobile sidebar
function closeMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Handle map events
function setupMapEvents() {
    if (!map) return;
    
    // Close mobile sidebar when map is clicked
    map.on('click', function() {
        if (window.innerWidth <= 700) {
            closeMobileSidebar();
        }
    });

    // Handle popup events
    map.on('popupopen', function(e) {
        // Ensure popup is properly styled
        const popup = e.popup;
        if (popup) {
            const container = popup.getElement();
            if (container) {
                container.style.zIndex = '1000';
            }
        }
    });
}
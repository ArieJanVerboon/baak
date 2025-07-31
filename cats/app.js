// Cat-watching locations data
const locations = [
    {
        "name": "Mykonos Town (Chora)",
        "island": "Mykonos",
        "lat": 37.4467,
        "lng": 25.3289,
        "description": "The cat capital with an estimated 50,000 cats that outnumber humans"
    },
    {
        "name": "Little Venice",
        "island": "Mykonos", 
        "lat": 37.4449,
        "lng": 25.3255,
        "description": "Home to cats with distinctive personalities, including Turkish Van-like breeds"
    },
    {
        "name": "Fishing Harbor",
        "island": "Mykonos",
        "lat": 37.4479,
        "lng": 25.3292,
        "description": "Where cats wait for boats to return with fresh catches"
    },
    {  
        "name": "Windmill Area",
        "island": "Mykonos",
        "lat": 37.4446,
        "lng": 25.3264,
        "description": "Excellent for early morning cat spotting"
    },
    {
        "name": "Naxos Town/Port", 
        "island": "Naxos",
        "lat": 37.1042,
        "lng": 25.3764,
        "description": "Run by cats who allow people to live there with them"
    },
    {
        "name": "Fira",
        "island": "Santorini",
        "lat": 36.4167,
        "lng": 25.4333,
        "description": "Social media star cats against iconic white buildings"
    },
    {
        "name": "Oia",
        "island": "Santorini", 
        "lat": 36.4618,
        "lng": 25.3755,
        "description": "Photogenic cats perfect for sunset photography"
    },
    {
        "name": "Naoussa Harbor",
        "island": "Paros",
        "lat": 37.1243,
        "lng": 25.2379,
        "description": "Famous for black and white cats sitting on harbor walls"
    },
    {
        "name": "Cats Eden Sanctuary",
        "island": "Syros",
        "lat": 37.4487,
        "lng": 24.9428,
        "description": "Professional cat sanctuary where visitors can stay and volunteer"
    }
];

// Initialize the map
let map;

// Custom cat marker icon
function createCatMarker() {
    return L.divIcon({
        html: '🐱',
        className: 'cat-marker',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -20]
    });
}

// Create popup content
function createPopupContent(location) {
    return `
        <div class="popup-content">
            <h4>${location.name}</h4>
            <span class="popup-island">${location.island} Island</span>
            <p class="popup-description">${location.description}</p>
        </div>
    `;
}

// Initialize map and markers
function initMap() {
    // Calculate center point of all locations
    const centerLat = locations.reduce((sum, loc) => sum + loc.lat, 0) / locations.length;
    const centerLng = locations.reduce((sum, loc) => sum + loc.lng, 0) / locations.length;
    
    // Initialize map centered on Cyclades
    map = L.map('map', {
        center: [centerLat, centerLng],
        zoom: 8,
        zoomControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        boxZoom: true,
        keyboard: true,
        dragging: true,
        touchZoom: true
    });
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
        minZoom: 3
    }).addTo(map);
    
    // Create marker group for better management
    const markerGroup = L.layerGroup().addTo(map);
    
    // Add markers for each location
    const markers = [];
    
    locations.forEach((location, index) => {
        console.log(`Creating marker ${index + 1}: ${location.name} at [${location.lat}, ${location.lng}]`);
        
        const marker = L.marker([location.lat, location.lng], {
            icon: createCatMarker(),
            title: location.name,
            alt: `Cat watching location: ${location.name}`
        });
        
        // Create popup content
        const popupContent = createPopupContent(location);
        marker.bindPopup(popupContent, {
            maxWidth: 280,
            minWidth: 200,
            className: 'custom-popup',
            closeButton: true,
            autoClose: false,
            closeOnEscapeKey: true
        });
        
        // Add marker to group and array
        marker.addTo(markerGroup);
        markers.push(marker);
        
        // Add hover effects
        marker.on('mouseover', function(e) {
            this.openPopup();
        });
        
        marker.on('click', function(e) {
            this.openPopup();
        });
    });
    
    console.log(`Total markers created: ${markers.length}`);
    
    // Fit map to show all markers with padding
    if (markers.length > 0) {
        const group = new L.featureGroup(markers);
        const bounds = group.getBounds();
        map.fitBounds(bounds.pad(0.15));
        
        // Ensure we don't zoom in too much
        setTimeout(() => {
            if (map.getZoom() > 10) {
                map.setZoom(10);
            }
        }, 100);
    }
}

// Handle responsive behavior
function handleResize() {
    if (map) {
        // Invalidate map size when window is resized
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add a small delay to ensure the map container is fully rendered
    setTimeout(() => {
        initMap();
    }, 100);
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
    
    // Add smooth scrolling to map when clicked from header
    const header = document.querySelector('.header');
    if (header) {
        header.addEventListener('click', function() {
            document.querySelector('.map-container').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});

// Mobile-specific map behavior
function setupMobileMapBehavior() {
    const mapContainer = document.getElementById('map');
    
    // Disable scroll wheel zoom by default on mobile
    if (window.innerWidth <= 768 && map) {
        map.scrollWheelZoom.disable();
        
        // Enable scroll wheel zoom when map is clicked/focused
        mapContainer.addEventListener('click', function() {
            if (map) {
                map.scrollWheelZoom.enable();
                setTimeout(() => {
                    if (map) {
                        map.scrollWheelZoom.disable();
                    }
                }, 5000); // Disable after 5 seconds
            }
        });
    }
}

// Set up mobile behavior after map is initialized
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        setupMobileMapBehavior();
    }, 500);
});
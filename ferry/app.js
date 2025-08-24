// Ferry data - embedded from the provided JSON
const ferryData = {
  "islands": [
    {"name": "Amorgos", "lat": 36.8333, "lon": 25.8833, "type": "major"},
    {"name": "Anafi", "lat": 36.3667, "lon": 25.7833, "type": "major"},
    {"name": "Andros", "lat": 37.8333, "lon": 24.9333, "type": "major"},
    {"name": "Antiparos", "lat": 37.0403, "lon": 25.0814, "type": "major"},
    {"name": "Delos", "lat": 37.4, "lon": 25.2667, "type": "major"},
    {"name": "Ios", "lat": 36.7167, "lon": 25.3000, "type": "major"},
    {"name": "Kea (Tzia)", "lat": 37.6167, "lon": 24.3333, "type": "major"},
    {"name": "Kimolos", "lat": 36.8, "lon": 24.5667, "type": "major"},
    {"name": "Kythnos", "lat": 37.4, "lon": 24.4167, "type": "major"},
    {"name": "Milos", "lat": 36.7333, "lon": 24.5167, "type": "major"},
    {"name": "Mykonos", "lat": 37.4500, "lon": 25.3500, "type": "major"},
    {"name": "Naxos", "lat": 37.1000, "lon": 25.3667, "type": "major"},
    {"name": "Paros", "lat": 37.0833, "lon": 25.1500, "type": "major"},
    {"name": "Folegandros", "lat": 36.6167, "lon": 24.9167, "type": "major"},
    {"name": "Serifos", "lat": 37.1500, "lon": 24.5000, "type": "major"},
    {"name": "Sifnos", "lat": 36.9833, "lon": 24.6833, "type": "major"},
    {"name": "Sikinos", "lat": 36.6833, "lon": 25.1167, "type": "major"},
    {"name": "Syros", "lat": 37.4333, "lon": 24.9167, "type": "major"},
    {"name": "Tinos", "lat": 37.6000, "lon": 25.1333, "type": "major"},
    {"name": "Santorini (Thira)", "lat": 36.3932, "lon": 25.4615, "type": "major"},
    {"name": "Donousa", "lat": 37.1, "lon": 25.8, "type": "small"},
    {"name": "Iraklia", "lat": 36.8441, "lon": 25.4556, "type": "small"},
    {"name": "Koufonisia", "lat": 36.8703, "lon": 25.6231, "type": "small"},
    {"name": "Schinoussa", "lat": 36.8833, "lon": 25.5000, "type": "small"},
    {"name": "Therasia", "lat": 36.43, "lon": 25.33, "type": "small"},
    {"name": "Polyaigos", "lat": 36.8, "lon": 24.6833, "type": "small"},
    {"name": "Gyaros", "lat": 37.62, "lon": 24.73, "type": "small"},
    {"name": "Makronisos", "lat": 37.7, "lon": 24.0167, "type": "small"},
    {"name": "Keros", "lat": 36.95, "lon": 25.71, "type": "small"}
  ],
  "mainland_ports": [
    {"name": "Piraeus (Athens)", "lat": 37.9364, "lon": 23.6291, "type": "mainland"},
    {"name": "Rafina", "lat": 38.0236, "lon": 24.0089, "type": "mainland"},
    {"name": "Lavrio", "lat": 37.7167, "lon": 24.0667, "type": "mainland"}
  ],
  "ferry_routes": [
    {"from": "Piraeus (Athens)", "to": "Syros", "duration": "2-4 hours", "frequency": "daily"},
    {"from": "Piraeus (Athens)", "to": "Mykonos", "duration": "2.5-5.5 hours", "frequency": "daily"},
    {"from": "Piraeus (Athens)", "to": "Paros", "duration": "3-4.5 hours", "frequency": "daily"},
    {"from": "Piraeus (Athens)", "to": "Naxos", "duration": "3-5 hours", "frequency": "daily"},
    {"from": "Piraeus (Athens)", "to": "Santorini", "duration": "4.5-8 hours", "frequency": "daily"},
    {"from": "Piraeus (Athens)", "to": "Ios", "duration": "4-7 hours", "frequency": "daily"},
    {"from": "Piraeus (Athens)", "to": "Milos", "duration": "2.5-7 hours", "frequency": "daily"},
    {"from": "Piraeus (Athens)", "to": "Sifnos", "duration": "3-5 hours", "frequency": "daily"},
    {"from": "Piraeus (Athens)", "to": "Serifos", "duration": "2.5-4 hours", "frequency": "daily"},
    {"from": "Piraeus (Athens)", "to": "Kythnos", "duration": "2-3 hours", "frequency": "daily"},
    {"from": "Piraeus (Athens)", "to": "Tinos", "duration": "4 hours", "frequency": "daily"},
    {"from": "Rafina", "to": "Andros", "duration": "1-2 hours", "frequency": "daily"},
    {"from": "Rafina", "to": "Tinos", "duration": "2-3.5 hours", "frequency": "seasonal"},
    {"from": "Rafina", "to": "Mykonos", "duration": "2.5-3 hours", "frequency": "seasonal"},
    {"from": "Rafina", "to": "Paros", "duration": "3.5 hours", "frequency": "seasonal"},
    {"from": "Rafina", "to": "Naxos", "duration": "4.5-5.5 hours", "frequency": "seasonal"},
    {"from": "Lavrio", "to": "Kea (Tzia)", "duration": "1 hour", "frequency": "daily"},
    {"from": "Lavrio", "to": "Kythnos", "duration": "1.5-2.5 hours", "frequency": "daily"},
    {"from": "Mykonos", "to": "Santorini", "duration": "2-3 hours", "frequency": "daily"},
    {"from": "Mykonos", "to": "Paros", "duration": "30min-1.5 hours", "frequency": "daily"},
    {"from": "Mykonos", "to": "Naxos", "duration": "30min-1.5 hours", "frequency": "daily"},
    {"from": "Mykonos", "to": "Tinos", "duration": "15-30 minutes", "frequency": "daily"},
    {"from": "Mykonos", "to": "Syros", "duration": "30min-1 hour", "frequency": "daily"},
    {"from": "Paros", "to": "Naxos", "duration": "30min-1 hour", "frequency": "daily"},
    {"from": "Paros", "to": "Santorini", "duration": "2 hours", "frequency": "daily"},
    {"from": "Paros", "to": "Ios", "duration": "1-2 hours", "frequency": "daily"},
    {"from": "Paros", "to": "Milos", "duration": "2-3 hours", "frequency": "seasonal"},
    {"from": "Naxos", "to": "Santorini", "duration": "2 hours", "frequency": "daily"},
    {"from": "Naxos", "to": "Ios", "duration": "1 hour", "frequency": "daily"},
    {"from": "Naxos", "to": "Koufonisia", "duration": "30min-1 hour", "frequency": "daily"},
    {"from": "Naxos", "to": "Iraklia", "duration": "45min", "frequency": "daily"},
    {"from": "Naxos", "to": "Schinoussa", "duration": "1 hour", "frequency": "daily"},
    {"from": "Naxos", "to": "Donousa", "duration": "1.5 hours", "frequency": "daily"},
    {"from": "Naxos", "to": "Amorgos", "duration": "2-3 hours", "frequency": "daily"},
    {"from": "Santorini", "to": "Ios", "duration": "30min-1 hour", "frequency": "daily"},
    {"from": "Santorini", "to": "Milos", "duration": "2 hours", "frequency": "seasonal"},
    {"from": "Santorini", "to": "Folegandros", "duration": "40min-1 hour", "frequency": "daily"},
    {"from": "Santorini", "to": "Sikinos", "duration": "30-45 minutes", "frequency": "daily"},
    {"from": "Santorini", "to": "Anafi", "duration": "1 hour", "frequency": "seasonal"},
    {"from": "Syros", "to": "Tinos", "duration": "30min-1 hour", "frequency": "daily"},
    {"from": "Syros", "to": "Mykonos", "duration": "30min-1 hour", "frequency": "daily"},
    {"from": "Syros", "to": "Paros", "duration": "1-2 hours", "frequency": "daily"},
    {"from": "Andros", "to": "Tinos", "duration": "1.5 hours", "frequency": "daily"},
    {"from": "Tinos", "to": "Mykonos", "duration": "15-30 minutes", "frequency": "daily"},
    {"from": "Milos", "to": "Kimolos", "duration": "20 minutes", "frequency": "daily"},
    {"from": "Milos", "to": "Sifnos", "duration": "1 hour", "frequency": "daily"},
    {"from": "Milos", "to": "Serifos", "duration": "1.5 hours", "frequency": "daily"},
    {"from": "Sifnos", "to": "Serifos", "duration": "30-55 minutes", "frequency": "daily"},
    {"from": "Serifos", "to": "Kythnos", "duration": "1 hour", "frequency": "daily"},
    {"from": "Ios", "to": "Folegandros", "duration": "45 minutes", "frequency": "daily"},
    {"from": "Ios", "to": "Sikinos", "duration": "20 minutes", "frequency": "daily"},
    {"from": "Folegandros", "to": "Sikinos", "duration": "20 minutes", "frequency": "daily"},
    {"from": "Koufonisia", "to": "Iraklia", "duration": "20 minutes", "frequency": "daily"},
    {"from": "Koufonisia", "to": "Schinoussa", "duration": "15 minutes", "frequency": "daily"},
    {"from": "Iraklia", "to": "Schinoussa", "duration": "7 minutes", "frequency": "daily"},
    {"from": "Schinoussa", "to": "Donousa", "duration": "30 minutes", "frequency": "daily"},
    {"from": "Amorgos", "to": "Koufonisia", "duration": "1 hour", "frequency": "daily"},
    {"from": "Amorgos", "to": "Iraklia", "duration": "1.5 hours", "frequency": "daily"},
    {"from": "Amorgos", "to": "Schinoussa", "duration": "1.5 hours", "frequency": "daily"}
  ],
  "ferry_companies": [
    {"name": "SeaJets", "color": "#FF0000"},
    {"name": "Blue Star Ferries", "color": "#0066CC"},
    {"name": "Golden Star Ferries", "color": "#FFD700"},
    {"name": "Cyclades Fast Ferries", "color": "#00CC66"},
    {"name": "Hellenic Seaways", "color": "#9900CC"},
    {"name": "Zante Ferries", "color": "#FF6600"}
  ]
};

// Global variables
let map;
let markers = [];
let routeLines = [];
let allLocations = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    setupFilters();
    setupMobileControls();
    loadMapData();
});

// Initialize Leaflet map
function initializeMap() {
    // Center on Cyclades archipelago
    map = L.map('map').setView([37.0, 25.0], 9);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);

    // Hide loading spinner after map is ready
    map.whenReady(() => {
        setTimeout(() => {
            document.getElementById('map-loading').style.display = 'none';
        }, 500);
    });
}

// Setup filter controls
function setupFilters() {
    // Generate company filters
    const companyFilters = document.getElementById('company-filters');
    ferryData.ferry_companies.forEach((company, index) => {
        const label = document.createElement('label');
        label.className = 'checkbox-item company-filter-item';
        label.innerHTML = `
            <input type="checkbox" id="company-${index}" checked data-company="${company.name}">
            <span class="checkmark"></span>
            ${company.name}
            <div class="company-color" style="background-color: ${company.color}"></div>
        `;
        companyFilters.appendChild(label);
    });

    // Add event listeners for all filters
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    // Reset filters button
    document.getElementById('reset-filters').addEventListener('click', resetFilters);

    // Route info close button
    document.getElementById('close-route-info').addEventListener('click', hideRouteInfo);
}

// Setup mobile controls
function setupMobileControls() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const controlsPanel = document.querySelector('.controls-panel');

    if (window.innerWidth <= 768) {
        mobileToggle.classList.remove('hidden');
    }

    mobileToggle.addEventListener('click', () => {
        controlsPanel.classList.toggle('mobile-open');
    });

    // Close panel when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !controlsPanel.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
            controlsPanel.classList.remove('mobile-open');
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            mobileToggle.classList.remove('hidden');
        } else {
            mobileToggle.classList.add('hidden');
            controlsPanel.classList.remove('mobile-open');
        }
    });
}

// Load and display map data
function loadMapData() {
    // Combine all locations
    allLocations = [
        ...ferryData.mainland_ports,
        ...ferryData.islands
    ];

    // Add markers for all locations
    addLocationMarkers();
    
    // Add ferry routes
    addFerryRoutes();
}

// Add markers for islands and mainland ports
function addLocationMarkers() {
    allLocations.forEach(location => {
        let markerOptions;
        let popupContent;

        if (location.type === 'mainland') {
            markerOptions = {
                color: '#C0152F',
                fillColor: '#C0152F',
                fillOpacity: 0.8,
                radius: 10,
                weight: 2
            };
            popupContent = `
                <div class="popup-content">
                    <h4>${location.name}</h4>
                    <p>Mainland ferry port</p>
                    <span class="island-type">Port</span>
                </div>
            `;
        } else {
            const isMajor = location.type === 'major';
            markerOptions = {
                color: isMajor ? '#218C8D' : '#A84B2F',
                fillColor: isMajor ? '#218C8D' : '#A84B2F',
                fillOpacity: 0.8,
                radius: isMajor ? 8 : 6,
                weight: 2
            };
            popupContent = `
                <div class="popup-content">
                    <h4>${location.name}</h4>
                    <p>Cyclades island</p>
                    <span class="island-type">${isMajor ? 'Major' : 'Small'} Island</span>
                </div>
            `;
        }

        const marker = L.circleMarker([location.lat, location.lon], markerOptions)
            .bindPopup(popupContent)
            .addTo(map);

        markers.push({
            marker: marker,
            location: location,
            type: location.type
        });
    });
}

// Add ferry routes as polylines
function addFerryRoutes() {
    ferryData.ferry_routes.forEach((route, index) => {
        const fromLocation = findLocation(route.from);
        const toLocation = findLocation(route.to);

        if (fromLocation && toLocation) {
            // Assign random company for demonstration
            const company = ferryData.ferry_companies[index % ferryData.ferry_companies.length];
            
            // Determine if it's mainland to island route
            const isMainlandRoute = fromLocation.type === 'mainland' || toLocation.type === 'mainland';
            
            const routeLine = L.polyline([
                [fromLocation.lat, fromLocation.lon],
                [toLocation.lat, toLocation.lon]
            ], {
                color: company.color,
                weight: 3,
                opacity: 0.7,
                smoothFactor: 1
            }).addTo(map);

            // Add hover effects
            routeLine.on('mouseover', function(e) {
                this.setStyle({
                    weight: 5,
                    opacity: 0.9
                });
                showRouteInfo(route, company, e.latlng);
            });

            routeLine.on('mouseout', function(e) {
                this.setStyle({
                    weight: 3,
                    opacity: 0.7
                });
            });

            routeLine.on('click', function(e) {
                showRouteInfo(route, company, e.latlng);
            });

            routeLines.push({
                line: routeLine,
                route: route,
                company: company,
                isMainlandRoute: isMainlandRoute,
                fromType: fromLocation.type,
                toType: toLocation.type
            });
        }
    });
}

// Find location by name
function findLocation(name) {
    return allLocations.find(loc => loc.name === name);
}

// Show route information panel
function showRouteInfo(route, company, latlng) {
    const routeInfo = document.getElementById('route-info');
    const routeTitle = document.getElementById('route-title');
    const routeDuration = document.getElementById('route-duration');
    const routeFrequency = document.getElementById('route-frequency');
    const routeCompany = document.getElementById('route-company');

    routeTitle.textContent = `${route.from} → ${route.to}`;
    routeDuration.textContent = route.duration;
    routeFrequency.textContent = route.frequency;
    routeCompany.innerHTML = `<span style="color: ${company.color}; font-weight: bold;">${company.name}</span>`;

    routeInfo.classList.remove('hidden');
}

// Hide route information panel
function hideRouteInfo() {
    document.getElementById('route-info').classList.add('hidden');
}

// Apply filters to map
function applyFilters() {
    const activeCompanies = new Set();
    const showMainlandRoutes = document.getElementById('mainland-routes').checked;
    const showIslandRoutes = document.getElementById('island-routes').checked;
    const showMajorIslands = document.getElementById('major-islands').checked;
    const showSmallIslands = document.getElementById('small-islands').checked;

    // Get active companies
    document.querySelectorAll('input[data-company]').forEach(checkbox => {
        if (checkbox.checked) {
            activeCompanies.add(checkbox.dataset.company);
        }
    });

    // Filter route lines
    routeLines.forEach(routeData => {
        const { line, company, isMainlandRoute } = routeData;
        let show = true;

        // Check company filter
        if (!activeCompanies.has(company.name)) {
            show = false;
        }

        // Check route type filter
        if (isMainlandRoute && !showMainlandRoutes) {
            show = false;
        } else if (!isMainlandRoute && !showIslandRoutes) {
            show = false;
        }

        // Show/hide route
        if (show) {
            line.addTo(map);
        } else {
            map.removeLayer(line);
        }
    });

    // Filter island markers
    markers.forEach(markerData => {
        const { marker, location } = markerData;
        let show = true;

        if (location.type === 'major' && !showMajorIslands) {
            show = false;
        } else if (location.type === 'small' && !showSmallIslands) {
            show = false;
        }

        // Show/hide marker
        if (show) {
            marker.addTo(map);
        } else {
            map.removeLayer(marker);
        }
    });
}

// Reset all filters
function resetFilters() {
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = true;
    });
    applyFilters();
    hideRouteInfo();
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    const loading = document.getElementById('map-loading');
    if (loading && loading.style.display !== 'none') {
        loading.innerHTML = `
            <div style="text-align: center; color: var(--color-error);">
                <p>Error loading map. Please refresh the page.</p>
                <button class="btn btn--primary" onclick="location.reload()">Refresh</button>
            </div>
        `;
    }
});
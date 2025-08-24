// Enhanced application data with comprehensive bird information
const naturaSites = [
  {
    "name": "Nisos Gyaros Kai Thalassia Zoni",
    "code": "GR4220033",
    "island": "Gyaros",
    "lat": 37.6167,
    "lng": 24.7333,
    "habitats": ["Posidonia meadows", "Rocky reefs", "Marine caves", "Wild beaches", "Cliff breeding sites"],
    "species": {
      "monk_seals": ["Mediterranean monk seal (Monachus monachus)"],
      "turtles": ["Loggerhead turtle (Caretta caretta)"],
      "dolphins": ["Bottlenose dolphin (Tursiops truncatus)", "Striped dolphin (Stenella coeruleoalba)"],
      "plants": ["Posidonia oceanica", "Cystoseira compressa", "Cymodocea nodosa"],
      "seabirds": ["Yelkouan shearwater (Puffinus yelkouan)", "Eleonora's falcon (Falco eleonorae)", "Cory's shearwater (Calonectris diomedea)", "European shag (Phalacrocorax aristotelis desmarestii)"],
      "raptors": ["Peregrine falcon (Falco peregrinus)", "Golden eagle (Aquila chrysaetos)"]
    },
    "description": "One of the most important breeding nuclei for Mediterranean monk seals with ~70 individuals. Important breeding site for Eleonora's falcon with cliff-nesting colonies. Protected marine area with extensive Posidonia meadows covering 50% of seafloor.",
    "bird_significance": "Critical seabird breeding site with major Eleonora's falcon colony",
    "markerType": "birds"
  },
  {
    "name": "Dytiki Milos Antimilos Polyaigos Kai Nisides",
    "code": "GR4220030",
    "island": "Milos/Antimilos/Polyaigos",
    "lat": 36.7167,
    "lng": 24.5000,
    "habitats": ["Posidonia meadows", "Rocky reefs", "Volcanic formations", "Sea caves", "Wild beaches", "Cliff nesting sites"],
    "species": {
      "monk_seals": ["Mediterranean monk seal (Monachus monachus)"],
      "turtles": ["Loggerhead turtle (Caretta caretta)", "Green turtle (Chelonia mydas)"],
      "dolphins": ["Striped dolphin (Stenella coeruleoalba)", "Bottlenose dolphin (Tursiops truncatus)", "Risso's dolphin (Grampus griseus)"],
      "plants": ["Posidonia oceanica", "Cystoseira spinosa", "Endemic Milos viper habitat plants"],
      "endemic": ["Milos viper (Macrovipera schweizeri)", "Silene holzmannii"],
      "seabirds": ["Eleonora's falcon (Falco eleonorae)", "Yelkouan shearwater (Puffinus yelkouan)", "Cory's shearwater (Calonectris diomedea)", "Audouin's gull (Larus audouinii)"],
      "raptors": ["Peregrine falcon (Falco peregrinus)", "Bonelli's eagle (Hieraaetus fasciatus)"]
    },
    "description": "Key habitat for Kimolos-Polyaigos monk seal population. Major Eleonora's falcon breeding area - known to practice unique 'bird imprisonment' behavior. Volcanic underwater formations and extensive seagrass meadows.",
    "bird_significance": "Major falcon breeding site with over 2/3 of global Eleonora's falcon population breeding in Greek islands",
    "markerType": "birds"
  },
  {
    "name": "Kentriki Kai Notia Naxos",
    "code": "GR4220014",
    "island": "Naxos",
    "lat": 37.0833,
    "lng": 25.4167,
    "habitats": ["Posidonia meadows", "Coastal wetlands", "Sand dunes", "Rocky shores", "Mountain habitats"],
    "species": {
      "turtles": ["Loggerhead turtle (Caretta caretta)", "Green turtle (Chelonia mydas) - first recorded nest in Cyclades 2025"],
      "dolphins": ["Striped dolphin (Stenella coeruleoalba)", "Common dolphin (Delphinus delphis)"],
      "plants": ["Posidonia oceanica", "Juniperus phoenicea", "Hypericum cycladicum"],
      "endemic": ["Scilla andria", "Hypericum cycladicum", "Dianthus fruticosus"],
      "landbirds": ["Sardinian warbler (Curruca melanocephala)", "Crested lark (Galerida cristata)", "Blue rock thrush (Monticola solitarius)", "European goldfinch (Carduelis carduelis)", "Chukar partridge (Alectoris chukar)"],
      "raptors": ["Eleonora's falcon (Falco eleonorae)", "Eurasian buzzard (Buteo buteo)", "Common kestrel (Falco tinnunculus)"]
    },
    "description": "Mt. Zas region with marine zone. Historic first green turtle nest recorded in Cyclades in 2025 at Apollonas. Important migration stopover site.",
    "bird_significance": "Key migration stopover with diverse landbird species and raptor populations",
    "markerType": "migration"
  },
  {
    "name": "Nisides Mykonou",
    "code": "GR4220027",
    "island": "Mykonos/Rineia",
    "lat": 37.4333,
    "lng": 25.3167,
    "habitats": ["Posidonia meadows", "Rocky islets", "Wild beaches", "Scrubland"],
    "species": {
      "dolphins": ["Striped dolphin (Stenella coeruleoalba)", "Bottlenose dolphin (Tursiops truncatus)"],
      "plants": ["Posidonia oceanica", "Cystoseira compressa"],
      "seabirds": ["Eleonora's falcon (Falco eleonorae)", "Yelkouan shearwater (Puffinus yelkouan)", "Cory's shearwater (Calonectris diomedea)", "European storm petrel (Hydrobates pelagicus)"]
    },
    "description": "Rineia and surrounding islets with important marine ecosystems and seabird breeding sites. Both Cory's and Yelkouan shearwaters breed here.",
    "bird_significance": "Important shearwater breeding colonies together with central Cyclades sites",
    "markerType": "birds"
  },
  {
    "name": "Santorini: Nea Kai Palia Kammeni",
    "code": "GR4220003",
    "island": "Santorini",
    "lat": 36.4000,
    "lng": 25.4333,
    "habitats": ["Volcanic formations", "Rocky reefs", "Deep water coral communities", "Cliffs"],
    "species": {
      "dolphins": ["Striped dolphin (Stenella coeruleoalba)", "Risso's dolphin (Grampus griseus)"],
      "plants": ["Deep water algae communities", "Coralligenous formations"],
      "special": ["Kolumbo underwater volcano ecosystem"],
      "seabirds": ["European shag (Phalacrocorax aristotelis desmarestii)", "Yellow-legged gull (Larus michahellis)", "Eleonora's falcon (Falco eleonorae)"]
    },
    "description": "Unique volcanic marine ecosystem with underwater volcano Kolumbo. Deep water coralligenous formations. Cliff-nesting seabirds on volcanic formations.",
    "bird_significance": "Volcanic cliff nesting habitat for Mediterranean seabirds",
    "markerType": "reefs"
  },
  {
    "name": "Mikres Kyklades",
    "code": "GR4220013",
    "island": "Koufonisia/Iraklia/Schinoussa",
    "lat": 36.9333,
    "lng": 25.6167,
    "habitats": ["Posidonia meadows", "Rocky shores", "Sea caves", "Wild beaches", "Low scrubland"],
    "species": {
      "dolphins": ["Striped dolphin (Stenella coeruleoalba)", "Bottlenose dolphin (Tursiops truncatus)"],
      "turtles": ["Loggerhead turtle (Caretta caretta)"],
      "plants": ["Posidonia oceanica", "Cymodocea nodosa"],
      "caves": ["Submerged marine caves"],
      "seabirds": ["Yelkouan shearwater (Puffinus yelkouan)", "Cory's shearwater (Calonectris diomedea)", "Eleonora's falcon (Falco eleonorae)"]
    },
    "description": "Small Cyclades with pristine marine ecosystems and important seagrass meadows. Key shearwater breeding area.",
    "bird_significance": "Critical breeding site for both Cory's and Yelkouan shearwaters",
    "markerType": "birds"
  },
  {
    "name": "Andros: Kentriko Kai Notio Tmima",
    "code": "GR4220028",
    "island": "Andros",
    "lat": 37.8000,
    "lng": 24.9000,
    "habitats": ["Posidonia meadows", "Rocky reefs", "Coastal streams", "Oak forests", "Mountain habitats"],
    "species": {
      "dolphins": ["Striped dolphin (Stenella coeruleoalba)", "Bottlenose dolphin (Tursiops truncatus)"],
      "plants": ["Posidonia oceanica", "Galanthus ikariae", "Campanula sartorii", "Alnus glutinosa"],
      "endemic": ["400+ mushroom species including 4 endemic", "Entoloma alnicola", "Ferulago sartorii"],
      "raptors": ["Bonelli's eagle (Hieraaetus fasciatus)", "Eleonora's falcon (Falco eleonorae)", "Golden eagle (Aquila chrysaetos)", "Peregrine falcon (Falco peregrinus)"],
      "landbirds": ["European bee-eater (Merops apiaster)", "Hoopoe (Upupa epops)", "Rock nuthatch (Sitta neumayer)", "Blue rock thrush (Monticola solitarius)"],
      "bats": ["Lesser mouse-eared bat (Myotis blythii)", "Geoffroy's bat (Myotis emarginatus)", "Lesser horseshoe bat (Rhinolophus hipposideros)"]
    },
    "description": "Richest flora in Cyclades with 1,046 species. Home to 3 pairs of Bonelli's eagles. Unique riparian forests and extensive marine habitats. Important raptor breeding area.",
    "bird_significance": "Major raptor breeding site - one of the few Aegean locations for Bonelli's eagle nesting",
    "markerType": "raptors"
  },
  {
    "name": "Paros: Petaloudes & Nisides",
    "code": "GR4220016/GR4220025",
    "island": "Paros/Antiparos",
    "lat": 37.0833,
    "lng": 25.1500,
    "habitats": ["Posidonia meadows", "Rocky shores", "Coastal wetlands", "Valley wetlands"],
    "species": {
      "dolphins": ["Striped dolphin (Stenella coeruleoalba)", "Bottlenose dolphin (Tursiops truncatus)"],
      "plants": ["Posidonia oceanica", "Santa Maria lagoon vegetation"],
      "restoration": ["CLIMAREST project restoration site at St. John's Bay"],
      "butterflies": ["Jersey tiger (Euplagia quadripunctaria)"],
      "seabirds": ["Eleonora's falcon (Falco eleonorae)", "Yelkouan shearwater (Puffinus yelkouan)"],
      "waders": ["Little ringed plover (Charadrius dubius)", "Common sandpiper (Actitis hypoleucos)"]
    },
    "description": "Important dolphin watching area with ongoing Posidonia restoration project. Santa Maria lagoon ecosystem. Famous Valley of Butterflies with Jersey tigers.",
    "bird_significance": "Wetland habitat supporting waders and Santa Maria lagoon ecosystem",
    "markerType": "seagrass"
  },
  {
    "name": "Sifnos: Profitis Ilias",
    "code": "GR4220008",
    "island": "Sifnos",
    "lat": 36.9833,
    "lng": 24.7167,
    "habitats": ["Rocky shores", "Wild beaches", "Endemic habitats", "Mountain peaks"],
    "species": {
      "birds": ["39 bird species recorded including migrants and residents"],
      "endemic": ["19 rare endemic species (animals and plants)"],
      "raptors": ["Eleonora's falcon (Falco eleonorae)", "Common buzzard (Buteo buteo)"],
      "seabirds": ["Yellow-legged gull (Larus michahellis)", "European shag (Phalacrocorax aristotelis)"]
    },
    "description": "Host to 39 bird species and 19 rare mainly endemic animals and plant species. Mountain habitat with diverse avifauna.",
    "bird_significance": "Mountain and coastal habitat supporting 39 bird species including endemics",
    "markerType": "endemic"
  },
  {
    "name": "Tinos: Myrsini - Akrotirio Livada",
    "code": "GR4220019",
    "island": "Tinos",
    "lat": 37.6333,
    "lng": 25.1833,
    "habitats": ["Rocky shores", "Coastal wetlands", "Lagoons"],
    "species": {
      "plants": ["Kolimbithra lagoon ecosystem", "Trifolium andricum", "Scilla andria"],
      "wetlands": ["Kolimbithra corresponds to habitat type 1150"],
      "waders": ["Little egret (Egretta garzetta)", "Grey heron (Ardea cinerea)", "Common sandpiper (Actitis hypoleucos)"],
      "ducks": ["Mallard (Anas platyrhynchos)", "Common shelduck (Tadorna tadorna)"]
    },
    "description": "Kolimbithra lagoon in good conservation status and endemic plant species. Important wetland bird habitat.",
    "bird_significance": "Wetland ecosystem supporting waders, herons and waterfowl at Kolimbithra lagoon",
    "markerType": "migration"
  }
];

// Key bird species information
const keyBirdSpecies = {
  "eleonoras_falcon": {
    "name": "Eleonora's Falcon",
    "scientific": "Falco eleonorae",
    "status": "Priority species",
    "breeding_season": "July-October",
    "migration": "9,000km to Madagascar",
    "behavior": "Unique autumn breeding, bird imprisonment"
  },
  "yelkouan_shearwater": {
    "name": "Yelkouan Shearwater", 
    "scientific": "Puffinus yelkouan",
    "status": "Mediterranean endemic",
    "habitat": "Marine caves and cliffs"
  },
  "bonellis_eagle": {
    "name": "Bonelli's Eagle",
    "scientific": "Hieraaetus fasciatus", 
    "status": "100-140 pairs in Greece",
    "andros_pairs": 3
  }
};

// Global variables
let map;
let markers = [];
let markerGroup;

// Enhanced marker colors
const markerColors = {
  seagrass: '#1FB8CD',
  reefs: '#B4413C', 
  endemic: '#5D878F',
  mammals: '#964325',
  turtles: '#FFC185',
  birds: '#D2BA4C',
  raptors: '#944454',
  migration: '#32B4CD'
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  showLoading();
  initializeMap();
  setupEventListeners();
  setTimeout(() => {
    hideLoading();
  }, 1000);
});

function showLoading() {
  document.getElementById('loading').classList.remove('hidden');
}

function hideLoading() {
  document.getElementById('loading').classList.add('hidden');
}

// Initialize Leaflet map
function initializeMap() {
  // Create map centered on Cyclades
  map = L.map('map').setView([37.0, 25.0], 9);
  
  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors | Natura 2000 data: European Environment Agency',
    maxZoom: 18
  }).addTo(map);
  
  // Create marker group
  markerGroup = L.layerGroup().addTo(map);
  
  // Add markers for each site
  addSiteMarkers();
}

// Create custom marker icons
function createMarkerIcon(type, size = 25) {
  return L.divIcon({
    html: `<div style="
      width: ${size}px;
      height: ${size}px;
      background-color: ${markerColors[type]};
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`,
    className: 'custom-marker',
    iconSize: [size, size],
    iconAnchor: [size/2, size/2]
  });
}

// Add site markers to map
function addSiteMarkers() {
  naturaSites.forEach(site => {
    const marker = L.marker([site.lat, site.lng], {
      icon: createMarkerIcon(site.markerType)
    });
    
    // Create popup content
    const popupContent = createPopupContent(site);
    marker.bindPopup(popupContent, {
      maxWidth: 450,
      className: 'custom-popup'
    });
    
    // Store site data with marker
    marker.siteData = site;
    
    // Add to marker group
    marker.addTo(markerGroup);
    markers.push(marker);
  });
}

// Create enhanced popup content with bird information
function createPopupContent(site) {
  let content = `
    <div class="popup-header">
      <div class="popup-title">${site.name}</div>
      <div class="popup-code">${site.code}</div>
      <div class="popup-island">📍 ${site.island}</div>
    </div>
  `;
  
  // Bird significance highlight
  if (site.bird_significance) {
    content += `
      <div class="bird-significance">
        🦅 <strong>Bird Importance:</strong> ${site.bird_significance}
      </div>
    `;
  }
  
  // Habitats
  if (site.habitats && site.habitats.length > 0) {
    content += `
      <div class="popup-section">
        <h4>🏝️ Habitats</h4>
        <ul>
          ${site.habitats.map(habitat => `<li>${habitat}</li>`).join('')}
        </ul>
      </div>
    `;
  }
  
  // Species sections
  const species = site.species;
  
  // Seabirds
  if (species.seabirds) {
    content += `
      <div class="popup-section">
        <h4>🌊 Seabirds</h4>
        <ul>
          ${species.seabirds.map(bird => {
            let statusInfo = '';
            if (bird.includes('Eleonora\'s falcon')) {
              statusInfo = ' <span class="status-highlight status-priority">Priority Species</span><span class="breeding-season">Breeds Jul-Oct</span>';
            } else if (bird.includes('Yelkouan shearwater')) {
              statusInfo = ' <span class="status-highlight status-endemic">Mediterranean Endemic</span>';
            }
            return `<li>${bird}${statusInfo}</li>`;
          }).join('')}
        </ul>
      </div>
    `;
  }
  
  // Raptors
  if (species.raptors) {
    content += `
      <div class="popup-section">
        <h4>🦅 Raptors</h4>
        <ul>
          ${species.raptors.map(raptor => {
            let statusInfo = '';
            if (raptor.includes('Bonelli\'s eagle')) {
              statusInfo = ' <span class="status-highlight status-critical">3 pairs on Andros</span>';
            } else if (raptor.includes('Golden eagle')) {
              statusInfo = ' <span class="status-highlight status-vulnerable">Mountain species</span>';
            }
            return `<li>${raptor}${statusInfo}</li>`;
          }).join('')}
        </ul>
      </div>
    `;
  }
  
  // Landbirds
  if (species.landbirds) {
    content += `
      <div class="popup-section">
        <h4>🐦 Landbirds</h4>
        <ul>
          ${species.landbirds.map(bird => `<li>${bird}</li>`).join('')}
        </ul>
      </div>
    `;
  }
  
  // Waders & Water birds
  if (species.waders || species.ducks) {
    content += `
      <div class="popup-section">
        <h4>🦆 Wetland Birds</h4>
        <ul>
          ${(species.waders || []).map(bird => `<li>${bird}</li>`).join('')}
          ${(species.ducks || []).map(bird => `<li>${bird}</li>`).join('')}
        </ul>
      </div>
    `;
  }
  
  // Marine mammals
  if (species.monk_seals) {
    content += `
      <div class="popup-section">
        <h4>🦭 Monk Seals</h4>
        <ul>
          ${species.monk_seals.map(seal => `
            <li>${seal} <span class="status-highlight status-critical">Critically Endangered</span></li>
          `).join('')}
        </ul>
      </div>
    `;
  }
  
  if (species.dolphins) {
    content += `
      <div class="popup-section">
        <h4>🐬 Dolphins</h4>
        <ul>
          ${species.dolphins.map(dolphin => `<li>${dolphin}</li>`).join('')}
        </ul>
      </div>
    `;
  }
  
  // Sea Turtles
  if (species.turtles) {
    content += `
      <div class="popup-section">
        <h4>🐢 Sea Turtles</h4>
        <ul>
          ${species.turtles.map(turtle => {
            const isGreen = turtle.includes('Green turtle');
            const status = turtle.includes('Loggerhead') ? 'Vulnerable' : 'Historic First';
            const statusClass = turtle.includes('Loggerhead') ? 'status-vulnerable' : 'status-critical';
            return `<li>${turtle} <span class="status-highlight ${statusClass}">${status}</span></li>`;
          }).join('')}
        </ul>
      </div>
    `;
  }
  
  // Marine Plants
  if (species.plants) {
    content += `
      <div class="popup-section">
        <h4>🌿 Marine Plants</h4>
        <ul>
          ${species.plants.map(plant => {
            const isPosidonia = plant.includes('Posidonia oceanica');
            return `<li>${plant}${isPosidonia ? ' <span class="status-highlight status-endemic">Priority Habitat</span>' : ''}</li>`;
          }).join('')}
        </ul>
      </div>
    `;
  }
  
  // Endemic species
  if (species.endemic) {
    content += `
      <div class="popup-section">
        <h4>🌺 Endemic Species</h4>
        <ul>
          ${species.endemic.map(endemic => `
            <li>${endemic} <span class="status-highlight status-endemic">Endemic</span></li>
          `).join('')}
        </ul>
      </div>
    `;
  }
  
  // Special features
  if (species.special) {
    content += `
      <div class="popup-section">
        <h4>✨ Special Features</h4>
        <ul>
          ${species.special.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
      </div>
    `;
  }
  
  // Description
  content += `
    <div class="popup-description">
      ${site.description}
    </div>
  `;
  
  return content;
}

// Setup event listeners
function setupEventListeners() {
  // Search functionality
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  
  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
  
  // Enhanced filter checkboxes
  const filterCheckboxes = document.querySelectorAll('[id^="filter-"]');
  filterCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', applyFilters);
  });
  
  // Modal controls
  const infoToggle = document.getElementById('info-toggle');
  const legendToggle = document.getElementById('legend-toggle');
  const migrationToggle = document.getElementById('migration-toggle');
  
  const infoModal = document.getElementById('info-modal');
  const migrationModal = document.getElementById('migration-modal');
  
  const infoClose = document.getElementById('info-close');
  const migrationClose = document.getElementById('migration-close');
  const legend = document.getElementById('legend');
  
  // Info modal
  infoToggle.addEventListener('click', () => {
    infoModal.classList.remove('hidden');
  });
  
  infoClose.addEventListener('click', () => {
    infoModal.classList.add('hidden');
  });
  
  infoModal.addEventListener('click', (e) => {
    if (e.target === infoModal) {
      infoModal.classList.add('hidden');
    }
  });
  
  // Migration modal
  migrationToggle.addEventListener('click', () => {
    migrationModal.classList.remove('hidden');
  });
  
  migrationClose.addEventListener('click', () => {
    migrationModal.classList.add('hidden');
  });
  
  migrationModal.addEventListener('click', (e) => {
    if (e.target === migrationModal) {
      migrationModal.classList.add('hidden');
    }
  });
  
  // Legend toggle
  legendToggle.addEventListener('click', () => {
    legend.style.display = legend.style.display === 'none' ? 'block' : 'none';
  });
}

// Enhanced search functionality
function performSearch() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
  
  if (!searchTerm) {
    // Reset view if empty search
    map.setView([37.0, 25.0], 9);
    return;
  }
  
  // Find matching sites (including bird species search)
  const matchingSites = naturaSites.filter(site => {
    // Search in basic site info
    const basicMatch = site.name.toLowerCase().includes(searchTerm) ||
                      site.island.toLowerCase().includes(searchTerm) ||
                      site.code.toLowerCase().includes(searchTerm);
    
    // Search in bird species
    const birdMatch = (site.species.seabirds && site.species.seabirds.some(bird => 
        bird.toLowerCase().includes(searchTerm))) ||
      (site.species.raptors && site.species.raptors.some(bird => 
        bird.toLowerCase().includes(searchTerm))) ||
      (site.species.landbirds && site.species.landbirds.some(bird => 
        bird.toLowerCase().includes(searchTerm))) ||
      (site.species.waders && site.species.waders.some(bird => 
        bird.toLowerCase().includes(searchTerm))) ||
      (site.species.ducks && site.species.ducks.some(bird => 
        bird.toLowerCase().includes(searchTerm)));
    
    // Search in significance
    const significanceMatch = site.bird_significance && 
                             site.bird_significance.toLowerCase().includes(searchTerm);
    
    return basicMatch || birdMatch || significanceMatch;
  });
  
  if (matchingSites.length > 0) {
    // Focus on first match
    const firstMatch = matchingSites[0];
    map.setView([firstMatch.lat, firstMatch.lng], 12);
    
    // Find and open popup for first match
    const matchingMarker = markers.find(marker => 
      marker.siteData.code === firstMatch.code
    );
    if (matchingMarker) {
      matchingMarker.openPopup();
    }
  } else {
    alert('No matching sites found. Try searching for an island name, bird species like "Eleonora\'s falcon" or "shearwater".');
  }
}

// Enhanced filter functionality
function applyFilters() {
  const filters = {
    // Bird filters
    allBirds: document.getElementById('filter-all-birds').checked,
    seabirds: document.getElementById('filter-seabirds').checked,
    raptors: document.getElementById('filter-raptors').checked,
    landbirds: document.getElementById('filter-landbirds').checked,
    migration: document.getElementById('filter-migration').checked,
    
    // Marine life filters
    dolphins: document.getElementById('filter-dolphins').checked,
    monkSeals: document.getElementById('filter-monk-seals').checked,
    turtles: document.getElementById('filter-turtles').checked,
    endemic: document.getElementById('filter-endemic').checked,
    seagrass: document.getElementById('filter-seagrass').checked
  };
  
  markers.forEach(marker => {
    const site = marker.siteData;
    let showMarker = false;
    
    // Check bird filters
    if (filters.allBirds && (site.species.seabirds || site.species.raptors || site.species.landbirds || site.species.waders || site.species.ducks)) {
      showMarker = true;
    }
    if (filters.seabirds && site.species.seabirds) showMarker = true;
    if (filters.raptors && site.species.raptors) showMarker = true;
    if (filters.landbirds && site.species.landbirds) showMarker = true;
    if (filters.migration && site.markerType === 'migration') showMarker = true;
    
    // Check marine life filters
    if (filters.dolphins && site.species.dolphins) showMarker = true;
    if (filters.monkSeals && site.species.monk_seals) showMarker = true;
    if (filters.turtles && site.species.turtles) showMarker = true;
    if (filters.endemic && site.species.endemic) showMarker = true;
    if (filters.seagrass && site.habitats && site.habitats.some(h => h.includes('Posidonia'))) showMarker = true;
    
    // Show/hide marker
    if (showMarker) {
      if (!map.hasLayer(marker)) {
        marker.addTo(map);
      }
    } else {
      if (map.hasLayer(marker)) {
        map.removeLayer(marker);
      }
    }
  });
}
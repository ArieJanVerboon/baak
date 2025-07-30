// Cyclades Hidden Gems Interactive Infographic - main JS
// -------------------------------------------------------
// 1. Embedded dataset (locations + category colors)
// 2. Initialise Leaflet map & markers
// 3. Render responsive location cards
// 4. Provide filtering (buttons + category tiles)
// -------------------------------------------------------

const DATA = {
  locations: [
    { name: "Livadi Anchorage, Iraklia", category: "Small Cyclades", coordinates: [36.8333, 25.45], description: "Sandy beach, clear water, peaceful atmosphere. Great for swimming, snorkeling, and walking to the island's port.", highlights: ["Untouched nature", "Often quiet", "Crystal clear waters"], accessibleBy: "Sailboat only" },
    { name: "Stavros Anchorage, Donousa", category: "Small Cyclades", coordinates: [37.08, 25.53], description: "Crystal-clear waters and tranquil bay with great shade and isolation.", highlights: ["Scenic coves", "Perfect for relaxing", "Excellent isolation"], accessibleBy: "Sailboat only" },
    { name: "Livadi Bay, Schoinoussa", category: "Small Cyclades", coordinates: [36.87, 25.52], description: "Stunningly secluded bay, perfect for anchoring on sandy bottom to escape crowds.", highlights: ["Beautiful trails", "Nature hikes", "Sandy bottom anchoring"], accessibleBy: "Sailboat only" },
    { name: "Detis Anchorage, Kato Koufonisi", category: "Small Cyclades", coordinates: [36.87, 25.62], description: "Uninhabited, turquoise waters, golden beaches, and fascinating marine life.", highlights: ["Sea caves", "Snorkeling", "Total solitude"], accessibleBy: "Sailboat only" },
    { name: "Pori Bay, Pano Koufonisia", category: "Small Cyclades", coordinates: [36.87, 25.63], description: "Turquoise water, sandy beach, protection from most wind directions.", highlights: ["Swimming", "Snorkeling", "Hidden coves"], accessibleBy: "Sailboat only" },

    { name: "Rinia Island", category: "Uninhabited Islands", coordinates: [37.409, 25.229], description: "Uninhabited island near Delos with wild beaches and ancient ruins.", highlights: ["Ancient ruins", "Wild beaches", "Total silence"], accessibleBy: "Sailboat only" },
    { name: "Polyaigos Island", category: "Uninhabited Islands", coordinates: [36.7667, 24.6333], description: "Largest uninhabited Aegean island with rock formations, sea caves, and pristine wildlife.", highlights: ["Rock formations", "Sea caves", "Untouched nature", "Monk seals"], accessibleBy: "Sailboat only" },
    { name: "Despotiko Island", category: "Uninhabited Islands", coordinates: [36.96, 25.00], description: "Archaeological site and tranquil beaches near Antiparos. Combines history, hiking, and sea adventures.", highlights: ["Archaeological site", "Ancient sanctuary", "Tranquil beaches"], accessibleBy: "Sailboat only" },

    { name: "Agios Sostis, Mykonos", category: "Hidden Beaches", coordinates: [37.45, 25.35], description: "Much quieter beach than most in Mykonos, accessible only by boat with very clear water.", highlights: ["Peaceful church", "Clear water", "Away from crowds"], accessibleBy: "Sailboat only" },
    { name: "Kolona Beach, Kythnos", category: "Hidden Beaches", coordinates: [37.4, 24.4], description: "Famous double-sided sandbar connecting Kythnos to St. Luke islet, offering unique anchorage between two bays.", highlights: ["Double-sided sandbar", "Two crystal-clear bays", "Unique anchorage"], accessibleBy: "Sailboat recommended" },

    { name: "Rina Cave, Naxos", category: "Sea Caves", coordinates: [37.0875, 25.4039], description: "Sea cave at Rina Bay where you can swim under a rock dome and observe unique stalactites.", highlights: ["Rock dome swimming", "Rare underwater life", "Stalactites"], accessibleBy: "Sailboat only" },
    { name: "Kleftiko, Milos", category: "Sea Caves", coordinates: [36.65222, 24.33303], description: "Famous sea caves and 'pirate' hideouts with dramatic white cliffs and brilliant water.", highlights: ["White cliffs", "Pirate caves", "Brilliant water"], accessibleBy: "Sailboat only" }
  ],

  categoryColors: {
    "Small Cyclades": "#2E86AB",
    "Uninhabited Islands": "#A23B72",
    "Hidden Beaches": "#F18F01",
    "Sea Caves": "#C73E1D"
  }
};

let map;
let markerLayer;

// -----------------------------
// INITIALISATION
// -----------------------------
window.addEventListener("DOMContentLoaded", () => {
  initMap();
  renderCards();
  wireFilterButtons();
  wireCategoryTiles();
});

// -----------------------------
// MAP & MARKERS
// -----------------------------
function initMap() {
  // Basic map
  map = L.map("map", {
    zoomControl: true,
    attributionControl: true,
    scrollWheelZoom: true
  }).setView([37, 25], 8);

  // OSM
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Separate layer for markers so we can manage z-index easily
  markerLayer = L.layerGroup().addTo(map);

  DATA.locations.forEach((loc) => {
    const color = DATA.categoryColors[loc.category] || "#1FB8CD";

    const marker = L.marker(loc.coordinates, {
      icon: L.divIcon({
        className: "marker-wrapper",
        html: `<span style="background:${color};width:18px;height:18px;border:3px solid #fff;border-radius:50%;display:block;"></span>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      })
    });

    const popupHTML = `
      <div class="custom-popup">
        <span class="popup-category" style="background:${color};">${loc.category}</span>
        <h3>${loc.name}</h3>
        <p>${loc.description}</p>
        <p style="font-size:12px;margin-top:6px;"><strong>Access:</strong> ${loc.accessibleBy}</p>
      </div>`;

    marker.bindPopup(popupHTML);

    // Explicit open on click (extra reliability)
    marker.on("click", function () {
      this.openPopup();
    });

    marker.addTo(markerLayer);
  });
}

// -----------------------------
// LOCATION CARDS
// -----------------------------
function renderCards() {
  const grid = document.getElementById("locationsGrid");
  grid.innerHTML = "";

  DATA.locations.forEach((loc) => {
    const card = document.createElement("div");
    card.className = `location-card ${slugify(loc.category)} visible`;
    card.dataset.category = loc.category;

    card.innerHTML = `
      <div class="location-card__header">
        <h3 class="location-card__title">${loc.name}</h3>
        <span class="location-card__category">${loc.category}</span>
      </div>
      <div class="location-card__coordinates">${loc.coordinates[0].toFixed(4)}°N, ${loc.coordinates[1].toFixed(4)}°E</div>
      <p class="location-card__description">${loc.description}</p>
      <div class="location-card__highlights">
        <h4>Highlights</h4>
        <div class="highlights-list">
          ${loc.highlights.map((h) => `<span class="highlight-tag">${h}</span>`).join("")}
        </div>
      </div>
      <div class="location-card__access"><span class="access-icon">⚓</span><span>${loc.accessibleBy}</span></div>`;

    grid.appendChild(card);
  });
}

// -----------------------------
// FILTERING
// -----------------------------
function wireFilterButtons() {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      applyFilter(btn.dataset.filter);
    });
  });
}

function applyFilter(category) {
  const cards = document.querySelectorAll(".location-card");

  cards.forEach((card) => {
    if (category === "all" || card.dataset.category === category) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// -----------------------------
// CATEGORY TILES (above cards)
// -----------------------------
function wireCategoryTiles() {
  const tiles = document.querySelectorAll(".category-card");
  tiles.forEach((tile) => {
    tile.addEventListener("click", () => {
      const targetCategory = tile.dataset.category;

      // Smooth scroll to cards section
      const section = document.querySelector(".locations-section");
      section.scrollIntoView({ behavior: "smooth" });

      // After scrolling, activate the filter button programmatically
      setTimeout(() => {
        const btn = document.querySelector(`.filter-btn[data-filter='${targetCategory}']`);
        if (btn) btn.click();
      }, 400);
    });
  });
}

// -----------------------------
// UTILS
// -----------------------------
function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z-]/g, "");
}

// -----------------------------
// ACCESSIBILITY & FOCUS HANDLING
// Remove additional outlines that looked like blue circles reported in tests
// -----------------------------
const style = document.createElement("style");
style.innerHTML = `.filter-btn:focus { outline: none; } .marker-wrapper:focus { outline: none; }`;
document.head.appendChild(style);

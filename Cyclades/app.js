// Data from backend (embedded directly for static infographic)
const itinerary = {
  daily: [
    { day: 1, location: 'Athens - Alimos Marina', distance: 0, distanceLabel: 'Departure', sailing_time: 'Prep day', description: 'Start your journey at Alimos Marina, Greece\'s premier sailing departure point. Complete check-in procedures, stock provisions, and conduct safety briefing.', highlights: ['Marina facilities', 'Provision shopping', 'Safety briefing', 'Athens sightseeing'], expert_tips: 'Arrive early to avoid crowds. Check weather forecast for the next 3-4 days as Meltemi winds can be predicted this far in advance.' },
    { day: 2, location: 'Athens ➜ Cape Sounion', distance: 22, distanceLabel: '22 NM', sailing_time: '3-4 h', description: 'First sailing day to the iconic Temple of Poseidon at Cape Sounion. Excellent anchor spot with historical significance.', highlights: ['Temple of Poseidon', 'Protected anchorage', 'Sunset views', 'Good holding ground'], expert_tips: 'Visit the temple early morning before tourist crowds. Anchor north of the bay in sand and weed for best holding.' },
    { day: 3, location: 'Cape Sounion ➜ Kythnos', distance: 44, distanceLabel: '44 NM', sailing_time: '6-7 h', description: 'Sail to Kythnos, first major Cycladic island. Known for thermal springs and peaceful bays away from crowds.', highlights: ['Kolona Beach', 'Thermal springs', 'Loutra village', 'Traditional Cycladic architecture'], expert_tips: 'Kythnos offers excellent shelter from Meltemi winds. Anchor at Ormos Kolona for unique double beach experience.' },
    { day: 4, location: 'Kythnos ➜ Serifos', distance: 31, distanceLabel: '31 NM', sailing_time: '5-6 h', description: 'Continue south to Serifos, a rugged island with dramatic landscapes and authentic Greek charm.', highlights: ['Livadi harbor', 'Serifos Chora hilltop village', 'Psili Ammos beach', 'Mining history'], expert_tips: 'Serifos is less touristy but offers spectacular hiking. The main harbor provides good protection from northerly winds.' },
    { day: 5, location: 'Serifos ➜ Sifnos', distance: 9, distanceLabel: '9 NM', sailing_time: '1.5-2 h', description: 'Short hop to Sifnos, renowned for exceptional cuisine and traditional Cycladic architecture.', highlights: ['Kamares port', 'Apollonia capital', 'Artemonas village', 'Culinary experiences'], expert_tips: 'Sifnos is famous for its food culture. Book dinner reservations early, especially at renowned tavernas.' },
    { day: 6, location: 'Sifnos ➜ Milos', distance: 24, distanceLabel: '24 NM', sailing_time: '4-5 h', description: 'Sail to Milos, known for dramatic volcanic landscapes and unique geological formations.', highlights: ['Sarakiniko Beach lunar landscape', 'Klima colorful harbor', 'Ancient catacombs', 'Volcanic beaches'], expert_tips: 'Milos offers numerous protected bays. Adamas harbor is the main port with good facilities and restaurants.' },
    { day: 7, location: 'Milos ➜ Folegandros', distance: 28, distanceLabel: '28 NM', sailing_time: '4-5 h', description: 'Continue to Folegandros, a dramatic cliff-top island with stunning sunset views and traditional charm.', highlights: ['Karavostasis port', 'Chora cliff-top village', 'Panagia Church', 'Sunset viewing'], expert_tips: 'Folegandros can be exposed to winds. The port is small – arrive early or have backup plan for Santorini.' },
    { day: 8, location: 'Folegandros ➜ Santorini', distance: 25, distanceLabel: '25 NM', sailing_time: '4-5 h', description: 'Arrive at iconic Santorini. Anchor in the caldera for spectacular views but be prepared for deep water mooring.', highlights: ['Caldera anchorage', 'Fira and Oia villages', 'Volcanic beaches', 'Wine tasting'], expert_tips: 'Santorini anchoring is challenging due to deep water and limited holding. Consider marina berth booking in advance.' },
    { day: 9, location: 'Santorini Exploration', distance: 0, distanceLabel: 'Local', sailing_time: '—', description: 'Full day to explore Santorini\'s famous attractions, beaches, and cultural sites.', highlights: ['Akrotiri archaeological site', 'Red Beach', 'Wine tours', 'Sunset in Oia'], expert_tips: 'Santorini is extremely busy in summer. Plan activities early morning or late afternoon to avoid crowds.' },
    { day: 10, location: 'Santorini ➜ Ios', distance: 30, distanceLabel: '30 NM', sailing_time: '5-6 h', description: 'Sail to Ios, famous for beautiful beaches and vibrant nightlife, offering good balance of relaxation and entertainment.', highlights: ['Mylopotas Beach', 'Ios Chora nightlife', "Homer's tomb", 'Golden beaches'], expert_tips: 'Ios port can be crowded in summer evenings. Anchor in Mylopotas Bay for better shelter and beach access.' },
    { day: 11, location: 'Ios ➜ Paros', distance: 35, distanceLabel: '35 NM', sailing_time: '5-6 h', description: 'Head to Paros, central Cycladic hub with excellent sailing conditions and charming fishing villages.', highlights: ['Naoussa fishing village', 'Parikia port', 'Antiparos nearby', 'Water sports'], expert_tips: 'Naoussa is a picture-perfect harbor but can be crowded. Parikia offers better marina facilities for larger yachts.' },
    { day: 12, location: 'Paros ➜ Kea', distance: 60, distanceLabel: '60 NM', sailing_time: '8-10 h', description: 'Long sailing day north to Kea, closest Cycladic island to Athens, preparing for Saronic Gulf transition.', highlights: ['Vourkari harbor', 'Kea Tzia capital', 'Ancient lion statue', 'Sheltered bays'], expert_tips: 'This is the longest sailing day. Start early and monitor weather conditions. Kea offers excellent shelter from Meltemi.' },
    { day: 13, location: 'Kea ➜ Poros', distance: 35, distanceLabel: '35 NM', sailing_time: '5-6 h', description: 'Enter the Saronic Gulf sailing to Poros, known for its clock tower and lush pine forests.', highlights: ['Poros clock tower', 'Russian Bay beach', 'Pine forest walks', 'Traditional tavernas'], expert_tips: 'Poros is more sheltered than Cyclades. The town harbor can be busy – anchor in Russian Bay for swimming.' },
    { day: 14, location: 'Poros ➜ Hydra', distance: 13, distanceLabel: '13 NM', sailing_time: '2-3 h', description: 'Final destination at Hydra, the car-free artistic island with magnificent stone mansions and crystal-clear waters.', highlights: ['Car-free island', 'Historic mansions', 'Art galleries', 'Swimming coves'], expert_tips: 'Hydra harbor is small and busy. Arrive early for best berthing spots. The island has no cars – perfect for walking exploration.' }
  ],
  tips: [
    { category: 'Weather & Timing', tip: 'Avoid peak Meltemi season (July-August) unless you\'re an experienced sailor. Best conditions are May-June and September.', priority: 'High' },
    { category: 'Route Planning', tip: 'This itinerary combines Cyclades and Saronic Gulf sailing. Be flexible with daily plans based on weather conditions.', priority: 'High' },
    { category: 'Anchoring', tip: 'Greek harbors often require stern-to mooring with your own anchor. Practice this technique before departure.', priority: 'Medium' },
    { category: 'Provisioning', tip: 'Stock up in Athens and major ports like Paros. Smaller islands have limited supplies and higher prices.', priority: 'Medium' }
  ],
  weather: {
    meltemi: {
      season: 'Jun-Sep',
      strength: 'F5-6 (20-25 kt) gusts F8 (35 kt)',
      direction: 'N-NW',
      strategy: 'Sail early morning, seek shelter in afternoon'
    },
    bestMonths: [
      { month: 'May', conditions: 'Mild winds, warm weather, fewer crowds' },
      { month: 'Jun', conditions: 'Good winds, perfect temperatures' },
      { month: 'Sep', conditions: 'Calming Meltemi, warm sea' },
      { month: 'Oct', conditions: 'Light winds, mild temps, quiet' }
    ]
  },
  marinas: [
    { location: 'Alimos Marina, Athens', facilities: '1235 berths, fuel, water, electricity, restaurants, provisioning', coordinates: "37°54'N, 23°42'E", notes: 'Main departure point, excellent facilities' },
    { location: 'Santorini (Caldera & Vlychada)', facilities: 'Limited marina space, mostly anchoring in caldera', coordinates: "36°25'N, 25°26'E", notes: 'Deep water anchoring, book marina berths in advance' },
    { location: 'Hydra Harbor', facilities: 'Small harbor, basic services, no cars on island', coordinates: "37°21'N, 23°28'E", notes: 'Historic harbor, arrive early for berths' }
  ]
};

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  
  // ---------- Utility functions ---------- //
  const qs = (sel, ctx = document) => ctx.querySelector(sel);
  const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  // ---------- Build Daily Cards ---------- //
  const itineraryContainer = qs('#itinerary-container');
  if (itineraryContainer) {
    itinerary.daily.forEach(day => {
      const card = document.createElement('div');
      card.className = 'card day-card fade-in';

      const header = document.createElement('div');
      header.className = 'card__header day-card__header flex justify-between items-center';
      header.innerHTML = `
        <div>
          <h4>Day ${day.day}: ${day.location}</h4>
          <p>${day.distanceLabel} • ${day.sailing_time}</p>
        </div>
        <div class="day-card__toggle">＋</div>
      `;

      const body = document.createElement('div');
      body.className = 'card__body day-card__body hidden';
      body.innerHTML = `
        <p>${day.description}</p>
        <ul class="highlight-list">${day.highlights.map(h => `<li>${h}</li>`).join('')}</ul>
        <div class="expert-callout"><strong>Expert Tip:</strong> ${day.expert_tips}</div>
      `;

      // Toggle interaction
      header.addEventListener('click', () => {
        const isHidden = body.classList.toggle('hidden');
        const toggle = header.querySelector('.day-card__toggle');
        toggle.textContent = isHidden ? '＋' : '－';
        toggle.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(180deg)';
      });

      card.appendChild(header);
      card.appendChild(body);
      itineraryContainer.appendChild(card);
    });
  }

  // ---------- Build Tips ---------- //
  const tipsContainer = qs('#tips-container');
  if (tipsContainer) {
    itinerary.tips.forEach(t => {
      const tip = document.createElement('div');
      tip.className = `card tip-card tip-priority-${t.priority} fade-in`;
      tip.innerHTML = `
        <div class="card__body">
          <h4>${t.category}</h4>
          <p>${t.tip}</p>
        </div>`;
      tipsContainer.appendChild(tip);
    });
  }

  // ---------- Weather Advisory ---------- //
  const weatherContainer = qs('#weather-container');
  if (weatherContainer) {
    const meltemiBox = document.createElement('div');
    meltemiBox.className = 'weather-box fade-in';
    meltemiBox.innerHTML = `
      <h4>Meltemi Winds</h4>
      <p><strong>Season:</strong> ${itinerary.weather.meltemi.season}</p>
      <p><strong>Strength:</strong> ${itinerary.weather.meltemi.strength}</p>
      <p><strong>Direction:</strong> ${itinerary.weather.meltemi.direction}</p>
      <p><strong>Strategy:</strong> ${itinerary.weather.meltemi.strategy}</p>
    `;
    weatherContainer.appendChild(meltemiBox);

    const monthBox = document.createElement('div');
    monthBox.className = 'weather-box fade-in';
    monthBox.innerHTML = '<h4>Best Sailing Months</h4>' +
      itinerary.weather.bestMonths.map(m => `<p><strong>${m.month}:</strong> ${m.conditions}</p>`).join('');
    weatherContainer.appendChild(monthBox);
  }

  // ---------- Marinas ---------- //
  const marinasContainer = qs('#marinas-container');
  if (marinasContainer) {
    itinerary.marinas.forEach(m => {
      const el = document.createElement('div');
      el.className = 'card marina-card fade-in';
      el.innerHTML = `
        <div class="card__body">
          <h4>${m.location}</h4>
          <p><strong>Facilities:</strong> ${m.facilities}</p>
          <p><strong>Coordinates:</strong> ${m.coordinates}</p>
          <p>${m.notes}</p>
        </div>`;
      marinasContainer.appendChild(el);
    });
  }

  // ---------- Distance Chart ---------- //
  const chartCanvas = qs('#distance-chart');
  if (chartCanvas) {
    const ctx = chartCanvas.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: itinerary.daily.map(d => `Day ${d.day}`),
        datasets: [{
          label: 'Distance (NM)',
          data: itinerary.daily.map(d => d.distance),
          backgroundColor: '#1FB8CD'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true, title: { display: true, text: 'Nautical Miles' } }
        }
      }
    });
  }

  // ---------- Build Inline SVG Map ---------- //
  const routeMapWrapper = qs('#route-map-wrapper');
  if (routeMapWrapper) {
    const stops = [
      { name: 'Athens', x: 50, y: 200 },
      { name: 'Cape Sounion', x: 140, y: 220 },
      { name: 'Kythnos', x: 210, y: 180 },
      { name: 'Serifos', x: 260, y: 240 },
      { name: 'Sifnos', x: 310, y: 210 },
      { name: 'Milos', x: 350, y: 260 },
      { name: 'Folegandros', x: 400, y: 240 },
      { name: 'Santorini', x: 470, y: 270 },
      { name: 'Ios', x: 430, y: 200 },
      { name: 'Paros', x: 370, y: 150 },
      { name: 'Kea', x: 250, y: 90 },
      { name: 'Poros', x: 170, y: 120 },
      { name: 'Hydra', x: 100, y: 70 }
    ];

    const width = 550;
    const height = 320;

    let svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`;

    // Build polyline points string
    const points = stops.map(s => `${s.x},${s.y}`).join(' ');
    svg += `<polyline class="route-line" points="${points}" />`;

    // Stops and labels
    stops.forEach(s => {
      svg += `<circle class="route-stop" cx="${s.x}" cy="${s.y}" r="6" />`;
      svg += `<text class="label" x="${s.x + 8}" y="${s.y - 8}">${s.name}</text>`;
    });

    svg += '</svg>';
    routeMapWrapper.innerHTML = svg;
  }

  // ---------- Scroll Progress ---------- //
  const progressBar = qs('#progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = progress + '%';

      // reveal fade-in elements
      qsa('.fade-in').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add('visible');
        }
      });
    });

    // trigger initial fade-in check
    window.dispatchEvent(new Event('scroll'));
  }

});
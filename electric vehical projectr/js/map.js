/**
 * Electric Vehicle Market Performance & Insights - Interactive Leaflet Map Module
 */

const EVMapManager = {
  map: null,
  markersLayer: null,
  activeLayerMode: "production", // 'production' | 'charging' | 'penetration'
  tileLayer: null,

  init(geoHubs) {
    if (this.map) return;

    const mapContainer = document.getElementById("ev-leaflet-map");
    if (!mapContainer) return;

    // Center on global equator/subtropics
    this.map = L.map("ev-leaflet-map", {
      center: [25, 15],
      zoom: 2,
      minZoom: 2,
      maxZoom: 7,
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: false
    });

    this.updateTiles();
    this.markersLayer = L.layerGroup().addTo(this.map);
    this.renderMarkers(geoHubs);
    this.renderCountryPills(geoHubs);
  },

  updateTiles() {
    if (!this.map) return;
    if (this.tileLayer) {
      this.map.removeLayer(this.tileLayer);
    }

    const isLight = document.body.classList.contains("light-theme");
    const tileUrl = isLight
      ? "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

    this.tileLayer = L.tileLayer(tileUrl, {
      subdomains: "abcd",
      maxZoom: 19
    }).addTo(this.map);
  },

  setLayerMode(mode, geoHubs) {
    this.activeLayerMode = mode;
    this.renderMarkers(geoHubs);

    // Update active button state
    document.querySelectorAll(".map-layer-btn").forEach(btn => {
      if (btn.dataset.mode === mode) {
        btn.classList.add("active", "bg-cyan-600", "text-white");
        btn.classList.remove("text-slate-400", "bg-slate-800");
      } else {
        btn.classList.remove("active", "bg-cyan-600", "text-white");
        btn.classList.add("text-slate-400", "bg-slate-800");
      }
    });
  },

  renderMarkers(geoHubs) {
    if (!this.markersLayer) return;
    this.markersLayer.clearLayers();

    geoHubs.forEach(hub => {
      let badgeLabel = "";
      let markerColor = "#00f0ff";

      if (this.activeLayerMode === "production") {
        badgeLabel = (hub.productionVolume2026 / 1000000).toFixed(1) + "M";
        markerColor = hub.productionVolume2026 > 2000000 ? "#00f0ff" : "#3b82f6";
      } else if (this.activeLayerMode === "charging") {
        badgeLabel = hub.publicFastChargers >= 1000000 
          ? (hub.publicFastChargers / 1000000).toFixed(1) + "M" 
          : (hub.publicFastChargers / 1000).toFixed(0) + "k";
        markerColor = "#10b981";
      } else if (this.activeLayerMode === "penetration") {
        badgeLabel = hub.domesticEVSharePct.toFixed(0) + "%";
        markerColor = hub.domesticEVSharePct > 40 ? "#ec4899" : "#f59e0b";
      }

      // Create Custom HTML Pin
      const customIcon = L.divIcon({
        className: "custom-map-pin",
        html: `
          <div class="pin-bubble" style="background: ${markerColor}; border-color: #ffffff;">
            <span>${badgeLabel}</span>
            <div class="pin-pulse" style="border-color: ${markerColor};"></div>
          </div>
        `,
        iconSize: [38, 38],
        iconAnchor: [19, 19],
        popupAnchor: [0, -20]
      });

      const marker = L.marker([hub.lat, hub.lng], { icon: customIcon });

      // Rich popup content
      const popupHtml = `
        <div class="p-4 w-72 text-slate-100 font-sans">
          <div class="flex items-center justify-between pb-2 mb-2 border-b border-slate-700">
            <div class="flex items-center space-x-2">
              <span class="px-2 py-0.5 text-xs font-bold bg-cyan-500/20 text-cyan-300 rounded border border-cyan-500/30">${hub.code}</span>
              <h4 class="font-bold text-base text-white">${hub.country}</h4>
            </div>
            <span class="text-xs text-slate-400 font-mono">${hub.globalProductionShare}% World EV</span>
          </div>

          <div class="grid grid-cols-2 gap-2 text-xs mb-3">
            <div class="bg-slate-800/80 p-2 rounded">
              <span class="text-slate-400 block text-[10px] uppercase tracking-wider">Annual Output</span>
              <span class="font-semibold text-cyan-400 text-sm">${(hub.productionVolume2026 / 1000000).toFixed(2)}M units</span>
            </div>
            <div class="bg-slate-800/80 p-2 rounded">
              <span class="text-slate-400 block text-[10px] uppercase tracking-wider">EV Adoption</span>
              <span class="font-semibold text-emerald-400 text-sm">${hub.domesticEVSharePct}% Share</span>
            </div>
            <div class="bg-slate-800/80 p-2 rounded">
              <span class="text-slate-400 block text-[10px] uppercase tracking-wider">Fast Chargers</span>
              <span class="font-semibold text-amber-400">${hub.publicFastChargers.toLocaleString()}</span>
            </div>
            <div class="bg-slate-800/80 p-2 rounded">
              <span class="text-slate-400 block text-[10px] uppercase tracking-wider">Car : Charger</span>
              <span class="font-semibold text-purple-400 font-mono">1 : ${(1 / hub.chargerToCarRatio).toFixed(1)}</span>
            </div>
          </div>

          <div class="text-xs mb-2">
            <span class="text-slate-400 block text-[10px] uppercase">Top Local Manufacturer</span>
            <span class="text-white font-medium">${hub.topOEM}</span>
          </div>

          <div class="text-xs mb-2">
            <span class="text-slate-400 block text-[10px] uppercase">Clusters</span>
            <span class="text-slate-300 text-[11px]">${hub.keyClusters.join(", ")}</span>
          </div>

          <div class="mt-2 pt-2 border-t border-slate-700/60 text-[11px] text-slate-300 italic">
            "${hub.policyHighlight}"
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);
      this.markersLayer.addLayer(marker);
    });
  },

  renderCountryPills(geoHubs) {
    const container = document.getElementById("mapCountryPills");
    if (!container) return;

    container.innerHTML = geoHubs.map(hub => `
      <button 
        onclick="EVMapManager.flyToCountry(${hub.lat}, ${hub.lng})" 
        class="px-2.5 py-1.5 rounded-lg text-xs font-medium border border-slate-700 bg-slate-800/60 hover:bg-slate-700 hover:border-cyan-500/50 text-slate-300 transition-all flex items-center space-x-1.5">
        <span class="w-2 h-2 rounded-full ${hub.productionVolume2026 > 1000000 ? 'bg-cyan-400' : 'bg-emerald-400'}"></span>
        <span>${hub.country}</span>
        <span class="text-slate-400 font-mono text-[10px]">${(hub.productionVolume2026 / 1000000).toFixed(1)}M</span>
      </button>
    `).join("");
  },

  flyToCountry(lat, lng) {
    if (!this.map) return;
    this.map.flyTo([lat, lng], 4, {
      duration: 1.2
    });
  }
};

if (typeof window !== "undefined") {
  window.EVMapManager = EVMapManager;
}

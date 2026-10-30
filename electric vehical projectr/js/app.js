/**
 * Electric Vehicle Market Performance & Insights - Main Application Controller
 */

const App = {
  // Global Filter State
  filters: {
    region: "all",
    category: "all",
    chemistry: "all",
    priceRange: "all",
    year: "2026"
  },

  init() {
    this.initTheme();
    this.bindGlobalFilterEvents();
    this.bindExportEvents();
    this.bindCalculatorEvents();
    this.bindModalEvents();

    // Initialize sub-modules
    if (window.EV_DATA) {
      window.PersonaManager?.init();
      window.ChartsManager?.initAllCharts(window.EV_DATA);
      window.EVMapManager?.init(window.EV_DATA.geoHubs);
      window.LeaderboardManager?.init(window.EV_DATA.manufacturers);
      this.updateKPIs(window.EV_DATA);
      this.renderCategoryCards(window.EV_DATA.categories);
      this.renderBatterySpecCards(window.EV_DATA.batteryTechnologies);
      this.renderPolicyCards(window.EV_DATA.sustainability.policyPillars);
    }
  },

  /* ----------------------------------------------------
     THEME MANAGEMENT (Dark / Light)
  ---------------------------------------------------- */
  initTheme() {
    const savedTheme = localStorage.getItem("ev_dashboard_theme") || "dark";
    if (savedTheme === "light") {
      document.body.classList.add("light-theme");
    }

    const themeToggleBtn = document.getElementById("themeToggleBtn");
    if (themeToggleBtn) {
      this.updateThemeButtonLabel();
      themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
        const currentTheme = document.body.classList.contains("light-theme") ? "light" : "dark";
        localStorage.setItem("ev_dashboard_theme", currentTheme);
        this.updateThemeButtonLabel();

        // Refresh charts & map tiles
        window.ChartsManager?.updateTheme();
        window.EVMapManager?.updateTiles();
      });
    }
  },

  updateThemeButtonLabel() {
    const btn = document.getElementById("themeToggleBtn");
    if (!btn) return;
    const isLight = document.body.classList.contains("light-theme");
    btn.innerHTML = isLight
      ? `<svg class="w-4 h-4 text-amber-500 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg> <span>Light Theme</span>`
      : `<svg class="w-4 h-4 text-cyan-400 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg> <span>Dark Theme</span>`;
  },

  /* ----------------------------------------------------
     GLOBAL FILTER CONTROLS
  ---------------------------------------------------- */
  bindGlobalFilterEvents() {
    // Filter selectors
    const regionSelect = document.getElementById("filterRegion");
    const categorySelect = document.getElementById("filterCategory");
    const chemSelect = document.getElementById("filterChemistry");
    const priceSelect = document.getElementById("filterPrice");
    const yearSelect = document.getElementById("filterYear");
    const resetBtn = document.getElementById("resetFiltersBtn");

    const updateFilters = () => {
      if (regionSelect) this.filters.region = regionSelect.value;
      if (categorySelect) this.filters.category = categorySelect.value;
      if (chemSelect) this.filters.chemistry = chemSelect.value;
      if (priceSelect) this.filters.priceRange = priceSelect.value;
      if (yearSelect) this.filters.year = yearSelect.value;

      this.applyFilters();
      this.renderActiveFilterPills();
    };

    [regionSelect, categorySelect, chemSelect, priceSelect, yearSelect].forEach(select => {
      if (select) select.addEventListener("change", updateFilters);
    });

    if (resetBtn) {
      resetBtn.addEventListener("click", () => this.resetFilters());
    }

    // Category chart mode toggles (Sales / Share / Satisfaction)
    document.querySelectorAll(".cat-chart-toggle").forEach(btn => {
      btn.addEventListener("click", e => {
        const mode = btn.dataset.mode;
        window.ChartsManager.categoryViewMode = mode;
        document.querySelectorAll(".cat-chart-toggle").forEach(b => {
          b.classList.remove("bg-cyan-600", "text-white");
          b.classList.add("text-slate-400", "bg-slate-800");
        });
        btn.classList.add("bg-cyan-600", "text-white");
        btn.classList.remove("text-slate-400", "bg-slate-800");

        window.ChartsManager.renderCategoryChart(this.getFilteredCategories());
      });
    });

    // Battery chart mode toggles (Scatter / Radar)
    document.querySelectorAll(".battery-chart-toggle").forEach(btn => {
      btn.addEventListener("click", e => {
        const mode = btn.dataset.mode;
        window.ChartsManager.batteryViewMode = mode;
        document.querySelectorAll(".battery-chart-toggle").forEach(b => {
          b.classList.remove("bg-cyan-600", "text-white");
          b.classList.add("text-slate-400", "bg-slate-800");
        });
        btn.classList.add("bg-cyan-600", "text-white");
        btn.classList.remove("text-slate-400", "bg-slate-800");

        window.ChartsManager.renderBatteryChart(this.getFilteredBatteries());
      });
    });

    // Map layer toggles
    document.querySelectorAll(".map-layer-btn").forEach(btn => {
      btn.addEventListener("click", e => {
        const mode = btn.dataset.mode;
        window.EVMapManager.setLayerMode(mode, window.EV_DATA.geoHubs);
      });
    });
  },

  resetFilters() {
    this.filters = {
      region: "all",
      category: "all",
      chemistry: "all",
      priceRange: "all",
      year: "2026"
    };

    const regionSelect = document.getElementById("filterRegion");
    const categorySelect = document.getElementById("filterCategory");
    const chemSelect = document.getElementById("filterChemistry");
    const priceSelect = document.getElementById("filterPrice");
    const yearSelect = document.getElementById("filterYear");

    if (regionSelect) regionSelect.value = "all";
    if (categorySelect) categorySelect.value = "all";
    if (chemSelect) chemSelect.value = "all";
    if (priceSelect) priceSelect.value = "all";
    if (yearSelect) yearSelect.value = "2026";

    this.applyFilters();
    this.renderActiveFilterPills();
  },

  renderActiveFilterPills() {
    const container = document.getElementById("activeFilterPills");
    if (!container) return;

    const pills = [];
    if (this.filters.region !== "all") pills.push({ key: "region", label: `Region: ${this.filters.region}` });
    if (this.filters.category !== "all") pills.push({ key: "category", label: `Type: ${this.filters.category}` });
    if (this.filters.chemistry !== "all") pills.push({ key: "chemistry", label: `Tech: ${this.filters.chemistry}` });
    if (this.filters.priceRange !== "all") pills.push({ key: "priceRange", label: `Price: ${this.filters.priceRange}` });
    if (this.filters.year !== "2026") pills.push({ key: "year", label: `Year: ${this.filters.year}` });

    if (pills.length === 0) {
      container.innerHTML = `<span class="text-xs text-slate-500 italic">No custom filters active (showing global baseline)</span>`;
      return;
    }

    container.innerHTML = pills.map(p => `
      <span class="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs bg-cyan-950/80 border border-cyan-700/80 text-cyan-300">
        <span>${p.label}</span>
        <button onclick="App.removeFilter('${p.key}')" class="text-cyan-400 hover:text-white font-bold ml-1">✕</button>
      </span>
    `).join("");
  },

  removeFilter(key) {
    this.filters[key] = key === "year" ? "2026" : "all";
    const el = document.getElementById(`filter${key.charAt(0).toUpperCase() + key.slice(1)}`);
    if (el) el.value = this.filters[key];
    this.applyFilters();
    this.renderActiveFilterPills();
  },

  applyFilters() {
    const filteredCategories = this.getFilteredCategories();
    const filteredBatteries = this.getFilteredBatteries();
    const filteredManufacturers = this.getFilteredManufacturers();

    // Re-render UI components
    window.ChartsManager?.renderCategoryChart(filteredCategories);
    window.ChartsManager?.renderBatteryChart(filteredBatteries);
    window.LeaderboardManager?.init(filteredManufacturers);
    this.updateKPIs(window.EV_DATA, filteredCategories, filteredBatteries);
    this.renderCategoryCards(filteredCategories);
  },

  getFilteredCategories() {
    let cats = [...window.EV_DATA.categories];
    if (this.filters.category !== "all") {
      cats = cats.filter(c => c.id === this.filters.category);
    }
    if (this.filters.chemistry !== "all") {
      cats = cats.filter(c => c.primaryChemistries.includes(this.filters.chemistry));
    }
    return cats;
  },

  getFilteredBatteries() {
    let bats = [...window.EV_DATA.batteryTechnologies];
    if (this.filters.chemistry !== "all") {
      bats = bats.filter(b => b.id.toLowerCase() === this.filters.chemistry.toLowerCase());
    }
    return bats;
  },

  getFilteredManufacturers() {
    let mfrs = [...window.EV_DATA.manufacturers];
    if (this.filters.chemistry !== "all") {
      mfrs = mfrs.filter(m => m.primaryChemistries.some(c => c.toLowerCase().includes(this.filters.chemistry.toLowerCase())));
    }
    if (this.filters.region !== "all") {
      const regionMap = {
        us: "United States",
        china: "China",
        germany: "Germany",
        korea: "South Korea"
      };
      if (regionMap[this.filters.region]) {
        mfrs = mfrs.filter(m => m.country === regionMap[this.filters.region]);
      }
    }
    return mfrs;
  },

  /* ----------------------------------------------------
     EXECUTIVE KPI HEADER METRICS
  ---------------------------------------------------- */
  updateKPIs(data, categories = data.categories, batteries = data.batteryTechnologies) {
    const totalSalesEl = document.getElementById("kpiTotalSales");
    const topCategoryEl = document.getElementById("kpiTopCategory");
    const avgRangeEl = document.getElementById("kpiAvgRange");
    const topBatteryEl = document.getElementById("kpiTopBattery");
    const satisfactionEl = document.getElementById("kpiSatisfaction");

    // Dynamic calculations
    const totalSalesUnits = categories.reduce((sum, c) => sum + c.sales2026, 0);
    const topCat = [...categories].sort((a, b) => b.sales2026 - a.sales2026)[0] || categories[0];
    const avgRange = Math.round(categories.reduce((sum, c) => sum + (c.avgRangeKm * c.sales2026), 0) / (totalSalesUnits || 1));
    const topBat = [...batteries].sort((a, b) => b.marketSharePct - a.marketSharePct)[0] || batteries[0];
    const avgSatisfaction = (categories.reduce((sum, c) => sum + (c.satisfactionScore * c.sales2026), 0) / (totalSalesUnits || 1)).toFixed(1);

    if (totalSalesEl) totalSalesEl.textContent = `${(totalSalesUnits / 1000000).toFixed(1)}M`;
    if (topCategoryEl) topCategoryEl.textContent = topCat ? topCat.name.replace("Electric ", "") : "SUVs";
    if (avgRangeEl) avgRangeEl.textContent = `${avgRange} km`;
    if (topBatteryEl) topBatteryEl.textContent = `${topBat.id} (${topBat.marketSharePct}%)`;
    if (satisfactionEl) satisfactionEl.textContent = `${avgSatisfaction} / 100`;
  },

  /* ----------------------------------------------------
     CARD RENDERERS
  ---------------------------------------------------- */
  renderCategoryCards(categories) {
    const container = document.getElementById("categoryDetailCards");
    if (!container) return;

    container.innerHTML = categories.map(c => `
      <div class="glass-panel rounded-xl p-4 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <h4 class="font-bold text-white text-sm">${c.name}</h4>
            <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">${c.sharePct}% Share</span>
          </div>
          <p class="text-[11px] text-slate-400 leading-relaxed mb-3">${c.description}</p>
        </div>

        <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-[11px]">
          <div>
            <span class="text-slate-500 block text-[9px] uppercase">Top Seller</span>
            <span class="text-slate-200 font-medium truncate block">${c.topSellingModel}</span>
          </div>
          <div>
            <span class="text-slate-500 block text-[9px] uppercase">Avg Range</span>
            <span class="text-cyan-400 font-mono font-semibold">${c.avgRangeKm} km</span>
          </div>
          <div>
            <span class="text-slate-500 block text-[9px] uppercase">Growth YoY</span>
            <span class="text-emerald-400 font-mono font-bold">+${c.growthYoY}%</span>
          </div>
          <div>
            <span class="text-slate-500 block text-[9px] uppercase">Satisfaction</span>
            <span class="text-amber-400 font-mono font-bold">★ ${c.satisfactionScore}</span>
          </div>
        </div>
      </div>
    `).join("");
  },

  renderBatterySpecCards(batteries) {
    const container = document.getElementById("batterySpecCards");
    if (!container) return;

    container.innerHTML = batteries.map(b => `
      <div class="glass-panel rounded-xl p-4 border border-slate-800 hover:border-cyan-500/40 transition-all">
        <div class="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
          <div>
            <h4 class="font-bold text-white text-sm">${b.name}</h4>
            <span class="text-[10px] text-slate-400 font-mono">${b.formula}</span>
          </div>
          <span class="px-2 py-0.5 rounded text-xs font-mono font-bold ${b.cobaltFree ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-300'}">
            ${b.cobaltFree ? "Cobalt-Free" : "Contains Co/Ni"}
          </span>
        </div>

        <div class="grid grid-cols-3 gap-2 text-[11px] mb-3">
          <div class="bg-slate-800/60 p-2 rounded">
            <span class="text-slate-500 block text-[9px] uppercase">Density</span>
            <span class="text-cyan-400 font-mono font-bold">${b.energyDensityWhKg} Wh/kg</span>
          </div>
          <div class="bg-slate-800/60 p-2 rounded">
            <span class="text-slate-500 block text-[9px] uppercase">10-80% Charge</span>
            <span class="text-emerald-400 font-mono font-bold">${b.fastChargeMin10to80} min</span>
          </div>
          <div class="bg-slate-800/60 p-2 rounded">
            <span class="text-slate-500 block text-[9px] uppercase">Pack Cost</span>
            <span class="text-amber-400 font-mono font-bold">$${b.costPerKWhUSD}/kWh</span>
          </div>
        </div>

        <p class="text-[11px] text-slate-300 leading-relaxed mb-2"><strong class="text-emerald-400">Pros:</strong> ${b.strengths}</p>
        <p class="text-[11px] text-slate-400 leading-relaxed"><strong class="text-amber-400">Cons:</strong> ${b.weaknesses}</p>
      </div>
    `).join("");
  },

  renderPolicyCards(policies) {
    const container = document.getElementById("policyCardsContainer");
    if (!container) return;

    container.innerHTML = policies.map(p => `
      <div class="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 hover:border-cyan-500/30 transition-all">
        <div class="flex items-center justify-between mb-1.5">
          <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">${p.jurisdiction}</span>
          <span class="text-[10px] text-emerald-400 font-semibold">${p.status}</span>
        </div>
        <h5 class="text-xs font-bold text-white mb-1">${p.policy}</h5>
        <p class="text-[11px] text-slate-300 leading-relaxed">${p.impact}</p>
      </div>
    `).join("");
  },

  /* ----------------------------------------------------
     INTERACTIVE TCO & CO2 SAVINGS CALCULATOR
  ---------------------------------------------------- */
  bindCalculatorEvents() {
    const annualKmSlider = document.getElementById("calcAnnualKm");
    const fuelPriceSlider = document.getElementById("calcFuelPrice");
    const elecPriceSlider = document.getElementById("calcElecPrice");

    const updateCalc = () => {
      const km = parseFloat(annualKmSlider?.value || 18000);
      const fuelPrice = parseFloat(fuelPriceSlider?.value || 1.65); // $ / liter
      const elecPrice = parseFloat(elecPriceSlider?.value || 0.16); // $ / kWh

      // Display inputs
      document.getElementById("calcAnnualKmVal").textContent = km.toLocaleString() + " km";
      document.getElementById("calcFuelPriceVal").textContent = "$" + fuelPrice.toFixed(2) + " / L";
      document.getElementById("calcElecPriceVal").textContent = "$" + elecPrice.toFixed(2) + " / kWh";

      // Physics / Consumption baseline
      // Typical ICE car: 7.8 L / 100km
      const annualIceFuelCost = (km / 100) * 7.8 * fuelPrice;
      // Typical EV: 16.5 kWh / 100km
      const annualEvElecCost = (km / 100) * 16.5 * elecPrice;
      const annualSavings = Math.max(0, annualIceFuelCost - annualEvElecCost);

      // CO2 calculations (ICE: 185g CO2/km; EV grid mix: 52g CO2/km)
      const co2IceTons = (km * 0.185) / 1000;
      const co2EvTons = (km * 0.052) / 1000;
      const co2Avoided = co2IceTons - co2EvTons;

      // Update outputs
      const savingsEl = document.getElementById("calcSavingsOutput");
      const co2El = document.getElementById("calcCo2Output");
      const fiveYearEl = document.getElementById("calcFiveYearOutput");

      if (savingsEl) savingsEl.textContent = "$" + Math.round(annualSavings).toLocaleString();
      if (co2El) co2El.textContent = co2Avoided.toFixed(2) + " Tons";
      if (fiveYearEl) fiveYearEl.textContent = "$" + Math.round(annualSavings * 5 + 1800).toLocaleString(); // + maintenance diff
    };

    [annualKmSlider, fuelPriceSlider, elecPriceSlider].forEach(slider => {
      if (slider) slider.addEventListener("input", updateCalc);
    });

    updateCalc();
  },

  /* ----------------------------------------------------
     EXPORTS & MODALS
  ---------------------------------------------------- */
  bindExportEvents() {
    const printPdfBtn = document.getElementById("printPdfBtn");
    if (printPdfBtn) {
      printPdfBtn.addEventListener("click", () => {
        window.print();
      });
    }
  },

  bindModalEvents() {
    window.addEventListener("click", e => {
      const modal = document.getElementById("oemModal");
      if (e.target === modal) {
        modal.classList.add("hidden");
      }
    });

    window.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        const modal = document.getElementById("oemModal");
        if (modal) modal.classList.add("hidden");
      }
    });
  }
};

// Initialize when DOM ready
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

if (typeof window !== "undefined") {
  window.App = App;
}

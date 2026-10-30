/**
 * Electric Vehicle Market Performance & Insights - Leaderboard & Table Module
 */

const LeaderboardManager = {
  sortColumn: "marketSharePct",
  sortAscending: false,
  searchTerm: "",
  selectedChemistry: "all",
  selectedPriceTier: "all",
  data: [],

  init(manufacturers) {
    this.data = [...manufacturers];
    this.bindControls();
    this.render();
  },

  bindControls() {
    // Search input
    const searchInput = document.getElementById("oemSearchInput");
    if (searchInput) {
      searchInput.addEventListener("input", e => {
        this.searchTerm = e.target.value.toLowerCase().trim();
        this.render();
      });
    }

    // Chemistry filter
    const chemSelect = document.getElementById("oemChemistryFilter");
    if (chemSelect) {
      chemSelect.addEventListener("change", e => {
        this.selectedChemistry = e.target.value;
        this.render();
      });
    }

    // Export CSV
    const exportBtn = document.getElementById("exportCsvBtn");
    if (exportBtn) {
      exportBtn.addEventListener("click", () => this.exportToCSV());
    }
  },

  sort(column) {
    if (this.sortColumn === column) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortColumn = column;
      this.sortAscending = false; // default descending for numbers
    }
    this.render();
  },

  getFilteredData() {
    return this.data.filter(m => {
      // Search
      const matchesSearch = !this.searchTerm || 
        m.name.toLowerCase().includes(this.searchTerm) || 
        m.country.toLowerCase().includes(this.searchTerm) ||
        m.ticker.toLowerCase().includes(this.searchTerm);

      // Chemistry
      const matchesChem = this.selectedChemistry === "all" || 
        m.primaryChemistries.some(c => c.toLowerCase().includes(this.selectedChemistry.toLowerCase()));

      return matchesSearch && matchesChem;
    }).sort((a, b) => {
      let valA = a[this.sortColumn];
      let valB = b[this.sortColumn];

      if (typeof valA === "string") {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
        return this.sortAscending ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }

      return this.sortAscending ? valA - valB : valB - valA;
    });
  },

  render() {
    const tbody = document.getElementById("leaderboardTableBody");
    const countBadge = document.getElementById("leaderboardCountBadge");
    if (!tbody) return;

    const filtered = this.getFilteredData();
    if (countBadge) {
      countBadge.textContent = `${filtered.length} Automakers`;
    }

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="text-center py-10 text-slate-400">
            No automakers matching current filters.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map((m, index) => {
      const rank = index + 1;
      const rankBadge = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`;
      
      const shareBarWidth = Math.min(100, Math.round(m.marketSharePct * 3.8));

      return `
        <tr class="table-row-hover border-b border-slate-800/80 text-xs text-slate-300 cursor-pointer" onclick="LeaderboardManager.showOEMModal('${m.id}')">
          <td class="py-3 px-4 font-mono font-bold text-slate-400">
            ${rankBadge}
          </td>
          <td class="py-3 px-4 font-semibold text-white">
            <div class="flex items-center space-x-2">
              <span class="text-sm font-bold text-white hover:text-cyan-400 transition-colors">${m.name}</span>
              <span class="text-[10px] text-slate-500 font-mono">${m.ticker}</span>
            </div>
            <span class="text-[11px] text-slate-400 block">${m.country}</span>
          </td>
          <td class="py-3 px-4">
            <div class="flex items-center space-x-2">
              <span class="font-bold text-cyan-400 font-mono">${m.marketSharePct.toFixed(1)}%</span>
            </div>
            <div class="w-24 bg-slate-800 rounded-full h-1.5 mt-1 overflow-hidden">
              <div class="bg-gradient-to-r from-cyan-500 to-blue-500 h-1.5 rounded-full" style="width: ${shareBarWidth}%"></div>
            </div>
          </td>
          <td class="py-3 px-4 font-mono">
            <span class="text-white font-semibold">${(m.volume2026 / 1000000).toFixed(2)}M</span>
            <span class="text-[11px] ml-1 ${m.volumeYoY >= 15 ? 'text-emerald-400 font-bold' : 'text-slate-400'}">+${m.volumeYoY}%</span>
          </td>
          <td class="py-3 px-4">
            <div class="flex flex-wrap gap-1">
              ${m.primaryChemistries.map(c => `
                <span class="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 border border-slate-700 text-cyan-300 font-mono">${c.split(" ")[0]}</span>
              `).join("")}
            </div>
          </td>
          <td class="py-3 px-4 font-mono font-medium text-slate-200">
            ${m.avgRangeKm} km
          </td>
          <td class="py-3 px-4">
            <span class="px-2 py-0.5 rounded-full text-[11px] font-bold ${m.customerSatisfaction >= 90 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-300 border border-slate-700'}">
              ★ ${m.customerSatisfaction}
            </span>
          </td>
          <td class="py-3 px-4 text-right">
            <button class="px-2.5 py-1 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-[11px] font-medium transition-all">
              Inspect
            </button>
          </td>
        </tr>
      `;
    }).join("");
  },

  showOEMModal(oemId) {
    const oem = this.data.find(m => m.id === oemId);
    if (!oem) return;

    const modal = document.getElementById("oemModal");
    const modalContent = document.getElementById("oemModalContent");
    if (!modal || !modalContent) return;

    modalContent.innerHTML = `
      <div class="flex items-start justify-between pb-4 border-b border-slate-800">
        <div>
          <div class="flex items-center space-x-3">
            <h3 class="text-2xl font-bold text-white">${oem.name}</h3>
            <span class="px-2.5 py-0.5 text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-full">${oem.ticker}</span>
            <span class="px-2 py-0.5 text-xs bg-slate-800 text-slate-300 rounded border border-slate-700">${oem.country}</span>
          </div>
          <p class="text-xs text-slate-400 mt-1">${oem.priceTier} Segment | Pricing: <strong class="text-slate-200">${oem.priceRange}</strong></p>
        </div>
        <button onclick="LeaderboardManager.closeOEMModal()" class="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors">
          ✕
        </button>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 my-4">
        <div class="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
          <span class="text-slate-400 text-[11px] uppercase block">Global Market Share</span>
          <span class="text-xl font-bold text-cyan-400 font-mono">${oem.marketSharePct}%</span>
          <span class="text-[10px] text-slate-500 block mt-0.5">Top 12 Ranking</span>
        </div>
        <div class="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
          <span class="text-slate-400 text-[11px] uppercase block">2026 Deliveries</span>
          <span class="text-xl font-bold text-emerald-400 font-mono">${(oem.volume2026 / 1000000).toFixed(2)}M</span>
          <span class="text-[10px] text-emerald-400 block mt-0.5">+${oem.volumeYoY}% YoY Growth</span>
        </div>
        <div class="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
          <span class="text-slate-400 text-[11px] uppercase block">Avg WLTP Range</span>
          <span class="text-xl font-bold text-purple-400 font-mono">${oem.avgRangeKm} km</span>
          <span class="text-[10px] text-slate-500 block mt-0.5">Fleet Weighted</span>
        </div>
        <div class="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
          <span class="text-slate-400 text-[11px] uppercase block">Customer Rating</span>
          <span class="text-xl font-bold text-amber-400 font-mono">★ ${oem.customerSatisfaction}</span>
          <span class="text-[10px] text-slate-500 block mt-0.5">ESG Rating: ${oem.esgRating}</span>
        </div>
      </div>

      <div class="space-y-3 text-xs">
        <div class="p-3 bg-slate-800/50 rounded-xl border border-slate-800">
          <span class="text-slate-400 font-bold uppercase tracking-wider block mb-1">Flagship Vehicle Portfolio</span>
          <div class="flex flex-wrap gap-1.5">
            ${oem.flagshipModels.map(m => `
              <span class="px-2.5 py-1 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800 font-medium">${m}</span>
            `).join("")}
          </div>
        </div>

        <div class="p-3 bg-slate-800/50 rounded-xl border border-slate-800">
          <span class="text-slate-400 font-bold uppercase tracking-wider block mb-1">Battery Chemistry & Sourcing Strategy</span>
          <p class="text-slate-300 leading-relaxed">${oem.batteryStrategy}</p>
          <div class="mt-2 flex gap-1.5">
            ${oem.primaryChemistries.map(c => `
              <span class="px-2 py-0.5 bg-slate-900 border border-slate-700 rounded text-slate-300 font-mono text-[11px]">${c}</span>
            `).join("")}
          </div>
        </div>

        <div class="p-3 bg-slate-800/50 rounded-xl border border-slate-800">
          <span class="text-slate-400 font-bold uppercase tracking-wider block mb-1">Charging Architecture</span>
          <p class="text-slate-300 leading-relaxed">${oem.chargingTech}</p>
        </div>
      </div>
    `;

    modal.classList.remove("hidden");
  },

  closeOEMModal() {
    const modal = document.getElementById("oemModal");
    if (modal) modal.classList.add("hidden");
  },

  exportToCSV() {
    const filtered = this.getFilteredData();
    const headers = [
      "OEM Name",
      "Ticker",
      "Country",
      "Market Share (%)",
      "2026 Volume (Units)",
      "YoY Growth (%)",
      "Avg Range (km)",
      "Customer Rating (/100)",
      "ESG Rating",
      "Chemistries"
    ];

    const rows = filtered.map(m => [
      `"${m.name}"`,
      `"${m.ticker}"`,
      `"${m.country}"`,
      m.marketSharePct,
      m.volume2026,
      m.volumeYoY,
      m.avgRangeKm,
      m.customerSatisfaction,
      `"${m.esgRating}"`,
      `"${m.primaryChemistries.join("; ")}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `EV_Global_Leaderboard_2026_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

if (typeof window !== "undefined") {
  window.LeaderboardManager = LeaderboardManager;
}

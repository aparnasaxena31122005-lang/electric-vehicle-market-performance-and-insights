/**
 * Electric Vehicle Market Performance & Insights - Persona Management Module
 */

const PersonaManager = {
  currentPersona: "all",

  init() {
    this.bindEvents();
    this.renderPersonaBriefing("all");
  },

  bindEvents() {
    const buttons = document.querySelectorAll(".persona-btn");
    buttons.forEach(btn => {
      btn.addEventListener("click", e => {
        const personaId = btn.dataset.persona;
        this.switchPersona(personaId);
      });
    });
  },

  switchPersona(personaId) {
    this.currentPersona = personaId;

    // Update active button state
    document.querySelectorAll(".persona-btn").forEach(btn => {
      if (btn.dataset.persona === personaId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    this.renderPersonaBriefing(personaId);
    this.highlightSectionsForPersona(personaId);
  },

  renderPersonaBriefing(personaId) {
    const container = document.getElementById("personaBriefingContainer");
    if (!container) return;

    if (personaId === "all") {
      container.innerHTML = `
        <div class="glass-panel rounded-2xl p-5 border border-cyan-500/20 bg-slate-900/60 transition-all">
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-cyan-500/20">
                EV
              </div>
              <div>
                <div class="flex items-center space-x-2">
                  <h3 class="text-lg font-bold text-white">Executive Global EV Intelligence Briefing</h3>
                  <span class="px-2 py-0.5 text-[11px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full">FY 2026 Forecast</span>
                </div>
                <p class="text-xs text-slate-400 mt-0.5">Synthesizing commercial market expansion, OEM competitive landscape, and battery technology transition.</p>
              </div>
            </div>

            <div class="flex flex-wrap gap-2 text-xs">
              <span class="px-3 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/80 flex items-center space-x-1.5">
                <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>Global Fleet: <strong class="text-white">62.8M</strong></span>
              </span>
              <span class="px-3 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/80 flex items-center space-x-1.5">
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Annual Output: <strong class="text-white">17.4M</strong></span>
              </span>
              <span class="px-3 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/80 flex items-center space-x-1.5">
                <span class="w-2 h-2 rounded-full bg-purple-400"></span>
                <span>Battery Index: <strong class="text-white">$84/kWh</strong></span>
              </span>
            </div>
          </div>
        </div>
      `;
      return;
    }

    const persona = window.EV_DATA?.personas[personaId];
    if (!persona) return;

    container.innerHTML = `
      <div class="glass-panel rounded-2xl p-6 border-l-4 border-l-cyan-400 border-cyan-500/30 bg-slate-900/80 shadow-2xl transition-all">
        <div class="flex flex-col lg:flex-row items-start justify-between gap-6">
          <div class="flex items-start space-x-4">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr ${persona.avatarBg} flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-cyan-500/20 flex-shrink-0">
              ${persona.avatar}
            </div>
            <div>
              <div class="flex flex-wrap items-center gap-2">
                <h3 class="text-lg font-bold text-white">${persona.name}</h3>
                <span class="px-2.5 py-0.5 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">${persona.title}</span>
                <span class="text-xs text-slate-400">Target Persona View Active</span>
              </div>
              <p class="text-xs text-slate-300 mt-1">${persona.roleSummary}</p>

              <div class="mt-3 text-sm font-semibold text-cyan-200">
                ${persona.briefing.headline}
              </div>

              <ul class="mt-2 space-y-1.5">
                ${persona.briefing.bullets.map(b => `
                  <li class="flex items-start space-x-2 text-xs text-slate-300">
                    <span class="text-cyan-400 mt-0.5">▸</span>
                    <span>${b}</span>
                  </li>
                `).join("")}
              </ul>
            </div>
          </div>

          <div class="w-full lg:w-80 flex-shrink-0 bg-slate-800/90 border border-cyan-500/30 p-4 rounded-xl">
            <div class="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              <span>Recommended Strategic Action</span>
            </div>
            <p class="text-xs text-slate-200 leading-relaxed">
              ${persona.briefing.actionItem}
            </p>
            <div class="mt-3 pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
              <span>Focus KPIs:</span>
              <span class="text-cyan-300 font-medium">${persona.primaryMetrics.slice(0, 2).join(", ")}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  highlightSectionsForPersona(personaId) {
    // Reset all highlight glows
    document.querySelectorAll(".module-section").forEach(sec => {
      sec.classList.remove("ring-2", "ring-cyan-400/50", "ring-offset-2", "ring-offset-slate-900");
    });

    if (personaId === "strategy") {
      const target = document.getElementById("section-category-sales");
      if (target) {
        target.classList.add("ring-2", "ring-cyan-400/50", "ring-offset-2", "ring-offset-slate-900");
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (personaId === "bi") {
      const target = document.getElementById("section-leaderboard");
      if (target) {
        target.classList.add("ring-2", "ring-cyan-400/50", "ring-offset-2", "ring-offset-slate-900");
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (personaId === "research") {
      const target = document.getElementById("section-battery-tech");
      if (target) {
        target.classList.add("ring-2", "ring-cyan-400/50", "ring-offset-2", "ring-offset-slate-900");
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }
};

if (typeof window !== "undefined") {
  window.PersonaManager = PersonaManager;
}

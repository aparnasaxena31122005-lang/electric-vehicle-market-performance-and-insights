/**
 * Electric Vehicle Market Performance & Insights - Charts Module
 * Built with Chart.js 4.4+
 */

const ChartsManager = {
  instances: {},
  categoryViewMode: "sales", // 'sales' | 'share' | 'satisfaction'
  batteryViewMode: "scatter", // 'scatter' | 'radar'

  // Color Palette Constants
  colors: {
    cyan: "#00f0ff",
    cyanAlpha: "rgba(0, 240, 255, 0.4)",
    blue: "#3b82f6",
    blueAlpha: "rgba(59, 130, 246, 0.4)",
    emerald: "#10b981",
    emeraldAlpha: "rgba(16, 185, 129, 0.4)",
    amber: "#f59e0b",
    amberAlpha: "rgba(245, 158, 11, 0.4)",
    purple: "#8b5cf6",
    purpleAlpha: "rgba(139, 92, 246, 0.4)",
    pink: "#ec4899",
    pinkAlpha: "rgba(236, 72, 153, 0.4)",
    slateGrid: "rgba(255, 255, 255, 0.08)",
    slateText: "#94a3b8"
  },

  getThemeColors() {
    const isLight = document.body.classList.contains("light-theme");
    return {
      textColor: isLight ? "#334155" : "#94a3b8",
      gridColor: isLight ? "rgba(0, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.08)",
      tooltipBg: isLight ? "#ffffff" : "#111827",
      tooltipText: isLight ? "#0f172a" : "#f8fafc",
      tooltipBorder: isLight ? "#cbd5e1" : "rgba(56, 189, 248, 0.3)"
    };
  },

  initAllCharts(data) {
    this.renderCategoryChart(data.categories);
    this.renderBatteryChart(data.batteryTechnologies);
    this.renderTrajectoryChart(data.yearlyTrends);
    this.renderSustainabilityChart(data.sustainability.lifetimeEmissions);
  },

  /**
   * 1. Vehicle Category & Sales Explorer Chart
   */
  renderCategoryChart(categories) {
    const ctx = document.getElementById("categorySalesChart")?.getContext("2d");
    if (!ctx) return;

    if (this.instances.category) {
      this.instances.category.destroy();
    }

    const theme = this.getThemeColors();
    const labels = categories.map(c => c.name);

    if (this.categoryViewMode === "sales") {
      // Bar Chart - Sales in Millions
      const salesData = categories.map(c => (c.sales2026 / 1000000).toFixed(2));
      const growths = categories.map(c => c.growthYoY);

      this.instances.category = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "2026 Deliveries (Millions)",
              data: salesData,
              backgroundColor: [
                "rgba(0, 240, 255, 0.75)",
                "rgba(59, 130, 246, 0.75)",
                "rgba(16, 185, 129, 0.75)",
                "rgba(245, 158, 11, 0.75)",
                "rgba(139, 92, 246, 0.75)",
                "rgba(236, 72, 153, 0.75)"
              ],
              borderColor: [
                "#00f0ff",
                "#3b82f6",
                "#10b981",
                "#f59e0b",
                "#8b5cf6",
                "#ec4899"
              ],
              borderWidth: 1.5,
              borderRadius: 6
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: theme.tooltipBg,
              titleColor: theme.tooltipText,
              bodyColor: theme.tooltipText,
              borderColor: theme.tooltipBorder,
              borderWidth: 1,
              padding: 12,
              callbacks: {
                label: function(context) {
                  const idx = context.dataIndex;
                  return [
                    ` Annual Sales: ${context.raw}M units`,
                    ` YoY Growth: +${growths[idx]}%`,
                    ` Avg Range: ${categories[idx].avgRangeKm} km`
                  ];
                }
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: theme.textColor, font: { size: 11, weight: '500' } }
            },
            y: {
              grid: { color: theme.gridColor },
              ticks: {
                color: theme.textColor,
                callback: value => value + "M"
              },
              title: {
                display: true,
                text: "Units (Millions)",
                color: theme.textColor
              }
            }
          }
        }
      });
    } else if (this.categoryViewMode === "share") {
      // Donut Chart - Market Share %
      const shares = categories.map(c => c.sharePct);
      this.instances.category = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: labels,
          datasets: [
            {
              data: shares,
              backgroundColor: [
                "#00f0ff",
                "#3b82f6",
                "#10b981",
                "#f59e0b",
                "#8b5cf6",
                "#ec4899"
              ],
              borderWidth: 2,
              borderColor: document.body.classList.contains("light-theme") ? "#ffffff" : "#111827",
              hoverOffset: 12
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
              labels: {
                color: theme.textColor,
                font: { size: 11 },
                boxWidth: 14,
                padding: 14
              }
            },
            tooltip: {
              backgroundColor: theme.tooltipBg,
              titleColor: theme.tooltipText,
              bodyColor: theme.tooltipText,
              borderColor: theme.tooltipBorder,
              borderWidth: 1,
              padding: 10,
              callbacks: {
                label: function(context) {
                  return ` ${context.label}: ${context.raw}% market share`;
                }
              }
            }
          },
          cutout: "68%"
        }
      });
    } else if (this.categoryViewMode === "satisfaction") {
      // Satisfaction Score Comparison
      const scores = categories.map(c => c.satisfactionScore);
      this.instances.category = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              axis: "y",
              label: "Satisfaction Score (out of 100)",
              data: scores,
              backgroundColor: "rgba(16, 185, 129, 0.7)",
              borderColor: "#10b981",
              borderWidth: 1.5,
              borderRadius: 6
            }
          ]
        },
        options: {
          indexAxis: "y",
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: theme.tooltipBg,
              titleColor: theme.tooltipText,
              bodyColor: theme.tooltipText,
              borderColor: theme.tooltipBorder,
              borderWidth: 1,
              callbacks: {
                label: context => ` Satisfaction Score: ${context.raw} / 100`
              }
            }
          },
          scales: {
            x: {
              min: 75,
              max: 100,
              grid: { color: theme.gridColor },
              ticks: { color: theme.textColor }
            },
            y: {
              grid: { display: false },
              ticks: { color: theme.textColor }
            }
          }
        }
      });
    }
  },

  /**
   * 2. Battery Tech & Performance Matrix Chart
   */
  renderBatteryChart(batteries) {
    const ctx = document.getElementById("batteryMatrixChart")?.getContext("2d");
    if (!ctx) return;

    if (this.instances.battery) {
      this.instances.battery.destroy();
    }

    const theme = this.getThemeColors();

    if (this.batteryViewMode === "scatter") {
      // Scatter: X = Range (km), Y = Efficiency (Wh/km), Radius = Energy Density
      const colorMap = {
        LFP: "#00f0ff",
        NMC: "#3b82f6",
        NCA: "#ec4899",
        "Sodium-Ion": "#f59e0b",
        "Solid-State": "#10b981"
      };

      const datasets = batteries.map(b => ({
        label: b.id,
        data: [
          {
            x: b.avgRangeKm,
            y: b.efficiencyWhKm,
            r: Math.round(b.energyDensityWhKg / 16) // proportional bubble size
          }
        ],
        backgroundColor: colorMap[b.id] ? `${colorMap[b.id]}aa` : "#38bdf8",
        borderColor: colorMap[b.id] || "#38bdf8",
        borderWidth: 2,
        batteryDetails: b
      }));

      this.instances.battery = new Chart(ctx, {
        type: "bubble",
        data: { datasets: datasets },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
              labels: {
                color: theme.textColor,
                boxWidth: 12,
                font: { size: 11 }
              }
            },
            tooltip: {
              backgroundColor: theme.tooltipBg,
              titleColor: theme.tooltipText,
              bodyColor: theme.tooltipText,
              borderColor: theme.tooltipBorder,
              borderWidth: 1,
              padding: 12,
              callbacks: {
                title: context => context[0].dataset.batteryDetails.name,
                label: function(context) {
                  const b = context.dataset.batteryDetails;
                  return [
                    ` WLTP Range: ${b.avgRangeKm} km`,
                    ` Efficiency: ${b.efficiencyWhKm} Wh/km`,
                    ` Energy Density: ${b.energyDensityWhKg} Wh/kg`,
                    ` 10-80% Fast Charge: ${b.fastChargeMin10to80} mins`,
                    ` Cell Pack Cost: $${b.costPerKWhUSD}/kWh`,
                    ` Cycle Life: ${b.cycleLifespanCycles} cycles`
                  ];
                }
              }
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Average Driving Range (km)",
                color: theme.textColor,
                font: { weight: "600" }
              },
              grid: { color: theme.gridColor },
              ticks: { color: theme.textColor },
              min: 250,
              max: 850
            },
            y: {
              title: {
                display: true,
                text: "Energy Consumption (Wh/km) [Lower is better]",
                color: theme.textColor,
                font: { weight: "600" }
              },
              grid: { color: theme.gridColor },
              ticks: { color: theme.textColor },
              min: 130,
              max: 185
            }
          }
        }
      });
    } else if (this.batteryViewMode === "radar") {
      // 5-Axis Spider / Radar Comparison Chart
      // Normalized indices (0-100)
      const radarLabels = [
        "Energy Density",
        "Charging Speed",
        "Cycle Lifespan",
        "Thermal Safety",
        "Cost Affordability"
      ];

      // Normalized calculations
      const datasets = batteries.map((b, i) => {
        const palette = ["#00f0ff", "#3b82f6", "#ec4899", "#f59e0b", "#10b981"];
        // Cost affordability: $180 -> 40, $40 -> 98
        const affordability = Math.max(20, Math.round(115 - (b.costPerKWhUSD * 0.45)));
        // Charging speed: 10 min -> 98, 25 min -> 65
        const chargeScore = Math.max(30, Math.round(100 - (b.fastChargeMin10to80 * 2.5)));
        // Lifespan: 4500 -> 98, 1900 -> 55
        const lifeScore = Math.round((b.cycleLifespanCycles / 4500) * 98);
        // Density: 440 -> 99, 155 -> 42
        const densityScore = Math.round((b.energyDensityWhKg / 440) * 99);

        return {
          label: b.id,
          data: [
            densityScore,
            chargeScore,
            lifeScore,
            b.thermalSafetyScore,
            affordability
          ],
          borderColor: palette[i % palette.length],
          backgroundColor: `${palette[i % palette.length]}22`,
          borderWidth: 2,
          pointBackgroundColor: palette[i % palette.length]
        };
      });

      this.instances.battery = new Chart(ctx, {
        type: "radar",
        data: {
          labels: radarLabels,
          datasets: datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
              labels: { color: theme.textColor, font: { size: 11 } }
            },
            tooltip: {
              backgroundColor: theme.tooltipBg,
              titleColor: theme.tooltipText,
              bodyColor: theme.tooltipText,
              borderColor: theme.tooltipBorder,
              borderWidth: 1
            }
          },
          scales: {
            r: {
              angleLines: { color: theme.gridColor },
              grid: { color: theme.gridColor },
              pointLabels: {
                color: theme.textColor,
                font: { size: 11, weight: "600" }
              },
              ticks: { display: false },
              min: 0,
              max: 100
            }
          }
        }
      });
    }
  },

  /**
   * 3. Historical Market Trajectory Chart (2022-2026)
   */
  renderTrajectoryChart(trends) {
    const ctx = document.getElementById("trajectoryChart")?.getContext("2d");
    if (!ctx) return;

    if (this.instances.trajectory) {
      this.instances.trajectory.destroy();
    }

    const theme = this.getThemeColors();
    const years = trends.map(t => t.year.toString());
    const salesMillions = trends.map(t => (t.sales / 1000000).toFixed(1));
    const avgRanges = trends.map(t => t.avgRange);
    const batteryCosts = trends.map(t => t.avgBatteryCost);

    this.instances.trajectory = new Chart(ctx, {
      type: "line",
      data: {
        labels: years,
        datasets: [
          {
            label: "Global Sales (M Units)",
            data: salesMillions,
            borderColor: "#00f0ff",
            backgroundColor: "rgba(0, 240, 255, 0.15)",
            borderWidth: 3,
            fill: true,
            tension: 0.35,
            yAxisID: "y"
          },
          {
            label: "Avg Range (km)",
            data: avgRanges,
            borderColor: "#10b981",
            borderDash: [5, 5],
            borderWidth: 2,
            pointBackgroundColor: "#10b981",
            tension: 0.25,
            yAxisID: "y1"
          },
          {
            label: "Battery Pack Cost ($/kWh)",
            data: batteryCosts,
            borderColor: "#f59e0b",
            borderWidth: 2,
            pointBackgroundColor: "#f59e0b",
            tension: 0.25,
            yAxisID: "y2"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: {
            position: "top",
            labels: { color: theme.textColor, font: { size: 11 } }
          },
          tooltip: {
            backgroundColor: theme.tooltipBg,
            titleColor: theme.tooltipText,
            bodyColor: theme.tooltipText,
            borderColor: theme.tooltipBorder,
            borderWidth: 1,
            padding: 12
          }
        },
        scales: {
          x: {
            grid: { color: theme.gridColor },
            ticks: { color: theme.textColor }
          },
          y: {
            type: "linear",
            display: true,
            position: "left",
            grid: { color: theme.gridColor },
            ticks: {
              color: theme.textColor,
              callback: val => val + "M"
            },
            title: {
              display: true,
              text: "Sales (Millions)",
              color: theme.textColor
            }
          },
          y1: {
            type: "linear",
            display: false,
            position: "right",
            min: 300,
            max: 600
          },
          y2: {
            type: "linear",
            display: false,
            position: "right",
            min: 50,
            max: 200
          }
        }
      }
    });
  },

  /**
   * 4. Lifecycle Sustainability & CO2 Emissions Chart
   */
  renderSustainabilityChart(emissions) {
    const ctx = document.getElementById("sustainabilityChart")?.getContext("2d");
    if (!ctx) return;

    if (this.instances.sustainability) {
      this.instances.sustainability.destroy();
    }

    const theme = this.getThemeColors();
    const labels = emissions.map(e => e.type.replace(" (", "\n("));
    const mfg = emissions.map(e => e.manufacturingGgCO2);
    const use = emissions.map(e => e.usePhaseGgCO2);
    const eol = emissions.map(e => e.endOfLifeGgCO2);

    this.instances.sustainability = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Manufacturing & Battery Cell",
            data: mfg,
            backgroundColor: "rgba(245, 158, 11, 0.8)",
            borderRadius: 4
          },
          {
            label: "Vehicle In-Use Phase (150,000 km)",
            data: use,
            backgroundColor: "rgba(59, 130, 246, 0.8)",
            borderRadius: 4
          },
          {
            label: "End-of-Life & Recycling",
            data: eol,
            backgroundColor: "rgba(16, 185, 129, 0.8)",
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: { color: theme.textColor, font: { size: 11 } }
          },
          tooltip: {
            backgroundColor: theme.tooltipBg,
            titleColor: theme.tooltipText,
            bodyColor: theme.tooltipText,
            borderColor: theme.tooltipBorder,
            borderWidth: 1,
            callbacks: {
              afterBody: function(contexts) {
                const total = contexts.reduce((sum, item) => sum + item.parsed.y, 0);
                return `Total Lifetime Emissions: ${total.toFixed(1)} tons CO₂e`;
              }
            }
          }
        },
        scales: {
          x: {
            stacked: true,
            grid: { display: false },
            ticks: { color: theme.textColor, font: { size: 10 } }
          },
          y: {
            stacked: true,
            grid: { color: theme.gridColor },
            ticks: {
              color: theme.textColor,
              callback: val => val + " t"
            },
            title: {
              display: true,
              text: "Tons of CO₂ Equivalent",
              color: theme.textColor
            }
          }
        }
      }
    });
  },

  updateTheme() {
    // Re-render charts with refreshed color palette
    if (window.EV_DATA) {
      this.initAllCharts(window.EV_DATA);
    }
  }
};

if (typeof window !== "undefined") {
  window.ChartsManager = ChartsManager;
}

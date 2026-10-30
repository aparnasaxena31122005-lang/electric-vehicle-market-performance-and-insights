# Electric Vehicle Market Performance & Insights

> **An Interactive, Executive-Ready Web Analytics Platform for Strategic, Operational, and Sustainable Decision-Making in Global Clean Mobility.**

---

## 🎯 Executive Overview & Target Personas

The **Electric Vehicle Market Performance & Insights** dashboard serves three distinct leadership personas requiring data-driven decision-making tools:

| Persona | Role | Focus Areas | Key Capabilities in Dashboard |
|---|---|---|---|
| **Emily Johnson** | EV Market Strategy Director | Segment deliveries, category growth rates, driving range vs. battery sweetspots, consumer satisfaction | Interactive Bar & Donut category explorer, growth YoY badges, model performance cards, satisfaction radar |
| **David Chen** | Automotive Business Intelligence Manager | Global OEM market share, manufacturing concentration, supply chain bottlenecks, charging infrastructure density | Geo-spatial Leaflet map (production vs. charger ratio), sortable 12-OEM leaderboard, OEM inspection drawer |
| **Dr. Sarah Williams** | Sustainable Mobility Research Analyst | Battery chemistries (LFP, NMC, NCA, Sodium-Ion, Solid-State), lifecycle CO₂ footprint, mineral recycling yields, regulatory policy | Range vs. efficiency scatter plot, 5-axis spider radar, lifecycle LCA emissions chart, interactive TCO/CO₂ calculator |

---

## 🚀 Key Modules & Interactive Features

### 1. Executive Overview KPI Header
- **Total EV Deliveries**: Real-time aggregation of global deliveries (17.4M units in FY 2026, +24.8% YoY) alongside global active fleet count (62.8M).
- **Top Performing Category**: Spotlight on Electric SUVs (48.6% volume share) with highlight on the fastest-growing micro-mobility segment (Two-Wheelers at +18.1% YoY).
- **Average Driving Range**: Median WLTP range progression (472 km / 293 mi), tracking continuous aerodynamic and pack efficiency gains.
- **Top Battery Chemistry**: Leading chemistry share (LFP at 44.5%) with pack cost benchmarks ($84/kWh) and Solid-State commercialization indicators.
- **Global Satisfaction Score**: Customer satisfaction index (89.4 / 100, Net Promoter Score +64), coupled with global CO₂ emissions avoided (48.2 Million Metric Tons).

### 2. Vehicle Category & Sales Explorer
- **Interactive Visualization**: Toggle between **Deliveries (Millions)**, **Market Share (%)**, and **Customer Satisfaction Index**.
- **Segment Coverage**: Hatchbacks, Sedans, SUVs, Commercial Delivery Vans, Municipal Buses, and Two-Wheelers.
- **Granular Spec Cards**: Top-selling model per category (e.g. Tesla Model Y, BYD Dolphin, Rivian EDV), median price, WLTP range, and annual growth velocity.

### 3. Battery Tech & Performance Matrix
- **Range vs. Energy Consumption Scatter Plot**: Multi-dimensional canvas mapping WLTP range (x-axis) against consumption in Wh/km (y-axis), with bubble radius sized by volumetric energy density (Wh/kg).
- **5-Axis Spider Radar Chart**: Direct benchmarking of LFP, NMC, NCA, Sodium-Ion, and Solid-State batteries across Energy Density, Fast Charging (10-80% min), Cycle Lifespan, Thermal Safety, and Pack Cost.
- **Chemistry Dossiers**: In-depth breakdowns of chemical formulas, cobalt-free status, temperature tolerance, pros, cons, and flagship adopters (e.g., BYD Blade, QuantumScape SSB, CATL Shenxing).

### 4. Global Manufacturing & Distribution Map
- **Geo-Spatial Leaflet Map**: Smooth zoomable map with dark-tile automotive styling and light-tile switching.
- **Switchable Map Layers**:
  1. *Production Output*: Annual EV manufacturing volume by country hub.
  2. *Charging Density*: Public fast chargers deployed globally.
  3. *EV Penetration Rate*: National new-vehicle electrification share (e.g. Norway at 92.4%, China at 46.5%).
- **Country Navigation Pills**: Instant camera fly-to animation for key clusters: China, United States, Germany, South Korea, Japan, India, ASEAN, and Norway.
- **Interactive Marker Popups**: Detailed regional briefings including gigafactory clusters, charger-to-car ratios, top local automakers, and regulatory policies.

### 5. Competitive Landscape Leaderboard
- **12 Global Automakers**: Tesla, BYD Auto, Volkswagen Group, Hyundai Motor Group, Geely Holding, BMW Group, SAIC Motor, Stellantis, General Motors, Mercedes-Benz Group, NIO, and Rivian.
- **Dynamic Table Controls**: Real-time fuzzy text search, chemistry filters, and multi-column sorting (Market Share, Deliveries, Growth, WLTP Range, Rating).
- **OEM Deep Dive Modal**: Click any automaker to open a comprehensive briefing with ticker, flagship models, battery supply chain strategy, and charging architecture (e.g. 800V silicon carbide).
- **CSV Data Export**: One-click download of the active leaderboard dataset (`EV_Global_Leaderboard_2026.csv`).

### 6. Sustainable Mobility & Policy Research Lab
- **LCA Carbon Accounting**: Stacked bar comparison of total lifecycle emissions (Manufacturing + 150k km In-Use + End-of-Life) across ICE vehicles, Global Grid EVs, Clean EU Grid EVs, and 100% Renewable EVs.
- **Closed-Loop Recycling Yields**: Hydrometallurgical recovery rates for Cobalt (98.4%), Nickel (97.8%), Copper (99.1%), and Lithium (92.5%).
- **Interactive TCO & Emissions Calculator**: Live sliders for annual kilometers driven, gasoline pump prices, and electricity tariffs to project consumer fuel savings and tons of CO₂ avoided.
- **Regulatory Framework Timeline**: Executive analysis of EU Battery Passport, US IRA FEOC restrictions, China NEV tax policies, and India PM E-DRIVE mandates.

### 7. Historical Market Trajectory & Cost Curve (2022-2026)
- Multi-axis timeline tracking how global sales have scaled while average battery pack costs dropped from $153/kWh (2022) to $84/kWh (2026).

---

## 💻 Tech Stack & Architecture

- **Frontend Core**: Semantic HTML5, CSS3 Variables, ES6+ JavaScript modules.
- **Styling**: Tailwind CSS (via CDN) + bespoke CSS with glassmorphism, responsive typography, and print media queries.
- **Data Visualization**: [Chart.js 4.4+](https://www.chartjs.org/) with responsive tooltips, custom color palettes, and radar/scatter/doughnut charts.
- **Geo-Spatial Analytics**: [Leaflet.js 1.9+](https://leafletjs.com/) with CartoDB Voyager and Dark Matter vector basemaps.
- **Accessibility & Themes**: Full Dark Mode (primary executive aesthetic) and Light Mode with persistence in `localStorage`.
- **Exporting**: In-browser CSV generator (Blob API) and print-optimized PDF styling.

---

## 🏃 How to Run the Application

### Option 1: Direct File Open (Zero Setup Required)
Simply open `index.html` in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).

### Option 2: Local HTTP Server (Recommended)
Using Python's built-in web server:

```powershell
# Navigate to the project directory
cd "c:\Users\admin\Desktop\electric vehical projectr"

# Start lightweight server on port 3000 (or any available port)
python -m http.server 3000
```

Then visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📊 File Structure

```
electric-vehicle-project/
├── index.html              # Main dashboard single-page application
├── css/
│   └── styles.css          # Glassmorphism styling, themes, animations & print styles
├── js/
│   ├── data.js             # Comprehensive multi-dimensional EV dataset (2022-2026)
│   ├── charts.js           # Chart.js initialization, gradient setups & reactivity
│   ├── map.js              # Leaflet world map, geo-markers & layer controllers
│   ├── persona.js          # Persona switcher (Emily, David, Dr. Sarah) & briefings
│   ├── table.js            # Leaderboard table, sorting, searching, modal & CSV export
│   └── app.js              # Main application controller, filter state & calculator
└── README.md               # Executive documentation and user guide
```

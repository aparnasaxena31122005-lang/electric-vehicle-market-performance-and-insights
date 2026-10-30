/**
 * Electric Vehicle Market Performance & Insights - Dataset
 * Comprehensive multi-dimensional EV market statistics (2022 - 2026)
 */

const EV_DATA = {
  metadata: {
    datasetVersion: "2026.4-EXECUTIVE",
    generatedAt: "2026-10-30",
    currency: "USD",
    totalGlobalSales2026Forecast: 17420000, // units
    totalGlobalEVFleet: 62800000,
    co2AvoidedTonsAnnual: 48200000,
    publicChargingPortsGlobal: 5120000
  },

  // Yearly Fleet Trends (2022-2026)
  yearlyTrends: [
    { year: 2022, sales: 10200000, avgRange: 395, marketShareEV: 13.8, chargingPorts: 2680000, avgBatteryCost: 153 },
    { year: 2023, sales: 13800000, avgRange: 422, marketShareEV: 17.2, chargingPorts: 3450000, avgBatteryCost: 139 },
    { year: 2024, sales: 15300000, avgRange: 445, marketShareEV: 20.4, chargingPorts: 4120000, avgBatteryCost: 115 },
    { year: 2025, sales: 16400000, avgRange: 458, marketShareEV: 22.8, chargingPorts: 4680000, avgBatteryCost: 98 },
    { year: 2026, sales: 17420000, avgRange: 472, marketShareEV: 25.4, chargingPorts: 5120000, avgBatteryCost: 84 }
  ],

  // Vehicle Categories Breakdown
  categories: [
    {
      id: "suv",
      name: "Electric SUVs",
      sales2026: 8466000, // 48.6% share
      sales2025: 7850000,
      sharePct: 48.6,
      growthYoY: 7.8,
      avgRangeKm: 512,
      satisfactionScore: 91.2,
      topSellingModel: "Tesla Model Y",
      avgPriceUSD: 52400,
      primaryChemistries: ["NMC", "LFP"],
      description: "Dominant consumer choice globally across North America, China, and Europe due to cabin utility and dual-motor AWD appeal."
    },
    {
      id: "sedan",
      name: "Executive & Family Sedans",
      sales2026: 4180000,
      sales2025: 4020000,
      sharePct: 24.0,
      growthYoY: 4.0,
      avgRangeKm: 538,
      satisfactionScore: 89.5,
      topSellingModel: "Tesla Model 3 / BYD Han",
      avgPriceUSD: 46200,
      primaryChemistries: ["NMC", "LFP"],
      description: "High aerodynamic efficiency (Cd < 0.22) delivers industry-leading driving ranges per kWh."
    },
    {
      id: "hatchback",
      name: "Compact & Urban Hatchbacks",
      sales2026: 2264000,
      sales2025: 2110000,
      sharePct: 13.0,
      growthYoY: 7.3,
      avgRangeKm: 345,
      satisfactionScore: 85.8,
      topSellingModel: "BYD Dolphin / Seagull",
      avgPriceUSD: 21800,
      primaryChemistries: ["LFP", "Sodium-Ion"],
      description: "Accelerating electrification in European cities and tier-2 Chinese metros; prime testing ground for Sodium-Ion batteries."
    },
    {
      id: "two_wheeler",
      name: "Two-Wheelers (Scooters/Bikes)",
      sales2026: 1394000,
      sales2025: 1180000,
      sharePct: 8.0,
      growthYoY: 18.1,
      avgRangeKm: 135,
      satisfactionScore: 88.0,
      topSellingModel: "Ola S1 Pro / Yadea E8S",
      avgPriceUSD: 1850,
      primaryChemistries: ["LFP", "Sodium-Ion"],
      description: "Highest volume expansion rate in South Asia and Southeast Asia, fueled by battery swapping station networks."
    },
    {
      id: "commercial_truck",
      name: "Commercial Trucks & Vans",
      sales2026: 784000,
      sales2025: 690000,
      sharePct: 4.5,
      growthYoY: 13.6,
      avgRangeKm: 380,
      satisfactionScore: 84.1,
      topSellingModel: "Rivian EDV / Ford E-Transit",
      avgPriceUSD: 78500,
      primaryChemistries: ["LFP", "NMC"],
      description: "Last-mile logistics fleet transition driven by strict zero-emission city center zones and low operating costs per mile."
    },
    {
      id: "bus",
      name: "Electric Municipal Transit Buses",
      sales2026: 332000,
      sales2025: 310000,
      sharePct: 1.9,
      growthYoY: 7.1,
      avgRangeKm: 320,
      satisfactionScore: 87.4,
      topSellingModel: "BYD K9 / Yutong E12",
      avgPriceUSD: 345000,
      primaryChemistries: ["LFP"],
      description: "Mature sector in China (95%+ electrified) now expanding aggressively across Latin America, India, and EU municipal fleets."
    }
  ],

  // Battery Chemistries Matrix
  batteryTechnologies: [
    {
      id: "LFP",
      name: "LFP (Lithium Iron Phosphate)",
      formula: "LiFePO4",
      marketSharePct: 44.5,
      avgRangeKm: 440,
      energyDensityWhKg: 185,
      efficiencyWhKm: 155, // lower is better
      fastChargeMin10to80: 22,
      cycleLifespanCycles: 3800,
      costPerKWhUSD: 74,
      thermalSafetyScore: 95, // out of 100
      cobaltFree: true,
      subZeroPerformanceScore: 72,
      majorAdopters: ["BYD (Blade)", "Tesla (Standard Range)", "CATL (Shenxing)", "Stellantis"],
      strengths: "Extreme thermal stability, low cost, cobalt-free, 10+ year cycle life.",
      weaknesses: "Lower volumetric energy density, reduced cold-weather discharge rates."
    },
    {
      id: "NMC",
      name: "NMC (Nickel Manganese Cobalt)",
      formula: "Li(NiCoMn)O2 (811 / 622)",
      marketSharePct: 37.2,
      avgRangeKm: 560,
      energyDensityWhKg: 285,
      efficiencyWhKm: 168,
      fastChargeMin10to80: 18,
      cycleLifespanCycles: 2200,
      costPerKWhUSD: 104,
      thermalSafetyScore: 78,
      cobaltFree: false,
      subZeroPerformanceScore: 89,
      majorAdopters: ["Porsche", "BMW", "Hyundai/Kia", "Tesla (Long Range/Plaid)", "Rivian"],
      strengths: "High energy density, superior high-speed acceleration & winter cold range retention.",
      weaknesses: "Cobalt supply chain ethics/cost, requires advanced liquid thermal management."
    },
    {
      id: "NCA",
      name: "NCA (Nickel Cobalt Aluminum)",
      formula: "Li(NiCoAl)O2",
      marketSharePct: 9.8,
      avgRangeKm: 585,
      energyDensityWhKg: 295,
      efficiencyWhKm: 172,
      fastChargeMin10to80: 20,
      cycleLifespanCycles: 1900,
      costPerKWhUSD: 112,
      thermalSafetyScore: 74,
      cobaltFree: false,
      subZeroPerformanceScore: 86,
      majorAdopters: ["Tesla (Performance)", "Lucid Motors", "Panasonic Cells"],
      strengths: "Maximum power output for premium sports EVs, exceptional power-to-weight ratio.",
      weaknesses: "Higher cobalt content, sensitive to overcharging, higher degradation at fast C-rates."
    },
    {
      id: "Sodium-Ion",
      name: "Sodium-Ion (Na-Ion)",
      formula: "NaFePO4 / Prussian White",
      marketSharePct: 4.8,
      avgRangeKm: 310,
      energyDensityWhKg: 155,
      efficiencyWhKm: 148,
      fastChargeMin10to80: 14,
      cycleLifespanCycles: 3400,
      costPerKWhUSD: 46,
      thermalSafetyScore: 98,
      cobaltFree: true,
      subZeroPerformanceScore: 94,
      majorAdopters: ["CATL (Na+)", "HiNa Battery", "BYD Seagull Na Edition", "JAC Yiwei"],
      strengths: "Abundant raw materials (salt), zero lithium/cobalt dependence, outstanding -20°C discharge, lowest cost.",
      weaknesses: "Bulkier pack size unsuitable for long-range >500km luxury vehicles."
    },
    {
      id: "Solid-State",
      name: "Solid-State Battery (SSB)",
      formula: "Li-Metal / Sulfide-Oxide Ceramic",
      marketSharePct: 3.7,
      avgRangeKm: 780,
      energyDensityWhKg: 440,
      efficiencyWhKm: 142,
      fastChargeMin10to80: 10,
      cycleLifespanCycles: 4500,
      costPerKWhUSD: 165,
      thermalSafetyScore: 99,
      cobaltFree: true,
      subZeroPerformanceScore: 92,
      majorAdopters: ["QuantumScape (VW partner)", "Toyota (SSB line)", "NIO / WeLion (150kWh)", "ProLogium"],
      strengths: "10-minute full charge, 800+ km range, non-flammable solid electrolyte, revolutionary safety.",
      weaknesses: "Currently in high-cost commercial ramp-up stage; manufacturing yields scaling up."
    }
  ],

  // Global Geographic Hubs (Manufacturing, Distribution, Charging)
  geoHubs: [
    {
      country: "China",
      code: "CN",
      lat: 35.8617,
      lng: 104.1954,
      productionVolume2026: 11150000,
      globalProductionShare: 64.0,
      domesticEVSharePct: 46.5,
      publicFastChargers: 2780000,
      chargerToCarRatio: 1 / 7.2,
      topOEM: "BYD Auto",
      keyClusters: ["Shenzhen", "Shanghai Mega-Factory", "Hefei EV City", "Changchun"],
      policyHighlight: "National Dual-Credit mandate, NEV Purchase Tax exemptions, and massive Grid-Vehicle (V2G) standard rollout."
    },
    {
      country: "United States",
      code: "US",
      lat: 37.0902,
      lng: -95.7129,
      productionVolume2026: 2280000,
      globalProductionShare: 13.1,
      domesticEVSharePct: 13.2,
      publicFastChargers: 225000,
      chargerToCarRatio: 1 / 18.4,
      topOEM: "Tesla",
      keyClusters: ["Texas Gigafactory", "California Bay Area", "Michigan EV Belt", "Tennessee Valley"],
      policyHighlight: "Inflation Reduction Act (IRA) Section 30D $7,500 tax credits, NEVI $5B charging corridor deployment."
    },
    {
      country: "Germany",
      code: "DE",
      lat: 51.1657,
      lng: 10.4515,
      productionVolume2026: 1220000,
      globalProductionShare: 7.0,
      domesticEVSharePct: 24.8,
      publicFastChargers: 135000,
      chargerToCarRatio: 1 / 14.1,
      topOEM: "Volkswagen Group",
      keyClusters: ["Wolfsburg", "Berlin-Brandenburg", "Munich", "Stuttgart"],
      policyHighlight: "EU 2035 Zero Emissions Fleet Target, EU Battery Passport sustainability regulation, Deutschlandnetz."
    },
    {
      country: "South Korea",
      code: "KR",
      lat: 35.9078,
      lng: 127.7669,
      productionVolume2026: 620000,
      globalProductionShare: 3.6,
      domesticEVSharePct: 14.8,
      publicFastChargers: 320000,
      chargerToCarRatio: 1 / 4.2, // very dense apartment charging!
      topOEM: "Hyundai Motor Group",
      keyClusters: ["Ulsan Megaplant", "Hwaseong", "Gwangju"],
      policyHighlight: "K-Battery Alliance, nationwide high-power E-Pit charging network, solid-state commercialization initiative."
    },
    {
      country: "Japan",
      code: "JP",
      lat: 36.2048,
      lng: 138.2529,
      productionVolume2026: 380000,
      globalProductionShare: 2.2,
      domesticEVSharePct: 5.4,
      publicFastChargers: 48000,
      chargerToCarRatio: 1 / 22.0,
      topOEM: "Toyota Motor Corp",
      keyClusters: ["Aichi (Toyota City)", "Kanagawa", "Gunma"],
      policyHighlight: "Green Growth Strategy subsidizing solid-state battery R&D; Kei-car EV transition initiatives."
    },
    {
      country: "India",
      code: "IN",
      lat: 20.5937,
      lng: 78.9629,
      productionVolume2026: 540000,
      globalProductionShare: 3.1,
      domesticEVSharePct: 8.5,
      publicFastChargers: 42000,
      chargerToCarRatio: 1 / 28.5,
      topOEM: "Tata Motors / Ola Electric",
      keyClusters: ["Pune Automotive Corridor", "Tamil Nadu EV Valley", "Bengaluru"],
      policyHighlight: "PM E-DRIVE Scheme, PLI Automotive & ACC Battery schemes driving localized 2W and 4W manufacturing."
    },
    {
      country: "Southeast Asia (ASEAN)",
      code: "ASEAN",
      lat: 4.2105,
      lng: 101.9758,
      productionVolume2026: 410000,
      globalProductionShare: 2.3,
      domesticEVSharePct: 9.8,
      publicFastChargers: 46000,
      chargerToCarRatio: 1 / 19.0,
      topOEM: "BYD / VinFast",
      keyClusters: ["Thailand Eastern Seaboard", "Indonesia West Java (Nickel hub)", "Vietnam Hai Phong"],
      policyHighlight: "Indonesia raw nickel export ban forcing domestic cell manufacturing; Thailand EV3.5 incentives."
    },
    {
      country: "Norway & Nordics",
      code: "NO",
      lat: 60.4720,
      lng: 8.4689,
      productionVolume2026: 95000,
      globalProductionShare: 0.5,
      domesticEVSharePct: 92.4, // World record adoption!
      publicFastChargers: 38000,
      chargerToCarRatio: 1 / 11.2,
      topOEM: "Tesla / Volkswagen",
      keyClusters: ["Oslo", "Gothenburg (Sweden)"],
      policyHighlight: "World's earliest phase-out of ICE sales (2025 target achieved); VAT exemption on clean mobility."
    },
    {
      country: "Rest of World",
      code: "ROW",
      lat: -14.2350,
      lng: -51.9253,
      productionVolume2026: 725000,
      globalProductionShare: 4.2,
      domesticEVSharePct: 5.6,
      publicFastChargers: 76000,
      chargerToCarRatio: 1 / 24.0,
      topOEM: "BYD / Geely",
      keyClusters: ["Brazil (Camaçari)", "Mexico (Monterrey)", "UK", "Australia"],
      policyHighlight: "Latin America expanding bus transit fleets; Australian NEVS efficiency standards commencing."
    }
  ],

  // Competitive Landscape Leaderboard (12 Major Global Automakers)
  manufacturers: [
    {
      id: "byd",
      name: "BYD Auto",
      ticker: "1211.HK",
      country: "China",
      marketSharePct: 21.8,
      volume2026: 3800000, // Includes all BEVs and extended-range/PHEVs
      volumeYoY: 21.4,
      priceRange: "$11,500 - $155,000",
      priceTier: "Budget to Luxury",
      avgRangeKm: 475,
      customerSatisfaction: 89.4,
      esgRating: "A-",
      primaryChemistries: ["LFP (Blade)", "Sodium-Ion"],
      flagshipModels: ["Seagull", "Dolphin", "Atto 3", "Seal EV", "Yangwang U8"],
      batteryStrategy: "Full vertical integration. Blade Battery exported to Ford, Toyota, and Tesla.",
      chargingTech: "Dual-gun simultaneous fast charging (up to 230kW)."
    },
    {
      id: "tesla",
      name: "Tesla Inc.",
      ticker: "TSLA",
      country: "United States",
      marketSharePct: 17.5,
      volume2026: 2140000,
      volumeYoY: 9.8,
      priceRange: "$37,990 - $119,990",
      priceTier: "Mid-Market to Luxury",
      avgRangeKm: 535,
      customerSatisfaction: 91.8,
      esgRating: "A",
      primaryChemistries: ["NMC", "LFP", "NCA (4680)"],
      flagshipModels: ["Model Y", "Model 3", "Cybertruck", "Tesla Semi"],
      batteryStrategy: "In-house 4680 dry-electrode manufacturing alongside strategic CATL/Panasonic sourcing.",
      chargingTech: "V4 Supercharger Network (up to 350kW, NACS global standard leader)."
    },
    {
      id: "vw",
      name: "Volkswagen Group",
      ticker: "VOW3.DE",
      country: "Germany",
      marketSharePct: 7.8,
      volume2026: 1040000,
      volumeYoY: 8.5,
      priceRange: "$32,000 - $185,000",
      priceTier: "Mass-Market to Exotic",
      avgRangeKm: 495,
      customerSatisfaction: 84.6,
      esgRating: "A",
      primaryChemistries: ["NMC", "LFP", "SSB Pilot"],
      flagshipModels: ["VW ID.4", "VW ID.7", "Audi Q6 e-tron", "Porsche Taycan Turbo GT"],
      batteryStrategy: "PowerCo unified prismatic cell initiative and QuantumScape solid-state co-development.",
      chargingTech: "PPE 800-volt architecture enabling 270kW charging (10-80% in 21 mins)."
    },
    {
      id: "hyundai_kia",
      name: "Hyundai Motor Group",
      ticker: "005380.KS",
      country: "South Korea",
      marketSharePct: 6.9,
      volume2026: 890000,
      volumeYoY: 11.2,
      priceRange: "$33,500 - $82,000",
      priceTier: "Mid-Market to Premium",
      avgRangeKm: 515,
      customerSatisfaction: 90.6,
      esgRating: "A",
      primaryChemistries: ["NMC", "LFP"],
      flagshipModels: ["Hyundai Ioniq 5 / 6", "Kia EV6 / EV9", "Genesis GV60"],
      batteryStrategy: "E-GMP 800V platform sourcing from SK On and LG Energy Solution, expanding into Georgia Metaplant.",
      chargingTech: "Industry benchmark 350kW DC fast charge (10% to 80% in just 18 minutes)."
    },
    {
      id: "geely",
      name: "Geely Holding Group",
      ticker: "0175.HK",
      country: "China",
      marketSharePct: 6.4,
      volume2026: 820000,
      volumeYoY: 19.3,
      priceRange: "$18,000 - $120,000",
      priceTier: "Mass to Ultra-Premium",
      avgRangeKm: 520,
      customerSatisfaction: 88.1,
      esgRating: "A-",
      primaryChemistries: ["LFP", "NMC"],
      flagshipModels: ["Zeekr 001", "Zeekr 007", "Volvo EX30", "Polestar 4", "Smart #1"],
      batteryStrategy: "In-house Golden Battery (75kWh LFP charging at 5.5C, 500km in 15 mins).",
      chargingTech: "Zeekr V3 800kW Liquid-Cooled charging stations."
    },
    {
      id: "bmw",
      name: "BMW Group",
      ticker: "BMW.DE",
      country: "Germany",
      marketSharePct: 5.1,
      volume2026: 660000,
      volumeYoY: 14.5,
      priceRange: "$49,000 - $145,000",
      priceTier: "Premium Luxury",
      avgRangeKm: 540,
      customerSatisfaction: 92.4,
      esgRating: "A+",
      primaryChemistries: ["NMC (Gen 6 Cylindrical)"],
      flagshipModels: ["BMW i4", "BMW iX", "BMW i7", "Neue Klasse Vision X"],
      batteryStrategy: "Gen6 round cells (46mm diameter) increasing range by 30% and cutting cell costs by 50%.",
      chargingTech: "Neue Klasse 800-volt high-speed architecture."
    },
    {
      id: "saic",
      name: "SAIC Motor",
      ticker: "600104.SS",
      country: "China",
      marketSharePct: 5.2,
      volume2026: 710000,
      volumeYoY: 6.8,
      priceRange: "$5,800 - $48,000",
      priceTier: "Budget to Mid-Market",
      avgRangeKm: 390,
      customerSatisfaction: 82.7,
      esgRating: "B",
      primaryChemistries: ["LFP", "NMC", "Semi-Solid"],
      flagshipModels: ["MG4 EV", "Wuling Hongguang Mini EV", "IM L6 (Solid-State Light)"],
      batteryStrategy: "First to launch semi-solid battery vehicle (IM L6 with 133kWh semi-solid pack).",
      chargingTech: "Quasi-900V Silicon Carbide ultra-fast platform."
    },
    {
      id: "stellantis",
      name: "Stellantis",
      ticker: "STLA",
      country: "Netherlands/France",
      marketSharePct: 4.2,
      volume2026: 545000,
      volumeYoY: 8.2,
      priceRange: "$24,000 - $79,000",
      priceTier: "Affordable to Mid-Market",
      avgRangeKm: 420,
      customerSatisfaction: 81.3,
      esgRating: "B+",
      primaryChemistries: ["LFP", "NMC"],
      flagshipModels: ["Peugeot e-208", "Citroën ë-C3", "Fiat 500e", "Jeep Avenger EV", "Ram 1500 REV"],
      batteryStrategy: "Automotive Cells Company (ACC) joint gigafactories with TotalEnergies and Mercedes.",
      chargingTech: "STLA Medium & Large platforms supporting 160kW - 250kW charging."
    },
    {
      id: "gm",
      name: "General Motors",
      ticker: "GM",
      country: "United States",
      marketSharePct: 3.8,
      volume2026: 490000,
      volumeYoY: 15.6,
      priceRange: "$35,000 - $130,000",
      priceTier: "Mid-Market to Premium Luxury",
      avgRangeKm: 510,
      customerSatisfaction: 83.9,
      esgRating: "B+",
      primaryChemistries: ["NMC (Ultium)", "LFP"],
      flagshipModels: ["Chevy Equinox EV", "Silverado EV (200kWh+)", "Cadillac Lyriq / Escalade IQ"],
      batteryStrategy: "Ultium pouch and prismatic platform with LG Energy Solution; pivoting to prismatic and LFP.",
      chargingTech: "NACS native port adoption and 350kW 800V series-parallel pack switching."
    },
    {
      id: "mercedes",
      name: "Mercedes-Benz Group",
      ticker: "MBG.DE",
      country: "Germany",
      marketSharePct: 3.2,
      volume2026: 415000,
      volumeYoY: 9.1,
      priceRange: "$56,000 - $155,000",
      priceTier: "Executive Luxury",
      avgRangeKm: 575,
      customerSatisfaction: 89.9,
      esgRating: "A+",
      primaryChemistries: ["NMC (Silicon-Anode)"],
      flagshipModels: ["EQE Sedan", "EQS Sedan", "EQB SUV", "G 580 with EQ Tech (4 motors)"],
      batteryStrategy: "Sila Nanotechnologies silicon anode cells for +20% volumetric boost; MMA platform.",
      chargingTech: "Mercedes-Benz High-Power Charging Hubs worldwide (400kW)."
    },
    {
      id: "nio",
      name: "NIO Inc.",
      ticker: "NIO",
      country: "China",
      marketSharePct: 2.7,
      volume2026: 345000,
      volumeYoY: 28.5,
      priceRange: "$41,000 - $92,000",
      priceTier: "Premium Tech-Luxury",
      avgRangeKm: 610,
      customerSatisfaction: 94.2,
      esgRating: "A",
      primaryChemistries: ["NMC", "Semi-Solid (150 kWh)"],
      flagshipModels: ["NIO ET5 Touring", "ES6 SUV", "ET7 Flagship", "Onvo L60"],
      batteryStrategy: "Pioneering BaaS (Battery-as-a-Service) & Power Swap Stations (3-minute automated swap).",
      chargingTech: "2,500+ Battery Swap Stations & 640kW liquid-cooled chargers."
    },
    {
      id: "rivian",
      name: "Rivian Automotive",
      ticker: "RIVN",
      country: "United States",
      marketSharePct: 1.9,
      volume2026: 245000,
      volumeYoY: 34.0,
      priceRange: "$45,000 - $99,000",
      priceTier: "Adventure Premium & Fleet",
      avgRangeKm: 550,
      customerSatisfaction: 93.5,
      esgRating: "A-",
      primaryChemistries: ["NMC", "LFP (Standard Range)"],
      flagshipModels: ["Rivian R1T Truck", "Rivian R1S SUV", "Rivian R2 Midsize", "Custom EDV (Amazon)"],
      batteryStrategy: "Enduro in-house motor drive units paired with Samsung SDI cells; R2 mid-size platform.",
      chargingTech: "Rivian Adventure Network (DC fast chargers at trailheads and national parks)."
    }
  ],

  // Sustainability & Policy Insights
  sustainability: {
    lifetimeEmissions: [
      { type: "Internal Combustion Engine (ICE)", manufacturingGgCO2: 8.5, usePhaseGgCO2: 34.0, endOfLifeGgCO2: 1.2, totalTonsCO2: 43.7 },
      { type: "EV (Current Global Grid Mix)", manufacturingGgCO2: 13.8, usePhaseGgCO2: 11.2, endOfLifeGgCO2: 0.8, totalTonsCO2: 25.8 },
      { type: "EV (EU / Clean Grid 2026)", manufacturingGgCO2: 11.5, usePhaseGgCO2: 4.8, endOfLifeGgCO2: 0.6, totalTonsCO2: 16.9 },
      { type: "EV (100% Renewable + Recycled Cells)", manufacturingGgCO2: 6.2, usePhaseGgCO2: 0.0, endOfLifeGgCO2: 0.3, totalTonsCO2: 6.5 }
    ],
    mineralRecyclingRates: [
      { mineral: "Cobalt", hydrometallurgyPct: 98.4, pyrometallurgyPct: 82.0 },
      { mineral: "Nickel", hydrometallurgyPct: 97.8, pyrometallurgyPct: 85.5 },
      { mineral: "Lithium", hydrometallurgyPct: 92.5, pyrometallurgyPct: 45.0 },
      { mineral: "Copper", hydrometallurgyPct: 99.1, pyrometallurgyPct: 94.0 },
      { mineral: "Manganese", hydrometallurgyPct: 88.0, pyrometallurgyPct: 60.0 }
    ],
    policyPillars: [
      {
        jurisdiction: "European Union",
        policy: "EU Battery Passport & Fit for 55",
        status: "Mandatory in 2026",
        impact: "QR-code tracking of recycled content, carbon footprint verification, and mandatory collection targets."
      },
      {
        jurisdiction: "United States",
        policy: "Inflation Reduction Act (IRA Section 30D / 45X)",
        status: "Active & Enforced",
        impact: "Severe FEOC (Foreign Entity of Concern) restrictions on battery materials, incentivizing North American localized gigafactories."
      },
      {
        jurisdiction: "China",
        policy: "NEV Purchase Tax Exemption & Vehicle-to-Grid (V2G)",
        status: "Extended to 2027",
        impact: "Tiered tax exemptions supporting mass-market affordability; smart peak-shaving grid incentives for EV owners."
      },
      {
        jurisdiction: "India",
        policy: "PM E-DRIVE Scheme (INR 10,900 Crore)",
        status: "Rollout 2024-2026",
        impact: "Targeted support for 2.48 million 2-wheelers, 316,000 3-wheelers, 14,000 e-buses, and 72,000 public chargers."
      }
    ]
  },

  // Persona Presets and Strategic Context
  personas: {
    strategy: {
      id: "strategy",
      name: "Emily Johnson",
      title: "EV Market Strategy Director",
      avatar: "EJ",
      avatarBg: "from-blue-600 to-indigo-600",
      roleSummary: "Prioritizing vehicle segment expansion, pricing elasticity, and customer satisfaction to outpace market growth.",
      primaryMetrics: ["Total Sales", "Top Segment (SUVs)", "Satisfaction Index", "Fast-Growth 2W/Trucks"],
      defaultFilters: { category: "all", region: "all", chemistry: "all", price: "all", year: "2026" },
      briefing: {
        headline: "SUV dominance holds at 48.6%, while Urban 2-Wheelers and Fleet Vans present highest margin expansion opportunities.",
        bullets: [
          "Electric SUVs remain the primary profit engine with 8.46M units globally and a 91.2 satisfaction index.",
          "High-growth segment alert: Commercial Delivery Vans (+13.6% YoY) and Urban 2-Wheelers (+18.1% YoY) show accelerating corporate fleet transitions.",
          "Pricing inflection: Sub-$30,000 mass-market models now represent 34% of consumer inquiries, demanding accelerated LFP pack integration."
        ],
        actionItem: "Recommend allocating 35% of R&D capex to next-gen modular compact platforms to defend against sub-$25k Asian imports."
      }
    },
    bi: {
      id: "bi",
      name: "David Chen",
      title: "Automotive Business Intelligence Manager",
      avatar: "DC",
      avatarBg: "from-emerald-600 to-teal-600",
      roleSummary: "Tracking OEM market share shifts, global gigafactory production capacity, and supply chain concentration risks.",
      primaryMetrics: ["Market Share HHI", "Manufacturing Hub Concentration", "Charger-to-Vehicle Ratio", "OEM Volume Growth"],
      defaultFilters: { category: "all", region: "all", chemistry: "all", price: "all", year: "2026" },
      briefing: {
        headline: "China solidifies 64% production dominance; BYD expands volume lead while Western OEMs pivot toward 800V architectures.",
        bullets: [
          "BYD commands 21.8% global EV volume, powered by complete vertical supply chain integration down to lithium refining.",
          "Infrastructure bottlenecks: US charger-to-EV ratio (1:18.4) lags behind China (1:7.2) and South Korea (1:4.2), capping non-Tesla adoption rates.",
          "Western OEM transition: Hyundai-Kia and VW Group are closing the technology gap with 800V fast-charging platforms delivering under 20-minute charges."
        ],
        actionItem: "Monitor geopolitical tariff impacts in EU/US markets; advise hedging supply chains via Southeast Asia assembly corridors."
      }
    },
    research: {
      id: "research",
      name: "Dr. Sarah Williams",
      title: "Sustainable Mobility Research Analyst",
      avatar: "SW",
      avatarBg: "from-purple-600 to-pink-600",
      roleSummary: "Evaluating battery chemistry energy densities, lifecycle carbon accounting, recycling yields, and clean energy policy mandates.",
      primaryMetrics: ["Battery Cost ($84/kWh)", "LFP vs NMC Share", "Emissions Avoided (48.2 Mt)", "Recycling Recovery (>92%)"],
      defaultFilters: { category: "all", region: "all", chemistry: "all", price: "all", year: "2026" },
      briefing: {
        headline: "LFP and Sodium-Ion reduce cobalt dependence to under 47% of global sales; Solid-State enters pilot vehicle fleets.",
        bullets: [
          "Cobalt-free chemistries (LFP & Sodium-Ion) account for 49.3% of global volume in 2026, mitigating ethical supply bottlenecks.",
          "Solid-State breakthrough: 440 Wh/kg cells deliver 780 km range with 10-minute ultra-fast charging, entering flagship test fleets (VW/NIO).",
          "Lifecycle climate impact: EVs powered by clean grids produce 73% fewer lifetime carbon emissions compared to equivalent internal combustion vehicles."
        ],
        actionItem: "Standardize on EU Battery Passport data pipelines and mandate 95%+ closed-loop hydrometallurgical recycling compliance."
      }
    }
  }
};

// Export to window
if (typeof window !== "undefined") {
  window.EV_DATA = EV_DATA;
}

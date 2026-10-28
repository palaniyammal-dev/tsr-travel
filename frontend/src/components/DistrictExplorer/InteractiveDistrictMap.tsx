"use client";

import React, { useEffect, useRef, useState } from "react";
import { TouristDestination, District } from "@/lib/districtApi";
import { MapPin, Navigation, Layers, Compass, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface InteractiveDistrictMapProps {
  destinations: TouristDestination[];
  selectedDistrict: District | null;
  selectedDestination: TouristDestination | null;
  onSelectDestination: (dest: TouristDestination) => void;
  routePolyline?: [number, number][];
  routeStops?: TouristDestination[];
  onAddToRoute?: (dest: TouristDestination) => void;
  onOpenDetails?: (dest: TouristDestination) => void;
  language: "en" | "ta";
}

// Category color palette for custom SVG map markers
const CATEGORY_COLORS: Record<string, { bg: string; border: string; icon: string }> = {
  Temples: { bg: "#d97706", border: "#f59e0b", icon: "🛕" },
  Heritage: { bg: "#0b6e4f", border: "#10b981", icon: "🏛️" },
  "Hill Stations": { bg: "#059669", border: "#34d399", icon: "⛰️" },
  Waterfalls: { bg: "#0284c7", border: "#38bdf8", icon: "🌊" },
  Dams: { bg: "#0891b2", border: "#22d3ee", icon: "💧" },
  Beaches: { bg: "#2563eb", border: "#60a5fa", icon: "🏖️" },
  "Picnic Spots": { bg: "#e11d48", border: "#fb7185", icon: "🌳" },
  Default: { bg: "#4b5563", border: "#9ca3af", icon: "📍" },
};

export default function InteractiveDistrictMap({
  destinations,
  selectedDistrict,
  selectedDestination,
  onSelectDestination,
  routePolyline,
  routeStops = [],
  onAddToRoute,
  onOpenDetails,
  language,
}: InteractiveDistrictMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersLayerRef = useRef<any>(null);
  const polylineLayerRef = useRef<any>(null);
  const startMarkerRef = useRef<any>(null);

  const [mapLoaded, setMapLoaded] = useState(false);
  const [tileLayerType, setTileLayerType] = useState<"standard" | "satellite">("standard");

  // Dynamic initialization of Leaflet only in browser
  useEffect(() => {
    let isMounted = true;

    async function initLeaflet() {
      if (!mapContainerRef.current || mapInstanceRef.current) return;

      const L = (await import("leaflet")).default;

      if (!isMounted || !mapContainerRef.current) return;

      // Default center: Tiruchirappalli (Tamil Nadu Central Hub)
      const initialLat =
        (typeof selectedDistrict?.lat === "number" && !isNaN(selectedDistrict.lat) && selectedDistrict.lat) ||
        (typeof selectedDistrict?.center_lat === "number" && !isNaN(selectedDistrict.center_lat) && selectedDistrict.center_lat) ||
        10.7905;
      const initialLng =
        (typeof selectedDistrict?.lng === "number" && !isNaN(selectedDistrict.lng) && selectedDistrict.lng) ||
        (typeof selectedDistrict?.center_lng === "number" && !isNaN(selectedDistrict.center_lng) && selectedDistrict.center_lng) ||
        78.7047;
      const initialZoom = selectedDistrict ? 10 : 8;

      const map = L.map(mapContainerRef.current, {
        center: [initialLat, initialLng],
        zoom: initialZoom,
        zoomControl: false, // Custom zoom buttons
        attributionControl: true,
      });

      // Standard OpenStreetMap Tile Layer
      const streetLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | TSR Travelling',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
      (map as any)._streetLayer = streetLayer;

      // Marker Group
      const markersLayer = L.layerGroup().addTo(map);
      markersLayerRef.current = markersLayer;

      // Polyline Group
      const polylineLayer = L.layerGroup().addTo(map);
      polylineLayerRef.current = polylineLayer;

      setMapLoaded(true);
    }

    initLeaflet();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Handle Tile Layer Switch (Standard vs Carto/Terrain)
  const toggleMapTile = async () => {
    if (!mapInstanceRef.current) return;
    const L = (await import("leaflet")).default;
    const map = mapInstanceRef.current;

    if (tileLayerType === "standard") {
      if ((map as any)._streetLayer) map.removeLayer((map as any)._streetLayer);
      const satLayer = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        attribution: "Tiles &copy; Esri &mdash; TSR Travelling Satellite View",
        maxZoom: 18,
      }).addTo(map);
      (map as any)._satLayer = satLayer;
      setTileLayerType("satellite");
    } else {
      if ((map as any)._satLayer) map.removeLayer((map as any)._satLayer);
      const streetLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);
      (map as any)._streetLayer = streetLayer;
      setTileLayerType("standard");
    }
  };

  // Center on Tiruchirappalli TSR Hub or Selected District
  const resetMapCenter = () => {
    if (!mapInstanceRef.current) return;
    const targetLat =
      (typeof selectedDistrict?.lat === "number" && !isNaN(selectedDistrict.lat) && selectedDistrict.lat) ||
      (typeof selectedDistrict?.center_lat === "number" && !isNaN(selectedDistrict.center_lat) && selectedDistrict.center_lat) ||
      10.7905;
    const targetLng =
      (typeof selectedDistrict?.lng === "number" && !isNaN(selectedDistrict.lng) && selectedDistrict.lng) ||
      (typeof selectedDistrict?.center_lng === "number" && !isNaN(selectedDistrict.center_lng) && selectedDistrict.center_lng) ||
      78.7047;
    mapInstanceRef.current.setView([targetLat, targetLng], selectedDistrict ? 11 : 8, {
      animate: true,
    });
  };

  // Zoom controls
  const handleZoom = (delta: number) => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.setZoom(mapInstanceRef.current.getZoom() + delta);
  };

  // Render Markers and Route when data changes
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current || !markersLayerRef.current) return;

    let isSubscribed = true;

    async function updateMarkers() {
      const L = (await import("leaflet")).default;
      if (!isSubscribed || !markersLayerRef.current) return;

      markersLayerRef.current.clearLayers();

      // Plot Hub Start Marker: Kattur, Trichy
      const hubIcon = L.divIcon({
        className: "custom-hub-icon",
        html: `
          <div style="background: #0b6e4f; color: white; border: 2px solid #d4af37; border-radius: 9999px; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.3); font-size: 16px;">
            🚗
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
        popupAnchor: [0, -18],
      });

      const hubMarker = L.marker([10.7905, 78.7047], { icon: hubIcon })
        .bindPopup(`
          <div style="font-family: inherit; font-size: 13px; min-width: 200px;">
            <div style="font-weight: 700; color: #0b6e4f; margin-bottom: 2px;">TSR Travelling Central Hub</div>
            <div style="font-size: 11px; color: #666;">Kattur, Trichy • +91 79048 72119</div>
            <div style="margin-top: 6px; font-size: 11px; background: #e6f4ea; color: #137333; padding: 4px 8px; border-radius: 6px; font-weight: 600;">
              Starting point for Tamil Nadu Circuits
            </div>
          </div>
        `);
      markersLayerRef.current.addLayer(hubMarker);
      startMarkerRef.current = hubMarker;

      // Plot Tourist Destinations
      const bounds: any[] = [[10.7905, 78.7047]];

      destinations.forEach((dest) => {
        if (
          !dest ||
          typeof dest.lat !== "number" ||
          typeof dest.lng !== "number" ||
          isNaN(dest.lat) ||
          isNaN(dest.lng)
        ) {
          return;
        }
        bounds.push([dest.lat, dest.lng]);

        const catTheme = CATEGORY_COLORS[dest.category] || CATEGORY_COLORS.Default;
        const isSelected = selectedDestination?.id === dest.id;
        const isInRoute = routeStops.some((s) => s.id === dest.id);

        const customMarkerHtml = `
          <div style="
            background: ${isSelected ? "#d4af37" : catTheme.bg};
            color: white;
            border: ${isSelected ? "3px solid #08120d" : "2px solid #ffffff"};
            border-radius: 50%;
            width: ${isSelected ? "38px" : "32px"};
            height: ${isSelected ? "38px" : "32px"};
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: ${isSelected ? "18px" : "15px"};
            box-shadow: 0 4px 14px rgba(0,0,0,0.35);
            transition: all 0.2s ease;
            position: relative;
          ">
            ${catTheme.icon}
            ${isInRoute ? '<span style="position: absolute; top: -4px; right: -4px; background: #d4af37; color: #08120d; border-radius: 50%; width: 14px; height: 14px; font-size: 10px; font-weight: 900; display: flex; align-items: center; justify-content: center; border: 1px solid #fff;">✓</span>' : ""}
          </div>
        `;

        const icon = L.divIcon({
          className: "custom-dest-pin",
          html: customMarkerHtml,
          iconSize: [isSelected ? 38 : 32, isSelected ? 38 : 32],
          iconAnchor: [isSelected ? 19 : 16, isSelected ? 19 : 16],
          popupAnchor: [0, -18],
        });

        const popupContent = `
          <div style="font-family: inherit; width: 220px; padding: 2px;">
            <img src="${dest.image_url}" alt="${dest.name}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />
            <div style="font-weight: 700; font-size: 13px; color: #1c2e24; line-height: 1.2;">
              ${dest.name}
            </div>
            ${dest.tamil_name ? `<div style="font-size: 11px; color: #0b6e4f; font-weight: 600; margin-bottom: 4px;">${dest.tamil_name}</div>` : ""}
            <div style="display: flex; gap: 4px; margin-bottom: 6px;">
              <span style="font-size: 10px; background: #eef2ff; color: #3730a3; padding: 2px 6px; border-radius: 4px; font-weight: 600;">
                ${dest.category}
              </span>
              <span style="font-size: 10px; background: #fef3c7; color: #92400e; padding: 2px 6px; border-radius: 4px; font-weight: 600;">
                ⏱️ ${dest.ideal_duration || "1.5 Hrs"}
              </span>
            </div>
            <div style="font-size: 11px; color: #555; line-height: 1.3; margin-bottom: 8px;">
              ${dest.description.slice(0, 95)}...
            </div>
            <div style="display: flex; gap: 6px;">
              <a href="${dest.google_maps_url}" target="_blank" rel="noopener noreferrer" style="flex: 1; text-align: center; background: #0b6e4f; color: white; padding: 5px 8px; border-radius: 6px; font-size: 11px; font-weight: 600; text-decoration: none;">
                Directions ↗
              </a>
            </div>
          </div>
        `;

        const marker = L.marker([dest.lat, dest.lng], { icon })
          .bindPopup(popupContent)
          .on("click", () => {
            onSelectDestination(dest);
          });

        markersLayerRef.current.addLayer(marker);
      });

      // Adjust viewport bounds safely
      if (mapInstanceRef.current) {
        const dLat =
          typeof selectedDistrict?.lat === "number" && !isNaN(selectedDistrict.lat)
            ? selectedDistrict.lat
            : typeof selectedDistrict?.center_lat === "number" && !isNaN(selectedDistrict.center_lat)
            ? selectedDistrict.center_lat
            : null;

        const dLng =
          typeof selectedDistrict?.lng === "number" && !isNaN(selectedDistrict.lng)
            ? selectedDistrict.lng
            : typeof selectedDistrict?.center_lng === "number" && !isNaN(selectedDistrict.center_lng)
            ? selectedDistrict.center_lng
            : null;

        if (dLat !== null && dLng !== null) {
          mapInstanceRef.current.setView([dLat, dLng], 10, { animate: true });
        } else if (bounds.length > 1) {
          mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 });
        } else {
          mapInstanceRef.current.setView([10.7905, 78.7047], 8, { animate: true });
        }
      }
    }

    updateMarkers();

    return () => {
      isSubscribed = false;
    };
  }, [destinations, selectedDistrict, selectedDestination, routeStops, mapLoaded]);

  // Render Route Polyline
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current || !polylineLayerRef.current) return;

    let isSubscribed = true;

    async function updatePolyline() {
      const L = (await import("leaflet")).default;
      if (!isSubscribed || !polylineLayerRef.current) return;

      polylineLayerRef.current.clearLayers();

      if (routePolyline && routePolyline.length > 1) {
        // Outer glow polyline
        const glowLine = L.polyline(routePolyline, {
          color: "#d4af37",
          weight: 7,
          opacity: 0.6,
          lineJoin: "round",
        });

        // Inner solid road line
        const roadLine = L.polyline(routePolyline, {
          color: "#0b6e4f",
          weight: 4,
          opacity: 0.95,
          dashArray: "1, 0",
        });

        polylineLayerRef.current.addLayer(glowLine);
        polylineLayerRef.current.addLayer(roadLine);

        // Zoom map to show entire planned road circuit
        mapInstanceRef.current.fitBounds(roadLine.getBounds(), { padding: [50, 50] });
      }
    }

    updatePolyline();

    return () => {
      isSubscribed = false;
    };
  }, [routePolyline, mapLoaded]);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-primary/25 dark:border-secondary/25 shadow-2xl bg-zinc-100 dark:bg-zinc-950">
      {/* Map Container Element */}
      <div
        ref={mapContainerRef}
        className="w-full h-[400px] sm:h-[480px] lg:h-[580px] z-10 transition-all"
        style={{ minHeight: "380px" }}
      />

      {/* Top Map Floating Bar: District badge & Legend */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 pointer-events-none">
        <div className="pointer-events-auto bg-white/90 dark:bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-primary/20 dark:border-secondary/30 shadow-lg flex items-center gap-2 text-xs font-semibold text-foreground-theme">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>
            {selectedDistrict ? (
              <>
                {selectedDistrict.name} {selectedDistrict.tamil_name ? `• ${selectedDistrict.tamil_name}` : ""}
              </>
            ) : (
              (language === "ta" ? "தமிழ்நாடு முழுவதும் (38 மாவட்டங்கள்)" : "Tamil Nadu State Tourism Map")
            )}
          </span>
          <span className="text-foreground-theme/50 text-[10px]">
            ({destinations.length} {language === "ta" ? "தளங்கள்" : "locations"})
          </span>
        </div>

        {routeStops.length > 0 && (
          <div className="pointer-events-auto bg-secondary/90 text-amber-950 px-3 py-1.5 rounded-full shadow-lg text-xs font-bold flex items-center gap-1.5 animate-bounce">
            <Navigation className="w-3.5 h-3.5" />
            <span>
              {routeStops.length} {language === "ta" ? "வழித்தட நிறுத்தங்கள்" : "Stops in Circuit"}
            </span>
          </div>
        )}
      </div>

      {/* Floating Map Custom Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        {/* Toggle Layer Style */}
        <button
          onClick={toggleMapTile}
          type="button"
          title={tileLayerType === "standard" ? "Satellite View" : "Street Map View"}
          className="w-10 h-10 rounded-2xl bg-white/90 dark:bg-black/85 backdrop-blur-md border border-primary/20 dark:border-secondary/20 shadow-lg flex items-center justify-center text-foreground-theme hover:bg-primary hover:text-white transition"
        >
          <Layers className="w-4 h-4" />
        </button>

        {/* Reset View to Trichy HQ */}
        <button
          onClick={resetMapCenter}
          type="button"
          title="Reset View to Trichy Central Hub"
          className="w-10 h-10 rounded-2xl bg-white/90 dark:bg-black/85 backdrop-blur-md border border-primary/20 dark:border-secondary/20 shadow-lg flex items-center justify-center text-foreground-theme hover:bg-primary hover:text-white transition"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Zoom In */}
        <button
          onClick={() => handleZoom(1)}
          type="button"
          title="Zoom In"
          className="w-10 h-10 rounded-2xl bg-white/90 dark:bg-black/85 backdrop-blur-md border border-primary/20 dark:border-secondary/20 shadow-lg flex items-center justify-center text-foreground-theme hover:bg-primary hover:text-white transition font-bold"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        {/* Zoom Out */}
        <button
          onClick={() => handleZoom(-1)}
          type="button"
          title="Zoom Out"
          className="w-10 h-10 rounded-2xl bg-white/90 dark:bg-black/85 backdrop-blur-md border border-primary/20 dark:border-secondary/20 shadow-lg flex items-center justify-center text-foreground-theme hover:bg-primary hover:text-white transition font-bold"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Category Marker Legend Bar */}
      <div className="absolute bottom-3 left-3 right-3 z-20 overflow-x-auto no-scrollbar pointer-events-none">
        <div className="pointer-events-auto inline-flex items-center gap-2 bg-white/90 dark:bg-black/85 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-primary/15 dark:border-secondary/20 shadow-xl text-[11px] text-foreground-theme">
          <span className="font-semibold text-primary dark:text-secondary whitespace-nowrap">
            {language === "ta" ? "வரைபட குறிகள்:" : "Marker Guide:"}
          </span>
          <span className="inline-flex items-center gap-1 whitespace-nowrap">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d97706]" /> {language === "ta" ? "கோயில்கள்" : "Temples"}
          </span>
          <span className="inline-flex items-center gap-1 whitespace-nowrap">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0b6e4f]" /> {language === "ta" ? "வரலாறு" : "Heritage"}
          </span>
          <span className="inline-flex items-center gap-1 whitespace-nowrap">
            <span className="w-2.5 h-2.5 rounded-full bg-[#059669]" /> {language === "ta" ? "மலைப்பகுதி" : "Hills"}
          </span>
          <span className="inline-flex items-center gap-1 whitespace-nowrap">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7]" /> {language === "ta" ? "அருவிகள்" : "Waterfalls"}
          </span>
          <span className="inline-flex items-center gap-1 whitespace-nowrap">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0891b2]" /> {language === "ta" ? "அணைகள்" : "Dams"}
          </span>
          <span className="inline-flex items-center gap-1 whitespace-nowrap">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb]" /> {language === "ta" ? "கடற்கரை" : "Beaches"}
          </span>
          <span className="inline-flex items-center gap-1 whitespace-nowrap">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e11d48]" /> {language === "ta" ? "பூங்காக்கள்" : "Picnic"}
          </span>
        </div>
      </div>
    </div>
  );
}

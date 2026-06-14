"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Search, MapPin, Phone, Mail, Clock, ExternalLink, Navigation, Compass, X } from "lucide-react";

interface Store {
  id: string;
  title: string;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  lat: string;
  lng: string;
  phone: string;
  email: string;
  open_hours: string;
  distance?: number; // Calculated on-the-fly in km
}

export default function StoreLocator() {
  const [stores, setStores] = useState<Store[]>([]);
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  // User geolocation state
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [calculatingLocation, setCalculatingLocation] = useState(false);
  const [sortByDistance, setSortByDistance] = useState(false);

  // Mobile views: "list" | "map"
  const [mobileView, setMobileView] = useState<"list" | "map">("list");

  // Details Modal
  const [modalStore, setModalStore] = useState<Store | null>(null);

  // Stylesheet & Map load states
  const [cssLoaded, setCssLoaded] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  // Map Refs
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersGroupRef = useRef<any>(null);
  const leafletRef = useRef<any>(null);

  // Fetch Store Data
  useEffect(() => {
    fetch("/data/store.json")
      .then((res) => res.json())
      .then((data: any[]) => {
        // Normalize fields
        const parsed = data.map((item) => ({
          id: item.id || Math.random().toString(),
          title: item.title || "M Baazar Store",
          street: item.street || "",
          city: item.city || "",
          state: item.state || "",
          postal_code: item.postal_code || "",
          lat: item.lat || "0.0",
          lng: item.lng || "0.0",
          phone: item.phone || "",
          email: item.email || "",
          open_hours: item.open_hours || "",
        }));
        setStores(parsed);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading store data:", err);
        setLoading(false);
      });
  }, []);

  // Load Leaflet Stylesheet dynamically
  useEffect(() => {
    if (typeof window !== "undefined") {
      const linkId = "leaflet-css";
      const existing = document.getElementById(linkId);
      if (existing) {
        setCssLoaded(true);
        return;
      }

      const link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      link.onload = () => setCssLoaded(true);
      document.head.appendChild(link);
    }
  }, []);

  // Compute states lists
  const availableStates = useMemo(() => {
    const states = new Set<string>();
    stores.forEach((s) => {
      if (s.state) {
        states.add(s.state.toUpperCase().trim());
      }
    });
    return Array.from(states).sort();
  }, [stores]);

  // Calculate distance between two coordinates in kilometers using Haversine formula
  const getHaversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Trigger Geolocate User
  const geolocateUser = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setCalculatingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setSortByDistance(true);
        setCalculatingLocation(false);
      },
      (err) => {
        console.error("Geolocation error:", err);
        alert("Failed to retrieve your location. Please check your permissions.");
        setCalculatingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  };

  // Filter & Sort Logic
  useEffect(() => {
    let result = [...stores];

    // Filter by State
    if (selectedState) {
      result = result.filter(
        (s) => s.state.toUpperCase().trim() === selectedState.toUpperCase().trim()
      );
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.city.toLowerCase().includes(q) ||
          s.street.toLowerCase().includes(q) ||
          s.state.toLowerCase().includes(q)
      );
    }

    // Calculate Distance if userCoords available
    if (userCoords) {
      result = result.map((s) => {
        const latVal = parseFloat(s.lat);
        const lngVal = parseFloat(s.lng);
        if (latVal !== 0 && lngVal !== 0 && !isNaN(latVal) && !isNaN(lngVal)) {
          return {
            ...s,
            distance: getHaversineDistance(userCoords.lat, userCoords.lng, latVal, lngVal),
          };
        }
        return s;
      });

      // Sort by Proximity
      if (sortByDistance) {
        result.sort((a, b) => {
          if (a.distance === undefined) return 1;
          if (b.distance === undefined) return -1;
          return a.distance - b.distance;
        });
      }
    }

    setFilteredStores(result);
  }, [stores, searchQuery, selectedState, userCoords, sortByDistance]);

  // Open hours status calculator
  const checkOpenStatus = (hoursJson: string) => {
    try {
      if (!hoursJson) return { status: "Open Now", isOpen: true };
      const parsed = JSON.parse(hoursJson);
      const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
      const now = new Date();
      const currentDay = days[now.getDay()];
      const dayHours = parsed[currentDay];

      if (!dayHours || !dayHours[0]) {
        return { status: "Open Now", isOpen: true }; // default fallback
      }

      const timeRange = dayHours[0]; // e.g. "10:00 AM - 09:00 PM"
      const parts = timeRange.split(" - ");
      if (parts.length !== 2) return { status: "Open Now", isOpen: true };

      const parseTime = (tStr: string) => {
        const [time, modifier] = tStr.split(" ");
        let [hours, minutes] = time.split(":").map(Number);
        if (modifier === "PM" && hours < 12) hours += 12;
        if (modifier === "AM" && hours === 12) hours = 0;
        return hours * 60 + minutes;
      };

      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      const startMinutes = parseTime(parts[0]);
      const endMinutes = parseTime(parts[1]);

      const isOpen = currentMinutes >= startMinutes && currentMinutes <= endMinutes;
      return {
        status: isOpen ? "Open Now" : "Closed",
        isOpen,
        timings: timeRange,
      };
    } catch (e) {
      return { status: "Open Now", isOpen: true };
    }
  };

  // Handle active card selection / map centering
  const handleSelectStore = (store: Store, animateMap = true) => {
    setSelectedStore(store);

    // Smooth scroll list card into view
    const cardEl = document.getElementById(`store-card-${store.id}`);
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    // Centering Map
    const latVal = parseFloat(store.lat);
    const lngVal = parseFloat(store.lng);
    if (
      mapInstanceRef.current &&
      latVal !== 0 &&
      lngVal !== 0 &&
      !isNaN(latVal) &&
      !isNaN(lngVal) &&
      animateMap
    ) {
      mapInstanceRef.current.setView([latVal, lngVal], 15, {
        animate: true,
        duration: 1.0,
      });

      // Find the marker corresponding to this store and open its popup
      if (markersGroupRef.current) {
        markersGroupRef.current.eachLayer((marker: any) => {
          if (marker.options.storeId === store.id) {
            marker.openPopup();
          }
        });
      }
    }
  };

  // 1. Initialize Map once
  useEffect(() => {
    if (loading || !cssLoaded || !mapContainerRef.current) return;

    let activeMap: any = null;

    const initMap = async () => {
      const container = mapContainerRef.current;
      if (!container) return;

      const L = await import("leaflet");
      leafletRef.current = L;

      activeMap = L.map(container, {
        center: [22.9734, 78.6569], // Middle of India
        zoom: 5,
        zoomControl: false,
        scrollWheelZoom: true,
      });
      mapInstanceRef.current = activeMap;

      // Add Light Theme Map Tiles
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20,
      }).addTo(activeMap);

      // Add custom zoom controls
      L.control.zoom({ position: "bottomright" }).addTo(activeMap);

      // Create Markers Feature Group
      markersGroupRef.current = L.featureGroup().addTo(activeMap);
      setMapReady(true);
    };

    initMap();

    return () => {
      if (activeMap) {
        try {
          activeMap.remove();
        } catch (e) {
          console.error("Leaflet cleanup error:", e);
        }
        mapInstanceRef.current = null;
        markersGroupRef.current = null;
        setMapReady(false);
      }
    };
  }, [loading, cssLoaded]);

  // 2. Update Markers when stores/selections change
  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current || !markersGroupRef.current || !leafletRef.current) return;

    const L = leafletRef.current;
    const map = mapInstanceRef.current;
    const markersGroup = markersGroupRef.current;

    markersGroup.clearLayers();

    // Filter out stores without coordinates
    const validStores = filteredStores.filter((s) => {
      const latVal = parseFloat(s.lat);
      const lngVal = parseFloat(s.lng);
      return latVal !== 0 && lngVal !== 0 && !isNaN(latVal) && !isNaN(lngVal);
    });

    // Custom red marker pin - Proper pointer shape, no glow/ping animation
    const redPinIcon = L.divIcon({
      html: `
        <svg viewBox="0 0 24 30" width="30" height="38" style="color: #dc2626; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));">
          <path fill="currentColor" stroke="#fff" stroke-width="1.5" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>`,
      className: "custom-red-pin",
      iconSize: [30, 38],
      iconAnchor: [15, 38],
      popupAnchor: [0, -38],
    });

    // Active state pin - Proper pointer shape, slightly larger, no glow/ping animation
    const activePinIcon = (storeId: string) => {
      const isActive = selectedStore?.id === storeId;
      if (!isActive) return redPinIcon;
      return L.divIcon({
        html: `
          <svg viewBox="0 0 24 30" width="36" height="44" style="color: #b91c1c; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.25));">
            <path fill="currentColor" stroke="#fff" stroke-width="2" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>`,
        className: "custom-active-pin",
        iconSize: [36, 44],
        iconAnchor: [18, 44],
        popupAnchor: [0, -44],
      });
    };

    // Add markers
    const bounds: any[] = [];
    validStores.forEach((s) => {
      const latVal = parseFloat(s.lat);
      const lngVal = parseFloat(s.lng);

      const marker = L.marker([latVal, lngVal], {
        icon: activePinIcon(s.id),
        storeId: s.id,
      } as any);

      // Marker Popup
      marker.bindPopup(`
        <div class="p-1 font-sans">
          <h4 class="font-bold text-zinc-950 text-sm leading-tight">${s.title}</h4>
          <p class="text-[11px] text-zinc-500 mt-1 max-w-[200px] leading-relaxed">${s.street}</p>
        </div>
      `);

      // Click interaction: highlight card & open details modal directly
      marker.on("click", () => {
        handleSelectStore(s, false);
        setModalStore(s);
      });

      marker.addTo(markersGroup);
      bounds.push([latVal, lngVal]);
    });

    // Fit map to markers bounds
    if (bounds.length > 0) {
      if (bounds.length === 1) {
        map.setView(bounds[0], 14, { animate: true });
      } else {
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
      }
    }
  }, [mapReady, filteredStores, selectedStore]);

  // Handle map resizing / invalidating layout on mobile view toggle
  useEffect(() => {
    if (mapInstanceRef.current) {
      setTimeout(() => {
        mapInstanceRef.current.invalidateSize();
      }, 150);
    }
  }, [mobileView]);

  return (
    <section id="outlets" className="py-16 sm:py-24 bg-white text-zinc-950 w-full overflow-hidden border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-10 mt-20 space-y-3">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Find a <span className="text-red-600">M Baazar</span> Near You
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto text-sm sm:text-base font-normal">
            Discover and explore nearby M Baazar outlets to browse our latest premium fashion collections.
          </p>
        </div>

        {/* Search, Filter & Controls Panel */}
        <div className="bg-zinc-50/50 border border-red-300 rounded-3xl p-5 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">

            {/* Search Input */}
            <div className="relative col-span-1 md:col-span-5">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                <Search className="w-5 h-5" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search store, city, or locality..."
                className="w-full pl-11 pr-4 py-3 bg-white border border-zinc-200/80 rounded-2xl text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-medium"
              />
            </div>

            {/* State Dropdown */}
            <div className="col-span-1 md:col-span-4 relative">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-zinc-200/80 rounded-2xl text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-medium appearance-none"
              >
                <option value="">All States</option>
                {availableStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-500">
                <MapPin className="w-4 h-4" />
              </div>
            </div>

            {/* Locate Me button */}
            <button
              onClick={geolocateUser}
              disabled={calculatingLocation}
              className="col-span-1 md:col-span-3 flex items-center justify-center gap-2.5 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-zinc-900 transition-all duration-300 font-bold text-xs uppercase tracking-wider shadow-sm cursor-pointer disabled:opacity-60"
            >
              <Compass className={`w-4 h-4 ${calculatingLocation ? "animate-spin" : ""}`} />
              {calculatingLocation ? "Locating..." : "Stores Near Me"}
            </button>
          </div>

          {/* Badge indicator */}
          <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-zinc-500">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-red-50 text-red-600 font-bold">
              {filteredStores.length} {filteredStores.length === 1 ? "Store" : "Stores"} Found
            </span>
            {sortByDistance && (
              <span className="text-zinc-400">| Sorted by closest location</span>
            )}
          </div>
        </div>

        {/* Mobile View Toggle Tabs */}
        <div className="flex md:hidden border border-zinc-100 rounded-2xl overflow-hidden mb-6 bg-zinc-50 p-1 shadow-inner">
          <button
            onClick={() => setMobileView("list")}
            className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider transition-all rounded-xl cursor-pointer ${mobileView === "list" ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-500 hover:text-zinc-800"
              }`}
          >
            List View ({filteredStores.length})
          </button>
          <button
            onClick={() => setMobileView("map")}
            className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider transition-all rounded-xl cursor-pointer ${mobileView === "map" ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-500 hover:text-zinc-800"
              }`}
          >
            Map View
          </button>
        </div>

        {/* Main Content Layout Grid - Fixed height on desktop to enable internal list scrolling and prevent map collapse */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

          {/* Left Panel: Store List (Visible on desktop, or mobile when List View is active) */}
          <div
            className={`col-span-1 px-1 md:col-span-4 flex flex-col h-[500px] md:h-[650px] overflow-hidden ${mobileView === "list" ? "flex" : "hidden md:flex"}`}
          >
            <div className="flex-1 overflow-y-auto px-2 py-2 space-y-4 scrollbar-thin scrollbar-thumb-zinc-200">
              {loading ? (
                // Skeletons
                Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx} className="bg-zinc-50 rounded-3xl p-5 border border-zinc-100 animate-pulse space-y-3">
                    <div className="h-5 bg-zinc-200 rounded w-2/3"></div>
                    <div className="h-4 bg-zinc-200 rounded w-5/6"></div>
                    <div className="h-4 bg-zinc-200 rounded w-1/2"></div>
                  </div>
                ))
              ) : filteredStores.length === 0 ? (
                // Empty State
                <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-zinc-50/50 border border-zinc-100 border-dashed rounded-3xl">
                  <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 mb-3">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-zinc-800 text-sm">No Stores Found</h4>
                  <p className="text-zinc-400 text-xs mt-1 max-w-[200px]">
                    Try adjusting your search filters or check another state.
                  </p>
                </div>
              ) : (
                // Store Cards
                filteredStores.map((store) => {
                  const isSelected = selectedStore?.id === store.id;
                  const { status, isOpen, timings } = checkOpenStatus(store.open_hours);
                  return (
                    <div
                      key={store.id}
                      id={`store-card-${store.id}`}
                      onClick={() => handleSelectStore(store)}
                      className={`group bg-white rounded-3xl p-5 border transition-all duration-300 shadow-sm cursor-pointer relative ${isSelected
                        ? "border-red-500 ring-1 ring-red-500 bg-red-50/10"
                        : "border-zinc-100/80 hover:border-zinc-200/80 hover:shadow-md"
                        }`}
                    >
                      {/* State Badge & Proximity */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-bold tracking-wider uppercase bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-full">
                          {store.state}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {store.distance !== undefined && (
                            <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                              {store.distance.toFixed(1)} km away
                            </span>
                          )}
                          <span
                            className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full ${isOpen ? "bg-green-50 text-green-600" : "bg-zinc-100 text-zinc-400"
                              }`}
                          >
                            {status}
                          </span>
                        </div>
                      </div>

                      {/* Store Name */}
                      <h3 className="text-base font-extrabold text-red-600 group-hover:text-red-600 transition-colors leading-tight mb-2">
                        {store.title}
                      </h3>

                      {/* Address */}
                      <p className="text-xs text-zinc-500 font-normal leading-relaxed mb-4">
                        {store.street}
                      </p>

                      {/* Info lines */}
                      <div className="space-y-1.5 text-xs text-zinc-600 font-medium">
                        {store.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-zinc-400" />
                            <span>{store.phone}</span>
                          </div>
                        )}
                        {timings && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-zinc-400" />
                            <span>{timings}</span>
                          </div>
                        )}
                      </div>

                      {/* Card Action Buttons */}
                      <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-zinc-100">
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center justify-center gap-1 py-2 bg-zinc-50 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all text-[11px] font-bold text-zinc-700 text-center"
                        >
                          <Navigation className="w-3 h-3" />
                          <span>Route</span>
                        </a>

                        {store.phone ? (
                          <a
                            href={`tel:${store.phone}`}
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center justify-center gap-1 py-2 bg-zinc-50 rounded-xl hover:bg-zinc-100 transition-all text-[11px] font-bold text-zinc-700 text-center"
                          >
                            <Phone className="w-3 h-3" />
                            <span>Call</span>
                          </a>
                        ) : (
                          <div className="bg-zinc-50/50 rounded-xl py-2 text-[11px] text-zinc-300 font-bold text-center select-none">
                            No Phone
                          </div>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setModalStore(store);
                          }}
                          className="flex items-center justify-center gap-1 py-2 bg-zinc-950 text-white rounded-xl hover:bg-zinc-900 transition-all text-[11px] font-bold text-center"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Details</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Panel: Interactive Map (Visible on desktop, or mobile when Map View is active) */}
          <div
            className={`col-span-1 md:col-span-8 h-[500px] md:h-[650px] rounded-3xl overflow-hidden border border-zinc-100 relative shadow-sm ${mobileView === "map" ? "block" : "hidden md:block"
              }`}
          >
            <div ref={mapContainerRef} className="w-full h-full z-10" />

            {/* Offline/Loading placeholder overlay */}
            {loading && (
              <div className="absolute inset-0 bg-zinc-50/90 z-20 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-zinc-500 text-xs font-semibold">Loading Map...</p>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* View Details Modal */}
      {modalStore && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm transition-all duration-300 animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden border border-zinc-100 p-6 space-y-6">

            {/* Modal Close Button */}
            <button
              onClick={() => setModalStore(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header / State */}
            <div>
              <span className="inline-block text-[10px] font-bold tracking-wider uppercase bg-zinc-100 text-zinc-600 px-3 py-1 rounded-full mb-3">
                {modalStore.state} Outlet
              </span>
              <h3 className="text-xl font-extrabold text-zinc-950 leading-tight">
                {modalStore.title}
              </h3>
            </div>

            {/* Address */}
            <div className="flex gap-3 items-start">
              <MapPin className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Address</h4>
                <p className="text-sm text-zinc-700 font-medium leading-relaxed">
                  {modalStore.street}
                </p>
                {modalStore.postal_code && (
                  <p className="text-sm text-zinc-400 font-medium mt-1">PIN: {modalStore.postal_code}</p>
                )}
              </div>
            </div>

            {/* Contact details */}
            <div className="grid grid-cols-2 gap-4 border-t border-b border-zinc-100 py-5">
              {modalStore.phone && (
                <div className="flex gap-2.5 items-center">
                  <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-500">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Phone</h5>
                    <a href={`tel:${modalStore.phone}`} className="text-xs font-semibold text-zinc-700 hover:underline">
                      {modalStore.phone}
                    </a>
                  </div>
                </div>
              )}
              {modalStore.email && (
                <div className="flex gap-2.5 items-center col-span-2 sm:col-span-1">
                  <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Email</h5>
                    <a href={`mailto:${modalStore.email}`} className="text-xs font-semibold text-zinc-700 hover:underline">
                      {modalStore.email}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Opening Timings */}
            <div className="flex gap-3 items-start">
              <Clock className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
              <div className="w-full">
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Opening Hours</h4>
                <div className="space-y-1.5 text-xs font-medium text-zinc-700">
                  {modalStore.open_hours ? (
                    (() => {
                      try {
                        const parsed = JSON.parse(modalStore.open_hours);
                        return Object.entries(parsed).map(([day, hrs]: any) => {
                          const isToday = new Date().getDay() === ["sun", "mon", "tue", "wed", "thu", "fri", "sat"].indexOf(day);
                          return (
                            <div key={day} className={`flex justify-between py-0.5 ${isToday ? "font-bold text-red-600" : ""}`}>
                              <span className="capitalize">{day}</span>
                              <span>{hrs[0]}</span>
                            </div>
                          );
                        });
                      } catch (e) {
                        return <div>10:00 AM - 09:00 PM (Daily)</div>;
                      }
                    })()
                  ) : (
                    <div>10:00 AM - 09:00 PM (Daily)</div>
                  )}
                </div>
              </div>
            </div>

            {/* Directions Action */}
            <div className="pt-2">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${modalStore.lat},${modalStore.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl transition-all duration-300 font-bold text-xs uppercase tracking-wider shadow-sm text-center"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions on Google Maps</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}

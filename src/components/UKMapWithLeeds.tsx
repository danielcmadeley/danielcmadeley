"use client";

import {
  Map,
  MapControls,
  MapMarker,
  MapRoute,
  MarkerContent,
  MarkerPopup,
} from "@/components/ui/map";

// Route: Leeds → Cardiff → London → Oxford ([lng, lat] each)
const ROUTE_COORDINATES: [number, number][] = [
  [-1.5491, 53.8008], // Leeds
  [-3.1791, 51.4816], // Cardiff
  [-0.1276, 51.5074], // London
  [-1.2564, 51.7548], // Oxford
];

const CITIES = [
  { name: "Leeds", longitude: -1.5491, latitude: 53.8008 },
  { name: "Cardiff", longitude: -3.1791, latitude: 51.4816 },
  { name: "London", longitude: -0.1276, latitude: 51.5074 },
  { name: "Oxford", longitude: -1.2564, latitude: 51.7548 },
] as const;

// Bounding box for UK only ([[west, south], [east, north]])
const UK_BOUNDS: [[number, number], [number, number]] = [
  [-8.65, 49.86],
  [1.76, 60.86],
];

export default function UKMapWithLeeds() {
  return (
    <div className="min-h-screen h-screen overflow-hidden w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <Map
        center={[-2.5, 54]}
        zoom={5.5}
        maxBounds={UK_BOUNDS}
        minZoom={5}
      >
        <MapRoute
          coordinates={ROUTE_COORDINATES}
          color="#335D9B"
          width={3}
          opacity={0.9}
        />
        {CITIES.map((city) => (
          <MapMarker
            key={city.name}
            longitude={city.longitude}
            latitude={city.latitude}
          >
            <MarkerContent>
              <div className="h-4 w-4 rounded-full border-2 border-white bg-[#335D9B] shadow-lg" />
            </MarkerContent>
            <MarkerPopup closeButton>
              <div className="text-sm font-medium text-stone-900">{city.name}</div>
            </MarkerPopup>
          </MapMarker>
        ))}
        <MapControls position="bottom-right" showZoom />
      </Map>
    </div>
  );
}

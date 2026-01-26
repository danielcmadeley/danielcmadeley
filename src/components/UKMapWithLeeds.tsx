"use client";

import { useEffect, useState } from "react";
import {
  Map,
  MapControls,
  MapMarker,
  MapRoute,
  MarkerContent,
} from "@/components/ui/map";

// Waypoints: Leeds → Cardiff → London → Oxford ([lng, lat] each)
const WAYPOINTS: [number, number][] = [
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

const CITY_DURATIONS: Record<(typeof CITIES)[number]["name"], string> = {
  Leeds: "3 years",
  Cardiff: "2 years",
  London: "1 year",
  Oxford: "Current",
};

// Bounding box for UK only ([[west, south], [east, north]])
const UK_BOUNDS: [[number, number], [number, number]] = [
  [-8.65, 49.86],
  [1.76, 60.86],
];

/** Fetch road route between waypoints via OSRM public API */
async function fetchRoadRoute(
  waypoints: [number, number][]
): Promise<[number, number][]> {
  const coords = waypoints.map(([lng, lat]) => `${lng},${lat}`).join(";");
  const url = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Route request failed");
  const data = (await res.json()) as {
    code?: string;
    routes?: Array<{ geometry: { coordinates: [number, number][] } }>;
  };
  if (data.code !== "Ok" || !data.routes?.[0]?.geometry?.coordinates) {
    throw new Error("No route returned");
  }
  return data.routes[0].geometry.coordinates;
}

type City = (typeof CITIES)[number];

const panelSection =
  "rounded-lg border border-neutral-700/60 bg-neutral-800/40 p-4";

function CityPanelContent({ city }: { city: City }) {
  if (city.name === "Leeds") {
    return (
      <div className="space-y-4">
        <section className={panelSection}>
          <h3 className="text-stone-100 font-semibold text-base mb-2">
            Leeds Beckett University
          </h3>
          <p className="text-stone-400 text-sm leading-relaxed">
            BEng (Hons) Civil Engineering — a degree focused on the design,
            construction, and maintenance of infrastructure and the built
            environment.
          </p>
        </section>
        <section className={panelSection}>
          <h3 className="text-stone-100 font-semibold text-sm uppercase tracking-wider mb-2">
            About the university
          </h3>
          <p className="text-stone-400 text-sm leading-relaxed">
            Leeds Beckett University is a modern university in Leeds with a
            strong reputation in the built environment and engineering. The
            School of the Built Environment offers accredited civil and
            structural engineering courses, industry links, and facilities that
            support both theory and practical skills.
          </p>
        </section>
        <section className={panelSection}>
          <h3 className="text-stone-100 font-semibold text-sm uppercase tracking-wider mb-2">
            Civil &amp; structural engineering
          </h3>
          <p className="text-stone-400 text-sm leading-relaxed">
            Civil and structural engineering covers the design and construction
            of buildings, bridges, roads, water and transport systems, and other
            infrastructure. The discipline combines mechanics, materials, and
            management with sustainability and safety.
          </p>
        </section>
      </div>
    );
  }
  if (city.name === "Cardiff") {
    return (
      <div className="space-y-4">
        <section className={panelSection}>
          <h3 className="text-stone-100 font-semibold text-base mb-2">
            The Austin Partnership
          </h3>
          <p className="text-stone-400 text-sm leading-relaxed">
            I moved to Cardiff and joined{" "}
            <a
              href="https://austinpartnership.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-100 underline hover:text-white transition-colors"
            >
              The Austin Partnership
            </a>
            , an independent civil and structural engineering consultancy based
            in the city.
          </p>
        </section>
        <section className={panelSection}>
          <h3 className="text-stone-100 font-semibold text-sm uppercase tracking-wider mb-2">
            About the company
          </h3>
          <p className="text-stone-400 text-sm leading-relaxed">
            Established in 1991, Austin Partnership is a small practice with a
            strong local presence, led by structural engineer directors. The firm
            is known for responsive, professional service and practical design
            solutions that prioritise buildability and commercial considerations,
            with long-standing client relationships spanning 25+ years.
          </p>
        </section>
        <section className={panelSection}>
          <h3 className="text-stone-100 font-semibold text-sm uppercase tracking-wider mb-2">
            Services &amp; projects
          </h3>
          <p className="text-stone-400 text-sm leading-relaxed">
            The consultancy delivers structural design (new build, conversion,
            restoration, alterations, FEA, reinforced concrete and steelwork),
            civil engineering (drainage, SuDS, highways, retaining structures,
            railways), plus BIM, temporary works, and expert witness work.
            Notable Cardiff schemes include the Tramshed, St Fagans National
            Museum of History, and Cathedral Gardens.
          </p>
        </section>
      </div>
    );
  }
  if (city.name === "London") {
    return (
      <div className="space-y-4">
        <section className={panelSection}>
          <h3 className="text-stone-100 font-semibold text-base mb-2">
            O&apos;Connor Sutton Cronin (OCSC)
          </h3>
          <p className="text-stone-400 text-sm leading-relaxed">
            I joined the London office of{" "}
            <a
              href="https://ocsc.ie/london/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-100 underline hover:text-white transition-colors"
            >
              O&apos;Connor Sutton Cronin
            </a>
            , delivering client-focused consulting engineering services from
            their base in the city.
          </p>
        </section>
        <section className={panelSection}>
          <h3 className="text-stone-100 font-semibold text-sm uppercase tracking-wider mb-2">
            London office
          </h3>
          <p className="text-stone-400 text-sm leading-relaxed">
            The OCSC London office was established in 2005 and is in Clerkenwell,
            with strong transport links from Farringdon. The office runs a hybrid
            working model and has a strong management team focused on developing
            engineers — including supporting chartership and progression from
            graduate to Associate level within the group.
          </p>
        </section>
        <section className={panelSection}>
          <h3 className="text-stone-100 font-semibold text-sm uppercase tracking-wider mb-2">
            Projects &amp; expertise
          </h3>
          <p className="text-stone-400 text-sm leading-relaxed">
            The London team delivers structural, civil, MEP, and multidisciplinary
            work across residential, commercial, retail, hotel, healthcare, and
            education. High-profile projects include Royal Academy of Dance
            Battersea, Embassy Gardens at Nine Elms, West Hampstead Square,
            Kidbrooke Village regeneration, and Marine Wharf Surrey
            Quays. The office has delivered major developments with values
            exceeding £500m.
          </p>
        </section>
      </div>
    );
  }
  if (city.name === "Oxford") {
    return (
      <div className="space-y-4">
        <section className={panelSection}>
          <h3 className="text-stone-100 font-semibold text-base mb-2">
            Ridge and Partners LLP
          </h3>
          <p className="text-stone-400 text-sm leading-relaxed">
            I joined{" "}
            <a
              href="https://ridge.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-100 underline hover:text-white transition-colors"
            >
              Ridge and Partners
            </a>{" "}
            in Oxford — a major built environment consultancy operating across
            the UK.
          </p>
        </section>
        <section className={panelSection}>
          <h3 className="text-stone-100 font-semibold text-sm uppercase tracking-wider mb-2">
            About Ridge
          </h3>
          <p className="text-stone-400 text-sm leading-relaxed">
            Ridge is a multidisciplinary built environment consultancy, ranked
            15th in Building Magazine&apos;s Top 150 Consultants. The practice
            combines architecture, structural and civil engineering, building
            services, cost and project management, and specialist services
            including digital engineering, fire safety, and transport planning.
          </p>
        </section>
        <section className={panelSection}>
          <h3 className="text-stone-100 font-semibold text-sm uppercase tracking-wider mb-2">
            Sectors &amp; expertise
          </h3>
          <p className="text-stone-400 text-sm leading-relaxed">
            Ridge works across education, healthcare, infrastructure, data
            centres, residential and regeneration, science and research, sport
            and leisure, and museums and theatres. Notable work includes
            restoration and regeneration in Oxford — such as restoring the heart
            of Osney — alongside projects in advanced manufacturing, defence,
            industrial and logistics, and water.
          </p>
        </section>
      </div>
    );
  }
  return (
    <p className="text-sm text-stone-400">Location selected on the map.</p>
  );
}

export default function UKMapWithLeeds() {
  const [roadRoute, setRoadRoute] = useState<[number, number][] | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchRoadRoute(WAYPOINTS)
      .then((coords) => {
        if (!cancelled) setRoadRoute(coords);
      })
      .catch(() => {
        if (!cancelled) setRoadRoute(WAYPOINTS);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 w-screen h-screen">
      {/* Left-side popup panel: full height, half width */}
      {selectedCity && (
        <aside
          className="fixed left-0 top-0 bottom-0 w-1/2 min-w-[280px] max-w-[50vw] z-20 flex flex-col bg-neutral-900/95 backdrop-blur border-r border-neutral-700 shadow-xl"
          aria-label="Location details"
        >
          <div className="flex items-center justify-between gap-3 p-5 border-b border-neutral-700">
            <div className="flex items-center gap-3 min-w-0">
              <h2 className="text-xl font-semibold text-stone-100 truncate">
                {selectedCity.name}
              </h2>
              <span
                className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  CITY_DURATIONS[selectedCity.name] === "Current"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-neutral-700/80 text-stone-300 border border-neutral-600/60"
                }`}
              >
                {CITY_DURATIONS[selectedCity.name]}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSelectedCity(null)}
              className="rounded p-1.5 text-stone-400 hover:text-stone-100 hover:bg-neutral-800 transition-colors"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-auto p-5">
            <CityPanelContent city={selectedCity} />
          </div>
        </aside>
      )}
      <Map
        theme="dark"
        center={[-2.5, 54]}
        zoom={5.5}
        maxBounds={UK_BOUNDS}
        minZoom={5}
      >
        {roadRoute && (
          <MapRoute
            coordinates={roadRoute}
            color="#335D9B"
            width={3}
            opacity={0.9}
          />
        )}
        {CITIES.map((city) => (
          <MapMarker
            key={city.name}
            longitude={city.longitude}
            latitude={city.latitude}
            onClick={() => setSelectedCity(city)}
          >
            <MarkerContent>
              <div className="h-4 w-4 rounded-full border-2 border-white bg-[#335D9B] shadow-lg" />
            </MarkerContent>
          </MapMarker>
        ))}
        <MapControls
          position="bottom-right"
          showZoom
          showCompass
          showLocate
          showFullscreen
          className="[&>div]:!bg-neutral-900 [&>div]:!border-neutral-700 [&_button]:!text-stone-200 [&_button:hover]:!bg-neutral-800 [&_svg]:text-stone-200"
        />
      </Map>
    </div>
  );
}

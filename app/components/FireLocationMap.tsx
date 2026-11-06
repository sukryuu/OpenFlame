"use client";

import { useEffect, useRef } from "react";
import { Map, Marker, type MapMouseEvent } from "maplibre-gl";

interface Location {
    lat: number;
    lng: number;
}

interface FireLocationMapProps {
    selectedLocation: Location | null;
    onLocationSelect: (location: Location) => void;
}

export default function FireLocationMap({
    selectedLocation,
    onLocationSelect,
}: FireLocationMapProps) {
    const mapContainer = useRef<HTMLDivElement>(null);
    const markerRef = useRef<Marker | null>(null);

    const onLocationSelectRef = useRef(onLocationSelect);
    onLocationSelectRef.current = onLocationSelect;

    const selectedLocationRef = useRef(selectedLocation);
    selectedLocationRef.current = selectedLocation;

    useEffect(() => {
        const container = mapContainer.current;

        if (!container) return;

        const map = new Map({
            container,
            style: "https://tiles.openfreemap.org/styles/bright",
            center: [139.7, 35.7],
            zoom: 8,
            minZoom: 1,
            maxZoom: 15,
            attributionControl: false,
        });

        const updateMarker = (location: Location) => {
            markerRef.current?.remove();

            markerRef.current = new Marker({
                color: "#cf421b",
            })
                .setLngLat([location.lng, location.lat])
                .addTo(map);
        };

        const handleLoad = () => {
            map.resize();

            const location = selectedLocationRef.current;

            if (location) {
                updateMarker(location);

                map.flyTo({
                    center: [location.lng, location.lat],
                    zoom: 15,
                });
            }
        };

        const handleClick = (e: MapMouseEvent) => {
            const location = {
                lat: e.lngLat.lat,
                lng: e.lngLat.lng,
            };

            updateMarker(location);

            onLocationSelectRef.current(location);
        };

        map.on("load", handleLoad);
        map.on("click", handleClick);

        map.on("error", (event) => {
            console.error("[MapLibre Error]", event.error);
        });

        const frame = requestAnimationFrame(() => {
            map.resize();
        });

        return () => {
            cancelAnimationFrame(frame);

            markerRef.current?.remove();
            markerRef.current = null;

            map.remove();
        };
    }, []);

    return (
        <div className="relative w-full h-75 chromium:h-60 rounded-lg overflow-hidden">
            <div
                ref={mapContainer}
                className="w-full h-full"
                style={{
                    minHeight: "300px",
                    position: "relative",
                }}
            />

            <div className="absolute bottom-2 right-2 z-10 flex items-center gap-1 rounded-md bg-[#253449cc] px-2 py-1 text-[10px] text-neutral-300">
                <a
                    href="https://openfreemap.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    OpenFreeMap
                </a>

                <span>·</span>

                <a
                    href="https://www.openstreetmap.org/copyright"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    © OpenStreetMap
                </a>
            </div>
        </div>
    );
}

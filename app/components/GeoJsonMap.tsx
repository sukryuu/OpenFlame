"use client";

import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

maplibregl.setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");

export default function GeoJsonMap() {
    const mapContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mapContainer.current) return;

        const map = new maplibregl.Map({
            container: mapContainer.current,

            attributionControl: false,
            maplibreLogo: false,

            style: {
                version: 8,
                sources: {},
                layers: [
                    {
                        id: "background",
                        type: "background",
                        paint: {
                            "background-color": "#121923",
                        },
                    },
                ],
            },

            center: [139.7, 35.7],
            zoom: 8,
            projection: "globe",
            minZoom: 1,
            maxZoom: 15,
        });

        map.on("load", async () => {
            try {
                const [earthResponse, cityResponse] = await Promise.all([
                    fetch("/GISdata/earthGIS.json"),
                    fetch("/GISdata/japanGIS.json"),
                ]);

                if (!earthResponse.ok) {
                    throw new Error("Earth GeoJSON load failed");
                }

                if (!cityResponse.ok) {
                    throw new Error("City GeoJSON load failed");
                }

                const [earthGeojson, cityGeojson] = await Promise.all([
                    earthResponse.json(),
                    cityResponse.json(),
                ]);

                // 世界地図

                map.addSource("earth", {
                    type: "geojson",
                    data: earthGeojson,
                });

                map.addLayer({
                    id: "earth-fill",
                    type: "fill",
                    source: "earth",
                    paint: {
                        "fill-color": "#313330",
                        "fill-opacity": 1,
                    },
                });

                map.addLayer({
                    id: "earth-line",
                    type: "line",
                    source: "earth",
                    paint: {
                        "line-color": "#a1a7bf",
                        "line-width": [
                            "interpolate",
                            ["linear"],
                            ["zoom"],
                            3,
                            0.1,
                            5,
                            0.2,
                            8,
                            0.6,
                            11,
                            1.0,
                            14,
                            2.8,
                        ],
                    },
                });

                map.addSource("city", {
                    type: "geojson",
                    data: cityGeojson,
                });

                map.addLayer({
                    id: "city-fill",
                    type: "fill",
                    source: "city",
                    paint: {
                        "fill-color": "#313330",
                        "fill-opacity": 1,
                    },
                });

                map.addLayer({
                    id: "city-line",
                    type: "line",
                    source: "city",
                    paint: {
                        "line-color": "#c5cdeb",
                        "line-width": [
                            "interpolate",
                            ["linear"],
                            ["zoom"],
                            3,
                            0.1,
                            5,
                            0.2,
                            8,
                            0.6,
                            11,
                            1.0,
                            14,
                            2.8,
                        ],
                    },
                });


                const bounds = new maplibregl.LngLatBounds();

                const visit = (coords: any): void => {
                    if (!Array.isArray(coords)) return;

                    if (
                        typeof coords[0] === "number" &&
                        typeof coords[1] === "number"
                    ) {
                        bounds.extend([coords[0], coords[1]]);
                        return;
                    }

                    coords.forEach(visit);
                };

                const visitGeometry = (geometry: any): void => {
                    if (!geometry) return;

                    if (geometry.type === "GeometryCollection") {
                        geometry.geometries?.forEach(visitGeometry);
                    } else {
                        visit(geometry.coordinates);
                    }
                };

                const visitGeoJSON = (geojson: any): void => {
                    if (geojson.type === "FeatureCollection") {
                        geojson.features.forEach((feature: any) => {
                            visitGeometry(feature.geometry);
                        });
                    } else if (geojson.type === "Feature") {
                        visitGeometry(geojson.geometry);
                    } else {
                        visitGeometry(geojson);
                    }
                };

                visitGeoJSON(earthGeojson);
                visitGeoJSON(cityGeojson);

                if (!bounds.isEmpty()) {
                    map.fitBounds(bounds, {
                        padding: 30,
                        maxZoom: 8,
                    });
                }
            } catch (error) {
                console.error(error);
            }
        });

        map.on("error", (event) => {
            console.error(event.error);
        });

        return () => map.remove();
    }, []);

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                width: "100%",
                height: "100dvh",
            }}
        >
            <div
                ref={mapContainer}
                style={{
                    position: "absolute",
                    inset: 0,
                }}
            />

            {/* credit */}
            <div
                style={{
                    position: "absolute",
                    right: "8px",
                    bottom: "8px",
                    zIndex: 10,
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    background: "#25344999",
                    backdropFilter: "blur(9px)",
                    border: "1px solid #394f6f",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.10)",
                    color: "#c9c9c9",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.03em",
                    pointerEvents: "auto",
                    userSelect: "none",
                }}
            >
                <a
                    href="https://maplibre.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <strong style={{ color: "#c9c9c9", fontWeight: 500 }}>
                        MapLibre
                    </strong>
                </a>

                <span
                    style={{
                        width: "1px",
                        height: "13px",
                        background: "#CBD5E1",
                    }}
                />

                <a
                    href="https://www.jma.go.jp/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    気象庁
                </a>
            </div>
        </div>
    );
}

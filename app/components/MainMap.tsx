"use client";

import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

maplibregl.setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");

export default function MainMap() {
    const mapContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mapContainer.current) return;

        const map = new maplibregl.Map({
            container: mapContainer.current,

            attributionControl: false,
            maplibreLogo: false,

            // OpenFreeMap
            style: "/MapStyle/OfmStyle.json",

            center: [139.7, 35.7],
            zoom: 8,
            projection: "globe",
            minZoom: 1,
            maxZoom: 15,
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

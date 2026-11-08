"use client";

import { useEffect, useRef } from "react";
import { Map } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "@/lib/maplibre-worker";

export default function MainMap() {
    const mapContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mapContainer.current) return;

        const map = new Map({
            container: mapContainer.current,
            attributionControl: false,
            maplibreLogo: false,
            style: "/MapStyle/OfmStyle.json",
            center: [139.7, 35.7],
            zoom: 8,
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
                    color: "#c9c9c9",
                    fontSize: "11px",
                    fontWeight: 500,
                    pointerEvents: "auto",
                    userSelect: "none",
                }}
            >
                <a
                    href="https://maplibre.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    MapLibre
                </a>

                <span>|</span>

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

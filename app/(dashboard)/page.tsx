"use client";

import GeoJsonMap from "../components/MainMap";

export default function Page() {
    return (
        <div className="relative h-screen w-full overflow-hidden">
            <div className="absolute inset-0 z-0">
                <GeoJsonMap />
            </div>
        </div>
    );
}
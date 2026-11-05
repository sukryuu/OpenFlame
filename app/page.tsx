"use client";

import React from "react";
import SettingModal from "./components/settingModal";
import GeoJsonMap from "./components/GeoJsonMap";

export default function Page() {
    const [isOpenModal, setIsOpenModal] = React.useState(false);

    return (
        <div className="relative h-screen w-screen overflow-hidden">
            <div className="absolute inset-0 z-0">
                <GeoJsonMap />
            </div>

            <button
                onClick={() => setIsOpenModal(true)}
                className="absolute right-4 top-4 z-50 rounded-lg bg-gray-700 p-2 font-bold text-white shadow-lg"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                    />
                </svg>
            </button>

            {/* --- モーダル --- */}
            <SettingModal
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
            />
        </div>
    );
}

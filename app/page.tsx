"use client";

import React from "react";
import SettingModal from "./components/SettingsModal";
import FireReportModal from "./components/FireReportModal";
import GeoJsonMap from "./components/GeoJsonMap";
import AppSidebar from "../components/app-sidebar";

import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Page() {
    const [isOpenModal, setIsOpenModal] = React.useState(false);
    const [isOpenReport, setIsOpenReport] = React.useState(false);

    return (
        <SidebarProvider>
            <AppSidebar
                onOpenSettings={() => setIsOpenModal(true)}
                onOpenReport={() => setIsOpenReport(true)}
            />

            <SidebarInset>
                <div className="relative h-screen w-full overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <GeoJsonMap />
                    </div>

                    <div className="absolute left-4 top-4 z-50 rounded-lg bg-gray-700 text-white shadow-lg">
                        <SidebarTrigger />
                    </div>

                    <SettingModal
                        isOpenModal={isOpenModal}
                        setIsOpenModal={setIsOpenModal}
                    />

                    <FireReportModal
                        isOpenReport={isOpenReport}
                        setIsOpenReport={setIsOpenReport}
                    />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

"use client";

import React from "react";

import AppSidebar from "@/components/app-sidebar";
import SettingModal from "../components/SettingsModal";
import FireReportModal from "../components/FireReportModal";

import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isOpenModal, setIsOpenModal] = React.useState(false);
    const [isOpenReport, setIsOpenReport] = React.useState(false);

    return (
        <SidebarProvider>
            <AppSidebar
                onOpenSettings={() => setIsOpenModal(true)}
                onOpenReport={() => setIsOpenReport(true)}
            />

            <SidebarInset>
                <div className="relative min-h-screen w-full bg-neutral-950">

                    <div className="absolute left-4 top-4 z-50 rounded-lg bg-gray-700 text-white shadow-lg">
                        <SidebarTrigger />
                    </div>

                    {children}

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
"use client";

import { Map, Flame, Layers, Database, Settings, Shield } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";

import Link from "next/link";

type AppSidebarProps = {
    onOpenSettings: () => void;
    onOpenReport: () => void;
};

export default function AppSidebar({
    onOpenSettings,
    onOpenReport,
}: AppSidebarProps) {
    return (
        <Sidebar
            collapsible="icon" className="dark"
            style={{ zIndex: 20 }}
        >
            <SidebarHeader className="p-4">
                <div className="flex items-center justify-center gap-2">
                    <span className="font-bold group-data-[collapsible=icon]:hidden">
                        OpenFlame
                    </span>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>メニュー</SidebarGroupLabel>

                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                onClick={onOpenReport}
                                tooltip="火事を報告"
                                className="text-red-200 hover:bg-neutral-800 hover:text-red-300"
                            >
                                <Flame />
                                <span>火事を報告</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            render={<Link href="/privacy-policy" />}
                        >

                            <Shield />

                            <span>プライバシーポリシー</span>
                        </SidebarMenuButton>
                        <SidebarMenuButton
                            render={<Link href="/terms-of-service" />}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                            </svg>

                            <span>利用規約</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={onOpenSettings}
                            tooltip="設定"
                        >
                            <Settings />
                            <span>設定</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
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

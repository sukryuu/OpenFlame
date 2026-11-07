"use client";

import { Map, Flame, Layers, Database, Settings } from "lucide-react";

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

type AppSidebarProps = {
    onOpenSettings: () => void;
    onOpenReport: () => void;
};

export default function AppSidebar({
    onOpenSettings,
    onOpenReport,
}: AppSidebarProps) {
    return (
        <Sidebar collapsible="icon">
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
                                className="text-red-600 hover:bg-red-50 hover:text-red-700"
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

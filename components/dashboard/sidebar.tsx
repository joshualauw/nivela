"use client";

import { Settings, LayoutDashboard, BookTemplate, Pencil, Boxes, Box } from "lucide-react";
import { cloneElement } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ProjectCombobox } from "./projects";
import { useTitleStore } from "@/hooks/store/useTitleStore";
import Image from "next/image";
import { useProjectStore } from "@/hooks/store/useProjectStore";

const navs = [
    {
        name: "Overview",
        icon: <LayoutDashboard />,
    },
    {
        name: "Chapters",
        icon: <Pencil />,
    },
    {
        name: "Templates",
        icon: <BookTemplate />,
    },
    {
        name: "Categories",
        icon: <Boxes />,
    },
    {
        name: "Items",
        icon: <Box />,
    },
    {
        name: "Settings",
        icon: <Settings />,
    },
];

interface SidebarProps {
    className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
    const router = useRouter();
    const { title, setTitle } = useTitleStore();
    const { projectDetail } = useProjectStore();

    return (
        <div className={className + " bg-gray-900 text-gray-100 h-full"}>
            <div className="space-y-4 px-5 py-2 mt-6 h-full relative">
                <div className="px-2 py-1">
                    <h2 className="px-2 text-xl font-bold items-center tracking-wide flex">
                        <Image src="/img/write.svg" alt="dashboard_logo" height="22" width="22" className="mr-3" />
                        <span className="tracking-wider">Nivela.com</span>
                    </h2>
                    <h3 className="mb-8 px-2 text-gray-400">Unleash your creation</h3>
                    <div className="space-y-4">
                        {navs.map((nav) => (
                            <Button
                                key={nav.name}
                                onClick={() => {
                                    setTitle(nav.name.toLowerCase());
                                    router.push(`/dashboard/${nav.name.toLowerCase()}?projectId=${projectDetail?.id}`);
                                }}
                                variant={title === nav.name.toLowerCase() ? "secondary" : "ghost"}
                                className="w-full justify-start"
                            >
                                {cloneElement(nav.icon, { className: "mr-4 h-4 w-4" })}
                                {nav.name}
                            </Button>
                        ))}
                    </div>
                    <ProjectCombobox />
                </div>
            </div>
        </div>
    );
}

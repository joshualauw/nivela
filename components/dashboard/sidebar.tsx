"use client";

import { User, Mountain, Settings, LayoutDashboard, BookTemplate, Pencil, Box } from "lucide-react";
import { cloneElement } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { ProjectCombobox } from "./projects";
import { useTitleStore } from "@/store/useTitleStore";
import { EditCategory } from "./category/edit-category";
import Image from "next/image";
import { FaQuestion } from "react-icons/fa";

const categories = [
    {
        name: "Characters",
        icon: <User />,
    },
    {
        name: "Places",
        icon: <Mountain />,
    },
];

const settings = [
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
        icon: <Box />,
    },
    {
        name: "Settings",
        icon: <Settings />,
    },
];

export default function Sidebar() {
    const router = useRouter();
    const { title, setTitle } = useTitleStore();

    return (
        <div className="w-[300px] h-screen hidden lg:block bg-gray-900 text-gray-100">
            <div className="space-y-4 px-5 py-2 mt-6 h-full relative">
                <div className="px-2 py-1">
                    <h2 className="px-2 text-xl font-bold items-center tracking-wide flex">
                        <Image src="/img/write.svg" alt="dashboard_logo" height="22" width="22" className="mr-3" />
                        <span className="tracking-wider">Nivela.com</span>
                    </h2>
                    <h3 className="mb-8 px-2 text-gray-400">Unleash your creation</h3>
                    <div className="space-y-2 mb-8">
                        {settings.map((set) => (
                            <Button
                                key={set.name}
                                onClick={() => {
                                    setTitle(set.name.toLowerCase());
                                    router.push(`/dashboard/${set.name.toLowerCase()}`);
                                }}
                                variant={title === set.name.toLowerCase() ? "secondary" : "ghost"}
                                className="w-full justify-start"
                            >
                                {cloneElement(set.icon, { className: "mr-4 h-4 w-4" })}
                                {set.name}
                            </Button>
                        ))}
                    </div>
                    <h2 className="mb-5">All Categories</h2>
                    <ScrollArea className="mt-5 h-[225px]">
                        {categories.map((cat) => (
                            <Button
                                key={cat.name}
                                onClick={() => {
                                    setTitle(cat.name.toLowerCase());
                                    router.push(`/dashboard/category/${cat.name.toLowerCase()}`);
                                }}
                                variant={title === cat.name.toLowerCase() ? "secondary" : "ghost"}
                                className="w-full mb-1 justify-start"
                            >
                                {cloneElement(cat.icon, { className: "mr-4 h-4 w-4" })}
                                {cat.name}
                            </Button>
                        ))}
                    </ScrollArea>
                    <ProjectCombobox />
                </div>
            </div>
            <Button className="rounded-full bg-gray-900 fixed bottom-4 right-4 p-2 w-10 h-10 flex justify-center items-center">
                <FaQuestion />
            </Button>
        </div>
    );
}
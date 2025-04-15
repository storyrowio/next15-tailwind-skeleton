'use client'

import AppNavbar from "layouts/app/components/AppNavbar";
import {useState} from "react";
import AppSidebar from "layouts/app/components/AppSidebar";
import classNames from "classnames";
import useMediaQuery from "hooks/useMediaQuery";

const sidebarWidth = 240;
const miniSidebarWidth = 80;

export default function AppLayout() {
    const { desktop } = useMediaQuery();

    const [sidebarOpen, setSidebarOpen] = useState(true);
    let contentClass = 'w[100vw-240px] ml-[240px]';
    if (desktop && !sidebarOpen) {
        contentClass = 'w-[100vw - 80px] ml-[80px]'
    }

    const contentClassNames = classNames({
        'relative transition-[width, margin] duration-300 ease-in-out': true,
        [contentClass]: desktop
    });

    const overlayClassNames = classNames({
        'w-screen h-screen bg-black absolute z-[6] transition-all duration-300 ease-in-out': true,
        'hidden': desktop || (!desktop && !sidebarOpen),
        'opacity-50': !desktop && sidebarOpen,
    });

    return (
        <main className="w-screen h-screen bg-neutral-50">
            <div className={overlayClassNames} onClick={() => setSidebarOpen(!sidebarOpen)}/>
            <AppSidebar
                sidebarWidth={sidebarWidth}
                miniSidebarWidth={miniSidebarWidth}
                open={sidebarOpen}
                onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}/>
            <div className={contentClassNames}>
                <AppNavbar
                    sidebarOpen={sidebarOpen}
                    onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}/>
                <div>
                    Content
                </div>
            </div>
        </main>
    )
}

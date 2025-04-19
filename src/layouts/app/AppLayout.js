'use client'

import AppNavbar from "layouts/app/components/AppNavbar";
import {useState} from "react";
import AppSidebar from "layouts/app/components/AppSidebar";
import classNames from "classnames";
import useMediaQuery from "hooks/useMediaQuery";
import IconButton from "components/ui/buttons/IconButton";
import {Menu02Icon} from "hugeicons-react";

const sidebarWidth = 240;
const miniSidebarWidth = 80;

export default function AppLayout({ children }) {
    const { desktop } = useMediaQuery()
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const isMiniSidebar = desktop && !sidebarOpen;

    let contentClass = isMiniSidebar ? 'pl-18' : 'pl-56';

    const contentClassNames = classNames({
        'min-h-screen pt-[64px] transition-[width, margin] duration-300 ease-in-out': true,
        [contentClass]: desktop
    });

    const overlayClassNames = classNames({
        'w-screen h-screen bg-black fixed z-[6] transition-all duration-300 ease-in-out': true,
        'hidden': desktop || (!desktop && !sidebarOpen),
        'opacity-50': !desktop && sidebarOpen,
    });

    return (
        <div>
            <AppSidebar
                sidebarWidth={sidebarWidth}
                miniSidebarWidth={miniSidebarWidth}
                open={sidebarOpen}
                onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}/>
            <div className={overlayClassNames} onClick={() => setSidebarOpen(!sidebarOpen)}/>

            <AppNavbar
                sidebarOpen={sidebarOpen}
                onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}/>


            <div className={contentClassNames}>
                <div className="p-5 md:p-8">
                    {children}
                </div>
            </div>
        </div>
    )
}

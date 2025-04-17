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

    let contentClass = isMiniSidebar ? 'pl-[80px]' : 'pl-[240px]';

    const contentClassNames = classNames({
        'pt-[64px] transition-[width, margin] duration-300 ease-in-out': true,
        [contentClass]: desktop
    });

    const overlayClassNames = classNames({
        'w-screen h-screen bg-black fixed z-[6] transition-all duration-300 ease-in-out': true,
        'hidden': desktop || (!desktop && !sidebarOpen),
        'opacity-50': !desktop && sidebarOpen,
    });

    // return (
    //     <div>
    //         <div className="w-72 h-screen fixed z-10 bg-neutral-200">
    //             <h1>Sidebar</h1>
    //             <IconButton
    //                 className="absolute -right-[20px]">
    //                 <Menu02Icon/>
    //             </IconButton>
    //         </div>
    //         <div className="w-screen h-14 fixed bg-base-300">
    //             <h1>Navbar</h1>
    //         </div>
    //         <div className="min-h-screen pt-14 pl-72 bg-primary-100">
    //             <div className="p-6">
    //                 <h1 className="text-5xl">Content</h1>
    //                 <h1 className="text-5xl">Content</h1>
    //                 <h1 className="text-5xl">Content</h1>
    //                 <h1 className="text-5xl">Content</h1>
    //                 <h1 className="text-5xl">Content</h1>
    //                 <h1 className="text-5xl">Content</h1>
    //                 <h1 className="text-5xl">Content</h1>
    //                 <h1 className="text-5xl">Content</h1>
    //                 <h1 className="text-5xl">Content</h1>
    //                 <h1 className="text-5xl">Content</h1>
    //                 <h1 className="text-5xl">Content</h1>
    //                 <h1 className="text-5xl">Content</h1>
    //                 <h1 className="text-5xl">Content</h1>
    //                 <h1 className="text-5xl">Content</h1>
    //                 <h1 className="text-5xl">Content</h1>
    //                 <h1 className="text-5xl">Content</h1>
    //                 <h1 className="text-5xl">Content</h1>
    //                 <h1 className="text-5xl">Content</h1>
    //             </div>
    //         </div>
    //     </div>
    // )

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
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    )
}

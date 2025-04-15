'use client'

import classNames from "classnames";
import useMediaQuery from "hooks/useMediaQuery";
import Logo from "components/shared/Logo";
import {ArrowLeft01Icon} from "hugeicons-react";

export default function AppSidebar(props) {
    const { sidebarWidth, miniSidebarWidth, open, onToggleSidebar } = props;
    const { desktop } = useMediaQuery();
    const isMiniSidebar = desktop && !open;

    const sidebarClassnames = classNames({
        'fixed overflow-hidden z-[7] top-0 h-screen transition-all duration-300 ease-in-out': true,
    });

    return (
        <aside
            className={sidebarClassnames}
            style={{
                width: !open ? desktop ? miniSidebarWidth + 20 : 0 : sidebarWidth + 20,
            }}>
            <div
                className="h-screen bg-white border-r border-neutral-200 transition-all duration-300 ease-in-out"
                style={{ width: !open ? desktop ? miniSidebarWidth : 0 : sidebarWidth }}>
                <div className="h-16 flex items-center justify-between relative">
                    <Logo icon={isMiniSidebar} className="ml-2"/>
                    <button
                        className="p-1.5 rounded-xl bg-white border border-neutral-300 absolute -right-[16px] top-[20px] z-8 cursor-pointer"
                        onClick={onToggleSidebar}>
                        <ArrowLeft01Icon size={18} className={`text-neutral-600 ${open ? 'rotate-180' : ''}`}/>
                    </button>
                </div>
            </div>

        </aside>
    )
}

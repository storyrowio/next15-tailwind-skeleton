'use client'

import classNames from "classnames";
import useMediaQuery from "hooks/useMediaQuery";
import Logo from "components/shared/Logo";
import {ArrowLeft01Icon} from "hugeicons-react";
import IconButton from "components/ui/buttons/IconButton";

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
                    <IconButton className="absolute -right-[16px] top-[16px] z-8 " onClick={onToggleSidebar}>
                        <ArrowLeft01Icon size={18} className={`text-neutral-500 ${!open ? 'rotate-180' : ''}`}/>
                    </IconButton>
                </div>
            </div>

        </aside>
    )
}

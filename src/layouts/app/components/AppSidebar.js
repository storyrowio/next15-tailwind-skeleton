'use client'

import classNames from "classnames";
import useMediaQuery from "hooks/useMediaQuery";
import Logo from "components/shared/Logo";
import {ArrowLeft01Icon} from "hugeicons-react";
import IconButton from "components/ui/buttons/IconButton";
import {AppMenus} from "constants/menus";
import AppSidebarItem from "layouts/app/components/AppSidebarItem";

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
                style={{width: !open ? desktop ? miniSidebarWidth : 0 : sidebarWidth}}>
                <div className="h-16 px-4 flex items-center justify-between relative">
                    <Logo icon={isMiniSidebar} className="ml-2"/>
                    <IconButton className="absolute -right-[16px] top-[16px] z-8 " onClick={onToggleSidebar}>
                        <ArrowLeft01Icon size={18} className={`text-neutral-500 ${!open ? 'rotate-180' : ''}`}/>
                    </IconButton>
                </div>
                <div className="sidebar">
                    <ul className="menu mx-auto w-50">
                        {AppMenus.map((e, i) => {

                            if (e.sectionTitle) {
                                return (
                                    <li key={i} className="mt-5 mb-1 px-4 text-[10px] text-neutral-400 font-semibold uppercase tracking-widest hover:bg-transparent">
                                        {e.sectionTitle}
                                    </li>
                                )
                            }

                            return (
                                <AppSidebarItem key={i} item={e}/>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </aside>
    )
}

'use client'

import classNames from "classnames";
import useMediaQuery from "hooks/useMediaQuery";
import Logo from "components/shared/Logo";
import {ArrowLeft01Icon} from "hugeicons-react";
import IconButton from "components/ui/buttons/IconButton";
import {AppMenus} from "constants/menus";
import AppSidebarItem from "layouts/app/components/AppSidebarItem";
import SimpleBar from "simplebar-react";
import {useState} from "react";

export default function AppSidebar(props) {
    const { open, onToggleSidebar } = props;
    const { desktop } = useMediaQuery();
    const [miniSidebarVisible, setMiniSidebarVisible] = useState(false);

    const isMiniSidebar = desktop && !open;

    const sidebarClassnames = classNames({
        'w-56 h-screen fixed z-10 bg-white border-r border-neutral-200 transition-all duration-300 ease-in-out': true,
        '!w-18': isMiniSidebar && !miniSidebarVisible,
        '!w-0': !desktop && !open
    });

    const menuClassNames = classNames({
        'menu mx-auto': true,
        'w-50': !isMiniSidebar || miniSidebarVisible,
        'w-18': isMiniSidebar
    });

    const handleMouseHover = (actionType) => {
        if (actionType === 'enter') {
            setMiniSidebarVisible(isMiniSidebar)
        } else {
            setMiniSidebarVisible(false);
        }
    }

    return (
        <aside className={sidebarClassnames}>
            <div className="relative">
                {(desktop || (!desktop && open)) && (
                    <IconButton className="absolute -right-[16px] top-[16px] z-8 " onClick={onToggleSidebar}>
                        <ArrowLeft01Icon size={18} className={`text-neutral-500 ${!open ? 'rotate-180' : ''}`}/>
                    </IconButton>
                )}
                <div
                    onMouseEnter={() => handleMouseHover('enter')}
                    onMouseLeave={() => handleMouseHover('leave')}>
                    <div className="h-16 px-4 flex items-center justify-start">
                        <Logo icon={isMiniSidebar && !miniSidebarVisible} width={158} height={30} className={!isMiniSidebar || miniSidebarVisible ? 'ml-2' : 'ml-0'}/>
                    </div>
                    <SimpleBar style={{maxHeight: 'calc(100vh - 64px)'}}>
                        <div
                            className="sidebar">
                            <ul className={menuClassNames}>
                                {AppMenus.map((e, i) => {
                                    return (
                                        <AppSidebarItem
                                            key={i}
                                            item={e}
                                            isMiniSidebar={isMiniSidebar}
                                            miniSidebarVisible={miniSidebarVisible}/>
                                    )
                                })}
                            </ul>
                        </div>
                    </SimpleBar>
                </div>
            </div>
        </aside>
    )
}

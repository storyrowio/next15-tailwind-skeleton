'use client'

import classNames from "classnames";
import useMediaQuery from "hooks/useMediaQuery";

export default function AppNavbar(props) {
    const { sidebarOpen, onToggleSidebar } = props;
    const { desktop } = useMediaQuery();
    const navbarWidth = desktop ? !sidebarOpen ? 'calc(100% - 80px)' : 'calc(100% - 240px)' : 'w-full';

    const navbarClassnames = classNames({
        'h-[70px] bg-white border-b border-neutral-200 ': true,
        // 'w-full': !desktop,
        // 'ml-[240px]': desktop && sidebarOpen,
        // 'ml-[80px]': desktop && !sidebarOpen,
    });

    return (
        <div
            className={navbarClassnames}
            // style={{ width: navbarWidth }}
        >
            <button onClick={onToggleSidebar}>
                Menu
            </button>
            <h1>Navbar</h1>
        </div>
    )
}

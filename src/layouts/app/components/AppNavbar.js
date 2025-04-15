'use client'

import classNames from "classnames";
import useMediaQuery from "hooks/useMediaQuery";
import IconButton from "components/ui/buttons/IconButton";
import {Notification01Icon} from "hugeicons-react";
import Image from "next/image";
import AppNavbarNotification from "layouts/app/components/AppNavbarNotification";

export default function AppNavbar(props) {
    const navbarClassnames = classNames({
        'h-16 px-4 lg:px-10 bg-white border-b border-neutral-200 flex items-center': true,
    });

    return (
        <div className={navbarClassnames}>
            <div className="flex-1"/>
            <div className="flex gap-4">
                <AppNavbarNotification/>
                <div className="dropdown dropdown-end">
                    <div className="flex items-center">
                        <IconButton tabIndex={0} role="button" className="!p-0 !rounded-full !border-none">
                            <Image
                                src="/images/avatar/avatar.png"
                                alt="avatar"
                                width={40}
                                height={40}/>
                        </IconButton>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-6 w-52 p-2 shadow-xl/2 border border-neutral-200">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

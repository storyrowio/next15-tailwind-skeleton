'use client'

import Image from "next/image";
import AuthContentCard from "layouts/auth/components/AuthContentCard";
import useMediaQuery from "hooks/useMediaQuery";
import classNames from "classnames";

export default function AuthLayout({ children }) {
    const { desktop, tablet, mobile } = useMediaQuery();

    const contentBoxClassNames = classNames({
        'mx-auto bg-white rounded-[30px] relative z-2 shadow-xl/5': true,
        'w-[85%] h-[85vh]': desktop,
        'w-[60%] py-20': tablet && !mobile,
        'w-[85%] py-14': mobile,
    });

    return (
        <div className="w-screen h-screen flex items-center">
            <div className="absolute z-0">
                <div className="w-screen h-screen relative">
                    <Image
                        src="/images/pages/auth/background.svg"
                        alt="background"
                        fill
                        style={{objectFit: 'cover'}}/>
                </div>
            </div>
            <div className={contentBoxClassNames}>
                <AuthContentCard>
                    {children}
                </AuthContentCard>
            </div>
        </div>
    )
}

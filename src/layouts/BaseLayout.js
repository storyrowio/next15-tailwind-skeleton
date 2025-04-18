'use client'

import {Provider} from "react-redux";
import store from "store";
import {usePathname} from "next/navigation";
import AppLayout from "layouts/app/AppLayout";
import AuthLayout from "layouts/auth/AuthLayout";

const RootApp = ({ children }) => {
    const pathname = usePathname();
    let Layout = AuthLayout;

    if (pathname.includes('/app')) {
        Layout = AppLayout;
    }

    return (
        <Layout>
            {children}
        </Layout>
    )
};

export default function BaseLayout({ children }) {
    return (
        <Provider store={store}>
            <RootApp>
                {children}
            </RootApp>
        </Provider>
    )
}

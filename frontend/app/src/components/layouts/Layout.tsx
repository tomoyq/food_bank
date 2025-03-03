import { Outlet } from 'react-router'

import { Header } from './header/header'
import { PageLayouts } from './pages/pageLayouts'

export const Layout = () => {
    return (
        <>
            <Header />
            <PageLayouts>
                <Outlet />
            </PageLayouts>
        </>
    );
};
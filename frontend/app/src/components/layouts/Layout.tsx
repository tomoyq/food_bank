import { Outlet } from 'react-router'

import { Header } from './header/header'

export const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};
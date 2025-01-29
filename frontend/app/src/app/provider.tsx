import React from "react";
import { CssBaseline } from "@mui/material"
import { ThemeProvider } from '@mui/material/styles'

import { AuthContextProvider } from "./context/AuthContext";
import { AxiosProvider } from "./axios/AxiosProvider";
import {theme} from "./theme/theme"

type Props = {
    children?: React.ReactNode
};

export const AppProvider: React.FC<Props> = ({children}) => {
    return (
            <AuthContextProvider>
                <AxiosProvider>
                    <ThemeProvider theme={theme}>
                        <CssBaseline enableColorScheme />
                        {children}
                    </ThemeProvider>
                </AxiosProvider>
            </AuthContextProvider>
    )
};
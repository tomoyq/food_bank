import React from "react";
import { CssBaseline } from "@mui/material"
import { ThemeProvider } from '@mui/material/styles'
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'

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
                        <EmotionThemeProvider theme={theme}>
                            <CssBaseline enableColorScheme />
                            {children}
                        </EmotionThemeProvider>
                    </ThemeProvider>
                </AxiosProvider>
            </AuthContextProvider>
    )
};
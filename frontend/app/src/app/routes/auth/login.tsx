import React from "react"
import styled from '@emotion/styled'

import { SignInForm } from "../../../features/auth/components/signInForm";

const LoginPageBody = styled.div`
    width: full;
    height: 100vh;
    background: linear-gradient(to bottom,rgba(59, 130, 246, 0.2), #ffffff);
`

export const Login: React.FC = () => {
    return (
        <LoginPageBody>
            <SignInForm />
        </LoginPageBody>
    ) 
};
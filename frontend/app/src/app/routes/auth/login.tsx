import React, { useContext } from "react"
import { Box } from '@mui/material';

import { SignInForm } from "../../../features/auth/components/signInForm";
import { AuthContext } from "../../../app/context/AuthContext";
import { useSignInForm } from "../../../features/auth/hooks/useSignInForm";

const style = {
    width: 'full',
    height: '100vh',
    background: 'linear-gradient(to bottom,rgba(59, 130, 246, 0.2), #ffffff)',
}

export const Login: React.FC = () => {
    //ログイン状態を取得
    const {loggedIn, setLoggedIn} = useContext(AuthContext);
      
    const {control, errors, onSubmit} = useSignInForm(loggedIn, setLoggedIn);

    return (
        <Box sx={style}>
            <SignInForm
                control={control}
                errors={errors}
                onSubmit={onSubmit}
            />
        </Box>
    ) 
};
import React, { useContext } from "react"
import { Box } from '@mui/material';

import { SignInForm } from "../../../features/auth/components/signInForm";
import { SignInFormSchema } from "../../../zod/authFormSchema";
import { useAuthForm } from "../../../features/auth/hooks/useAuthForm";

const style = {
    width: 'full',
    height: '100vh',
    background: 'linear-gradient(to bottom,rgba(59, 130, 246, 0.2), #ffffff)',
}

const Login: React.FC = () => {
    const {control, errors, onSubmit} = useAuthForm(SignInFormSchema);

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

export default Login
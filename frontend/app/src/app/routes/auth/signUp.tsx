import React from "react"
import { Box } from '@mui/material';

import { SignUpForm } from "../../../features/auth/components/signUpForm";
import { SignUpFormSchema } from "../../../zod/authFormSchema";
import { useAuthForm } from "../../../features/auth/hooks/useAuthForm";

const style = {
    width: 'full',
    height: '100vh',
    background: 'linear-gradient(to bottom,rgba(220, 252, 231, 0.9), #ffffff)',
}

const SignUp: React.FC = () => {
    const {control, errors, onSubmit} = useAuthForm(SignUpFormSchema);

    return (
        <Box sx={style}>
            <SignUpForm
                control={control}
                errors={errors}
                onSubmit={onSubmit}
            />
        </Box>
    ) 
};

export default SignUp
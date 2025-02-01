import {
    FormControl,
    FormLabel,
    TextField,
} from '@mui/material'
import { Control, Controller} from 'react-hook-form';
import { z } from 'zod';

import {SignInFormSchema} from '../../../zod/authFormSchema'

type FormProps = {
    name: 'username' | 'password';
    control?: Control<z.infer<typeof SignInFormSchema>>;
    helperText?: string;
    placeholder: string;
}

export const AuthFormInput = (props: FormProps) => {
    return (
        <>
            <Controller
                name={props.name}
                control={props.control}
                render={({field, fieldState}) => {
                    return(
                        <TextField
                            helperText={props.helperText}
                            id={field.name}
                            type={field.name === 'username' ? 'text' : 'password'}
                            name={field.name}
                            placeholder={props.placeholder}
                            autoComplete={field.name === 'username' ? 'name' : 'current-password'}
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            color={fieldState.error ? 'error' : 'primary'}
                            size='small'
                        />
                    )
                }}
            />
        </>
    )
};
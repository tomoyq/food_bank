import {
    FormControl,
    FormLabel,
    TextField,
} from '@mui/material'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type FormProps = {
    name: 'username' | 'password';
    errors?: FieldError;
    register?: UseFormRegisterReturn
    helperText?: string;
    placeholder: string;
}

export const AuthFormInput = (props: FormProps) => {
    return (
        <FormControl>
            <FormLabel
                htmlFor={props.name}
                sx={{
                    fontWeight: 'bold',
                }}
            >{props.name}</FormLabel>
            <TextField
                error={props.errors ? true : false}
                helperText={props.helperText}
                {...props.register}
                id={props.name}
                type={props.name === 'username' ? 'text' : 'password'}
                name={props.name}
                placeholder={props.placeholder}
                autoComplete={props.name === 'username' ? 'name' : 'current-password'}
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={props.errors ? 'error' : 'primary'}
                size='small'
            />
        </FormControl>
    )
};
import {
    FormControl,
    FormLabel,
    TextField,
} from '@mui/material'

type FormProps = {
    name: 'username' | 'password';
    error?: boolean;
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
                error={props.error}
                helperText={props.helperText}
                id={props.name}
                type={props.name === 'username' ? 'text' : 'password'}
                name={props.name}
                placeholder={props.placeholder}
                autoComplete={props.name === 'username' ? 'name' : 'current-password'}
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={props.error ? 'error' : 'primary'}
                size='small'
            />
        </FormControl>
    )
};
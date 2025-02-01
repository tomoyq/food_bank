import {
    FormLabel,
    TextField,
} from '@mui/material'
import { FieldPath, Control, useController } from 'react-hook-form';

import { SignInFormData } from '../../../zod/authFormSchema';

type FormProps = {
    name: FieldPath<SignInFormData>;
    control: Control<SignInFormData>;
    helperText?: string;
    placeholder: string;
}

export const RHFInput = (props: FormProps) => {
    const {
        field,
        formState: { errors }
      } = useController({
        name: props.name,
        control: props.control,
      });

    const errorMessage = errors?.[props.name]?.message


    return (
        <>
            <FormLabel
                htmlFor={field.name}
                sx={{
                    fontWeight: 'bold',
                }}
            >{field.name}</FormLabel>
            <TextField
                {...field}
                error={errors? true : false}
                helperText={errorMessage}
                id={field.name}
                type={field.name === 'username' ? 'text' : 'password'}
                name={field.name}
                placeholder={props.placeholder}
                autoComplete={field.name === 'username' ? 'name' : 'current-password'}
                autoFocus
                fullWidth
                variant="outlined"
                color={errors ? 'error' : 'primary'}
                size='small'
            />
        </>
    )
};
import {
    FormLabel,
    TextField,
} from '@mui/material'
import { FieldPath, Control, useController } from 'react-hook-form';

type FormProps = {
    name: FieldPath<any>;
    control: Control<any>;
    helperText?: string;
    placeholder: string;
}

const style = {
    fontWeight: 'bold',
}

export const RHFInput = (props: FormProps) => {
    const {
        field,
        formState: { errors }
      } = useController({
        name: props.name,
        control: props.control,
      });

    const errorMessage = errors?.[props.name]?.message as string


    return (
        <>
            <FormLabel htmlFor={field.name} sx={style}>
                {field.name}
            </FormLabel>
            <TextField
                {...field}
                error={errorMessage? true : false}
                helperText={errorMessage}
                id={field.name}
                type={field.name === 'username' ? 'text' : 'password'}
                name={field.name}
                placeholder={props.placeholder}
                autoComplete={field.name === 'username' ? 'name' : 'current-password'}
                autoFocus
                fullWidth
                variant="outlined"
                color='secondary'
                size='small'
            />
        </>
    )
};
import {
    Box,
    FormLabel,
    TextField,
} from '@mui/material'
import { FieldPath, Control, useController, } from 'react-hook-form';


type FormProps = {
    name: FieldPath<any>;
    control: Control<any>;
    type: React.HTMLInputTypeAttribute;
    helperText?: string;
    placeholder: string;
};

const style = {
    formLabel: {
        fontWeight: 'bold'
    },
    inputsLayout : {
        display: { xs: 'none', md: 'flex' },
    },
};

const CustomTextInput = (props: FormProps) => {
    const {
        field,
        formState: { errors }
      } = useController({
        name: props.name,
        control: props.control,
      });

    const errorMessage = errors?.[props.name]?.message as string;


    return (
        <>
            <Box sx={style.inputsLayout}>
                <FormLabel
                    htmlFor={field.name}
                    sx={style.formLabel}
                >
                    {field.name}
                </FormLabel>
                <TextField
                    {...field}
                    error={errorMessage? true : false}
                    helperText={errorMessage}
                    id={field.name}
                    type={props.type}
                    name={field.name}
                    placeholder={props.placeholder}
                    autoFocus
                    fullWidth
                    variant="outlined"
                    color='secondary'
                    size='small'
                />
            </Box>           
        </>
    )
};

export default CustomTextInput
import {
    Checkbox,
    FormControlLabel,
} from '@mui/material';
import { FieldPath, Control, useController, } from 'react-hook-form';

type FormProps = {
    name: FieldPath<any>;
    control: Control<any>;
    value?: any;
};

const CustomCheckbox = (props: FormProps) => {
    const {
        field,
    } = useController({
        name: props.name,
        control: props.control,
    });

    return (
        <FormControlLabel
            control={<Checkbox 
                        {...field}
                        value={props.value}
                        color="primary" 
                    />}
            label="Remember me"
        />
    );
}

export default CustomCheckbox
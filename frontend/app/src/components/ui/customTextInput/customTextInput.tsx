import {
    Box,
    FormLabel,
    MenuItem,
    TextField,
} from '@mui/material';
import { FieldPath, Control, useController, } from 'react-hook-form';


type FormProps = {
    name: FieldPath<any>;
    control: Control<any>;
    type: React.HTMLInputTypeAttribute;
    placeholder: string;
    value?: any;
    //セレクトボックスの中身
    enum?: string[];
    //テストでgetByLabelを使う場合に使用
    aria?: string;
};

const style = {
    formLabel: {
        fontWeight: 'bold',
        mt: {md: '5px'},
        mr: {md: '15px'},
    },
    formInput: {
        flexBasis: {md: '70%'},
    },
    inputsLayout : {
        display: { xs: 'block', md: 'flex' },
        justifyContent: {md: 'flex-end'},
    },
};

const CustomInput = (props: FormProps) => {
    const {
        field,
        formState: { errors }
      } = useController({
        name: props.name,
        control: props.control,
      });

    const errorMessage = errors?.[props.name]?.message as string;

    //propsにenumが合う場合はセレクトボックスを表示
    if (props.enum) {
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
                        select
                        name={field.name}
                        placeholder={props.placeholder}
                        aria-label={props.aria}
                        autoFocus
                        fullWidth
                        variant="outlined"
                        color='secondary'
                        size='small'
                        defaultValue={props.value}
                        sx={style.formInput}
                    >
                        {props.enum?.map((value) => (
                            <MenuItem key={value} value={value}>
                                {value}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>           
            </>
        );
    } else {
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
                        aria-labelledby={props.aria}
                        defaultValue={props.value}
                        autoFocus
                        fullWidth
                        variant="outlined"
                        color='secondary'
                        size='small'
                        sx={style.formInput}
                    />
                </Box>           
            </>
        )
    }
    
};

export default CustomInput
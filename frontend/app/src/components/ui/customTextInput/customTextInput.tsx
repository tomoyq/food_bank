import {
    Box,
    FormHelperText,
    FormLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { FieldPath, FieldError, Control, useController, } from 'react-hook-form';

type FormProps = {
    name: FieldPath<any>;
    control: Control<any>;
    type: React.HTMLInputTypeAttribute;
    placeholder: string;
    value?: any;
    //入力欄の名前
    inputTag: string;
    //セレクトボックスの中身
    enum?: string[];
    //テストでgetByLabelを使う場合に使用
    aria?: string;
    //fieldに表示するエラーをuseFormからもらう
    fieldError?: FieldError;
    //入力を受け付けない時にもらう
    disabled?: boolean;
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
    selectBoxLayouts: {
        width: { xs: '100%', md: '70%' },
        display: 'block',
    },
    errorMessage: { 
        mx: '14px',
        mt: '4px',
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

    //errorsにエラーメッセージが入っている場合は変数に格納
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
                        {props.inputTag}
                    </FormLabel>
                    <Box sx={style.selectBoxLayouts}>
                        <Select
                            {...field}
                            error={errorMessage ? true : false}
                            id={field.name}
                            data-testid={props.name}
                            name={field.name}
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
                                <MenuItem key={value} value={value} aria-label={value}>
                                    {value}
                                </MenuItem>
                            ))}
                        </Select>
                        {errorMessage ? 
                            <FormHelperText error sx={style.errorMessage}>
                                {errorMessage}
                            </FormHelperText>
                        : <></>
                        }
                    </Box>
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
                        {props.inputTag}
                    </FormLabel>
                    <TextField
                        {...field}
                        error={errorMessage? true : false}
                        helperText={errorMessage}
                        id={field.name}
                        data-testid={props.name}
                        type={props.type}
                        name={field.name}
                        placeholder={props.placeholder}
                        aria-labelledby={props.aria}
                        defaultValue={props.value}
                        disabled={props.disabled}
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
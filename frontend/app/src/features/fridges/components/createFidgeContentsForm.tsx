import {
    Box,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Control, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';

import { CustomButton, CustomIconButton, CustomInput } from '../../../components/ui';

//useFormの戻り値のcontolとhandleSubmitをもらう
//onSubmitにはsubmitボタンを押下後の処理を関数でもらう
type InputProps = {
    control: Control<any>;
    handleSubmit: UseFormHandleSubmit<any>;
    onSubmit: SubmitHandler<any>;
};

const CATEGORY = ['肉類', '魚類', 'その他'];

const style = {
    formTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        mb: 5,
    },
    formContents: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '80%',
        margin: '0 auto',
        gap: 2,
    },
    submitButton: {
        width: '30%',
        ml: 'auto',
    },
};

const CreateFridgeContentsForm = (props: InputProps) => {
    return (
        <>
            <Box sx={style.formTitle}>
                <Typography variant='h5'>
                    在庫追加フォーム
                </Typography>
                
                <CustomIconButton 
                    type='menu'
                    children={<CloseIcon />}
                    onClick={() => console.log('close')}
                />
            </Box>

            <Box
                component="form"
                onSubmit={props.handleSubmit(props.onSubmit)}
                noValidate
                sx={style.formContents}
            >

                <CustomInput 
                    name='name'
                    control={props.control}
                    type='text'
                    placeholder='名前'
                />

                <CustomInput 
                    name='expiryDate'
                    control={props.control}
                    type='date'
                    placeholder='年/月/日'
                />

                <CustomInput 
                    name='quantity'
                    control={props.control}
                    type='number'
                    placeholder='個数'
                />

                <CustomInput 
                    name='category'
                    control={props.control}
                    type='select'
                    placeholder='カテゴリー'
                    enum={CATEGORY}
                />

                <CustomButton
                    text="追加"
                    fullWidth={false}
                    variant="contained"
                    sx={style.submitButton}
                />

            </Box>
            
        </>
    )
};

export default CreateFridgeContentsForm
import {
    Box,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Control, FieldErrors, SubmitHandler,} from 'react-hook-form';

import { CustomButton, CustomIconButton, CustomInput } from '../../../components/ui';

type FridgeItem = {
    expiry_date: string;
    name: string;
    owner_name: string;
    quantity: number;
};

//useFormの戻り値のcontolとhandleSubmitをもらう
//onSubmitにはsubmitボタンを押下後の処理を関数でもらう
//contentは更新フォーム描画の際にdefaultValueに渡すデータ
type InputProps = {
    control: Control<any>;
    errors: FieldErrors<{
        name: string;
        expiryDate: string;
        quantity: number;
        category: "肉類" | "魚類" | "その他";
    }>
    onSubmit: SubmitHandler<any>;
    handleClose: () => void;
    content?: FridgeItem;
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
    errorMessage: {
        textAlign: 'center',
    },
};

const CRUDFridgeContentsForm = (props: InputProps) => {
    return (
        <>
            <Box sx={style.formTitle}>
                { props.content ? 
                    <Typography variant='h5'>
                        在庫更新フォーム
                    </Typography>
                :
                    <Typography variant='h5'>
                        在庫追加フォーム
                    </Typography>
                }
                
                
                <CustomIconButton 
                    type='menu'
                    children={<CloseIcon />}
                    onClick={props.handleClose}
                />
            </Box>

            <Box
                component="form"
                onSubmit={props.onSubmit}
                noValidate
                sx={style.formContents}
            >

                {props.errors.root?.serverError &&
                    <Typography
                        component="p"
                        variant="inherit"
                        color='error'
                        data-testid='serverError'
                        sx={style.errorMessage}
                    >
                        {props.errors.root?.serverError.message}
                    </Typography>
                }

                <CustomInput 
                    name='name'
                    control={props.control}
                    fieldError={props.errors.name}
                    type='text'
                    placeholder='名前'
                    value={props.content?.name}
                    inputTag='名前'
                />

                <CustomInput 
                    name='expiryDate'
                    control={props.control}
                    fieldError={props.errors.expiryDate}
                    type='date'
                    placeholder='年/月/日'
                    aria='expiryDate'
                    value={props.content?.expiry_date}
                    inputTag='賞味期限'
                />

                <CustomInput 
                    name='quantity'
                    control={props.control}
                    fieldError={props.errors.quantity}
                    type='number'
                    placeholder='個数'
                    aria='quantity'
                    value={props.content?.quantity}
                    inputTag='在庫数'
                />

                <CustomInput 
                    name='category'
                    control={props.control}
                    fieldError={props.errors.category}
                    type='select'
                    placeholder='カテゴリー'
                    enum={CATEGORY}
                    aria='category'
                    value={''}
                    inputTag='カテゴリー'
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

export default CRUDFridgeContentsForm
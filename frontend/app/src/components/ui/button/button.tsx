import { Button }from '@mui/material';

type ButtonProps = {
    variant: 'contained' | 'outlined';
    text: string;
    fullWidth?: boolean;
    icon?: JSX.Element;
    onClick?: () => void;
}

const CustomButton = (props: ButtonProps) => {
    //onClickに渡されたコールバック関数を実行するためのボタン
    if (props.onClick) {
        return (
            <Button 
                aria-label='button'
                color='secondary'
                fullWidth={props.fullWidth}
                variant={props.variant}
                startIcon={props.icon}
                onClick={props.onClick}
            >
                {props.text}
            </Button>
        );
    } else {
        //渡されていないときはフォームのsubmitボタン
        return (
            <Button 
                type="submit"
                aria-label='submit'
                color='secondary'
                fullWidth={props.fullWidth}
                variant={props.variant}
                startIcon={props.icon}
            >
                {props.text}
            </Button>
        );
    }
    
};

export default CustomButton
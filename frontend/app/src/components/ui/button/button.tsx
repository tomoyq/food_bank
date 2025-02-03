import { Button }from '@mui/material';

type ButtonProps = {
    variant: 'contained' | 'outlined';
    text: string;
    fullWidth?: boolean;
    icon?: JSX.Element;
}

const CustomButton = (props: ButtonProps) => {
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
};

export default CustomButton
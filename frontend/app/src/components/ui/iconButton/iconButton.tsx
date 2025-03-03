import { IconButton, } from "@mui/material";

interface OpenMenuOrNormalIconButton {
    type: 'menu';
    //childrenにiconを渡したい
    children: any;
    onClick: ((e: React.MouseEvent<HTMLElement>) => void);
    //muiのmenuコンポーネントと一緒に使う場合のprops
    controls?: string;
}

interface Navigate {
    type: 'nav';
    //childrenにiconを渡したい
    children: any;
    onClick: ((key: string) => void);
    //useNavigateと使うときに遷移先を指定するのに使う
    path: string;
    ariaLabel: string;
}

const CustomIconButton: React.FC<OpenMenuOrNormalIconButton | Navigate> = (props) => {
    if (props.type === 'menu') {
        return (
            <IconButton
                size="large"
                aria-controls={props.controls}
                onClick={props.onClick}
                color="inherit"
            >
                {props.children}
            </IconButton>
        );
    } else {
        return (
            <IconButton
                size="large"
                onClick={() => props.onClick(props.path)}
                color="inherit"
                aria-label={props.ariaLabel}
            >
                {props.children}
            </IconButton>
        ); 
    }
    
};

export default CustomIconButton;
import { IconButton, } from "@mui/material";

type Props = {
    //childrenにiconを渡したい
    children: any;
};

export const CustomIconButton: React.FC<Props> = ({children}) => {
    return (
        <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => {}}
            color="inherit"
        >
            {children}
        </IconButton>
    );
};
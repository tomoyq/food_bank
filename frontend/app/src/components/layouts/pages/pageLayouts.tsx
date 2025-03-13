import Box from '@mui/material/Box';

type Props = {
    children?: React.ReactNode
};

export const PageLayouts:React.FC<Props> = ({children}) => {
    return (
        <>
            <Box
                sx={{
                    width: 'auto',
                    height: '100%',
                    border: 1,
                    borderColor: 'secondary.light',
                    borderRadius: 2,
                    mx: 5,
                    my: 2,
                    p: 3,
                    overflow: 'hidden'                   
                }}
            >
                {children}
            </Box>
        </>
    )
}
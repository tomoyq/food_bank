import React from "react"
import {
    Typography
} from '@mui/material';
import { useContext } from 'react';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { AuthContext } from '../../../app/context/AuthContext';
import FridgeContentsCard from '../../../features/fridges/components/fridgeContensCard'
import { CustomButton } from '../../../components/ui';
import { useFridgeContents } from "../../../features/fridges/hooks/useFridgeContents";

const FridgeContent: React.FC = () => {
    const {loggedIn} = useContext(AuthContext);
    
    const {content} = useFridgeContents(loggedIn);
    console.log(content);

    return (
        <>
            <Typography gutterBottom variant="h4">
                FridgeContents
            </Typography>
            <CustomButton
                variant="contained"
                text="食材を追加する"
                icon={<AddOutlinedIcon />}
                onClick={() => console.log('食材を追加します')}
            />
            <FridgeContentsCard 
                name='牛乳'
                quantity={1}
                owner="あなた"
                func={() => 1}
            />
        </>
    )
};

export default FridgeContent;
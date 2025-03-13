import React from "react"
import {
    Box,
    Grid2,
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
    
    const {contents, calculateDaysLeft, outputProgressBarProperty} = useFridgeContents(loggedIn);

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
            <Box sx={{
                height: '100%',
                overflow: 'auto',
            }}>
                {contents !== null ?
                    <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {contents.map((content, index) => (
                            <Grid2 key={index} size={{ xs: 6, sm: 4, md: 3 }}>
                                <FridgeContentsCard 
                                    name={content.name}
                                    quantity={content.quantity}
                                    owner={content.owner_name}
                                    expiryDate={content.expiry_date}
                                    daysLeft={calculateDaysLeft}
                                    propertyVariables={outputProgressBarProperty}
                                />
                            </Grid2>
                        ))}
                    </Grid2>
                :
                    <Typography gutterBottom variant="h4">
                        在庫はありません。
                    </Typography>  
                }
            </Box>
            
        </>
    )
};

export default FridgeContent;
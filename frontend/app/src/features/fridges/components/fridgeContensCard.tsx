import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    LinearProgress,
    Typography
} from '@mui/material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import PlagiarismOutlinedIcon from '@mui/icons-material/PlagiarismOutlined';

import { CustomButton, CustomIconButton } from '../../../components/ui';
import React from 'react';

type FridgeItem = {
    expiry_date: string;
    name: string;
    owner_name: string;
    quantity: number;
};

type FridgeContentsCard = {
    expiryDate: string;
    name: string;
    owner: string;
    quantity: number;
    daysLeft: (expiryDate: string) => number;
    propertyVariables: (daysLeft: number) => any;
    handleOpenUpdateForm: (func?: (content?: FridgeItem) => Promise<void>, ) => void;
    handleDelete: () => void;
};

const style = {
    border: '1px solid #9ca3af',
    boxShadow: 'none',
    marginTop: 2
};

const FridgeContentsCard:React.FC<FridgeContentsCard> = (props) => {
    //期限までの日数を保持
    const daysLeft: number = props.daysLeft(props.expiryDate);

    //progress barのpropertyに渡す値を保持
    const {color, value} = props.propertyVariables(daysLeft);

  return (
    <Card sx={style}>
        <CardHeader
            action={
                <>
                    <CustomIconButton type='menu' onClick={() => props.handleOpenUpdateForm()}>
                        <EditNoteOutlinedIcon />
                    </CustomIconButton>
                    <CustomIconButton type='menu' onClick={props.handleDelete}>
                        <DeleteForeverOutlinedIcon />
                    </CustomIconButton>
                </>
            }
            title={props.name}
        />
        <CardContent>
            <Typography gutterBottom variant="body1" component="div" aria-label='quantity'>
                個数：{props.quantity}
            </Typography>
            <LinearProgress variant="determinate" value={value} color={color}/>
            <Typography gutterBottom variant="body1">
                期限切れまで残り {daysLeft}日 
            </Typography>
            <Typography gutterBottom variant="body1" aria-label='owner'>
                作成者：{props.owner} 
            </Typography>
        </CardContent>
        <CardActions>
            <CustomButton
                variant='outlined'
                text='レシピを探す' 
                fullWidth
                icon={<PlagiarismOutlinedIcon />}
            />
        </CardActions>
    </Card>
  );
}

export default FridgeContentsCard
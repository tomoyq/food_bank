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

type FridgeContents = {
    owner: string;
    name: string;
    quantity: number;
    func: () => number;
};

export const FridgeContentsCard:React.FC<FridgeContents> = (props) => {
    //期限までの日数を保持
    const daysLeft: number = props.func();

  return (
    <Card
        sx={{ 
            maxWidth: { xs: '100%', md: '30%' },
            border: '1px solid #9ca3af',
            boxShadow: 'none',
            marginTop: 2
        }}
    >
        <CardHeader
            action={
                <>
                    <CustomIconButton type='menu' onClick={() => console.log(1)}>
                        <EditNoteOutlinedIcon />
                    </CustomIconButton>
                    <CustomIconButton type='menu' onClick={() => console.log(2)}>
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
            <LinearProgress variant="determinate" value={50} />
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
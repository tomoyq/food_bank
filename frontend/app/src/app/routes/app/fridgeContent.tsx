import React from "react"
import {
    Box,
    Grid2,
    Modal,
    Typography
} from '@mui/material';
import { useContext } from 'react';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { AuthContext } from '../../../app/context/AuthContext';
import { FridgeContentsCard, CRUDFridgeContentsForm } from '../../../features/fridges/components/index'
import { CustomButton } from '../../../components/ui';
import { useFridgeContents } from "../../../features/fridges/hooks/useFridgeContents";
import { useModal } from "../../../hooks";
import { useCrudContents } from "../../../features/fridges/hooks/useCrudContents";


const style = {
    fridgeContents: {
        height: '100%',
        overflow: 'auto',
    },
    createFormModal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: {xs: '80%', md: '30%'},
        bgcolor: 'background.paper',
        border: '2px solid #000',
        borderRadius: '20px',
        boxShadow: 24,
        p: 4,
    }
};

const FridgeContent: React.FC = () => {
    const {loggedIn} = useContext(AuthContext);

    //在庫追加フォームのモーダル制御
    const {open: openCreateForm, handleOpen: handleOpenCreateForm, handleClose: handleCloseCreateForm} = useModal();

    //在庫更新フォームのモーダル制御
    const {open: openUpdateForm, handleOpen: handleOpenUpdateForm, handleClose: handleCloseUpdateForm} = useModal();

    //削除モーダル制御
    const {open: openDeleteModal, handleOpen: handleOpenDeleteModal, handleClose: handleCloseDeleteModal} = useModal();
    
    const { contents, setContents, calculateDaysLeft, outputProgressBarProperty } =
    useFridgeContents({ 
        loggedIn: loggedIn,
        handleCloseCreateForm: handleCloseCreateForm
        });

    const { control, errors, reset, handleSetTargetContent, onSubmitCreateForm, onSubmitUpdateForm } = 
    useCrudContents({
        contents: contents,
        setContents: setContents,
        handleCloseCreateForm: handleCloseCreateForm,
        handleCloseUpdateForm: handleCloseUpdateForm
    });

    return (
        <>
            <Typography gutterBottom variant="h4">
                FridgeContents
            </Typography>
            <CustomButton
                variant="contained"
                text="食材を追加する"
                icon={<AddOutlinedIcon />}
                onClick={() => handleOpenCreateForm()}
            />
            <Box sx={style.fridgeContents}>
                {contents !== null ?
                    <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {contents.map((content) => (
                            <Grid2 key={content.id} size={{ xs: 6, sm: 4, md: 3 }}>
                                <FridgeContentsCard 
                                    content={content}
                                    daysLeft={calculateDaysLeft}
                                    propertyVariables={outputProgressBarProperty}
                                    handleOpenUpdateForm={() => handleOpenUpdateForm(handleSetTargetContent, content)}
                                    handleDelete={handleCloseDeleteModal}
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

            <Modal
                open={openCreateForm}
                onClose={() => handleCloseCreateForm(reset)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style.createFormModal}>
                    <CRUDFridgeContentsForm 
                        control={control}
                        errors={errors}
                        onSubmit={onSubmitCreateForm}
                        handleClose={() => handleCloseCreateForm(reset)}
                    />
                </Box>
            </Modal>

            <Modal
                open={openUpdateForm}
                onClose={() => handleCloseUpdateForm(reset)}
                aria-labelledby="modal-modal-title" 
                aria-describedby="modal-modal-description"
            >
                <Box sx={style.createFormModal}>
                    <CRUDFridgeContentsForm 
                        control={control}
                        errors={errors}
                        onSubmit={onSubmitUpdateForm}
                        handleClose={() => handleCloseUpdateForm(reset)}    
                    />
                </Box>
            </Modal>

            <Modal
                open={openDeleteModal}
                onClose={() => handleCloseDeleteModal(reset)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style.createFormModal}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        削除モーダル
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
            
        </>
    )
};

export default FridgeContent;
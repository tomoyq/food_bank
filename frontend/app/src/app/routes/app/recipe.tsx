import React from "react"
import {
    Box,
    Grid2,
    Menu,
    MenuItem,
    Modal,
    TextField,
    Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useContext } from 'react';
import { Controller } from "react-hook-form";

import { CustomButton, CustomIconButton, CustomInput } from "../../../components/ui";
import { useMenu, useModal } from "../../../hooks"; 
import { AuthContext } from '../../../app/context/AuthContext';
import { useRecipes } from "../../../features/recipes/hooks/useRecipe";

const style = {
    searchForm: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        m: '20px 0',
    },
    searchBox: {
        width: {xs: '90%', md: '80%'},
        pr: '20px',
    },
    mdContent: {
        display: {xs: 'none', md: 'flex'},
        flexDirection: 'row-reverse',
        flexShrink: 0,
    },
    mdSearchButton: {
        mr: '10px',
    },
    xsContent: {
        display: {xs: 'block', md: 'none'},
        m: '0 auto',
    },
    xsMenuNames: {
        textAlign: 'center'
    },
    categoryButtonModal: {
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
    },
};

//モバイル画面のメニュー内容
const MENUNAMES = ["カテゴリで検索", "お気に入りを表示"]

const Recipe: React.FC = () => {
    const {control, onSubmit} = useRecipes()

    const {open, handleOpen, handleClose} = useModal()
    const {anchorElNav, handleOpenNavMenu, handleCloseNavMenu} = useMenu()

    return (
        <>
            <Typography gutterBottom variant="h4">
                Recipe Suggestions
            </Typography>
            <Box
                component='form'
                noValidate
                autoComplete="off" 
                sx={style.searchForm}
            >
                <Controller
                    name="textField"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => 
                        <TextField
                            {...field}
                            id={field.name}
                            name={field.name}
                            type="search"
                            placeholder="使用したい食材、作りたい料理のカテゴリ等"
                            variant="outlined"
                            color='secondary'
                            size='small'
                            sx={style.searchBox}
                            onKeyDown={(event) => {
                                //enter keyを押下するとsubmitさせる
                                if (event.key === 'Enter') {
                                    event.preventDefault()
                                    //field valueに入力値が入っている
                                    console.log(field.value)
                                }
                            }}
                        />
                    }
                />
                <Box sx={style.mdContent}>
                    <CustomButton
                        variant="outlined"
                        text="カテゴリで検索"
                        onClick={() => handleOpen()}
                        sx={style.mdSearchButton}
                    />
                    <CustomButton
                        variant="outlined"
                        text="お気に入りを表示"
                        onClick={() => {}}
                        sx={style.mdSearchButton}
                    />
                </Box>

                <Box sx={style.xsContent}>
                    <CustomIconButton 
                        type='menu'
                        children={<SearchIcon />}
                        controls={'menu-appbar'}
                        onClick={handleOpenNavMenu}
                    />
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={style.xsContent}
                    >
                        {MENUNAMES.map((name) => (
                            <MenuItem key={name} onClick={handleCloseNavMenu}>
                                <Typography sx={style.xsMenuNames}>{name}</Typography>
                            </MenuItem>
                            ))}
                    </Menu>
                </Box>
                
            </Box>

            <Modal
                open={open}
                onClose={() => handleClose()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style.categoryButtonModal}>
                    modal
                </Box>
            </Modal>

        </>
    )
};

export default Recipe;
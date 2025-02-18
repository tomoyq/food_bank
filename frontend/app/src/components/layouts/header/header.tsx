import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import KitchenOutlinedIcon from '@mui/icons-material/KitchenOutlined';
import PlagiarismOutlinedIcon from '@mui/icons-material/PlagiarismOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

import { useNavigate } from 'react-router';

import { CustomIconButton } from "../../ui/"
import { AuthContext } from "../../../app/context/AuthContext";

type Pages = {
  name: string,
  icon: any,
  root: string,
  ariaLabel: string
}[]

//{ページ名、アイコン、遷移先ルート}オブジェクトを表示したいページ分持つ
//ログイン済みの時に表示するアイコン
const logggedInPages: Pages = [
  {name: '食材在庫',icon: <KitchenOutlinedIcon />, root: '/', ariaLabel: 'content'},
  {name: 'レシピ検索',icon: <PlagiarismOutlinedIcon />, root: '/recipe', ariaLabel: 'recipe'},
  {name: 'プロフィール',icon: <AccountBoxOutlinedIcon />, root: '/profile', ariaLabel: 'profile'},
  {name: 'メッセージ',icon: <MailOutlineOutlinedIcon />, root: '/message', ariaLabel: 'message'},
  {name: 'ログアウト',icon:
     <ExitToAppOutlinedIcon />, root: '/logout', ariaLabel: 'logout'},
];

//未ログインの時に表示するアイコン
const notLogggedInPages: Pages = [
  {name: '食材在庫',icon: <KitchenOutlinedIcon />, root: '/', ariaLabel: 'content'},
  {name: 'レシピ検索',icon: <PlagiarismOutlinedIcon />, root: '/recipe', ariaLabel: 'recipe'},
  {name: 'ログイン',icon: <LoginOutlinedIcon />, root: '/login', ariaLabel: 'login'},
];

export const Header = () => {
  const {loggedIn, logout} = React.useContext(AuthContext);
  const navigate = useNavigate();
  //ログイン状態に応じて表示するアイコンを変更
  let pages: Pages = (loggedIn) ? logggedInPages : notLogggedInPages;

  const onClickNav = (path: string) => {
    //pathがlogoutならログアウトさせる
    if (path === "/logout"){
      logout();
    } else {
      navigate(path);
    }
  };

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth={false}>
        <Toolbar disableGutters sx={{ display: { md: 'flex' }, justifyContent: {md: 'space-between'} }}>
          <Typography
            variant="h3"
            component='h1'
            noWrap
            sx={{
              display: { xs: 'none', md: 'block' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
            }}
          >
            LOGO
          </Typography>
          
          
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: {xs: 'space-between'}}}>
            <Typography
              variant="h5"
              noWrap
              component="h1"
              sx={{
                display: 'flex',
                mr: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                alignItems: 'center',
              }}
            >
              LOGO
            </Typography>

            <CustomIconButton 
              type='menu'
              children={<MenuIcon />}
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
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }}}>
            {pages.map((page) => (
              <CustomIconButton 
                type='nav'
                key={page.name}
                children={page.icon}
                path={page.root}
                onClick={onClickNav}
                ariaLabel={page.ariaLabel}
              />
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
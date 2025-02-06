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
import { useNavigate } from 'react-router';

import { CustomIconButton } from "../../ui/"

const pages: [string, any, string][] = [['食材在庫', <KitchenOutlinedIcon />, '/']];

export const Header = () => {
  const navigate = useNavigate();

  const onClickNav = (path: string) => {
    navigate(path);
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
                <MenuItem key={page[0]} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{page[0]}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }}}>
            {pages.map((page) => (
              <CustomIconButton 
                type='nav'
                children={page[1]}
                path={page[2]}
                onClick={onClickNav}
              />
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
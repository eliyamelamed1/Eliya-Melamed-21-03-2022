import * as React from 'react';

import { Link, useLocation } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const pages = [
    { name: 'Home', route: '/' },
    { name: 'Favorites', route: '/Favorites' },
];

const Navbar = () => {
    const location = useLocation();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const desktopLinks = (
        <Box
            sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'center',
                alignItems: 'center',
                columnGap: '6rem',
            }}
        >
            {pages.map((page) => (
                <Link
                    to={page.route}
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    style={{ marginInline: 2, color: 'white', display: 'block', fontSize: '1.5rem' }}
                    className={location.pathname === page.route ? 'active' : 'null'}
                >
                    {page.name}
                </Link>
            ))}
        </Box>
    );
    const mobileLinks = (
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id='menu-appbar'
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
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
            >
                {pages.map((page) => (
                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                        <Link
                            to={page.route}
                            style={{ color: 'black' }}
                            className={location.pathname === page.route ? 'active' : 'null'}
                        >
                            {page.name}
                        </Link>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
    return (
        <AppBar position='static' style={{ backgroundColor: 'unset' }} className='navbar'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    {mobileLinks}
                    <Typography
                        variant='h6'
                        noWrap
                        component='div'
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        Weather
                    </Typography>
                    {desktopLinks}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Navbar;

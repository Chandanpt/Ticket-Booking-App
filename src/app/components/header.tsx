"use client"

import React, { useState, useEffect } from 'react';
import {AppBar, Box, Toolbar, IconButton, Typography, Menu, MenuItem, Container, Avatar, Button, Tooltip} from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import logo from "../../../public/assets/TIX ID.png";
import bell  from "../../../public/assets/Group.png";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { logIn, logOut } from '@/redux/features/auth.slice';
import { useRouter } from 'next/navigation';

const pages = ['Home', 'Movies', 'Payments'];

function Header() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Check localStorage for authentication status and auto-login if available
    const storedAuthStatus = localStorage.getItem("authStatus");
    if (storedAuthStatus === "false") {
      dispatch(logIn(false));
      router.push("/login");
    }
  }, [dispatch, router]);

  const logOutHandler = () => {
    dispatch(logIn(false));
    localStorage.setItem("authStatus", "false");
    router.push("/login");
    console.log("Logout");
  }

  return (
    <AppBar position="sticky" sx={{background: "white", width: "100%"}} >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{display: "flex", justifyContent: "space-between", margin: "0 20px"}}>
            
            <Image src={logo} alt="Logo" onClick={logOutHandler} style={{cursor: "pointer"}}/>
          <Box sx={{ flexGrow: 0}}>
            <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{color: "black"}}
            >
              <MenuIcon />
            </IconButton>
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
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"  color="#333333" >{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
            
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: "center" }}>
                
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "#333333", fontWeight: "500" , display: 'block', margin: "0 8px" }}
              >
                {page}
              </Button>
            ))}
            <Image src={bell} alt="Bell" style={{margin: "0 16px"}} />
            <Tooltip title="Profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, margin: "0 16px" }}>
                <Avatar alt="Aemy Sharp" src="/static/images/avatar/2.jpg" sx={{ backgroundColor: "#F2C46F"}} />
              </IconButton>
            </Tooltip>
          </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
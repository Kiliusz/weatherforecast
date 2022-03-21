import React from 'react';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { PaletteMode } from '@mui/material';
import NavMenu from '../NavMenu/NavMenu';
import { NavLink } from 'react-router-dom';
import MobileNavMenu from '../NavMenu/MobileNavMenu';

interface MainNavbarProps {
  mode: string;
  setMode: (fn: (prevMode: PaletteMode) => PaletteMode) => void;
}

const MainNavbar = ({ mode, setMode }: MainNavbarProps) => {
  const isMobile = useMediaQuery('(max-width:600px)');

  const ChangeDarkMode = () => {
    window.localStorage.setItem('darkMode', mode === 'dark' ? 'light' : 'dark');
    setMode(
      (prevMode): PaletteMode => (prevMode === 'dark' ? 'light' : 'dark')
    );
  };

  return (
    <>
      <AppBar>
        <Toolbar disableGutters sx={{ bgcolor: 'primary.main' }}>
          <Container>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <Typography
                  sx={{ color: 'white', textDecoration: 'none' }}
                  component={NavLink}
                  to="/"
                  variant="h5"
                >
                  WeatherApp
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <IconButton
                  size="small"
                  onClick={ChangeDarkMode}
                  color="inherit"
                >
                  {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
                {isMobile ? <MobileNavMenu /> : <NavMenu />}
              </Box>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default MainNavbar;

import React, { useMemo, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { Grid } from '@mui/material';
import MainNavbar from './MainNavbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const darkModeLocalSt = window.localStorage.getItem('darkMode');

  const [mode, setMode] = useState<PaletteMode>(
    (darkModeLocalSt as PaletteMode) || 'light'
  );

  const customTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { light: '#666ad1', main: '#002C66', dark: '#303f9f' },
          // primary: { light: '#666ad1', main: '#303f9f', dark: '#001970' },
        },
        components: {
          MuiListItemButton: {
            styleOverrides: {
              root: {
                '&.Mui-selected': {
                  color: `#8e9aab`,
                },
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />

      <Grid container direction="column" sx={{ minHeight: '100vh' }}>
        <Grid item>
          <MainNavbar mode={mode} setMode={setMode} />
        </Grid>
        <Grid item flexGrow={1}>
          {children}
        </Grid>
        <Grid item>
          <Footer />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Layout;

import { AppBar, Box, Container, Link } from '@mui/material';
import React from 'react';

const Footer = () => (
  <AppBar sx={{ mt: 2 }} position="static" enableColorOnDark>
    <Container>
      <Box py={4}>
        Powered by{' '}
        <Link
          color="inherit"
          underline="none"
          href="https://www.weatherapi.com/"
        >
          WeatherAPI.com
        </Link>
      </Box>
    </Container>
  </AppBar>
);

export default Footer;

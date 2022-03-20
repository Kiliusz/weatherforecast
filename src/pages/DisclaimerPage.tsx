import { Box, Container, Paper, Typography } from '@mui/material';
import React from 'react';

const DisclaimerPage = () => {
  return (
    <Container>
      <Box sx={{ p: 2, mt: 3 }} component={Paper}>
        <Typography mt={2} variant="body2">
          Ther are some limitations in weather API
        </Typography>
        <Typography component={'li'} mt={2} variant="body2">
          Free plan of weatherAPI allows only for 3 day forecast weather
        </Typography>
        <Typography component={'li'} mt={2} variant="body2">
          Free plan of weatherAPI allows only for 1 day of history data and not
          older than 1 week
        </Typography>
      </Box>
    </Container>
  );
};

export default DisclaimerPage;

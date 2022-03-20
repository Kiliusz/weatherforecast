import { Grid, Paper } from '@mui/material';
import React from 'react';

interface ResultInfoProps {
  hasPosition: boolean;
  locationName: string;
}

const ResultInfo = ({ hasPosition, locationName }: ResultInfoProps) => {
  return (
    <Paper
      item
      component={Grid}
      xs={12}
      sx={{ p: 2, mt: 2, mb: 1, textAlign: 'center' }}
    >
      Location based on {hasPosition ? ' browser geolocation' : ' user input'}:{' '}
      <strong> {locationName}</strong>
    </Paper>
  );
};

export default ResultInfo;

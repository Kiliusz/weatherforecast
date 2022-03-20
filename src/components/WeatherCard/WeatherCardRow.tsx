import React from 'react';
import { Typography, Box } from '@mui/material';

interface WeatherCardProps {
  label: string;
  value: string | number;
  units?: string;
}

const WeatherCardRow = ({ label, value, units }: WeatherCardProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <strong>{value}</strong> {units ? units : ''}
      </Typography>
    </Box>
  );
};

export default WeatherCardRow;

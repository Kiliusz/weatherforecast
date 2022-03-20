import React from 'react';
import { Grid } from '@mui/material';
import { createData } from '../../api/apiHelpers';
import WeatherCard from '../WeatherCard/WeatherCard';
import { ApiDay } from '../../api/apiHelpers';

interface WeatherListProps {
  data: ApiDay[];
}

const WeatherList = ({ data }: WeatherListProps) => {
  return (
    <>
      {createData(data).map((day) => {
        return (
          <Grid xs={12} md={4} key={day.date} item>
            <WeatherCard data={day} />
          </Grid>
        );
      })}
    </>
  );
};

export default WeatherList;

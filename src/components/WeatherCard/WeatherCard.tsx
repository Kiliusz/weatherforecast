import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import WeatherCardRow from './WeatherCardRow';

type StringNumber = string | number;

interface WeatherCardProps {
  data: {
    dayOfWeek: string;
    date: string;
    icon: string;
    desc: string;
    temp: StringNumber;
    wind: StringNumber;
    humidity: StringNumber;
    chanceOfRain: StringNumber;
    precip: StringNumber;
    minTemp: StringNumber;
    maxTemp: StringNumber;
  };
}

const WeatherCard = ({ data }: WeatherCardProps) => {
  const {
    chanceOfRain,
    date,
    dayOfWeek,
    desc,
    humidity,
    icon,
    precip,
    temp,
    wind,
    minTemp,
    maxTemp,
  } = data;
  return (
    <div>
      <Card sx={{ minWidth: 220 }}>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 1,
            }}
          >
            <img src={icon} alt="weather condition" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="h6" color="text.secondary">
                {temp} °C
                <Typography sx={{ ml: 2 }} variant="body2" component="span">
                  {desc}
                </Typography>
              </Typography>
              <Typography variant="body2" component="div">
                <Typography variant="caption" component="span">
                  min{' '}
                </Typography>
                {minTemp} °C
                <Typography sx={{ mx: 1 }} variant="body2" component="span">
                  |
                </Typography>
                <Typography variant="caption" component="span">
                  max{' '}
                </Typography>{' '}
                {maxTemp} °C
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: 2,
            }}
          >
            <Typography variant="body1">{dayOfWeek}</Typography>
            <Typography variant="body1">{date}</Typography>
          </Box>

          <Box>
            <WeatherCardRow label="Wind" value={wind} units="km/h" />
            <WeatherCardRow
              label="Chance Of Rain"
              value={chanceOfRain}
              units="%"
            />
            <WeatherCardRow label="Humidity" value={humidity} units="%" />
            <WeatherCardRow label="Precipitation" value={precip} units="mm" />
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherCard;

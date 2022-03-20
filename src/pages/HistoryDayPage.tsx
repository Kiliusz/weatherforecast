import { DatePicker } from '@mui/lab';
import {
  Box,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getHistoryWeather } from '../api/apiHelpers';
import { format } from 'date-fns';
import { useGeoLoc } from '../hooks/useGeoLoc';
import CityForm from '../components/CityForm/CityForm';
import WeatherList from '../components/WeatherList/WeatherList';
import ResultInfo from '../components/ResultInfo/ResultInfo';

const HistoryDayPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [searchCity, setSearchCity] = useState('');
  const [cityQuery, setCityQuery] = useState('');
  const [isInputUsed, setIsInputUsed] = useState(false);

  const [position, positionError] = useGeoLoc();

  const { isLoading, isError, data, refetch } = useQuery(
    ['weather', cityQuery],
    () => getHistoryWeather(cityQuery, format(date, 'yyyy-MM-dd')),
    { retry: 1, enabled: !!position }
  );

  useEffect(() => {
    if (position) {
      setCityQuery(`${position.coords.latitude},${position.coords.longitude}`);
    }
  }, [position]);

  useEffect(() => {
    const isProperDate =
      new Date().getTime() - date.getTime() < 8 * 1000 * 60 * 60 * 24;
    if (cityQuery && isProperDate) refetch();
  }, [cityQuery, date]);

  const handleCitySubmit = () => {
    setCityQuery(searchCity);
    setSearchCity('');
    setIsInputUsed(true);
  };

  const onDateChange = (newValue: Date | null) => {
    if (newValue) setDate(newValue);
  };

  return (
    <Container>
      <Grid
        container
        sx={{ p: 2, mt: 2 }}
        justifyContent="space-between"
        component={Paper}
      >
        <Grid
          sx={{ mb: { xs: 1, lg: 0 } }}
          item
          spacing={1}
          lg={6}
          container
          alignItems="center"
        >
          <Grid xs={12} sm={6} item>
            <CityForm
              handleSubmit={handleCitySubmit}
              label="City..."
              name="cityQuery"
              handleChange={(val: string) => setSearchCity(val)}
              value={searchCity}
            />
          </Grid>
          <Grid item>
            {positionError && !data && (
              <Typography sx={{ ml: 1 }}>
                Unable to acces geolocation <br /> please enter your city
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid item spacing={1} lg={6} container alignItems="center">
          <Grid xs={12} sm={6} item>
            <DatePicker
              value={date}
              onChange={onDateChange}
              inputFormat="yyyy-MM-dd"
              mask={'____-__-__'}
              minDate={new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)}
              maxDate={new Date()}
              renderInput={(params) => <TextField fullWidth {...params} />}
            />
          </Grid>
          <Grid item>
            <Typography sx={{ ml: 1 }}>
              Select date to <br /> display history weather
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      {isError && (
        <Box sx={{ textAlign: 'center' }}>
          <Typography color="error" sx={{ mt: 2 }}>
            Cant get weather for provided input
          </Typography>
        </Box>
      )}

      {data && (
        <ResultInfo
          hasPosition={isInputUsed ? false : !!position}
          locationName={data.data.location.name}
        />
      )}
      <Grid container justifyContent="center">
        {!isLoading && data && (
          <WeatherList data={data.data.forecast.forecastday} />
        )}
      </Grid>
    </Container>
  );
};

export default HistoryDayPage;

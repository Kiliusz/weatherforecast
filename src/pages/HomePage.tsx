import React, { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { useQuery } from 'react-query';
import { getCurrentWeather } from '../api/apiHelpers';
import { useGeoLoc } from '../hooks/useGeoLoc';
import CityForm from '../components/CityForm/CityForm';
import WeatherList from '../components/WeatherList/WeatherList';
import ResultInfo from '../components/ResultInfo/ResultInfo';

const HomePage = () => {
  const [searchCity, setSearchCity] = useState('');
  const [compareCity, setCompareCity] = useState('');
  const [cityQuery, setCityQuery] = useState('');
  const [isInputUsed, setIsInputUsed] = useState(false);

  const [position, positionError] = useGeoLoc();

  const { isLoading, isError, data, refetch } = useQuery(
    ['weather', cityQuery],
    () => getCurrentWeather(cityQuery),
    { retry: 1, enabled: !!position }
  );

  const {
    isLoading: isLoadingCompare,
    isError: isErrorCompare,
    data: dataCompare,
    refetch: refetchCompare,
  } = useQuery('compareWeather', () => getCurrentWeather(compareCity), {
    enabled: false,
    retry: 1,
  });

  useEffect(() => {
    if (position) {
      setCityQuery(`${position.coords.latitude},${position.coords.longitude}`);
    }
  }, [position]);

  useEffect(() => {
    refetch();
  }, [cityQuery]);

  const handleCompareCitySubmit = () => {
    refetchCompare();
    setCompareCity('');
  };

  const handleSearchCitySubmit = () => {
    setCityQuery(searchCity);
    setSearchCity('');
    setIsInputUsed(true);
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
          <Grid xs={12} sm={positionError && !data ? 4 : 6} item>
            <CityForm
              handleSubmit={handleSearchCitySubmit}
              label="City..."
              name="cityQuery"
              handleChange={(val: string) => setSearchCity(val)}
              value={searchCity}
            />
          </Grid>

          <Grid sm={8} item>
            {positionError && !data && (
              <Typography>
                Unable to acces geolocation <br /> please provide your city or
                turn on geolocation
              </Typography>
            )}
          </Grid>
        </Grid>

        <Grid item spacing={1} lg={6} container alignItems="center">
          {data && (
            <>
              <Grid xs={12} sm={6} item>
                <CityForm
                  handleSubmit={handleCompareCitySubmit}
                  label="Compare City"
                  name="compareCity"
                  handleChange={(val: string) => setCompareCity(val)}
                  value={compareCity}
                />
              </Grid>
              <Grid item>
                <Typography>
                  Going somewhere? <br /> compare the weather
                </Typography>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>

      {isLoading && (
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress sx={{ mt: 4, color: 'text.primary' }} size="3rem" />
        </Box>
      )}

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
      <Grid container spacing={1}>
        {!isLoading && data && (
          <WeatherList data={data.data.forecast.forecastday} />
        )}
      </Grid>

      {isErrorCompare && (
        <Typography>Cant get weather for provided input </Typography>
      )}

      {dataCompare && (
        <ResultInfo
          hasPosition={false}
          locationName={dataCompare.data.location.name}
        />
      )}
      <Grid container spacing={1}>
        {!isLoadingCompare && dataCompare && (
          <WeatherList data={dataCompare.data.forecast.forecastday} />
        )}
      </Grid>
    </Container>
  );
};

export default HomePage;

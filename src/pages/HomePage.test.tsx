import React from 'react';
import axios from 'axios';
import { fireEvent, render, screen } from '@testing-library/react';
import HomePage from './HomePage';
import { QueryClient, QueryClientProvider } from 'react-query';

const mockedData = {
  data: {
    location: {
      name: 'London',
    },
    forecast: {
      forecastday: [
        {
          date: '2022-03-20',
          date_epoch: 1647734400,
          day: {
            maxtemp_c: 12.5,
            mintemp_c: 5.7,
            avgtemp_c: 8.5,
            maxwind_mph: 13.2,
            maxwind_kph: 21.2,
            totalprecip_mm: 0.0,
            avgvis_km: 10.0,
            avghumidity: 55.0,
            daily_chance_of_rain: 0,
            condition: {
              text: 'Sunny',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
              code: 1000,
            },
          },
        },
        {
          date: '2022-03-29',
          date_epoch: 1647434400,
          day: {
            maxtemp_c: 12.5,
            mintemp_c: 5.7,
            avgtemp_c: 8.5,
            maxwind_mph: 13.2,
            maxwind_kph: 21.2,
            totalprecip_mm: 0.0,
            avgvis_km: 10.0,
            avghumidity: 55.0,
            daily_chance_of_rain: 0,
            condition: {
              text: 'Sunny',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
              code: 1000,
            },
          },
        },
      ],
    },
  },
};

describe('integration test HomePage', () => {
  beforeEach(() => {
    jest.spyOn(axios, 'get').mockResolvedValue(mockedData);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('It should render form', async () => {
    const mockGeolocation = {
      getCurrentPosition: jest.fn(),
      watchPosition: jest.fn(),
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.navigator.geolocation = mockGeolocation;

    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <HomePage />
      </QueryClientProvider>
    );

    const inputField = screen.getByLabelText(/City/i);
    expect(inputField).toBeInTheDocument();
    expect(mockGeolocation.getCurrentPosition).toHaveBeenCalled();
  });

  it('It submit form', async () => {
    const mockGeolocation = {
      getCurrentPosition: jest.fn(),
      watchPosition: jest.fn(),
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.navigator.geolocation = mockGeolocation;

    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <HomePage />
      </QueryClientProvider>
    );

    const inputField = screen.getByLabelText(/City/i);
    const form = screen.getByTestId('form-cityQuery');
    expect(inputField).toBeInTheDocument();
    expect(mockGeolocation.getCurrentPosition).toHaveBeenCalled();
    fireEvent.change(inputField, { target: { value: 'warsaw' } });
    fireEvent.submit(form);
    expect(axios.get).toHaveBeenCalled();
  });
});

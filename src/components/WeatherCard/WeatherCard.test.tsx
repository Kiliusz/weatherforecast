import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherCard from './WeatherCard';

it('It should render proper props values', () => {
  const mockedData = {
    dayOfWeek: 'Monday',
    date: '2020-03-20',
    icon: 'https://i.imgur.com/0MbxQzp.jpg',
    desc: 'Windy',
    temp: 20,
    wind: 10,
    humidity: 17,
    chanceOfRain: 10,
    precip: 10,
    minTemp: 25,
    maxTemp: 15,
  };
  render(<WeatherCard data={mockedData} />);
  const headerTemp = screen.getByRole('heading', { name: /20/i });
  const day = screen.getByText(/monday/i);
  expect(headerTemp).toBeInTheDocument();
  expect(day).toBeInTheDocument();
});

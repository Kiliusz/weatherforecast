import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherCardRow from './WeatherCardRow';

it('It should render proper props values', () => {
  const mockedData = {
    label: 'wind',
    value: 10,
    units: 'km/h',
  };

  render(<WeatherCardRow {...mockedData} />);
  const label = screen.getByText(/wind/i);
  const value = screen.getByText(/10/i);
  const units = screen.getByText(/km\/h/i);
  expect(label).toBeInTheDocument();
  expect(value).toBeInTheDocument();
  expect(units).toBeInTheDocument();
});

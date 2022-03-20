import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CityForm from './CityForm';

describe('testing CityFormComponent', () => {
  const mockHandleChange = jest.fn();
  const mockSubmit = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders input field', () => {
    render(
      <CityForm
        handleChange={mockHandleChange}
        label="Some City"
        name="city"
        value="Warsaw"
        handleSubmit={mockSubmit}
      />
    );
    const inputField = screen.getByLabelText(/Some City/i);
    expect(inputField).toBeInTheDocument();
  });

  it('display value and being changed', () => {
    render(
      <CityForm
        handleChange={mockHandleChange}
        label="Some City"
        name="city"
        value="Warsaw"
        handleSubmit={mockSubmit}
      />
    );
    const inputField = screen.getByDisplayValue(/Warsaw/i);
    fireEvent.change(inputField, { target: { value: 'test' } });
    expect(mockHandleChange).toHaveBeenCalled();
  });

  it(' submiting', () => {
    render(
      <CityForm
        handleChange={mockHandleChange}
        label="Some City"
        name="city"
        value="Warsaw"
        handleSubmit={mockSubmit}
      />
    );
    const inputField = screen.getByDisplayValue(/Warsaw/i);
    fireEvent.submit(inputField);
    expect(mockSubmit).toHaveBeenCalled();
  });
});

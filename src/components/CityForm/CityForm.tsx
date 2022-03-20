import React from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface CityForm {
  handleSubmit: (e: React.FormEvent) => void;
  value: string | number;
  handleChange: (val: string) => void;
  label: string;
  name: string;
}

const CityForm = ({
  handleSubmit,
  value,
  handleChange,
  label,
  name,
}: CityForm) => {
  return (
    // <form onSubmit={handleSubmit}>
    <form
      data-testid={`form-${name}`}
      onSubmit={(e) => {
        e.preventDefault();
        if (value) return handleSubmit(e);
      }}
    >
      <TextField
        fullWidth
        name={name}
        autoComplete="off"
        label={label}
        variant="outlined"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e.target.value)
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit" sx={{ p: '10px' }}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};

export default CityForm;

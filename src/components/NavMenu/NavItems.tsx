import React from 'react';
import { ListItem, ListItemButton } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

export const menuListLinks = [
  {
    path: '/history',
    label: 'History',
  },
  { path: '/disclaimer', label: 'Disclaimer' },
];

const ItemButtonSX = { whiteSpace: 'noWrap', textTransform: 'uppercase' };

const NavItems = () => {
  const location = useLocation();

  return (
    <>
      {menuListLinks.map(({ path, label }) => {
        return (
          <ListItem key={path} sx={{ textWrap: 'noWrap' }} disablePadding>
            <ListItemButton
              selected={path === location.pathname}
              sx={ItemButtonSX}
              component={NavLink}
              to={path}
            >
              {label}
            </ListItemButton>
          </ListItem>
        );
      })}
    </>
  );
};

export default NavItems;

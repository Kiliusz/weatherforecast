import React from 'react';
import { List, ListItem, ListItemButton } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

const ItemButtonSX = { whiteSpace: 'noWrap', textTransform: 'uppercase' };

export const menuListLinks = [
  {
    path: '/history',
    label: 'History',
  },
  { path: '/disclaimer', label: 'Disclaimer' },
];

const NavMenu = () => {
  const location = useLocation();

  return (
    <nav>
      <List sx={{ display: 'flex', ml: 3 }}>
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
      </List>
    </nav>
  );
};

export default NavMenu;

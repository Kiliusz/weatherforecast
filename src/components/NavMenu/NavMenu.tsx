import React from 'react';
import { List } from '@mui/material';
import NavItems from './NavItems';

const NavMenu = () => {
  return (
    <nav>
      <List sx={{ display: 'flex', ml: 3 }}>
        <NavItems />
      </List>
    </nav>
  );
};

export default NavMenu;

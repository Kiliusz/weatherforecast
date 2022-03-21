import React, { useState } from 'react';
import { Drawer, IconButton, List } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NavItems from './NavItems';

const MobileNavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton
        onClick={() => setIsOpen(true)}
        sx={{ ml: 2 }}
        color="inherit"
      >
        <MenuIcon fontSize="large" />
      </IconButton>
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <List onClick={() => setIsOpen(false)} sx={{ mt: 1, p: 2 }}>
          <NavItems />
        </List>
      </Drawer>
    </>
  );
};

export default MobileNavMenu;

import React, { useState, useEffect } from 'react';
import { makeStyles, Drawer } from '@material-ui/core';
import SidenavList from './SidenavList';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: ({ drawerWidth }) => drawerWidth
  },
  drawerPaper: {
    width: ({ drawerWidth }) => drawerWidth,
    top: 64,
    [theme.breakpoints.down('sm')]: {
      top: 0
    }
  }
}));

const Sidenav = ({ itemsList, drawerOpen, isMobile, toogleDrawer, drawerWidth }) => {
  const classes = useStyles({ drawerWidth });
  const [drawerVariant, setDrawerVariant] = useState('persistent');

  useEffect(() => {
    setDrawerVariant(isMobile ? 'temporary' : 'persistent');
  });

  return (
    <nav>
      <Drawer
        className={classes.drawer}
        variant={drawerVariant}
        open={drawerOpen}
        onClose={toogleDrawer}
        classes={{ paper: classes.drawerPaper }}
      >
        <SidenavList itemsList={itemsList} />
      </Drawer>
    </nav>
  );
};

export default Sidenav;

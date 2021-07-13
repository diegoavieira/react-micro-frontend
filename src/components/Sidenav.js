import React, { useState, useEffect } from 'react';
import { makeStyles, Drawer, List } from '@material-ui/core';
import SidenavItem from './SidenavItem';

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

const Sidenav = (props) => {
  const { items, drawerOpen, isMobile, toogleDrawer, drawerWidth } = props;
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
        <List>
          {items.map((item) => (
            <SidenavItem key={item.name} item={item} />
          ))}
        </List>
      </Drawer>
    </nav>
  );
};

export default Sidenav;

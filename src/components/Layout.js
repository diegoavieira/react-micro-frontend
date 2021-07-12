import { Drawer, makeStyles, Typography, useTheme } from '@material-ui/core';
import React from 'react';

const drawerWidth = 240;

const useStyles = makeStyles({
  root: {
    display: 'flex'
  },
  page: {
    width: '100%'
  },
  drawer: {
    width: drawerWidth
  },
  drawerPaper: {
    width: drawerWidth
  }
});

const Layout = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <Drawer className={classes.drawer} variant="permanent" classes={{ paper: classes.drawerPaper }}>
        <div>
          <Typography variant="h5">Test Drawer</Typography>
        </div>
      </Drawer>
      <div className={classes.page} style={{ background: theme.palette.background.default }}>
        {children}
      </div>
    </div>
  );
};

export default Layout;

import React from 'react';
import { makeStyles, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const TopToolbar = ({ toogleDrawer }) => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" onClick={toogleDrawer}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          React Micro Frontend
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopToolbar;

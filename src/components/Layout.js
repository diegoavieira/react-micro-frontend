import {
  Drawer,
  makeStyles,
  Typography,
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
  IconButton
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useEffect, useState } from 'react';

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    background: theme.palette.background.default,
    overflowY: 'auto',
    '@media (min-width: 0px) and (orientation: landscape)': {
      height: 'calc(100vh - 48px)'
    },
    '@media (min-width: 600px)': {
      height: 'calc(100vh - 64px)'
    },
    height: 'calc(100vh - 56px)'
  },
  section: {
    width: '100%',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0,
    '&.drawer-closed': {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: -drawerWidth
    }
  },
  drawer: {
    width: drawerWidth
  },
  drawerPaper: {
    width: drawerWidth,
    top: 64,
    [theme.breakpoints.down('sm')]: {
      top: 0
    }
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  toolbarTitle: {
    flexGrow: 1
  }
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerVariant, setDrawerVariant] = useState('persistent');
  const [drawerOpen, setDrawerOpen] = useState(true);

  const toogleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    setDrawerVariant(isMobile ? 'temporary' : 'persistent');
  });

  useEffect(() => {
    setDrawerOpen(!isMobile);
  }, [isMobile]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" onClick={toogleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.toolbarTitle}>
            News
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.main}>
        <nav>
          <Drawer
            className={classes.drawer}
            variant={drawerVariant}
            open={drawerOpen}
            onClose={toogleDrawer}
            classes={{ paper: classes.drawerPaper }}
          >
            <div>
              <Typography variant="h5">Test Drawer</Typography>
            </div>
          </Drawer>
        </nav>
        <section className={`${classes.section} ${!isMobile && !drawerOpen && 'drawer-closed'}`}>{children}</section>
      </main>
    </>
  );
};

export default Layout;

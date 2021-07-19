import { makeStyles, useTheme, useMediaQuery, CssBaseline } from '@material-ui/core';
import React, { useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Sidenav from './Sidenav';
import TopToolbar from './TopToolbar';

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
  }
}));

const Layout = ({ children, sidenavItems }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useLocalStorage('drawerOpen', true);

  const toogleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    if (isMobile) setDrawerOpen(!isMobile);
  }, [isMobile]);

  return (
    <>
      <TopToolbar toogleDrawer={toogleDrawer} />
      <main className={classes.main}>
        <Sidenav
          itemsList={sidenavItems}
          drawerOpen={drawerOpen}
          isMobile={isMobile}
          toogleDrawer={toogleDrawer}
          drawerWidth={drawerWidth}
        />
        <section className={`${classes.section} ${!isMobile && !drawerOpen && 'drawer-closed'}`}>
          <CssBaseline />
          {children}
        </section>
      </main>
    </>
  );
};

export default Layout;

import { makeStyles, useTheme, useMediaQuery } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
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

const sidenavItems = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Create',
    path: '/create'
  },
  {
    name: 'Children',
    path: '/children',
    children: [
      {
        name: 'Child',
        path: '/child'
      }
    ]
  },
  {
    name: 'Children 2',
    path: '/children2',
    children: [
      {
        name: 'Child 2',
        path: '/child2'
      },
      {
        name: 'Child 3',
        path: '/child3'
      }
    ]
  }
];

const Layout = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(true);

  const toogleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    setDrawerOpen(!isMobile);
  }, [isMobile]);

  return (
    <>
      <TopToolbar toogleDrawer={toogleDrawer} />
      <main className={classes.main}>
        <Sidenav
          items={sidenavItems}
          drawerOpen={drawerOpen}
          isMobile={isMobile}
          toogleDrawer={toogleDrawer}
          drawerWidth={drawerWidth}
        />
        <section className={`${classes.section} ${!isMobile && !drawerOpen && 'drawer-closed'}`}>{children}</section>
      </main>
    </>
  );
};

export default Layout;

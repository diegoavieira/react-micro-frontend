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

const sidenavItemsList = [
  {
    id: 1,
    name: '',
    items: [
      {
        id: 1,
        title: 'Home',
        path: '/'
      }
    ]
  },
  {
    id: 2,
    name: 'Subtitle',
    items: [
      {
        id: 1,
        title: 'Children',
        subitems: [
          {
            id: 1,
            title: 'Child',
            path: '/child'
          }
        ]
      },
      {
        id: 2,
        title: 'Children 2',
        subitems: [
          {
            id: 1,
            title: 'Child 2',
            path: '/child2'
          },
          {
            id: 2,
            title: 'Child 3',
            path: '/child3'
          }
        ]
      }
    ]
  },
  {
    id: 3,
    name: 'Subtitle 2',
    items: [
      {
        id: 1,
        title: 'Children 4',
        subitems: [
          {
            id: 1,
            title: 'Child 4',
            path: '/child4'
          }
        ]
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
          itemsList={sidenavItemsList}
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

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
    subtitle: '',
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
    subtitle: 'Subtitle',
    items: [
      {
        id: 1,
        title: 'Subitems 1',
        items: [
          {
            id: 1,
            title: 'Subitem 11',
            path: '/subitem1'
          }
        ]
      },
      {
        id: 2,
        title: 'Subitems 2',
        items: [
          {
            id: 1,
            title: 'Subitem 21',
            path: '/subitem21'
          },
          {
            id: 2,
            title: 'Subitem 22',
            path: '/subitem22'
          }
        ]
      }
    ]
  },
  {
    id: 3,
    subtitle: 'Subitems 3',
    items: [
      {
        id: 1,
        title: 'Subitem 31',
        items: [
          {
            id: 1,
            title: 'Subitem 331',
            path: '/subitem31'
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

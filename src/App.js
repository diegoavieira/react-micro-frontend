import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core';
import Home from './pages/Home';
import Layout from './components/Layout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#004d40',
      light: '#80cbc4'
    },
    secondary: {
      main: '#4db6ac',
      light: '#99d5cf'
    }
    // type: 'dark'
  }
});

const sidenavItems = [
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

const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Layout sidenavItems={sidenavItems}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          {/* <Route path="/create">
          <Create />
        </Route> */}
        </Switch>
      </Layout>
    </Router>
  </ThemeProvider>
);

export default App;

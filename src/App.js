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

const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Layout>
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

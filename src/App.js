import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core';
import { purple } from '@material-ui/core/colors';
import Home from './pages/Home';
import Layout from './components/Layout';

const theme = createTheme({
  palette: {
    primary: purple
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

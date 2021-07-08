
import React from 'react';
import { createTheme, ThemeProvider, Button } from '@material-ui/core';

const theme = createTheme({
  palette: {
    primary: {
      main: "#006400"
    },
    secondary: {
      main: "#ffa500"
    }
  }
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained" color="primary">
        Primary
      </Button>
      <Button variant="contained" color="secondary">
        Secondary
      </Button>
    </ThemeProvider>
  );
}

export default App;
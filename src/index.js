import React from 'react';
import ReactDOM from 'react-dom';
import './i18n'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles'



const customTheme = createTheme({
  palette: {
    mode : 'light',
    primary: {
      main: "#000",
    },

    action : {
      disabledBackground : "rgba(0, 0, 0, 0.555)"
    }
  },
  typography : {
    fontFamily : "Athiti , sans-serif",
  },

})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

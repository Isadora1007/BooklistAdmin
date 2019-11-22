import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import App from './App';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#00829b'
        },
        secondary: {
            main: '#008465'
        }
    }
})

ReactDOM.render(<MuiThemeProvider theme={theme}><App /></MuiThemeProvider>, document.getElementById('root'));
import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import teal from '@material-ui/core/colors/teal'

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
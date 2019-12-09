import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import App from './App'
import { createProvider } from './Context'

//Setting application initial States 
const AppProvider = createProvider({
    isAuth: true,
    editMode: false,
    isSanckbarOpen: false,
    sanckbarMsg: '',
    page: 0,
    userData: {
        authenticateToken: null,
        authenticated: false,   
        displayName: "",    
        message: null,  
        password: null, 
        userName: "",   
    },
    rowsSelected: [],
    rowsPerPage: 25,
    bookLists: null,
    displays: {},
    booklistLayaout: {},
    collections: {},
})

//Modify m-ui theme color palette
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

ReactDOM.render(
    <AppProvider>
        <MuiThemeProvider theme={theme}>
            <App />
        </MuiThemeProvider>
    </AppProvider>
    , document.getElementById('root')
)
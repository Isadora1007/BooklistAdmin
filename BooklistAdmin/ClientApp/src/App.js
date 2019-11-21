import React from 'react';
import PersistentDrawer from './layout/MiniDrawer'
import { BrowserRouter as Router } from "react-router-dom";
import getAuth from './api/getAuth'
import './App.css';

function App() {
    const user = 'aangulodelacruz:CPaadlc271078'
    getAuth(user)
    return (
        <Router>
        <div className="App">
            <PersistentDrawer/>
            </div>
        </Router>
    );
}

export default App;

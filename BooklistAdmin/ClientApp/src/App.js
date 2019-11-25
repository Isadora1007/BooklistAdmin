import React from 'react';
import PersistentDrawer from './layout/MiniDrawer'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css';

function App() {
    
    return (
        <Router>
        <div className="App">
            <PersistentDrawer/>
            </div>
        </Router>
    );
}

export default App;

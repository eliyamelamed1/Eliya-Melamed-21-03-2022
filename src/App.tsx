import './styles/main.scss';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Favorites from './pages/Favorites';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import React from 'react';

function App() {
    return (
        <div className='app'>
            <Router>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/favorites' element={<Favorites />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;

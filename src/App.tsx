import './styles/main.scss';
import 'react-toastify/dist/ReactToastify.css';

import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import React, { useState } from 'react';

import Favorites from './pages/Favorites';
import Home from './pages/Home';
import LoaderContainer from './components/LoaderContainer';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';

function App() {
    const [theme, setTheme] = useState('light');

    const toggle = () => {
        if (theme === 'light') return setTheme('dark');
        setTheme('light');
    };

    return (
        <div data-theme={theme} className='appWrapper'>
            <LoaderContainer />
            <ToastContainer />
            <Router>
                <Navbar toggle={toggle} />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/favorites' element={<Favorites />} />
                    <Route path='*' element={<Navigate to='/' />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;

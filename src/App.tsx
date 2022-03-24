import './styles/main.scss';
import 'react-toastify/dist/ReactToastify.css';

import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import React, { useState } from 'react';

import Favorites from './pages/Favorites';
import Home from './pages/Home';
import LoaderContainer from './components/LoaderContainer';
import MaterialUISwitch from './components/ThemeSwitch';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';

function App() {
    const [theme, setTheme] = useState('light');

    const toggle = () => {
        if (theme === 'light') return setTheme('dark');
        setTheme('light');
    };

    return (
        <html data-theme={theme}>
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
        </html>
    );
}

export default App;

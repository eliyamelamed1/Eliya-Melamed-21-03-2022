import './styles/main.scss';
import 'react-toastify/dist/ReactToastify.css';

import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Favorites from './pages/Favorites';
import Home from './pages/Home';
import LoaderContainer from './components/LoaderContainer';
import Navbar from './components/Navbar';
import React from 'react';
import { ToastContainer } from 'react-toastify';

function App() {
    return (
        <>
            <LoaderContainer />
            <ToastContainer />
            <Router>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/favorites' element={<Favorites />} />
                    <Route path='*' element={<Navigate to='/' />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;

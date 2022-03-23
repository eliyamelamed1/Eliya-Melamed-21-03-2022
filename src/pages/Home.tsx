import Forecast from '../components/Forecast';
import React from 'react';
import SearchBar from '../components/SearchBar';
import ThemeToggle from '../components/ThemeToggle';

const Home = () => {
    return (
        <div className='home'>
            <SearchBar />
            <Forecast />
            {/* <ThemeToggle /> */}
        </div>
    );
};

export default Home;

import Forecast from '../components/Forecast';
import React from 'react';
import SearchBar from '../components/SearchBar';

const Home = () => {
    return (
        <div className='home'>
            <SearchBar />
            <Forecast />
        </div>
    );
};

export default Home;

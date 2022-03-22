import React, { useState } from 'react';

import Forecast from '../components/Forecast';
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

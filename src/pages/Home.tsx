import React, { useEffect } from 'react';

import Forecast from '../components/Forecast';
import SearchBar from '../components/SearchBar';

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};
const success = (pos: any) => {
    var crd = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
};
const error = (err: any) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
};
const Home = () => {
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success, error, options);
    }, []);

    return (
        <div className='home'>
            <SearchBar />
            <Forecast />
        </div>
    );
};

export default Home;

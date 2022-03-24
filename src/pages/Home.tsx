import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Forecast from '../components/Forecast';
import { RootState } from '../redux/store';
import SearchBar from '../components/SearchBar';
import { geoPositionSearchAction } from '../redux/slices/weatherSlice';

const Home = () => {
    const { currentCityAndKey } = useSelector((state: RootState) => state.weatherSlice);
    const dispatch = useDispatch();
    const [display, setDisplay] = useState(false);
    useEffect(() => {
        const fetch = async () => {
            setDisplay(false);
            if (currentCityAndKey.city === '' && currentCityAndKey.key === '') {
                await dispatch(geoPositionSearchAction({ dispatch }));
            }
            setDisplay(true);
        };
        fetch();
    }, [currentCityAndKey, dispatch]);

    return (
        <div className='home'>
            <SearchBar />
            {display && <Forecast />}
        </div>
    );
};

export default Home;

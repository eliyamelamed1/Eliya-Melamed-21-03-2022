import React, { useCallback, useEffect, useState } from 'react';
import { currentTempAction, setFavoriteCitiesWeather } from '../redux/slices/weatherSlice';
import { useDispatch, useSelector } from 'react-redux';

import FavoriteCard from '../components/FavoriteCard';
import { RootState } from '../redux/store';

const Favorites = () => {
    const { favoriteCities, favoriteCitiesWeather } = useSelector((state: RootState) => state.weatherSlice);
    const dispatch = useDispatch();
    const [display, setDisplay] = useState(false);

    const fetchFavoriteCitiesWeather = useCallback(async () => {
        setDisplay(false);
        for (const item in favoriteCities) {
            try {
                const { key, city } = favoriteCities[item];
                let res = await dispatch(currentTempAction({ locationKey: key }));

                // @ts-ignore
                const temperature = res.payload.data?.[0].Temperature.Metric.Value;

                await dispatch(setFavoriteCitiesWeather({ city, key, temperature }));
            } catch (err) {}
        }
        setDisplay(true);
    }, [dispatch, favoriteCities]);

    useEffect(() => {
        fetchFavoriteCitiesWeather();
    }, [fetchFavoriteCitiesWeather]);

    if (!display) return <></>;

    return (
        <div className='favorites'>
            {Object.keys(favoriteCitiesWeather)?.map((item) => {
                // @ts-ignore
                return <FavoriteCard item={favoriteCitiesWeather[item]} />;
            })}
        </div>
    );
};

export default Favorites;

import React, { useEffect, useState } from 'react';
import { currentConditionsAction, setFavoriteCitiesWeather } from '../redux/slices/weatherSlice';
import { useDispatch, useSelector } from 'react-redux';

import FavoriteCard from '../components/FavoriteCard';
import { RootState } from '../redux/store';

const Favorites = () => {
    const { favoriteCities, favoriteCitiesWeather } = useSelector((state: RootState) => state.weatherSlice);
    const dispatch = useDispatch();
    const [display, setDisplay] = useState(false);
    useEffect(() => {
        // function to update favoriteCities details on each refresh
        setDisplay(false);

        const fetchFavoriteCitiesWeather = async () => {
            for (const item in favoriteCities) {
                try {
                    const { key, city } = favoriteCities[item];
                    let res = await dispatch(currentConditionsAction({ locationKey: key }));

                    // @ts-ignore
                    const temperature = res.payload?.data?.[0].Temperature.Metric.Value;

                    await dispatch(setFavoriteCitiesWeather({ city, key, temperature }));
                    setDisplay(true);
                } catch (err) {}
            }
        };
        fetchFavoriteCitiesWeather();
        setDisplay(true);
    }, [favoriteCities, dispatch]);

    if (!display) return <></>;

    return (
        <div className='favorites'>
            {Object.keys(favoriteCitiesWeather)?.map((item) => {
                return <FavoriteCard item={favoriteCitiesWeather[item]} />;
            })}
        </div>
    );
};

export default Favorites;

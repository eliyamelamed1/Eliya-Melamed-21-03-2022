import React, { useEffect, useState } from 'react';
import { currentConditionsAction, setFavoriteCitiesData } from '../redux/slices/weatherSlice';
import { useDispatch, useSelector } from 'react-redux';

import FavoriteCard from '../components/FavoriteCard';
import { RootState } from '../redux/store';
import { unitTypeConverter } from '../utils/unitTypeConverter';

const Favorites = () => {
    const { favoriteCities, favoriteCitiesData } = useSelector((state: RootState) => state.weatherSlice);
    const dispatch = useDispatch();
    const [display, setDisplay] = useState(false);
    useEffect(() => {
        // function to update favoriteCities details on each refresh
        Object.keys(favoriteCities)?.map(async (item) => {
            try {
                setDisplay(false);
                item = favoriteCities[item];
                // @ts-ignore
                const { key, city } = item;
                let res = await dispatch(currentConditionsAction({ locationKey: key }));

                // @ts-ignore
                const temperature = res.payload?.data?.[0].Temperature.Metric.Value;

                await dispatch(setFavoriteCitiesData({ city, key, temperature }));
                setDisplay(true);
            } catch (err) {
                setDisplay(true);
            }
        });
    }, [favoriteCities, dispatch]);

    if (!display) return <></>;

    return (
        <div className='favorites'>
            {Object.keys(favoriteCitiesData)?.map((item) => {
                return <FavoriteCard item={favoriteCitiesData[item]} />;
            })}
        </div>
    );
};

export default Favorites;

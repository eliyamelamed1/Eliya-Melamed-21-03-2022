import React, { useEffect } from 'react';
import { currentConditionsAction, setFavoriteCitiesData } from '../redux/slices/weatherSlice';
import { useDispatch, useSelector } from 'react-redux';

import FavoriteCard from '../components/FavoriteCard';
import { RootState } from '../redux/store';
import { unitTypeConverter } from '../utils/unitTypeConverter';

const Favorites = () => {
    const { favoriteCities, favoriteCitiesData, tempUnits } = useSelector((state: RootState) => state.weatherSlice);
    const dispatch = useDispatch();
    useEffect(() => {
        // function to update favoriteCities details on each refresh
        Object.keys(favoriteCities)?.map(async (item) => {
            try {
                item = favoriteCities[item];
                // @ts-ignore
                const { key, city } = item;
                let res = await dispatch(currentConditionsAction({ locationKey: key }));

                // @ts-ignore
                const temperature = res.payload?.data?.[0].Temperature.Metric.Value;

                dispatch(setFavoriteCitiesData({ city, key, temperature }));
            } catch (err) {}
        });
    }, [favoriteCities, dispatch]);

    return (
        <div className='favorites'>
            {Object.keys(favoriteCitiesData)?.map((item) => {
                return <FavoriteCard item={favoriteCitiesData[item]} />;
            })}
        </div>
    );
};

export default Favorites;

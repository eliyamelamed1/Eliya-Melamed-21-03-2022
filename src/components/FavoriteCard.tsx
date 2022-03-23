import React, { useEffect } from 'react';
import { currentConditionsAction, setFavoriteCitiesData } from '../redux/slices/weatherSlice';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { RootState } from '../redux/store';

const FavoriteCard = () => {
    const { favoriteCities, favoriteCitiesData } = useSelector((state: RootState) => state.weatherSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        Object.keys(favoriteCities)?.map(async (item) => {
            item = favoriteCities[item];
            // @ts-ignore
            const { key, city } = item;
            let res = await dispatch(currentConditionsAction({ locationKey: key }));

            // @ts-ignore
            const temperature = res.payload.data[0].Temperature.Metric.Value;

            dispatch(setFavoriteCitiesData({ city, key, temperature }));
        });
    }, [favoriteCities, dispatch]);

    const Card = (item: { city: string; key: string; temperature: 'string' }) => {
        if (item && item.city)
            return (
                <Link key={item.city} to='/'>
                    <h1>{item.city}</h1>
                    <h1>{item.temperature}°</h1>
                </Link>
            );
    };

    return (
        <div className='favorite-card'>
            {Object.keys(favoriteCitiesData)?.map((item) => {
                return Card(favoriteCitiesData[item]);
            })}
        </div>
    );
};

export default FavoriteCard;

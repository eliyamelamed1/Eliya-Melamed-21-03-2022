import React, { useEffect } from 'react';
import { currentConditionsAction, setCurrentCityAndKey, setFavoriteCitiesData } from '../redux/slices/weatherSlice';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { RootState } from '../redux/store';
import { degreesConverter } from '../utils/degreesConverter';

const FavoriteCard = () => {
    const { favoriteCities, favoriteCitiesData, degrees } = useSelector((state: RootState) => state.weatherSlice);
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

    const Card = (item: { city: string; key: string; temperature: number }) => {
        const onClick = async (item: { city: string; key: string; temperature: number }) => {
            const { key, city } = item;
            await dispatch(setCurrentCityAndKey({ city, key }));
        };

        if (item) {
            let { city, temperature } = item;
            temperature = degreesConverter({ degreesValue: temperature, degreesType: degrees });

            return (
                <Link key={city} to='/' onClick={() => onClick(item)}>
                    <h1>{city}</h1>
                    <h1>{temperature?.toFixed(1)}°</h1>
                </Link>
            );
        }
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

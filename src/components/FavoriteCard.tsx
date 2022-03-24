import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import React from 'react';
import { RootState } from '../redux/store';
import { setCurrentCityAndKey } from '../redux/slices/weatherSlice';
import { unitTypeConverter } from '../utils/unitTypeConverter';

interface ItemType {
    city: string;
    key: string;
    temperature: number;
}

const FavoriteCard: React.FC<{ item: ItemType }> = ({ item }) => {
    const { tempUnits } = useSelector((state: RootState) => state.weatherSlice);
    const dispatch = useDispatch();

    const Card = (item: { city: string; key: string; temperature: number }) => {
        const onClick = async (item: { city: string; key: string; temperature: number }) => {
            const { key, city } = item;
            await dispatch(setCurrentCityAndKey({ city, key }));
        };

        if (item) {
            let { city, temperature } = item;
            temperature = unitTypeConverter({ temp: temperature, unit: tempUnits });

            return (
                <Link key={city} to='/' onClick={() => onClick(item)}>
                    <h2>{city}</h2>
                    <h2>{temperature?.toFixed(1)}°</h2>
                </Link>
            );
        }
    };

    return <div className='favorite-card'>{Card(item)}</div>;
};

export default FavoriteCard;

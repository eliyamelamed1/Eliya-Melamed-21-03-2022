import { Link } from 'react-router-dom';
import React from 'react';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

const FavoriteCard = () => {
    const { favoriteCities } = useSelector((state: RootState) => state.weatherSlice);
    const Card = (item: { city: string; key: string }) => (
        <Link to='/'>
            <h1>{item.city}</h1>
            {/* <h1>{item.degrees}°</h1> */}
            <h1>{item.key}</h1>
        </Link>
    );
    return (
        <div className='favorite-card'>
            {Object.keys(favoriteCities)?.map((item) => {
                return Card(favoriteCities[item]);
            })}
        </div>
    );
};

export default FavoriteCard;

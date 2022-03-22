import { Link } from 'react-router-dom';
import React from 'react';

const list = [
    {
        name: 'tel aviv',
        degrees: '51C',
        forecast: 'Rainy',
    },
    {
        name: 'Eilat',
        degrees: '63C',
        forecast: 'sunny',
    },
    {
        name: 'tel aviv',
        degrees: '51C',
        forecast: 'Rainy',
    },
    {
        name: 'Eilat',
        degrees: '63C',
        forecast: 'sunny',
    },
    {
        name: 'tel aviv',
        degrees: '51C',
        forecast: 'Rainy',
    },
    {
        name: 'Eilat',
        degrees: '63C',
        forecast: 'sunny',
    },
    {
        name: 'tel aviv',
        degrees: '51C',
        forecast: 'Rainy',
    },
    {
        name: 'Eilat',
        degrees: '63C',
        forecast: 'sunny',
    },
];
const FavoriteCard = () => {
    const Card = (item: any) => (
        <Link to='/'>
            <h1>{item.name}</h1>
            <h1>{item.degrees}°</h1>
            <h1>{item.forecast}</h1>
        </Link>
    );
    return (
        <div className='favorite-card'>
            {list.map((item) => {
                return Card(item);
            })}
        </div>
    );
};

export default FavoriteCard;

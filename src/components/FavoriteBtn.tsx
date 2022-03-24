import { useDispatch, useSelector } from 'react-redux';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import React from 'react';
import { RootState } from '../redux/store';
import { setFavoriteCities } from '../redux/slices/weatherSlice';

const FavoriteBtn = () => {
    const dispatch = useDispatch();
    const { currentCityAndKey, favoriteCities } = useSelector((state: RootState) => state.weatherSlice);
    const { key, city } = currentCityAndKey;
    const onClick = () => {
        dispatch(setFavoriteCities({ city, key }));
    };

    const displayBtn = () => {
        const isAlreadyFavorite = favoriteCities[key];
        if (isAlreadyFavorite) return <FavoriteIcon fontSize='large' color='error' />;
        return <FavoriteBorderIcon fontSize='large' color='error' />;
    };

    return (
        <button className='add-favorite' onClick={onClick}>
            {displayBtn()}
        </button>
    );
};

export default FavoriteBtn;

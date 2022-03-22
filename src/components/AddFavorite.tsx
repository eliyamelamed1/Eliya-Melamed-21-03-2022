import { useDispatch, useSelector } from 'react-redux';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import React from 'react';
import { RootState } from '../redux/store';
import { setFavoriteCities } from '../redux/slices/weatherSlice';

const AddFavorite = () => {
    const dispatch = useDispatch();
    const { cityDetails, favoriteCities } = useSelector((state: RootState) => state.weatherSlice);
    const { key, city } = cityDetails;
    const onClick = () => {
        dispatch(setFavoriteCities({ city, key }));
    };

    return (
        <div className='add-favorite'>
            {favoriteCities[key] ? (
                <FavoriteIcon fontSize='large' color='error' />
            ) : (
                <FavoriteBorderIcon fontSize='large' color='error' />
            )}
            <button onClick={onClick}>Add to Favorites</button>
        </div>
    );
};

export default AddFavorite;

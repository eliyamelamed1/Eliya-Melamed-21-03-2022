import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import React from 'react';

const AddFavorite = () => {
    return (
        <div className='add-favorite'>
            <FavoriteBorderIcon fontSize='large' color='error' />
            <button>Add to Favorites</button>
        </div>
    );
};

export default AddFavorite;

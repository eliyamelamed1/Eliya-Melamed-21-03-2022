import { ClockLoader } from 'react-spinners';
import React from 'react';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

const LoaderContainer = () => {
    const { isLoading } = useSelector((state: RootState) => state.loadingSlice);
    return (
        <div className='loader-container'>
            <ClockLoader size={110} loading={isLoading} css={'loader'} color='#00aaf8e0' />
        </div>
    );
};
export default LoaderContainer;

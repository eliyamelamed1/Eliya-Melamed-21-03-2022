import ForecastCard, { ItemType } from './ForecastCard';
import React, { useEffect } from 'react';
import { currentConditionsAction, fiveDaysForecastsAction } from '../redux/slices/weatherSlice';
import { useDispatch, useSelector } from 'react-redux';

import AddFavorite from './AddFavorite';
import { RootState } from '../redux/store';

const Forecast = () => {
    const dispatch = useDispatch();
    const { fiveDaysForecasts, currentConditions } = useSelector((state: RootState) => state.weatherSlice);
    const { isLoading } = useSelector((state: RootState) => state.loadingSlice);
    console.log(currentConditions);
    useEffect(() => {
        dispatch(fiveDaysForecastsAction({ locationKey: '215854' }));
        dispatch(currentConditionsAction({ locationKey: '215854' }));
    }, [dispatch]);

    if (!isLoading)
        return (
            <div className='forecast'>
                <AddFavorite />
                <h1 className='header'>{fiveDaysForecasts?.Headline.Text}</h1>
                <section>
                    {fiveDaysForecasts?.DailyForecasts.map((item) => {
                        return <ForecastCard item={item as ItemType} />;
                    })}
                </section>
            </div>
        );
    return <></>;
};

export default Forecast;

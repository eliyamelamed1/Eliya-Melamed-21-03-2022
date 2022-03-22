import ForecastCard, { ItemType } from './ForecastCard';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../redux/store';
import { fiveDaysDummy } from '../fiveDaysForecasts';
import { fiveDaysForecastsAction } from '../redux/slices/weatherSlice';

const Forecast = () => {
    const dispatch = useDispatch();
    const { fiveDaysForecasts } = useSelector((state: RootState) => state.weatherSlice);

    useEffect(() => {
        dispatch(fiveDaysForecastsAction({ locationKey: '215854' }));
    }, [dispatch]);
    console.log(fiveDaysForecasts);
    return (
        <div className='forecast'>
            <h1 className='header'>{fiveDaysForecasts?.Headline.Text}</h1>
            <section>
                {fiveDaysForecasts?.DailyForecasts.map((item) => {
                    return <ForecastCard item={item as ItemType} />;
                })}
            </section>
        </div>
    );
};

export default Forecast;

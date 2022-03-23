import ForecastCard, { ItemType } from './ForecastCard';
import React, { useEffect } from 'react';
import { currentConditionsAction, fiveDaysForecastsAction, setDegrees } from '../redux/slices/weatherSlice';
import { useDispatch, useSelector } from 'react-redux';

import AddFavorite from './AddFavorite';
import { Button } from '@mui/material';
import { RootState } from '../redux/store';

const Forecast = () => {
    const dispatch = useDispatch();
    const { fiveDaysForecasts, currentConditions, currentCityAndKey, degrees } = useSelector(
        (state: RootState) => state.weatherSlice
    );

    useEffect(() => {
        dispatch(fiveDaysForecastsAction({ locationKey: currentCityAndKey.key }));
        dispatch(currentConditionsAction({ locationKey: currentCityAndKey.key }));
    }, [dispatch, currentCityAndKey]);

    const CityDetails = () => (
        <section className='city-details'>
            <h2>{currentCityAndKey.city}</h2>
            <h2>{currentConditions?.Temperature.Metric.Value}°</h2>
        </section>
    );

    const onClick = () => {
        console.log(degrees);
        if (degrees === 'C') return dispatch(setDegrees('F'));
        return dispatch(setDegrees('C'));
    };

    if (fiveDaysForecasts)
        return (
            <div className='forecast'>
                <header>
                    <Button onClick={onClick} variant='contained'>
                        °{degrees}
                    </Button>
                    <CityDetails />
                    <AddFavorite />
                </header>

                <h1>{fiveDaysForecasts.Headline.Text}</h1>
                <section className='five-days-forecasts'>
                    {fiveDaysForecasts.DailyForecasts.map((item) => {
                        return <ForecastCard item={item as ItemType} />;
                    })}
                </section>
            </div>
        );

    return <></>;
};

export default Forecast;

import ForecastCard, { ItemType } from './ForecastCard';
import React, { useEffect } from 'react';
import { currentConditionsAction, fiveDaysForecastsAction } from '../redux/slices/weatherSlice';
import { useDispatch, useSelector } from 'react-redux';

import AddFavorite from './AddFavorite';
import { RootState } from '../redux/store';

const Forecast = () => {
    const dispatch = useDispatch();
    const { fiveDaysForecasts, currentConditions, currentCityAndKey } = useSelector(
        (state: RootState) => state.weatherSlice
    );
    const { isLoading } = useSelector((state: RootState) => state.loadingSlice);

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

    if (!isLoading)
        return (
            <div className='forecast'>
                <header>
                    <CityDetails />
                    <AddFavorite />
                </header>

                <h1>{fiveDaysForecasts?.Headline.Text}</h1>
                <section className='five-days-forecasts'>
                    {fiveDaysForecasts?.DailyForecasts.map((item) => {
                        return <ForecastCard item={item as ItemType} />;
                    })}
                </section>
            </div>
        );

    return <></>;
};

export default Forecast;

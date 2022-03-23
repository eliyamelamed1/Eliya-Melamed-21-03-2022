import ForecastCard, { ItemType } from './ForecastCard';
import React, { useEffect, useState } from 'react';
import { currentConditionsAction, fiveDaysForecastsAction, setDegrees } from '../redux/slices/weatherSlice';
import { useDispatch, useSelector } from 'react-redux';

import AddFavorite from './AddFavorite';
import { Button } from '@mui/material';
import { RootState } from '../redux/store';
import { degreesConverter } from '../utils/degreesConverter';

const Forecast = () => {
    const dispatch = useDispatch();
    const { fiveDaysForecasts, currentConditions, currentCityAndKey, degrees } = useSelector(
        (state: RootState) => state.weatherSlice
    );
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        const func = async () => {
            setDisplay(false);
            await dispatch(fiveDaysForecastsAction({ locationKey: currentCityAndKey.key }));
            await dispatch(currentConditionsAction({ locationKey: currentCityAndKey.key }));
            setDisplay(true);
        };
        func();
    }, [dispatch, currentCityAndKey]);

    const CurrentCityWeather = () => {
        if (!currentCityAndKey) return <></>;

        const { city } = currentCityAndKey;
        let temperature = currentConditions?.Temperature.Metric.Value;
        if (!temperature || !city) return <></>;
        temperature = degreesConverter({ degreesValue: temperature, degreesType: degrees });
        return (
            <section className='city-details'>
                <h2>{city}</h2>
                <h2>{temperature.toFixed(1)}°</h2>
            </section>
        );
    };

    const onClick = () => {
        if (degrees === 'C') return dispatch(setDegrees('F'));
        return dispatch(setDegrees('C'));
    };

    if (fiveDaysForecasts && currentCityAndKey && display)
        return (
            <div className='forecast'>
                <header>
                    <Button onClick={onClick} variant='contained'>
                        °{degrees}
                    </Button>
                    <CurrentCityWeather />
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

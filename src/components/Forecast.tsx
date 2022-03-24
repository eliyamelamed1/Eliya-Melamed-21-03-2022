import React, { useEffect, useState } from 'react';
import { currentConditionsAction, fiveDaysForecastsAction, setTempUnit } from '../redux/slices/weatherSlice';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@mui/material';
import FavoriteBtn from './FavoriteBtn';
import ForecastCard from './ForecastCard';
import { ItemType } from '../redux/types/weatherTypes';
import { RootState } from '../redux/store';
import { unitTypeConverter } from '../utils/unitTypeConverter';

const Forecast = () => {
    const dispatch = useDispatch();
    const { fiveDaysForecasts, currentConditions, currentCityAndKey, tempUnits } = useSelector(
        (state: RootState) => state.weatherSlice
    );
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        const func = async () => {
            if (currentCityAndKey.city === '' || currentCityAndKey.key === '') return;
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
        temperature = unitTypeConverter({ temp: temperature, unit: tempUnits });
        return (
            <section className='city-details'>
                <h2>{city}</h2>
                <h2>{temperature.toFixed(1)}°</h2>
            </section>
        );
    };

    const onClick = () => {
        if (tempUnits === 'C') return dispatch(setTempUnit('F'));
        return dispatch(setTempUnit('C'));
    };

    if (!display) return <></>;
    return (
        <div className='forecast'>
            <header>
                <Button onClick={onClick} variant='contained' className='unitButton'>
                    °{tempUnits}
                </Button>
                <CurrentCityWeather />
                <FavoriteBtn />
            </header>
            {fiveDaysForecasts && (
                <>
                    <h1>{fiveDaysForecasts.Headline.Text}</h1>
                    <section className='five-days-forecasts'>
                        {fiveDaysForecasts.DailyForecasts.map((item) => {
                            return <ForecastCard item={item as ItemType} />;
                        })}
                    </section>
                </>
            )}
        </div>
    );
};

export default Forecast;

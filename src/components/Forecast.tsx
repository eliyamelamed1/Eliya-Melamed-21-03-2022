import ForecastCard, { itemType } from './ForecastCard';

import React from 'react';
import { fiveDaysDummy } from '../fiveDaysForecasts';

const Forecast = () => {
    return (
        <div className='forecast'>
            <h1 className='header'>{fiveDaysDummy.Headline.Text}</h1>
            <section>
                {fiveDaysDummy.DailyForecasts.map((item) => {
                    return <ForecastCard item={item as itemType} />;
                })}
            </section>
        </div>
    );
};

export default Forecast;

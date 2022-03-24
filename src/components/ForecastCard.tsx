import { ItemType } from '../redux/types/weatherTypes';
import React from 'react';
import { RootState } from '../redux/store';
import { unitTypeConverter } from '../utils/unitTypeConverter';
import { useSelector } from 'react-redux';

const daysEnum: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const ForecastCard: React.FC<{ item: ItemType }> = ({ item }) => {
    const date = item.Date;
    const day = daysEnum[new Date(date).getDay()];
    const { tempUnits } = useSelector((state: RootState) => state.weatherSlice);

    let minTemp = item.Temperature.Minimum.Value;
    let maxTemp = item.Temperature.Maximum.Value;

    minTemp = Math.round(unitTypeConverter({ temp: minTemp, unit: tempUnits }));
    maxTemp = Math.round(unitTypeConverter({ temp: maxTemp, unit: tempUnits }));

    return (
        <div className='forecast-card' key={day}>
            <h3> {day} </h3>
            <h3>
                {minTemp}° - {maxTemp}°
            </h3>
        </div>
    );
};

export default ForecastCard;

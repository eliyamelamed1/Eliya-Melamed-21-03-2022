import React from 'react';
import { RootState } from '../redux/store';
import { unitTypeConverter } from '../utils/unitTypeConverter';
import { useSelector } from 'react-redux';

const daysEnum: string[] = ['Sunday', 'Monday', 'Tueday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export interface ItemType {
    Date: string;
    EpochDate: number;
    Temperature: {
        Minimum: {
            Value: number;
            Unit: string;
            UnitType: number;
        };
        Maximum: {
            Value: number;
            Unit: string;
            UnitType: number;
        };
    };
    Day: {
        Icon: number;
        IconPhrase: string;
        HasPrecipitation: boolean;
    };
    Night: {
        Icon: number;
        IconPhrase: string;
        HasPrecipitation: boolean;
    };
    Sources: [string];
    MobileLink: string;
    Link: string;
}

const ForecastCard: React.FC<{ item: ItemType }> = ({ item }) => {
    const date = item.Date;
    const day = daysEnum[new Date(date).getDay()];
    const { tempUnits } = useSelector((state: RootState) => state.weatherSlice);

    let minTemp = item.Temperature.Minimum.Value;
    minTemp = unitTypeConverter({ temp: minTemp, unit: tempUnits });

    let maxTemp = item.Temperature.Maximum.Value;
    maxTemp = unitTypeConverter({ temp: maxTemp, unit: tempUnits });

    return (
        <div className='forecast-card' key={day}>
            <h3> {day} </h3>
            <h3>
                {Math.round(minTemp)}° - {Math.round(maxTemp)}°
            </h3>
        </div>
    );
};

export default ForecastCard;

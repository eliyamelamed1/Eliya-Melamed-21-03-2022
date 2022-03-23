import React from 'react';
import { RootState } from '../redux/store';
import { degreesConverter } from '../utils/degreesConverter';
import { useSelector } from 'react-redux';

const daysObj: string[] = ['Sunday', 'Monday', 'Tueday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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
    const { degrees } = useSelector((state: RootState) => state.weatherSlice);

    let minTemp = item.Temperature.Minimum.Value;
    minTemp = degreesConverter({ degreesValue: minTemp, degreesType: degrees });
    let maxTemp = item.Temperature.Maximum.Value;
    maxTemp = degreesConverter({ degreesValue: maxTemp, degreesType: degrees });
    const date = item.Date;
    const day = new Date(date).getDay();
    return (
        <div className='forecast-card'>
            <h3> {daysObj[day]} </h3>
            <h3>
                {Math.round(minTemp)}° - {Math.round(maxTemp)}°
            </h3>
        </div>
    );
};

export default ForecastCard;

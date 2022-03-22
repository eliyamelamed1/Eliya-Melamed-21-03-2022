import React from 'react';

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
    const minTemp = item.Temperature.Minimum.Value;
    const maxTemp = item.Temperature.Maximum.Value;
    const date = item.Date;
    const day = new Date(date).getDay();

    return (
        <div className='forecast-card'>
            <h3> {daysObj[day]} </h3>
            <h3>
                {minTemp}° - {maxTemp}°
            </h3>
        </div>
    );
};

export default ForecastCard;

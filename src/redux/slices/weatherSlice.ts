import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ItemType } from '../../components/ForecastCard';
import axios from 'axios';
import { axiosInstance } from '../../utils/axiosInstance';
import { endpoints } from '../../utils/enums';

const apikey = 'wGmLAC5jxYd4WTsXJbnXhGmhaBlAZbSV';

// TYPES
export interface SearchResultsType {
    Version: number;
    Key: string;
    Type: string;
    Rank: number;
    LocalizedName: string;
    Country: {
        ID: string;
        LocalizedName: string;
    };
    AdministrativeArea: {
        ID: string;
        LocalizedName: string;
    };
}

export interface FiveDaysForecasts {
    Headline: {
        EffectiveDate: string;
        EffectiveEpochDate: number;
        Severity: number;
        Text: string;
        Category: string;
        EndDate: string;
        EndEpochDate: number;
        MobileLink: string;
        Link: string;
    };
    DailyForecasts: ItemType[];
}
export interface CurrentConditionsType {
    LocalObservationDateTime: string;
    EpochTime: number;
    WeatherText: string;
    WeatherIcon: number;
    HasPrecipitation: boolean;
    PrecipitationType: null;
    IsDayTime: boolean;
    Temperature: {
        Metric: {
            Value: number;
            Unit: string;
            UnitType: number;
        };
        Imperial: {
            Value: number;
            Unit: string;
            UnitType: number;
        };
    };
    MobileLink: string;
    Link: string;
}
interface initialStateTypes {
    searchResults: SearchResultsType[];
    fiveDaysForecasts: FiveDaysForecasts | null;
    locationKey: string;
    currentConditions: CurrentConditionsType | null;
    cityDetails: {
        city: string;
        key: string;
    };
    favoriteCities: any;
}
const initialState: initialStateTypes = {
    searchResults: [],
    locationKey: 'null',
    fiveDaysForecasts: null,
    currentConditions: null,
    cityDetails: {
        city: 'Tel-Aviv',
        key: '215854',
    },

    // @ts-ignore
    favoriteCities: JSON.parse(localStorage.getItem('favoriteCities')) || {},
};

// ACTIONS
export const autoCompleteSearchAction = createAsyncThunk<
    {},
    {
        q: string;
    }
>('autoCompleteSearchAction', async ({ q }, { rejectWithValue }) => {
    try {
        let res = axios.get(endpoints({ q, apikey }).autoCompleteSearch);
        return res;
    } catch (err) {
        return rejectWithValue(err);
    }
});

export const fiveDaysForecastsAction = createAsyncThunk<
    {},
    {
        locationKey: string;
    }
>('fiveDaysForecastsAction', async ({ locationKey }, { rejectWithValue }) => {
    try {
        let res = axiosInstance.get(endpoints({ locationKey, apikey }).fiveDaysForecasts);
        return res;
    } catch (err) {
        return rejectWithValue(err);
    }
});

export const currentConditionsAction = createAsyncThunk<
    {},
    {
        locationKey: string;
    }
>('currentConditionsAction', async ({ locationKey }, { rejectWithValue }) => {
    try {
        let res = axiosInstance.get(endpoints({ locationKey, apikey }).currentConditions);
        return res;
    } catch (err) {
        return rejectWithValue(err);
    }
});

export const weatherSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setCityDetails: (state, { payload }) => {
            state.cityDetails = payload;
        },
        setFavoriteCities: (state, { payload }) => {
            if (state.favoriteCities[payload.key]) delete state.favoriteCities[payload.key];
            else state.favoriteCities[payload.key] = payload;
            localStorage.setItem('favoriteCities', JSON.stringify(state.favoriteCities));
        },
    },
    extraReducers: (builder) => {
        builder.addCase<any>(autoCompleteSearchAction.fulfilled, (state, { payload }) => {
            state.searchResults = payload.data;
        });
        builder.addCase<any>(fiveDaysForecastsAction.fulfilled, (state, { payload }) => {
            state.fiveDaysForecasts = payload.data;
        });
        builder.addCase<any>(currentConditionsAction.fulfilled, (state, { payload }) => {
            state.currentConditions = payload.data[0];
        });
    },
});

export const { setCityDetails, setFavoriteCities } = weatherSlice.actions;

export default weatherSlice.reducer;

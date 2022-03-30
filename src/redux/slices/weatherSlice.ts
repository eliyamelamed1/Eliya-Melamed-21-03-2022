import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { apikey } from '../../utils/constants';
import axios from 'axios';
import { axiosInstance } from '../../utils/axiosInstance';
import { endpoints } from '../../utils/enums';
import { initialStateTypes } from '../types/weatherTypes';
import { tryParseJSONObject } from '../../utils/jsonParse';

const initialState: initialStateTypes = {
    searchResults: [],
    fiveDaysForecasts: null,
    currentTemp: null,
    currentCityAndKey: {
        city: '',
        key: '',
    },
    favoriteCities: tryParseJSONObject(localStorage.getItem('favoriteCities')),
    favoriteCitiesWeather: [],
    tempUnits: 'C',
};

export const autoCompleteSearchAction = createAsyncThunk<
    {},
    {
        q: string;
    }
>('autoCompleteSearchAction', async ({ q }, { rejectWithValue }) => {
    try {
        let res = await axios.get(endpoints({ q, apikey }).autoCompleteSearch);
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
        let res = await axiosInstance.get(endpoints({ locationKey, apikey }).fiveDaysForecasts);
        return res;
    } catch (err) {
        return rejectWithValue(err);
    }
});

export const currentTempAction = createAsyncThunk<
    {},
    {
        locationKey: string;
    }
>('currentTempAction', async ({ locationKey }, { rejectWithValue }) => {
    try {
        let res = await axiosInstance.get(endpoints({ locationKey, apikey }).currentTemp);
        return res;
    } catch (err) {
        return rejectWithValue(err);
    }
});

export const geoPositionSearchAction = createAsyncThunk<{}, { dispatch: any }>(
    'geoPositionSearchAction',
    async ({ dispatch }) => {
        navigator.geolocation.getCurrentPosition(async function (position) {
            try {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const q = lat + ',' + lon;

                const res = await axiosInstance.get(endpoints({ apikey, q }).geoPositionSearch);
                const key = res.data.Key;
                const city = res.data.EnglishName;
                return dispatch(setCurrentCityAndKey({ key, city }));
            } catch (err) {
                const key = '215854';
                const city = 'Tel-Aviv';
                return dispatch(setCurrentCityAndKey({ key, city }));
            }
        });
    }
);

export const weatherSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setCurrentCityAndKey: (state, { payload }) => {
            state.currentCityAndKey = payload;
        },
        setFavoriteCities: (state, { payload }) => {
            if (state.favoriteCities[payload.key]) {
                delete state.favoriteCities[payload.key];
                delete state.favoriteCitiesWeather[payload.key];
            } else state.favoriteCities[payload.key] = payload;
            localStorage.setItem('favoriteCities', JSON.stringify(state.favoriteCities));
        },

        setFavoriteCitiesWeather: (state, { payload }) => {
            const { city, key, temperature } = payload;
            state.favoriteCitiesWeather[key] = { key, city, temperature };
        },
        setTempUnit: (state, { payload }) => {
            state.tempUnits = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase<any>(autoCompleteSearchAction.fulfilled, (state, { payload }) => {
            state.searchResults = payload.data;
        });
        builder.addCase<any>(fiveDaysForecastsAction.fulfilled, (state, { payload }) => {
            state.fiveDaysForecasts = payload.data;
        });
        builder.addCase<any>(currentTempAction.fulfilled, (state, { payload }) => {
            state.currentTemp = +payload.data[0].Temperature.Metric.Value;
        });
    },
});

export const { setCurrentCityAndKey, setFavoriteCities, setFavoriteCitiesWeather, setTempUnit } = weatherSlice.actions;

export default weatherSlice.reducer;

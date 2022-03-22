import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ItemType } from '../../components/ForecastCard';
import axios from 'axios';
import { endpoints } from '../../utils/enums';

const apikey = 'wGmLAC5jxYd4WTsXJbnXhGmhaBlAZbSV';
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
interface initialStateTypes {
    searchResults: SearchResultsType[];
    fiveDaysForecasts: FiveDaysForecasts | null;
    locationKey: string;
}
const initialState: initialStateTypes = {
    searchResults: [],
    locationKey: 'null',
    fiveDaysForecasts: null,
};

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
        let res = axios.get(endpoints({ locationKey, apikey }).fiveDaysForecasts);
        return res;
    } catch (err) {
        return rejectWithValue(err);
    }
});

export const weatherSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase<any>(autoCompleteSearchAction.fulfilled, (state, { payload }) => {
            state.searchResults = payload.data;
        });
        builder.addCase<any>(fiveDaysForecastsAction.fulfilled, (state, { payload }) => {
            state.fiveDaysForecasts = payload.data;
        });
    },
});

export default weatherSlice.reducer;

import React, { useCallback, useEffect, useState } from 'react';
import {
    autoCompleteSearchAction,
    currentConditionsAction,
    fiveDaysForecastsAction,
    setCurrentCityAndKey,
} from '../redux/slices/weatherSlice';
import { useDispatch, useSelector } from 'react-redux';

import Autocomplete from '@mui/material/Autocomplete';
import { CircularProgress } from '@mui/material';
import { RootState } from '../redux/store';
import { SearchResultsType } from '../redux/types/weatherTypes';
import TextField from '@mui/material/TextField';
import { debounce } from 'lodash';
import { toast } from 'react-toastify';

const SearchBar = () => {
    const dispatch = useDispatch();
    const [city, setCity] = useState('');
    const [options, setOptions] = useState<SearchResultsType[]>([]);
    const [loading, setLoading] = useState(false);
    const { searchResults } = useSelector((state: RootState) => state.weatherSlice);

    const deb = useCallback(
        debounce((e: any) => {
            setCity(e.target.value);
        }, 300),
        [city]
    );

    const onChange = (e: any) => {
        deb(e);
    };

    useEffect(() => {
        const searchCities = async () => {
            if (city?.trim() === '') return setOptions([]);
            setLoading(true);
            await dispatch(autoCompleteSearchAction({ q: city }));
            setLoading(false);
        };
        searchCities();
    }, [city, dispatch]);

    useEffect(() => {
        setOptions(searchResults);
    }, [searchResults]);

    const onSubmit = async () => {
        for (const obj of options) {
            if (obj.LocalizedName !== city) continue;
            const key = obj.Key;
            dispatch(
                setCurrentCityAndKey({
                    key,
                    city,
                })
            );
            dispatch(fiveDaysForecastsAction({ locationKey: key })) &&
                dispatch(currentConditionsAction({ locationKey: key }));
            return setCity('');
        }
        return toast.error('Wrong city - please choose from one of the options ');
    };

    return (
        <div className='search-bar'>
            <Autocomplete
                className='auto-complete'
                disableClearable
                freeSolo
                options={options}
                loading={loading}
                getOptionLabel={(option) => option.LocalizedName}
                color='white'
                renderInput={(params) => (
                    <TextField
                        onSelect={onChange}
                        name='city'
                        {...params}
                        label='Cities'
                        InputLabelProps={{
                            className: 'label',
                        }}
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            endAdornment: (
                                <React.Fragment>
                                    {loading && <CircularProgress className='circular-progress' size={20} />}
                                </React.Fragment>
                            ),
                        }}
                    />
                )}
            />
            <button onClick={onSubmit}>Check Weather</button>
        </div>
    );
};

export default SearchBar;

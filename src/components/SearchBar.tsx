import React, { useCallback, useEffect, useState } from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import { CircularProgress } from '@mui/material';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { debounce } from 'lodash';
import { toast } from 'react-toastify';

const SearchBar = () => {
    const [city, setCity] = useState('');
    const [options, setOptions] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const deb = useCallback(
        debounce((e: any) => {
            setCity(e.target.value);
        }, 300),
        [city]
    );

    const onChange = (e: any) => {
        deb(e);
        setCity(e.target.value);
    };

    useEffect(() => {
        const searchRegions = async () => {
            if (city?.trim() === '') return setOptions([]);
            setLoading(true);
            const res = await axios.get(
                `https://data.opendatasoft.com/api/records/1.0/search/?dataset=geonames-postal-code%40public&q=${city}&rows=50&facet=country_code`
            );

            setOptions([]);
            for (const record of res.data.records) {
                const { postal_code, place_name } = record.fields;
                setOptions((prevOptions) => [...prevOptions, `${postal_code} (${place_name})`]);
            }
            setLoading(false);
        };
        searchRegions();
    }, [city]);

    const onSubmit = () => {
        // if (options.includes(city)) return router.push(city);
        return toast.error('mauvaise départements');
    };

    return (
        <div className='search-bar'>
            <Autocomplete
                className='auto-complete'
                disableClearable
                freeSolo
                options={options}
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        onChange={onChange}
                        onSelect={onChange}
                        name='city'
                        {...params}
                        label='Cities'
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            endAdornment: (
                                <React.Fragment>
                                    {loading && <CircularProgress color='inherit' size={20} />}
                                    {/* <button style={{ color: 'black' }}>button that will dispatch the action</button> */}
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

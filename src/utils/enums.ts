export const endpoints = ({ locationKey, apikey, q }: { locationKey?: string; apikey?: string; q?: string }) => ({
    autoCompleteSearch: `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apikey}&q=${q}&language=en-us`,
    currentConditions: `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}`,
    fiveDaysForecasts: `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apikey}&language=en-us&details=false&metric=true`,
});

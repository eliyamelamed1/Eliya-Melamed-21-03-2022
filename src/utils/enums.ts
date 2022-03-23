export const endpoints = ({ locationKey, apikey, q }: { locationKey?: string; apikey?: string; q?: string }) => ({
    autoCompleteSearch: `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apikey}&q=${q}&language=en-us`,
    fiveDaysForecasts: `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apikey}&language=en-us&details=false&metric=true`,
    currentConditions: `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apikey}&language=en-us&details=false`,
});

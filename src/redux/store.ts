import { configureStore } from '@reduxjs/toolkit';
import loadingSlice from './slices/loadingSlice';
import weatherSlice from './slices/weatherSlice';

const store = configureStore({
    reducer: {
        weatherSlice,
        loadingSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

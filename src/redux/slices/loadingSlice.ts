import { createSlice } from '@reduxjs/toolkit';

interface initialStateTypes {
    isLoading: boolean;
}
const initialState: initialStateTypes = { isLoading: false };

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
    },
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;

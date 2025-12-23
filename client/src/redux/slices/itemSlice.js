import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    item: '',
    error: null,
    loading: false,
    success: null
};

const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        setItems: (state, { payload }) => {
            state.items = payload;
            state.loading = false;
            state.error = null;
            state.success = null;
        },
        setItem: (state, { payload }) => {
            state.item = payload;
            state.loading = false;
            state.error = null;
            state.success = null;
        },
        setError: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
            state.success = null;
            state.success = null;
        },
        setSuccess: (state, { payload }) => {
            state.success = payload;
            state.loading = false;
            state.error = null;
        }
    }

});

export default itemSlice.reducer;

export const { setError, setItems, setItem, setLoading, setSuccess } = itemSlice.actions;
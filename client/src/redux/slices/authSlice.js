import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    admin: null,
    seller: null,
    error: null,
    success: null,
    loading: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true;
            state.success = null;
            state.error = null;
        },
        setError: (state, { payload }) => {
            state.error = payload;
            state.success = null;
            state.loading = false;
        },
        setSuccess: (state, { payload }) => {
            state.success = payload;
            state.error = null;
            state.loading = false;
        },
        setAdmin: (state, { payload }) => {
            state.admin = payload,
                state.error = null;
            state.success = null;
            state.loading = false;
        },
        setAdminLogout: (state) => {
            state.admin = null;
            state.error = null;
            state.success = null;
            state.loading = false;
        },
    }
});

export default authSlice.reducer;
export const { setAdmin, setError, setLoading, setSuccess, setAdminLogout } = authSlice.actions; 
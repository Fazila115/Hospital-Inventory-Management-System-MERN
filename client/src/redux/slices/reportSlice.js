import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    reports: [],
    totalItems: '',
    outStockCount: 0,
    lowStockCount: 0,
    error: null,
    success: null,
    loading: false,
    suppliers: [],
    totalSuppliers: '',
    days: '',
    expiredCount: "",
    expiringSoon: ''
}

const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        setError: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
            state.success = null;
        },
        setSuccess: (state, { payload }) => {
            state.success = payload;
            state.error = null;
            state.loading = false;
        },
        setOverview: (state, { payload }) => {
            state.totalItems = payload.totalItems || 0;
            state.lowStockCount = payload.lowStock || 0;
            state.outStockCount = payload.outOfStock || 0;
            state.totalSuppliers = payload.totalSuppliers || 0;
            state.expiredCount = payload.expiredCount || 0;
            state.expiringSoon = payload.expiringSoon || 0;
            state.loading = false;
            state.error = null;
            state.success = null;
        },
        setLowStock: (state, { payload }) => {
            state.reports = payload.items || [];
            state.lowStockCount = payload.count || 0;
            state.loading = false;
            state.error = null;
            state.success = null;
        },
        setOutOfStock: (state, { payload }) => {
            state.reports = payload.items || [];
            state.outStockCount = payload.count || 0;
            state.loading = false;
            state.error = null;
            state.success = null;
        },
        setSupplier: (state, { payload }) => {
            state.suppliers = payload || [];
            state.loading = false;
            state.error = null;
            state.success = null;
        },
        setExpiredItems: (state, { payload }) => {
            state.reports = payload || [];
            state.loading = false;
            state.error = null;
            state.success = null;
        },
        setExpiringSoon: (state, { payload }) => {
            state.reports = payload.items || [];
            state.days = payload.days || 0;
            state.loading = false;
            state.error = null;
            state.success = null;
        }
    }
});

export default reportSlice.reducer;

export const { setError, setOverview, setExpiredItems, setExpiringSoon, setLoading, setReports, setSuccess, setLowStock, setOutOfStock, setSupplier } = reportSlice.actions
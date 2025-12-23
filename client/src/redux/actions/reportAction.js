import axiosInstance from "../../config/axios.js";
import { setError, setExpiredItems, setExpiringSoon, setLoading, setLowStock, setOutOfStock, setOverview, setSupplier } from '../slices/reportSlice.js'

// 1. low stock
const lowStock = () => async (dispatch) => {
    dispatch(setLoading())
    try {
        const response = await axiosInstance({ url: `/api/items/alerts/low`, method: 'get' });
        dispatch(setLowStock(response.data.data));
        return;
    }
    catch (error) {
        const message = error.response?.data?.message || error.message || "No Reports Found!"
        dispatch(setError(message));
        return;
    }
};

// 2. out of stock
const outOfStock = () => async (dispatch) => {
    dispatch(setLoading())
    try {
        const response = await axiosInstance({ url: `/api/items/alerts/out`, method: 'get' });
        dispatch(setOutOfStock(response.data.data));
        return;
    }
    catch (error) {
        const message = error.response?.data?.message || error.message || "No Reports Found!"
        dispatch(setError(message));
        return;
    }
};

// 3. restock
const reStock = (id, quantity, refreshType) => async (dispatch) => {
    dispatch(setLoading())
    try {
        const response = await axiosInstance({ url: `/api/items/alerts/restock/${id}`, method: 'put', data: { quantity } });
        // refresh based on active tab
        if (refreshType === "low") dispatch(lowStock());
        if (refreshType === "out") dispatch(outOfStock());
        return;
    }
    catch (error) {
        const message = error.response?.data?.message || error.message || "No Reports Found!"
        dispatch(setError(message));
        return;
    }
};

// 4. plateform overview
const overview = () => async (dispatch) => {
    dispatch(setLoading())
    try {
        const response = await axiosInstance({ url: `/api/dashboard/`, method: 'get' });
        dispatch(setOverview(response.data.data));
        return;
    }
    catch (error) {
        const message = error.response?.data?.message || error.message || "No Overview Found!"
        dispatch(setError(message));
        return;
    }
};

// 5. get all suppliers
const getSuppliers = () => async (dispatch) => {
    dispatch(setLoading())
    try {
        const response = await axiosInstance({ url: `/api/items/suppliers`, method: 'get' });
        dispatch(setSupplier(response.data.suppliers));
        return;
    }
    catch (error) {
        const message = error.response?.data?.message || error.message || "No Suppliers Found!"
        dispatch(setError(message));
        return;
    }
};

// 6. get expired items
const getExpiredItems = () => async (dispatch) => {
    dispatch(setLoading())
    try {
        const response = await axiosInstance({ url: `/api/items/alerts/expired`, method: 'get' });
        dispatch(setExpiredItems(response.data.items || []));
        return;
    }
    catch (error) {
        const message = error.response?.data?.message || error.message || "No Expired Items Found!"
        dispatch(setError(message));
        return;
    }
};

// 6. get expired items
const getExpiringSoon = () => async (dispatch) => {
    dispatch(setLoading())
    try {
        const response = await axiosInstance({ url: `/api/items/alerts/expiring-soon`, method: 'get' });
        dispatch(setExpiringSoon(response.data));
        return;
    }
    catch (error) {
        const message = error.response?.data?.message || error.message || "No Suppliers Found!"
        dispatch(setError(message));
        return;
    }
};

export {
    outOfStock,
    lowStock,
    reStock,
    overview,
    getSuppliers,
    getExpiredItems,
    getExpiringSoon
};
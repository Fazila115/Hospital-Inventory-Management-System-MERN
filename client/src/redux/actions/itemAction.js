import axiosInstance from '../../config/axios.js'
import { setError, setItem, setItems, setLoading } from '../slices/itemSlice.js'

// 1. fetch all items
const fetchItems = () => async (dispatch) => {
    dispatch(setLoading())
    try {
        const response = await axiosInstance({ url: "/api/items/", method: "get", headers: { 'Cache-Control': 'no-cache' } });
        dispatch(setItems(response.data.items || []));
        return response.data;
    }
    catch (error) {
        const message = error.response?.data?.message || error.message || "No Items Found!"
        return dispatch(setError(message));
    }
};

// 2. fetch single item by id
const fetchSingleItem = (id) => async (dispatch) => {
    dispatch(setLoading())
    try {
        const response = await axiosInstance({ url: `/api/items/${id}`, method: "get", headers: { 'Cache-Control': 'no-cache' } });
        dispatch(setItem(response.data));
        return response.data;
    }
    catch (error) {
        const message = error.response?.data?.message || error.message || "No Items Found!"
        return dispatch(setError(message));
    }
};

// 3. add item
const addItem = (productData) => async (dispatch) => {
    dispatch(setLoading())
    try {
        const response = await axiosInstance({ url: `/api/items/`, method: 'post', data: productData });
        dispatch(fetchItems());
        return;
    }
    catch (error) {
        const message = error.response?.data?.message || error.message || "Failed to add item!"
        dispatch(setError(message));
        return;
    }
};

// 4. edit item by id
const editItem = (id, productData) => async (dispatch) => {
    dispatch(setLoading())
    try {
        const response = await axiosInstance({ url: `/api/items/${id}`, method: 'put', data: productData });
        dispatch(fetchItems());
        return;
    }
    catch (error) {
        const message = error.response?.data?.message || error.message
        dispatch(setError(message));
        return;
    }
};

// 5. delete item by id
const deleteItem = (id) => async (dispatch) => {
    dispatch(setLoading())
    try {
        const response = await axiosInstance({ url: `/api/items/${id}`, method: 'delete' })
        return dispatch(fetchItems());
    }
    catch (error) {
        const message = error.response?.data?.message || error.message
        dispatch(setError(message));
        return;
    }
};

export {
    fetchItems,
    addItem,
    editItem,
    deleteItem,
    fetchSingleItem
}
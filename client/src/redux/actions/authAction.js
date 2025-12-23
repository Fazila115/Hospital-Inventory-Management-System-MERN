import axiosInstance from '../../config/axios.js';
import { setAdmin, setError, setLoading, setAdminLogout, setSuccess } from '../slices/authSlice.js';

// 1. admin login
const adminLogin = (payload) => async (dispatch) => {
    dispatch(setLoading())
    try {
        const response = await axiosInstance({ url: `/api/auth/login`, method: 'post', data: payload });
        dispatch(setAdmin(response.data));
        localStorage.setItem('admin', JSON.stringify(response.data));
        return;
    }
    catch (error) {
        const message = error?.response?.data?.message || error.message || 'Login Failed!';
        dispatch(setError(message));
        return;
    }
};

// 2. admin logout
const adminLogout = () => async (dispatch) => {
    dispatch(setLoading())
    try {
        localStorage.removeItem('admin');
        dispatch(setAdminLogout());
        return;
    }
    catch (error) {
        const message = error?.response?.data?.message || error.message || 'Logout Failed!';
        dispatch(setError(message));
        return;
    }
};


export {
    adminLogin,
    adminLogout
};
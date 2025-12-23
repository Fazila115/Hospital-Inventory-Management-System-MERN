import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
    baseURL: API,
    withCredentials: true
});

// helper function to safely get and parse admin data from localStorage
const getParsedItem = (key) => {
    const item = localStorage.getItem(key);
    if (item) {
        try {
            return JSON.parse(item);
        } catch (error) {
            console.error(`Error parsing ${key}:`, error);
            return null;
        }
    }
    return null;
};

// request interceptor
axiosInstance.interceptors.request.use((config) => {
    const admin = getParsedItem('admin');
    const token = admin?.token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status;
        const url = error?.config?.url;

        //  DO NOT redirect on login failure
        if (status === 401 && !url.includes('/api/auth/login')) {
            localStorage.removeItem('admin');
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;

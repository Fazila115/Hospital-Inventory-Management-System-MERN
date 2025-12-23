import { configureStore, combineReducers } from '@reduxjs/toolkit';
import auth from './slices/authSlice.js';
import item from './slices/itemSlice.js'
import report from './slices/reportSlice.js'

const reducer = combineReducers({
    auth: auth,
    item: item,
    report: report,
});
const store = configureStore({ reducer });
export default store;
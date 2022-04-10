import { configureStore } from '@reduxjs/toolkit';
import leadsReducer from './slices/leadsSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        leads: leadsReducer,
    },
});

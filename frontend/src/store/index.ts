import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import accountsReducer from './slices/accountsSlice';
import campaignsReducer from './slices/campaignsSlice';
import tasksReducer from './slices/tasksSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    accounts: accountsReducer,
    campaigns: campaignsReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

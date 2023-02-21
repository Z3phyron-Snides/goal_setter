import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import goalSlice from '../features/goals/goalSlice';
import modal from '../features/tools/modal';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    goal: goalSlice,
    modal: modal
  },
});

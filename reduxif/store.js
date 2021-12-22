import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice'
import chatSlice from './chatSlice';
import echoSlice from './echoSlice';

export const store = configureStore({
  reducer: {
    login: authSlice,
    echo: echoSlice,
    chat: chatSlice,
  },
});
import { configureStore } from '@reduxjs/toolkit';
import firestoreSlice from './firestoreSlice';
import userSlice from './userSlice';
import appSlice from './appSlice';

export const store = configureStore({
    reducer: {
        firestoreStore: firestoreSlice,
        userStore: userSlice,
        appStore: appSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

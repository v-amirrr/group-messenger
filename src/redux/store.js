import { configureStore } from '@reduxjs/toolkit';
import firestoreSlice from './firestoreSlice';
import sendMessageSlice from './sendMessageSlice';
import popupSlice from './popupSlice';
import userSlice from './userSlice';
import appSlice from './appSlice';

export const store = configureStore({
    reducer: {
        firestoreStore: firestoreSlice,
        sendMessageStore: sendMessageSlice,
        popupStore: popupSlice,
        userStore: userSlice,
        appStore: appSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

import { configureStore } from '@reduxjs/toolkit';
import firestoreSlice from './firestoreSlice';
import userSlice from './userSlice';
import appSlice from './appSlice';
import optionsSlice from './optionsSlice';
import selectSlice from './selectSlice';
import modalSlice from './modalSlice';

export const store = configureStore({
    reducer: {
        firestoreStore: firestoreSlice,
        userStore: userSlice,
        appStore: appSlice,
        optionsStore: optionsSlice,
        selectStore: selectSlice,
        modalStore: modalSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

import { configureStore } from "@reduxjs/toolkit";
import messagesSlice from "./messagesSlice";
import sendMessageSlice from "./sendMessageSlice";
import popupSlice from "./popupSlice";
import userSlice from "./userSlice";

export const store = configureStore({
    reducer: {
        messagesStore: messagesSlice,
        sendMessageStore: sendMessageSlice,
        popupStore: popupSlice,
        userStore: userSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});
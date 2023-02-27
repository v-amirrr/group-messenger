import { configureStore } from "@reduxjs/toolkit";
import messagesSlice from "./messagesSlice";
import sendMessageSlice from "./sendMessageSlice";
import popupSlice from "./popupSlice";

export const store = configureStore({
    reducer: {
        messagesStore: messagesSlice,
        sendMessageStore: sendMessageSlice,
        popupStore: popupSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});
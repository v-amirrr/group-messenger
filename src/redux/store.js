import { configureStore } from "@reduxjs/toolkit";
import messagesSlice from "./messagesSlice";
import sendMessageSlice from "./sendMessageSlice";

export const store = configureStore({
    reducer: {
        messagesStore: messagesSlice,
        sendMessageStore: sendMessageSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});
import { configureStore } from "@reduxjs/toolkit";

import messagesSlice from "./messagesSlice";

export const store = configureStore({
    reducer: {
        messagesStore: messagesSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});
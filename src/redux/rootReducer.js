import { combineReducers } from "redux";

import { messagesReducer } from "./messages/messagesReducer";

export const rootReducer = combineReducers({
    messagesState: messagesReducer,
});
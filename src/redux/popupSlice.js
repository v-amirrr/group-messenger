import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    popupShow: false,
    popupName: null,
    popupMessageId: null,
    popupMessageEditedReply: null,
};

const popupSlice = createSlice({
    name: "popup",
    initialState,
    reducers: {
        setPopup: (state, action) => {
            return {
                ...state,
                popupShow: action.payload.popupShow, 
                popupName: action.payload.popupName,
                popupMessageId: action.payload.popupMessageId,
            };
        },
        setEditedReply: (state, action) => {
            return {
                ...state,
                popupMessageEditedReply: action.payload,
            };
        },
    },
});

export const { setPopup, setEditedReply } = popupSlice.actions;

export default popupSlice.reducer;
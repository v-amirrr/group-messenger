import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    popupShow: false,
    popupName: null,
    popupMessages: null,
    popupMessageEditedReply: null,
    popupMessagesSelected: false,
};

const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        setPopup: (state, action) => {
            return {
                ...state,
                popupShow: action.payload.popupShow,
                popupName: action.payload.popupName,
                popupMessages: action.payload.popupMessages,
                popupMessagesSelected: action.payload.popupMessagesSelected,
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
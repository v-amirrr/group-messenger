import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    popupShow: false,
    popupName: null,
    popupMessages: null,
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
        setNewReply: (state, action) => {
            return {
                ...state,
                popupMessages: [
                    {
                        ...state.popupMessages[0],
                        replyTo: action.payload
                    }
                ]
            };
        },
    },
});

export const { setPopup, setNewReply } = popupSlice.actions;

export default popupSlice.reducer;
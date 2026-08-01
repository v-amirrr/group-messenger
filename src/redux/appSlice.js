import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    messagesScrollPosition: {},
    skeletonEffect: null,
    scrollToMessage: null,
    editReply: {
        show: false,
        editingMessageId: null,
        editingMessageReplyId: null,
    },
    loader: false,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setMessagesScrollPosition: (state, action) => {
            return {
                ...state,
                messagesScrollPosition: {
                    ...state.messagesScrollPosition,
                    [action.payload.id]: action.payload.position
                },
            };
        },
        setSkeletonEffect: (state, action) => {
            return {
                ...state,
                skeletonEffect: action.payload
            };
        },
        setScrollToMessage: (state, action) => {
            return {
                ...state,
                scrollToMessage: action.payload
            };
        },
        setEditReply: (state, action) => {
            return {
                ...state,
                editReply: {
                    show: action.payload.show,
                    editingMessageId: action.payload.editingMessageId,
                    editingMessageReplyId: action.payload.editingMessageReplyId,
                },
            };
        },
        setNewReplyId: (state, action) => {
            return {
                ...state,
                editReply: {
                    ...state.editReply,
                    editingMessageReplyId: action.payload,
                },
            };
        },
        setLoader: (state, action) => {
            return {
                ...state,
                loader: action.payload
            };
        },
    },
});

export const {
    setMessagesScrollPosition,
    setSkeletonEffect,
    setScrollToMessage,
    setEditReply,
    setNewReplyId,
    setLoader,
} = appSlice.actions;

export default appSlice.reducer;
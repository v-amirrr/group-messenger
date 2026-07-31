import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    messagesScrollPosition: {},
    skeletonEffect: null,
    scrollToMessage: null,
    editReply: {
        show: false,
        editedMessageId: null,
        messages: null,
        replyId: null,
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
                    editedMessageId: action.payload.editedMessageId,
                    messages: action.payload.messages,
                    replyId: action.payload.replyId,
                },
            };
        },
        setNewReplyId: (state, action) => {
            return {
                ...state,
                editReply: {
                    ...state.editReply,
                    replyId: action.payload,
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
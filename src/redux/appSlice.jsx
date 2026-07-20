import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    toasts: [],
    messagesScrollPosition: {},
    skeletonEffect: null,
    scrollToMessage: null,
    inputReply: { id: null, message: null },
    inputStoredText: {},
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
        setToasts: (state, action) => {
            return {
                ...state,
                toasts: [
                    ...state.toasts,
                    {
                        show: action.payload.show,
                        message: action.payload.message,
                        type: action.payload.type,
                        time: action.payload.time,
                    },
                ],
            };
        },
        setCloseToast: (state, action) => {
            return {
                ...state,
                toasts: [
                    ...state.toasts.filter(toast => toast.time != action.payload),
                ],
            };
        },
        setClearToasts: (state) => {
            return {
                ...state,
                toasts: []
            };
        },
        setMessagesScrollPosition: (state, action) => {
            return {
                ...state,
                messagesScrollPosition: {
                    ...state.messagesScrollPosition,
                    [action.payload.id]: action.payload.position
                }
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
        setInputReply: (state, action) => {
            return {
                ...state,
                inputReply: {
                    id: action.payload.id,
                    message: action.payload.message,
                },
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
    setToasts,
    setCloseToast,
    setClearToasts,
    setMessagesScrollPosition,
    setSkeletonEffect,
    setScrollToMessage,
    setInputReply,
    setEditReply,
    setNewReplyId,
    setLoader,
} = appSlice.actions;

export default appSlice.reducer;
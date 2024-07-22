import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    warningPageShowed: JSON.parse(sessionStorage.getItem("warning")),
    warningPageNeverShow: JSON.parse(localStorage.getItem('warning-check')),
    notifications: [],
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
        setWarningShowed: (state, action) => {
            return { ...state, warningPageShowed: action.payload };
        },
        setWarningPageNeverShow: (state, action) => {
            return { ...state, warningPageNeverShow: action.payload };
        },
        setNotifications: (state, action) => {
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    {
                        show: action.payload.show,
                        message: action.payload.message,
                        type: action.payload.type,
                        time: action.payload.time,
                    },
                ],
            };
        },
        setCloseNotification: (state, action) => {
            return {
                ...state,
                notifications: [
                    ...state.notifications.filter(notification => notification.time != action.payload),
                ],
            };
        },
        setClearNotifications: (state) => {
            return {
                ...state,
                notifications: []
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
    setWarningShowed,
    setWarningPageNeverShow,
    setNotifications,
    setCloseNotification,
    setClearNotifications,
    setMessagesScrollPosition,
    setSkeletonEffect,
    setScrollToMessage,
    setInputReply,
    setEditReply,
    setNewReplyId,
    setLoader,
} = appSlice.actions;

export default appSlice.reducer;
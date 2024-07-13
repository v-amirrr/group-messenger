import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    warningPageShowed: JSON.parse(sessionStorage.getItem("warning")),
    warningPageNeverShow: JSON.parse(localStorage.getItem('warning-check')),
    notifications: [],
    notificationSettings: {
        send: false,
        trash: true,
        edit: true,
        copy: true,
        restore: true,
        delete: false,
        username: true,
    },
    messagesScrollPosition: {},
    skeletonEffect: null,
    scrollToMessage: null,
    inputReply: { id: null, message: null },
    inputStoredText: {},
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
        setNotificationSettings: (state, action) => {
            return {
                ...state,
                notificationSettings: {
                    send:
                        action.payload.send != undefined ?
                        action.payload.send :
                        state.notificationSettings.send,
                    trash:
                        action.payload.trash != undefined ?
                        action.payload.trash :
                        state.notificationSettings.trash,
                    edit:
                        action.payload.edit != undefined ?
                        action.payload.edit :
                        state.notificationSettings.edit,
                    copy:
                        action.payload.copy != undefined ?
                        action.payload.copy :
                        state.notificationSettings.copy,
                    restore:
                        action.payload.restore != undefined ?
                        action.payload.restore :
                        state.notificationSettings.restore,
                    delete:
                        action.payload.delete != undefined ?
                        action.payload.delete :
                        state.notificationSettings.delete,
                    username:
                        action.payload.username != undefined ?
                        action.payload.username :
                        state.notificationSettings.username,
                },
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
    },
});

export const {
    setWarningShowed,
    setWarningPageNeverShow,
    setNotifications,
    setCloseNotification,
    setClearNotifications,
    setNotificationSettings,
    setMessagesScrollPosition,
    setSkeletonEffect,
    setScrollToMessage,
    setInputReply,
} = appSlice.actions;

export default appSlice.reducer;
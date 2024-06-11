import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    warningPageShowed: JSON.parse(sessionStorage.getItem("warning")),
    warningPageNeverShow: JSON.parse(localStorage.getItem('warning-check')),
    selectedMessages: [],
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
    scrollMessageId: { id: null, type: null },
    inputReply: { id: null, message: null },
    inputStoredText: {}
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
        setSelectedMessages: (state, action) => {
            return {
                ...state,
                selectedMessages: [
                    ...state.selectedMessages,
                    action.payload.message,
                ],
            };
        },
        setClearSelectedMessages: (state) => {
            return { ...state, selectedMessages: [] };
        },
        setUnselectMessages: (state, action) => {
            return { ...state, selectedMessages: action.payload };
        },
        setNotifications: (state, action) => {
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    {
                        show: action.payload.show,
                        message: action.payload.message,
                        isError: action.payload.isError,
                        isGuest: action.payload.isGuest,
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
        setScrollMessageId: (state, action) => {
            return {
                ...state,
                scrollMessageId: { id: action.payload.id, type: action.payload.type }
            };
        },
        setClearScrollMessageId: (state) => {
            return {
                ...state,
                scrollMessageId: { id: null, type: null }
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
    setSelectedMessages,
    setClearSelectedMessages,
    setUnselectMessages,
    setNotifications,
    setCloseNotification,
    setClearNotifications,
    setNotificationSettings,
    setMessagesScrollPosition,
    setScrollMessageId,
    setClearScrollMessageId,
    setInputReply,
} = appSlice.actions;

export default appSlice.reducer;

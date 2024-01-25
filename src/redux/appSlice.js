import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    warningPageShowed: false,
    warningPageNeverShow: JSON.parse(localStorage.getItem('warning-check')),
    theme: 2,
    selectedMessages: [],
    selectOthersMessage: false,
    notifications: [],
    notificationSettings: {
        send: false,
        trash: true,
        edit: true,
        copy: true,
        restore: true,
        delete: false,
        background: false,
        username: true,
    },
    messagesScrollPosition: {},
    scrollMessageId: { id: null, type: null },
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
        setTheme: (state, action) => {
            return { ...state, theme: action.payload };
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
        setSelectOthersMessage: (state, action) => {
            return { ...state, selectOthersMessage: action.payload };
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
                    background:
                        action.payload.background != undefined ?
                        action.payload.background :
                        state.notificationSettings.background,
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
    },
});

export const {
    setWarningShowed,
    setWarningPageNeverShow,
    setTheme,
    setSelectedMessages,
    setClearSelectedMessages,
    setUnselectMessages,
    setSelectOthersMessage,
    setNotifications,
    setCloseNotification,
    setClearNotifications,
    setNotificationSettings,
    setMessagesScrollPosition,
    setScrollMessageId,
    setClearScrollMessageId,
} = appSlice.actions;

export default appSlice.reducer;

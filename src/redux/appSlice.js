import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    warningPageShowed: false,
    warningPageNeverShow: JSON.parse(localStorage.getItem('warning-check')),
    messageOptionsId: null,
    theme: 2,
    selectedMessages: [],
    selectOthersMessage: false,
    notificationStatus: {
        show: false,
        message: null,
        isError: false,
        isGuest: false,
    },
    notificationSettings: {
        send: false,
        trash: true,
        edit: false,
        copy: true,
        restore: true,
        delete: false,
        background: false,
        username: true,
    },
    menuShow: false,
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
        setMessageOptionsId: (state, action) => {
            return { ...state, messageOptionsId: action.payload };
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
        setNotificationStatus: (state, action) => {
            return {
                ...state,
                notificationStatus: {
                    show: action.payload.show,
                    message: action.payload.message,
                    isError: action.payload.isError,
                    isGuest: action.payload.isGuest,
                },
            };
        },
        setNotificationSettings: (state, action) => {
            return {
                ...state,
                notificationSettings: {
                    send:
                        action.payload.send != undefined
                            ? action.payload.send
                            : state.notificationSettings.send,
                    trash:
                        action.payload.trash != undefined
                            ? action.payload.trash
                            : state.notificationSettings.trash,
                    edit:
                        action.payload.edit != undefined
                            ? action.payload.edit
                            : state.notificationSettings.edit,
                    copy:
                        action.payload.copy != undefined
                            ? action.payload.copy
                            : state.notificationSettings.copy,
                    restore:
                        action.payload.restore != undefined
                            ? action.payload.restore
                            : state.notificationSettings.restore,
                    delete:
                        action.payload.delete != undefined
                            ? action.payload.delete
                            : state.notificationSettings.delete,
                    background:
                        action.payload.background != undefined
                            ? action.payload.background
                            : state.notificationSettings.background,
                    username:
                        action.payload.username != undefined
                            ? action.payload.username
                            : state.notificationSettings.username,
                },
            };
        },
        setMenuShow: (state, action) => {
            return {
                ...state,
                menuShow: action.payload,
            };
        },
    },
});

export const {
    setWarningShowed,
    setWarningPageNeverShow,
    setMessageOptionsId,
    setTheme,
    setSelectedMessages,
    setClearSelectedMessages,
    setUnselectMessages,
    setSelectOthersMessage,
    setNotificationStatus,
    setNotificationSettings,
    setMenuShow,
} = appSlice.actions;

export default appSlice.reducer;

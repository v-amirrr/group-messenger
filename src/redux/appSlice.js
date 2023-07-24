import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
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
    },
});

export const { setNotificationSettings } = appSlice.actions;

export default appSlice.reducer;

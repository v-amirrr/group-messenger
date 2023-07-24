import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../redux/userSlice";
import { setNotificationSettings } from "../redux/appSlice";

export const useNotification = () => {

    const dispatch = useDispatch();
    const { notificationSettings } = useSelector(store => store.appStore);

    const openNotification = (message, error, type) => {
        if (type == "SEND" && notificationSettings.send
            || type == "TRASH" && notificationSettings.trash
            || type == "EDIT" && notificationSettings.edit
            || type == "COPY" && notificationSettings.copy
            || type == "RESTORE" && notificationSettings.restore
            || type == "DELETE" && notificationSettings.delete
            || type == "BACKGROUND" && notificationSettings.background
            || type == "USERNAME" && notificationSettings.username) {
                dispatch(setNotification({ open: true, message: message, error: error }));
                setTimeout(() => {
                    closeNotification();
                }, 5000);
        }
    };

    const closeNotification = () => {
        dispatch(setNotification({ open: false, message: null, error: false }));
    };

    const changeNotificationSettings = (notificationName, notificationValue) => {
        dispatch(setNotificationSettings({ [notificationName]: notificationValue }));
    };

    const setDefaultNotification = () => {
        const notificationSettingsLocalStorage = JSON.parse(localStorage.getItem('notification'));
        if (notificationSettingsLocalStorage) {
            dispatch(setNotificationSettings({
                send: notificationSettingsLocalStorage.send,
                trash: notificationSettingsLocalStorage.trash,
                edit: notificationSettingsLocalStorage.edit,
                copy: notificationSettingsLocalStorage.copy,
                restore: notificationSettingsLocalStorage.restore,
                delete: notificationSettingsLocalStorage.delete,
                background: notificationSettingsLocalStorage.background,
                username: notificationSettingsLocalStorage.username,
            }));
        } else {
            localStorage.setItem('notification', notificationSettingsLocalStorage);
        }
    };

    return {
        openNotification,
        closeNotification,
        changeNotificationSettings,
        notificationSettings,
        setDefaultNotification,
    };
};
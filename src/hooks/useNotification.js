import { useDispatch, useSelector } from "react-redux";
import { setNotifications, setCloseNotification, setClearNotifications, setNotificationSettings } from "../redux/appSlice";

export const useNotification = () => {
    const dispatch = useDispatch();
    const { notificationSettings } = useSelector(store => store.appStore);
    const { enterAsAGuest } = useSelector(store => store.userStore);

    const openNotification = (message, isError, type) => {
        let time = new Date().getTime();
        if (type == "SEND" && notificationSettings.send
        || type == "TRASH" && notificationSettings.trash
        || type == "EDIT" && notificationSettings.edit
        || type == "COPY" && notificationSettings.copy
        || type == "RESTORE" && notificationSettings.restore
        || type == "DELETE" && notificationSettings.delete
        || type == "BACKGROUND" && notificationSettings.background
        || type == "USERNAME" && notificationSettings.username
        || type == "GUEST" && enterAsAGuest || type == "ERROR" || type == "ENTER") {
            dispatch(setNotifications({ show: true, message: message, isError: isError, isGuest: type == "GUEST", time: time }));
            setTimeout(() => {
                closeNotification(time);
            }, 3000);
        }
    };

    const closeNotification = (time) => {
        dispatch(setCloseNotification(time));
    };

    const clearNotifications = () => {
        dispatch(setClearNotifications());
    };

    const changeNotificationSettings = (notificationName, notificationValue) => {
        if (enterAsAGuest) {
            openNotification("In order to use this feature you need to login.", false, "GUEST");
        } else {
            dispatch(setNotificationSettings({ [notificationName]: notificationValue }));
        }
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
        clearNotifications,
        changeNotificationSettings,
        notificationSettings,
        setDefaultNotification,
    };
};
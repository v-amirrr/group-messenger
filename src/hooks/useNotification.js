import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setNotifications, setCloseNotification, setClearNotifications, setNotificationSettings } from "../redux/appSlice";
import { useEffect } from "react";

export const useNotification = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { notifications, notificationSettings } = useSelector(store => store.appStore);
    const { enterAsAGuest } = useSelector(store => store.userStore);

    useEffect(() => {
        clearNotifications();
    }, [location.pathname]);

    useEffect(() => {
        let firstItem = notifications[0]?.time;
        if (notifications.length > 1) {
            closeNotification(firstItem);
        }
    }, [notifications]);

    const openNotification = (message, isError, type) => {
        let time = new Date().getTime();
        if (type == "SEND" && notificationSettings.send
        || type == "TRASH" && notificationSettings.trash
        || type == "EDIT" && notificationSettings.edit
        || type == "COPY" && notificationSettings.copy
        || type == "RESTORE" && notificationSettings.restore
        || type == "DELETE" && notificationSettings.delete
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
import { useDispatch, useSelector } from "react-redux";
import { setNotificationStatus, setNotificationSettings } from "../redux/appSlice";

export const useNotification = () => {

    const dispatch = useDispatch();
    const { notificationStatus, notificationSettings } = useSelector(store => store.appStore);
    const { enterAsAGuest } = useSelector(store => store.userStore);

    const openNotification = (message, isError, type) => {
        if (type == "SEND" && notificationSettings.send
        || type == "TRASH" && notificationSettings.trash
        || type == "EDIT" && notificationSettings.edit
        || type == "COPY" && notificationSettings.copy
        || type == "RESTORE" && notificationSettings.restore
        || type == "DELETE" && notificationSettings.delete
        || type == "BACKGROUND" && notificationSettings.background
        || type == "USERNAME" && notificationSettings.username
        || type == "GUEST" && enterAsAGuest) {
            dispatch(setNotificationStatus({ show: true, message: message, isError: isError, isGuest: type == "GUEST" }));
            setTimeout(() => {
                closeNotification();
            }, 5000);
        }
    };

    const closeNotification = () => {
        dispatch(setNotificationStatus({ show: false, message: null, isError: false }));
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
        changeNotificationSettings,
        notificationSettings,
        setDefaultNotification,
    };
};
import { useDispatch, useSelector } from "react-redux";
import { setNotifications, setCloseNotification, setClearNotifications } from "../redux/appSlice";
import { useEffect } from "react";

export const useNotification = () => {
    const dispatch = useDispatch();
    const { notifications, notificationSettings } = useSelector(store => store.appStore);

    useEffect(() => {
        let firstItem = notifications[0]?.time;
        if (notifications.length > 1) {
            closeNotification(firstItem);
        }
    }, [notifications]);

    const openNotification = (message, type) => {
        let time = new Date().getTime();
        // if (type == "SEND" && notificationSettings.send
        // || type == "TRASH" && notificationSettings.trash
        // || type == "EDIT" && notificationSettings.edit
        // || type == "COPY" && notificationSettings.copy
        // || type == "RESTORE" && notificationSettings.restore
        // || type == "DELETE" && notificationSettings.delete
        // || type == "USERNAME" && notificationSettings.username
        // || type == "GUEST" && enterAsAGuest || type == "ERROR" || type == "ENTER") {
            dispatch(setNotifications({
                show: true,
                message,
                type,
                time,
            }));
            setTimeout(() => {
                closeNotification(time);
            }, 3000);
        // }
    };

    const closeNotification = (time) => {
        dispatch(setCloseNotification(time));
    };

    const clearNotifications = () => {
        dispatch(setClearNotifications());
    };

    return {
        openNotification,
        closeNotification,
        clearNotifications,
        notificationSettings,
    };
};
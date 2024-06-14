import { useDispatch } from "react-redux";
import { setPopup } from '../redux/popupSlice';

export const useModal = () => {

    const dispatch = useDispatch();

    const openModal = (type, messages) => {
        if (type == 'CHANGE_USERNAME_POPUP') {
            dispatch(
                setPopup({
                    popupShow: true,
                    popupName: type,
                    popupMessages: messages
                })
            );
        } else {
            let sortedPopupMessages = [...messages];
            if (messages.length > 1) {
                sortedPopupMessages?.sort((a, b) => {
                    return (
                        new Date(
                            `${a.time.month} ${a.time.day} ${a.time.year} ${a.time.hour}:${a.time.minute}:${a.time.second}`
                        ).getTime() -
                        new Date(
                            `${b.time.month} ${b.time.day} ${b.time.year} ${b.time.hour}:${b.time.minute}:${b.time.second}`
                        ).getTime()
                    );
                });
            };
            dispatch(
                setPopup({
                    popupShow: true,
                    popupName: type,
                    popupMessages: sortedPopupMessages,
                })
            );
        }
    };

    const closeModal = () => {
        dispatch(
            setPopup({
                popupShow: false,
                popupName: null,
                popupMessages: null,
                popupMessagesSelected: null,
            })
        );
    };

    return {
        openModal,
        closeModal,
    };
};
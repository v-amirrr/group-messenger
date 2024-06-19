import { useDispatch } from "react-redux";
import { setModal } from '../redux/appSlice';

export const useModal = () => {
    const dispatch = useDispatch();

    const openModal = (type, messages, editedUsername) => {
        if (type == 'CHANGE_USERNAME_CONFIRMATION') {
            dispatch(
                setModal({
                    show: true,
                    type: type,
                    editedUsername: editedUsername,
                })
            );
        } else {
            let sortedPopupMessages = [...messages];
            if (messages.length > 1) {
                sortedPopupMessages?.sort((a, b) => {
                    return (
                        new Date(
                            `${a?.time?.month} ${a?.time?.day} ${a?.time?.year} ${a?.time?.hour}:${a?.time?.minute}:${a?.time?.second}`
                        ).getTime() -
                        new Date(
                            `${b?.time?.month} ${b?.time?.day} ${b?.time?.year} ${b?.time?.hour}:${b?.time?.minute}:${b?.time?.second}`
                        ).getTime()
                    );
                });
            };
            dispatch(
                setModal({
                    show: true,
                    type: type,
                    messages: sortedPopupMessages,
                })
            );
        }
    };

    const closeModal = () => {
        dispatch(
            setModal({
                show: false,
                type: null,
                messages: [],
                editedReply: null,
            })
        );
    };

    return {
        openModal,
        closeModal,
    };
};
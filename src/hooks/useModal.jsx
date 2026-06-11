import { useDispatch } from "react-redux";
import { setModal } from '../redux/modalSlice';

export const useModal = () => {
    const dispatch = useDispatch();

    const openModal = (type, messages, editedUsername) => {
        if (type == 'CHANGE_USERNAME_CONFIRMATION') {
            dispatch(
                setModal({
                    modalShow: true,
                    modalName: type,
                    modalEditedUsername: editedUsername,
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
                    modalShow: true,
                    modalName: type,
                    modalMessages: sortedPopupMessages,
                })
            );
        }
    };

    const closeModal = () => {
        dispatch(
            setModal({
                modalShow: false,
                modalName: null,
                modalMessages: [],
                modalEditedUsername: null,
            })
        );
    };

    return {
        openModal,
        closeModal,
    };
};
import { useDispatch, useSelector } from "react-redux";
import { setMessageIdOptionsShow, setSelectedMessages, setClearSelectedMessages, setUnselectMessages, setSelectOthersMessage } from '../redux/userSlice';
import { useMessageOptions } from "./useMessageOptions";

export const useSelect = () => {

    const dispatch = useDispatch();
    const { trashMessage } = useMessageOptions();
    const { selectedMessages } = useSelector(store => store.userStore);

    const selectMessage = (message) => {
        dispatch(setMessageIdOptionsShow(null));
        setTimeout(() => {
            dispatch(setSelectedMessages({message}));
        }, 400);
    };

    const unSelectMessage = (uid) => {
        let newSelectedMessages = selectedMessages.filter(item => item.id != uid ? item : "");
        dispatch(setUnselectMessages(newSelectedMessages));
        if (newSelectedMessages.every(item => item.isMessageFromLocalUser)) {
            dispatch(setSelectOthersMessage(false));
        }
    };

    const clearSelectedMessages = () => {
        dispatch(setClearSelectedMessages());
        dispatch(setSelectOthersMessage(false));
    };

    const checkMessage = (id, selected, setSelected) => {
        for (let i = 0; i < selectedMessages.length; i++) {
            if (!selectedMessages[i].isMessageFromLocalUser) {
                dispatch(setSelectOthersMessage(true));
            }

            if (selectedMessages[i].id == id) {
                setSelected(true);
                break;
            } else {
                if (selected) {
                    setSelected(false);
                }
            }
        }

        if (!selectedMessages.length) {
            setSelected(false);
            dispatch(setSelectOthersMessage(false));
        }
    };

    const copySelectedMessages = () => {
        let messagesText = [];
        selectedMessages.forEach(item => {
            item.messageText.forEach(word => {
                messagesText.push(`${word.word} `);
            });
            messagesText.push("\n");
        });
        messagesText = messagesText.join("");
        navigator.clipboard.writeText(messagesText);
        clearSelectedMessages();
    };

    const deleteSelectedMessages = () => {
        selectedMessages.forEach(item => {
            trashMessage(item.id);
        });
        clearSelectedMessages();
    };

    return {
        selectMessage,
        clearSelectedMessages,
        checkMessage,
        unSelectMessage,
        deleteSelectedMessages,
        copySelectedMessages
    };
};
import { useDispatch, useSelector } from "react-redux";
import { setMessageOptionsId, setSelectedMessages, setClearSelectedMessages, setUnselectMessages, setSelectOthersMessage } from '../redux/appSlice';
import { useMessageOptions } from "./useMessageOptions";
import { useNotification } from "./useNotification";

export const useSelect = () => {

    const dispatch = useDispatch();
    const { selectedMessages } = useSelector(store => store.appStore);

    const { trashMessage } = useMessageOptions();
    const { openNotification } = useNotification();

    const selectMessage = (message) => {
        dispatch(setMessageOptionsId(null));
        dispatch(setSelectedMessages({message}));
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
        clearSelectedMessages();
        let messagesText = [];
        selectedMessages.forEach(item => {
            item.messageText.forEach(word => {
                messagesText.push(`${word.word} `);
            });
            messagesText.push("\n");
        });
        messagesText = messagesText.join("");
        navigator.clipboard.writeText(messagesText);
        openNotification("Messages copied.", false, "COPY");
    };

    const deleteSelectedMessages = () => {
        selectedMessages.forEach(item => {
            trashMessage(item.id);
        });
        clearSelectedMessages();
        openNotification("Messages were moved to trash.", false, "TRASH");
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
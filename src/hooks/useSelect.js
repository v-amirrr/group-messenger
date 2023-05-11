import { useDispatch, useSelector } from "react-redux";
import { setMessageIdOptionsShow, setSelectedMessages, setClearSelectedMessages, setUnselectMessages, setSelectOthersMessage } from '../redux/userSlice';
import { useMessageOptions } from "./useMessageOptions";

export const useSelect = () => {

    const dispatch = useDispatch();
    const { deleteMessage } = useMessageOptions();
    const { selectedMessages } = useSelector(store => store.userStore);

    const selectMessage = (uid, text, isMessageFromLocalUser) => {
        dispatch(setMessageIdOptionsShow(null));
        dispatch(setSelectedMessages({uid, text, isMessageFromLocalUser}));
    };

    const unSelectMessage = (uid) => {
        let newSelectedMessages = selectedMessages.filter(item => item.uid != uid ? item : "");
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

            if (selectedMessages[i].uid == id) {
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
            item.text.forEach(word => {
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
            deleteMessage(item.uid);
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
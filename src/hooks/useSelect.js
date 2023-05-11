import { useDispatch, useSelector } from "react-redux";
import { setMessageIdOptionsShow, setSelectedMessages, setClearSelectedMessages, setUnselectMessages } from '../redux/userSlice';
import { useMessageOptions } from "./useMessageOptions";

export const useSelect = () => {

    const dispatch = useDispatch();
    const { deleteMessage } = useMessageOptions();
    const { selectedMessages } = useSelector(store => store.userStore);

    const selectMessage = (uid, text) => {
        dispatch(setMessageIdOptionsShow(null));
        dispatch(setSelectedMessages({uid, text}));
    };

    const unSelectMessage = (uid) => {
        let newSelectedMessages = selectedMessages.filter(item => item.uid != uid ? item : "");
        dispatch(setUnselectMessages(newSelectedMessages));
    };

    const clearSelectedMessages = () => {
        dispatch(setClearSelectedMessages());
    };

    const checkMessage = (id, selected, setSelected) => {
        for (let i = 0; i < selectedMessages.length; i++) {
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
        }
    };

    const copySelectedMessages = () => {
        console.log(selectedMessages);
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
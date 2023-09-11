import { useDispatch, useSelector } from "react-redux";
import { setMessageOptionsId, setSelectedMessages, setClearSelectedMessages, setUnselectMessages, setSelectOthersMessage } from '../redux/appSlice';
import { useMessageOptions } from "./useMessageOptions";
import { useNotification } from "./useNotification";

export const useSelect = () => {

    const dispatch = useDispatch();
    const { selectedMessages } = useSelector(store => store.appStore);
    const { enterAsAGuest } = useSelector(store => store.userStore);

    const { trashMessage, clearReplyMessage, copyMessage, undeleteMessage, deleteMessage } = useMessageOptions();
    const { openNotification } = useNotification();

    const selectMessage = (message) => {
        clearReplyMessage();
        dispatch(setMessageOptionsId(null));
        if (enterAsAGuest) {
            openNotification("In order to use this feature you need to login.", false, "GUEST");
        } else {
            dispatch(setSelectedMessages({message}));
        }
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
        selectedMessages.map((message, index) => {
            setTimeout(() => {
                copyMessage(message.message);
            }, index * 600);
        });
        clearSelectedMessages();
    };

    const trashSelectedMessages = () => {
        selectedMessages.map((message, index) => {
            setTimeout(() => {
                trashMessage(message.id);
            }, index * 600);
        });
        clearSelectedMessages();
    };

    const switchSelectAllTrash = (messages) => {
        if (messages.length == selectedMessages.length) {
            clearSelectedMessages();
        } else {
            clearSelectedMessages();
            messages.map(message => {
                dispatch(setSelectedMessages({message}));
            });
        }
    };

    const restoreSelectedMessages = () => {
        selectedMessages.map(message => {
            undeleteMessage(message.id);
        });
        clearSelectedMessages();
    };

    const deleteSelectedMessages = () => {
        selectedMessages.map((message, index) => {
            setTimeout(() => {
                deleteMessage(message.id);
            }, index * 600);
        });
        clearSelectedMessages();
    };

    return {
        selectMessage,
        clearSelectedMessages,
        checkMessage,
        unSelectMessage,
        trashSelectedMessages,
        switchSelectAllTrash,
        restoreSelectedMessages,
        deleteSelectedMessages,
        copySelectedMessages
    };
};
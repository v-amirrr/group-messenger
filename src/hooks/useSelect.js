import { useDispatch, useSelector } from "react-redux";
import { setSelectedMessages, setClearSelectedMessages, setUnselectMessages, setSelectOthersMessage } from '../redux/appSlice';
import { useMessageOptions } from "./useMessageOptions";
import { useNotification } from "./useNotification";

export const useSelect = () => {
    const dispatch = useDispatch();
    const { selectedMessages } = useSelector(store => store.appStore);
    const { enterAsAGuest } = useSelector(store => store.userStore);
    const { trashMessage, clearReplyMessage, undeleteMessage, deleteMessage, closePopup } = useMessageOptions();
    const { openNotification } = useNotification();

    const selectMessage = (message) => {
        clearReplyMessage();
        if (enterAsAGuest) {
            openNotification("In order to use this feature you need to login.", false, "GUEST");
        } else {
            dispatch(setSelectedMessages({ message }));
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
            if (!selectedMessages[i].localMessage) {
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
        let text = '';
        selectedMessages.map((message, index) => {
            if (index == 0 && index == selectedMessages.length-1) {
                text+=`${message.plainText} `;
            } else {
                text+=`${message.plainText}\n`;
            }
        });
        navigator.clipboard.writeText(text);
        clearSelectedMessages();
        openNotification('Messages copied.', false, 'COPY');
    };

    const trashSelectedMessages = () => {
        if (selectedMessages.length < 5) {
            selectedMessages.map((message, index) => {
                setTimeout(() => {
                    trashMessage(message.id);
                    openNotification('Message was moved to trash.', false, 'TRASH');
                }, index * 600);
            });
        } else {
            selectedMessages.map((message) => {
                trashMessage(message.id);
            });
            setTimeout(() => {
                openNotification('Messages were moved to trash.', false, 'TRASH');
            }, 200);
        }
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
        if (selectedMessages.length < 5) {
            selectedMessages.map((message, index) => {
                setTimeout(() => {
                    undeleteMessage(message.id);
                    openNotification('Message restored.', false, 'RESTORE');
                }, index * 600);
            });
        } else {
            selectedMessages.map((message) => {
                undeleteMessage(message.id);
            });
            setTimeout(() => {
                openNotification('Messages restored.', false, 'RESTORE');
            }, 200);
        }
        clearSelectedMessages();
    };

    const deleteSelectedMessages = () => {
        closePopup();
        setTimeout(() => {
            if (selectedMessages.length < 5) {
                selectedMessages.map((message, index) => {
                    setTimeout(() => {
                        deleteMessage(message.id);
                        openNotification('Messages were permenately deleted.', false, 'RESTORE');
                    }, index * 600);
                });
            } else {
                selectedMessages.map((message) => {
                    deleteMessage(message.id);
                });
                setTimeout(() => {
                    openNotification('Messages were permenately deleted.', false, 'RESTORE');
                }, 200);
            }
        }, 400);
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
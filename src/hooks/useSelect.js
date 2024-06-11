import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMessages, setClearSelectedMessages, setUnselectMessages } from '../redux/appSlice';
import { useMessageOptions } from "./useMessageOptions";
import { useNotification } from "./useNotification";

export const useSelect = () => {
    const dispatch = useDispatch();
    const { selectedMessages } = useSelector(store => store.appStore);
    const { trashMessage, undeleteMessage, deleteMessage, closePopup } = useMessageOptions();
    const { openNotification } = useNotification();
    const [nonLocalSelectedMessages, setNonLocalSelectedMessages] = useState(0);

    const selectMessage = (message) => {
        dispatch(setSelectedMessages({ message }));
        if (!message.isLocalMessage) {
            setNonLocalSelectedMessages(perv => perv + 1);
            console.log(nonLocalSelectedMessages);
        }
    };
    const unSelectMessage = (id) => {
        let newSelectedMessages = selectedMessages.filter(item => item.id != id ? item : !item.isLocalMessage ? setNonLocalSelectedMessages(prev => prev - 1) : '');
        dispatch(setUnselectMessages(newSelectedMessages));
        // if (newSelectedMessages.every(item => item.isMessageFromLocalUser)) {
        //     dispatch(setSelectOthersMessage(false));
        // }
    };

    const clearSelectedMessages = () => {
        dispatch(setClearSelectedMessages());
        setNonLocalSelectedMessages(0);
        // dispatch(setSelectOthersMessage(false));
    };

    const copySelectedMessages = () => {
        let text = '', notificationText = '';
        selectedMessages.map((message, index) => {
            if (index == 0 && index == selectedMessages.length-1) {
                text+=`${message.plainText} `;
            } else {
                text+=`${message.plainText}\n`;
            }
        });
        navigator.clipboard.writeText(text);
        if (selectedMessages.length == 1) {
            notificationText = 'Message copied.';
        } else {
            notificationText = 'Messages copied.';
        }
        clearSelectedMessages();
        setTimeout(() => {
            openNotification(notificationText, false, 'COPY');
        }, 300);
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
            }, 300);
        }
        clearSelectedMessages();
    };

    const switchSelectAllTrash = (messages) => {
        if (messages.length == selectedMessages.length) {
            clearSelectedMessages();
        } else {
            clearSelectedMessages();
            messages.map(message => {
                dispatch(setSelectedMessages({ message }));
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
            }, 300);
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
                }, 300);
            }
        }, 400);
        clearSelectedMessages();
    };

    return {
        selectMessage,
        clearSelectedMessages,
        unSelectMessage,
        trashSelectedMessages,
        switchSelectAllTrash,
        restoreSelectedMessages,
        deleteSelectedMessages,
        copySelectedMessages,
        nonLocalSelectedMessages
    };
};
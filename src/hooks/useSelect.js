import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMessages, setClearSelectedMessages, setUnselectMessages, setSelectOthersMessage } from '../redux/appSlice';
import { useOptions } from "./useOptions";
import { useNotification } from "./useNotification";
import { useModal } from "./useModal";

export const useSelect = () => {
    const dispatch = useDispatch();
    const { selectedMessages } = useSelector(store => store.appStore);
    const { trashMessage, undeleteMessage, deleteMessage } = useOptions();
    const { closeModal } = useModal();
    const { openNotification } = useNotification();
    const [nonLocalSelectedMessages, setNonLocalSelectedMessages] = useState(0);

    useEffect(() => {
        if (!nonLocalSelectedMessages) {
            dispatch(setSelectOthersMessage(false));
        }
    }, [nonLocalSelectedMessages]);

    const selectMessage = (message) => {
        dispatch(setSelectedMessages({ message }));
        if (!message.isLocalMessage) {
            setNonLocalSelectedMessages(nonLocalSelectedMessages + 1);
            dispatch(setSelectOthersMessage(true));
        }
    };

    const unSelectMessage = (id, isLocalMessage) => {
        let newSelectedMessages = selectedMessages.filter(item => item.id != id ? item : '');
        if (!isLocalMessage) {
            setNonLocalSelectedMessages(nonLocalSelectedMessages - 1);
        }
        dispatch(setUnselectMessages(newSelectedMessages));
    };

    const clearSelectedMessages = () => {
        setNonLocalSelectedMessages(0);
        dispatch(setClearSelectedMessages());
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
        if (selectedMessages.length < 3) {
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
        if (selectedMessages.length < 3) {
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

    const deleteSelectedMessages = (modalMessages) => {
        closeModal();
        setTimeout(() => {
            if (modalMessages.length < 3) {
                modalMessages.map((message, index) => {
                    setTimeout(() => {
                        deleteMessage(message.id);
                        openNotification('Messages were permenately deleted.', false, 'RESTORE');
                    }, index * 600);
                });
            } else {
                modalMessages.map((message) => {
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
        copySelectedMessages
    };
};
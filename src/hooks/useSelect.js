import { useDispatch, useSelector } from "react-redux";
import { setSelectedMessages, setClearSelectedMessages, setUnselectMessages, setPlusNonLocalSelected, setMinusNonLocalSelected, setClearNonLocalSelected } from '../redux/appSlice';
import { useOptions } from "./useOptions";
import { useNotification } from "./useNotification";
import { useModal } from "./useModal";
import { useSkeletonEffect } from "./useSkeletonEffect";

export const useSelect = () => {
    const dispatch = useDispatch();
    const { selectedMessages } = useSelector(store => store.appStore);
    const { moveToTrash, restore, permanentDelete } = useOptions();
    const { closeModal } = useModal();
    const { openNotification } = useNotification();
    const { addSkeletonEffect } = useSkeletonEffect();

    const select = (message) => {
        dispatch(setSelectedMessages({ message }));
        if (!message?.isLocalMessage) {
            dispatch(setPlusNonLocalSelected());
        }
        addSkeletonEffect(message.id);
    };

    const unSelect = (id, isLocalMessage) => {
        let newSelectedMessages = selectedMessages.filter(item => item.id != id ? item : '');
        if (!isLocalMessage) {
            dispatch(setMinusNonLocalSelected());
        }
        dispatch(setUnselectMessages(newSelectedMessages));
    };

    const clearSelectedMessages = () => {
        dispatch(setClearNonLocalSelected());
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
        notificationText = selectedMessages.length == 1 ? 'Message copied' : 'Messages copied';
        clearSelectedMessages();
        setTimeout(() => {
            openNotification(notificationText, 'GENERAL');
        }, 300);
    };

    const moveToTrashSelectedMessages = () => {
        if (selectedMessages.length < 3) {
            selectedMessages.map((message, index) => {
                setTimeout(() => {
                    moveToTrash(message.id);
                    openNotification('Message was moved to trash', 'GENERAL');
                }, index * 600);
            });
        } else {
            selectedMessages.map((message) => {
                moveToTrash(message.id);
            });
            setTimeout(() => {
                openNotification('Messages were moved to trash', 'GENERAL');
            }, 300);
        }
        clearSelectedMessages();
    };

    const restoreSelectedMessages = () => {
        if (selectedMessages.length < 3) {
            selectedMessages.map((message, index) => {
                setTimeout(() => {
                    restore(message.id);
                    openNotification('Message restored', 'GENERAL');
                }, index * 600);
            });
        } else {
            selectedMessages.map((message) => {
                restore(message.id);
            });
            setTimeout(() => {
                openNotification('Messages restored', 'GENERAL');
            }, 300);
        }
        clearSelectedMessages();
    };

    const permanentDeleteSelectedMessages = (modalMessages) => {
        closeModal();
        setTimeout(() => {
            if (modalMessages.length < 3) {
                modalMessages.map((message, index) => {
                    setTimeout(() => {
                        permanentDelete(message.id);
                        openNotification('Messages were permenately deleted', 'GENERAL');
                    }, index * 600);
                });
            } else {
                modalMessages.map((message) => {
                    permanentDelete(message.id);
                });
                setTimeout(() => {
                    openNotification('Messages were permenately deleted', 'GENERAL');
                }, 300);
            }
        }, 400);
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

    return {
        select,
        unSelect,
        clearSelectedMessages,
        copySelectedMessages,
        moveToTrashSelectedMessages,
        restoreSelectedMessages,
        permanentDeleteSelectedMessages,
        switchSelectAllTrash,
    };
};
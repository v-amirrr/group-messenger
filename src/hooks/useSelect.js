import { useDispatch, useSelector } from "react-redux";
import { addSelectedMessages, setSelectedMessages, plusNonLocalSelected, minusNonLocalSelected, clearNonLocalSelected } from '../redux/selectSlice';
import { useOptions } from "./useOptions";
import { useNotification } from "./useNotification";
import { useModal } from "./useModal";
import { useSkeletonEffect } from "./useSkeletonEffect";

export const useSelect = () => {
    const dispatch = useDispatch();
    const { selectedMessages } = useSelector(store => store.selectStore);
    const { moveToTrash, restore, permanentDelete } = useOptions();
    const { closeModal } = useModal();
    const { openNotification } = useNotification();
    const { addSkeletonEffect } = useSkeletonEffect();

    const select = (message) => {
        dispatch(addSelectedMessages({ message }));
        if (!message?.isLocalMessage) {
            dispatch(plusNonLocalSelected());
        }
        addSkeletonEffect(message.id);
    };

    const disselect = (id, isLocalMessage) => {
        let newSelectedMessages = selectedMessages.filter(item => item.id != id ? item : '');
        if (!isLocalMessage) {
            dispatch(minusNonLocalSelected());
        }
        dispatch(setSelectedMessages(newSelectedMessages));
    };

    const clearSelectedMessages = () => {
        dispatch(clearNonLocalSelected());
        dispatch(setSelectedMessages([]));
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
        selectedMessages.map((message) => {
            moveToTrash(message.id);
        });
        let notificationText = selectedMessages.length == 1 ? 'Message was moved to trash' : 'Messages were moved to trash';
        setTimeout(() => {
            openNotification(notificationText, 'GENERAL');
        }, 300);
        clearSelectedMessages();
    };

    const restoreSelectedMessages = () => {
        selectedMessages.map((message) => {
            restore(message.id);
        });
        let notificationText = selectedMessages.length == 1 ? 'Message was restored' : 'Messages were restored';
        setTimeout(() => {
            openNotification(notificationText, 'GENERAL');
        }, 300);
        clearSelectedMessages();
    };

    const permanentDeleteSelectedMessages = (modalMessages) => {
        closeModal();
        setTimeout(() => {
            modalMessages.map((message) => {
                permanentDelete(message.id);
            });
            let notificationText = selectedMessages.length == 1 ? 'Message was permenately deleted' : 'Messages were permenately deleted';
            setTimeout(() => {
                openNotification(notificationText, 'GENERAL');
            }, 300);
        }, 400);
        clearSelectedMessages();
    };

    return {
        select,
        disselect,
        clearSelectedMessages,
        copySelectedMessages,
        moveToTrashSelectedMessages,
        restoreSelectedMessages,
        permanentDeleteSelectedMessages,
    };
};
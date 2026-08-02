import { useDispatch, useSelector } from "react-redux";
import { addSelectedMessages, setSelectedMessages, plusNonLocalSelected, minusNonLocalSelected, clearSelectSlice } from '../redux/selectSlice';
import { useOptions } from "./useOptions";
import { useSkeletonEffect } from "./useSkeletonEffect";
import { useToast } from './useToast';

export const useSelect = () => {
    const dispatch = useDispatch();
    const selectedMessages = useSelector(store => store.selectStore.selectedMessages);
    const { moveToTrash, restore, permanentDelete } = useOptions();
    const { addSkeletonEffect } = useSkeletonEffect();
    const { openToast } = useToast();

    const select = (message) => {
        dispatch(addSelectedMessages({ message }));
        if (!message?.isLocalMessage) dispatch(plusNonLocalSelected());
        addSkeletonEffect(message.id);
    };

    const deselect = (id, isLocalMessage) => {
        let newSelectedMessages = selectedMessages.filter(message => message.id !== id ? message : '');
        if (!isLocalMessage) dispatch(minusNonLocalSelected());
        dispatch(setSelectedMessages(newSelectedMessages));
    };

    const clearSelectedMessages = () => {
        dispatch(clearSelectSlice());
    };

    const copySelectedMessages = () => {
        let copiedText = '';
        selectedMessages.forEach((message, index) => {
            if (selectedMessages.length === 1 || index+1 === selectedMessages.length) {
                copiedText+=`${message.plainText}`;
            } else {
                copiedText+=`${message.plainText}\n`;
            }
        });
        navigator.clipboard.writeText(copiedText);
        const toastText = `Message${selectedMessages.length === 1 ? '' : 's'} copied`;
        clearSelectedMessages();
        openToast(toastText, 'GENERAL');
    };

    const trashSelectedMessages = () => {
        selectedMessages.forEach(message => moveToTrash(message.id));
        const toastText = `Message${selectedMessages.length === 1 ? '' : 's'} moved to trash`;
        setTimeout(() => {
            openToast(toastText, 'GENERAL');
        }, 300);
        clearSelectedMessages();
    };

    const restoreSelectedMessages = () => {
        selectedMessages.forEach(message => restore(message.id));
        const toastText = `Message${selectedMessages.length === 1 ? '' : 's'} restored`;
        setTimeout(() => {
            openToast(toastText, 'GENERAL');
        }, 300);
        clearSelectedMessages();
    };

    const deleteSelectedMessages = (modalMessages) => {
        setTimeout(() => {
            modalMessages.forEach(message => permanentDelete(message.id));
            const toastText = `Message${modalMessages.length == 1 ? 's' : 's'} permanently deleted`;
            setTimeout(() => {
                openToast(toastText, 'GENERAL');
            }, 300);
        }, 400);
        clearSelectedMessages();
    };

    return {
        select,
        deselect,
        clearSelectedMessages,
        copySelectedMessages,
        trashSelectedMessages,
        restoreSelectedMessages,
        deleteSelectedMessages,
    };
};
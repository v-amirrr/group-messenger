import { db } from '../config/firebase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { useNotification } from './useNotification';
import { setNewReply } from '../redux/popupSlice';
import { setInputReply, setClearScrollMessageId, setMessagesScrollPosition, setScrollMessageId } from '../redux/appSlice';
import { useModal } from './useModal';

export const useOptions = () => {
    const dispatch = useDispatch();
    const { popupMessages } = useSelector(store => store.popupStore);
    const { inputReply, selectedMessages } = useSelector(store => store.appStore);
    const { openNotification } = useNotification();
    const { closeModal } = useModal();

    const replyMessage = (id, message) => {
        if (inputReply.id && inputReply.id != id) {
            clearReplyMessage();
            setTimeout(() => {
                dispatch(setInputReply({ id, message }));
            }, 300);
        } else if (inputReply.id == id) {
            clearReplyMessage();
        } else {
            dispatch(setInputReply({ id, message }));
        }
    };

    const clearReplyMessage = () => {
        dispatch(setInputReply({ id: null, message: null }));
    };

    const copyMessage = (messagePlainText) => {
        navigator.clipboard.writeText(messagePlainText);
        openNotification('Message copied.', false, 'COPY');
    };

    const editMessage = (id, newMessageText) => {
        const docRef = doc(db, 'messages', id);
        if (newMessageText) {
            updateDoc(docRef, {
                message: newMessageText,
            });
            closeModal();
            openNotification('Message was edited.', false, 'EDIT');
        } else {
            closeModal();
            trashMessage(id);
            openNotification('Message was moved to trash.', false, 'TRASH');
        }
    };

    const editMessageReply = (id, newReply) => {
        const docRef = doc(db, 'messages', id);
        if (id != newReply?.id) {
            updateDoc(docRef, {
                replyTo:
                    newReply == 'deleted' ?
                    null :
                    newReply?.id ?
                    newReply?.id :
                    popupMessages?.replyTo == 'no_reply' ?
                    null :
                    popupMessages?.replyTo.id,
            });
            dispatch(setNewReply(newReply));
        }
    };

    const trashMessage = (id) => {
        if (selectedMessages.length == 0) {
            const docRef = doc(db, 'messages', id);
            updateDoc(docRef, {
                deleted: true,
            });
            openNotification('Message was moved to trash.', false, 'TRASH');
            if (id == inputReply?.id) {
                clearReplyMessage();
            }
        } else {
            const docRef = doc(db, 'messages', id);
            updateDoc(docRef, {
                deleted: true,
            });
        }
    };

    const deleteMessage = (id) => {
        const docRef = doc(db, 'messages', id);
        deleteDoc(docRef);
        closeModal();
    };

    const undeleteMessage = (id) => {
        const docRef = doc(db, 'messages', id);
        updateDoc(docRef, {
            deleted: false,
        });
    };

    const addMessageScrollPosition = (id, position) => {
        dispatch(setMessagesScrollPosition({ id, position }));
    };

    const applyScrollMessageId = (id, type) => {
        dispatch(setScrollMessageId({ id, type }));
    };

    const resetScrollMessageId = () => {
        dispatch(setClearScrollMessageId());
    };

    return {
        copyMessage,
        trashMessage,
        deleteMessage,
        undeleteMessage,
        editMessage,
        editMessageReply,
        replyMessage,
        clearReplyMessage,
        addMessageScrollPosition,
        applyScrollMessageId,
        resetScrollMessageId,
    };
};

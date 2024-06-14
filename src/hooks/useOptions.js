import { db } from '../config/firebase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { useNotification } from './useNotification';
import { setModal, setInputReply, setClearScrollMessageId, setMessagesScrollPosition, setScrollMessageId } from '../redux/appSlice';
import { useModal } from './useModal';

export const useOptions = () => {
    const dispatch = useDispatch();
    const { inputReply, selectedMessages, modal } = useSelector(store => store.appStore);
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

    const editMessageReply = (id, editedReply) => {
        const docRef = doc(db, 'messages', id);
        if (id != editedReply?.id) {
            updateDoc(docRef, {
                replyTo:
                    editedReply == 'deleted' ?
                    null :
                    editedReply?.id ?
                    editedReply?.id :
                    modal.messages?.replyTo == 'no_reply' ?
                    null :
                    modal.messages?.replyTo.id,
            });
            dispatch(setModal(editedReply));
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

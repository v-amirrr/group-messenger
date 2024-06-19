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

    const reply = (id, message) => {
        if (inputReply.id && inputReply.id != id) {
            unReply();
            setTimeout(() => {
                dispatch(setInputReply({ id, message }));
            }, 300);
        } else if (inputReply.id == id) {
            unReply();
        } else {
            dispatch(setInputReply({ id, message }));
        }
    };

    const unReply = () => {
        dispatch(setInputReply({ id: null, message: null }));
    };

    const copy = (messagePlainText) => {
        navigator.clipboard.writeText(messagePlainText);
        openNotification('Message copied.', false, 'COPY');
    };

    const editText = (id, newMessageText) => {
        const docRef = doc(db, 'messages', id);
        if (newMessageText) {
            updateDoc(docRef, {
                message: newMessageText,
            });
            closeModal();
            openNotification('Message was edited.', false, 'EDIT');
        } else {
            closeModal();
            moveToTrash(id);
            openNotification('Message was moved to trash.', false, 'TRASH');
        }
    };

    const editReply = (id, editedReply) => {
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

    const moveToTrash = (id) => {
        if (selectedMessages.length == 0) {
            const docRef = doc(db, 'messages', id);
            updateDoc(docRef, {
                deleted: true,
            });
            openNotification('Message was moved to trash.', false, 'TRASH');
            if (id == inputReply?.id) {
                unReply();
            }
        } else {
            const docRef = doc(db, 'messages', id);
            updateDoc(docRef, {
                deleted: true,
            });
        }
    };

    const permanentDelete = (id) => {
        const docRef = doc(db, 'messages', id);
        deleteDoc(docRef);
        closeModal();
    };

    const restore = (id) => {
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
        reply,
        unReply,
        copy,
        editText,
        editReply,
        moveToTrash,
        permanentDelete,
        restore,
        addMessageScrollPosition,
        applyScrollMessageId,
        resetScrollMessageId,
    };
};

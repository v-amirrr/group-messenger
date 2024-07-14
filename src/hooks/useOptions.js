import { db } from '../config/firebase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from './useModal';
import { useNotification } from './useNotification';
import { setInputReply} from '../redux/appSlice';
import { setModal } from '../redux/modalSlice';
import { setShowEditButtons, setShowOptionsButtons, setEditText } from '../redux/optionsSlice';

export const useOptions = () => {
    const dispatch = useDispatch();
    const { inputReply } = useSelector(store => store.appStore);
    const { selectedMessages } = useSelector(store => store.selectStore);
    const { modalMessages } = useSelector(store => store.modalStore);
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
        openNotification('Message copied', 'GENERAL');
    };

    const editText = (id, newMessageText) => {
        const docRef = doc(db, 'messages', id);
        if (newMessageText) {
            updateDoc(docRef, {
                message: newMessageText,
            });
            closeModal();
            openNotification('Message was edited', 'GENERAL');
        } else {
            closeModal();
            moveToTrash(id);
            openNotification('Message was moved to trash', 'GENERAL');
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
                    modalMessages?.replyTo == 'no_reply' ?
                    null :
                    modalMessages?.replyTo.id,
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
            openNotification('Message was moved to trash', 'GENERAL');
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

    const activeEditButtons = () => {
        dispatch(setShowEditButtons(true));
    };

    const deactivateEditButtons = () => {
        dispatch(setShowEditButtons(false));
    };

    const activateOptionsButtons = () => {
        dispatch(setShowOptionsButtons(true));
    };

    const deactivateOptionsButtons = () => {
        dispatch(setShowOptionsButtons(false));
    };

    const activateEditText = () => {
        dispatch(setEditText(true));
    };

    const deactivateEditText = () => {
        dispatch(setEditText(false));
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
        activeEditButtons,
        deactivateEditButtons,
        activateOptionsButtons,
        deactivateOptionsButtons,
        activateEditText,
        deactivateEditText,
    };
};

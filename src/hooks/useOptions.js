import { db } from '../config/firebase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from './useModal';
import { useNotification } from './useNotification';
import { setInputReply, setEditReply, setNewReplyId } from '../redux/appSlice';
import { setShowEditButtons, setShowOptionsButtons, setEditText, setEditedText } from '../redux/optionsSlice';

export const useOptions = () => {
    const dispatch = useDispatch();
    const { editedText } = useSelector(store => store.optionsStore);
    const { messages } = useSelector(store => store.firestoreStore);
    const { inputReply, editReply: editReplyData } = useSelector(store => store.appStore);
    const { selectedMessages } = useSelector(store => store.selectStore);
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

    const editText = (id) => {
        const docRef = doc(db, 'messages', id);
        if (editedText && editedText.charCodeAt(0) != 8204 && editedText.charCodeAt(0) != 160) {
            updateDoc(docRef, {
                message: editedText,
            });
            openNotification('Message was edited', 'GENERAL');
            deactivateEditText();
            deactivateOptionsButtons();
        } else {
            openNotification("Can't change your message into nothing", 'ERROR');
        }
    };

    const editReply = () => {
        const docRef = doc(db, 'messages', editReplyData?.editedMessageId);
        updateDoc(docRef, {
            replyTo: editReplyData?.replyId
                // editedReply == 'deleted' ?
                // null :
                // editedReply?.id ?
                // editedReply?.id :
                // modalMessages?.replyTo == 'no_reply' ?
                // null :
                // modalMessages?.replyTo.id,
        });
        deactivateEditReply();
        openNotification('Reply changed', 'GENERAL');
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

    const storeEditedText = (text) => {
        dispatch(setEditedText(text));
    };

    const activateEditReply = (id, replyToId) => {
        let messagesBeforeEditingMessage = [];
        for (let i = 0; i < messages.length; i++) {
            if (messages[i].id == id) {
                break;
            } else {
                messagesBeforeEditingMessage.push(messages[i]);
            }
        }
        dispatch(setEditReply({
            show: true,
            editedMessageId: id,
            messages: messagesBeforeEditingMessage,
            replyId: replyToId,
        }));
        openNotification('Tap on the message you want to reply', 'GENERAL');
    };

    const deactivateEditReply = () => {
        dispatch(setEditReply({
            show: false,
            editedMessageId: null,
            messages: null,
            replyId: null
        }));
    };

    const addNewReplyId = (id) => {
        dispatch(setNewReplyId(id));
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
        storeEditedText,
        activateEditReply,
        deactivateEditReply,
        addNewReplyId,
    };
};
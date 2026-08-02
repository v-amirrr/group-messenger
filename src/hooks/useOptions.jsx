import { db } from '../config/firebase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from './useModal';
import { setEditReply, setNewReplyId } from '../redux/appSlice';
import { setInputReply } from '../redux/inputSlice';
import { setOptionsButtonsStage, setEditedText } from '../redux/optionsSlice';
import { useToast } from './useToast';
import { setMessages } from '../redux/firestoreSlice';

export const useOptions = () => {
    const dispatch = useDispatch();
    const editedText = useSelector(store => store.optionsStore.editedText);
    const { messages } = useSelector(store => store.firestoreStore);
    const { editReply: editReplyData } = useSelector(store => store.appStore);
    const { selectedMessages } = useSelector(store => store.selectStore);
    const { closeModal } = useModal();
    const { openToast } = useToast();

    const reply = (id, message) => {
        dispatch(setInputReply({ id, message }));
    };

    const unReply = () => {
        dispatch(setInputReply({ id: null, message: null }));
    };

    const copy = (messagePlainText) => {
        navigator.clipboard.writeText(messagePlainText);
        openToast('Message copied', 'GENERAL');
    };

    const editText = (id, closeOptions) => {
        const docRef = doc(db, 'messages', id);
        if (editedText && editedText.charCodeAt(0) != 8204 && editedText.charCodeAt(0) != 160) {
            updateDoc(docRef, {
                message: editedText,
            });
            openToast('Message was edited', 'GENERAL');
            closeOptions();
        } else {
            openToast("Can't change your message into nothing", 'ERROR');
            closeOptions();
        }
    };

    const editReply = () => {
        const docRef = doc(db, 'messages', editReplyData?.editingMessageId);
        updateDoc(docRef, {
            replyTo: editReplyData?.editingMessageReplyId
                // editedReply == 'deleted' ?
                // null :
                // editedReply?.id ?
                // editedReply?.id :
                // modalMessages?.replyTo == 'no_reply' ?
                // null :
                // modalMessages?.replyTo.id,
        });
        deactivateEditReply();
        openToast('Reply changed', 'GENERAL');
    };

    const moveToTrash = (id) => {
        if (selectedMessages.length == 0) {
            const docRef = doc(db, 'messages', id);
            updateDoc(docRef, {
                deleted: true,
            });
            openToast('Message was moved to trash', 'GENERAL');
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

    const changeButtonsStage = (stage) => {
        dispatch(setOptionsButtonsStage(stage));
        // stage 1 is chat/trash buttons, stage 2 is edit menu, stage 3 is edit confirmation
    };

    const storeEditedText = (text) => {
        dispatch(setEditedText(text));
    };

    const activateEditReply = (id, time, replyToId) => {
        dispatch(setEditReply({
            show: true,
            editingMessageId: id,
            editingMessageReplyId: replyToId,
        }));
        setTimeout(() => {
            openToast('Tap on the message you want to reply', 'GENERAL');
        }, 600);
    };

    const deactivateEditReply = () => {
        dispatch(setEditReply({
            show: false,
            editingMessageId: null,
            editingMessageReplyId: null,
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
        changeButtonsStage,
        storeEditedText,
        activateEditReply,
        deactivateEditReply,
        addNewReplyId,
    };
};
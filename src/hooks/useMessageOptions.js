import { db } from '../config/firebase';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useDispatch, useSelector } from 'react-redux';
import { setPopup, setEditedReply } from '../redux/popupSlice';
import { setSendMessageReplyTo, setClearReplyTo } from '../redux/sendMessageSlice';
import { setMessageIdOptionsShow } from '../redux/userSlice';

export const useMessageOptions = () => {

    const dispatch = useDispatch();

    const { popupMessageEditedReply } = useSelector(store => store.popupStore);
    const { replyTo } = useSelector(store => store.sendMessageStore);

    const copyMessage = (message) => {
        dispatch(setMessageIdOptionsShow(null));
        let messageText = [];
        message.map(item => {
            messageText.push(item.word);
        });
        messageText = messageText.join(" ");
        navigator.clipboard.writeText(messageText);
    };

    const openPopup = (popupName, id) => {
        dispatch(setMessageIdOptionsShow(null));
        dispatch(setPopup({ popupShow: true, popupName: popupName, popupMessageId: id }));
    };

    const closePopup = () => {
        dispatch(setPopup({ popupShow: false, popupName: null, popupMessageId: null }));
    };

    const deleteMessage = (id) => {
        const docRef = doc(db, "messages", id);
        deleteDoc(docRef);
        closePopup();
    };

    const editMessage = (messageId, newEditedText, prevReply) => {
        const docRef = doc(db, "messages", messageId);
        if (newEditedText) {
            updateDoc(docRef, {
                message: newEditedText,
                replyTo: popupMessageEditedReply == "deleted" ? null : popupMessageEditedReply ? popupMessageEditedReply : prevReply == "no_reply" ? null : prevReply.id,
            });
            closePopup();
        } else {
            closePopup();
            setTimeout(() => {
                openPopup("DELETE_POPUP", messageId);
            }, 200);
        }
    };

    const editReply = (id) => {
        dispatch(setEditedReply(id));
    };

    const replyMessage = (id, message, username) => {
        dispatch(setMessageIdOptionsShow(null));
    
        let messageText = [];
        message.map(item => {
            messageText.push(item.word);
        });
        messageText = messageText.join(" ");

        if (replyTo.id) {
            dispatch(setClearReplyTo());
            setTimeout(() => {
                dispatch(setSendMessageReplyTo({ id, messageText, username }));
            }, 500);
        } else {
            dispatch(setSendMessageReplyTo({ id, messageText, username }));
        }
    };

    const clearReplyMessage = () => {
        dispatch(setClearReplyTo());
    };

    return {
        copyMessage,
        openPopup,
        closePopup,
        deleteMessage,
        editMessage,
        editReply,
        replyMessage,
        clearReplyMessage,
    };
};
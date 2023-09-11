import { db } from '../config/firebase';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useDispatch, useSelector } from 'react-redux';
import { useNotification } from './useNotification';
import { setPopup, setEditedReply } from '../redux/popupSlice';
import { setSendMessageReplyTo, setClearReplyTo } from '../redux/sendMessageSlice';
import { setMessageOptionsId } from '../redux/appSlice';

export const useMessageOptions = () => {

    const dispatch = useDispatch();

    const { popupMessageEditedReply } = useSelector(store => store.popupStore);
    const { enterAsAGuest } = useSelector(store => store.userStore);
    const { replyTo } = useSelector(store => store.sendMessageStore);

    const { openNotification } = useNotification();

    const copyMessage = (message) => {
        dispatch(setMessageOptionsId(null));
        let text = [];
        message.map(item => {
            text.push(item.word);
        });
        text = text.join(" ");
        navigator.clipboard.writeText(text);
        openNotification("Message copied.", false, "COPY");
    };

    const openPopup = (popupName, popupMessages) => {
        dispatch(setMessageOptionsId(null));

        let sortedPopupMessages = [...popupMessages];

        if (popupMessages.length > 1) {
            sortedPopupMessages.sort((a, b) => {
                return new Date(`${a.time.month} ${a.time.day} ${a.time.year} ${a.time.hour}:${a.time.minute}:${a.time.second}`).getTime() - new Date(`${b.time.month} ${b.time.day} ${b.time.year} ${b.time.hour}:${b.time.minute}:${b.time.second}`).getTime();
            });
        }

        dispatch(setPopup({
            popupShow: true,
            popupName: popupName,
            popupMessages: sortedPopupMessages,
        }));
    };

    const closePopup = () => {
        dispatch(setPopup({
            popupShow: false,
            popupName: null,
            popupMessages: null,
            popupMessagesSelected: null,
        }));
    };

    const trashMessage = (id) => {
        dispatch(setMessageOptionsId(null));
        const docRef = doc(db, "messages", id);
        setTimeout(() => {
            updateDoc(docRef, {
                deleted: true,
            });
            openNotification("Message was moved to trash.", false, "TRASH");
        }, 500);
    };

    const deleteMessage = (id) => {
        const docRef = doc(db, "messages", id);
        deleteDoc(docRef);
        closePopup();
        openNotification("Message was deleted.", false, "DELETE");
    };

    const undeleteMessage = (id) => {
        const docRef = doc(db, "messages", id);
        updateDoc(docRef, {
            deleted: false
        });
        openNotification("Message restored.", false, "RESTORE");
    };

    const editMessage = (popupMessages, newEditedText) => {
        const docRef = doc(db, "messages", popupMessages.id);
        if (newEditedText) {
            updateDoc(docRef, {
                message: newEditedText,
                replyTo: popupMessageEditedReply == "deleted" ? null : popupMessageEditedReply ? popupMessageEditedReply : popupMessages.replyTo == "no_reply" ? null : popupMessages.replyTo.id,
            });
            closePopup();
            openNotification("Message was edited.", false, "EDIT");
        } else {
            closePopup();
            setTimeout(() => {
                openPopup("DELETE_POPUP", [popupMessages]);
            }, 200);
        }
    };

    const editReply = (id) => {
        dispatch(setEditedReply(id));
    };

    const replyMessage = (id, message, username) => {
        dispatch(setMessageOptionsId(null));
        if (enterAsAGuest) {
            openNotification("In order to use this feature you need to login.", false, "GUEST");
        } else {
            let messageText = [];
            message.map(item => {
                messageText.push(item.word);
            });
            messageText = messageText.join(" ");

            setTimeout(() => {
                if (replyTo.id && replyTo.id != id) {
                    dispatch(setClearReplyTo());
                    setTimeout(() => {
                        dispatch(setSendMessageReplyTo({ id, messageText, username }));
                    }, 500);
                } else {
                    dispatch(setSendMessageReplyTo({ id, messageText, username }));
                }
            }, 400);
        }
    };

    const clearReplyMessage = () => {
        dispatch(setClearReplyTo());
    };

    return {
        copyMessage,
        openPopup,
        closePopup,
        trashMessage,
        deleteMessage,
        undeleteMessage,
        editMessage,
        editReply,
        replyMessage,
        clearReplyMessage,
    };
};
import { db } from '../config/firebase';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useDispatch } from 'react-redux';
import { setPopup } from "../redux/messagesSlice";
import { setSendMessageReplyTo, setClearReplyTo } from '../redux/sendMessageSlice';

const useMessageOptions = () => {

    const dispatch = useDispatch();

    const copyMessage = message => {
        let messageText = [];
        message.map(item => {
            messageText.push(item.word);
        });
        messageText = messageText.join(" ");
        navigator.clipboard.writeText(messageText);
    };

    // type 1 means showing the popup and type 2 means doing the job
    const deleteMessage = (id, type) => {
        if (type == 1) {
            dispatch(setPopup({ show: true, type: 1, id: id }));
        } else {
            const docRef = doc(db, "messages", id);
            deleteDoc(docRef);
            closePopup();
        }
    };

    // type 1 means showing the popup and type 2 means doing the job
    const editMessage = (id, type, editInput) => {
        if (type == 1) {
            dispatch(setPopup({ show: true, type: 2, id: id }));
        } else {
            const docRef = doc(db, "messages", id);
            if (editInput) {
                updateDoc(docRef, {
                    message: editInput,
                });
                closePopup();
            } else {
                closePopup();
                setTimeout(() => {
                    dispatch(setPopup({ show: true, type: 1, id: id }));
                }, 200);
            }
        }
    };

    const replyMessage = (id, message, username) => {
        let messageText = [];
        message.map(item => {
            messageText.push(item.word);
        });
        messageText = messageText.join(" ");

        dispatch(setSendMessageReplyTo({ id, messageText, username }));
    };

    const clearReplyMessage = () => {
        dispatch(setClearReplyTo());
    };

    const closePopup = () => {
        dispatch(setPopup({ show: false, type: 0, id: null }));
    };

    return { deleteMessage, copyMessage, editMessage, replyMessage, clearReplyMessage, closePopup };
};

export default useMessageOptions;
import { db } from '../config/firebase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { useNotification } from './useNotification';
import { setPopup, setNewReply } from '../redux/popupSlice';
import { setSendMessageReplyTo, setClearReplyTo } from '../redux/sendMessageSlice';
import { setClearScrollMessageId, setMessagesScrollPosition, setScrollMessageId } from '../redux/appSlice';

export const useMessageOptions = () => {
    const dispatch = useDispatch();
    const { popupMessages } = useSelector(store => store.popupStore);
    const { enterAsAGuest } = useSelector(store => store.userStore);
    const { replyTo } = useSelector(store => store.sendMessageStore);
    const { selectedMessages } = useSelector(store => store.appStore);
    const { openNotification } = useNotification();

    const openPopup = (popupName, popupMessages) => {
        if (popupName == 'CHANGE_USERNAME_POPUP') {
            dispatch(
                setPopup({
                    popupShow: true,
                    popupName: popupName,
                    popupMessages: popupMessages
                })
            );
        } else {
            let sortedPopupMessages = [...popupMessages];
            if (popupMessages.length > 1) {
                sortedPopupMessages?.sort((a, b) => {
                    return (
                        new Date(
                            `${a.time.month} ${a.time.day} ${a.time.year} ${a.time.hour}:${a.time.minute}:${a.time.second}`
                        ).getTime() -
                        new Date(
                            `${b.time.month} ${b.time.day} ${b.time.year} ${b.time.hour}:${b.time.minute}:${b.time.second}`
                        ).getTime()
                    );
                });
            };
            dispatch(
                setPopup({
                    popupShow: true,
                    popupName: popupName,
                    popupMessages: sortedPopupMessages,
                })
            );
        }
    };

    const closePopup = () => {
        dispatch(
            setPopup({
                popupShow: false,
                popupName: null,
                popupMessages: null,
                popupMessagesSelected: null,
            })
        );
    };

    const replyMessage = (id, messagePlainText, username) => {
        if (enterAsAGuest) {
            openNotification('In order to use this feature you need to login.', false, 'GUEST');
        } else {
            if (replyTo.id && replyTo.id != id) {
                clearReplyMessage();
                setTimeout(() => {
                    dispatch(setSendMessageReplyTo({ id, messagePlainText, username }));
                }, 300);
            } else {
                dispatch(setSendMessageReplyTo({ id, messagePlainText, username }));
            }
        }
    };

    const clearReplyMessage = () => {
        dispatch(setClearReplyTo());
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
            closePopup();
            openNotification('Message was edited.', false, 'EDIT');
        } else {
            closePopup();
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
        closePopup();
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
        openPopup,
        closePopup,
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

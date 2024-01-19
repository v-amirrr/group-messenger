import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setSendMessageError, setSendMessageLoading, setClearReplyTo, setRestoredText } from '../redux/sendMessageSlice';
import { useNotification } from "./useNotification";

export const useSendMessage = () => {
    const dispatch = useDispatch();
    const { replyTo } = useSelector(store => store.sendMessageStore);
    const { user, enterAsAGuest } = useSelector(store => store.userStore);
    const { openNotification } = useNotification();
    const firebaseRef = collection(db, 'messages');

    const sendMessage = (messageText) => {
        if (enterAsAGuest) {
            openNotification("In order to use this feature you need to login.", false, "GUEST");
        } else {
            dispatch(setSendMessageLoading(true));
            dispatch(setSendMessageError(null));
            dispatch(setRestoredText(null));
            dispatch(setClearReplyTo());

            if (navigator.onLine) {
                addDoc(firebaseRef, {
                    message: messageText,
                    uid: user.uid,
                    username: user?.displayName,
                    time: serverTimestamp(),
                    replyTo: replyTo.id,
                })
                .then(() => {
                    dispatch(setSendMessageLoading(false));
                    openNotification("Message was sent.", false, "SEND");
                })
                .catch(() => {
                    dispatch(setSendMessageError(true));
                    dispatch(setSendMessageLoading(false));
                    dispatch(setRestoredText(messageText));
                });
            } else {
                dispatch(setSendMessageError(true));
                dispatch(setSendMessageLoading(false));
                dispatch(setRestoredText(messageText));

                setTimeout(() => {
                    dispatch(setSendMessageError(null));
                }, 3000);
            }
        }
    };

    return { sendMessage };
};
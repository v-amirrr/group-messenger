import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setSendMessageError, setSendMessageLoading, setClearReplyTo } from '../redux/sendMessageSlice';

export const useSendMessage = () => {

    const dispatch = useDispatch();

    const { replyTo } = useSelector(store => store.sendMessageStore);
    const { user } = useSelector(store => store.userStore);

    const firebaseRef = collection(db, 'messages');

    const sendMessage = (messageText) => {
        dispatch(setSendMessageLoading(true));
        dispatch(setSendMessageError(null));
        dispatch(setClearReplyTo());

        addDoc(firebaseRef, {
            message: messageText,
            uid: user.uid,
            username: user?.displayName,
            time: serverTimestamp(),
            replyTo: replyTo.id,
        })
        .then(() => {
            setTimeout(() => {
                dispatch(setSendMessageLoading(false));
        }, 500);
        })
        .catch(() => {
            dispatch(setSendMessageError(true));
            dispatch(setSendMessageLoading(false));
        });
    };

    return { sendMessage };
};
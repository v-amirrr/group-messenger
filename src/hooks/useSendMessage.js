import { useDispatch, useSelector } from 'react-redux';
import { setSendMessageError, setSendMessageLoading, setClearReplyTo } from '../redux/sendMessageSlice';
import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const useSendMessage = () => {

    const dispatch = useDispatch();
    const firebaseRef = collection(db, 'messages');

    const { replyTo } = useSelector(store => store.sendMessageStore);

    const sendMessage = (messagesText, username) => {
        dispatch(setSendMessageLoading(true));
        dispatch(setSendMessageError(null));
        dispatch(setClearReplyTo());

        addDoc(firebaseRef, {
            message: messagesText,
            username: username,
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

export default useSendMessage;
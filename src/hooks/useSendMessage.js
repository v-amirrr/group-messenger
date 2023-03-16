import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setSendMessageError, setSendMessageLoading, setClearReplyTo } from '../redux/sendMessageSlice';

const useSendMessage = () => {

    const dispatch = useDispatch();

    const { replyTo } = useSelector(store => store.sendMessageStore);

    const firebaseRef = collection(db, 'messages');

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
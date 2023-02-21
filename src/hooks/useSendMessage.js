import { useDispatch } from 'react-redux';
import { setSendMessageSituation } from '../redux/messagesSlice';
import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const useSendMessage = () => {

    const dispatch = useDispatch();
    const firebaseRef = collection(db, 'messages');

    const sendMessage = (messagesText, username) => {
        dispatch(setSendMessageSituation("pending"));
        addDoc(firebaseRef, {
            message: messagesText,
            username: username,
            time: serverTimestamp(),
        })
        .then(() => {
            setTimeout(() => {
                dispatch(setSendMessageSituation("done"));
            }, 500);
        })
        .catch(() => {
            dispatch(setSendMessageSituation("error"));
        });
    };

    return { sendMessage };
};

export default useSendMessage;
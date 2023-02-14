import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const useSendMessage = () => {

    const firebaseRef = collection(db, 'messages');

    const sendMessage = (messagesText, username) => {
        addDoc(firebaseRef, {
            message: messagesText,
            username: username,
            time: serverTimestamp(),
        })
        .catch((err) => {
            console.log(err);
        });
    };

    return { sendMessage };
};

export default useSendMessage;
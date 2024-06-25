import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setInputReply } from '../redux/appSlice';
import { useNotification } from "./useNotification";

export const useSend = () => {
    const dispatch = useDispatch();
    const firebaseRef = collection(db, 'messages');
    const { inputReply } = useSelector(store => store.appStore);
    const { user, enterAsAGuest } = useSelector(store => store.userStore);
    const { openNotification } = useNotification();

    const sendMessage = (inputText, setInputText) => {
        let storedInputText = localStorage.getItem('input-text');
        if (enterAsAGuest) {
            openNotification("In order to use this feature you need to login.", false, "GUEST");
        } else {
            if (inputText && inputText.charCodeAt(0) != 8204) {
                if (navigator.onLine) {
                    setInputText('');
                    dispatch(setInputReply({ id: null, message: null }));
                    addDoc(firebaseRef, {
                        message: inputText,
                        uid: user.uid,
                        username: user?.displayName,
                        time: serverTimestamp(),
                        replyTo: inputReply.id,
                    })
                    .then(() => {
                        openNotification("Message was sent.", false, "SEND");
                    })
                    .catch(() => {
                        openNotification("Unable to send the message.", true, "COPY");
                        setInputText(storedInputText);
                    });
                } else {
                    openNotification("Unable to send the message.", true, "COPY");
                    setInputText(storedInputText);
                }
            }
        }
    };

    return { sendMessage };
};
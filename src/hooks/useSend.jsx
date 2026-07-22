import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setInputReply } from '../redux/appSlice';
import { openToast } from "../functions/ToastHandler";

export const useSend = () => {
    const dispatch = useDispatch();
    const firebaseRef = collection(db, 'messages');
    const { inputReply } = useSelector(store => store.appStore);
    const { user, enterAsAGuest } = useSelector(store => store.userStore);

    const sendMessage = (inputText, setInputText) => {
        let storedInputText = localStorage.getItem('input-text');
        if (enterAsAGuest) {
            openToast(dispatch, "To use this feature you need to ", "GUEST");
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
                    .catch(() => {
                        openToast(dispatch, "Unable to send the message", "ERROR");
                        setInputText(storedInputText);
                    });
                } else {
                    openToast(dispatch, "Unable to send the message", "ERROR");
                    setInputText(storedInputText);
                }
            }
        }
    };

    return { sendMessage };
};
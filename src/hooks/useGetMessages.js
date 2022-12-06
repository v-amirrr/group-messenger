import { db } from "../config/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

import { useDispatch } from "react-redux";
import { setMessages, setError, setLoadingOn, setLoadingOff } from "../redux/messagesSlice";

export const useGetMessages = () => {

    const dispatch = useDispatch();

    const getMessages = () => {
        dispatch(setLoadingOn());

        const ref = collection(db, 'messages');
        const q = query(ref, orderBy("time", "asc"));

        onSnapshot(q, (snapshot) => {
            let messages = [];
            dispatch(setMessages(null));

            snapshot.docs.forEach(doc => {
                messages.push({
                    username: JSON.parse(doc.data().username),
                    message: doc.data().message,
                    id: doc.id,
                });
            });

            dispatch(setMessages(messages));
            dispatch(setLoadingOff());

            if (!messages?.length) {
                alert("There's a problem in your connection. If you're in sanctioned countries like Iran, you have to turn on your VPN for using the app. If you're already using VPN please use another VPN (also you can use shecan.ir).");
            }

        }, (error) => {
            dispatch(setError(error.message));
            dispatch(setLoadingOff());
            console.log(error);
        });
    };

    return { getMessages };

};
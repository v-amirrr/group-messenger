import { db } from "../config/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

import { useDispatch } from "react-redux";
import { setMessages, setError, setLoadingOn, setLoadingOff } from "../redux/messagesSlice";

import { isURL } from "../functions/isURL";

export const useGetMessages = () => {

    const dispatch = useDispatch();

    const getMessages = () => {
        dispatch(setLoadingOn());

        const ref = collection(db, 'messages');
        const q = query(ref, orderBy("time", "asc"));

        onSnapshot(q, (snapshot) => {
            let messages = [];
            dispatch(setMessages(null));

            // getting the messages from Firebase
            snapshot.docs.forEach(doc => {
                messages.push({
                    username: JSON.parse(doc.data().username),
                    message: doc.data().message.split(" "),
                    id: doc.id,
                });
            });

            // detecting the links in the messages
            let modifiedMessages = messages?.map(item => {
                return {
                    ...item,
                    message: item.message.map((word) => {
                        let isLink = !!isURL(word);
                        return { word: word, link: isLink };
                    }),
                }; 
            });

            dispatch(setMessages(modifiedMessages));
            dispatch(setLoadingOff());

            if (!messages?.length) {
                dispatch(setError("Looks like there's a problem with your connection. If you're in sanctioned countries like Iran, you have to turn on your VPN for using this app."));
            };

        }, (error) => {
            dispatch(setError(error));
        });
    };

    return { getMessages };

};
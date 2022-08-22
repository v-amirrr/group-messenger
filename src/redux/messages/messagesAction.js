import { db } from "../../config/firebase";
import { collection, onSnapshot} from "firebase/firestore";

export const setMessages = (value=null) => {
    return { type: "SET_MESSAGES", payload: value };
};

export const setError = (value=null) => {
    return { type: "SET_ERROR", payload: value };
};

export const getMessages = () => {
    
    return (dispatch) => {

        let messages = [];

        const ref = collection(db, 'messages');

        onSnapshot(ref, (snapshot) => {

            snapshot.docs.map(doc => {
                messages.push(doc.data())
            });

            dispatch(setMessages(messages));
        });
    };
};
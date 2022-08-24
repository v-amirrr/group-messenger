import { db } from "../../config/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

export const setMessages = (value=null) => {
    return { type: "SET_MESSAGES", payload: value };
};

export const setError = (value=null) => {
    return { type: "SET_ERROR", payload: value };
};

export const getMessages = () => {
    
    return (dispatch) => {
        
        const ref = collection(db, 'messages');
        const q = query(ref, orderBy("time", "desc"));
        
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
        }, (error) => {
            console.log(error);
        });
    };
};
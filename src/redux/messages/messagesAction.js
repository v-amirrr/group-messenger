import { db } from "../../config/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

export const setMessages = (value=null) => {
    return { type: "SET_MESSAGES", payload: value };
};

export const setError = (value=null) => {
    return { type: "SET_ERROR", payload: value };
};

export const setLoadingOn = () => {
    return { type: "SET_LOADING_ON" };
};

export const setLoadingOff = () => {
    return { type: "SET_LOADING_OFF" };
};

export const getMessages = () => {
    
    return (dispatch) => {

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
            dispatch(setLoadingOff());
            console.log(error);
        });
    };
};
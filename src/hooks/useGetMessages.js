import { useDispatch } from "react-redux";
import { db } from "../config/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { setMessages, setError, setLoadingOn, setLoadingOff, setLocalUsername } from "../redux/messagesSlice";
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
                    username: doc.data().username,
                    message: doc.data().message.split(" "),
                    time: doc.data().time,
                    id: doc.id,
                });
            });

            // detecting the links in the messages
            let modifiedMessages = messages?.map((item, index) => {
                return {
                    ...item,
                    message: item.message.map((word) => {
                        let checkLink = isURL(word);
                        return { word: checkLink.newWord, link: checkLink.isLink };
                    }),
                    time: {
                        year: item.time?.toDate()?.getFullYear(),
                        month: item.time?.toDate()?.getMonth() + 1,
                        day: item.time?.toDate()?.getDate(),
                        hour: item.time?.toDate()?.getHours(),
                        minute: item.time?.toDate()?.getMinutes(),
                        second: item.time?.toDate()?.getSeconds(),
                    },
                    periorUsername: index != 0 ? messages[index-1].username : false, 
                    nextUsername: index != messages.length-1 ? messages[index+1].username : false,
                }; 
            });

            dispatch(setMessages(modifiedMessages));
            dispatch(setLoadingOff());

            if (!messages?.length) {
                dispatch(setError("Looks like there's a problem with your connection. If you're in sanctioned countries like Iran, you have to turn on your VPN for using this app and if you're already using a VPN you need to change it. (You can use checan.ir)"));
            };

        }, (error) => {
            dispatch(setError(error));
        });

        const localStorageUsername = JSON.parse(localStorage.getItem("username"));
        if (localStorageUsername) {
            dispatch(setLocalUsername(localStorageUsername));
        }

    };

    return { getMessages };
};
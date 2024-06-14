import { useDispatch } from "react-redux";
import { db } from "../config/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { setMessages, setDeletedMessages, setUsernames } from "../redux/firestoreSlice";
import { isURL } from "../functions/isURL";

export const useFirestore = () => {
    const dispatch = useDispatch();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const getUsers = () => {
        let usernames = {};
        const unsubUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
            usernames = {};
            snapshot.docs.forEach(doc => {
                usernames[doc.id] = doc.data().username;
            });
            dispatch(setUsernames(usernames));
        });
    };

    const getMessages = () => {
        let messages = [];
        const ref = collection(db, 'messages');
        const q = query(ref, orderBy("time", "asc"));
        const unsubMessages = onSnapshot(q, (snapshot) => {
            // empty the messages
            messages = [];
            dispatch(setMessages(null));

            // get the messages from Firebase
            snapshot.docs.forEach(doc => {
                messages.push({
                    uid: doc.data().uid,
                    plainText: doc.data().message,
                    time: {
                        year: doc.data().time?.toDate()?.getFullYear(),
                        month: monthNames[doc.data().time?.toDate()?.getMonth()],
                        monthNum: doc.data().time?.toDate()?.getMonth(),
                        day: doc.data().time?.toDate()?.getDate(),
                        hour: doc.data().time?.toDate()?.getHours(),
                        minute: doc.data().time?.toDate()?.getMinutes(),
                        second: doc.data().time?.toDate()?.getSeconds(),
                    },
                    id: doc.id,
                    replyTo: doc.data().replyTo ? doc.data().replyTo : null,
                    deleted: doc.data().deleted,
                });
            });

            // store the deleted messages
            dispatch(setDeletedMessages(messages?.filter(item => item.deleted)));

            // remove the deleted messages
            messages = messages?.filter(item => !item.deleted);

            // add extra data to the messages
            let modifiedMessages = messages?.map((item, index) => {
                let dates = {
                    previousMessageDate: `${messages[index-1]?.time?.year} ${messages[index-1]?.time?.monthNum} ${messages[index-1]?.time?.day}`,
                    thisMessageDate: `${item?.time?.year} ${item?.time?.monthNum} ${item?.time?.day}`,
                    nextMessageDate: `${messages[index+1]?.time?.year} ${messages[index+1]?.time?.monthNum} ${messages[index+1]?.time?.day}`,
                };
                return {
                    ...item,
                    arrayText: item.plainText.toString().split(" ").map((word) => {
                        let checkLink = isURL(word);
                        return { word: checkLink.newWord, link: checkLink.isLink };
                    }),
                    previousMessageUid: index != 0 ? messages[index-1].uid : false,
                    nextMessageUid: index != messages.length-1 ? messages[index+1].uid : false,
                    previousMessageDifferentDate:
                    index != 0 ?
                        dates.thisMessageDate != dates.previousMessageDate ? true : false
                    : true,
                    nextMessageDifferentDate:
                    index+1 != messages?.length ?
                        dates.thisMessageDate != dates.nextMessageDate ? true : false
                    : false,
                    replyTo: item.replyTo ? messages.find((filteredMessage) => filteredMessage.id == item.replyTo) : "no_reply",
                };
            });

            // store the messages, or storing undefined for errors
            if (modifiedMessages) {
                dispatch(setMessages(modifiedMessages));
            } else {
                dispatch(setMessages(undefined));
            }
        });
    };

    return {
        getMessages,
        getUsers
    };
};
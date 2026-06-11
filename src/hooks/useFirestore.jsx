import { useDispatch } from "react-redux";
import { db } from "../config/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { setMessages, setDeletedMessages, setUsernames, setError } from "../redux/firestoreSlice";
import { isURL } from "../functions/isURL";
import { detectHours } from "../functions/detectHours";
import { setHour } from "../functions/setHour";
import { setMinute } from "../functions/setMinute";
import { findReplyId } from "../functions/findReplyId";

export const useFirestore = () => {
    const dispatch = useDispatch();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const getUsers = () => {
        let usernames = {};
        dispatch(setError(null));
        const ref = collection(db, 'users');
        const unsubUsers = onSnapshot(
                ref, (snapshot) => {
                usernames = {};
                snapshot.docs.forEach(doc => {
                    usernames[doc.id] = doc.data().username;
                });
                dispatch(setUsernames(usernames));
            },
            (error) => {
                dispatch(setError(error));
            }
        );
    };

    const getMessages = () => {
        let messages = [];
        dispatch(setError(null));
        const ref = collection(db, 'messages');
        const q = query(ref, orderBy("time", "asc"));
        const unsubMessages = onSnapshot(
            q, (snapshot) => {
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
                            hour: setHour(doc.data().time?.toDate()?.getHours()),
                            minute: setMinute(doc.data().time?.toDate()?.getMinutes()),
                            format: detectHours(doc.data().time?.toDate()?.getHours()),
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

                // optimized data handling by adding necessary information and removing redundancies
                let modifiedMessages = messages?.map((item, index) => {
                    let dates = {
                        previousMessageDate: `${messages[index-1]?.time?.year} ${messages[index-1]?.time?.monthNum} ${messages[index-1]?.time?.day}`,
                        thisMessageDate: `${item?.time?.year} ${item?.time?.monthNum} ${item?.time?.day}`,
                        nextMessageDate: `${messages[index+1]?.time?.year} ${messages[index+1]?.time?.monthNum} ${messages[index+1]?.time?.day}`,
                    };
                    let newItem = {
                        ...item,
                        // Split text by spaces or newline characters, preserving the delimiters
                        arrayText: item.plainText.toString().split(/(\s|\n)/).map((word) => {
                            if (word === '\n') {
                                return { word: '\n', link: false };
                            }
                            if (word.trim() === '') {
                                return null; // Ignore empty spaces created by splitting
                            }
                            let checkLink = isURL(word);
                            return { word: checkLink.newWord, link: checkLink.isLink };
                        }).filter(Boolean), // Remove null values
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
                        replyTo: item.replyTo ? findReplyId(messages, item.replyTo, index) : 'NO_REPLY',
                    };
                    delete newItem.deleted;
                    return newItem;
                });

                // store the messages or store undefined which means something went wrong
                if (modifiedMessages) {
                    dispatch(setMessages(modifiedMessages));
                } else {
                    dispatch(setMessages(undefined));
                }
            },
            (error) => {
                dispatch(setError(error));
            }
        );
    };

    return {
        getMessages,
        getUsers
    };
};
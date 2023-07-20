import { useDispatch } from "react-redux";
import { db } from "../config/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { setMessages, setError, setLoadingOn, setLoadingOff, setDeletedMessages } from "../redux/messagesSlice";
import { isURL } from "../functions/isURL";

export const useGetMessages = () => {

    const dispatch = useDispatch();

    const getMessages = () => {
        let firstTime = performance.now();

        dispatch(setError(null));
        dispatch(setLoadingOn());

        const ref = collection(db, 'messages');
        const q = query(ref, orderBy("time", "asc"));

        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const getData = async () => {
            try {
              const snapshot = await new Promise(() => {
                const unsubscribe = onSnapshot(
                    q,
                    (snapshot) => {
                        let messages = [];
                        dispatch(setMessages(null));

                        snapshot.docs.forEach(doc => {
                            messages.push({
                                uid: doc.data().uid,
                                username: doc.data().username,
                                message: doc.data().message,
                                time: {
                                    year: doc.data().time?.toDate()?.getFullYear(),
                                    month: monthNames[doc.data().time?.toDate()?.getMonth()],
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

                        dispatch(setDeletedMessages(messages?.filter(item => item.deleted)));

                        messages = messages?.filter(item => !item.deleted);

                        let modifiedMessages = messages?.map((item, index) => {
                            return {
                                ...item,
                                message: item.message.toString().split(" ").map((word) => {
                                    let checkLink = isURL(word);
                                    return { word: checkLink.newWord, link: checkLink.isLink };
                                }),
                                periorUsername: index != 0 ? messages[index-1].uid : false,
                                nextUsername: index != messages.length-1 ? messages[index+1].uid : false,
                                priorDifferentDate: index != 0 ?
                                    messages[index-1]?.time?.year != item?.time?.year ||
                                    messages[index-1]?.time?.month != item?.time?.month ||
                                    messages[index-1]?.time?.day != item?.time?.day ? true : false
                                : true,
                                nextDifferentDate: index+1 != messages?.length ?
                                    messages[index+1]?.time?.year != item?.time?.year ||
                                    messages[index+1]?.time?.month != item?.time?.month ||
                                    messages[index+1]?.time?.day != item?.time?.day ? true : false
                                : false,
                                replyTo: item.replyTo ? messages.find((filteredMessage) => filteredMessage.id == item.replyTo) : "no_reply",
                            };
                        });

                        dispatch(setMessages(modifiedMessages));

                        if (!messages?.length) {
                            dispatch(setError("There's a problem with your connection. If you're in sanctioned countries like Iran, you have to turn on your VPN for using this app and if you're already using a VPN you need to change it. (You can use checan.ir)"));
                        }
                    },
                    (error) => {
                        dispatch(setError("There's a problem with your connection. If you're in sanctioned countries like Iran, you have to turn on your VPN for using this app and if you're already using a VPN you need to change it. (You can use checan.ir)"));
                    }
                );
              });
            } catch (error) {
                dispatch(setError("There's a problem with your connection. If you're in sanctioned countries like Iran, you have to turn on your VPN for using this app and if you're already using a VPN you need to change it. (You can use checan.ir)"));
            }
        };

        getData();

        let lastTime = performance.now();
        let time = ~~lastTime - ~~firstTime;

        if (time < 1000) {
            setTimeout(() => {
                dispatch(setLoadingOff());
            }, 2500 - time);
        } else {
            dispatch(setLoadingOff());
        }

    };

    return { getMessages };
};
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { setUser } from '../redux/userSlice';
import { useNotification } from "./useNotification";

export const useChangeUsername = () => {

    const dispatch = useDispatch();

    const { user } = useSelector(store => store.userStore);
    const { messages, deletedMessages } = useSelector(store => store.messagesStore);

    const { openNotification } = useNotification();

    const changeUsername = async (newUsername) => {
        if (newUsername && newUsername != user.displayName) {
            await updateProfile(auth.currentUser, {
                displayName: newUsername,
            }).then(() => {
                dispatch(setUser({
                    ...user,
                    displayName: newUsername,
                }));
                messages.map(message => {
                    if (message.uid == user.uid) {
                        updateDoc(doc(db, "messages", message.id), {
                            username: newUsername
                        });
                    }
                });
                deletedMessages.map(message => {
                    if (message.uid == user.uid) {
                        updateDoc(doc(db, "messages", message.id), {
                            username: newUsername
                        });
                    }
                });
                openNotification("Username changed.", false);
            }).catch((err) => {
                openNotification(err.message, true);
            });
        }
    };

    return { changeUsername };
};
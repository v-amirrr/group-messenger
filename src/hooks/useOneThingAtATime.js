import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useOneThingAtATime = () => {
    const dispatch = useDispatch();
    const { popupShow } = useSelector(store => store.popupStore);
    const { replyTo } = useSelector(store => store.sendMessageStore);
    const { selectedMessages } = useSelector(store => store.userStore);

    const oneThingAtATime = () => {};

    return { oneThingAtATime };
};
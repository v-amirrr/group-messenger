import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setArrowUp, setArrowDown, setScrollButtonUnclicked } from "../redux/scrollSlice";

export const useScroll = (chatRef, chatEndRef) => {
    const dispatch = useDispatch();
    const { messages } = useSelector(store => store.firestoreStore);
    const { messagesScrollPosition, scrollToMessage } = useSelector(store => store.appStore);
    const scrollButton = useSelector(store => store.scrollStore.scrollButton);
    const [lastMessageID, setLastMessageID] = useState(messages[messages?.length - 1]?.id);
    let scrollLastPosition = chatRef?.current?.scrollTop;
    let scrollBarHeight = chatRef?.current?.scrollHeight-chatRef?.current?.clientHeight;

    // scrolling to the last sorted position in local storage
    // storing the last scroll position before component gets unmounted or tap gets refreshed/closed
    // with useEffect in clean-up function the chatRef would return null that's why I used useLayoutEffect
    useLayoutEffect(() => {
        scrollToStoredPosition();
        window.addEventListener('beforeunload', storeScrollPosition);
        return () => {
            storeScrollPosition();
        };
    }, []);

    // scrolling down seamlessly only if user is at bottom of page and somebody sent a new message
    useEffect(() => {
        const currentScrollPosition = chatRef?.current?.scrollTop;
        const { id } = messages[messages?.length - 1];

        const isUserAtTheBottom = scrollBarHeight-currentScrollPosition < 500;
        const newMessage = lastMessageID != id;

        if (isUserAtTheBottom && newMessage) {
            chatEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
        } else if (newMessage) {
            setLastMessageID(messages[messages?.length - 1]?.time);
        }
    }, [messages[messages?.length - 1]?.time]);

    // storing scrollBarHeight
    useEffect(() => {
        scrollBarHeight = chatRef?.current?.scrollHeight-chatRef?.current?.clientHeight;
    }, [chatRef?.current?.scrollTop]);

    // scroll to a certain message (when user clicks on reply section)
    useEffect(() => {
        if (scrollToMessage != null) {
            scrollTo(messagesScrollPosition[scrollToMessage]?.top, 'smooth');
        }
    }, [scrollToMessage]);

    useEffect(() => {
        if (scrollButton.clicked) scrollButtonClickHandler()
        dispatch(setScrollButtonUnclicked());
    }, [scrollButton.clicked]);

    const scrollUp = (mode) => {
        chatRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: mode,
        });
    };

    const scrollDown = (mode) => {
        chatRef?.current?.scrollTo({
            top: chatRef?.current?.scrollHeight - chatRef?.current?.clientHeight,
            left: 0,
            behavior: mode,
        });
    };

    const scrollTo = (position, mode) => {
        chatRef?.current?.scrollTo({
            top: position,
            left: 0,
            behavior: mode,
        });
    };

    const detectScrollDirection = () => {
        if (chatRef?.current?.scrollTop > scrollLastPosition) {
            dispatch(setArrowDown());
        } else if (chatRef?.current?.scrollTop < scrollLastPosition) {
            dispatch(setArrowUp());
        }
        if (chatRef?.current?.scrollTop <= 200) {
            dispatch(setArrowDown());
        } else if (~~chatRef?.current?.scrollTop + 200 >= chatRef?.current?.scrollHeight - chatRef?.current?.clientHeight) {
            dispatch(setArrowUp());
        }
        scrollLastPosition = chatRef?.current?.scrollTop;
    };

    const scrollButtonClickHandler = () => {
        if (scrollButton.direction == 'UP') {
            scrollUp('smooth');
        } else {
            scrollDown('smooth');
        }
    };

    const storeScrollPosition = () => {
        localStorage.setItem('scroll', chatRef?.current?.scrollTop);
    };

    const onChatScrollHandler = () => {
        detectScrollDirection();
    };

    const scrollToStoredPosition = () => {
        scrollTo(localStorage.getItem('scroll'), 'instant');
        setTimeout(() => {
            detectScrollDirection();
        }, 1000);
    };

    return {
        onChatScrollHandler,
        scrollToMessage,
    };
};
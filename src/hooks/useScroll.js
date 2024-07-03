import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useScroll = (chatRef) => {
    const { messages } = useSelector(store => store.firestoreStore);
    const { messagesScrollPosition, scrollToMessage } = useSelector(store => store.appStore);
    const [arrow, setArrow] = useState(true);
    let scrollLastPosition = chatRef?.current?.scrollTop;

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

    // scrolling down if user is at bottom of page and a new message gets snet
    useEffect(() => {
        const scrollBarHeight = chatRef?.current?.scrollHeight-chatRef?.current?.clientHeight;
        const currentPosition = chatRef?.current?.scrollTop;
        if (messages[messages?.length - 1]?.time?.year && scrollBarHeight-currentPosition < 400) {
            scrollDown();
        }
    }, [messages[messages?.length - 1]?.time]);

    // scroll to a certain message (when user clicks on reply section)
    useEffect(() => {
        if (scrollToMessage != null) {
            scrollTo(messagesScrollPosition[scrollToMessage]?.top, 'smooth');
        }
    }, [scrollToMessage]);

    const scrollUp = (mode) => {
        chatRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: mode,
        });
    };

    const scrollDown = (mode) => {
        chatRef.current.scrollTo({
            top: chatRef?.current?.scrollHeight - chatRef?.current?.clientHeight,
            left: 0,
            behavior: mode,
        });
    };

    const scrollTo = (position, mode) => {
        chatRef.current.scrollTo({
            top: position,
            left: 0,
            behavior: mode,
        });
    };

    const detectScrollDirection = () => {
        if (chatRef?.current?.scrollTop > scrollLastPosition) {
            setArrow('DOWN');
        } else if (chatRef?.current?.scrollTop < scrollLastPosition) {
            setArrow('UP');
        }
        if (chatRef?.current?.scrollTop <= 200) {
            setArrow('DOWN');
        } else if (~~chatRef?.current?.scrollTop + 200 >= chatRef?.current?.scrollHeight - chatRef?.current?.clientHeight) {
            setArrow('UP');
        }
        scrollLastPosition = chatRef?.current?.scrollTop;
    };

    const scrollButtonClickHandler = () => {
        if (arrow == 'UP') {
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
        arrow,
        onChatScrollHandler,
        scrollButtonClickHandler,
        scrollToMessage
    };
};
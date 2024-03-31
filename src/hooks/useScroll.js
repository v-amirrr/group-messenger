import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useScroll = (chatRef) => {

    const { messages } = useSelector(store => store.firestoreStore);
    const [arrow, setArrow] = useState(true);
    const [newMessage, setNewMessage] = useState(true);
    const [scrollLastPosition, setScrollLastPosition] = useState(chatRef?.current?.scrollTop);
    const [lastMessageTime, setLastMessageTime] = useState(messages[messages?.length - 1]?.time);

    useEffect(() => {
        scrollToLastPosition();
    }, []);

    useEffect(() => {
        let newMessageTime = new Date(
            messages[messages?.length - 1]?.time?.year,
            messages[messages?.length - 1]?.time?.monthNum,
            messages[messages?.length - 1]?.time?.day,
            messages[messages?.length - 1]?.time?.hour,
            messages[messages?.length - 1]?.time?.minute,
            messages[messages?.length - 1]?.time?.second,
        );
        let previousLastMessageTime = new Date(
            lastMessageTime?.year,
            lastMessageTime?.monthNum,
            lastMessageTime?.day,
            lastMessageTime?.hour,
            lastMessageTime?.minute,
            lastMessageTime?.second,
        );
        if (
            messages[messages?.length - 1]?.time != lastMessageTime &&
            newMessageTime.getTime() > previousLastMessageTime.getTime() &&
            ~~chatRef?.current?.scrollTop + 200 <= chatRef?.current?.scrollHeight - chatRef?.current?.clientHeight
        ) {
            setNewMessage(true);
            setLastMessageTime(messages[messages?.length - 1]?.time);
        } else if (
            messages[messages?.length - 1]?.time != lastMessageTime &&
            newMessageTime.getTime() > previousLastMessageTime.getTime() &&
            ~~chatRef?.current?.scrollTop + 200 >= chatRef?.current?.scrollHeight - chatRef?.current?.clientHeight
        ) {
            setLastMessageTime(messages[messages?.length - 1]?.time);
            scrollDown();
        }
    }, [messages[messages?.length - 1]?.time]);

    const scrollUp = () => {
        chatRef?.current?.scrollTo(0, 0);
    };

    const scrollDown = (mode) => {
        chatRef?.current?.scrollBy({
            top: chatRef?.current?.scrollHeight - chatRef?.current?.clientHeight,
            behavior: mode,
        });
        setNewMessage(false);
        setLastMessageTime(messages[messages?.length - 1]?.time);
    };

    const scrollTo = (position, mode) => {
        chatRef?.current?.scrollBy({
            top: position,
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
        setScrollLastPosition(chatRef?.current?.scrollTop);
    };

    const scrollButtonClickHandler = () => {
        if (arrow == 'UP') {
            scrollUp();
        } else {
            scrollDown('smooth');
        }
    };

    const storeChatScrollPosition = () => {
        localStorage.setItem('scroll', scrollLastPosition);
        if (~~chatRef?.current?.scrollTop + 100 >= chatRef?.current?.scrollHeight - chatRef?.current?.clientHeight) {
            localStorage.setItem('scroll', 'end');
        }
    };

    const onChatScrollHandler = () => {
        detectScrollDirection();
        storeChatScrollPosition();
    };

    const scrollToLastPosition = () => {
        const lastScrollPosition = localStorage.getItem('scroll');
        if (lastScrollPosition == 'end') {
            scrollDown('instant');
        } else {
            scrollTo(lastScrollPosition, 'instant');
        }
    };

    return {
        arrow,
        newMessage,
        onChatScrollHandler,
        scrollButtonClickHandler,
        scrollDown
    };

};
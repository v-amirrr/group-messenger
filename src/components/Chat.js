import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRedirection } from '../hooks/useRedirection';
import Message from './message/Message';
import Input from './Input';
import Menu from './Menu';
import SelectBar from './SelectBar';
import Profile from './Profile';
import ScrollButton from './ScrollButton';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { groupChatVariants } from '../config/varitans';

const Chat = () => {
    const messagesEndRef = useRef();
    const messagesRef = useRef();
    const { messages, usernames } = useSelector(store => store.messagesStore);
    const { user } = useSelector(store => store.userStore);
    const { selectedMessages } = useSelector(store => store.appStore);
    const { groupChatRedirection } = useRedirection();
    const [scroll, setScroll] = useState(true);
    const [newMessage, setNewMessage] = useState(false);
    const [lastMessageTime, setLastMessageTime] = useState(messages[messages?.length-1]?.time);

    let scrollPosition = messagesRef?.current?.scrollTop;

    const scrollButtonClickHandler = () => {
        if (scroll) {
            messagesEndRef?.current?.scrollIntoView({
                behavior: "smooth", block: "center", inline: "end"
            });
            setNewMessage(false);
            setLastMessageTime(messages[messages?.length-1]?.time);
        } else {
            messagesRef?.current?.scrollTo(0, 0);
        }
    };

    const onScrollHandler = () => {
        if (messagesRef?.current?.scrollTop > scrollPosition) {
            setScroll(true);
        } else if (messagesRef?.current?.scrollTop < scrollPosition) {
            setScroll(false);
        }
        if (messagesRef?.current?.scrollTop <= 200) {
            setScroll(true);
        } else if (~~messagesRef?.current?.scrollTop + 200 >= messagesRef?.current?.scrollHeight - messagesRef?.current?.clientHeight) {
            setScroll(false);
        }
        scrollPosition = messagesRef?.current?.scrollTop;
        localStorage.setItem("scroll", scrollPosition);
        if (~~messagesRef?.current?.scrollTop + 100 >= messagesRef?.current?.scrollHeight - messagesRef?.current?.clientHeight) {
            localStorage.setItem("scroll", "end");
            setNewMessage(false);
            setLastMessageTime(messages[messages?.length-1]?.time);
        }
    };

    const scrollDown = () => {
        messagesEndRef?.current?.scrollIntoView({
            behavior: "smooth", block: "center", inline: "end"
        });
        setNewMessage(false);
        setLastMessageTime(messages[messages?.length-1]?.time);
    };

    useEffect(() => {
        groupChatRedirection();
    }, [messages]);

    useEffect(() => {
        let newMessageTime = new Date(
            messages[messages?.length-1]?.time?.year,
            messages[messages?.length-1]?.time?.monthNum,
            messages[messages?.length-1]?.time?.day,
            messages[messages?.length-1]?.time?.hour,
            messages[messages?.length-1]?.time?.minute,
            messages[messages?.length-1]?.time?.second
        );
        let previousLastMessageTime = new Date(
            lastMessageTime?.year,
            lastMessageTime?.monthNum,
            lastMessageTime?.day,
            lastMessageTime?.hour,
            lastMessageTime?.minute,
            lastMessageTime?.second
        );
        if (messages[messages?.length-1]?.time != lastMessageTime &&
            newMessageTime.getTime() > previousLastMessageTime.getTime() &&
            ~~messagesRef?.current?.scrollTop + 100 <= messagesRef?.current?.scrollHeight - messagesRef?.current?.clientHeight){
                setNewMessage(true);
                setLastMessageTime(messages[messages?.length-1]?.time);
        } else if (messages[messages?.length-1]?.time != lastMessageTime &&
            newMessageTime.getTime() > previousLastMessageTime.getTime() &&
            ~~messagesRef?.current?.scrollTop + 100 >= messagesRef?.current?.scrollHeight - messagesRef?.current?.clientHeight) {
                setLastMessageTime(messages[messages?.length-1]?.time);
                scrollDown();
            }
    }, [messages[messages?.length-1]?.time]);

    useEffect(() => {
        const localstorageScroll = localStorage.getItem("scroll");
            if (localstorageScroll == 'end') {
                messagesRef?.current?.scrollBy({
                    top: messagesRef?.current?.scrollHeight - messagesRef?.current?.clientHeight,
                    left: 0,
                    behavior: "instant"
                });
            } else {
                messagesRef?.current?.scrollBy({
                    top: localstorageScroll,
                    left: 0,
                    behavior: "instant"
                });
            }
    }, []);

    return (
        <>
            <AnimatePresence exitBeforeEnter>
                {!selectedMessages.length ? <Menu key="menu" /> : ''}
            </AnimatePresence>

            <AnimatePresence exitBeforeEnter>
                {!selectedMessages.length ? <Profile key="profile" /> : ''}
            </AnimatePresence>

            <ScrollButton key="scroll" click={scrollButtonClickHandler} scroll={scroll} newMessage={newMessage} scrollDown={scrollDown} />

            <AnimatePresence exitBeforeEnter>
                {selectedMessages.length ? <SelectBar key="select" /> : ''}
            </AnimatePresence>

            <ChatContainer onScroll={onScrollHandler} ref={messagesRef} layout initial='hidden' animate='visible' exit='exit' variants={groupChatVariants}>
                <AnimatePresence>
                    {
                        messages?.map(message => (
                        <Message
                            key={message.id}
                            type="CHAT"
                            message={{
                                messageUid: message.uid,
                                localUid: user?.uid,
                                messageUsername: usernames[message.uid],
                                id: message.id,
                                message: message.message,
                                periorUsername: message.periorUsername,
                                nextUsername: message.nextUsername,
                                time: message.time,
                                priorDifferentDate: message.priorDifferentDate,
                                nextDifferentDate: message.nextDifferentDate,
                                replyTo: message.replyTo,
                            }}
                        />
                        ))
                    }
                </AnimatePresence>
                <div ref={messagesEndRef} />
            </ChatContainer>

            <AnimatePresence exitBeforeEnter>
                {!selectedMessages.length ? <Input key="input" /> : ""}
            </AnimatePresence>
        </>
    );
};

const ChatContainer = styled(motion.div)`
    width: 100%;
    height: 100%;
    overflow: hidden scroll;
    position: relative;
    padding: 5rem 8rem 9rem 8rem;
    scroll-behavior: smooth;

    @media (max-width: 768px) {
        width: 100vw;
        padding: 5rem 1rem 10rem 1rem;
    }
`;

export default Chat;
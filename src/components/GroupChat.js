import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRedirection } from '../hooks/useRedirection';
import Message from './message/Message';
import MessengerInput from './MessengerInput';
import MessengerMenu from './MessengerMenu';
import SelectBar from './SelectBar';
import Profile from './Profile';
import ScrollButton from './ScrollButton';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { groupChatVariants } from '../config/varitans';

const GroupChat = () => {

    const messagesEndRef = useRef();
    const messagesRef = useRef();
    const { groupChatRedirection } = useRedirection();

    const { messages, usernames } = useSelector(store => store.messagesStore);
    const { user } = useSelector(store => store.userStore);
    const { selectedMessages } = useSelector(store => store.appStore);

    const [scroll, setScroll] = useState(true);

    let scrollPosition = messagesRef?.current?.scrollTop;

    const scrollButtonClickHandler = () => {
        if (scroll) {
            messagesEndRef?.current?.scrollIntoView({
                behavior: "smooth", block: "center", inline: "end"
            });
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
        if (~~messagesRef?.current?.scrollTop >= messagesRef?.current?.scrollHeight - messagesRef?.current?.clientHeight) {
            localStorage.setItem("scroll", "end");
        }
    };

    const scrollDown = () => {
        messagesEndRef?.current?.scrollIntoView({
            behavior: "smooth", block: "center", inline: "end"
        });
    };

    useEffect(() => {
        groupChatRedirection();
    }, [messages]);

    useEffect(() => {
        if (messages[messages?.length-1]?.time?.year && messages[messages?.length-1]?.uid == user?.uid) {
            scrollDown();
        }
    }, [messages[messages?.length-1]?.time]);

    useEffect(() => {
        const localstorageScroll = localStorage.getItem("scroll");
            if (localstorageScroll == 'end') {
                scrollDown();
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
                {!selectedMessages.length ? <MessengerMenu key="menu" /> : ""}
            </AnimatePresence>

            <AnimatePresence exitBeforeEnter>
                {!selectedMessages.length ? <Profile key="profile" /> : ""}
            </AnimatePresence>

            <ScrollButton key="scroll-button" click={scrollButtonClickHandler} scroll={scroll} />

            <AnimatePresence exitBeforeEnter>
                {selectedMessages.length ? <SelectBar key="select-bar" /> : ""}
            </AnimatePresence>

            <GroupChatContainer onScroll={onScrollHandler} ref={messagesRef} layout initial='hidden' animate='visible' exit='exit' variants={groupChatVariants}>
                <AnimatePresence>
                    {messages?.map(message => (
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
                    ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
            </GroupChatContainer>

            <AnimatePresence exitBeforeEnter>
                {!selectedMessages.length ? <MessengerInput key="input" /> : ""}
            </AnimatePresence>
        </>
    );
};

const GroupChatContainer = styled(motion.div)`
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

export default GroupChat;
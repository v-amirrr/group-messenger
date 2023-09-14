import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRedirection } from '../hooks/useRedirection';
import Message from './message/Message';
import MessengerInput from './MessengerInput';
import MessengerMenu from './MessengerMenu';
import SelectBar from './SelectBar';
import GeustSign from './GeustSign';
import ScrollButton from './ScrollButton';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { groupChatVariants } from '../config/varitans';

const GroupChat = () => {

    const messagesEndRef = useRef();
    const messagesRef = useRef();
    const { groupChatRedirection } = useRedirection();

    const { messages } = useSelector(store => store.messagesStore);
    const { user, enterAsAGuest } = useSelector(store => store.userStore);
    const { selectedMessages } = useSelector(store => store.appStore);

    const [scroll, setScroll] = useState(true);

    let scrollPosition = messagesRef?.current?.scrollTop;

    useEffect(() => {
        groupChatRedirection();
    }, [messages]);

    const scrollButtonClickHandler = () => {
        if (scroll) {
            messagesEndRef?.current?.scrollIntoView({
                behavior: "smooth", block: "center", inline: "end"
            });
        } else {
            messagesRef?.current?.scrollTo(0,0);
        }
    };

    const onScrollHandler = () => {
        if (messagesRef?.current?.scrollTop > scrollPosition) {
            setScroll(true);
        } else if (messagesRef?.current?.scrollTop < scrollPosition) {
            setScroll(false);
        }
        if (messagesRef?.current?.scrollTop <= 100) {
            setScroll(true);
        } else if (messagesRef?.current?.scrollTop >= messagesRef?.current?.scrollHeight - messagesRef?.current?.clientHeight) {
            setScroll(false);
        }
        scrollPosition = messagesRef?.current?.scrollTop;
    };

    return (
        <>
            <AnimatePresence exitBeforeEnter>
                {!selectedMessages.length ? <MessengerMenu key="messenger-menu" /> : ""}
            </AnimatePresence>

            <AnimatePresence exitBeforeEnter>
                {!selectedMessages.length ? <ScrollButton key="scroll-button" click={scrollButtonClickHandler} scroll={scroll} /> : ""}
            </AnimatePresence>

            <AnimatePresence exitBeforeEnter>
                {selectedMessages.length ? <SelectBar key="select-bar" /> : ""}
            </AnimatePresence>

            <AnimatePresence exitBeforeEnter>
                {enterAsAGuest ? <GeustSign key="guest-sign" /> : ""}
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
                                messageUsername: message.username,
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
                {!selectedMessages.length ? <MessengerInput key="messenger-input" /> : ""}
            </AnimatePresence>
        </>
    );
};

const GroupChatContainer = styled(motion.div)`
    width: 100%;
    height: 100%;
    overflow: hidden scroll;
    position: relative;
    padding: 5rem 2rem 8rem 2rem;
    scroll-behavior: smooth;

    @media (max-width: 800px) {
        padding: 5rem 1.5rem 5rem 1.5rem;
    }

    @media (max-width: 500px) {
        width: 100vw;
        padding: 5rem 1rem 10rem 1rem;
    }
`;

export default GroupChat;
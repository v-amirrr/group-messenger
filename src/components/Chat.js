import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMessageOptions } from '../hooks/useMessageOptions';
import { useScroll } from '../hooks/useScroll';
import { isPersian } from '../functions/isPersian';
import Message from './message/Message';
import Menu from './Menu';
import Profile from './Profile';
import ScrollButton from './ScrollButton';
import InputBar from './InputBar';
import SelectBar from './SelectBar';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { groupChatVariants } from '../config/varitans';

const Chat = () => {
    const chatRef = useRef();
    const { messages, usernames } = useSelector(store => store.firestoreStore);
    const { user } = useSelector(store => store.userStore);
    const { scrollPosition, selectedMessages, messagesScrollPosition, scrollMessageId } = useSelector(store => store.appStore);
    const { resetScrollMessageId } = useMessageOptions();
    const { arrow, newMessage, scrollButtonClickHandler, onChatScrollHandler, scrollDown } = useScroll(chatRef);
    const [messageOptions, setMessageOptions] = useState(false);

    useEffect(() => {
        if (scrollMessageId.id) {
            if (scrollMessageId.type == 'CLICK') {
                chatRef?.current?.scrollTo(0, ~~messagesScrollPosition[scrollMessageId.id] - 200);
            }
            setTimeout(() => {
                resetScrollMessageId();
            }, 2000);
        }
    }, [scrollMessageId]);

    return (
        <>
            <AnimatePresence>
                {!selectedMessages.length ? <Menu key='menu' /> : ''}
            </AnimatePresence>

            <AnimatePresence>
                {!selectedMessages.length ? <Profile key='profile' /> : ''}
            </AnimatePresence>

            <ScrollButton
                key='scroll'
                click={scrollButtonClickHandler}
                arrow={arrow}
                newMessage={newMessage}
                scrollDown={scrollDown}
            />

            <AnimatePresence>
                {!selectedMessages.length ? <InputBar key='input' /> : <SelectBar key='select' />}
            </AnimatePresence>

            <ChatContainer
                initial='hidden'
                animate='visible'
                exit='exit'
                variants={groupChatVariants}
                layout
                ref={chatRef}
                onScroll={onChatScrollHandler}
            >
                <AnimatePresence>
                    {
                        messages?.map((message) => (
                        <Message
                            key={message.id}
                            type='CHAT'
                            message={{
                                messageUid: message.uid,
                                localUid: user?.uid,
                                localMessage: user?.uid == message.uid,
                                messageUsername: usernames[message.uid],
                                id: message.id,
                                text: message.message,
                                plainText: message.plainText,
                                isTextPersian : isPersian(message.plainText) ? 1 : 0,
                                textLetters: message.plainText.length,
                                periorUsername: message.periorUsername,
                                nextUsername: message.nextUsername,
                                time: message.time,
                                priorDifferentDate: message.priorDifferentDate,
                                nextDifferentDate: message.nextDifferentDate,
                                replyTo: message.replyTo,
                            }}
                            options={{
                                messageOptions: messageOptions,
                                setMessageOptions: setMessageOptions,
                            }}
                        />
                        ))
                    }
                </AnimatePresence>
            </ChatContainer>
        </>
    );
};

const ChatContainer = styled(motion.div)`
    position: relative;
    width: 100%;
    height: 100%;
    padding: 5rem 8rem 9rem 8rem;
    scroll-behavior: smooth;
    overflow: hidden scroll;

    @media (max-width: 768px) {
        width: 100vw;
        padding: 5rem 1rem 10rem 1rem;
    }
`;

export default Chat;
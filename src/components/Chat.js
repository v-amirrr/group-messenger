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

const Chat = () => {
    const chatRef = useRef();
    const { messages, usernames } = useSelector(store => store.firestoreStore);
    const { user, enterAsAGuest } = useSelector(store => store.userStore);
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
            <Menu key='menu' />

            <AnimatePresence>
                {!selectedMessages.length && enterAsAGuest ? <Profile key='profile' /> : ''}
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
                layout
                ref={chatRef}
                onScroll={onChatScrollHandler}
            >
                <AnimatePresence>
                    {
                        messages?.map((messageData) => (
                        <Message
                            key={messageData.id}
                            type='CHAT'
                            messageData={{
                                ...messageData,
                                username: usernames[messageData.uid],
                                isLocalMessage: user?.uid == messageData.uid,
                                localUid: user?.uid,
                                isTextPersian : isPersian(messageData.plainText),
                                textLetters: messageData.plainText.length > 20 ? 20 : messageData.plainText.length,
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
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useScroll } from '../hooks/useScroll';
import { isPersian } from '../functions/isPersian';
import Message from './message/Message';
import Menu from './Menu';
import Profile from './Profile';
import ScrollButton from './ScrollButton';
import InputBar from './InputBar';
import SelectBar from './SelectBar';
import Options from './Options';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

const Chat = () => {
    const chatRef = useRef();
    const { messages } = useSelector(store => store.firestoreStore);
    const { user, enterAsAGuest } = useSelector(store => store.userStore);
    const { selectedMessages } = useSelector(store => store.appStore);
    const { arrow, scrollButtonClickHandler, onChatScrollHandler } = useScroll(chatRef);
    const [messageOptions, setMessageOptions] = useState({ data: null, animationStatus: 0 });
    return (
        <>
            <Menu />

            <AnimatePresence>
                {!selectedMessages.length && enterAsAGuest ? <Profile key='profile' /> : ''}
            </AnimatePresence>

            <ScrollButton
                click={scrollButtonClickHandler}
                arrow={arrow}
            />

            <AnimatePresence>
                {!selectedMessages.length ? <InputBar key='input' /> : <SelectBar key='select' />}
            </AnimatePresence>

            <Options messageOptions={messageOptions} setMessageOptions={setMessageOptions} type='CHAT' />

            <ChatContainer
                layout
                ref={chatRef}
                onScroll={onChatScrollHandler}
                data={{
                    messageOptionsAnimationStatus: messageOptions?.animationStatus
                }}
            >
                <AnimatePresence>
                    {
                        messages?.map((messageData) => (
                            <Message
                                key={messageData.id}
                                type='CHAT'
                                messageData={{
                                    ...messageData,
                                    isLocalMessage: user?.uid == messageData.uid,
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
    transform: ${props => props.data.messageOptionsAnimationStatus == 2 ? 'scale(0.96)' : 'scale(1)'};
    transition: transform .4s cubic-bezier(0.53, 0, 0, 0.98);

    @media (max-width: 768px) {
        width: 100vw;
        padding: 5rem 1rem 10rem 1rem;
        transform: ${props => props.data.messageOptionsAnimationStatus == 2 ? 'scale(0.94)' : 'scale(1)'};
}
`;

export default Chat;
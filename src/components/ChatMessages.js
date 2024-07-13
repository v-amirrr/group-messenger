import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useScroll } from '../hooks/useScroll';
import { isPersian } from '../functions/isPersian';
import Message from './message/Message';
import MenuButton from './MenuButton';
import ScrollButton from './ScrollButton';
import InputBar from './InputBar';
import SelectBar from './SelectBar';
import Options from './Options';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { chatMessagesVariants, messagesVariants } from '../config/varitans';

const ChatMessages = () => {
    const chatRef = useRef();
    const { messages } = useSelector(store => store.firestoreStore);
    const { optionsAnimationStatus } = useSelector(store => store.optionsStore);
    const { user } = useSelector(store => store.userStore);
    const { selectedMessages } = useSelector(store => store.selectStore);
    const { arrow, scrollButtonClickHandler, onChatScrollHandler } = useScroll(chatRef);
    return (
        <>
            <Options type='CHAT' />

            <ChatMessagesContainer
                initial='hidden' animate='visible' exit='exit' variants={chatMessagesVariants}
                data={{ optionsAnimationStatus }}
            >
                <MenuButton />

                <ScrollButton click={scrollButtonClickHandler} arrow={arrow} />

                <AnimatePresence>
                    {!selectedMessages.length ? <InputBar key='input' /> : <SelectBar key='select' />}
                </AnimatePresence>

                <motion.div
                    className='messages'
                    layout
                    variants={messagesVariants}
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
                                        isLocalMessage: user?.uid == messageData.uid,
                                        isTextPersian : isPersian(messageData.plainText),
                                        textLetters: messageData.plainText.length > 20 ? 20 : messageData.plainText.length,
                                    }}
                                />
                            ))
                        }
                    </AnimatePresence>
                </motion.div>
            </ChatMessagesContainer>
        </>
    );
};

const ChatMessagesContainer = styled(motion.div)`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: ${props => props.data.optionsAnimationStatus == 2 ? 'scale(0.955)' : 'scale(1)'} !important;
    transition: ${props => props.data.optionsAnimationStatus == 2 ? 'transform .4s' : 'transform .3s'};

    .messages {
        position: relative;
        width: 47%;
        height: 100%;
        padding: 5rem 2rem 9rem 2rem;
        scroll-behavior: smooth;
        overflow: hidden scroll;

        @media (max-width: 768px) {
            width: 100vw;
            padding: 5rem 1rem 10rem 1rem;
            transform: ${props => props.data.messageOptionsAnimationStatus == 2 ? 'scale(0.94)' : 'scale(1)'};
        }
    }
`;

export default ChatMessages;
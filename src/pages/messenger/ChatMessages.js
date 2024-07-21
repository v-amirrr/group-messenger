import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useScroll } from '../../hooks/useScroll';
import { isPersian } from '../../functions/isPersian';
import Message from './message/Message';
import MenuButton from './MenuButton';
import ScrollButton from './ScrollButton';
import InputBar from './input/InputBar';
import SelectBar from './SelectBar';
import Options from './options/Options';
import EditReplyBar from './EditReplyBar';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { chatMessagesVariants, messagesVariants } from '../../config/varitans';

const ChatMessages = () => {
    const chatRef = useRef();
    const { messages } = useSelector(store => store.firestoreStore);
    const { optionsAnimationStatus } = useSelector(store => store.optionsStore);
    const { user } = useSelector(store => store.userStore);
    const { selectedMessages } = useSelector(store => store.selectStore);
    const { editReply } = useSelector(store => store.appStore);
    const { arrow, scrollButtonClickHandler, onChatScrollHandler } = useScroll(chatRef);
    return (
        <>
            <Options type='CHAT' />

            <ChatMessagesContainer
                initial='hidden' animate='visible' exit='exit' variants={chatMessagesVariants}
                data={{ optionsAnimationStatus }}
            >
                <AnimatePresence exitBeforeEnter>
                {
                    !editReply?.show ?
                    <>
                        <MenuButton key='MenuButton' />
                        <ScrollButton key='ScrollButton' click={scrollButtonClickHandler} arrow={arrow} />
                    </>
                    : ''
                }
                </AnimatePresence>

                <AnimatePresence>
                    {
                        editReply?.show ?
                        <EditReplyBar key='edit-reply' /> :
                        selectedMessages.length ?
                        <SelectBar key='select' /> :
                        <InputBar key='input' />
                    }
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
                            editReply.show ?
                            editReply?.messages?.map((messageData) => (
                                <Message
                                    key={messageData.id}
                                    type='EDIT_REPLY'
                                    messageData={{
                                        ...messageData,
                                        isLocalMessage: user?.uid == messageData.uid,
                                        isTextPersian : isPersian(messageData.plainText),
                                        textLetters: messageData.plainText.length > 20 ? 20 : messageData.plainText.length,
                                    }}
                                />
                            )) :
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
    transform: ${props => props.data.optionsAnimationStatus == 2 ? 'scale(0.95)' : 'scale(1)'} !important;
    transition: transform .3s;

    .messages {
        position: relative;
        width: 47%;
        height: 100%;
        padding: 5rem 2rem 9rem 2rem;
        scroll-behavior: smooth;
        overflow: hidden scroll;
    }

    @media (max-width: 768px) {
        .messages {
            padding: 5rem 1rem 10rem 1rem;
            width: 100%;
        }
    }
`;

export default ChatMessages;
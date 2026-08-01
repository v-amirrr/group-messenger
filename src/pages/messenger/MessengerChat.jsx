import React from 'react';
import { useSelector } from 'react-redux';
import Options from './options/Options';
import ChatMessages from './ChatMessages';
import MessengerBars from './MessengerBars';
import MessengerButtons from './MessengerButtons';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { chatMessagesVariants, messagesVariants } from '../../config/variants';
const framerMotionAttributes = variants => ({ initial: 'hidden', animate: 'visible', exit: 'exit', variants });

const MessengerChat = () => {
    const optionsAnimationStatus = useSelector(store => store.optionsStore.optionsAnimationStatus);
    return (
        <>
            <Options type='CHAT' />

            <MessengerChatContainer {...framerMotionAttributes(chatMessagesVariants)} optionsAnimationStatus={optionsAnimationStatus}>
                <MessengerButtons />
                <MessengerBars />
                <ChatMessages />
            </MessengerChatContainer>
        </>
    );
};

const MessengerChatContainer = styled(motion.div)`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: ${props => props.optionsAnimationStatus === 2 ? 'scale(0.96)' : 'scale(1)'};
    transition: ${props => props.optionsAnimationStatus === 2 ? 'transform .3s' : 'transform .2s'};

    .messages {
        position: relative;
        width: 47%;
        height: 100%;
        padding: 5rem 2rem 7rem 2rem;
        scroll-behavior: smooth;
        overflow: hidden scroll;

        @media (max-width: 1400px) {
            width: 70%;
        }

        @media (max-width: 1100px) {
            width: 80%;
        }

        @media (max-width: 800px) {
            width: 90%;
        }
    }

    @media (max-width: 768px) {
        .messages {
            padding: 5rem 1rem 10rem 1rem;
            width: 100%;
        }
    }
`;

export default MessengerChat;
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useScroll } from '../../hooks/useScroll';
import { isPersian } from '../../functions/isPersian';
import MenuButton from './MenuButton';
import ScrollButton from './ScrollButton';
import ChatInput from './input/ChatInput';
import SelectBar from './SelectBar';
import Options from './options/Options';
import EditReplyBar from './EditReplyBar';
import ChatMessages from './ChatMessages';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { chatMessagesVariants, messagesVariants } from '../../config/varitans';
import { MessengerBars } from './MessengerBars';
import { MessengerButtons } from './MessengerButtons';
const framerMotionAttributes = variants => ({ initial: 'hidden', animate: 'visible', exit: 'exit', variants });

const MessengerChat = () => {
    const chatRef = useRef();
    const chatEndRef = useRef();
    const { optionsAnimationStatus } = useSelector(store => store.optionsStore);
    const { arrow, scrollButtonClickHandler, onChatScrollHandler } = useScroll(chatRef, chatEndRef);
    return (
        <>
            <Options type='CHAT' />

            <MessengerChatContainer {...framerMotionAttributes(chatMessagesVariants)} data={{ optionsAnimationStatus }}>
                <MessengerButtons {...{scrollButtonClickHandler, arrow}} />
                <MessengerBars />
                <ChatMessages {...{chatRef, chatEndRef, onChatScrollHandler}} />
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
    transform: ${props => props.data.optionsAnimationStatus == 2 ? 'scale(0.96)' : 'scale(1)'};
    transition: ${props => props.data.optionsAnimationStatus == 2 ? 'transform .3s' : 'transform .2s'};

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
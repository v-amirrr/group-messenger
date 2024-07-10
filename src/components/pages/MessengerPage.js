import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ChatLoader from '../ChatLoader';
import ChatError from '../ChatError';
import ChatMessages from '../ChatMessages';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { messengerVariants } from '../../config/varitans';

const MessengerPage = () => {
    const { messages, error } = useSelector(store => store.firestoreStore);
    const [status, setStatus] = useState('LOADER');

    useEffect(() => {
        if (messages?.length) {
            setStatus('CHAT');
        } else if (messages === undefined || error) {
            setStatus('ERROR');
        }
    }, [messages]);

    return (
        <>
            <MessengerPageContainer initial='hidden' animate='visible' exit='exit' variants={messengerVariants}>
                <AnimatePresence exitBeforeEnter>
                    {
                        status == 'LOADER' ?
                        <ChatLoader key='loader' /> :
                        status == 'ERROR' ?
                        <ChatError key='error' /> :
                        status == 'CHAT' ?
                        <ChatMessages key='chat' /> : ''
                    }
                </AnimatePresence>
            </MessengerPageContainer>
        </>
    );
};

const MessengerPageContainer = styled(motion.div)`
    position: fixed;
    width: 100vw;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .chat {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        text-align: center;
        width: 62%;
        height: 100%;

        .error-message {
            padding: 0 2rem;
            line-height: 1.5;
        }

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
`;

export default MessengerPage;

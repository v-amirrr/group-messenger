import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MessengerLoader from './MessengerLoader';
import MessengerError from './MessengerError';
import MessengerChat from './MessengerChat';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { messengerVariants } from '../../config/varitans';
const framerMotionAttributes = variants => ({ initial: 'hidden', animate: 'visible', exit: 'exit', variants });

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
        <MessengerPageContainer {...framerMotionAttributes(messengerVariants)}>
            <AnimatePresence exitBeforeEnter>
                {
                    status == 'LOADER' ?
                    <MessengerLoader key='loader' /> :
                    status == 'ERROR' ?
                    <MessengerError key='error' /> :
                    status == 'CHAT' ?
                    <MessengerChat key='chat' /> : ''
                }
            </AnimatePresence>
        </MessengerPageContainer>
    );
};

const MessengerPageContainer = styled(motion.div)`
    position: fixed;
    width: 100vw;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default MessengerPage;

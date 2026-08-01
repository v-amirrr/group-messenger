import React from 'react';
import { useSelector } from 'react-redux';
import MessengerLoader from './MessengerLoader';
import MessengerError from './MessengerError';
import MessengerChat from './MessengerChat';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { messengerVariants } from '../../config/variants';
const framerMotionAttributes = variants => ({ initial: 'hidden', animate: 'visible', exit: 'exit', variants });

const MessengerPage = () => {
    const { messages, error } = useSelector(store => store.firestoreStore);
    return (
        <MessengerPageContainer {...framerMotionAttributes(messengerVariants)}>
            <AnimatePresence exitBeforeEnter>
                {
                    !messages?.length && !error ?
                    <MessengerLoader key='loader' /> :
                    messages === undefined || error ?
                    <MessengerError key='error' /> :
                    messages?.length ?
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

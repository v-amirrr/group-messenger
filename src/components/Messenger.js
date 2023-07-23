import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Loader from './Loader';
import ErrorBox from './ErrorBox';
import GroupChat from './GroupChat';
import Notification from './Notification';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { messengerVariants } from '../config/varitans';
import { useGetMessages } from '../hooks/useGetMessages';

const Messenger = () => {

    const { loadingOff } = useGetMessages();
    const { loading, error, messages } = useSelector(store => store.messagesStore);

    useEffect(() => {
        if (messages?.length) {
            loadingOff();
        }
    }, [messages]);

    return (
        <>
            <MessengerPage initial='hidden' animate='visible' exit='exit' variants={messengerVariants}>
                <Notification />
                <MessengerContainer>
                    <AnimatePresence>
                        {loading ? <Loader key="loader" usage={1} /> :
                        error ? <ErrorBox errorMessage={error} /> :
                        !loading && !error ? <GroupChat /> : ""}
                    </AnimatePresence>
                </MessengerContainer>
            </MessengerPage>
        </>
    );
};

const MessengerPage = styled(motion.main)`
    width: 100vw;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: fixed;
`;

const MessengerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    width: 55%;
    height: 100%;
    font-family: 'Outfit', sans-serif;
    position: relative;

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
`;

export default Messenger;
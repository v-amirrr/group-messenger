import React from 'react';
import { useSelector } from 'react-redux';
import Loader from './Loader';
import ErrorBox from './ErrorBox';
import GroupChat from './GroupChat';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const messengerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
};

const Messenger = () => {

    const { loading, error } = useSelector(store => store.messagesStore);

    return (
        <>
            <MessengerPage initial='hidden' animate='visible' exit='exit' variants={messengerVariants}>
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
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #00000066;
`;

const MessengerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    width: 55%;
    height: 98vh;
    font-family: 'Outfit', sans-serif;

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
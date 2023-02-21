import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetMessages } from '../hooks/useGetMessages';
import Loader from './Loader';
import ErrorBox from './ErrorBox';
import GroupChat from './GroupChat';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';

const Messenger = () => {

    const { messages, loading, error } = useSelector(store => store.messagesStore);

    const { getMessages } = useGetMessages();

    useEffect(() => {
        getMessages();
    }, []);

    return (
        <>
            <MessengerPage>
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

const MessengerPage = styled.section`
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
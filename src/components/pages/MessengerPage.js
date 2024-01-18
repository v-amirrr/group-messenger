import React from 'react';
import { useSelector } from 'react-redux';
import ChatLoader from '../ChatLoader';
import ErrorBox from '../ErrorBox';
import Chat from '../Chat';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { messengerVariants } from '../../config/varitans';

const MessengerPage = () => {
    const { loading, error } = useSelector(store => store.messagesStore);
    const { popupShow } = useSelector(store => store.popupStore);
    return (
        <>
            <MessengerPageContainer
                initial='hidden'
                animate='visible'
                exit='exit'
                variants={messengerVariants}
                blur={popupShow ? 1 : 0}
            >
                <div className='chat'>
                    <AnimatePresence exitBeforeEnter>
                        {
                            loading ?
                            <ChatLoader key='loader' />
                            : error ?
                            <ErrorBox key='error-box' errorMessage={error} />
                            : !loading && !error ?
                            <Chat />
                            : ''
                        }
                    </AnimatePresence>
                </div>
            </MessengerPageContainer>
        </>
    );
};

const MessengerPageContainer = styled(motion.main)`
    width: 100vw;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: fixed;
    filter: ${props => props.blur ? 'blur(20px)' : ''};
    transition: filter .5s;

    .chat {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        text-align: center;
        width: 62%;
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
    }
`;

export default MessengerPage;

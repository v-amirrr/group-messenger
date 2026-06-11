import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { errorBoxVariants } from '../../config/varitans';

const ChatError = () => {
    const { error } = useSelector(store => store.firestoreStore);
    return (
        <>
            <ChatErrorContainer initial='hidden' animate='visible' exit='exit' variants={errorBoxVariants}>
                <h1>Looks like there's a problem</h1>
                <p>
                    There's a problem with your connection.
                    If you're in sanctioned countries like Iran,
                    you have to turn on your VPN for using this
                    app and if you're already using a VPN you
                    need to change it. <br />(You can use  shecan.ir  for sanctions)
                    {error}
                </p>
                <button onClick={() => window.location.reload(false)}>REFRESH</button>
            </ChatErrorContainer>
        </>
    );
};

const ChatErrorContainer = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;

    h1 {
        margin: 1rem;
        color: var(--red);
        letter-spacing: -1px;
        white-space: nowrap;
    }

    p {
        max-width: 30rem;
        font-size: 1em;
        font-weight: 300;
        line-height: 1.5;
    }

    button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 55%;
        height: 2.3rem;
        background-color: var(--bg);
        box-shadow: var(--shadow);
        border-radius: 50px;
        font-size: 1rem;
        font-weight: 400;
        margin: 1rem;
        cursor: pointer;
        transition: background .2s;

        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                background-color: var(--bg-hover);
            }
        }
    }

    @media (max-width: 500px) {
        p {
            font-size: .6rem;
            max-width: 15rem;
        }
    }
`;

export default ChatError;
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { errorBoxVariants } from '../config/varitans';

const ChatError = () => {
    return (
        <>
            <ChatErrorContainer initial='hidden' animate='visible' exit='exit' variants={errorBoxVariants}>
                <h1>Looks like there's a problem</h1>
                <p>
                There's a problem with your connection. If you're in sanctioned countries like Iran, you have to turn on your VPN for using this app and if you're already using a VPN you need to change it. (You can use checan.ir)
                </p>
                <button onClick={() => window.location.reload(false)}>Refresh</button>
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
        color: #cc0000;
        letter-spacing: -1px;
        white-space: nowrap;
    }

    p {
        max-width: 30rem;
        font-size: 1em;
        font-weight: 400;
        line-height: 1.5;
        color: #ddd;
    }

    button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 55%;
        height: 2.3rem;
        background-color: var(--normal-bg);
        box-shadow: var(--normal-shadow);
        color: var(--normal-color);
        border-radius: 50px;
        font-size: 1rem;
        font-weight: 600;
        margin: 1rem;
        cursor: pointer;
        transition: background .2s;

        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                background-color: var(--normal-bg-hover);
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
import React from 'react';
import { useGetMessages } from "../hooks/useGetMessages";
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { errorBoxVariants } from '../config/varitans';

const ErrorBox = ({ errorMessage }) => {

    const { getMessages } = useGetMessages();

    return (
        <>
            <ErrorBoxContainer initial='hidden' animate='visible' exit='exit' variants={errorBoxVariants}>
                <h2>Looks like there's a problem</h2>
                <p>{errorMessage}</p>
                <button onClick={() => getMessages("try_again")}>Try Again</button>
            </ErrorBoxContainer>
        </>
    );
};

const ErrorBoxContainer = styled(motion.div)`
    padding: 2rem;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: var(--popup);
    border: var(--border-first);
    box-shadow: var(--shadow-first);
    border-radius: 25px;

    h2 {
        margin: 1rem;
        color: #ff0000;
        letter-spacing: -1px;
        white-space: nowrap;
    }

    p {
        max-width: 30rem;
        font-size: .8rem;
        color: var(--text-color-third);
        font-weight: var(--text-boldness-first);
    }

    button {
        border: none;
        border-radius: 50px;
        background-color: var(--button);
        margin: 1rem;
        padding: .5rem 1rem;
        font-size: 1rem;
        font-weight: var(--text-boldness-second);
        box-shadow: var(--shadow-first);
        cursor: pointer;
        user-select: none;
        transition: background-color .2s;
        color: var(--text-color-third);

        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                background-color: var(--button-hover);
            }
        }
    }

    @media (max-width: 500px) {
        padding: 1rem;
        background-color: #ffffff00;
        border: none;
        box-shadow: none;

        p {
            font-size: .6rem;
            max-width: 15rem;
        }
    }
`;

export default ErrorBox;
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { errorBoxVariants } from '../config/varitans';

const ErrorBox = ({ errorMessage }) => {
    return (
        <>
            <ErrorBoxContainer initial='hidden' animate='visible' exit='exit' variants={errorBoxVariants}>
                <h2>Looks like there's a problem</h2>
                <p>{errorMessage}</p>
                <button onClick={() => window.location.reload(false)}>Refresh</button>
            </ErrorBoxContainer>
        </>
    );
};

const ErrorBoxContainer = styled(motion.div)`
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h2 {
        margin: 1rem;
        color: var(--red-color);
        letter-spacing: -1px;
        white-space: nowrap;
    }

    p {
        max-width: 30rem;
        font-size: .8rem;
        font-weight: 400;
    }

    button {
        all: unset;
        display: flex;
        justify-content: center;
        width: 50%;
        height: 2.3rem;
        align-items: center;
        background-color: #ffffff08;
        box-shadow: var(--normal-shadow);
        color: var(--normal-color);
        border: solid 1px #ffffff14;
        border-radius: 50px;
        font-size: 1rem;
        font-weight: 600;
        word-spacing: 3px;
        letter-spacing: -1px;
        margin: 1rem;
        cursor: pointer;
        transition: background 0.2s;

        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                background-color: #ffffff10;
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
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
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;

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
        display: flex;
        justify-content: center;
        align-items: center;
        width: 25%;
        height: 2.3rem;
        background-color: var(--normal-bg);
        box-shadow: var(--normal-shadow);
        color: var(--normal-color);
        border-radius: 50px;
        font-size: 1rem;
        font-weight: 600;
        word-spacing: 3px;
        letter-spacing: -1px;
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

export default ErrorBox;
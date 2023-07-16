import React from 'react';
import { useGetMessages } from "../hooks/useGetMessages";
import styled from 'styled-components';
import { motion } from 'framer-motion';

const errorBoxVariants = {
    hidden: { opacity: 0, y: 50, scaleY: 0.8 },
    visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.8, ease: [0.53,0,0,0.98], time: [0.53,0,0,0.98] } },
    exit: { opacity: 0, y: 30, transition: { duration: 0.3 } }
};

const ErrorBox = ({ errorMessage }) => {

    const { getMessages } = useGetMessages();

    return (
        <>
            <ErrorBoxContainer initial='hidden' animate='visible' exit='exit' variants={errorBoxVariants}>
                <h1>Looks like there's a problem</h1>
                <p>{errorMessage}</p>
                <button onClick={() => getMessages("try_again")}>Try Again</button>
            </ErrorBoxContainer>
        </>
    );
};

const ErrorBoxContainer = styled(motion.div)`
    backdrop-filter: blur(20px) saturate(100%);
    -webkit-backdrop-filter: blur(20px) saturate(100%);
    padding: 2rem;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #ffffff0a;
    border-radius: 25px;

    h1 {
        margin: 1rem;
        color: #ff0000;
        letter-spacing: -1px;
    }

    p {
        max-width: 30rem;
    }

    button {
        border: none;
        border-radius: 10px;
        background-color: #ffffff11;
        margin: 1rem;
        padding: .5rem 1rem;
        font-size: 1rem;
        font-weight: 700;
        font-family: "Outfit", sans-serif;
        cursor: pointer;
        user-select: none;
        transition: background-color .2s;
        color: #fff;

        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                background-color: #ffffff33;
            }
        }
    }
`;

export default ErrorBox;
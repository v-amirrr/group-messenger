import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const errorBoxVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, type: 'tween' } },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.4, type: 'tween' } }
};

const ErrorBox = ({ errorMessage }) => {
    return (
        <>
            <ErrorBoxContainer initial='hidden' animate='visible' exit='exit' variants={errorBoxVariants}>
                <h1>Looks like there's a problem</h1>
                <p>{errorMessage}</p>
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
`;

export default ErrorBox;
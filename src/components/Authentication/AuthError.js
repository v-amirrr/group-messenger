import React from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { IoClose } from 'react-icons/io5';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

const errorVariants = {
    hidden: { opacity: 0, y: 50, scaleY: 0.8 },
    visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.8, ease: [0.53,0,0,0.98], time: [0.53,0,0,0.98] } },
    exit: { opacity: 0, y: 30, transition: { duration: 0.3 } }
};

const AuthError = () => {

    const { login, signup } = useSelector(store => store.userStore);
    const { clearAuthErrors } = useAuth();

    return (
        <>
            <AnimatePresence>
                {login.error || signup.error ?
                <ErrorContainer initial='hidden' animate='visible' exit='exit' variants={errorVariants}>
                    <p>{login.error}</p>
                    <p>{signup.error}</p>
                    <button className='close-button' onClick={clearAuthErrors}><IoClose /></button>
                </ErrorContainer>
                : ""}
            </AnimatePresence>
        </>
    );
};

const ErrorContainer = styled(motion.div)`
    position: absolute;
    top: 2rem;
    min-width: 10rem;
    max-width: 20rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: var(--auth-error);
    border-radius: 15px;
    padding: .5rem 2rem .5rem .5rem;
    margin: 1rem;

    p {
        font-size: .8rem;
        font-weight: 200;
        line-height: 1.5;
    }

    .close-button {
        position: absolute;
        right: .2rem;
        background-color: var(--auth-error);
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        border-radius: 50%;
        padding: .2rem;
        font-size: 1.2rem;
        cursor: pointer;
    }

    @media (max-width: 768px) {
        max-width: 90%;
    }
`;

export default AuthError;
import React from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { IoClose } from 'react-icons/io5';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { errorVariants } from '../../config/varitans';

const AuthError = () => {

    const { login, signup } = useSelector(store => store.userStore);
    const { clearAuthErrors } = useAuth();

    return (
        <>
            <AnimatePresence>
                {login.error || signup.error ?
                <ErrorContainer initial='hidden' animate='visible' exit='exit' variants={errorVariants}>
                    <button className='close-button' onClick={clearAuthErrors}><IoClose /></button>
                    <p>{login.error}</p>
                    <p>{signup.error}</p>
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
    flex-direction: column;
    text-align: center;
    background-color: var(--auth-error);
    border-radius: 15px;
    padding: .6rem 2.5rem .6rem .6rem;
    margin: 1rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    color: #ffffff88;

    p {
        font-size: .8rem;
        font-weight: 200;
        line-height: 1.5;
    }


    .close-button {
        position: absolute;
        right: .2rem;
        /* background-color: var(--auth-error); */
        background-color: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        border-radius: 50%;
        padding: .2rem;
        font-size: 1.4rem;
        color: #ffffff88;
        cursor: pointer;
        transition: color .2s;

        &:hover {
            color: #fff;
        }
    }


    @media (max-width: 768px) {
        max-width: 90%;
    }
`;

export default AuthError;
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const enterPageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, staggerChildren: 0.05, when: "beforeChildren" } },
    exit: { opacity: 0, transition: { duration: 0.4, staggerChildren: 0.05, when: "afterChildren" } }
};

const boxesVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: [0, 1.1, 1], transition: { duration: 1.5, ease: [0.53,0,0,0.98], time: [0.53,0,0,0.98] } },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 1, ease: [0.53,0,0,0.98], time: [0.53,0,0,0.98] } }
};

const EnterModes = () => {

    const { enterAsAGuest } = useAuth();

    return (
        <>
            <Container initial='hidden' animate='visible' exit='exit' variants={enterPageVariants}>
                <Link to="/signup">
                    <motion.a className='box' initial='hidden' animate='visible' exit='exit' variants={boxesVariants}>
                        <h3>Create an Account</h3>
                        <div className='list'>
                            <span>Login, logout in other devices.</span>
                            <span>Send, delete, edit, reply.</span>
                            <span>Delete your account for good.</span>
                        </div>
                    </motion.a>
                </Link>

                <Link to="/login">
                    <motion.a className='box' initial='hidden' animate='visible' exit='exit' variants={boxesVariants}>
                        <h3>Login with your Account</h3>
                        <div className='list'>
                            <span>Send message.</span>
                            <span>Delete your messages.</span>
                            <span>Edit your messages.</span>
                        </div>
                    </motion.a>
                </Link>

                <motion.a className='box' initial='hidden' animate='visible' exit='exit' variants={boxesVariants} onClick={enterAsAGuest}>
                    <h3>Enter as a Guest</h3>
                    <div className='list'>
                        <span>You can't send any message.</span>
                        <span>You can't reply to any message.</span>
                        <span>You can logout and create an account later.</span>
                    </div>
                </motion.a>
            </Container>
        </>
    );
};

const Container = styled(motion.section)`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--login);
    position: absolute;
    z-index: 2;
    user-select: none;

    .box {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-color: #ffffff02;
        border: solid 1px #ffffff08;
        width: 15rem;
        height: 14rem;
        border-radius: 25px;
        cursor: pointer;
        margin: 1rem;
        transition: background .3s, border .3s;

        h3 {
            margin-bottom: 1rem;
            white-space: nowrap;
        }

        .list {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: 100%;

            span {
                width: 70%;
                text-align: center;
                font-size: .5rem;
                margin: .2rem;
                background-color: var(--login-mode-features);
                padding: .4rem .3rem;
                border-radius: 10px;
            }
        }

        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                background-color: #ffffff08;
                border: solid 1px #ffffff00;
            }
        }
    }

    @media (max-width: 1100px) {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .box {
            width: 14rem;
            height: 12rem;
            margin: .2rem;

        h3 {
            font-size: 1rem;
        }

        .list {
            span {
                font-size: .5rem;
                margin: .2rem;
                padding: .4rem .3rem;
            }
        }

        &:hover {
        }
    }
    }
`;

export default EnterModes;
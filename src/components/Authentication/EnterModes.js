import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useRedirection } from '../../hooks/useRedirection';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { enterPageVariants, boxVariants } from '../../config/varitans';

const EnterModes = () => {

    const { enterAsAGuest } = useAuth();
    const { authRedirection } = useRedirection();

    useEffect(() => {
        authRedirection();
    }, []);

    return (
        <>
            <Container initial='hidden' animate='visible' exit='exit' variants={enterPageVariants}>
                <Link to="/signup">
                    <motion.a className='box' initial='hidden' animate='visible' exit='exit' variants={boxVariants}>
                        <h2>Sign Up</h2>
                        <div className='list'>
                            <span>Login, logout in other devices.</span>
                            <span>Send, delete, edit, reply.</span>
                            <span>Delete your account for good.</span>
                        </div>
                    </motion.a>
                </Link>

                <Link to="/login">
                    <motion.a className='box' initial='hidden' animate='visible' exit='exit' variants={boxVariants}>
                        <h2>Login</h2>
                        <div className='list'>
                            <span>Send message.</span>
                            <span>Delete your messages.</span>
                            <span>Edit your messages.</span>
                        </div>
                    </motion.a>
                </Link>

                <motion.a className='box' initial='hidden' animate='visible' exit='exit' variants={boxVariants} onClick={enterAsAGuest}>
                    <h2>Guest Mode</h2>
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
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--page-second);
    position: absolute;
    z-index: 2;
    user-select: none;

    .box {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-color: var(--enter-box);
        border: var(--border-first);
        box-shadow: 25px;
        width: 15rem;
        height: 14rem;
        border-radius: 25px;
        cursor: pointer;
        margin: 1rem;
        transition: background .2s;

        h2 {
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
                background-color: var(--enter-box-item);
                padding: .4rem .3rem;
                border-radius: 10px;
            }
        }

        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                background-color: var(--enter-box-hover);
            }
        }
    }

    @media (max-width: 500px) {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .box {
            width: 16rem;
            height: 13rem;
            margin: .5rem;

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
        }
    }
`;

export default EnterModes;
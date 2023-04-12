import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { useRedirection } from '../../hooks/useRedirection';
import AuthError from './AuthError';
import MessageLoader from '../message/MessageLoader';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const loginVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2, when: "beforeChildren", staggerChildren: 0.05 } },
    exit: { opacity: 0, transition: { duration: 0.2, when: "afterChildren", staggerChildren: 0.05 } }
};

const loginItemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: [50, -20, 0], scaleX: 1, transition: { duration: 0.6 } },
    exit: { opacity: 0, scaleX: [1, 1.2, 0.8], transition: { duration: 0.6 } }
};

const Login = () => {

    const navigate = useNavigate();
    const { login, clearAuthErrors } = useAuth();
    const { authRedirection } = useRedirection();
    const { login: loginDataFromUserStore } = useSelector(store => store.userStore);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const backHandler = () => {
        clearAuthErrors();
        navigate("/enter");
    };

    const submitHandler = () => {
        login(email, password);
    };

    useEffect(() => {
        clearAuthErrors();
        authRedirection();
    }, []);

    return (
        <>
            <LoginPage loginloading={loginDataFromUserStore.loading ? 1 : 0}>
                <AuthError />

                <div className='login-container' initial='hidden' animate='visible' exit='exit' variants={loginVariants}>
                    <motion.h2 initial='hidden' animate='visible' exit='exit' variants={loginItemVariants}>Login with your account</motion.h2>
                    <ul className='login-fields'>
                        <motion.div className='login-field' initial='hidden' animate='visible' exit='exit' variants={loginItemVariants}>
                            <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
                        </motion.div>
                        <motion.div className='login-field' initial='hidden' animate='visible' exit='exit' variants={loginItemVariants}>
                            <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </motion.div>
                    </ul>
                    <div className='login-buttons'>
                        <motion.button className='back-button' onClick={backHandler} initial='hidden' animate='visible' exit='exit' variants={loginItemVariants}>
                            <p>Back</p>
                        </motion.button>
                        <motion.button className='submit-button' onClick={submitHandler} initial='hidden' animate='visible' exit='exit' variants={loginItemVariants}>
                            <p>OK</p>
                        </motion.button>
                        <div className='login-loader'><MessageLoader size={"1.5rem"} /></div>
                    </div>
                </div>
            </LoginPage>
        </>
    );
};

const LoginPage = styled(motion.div)`
    width: 100%;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;

    .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .login-fields {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            margin: 1rem;

            .login-field {
                background-color: #ffffff08;
                border-radius: 15px;
                padding: .5rem .8rem;
                width: 12rem;
                margin: .2rem;
                font-size: 1rem;
                overflow: hidden;
                
                input {
                    all: unset;
                    width: 100%;
                    height: 100%;

                    ::placeholder {
                        color: #ffffff55;
                    }
                }
            }
        }

        .login-buttons {
            display: flex;
            justify-content: center;
            align-items: center;
            
            .login-loader {
                position: absolute;
                transform: ${props => props.loginloading ? "scale(1)" : "scale(0)"};
                transition: transform 1s cubic-bezier(.53,0,0,.98);
            }
            
            .back-button, .submit-button {
                overflow: hidden;
                border: none;
                margin: ${props => props.loginloading ? "0 0" : "0 .5rem"};
                width: ${props => props.loginloading ? "5.8rem" : "4.5rem"};
                height: 2.2rem;
                cursor: ${props => props.loginloading ? "" : "pointer"};
                background-color: #ffffff08;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1rem;
                font-weight: 700;
                letter-spacing: -1px;
                word-spacing: 5px;
                white-space: nowrap;
                transition: background .2s, margin .5s cubic-bezier(.53,0,0,.98), border-radius .5s, width .8s cubic-bezier(.53,0,0,.98);

                p {
                    position: relative;
                    opacity: ${props => props.loginloading ? "0" : "1"};
                    transform: ${props => props.loginloading ? "scale(0)" : "scale(1)"};
                    transition: left .5s, right .5s, transform 1s, opacity .5s;
                }

                @media (hover: hover) and (pointer: fine) and (min-width: 745px) { 
                    &:hover {
                        background-color: ${props => props.loginloading ? "" : "#ffffff11 ت"};
                    }
                }
            }

            .back-button {
                border-radius: ${props => props.loginloading ? "15px 0 0 15px" : "15px"};

                p {
                    right: ${props => props.loginloading ? "3rem" : "0"};
                }
            }

            .submit-button {
                border-radius: ${props => props.loginloading ? "0 15px 15px 0" : "15px"};

                p {
                    left: ${props => props.loginloading ? "3rem" : "0"};
                }
            }
        }
    }
`;

export default Login;
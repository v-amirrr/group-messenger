import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { useRedirection } from '../../hooks/useRedirection';
import AuthError from './AuthError';
import MessageLoader from '../message/MessageLoader';
import { FaRegEye } from 'react-icons/fa';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { loginVariants, loginItemVariants } from '../../config/varitans';

const Login = () => {

    const navigate = useNavigate();
    const { login, clearAuthErrors, googleLogin } = useAuth();
    const { authRedirection } = useRedirection();
    const { login: loginDataFromUserStore, googleLogin: googleLoginDataFromUserStore } = useSelector(store => store.userStore);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const backHandler = () => {
        clearAuthErrors();
        navigate("/enter");
    };

    const submitHandler = () => {
        if (!googleLoginDataFromUserStore.loading) {
            login(email, password);
        }
    };

    const googleLoginHandler = () => {
        if (!loginDataFromUserStore.loading) {
            googleLogin();
        }
    };

    useEffect(() => {
        clearAuthErrors();
        authRedirection();
    }, []);

    return (
        <>
            <LoginPage initial='hidden' animate='visible' exit='exit' variants={loginVariants} loginloading={loginDataFromUserStore.loading ? 1 : 0} googleloading={googleLoginDataFromUserStore.loading ? 1 : 0} showpassword={showPassword ? 1 : 0}>
                <AuthError />

                <div className='login-container' initial='hidden' animate='visible' exit='exit' variants={loginVariants}>
                    <motion.h2 initial='hidden' animate='visible' exit='exit' variants={loginItemVariants}>Login with your account</motion.h2>
                    <ul className='login-fields'>
                        <motion.div className='login-field' initial='hidden' animate='visible' exit='exit' variants={loginItemVariants}>
                            <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
                        </motion.div>
                        <motion.div className='login-field' initial='hidden' animate='visible' exit='exit' variants={loginItemVariants}>
                            <input type={showPassword ? 'text' : 'password'} placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} onPaste={(e) => e.preventDefault()} />
                            <button className='login-password-button' onClick={() => setShowPassword(!showPassword)}>
                                <i><FaRegEye /></i>
                                <hr />
                            </button>
                        </motion.div>
                    </ul>
                    <div className='login-buttons'>
                        <motion.button className='back-button' onClick={backHandler} initial='hidden' animate='visible' exit='exit' variants={loginItemVariants}>
                            <p>Back</p>
                        </motion.button>
                        <motion.button className='submit-button' onClick={submitHandler} initial='hidden' animate='visible' exit='exit' variants={loginItemVariants}>
                            <p>OK</p>
                        </motion.button>
                        <div className='login-loader'>
                            <MessageLoader size={"1.5rem"} />
                        </div>
                    </div>
                    <motion.div className='login-google' initial='hidden' animate='visible' exit='exit' variants={loginItemVariants}>
                        <button className='google-submit' onClick={googleLoginHandler}>
                            <p><svg className='google-logo' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 272 92" width="272" height="92"><path fill="#EA4335" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/><path fill="#FBBC05" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/><path fill="#4285F4" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"/><path fill="#34A853" d="M225 3v65h-9.5V3h9.5z"/><path fill="#EA4335" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"/><path fill="#4285F4" d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z"/></svg></p>
                        </button>
                        <div className='google-loader'><MessageLoader size={"1.5rem"} /></div>
                    </motion.div>
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
    background-color: var(--auth-background);
    user-select: none;

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
                background-color: var(--auth-feild);
                border-radius: 15px;
                padding: .5rem .8rem;
                width: 12rem;
                margin: .2rem;
                font-size: 1rem;
                overflow: hidden;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;

                input {
                    all: unset;
                    width: 100%;
                    height: 100%;

                    ::placeholder {
                        color: var(--auth-feild-placeholder);
                    }
                }

                .login-password-button {
                    all: unset;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: absolute;
                    right: .2rem;
                    padding: .4rem;
                    border-radius: 50%;
                    cursor: pointer;
                    transition: background .3s;

                    i {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    hr {
                        width: ${props => props.showpassword ? "0" : "1rem"};
                        height: .1rem;
                        border: none;
                        border-radius: 50px;
                        background-color: #fff;
                        position: absolute;
                        transform: rotate(45deg);
                        transition: width .3s;
                    }

                    @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
                        &:hover {
                            background-color: var(--auth-button-hover);
                        }
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
                width: ${props => props.loginloading ? "5rem" : "4.5rem"};
                height: 2.2rem;
                cursor: ${props => props.loginloading ? "" : "pointer"};
                background-color: var(--auth-button);
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
                        background-color: ${props => props.loginloading ? "" : "var(--auth-button-hover)"};
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

        .login-google {
            margin: .5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;

            .google-submit {
                border-radius: 15px;
                border: none;
                background-color: var(--auth-button);
                width: 10rem;
                height: 2.2rem;
                cursor: ${props => props.googleloading ? "" : "pointer"};
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: .9rem;
                font-weight: 100;
                white-space: nowrap;
                transition: background .2s, margin .5s cubic-bezier(.53,0,0,.98), border-radius .5s, width .8s cubic-bezier(.53,0,0,.98);

                p {
                    position: relative;
                    right: ${props => props.googleloading ? "3rem" : "0"};
                    opacity: ${props => props.googleloading ? "0" : "1"};
                    transform: ${props => props.googleloading ? "scale(0)" : "scale(1)"};
                    transition: right .5s, transform 1s, opacity .5s;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .google-logo {
                        width: 3.5rem;
                        margin-left: .2rem;
                    }
                }

                @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
                    &:hover {
                        background-color: ${props => props.googleloading ? "" : "var(--auth-button-hover)"};
                    }
                }
            }

            .google-loader {
                position: absolute;
                margin-left: ${props => props.googleloading ? "0" : "20rem"};
                opacity: ${props => props.googleloading ? "0" : "1"};
                transform: ${props => props.googleloading ? "scale(1)" : "scale(0)"};
                transition: margin-left .5s, transform 1s, opacity .5s;
            }
        }
    }
`;

export default Login;
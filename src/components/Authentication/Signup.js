import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { useRedirection } from '../../hooks/useRedirection';
import MessageLoader from '../message/MessageLoader';
import Notification from '../Notification';
import { FaRegEye } from 'react-icons/fa';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { signupVariants, signupItemVariants } from '../../config/varitans';

const Signup = () => {

    const navigate = useNavigate();
    const { signup } = useAuth();
    const { authRedirection } = useRedirection();
    const { signup: signupDataFromUserStore } = useSelector(store => store.userStore);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const backHandler = () => {
        navigate("/enter");
    };

    const submitHandler = () => {
        signup(username, email, password);
    };

    useEffect(() => {
        authRedirection();
    }, []);

    return (
        <>
            <SignupPage initial='hidden' animate='visible' exit='exit' variants={signupVariants} signuploading={signupDataFromUserStore.loading ? 1 : 0} showpassword={showPassword ? 1 : 0}>
                <Notification />
                <div className='signup-container'>
                    <motion.h2 initial='hidden' animate='visible' exit='exit' variants={signupItemVariants}>Create an account</motion.h2>
                    <ul className='signup-fields'>
                        <motion.div className='signup-field' initial='hidden' animate='visible' exit='exit' variants={signupItemVariants}>
                            <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} autoFocus />
                        </motion.div>
                        <motion.div className='signup-field' initial='hidden' animate='visible' exit='exit' variants={signupItemVariants}>
                            <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </motion.div>
                        <motion.div className='signup-field' initial='hidden' animate='visible' exit='exit' variants={signupItemVariants}>
                            <input type={showPassword ? 'text' : 'password'} placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} onPaste={(e) => e.preventDefault()} />
                            <button className='signup-password-button' onClick={() => setShowPassword(!showPassword)}>
                                <i><FaRegEye /></i>
                                <hr />
                            </button>
                        </motion.div>
                    </ul>
                    <div className='signup-buttons'>
                        <motion.button className='back-button' onClick={backHandler} initial='hidden' animate='visible' exit='exit' variants={signupItemVariants}>
                            <p>Back</p>
                        </motion.button>
                        <motion.button className='submit-button' onClick={submitHandler} initial='hidden' animate='visible' exit='exit' variants={signupItemVariants}>
                            <p>OK</p>
                        </motion.button>
                        <div className='signup-loader'><MessageLoader size={"1.5rem"}/></div>
                    </div>
                </div>
            </SignupPage>
        </>
    );
};

const SignupPage = styled(motion.div)`
    width: 100%;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--page-first);
    user-select: none;

    .signup-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .signup-fields {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            margin: 1rem;

            .signup-field {
                background-color: var(--button);
                border-radius: 15px;
                padding: .6rem .8rem;
                width: 12rem;
                margin: .2rem;
                font-size: .8rem;
                font-weight: 200;
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
                        font-weight: var(--text-boldness-second);
                        color: var(--text-color-first);
                    }
                }

                .signup-password-button {
                    all: unset;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: absolute;
                    right: .2rem;
                    padding: .4rem;
                    border-radius: 50%;
                    cursor: pointer;

                    i {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 1rem;
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
                }
            }
        }

        .signup-buttons {
            display: flex;
            justify-content: center;
            align-items: center;

            .signup-loader {
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
                background-color: var(--button);
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1rem;
                font-weight: 500;
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
                        background-color: ${props => props.loginloading ? "#ffffff00" : "var(--button-hover)"};
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

export default Signup;
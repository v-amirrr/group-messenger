import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { useRedirection } from '../../hooks/useRedirection';
import { FaRegEye, FaUserLock } from 'react-icons/fa';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { loginVariants, loginItemVariants } from '../../config/varitans';

const LoginPage = () => {
    const { signup: signupData, login: loginData, googleLogin: googleData } = useSelector(store => store.userStore);
    const { signup, login, enterAsAGuest, googleLogin, cancelAuth } = useAuth();
    const { authRedirection } = useRedirection();
    const [toggle, setToggle] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const submit = () => {
        if (signupData.loading || loginData.loading) {
            cancelAuth();
        } else {
            if (toggle) {
                login(email, password);
            } else {
                signup(username, email, password);
            }
        }
    };

    const clear = () => {
        if (signupData.loading || loginData.loading) {
            cancelAuth();
        } else {
            setUsername("");
            setEmail("");
            setPassword("");
        }
    };

    const googleHandler = () => {
        if (googleData.loading) {
            cancelAuth();
        } else {
            googleLogin();
        }
    };

    useEffect(() => {
        authRedirection();
    }, []);

    return (
        <>
            <Login
                toggle={toggle ? 1 : 0}
                showpassword={showPassword ? 1 : 0}
                loading={signupData.loading || loginData.loading ? 1 : 0}
                googleloading={googleData.loading ? 1 : 0}
                initial='hidden'
                animate='visible'
                exit='exit'
                variants={loginVariants}
            >
                <header>
                    <button className='login' onClick={() => setToggle(true)} disabled={loginData.loading || signupData.loading || googleData.loading}>LOGIN</button>
                    <button className='signup' onClick={() => setToggle(false)} disabled={loginData.loading || signupData.loading || googleData.loading}>SIGN UP</button>
                    <span></span>
                </header>
                <AnimatePresence>
                    {
                        !toggle ?
                        <motion.div key="username" initial='hidden' animate='visible' exit='exit' variants={loginItemVariants} className='username'>
                            <input type='text' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} disabled={loginData.loading || signupData.loading || googleData.loading} />
                        </motion.div>
                        : ''
                    }
                </AnimatePresence>
                <div className='email'>
                    <input type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} disabled={loginData.loading || signupData.loading || googleData.loading} />
                </div>
                <div className='password'>
                    <input type={showPassword ? 'text' : 'password'} placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} disabled={loginData.loading || signupData.loading || googleData.loading} />
                    <button onClick={() => setShowPassword(!showPassword)} disabled={loginData.loading || signupData.loading || googleData.loading}>
                        <i><FaRegEye /></i>
                        <hr />
                    </button>
                </div>
                <div className='buttons'>
                    <button className='clear' onClick={clear} disabled={googleData.loading}>
                        <p>Clear</p>
                    </button>
                    <button className='submit' onClick={submit} disabled={googleData.loading}>
                        <p>OK</p>
                    </button>
                    <div className='loader'>
                        <span className='dot'></span>
                        <span className='dot'></span>
                        <span className='dot'></span>
                    </div>
                </div>
                <button className='google' onClick={googleHandler} disabled={loginData.loading || signupData.loading}>
                    <p className='google-logo'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 272 92" width="272" height="92"><path fill="#EA4335" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/><path fill="#FBBC05" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/><path fill="#4285F4" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"/><path fill="#34A853" d="M225 3v65h-9.5V3h9.5z"/><path fill="#EA4335" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"/><path fill="#4285F4" d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z"/></svg></p>
                    <div className='google-loader'>
                        <div class='loader'>
                            <span className='dot'></span>
                            <span className='dot'></span>
                            <span className='dot'></span>
                        </div>
                    </div>
                </button>
                <button className='guest' onClick={enterAsAGuest} disabled={loginData.loading || signupData.loading || googleData.loading}>
                    <i><FaUserLock /></i>
                    Guest Mode
                </button>
            </Login>
        </>
    );
};

const Login = styled(motion.section)`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    inset: 0 0 0 0;
    color: var(--normal-color);

    header {
        border-radius: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 2rem;
        margin: ${props => props.toggle ? "1.5rem" : "4rem"};
        padding: .1rem;
        position: relative;
        border: solid 2.5px #ffffff20;
        box-shadow: var(--normal-shadow);
        backdrop-filter: var(--bold-glass);
        -webkit-backdrop-filter: var(--bold-glass);
        transition: margin .4s;

        button {
            font-size: .6rem;
            font-weight: 600;
            width: 3.4rem;
            height: 1.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            color: var(--pale-color);
            z-index: 2;
            transition: color .4s .1s;

            :disabled {
                cursor: not-allowed;
            }
        }

        .login {
            color: ${props => props.toggle ? "var(--normal-color)" : "var(--pale-color)"};
        }

        .signup {
            color: ${props => !props.toggle ? "var(--normal-color)" : "var(--pale-color)"};
        }

        span {
            position: absolute;
            left: ${props => props.toggle ? ".3rem" : "96.5%"};
            transform: ${props => props.toggle ? "translateX(0%)" : "translateX(-100%)"};
            width: 3.1rem;
            height: 1.2rem;
            border-radius: 50px;
            background-color: #ffffff20;
            transition: left .4s cubic-bezier(0.53, 0, 0, 0.98), transform .4s cubic-bezier(0.53, 0, 0, 0.98);
            box-shadow: var(--normal-shadow);
        }
    }

    .username, .email, .password {
        background-color: var(--normal-bg);
        border-radius: 50px;
        padding: .6rem .8rem;
        width: 12rem;
        margin: .15rem;
        font-size: .8rem;
        font-weight: 200;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: var(--normal-shadow);
        backdrop-filter: var(--bold-glass);
        -webkit-backdrop-filter: var(--bold-glass);

        input {
            all: unset;

            &::placeholder {
                font-weight: 400;
            }

            &:-webkit-autofill{
                background-color: var(--normal-bg);
                transition: background-color 1s ease-in 2000s;
            }

            :disabled {
                cursor: not-allowed;
            }
        }

        button {
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

            :disabled {
                cursor: not-allowed;
            }
        }
    }

    .username {
        position: absolute;
        margin-bottom: 5.7rem;
    }

    .buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 10rem;
        margin-top: .5rem;

        .submit, .clear {
            overflow: hidden;
            margin: ${props => props.loading ? ".15rem 0" : ".15rem .2rem"};
            width: 50%;
            height: 2.2rem;
            border-radius: 50px;
            font-size: .8rem;
            font-weight: 400;
            cursor: pointer;
            background-color: var(--normal-bg);
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1rem;
            font-weight: 400;
            letter-spacing: -1px;
            box-shadow: var(--normal-shadow);
            backdrop-filter: var(--bold-glass);
            -webkit-backdrop-filter: var(--bold-glass);
            white-space: nowrap;
            transition: background .2s, ${props => props.loading ? "margin .4s, border-radius .4s" : "margin .6s, border-radius .4s"};

            @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
                &:hover {
                    background-color: ${props => props.loading ? "" : "var(--normal-bg-hover)"};
                }
            }

            p {
                position: relative;
                opacity: ${props => props.loading ? "0" : "1"};
                transition: left .5s, right .5s, opacity .2s;
            }

            :disabled {
                cursor: not-allowed;
            }
        }

        .loader {
            position: absolute;
            transform: ${props => props.loading ? "scale(1)" : "scale(0)"};
            transition: transform .4s;
        }

        .clear {
            border-radius: ${props => props.loading ? "50px 0 0 50px" : "50px"};

            p {
                right: ${props => props.loading ? "3rem" : "0"};
            }
        }

        .submit {
            border-radius: ${props => props.loading ? "0 50px 50px 0" : "50px"};

            p {
                left: ${props => props.loading ? "3rem" : "0"};
            }
        }
    }

    .guest, .google {
        overflow: hidden;
        width: 10rem;
        height: 2.2rem;
        border-radius: 50px;
        margin: .15rem;
        font-size: .9rem;
        font-weight: 400;
        cursor: pointer;
        background-color: var(--normal-bg);
        display: flex;
        justify-content: center;
        align-items: center;
        white-space: nowrap;
        transition: background .2s;
        box-shadow: var(--normal-shadow);
        backdrop-filter: var(--bold-glass);
        -webkit-backdrop-filter: var(--bold-glass);

        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                background-color: ${props => props.loading ? "" : "var(--normal-bg-hover)"};
            }
        }

        :disabled {
            cursor: not-allowed;
        }

        .google-logo {
            position: relative;
            transform: ${props => props.googleloading ? "scale(0)" : "scale(1)"};
            filter: ${props => props.loading ? "grayscale(100%)" : "grayscale(0%)"};
            -webkit-filter: ${props => props.loading ? "grayscale(100%)" : "grayscale(0%)"};
            display: flex;
            justify-content: center;
            align-items: center;
            width: 3.5rem;
            height: 100%;
            margin-left: .2rem;
            transition: transform .4s, filter .4s;

            svg {
                margin-top: .1rem;
            }
        }

        .google-loader {
            position: absolute;
            transform: ${props => props.googleloading ? "scale(1)" : "scale(0)"};
            transition: transform .4s;
        }

        i {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1rem;
            margin: 0 .2rem;
        }
    }

    .loader {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        .dot {
            width: .5rem;
            height: .5rem;
            border-radius: 50%;
            background-color: var(--normal-color);

            &:nth-child(1) {
                animation: loader .6s infinite alternate;
                animation-delay: 0s;
            }

            &:nth-child(2) {
                animation: loader .6s infinite alternate;
                animation-delay: .25s;
            }

            &:nth-child(3) {
                animation: loader .6s infinite alternate;
                animation-delay: .5s;
            }
        }
    }

    @keyframes loader {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(0.6);
        }
    }
`;

export default LoginPage;
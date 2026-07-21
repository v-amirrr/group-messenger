import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaRegEye, FaUserLock, FaEyeSlash } from 'react-icons/fa';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { loginVariants, loginItemVariants, loginPasswordIconVariants, loginPasswordInputVariants } from '../../config/varitans';
const framerMotionAttributes = variants => ({ initial: 'hidden', animate: 'visible', exit: 'exit', variants });

const signupSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(8)
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});

const AuthPage = () => {
    const { signup, login, enterAsAGuest, googleLogin } = useAuth();
    const { openToast } = useToast();

    // mode 1 sign up, mode 2 login
    const [authMode, setAuthMode] = useState(1);
    const [showPassword, setShowPassword] = useState(false);

    // react hook from
    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({
        resolver: zodResolver(authMode === 1 ? signupSchema : loginSchema),
    });

    const submitHandler = ({ username, email, password }) => {
        if (authMode === 1) {
            signup(username, email, password);
        } else {
            login(email, password);
        }
    };

    const clearHandler = () => {
        reset();
    };

    useEffect(() => {
        const hasErrors = Object.keys(errors).length > 0;
        const errorMessage = errors?.username?.message || errors?.email?.message || errors?.password?.message;

        hasErrors && openToast(errorMessage, 'ERROR');
    }, [errors]);

    return (
        <Auth {...framerMotionAttributes(loginVariants)} onSubmit={handleSubmit(submitHandler)} authMode={authMode}>
            <AnimatePresence>
                <motion.header {...framerMotionAttributes(loginItemVariants)} layout key='header'>
                    <button type='button' className='signup' onClick={() => setAuthMode(1)}>SIGN UP</button>
                    <button type='button' className='login' onClick={() => setAuthMode(2)}>LOGIN</button>
                </motion.header>
                {
                    authMode === 1 && 
                    <motion.input 
                        {...framerMotionAttributes(loginItemVariants)} 
                        {...register("username")}
                        layout
                        type='text' 
                        placeholder='Username' 
                        className='username'
                        key='username'
                    />
                }
                <motion.input 
                    {...framerMotionAttributes(loginItemVariants)} 
                    {...register("email")}
                    layout
                    type='email' 
                    placeholder='Email' 
                    className='email'
                    key='email'
                />
                <motion.div layout key='password-container' className='password-container' key='password-container' {...framerMotionAttributes(loginItemVariants)}>
                    <input 
                        {...register("password")}
                        className='password' 
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Password' 
                        {...framerMotionAttributes(loginPasswordInputVariants)} 
                    />
                    <button type='button' className='showPassword' onClick={() => setShowPassword(prev => !prev)}>
                        <AnimatePresence exitBeforeEnter>
                            {
                                showPassword ?
                                <motion.i key='show' {...framerMotionAttributes(loginPasswordIconVariants)}><FaEyeSlash /></motion.i> :
                                <motion.i key='hide' {...framerMotionAttributes(loginPasswordIconVariants)}><FaRegEye /></motion.i>
                            }
                        </AnimatePresence>
                    </button>
                </motion.div>
                <motion.div layout key='clear-submit-container' className='clear-submit-container' {...framerMotionAttributes(loginItemVariants)}>
                    <button type='button' className='clear-button' onClick={clearHandler}>Clear</button>
                    <button type='submit' className='submit-button'>Submit</button>
                </motion.div>
                <motion.button layout type='button' key='google-button' className='google-button' onClick={googleLogin} {...framerMotionAttributes(loginItemVariants)}>
                    <p className='google-logo'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 272 92" width="272" height="92"><path fill="#EA4335" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/><path fill="#FBBC05" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/><path fill="#4285F4" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"/><path fill="#34A853" d="M225 3v65h-9.5V3h9.5z"/><path fill="#EA4335" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"/><path fill="#4285F4" d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z"/></svg></p>
                </motion.button>
                <motion.button layout type='button' key='guest-button' className='guest-button' onClick={enterAsAGuest} {...framerMotionAttributes(loginItemVariants)}>
                    <i><FaUserLock /></i>
                    Guest Mode
                </motion.button>
            </AnimatePresence>
        </Auth>
    );
};

const Auth = styled(motion.form)`
    position: absolute;
    inset: 0 0 0 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    header {
        position: relative;
        height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50px;
        margin: 1rem;
        padding: .1rem;
        transition: margin .4s;

        button {
            width: 3.4rem;
            height: 1.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: .7rem;
            font-weight: 600;
            cursor: pointer;
            color: var(--grey);
            z-index: 2;
            transition: color .4s, letter-spacing .4s;
        }

        .login {
            color: ${props => props.authMode === 2 ? "var(--text)" : "var(--grey)"};
        }

        .signup {
            color: ${props => props.authMode === 1 ? "var(--text)" : "var(--grey)"};
        }
    }

    .password-container {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;

        .showPassword {
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
                color: var(--grey);
            }

            :disabled {
                cursor: not-allowed;
            }
        }
    }

    .username, .email, .password {
        border: none;
        background-color: var(--bg);
        border-radius: 50px;
        padding: .6rem .8rem;
        width: 12rem;
        height: 2.2rem;
        margin: .15rem;
        font-size: .8rem;
        font-weight: 200;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: var(--shadow);
        backdrop-filter: var(--glass);

        &:-webkit-autofill {
            background-color: var(--bg);
            color: var(--text);
            transition: background-color 1s ease-in 2000s, color 1s ease-in 2000s;
        }

        input {
            all: unset;
            font-weight: 400;

            &::placeholder {
                font-weight: 400;
                color: var(--grey);
            }

            &:-webkit-autofill {
                background-color: var(--bg);
                color: var(--text);
                transition: background-color 1s ease-in 2000s, color 1s ease-in 2000s;
            }

            :disabled {
                cursor: not-allowed;
            }
        }
    }

    .clear-submit-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 10rem;
        margin-top: .5rem;

        .submit-button, .clear-button {
            overflow: hidden;
            margin: .15rem .2rem;
            width: 50%;
            height: 2.2rem;
            border-radius: 50px;
            font-size: .8rem;
            font-weight: 400;
            cursor: pointer;
            background-color: var(--bg);
            border-top: solid 0.1px #2c2c2c;
            border-bottom: solid 0.1px #2c2c2c;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1rem;
            font-weight: 400;
            letter-spacing: -1px;
            box-shadow: var(--shadow);
            backdrop-filter: var(--glass);
            white-space: nowrap;
            transition: background .2s;

            @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
                &:hover {
                    background-color: var(--bg-hover);
                }
            }

            p {
                position: relative;
            }

            :disabled {
                cursor: not-allowed;
            }
        }
    }

    .guest-button, .google-button {
        overflow: hidden;
        width: 10rem;
        height: 2.2rem;
        border-radius: 50px;
        margin: .15rem;
        font-size: .9rem;
        font-weight: 400;
        cursor: pointer;
        background-color: var(--bg);
        border-top: solid 0.1px #2c2c2c;
        border-bottom: solid 0.1px #2c2c2c;
        display: flex;
        justify-content: center;
        align-items: center;
        white-space: nowrap;
        transition: background .2s;
        box-shadow: var(--shadow);
        backdrop-filter: var(--glass);

        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                background-color: var(--bg-hover);
            }
        }

        :disabled {
            cursor: not-allowed;
        }

        .google-logo {
            position: relative;
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
`;

export default AuthPage;
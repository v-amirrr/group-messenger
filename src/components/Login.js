import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import { isRTL } from '../functions/isRlt';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const loginPageVariatns = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2, when: "beforeChildren", staggerChildren: 0.05 } },
    exit: { opacity: 0, transition: { duration: 0.2, when: "afterChildren", staggerChildren: 0.05 } }
};

const loginPageItemsVariants = {
    hidden: { opacity: 0, y: 50, scaleX: 1 },
    visible: { opacity: 1, y: [50, -20, 0], scaleX: 1, transition: { duration: 0.6 } },
    exit: { opacity: 0, scaleX: [1, 1.2, 0.8], transition: { duration: 0.6 } }
};

const loginErrorVariants = {
    hidden: { opacity: 0, scaleX: 0, y: -10 },
    visible: { opacity: 1, scaleX: 1, y: 0, transition: { duration: 0.6, type: "spring", stiffness: 100 } },
    exit: { opacity: 0, scaleX: [1, 1.2, 0.8], transition: { duration: 0.6 } }
};

const Login = () => {

    const navigate = useNavigate();

    const { loginError } = useSelector(store => store.userStore);
    const { localUsername } = useSelector(store => store.messagesStore);

    const [loginInput, setLoginInput] = useState("");

    const { login } = useLogin();

    const loginSubmitHandler = (e) => {
        e.preventDefault();
        login(loginInput);
    };

    useEffect(() => {
        if (localUsername) {
            navigate("/", { replace: true });
        }
    }, []);

    return (
        <>
            <LoginPage initial='hidden' animate='visible' exit='exit' variants={loginPageVariatns}>
                <form>
                    <motion.input type="text" className='login-input' placeholder="Enter Your Name..." dir="auto" value={loginInput} onChange={e => setLoginInput(e.target.value)} ispersian={isRTL(loginInput) ? 1 : 0} autoFocus variants={loginPageItemsVariants}/>
                    <motion.button type="submit" className='submit-button' disabled={!loginInput} onClick={(e) => loginSubmitHandler(e)} variants={loginPageItemsVariants}>OK</motion.button>
                </form>
                <AnimatePresence>
                    {loginError ?
                        <motion.div className='login-error' initial='hidden' animate='visible' exit='exit' variants={loginErrorVariants}>
                            <p>{loginError}</p>
                        </motion.div>
                    : "" }
                </AnimatePresence>
            </LoginPage>
        </>
    );
};

const LoginPage = styled(motion.section)`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000000aa;
    backdrop-filter: blur(15px) saturate(100%);
    -webkit-backdrop-filter: blur(15px) saturate(100%);
    position: absolute;
    z-index: 2;
    user-select: none;

    form {
        max-width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .login-input {
            color: #fff;
            padding: 1rem;
            border: none;
            background-color: #00000000;
            font-size: 1rem;
            text-align: center;
            font-family: ${props => props.ispersian ? "Vazirmatn" : "Outfit"}, "Vazirmatn", sans-serif;
            font-weight: 200;
        }
    
        .submit-button {
            all: unset;
            border-radius: 30px;
            background-color: #ffffff11;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1rem;
            font-weight: 700;
            letter-spacing: -1px;
            word-spacing: 5px;
            padding: .5rem 0;
            width: 50%;
            white-space: nowrap;
            color: #ffffff11;
            cursor: not-allowed;
            transition: color .2s, background .2s;

            &:not([disabled]) {
                cursor: pointer;
                color: #fff;

                &:hover {
                    background-color: #ffffff22;
                }
            }
        }
    }

    .login-error {
        max-width: 50%;
        position: absolute;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        background-color: #ffffff08;
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem;

        p {
            font-size: .8rem;
            font-weight: 200;
            line-height: 1.5;
        }
    }

    @media (max-width: 768px) {
        .login-error {
            max-width: 90%;
        }
    }
`;

export default Login;
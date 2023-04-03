import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLogin } from "../../hooks/useLogin";
import styled from 'styled-components';
import { motion } from 'framer-motion';

const loginPageVariatns = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2, when: "beforeChildren", staggerChildren: 0.05 } },
    exit: { opacity: 0, transition: { duration: 0.2, when: "afterChildren", staggerChildren: 0.05 } }
};

const loginPageItemsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.4 } }
};

const Login = () => {

    const navigate = useNavigate();

    const { loginAsGuest, clearLoginErorrs } = useLogin();

    const { localUsername } = useSelector(store => store.messagesStore);
    const { loginAsGuest: loginAsGuestUserStore } = useSelector(store => store.userStore);

    useEffect(() => {
        clearLoginErorrs();
        if (localUsername || loginAsGuestUserStore) {
            navigate("/", { replace: true });
        }
    }, [localUsername, loginAsGuestUserStore]);

    return (
        <>
            <LoginPage initial='hidden' animate='visible' exit='exit' variants={loginPageVariatns}>
                <Link to="/login/login-with-name">
                    <motion.div whileTap={{ scale: 0.8 }} className='login-mode' initial='hidden' animate='visible' exit='exit' variants={loginPageItemsVariants}>
                        <h3>Enter With a Name</h3>
                        <div className='list'>
                            <span>You can't enter with it in another device.</span>
                            <span>You can't change your name.</span>
                            <span>You can't set a new name or destroy your previous name.</span>
                        </div>
                    </motion.div>
                </Link>

                <motion.div onClick={loginAsGuest} whileTap={{ scale: 0.8 }} className='login-mode' initial='hidden' animate='visible' exit='exit' variants={loginPageItemsVariants}>
                    <h3>Enter as a Guest</h3>
                    <div className='list'>
                        <span>You can login again with a name.</span>
                        <span>You can't send any message.</span>
                        <span>You can't reply to any message.</span>
                    </div>
                </motion.div>
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
    background: var(--login);
    position: absolute;
    z-index: 2;
    user-select: none;

    .login-mode {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-color: var(--login-mode);
        padding: .5rem;
        width: 15rem;
        height: 14rem;
        border-radius: 25px;
        cursor: pointer;
        margin: 1rem;

        h3 {
            margin-bottom: 1rem;
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

        &:hover {
        }
    }

    @media (max-width: 768px) {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
`;

export default Login;
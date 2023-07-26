import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useNotification } from '../hooks/useNotification';
import { IoClose } from 'react-icons/io5';
import { FcAdvertising, FcHighPriority } from 'react-icons/fc';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { notificationVariants } from '../config/varitans';

const AuthError = () => {

    const { notification } = useSelector(store => store.userStore);
    const { closeNotification } = useNotification();
    let location = useLocation();

    useEffect(() => {
        closeNotification();
    }, [location.pathname]);

    return (
        <>
            <AnimatePresence>
                {notification.open ?
                <NotificationContainer initial='hidden' animate='visible' exit='exit' variants={notificationVariants} error={notification.error ? 1 : 0}>
                    <button className='close-button' onClick={closeNotification}><IoClose /></button>
                    {
                        notification.error ?
                        <i className='error-icon'><FcHighPriority /></i> :
                        <i className='notification-icon'><FcAdvertising /></i>
                    }
                    <p>{notification.message}</p>
                </NotificationContainer>
                : ""}
            </AnimatePresence>
        </>
    );
};

const NotificationContainer = styled(motion.div)`
    position: absolute;
    top: 1rem;
    min-width: 10rem;
    max-width: 30rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border: var(--border-first);
    border-radius: var(--radius-second);
    backdrop-filter: var(--glass-first);
    -webkit-backdrop-filter: var(--glass-first);
    padding: 0 3rem 0 .5rem;
    box-shadow: var(--shadow-second);
    user-select: none;
    z-index: 999;

    p {
        color: var(--text-color-third);
        font-size: .8rem;
        font-weight: var(--text-boldness-second);
        line-height: 1.5;
    }

    .error-icon, .notification-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.4rem;
        margin-right: .2rem;
    }

    .close-button {
        all: unset;
        position: absolute;
        right: .2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        width: 2rem;
        height: 2rem;
        font-size: 1.4rem;
        cursor: pointer;
        color: var(--text-color-third);
        transition: background .2s, box-shadow .2s;

        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                background-color: var(--button-hover);
                box-shadow: var(--shadow-first);
            }
        }
    }

    @media (max-width: 768px) {
        max-width: 90%;
    }
`;

export default AuthError;
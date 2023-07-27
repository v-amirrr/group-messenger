import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useNotification } from '../hooks/useNotification';
import { useAuth } from '../hooks/useAuth';
import { IoClose } from 'react-icons/io5';
import { FcAdvertising, FcHighPriority, FcKey } from 'react-icons/fc';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { notificationVariants } from '../config/varitans';

const AuthError = () => {

    let location = useLocation();

    const { notificationStatus } = useSelector(store => store.appStore);

    const { closeNotification } = useNotification();
    const { logout } = useAuth();

    useEffect(() => {
        closeNotification();
    }, [location.pathname]);

    return (
        <>
            <AnimatePresence>
                {notificationStatus?.show ?
                <NotificationContainer initial='hidden' animate='visible' exit='exit' variants={notificationVariants} error={notificationStatus.isError ? 1 : 0}>
                    <button className='close-button' onClick={closeNotification}><IoClose /></button>
                    {
                        notificationStatus?.isError ?
                        <i className='error-icon'><FcHighPriority /></i> :
                        notificationStatus.isGuest ?
                        <i className='guest-icon'><FcKey /></i> :
                        <i className='notification-icon'><FcAdvertising /></i>
                    }
                    {
                        notificationStatus.isGuest ?
                        <p>In order to use this feature you need to <button className='link' onClick={logout}>Login</button>.</p> :
                        <p>{notificationStatus?.message}</p>
                    }
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
    background-color: transparent;
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

        .link {
            display: inline;
            cursor: pointer;
            font-size: .8rem;
            font-weight: var(--text-boldness-second);
        }
    }

    .error-icon, .notification-icon, .guest-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.4rem;
        margin-right: .2rem;
    }

    .guest-icon {
        font-size: 1.2rem;
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
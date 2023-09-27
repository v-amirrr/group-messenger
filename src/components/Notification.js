import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useNotification } from '../hooks/useNotification';
import { useAuth } from '../hooks/useAuth';
import { IoClose } from 'react-icons/io5';
import { FcAdvertising, FcHighPriority, FcKey } from 'react-icons/fc';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { notificationContainerVariants, notificationVariants } from '../config/varitans';

const AuthError = () => {

    const location = useLocation();
    const { notifications } = useSelector(store => store.appStore);
    const { popupShow } = useSelector(store => store.popupStore);

    const { closeNotification, clearNotifications } = useNotification();
    const { logout } = useAuth();

    useEffect(() => {
        clearNotifications();
    }, [location.pathname, popupShow]);

    useEffect(() => {
        if (notifications.length > 3) {
            closeNotification(notifications[0].time);
        }
    }, [notifications]);

    return (
        <>
            <NotificationsContainer layout initial='hidden' animate='visible' exit='exit' variants={notificationContainerVariants}>
                <AnimatePresence>
                    {notifications?.map(notification => (
                    <NotificationContainer layout key={notification.time} initial='hidden' animate='visible' exit='exit' variants={notificationVariants} error={notification.isError ? 1 : 0}>
                        <button className='close-button' onClick={() => closeNotification(notification.time)}><IoClose /></button>
                        {
                            notification?.isError ?
                            <i className='error-icon'><FcHighPriority /></i> :
                            notification.isGuest ?
                            <i className='guest-icon'><FcKey /></i> :
                            <i className='notification-icon'><FcAdvertising /></i>
                        }
                        {
                            notification.isGuest ?
                            <p>In order to use this feature you need to <button className='link' onClick={logout}>Login</button>.</p> :
                            <p>{notification?.message}</p>
                        }
                    </NotificationContainer>
                    ))}
                </AnimatePresence>
            </NotificationsContainer>
        </>
    );
};

const NotificationsContainer = styled(motion.div)`
    position: absolute;
    top: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column-reverse;
    z-index: 999;
`;

const NotificationContainer = styled(motion.div)`
    min-width: 10rem;
    max-width: 30rem;
    min-height: 2.5rem;
    margin: .15rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: transparent;
    background-color: #ffffff10;
    border-radius: 50px;
    backdrop-filter: var(--glass-first);
    -webkit-backdrop-filter: var(--glass-first);
    padding: 0 3rem 0 .5rem;
    box-shadow: var(--shadow-second);
    user-select: none;

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
        max-width: 100%;
    }
`;

export default AuthError;
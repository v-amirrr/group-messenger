import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useNotification } from '../hooks/useNotification';
import { useAuth } from '../hooks/useAuth';
import { IoClose } from 'react-icons/io5';
import { FcAdvertising, FcHighPriority, FcKey } from 'react-icons/fc';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { notificationSlowVariants, notificationFastVariants } from '../config/varitans';

const AuthError = () => {
    const location = useLocation();
    const { notifications } = useSelector((store) => store.appStore);
    const { popupShow } = useSelector((store) => store.popupStore);

    const { closeNotification, clearNotifications } = useNotification();
    const { logout } = useAuth();

    useEffect(() => {
        clearNotifications();
    }, [location.pathname, popupShow]);

    useEffect(() => {
        let firstItem = notifications[0]?.time;
        if (notifications.length > 1) {
            closeNotification(firstItem);
        }
    }, [notifications]);
console.log(notifications);
    return (
        <>
            <NotificationsContainer layout initial='hidden' animate='visible' exit='exit' variants={notificationFastVariants}>
                <AnimatePresence>
                    {notifications?.map((notification) => (
                        <NotificationContainer
                            layout
                            key={notification.time}
                            initial='hidden'
                            animate='visible'
                            exit='exit'
                            variants={notifications.length > 1 ? notificationSlowVariants : notificationFastVariants}
                            error={notification.isError ? 1 : 0}
                            letters={notification?.message.length > 50 ? 1 : 0}
                        >
                            <button className='close-button' onClick={() => closeNotification(notification.time)}>
                                <IoClose />
                            </button>
                            {
                                notification?.isError ?
                                <i className='error-icon'>
                                    <FcHighPriority />
                                </i> :
                                notification.isGuest ?
                                <i className='guest-icon'>
                                    <FcKey />
                                </i> :
                                <i className='notification-icon'>
                                    <FcAdvertising />
                                </i>
                            }
                            {
                                notification.isGuest ?
                                <p>
                                    In order to use this feature you need to{' '}
                                    <button className='link' onClick={logout}>
                                        Login
                                    </button>
                                </p> :
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
    width: 100vw;
`;

const NotificationContainer = styled(motion.div)`
    box-sizing: content-box;
    min-width: 7rem;
    max-width: 30rem;
    min-height: 2.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: #1a1a1aaa;
    border: solid 2.5px #ffffff00;
    border-radius: ${props => props.letters ? "25px" : "50px"};
    box-shadow: var(--bold-shadow);
    backdrop-filter: var(--bold-glass);
    -webkit-backdrop-filter: var(--bold-glass);
    color: var(--normal-color);
    padding: ${props => props.letters ? "1rem 3rem 1rem 0.5rem" : "0 3rem 0 0.5rem"};
    z-index: 3;
    position: absolute;
    top: .01rem;

    p {
        font-size: 0.8rem;
        font-weight: 400;
        line-height: 1.5;

        .link {
            display: inline;
            cursor: pointer;
            font-size: 0.8rem;
            font-weight: 400;
        }
    }

    .error-icon,
    .notification-icon,
    .guest-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 0.2rem;
        font-size: ${props => props.letters ? "2rem" : "1.4rem;"};
    }

    .guest-icon {
        font-size: 1.2rem;
    }

    .close-button {
        all: unset;
        position: absolute;
        right: 0.25rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        width: 1.8rem;
        height: 1.8rem;
        font-size: 1.4rem;
        cursor: pointer;
        transition: background 0.2s;

        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                background-color: var(--normal-bg-hover);
            }
        }
    }
`;

export default AuthError;

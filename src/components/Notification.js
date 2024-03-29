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

const Notification = () => {
    const location = useLocation();
    const { notifications } = useSelector(store => store.appStore);
    const { closeNotification, clearNotifications } = useNotification();
    const { logout } = useAuth();

    useEffect(() => {
        clearNotifications();
    }, [location.pathname]);

    useEffect(() => {
        let firstItem = notifications[0]?.time;
        if (notifications.length > 1) {
            closeNotification(firstItem);
        }
    }, [notifications]);

    return (
        <>
            <NotificationsContainer initial='hidden' animate='visible' exit='exit' variants={notificationFastVariants}>
                <AnimatePresence>
                    {
                        notifications?.map((notification) => (
                        <motion.div
                            key={notification.time}
                            initial='hidden'
                            animate='visible'
                            exit='exit'
                            variants={notifications.length > 1 ? notificationSlowVariants : notificationFastVariants}
                            className='notification'
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
                                    <a className='link' onClick={logout}>
                                        Login
                                    </a>
                                </p> :
                                <p>{notification?.message}</p>
                            }
                        </motion.div>
                        ))
                    }
                </AnimatePresence>
            </NotificationsContainer>
        </>
    );
};

const NotificationsContainer = styled(motion.div)`
    position: absolute;
    top: 1rem;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column-reverse;
    z-index: 999;

    .notification {
        box-sizing: content-box;
        position: absolute;
        top: .01rem;
        min-width: 7rem;
        max-width: 30rem;
        min-height: 2.4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        background-color: var(--normal-bg);
        border-radius: ${props => props.letters ? "25px" : "50px"};
        box-shadow: var(--bold-shadow);
        backdrop-filter: var(--bold-glass);
        -webkit-backdrop-filter: var(--bold-glass);
        color: var(--normal-color);
        padding: ${props => props.letters ? "1rem 3rem 1rem 0.5rem" : "0 3rem 0 0.5rem"};
        z-index: 3;

        p {
            font-size: .8rem;
            font-weight: 400;
            line-height: 1.5;

            .link {
                display: inline;
                font-size: .8rem;
                font-weight: 400;
                cursor: pointer;
            }
        }

        .error-icon, .notification-icon, .guest-icon {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: .2rem;
            font-size: ${props => props.letters ? "2rem" : "1.4rem;"};
        }

        .guest-icon {
            font-size: 1.2rem;
        }

        .close-button {
            all: unset;
            position: absolute;
            right: 0.25rem;
            width: 1.8rem;
            height: 1.8rem;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            font-size: 1.4rem;
            cursor: pointer;
            transition: background .2s;

            @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
                &:hover {
                    background-color: var(--normal-bg-hover);
                }
            }
        }
    }
`;

export default Notification;
import React from 'react';
import { useSelector } from 'react-redux';
import { useNotification } from '../hooks/useNotification';
import { useAuth } from '../hooks/useAuth';
import { IoClose } from 'react-icons/io5';
import { FcAdvertising, FcHighPriority, FcKey } from 'react-icons/fc';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { notificationSlowVariants, notificationFastVariants } from '../config/varitans';

const Notification = () => {
    const { notifications } = useSelector(store => store.appStore);
    const { closeNotification } = useNotification();
    const { logout } = useAuth();
    return (
        <>
            <NotificationsContainer initial='hidden' animate='visible' exit='exit' variants={notificationFastVariants}>
                <AnimatePresence>
                    {
                        notifications?.map((notification) => (
                        <NotificationContainer
                            key={notification?.time}
                            initial='hidden'
                            animate='visible'
                            exit='exit'
                            variants={notifications?.length > 1 ? notificationSlowVariants : notificationFastVariants}
                            data={{
                                letters: notification?.message?.length,
                            }}
                        >
                            <button className='close-button' onClick={() => closeNotification(notification.time)}>
                                <IoClose />
                            </button>
                            {
                                notification?.type === 'ERROR' ?
                                <i className='error-icon'><FcHighPriority /></i> :
                                notification?.type === 'GUEST' ?
                                <i className='guest-icon'><FcKey /></i> :
                                <i className='notification-icon'><FcAdvertising /></i>
                            }
                            <p className='notification-message'>
                                {notification?.message}
                                {notification?.type == 'GUEST' ? <a className='link' onClick={logout}>Login</a> : ''}
                            </p>
                        </NotificationContainer>
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
`;

const NotificationContainer = styled(motion.div)`
    box-sizing: content-box;
    position: absolute;
    top: .01rem;
    min-width: 7rem;
    max-width: 25rem;
    min-height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: var(--bg);
    border-radius: ${props => props.data.letters > 42 ? "25px" : "50px"};
    box-shadow: var(--shadow);
    backdrop-filter: var(--glass);
    padding: ${props => props.data.letters > 42 ? ".8rem 3rem .8rem .5rem" : "0 3rem 0 0.5rem"};
    z-index: 3;

    .notification-message {
        font-size: .9rem;
        font-weight: 400;
        line-height: 1.5;
        text-align: left;

        .link {
            display: inline;
            font-size: .9rem;
            font-weight: 400;
            cursor: pointer;
            padding: .02rem .05rem;
        }
    }

    .error-icon, .notification-icon, .guest-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: .2rem;
        font-size: 1.4rem;
    }

    .guest-icon {
        font-size: 1.2rem;
    }

    .close-button {
        all: unset;
        position: absolute;
        right: .25rem;
        width: 2rem;
        height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        transition: background .2s;

        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                background-color: var(--bg-hover);
            }
        }
    }

    @media (max-width: 768px) {
        border-radius: ${props => props.data.letters > 20 ? "25px" : "50px"};
        max-width: 20rem;
    }
`;

export default Notification;
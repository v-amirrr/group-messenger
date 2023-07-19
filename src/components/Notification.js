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
    top: 1.5rem;
    min-width: 10rem;
    max-width: 20rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: ${props => props.error ? "var(--error)" : "var(--notification)"};
    border-radius: 20px;
    backdrop-filter: var(--message-blur);
    -webkit-backdrop-filter: var(--message-blur);
    padding: 0 2.5rem 0 .5rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    box-shadow: ${props => props.error ? "rgba(0, 0, 0, 0.1) 0px 4px 12px" : "rgba(0, 0, 0) 0 10px 50px"};
    color: #ffffffaa;
    z-index: 9;

    p {
        font-size: .8rem;
        font-weight: 200;
        line-height: 1.5;
    }

    .error-icon, .notification-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1rem;
        margin-right: .2rem;
    }

    .close-button {
        position: absolute;
        right: .2rem;
        background-color: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        border-radius: 50%;
        padding: .2rem;
        font-size: 1.4rem;
        color: #ffffff88;
        cursor: pointer;
        transition: color .2s;

        &:hover {
            color: #fff;
        }
    }


    @media (max-width: 768px) {
        max-width: 90%;
    }
`;

export default AuthError;
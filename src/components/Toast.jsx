import React from 'react';
import { useSelector } from 'react-redux';
import { useToast } from '../hooks/useToast';
import { useAuth } from '../hooks/useAuth';
import { IoClose } from 'react-icons/io5';
import { FcAdvertising, FcHighPriority, FcKey } from 'react-icons/fc';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { toastSlowVariants, toastFastVariants } from '../config/varitans';
const framerMotionAttributes = variants => ({ initial: 'hidden', animate: 'visible', exit: 'exit', variants });

const Toast = () => {
    const { toasts } = useSelector(store => store.appStore);
    const { closeToast } = useToast();
    const { logout } = useAuth();
    return (
        <ToastsContainer {...framerMotionAttributes(toastFastVariants)}>
            <AnimatePresence>
                {
                    toasts?.map((toast) => (
                    <ToastContainer
                        key={toast?.time}
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                        variants={toasts?.length > 1 ? toastSlowVariants : toastFastVariants}
                    >
                        <button className='close-button' onClick={() => closeToast(toast.time)}>
                            <IoClose />
                        </button>
                        {
                            toast?.type === 'ERROR' ?
                            <i className='error-icon'><FcHighPriority /></i> :
                            toast?.type === 'GUEST' ?
                            <i className='guest-icon'><FcKey /></i> :
                            <i className='toast-icon'><FcAdvertising /></i>
                        }
                        <p className='toast-message'>
                            {toast?.message}
                            {toast?.type == 'GUEST' ? <a className='link' onClick={logout}>Login</a> : ''}
                        </p>
                    </ToastContainer>
                    ))
                }
            </AnimatePresence>
        </ToastsContainer>
    );
};

const ToastsContainer = styled(motion.div)`
    position: absolute;
    top: 1rem;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column-reverse;
    z-index: 999;
`;

const ToastContainer = styled(motion.div)`
    box-sizing: content-box;
    position: absolute;
    top: .01rem;
    min-width: 7rem;
    max-width: 25rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: var(--bg);
    border-radius: 50px;
    box-shadow: var(--shadow);
    backdrop-filter: var(--glass);
    border-top: solid 0.1px #2c2c2c;
    border-bottom: solid 0.1px #2c2c2c;
    padding: 0 3rem 0 .5rem;
    z-index: 3;

    .toast-message {
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

    .error-icon, .toast-icon, .guest-icon {
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
        max-width: 20rem;
    }
`;

export default Toast;
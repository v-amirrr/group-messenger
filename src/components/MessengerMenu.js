import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { HiDotsVertical } from 'react-icons/hi';
import { FcSettings, FcRedo, FcInfo } from 'react-icons/fc';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { menuVariants } from '../config/varitans';

const MessengerMenu = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const clickHandler = (type) => {
        if (type == 'LOGOUT') {
            logout();
        } else if (type == 'SETTINGS') {
            navigate('/settings');
        } else if (type == 'GUIDANCE') {
            navigate('/guidance');
        }
    };

    return (
        <>
            <MessengerMenuContainer initial='hidden' animate='visible' exit='exit' variants={menuVariants}>
                <div className='list'>
                    <button className='list-item' onClick={() => clickHandler('GUIDANCE')}>
                        <i className='features-icon'><FcInfo /></i>
                        <p>Guidance</p>
                    </button>
                    <button className='list-item' onClick={() => clickHandler('LOGOUT')}>
                        <i className='logout-icon'><FcRedo /></i>
                        <p>Logout</p>
                    </button>
                    <button className='list-item' onClick={() => clickHandler('SETTINGS')}>
                        <i><FcSettings /></i>
                        <p>Settings</p>
                    </button>
                </div>
                <i className='icon'><HiDotsVertical /></i>
            </MessengerMenuContainer>
        </>
    );
};

const MessengerMenuContainer = styled(motion.div)`
    box-sizing: content-box;
    position: absolute;
    top: 1rem;
    right: 8.2rem;
    width: 2.3rem;
    height: 2.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--normal-color);
    border: solid 2.5px #ffffff20;
    border-radius: 50px;
    box-shadow: var(--normal-shadow);
    backdrop-filter: var(--bold-glass);
    -webkit-backdrop-filter: var(--bold-glass);
    overflow: hidden;
    z-index: 2;
    transition: width 0.3s cubic-bezier(0.53, 0, 0, 0.98), height 0.3s cubic-bezier(0.53, 0, 0, 0.98), border-radius .2s .6s;

    .icon {
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
        position: absolute;
        width: 2.3rem;
        height: 2.3rem;
        font-size: 1.5rem;
        opacity: 1;
        transform: scale(1);
        display: flex;
        justify-content: center;
        align-items: center;
        transition: transform .3s .2s, opacity .3s .2s;
    }

    .list {
        position: relative;
        left: 5rem;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        opacity: 0;
        transform: scale(0.5);
        transition: opacity .2s, transform .4s, left .4s;

        .list-item {
            width: 88%;
            height: 2.1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0.15rem 0;
            background-color: var(--normal-bg);
            box-shadow: var(--normal-shadow);
            border-radius: 50px;
            font-weight: 400;
            white-space: nowrap;
            cursor: pointer;
            transition: background 0.2s;

            p {
                font-size: 0.8rem;
                margin-left: 2.2rem;
                text-align: left;
                width: 100%;
            }

            i {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.3rem;
                position: absolute;
                left: 1rem;
            }

            .logout-icon {
                transform: rotate(180deg);
            }

            .features-icon {
                font-size: 1.2rem;
            }

            @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
                &:hover {
                    background-color: var(--normal-bg-hover);
                }
            }
        }
    }

    &:hover, &:active {
        width: 7rem;
        height: 7.8rem;
        border-radius: 25px;
        transition: width 0.4s cubic-bezier(0.53, 0, 0, 0.98), height 0.4s cubic-bezier(0.53, 0, 0, 0.98), border-radius .1s;

        .icon {
            transform: scale(0.5);
            opacity: 0;
            transition: transform .3s, opacity .3s;
        }

        .list {
            left: 0;
            transform: scale(1);
            opacity: 1;
            transition: opacity .5s, transform .5s cubic-bezier(0.53, 0, 0, 0.98), left .5s cubic-bezier(0.53, 0, 0, 0.98);
        }
    }

    @media (max-width: 768px) {
        right: 0;
    }
`;

export default memo(MessengerMenu);

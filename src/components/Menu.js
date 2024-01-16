import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { HiDotsVertical } from 'react-icons/hi';
import { FcSettings, FcRedo, FcInfo } from 'react-icons/fc';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { menuVariants } from '../config/varitans';

const Menu = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const clickHandler = type => {
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
            <MenuContainer initial='hidden' animate='visible' exit='exit' variants={menuVariants}>
                <div className='buttons'>
                    <button onClick={() => clickHandler('GUIDANCE')}>
                        <i className='features-icon'><FcInfo /></i>
                        <p>Guidance</p>
                    </button>
                    <button onClick={() => clickHandler('LOGOUT')}>
                        <i className='logout-icon'><FcRedo /></i>
                        <p>Logout</p>
                    </button>
                    <button onClick={() => clickHandler('SETTINGS')}>
                        <i><FcSettings /></i>
                        <p>Settings</p>
                    </button>
                </div>
                <i className='icon'><HiDotsVertical /></i>
            </MenuContainer>
        </>
    );
};

const MenuContainer = styled(motion.div)`
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

    .buttons {
        position: relative;
        bottom: 1rem;
        left: 5rem;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        opacity: 0;
        transform: scale(0.5);
        transition: opacity .3s, transform .3s cubic-bezier(0.53, 0, 0, 0.98), bottom .5s cubic-bezier(0.53, 0, 0, 0.98), left .5s cubic-bezier(0.53, 0, 0, 0.98);

        button {
            width: 90%;
            height: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0.1rem 0;
            background-color: var(--normal-bg);
            box-shadow: var(--normal-shadow);
            border-radius: 50px;
            font-weight: 400;
            white-space: nowrap;
            cursor: pointer;
            transition: background .2s;

            p {
                font-size: .8rem;
                margin-left: 2rem;
                text-align: left;
                width: 100%;
            }

            i {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.2rem;
                position: absolute;
                left: .9rem;
            }

            .logout-icon {
                transform: rotate(180deg);
            }

            .features-icon {
                font-size: 1.1rem;
            }

            @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
                &:hover {
                    background-color: var(--normal-bg-hover);
                }
            }
        }
    }

    &:hover, &:active {
        width: 6.6rem;
        height: 7.3rem;
        border-radius: 25px;
        transition: width 0.5s cubic-bezier(0.53, 0, 0, 0.98), height 0.4s cubic-bezier(0.53, 0, 0, 0.98), border-radius .1s;

        .icon {
            transform: scale(0.5);
            opacity: 0;
            transition: transform .3s, opacity .3s;
        }

        .buttons {
            left: 0;
            bottom: 0;
            transform: scale(1);
            opacity: 1;
            transition: opacity .5s, transform .5s cubic-bezier(0.53, 0, 0, 0.98), bottom .5s cubic-bezier(0.53, 0, 0, 0.98), left .5s cubic-bezier(0.53, 0, 0, 0.98);
        }
    }

    @media (max-width: 768px) {
        right: 0;
    }
`;

export default memo(Menu);

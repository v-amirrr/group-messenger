import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { HiDotsVertical } from 'react-icons/hi';
import { FcSettings, FcRedo, FcInfo, FcEmptyTrash, FcFullTrash } from 'react-icons/fc';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { menuButtonVariants } from '../config/varitans';

const MenuButton = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const clickHandler = type => {
        switch (type) {
            case 'LOGOUT':
                logout();
                break;
            case 'SETTINGS':
                navigate('/settings');
                break;
            case 'GUIDANCE':
                navigate('/guidance');
                break;
            case 'TRASH':
                navigate('/trash');
                break;
            default:
                break;
        }
    };

    return (
        <>
            <MenuButtonContainer initial='hidden' animate='visible' exit='exit' variants={menuButtonVariants}>
                <div className='buttons'>
                    <button onClick={() => clickHandler('GUIDANCE')}>
                        <i className='features-icon'><FcInfo /></i>
                        <p>Guidance</p>
                    </button>
                    <button onClick={() => clickHandler('TRASH')}>
                        <i className='trash-icon'><FcFullTrash /></i>
                        <p>Trash</p>
                    </button>
                    <button onClick={() => clickHandler('LOGOUT')}>
                        <i className='logout-icon'><FcRedo /></i>
                        <p>Logout</p>
                    </button>
                    <button onClick={() => clickHandler('SETTINGS')}>
                        <i className='settings-icon'><FcSettings /></i>
                        <p>Settings</p>
                    </button>
                </div>
                <i className='icon'><HiDotsVertical /></i>
            </MenuButtonContainer>
        </>
    );
};

const MenuButtonContainer = styled(motion.button)`
    box-sizing: content-box;
    position: absolute;
    top: 1rem;
    right: 29.4%;
    width: 2.3rem;
    height: 2.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: var(--border);
    border-radius: 50px;
    box-shadow: var(--shadow);
    backdrop-filter: var(--glass);
    overflow: hidden;
    z-index: 4;
    transition: width .25s cubic-bezier(0.53, 0, 0, 0.98),
                height .25s cubic-bezier(0.53, 0, 0, 0.98),
                border-radius .2s .6s;

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
        color: var(--text);
        transition: transform .1s, opacity .5s .2s;
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
        transition: opacity .2s, transform .4s, bottom .4s, left .4s;

        button {
            width: 92%;
            height: 2.1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0.1rem 0;
            background-color: var(--bg);
            box-shadow: var(--shadow);
            border-radius: 50px;
            white-space: nowrap;
            cursor: pointer;
            transition: background .2s;
            color: var(--text);

            p {
                font-size: .9rem;
                font-weight: 400;
                margin-left: 1.9rem;
                text-align: left;
                width: 100%;
            }

            i {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.2rem;
                position: absolute;
                left: .85rem;
            }

            .logout-icon {
                transform: rotate(180deg);
            }

            .features-icon {
                font-size: 1.1rem;
            }

            @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
                &:hover {
                    background-color: var(--bg-hover);
                }
            }
        }
    }

    &:hover, &:active {
        width: 7rem;
        height: 9.7rem;
        border-radius: 25px;
        transition: width .4s cubic-bezier(0.53, 0, 0, 0.98),
                    height .4s cubic-bezier(0.53, 0, 0, 0.98),
                    border-radius .1s;

        .icon {
            transform: scale(0.5);
            opacity: 0;
            transition: transform .3s, opacity .2s;
        }

        .buttons {
            left: 0;
            bottom: 0;
            transform: scale(1);
            opacity: 1;
            transition: opacity .2s, transform .4s, bottom .4s, left .4s;
        }
    }

    @media (max-width: 768px) {
        right: 0;

        &:hover, &:active {
            border-radius: 22px;
        }
    }
`;

export default MenuButton;
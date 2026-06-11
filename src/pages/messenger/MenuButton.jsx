import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { HiDotsVertical } from 'react-icons/hi';
import { FcSettings, FcRedo, FcInfo, FcEmptyTrash, FcFullTrash } from 'react-icons/fc';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { menuButtonVariants } from '../../config/varitans';

const MenuButton = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    return (
        <>
            <MenuButtonContainer initial='hidden' animate='visible' exit='exit' variants={menuButtonVariants}>
                <div className='buttons'>
                    <button onClick={() => navigate('/guidance')}>
                        <i className='features-icon'><FcInfo /></i>
                        <p>Guidance</p>
                    </button>
                    <button onClick={() => navigate('/trash')}>
                        <i className='trash-icon'><FcFullTrash /></i>
                        <p>Trash</p>
                    </button>
                    <button onClick={() => logout()}>
                        <i className='logout-icon'><FcRedo /></i>
                        <p>Logout</p>
                    </button>
                    <button onClick={() => navigate('/settings')}>
                        <i className='settings-icon'><FcSettings /></i>
                        <p>Settings</p>
                    </button>
                </div>
                <i className='icon'><HiDotsVertical /></i>
            </MenuButtonContainer>
        </>
    );
};

const MenuButtonContainer = styled(motion.div)`
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
                border-radius .2s .4s;

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
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--text);
        transition: top .3s .05s, right .3s .05s, opacity .4s .15s;
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
        z-index: 4;
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
                font-size: 1.3rem;
                position: absolute;
                left: .75rem;
            }

            .logout-icon {
                transform: rotate(180deg);
            }

            .features-icon {
                font-size: 1.2rem;
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
            top: 50%;
            right: 50%;
            opacity: 0;
            transition: top .3s, right .3s, opacity .1s;
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
        right: 1.2rem;
    }
`;

export default MenuButton;
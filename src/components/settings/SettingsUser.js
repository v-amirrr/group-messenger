import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMessageOptions } from '../../hooks/useMessageOptions';
import { useNotification } from '../../hooks/useNotification';
import { FcBusinessman } from "react-icons/fc";
import { FaUserEdit } from "react-icons/fa";
import { RiArrowRightSLine } from "react-icons/ri";
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { settingsContainerVariants, userSettingsVariants } from '../../config/varitans';

const SettingsUser = ({ open, setOpen, setHeight }) => {
    const { user, enterAsAGuest } = useSelector(store => store.userStore);
    const { openPopup } = useMessageOptions();
    const { openNotification } = useNotification();
    const [changeUsernameInput, setChangeUsernameInput] = useState(user?.displayName);
    const [inputEnabled, setInputEnabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const itemSwitch = () => {
        cancelHandler();
        if (enterAsAGuest) {
            openNotification("In order to use this feature you need to login.", false, "GUEST");
        } else {
            if (open == "SETTINGS_USER") {
                setOpen(false);
            } else {
                setOpen("SETTINGS_USER");
                setHeight(12);
            }
        }
    };

    const changeUsernameHandler = () => {
        if (changeUsernameInput && changeUsernameInput != user?.displayName) {
            openPopup('CHANGE_USERNAME_POPUP', changeUsernameInput);
        } else if (changeUsernameInput == user?.displayName) {
            openNotification("The old and the new usernames are the same", true, "ERROR");
        } else {
            openNotification("Type a new username", true, "ERROR");
        }
    };

    const cancelHandler = () => {
        setChangeUsernameInput(user?.displayName);
        setInputEnabled(false);
        setLoading(false);
    };

    return (
        <>
            <div className='item-header' onClick={itemSwitch}>
                <i className='item-icon'><FcBusinessman /></i>
                <h4>User</h4>
                <i className='item-back'><RiArrowRightSLine /></i>
            </div>

            <AnimatePresence>
                {
                    open == "SETTINGS_USER" ?
                        <UserContainer initial='hidden' animate='visible' exit='exit' variants={userSettingsVariants} loading={loading ? 1 : 0} inputenabled={inputEnabled ? 1 : 0}>
                            <div className='username'>
                                <h5>Username</h5>
                                <div className='username-input'>
                                    <input type='text' value={changeUsernameInput} onChange={(e) => setChangeUsernameInput(e.target.value)} disabled={!inputEnabled} autoFocus={inputEnabled} />
                                    <button className='edit' onClick={() => setInputEnabled(true)}><FaUserEdit /></button>
                                </div>
                                <div className='buttons'>
                                    <button className='cancel' onClick={cancelHandler} disabled={!inputEnabled}>
                                        Cancel
                                    </button>
                                    <button className='submit' onClick={changeUsernameHandler} disabled={!inputEnabled} autoFocus>
                                        Change
                                    </button>
                                </div>
                                <AnimatePresence>
                                    {
                                        loading ?
                                        <motion.div key='loader' className='loader' initial='hidden' animate='visible' exit='exit' variants={settingsContainerVariants}>
                                            <span className='dot'></span>
                                            <span className='dot'></span>
                                            <span className='dot'></span>
                                        </motion.div>
                                        : ''
                                    }
                                </AnimatePresence>
                            </div>
                        </UserContainer>
                    : ""
                }
            </AnimatePresence>
        </>
    );
};

const UserContainer = styled(motion.div)`
    position: absolute;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    margin-top: 5rem;

    .username {
        position: relative;
        padding: .5rem;
        border-radius: 15px;
        width: 10rem;
        height: 7rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        overflow: hidden;
        padding-bottom: ${props => props.inputenabled ? '2rem' : '0'};
        transition: border .4s, padding .4s;

        h5 {
            filter: ${props => props.loading ? "blur(3px)" : "blur(0)"};
            text-align: left;
            width: 100%;
            padding: 0 .3rem;
            margin: .2rem 0 .5rem 0;
            transition: filter .4s;
        }

        .username-input {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            filter: ${props => props.loading ? "blur(3px)" : "blur(0)"};
            transition: filter .4s;
            overflow: hidden;

            input {
                padding: 0 .5rem;
                width: 100%;
                height: 1.8rem;
                border: none;
                border-radius: 50px;
                background-color: var(--normal-bg);
            }

            .edit {
                position: absolute;
                right: ${props => props.inputenabled ? '-.4rem' : '.1rem'};
                font-size: .9rem;
                padding: .3rem;
                display: flex;
                justify-content: center;
                align-items: center;
                opacity: ${props => props.inputenabled ? 0 : 1};
                transition: opacity .2s, right .4s;
            }
        }

        .buttons {
            filter: ${props => props.loading ? "blur(3px)" : "blur(0)"};
            position: absolute;
            bottom: ${props => props.inputenabled ? '.5rem' : '-1rem'};
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            opacity: ${props => props.inputenabled ? 1 : 0};
            transition: filter .4s, bottom .4s, opacity .2s;

            .submit, .cancel {
                overflow: hidden;
                width: 4rem;
                padding: .5rem;
                margin: 0 .25rem;
                border-radius: 50px;
                font-weight: 400;
                cursor: pointer;
                background-color: var(--normal-bg);
                display: flex;
                justify-content: center;
                align-items: center;
                font-weight: 400;
                white-space: nowrap;
                transition: background .2s;

                @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
                    &:hover {
                        background-color: var(--normal-bg-hover);
                    }
                }
            }
        }

        .loader {
            position: absolute;
            top: 0;
            width: 10rem;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9;

            .dot {
                width: .9rem;
                height: .9rem;
                border-radius: 50%;
                background-color: var(--normal-color);

                &:nth-child(1) {
                    animation: loader .6s infinite alternate;
                    animation-delay: 0s;
                }

                &:nth-child(2) {
                    animation: loader .6s infinite alternate;
                    animation-delay: .25s;
                }

                &:nth-child(3) {
                    animation: loader .6s infinite alternate;
                    animation-delay: .5s;
                }
            }

            @keyframes loader {
                0% {
                    transform: scale(1);
                }
                100% {
                    transform: scale(0.6);
                }
            }
        }
    }
`;

export default SettingsUser;
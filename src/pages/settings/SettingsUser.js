import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useModal } from '../../hooks/useModal';
import { useNotification } from '../../hooks/useNotification';
import { FcBusinessman } from "react-icons/fc";
import { FaUserEdit } from "react-icons/fa";
import { RiArrowRightSLine } from "react-icons/ri";
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { userSettingsVariants } from '../../config/varitans';

const SettingsUser = ({ open, setOpen, setHeight }) => {
    const { user, enterAsAGuest } = useSelector(store => store.userStore);
    const { openModal } = useModal();
    const { openNotification } = useNotification();
    const [changeUsernameInput, setChangeUsernameInput] = useState(user?.displayName);
    const [inputEnabled, setInputEnabled] = useState(false);

    const itemSwitch = () => {
        cancelHandler();
        if (enterAsAGuest) {
            openNotification("To use this feature you need to login", "GUEST");
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
            openModal('CHANGE_USERNAME_CONFIRMATION', null, changeUsernameInput);
            setInputEnabled(false);
        } else if (changeUsernameInput == user?.displayName) {
            openNotification("The old and the new usernames are the same", "ERROR");
        } else {
            openNotification("Type a new username", "ERROR");
        }
    };

    const cancelHandler = () => {
        setChangeUsernameInput(user?.displayName);
        setInputEnabled(false);
    };

    return (
        <>
            <div className='item-header' onClick={itemSwitch}>
                <i className='item-icon'><FcBusinessman /></i>
                <p className='item-text'>User</p>
                <i className='item-arrow'><RiArrowRightSLine /></i>
            </div>

            <AnimatePresence>
                {
                    open == "SETTINGS_USER" ?
                        <UserContainer initial='hidden' animate='visible' exit='exit' variants={userSettingsVariants} inputenabled={inputEnabled ? 1 : 0}>
                            <div className='username'>
                                <p className='username-header'>Username</p>
                                <div className='username-input'>
                                    <input type='text' value={changeUsernameInput} onChange={(e) => setChangeUsernameInput(e.target.value)} disabled={!inputEnabled} autoFocus={inputEnabled} />
                                    <button className='username-input-icon' onClick={() => setInputEnabled(true)}><FaUserEdit /></button>
                                </div>
                                <div className='buttons'>
                                    <button className='cancel-button' onClick={cancelHandler} disabled={!inputEnabled}>
                                        Cancel
                                    </button>
                                    <button className='submit-button' onClick={changeUsernameHandler} disabled={!inputEnabled} autoFocus>
                                        Change
                                    </button>
                                </div>
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
        border-radius: 15px;
        width: 9rem;
        height: 7rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        overflow: hidden;
        padding-bottom: ${props => props.inputenabled ? '2rem' : '0'};
        transition: padding .4s;

        .username-header {
            width: 100%;
            padding: 0 .3rem;
            margin: .2rem 0 .4rem 0;
            font-size: .9rem;
            font-weight: 600;
            text-align: left;
        }

        .username-input {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            overflow: hidden;

            input {
                width: 100%;
                height: 2rem;
                padding: 0 .5rem;
                border: none;
                border-radius: 50px;
                background-color: var(--bg);
                font-size: .8rem;
                font-weight: 400;
            }

            .username-input-icon {
                position: absolute;
                right: ${props => props.inputenabled ? '-.4rem' : '.1rem'};
                font-size: 1rem;
                padding: .3rem;
                display: flex;
                justify-content: center;
                align-items: center;
                opacity: ${props => props.inputenabled ? 0 : 1};
                transition: opacity .2s, right .2s;
            }
        }

        .buttons {
            position: absolute;
            bottom: ${props => props.inputenabled ? '.4rem' : '-1rem'};
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            opacity: ${props => props.inputenabled ? 1 : 0};
            transition: bottom .4s, opacity .2s;

            .submit-button, .cancel-button {
                width: 4.3rem;
                height: 2rem;
                border-radius: 50px;
                background-color: var(--bg);
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: .8rem;
                font-weight: 400;
                white-space: nowrap;
                overflow: hidden;
                transition: background .2s;

                @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
                    &:hover {
                        background-color: var(--bg-hover);
                    }
                }
            }

            .submit-button {
                color: var(--green);
                background-color: #00ff0030;

                @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
                    &:hover {
                        background-color: #00ff0050;
                    }
                }
            }
        }
    }
`;

export default SettingsUser;